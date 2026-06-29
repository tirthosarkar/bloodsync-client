'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { serverMutation } from '@/lib/core/server';
import {
  FaUser,
  FaEnvelope,
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaMapPin,
  FaCalendar,
  FaHeart,
  FaSpinner,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '@/utils/toast';

// ── shared info row ──
const InfoItem = ({ icon, label, value, sub, iconRed = false }) => (
  <div className="flex items-start gap-3 p-5 border-b border-gray-50">
    <div
      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconRed ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400'}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800 leading-snug">
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

export default function DonationRequestDetailsClient({
  request,
  currentUser,
  isMyOwnRequest,
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDonatable = request.status === 'pending';

  // ── status config ──
  const statusConfig = {
    pending: {
      label: 'Pending',
      cls: 'bg-amber-50 text-amber-700 border-amber-200',
      dot: 'bg-amber-400',
    },
    inprogress: {
      label: 'In Progress',
      cls: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500',
    },
    done: {
      label: 'Done',
      cls: 'bg-green-50 text-green-700 border-green-200',
      dot: 'bg-green-500',
    },
    canceled: {
      label: 'Canceled',
      cls: 'bg-red-50 text-red-400 border-red-200',
      dot: 'bg-red-400',
    },
  };
  const st = statusConfig[request.status] || statusConfig.pending;

  const handleDonateClick = () => {
    if (currentUser?.status === 'blocked') {
      showToast.error('Account blocked', 'You cannot donate. Contact support.');
      return;
    }
    if (isMyOwnRequest) {
      showToast.error('Not allowed', 'You cannot donate to your own request.');
      return;
    }
    if (!isDonatable) {
      showToast.info(
        'Unavailable',
        `This request is already ${request.status}.`,
      );
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmDonation = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        status: 'inprogress',
        donorName: currentUser.name,
        donorEmail: currentUser.email,
        userId: currentUser.id || currentUser._id,
        role: currentUser.role || 'donor',
      };
      const response = await serverMutation(
        `/api/donation-requests/${request._id}`,
        payload,
        'PATCH',
      );
      if (response.success) {
        showToast.success(
          'Donation confirmed!',
          'You have volunteered to donate blood 🩸',
        );
        setIsModalOpen(false);
        router.refresh();
      } else {
        showToast.error(
          'Failed',
          response.message || 'Could not confirm donation.',
        );
      }
    } catch (error) {
      showToast.error('Error', error.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* ── Back link ── */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-600 transition-colors mb-6"
      >
        ← Back to requests
      </button>

      {/* ── Hero Banner ── */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-7 mb-5 overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute right-10 -bottom-10 w-28 h-28 rounded-full bg-white/[0.04]" />

        <div className="relative flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold tracking-widest text-red-300 mb-2">
              BLOOD REQUEST
            </p>
            <h2 className="text-2xl font-extrabold text-white mb-1">
              {request.recipientName}
            </h2>
            <p className="text-sm text-red-200">
              Posted on{' '}
              {new Date(request.createdAt).toLocaleDateString('en-BD', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
              {request.requesterName && ` · by ${request.requesterName}`}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/15 border-2 border-white/25 flex items-center justify-center text-white text-xl font-black">
              {request.bloodGroup}
            </div>
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider px-3 py-1.5 rounded-full border ${st.cls}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
              {st.label.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main Card ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        {/* section label */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-50">
          <span className="text-[10px] font-bold tracking-widest text-gray-400">
            REQUEST INFORMATION
          </span>
          <div className="flex-1 h-px bg-gray-50" />
        </div>

        {/* 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-50">
          {/* left col */}
          <div>
            <InfoItem
              icon={<FaUser size={14} />}
              label="Requester"
              value={request.requesterName}
              sub={request.requesterEmail}
            />
            <InfoItem
              icon={<FaTint size={14} />}
              label="Blood Group"
              iconRed
              value={
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-lg text-sm font-bold">
                  ♥ {request.bloodGroup}
                </span>
              }
            />
            <InfoItem
              icon={<FaCalendar size={14} />}
              label="Date & Time"
              value={new Date(request.donationDate).toLocaleDateString(
                'en-BD',
                { day: 'numeric', month: 'long', year: 'numeric' },
              )}
              sub={request.donationTime}
            />
          </div>
          {/* right col */}
          <div>
            <InfoItem
              icon={<FaMapMarkerAlt size={14} />}
              label="Location"
              iconRed
              value={request.recipientDistrictName}
              sub={request.recipientUpazilaName}
            />
            <InfoItem
              icon={<FaHospital size={14} />}
              label="Hospital"
              value={request.hospitalName}
            />
            <InfoItem
              icon={<FaMapPin size={14} />}
              label="Full Address"
              value={request.fullAddress}
            />
          </div>
        </div>

        {/* donor info — only when inprogress */}
        {request.status === 'inprogress' && request.donorName && (
          <div className="mx-6 mb-5 mt-1 flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-base flex-shrink-0">
              {request.donorName?.charAt(0)}
            </div>
            <div>
              <p className="text-xs font-bold text-green-600 tracking-wider uppercase mb-0.5">
                Donor Confirmed
              </p>
              <p className="text-sm font-semibold text-green-800">
                {request.donorName}
              </p>
              <p className="text-xs text-green-500">{request.donorEmail}</p>
            </div>
          </div>
        )}

        {/* Request Message */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-50">
          <span className="text-[10px] font-bold tracking-widest text-gray-400">
            REQUEST MESSAGE
          </span>
          <div className="flex-1 h-px bg-gray-50" />
        </div>
        <div className="px-6 pb-6">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
            {request.requestMessage}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex items-center justify-end gap-3">
          <button
            onClick={() => router.back()}
            className="px-5 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleDonateClick}
            disabled={!isDonatable || isMyOwnRequest}
            className="flex items-center gap-2 px-7 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <FaHeart size={13} />
            {isMyOwnRequest
              ? 'Your Own Request'
              : !isDonatable
                ? `Already ${st.label}`
                : 'Donate Blood'}
          </button>
        </div>
      </div>

      {/* ── Confirm Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* head */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <FaHeart size={15} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Confirm Donation
                  </h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={15} />
                </button>
              </div>

              {/* body */}
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-gray-500 leading-relaxed">
                  You are about to volunteer to donate blood. Please confirm
                  your details below.
                </p>

                {/* donor info box */}
                <div className="bg-gray-50 border border-gray-100 rounded-xl divide-y divide-gray-100">
                  <div className="flex items-center gap-3 p-4">
                    <FaUser className="text-gray-400" size={14} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Donor Name
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4">
                    <FaEnvelope className="text-gray-400" size={14} />
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Donor Email
                      </p>
                      <p className="text-sm font-semibold text-gray-800">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>
                </div>

                {/* notice */}
                <div className="flex gap-3 items-start bg-blue-50 border border-blue-100 rounded-xl p-4">
                  <FaCheckCircle
                    className="text-blue-500 mt-0.5 flex-shrink-0"
                    size={14}
                  />
                  <p className="text-xs text-blue-700 leading-relaxed">
                    By confirming, you agree to donate blood for{' '}
                    <strong>{request.recipientName}</strong> at{' '}
                    <strong>{request.hospitalName}</strong> on{' '}
                    <strong>
                      {new Date(request.donationDate).toLocaleDateString()}
                    </strong>
                    .
                  </p>
                </div>
              </div>

              {/* footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex gap-3 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 text-sm font-semibold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDonation}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white text-sm font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 shadow-md shadow-red-500/20"
                >
                  {isSubmitting ? (
                    <FaSpinner className="animate-spin" size={13} />
                  ) : (
                    <FaHeart size={13} />
                  )}
                  {isSubmitting ? 'Confirming...' : 'Confirm Donation'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
