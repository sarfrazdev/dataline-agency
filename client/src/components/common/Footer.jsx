import React from 'react';
import { NavLink } from 'react-router-dom';
import { Laptop } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
// import { FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#1e1e1e] via-[#2a2a2a] to-[#1e1e1e] text-white rounded-t-3xl shadow-inner">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <NavLink to="/" className="flex items-center space-x-2 mb-4">
              <Laptop className="w-6 h-6 text-teal-400" />
              <span className="text-2xl font-extrabold tracking-tight text-white">Dataline </span>
            </NavLink>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your trusted partner for innovative and ergonomic IT accessories, empowering your digital lifestyle.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-teal-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><NavLink to="/shop" className="hover:text-teal-400 transition">Shop</NavLink></li>
              <li><NavLink to="/about" className="hover:text-teal-400 transition">About Us</NavLink></li>
              <li><NavLink to="/support" className="hover:text-teal-400 transition">Support</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-teal-400 transition">Contact</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-teal-400 mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-1">
             Add:      
                01 Ground Floor, Balajee Residency, J P Das Lane, New Dak Bunglow Road, Patna, 
                Bihar – 800001; OPP Prema Honda services Centre 
            </p>
            <p className="text-sm text-gray-400 mb-1">Email: agencies.dataline@gmail.com</p>
            <p className="text-sm text-gray-400">Phone/WhatsApp: +91-9334064100</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-teal-400 mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/people/Dataline-Imaging-Technologies-Pvt-Ltd/61576614507064/" className="hover:text-teal-400 transition text-gray-400"><FaFacebook size={20}/></a>
              <a href="https://x.com/datalinepradeep" className="hover:text-teal-400 transition text-gray-400"><FaXTwitter  size={20}/></a>
              <a href="https://www.instagram.com/dataline_imaging_technologies/" className="hover:text-teal-400 transition text-gray-400"><FaInstagram size={20}/></a>
              {/* <a href="#" className="hover:text-teal-400 transition text-gray-400"><FaLinkedin size={20}/></a> */}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Dataline Imaging Technology Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
