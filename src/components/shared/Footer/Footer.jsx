import Link from 'next/link';
import Image from 'next/image';
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
} from 'react-icons/fa';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-red-100 bg-white">
      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-red-400 via-red-600 to-red-400" />

      {/* Blood Drop Watermark */}
      <div className="absolute right-0 top-10 opacity-[0.03] pointer-events-none">
        <svg
          viewBox="0 0 120 140"
          className="w-48 h-48 text-red-600"
          fill="currentColor"
        >
          <path d="M60 0C60 0 0 70 0 100a60 60 0 00120 0C120 70 60 0 60 0z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-5">
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

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-gray-500 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FaFacebookF size={14} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-gray-500 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-gray-500 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-100 text-gray-500 transition-all duration-300 hover:border-red-600 hover:bg-red-600 hover:text-white"
              >
                <FaGithub size={14} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Navigation
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link
                  href="/"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaHome className="text-red-500 transition-transform group-hover:scale-110" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/donation-requests"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaTint className="text-red-500 transition-transform group-hover:scale-110" />
                  Donation Requests
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaHandHoldingHeart className="text-red-500 transition-transform group-hover:scale-110" />
                  Become a Donor
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaSignInAlt className="text-red-500 transition-transform group-hover:scale-110" />
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">
              Resources
            </h3>

            <ul className="mt-5 space-y-4">
              <li>
                <Link
                  href="/resources/about"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaInfoCircle className="text-red-500 transition-transform group-hover:scale-110" />
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/resources/faq"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaQuestionCircle className="text-red-500 transition-transform group-hover:scale-110" />
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/resources/privacy-policy"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaShieldAlt className="text-red-500 transition-transform group-hover:scale-110" />
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/resources/terms"
                  className="group flex items-center gap-3 text-gray-600 hover:text-red-600 transition"
                >
                  <FaFileContract className="text-red-500 transition-transform group-hover:scale-110" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Card */}
          <div className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 to-red-700 p-6 text-white shadow-lg">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />
              <div className="absolute -left-6 -bottom-6 h-24 w-24 rounded-full bg-white/10" />

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

                <Link
                  href="/register"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  Join as Donor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-red-100" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {year} BloodSync. All rights reserved.
          </p>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-400 text-center">
            Saving Lives Together
          </p>
        </div>
      </div>
    </footer>
  );
}
