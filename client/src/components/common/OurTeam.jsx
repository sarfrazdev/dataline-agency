

import React, { useState } from "react";
import NavLayout from "../auth/NavLayout";

const founder = {
  name: "PRADEEP KUMAR AGRAWAL",
  title: "Founder & Director",
  image: "/team/pradeep.jpeg",
  experience: "35+ Years Experience",
};

const teamMembers = [
  {
    name: "Yash Agrawal",
    title: "Director",
    image: "/team/yash.jpeg",
    email: "yash.agrawal@dataline.co.in",
    experience: "10+ Years Experience",
  },
  {
    name: "Srishty Agrawal",
    title: "Global Head",
    image: "/team/srishty.jpeg",
    email: "srishty@dataline.co.in",
  },
  {
    name: "Sujata Kumari",
    title: "Sales (Team Leader)",
    image: "/team/sujata.jpeg",
    email: "sujata@dataline.co.in",
    experience: "15+ Years Experience",
  },
  {
    name: "AJAY KUMAR",
    title: "Head Accounts Division",
    image: "/team/ajay.jpeg",
    email: "ajay@dataline.co.in",
    experience: "15+ Years Experience",
  },
  {
    name: "RAVI KUMAR SINGH",
    title: "Govt. Supplied (Team Leader)",
    image: "/team/ravi.jpeg",
    email: "ravi@dataline.co.in",
    experience: "7+ Years Experience",
  },
  {
    name: "Pinku Kumar",
    title: "Logistic Head",
    image: "/team/pinku.jpeg",
    email: "pinku@dataline.co.in",
    experience: "15+ Years Experience",
  },
  {
    name: "Sanjeet Kumar",
    title: "Dispatch (Team Leader)",
    image: "/team/sanjeet.jpeg",
    email: "sanjeet@dataline.co.in",
    experience: "15+ Years Experience",
  },
  {
    name: "Amardeep Gupta",
    title: "Service (Team Leader)",
    image: "/team/amardeep.jpeg",
    email: "amardeep@dataline.co.in",
    experience: "15+ Years Experience",
  },
  {
    name: "Pooja Kumari",
    title: "Digital Marketing (Team Leader)",
    image: "/team/pooja.jpeg",
    email: "pooja@dataline.co.in",
    experience: "5+ Years Experience",
  },
  {
    name: "Saisata Zni",
    title: "Purchase (Team Leader)",
    image: "/team/saista.jpeg",
    email: "saista@dataline.co.in",
    experience: "10+ Years Experience",
  },
  {
    name: "Pallavi Kumari",
    title: "HR",
    image: "/team/pallavi.jpeg",
    email: "hr@dataline.co.in",
    experience: "1+ Years Experience",
  },
];

const TeamCard = ({ member }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-[420px] [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d]
          ${
            flipped
              ? "[transform:rotateY(180deg)]"
              : "md:group-hover:[transform:rotateY(180deg)]"
          }`}
      >
        {/* Front Side */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl [backface-visibility:hidden]">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>

    
        <div className="absolute inset-0 bg-white rounded-3xl shadow-xl p-6 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="text-xl font-bold text-gray-900">
            {member.name}
          </h3>

          <p className="text-blue-600 mt-2">{member.title}</p>

          {member.email && (
            <p className="text-gray-600 text-sm mt-4 break-all">
              {member.email}
            </p>
          )}

          {member.experience && (
            <p className="text-gray-500 mt-3 italic">
              {member.experience}
            </p>
          )}

          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-5" />

          <p className="text-xs text-gray-400 mt-4 md:hidden">
            Tap again to flip back
          </p>
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  return (
    <NavLayout>
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-pink-500">
              Our Leadership Team
            </span>
          </h2>

          {/* Founder Section */}
          <div className="mb-24 bg-white rounded-[40px] overflow-hidden shadow-2xl">
            <div className="grid lg:grid-cols-2">
              <div>
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-[700px] object-cover"
                />
              </div>

              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <span className="text-blue-600 font-semibold uppercase">
                  Founder & Director
                </span>

                <h2 className="text-5xl font-bold mt-3">
                  {founder.name}
                </h2>

                <p className="mt-6 text-gray-600 leading-8">
                  Pradeep Agrawal has completed his M.Com from Patna University
                  in 1993 and began his professional journey with a strong focus
                  on business and trade.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  With an entrepreneurial vision, he established Dataline
                  Agencies, building it into one of the largest IT distribution
                  houses in Bihar.
                </p>

                <p className="mt-4 text-gray-600 leading-8">
                  Dataline Agencies specializes in the distribution and
                  wholesale supply of IT, surveillance, and networking products
                  across India.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-10">
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h3 className="text-3xl font-bold text-blue-600">
                      35+
                    </h3>
                    <p>Years Experience</p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h3 className="text-3xl font-bold text-purple-600">
                      1995
                    </h3>
                    <p>Dataline Since</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl font-bold text-center mb-12  text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-blue-600 to-pink-500">Meet our Team</h1>

          {/* Team Members */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>
    </NavLayout>
  );
};

export default OurTeam;
