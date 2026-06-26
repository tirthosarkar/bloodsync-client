import { FaShieldAlt, FaBolt, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';

export default function WhyChooseBloodSync() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: 'Trusted Community',
      description:
        'Building a safer and more reliable donor network for everyone.',
    },
    {
      icon: <FaBolt />,
      title: 'Emergency Support',
      description: 'Quickly connect patients with available blood donors.',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location Based',
      description: 'Find donors and requests closer to your area.',
    },
    {
      icon: <FaHeart />,
      title: 'Always Free',
      description: 'Helping save lives without unnecessary barriers.',
    },
  ];

  return (
    <section className="py-20 bg-red-50/40">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex px-4 py-1 rounded-full bg-white text-red-600 text-sm font-semibold border border-red-100">
              Why BloodSync
            </span>

            <h2 className="mt-5 text-4xl font-bold text-gray-900 leading-tight">
              Why Thousands Trust BloodSync
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              We are building a modern blood donation platform that helps
              patients, families, and donors connect when every minute matters.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-red-100 p-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 text-lg">
                    {feature.icon}
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-6">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl bg-white border border-red-100 p-10 shadow-sm">
              <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
                <FaHeart className="text-red-600 text-4xl" />
              </div>

              <h3 className="mt-8 text-center text-2xl font-bold text-gray-900">
                Every Donation Matters
              </h3>

              <p className="mt-4 text-center text-gray-600 leading-7">
                A single blood donation can help save multiple lives. Together
                we can build a stronger community of donors and responders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
