import React from "react";

const GetInTouch = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* Background glow */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl"></div>
      </div> */}

      <div className="relative max-w-4xl mx-auto px-4 text-center">

     
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          Get In{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500">
            Touch
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          We'd love to hear from you! Whether you have a question about our products, need support, or just want to say hello.
        </p>

      </div>
    </section>
  );
};

export default GetInTouch;