'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverFetch, serverMutation } from '@/lib/core/server';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSpacer,
  FaSpinner,
  FaArrowRight,
  FaHeartbeat,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaExclamationTriangle,
  FaEllipsisV,
} from 'react-icons/fa';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { showToast } from '@/utils/toast';
import Skeleton from '@/components/shared/LoadingUi/Skeleton';

export default function DonorDashboardClient({ userId }) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Context Menu State
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Global click listener to safely handle closing dropdowns anywhere on the screen
  useEffect(() => {
    function handleClickOutside(event) {
      // If click is outside any action menu trigger/dropdown, close it
      if (!event.target.closest('.action-menu-container')) {
        setActiveDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        showToast.error('Failed to load donation requests');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userId]);

  // 2. Handle Status Update (Done / Canceled)
  const handleStatusUpdate = async (requestId, newStatus) => {
    setActiveDropdownId(null);
    try {
      const session = await authClient.getSession();
      const userId = session?.user?.id || session?.data?.user?.id;
      const role = session?.user?.role || session?.data?.user?.role;

      const response = await serverMutation(
        `/api/donation-requests/${requestId}`,
        { status: newStatus, userId, role },
        'PATCH',
      );

      if (response.success) {
        showToast.success(`Request marked as ${newStatus}!`);

        const updatedData = await serverFetch(
          `/api/donation-requests/recent/${userId}`,
        );
        setRequests(updatedData);
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to update status');
    }
  };

  // 3. Open Delete Confirmation Modal
  const openDeleteModal = requestId => {
    setActiveDropdownId(null);
    setDeletingRequestId(requestId);
    setIsDeleteModalOpen(true);
  };

  // 4. Handle Delete Request
  const handleDeleteConfirm = async () => {
    if (!deletingRequestId) return;

    try {
      setIsDeleting(true);
      const session = await authClient.getSession();
      const userId = session?.data?.user?.id || session?.user?.id;
      const role = session?.data?.user?.role || session?.user?.role;

      if (!userId) {
        showToast.error('User ID not found. Please log in again.');
        setIsDeleting(false);
        return;
      }

      const response = await serverMutation(
        `/api/donation-requests/${deletingRequestId}`,
        { userId, role },
        'DELETE',
      );

      if (response.success) {
        showToast.success('Request deleted successfully');
        setRequests(prev => prev.filter(req => req._id !== deletingRequestId));
        setIsDeleteModalOpen(false);
        setDeletingRequestId(null);
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to delete request');
    } finally {
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingRequestId(null);
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };

  // Status Badge Helper
  const getStatusBadge = status => {
    const config = {
      pending: {
        color: 'bg-amber-50 text-amber-700 border-amber-200/60',
        icon: <FaClock className="text-[10px]" />,
      },
      inprogress: {
        color: 'bg-blue-50 text-blue-700 border-blue-200/60',
        icon: <FaSpinner className="text-[10px] animate-spin" />,
      },
      done: {
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        icon: <FaCheckCircle className="text-[10px]" />,
      },
      canceled: {
        color: 'bg-slate-50 text-slate-600 border-slate-200/60',
        icon: <FaTimesCircle className="text-[10px]" />,
      },
    };
    return config[status] || config.pending;
  };

  if (loading) {
    return <Skeleton />;
  }

  if (requests.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-10 text-center max-w-xl mx-auto shadow-sm">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
          <FaHeartbeat className="text-red-500 text-2xl" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1.5">
          No Donation Requests Yet
        </h3>
        <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto leading-relaxed">
          You haven&apos;t created any requests yet. Start your journey by
          publishing an active request.
        </p>
        <Link
          href="/dashboard/donor"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition shadow-sm"
        >
          Go to Dashboard
          <FaArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-visible min-w-0">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center flex-wrap gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Recent Donation Requests
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Manage and track your active clinical files
            </p>
          </div>
          <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full shrink-0">
            {requests.length} Requests Total
          </span>
        </div>

        {/* DESKTOP TABLE VIEW */}
        <div className="hidden lg:block w-full overflow-visible">
          <table className="w-full text-sm text-left text-gray-600 border-collapse">
            <thead className="text-[11px] text-gray-400 font-bold uppercase tracking-wider bg-gray-50/70 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Recipient</th>
                <th className="px-6 py-3.5 hidden xl:table-cell">Location</th>
                <th className="px-6 py-3.5 hidden xl:table-cell">Schedule</th>
                <th className="px-6 py-3.5">Group</th>
                <th className="px-6 py-3.5">Status Info</th>
                <th className="px-6 py-3.5 text-right w-20">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {requests.map(req => {
                const statusBadge = getStatusBadge(req.status);
                const isDropdownOpen = activeDropdownId === req._id;

                return (
                  <tr
                    key={req._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-gray-900 truncate max-w-[180px]">
                          {req.recipientName}
                        </span>
                        <span className="text-xs text-gray-400 xl:hidden mt-0.5 truncate max-w-[180px]">
                          {req.recipientDistrictName},{' '}
                          {req.recipientUpazilaName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <div className="flex flex-col text-xs">
                        <span className="text-gray-800 font-medium">
                          {req.recipientDistrictName}
                        </span>
                        <span className="text-gray-400 mt-0.5">
                          {req.recipientUpazilaName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden xl:table-cell">
                      <div className="flex flex-col text-xs">
                        <span className="text-gray-800 font-medium">
                          {new Date(req.donationDate).toLocaleDateString(
                            undefined,
                            { month: 'short', day: 'numeric', year: 'numeric' },
                          )}
                        </span>
                        <span className="text-gray-400 mt-0.5">
                          {req.donationTime}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-100 w-fit">
                          {req.bloodGroup}
                        </span>
                        <span className="text-[11px] text-gray-400 xl:hidden">
                          {new Date(req.donationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadge.color}`}
                        >
                          {statusBadge.icon}
                          <span className="capitalize">{req.status}</span>
                        </span>

                        {req.status === 'inprogress' && req.donorName && (
                          <div className="flex flex-col  items-center gap-1 text-[11px] text-blue-700 bg-blue-50/60 px-2 py-0.5 rounded border border-blue-100 max-w-[220px]">
                            <div className="flex  items-center gap-1">
                              <FaUser
                                className="text-blue-500 shrink-0"
                                size={9}
                              />
                              <span className="font-semibold truncate">
                                {req.donorName}
                              </span>
                            </div>
                            <span className="font-semibold">
                              {req.donorEmail}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* FIXED: isolated relative inline-block container */}
                    <td className="px-6 py-4 text-right">
                      <div className="relative inline-block text-left action-menu-container">
                        <button
                          onClick={e => toggleDropdown(req._id, e)}
                          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                        >
                          <FaEllipsisV size={14} />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 origin-top-right whitespace-nowrap">
                            <button
                              onClick={() => {
                                setActiveDropdownId(null);
                                router.push(`/donation-requests/${req._id}`);
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                            >
                              <FaEye size={12} className="text-gray-400" /> View
                              Details
                            </button>
                            <button
                              onClick={() => {
                                setActiveDropdownId(null);
                                router.push(
                                  `/dashboard/edit-donation-request/${req._id}`,
                                );
                              }}
                              className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                            >
                              <FaEdit size={12} className="text-gray-400" />{' '}
                              Edit Entry
                            </button>

                            {req.status === 'inprogress' && (
                              <>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'done')
                                  }
                                  className="w-full text-left px-4 py-2.5 text-xs text-emerald-700 hover:bg-emerald-50/60 flex items-center gap-2 font-semibold cursor-pointer"
                                >
                                  <FaCheckCircle size={12} /> Mark Finished
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'canceled')
                                  }
                                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-semibold cursor-pointer"
                                >
                                  <FaTimesCircle size={12} /> Cancel Request
                                </button>
                              </>
                            )}

                            <div className="border-t border-gray-100 my-1" />
                            <button
                              onClick={() => openDeleteModal(req._id)}
                              className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold cursor-pointer"
                            >
                              <FaTrash size={12} /> Delete Permanently
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

        {/* MOBILE CARD VIEW */}
        <div className="block lg:hidden divide-y divide-gray-100">
          {requests.map(req => {
            const statusBadge = getStatusBadge(req.status);
            const isDropdownOpen = activeDropdownId === req._id;

            return (
              <div key={req._id} className="p-4 space-y-3 relative">
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {req.recipientName}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {req.recipientDistrictName}, {req.recipientUpazilaName}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 relative inline-block text-left action-menu-container">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-100 align-middle">
                      {req.bloodGroup}
                    </span>

                    <button
                      onClick={e => toggleDropdown(req._id, e)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 rounded cursor-pointer align-middle"
                    >
                      <FaEllipsisV size={13} />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 top-7 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 text-xs whitespace-nowrap">
                        <button
                          onClick={() => {
                            setActiveDropdownId(null);
                            router.push(`/donation-requests/${req._id}`);
                          }}
                          className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                        >
                          <FaEye size={12} className="text-gray-400" /> View
                          Details
                        </button>
                        <button
                          onClick={() => {
                            setActiveDropdownId(null);
                            router.push(
                              `/dashboard/edit-donation-request/${req._id}`,
                            );
                          }}
                          className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                        >
                          <FaEdit size={12} className="text-gray-400" /> Edit
                          Request
                        </button>
                        {req.status === 'inprogress' && (
                          <>
                            <div className="border-t border-gray-100 my-1" />
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'done')
                              }
                              className="w-full text-left px-4 py-2.5 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-semibold cursor-pointer"
                            >
                              <FaCheckCircle size={12} /> Mark Done
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(req._id, 'canceled')
                              }
                              className="w-full text-left px-4 py-2.5 text-gray-600 hover:bg-gray-50 flex items-center gap-2 font-semibold cursor-pointer"
                            >
                              <FaTimesCircle size={12} /> Cancel
                            </button>
                          </>
                        )}
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={() => openDeleteModal(req._id)}
                          className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold cursor-pointer"
                        >
                          <FaTrash size={12} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                  <span>
                    📅 {new Date(req.donationDate).toLocaleDateString()}
                  </span>
                  <span>⏰ {req.donationTime}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${statusBadge.color}`}
                  >
                    {statusBadge.icon}
                    <span className="capitalize">{req.status}</span>
                  </span>

                  {req.status === 'inprogress' && req.donorName && (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-[11px] text-gray-400 max-w-[150px] truncate ">
                        Donor: {req.donorName}
                      </span>
                      <span className="text-[11px] text-gray-400 max-w-[150px] ">
                        Donor: {req.donorEmail}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPONENT FOOTER */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
          <Link
            href="/dashboard/my-donation-requests"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg text-xs font-semibold transition shadow-2xs"
          >
            View All Requests
            <FaArrowRight size={11} className="text-gray-400" />
          </Link>
        </div>
      </div>

      {/* FIXED: CONFIRMATION DELETION MODAL WITH GLOBAL SCREEN ESCAPE LAYER */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 border border-gray-100"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <FaExclamationTriangle size={16} />
              </div>
              <h3 className="text-base font-bold text-gray-900">
                Delete Request
              </h3>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Are you sure you want to remove this donation request? This setup
              profile cannot be recovered once purged from clinical nodes.
            </p>

            <div className="flex gap-2 justify-end text-xs font-semibold pt-2">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="px-4 py-2 border border-gray-200 hover:bg-gray-50 rounded-lg text-gray-600 transition disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <FaSpinner className="animate-spin" size={11} />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash size={11} /> Delete Request
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
