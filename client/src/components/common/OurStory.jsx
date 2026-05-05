import React from "react";

const OurStory = () => {
  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-100 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">

        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* TEXT */}
          <div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
                Our Story
              </span>
            </h2>

            {/* Highlight stats box (same content, better UI) */}
            <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-5 shadow-sm mb-6">
              <p className="text-gray-800 text-sm md:text-base leading-relaxed font-medium">
                30+ Year Experience in IT Distribution <br />
                2500 Reseller + Govt. Institution Network <br />
                50+ Employees <br />
                Largest IT Distribution House in Bihar <br />
                Selling 10 million + Products/annum <br />
                One-Stop Destination for PAN India Presence Supply For IT, Surveillance & Networking Products
              </p>
            </div>

            {/* Paragraphs */}
            <p className="text-gray-600 mb-4 leading-relaxed text-base md:text-lg">
              Journey start in 1995 in IT sector as Dataline Agencies with innovative IT Distribution with a proprietorship firm.
            </p>

            <p className="text-gray-600 mb-4 leading-relaxed text-base md:text-lg">
              In 2012, we transform into Dataline Imaging Technology Pvt Ltd making a significant milestone in our expansion and professional growth in the IT Distribution space. With over 30 years of market leadership across Bihar and Jharkhand, and growing PAN India presence.
            </p>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              Dataline has established itself as a trusted name in the wholesale IT Distributions. We proudly support a network of over 2500 active Reseller and Govt Institutions and many other.
            </p>
          </div>

          {/* IMAGE */}
          <div className="relative group">

            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-200/40 to-purple-200/40 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-200">

              <img
                src="./team.jpg"
                alt="Dataline office and infrastructure"
                className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;