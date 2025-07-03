import React from 'react';
import { useNavigate } from 'react-router-dom';

const Faq = () => {
    const navigate= useNavigate()
  return (
    <section className="bg-gradient-to-r from-te_secondary to-te_primary text-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-2 animate-fade-in-up">
          DataLine Support Center
        </h1>
        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
          We're here to help! Find answers to common questions or get in touch with our support team.
        </p>
        <div className="pt-4">
          <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-blue-50 transition"
          onClick={()=>navigate('/contact')}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
