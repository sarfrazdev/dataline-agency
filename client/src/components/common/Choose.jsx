import React from "react";
import { Truck, Layers, Star } from "lucide-react";

const Choose = () => {
  return (
    <section className="py-20 ">

      <div className="max-w-7xl mx-auto px-4 md:px-10">

    
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
          Why Choose <span className="text-blue-600">Dataline</span>
        </h2>

  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      
          {[ 
            {
              icon: <Truck className="w-10 h-10 text-blue-500" />,
              title: "Bulk Pricing & Fast Delivery",
              desc: "Enjoy unbeatable wholesale rates and quick dispatch for all orders."
            },
            {
              icon: <Layers className="w-10 h-10 text-purple-500" />,
              title: "Wide Product Range",
              desc: "From everyday office supplies to advanced imaging machines – we've got it all."
            },
            {
              icon: <Star className="w-10 h-10 text-yellow-500" />,
              title: "Popular Brands",
              desc: "Prodot | HP | Dell | Canon | Epson | Brother | Acer | Zebronics | Consistent | Lenovo | CP Plus | Hikvision | D-Link | WD | Seagate"
            }
          ].map((item, i) => (
            <div key={i} className="group relative">

              {/* Glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-200/30 to-purple-200/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Card */}
              <div className="relative h-[260px] flex flex-col justify-between bg-white/80 backdrop-blur-xl border border-gray-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-2xl transition duration-500 group-hover:-translate-y-2">

                {/* Top */}
                <div>
                  <div className="flex justify-center mb-4 transition group-hover:scale-110">
                    {item.icon}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                </div>

                {/* Description (controlled height) */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
                  {item.desc}
                </p>

                {/* Bottom accent */}
                <div className="mx-auto mt-4 h-[3px] w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full group-hover:w-16 transition-all duration-300" />
              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Choose;