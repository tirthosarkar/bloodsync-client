// components/home/HowBloodSyncWorks.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaRegFileAlt, FaSearch, FaHeart } from "react-icons/fa";

export default function HowBloodSyncWorks() {
  const steps = [
    {
      icon: <FaRegFileAlt />,
      title: "Create a Request",
      description:
        "Submit a blood request with patient details, blood group, location, and urgency information.",
    },
    {
      icon: <FaSearch />,
      title: "Find Donors",
      description:
        "BloodSync helps connect suitable donors based on blood group and availability.",
    },
    {
      icon: <FaHeart />,
      title: "Save Lives",
      description:
        "Connect with donors quickly and help patients receive blood when they need it most.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold"
          >
            Getting Started
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-4xl font-bold text-gray-900"
          >
            How <span className="text-red-600">Blood</span>Sync Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-gray-600 leading-7"
          >
            A simple process designed to connect blood donors with patients
            quickly and efficiently.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.4 + index * 0.15,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(239, 68, 68, 0.15)",
              }}
              className="relative rounded-3xl border border-red-100 bg-white p-8 shadow-sm transition-all duration-300 cursor-default"
            >
              {/* Icon with bounce animation */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.6 + index * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl"
              >
                {step.icon}
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
                className="mt-6 text-xl font-bold text-gray-900"
              >
                {step.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
                className="mt-3 text-gray-600 leading-7"
              >
                {step.description}
              </motion.p>

              {/* Step Number */}
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + index * 0.15,
                  type: "spring",
                }}
                whileHover={{ scale: 1.2, color: "#fecaca" }}
                className="absolute top-6 right-6 text-4xl font-black text-red-50 transition-colors"
              >
                0{index + 1}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
