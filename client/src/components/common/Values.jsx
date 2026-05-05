import React from 'react';
import { FaLightbulb, FaUsers, FaShieldAlt } from 'react-icons/fa';

const Values = () => {
  const values = [
  
    {
      icon: FaUsers,
      title: 'Customer Focus',
      description: 'Prioritizing customer needs with tailored solutions and unparalleled support.',
    },
    {
      icon: FaShieldAlt,
      title: 'Integrity',
      description: 'Upholding transparency and ethical practices in every aspect of our business.',
    },
  ];

  return (
<section
  className="relative py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden"
  aria-labelledby="values-heading"
>

  {/* Background glow */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
  </div>

  <div className="relative max-w-5xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center mb-20">
      <h2
        id="values-heading"
        className="text-4xl md:text-5xl font-extrabold mb-4"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
          Our Mission & Values
        </span>
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
        At Data Line Imaging Technologies Pvt Ltd, our core values shape our operations and drive our commitment to excellence.
      </p>
    </div>

    {/* Timeline line */}
    <div className="relative">
      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-blue-300 via-purple-300 to-transparent -translate-x-1/2 hidden md:block"></div>

      <div className="space-y-16">

        {values.map((item, index) => (
          <div
            key={item.title}
            className={`relative flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >

            {/* Spacer */}
            <div className="hidden md:block md:w-1/2"></div>

            {/* Card */}
            <div className="w-full md:w-1/2 group">

              <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-500 group-hover:-translate-y-2">

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Icon */}
                <div className="mb-5 flex justify-center md:justify-start">
                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg group-hover:scale-110 transition">
                    <item.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center md:text-left">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center md:text-left">
                  {item.description}
                </p>

              </div>
            </div>

            {/* Center Dot */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"></div>

          </div>
        ))}

      </div>
    </div>

  </div>
</section>
  );
};

export default Values;
