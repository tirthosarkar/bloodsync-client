'use client';

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { serverFetch, serverMutation } from '@/lib/core/server';
import { uploadImageToImgBB } from '@/lib/imageUpload';
import { useGeoData } from '@/hooks/useGeoData';
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaPhone,
  FaSpinner,
  FaImage,
  FaHeartbeat,
  FaUserShield,
  FaHandsHelping,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, refreshSession } = useContext(AuthContext);
  const {
    districts,
    getUpazilasByDistrict,
    loading: geoLoading,
  } = useGeoData();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [originalData, setOriginalData] = useState({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bloodGroup: '',
    district: '',
    districtName: '',
    upazila: '',
    upazilaName: '',
    image: '',
    role: '', // Store role but never edit it
  });

  // 1. Fetch user data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        if (!user?.id) return;

        const data = await serverFetch(`/api/users/${user.id}`);
        console.log(data, 'from server');

        const loadedData = {
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          bloodGroup: data.bloodGroup || '',

          // ✅ FIX: Use the ID from the database for the dropdowns
          district: data.district || '',
          districtName: data.districtName || '',

          // ✅ FIX: Use the ID from the database for the dropdowns
          upazila: data.upazila || '',
          upazilaName: data.upazilaName || '',

          image: data.image || '',
          role: data.role || 'donor',
        };

        // ✅ Save into both state variables
        setFormData(loadedData);
        setOriginalData(loadedData); // 👈 Save the backup copy here!
      } catch (error) {
        toast.error('Failed to load profile data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  // 2. Handle Form Input Changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. Handle District Change
  const handleDistrictChange = e => {
    const selectedDistrictId = e.target.value;
    const selectedDistrict = districts.find(d => d.id === selectedDistrictId);

    setFormData(prev => ({
      ...prev,
      district: selectedDistrictId,
      districtName: selectedDistrict ? selectedDistrict.name : '',
      upazila: '',
      upazilaName: '',
    }));
  };

  // 4. Handle Upazila Change
  const handleUpazilaChange = e => {
    const selectedUpazilaId = e.target.value;
    const upazilas = getUpazilasByDistrict(formData.district);
    const selectedUpazila = upazilas.find(u => u.id === selectedUpazilaId);

    setFormData(prev => ({
      ...prev,
      upazila: selectedUpazilaId,
      upazilaName: selectedUpazila ? selectedUpazila.name : '',
    }));
  };

  // 5. Handle Avatar Upload
  const handleImageUpload = async e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadImageToImgBB(file);

      if (result) {
        setFormData(prev => ({ ...prev, image: result.url }));
        toast.success('Avatar uploaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to upload avatar');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  // 6. Handle Save
  const handleSave = async () => {
    try {
      setIsSaving(true);

      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        bloodGroup: formData.bloodGroup,

        // ✅ FIX: Save BOTH the ID and the Name
        district: formData.district,
        districtName: formData.districtName,
        upazila: formData.upazila,
        upazilaName: formData.upazilaName,

        image: formData.image,
      };

      const response = await serverMutation(
        `/api/users/${user.id}`,
        updatedData,
        'PATCH',
      );

      toast.success(response.message || 'Profile updated successfully!');

      if (refreshSession) {
        await refreshSession();
      }

      setIsEditing(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  //   // 7. Handle Cancel
  //   const handleCancel = () => {
  //     setFormData({
  //       name: user?.name || "",
  //       email: user?.email || "",
  //       phone: user?.phone || "",
  //       bloodGroup: user?.bloodGroup || "",

  //       // ✅ CHANGE THESE 4 LINES: Use formData (not user)
  //       district: formData.district || "",
  //       districtName: formData.districtName || "",
  //       upazila: formData.upazila || "",
  //       upazilaName: formData.upazilaName || "",

  //       image: user?.image || "",
  //       role: user?.role || "donor",
  //     });
  //     setIsEditing(false);
  //   };

  // 7. Handle Cancel
  const handleCancel = () => {
    // ✅ Revert back to the original data, NOT the current formData
    setFormData(originalData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  // Get current upazilas based on selected district
  const currentUpazilas = getUpazilasByDistrict(formData.district);

  // ── Role Badge Configurations ──
  const getRoleBadge = role => {
    const roleConfig = {
      admin: {
        icon: <FaUserShield className="text-xs" />,
        color: 'bg-purple-100 text-purple-700 border-purple-200',
        label: 'Admin',
      },
      volunteer: {
        icon: <FaHandsHelping className="text-xs" />,
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        label: 'Volunteer',
      },
      donor: {
        icon: <FaHeartbeat className="text-xs" />,
        color: 'bg-red-100 text-red-700 border-red-200',
        label: 'Donor',
      },
    };

    const config = roleConfig[role?.toLowerCase()] || roleConfig.donor;
    return config;
  };

  const roleBadge = getRoleBadge(formData.role);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-3xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h2 className="text-xl font-semibold text-gray-800">My Profile</h2>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving || isUploading}
                className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isSaving ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-24 h-24 rounded-full bg-red-100 flex items-center justify-center text-red-600 text-3xl font-bold overflow-hidden border-2 border-red-200">
            {formData.image ? (
              <Image
                src={formData.image}
                alt="Avatar"
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              formData.name?.charAt(0).toUpperCase() || 'U'
            )}

            {isEditing && (
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-red-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-red-700 transition-colors shadow-lg"
              >
                <FaImage className="text-xs" />
              </label>
            )}
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {formData.name}
            </h3>
            <p className="text-gray-500">{formData.email}</p>

            {/* ✅ Role Badge - Unchangeable */}
            <div className="mt-2">
              <span
                className={`
                inline-flex items-center gap-1.5 px-3 py-1 
                border rounded-full text-xs font-semibold
                ${roleBadge.color}
              `}
              >
                {roleBadge.icon}
                {roleBadge.label}
              </span>
            </div>

            {isUploading && (
              <span className="block text-xs text-blue-500 mt-1">
                Uploading avatar...
              </span>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NAME */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2 text-gray-400" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          {/* EMAIL - ALWAYS DISABLED */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaEnvelope className="inline mr-2 text-gray-400" /> Email
              (Non-editable)
            </label>
            <input
              type="email"
              value={formData.email}
              disabled={true}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="inline mr-2 text-gray-400" /> Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
            />
          </div>

          {/* BLOOD GROUP */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaTint className="inline mr-2 text-gray-400" /> Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* DISTRICT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-2 text-gray-400" /> District
            </label>
            <select
              value={formData.district}
              onChange={handleDistrictChange}
              disabled={!isEditing || geoLoading}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <option value="">
                {geoLoading ? 'Loading districts...' : 'Select District'}
              </option>
              {districts.map(district => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          {/* UPAZILA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-2 text-gray-400" /> Upazila
            </label>
            <select
              value={formData.upazila}
              onChange={handleUpazilaChange}
              disabled={!isEditing || !formData.district}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors ${
                isEditing
                  ? 'border-gray-300 bg-white'
                  : 'border-gray-200 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <option value="">
                {!formData.district
                  ? 'Select district first'
                  : 'Select Upazila'}
              </option>
              {currentUpazilas.map(upazila => (
                <option key={upazila.id} value={upazila.id}>
                  {upazila.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
