import React, { useState } from 'react';
import { HelpCircle, FileText } from 'lucide-react';

const SupportPage = () => {
  const endUserFaqs = [
    {
      question: "WHAT ARE THE OPTION FOR DELIVERY?",
      answer: "BLUE DART, INDIA POST, COURIER."
    },
    {
      question: "Can I modify or cancel my order after confirmation?",
      answer: "Yes, but only before dispatch. Once the order is shipped, modifications or cancellations are not possible."
    },
    {
      question: "CAN WE REPLACE OR RETURN ORDER?",
      answer: "NO, BUT AS PER COMPANY POLICY OR ONSITE OBILEGE CARRIED WARRANTY BY COMPANY."
    },
    {
      question: "WHERE I CAN CHECK PRODUCT PRICE?",
      answer: "BY CLICKING ON PRODUCT LINK."
    },
    {
      question: "Can I track my order after dispatch?",
      answer: "Yes. Once your order is shipped, we will share a tracking ID or courier details via WhatsApp or email so you can monitor delivery in real time."
    },
    {
      question: "Who do I contact for support or issues?",
      answer: "You can reach our dedicated support team via: Phone/WhatsApp: +91-9334064100, Email: AGENCIES.DATALINE@GMAIL.COM"
    },
    {
      question: "WHAT ARE YOUR BUSINESS HOURS",
      answer: "MON TO SAT – 10:00 AM - 8:00 PM"
    },
    {
      question: "HOW TO DO PAYMENT?",
      answer: "BY QR OF UPI, GOOGLEPAY"
    },
    {
      question: "Is support available on Sundays or holidays?",
      answer: "Our regular support hours are Monday to Saturday. For urgent issues, you can WhatsApp us — we will try to respond at the earliest."
    }
  ];

  const b2bFaqs = [
    {
      question: "Do I need a GST number to place an order?",
      answer: "Having a GST number is recommended for availing GST invoices and tax credits. However, we also cater to businesses without GST for non-credit billing."
    },
    {
      question: "Do you provide GST billing?",
      answer: "Yes, all our B2B invoices come with full GST details. Ensure you share your GST number at the time of placing the order for input tax credit eligibility."
    },
    {
      question: "Can I track my order after dispatch?",
      answer: "Yes. Once your order is shipped, we will share a tracking ID or courier details via WhatsApp or email so you can monitor delivery in real time."
    },
    {
      question: "What details do I need to provide when ordering?",
      answer: "Please share: Product name or code, Quantity required, Business name & GST number (if needed), Delivery address with PIN code, Preferred payment method."
    },
    {
      question: "Is support available on Sundays or holidays?",
      answer: "Our regular support hours are Monday to Saturday. For urgent issues, you can WhatsApp us — we will try to respond at the earliest."
    },
    {
      question: "Who do I contact for support or issues?",
      answer: "Phone/WhatsApp: +91-9334064100, Email: AGENCIES.DATALINE@GMAIL.COM, Support Hours: Mon–Sat, 10:00 AM – 8:00 PM"
    },
    {
      question: "Can I modify or cancel my order after confirmation?",
      answer: "Yes, but only before dispatch. Once the order is shipped, modifications or cancellations are not possible."
    },
    {
      question: "Do I get an invoice and order confirmation?",
      answer: "Absolutely. You will receive a tax invoice (with GST) after payment. A confirmation message or email will also be sent."
    },
    {
      question: "What are the delivery options?",
      answer: "We provide 3 modes: 1. Courier  2. Bus  3. Transport"
    }
  ];

  const [openEndUserIndex, setOpenEndUserIndex] = useState(null);
  const [openB2BIndex, setOpenB2BIndex] = useState(null);

  const toggleEndUserFaq = (index) => {
    setOpenEndUserIndex(openEndUserIndex === index ? null : index);
  };

  const toggleB2BFaq = (index) => {
    setOpenB2BIndex(openB2BIndex === index ? null : index);
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 from-blue-800 via-blue-900 to-blue-950">
      <div className="grid md:grid-cols-2 gap-12">

        {/* End User FAQs */}
        <div>
          <h2 className="flex items-center text-3xl font-extrabold text-white mb-6">
            <HelpCircle className="w-8 h-8 mr-3 text-blue-400" /> End USER FAQs
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl hover:shadow-blue-300/30 transition-shadow">
            {endUserFaqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0">
                <button
                  onClick={() => toggleEndUserFaq(index)}
                  className="flex justify-between items-center w-full py-4 px-6 text-gray-800 font-semibold hover:text-blue-600 focus:outline-none"
                >
                  {faq.question}
                  <span className="text-blue-600 text-xl">
                    {openEndUserIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`px-6 pb-4 text-gray-600 text-sm overflow-hidden transition-max-height duration-500 ease-in-out ${openEndUserIndex === index ? 'max-h-40' : 'max-h-0'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B2B FAQs */}
        <div>
          <h2 className="flex items-center text-3xl font-extrabold text-white mb-6">
            <FileText className="w-8 h-8 mr-3 text-yellow-400" /> B2B FAQs
          </h2>
          <div className="bg-white rounded-2xl shadow-2xl hover:shadow-yellow-300/30 transition-shadow">
            {b2bFaqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0">
                <button
                  onClick={() => toggleB2BFaq(index)}
                  className="flex justify-between items-center w-full py-4 px-6 text-gray-800 font-semibold hover:text-yellow-600 focus:outline-none"
                >
                  {faq.question}
                  <span className="text-yellow-600 text-xl">
                    {openB2BIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`px-6 pb-4 text-gray-600 text-sm overflow-hidden transition-max-height duration-500 ease-in-out ${openB2BIndex === index ? 'max-h-40' : 'max-h-0'}`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SupportPage;
