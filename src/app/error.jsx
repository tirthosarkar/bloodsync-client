"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHeartBroken, FaHome, FaRedo } from "react-icons/fa";

// Generate random positions outside of render
const floatingElements = [
  { id: 1, top: "25%", left: "15%", duration: 3.5, delay: 0.2 },
  { id: 2, top: "65%", left: "75%", duration: 4.2, delay: 1.1 },
  { id: 3, top: "45%", left: "35%", duration: 3.8, delay: 0.7 },
  { id: 4, top: "80%", left: "20%", duration: 4.5, delay: 1.8 },
  { id: 5, top: "30%", left: "85%", duration: 3.2, delay: 0.4 },
];

export default function Error({ error, reset }) {
  // Generate error reference ID on client side only
  const errorRefId = useMemo(() => {
    if (typeof window !== "undefined") {
      return Date().toString(36).toUpperCase();
    }
    return "ERR-001";
  }, []);

  useEffect(() => {
    // Log error to your monitoring service
    console.error("BloodSync Error:", {
      message: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      referenceId: errorRefId,
    });
  }, [error, errorRefId]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 gap-8 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-red-50"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-red-50/50"
        />

        {/* Floating elements - Using static values */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-red-200 rounded-full"
            style={{
              top: element.top,
              left: element.left,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full h-1 bg-linear-to-r from-red-400 via-red-600 to-red-400"
      />

      {/* Icon with animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
        className="relative flex items-center justify-center"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(220, 38, 38, 0)",
              "0 0 0 20px rgba(220, 38, 38, 0.1)",
              "0 0 0 0 rgba(220, 38, 38, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-28 h-28 rounded-full bg-red-50 flex items-center justify-center"
        >
          <FaHeartBroken className="w-14 h-14 text-red-600" />
        </motion.div>

        {/* Error badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
          className="absolute -top-1 -right-1 w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-xs font-bold">!</span>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col items-center gap-2 text-center max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          An unexpected error occurred on{" "}
          <span className="text-red-600 font-semibold">BloodSync</span>.
          Don&apos;t worry — your data is safe. Please try again or return to
          the home page.
        </p>

        {/* Error message (only in development) */}
        {process.env.NODE_ENV === "development" && error?.message && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-2 w-full bg-red-50 border border-red-100 rounded-lg px-4 py-3"
          >
            <p className="text-xs text-red-600 font-mono wrap-break-word">
              {error.message}
            </p>
            {error?.stack && (
              <details className="mt-2">
                <summary className="text-xs text-red-400 cursor-pointer hover:text-red-500">
                  Stack Trace
                </summary>
                <pre className="mt-2 text-xs text-red-400 font-mono whitespace-pre-wrap break-all max-h-40 overflow-y-auto">
                  {error.stack}
                </pre>
              </details>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3 w-full max-w-xs"
      >
        <div className="flex-1 h-px bg-red-100" />
        <FaHeartBroken className="w-4 h-4 text-red-300" />
        <div className="flex-1 h-px bg-red-100" />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <button
          onClick={() => {
            // Attempt to recover
            reset();
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/30"
        >
          <FaRedo className="text-xs" />
          Try Again
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 border-2 border-red-200 hover:border-red-400 text-red-600 hover:bg-red-50 text-sm font-semibold rounded-lg transition-all duration-300 text-center"
        >
          <FaHome className="text-xs" />
          Back to Home
        </Link>
      </motion.div>

      {/* Bottom tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs text-gray-300 tracking-widest uppercase"
      >
        BloodSync · Saving Lives Together
      </motion.p>

      {/* Error reference ID (for support) */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-400"
        >
          Error Reference: {errorRefId}
        </motion.p>
      )}
    </div>
  );
}
