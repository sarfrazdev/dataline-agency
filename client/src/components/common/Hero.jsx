import React from "react";
import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">


      <div className="absolute inset-0">
        <img
          src="/dataline.jpg"
          alt="Dataline Banner"
          className="w-full h-full object-cover object-center scale-105"
        />
   <div className="absolute inset-0 bg-black/70" />
      </div>

  
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        className="relative z-10 w-full max-w-4xl px-6"
      >
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 shadow-xl text-center flex flex-col items-center">

         
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-white mb-8">
            Distribution House of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              IT Peripherals, Surveillance & Networking Products
            </span>
          </h1>

          
          <Link to="/shop" className="w-full flex justify-center">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-10 py-3 rounded-full text-white font-medium shadow-md hover:scale-105 hover:shadow-lg transition duration-300 cursor-pointer">
              Shop Products
            </button>
          </Link>

        </div>
      </Tilt>

    </section>
  );
};

export default Hero;