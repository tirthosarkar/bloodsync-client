"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHeartbeat,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaTint,
  FaMapMarkerAlt,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
  FaPhone,
  FaVenusMars,
} from "react-icons/fa";
import { useGeoData } from "@/hooks/useGeoData";
import { uploadImageToImgBB } from "@/lib/imageUpload";
import { signUp } from "@/lib/auth-client";
import Image from "next/image";
import ClientMetadata from "@/components/seo/ClientMetadata";
import { serverMutation } from "@/lib/core/server";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const genders = ["Male", "Female", "Other"];

export default function RegisterPage() {
  const router = useRouter();
  const {
    districts,
    getUpazilasByDistrict,
    loading: geoLoading,
  } = useGeoData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    bloodGroup: "",
    district: "",
    districtName: "",
    upazila: "",
    upazilaName: "",
    password: "",
    confirmPassword: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleDistrictChange = (districtId) => {
    const selectedDistrict = districts.find((d) => d.id === districtId);
    handleInputChange("district", districtId);
    handleInputChange(
      "districtName",
      selectedDistrict ? selectedDistrict.name : "",
    );
    handleInputChange("upazila", "");
    handleInputChange("upazilaName", "");
  };

  const handleUpazilaChange = (upazilaId) => {
    const upazilas = getUpazilasByDistrict(formData.district);
    const selectedUpazila = upazilas.find((u) => u.id === upazilaId);
    handleInputChange("upazila", upazilaId);
    handleInputChange(
      "upazilaName",
      selectedUpazila ? selectedUpazila.name : "",
    );
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (
      !/^(\+8801|01)[3-9]\d{8}$/.test(formData.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "Invalid phone number (e.g., 01XXXXXXXXX)";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }

    if (!formData.district) {
      newErrors.district = "District is required";
    }

    if (!formData.upazila) {
      newErrors.upazila = "Upazila is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      let avatarUrl = null;

      if (avatar) {
        setIsUploading(true);
        try {
          const uploadResult = await uploadImageToImgBB(avatar);
          avatarUrl = uploadResult.url;
        } catch (error) {
          toast.error("Failed to upload avatar. Please try again.");
          setIsSubmitting(false);
          setIsUploading(false);
          return;
        }
        setIsUploading(false);
      }

      const { data, error } = await signUp.email({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        image: avatarUrl, // 'image' is the default field Better Auth uses for profiles

        // Pass your app's custom schema properties directly here
        role: "donor",
        status: "active",
        phone: formData.phone,
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        // ✅ Send both ID and Name to your MongoDB
        district: formData.district,
        districtName: formData.districtName,
        upazila: formData.upazila,
        upazilaName: formData.upazilaName,
        donationCount: 0,
        lastDonationDate: null,

        // Tell Better Auth where to send the user once authenticated successfully
        //   callbackURL: "/dashboard",
      });

      console.log("DATA:", data);
      console.log("ERROR:", error);
      // 1. FIRST check error
      if (error) {
        toast.error(error.message || "Registration failed");
        return;
      }

      if (data?.user) {
        const userPayload = {
          authId: data.user.id,

          name: formData.name.trim(),
          email: formData.email.trim(),

          image: avatarUrl,

          phone: formData.phone,

          gender: formData.gender,

          bloodGroup: formData.bloodGroup,

          // ✅ Send both ID and Name to your MongoDB
          district: formData.district,
          districtName: formData.districtName,
          upazila: formData.upazila,
          upazilaName: formData.upazilaName,

          role: "donor",

          status: "active",
          donationCount: 0,

          lastDonationDate: null,

          createdAt: new Date().toISOString(),
        };

        await serverMutation("/api/users", userPayload);

        toast.success("Account created successfully");
      }

      // 3. Handle errors returned straight from the Auth Engine
      // if (error) {
      //   toast.error(error.message || "Registration failed");
      //   return;
      // }

      // 4. Success state management
      // Better Auth handles immediate background sessions perfectly.
      // If you don't use callbackURL parameter above, you can route them manually:

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } catch (error) {
      console.error("Registration error encountered:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneInput = (e) => {
    let value = e.target.value.replace(/[^0-9+]/g, "");
    handleInputChange("phone", value);
  };

  return (
    <>
      <ClientMetadata
        title="Register"
        description="BloodSync connects blood donors with those in need. Register as a donor, request blood, and save lives today."
        keywords={[
          "blood donation",
          "donate blood",
          "blood bank",
          "blood request",
          "save lives",
          "donor registration",
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 flex items-center justify-center px-4 py-10">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          theme="light"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <FaHeartbeat className="text-red-600 text-2xl" />
              <span className="text-xl font-bold text-gray-800">
                <span className="text-red-600">Blood</span>Sync
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Your Account
            </h1>
            <p className="mt-2 text-gray-600">
              Join our community of life-savers. Register as a blood donor
              today.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-red-100 p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-red-50 border-2 border-dashed border-red-200 flex items-center justify-center overflow-hidden relative">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                        sizes="96px"
                      />
                    ) : (
                      <FaImage className="text-red-300 text-3xl" />
                    )}
                  </div>
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors shadow-lg"
                  >
                    <FaImage className="text-white text-xs" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </div>
                <span className="text-xs text-gray-500">
                  {avatarPreview
                    ? "Click to change photo"
                    : "Upload your photo (optional)"}
                </span>
              </div>

              {/* Name Field */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                        : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                    }`}
                  />
                </div>
                {errors.name && (
                  <span className="text-xs text-red-500">{errors.name}</span>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <span className="text-xs text-red-500">{errors.email}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={handlePhoneInput}
                      maxLength={14}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <span className="text-xs text-red-500">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Gender & Blood Group Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gender *
                  </label>
                  <div className="relative">
                    <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="gender"
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition appearance-none bg-white ${
                        errors.gender
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    >
                      <option value="">Select Gender</option>
                      {genders.map((gender) => (
                        <option key={gender} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.gender && (
                    <span className="text-xs text-red-500">
                      {errors.gender}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="bloodGroup"
                    className="text-sm font-medium text-gray-700"
                  >
                    Blood Group *
                  </label>
                  <div className="relative">
                    <FaTint className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={(e) =>
                        handleInputChange("bloodGroup", e.target.value)
                      }
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition appearance-none bg-white ${
                        errors.bloodGroup
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    >
                      <option value="">Select Blood Group</option>
                      {bloodGroups.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.bloodGroup && (
                    <span className="text-xs text-red-500">
                      {errors.bloodGroup}
                    </span>
                  )}
                </div>
              </div>

              {/* District & Upazila Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="district"
                    className="text-sm font-medium text-gray-700"
                  >
                    District *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      disabled={geoLoading}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed ${
                        errors.district
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    >
                      <option value="">
                        {geoLoading ? "Loading..." : "Select District"}
                      </option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.id}>
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.district && (
                    <span className="text-xs text-red-500">
                      {errors.district}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="upazila"
                    className="text-sm font-medium text-gray-700"
                  >
                    Upazila *
                  </label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      id="upazila"
                      value={formData.upazila}
                      onChange={(e) => handleUpazilaChange(e.target.value)}
                      disabled={!formData.district}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition appearance-none bg-white disabled:bg-gray-50 disabled:cursor-not-allowed ${
                        errors.upazila
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    >
                      <option value="">
                        {!formData.district
                          ? "Select district first"
                          : "Select Upazila"}
                      </option>
                      {getUpazilasByDistrict(formData.district).map(
                        (upazila) => (
                          <option key={upazila.id} value={upazila.id}>
                            {upazila.name}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  {errors.upazila && (
                    <span className="text-xs text-red-500">
                      {errors.upazila}
                    </span>
                  )}
                </div>
              </div>

              {/* Password Fields Row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                        errors.confirmPassword
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-gray-200 focus:border-red-500 focus:ring-red-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30 flex items-center justify-center gap-2 group mt-8"
              >
                {isSubmitting || isUploading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    {isUploading ? "Uploading Photo..." : "Creating Account..."}
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <Link
              href="/auth/signin"
              className="block w-full py-2.5 border-2 border-red-200 text-red-600 font-semibold text-sm rounded-lg hover:bg-red-50 transition-colors duration-300 text-center"
            >
              Login to Your Account
            </Link>
          </div>

          {/* Trust Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
            <FaHeartbeat className="text-red-400" />
            <span>Your data is secure and encrypted</span>
          </div>
        </motion.div>
      </div>
    </>
  );
}
