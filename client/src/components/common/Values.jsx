import React from 'react';
import { FaLightbulb, FaUsers, FaShieldAlt } from 'react-icons/fa';

const Values = () => {
  const values = [
    // {
    //   icon: FaLightbulb,
    //   title: 'Innovation',
    //   description: 'Pushing boundaries with cutting-edge technology to deliver exceptional user experiences.',
    // },
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
      className="relative py-16 sm:py-24 bg-[#1f1f1f] text-white flex justify-center items-center"
      aria-labelledby="values-heading"
    >
      {/* Background gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-teal-700/10 to-cyan-900/10 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2
            id="values-heading"
            className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 tracking-tight mb-4"
          >
            Our Mission & Values
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            At Data Line Imaging Technologies Pvt Ltd, our core values shape our operations and drive our
            commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1  gap-8 justify-center">
          {values.map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-[#2a2a2a] border border-teal-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 sm:p-8 flex flex-col items-center"
              role="article"
              aria-labelledby={`value-title-${index}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10 flex flex-col items-center text-center">
                <item.icon
                  className="w-12 h-12 sm:w-14 sm:h-14 text-teal-400 mb-4 sm:mb-6 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                />
                <h3
                  id={`value-title-${index}`}
                  className="text-xl sm:text-2xl font-semibold text-cyan-300 mb-3"
                >
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smooth fade-in animation */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
};

export default Values;
