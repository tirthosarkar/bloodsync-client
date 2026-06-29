import { getUserSession } from '@/lib/core/session';
import DonorDashboardClient from './DonorDashboardClient';
import { FaHeartbeat } from 'react-icons/fa';

export async function generateMetadata() {
  const user = await getUserSession();
  return {
    title: user ? `${user.name} - Dashboard` : 'Donor Dashboard',
    description: 'Manage your blood donation requests and activity.',
  };
}

export default async function DonorDashboardPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 font-medium">
        Please log in to view your dashboard.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Premium Welcome Banner */}
      <div className="relative bg-gradient-to-br from-red-600 to-red-900 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-xl shadow-red-950/10">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute right-16 -bottom-14 w-36 h-36 rounded-full bg-white/5" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-red-200 uppercase mb-1.5 opacity-80">
              Dashboard Overview
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-red-100">{user?.name}</span>!
              👋
            </h1>
            <p className="text-sm text-red-100/80 mt-1 max-w-xl">
              Your generosity can save lives. Check your recent donation
              requests or monitor activity below.
            </p>
          </div>

          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10 self-start sm:self-auto">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <FaHeartbeat className="text-white text-lg animate-pulse" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-red-200 font-bold">
                Donor
              </p>
              <h3 className="text-white font-bold text-sm">Blood Hero</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Client Component for Data Views */}
      <DonorDashboardClient userId={user.id} />
    </div>
  );
}
