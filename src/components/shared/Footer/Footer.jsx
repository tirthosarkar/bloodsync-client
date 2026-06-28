// components/Footer.jsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaHome,
  FaTint,
  FaHandHoldingHeart,
  FaSignInAlt,
  FaInfoCircle,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaHeartbeat,
  FaArrowRight,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaGithub, href: "#", label: "GitHub" },
  ];

  const navLinks = [
    { icon: FaHome, href: "/", label: "Home" },
    { icon: FaTint, href: "/donation-requests", label: "Donation Requests" },
    {
      icon: FaHandHoldingHeart,
      href: "/auth/register",
      label: "Become a Donor",
    },
    { icon: FaSignInAlt, href: "/auth/signin", label: "Login" },
  ];

  const resourceLinks = [
    { icon: FaInfoCircle, href: "/resources/about", label: "About Us" },
    { icon: FaQuestionCircle, href: "/resources/faq", label: "FAQ" },
    {
      icon: FaShieldAlt,
      href: "/resources/privacy-policy",
      label: "Privacy Policy",
    },
    {
      icon: FaFileContract,
      href: "/resources/terms",
      label: "Terms of Service",
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-red-100 bg-white">
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-red-400 via-red-600 to-red-400" />

      {/* Animated Blood Drop Watermark */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          opacity: [0.03, 0.05, 0.03],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-0 top-10 pointer-events-none"
      >
        <svg
          viewBox="0 0 120 140"
          className="w-48 h-48 text-red-600"
          fill="currentColor"
        >
          <path d="M60 0C60 0 0 70 0 100a60 60 0 00120 0C120 70 60 0 60 0z" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/assets/nav-logo.png"
                alt="BloodSync"
                width={170}
                height={50}
                priority
                className="object-contain"
              />
            </Link>

            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1">
              <FaHeartbeat className="text-red-600 text-xs" />
              <span className="text-xs font-semibold text-red-600">
                Life-Saving Network
              </span>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-600">
              BloodSync connects blood donors with patients in urgent need.
              Every donor registered on our platform strengthens a community
              dedicated to saving lives through fast and reliable blood donation
              support.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-gray-500 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-200"
                >
                  <social.icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Navigation
            </h3>

            <ul className="mt-5 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <link.icon className="text-red-500 transition-transform group-hover:scale-110 group-hover:text-red-600" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              <Link href={"/resources "}> Resources </Link>
            </h3>

            <ul className="mt-5 space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  >
                    <link.icon className="text-red-500 transition-transform group-hover:scale-110 group-hover:text-red-600" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 text-white shadow-lg shadow-red-500/20">
              {/* Animated decorative circles */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/10"
              />

              <div className="relative">
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  Save Lives Today
                </span>

                <h3 className="mt-4 text-2xl font-bold">
                  Become a Blood Donor
                </h3>

                <p className="mt-3 text-sm leading-6 text-red-100">
                  A single donation can help save multiple lives. Join the
                  BloodSync donor community and make a real impact.
                </p>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/auth/register"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:shadow-lg group"
                  >
                    <FaHandHoldingHeart className="text-lg sm:text-xl" />
                    Join as Donor
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-red-100 to-transparent" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-gray-500 text-center md:text-left">
            &copy; {year} BloodSync. All rights reserved.
          </p>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 text-center">
            Saving Lives Together
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
