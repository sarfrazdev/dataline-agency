import React from 'react';

const AboutUsHeroSection = () => {
  // Import Font Awesome icons

  return (
    <section className="relative text-white py-20 md:py-28 overflow-hidden font-sans">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-400 opacity-20 rounded-full blur-3xl "></div>
      <div className="absolute -bottom-16 -right-10 w-72 h-72 bg-teal-400 opacity-20 rounded-full blur-3xl "></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg font-serif">
          Welcome to Dataline
        </h1>
        {/* <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm">
          Wholesales hub of IT Peripheral & SERVEILLANCE & NETWORKING WITH 
PHOTO  
        </p> */}
      </div>
    </section>
  );
};

export default AboutUsHeroSection;
