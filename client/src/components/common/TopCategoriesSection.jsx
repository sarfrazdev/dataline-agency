import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopCategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Laptop', logo: '/laptop.jpg' },
    { name: 'Desktop', logo: '/pc1.png' },
    { name: 'Printer', logo: '/printer.png' },
    { name: 'Scanner', logo: '/scanner.png' },
    { name: 'Cartridge', logo: '/cartidge.jpg' },
    { name: 'Biometrics', logo: '/biometrics.jpg' },
    { name: 'Ink Bottle', logo: '/ink.jpg' },
    { name: 'Keyboard', logo: '/keyboard.jpg' },
    { name: 'Mouse', logo: '/mouse.jpg' },
    { name: 'Pendrive', logo: '/pendrive.jpg' },
    { name: 'External HDD', logo: '/harddisk.jpg' },
    { name: 'Tablets', logo: '/tab.jpg' },
    {name : 'Dvr', logo: '/dvr.jpeg' },
    { name: 'Router', logo: '/router.jpg' },
    { name: 'POE Switch', logo: '/poeSWitch.jpg' },
      { name: 'Internal HDD', logo: '/harddisk.jpg' },

  ];

  const handleClick = (categoryName) => {
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="py-10">
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-cyan-400 mb-10 tracking-tight">
        ✨ Shop by Top Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 px-2">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => handleClick(category.name)}
            className="group flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.06]"
          >
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full p-[3px] bg-gradient-to-tr from-white/30 to-cyan-300 group-hover:from-cyan-400 group-hover:to-cyan-200 shadow-md transition-all duration-300">
              <div className="absolute inset-0 rounded-full animate-pulse scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 ring-2 ring-cyan-300"></div>
              <div className="bg-white rounded-full h-full w-full flex items-center justify-center overflow-hidden">
                <img
                  src={category.logo}
                  alt={category.name}
                  className="h-full w-full object-contain rounded-full"
                />
              </div>
            </div>
            <span className="mt-2 text-sm sm:text-[15px] font-medium text-white group-hover:text-cyan-300 text-center transition-colors duration-300">
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopCategoriesSection;
