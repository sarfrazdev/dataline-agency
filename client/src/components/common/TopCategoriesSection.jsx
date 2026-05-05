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
   <section className="py-20 px-4 md:px-16">

 
  <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-16 tracking-tight">
    ✨ Shop by Top Categories
  </h2>

 
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">

    {categories.map((category, i) => (
      <div
        key={i}
        onClick={() => handleClick(category.name)}
        className="group relative cursor-pointer"
      >

     
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-cyan-200/30 to-blue-200/30 blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />

        
        <div className="relative h-[160px] bg-white rounded-3xl border border-gray-100 flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition duration-300 overflow-hidden group-hover:-translate-y-2">

         
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

         
          <div className="h-16 w-16 flex items-center justify-center transition duration-300 group-hover:scale-110">
            <img
              src={category.logo}
              alt={category.name}
              className="h-full w-full object-contain shadow-lg"
            />
          </div>

         
          <span className="mt-3 text-sm font-semibold text-gray-800 text-center">
            {category.name}
          </span>

          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300" />
        </div>

      </div>
    ))}

  </div>
</section>
  );
};

export default TopCategoriesSection;
