import React from "react";

const BlogPage = () => {
  const sections = [
    {
      title: "High-Performance Printers",
      img: "/printer.png",
      reverse: false,
      desc: `From compact home setups to high-demand office environments, our range of high-performance printers is designed to deliver consistent, high-quality output every time. Whether you require sharp text documents or vibrant color prints, our devices are built to handle diverse workloads efficiently.

Equipped with modern features such as wireless connectivity, mobile printing support, and energy-efficient technology, these printers simplify your workflow while reducing operational costs. Their sleek and compact designs ensure they fit seamlessly into any workspace without compromising on performance.`,
      list: ["Laser and inkjet models", "Wireless printing", "Compact designs"]
    },
    {
      title: "Genuine Cartridges & Inks",
      img: "/hero5.png",
      reverse: true,
      desc: `Maintain the longevity and performance of your printers with our range of genuine cartridges and inks. Designed to deliver superior print quality, these products ensure every document and image comes out with exceptional clarity, precision, and color accuracy.

Using original consumables not only enhances output quality but also protects your printer from potential damage caused by low-quality alternatives.`,
      list: ["Original products", "Wide compatibility", "Easy installation"]
    },
    {
      title: "Crystal-Clear Monitors",
      img: "/monitor.png",
      reverse: false,
      desc: `Upgrade your visual experience with our advanced range of crystal-clear monitors, designed to deliver stunning clarity and vibrant colors. Whether you are working on detailed projects or enjoying multimedia content, our monitors provide an immersive viewing experience.

Featuring high-resolution displays and ergonomic designs, these monitors ensure comfort during extended usage.`,
      list: ["Full HD & 4K", "Adjustable stands", "Eye-care tech"]
    },
    {
      title: "Precision Mouse",
      img: "/mouse.png",
      reverse: true,
      desc: `Discover precision and comfort with our wide selection of computer mice, tailored for professionals, gamers, and everyday users. Each mouse is engineered to deliver smooth and responsive performance.

From ergonomic designs to wireless flexibility, our collection enhances productivity and comfort.`,
      list: ["High DPI", "Wireless options", "Ergonomic design"]
    },
    {
      title: "Responsive Keyboards",
      img: "/keyboard.png",
      reverse: false,
      desc: `Experience effortless typing with our range of responsive keyboards, designed for speed, comfort, and durability. Whether compact or full-sized, our keyboards fit every workspace need.

With features like tactile feedback and backlighting, typing becomes smooth and enjoyable.`,
      list: ["Mechanical & membrane", "Compact/full size", "Backlighting"]
    },
    {
      title: "Immersive Headphones",
      img: "/headphone.png",
      reverse: true,
      desc: `Immerse yourself in high-quality audio with our premium headphones. Designed for communication and entertainment, they deliver crystal-clear sound and deep bass.

With noise cancellation and comfortable design, they are ideal for long working hours.`,
      list: ["Noise cancelling", "Wireless", "Comfort fit"]
    },
    {
      title: "HD Webcams",
      img: "/webcam.png",
      reverse: false,
      desc: `Stay connected with confidence using our high-definition webcams. Perfect for meetings, streaming, and calls, they ensure clear and professional video quality.

With plug-and-play and auto-focus features, setup is simple and efficient.`,
      list: ["1080p & 4K", "Plug & play", "Auto-focus"]
    },
    {
      title: "External Storage Solutions",
      img: "/ssd.jpg",
      reverse: true,
      desc: `Protect and manage your valuable data with our external storage solutions. From high-capacity drives to ultra-fast SSDs, your data stays safe and accessible.

Designed for speed, portability, and reliability, these are essential for modern workflows.`,
      list: ["High capacity", "Portable", "Secure backup"]
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-white via-gray-50 to-gray-100 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/2 w-[500px] h-[500px] bg-blue-200/30 blur-3xl rounded-full -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-200/30 blur-2xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Enhance Your Workspace with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Top-Quality IT Accessories
            </span>
          </h1>

          <p className="text-gray-600 text-lg">
            At <span className="font-semibold text-blue-600">DataLine</span>, we offer an extensive range of IT accessories to boost your productivity and comfort.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-20">
          {sections.map((item, i) => (
            <div
              key={i}
              className={`grid md:grid-cols-2 gap-10 items-center ${
                item.reverse ? "md:flex-row-reverse" : ""
              }`}
            >

              {/* Image */}
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 blur-xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl"></div>

                <img
                  src={item.img}
                  alt={item.title}
                  className="relative rounded-3xl shadow-lg group-hover:scale-105 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-md hover:shadow-xl transition duration-500">

                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {item.title}
                </h2>

                <p className="text-gray-600 mb-4 whitespace-pre-line">
                  {item.desc}
                </p>

                <ul className="space-y-2">
                  {item.list.map((li, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {li}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Upgrade?
          </h3>

          <p className="text-gray-600 max-w-xl mx-auto mb-6">
            Explore our complete range of IT accessories and build your perfect workspace with DataLine.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md hover:scale-105 hover:shadow-xl transition duration-300"
          >
            Contact Us
          </a>
        </div>

      </div>
    </section>
  );
};

export default BlogPage;