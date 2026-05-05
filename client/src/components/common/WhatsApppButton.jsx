import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const WhatsAppButton = () => {
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  // Auto show message after 3 sec
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Floating Button */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer"
      >
        {/* Pulse Ring */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40"></div>

        {/* Button */}
        <div className="relative bg-green-500 p-4 rounded-full shadow-xl flex items-center justify-center">
          {open ? (
            <FaTimes size={22} color="white" />
          ) : (
            <FaWhatsapp size={28} color="white" />
          )}
        </div>

        {/* Notification Badge */}
        {!open && showMessage && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-[2px] rounded-full">
            1
          </span>
        )}
      </div>

      {/* Floating Chat Bubble (NOT BOX) */}
      {!open && showMessage && (
        <div className="fixed bottom-24 right-6 z-40 animate-slideUp">
          <div className="bg-white px-4 py-3 rounded-2xl shadow-lg max-w-[220px] text-sm text-gray-700 relative">

            👋 Hi! Need help choosing products?

            {/* Bubble Tail */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white rotate-45"></div>
          </div>
        </div>
      )}

      {/* Full Popup */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 animate-fadeIn">

          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center gap-3">
            <FaWhatsapp size={22} />
            <div>
              <h3 className="font-semibold text-sm">Dataline Support</h3>
              <p className="text-xs opacity-90">Online now</p>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 text-sm text-gray-700 space-y-2">
            <div className="bg-gray-100 px-3 py-2 rounded-lg w-fit">
              👋 Hello! How can we help you today?
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/919334064100?text=Hi%20I%20want%20to%20know%20about%20your%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="block mx-4 mb-4 text-center bg-green-500 text-white py-2 rounded-full font-medium"
          >
            Start Chat
          </a>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;