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
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'inprogress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'canceled', label: 'Canceled' },
];

export default function MyRequestsClient({ userId }) {
  const router = useRouter();

  // State for Data
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
  const limit = 10; // Requests per page

  // State for Filtering
  const [statusFilter, setStatusFilter] = useState('all');

  // Delete Modal States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Fetch requests with pagination & filter
  const fetchRequests = async (page = 1, status = 'all') => {
    try {
      setLoading(true);
      // Build the URL with query params
      let url = `/api/donation-requests/my-requests/${userId}?page=${page}&limit=${limit}`;
      if (status && status !== 'all') {
        url += `&status=${status}`;
      }

      const response = await serverFetch(url);

      if (response.success) {
        setRequests(response.data);
        setCurrentPage(response.pagination.currentPage);
        setTotalPages(response.pagination.totalPages);
        setTotalRequests(response.pagination.totalRequests);
      }
    } catch (error) {
      toast.error('Failed to load donation requests');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Fetch & Refetch on filter/page change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRequests(currentPage, statusFilter);
  }, [userId, currentPage, statusFilter]);

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
        // Refresh the current page data
        fetchRequests(currentPage, statusFilter);
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

  // 4. Handle Delete Request
  const handleDeleteConfirm = async () => {
    if (!deletingRequestId) return;

    try {
      setIsDeleting(true);
      const response = await serverMutation(
        `/api/donation-requests/${deletingRequestId}`,
        { userId: userId, role: 'donor' },
        'DELETE',
      );

      if (response.success) {
        toast.success('Request deleted successfully');
        // Refresh the current page data
        fetchRequests(currentPage, statusFilter);
        setIsDeleteModalOpen(false);
        setDeletingRequestId(null);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete request');
    } finally {
      setIsDeleting(false);
    }
  };

  // 5. Close Modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingRequestId(null);
  };

  // 6. Handle Filter Change
  const handleFilterChange = e => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  // 7. Handle Pagination
  const goToPage = page => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
      cancelled: {
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: <FaTimesCircle className="text-xs" />,
      },
    };
    return config[status] || config.pending;
  };

  if (loading && requests.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* ── Header & Filters ── */}
        <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-800">
              All My Requests
            </h2>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {totalRequests} total
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="status-filter"
              className="text-sm text-gray-600 font-medium"
            >
              Filter:
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={handleFilterChange}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
            >
              {STATUS_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Empty State ── */}
        {requests.length === 0 && !loading && (
          <div className="p-10 text-center">
            <p className="text-gray-500">
              No donation requests found matching the current filter.
            </p>
          </div>
        )}

        {/* ── Table ── */}
        {requests.length > 0 && (
          <>
            <div className="overflow-x-auto">
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
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusBadge.color}`}
                          >
                            {statusBadge.icon}
                            {req.status}
                          </span>
                          {req.status === 'inprogress' && req.donorName && (
                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 w-fit">
                              <FaUser className="text-blue-500" size={10} />
                              <span className="font-medium">
                                {req.donorName}
                              </span>
                              <span className="text-gray-400">
                                ({req.donorEmail})
                              </span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2 flex-wrap">
                            <button
                              onClick={() =>
                                router.push(
                                  `/dashboard/donor/edit-donation-request/${req._id}`,
                                )
                              }
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"
                              title="Edit"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={() => openDeleteModal(req._id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"
                              title="Delete"
                            >
                              <FaTrash size={16} />
                            </button>
                            <button
                              onClick={() =>
                                router.push(`/donation-requests/${req._id}`)
                              }
                              className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-md"
                              title="View Details"
                            >
                              <FaEye size={16} />
                            </button>
                            {req.status === 'inprogress' && (
                              <div className="flex gap-1 ml-1">
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'done')
                                  }
                                  className="px-2 py-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded"
                                >
                                  Done
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(req._id, 'canceled')
                                  }
                                  className="px-2 py-1 text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded"
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

            {/* ── Pagination Footer ── */}
            <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
              <span className="text-sm text-gray-600">
                Showing {(currentPage - 1) * limit + 1} -{' '}
                {Math.min(currentPage * limit, totalRequests)} of{' '}
                {totalRequests} requests
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft size={14} />
                </button>
                <span className="text-sm text-gray-700 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ── Delete Modal ── */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <FaExclamationTriangle className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Delete Request
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this donation request?
              <br />
              <span className="text-sm text-gray-400">
                This action cannot be undone.
              </span>
            </p>
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
