'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaHandHoldingHeart,
  FaSearch,
  FaHeartbeat,
  FaShieldAlt,
  FaUsers,
  FaDonate,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';
import { BiDonateHeart } from 'react-icons/bi';
import { LuArrowRight } from 'react-icons/lu';

const Banner = ({ stats = {} }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const s = await authClient.getSession();
      const user = s?.data?.user || s?.user;
      setSession(s);
      setIsLoggedIn(!!user);
    };
    checkSession();
  }, []);

  const handleDonorJoin = () => {
    if (isLoggedIn) {
      const DASHBOARD_PATHS = {
        admin: '/dashboard',
        volunteer: '/dashboard',
        donor: '/dashboard/donor',
      };
      const role = session?.data?.user?.role || session?.user?.role;
      const path = DASHBOARD_PATHS[role?.toLowerCase()] || '/dashboard/donor';
      router.push(path);
    } else {
      router.push('/auth/register');
    }
  };
  return (
    <section className="relative min-h-screen bg-linear-to-br from-[#0a0f1a] via-[#1a1f2e] to-[#0d1117] flex items-center overflow-hidden pb-20 lg:pb-0">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-red-700/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content - Using max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Emergency Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-red-300">
                  Emergency Blood Service 24/7
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-3 lg:space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight tracking-tight">
                Every Drop of Blood
                <span className="block bg-linear-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                  Saves a Life
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-xl">
                Connect with donors instantly. Your small contribution can be
                someone&apos;s second chance at life. Join our community of
                life-savers today.
              </p>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
            >
              {[
                {
                  icon: FaUsers,
                  number: stats.totalDonors
                    ? `${stats.totalDonors.toLocaleString()}+`
                    : '...',
                  label: 'Donors',
                },
                {
                  icon: FaHeartbeat,
                  number: stats.totalRequests
                    ? `${stats.totalRequests.toLocaleString()}+`
                    : '...',
                  label: 'Requests Made',
                },
                {
                  icon: FaDonate,
                  number: stats.totalFunding
                    ? (() => {
                        const amount = stats.totalFunding;
                        if (amount >= 1000000)
                          return `$${(amount / 1000000).toFixed(1)}M`;
                        if (amount >= 1000)
                          return `$${(amount / 1000).toFixed(1)}K`;
                        return `$${Math.floor(amount)}`;
                      })()
                    : '...',
                  label: 'Total Funded',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-4 lg:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default"
                >
                  <stat.icon className="text-red-500 text-xl sm:text-2xl lg:text-3xl mx-auto mb-1 lg:mb-2" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0.5 lg:mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 lg:gap-4"
            >
              <button
                onClick={handleDonorJoin}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 lg:py-4 bg-linear-to-r from-red-600 to-red-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <FaHandHoldingHeart className="text-lg sm:text-xl" />
                Join as a Donor
                <LuArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 lg:py-4 border-2 border-white/20 text-white font-semibold text-sm sm:text-base rounded-xl backdrop-blur-sm hover:border-white/40 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <FaSearch className="text-base sm:text-lg" />
                Search Donors
              </Link>
            </motion.div>

            {/* Trust Badge - Fixed spacing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex items-center gap-2 lg:gap-3 pt-1 lg:pt-2"
            >
              <FaShieldAlt className="text-red-500 text-base lg:text-lg shrink-0" />
              <span className="text-xs sm:text-sm text-gray-400 font-medium">
                Verified & Trusted Blood Donation Network
              </span>
            </motion.div>
          </motion.div>

          {/* Right Visual - Hero Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-87.5 xl:w-100 h-87.5 xl:h-100 border-2 border-red-500/20 rounded-full absolute"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-62.5 xl:w-75 h-62.5 xl:h-75 border-2 border-red-500/10 rounded-full absolute"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="w-37.5 xl:w-50 h-37.5 xl:h-50 border-2 border-red-500/5 rounded-full absolute"
                />
              </div>

              {/* Main Visual Card */}
              <div className="relative z-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 xl:p-8 shadow-2xl max-w-xs xl:max-w-sm">
                {/* Blood Drop Icon */}
                <div className="flex justify-center mb-4 lg:mb-6">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="w-20 h-20 xl:w-24 xl:h-24 bg-red-500/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-14 h-14 xl:w-16 xl:h-16 bg-linear-to-br from-red-500 to-red-700 rounded-full relative">
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 xl:w-4 xl:h-4 bg-white/30 rounded-full" />
                    </div>
                  </motion.div>
                </div>

                <h3 className="text-xl xl:text-2xl font-bold text-white text-center mb-2 lg:mb-3">
                  Emergency Blood Need?
                </h3>
                <p className="text-gray-400 text-center mb-4 lg:mb-6 text-sm xl:text-base">
                  Find matching donors in your area instantly with our smart
                  matching system
                </p>

                {/* Blood Types Grid */}
                <div className="grid grid-cols-4 gap-1.5 lg:gap-2">
                  {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(
                    (type, index) => (
                      <motion.div
                        key={type}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                        className={`text-center py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg text-xs sm:text-sm font-bold cursor-default
                        ${
                          index % 2 === 0
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-white/10 text-gray-300 border border-white/20'
                        }`}
                      >
                        {type}
                      </motion.div>
                    ),
                  )}
                </div>

                {/* Floating Hearts */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      top: `${20 + i * 25}%`,
                      right: `${-20 - i * 15}px`,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.4,
                      repeat: Infinity,
                    }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
