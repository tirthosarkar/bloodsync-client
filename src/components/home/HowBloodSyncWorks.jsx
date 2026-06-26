import Link from 'next/link';
import { FaRegFileAlt, FaSearch, FaHeart } from 'react-icons/fa';

export default function HowBloodSyncWorks() {
  const steps = [
    {
      icon: <FaRegFileAlt />,
      title: 'Create a Request',
      description:
        'Submit a blood request with patient details, blood group, location, and urgency information.',
    },
    {
      icon: <FaSearch />,
      title: 'Find Donors',
      description:
        'BloodSync helps connect suitable donors based on blood group and availability.',
    },
    {
      icon: <FaHeart />,
      title: 'Save Lives',
      description:
        'Connect with donors quickly and help patients receive blood when they need it most.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex px-4 py-1 rounded-full bg-red-50 text-red-600 text-sm font-semibold">
            Getting Started
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            How <span className="text-red-600">Blood</span>Sync Works
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            A simple process designed to connect blood donors with patients
            quickly and efficiently.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative rounded-3xl border border-red-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
                {step.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="mt-3 text-gray-600 leading-7">{step.description}</p>

              <span className="absolute top-6 right-6 text-4xl font-black text-red-50">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
