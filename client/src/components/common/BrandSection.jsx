import { useNavigate } from 'react-router-dom';
import React from 'react';

const brands = [
  { name: 'Prodot', logo: './brand/prodot.jpg' },
  { name: 'HP', logo: './brand/hp.jpg' },
  { name: 'Canon', logo: './brand/canon.jpg' },
  { name: 'Dell', logo: './brand/dell.jpg' },
  { name: 'Brother', logo: './brand/brother.jpg' },
  { name: 'Consistent', logo: '/consistent.png' },
  { name: 'HikVision', logo: './brand/hikvision.jpg' },
  { name: 'Nova', logo: '/nova.png' },
  { name: 'Seagate', logo: './brand/segate.jpg' },
  { name: 'Asus', logo: '/asus.png' },
  { name: 'Lenovo', logo: '/lenovo.png' },
  { name: 'Acer', logo: '/acer.png' },
  { name: 'Epson', logo: './brand/epson.jpg' },
  { name: 'TP-Link', logo: './brand/tplink.jpg' },
  { name: 'Logitech', logo: './brand/logitech.jpg' },
  { name: 'Zebronics', logo: './brand/zebronics.jpg' },
  { name: 'Cp plus', logo: './cpplus.png' },
];

const BrandSection = () => {
  const navigate = useNavigate();

  const handleClick = (brandName) => {
    navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  return (
<section className="py-20 px-4 md:px-16  ">

  {/* Heading */}
  <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-16 tracking-tight">
    ✨ Shop by Top Brands
  </h2>

  {/* Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

    {brands.map((brand, i) => (
      <div
        key={i}
        onClick={() => handleClick(brand.name)}
        className="group relative cursor-pointer"
      >

        {/* Outer glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-200/30 to-purple-200/30 blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />

        {/* Card */}
        <div className="relative h-[160px] bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group-hover:-translate-y-2">

          {/* Top light sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

          {/* Logo */}
          <div className="h-16 w-16 flex items-center justify-center transition duration-300 group-hover:scale-110">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-full w-full object-contain shadow-lg"
            />
          </div>

          {/* Name */}
          <span className="mt-3 text-sm font-semibold text-gray-800 text-center">
            {brand.name}
          </span>

          {/* Bottom bar */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
        </div>

      </div>
    ))}

  </div>
</section>
  );
};

export default BrandSection;


// import { useNavigate } from "react-router-dom";
// import React, { useRef, useEffect } from "react";
// import Tilt from "react-parallax-tilt";

// const brands = [
//   { name: "Prodot", logo: "./brand/prodot.jpg" },
//   { name: "HP", logo: "./brand/hp.jpg" },
//   { name: "Canon", logo: "./brand/canon.jpg" },
//   { name: "Dell", logo: "./brand/dell.jpg" },
//   { name: "Brother", logo: "./brand/brother.jpg" },
//   { name: "Consistent", logo: "/consistent.png" },
//   { name: "HikVision", logo: "./brand/hikvision.jpg" },
//   { name: "Nova", logo: "/nova.png" },
//   { name: "Seagate", logo: "./brand/segate.jpg" },
//   { name: "Asus", logo: "/asus.png" },
//   { name: "Lenovo", logo: "/lenovo.png" },
//   { name: "Acer", logo: "/acer.png" },
//   { name: "Epson", logo: "./brand/epson.jpg" },
//   { name: "TP-Link", logo: "./brand/tplink.jpg" },
//   { name: "Logitech", logo: "./brand/logitech.jpg" },
//   { name: "Zebronics", logo: "./brand/zebronics.jpg" },
//   { name: "Cp plus", logo: "./cpplus.png" },
// ];

// const BrandSection = () => {
//   const navigate = useNavigate();
//   const containerRef = useRef();

//   const handleClick = (brandName) => {
//     navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
//   };

//   // 🔥 Center auto-scale effect
//   useEffect(() => {
//     const container = containerRef.current;

//     const handleScroll = () => {
//       const cards = container.querySelectorAll(".brand-card");

//       cards.forEach((card) => {
//         const rect = card.getBoundingClientRect();
//         const center = window.innerWidth / 2;

//         const distance = Math.abs(center - (rect.left + rect.width / 2));
//         const scale = Math.max(0.9, 1.25 - distance / 500);

//         card.style.transform = `scale(${scale})`;
//         card.style.zIndex = Math.floor(scale * 10);
//       });
//     };

//     container.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => container.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <section className="py-24 bg-gradient-to-b from-white to-gray-100 overflow-hidden">

//       {/* Heading */}
//       <h2 className="text-center text-4xl font-bold text-gray-900 mb-20">
//         ✨ Shop by Top Brands
//       </h2>

//       {/* Edge Fade */}
//       <div className="relative">
//         <div className="absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-white to-transparent z-20" />
//         <div className="absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-white to-transparent z-20" />

//         {/* Scroll Container */}
//         <div
//           ref={containerRef}
//           className="flex gap-16 overflow-x-auto px-20 scrollbar-hide"
//         >
//           {[...brands, ...brands].map((brand, i) => (
//             <Tilt
//               key={i}
//               tiltMaxAngleX={10}
//               tiltMaxAngleY={10}
//               glareEnable={true}
//               glareMaxOpacity={0.15}
//               className="brand-card min-w-[220px] flex-shrink-0 transition duration-300"
//             >
//               <div
//                 onClick={() => handleClick(brand.name)}
//                 onMouseMove={(e) => {
//                   const rect = e.currentTarget.getBoundingClientRect();
//                   e.currentTarget.style.setProperty(
//                     "--x",
//                     `${e.clientX - rect.left}px`
//                   );
//                   e.currentTarget.style.setProperty(
//                     "--y",
//                     `${e.clientY - rect.top}px`
//                   );
//                 }}
//                 className="group relative h-[260px] bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl flex flex-col items-center justify-center shadow-md cursor-pointer overflow-hidden hover:shadow-2xl transition"
//               >

//                 {/* Mouse-follow glow */}
//                 <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(59,130,246,0.25),transparent_40%)]" />

//                 {/* Reflection */}
//                 <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

//                 {/* Logo */}
//                 <div className="relative z-10 h-24 w-24 flex items-center justify-center transition duration-500 group-hover:scale-125">
//                   <img
//                     src={brand.logo}
//                     alt={brand.name}
//                     className="h-full w-full object-contain"
//                   />
//                 </div>

//                 {/* Name */}
//                 <span className="mt-5 text-base font-semibold text-gray-800 z-10">
//                   {brand.name}
//                 </span>

//                 {/* Accent */}
//                 <div className="mt-3 h-[3px] w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full z-10 group-hover:w-14 transition-all duration-300" />
//               </div>
//             </Tilt>
//           ))}
//         </div>
//       </div>

//       {/* Hide scrollbar */}
//       <style>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           scrollbar-width: none;
//         }
//       `}</style>

//     </section>
//   );
// };

// export default BrandSection;