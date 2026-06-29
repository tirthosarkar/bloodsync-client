'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverFetch, serverMutation } from '@/lib/core/server';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSpinner,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
  FaEllipsisV,
  FaCheck,
  FaBan,
  FaHeartbeat,
} from 'react-icons/fa';

import Skeleton from '@/components/shared/LoadingUi/Skeleton';
import { showToast } from '@/utils/toast';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'canceled', label: 'Canceled' },
];

export default function AllRequestsClient({ currentUserRole }) {
  const router = useRouter();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const limit = 10;

  const [statusFilter, setStatusFilter] = useState('all');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAdmin = currentUserRole === 'admin';

  // close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.action-menu-container')) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 1. Fetch
  const fetchRequests = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      let url = `/api/donation-requests/all?page=${page}&limit=${limit}`;
      if (status && status !== 'all') url += `&status=${status}`;
      const response = await serverFetch(url);
      if (response.success) {
        setRequests(response.data);
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalRequests(response.pagination.totalRequests);
      }
    } catch (error) {
      showToast.error('Failed to load donation requests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRequests(currentPage, statusFilter);
  }, [currentPage, statusFilter]);

  // 2. Status update
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await serverMutation(
        `/api/donation-requests/${requestId}`,
        { status: newStatus },
        'PATCH',
      );
      if (response.success) {
        showToast.success(`Request marked as ${newStatus}!`);
        fetchRequests(currentPage, statusFilter);
        setOpenDropdownId(null);
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to update status');
    }
  };

  // 3. Delete
  const handleDeleteConfirm = async () => {
    if (!deletingRequestId) return;
    try {
      setIsDeleting(true);
      const response = await serverMutation(
        `/api/donation-requests/admin-delete/${deletingRequestId}`,
        { role: 'admin' },
        'DELETE',
      );
      if (response.success) {
        showToast.success('Request deleted successfully');
        fetchRequests(currentPage, statusFilter);
        setIsDeleteModalOpen(false);
        setDeletingRequestId(null);
      }
    } catch (error) {
      showToast.error(error.message || 'Failed to delete request');
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteModal = requestId => {
    setDeletingRequestId(requestId);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingRequestId(null);
  };

  const handleFilterChange = e => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
    setOpenDropdownId(null);
  };

  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setOpenDropdownId(null);
    }
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  // Status badge
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

  if (loading && requests.length === 0) return <Skeleton />;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-visible min-w-0">
        {/* ── Header & Filter ── */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Donation Requests
            </h2>
            {/* <p className="text-xs text-gray-500 mt-0.5">
              {isAdmin
                ? "Manage all donation requests across the platform"
                : "View and update donation request statuses"}
            </p> */}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <span className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full shrink-0">
              {totalRequests} total
            </span>
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="flex-1 sm:flex-none px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-700"
            >
              {STATUS_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Empty State ── */}
        {requests.length === 0 && !loading && (
          <div className="p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-4">
              <FaHeartbeat className="text-red-500 text-2xl" />
            </div>
            <p className="text-gray-500 text-sm">
              No donation requests found matching the current filter.
            </p>
          </div>
        )}

        {requests.length > 0 && (
          <>
            {/* ── DESKTOP TABLE ── */}
            <div className="hidden lg:block w-full overflow-visible">
              <table className="w-full text-sm text-left text-gray-600 border-collapse">
                <thead className="text-[11px] text-gray-400 font-bold uppercase tracking-wider bg-gray-50/70 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3.5">Recipient</th>
                    <th className="px-6 py-3.5 hidden xl:table-cell">
                      Location
                    </th>
                    <th className="px-6 py-3.5 hidden xl:table-cell">
                      Schedule
                    </th>
                    <th className="px-6 py-3.5">Group</th>
                    <th className="px-6 py-3.5">Status Info</th>
                    <th className="px-6 py-3.5 text-right w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {requests.map(req => {
                    const statusBadge = getStatusBadge(req.status);
                    const isDropdownOpen = openDropdownId === req._id;
                    return (
                      <tr
                        key={req._id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        {/* Recipient */}
                        <td className="px-6 py-4">
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

                        {/* Location */}
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

                        {/* Schedule */}
                        <td className="px-6 py-4 hidden xl:table-cell">
                          <div className="flex flex-col text-xs">
                            <span className="text-gray-800 font-medium">
                              {new Date(req.donationDate).toLocaleDateString(
                                undefined,
                                {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                            <span className="text-gray-400 mt-0.5">
                              {req.donationTime}
                            </span>
                          </div>
                        </td>

                        {/* Blood Group */}
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

                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1.5 items-start">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadge.color}`}
                            >
                              {statusBadge.icon}
                              <span className="capitalize">{req.status}</span>
                            </span>
                            {req.status === 'inprogress' && req.donorName && (
                              <div className="mt-1 flex-row items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 w-fit inline-flex">
                                <FaUser
                                  className="text-blue-500 shrink-0"
                                  size={10}
                                />
                                <span className="font-medium">
                                  {req.donorName}
                                </span>
                                <span className="text-gray-400">
                                  ({req.donorEmail})
                                </span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
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
                                {/* View — always */}
                                <button
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    router.push(
                                      `/donation-requests/${req._id}`,
                                    );
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                >
                                  <FaEye size={12} className="text-gray-400" />{' '}
                                  View Details
                                </button>

                                {/* Edit & Delete — admin only */}
                                {isAdmin && (
                                  <>
                                    <button
                                      onClick={() => {
                                        setOpenDropdownId(null);
                                        router.push(
                                          `/dashboard/edit-donation-request/${req._id}`,
                                        );
                                      }}
                                      className="w-full text-left px-4 py-2.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                    >
                                      <FaEdit
                                        size={12}
                                        className="text-gray-400"
                                      />{' '}
                                      Edit Entry
                                    </button>
                                    <div className="border-t border-gray-100 my-1" />
                                    <button
                                      onClick={() => openDeleteModal(req._id)}
                                      className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold cursor-pointer"
                                    >
                                      <FaTrash size={12} /> Delete Permanently
                                    </button>
                                  </>
                                )}

                                {/* Done & Cancel — inprogress only */}
                                {req.status === 'inprogress' && (
                                  <>
                                    <div className="border-t border-gray-100 my-1" />
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(req._id, 'done')
                                      }
                                      className="w-full text-left px-4 py-2.5 text-xs text-emerald-700 hover:bg-emerald-50/60 flex items-center gap-2 font-semibold cursor-pointer"
                                    >
                                      <FaCheck size={12} /> Mark Finished
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusUpdate(req._id, 'canceled')
                                      }
                                      className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-semibold cursor-pointer"
                                    >
                                      <FaBan size={12} /> Cancel Request
                                    </button>
                                  </>
                                )}
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

            {/* ── MOBILE CARD VIEW ── */}
            <div className="block lg:hidden divide-y divide-gray-100">
              {requests.map(req => {
                const statusBadge = getStatusBadge(req.status);
                const isDropdownOpen = openDropdownId === req._id;
                return (
                  <div key={req._id} className="p-4 space-y-3 relative">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm truncate">
                          {req.recipientName}
                        </h3>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {req.recipientDistrictName},{' '}
                          {req.recipientUpazilaName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 relative inline-block text-left action-menu-container">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-red-50 text-red-700 border border-red-100">
                          {req.bloodGroup}
                        </span>
                        <button
                          onClick={e => toggleDropdown(req._id, e)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded cursor-pointer"
                        >
                          <FaEllipsisV size={13} />
                        </button>
                        {isDropdownOpen && (
                          <div className="absolute right-0 top-7 w-44 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-50 text-xs whitespace-nowrap">
                            <button
                              onClick={() => {
                                setOpenDropdownId(null);
                                router.push(`/donation-requests/${req._id}`);
                              }}
                              className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                            >
                              <FaEye size={12} className="text-gray-400" /> View
                              Details
                            </button>
                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => {
                                    setOpenDropdownId(null);
                                    router.push(
                                      `/dashboard/edit-donation-request/${req._id}`,
                                    );
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                >
                                  <FaEdit size={12} className="text-gray-400" />{' '}
                                  Edit Entry
                                </button>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                  onClick={() => openDeleteModal(req._id)}
                                  className="w-full text-left px-4 py-2.5 text-red-600 hover:bg-red-50 flex items-center gap-2 font-semibold cursor-pointer"
                                >
                                  <FaTrash size={12} /> Delete Permanently
                                </button>
                              </>
                            )}
                            {req.status === 'inprogress' && (
                              <>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'done')
                                  }
                                  className="w-full text-left px-4 py-2.5 text-emerald-700 hover:bg-emerald-50 flex items-center gap-2 font-semibold cursor-pointer"
                                >
                                  <FaCheck size={12} /> Mark Finished
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'canceled')
                                  }
                                  className="w-full text-left px-4 py-2.5 text-slate-600 hover:bg-slate-50 flex items-center gap-2 font-semibold cursor-pointer"
                                >
                                  <FaBan size={12} /> Cancel Request
                                </button>
                              </>
                            )}
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
                        <div className="flex flex-col items-end gap-0.5">
                          <span className="text-[11px] text-gray-500 max-w-[150px] truncate">
                            Donor: {req.donorName}
                          </span>
                          <span className="text-[11px] text-gray-400 max-w-[150px] truncate">
                            {req.donorEmail}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── Pagination ── */}
            <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-3">
              <span className="text-xs text-gray-500">
                Showing{' '}
                {totalRequests === 0 ? 0 : (currentPage - 1) * limit + 1}–
                {Math.min(currentPage * limit, totalRequests)} of{' '}
                {totalRequests} requests
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft size={12} />
                </button>
                <span className="text-xs font-semibold text-gray-700 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Delete Modal ── */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-xs p-4">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 space-y-4 border border-gray-100"
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
              Are you sure you want to delete this donation request? This action
              cannot be undone.
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
                    <FaSpinner className="animate-spin" size={11} /> Deleting...
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
