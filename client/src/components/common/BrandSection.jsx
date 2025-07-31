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
  { name: 'Segate', logo: './brand/segate.jpg' },
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
    <section className="py-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-cyan-400 mb-10 tracking-tight">
        ✨ Shop by Top Brands
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2">
        {brands.map((brand) => (
          <div
            key={brand.name}
            onClick={() => handleClick(brand.name)}
            className="group flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.06]"
          >
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[3px] bg-gradient-to-tr from-white/30 to-cyan-300 group-hover:from-cyan-400 group-hover:to-cyan-200 shadow-md transition-all duration-300">
              <div className="absolute inset-0 rounded-full animate-pulse scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ring-2 ring-cyan-300"></div>
              <div className="bg-white rounded-full h-full w-full flex items-center justify-center overflow-hidden">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
            </div>
            <span className="mt-2 text-sm sm:text-[15px] font-medium text-white group-hover:text-cyan-300 text-center transition-colors duration-300">
              {brand.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
