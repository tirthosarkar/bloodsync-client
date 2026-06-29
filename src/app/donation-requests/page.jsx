import { getUserSession } from '@/lib/core/session';
import PublicRequestsClient from './PublicRequestsClient';

export async function generateMetadata() {
  return {
    title: 'Blood Donation Requests | BloodSync',
    description: 'Browse pending blood donation requests and help save lives.',
  };
}

export default async function PublicRequestsPage() {
  const user = await getUserSession();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ── Hero ── */}
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold tracking-widest px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3 h-3 fill-red-500" viewBox="0 0 24 24">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
          LIVE REQUESTS
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mt-2 tracking-tight">
          Blood <span className="text-red-600">Donation</span> Requests
        </h1>
        <p className="text-gray-500 mt-3 text-base max-w-lg mx-auto">
          Browse active requests and be the hero who saves a life today.
        </p>
      </div>

      <PublicRequestsClient isLoggedIn={!!user} />
    </div>
  );
}
