// components/home/BecomeHeroSection.jsx
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeart, FaArrowRight } from 'react-icons/fa';

export default function BecomeHeroSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-red-600 to-red-500 px-8 py-16 md:px-16 text-white"
        >
          {/* Animated Decorative circles */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/10"
          />

          {/* Additional decorative elements */}
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-white/20"
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-white/20"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            {/* Heart Icon with pulse animation */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{ scale: 1.1 }}
              className="mx-auto w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm relative"
            >
              {/* Separate pulse ring */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 rounded-2xl bg-white/20"
              />
              <FaHeart className="text-2xl relative z-10" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 inline-flex rounded-full bg-white/15 px-4 py-1 text-sm font-semibold"
            >
              Join Our Community
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-4xl md:text-5xl font-bold"
            >
              Become a Hero Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-red-100 text-lg leading-8"
            >
              Every blood donation has the power to save lives. Register as a
              donor and help patients receive support when they need it most.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-600 font-semibold text-base rounded-xl hover:bg-red-50 transition-colors duration-300 shadow-lg shadow-white/20 group"
                >
                  Join as Donor
                  <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/donation-requests"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold text-base rounded-xl hover:bg-white/10 transition-colors duration-300 backdrop-blur-sm"
                >
                  View Requests
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
