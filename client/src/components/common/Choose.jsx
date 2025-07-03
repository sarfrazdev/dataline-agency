import React from 'react'

const Choose = () => {
  return (
   <section className="py-16 sm:py-24 bg-[#2a2a2a]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4f4f4f] via-gray-100 to-[#4f4f4f] mb-12">
            Why Choose Dataline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-[#3a3a3a] rounded-xl shadow hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#00b3b3] mb-2">Bulk Pricing & Fast Delivery</h3>
              <p className="text-sm text-gray-300">Enjoy unbeatable wholesale rates and quick dispatch for all orders..</p>
            </div>
            <div className="p-6 bg-[#3a3a3a] rounded-xl shadow hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#00b3b3] mb-2">Wide Product Range</h3>
              <p className="text-sm text-gray-300">From everyday office supplies to advanced imaging machines – we've got it 
all. </p>
            </div>
            <div className="p-6 bg-[#3a3a3a] rounded-xl shadow hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#00b3b3] mb-2">Popular Brands</h3>
              <p className="text-sm text-gray-300">Prodot | HP | Dell | Canon | Epson | Brother | Acer | Zebronics | consistent | 
Lenovo | CP Plus | Hikvision | D-Link | WD | Seagate |</p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Choose