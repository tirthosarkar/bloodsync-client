'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverFetch, serverMutation } from '@/lib/core/server';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaArrowRight,
  FaHeartbeat,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function DonorDashboardClient({ userId }) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch recent requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await serverFetch(
          `/api/donation-requests/recent/${userId}`,
        );
        setRequests(data);
      } catch (error) {
        toast.error('Failed to load donation requests');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  // 2. Handle Status Update (Done / Canceled)
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await serverMutation(
        `/api/donation-requests/${requestId}`,
        { status: newStatus },
        'PATCH',
      );

      if (response.success) {
        toast.success(`Request marked as ${newStatus}!`);
        setRequests(prev =>
          prev.map(req =>
            req._id === requestId ? { ...req, status: newStatus } : req,
          ),
        );
      }
    } catch (error) {
      toast.error(error.message || 'Failed to update status');
    }
  };

  // 3. Open Delete Confirmation Modal
  const openDeleteModal = requestId => {
    setDeletingRequestId(requestId);
    setIsDeleteModalOpen(true);
  };

  // 4. Handle Delete Request (Called from Modal)
  const handleDeleteConfirm = async () => {
    if (!deletingRequestId) return;

    try {
      setIsDeleting(true);
      const response = await serverMutation(
        `/api/donation-requests/${deletingRequestId}`,
        {},
        'DELETE',
      );

      if (response.success) {
        toast.success('Request deleted successfully');
        setRequests(prev => prev.filter(req => req._id !== deletingRequestId));
        setIsDeleteModalOpen(false);
        setDeletingRequestId(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete request');
    } finally {
      setIsDeleting(false);
    }
  };

  // 5. Close Modal without deleting
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingRequestId(null);
  };

  // ── Status Badge Helper ──
  const getStatusBadge = status => {
    const config = {
      pending: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: <FaClock className="text-xs" />,
      },
      inprogress: {
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: <FaSpinner className="text-xs animate-spin" />,
      },
      done: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: <FaCheckCircle className="text-xs" />,
      },
      canceled: {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <FaTimesCircle className="text-xs" />,
      },
    };
    return config[status] || config.pending;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  // ── ✅ EMPTY STATE UI ──
  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-4">
          <FaHeartbeat className="text-red-400 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Donation Requests Yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          You haven&apos;t created any donation requests. Start by creating your
          first request to help save a life.
        </p>

        <Link
          href="/dashboard/my-donation-requests"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
        >
          View My All Requests
          <FaArrowRight size={14} />
        </Link>
      </div>
    );
  }

  // ── DATA VIEW (Table + Mobile Cards) ──
  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Recent Donation Requests
          </h2>
          <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Showing {requests.length} recent
          </span>
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Recipient</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Date & Time</th>
                <th className="px-6 py-3">Blood Group</th>
                <th className="px-6 py-3">Status & Donor</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map(req => {
                const statusBadge = getStatusBadge(req.status);
                return (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {req.recipientName}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-700">
                          {req.recipientDistrictName}
                        </span>
                        <span className="text-xs text-gray-400">
                          {req.recipientUpazilaName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-700">
                          {new Date(req.donationDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-400">
                          {req.donationTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                        {req.bloodGroup}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {/* Status Badge */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}
                      >
                        {statusBadge.icon}
                        {req.status}
                      </span>

                      {/* Donor Information (Only shows if status is inprogress) */}
                      {req.status === 'inprogress' && req.donorName && (
                        <div className="mt-1 flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 w-fit">
                          <FaUser className="text-blue-500" size={10} />
                          <span className="font-medium">{req.donorName}</span>
                          <span className="text-gray-400">
                            ({req.donorEmail})
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {/* EDIT Button */}
                        <button
                          onClick={() =>
                            router.push(
                              `/dashboard/edit-donation-request/${req._id}`,
                            )
                          }
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Request"
                        >
                          <FaEdit size={16} />
                        </button>

                        {/* DELETE Button (Opens Modal) */}
                        <button
                          onClick={() => openDeleteModal(req._id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Request"
                        >
                          <FaTrash size={16} />
                        </button>

                        {/* VIEW Button */}
                        <button
                          onClick={() =>
                            router.push(`/donation-requests/${req._id}`)
                          }
                          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>

                        {/* DONE / CANCEL Buttons (✅ Only show if status === 'inprogress') */}
                        {req.status === 'inprogress' && (
                          <div className="flex gap-1 ml-1">
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'done')
                              }
                              className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 transition-colors"
                            >
                              Done
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'canceled')
                              }
                              className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="block md:hidden divide-y divide-gray-100">
          {requests.map(req => {
            const statusBadge = getStatusBadge(req.status);
            return (
              <div
                key={req._id}
                className="p-4 space-y-3 hover:bg-gray-50 transition-colors"
              >
                {/* Header: Name & Blood Group */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {req.recipientName}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {req.recipientDistrictName}, {req.recipientUpazilaName}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                    {req.bloodGroup}
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>
                    📅 {new Date(req.donationDate).toLocaleDateString()}
                  </span>
                  <span>⏰ {req.donationTime}</span>
                </div>

                {/* Status & Donor Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}
                    >
                      {statusBadge.icon}
                      {req.status}
                    </span>
                  </div>

                  {/* Donor Information (Only shows if status is inprogress) */}
                  {req.status === 'inprogress' && req.donorName && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-blue-50 px-3 py-1.5 rounded-md border border-blue-100 w-fit">
                      <FaUser className="text-blue-500" size={12} />
                      <span className="font-medium">{req.donorName}</span>
                      <span className="text-gray-400">({req.donorEmail})</span>
                    </div>
                  )}
                </div>

                {/* Mobile Actions */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                  {/* Done/Cancel Buttons (✅ Only show if status === 'inprogress') */}
                  {req.status === 'inprogress' && (
                    <div className="flex w-full gap-2 mb-1">
                      <button
                        onClick={() => handleStatusUpdate(req._id, 'done')}
                        className="flex-1 py-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded hover:bg-green-100 text-center"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(req._id, 'canceled')}
                        className="flex-1 py-1.5 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded hover:bg-red-100 text-center"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {/* Secondary Icons */}
                  <div className="flex gap-2 w-full justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/edit-donation-request/${req._id}`,
                          )
                        }
                        className="p-2 text-blue-600 bg-blue-50 rounded-md"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(req._id)}
                        className="p-2 text-red-600 bg-red-50 rounded-md"
                      >
                        <FaTrash size={14} />
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/donation-requests/${req._id}`)
                        }
                        className="p-2 text-gray-600 bg-gray-50 rounded-md"
                      >
                        <FaEye size={14} />
                      </button>
                    </div>
                    <span className="text-[10px] text-gray-400 self-center">
                      ID: {req._id.slice(-6)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
          <Link
            href="/dashboard/my-donation-requests"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
          >
            View My All Requests
            <FaArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ── ✅ CUSTOM DELETE CONFIRMATION MODAL ── */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <FaExclamationTriangle className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Request
              </h3>
            </div>

            {/* Modal Body */}
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this donation request?
              <br />
              <span className="text-sm text-gray-400">
                This action cannot be undone.
              </span>
            </p>

            {/* Modal Footer */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
              >
                {isDeleting ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash size={14} />
                    Delete Request
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
