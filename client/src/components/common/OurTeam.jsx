import React from 'react';
import NavLayout from '../auth/NavLayout';

const teamMembers = [
  {
    name: 'PRADEEP KUMAR AGRAWAL',
    title: 'Director',
    experience: '35+ Years Experience',
  },
  {
    name: 'YASH AGRAWAL',
    title: 'Director',
    experience: '10+ Years Experience',
  },
  {
    name: 'PRABHARKER SINGH',
    title: 'Sales Head',
    experience: '10+ Years Experience',
  },
  {
    name: 'VIVEK THAKUR',
    title: 'Marketing Head',
    experience: '5+ Years Experience',
  },
  {
    name: 'AJAY KUMAR',
    title: 'Accounting Head',
    experience: '15+ Years Experience',
  },
  {
    name: 'RAVI KUMAR SINGH',
    title: 'Govt. Institution Head',
    experience: '5+ Years Experience',
  },
];

const OurTeam = () => {
  return (
  <NavLayout>
  <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen overflow-hidden">


    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl"></div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 md:px-10 text-center">

  
      <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-pink-500">
          Our Leadership Team
        </span>
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

        {teamMembers.map((member, index) => (
          <div
            key={member.name}
            className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-200/50 to-purple-200/50 hover:from-blue-400 hover:to-purple-400 transition duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >

         
            <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-md hover:shadow-2xl transition duration-500 group-hover:-translate-y-3">

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-100/40 to-purple-100/40 opacity-0 group-hover:opacity-100 transition duration-500" />

    
              <div className="relative mb-6 flex justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[3px] shadow-lg group-hover:scale-110 transition duration-500">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl font-bold text-gray-800">
                    {member.name[0]}
                  </div>
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 tracking-wide">
                {member.name}
              </h3>

              {/* Title */}
              <p className="text-blue-600 mt-1 text-sm font-medium">
                {member.title}
              </p>

              {/* Experience */}
              <p className="text-gray-500 mt-2 text-sm italic">
                {member.experience}
              </p>

              {/* Accent line */}
              <div className="mt-5 h-[3px] w-10 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-20 transition-all duration-300" />

            </div>
          </div>
        ))}

      </div>

    </div>

    {/* Animation */}
    <style>{`
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .group {
        animation: fadeUp 0.6s ease forwards;
      }
    `}</style>

  </section>
</NavLayout>
  );
};

export default OurTeam;
