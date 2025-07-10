

import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopCategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Laptop', logo: '/laptop.jpg' },
    {name:"Desktop" ,logo:"/pc1.png"},
    { name: 'Printer', logo: '/printer.png' },
      { name: 'Scanner', logo: '/scanner.png' },
       { name: 'Cartidge', logo: '/cartidge.jpg' },
    { name: 'Biometrics', logo: '/biometrics.jpg' },
    { name: 'Ink Bottle', logo: '/ink.jpg' },
    { name: 'Keyboard', logo: '/keyboard.jpg' },
    { name: 'Mouse', logo: '/mouse.jpg' },
    { name: 'Pendrive', logo: '/pendrive.jpg' },
    { name: 'Hard-Disk', logo: '/harddisk.jpg' },
    { name: 'Tablets', logo: '/tab.jpg' },
  ];

  const handleClick = (categoryName) => {
     navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  
  }
  return (
    <div className="px-4 py-12 rounded-lg shadow-xl">
      <h2 className="text-4xl font-extrabold text-center text-cyan-400 mb-10">
        ✨ Shop by Top Categories
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-4 rounded-xl cursor-pointer shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
            onClick={() => handleClick(category.name)}
          >
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center p-2 mb-2 shadow-inner">
              <img
                src={category.logo}
                alt={category.name}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="text-sm font-medium text-white text-center">{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCategoriesSection;
