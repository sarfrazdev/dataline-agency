import React from "react";

const categories = [
  {
    title: "Surveillance",
    cards: [
      { img: "/productSectionImg/cam1.jpeg" },
      { img: "/productSectionImg/cam2.jpeg" },
      { img: "/productSectionImg/cam3.jpeg" },
      { img: "/productSectionImg/cam4.jpeg" },
    ],
  },
  {
    title: "Wi-Fi",
    cards: [
      { img: "/productSectionImg/wifi1.jpeg" },
      { img: "/productSectionImg/wifi2.jpeg" },
      { img: "/productSectionImg/wifi3.jpeg" },
      { img: "/productSectionImg/wifi4.jpeg" },
    ],
  },
  {
    title: "Desktop & PC",
    cards: [
      { img: "/productSectionImg/desktop1.jpeg" },
      { img: "/productSectionImg/desktop2.jpeg" },
      { img: "/productSectionImg/desktop3.jpeg" },
      { img: "/productSectionImg/desktop4.jpeg" },
    ],
  },
];

const ImageSections = () => {
  return (
 <div className="min-h-screen mt-16 py-12 px-4 md:px-16">
  {categories.map((category, idx) => (
    <section key={idx} className="mb-20">

      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        {category.title}
      </h2>

      {/* Cards Container */}
      <div className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:gap-8 md:overflow-visible">

        {category.cards.map((card, i) => (
          <div
            key={i}
            className="group relative min-w-[280px] md:min-w-0 bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 snap-center"
          >

            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={card.img}
                alt={category.title}
                className="w-full h-[240px] object-cover transition duration-700 group-hover:scale-110"
              />

              {/* Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            </div>

            {/* Top Tag */}
            <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-lg px-4 py-1 text-xs font-semibold text-gray-800 rounded-full shadow">
              {category.title}
            </div>

            {/* Bottom Blur Footer */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="bg-white/70 backdrop-blur-xl px-4 py-3 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800">
                  {category.title}
                </span>

                <span className="w-2 h-2 bg-blue-500 rounded-full group-hover:scale-150 transition" />
              </div>
            </div>

            {/* Hover Border */}
            <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-200 transition duration-300" />
          </div>
        ))}

      </div>
    </section>
  ))}
</div>
  );
};

export default ImageSections; 