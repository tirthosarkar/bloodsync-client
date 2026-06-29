'use client';
import { motion } from 'framer-motion';
import { FaTint } from 'react-icons/fa';

const BLOOD_DATA = [
  {
    type: 'O−',
    meta: 'Universal donor',
    canGiveTo: ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−'],
    badge: { text: 'All blood types', color: 'green' },
  },
  {
    type: 'O+',
    meta: 'Most common type',
    canGiveTo: ['A+', 'B+', 'O+', 'AB+'],
  },
  {
    type: 'A−',
    meta: 'Rare — high demand',
    canGiveTo: ['A+', 'A−', 'AB+', 'AB−'],
  },
  {
    type: 'A+',
    meta: 'Second most common',
    canGiveTo: ['A+', 'AB+'],
  },
  {
    type: 'B−',
    meta: 'Rare — critical need',
    canGiveTo: ['B+', 'B−', 'AB+', 'AB−'],
  },
  {
    type: 'B+',
    meta: 'Common type',
    canGiveTo: ['B+', 'AB+'],
  },
  {
    type: 'AB−',
    meta: 'Universal plasma donor',
    canGiveTo: ['AB+', 'AB−'],
  },
  {
    type: 'AB+',
    meta: 'Universal recipient',
    canGiveTo: [],
    canReceiveAll: true,
    badge: { text: 'Receives all', color: 'blue' },
  },
];

function BloodCard({ data, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-white rounded-2xl border border-gray-100 p-5
                 hover:border-red-200 hover:shadow-md hover:shadow-red-50
                 transition-all duration-200 flex flex-col gap-3"
    >
      {/* Blood type + meta */}
      <div>
        <p className="text-3xl font-bold text-red-600 leading-none mb-1">
          {data.type}
        </p>
        <p className="text-xs text-gray-400 font-medium">{data.meta}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Can give to / receive from */}
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
          {data.canReceiveAll ? 'Can receive from' : 'Can give to'}
        </p>

        {data.canReceiveAll ? (
          <span
            className="inline-block text-[11px] font-semibold px-3 py-1
                           rounded-full bg-blue-50 text-blue-700 border border-blue-100"
          >
            All blood types
          </span>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {data.canGiveTo.map(t => (
              <span
                key={t}
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md
                           bg-red-50 text-red-700 border border-red-100"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Universal donor badge */}
        {data.badge && data.badge.color === 'green' && (
          <span
            className="mt-2.5 inline-block text-[11px] font-semibold px-3 py-1
                           rounded-full bg-green-50 text-green-700 border border-green-100"
          >
            Universal donor
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function BloodCompatibilityChart() {
  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                             bg-red-50 border border-red-100 text-red-700
                             text-xs font-semibold uppercase tracking-widest mb-4"
            >
              <FaTint className="text-red-500 text-xs" />
              Blood compatibility
            </span>

            <h2 className="mt-4 text-3xl  md:text-4xl font-black text-gray-900 tracking-tight mb-4">
              Who can <span className="text-red-600">donate</span> to whom?
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Understanding blood type compatibility helps donors and recipients
              connect faster in emergencies.
            </p>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {BLOOD_DATA.map((data, i) => (
            <BloodCard key={data.type} data={data} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-xs text-gray-400 mt-8"
        >
          Always verify blood compatibility with a certified medical
          professional before donation.
        </motion.p>
      </div>
    </section>
  );
}
