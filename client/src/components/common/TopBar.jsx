import React from 'react';
import { Truck, Headset, Shield } from 'lucide-react'; // Adding relevant icons!

const TopBar = () => {
  return (
    <div className="w-full bg-black text-white py-2 shadow-md overflow-hidden">
      <div className="flex items-center space-x-10 animate-marquee font-medium tracking-wider uppercase text-sm">

        {/* <div className="flex items-center space-x-3">
          <Truck size={16} className="text-yellow-300" />
          <span>Pan India Shipping Available</span>
        </div> */}
        <div className="flex items-center space-x-3">
          <Shield size={16} className="text-green-300" />
          <span>High-quality IT Accessories</span>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Headset size={16} className="text-pink-300" />
          <span>24/7 Customer Support</span>
        </div> */}
        <div className="flex items-center space-x-3">
          {/* <Truck size={16} className="text-yellow-300" /> */}
          <span>Laptop |      
      Desktop |             
      Printers | Toners Cartridges | Consumables | peripherals. 
      All IT Products – Wholesale </span>
        </div>
        <div className="flex items-center space-x-3">
           <Truck size={16} className="text-yellow-300" />
          <span>One-Stop Destination for PAN India Presence Supply For IT, Surveillance & Networking 
Products </span>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Headset size={16} className="text-pink-300" />
          <span>24/7 Customer Support</span>
        </div> */}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-flex;
            white-space: nowrap;
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
};

export default TopBar;
