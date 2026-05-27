import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { BASE_URL } from '../../utils/apiPath';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${BASE_URL}/contact`, formData);
      toast.success(response.data.message || 'Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 sm:py-28  overflow-hidden">

  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-10 left-1/2 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-x-1/2"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 rounded-full blur-2xl"></div>
  </div>

  <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="grid md:grid-cols-2 gap-12 items-start">

      
      <div className="group relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-200/40 to-purple-200/40">
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-500">

          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Send Us a Message
            </span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

       
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

       
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>


            <div>
              <label className="text-sm text-gray-600 mb-1 block">Mobile</label>
              <input
                type="tel"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="+91-XXXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

       
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Requirement</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-[1.02] hover:shadow-lg transition duration-300 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Sending...' : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>

          </form>
        </div>
      </div>

     
      <div className="space-y-8">

     
        <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-blue-200/40 to-purple-200/40">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-2xl transition duration-500">

            <h3 className="text-2xl font-semibold text-gray-900 mb-5">
              Contact Information
            </h3>

            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">

              <p className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1" />
                01 Ground Floor, Balajee Residency, J P Das Lane, New Dak Bunglow Road, Patna, Bihar – 800001; OPP Prema Honda services Centre 
              </p>

              <p className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500" />
                info@dataline.co.in
              </p>

              <p className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500" />
                Phone/WhatsApp: +91-9334064100
              </p>

            </div>
          </div>
        </div>

        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden group">
          <img
            src="./contac.jpg"
            alt="Map showing TechEase office location"
            className="w-full h-80 md:h-96 object-cover transition duration-500 group-hover:scale-105"
          />

        

        </div>

      </div>

    </div>
  </div>


  <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8 relative z-10">
    <div className="rounded-2xl overflow-hidden shadow-lg">
      <iframe
        title="Dataline Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3597.8349447754276!2d85.13823377409796!3d25.610400377447277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed598b3fe99459%3A0x1ce86e9f65e4c515!2sDataline%20Imaging%20Technologies%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1779871068965!5m2!1sen!2sin"
        className="w-full h-72 md:h-96 border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>
  );
};

export default ContactUsForm;