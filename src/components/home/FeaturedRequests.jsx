// src/components/home/FeaturedRequests.jsx
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import BloodRequestCard from '@/components/shared/BloodRequestCard';
import FeaturedRequestsClient from './FeaturedRequestsClient';

async function getFeaturedRequests() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/donation-requests`,
      { next: { revalidate: 60 } },
    );
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 6) : [];
  } catch {
    return [];
  }
}

export default async function FeaturedRequests({ isLoggedIn }) {
  const requests = await getFeaturedRequests();

  if (requests.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <span className="inline-block text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">
              Urgent Needs
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured <span className="text-red-600">Blood Requests</span>
            </h2>
            <p className="text-gray-500 mt-1 text-sm sm:text-base">
              These patients need your help right now.
            </p>
          </div>
          <Link
            href="/donation-requests"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-red-200 text-red-600 rounded-xl text-sm font-medium hover:bg-red-50 hover:border-red-300 transition-all shrink-0"
          >
            View All Requests
            <FaArrowRight size={13} />
          </Link>
        </div>

        {/* Cards Grid */}
        <FeaturedRequestsClient requests={requests} isLoggedIn={isLoggedIn} />
      </div>
    </section>
  );
}
