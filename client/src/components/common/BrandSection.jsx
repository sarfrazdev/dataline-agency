import { useNavigate } from 'react-router-dom';
import React from 'react';

const brands = [
  { name: 'HP',         logo: '/hp.png' },
  { name: 'Canon',      logo: '/canon.png' },
  { name: 'Dell',       logo: '/dell.png' },
  { name: 'Brother',    logo: '/brother.png' },
  { name: 'Consistent', logo: '/consistent.png' },
  { name: 'HikVision',  logo: '/hikvision.png' },
  { name: 'Nova',       logo: '/nova.png' },
  { name: 'Segate',     logo: '/segate.png' },
  { name: 'Asus',       logo: '/asus.png' },
  { name: 'Lenovo',     logo: '/lenovo.png' },
  { name: 'Acer',       logo: '/acer.png' },
  { name: 'Epson',      logo: '/epson.png' },
  { name: 'TP-Link',    logo: '/tplink.png' },
  { name: 'Logitech',   logo: '/logitech.png' },
  { name: 'Zebronics',  logo: '/zebronics.png' },
  { name: 'Cp plus',    logo: '/cpplus.png' },
];

const BrandSection = () => {
  const navigate = useNavigate();

  const handleClick = (brandName) => {
    navigate(`/shop?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="px-4 py-12  rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-10">✨ Shop by Top Brands</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-4 rounded-xl cursor-pointer shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => handleClick(brand.name)}
          >
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center p-2 mb-2 shadow-inner">
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-medium text-white text-center">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
