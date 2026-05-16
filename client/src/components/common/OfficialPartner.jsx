import React from 'react'

function OfficialPartner() {
  const partners = [
    {
      name: 'GeM',
      image: './brand/gem.jpeg',
      link: 'https://fulfilment.gem.gov.in/fulfilment/#WORKSPACE_ID=NEW_SELLER_DASHBOARD',
    },
    {
      name: 'Justdial',
      image: './brand/jd.svg',
      link: 'https://www.justdial.com/Patna/Data-Line-Agencies-Dak-Bunglow-Road/0612P612STD25492_BZDET',
    },
    {
      name: 'IndiaMart',
      image: './brand/indiamart.jpg',
      link: 'https://m.indiamart.com/data-line-agencies/',
    },
  ]

  return (
    <section className="py-16 px-6">
   
      <div className="text-center mb-12">
        <p className="text-blue-600 font-semibold tracking-widest uppercase mb-2">
          Trusted Platforms
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Official Partners
        </h2>

        <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>


      <div className="max-w-8xl h-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((partner, index) => (
          <a
            key={index} 
            href={partner.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
          >
        
            <div className="w-32 h-32 flex items-center justify-center bg-white rounded-2xl p-4 mb-6 group-hover:bg-blue-50 transition shadow-xl" >
              <img
                src={partner.image}
                alt={partner.name}
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {partner.name}
            </h3>

   
            <span className="mt-3 inline-flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all">
              Visit Partner
              <span>→</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default OfficialPartner