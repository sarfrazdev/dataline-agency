import React, { useState, useEffect } from "react";

const images = ["/slider1.png", "/slider2.png", "close-up-printer-toner.jpg","cartidge.png"];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden bg-gray-100">

      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="relative w-screen h-full flex items-center justify-center">

            {/* 🔥 Blurred background (fills space) */}
            <div
              className="absolute inset-0 bg-center bg-cover blur-2xl scale-110 opacity-30"
              style={{ backgroundImage: `url(${img})` }}
            />

            {/* 🔥 Main image (no crop) */}
            <div
              className="absolute inset-0 bg-center bg-contain bg-no-repeat"
              style={{ backgroundImage: `url(${img})` }}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

            {/* Content */}
            <div className="relative z-10 text-white text-center max-w-2xl px-4">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                Upgrade Your Tech Setup
              </h1>
              <p className="text-lg opacity-90 mb-6">
                Explore top brands in surveillance, networking & IT accessories
              </p>

             
            </div>

          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 -translate-y-1/2 z-20 
        bg-white/30 backdrop-blur-md text-white text-3xl 
        rounded-full w-12 h-12 flex items-center justify-center 
        hover:bg-white/50 transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 -translate-y-1/2 z-20 
        bg-white/30 backdrop-blur-md text-white text-3xl 
        rounded-full w-12 h-12 flex items-center justify-center 
        hover:bg-white/50 transition"
      >
        ❯
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {images.map((_, idx) => (
          <div
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === idx
                ? "w-8 bg-white"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;