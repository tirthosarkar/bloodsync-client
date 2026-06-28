'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverFetch } from '@/lib/core/server';
import {
  FaSpinner,
  FaTint,
  FaMapMarkerAlt,
  FaCalendar,
  FaClock,
  FaEye,
  FaArrowDown,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import BloodRequestCard from '@/components/shared/BloodRequestCard';

export default function PublicRequestsClient({ isLoggedIn }) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Pagination State (Client-side)
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 initially
  const itemsPerPage = 6;

  // Fetch pending requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        // ✅ Correctly matching your backend route
        const data = await serverFetch('/api/donation-requests');
        setRequests(data);
      } catch (error) {
        toast.error('Failed to load donation requests');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Handle View Button Click
  const handleViewDetails = id => {
    if (!isLoggedIn) {
      toast.info('Please log in to view the details of this request.');
      router.push('/auth/signin');
      return;
    }
    router.push(`/donation-requests/${id}`);
  };

  // Handle Load More
  const handleLoadMore = () => {
    setLoadingMore(true);
    // Simulate a tiny delay for UX
    setTimeout(() => {
      setVisibleCount(prev => prev + itemsPerPage);
      setLoadingMore(false);
    }, 500);
  };

  // Slice the array based on visibleCount
  const visibleRequests = requests.slice(0, visibleCount);
  const hasMoreRequests = visibleCount < requests.length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-4">
          <FaTint className="text-red-400 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Pending Requests
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          There are currently no pending blood donation requests. Check back
          later or create a request if you need blood.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Grid of Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleRequests.map(req => (
          <BloodRequestCard
            key={req._id}
            req={req}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* ── Load More Button ── */}
      {hasMoreRequests && (
        <div className="flex justify-center pt-4 pb-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-200 text-red-600 rounded-lg font-medium hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {loadingMore ? (
              <>
                <FaSpinner className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <FaArrowDown size={14} />
                Load More
              </>
            )}
          </button>
        </div>
      )}

      {/* ── End of List Message ── */}
      {!hasMoreRequests && requests.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-400 text-sm">
            You&apos;ve reached the end of the list.
          </p>
        </div>
      )}
    </div>
  );
}
