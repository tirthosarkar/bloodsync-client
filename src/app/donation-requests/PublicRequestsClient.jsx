'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { serverFetch } from '@/lib/core/server';
import {
  FaSpinner,
  FaTint,
  FaArrowDown,
  FaMapMarkerAlt,
  FaCalendar,
  FaEye,
} from 'react-icons/fa';

import BloodRequestCard from '@/components/shared/BloodRequestCard';
import { showToast } from '@/utils/toast';

export default function PublicRequestsClient({ isLoggedIn }) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const data = await serverFetch('/api/donation-requests');
        setRequests(data);
      } catch (error) {
        showToast.error('Failed to load', 'Could not load donation requests.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleViewDetails = id => {
    if (!isLoggedIn) {
      showToast.info(
        'Login required',
        'Please log in to view request details.',
      );
      router.push('/auth/signin');
      return;
    }
    router.push(`/donation-requests/${id}`);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + itemsPerPage);
      setLoadingMore(false);
    }, 500);
  };

  const visibleRequests = requests.slice(0, visibleCount);
  const hasMoreRequests = visibleCount < requests.length;

  // ── Loading ──
  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );

  // ── Empty ──
  if (requests.length === 0)
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-red-50 rounded-full mb-5">
          <FaTint className="text-red-400 text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No Pending Requests
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          There are no active blood donation requests right now. Check back
          later.
        </p>
      </div>
    );

  return (
    <div className="space-y-6">
      {/* ── Stats Strip ── */}
      <div className="grid grid-cols-3 divide-x divide-gray-100 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden max-w-xl mx-auto">
        {[
          {
            num: requests.length,
            label: 'Pending Requests',
            color: 'text-red-600',
          },
          {
            num: [...new Set(requests.map(r => r.bloodGroup))].length,
            label: 'Blood Groups',
            color: 'text-red-500',
          },
          {
            num: [...new Set(requests.map(r => r.recipientDistrictName))]
              .length,
            label: 'Districts',
            color: 'text-red-400',
          },
        ].map((s, i) => (
          <div key={i} className="py-4 text-center">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.num}</p>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── Result count ── */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{' '}
          <span className="font-semibold text-gray-700">
            {visibleRequests.length}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-gray-700">{requests.length}</span>{' '}
          requests
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visibleRequests.map(req => (
          <BloodRequestCard
            key={req._id}
            req={req}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* ── Load More ── */}
      {hasMoreRequests && (
        <div className="flex justify-center pt-2 pb-8">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 px-7 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl font-semibold text-sm hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 shadow-sm"
          >
            {loadingMore ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaArrowDown size={13} />
            )}
            {loadingMore ? 'Loading...' : 'Load More Requests'}
          </button>
        </div>
      )}

      {/* ── End message ── */}
      {!hasMoreRequests && requests.length > 0 && (
        <p className="text-center text-gray-300 text-xs pb-6">
          You&apos;ve seen all {requests.length} requests
        </p>
      )}
    </div>
  );
}
