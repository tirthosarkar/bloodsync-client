"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { serverMutation } from "@/lib/core/server";
import { toast } from "react-toastify";
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaMapPin,
  FaCalendar,
  FaClock,
  FaCommentDots,
  FaHeart,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// import { setDonationInProgress } from "@/lib/action/donetion";
// import { donateBloodAction } from "@/lib/action/donation.action";

export default function DonationRequestDetailsClient({
  request,
  currentUser,
  isMyOwnRequest,
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if the request is already inprogress/done/canceled
  const isDonatable = request.status === "pending";

  // Handle Donate Button Click
  const handleDonateClick = () => {
    if (isMyOwnRequest) {
      toast.error("You cannot donate to your own request.");
      return;
    }
    if (!isDonatable) {
      toast.info(`This request is already ${request.status}.`);
      return;
    }
    setIsModalOpen(true);
  };

  // Handle Confirm Donation
  const handleConfirmDonation = async () => {
    setIsSubmitting(true);
    try {
      // Prepare PATCH payload
      const payload = {
        status: "inprogress",
        donorName: currentUser.name,
        donorEmail: currentUser.email,
        userId: currentUser.id || currentUser._id, // <--- ADD THIS
        role: currentUser.role || "donor", // <--- ADD THIS
      };
      // Call the PATCH API

      const response = await serverMutation(
        `/api/donation-requests/${request._id}`,
        payload,
        "PATCH",
      );
      // Call the server action directly (do NOT use serverMutation here)
      // const response = await donateBloodAction(request._id, payload);

      if (response.success) {
        toast.success("You have successfully volunteered to donate! 🩸");
        setIsModalOpen(false);
        // Refresh the page to show updated status
        router.refresh();
      } else {
        toast.error(response.message || "Failed to confirm donation");
      }
    } catch (error) {
      console.error("Donation error:", error);
      toast.error(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Main Info Card ── */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-white">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Request for {request.recipientName}
            </h2>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full text-sm font-medium">
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Posted on {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* ── Grid Details ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaUser className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Requester</p>
                  <p className="text-gray-800 font-medium">
                    {request.requesterName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {request.requesterEmail}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaTint className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Blood Group
                  </p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                    {request.bloodGroup}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCalendar className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Donation Date & Time
                  </p>
                  <p className="text-gray-800">
                    {new Date(request.donationDate).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-400">
                    {request.donationTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-red-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="text-gray-800 font-medium">
                    {request.recipientDistrictName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {request.recipientUpazilaName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaHospital className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">Hospital</p>
                  <p className="text-gray-800">{request.hospitalName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaMapPin className="text-gray-400 mt-1" size={18} />
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Full Address
                  </p>
                  <p className="text-gray-800">{request.fullAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Request Message ── */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-start gap-3">
              <FaCommentDots className="text-gray-400 mt-1" size={18} />
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Request Message
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {request.requestMessage}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Footer: Donate Button ── */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={handleDonateClick}
            disabled={!isDonatable || isMyOwnRequest}
            className="flex items-center gap-3 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold rounded-lg transition-colors shadow-md shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaHeart className="text-red-100" />
            {isMyOwnRequest
              ? "Cannot Donate to Own Request"
              : !isDonatable
                ? `Already ${request.status}`
                : "Donate Blood"}
          </button>
        </div>
      </div>

      {/* ── Donate Confirmation Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <FaHeart className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Confirm Donation
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                <p className="text-gray-600">
                  You are about to volunteer to donate blood for this request.
                  Please confirm your details.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <FaUser className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs text-gray-500">Donor Name</p>
                      <p className="text-gray-800 font-medium">
                        {currentUser.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-gray-400" size={16} />
                    <div>
                      <p className="text-xs text-gray-500">Donor Email</p>
                      <p className="text-gray-800 font-medium">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-start gap-2">
                  <FaCheckCircle className="text-blue-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-700">
                    By confirming, you agree to donate blood for{" "}
                    <strong>{request.recipientName}</strong> at{" "}
                    <strong>{request.hospitalName}</strong> on{" "}
                    <strong>
                      {new Date(request.donationDate).toLocaleDateString()}
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end bg-gray-50">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDonation}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <FaHeart size={14} />
                      Confirm Donation
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
