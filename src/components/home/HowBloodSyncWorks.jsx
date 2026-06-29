'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LuArrowRight, LuFileText, LuHeart, LuSearch } from 'react-icons/lu';
// import { FileText, Search, Heart, ArrowRight } from "lucide-react";

export default function HowBloodSyncWorks() {
  const steps = [
    {
      icon: <LuFileText className="w-6 h-6 text-red-600" />,
      title: 'Create a Request',
      description:
        'Submit a blood request with patient details, blood group, location, and urgency level in seconds.',
    },
    {
      icon: <LuSearch className="w-6 h-6 text-red-600" />,
      title: 'Find Donors',
      description:
        'BloodSync intelligently matches and notifies real-time active donors based on proximity and blood group.',
    },
    {
      icon: <LuHeart className="w-6 h-6 text-red-600" />,
      title: 'Save Lives',
      description:
        'Coordinate instantly with donors through direct channels and bridge the critical gap when it matters most.',
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-linear-to-b from-white via-red-50/20 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex px-4 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Getting Started
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-3xl  md:text-4xl font-black text-gray-900 tracking-tight"
          >
            How{' '}
            <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
              Blood
            </span>
            Sync Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed"
          >
            An optimized, stress-free operational sequence engineered to
            mobilize community blood donors and save lives under critical
            timelines.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12 mt-14">
          {/* Decorative Connecting Line (Desktop Only) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-red-100 via-rose-200 to-red-100 -translate-y-12 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
                type: 'spring',
                bounce: 0.2,
              }}
              whileHover={{
                y: -12,
                boxShadow: '0 30px 60px -15px rgba(220, 38, 38, 0.12)',
              }}
              className="relative z-10 rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-md p-8 lg:p-10 shadow-md shadow-gray-100/50 transition-all duration-300 group"
            >
              {/* Card Hover Ambient Red Glow Accent */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/0 to-red-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Step Badge / Number */}
              <span className="absolute top-8 right-8 text-5xl font-black text-gray-100/70 group-hover:text-red-100/60 select-none transition-colors duration-300">
                0{index + 1}
              </span>

              {/* Icon Frame */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-rose-100/60 flex items-center justify-center border border-red-100/50 shadow-inner group-hover:from-red-600 group-hover:to-rose-600 transition-all duration-300"
              >
                <div className="group-hover:scale-110 group-hover:brightness-0 group-hover:invert transition-all duration-300">
                  {step.icon}
                </div>
              </motion.div>

              {/* Content */}
              <h3 className="mt-8 text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                {step.title}
              </h3>

              <p className="mt-3 text-sm lg:text-base text-gray-500 leading-relaxed group-hover:text-gray-600 transition-colors duration-200">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Global Action CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-red-600 to-rose-600 rounded-xl hover:from-red-700 hover:to-rose-700 shadow-xl shadow-red-500/10 hover:shadow-red-500/20 hover:-translate-y-0.5 transition-all duration-200 group"
          >
            Get Started Now
            <LuArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
