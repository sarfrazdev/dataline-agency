import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relativ overflow-hidden">

      {/* Top Gradient Wave */}
      {/* <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-100  blur-3xl opacity-60" />      */}

      <div className="relative max-w-7xl mx-auto px-4 md:px-10 pt-24 pb-12">

        {/* BIG BRAND SECTION (this is the game changer) */}
        <div className="flex flex-col items-center text-center mb-20">

          <img
            src="/logo.jpeg"
            alt="logo"
            className="h-28 w-28 object-contain rounded-full shadow-xl border border-gray-200 mb-4"
          />

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
            Dataline
          </h1>

          <p className="mt-4 max-w-xl text-gray-600 text-sm">
            Your trusted partner for innovative and ergonomic IT accessories, empowering your digital lifestyle.
          </p>

          {/* Social (centered = more premium) */}
          <div className="flex gap-4 mt-6">
            {[ 
              { icon: <FaFacebook />, link: "https://www.facebook.com/people/Dataline-Imaging-Technologies-Pvt-Ltd/61576614507064/" },
              { icon: <FaXTwitter />, link: "https://x.com/datalinepradeep" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/dataline_imaging_technologies/" }
            ].map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white shadow-lg border border-gray-200 hover:bg-black hover:text-white transition duration-300 hover:scale-110"
              >
                {item.icon}
              </a>
            ))}
          </div>

        </div>

        {/* GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-gray-600">
              {[
                { name: "Shop", path: "/shop" },
                { name: "About Us", path: "/about" },
                { name: "Support", path: "/support" },
                { name: "Contact", path: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <NavLink
                    to={item.path}
                    className="hover:text-blue-600 transition"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Us
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">
              Add: 01 Ground Floor, Balajee Residency, J P Das Lane, New Dak Bunglow Road, Patna, Bihar – 800001; OPP Prema Honda services Centre
            </p>
            <p className="text-sm text-gray-600">Email: info@dataline.co.in</p>
            <p className="text-sm text-gray-600">
              Phone/WhatsApp: +91-9334064100  / +91-8102928470
            </p>
          </div>

          {/* Highlight Card (this adds uniqueness) */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-6 rounded-3xl shadow-xl max-w-sm">

              <h3 className="text-lg font-semibold mb-2">
                Need Bulk Orders?
              </h3>

              <p className="text-sm opacity-90 mb-4">
                Get the best wholesale pricing and fast delivery across India.
              </p>

              <a
                href="https://wa.me/919334064100"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:scale-105 transition"
              >
                Contact Now
              </a>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-16 pt-6 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Dataline Imaging Technology Pvt Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;