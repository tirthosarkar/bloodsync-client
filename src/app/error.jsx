'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-8">
      {/* Top accent line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 via-red-600 to-red-400" />

      {/* Icon */}
      <div className="relative flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#dc2626"
            className="w-14 h-14"
          >
            <path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z" />
          </svg>
        </div>
        {/* Error badge */}
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center gap-2 text-center max-w-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Something Went Wrong
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          An unexpected error occurred on{' '}
          <span className="text-red-600 font-semibold">BloodSync</span>.
          Don&apos;t worry — your data is safe. Please try again or return to
          the home page.
        </p>
        {/* Error message */}
        {error?.message && (
          <div className="mt-2 w-full bg-red-50 border border-red-100 rounded-lg px-4 py-3">
            <p className="text-xs text-red-400 font-mono break-words">
              {error.message}
            </p>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <div className="flex-1 h-px bg-red-100" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fca5a5"
          className="w-4 h-4"
        >
          <path d="M12 2C12 2 4 10.5 4 15.5a8 8 0 0016 0C20 10.5 12 2 12 2z" />
        </svg>
        <div className="flex-1 h-px bg-red-100" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={reset}
          className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors duration-200 shadow-sm"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-2.5 border border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-colors duration-200 text-center"
        >
          Back to Home
        </Link>
      </div>

      {/* Bottom tagline */}
      <p className="text-xs text-gray-300 tracking-widest uppercase">
        BloodSync · Saving Lives Together
      </p>
    </div>
  );
}
