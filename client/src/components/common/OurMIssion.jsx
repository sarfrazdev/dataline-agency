import React from "react";

const OurLegacy = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
              Our Vision & Mission
            </span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            We aim to seamlessly integrate technology into every organization by delivering accessible, premium IT, Surveillance, and Networking products across India.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* Vision */}
          <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-200/50 to-purple-200/50 hover:from-blue-400 hover:to-purple-400 transition duration-500">
            <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-500 group-hover:-translate-y-2">

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition duration-500" />

              <h3 className="text-2xl font-semibold text-blue-600 mb-3">
                Our Vision
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                We founded Dataline as a brand in Patna, Bihar, where information technology is seamlessly integrated into every organization—empowering individuals and institutions with accessible, premium IT products.
              </p>

            </div>
          </div>

          {/* Mission */}
          <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-purple-200/50 to-pink-200/50 hover:from-purple-400 hover:to-pink-400 transition duration-500">
            <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-500 group-hover:-translate-y-2">

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-100/40 to-pink-100/40 opacity-0 group-hover:opacity-100 transition duration-500" />

              <h3 className="text-2xl font-semibold text-purple-600 mb-3">
                Our Mission
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                To provide Dataline products as a trusted brand to end users of IT Peripherals, Surveillance, and Networking across PAN India, through our strong distribution and reseller network.
              </p>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default OurLegacy;