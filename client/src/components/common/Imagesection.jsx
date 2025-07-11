import React from 'react';

const categories = [
  {
    title: 'Surveillance',
    cards: [
      { img: '/cam1.png' },
      { img: '/cam2.png' },
      { img: '/cam3.png' },
      { img: '/cam4.png' },
    ],
  },
  {
    title: 'Wi-Fi',
    cards: [
      { img: '/wifi1.png' },
      { img: '/wifi2.png' },
      { img: '/wifi3.png' },
      { img: '/wifi4.png' },
    ],
  },
  {
    title: 'Desktop & PC',
    cards: [
      { img: '/pc1.png' },
      { img: '/pc2.png' },
      { img: '/pc3.png' },
      { img: '/pc4.png' },
    ],
  },
];

const ImageSections = () => {
  return (
    <div className="min-h-screen mt-16 py-10 px-4 md:px-16 text-white">
      {categories.map((category, idx) => (
        <section key={idx} className="mb-20">
          <h2 className="text-3xl font-bold text-cyan-300 mb-8 text-center drop-shadow-lg">
            {category.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {category.cards.map((card, i) => (
              <div
                key={i}
                className="relative group bg-[#1f1f1f] overflow-hidden shadow-lg transition-all duration-300 
                  hover:shadow-[0_0_20px_#22d3ee] hover:shadow-cyan-500/40"
              >
                <img
                  src={card.img}
                  alt={card.name || category.title}
                  className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Bottom Glow Border */}
                <div className="absolute bottom-0 left-0 h-[7px] w-full bg-gradient-to-r from-cyan-400 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ImageSections;
