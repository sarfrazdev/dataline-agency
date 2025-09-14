import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
return (
    <a
        href="https://wa.me/919334064100" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-3 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
    >
        <FaWhatsapp size={30} color="white" />
    </a>
);
};

export default WhatsAppButton