'use client';

import { useState, useEffect, useCallback } from 'react';
import { protectedFetch, serverFetch } from '@/lib/core/server';
import {
  FaUsers,
  FaMoneyBillWave,
  FaHandHoldingHeart,
  FaSpinner,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from 'recharts';

// ── Constants ──
const STATUS_COLORS = {
  Canceled: '#6b7280',
  Done: '#22c55e',
  Inprogress: '#3b82f6',
  Pending: '#f59e0b',
};
const FALLBACK_COLORS = ['#f59e0b', '#3b82f6', '#22c55e', '#6b7280', '#ef4444'];

const ROLE_BADGE = {
  admin: {
    label: 'Admin',
    cls: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  volunteer: {
    label: 'Volunteer',
    cls: 'bg-blue-50 text-blue-700 border-blue-200',
  },
};

// ── Pie label ──
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  viewBox,
}) => {
  if (percent < 0.05) return null;
  const R = Math.PI / 180;
  const r = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + r * Math.cos(-midAngle * R);
  const y = cy + r * Math.sin(-midAngle * R);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={viewBox?.width < 500 ? 10 : 12}
      fontWeight={600}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// ── Sub-components (all OUTSIDE main component) ──

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
        {children}
      </span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}

function StatCard({ icon, label, value, iconBg, iconColor, trend }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 flex items-center gap-4">
      <div
        className={`w-14 h-14 shrink-0 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-gray-900 break-all">
          {value}
        </p>
        {trend && <p className="text-xs text-gray-400 mt-0.5">{trend}</p>}
      </div>
    </div>
  );
}

function ChipBadge({ children }) {
  return (
    <span className="text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full bg-red-50 text-red-600 border border-red-100 whitespace-nowrap">
      {children}
    </span>
  );
}

function CardHeader({ title, sub, chip }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div>
        <h2 className="text-sm font-bold text-gray-900">{title}</h2>
        {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
      </div>
      {chip && <ChipBadge>{chip}</ChipBadge>}
    </div>
  );
}

function ProgressBar({ label, value, color, textColor }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-gray-500 font-medium">{label}</span>
        <span className={`font-bold ${textColor}`}>{value}%</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

// ── Main component ──
export default function DashboardClient({ user }) {
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalFunding: 0,
    totalRequests: 0,
  });
  const [statusData, setStatusData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pieRadius, setPieRadius] = useState(90);

  useEffect(() => {
    const onResize = () => setPieRadius(window.innerWidth < 640 ? 70 : 90);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isAdminOrVolunteer =
    user?.role === 'admin' || user?.role === 'volunteer';
  const rb = ROLE_BADGE[user?.role] || ROLE_BADGE.admin;

  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading(true);
      const [
        donorsRes,
        fundingRes,
        requestsRes,
        statusRes,
        weeklyRes,
        monthlyRes,
      ] = await Promise.all([
        serverFetch('/api/users/count'),
        protectedFetch('/api/funding/total'),
        serverFetch('/api/donation-requests/count'),
        serverFetch('/api/donation-requests/status-breakdown'),
        serverFetch('/api/donation-requests/weekly-stats'),
        serverFetch('/api/donation-requests/monthly-stats'),
      ]);

      setStats({
        totalDonors: donorsRes?.success ? donorsRes.count : 0,
        totalFunding: fundingRes?.success ? fundingRes.totalAmount : 0,
        totalRequests: requestsRes?.success ? requestsRes.count : 0,
      });
      setStatusData(statusRes?.success ? statusRes.data : []);
      setWeeklyData(weeklyRes?.success ? weeklyRes.data : []);
      setMonthlyData(monthlyRes?.success ? monthlyRes.data : []);
    } catch (err) {
      console.error(err);
      toast.error('Could not load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-100">
        <FaSpinner className="animate-spin text-red-600 text-4xl" />
      </div>
    );

  const formattedFunding = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(stats.totalFunding);

  const total = statusData.reduce((s, i) => s + i.value, 0);
  const doneVal = statusData.find(i => i.name === 'Done')?.value || 0;
  const pendVal = statusData.find(i => i.name === 'Pending')?.value || 0;
  const cancVal = statusData.find(i => i.name === 'Canceled')?.value || 0;
  const doneRate = total > 0 ? Math.round((doneVal / total) * 100) : 0;
  const pendRate = total > 0 ? Math.round((pendVal / total) * 100) : 0;
  const cancRate = total > 0 ? Math.round((cancVal / total) * 100) : 0;

  const tooltipStyle = {
    background: '#fff',
    border: '1px solid #f1f5f9',
    borderRadius: '10px',
    fontSize: '12px',
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ── Welcome Banner ── */}
      <div className="relative bg-linear-to-br from-red-600 to-red-900 rounded-2xl p-7 overflow-hidden mb-2">
        <div className="absolute -right-10 -top-10 w-52 h-52 rounded-full bg-white/5" />
        <div className="absolute right-16 -bottom-14 w-36 h-36 rounded-full bg-white/4" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-red-300 mb-2">
              DASHBOARD OVERVIEW
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              Welcome back, <span className="text-red-200">{user?.name}</span>!
              👋
            </h1>
            <p className="text-sm text-red-200/70 mt-2">
              {isAdminOrVolunteer
                ? "Here is an overview of your platform's activity."
                : 'Track your donation requests and help save lives.'}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border tracking-wider ${rb.cls}`}
          >
            🛡 {rb.label.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <SectionLabel>Platform Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard
          icon={<FaUsers size={24} />}
          label="Total Donors"
          value={stats.totalDonors.toLocaleString()}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
          trend="Registered blood donors"
        />
        <StatCard
          icon={<FaMoneyBillWave size={24} />}
          label="Total Funding"
          value={formattedFunding}
          iconBg="bg-green-50"
          iconColor="text-green-600"
          trend="All-time platform funding"
        />
        <StatCard
          icon={<FaHandHoldingHeart size={24} />}
          label="Blood Requests"
          value={stats.totalRequests.toLocaleString()}
          iconBg="bg-red-50"
          iconColor="text-red-600"
          trend="Total donation requests"
        />
      </div>

      {/* ── Charts — Admin & Volunteer only ── */}
      {isAdminOrVolunteer && (
        <>
          {/* Pie + Bar */}
          <SectionLabel>Analytics</SectionLabel>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Pie */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <CardHeader
                title="Request Status"
                sub="Distribution by status"
                chip="ALL TIME"
              />
              <div className="h-50 md:h-55">
                {statusData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={pieRadius}
                        dataKey="value"
                        labelLine={false}
                        label={renderCustomLabel}
                      >
                        {statusData.map((entry, i) => (
                          <Cell
                            key={i}
                            fill={
                              STATUS_COLORS[entry.name] ??
                              FALLBACK_COLORS[i % FALLBACK_COLORS.length]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v, n) => [`${v} requests`, n]}
                        contentStyle={tooltipStyle}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-300 text-sm">No data yet.</p>
                  </div>
                )}
              </div>
              {statusData.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-50">
                  {statusData.map((entry, i) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          background:
                            STATUS_COLORS[entry.name] ??
                            FALLBACK_COLORS[i % FALLBACK_COLORS.length],
                        }}
                      />
                      <span className="text-xs text-gray-500 truncate">
                        {entry.name}
                      </span>
                      <span className="ml-auto text-xs font-bold text-gray-800">
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <CardHeader
                title="Weekly Requests"
                sub="Requests in the last 7 days"
                chip="LAST 7 DAYS"
              />
              <div className="h-55 md:h-60">
                {weeklyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData} barCategoryGap="35%">
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f9fafb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        formatter={v => [`${v} requests`, 'Count']}
                        contentStyle={tooltipStyle}
                        cursor={{ fill: '#fef2f2' }}
                      />
                      <Bar
                        dataKey="count"
                        fill="#dc2626"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-300 text-sm">
                      No activity in the last 7 days.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Line + Quick Stats */}
          <SectionLabel>Trends & Activity</SectionLabel>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Line Chart */}
            <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <CardHeader
                title="Monthly Trend"
                sub="Requests by status over last 6 months"
                chip="6 MONTHS"
              />
              <div className="h-55 md:h-60">
                {monthlyData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f9fafb"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: '#9ca3af', fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={tooltipStyle}
                        cursor={{ stroke: '#f1f5f9' }}
                      />
                      <Legend
                        wrapperStyle={{ fontSize: '11px', paddingTop: '14px' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="inprogress"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="done"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="canceled"
                        stroke="#9ca3af"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                        strokeDasharray="4 4"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-1">
                    <p className="text-gray-300 text-sm">
                      Not enough data yet.
                    </p>
                    <p className="text-gray-200 text-xs">
                      Appears after 1+ months of activity.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col">
              <div className="mb-5">
                <h2 className="text-sm font-bold text-gray-900">Quick Stats</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Derived from all-time data
                </p>
              </div>

              <div className="space-y-4">
                <ProgressBar
                  label="Completion Rate"
                  value={doneRate}
                  color="bg-green-500"
                  textColor="text-green-600"
                />
                <ProgressBar
                  label="Pending Rate"
                  value={pendRate}
                  color="bg-amber-400"
                  textColor="text-amber-600"
                />
                <ProgressBar
                  label="Cancellation Rate"
                  value={cancRate}
                  color="bg-gray-400"
                  textColor="text-gray-500"
                />
              </div>

              <div className="mt-auto pt-5 border-t border-gray-50 space-y-3">
                {[
                  {
                    label: 'Avg per day',
                    val:
                      stats.totalRequests > 0
                        ? (stats.totalRequests / 30).toFixed(1)
                        : '0',
                    cls: 'text-red-600',
                  },
                  {
                    label: 'Total donors',
                    val: stats.totalDonors.toLocaleString(),
                    cls: 'text-blue-600',
                  },
                  {
                    label: 'Total funding',
                    val: formattedFunding,
                    cls: 'text-green-600',
                  },
                ].map(item => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs text-gray-400">{item.label}</span>
                    <span className={`text-xs font-bold ${item.cls}`}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
