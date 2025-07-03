import React from 'react';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
    <section
      className="relative  flex flex-col items-center justify-center bg-fixed bg-cover bg-center"
    >

      <img src="/hero1.png" alt="" className="mb-8 max-w-full h-auto" />

    
      <div className="relative z-50 text-center max-w-full px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent animate-gradient  drop-shadow-lg">
           Distribution house of IT Peripheral , SERVEILLANCE & NETWORKING 
        </h1>
      
        <Link to="/shop">
          <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
            Shop All Products
          </button>
        </Link>
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
        .animate-gradient-slow {
          background-size: 200% 200%;
          animation: gradientShift 6s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
