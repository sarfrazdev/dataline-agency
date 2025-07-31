import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen overflow-hidden group">

      <div className="absolute inset-0 z-0">
        <img
          src="/dataline.jpg"
          alt="Dataline Banner"
          className="w-full h-full object-cover object-center transition-all duration-1000 group-hover:scale-105 group-hover:blur-sm"
        />
      </div>


      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />


      <Tilt
        glareEnable={true}
        glareMaxOpacity={0.1}
        tiltMaxAngleX={5}
        tiltMaxAngleY={5}
        className="relative z-20 w-full px-4 md:px-10 max-w-5xl text-center"
      >
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/20 shadow-2xl animate-fade-in-up">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase bg-gradient-to-r from-pink-400 via-red-500 to-yellow-400 bg-clip-text text-transparent animate-gradient font-serif drop-shadow-lg mb-4">
            Distribution House of IT Peripherals,
            <br className="hidden sm:block" />
            Surveillance & Networking Products
          </h1>

         

          <Link to="/shop">
            <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-10 py-4 rounded-full shadow-lg hover:shadow-pink-500/60 hover:scale-105 transition-all duration-300 border border-white/20 animate-glow">
              Shop All Products
            </button>
          </Link>
        </div>
      </Tilt>

     
      <div className="absolute bottom-6 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center items-start p-1">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
          }
        }
        .animate-glow {
          animation: glow 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default Hero;
