'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaQuestionCircle } from 'react-icons/fa';

const FAQS = [
  {
    q: 'Who is eligible to donate blood?',
    a: 'You must be between 18 and 60 years old, weigh at least 50 kg, and be in good general health. You should not have donated blood in the last 3 months. People with chronic illness, recent surgery, or active infections are temporarily deferred.',
  },
  {
    q: 'How do I create a blood donation request?',
    a: 'Register or log in to BloodSync, then go to your dashboard and click "Create Request". Fill in the recipient\'s details, blood group, hospital name, and the date needed. Your request will be visible to all active donors immediately.',
  },
  {
    q: 'Is blood donation safe? Does it hurt?',
    a: 'Blood donation is completely safe. The needle insertion causes a brief pinch, but the process is otherwise painless and takes about 10–15 minutes. Your body replenishes donated blood within 24–48 hours. Millions donate safely every year.',
  },
  {
    q: 'How often can I donate blood?',
    a: 'Whole blood can be donated once every 3 months (90 days). This gives your body enough time to fully replenish red blood cells. Platelet donations can be made more frequently — up to once every 2 weeks.',
  },
  {
    q: 'Is BloodSync free to use?',
    a: 'Yes — BloodSync is completely free for donors and patients. Registration, search, and donation requests cost nothing. We rely on voluntary community funding to keep the platform running. You can support us through our Funding page.',
  },
  {
    q: 'What happens after I confirm a donation?',
    a: 'Once you confirm on a request, the status changes to "In Progress" and your name and email are shared with the requester. You can then coordinate directly to arrange the donation at the specified hospital. The requester marks it "Done" once completed.',
  },
  {
    q: 'Can I cancel a donation request after creating it?',
    a: 'Yes. From your dashboard under "My Requests", you can edit or delete any request that is still in "Pending" status. Once a donor has confirmed (In Progress), you can mark it as canceled from the request details.',
  },
  {
    q: 'How does BloodSync protect my personal information?',
    a: 'Your contact details are only shared with the other party once a donation is confirmed — not before. Donor and requester information is never sold or shared with third parties. All data is stored securely on our servers.',
  },
];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`rounded-2xl border transition-all duration-200
        ${
          isOpen
            ? 'border-red-200 bg-white shadow-sm shadow-red-50'
            : 'border-gray-100 bg-white hover:border-red-100'
        }`}
    >
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-sm md:text-base font-medium leading-snug transition-colors
          ${isOpen ? 'text-red-700' : 'text-gray-800'}`}
        >
          {item.q}
        </span>

        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center
                         shrink-0 transition-all duration-200
          ${
            isOpen
              ? 'bg-red-600 text-white'
              : 'bg-red-50 text-red-500 border border-red-100'
          }`}
        >
          {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
        </div>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-gray-100">
              <p className="text-sm md:text-base text-gray-500 leading-relaxed pt-4">
                {item.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Split into two columns
  const left = FAQS.slice(0, 4);
  const right = FAQS.slice(4);

  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
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
              <FaQuestionCircle className="text-red-500 text-xs" />
              FAQ
            </span>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Common <span className="text-red-600"> questions</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Everything you need to know before registering as a donor or
              making a blood request.
            </p>
          </motion.div>
        </div>

        {/* Two-column grid on md+, single column on mobile */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-3">
            {left.map((item, i) => (
              <FAQItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => handleToggle(i)}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {right.map((item, i) => (
              <FAQItem
                key={i + 4}
                item={item}
                index={i + 4}
                isOpen={openIndex === i + 4}
                onToggle={() => handleToggle(i + 4)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm mb-3">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-2.5
                       border border-red-200 text-red-600 text-sm font-semibold
                       rounded-xl hover:bg-red-50 transition-colors duration-200"
          >
            Contact our team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
