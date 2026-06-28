import Link from 'next/link';
import { FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import FeaturedRequestsClient from './FeaturedRequestsClient';

async function getFeaturedRequests() {
  try {
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!serverUrl) {
      console.error('Server URL not configured');
      return [];
    }

    const res = await fetch(`${serverUrl}/api/donation-requests`, {
      next: {
        revalidate: 60, // Revalidate every minute
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch requests: ${res.status}`);
      return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 9) : [];
  } catch (error) {
    console.error('Error fetching featured requests:', error);
    return [];
  }
}

export default async function FeaturedRequests({ isLoggedIn }) {
  const requests = await getFeaturedRequests();

  if (!requests.length) return null;

  return (
    <section className="bg-linear-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end md:gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block h-1.5 w-8 rounded-full bg-red-600" />
              <span className="text-xs font-semibold uppercase tracking-[3px] text-red-600">
                Urgent Needs
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Featured{' '}
              <span className="bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Blood Requests
              </span>
            </h2>

            <p className="mt-2 text-gray-500 md:text-lg">
              These patients need your help right now. Every donation matters.
            </p>
          </div>

          {/* Action Group: Button & Responsive Carousel Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full md:w-auto self-start md:self-auto">
            <Link
              href="/donation-requests"
              className="group inline-flex items-center justify-center gap-2 rounded-full border-2 border-red-200 bg-white px-5 py-2.5 sm:px-8 sm:py-3.5 text-sm sm:text-base font-medium text-red-600 transition-all duration-300 hover:border-red-500 hover:bg-red-50 hover:shadow-lg active:scale-95 w-full sm:w-auto"
            >
              <span>View All Requests</span>
              <FaArrowRight
                className="transition-transform duration-300 group-hover:translate-x-1"
                size={14}
              />
            </Link>

            {/* Custom Navigation Arrows positioned right next to/below the button */}
            <div className="flex items-center justify-center gap-2 self-center sm:self-auto">
              <button
                className="custom-swiper-prev flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-red-600 cursor-pointer shadow-sm"
                aria-label="Previous slide"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                className="custom-swiper-next flex h-10 w-10 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-red-600 cursor-pointer shadow-sm"
                aria-label="Next slide"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Cards Carousel */}
        <FeaturedRequestsClient requests={requests} isLoggedIn={isLoggedIn} />
      </div>
    </section>
  );
}
