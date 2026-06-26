import { Button } from '@heroui/react';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';

export default function BecomeHeroSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-red-600 to-red-500 px-8 py-16 md:px-16 text-white">
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/10" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm">
              <FaHeart className="text-2xl" />
            </div>

            <span className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold">
              Join Our Community
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold">
              Become a Hero Today
            </h2>

            <p className="mt-6 text-red-100 text-lg leading-8">
              Every blood donation has the power to save lives. Register as a
              donor and help patients receive support when they need it most.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                // className="px-8 py-3 rounded-xl bg-white text-red-600 font-semibold hover:bg-red-50 transition"
              >
                <Button className="px-8 py-5 rounded-xl bg-white text-red-600 font-semibold hover:bg-red-50 transition hover:scale-105">
                  {' '}
                  Join as Donor
                </Button>
              </Link>

              <Link
                href="/donation-requests"
                // className="px-8 py-3 rounded-xl border border-white/30 text-white font-semibold hover:bg-white/10 transition"
              >
                <Button
                  variant="danger"
                  className="rounded-xl px-8 py-5 hover:bg-white/10 transition hover:scale-105"
                >
                  {' '}
                  View Requests
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
