import React from "react";

const reviews = [
  {
    name: "Sujata Kumari",
    review:
      "All variety of IT products are available at the best wholesale price. Very happy with the service and on-time delivery.",
  },
  {
    name: "Bibha Agrawal",
    review:
      "Well defined infrastructure and very neat and clean place. Very friendly environment.",
  },
  {
    name: "Saurabh 745",
    review:
      "A good printer ink cartridge shop should offer genuine cartridges and competitive pricing.",
  },
  {
    name: "Isha Agarwal",
    review:
      "All IT products of various brands are available and on time delivery.",
  },
  {
    name: "Akanksha",
    review:
      "Everything I ordered came exactly as described. Excellent quality.",
  },
  {
    name: "Sanjeet Kumar",
    review:
      "Best wholesale priced store having all IT related products.",
  },
  {
    name: "M/S Siwan IT Services",
    review:
      "All brands are available and staff are very supportive and professional.",
  },
];

const infiniteReviews = [...reviews, ...reviews];

const getAvatarColor = (name) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-red-500",
  ];

  return colors[name.charCodeAt(0) % colors.length];
};

const Review = () => {
  return (
    <section className="py-16 bg-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Customer Reviews
        </h2>

        <div className="relative overflow-hidden">
          <div className="marquee-track">
            {infiniteReviews.map((item, index) => (
              <div
                key={index}
                className="w-[340px] md:w-[360px] mx-3 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-shrink-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full text-white flex items-center justify-center font-bold ${getAvatarColor(
                      item.name
                    )}`}
                  >
                    {item.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    <div className="text-yellow-500">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <div className="text-4xl text-gray-200 leading-none mb-2">
                  "
                </div>

                <p className="text-gray-600 leading-7 text-[16px]">
                  {item.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;