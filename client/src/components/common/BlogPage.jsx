import React from 'react';

const BlogPage = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#2a2a2a]">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold mb-4 text-white">
          Enhance Your Workspace with Top-Quality IT Accessories
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          At <span className="font-semibold text-blue-400">DataLine</span>, we offer an extensive range of IT accessories to boost your productivity and comfort. Explore our premium selection of peripherals and devices to create the perfect workspace.
        </p>
      </div>

      <div className="space-y-12">
        {/* Printers */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/printer.png"
            alt="High-quality printers"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">High-Performance Printers</h2>
            <p className="text-gray-300 mb-4">
              From home offices to bustling workspaces, our range of reliable printers ensures crisp, clear prints every time. With modern features like wireless connectivity and eco-friendly ink usage, your printing tasks are easier than ever.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Laser and inkjet models</li>
              <li>Wireless printing</li>
              <li>Compact designs for any space</li>
            </ul>
          </div>
        </div>

        {/* Cartridges */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Genuine Cartridges & Inks</h2>
            <p className="text-gray-300 mb-4">
              Keep your printer running smoothly with our genuine cartridges and inks. Enjoy vibrant colors and sharp texts while ensuring the longevity of your printer.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Original manufacturer products</li>
              <li>Wide compatibility</li>
              <li>Easy installation and replacement</li>
            </ul>
          </div>
          <img
            src="/hero5.png"
            alt="Genuine printer cartridges"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Monitors */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/monitor.png"
            alt="Latest computer monitors"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Crystal-Clear Monitors</h2>
            <p className="text-gray-300 mb-4">
              Experience exceptional clarity and immersive visuals with our cutting-edge monitors. Whether for work or play, our monitors offer vibrant colors and ergonomic designs.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Full HD and 4K resolution</li>
              <li>Adjustable stands for comfort</li>
              <li>Eye-care and energy-saving features</li>
            </ul>
          </div>
        </div>

        {/* Mice */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Precision Mouse</h2>
            <p className="text-gray-300 mb-4">
              Find the perfect mouse for your needs—wired or wireless, ergonomic or gaming. Our selection ensures smooth tracking and comfort for long hours of use.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>High DPI for accurate control</li>
              <li>Wireless connectivity options</li>
              <li>Ergonomic designs for comfort</li>
            </ul>
          </div>
          <img
            src="/mouse.png"
            alt="Ergonomic computer mice"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Keyboards */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/keyboard.png"
            alt="Comfortable keyboards"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Responsive Keyboards</h2>
            <p className="text-gray-300 mb-4">
              Enjoy comfortable typing experiences with our range of keyboards—mechanical, membrane, or ergonomic—to suit your workspace and preferences.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Mechanical and membrane options</li>
              <li>Compact and full-size layouts</li>
              <li>Wireless connectivity and backlighting features</li>
            </ul>
          </div>
        </div>

        {/* Headphones */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">Immersive Headphones</h2>
            <p className="text-gray-300 mb-4">
              Whether you’re in meetings or enjoying music, our noise-cancelling and high-fidelity headphones ensure crystal-clear audio and comfort throughout the day.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>Over-ear and in-ear styles</li>
              <li>Noise-cancelling technology</li>
              <li>Wireless and wired options</li>
            </ul>
          </div>
          <img
            src="/headphone.png"
            alt="High-quality headphones"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        {/* Webcams */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src="/webcam.png"
            alt="Reliable webcams"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">HD Webcams</h2>
            <p className="text-gray-300 mb-4">
              Stay connected with colleagues and clients through our reliable HD webcams. With clear video and built-in microphones, online meetings and video chats have never been easier.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>1080p and 4K resolution</li>
              <li>Plug-and-play compatibility</li>
              <li>Auto-focus and low-light correction</li>
            </ul>
          </div>
        </div>

        {/* External Storage */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-2">External Storage Solutions</h2>
            <p className="text-gray-300 mb-4">
              Safeguard your important files with our range of external hard drives and SSDs. Fast, reliable, and secure—keep your data safe and accessible wherever you go.
            </p>
            <ul className="list-disc list-inside text-gray-400">
              <li>High-capacity drives</li>
              <li>Compact and portable designs</li>
              <li>Secure data backup and transfer</li>
            </ul>
          </div>
          <img
            src="/ssd.jpg"
            alt="External storage devices"
            className="w-full md:w-1/2 rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold text-white mb-2">Ready to Upgrade?</h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Explore our full range of IT accessories and find the perfect tools to level up your workspace.
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-teal-700 transition"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
};

export default BlogPage;
