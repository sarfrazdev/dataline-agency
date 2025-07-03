import React from 'react';
import NavLayout from '../auth/NavLayout';

const teamMembers = [
  {
    name: 'PRADEEP KUMAR AGRAWAL',
    title: 'Director',
    experience: '30+ Years Experience',
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
      <section className="py-20 bg-[#0a0a0a] min-h-screen" id="team">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-16 drop-shadow">
            Our Leadership Team
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="bg-[#141414] text-white p-6 rounded-2xl border border-gray-800 shadow-md hover:shadow-blue-400/20 hover:scale-105 transform transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="mb-5">
                  <div className="w-20 h-20 mx-auto bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center text-3xl shadow-lg">
                    {member.name[0]}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-yellow-400 tracking-wide">{member.name}</h3>
                <p className="text-gray-300 mt-1 text-sm">{member.title}</p>
                <p className="text-gray-400 mt-2 text-sm italic">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.6s ease-out both;
            }
          `}
        </style>
      </section>
    </NavLayout>
  );
};

export default OurTeam;
