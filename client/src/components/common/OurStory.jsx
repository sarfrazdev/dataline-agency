

import React from 'react';

const OurStory = () => {
  return (
    <section className="relative py-16 sm:py-24  overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 w-96 h-96 bg-gradient-to-r from-teal-500 via-cyan-400 to-teal-500 opacity-10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500 opacity-10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 mb-6 tracking-tight">
              Our Story
            </h2>
            <p className='text-white mb-4 leading-relaxed text-bold sm:text-lg'>30+ Year Experience in IT Distribution <br />
                2500 Reseller + Govt. Institution Network  <br />
                50+ Employees <br />
                Largest IT Distribution House in Bihar <br />
                Selling 10milion + Products/annum  <br />
                One-Stop Destination for PAN India Presence Supply For IT, Surveillance & Networking 
                Products </p>
            <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
          Journey start in 1995 in IT sector as Dataline Agencies with innovative IT Distribution with a proprietorship firm.
            </p>
            <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
             In 2012, we transform into Dataline Imaging Technology Pvt Ltd making a significant 
milestone in our expansion and professional growth in the IT Distribution space. 
With over 30 years of market leadership across Bihar and Jharkhand, and growing PAN India 
presence. 
            </p>
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
              Dataline has established itself as a trusted name in the wholesale IT Distributions. We 
proudly support a network of over 2500 active Reseller and Govt Instuitions and many other. 
            </p>
          </div>

          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
            <img
              alt="Dataline office and infrastructure"
              className="w-full h-100 object-cover "
              src="./team.jpg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;

