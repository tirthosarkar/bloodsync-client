// components/home/WhyChooseBloodSync.jsx
"use client";
import { motion } from "framer-motion";
import { FaShieldAlt, FaBolt, FaMapMarkerAlt, FaHeart } from "react-icons/fa";

export default function WhyChooseBloodSync() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Trusted Community",
      description:
        "Building a safer and more reliable donor network for everyone.",
    },
    {
      icon: <FaBolt />,
      title: "Emergency Support",
      description: "Quickly connect patients with available blood donors.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location Based",
      description: "Find donors and requests closer to your area.",
    },
    {
      icon: <FaHeart />,
      title: "Always Free",
      description: "Helping save lives without unnecessary barriers.",
    },
  ];

  return (
    <section className="py-20 bg-red-50/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex px-4 py-1 rounded-full bg-white text-red-600 text-sm font-semibold border border-red-100"
            >
              Why BloodSync
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-5 text-4xl font-bold text-gray-900 leading-tight"
            >
              Why Thousands Trust <span className="text-red-600">Blood</span>
              Sync
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-5 text-gray-600 leading-8"
            >
              We are building a modern blood donation platform that helps
              patients, families, and donors connect when every minute matters.
            </motion.p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  className="bg-white rounded-2xl border border-red-100 p-5 transition-all duration-300 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-lg"
                  >
                    {feature.icon}
                  </motion.div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-white border border-red-100 p-10 shadow-sm"
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center"
              >
                <FaHeart className="text-red-600 text-4xl" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 text-center text-2xl font-bold text-gray-900"
              >
                Every Donation Matters
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4 text-center text-gray-600 leading-7"
              >
                A single blood donation can help save multiple lives. Together
                we can build a stronger community of donors and responders.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
