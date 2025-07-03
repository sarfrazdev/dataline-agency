// import React from 'react';

// const OurLegacy = () => {
//   const timeline = [
//     {
//       year: '2010',
//       event: 'DataLine Imaging Technology Pvt Ltd Founded: A small team with a big vision for better IT accessories.',
//     },
//     {
//       year: '2012',
//       event: 'First: Received positive market response.',
//     },
//     {
//       year: '2015',
//       event: 'Expanded to Markets: Bringing DataLine Imaging Technology Pvt Ltd products.',
//     },
//     {
//       year: '2020',
//       event: "'Best Tech Accessory Brand': Recognized for innovation and quality.",
//     },
//     {
//       year: 'Today',
//       event: 'Continuing to innovate and serve thousands of customers.',
//     },
//   ];

//   return (
//     <section className="py-16 sm:py-24 bg-[#1f1f1f] text-white" aria-labelledby="legacy-heading">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-12">
//           <h2
//             id="legacy-heading"
//             className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 tracking-tight mb-4"
//           >
//             Our Legacy
//           </h2>
//           <p className="text-gray-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
//             A brief look at key milestones in DataLine Imaging Technology Pvt Ltd's journey.
//           </p>
//         </div>

//         <div className="relative max-w-4xl mx-auto">
//           {/* Timeline vertical line */}
//           <div className="hidden sm:block absolute h-full w-0.5 bg-gradient-to-b from-cyan-400 to-teal-400 left-1/2 transform -translate-x-1/2" />

//           {timeline.map((item, index) => (
//             <div
//               key={item.year}
//               className={`mb-12 flex flex-col sm:flex-row ${
//                 index % 2 === 0 ? 'sm:flex-row-reverse' : ''
//               } items-center sm:items-start w-full animate-fade-in`}
//               style={{ animationDelay: `${index * 200}ms` }}
//             >
//               {/* Timeline dot */}
//               <div className="hidden sm:block absolute w-4 h-4 bg-gradient-to-br from-cyan-400 to-teal-400 rounded-full left-1/2 transform -translate-x-1/2 z-10" />

//               {/* Spacer for alignment */}
//               <div className="hidden sm:block sm:w-1/2" />

//               {/* Timeline card */}
//               <div
//                 className={`w-full sm:w-1/2 ${index % 2 === 0 ? 'sm:pl-8' : 'sm:pr-8'} mt-6 sm:mt-0`}
//               >
//                 <div
//                   className={`bg-[#2a2a2a] border-l-4 ${
//                     index % 2 === 0 ? 'border-teal-400' : 'border-cyan-400'
//                   } p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
//                   role="article"
//                   aria-labelledby={`timeline-event-${index}`}
//                 >
//                   <p
//                     id={`timeline-event-${index}`}
//                     className="text-xl font-bold text-cyan-400 mb-2"
//                   >
//                     {item.year}
//                   </p>
//                   <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{item.event}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes fade-in {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in {
//             animation: fade-in 0.6s ease-out forwards;
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default OurLegacy;

import React from 'react';

const OurLegacy = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#1f1f1f] text-white" aria-labelledby="mission-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            id="mission-heading"
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 tracking-tight mb-4"
          >
            Our Vision & Mission
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            We aim to seamlessly integrate technology into every organization by delivering accessible, premium IT, Surveillance, and Networking products across India.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#2a2a2a] p-8 rounded-xl shadow-lg space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              We founded Dataline as a brand in Patna, Bihar, where information technology is seamlessly integrated into every organization—empowering individuals and institutions with accessible, premium IT products.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-teal-400 mb-2">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To provide Dataline products as a trusted brand to end users of IT Peripherals, Surveillance, and Networking across PAN India, through our strong distribution and reseller network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurLegacy;



