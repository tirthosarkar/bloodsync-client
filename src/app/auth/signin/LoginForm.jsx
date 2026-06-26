// components/auth/LoginForm.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaHeartbeat,
} from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const router = useRouter(); // Initialize router
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields.');
      return;
    }
    setIsLoading(true);

    try {
      // Execute Better Auth sign-in method
      const { data, error } = await signIn.email({
        email: formData.email.trim(),
        password: formData.password,
        // callbackURL: "/dashboard", // Tells Better Auth where to route on success
      });

      // Handle Better Auth Specific Errors (e.g., Wrong password, Invalid User)
      if (error) {
        toast.error(error.message || 'Invalid email or password.');
        return;
      }

      toast.success('Welcome back! Redirecting...');

      // Safety fallback route management if callbackURL is not handled implicitly
      setTimeout(() => {
        router.push('/');
        router.refresh(); // Cleans up cached headers/server component routing configurations
      }, 1000);
    } catch (error) {
      console.error('Login unexpected error:', error);
      toast.error('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-lg border border-gray-100"
      >
        {/* ── Left Panel ── */}
        <div className="hidden md:flex flex-col items-center justify-center gap-8 flex-1 bg-linear-to-r from-red-700 to-red-600 p-10 relative overflow-hidden">
          {/* Animated bg circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute w-48 h-48 rounded-full bg-white/5 -top-14 -left-14"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-32 h-32 rounded-full bg-white/5 -bottom-10 -right-10"
          />

          {/* Small floating elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-1/4 text-white/10 text-4xl"
          >
            ❤️
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/3 right-1/4 text-white/10 text-3xl"
          >
            🩸
          </motion.div>

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 z-10"
          >
            <FaHeartbeat className="w-7 h-7 text-white" />
            <span className="text-xl font-bold text-white">
              Blood<span className="text-red-300">Sync</span>
            </span>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 120 140"
              width="150"
              height="170"
            >
              <path
                d="M60 8 C60 8 15 65 15 90 a45 45 0 0090 0 C105 65 60 8 60 8z"
                fill="white"
                opacity="0.15"
              />
              <path
                d="M60 18 C60 18 22 68 22 90 a38 38 0 0076 0 C98 68 60 18 60 18z"
                fill="white"
                opacity="0.9"
              />
              <path
                d="M46 86 a14 14 0 0028 0"
                fill="none"
                stroke="#dc2626"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="54"
                y="66"
                width="12"
                height="3"
                rx="1.5"
                fill="#dc2626"
                opacity="0.8"
              />
              <rect
                x="58"
                y="62"
                width="4"
                height="11"
                rx="2"
                fill="#dc2626"
                opacity="0.8"
              />
              <ellipse
                cx="45"
                cy="78"
                rx="5"
                ry="8"
                fill="white"
                opacity="0.2"
              />
            </svg>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="z-10 text-center max-w-xs"
          >
            <p className="text-white font-medium text-base mb-1">
              Your 15 minutes can save 3 lives.
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Join thousands of donors making a difference every day
            </p>
          </motion.div>

          {/* Quick Contact / Emergency Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <FaHeartbeat className="text-white text-lg" />
              </div>
              <div>
                <p className="text-white text-sm font-medium leading-tight">
                  Emergency Blood Need?
                </p>
                <p className="text-white/70 text-xs mt-0.5">
                  We&apos;re here 24/7 to help connect you with donors
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Right Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex-1 bg-white flex flex-col justify-center px-8 py-10 relative"
        >
          {/* top decoration */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-20 h-20 rounded-full bg-red-100 -translate-y-1/2 translate-x-1/2 opacity-60"
          />

          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Welcome Back 👋
          </h1>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Please enter your details to access your donor dashboard.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <FaEnvelope className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={e =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-xs text-red-600 hover:text-red-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400">
                  <FaLock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={e =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold rounded-lg transition-all duration-300 mt-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-500 mt-5">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-red-600 font-semibold hover:underline"
            >
              Register to donate
            </Link>
          </p>

          {/* Secure badge */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <FaShieldAlt className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-xs text-gray-300">
              Secure 256-bit encryption
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
