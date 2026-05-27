import { useNavigate } from 'react-router-dom';
import React from 'react';

const brands = [
  { name: 'Prodot', logo: './brand/prodot.png' },
  { name: 'HP', logo: './brand/hp.jpg' },
  { name: 'Canon', logo: './brand/canon1.png' },
  { name: 'Dell', logo: './brand/dell.jpg' },
  { name: 'Brother', logo: './brand/brother.jpg' },
  { name: 'Consistent', logo: '/consistent.png' },
  { name: 'HikVision', logo: './brand/hikvision.jpg' },
  { name: 'Nova', logo: '/nova.png' },
  { name: 'Seagate', logo: './brand/segate.jpg' },
  { name: 'Asus', logo: '/asus.png' },
  { name: 'Lenovo', logo: './brand/lenovo.png' },
  { name: 'Acer', logo: '/acer.png' },
  { name: 'Epson', logo: './brand/epson.jpg' },
  { name: 'TP-Link', logo: './brand/tplink.jpg' },
  { name: 'Logitech', logo: './brand/logitech.jpg' },
  { name: 'Zebronics', logo: './brand/zebronics.jpg' },
  { name: 'Cp plus', logo: './cpplus.png' },
  {name:'Geonix',logo:'./geonix.png'},
  {name:"Sandisk",logo:'./brand/sanddisk.png'},
  {name:"Quick Heal ",logo:'./brand/quickheal.png'},
  {name:"Mantra ",logo:'./brand/mantra.png'},

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


