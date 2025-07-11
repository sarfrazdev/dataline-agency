import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      alert('Message sent!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="relative bg-gradient-to-br from-cyan-50 via-white to-cyan-50 py-16 sm:py-24 rounded-t-3xl shadow-inner overflow-hidden">

      <div className="absolute -top-10 -left-10 w-72 h-72 bg-cyan-200 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 border-l-4 border-teal-500 pl-3">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enquiry, Support, etc."
                  className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition shadow-sm resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-full transition font-semibold shadow hover:shadow-md"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info + Map */}
          <div className="space-y-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-l-4 border-teal-500 pl-3">
                Contact Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0" />
                             
                      01 Ground Floor, Balajee Residency, J P Das Lane, New Dak Bunglow Road, Patna, 
                      Bihar – 800001; OPP Prema Honda services Centre 
                </p>
                <p className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-teal-500" />
             agencies.dataline@gmail.com
                </p>
                <p className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-teal-500" />
                 Phone/WhatsApp: +91-9334064100
                </p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-80 md:h-96">
              <img
                src="./contac.jpg"
                alt="Map showing TechEase office location"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsForm;