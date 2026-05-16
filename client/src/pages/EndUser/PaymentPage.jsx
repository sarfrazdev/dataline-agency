import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import { BASE_URL } from '../../utils/apiPath';
import NavLayout from '../../components/auth/NavLayout';


const qrCode="/brand/qrCode.jpeg"
const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { shippingInfo } = location.state || {};
  const userRole = localStorage.getItem('role') || 'enduser';
  const [proofFile, setProofFile] = useState(null);

  useEffect(() => {
    if (!shippingInfo) {
      toast.error('Missing shipping info.');
      navigate('/checkout');
    }
  }, [shippingInfo, navigate]);

  const handleRazorpayPayment = async () => {
    try {
      toast.loading('Creating order...');
      const { data } = await axiosInstance.post(`${BASE_URL}/orders`, { shippingInfo });
      const { orderId, razorpayOrderId, amount, currency, keyId } = data;

      const options = {
        key: keyId,
        amount: amount.toString(),
        currency,
        name: 'Dataline',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          await axiosInstance.post(`${BASE_URL}/payment/verify`, {
            orderId,
            paymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });
          toast.dismiss();
          toast.success('Payment successful!');
          navigate('/orders');
        },
        prefill: {
          name: shippingInfo.fullName,
          email: '',
          contact: shippingInfo.phone
        },
        theme: { color: '#22d3ee' }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.dismiss();
      toast.error('Failed to initiate Razorpay');
      console.error(err);
    }
  };

  const submitManualOrder = async () => {
    if (!proofFile) return toast.error('Upload payment proof');

    try {
      toast.loading('Submitting manual order...');
      const formData = new FormData();
      formData.append('paymentProof', proofFile);
      formData.append('data', JSON.stringify({ shippingInfo }));

      await axiosInstance.post(`${BASE_URL}/orders/manual`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.dismiss();
      toast.success('Order placed! Awaiting confirmation');
      navigate('/orders');
    } catch (err) {
      toast.dismiss();
      toast.error('Manual order failed');
      console.error(err);
    }
  };

  if (!shippingInfo) return null;

  return (
  <NavLayout>
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 px-4 py-12">
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
        Complete Payment
      </h1>

      {/* ENDUSER */}
      {userRole === 'enduser' && (
        <div className="space-y-6">

          {/* Bank Card */}
          <div className="bg-gray-50 border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-teal-500 pl-2">
              Bank Transfer
            </h2>

            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li><strong>A/C Holder:</strong> Dataline Agencies</li>
              <li><strong>Bank:</strong> HDFC BANK</li>
              <li><strong>Account No:</strong>502900117382414</li>
              <li><strong>IFSC:</strong> HDFC0000186</li>
              <li><strong>Branch:</strong> Exhibition Road ,PATNA</li>
            </ul>
            <p>or</p>
          
          <h1>upi Id:9334108360@okbizaxis</h1>

          <p>or</p>
          <img src={qrCode} alt="QR Code" className="w-32 h-32 mx-auto object-cover" />


            {/* Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Upload Payment Proof (jpg/png/pdf)
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* CTA */}
            <button
              onClick={submitManualOrder}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-[1.02] transition"
            >
              Submit Bank Transfer
            </button>
          </div>
        </div>
      )}

      {/* RESELLER / DISTRIBUTOR */}
      {['reseller', 'distributor'].includes(userRole) && (
        <div className="space-y-6">

          <div className="bg-gray-50 border rounded-xl p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 border-l-4 border-teal-500 pl-2">
              Bank Details
            </h2>

           
            <ul className="text-sm text-gray-700 space-y-1 mb-4">
              <li><strong>A/C Holder:</strong> Dataline Agencies</li>
              <li><strong>Bank:</strong> HDFC BANK</li>
              <li><strong>Account No:</strong>502900117382414</li>
              <li><strong>IFSC:</strong> HDFC0000186</li>
              <li><strong>Branch:</strong> Exhibition Road ,PATNA</li>
            </ul>
            <p>or</p>
          
          <h1>upi Id:9334108360@okbizaxis</h1>

          <p>or</p>
          <img src={qrCode} alt="QR Code" className="w-32 h-32 mx-auto object-cover" />
            {/* Upload */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">
                Upload Payment Proof (jpg/png/pdf)
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => setProofFile(e.target.files[0])}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            {/* CTA */}
            <button
              onClick={submitManualOrder}
              className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-[1.02] transition"
            >
              Submit Order
            </button>
          </div>
        </div>
      )}

    </div>
  </div>
</NavLayout>
  );
};

export default PaymentPage;
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import axiosInstance from '../../utils/axiosInstance';
// import { BASE_URL } from '../../utils/apiPath';
// import NavLayout from '../../components/auth/NavLayout';

// const qrCode = "/brand/qrCode.jpeg";

// const PaymentPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { shippingInfo } = location.state || {};
//   const userRole = localStorage.getItem('role') || 'enduser';

//   const [proofFile, setProofFile] = useState(null);

//   useEffect(() => {
//     if (!shippingInfo) {
//       toast.error('Missing shipping info.');
//       navigate('/checkout');
//     }
//   }, [shippingInfo, navigate]);

//   // Copy Function
//   const copyToClipboard = (text, label) => {
//     navigator.clipboard.writeText(text);
//     toast.success(`${label} copied`);
//   };

//   const handleRazorpayPayment = async () => {
//     try {
//       toast.loading('Creating order...');

//       const { data } = await axiosInstance.post(
//         `${BASE_URL}/orders`,
//         { shippingInfo }
//       );

//       const {
//         orderId,
//         razorpayOrderId,
//         amount,
//         currency,
//         keyId
//       } = data;

//       const options = {
//         key: keyId,
//         amount: amount.toString(),
//         currency,
//         name: 'Dataline',
//         description: 'Order Payment',
//         order_id: razorpayOrderId,

//         handler: async function (response) {
//           await axiosInstance.post(
//             `${BASE_URL}/payment/verify`,
//             {
//               orderId,
//               paymentId: response.razorpay_payment_id,
//               razorpayOrderId: response.razorpay_order_id,
//               signature: response.razorpay_signature,
//             }
//           );

//           toast.dismiss();
//           toast.success('Payment successful!');
//           navigate('/orders');
//         },

//         prefill: {
//           name: shippingInfo.fullName,
//           email: '',
//           contact: shippingInfo.phone,
//         },

//         theme: {
//           color: '#22d3ee',
//         },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//     } catch (err) {
//       toast.dismiss();
//       toast.error('Failed to initiate Razorpay');
//       console.error(err);
//     }
//   };

//   // const submitManualOrder = async () => {
//   //   if (!proofFile) return toast.error('Upload payment proof');

//   //   try {
//   //     toast.loading('Submitting manual order...');

//   //     const formData = new FormData();

//   //     formData.append('paymentProof', proofFile);
//   //     formData.append(
//   //       'data',
//   //       JSON.stringify({ shippingInfo })
//   //     );

//   //     await axiosInstance.post(
//   //       `${BASE_URL}/orders/manual`,
//   //       formData,
//   //       {
//   //         headers: {
//   //           'Content-Type': 'multipart/form-data',
//   //         },
//   //       }
//   //     );

//   //     toast.dismiss();
//   //     toast.success('Order placed! Awaiting confirmation');

//   //     navigate('/orders');

//   //   } catch (err) {
//   //     toast.dismiss();
//   //     toast.error('Manual order failed');
//   //     console.error(err);
//   //   }
//   // };

// //   const submitManualOrder = async () => {
// //     if (!proofFile) return toast.error('Upload payment proof');

// //     try {
// //       toast.loading('Submitting manual order...');
// //       const formData = new FormData();
// //       formData.append('paymentProof', proofFile);
// //       formData.append('data', JSON.stringify({ shippingInfo }));

// //       await axiosInstance.post(`${BASE_URL}/orders/manual`, formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       toast.dismiss();
// //       toast.success('Order placed! Awaiting confirmation');
// //       navigate('/orders');
// //     } catch (err) {
// //       toast.dismiss();
// //       toast.error('Manual order failed');
// //       console.error(err);
// //     }
// //   };
//   if (!shippingInfo) return null;

//   return (
//     <NavLayout>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 px-4 py-12">
//         <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">

//           {/* Heading */}
//           <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
//             Complete Payment
//           </h1>

//           {/* ENDUSER */}
//           {userRole === 'enduser' && (
//             <div className="space-y-6">

//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">

//                 <h2 className="text-xl font-semibold text-gray-800 mb-5 border-l-4 border-teal-500 pl-3">
//                   Bank Transfer
//                 </h2>

//                 {/* Bank Details */}
//                 <ul className="text-sm text-gray-700 space-y-4 mb-6">

//                   <li>
//                     <strong>A/C Holder:</strong> Dataline Agencies
//                   </li>

//                   <li>
//                     <strong>Bank:</strong> HDFC BANK
//                   </li>

//                   {/* Account Number */}
//                   <li className="flex items-center gap-2 flex-wrap">
//                     <strong>Account No:</strong>
//                     502900117382414

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           '502900117382414',
//                           'Account Number'
//                         )
//                       }
//                       className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//                     >
//                       Copy
//                     </button>
//                   </li>

//                   {/* IFSC */}
//                   <li className="flex items-center gap-2 flex-wrap">
//                     <strong>IFSC:</strong>
//                     HDFC0000186

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           'HDFC0000186',
//                           'IFSC'
//                         )
//                       }
//                       className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//                     >
//                       Copy
//                     </button>
//                   </li>

//                   <li>
//                     <strong>Branch:</strong> Exhibition Road, Patna
//                   </li>
//                 </ul>

//                 {/* Divider */}
//                 <div className="flex items-center gap-3 my-6">
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                   <span className="text-gray-400 text-sm">OR</span>
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                 </div>

//                 {/* UPI */}
//                 <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

//                   <h3 className="font-semibold text-gray-800 mb-3">
//                     UPI Payment
//                   </h3>

//                   <div className="flex items-center gap-3 flex-wrap">

//                     <span className="font-medium text-gray-700">
//                       9334108360@okbizaxis
//                     </span>

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           '9334108360@okbizaxis',
//                           'UPI ID'
//                         )
//                       }
//                       className="px-4 py-1.5 text-sm bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
//                     >
//                       Copy UPI ID
//                     </button>

//                   </div>
//                 </div>

//                 {/* QR */}
//                 <div className="text-center mb-6">

//                   <p className="text-gray-600 mb-3 font-medium">
//                     Scan QR to Pay
//                   </p>

//                   <div className="inline-block p-4 bg-white rounded-2xl shadow border">
//                     <img
//                       src={qrCode}
//                       alt="QR Code"
//                       className="w-40 h-40 object-cover"
//                     />
//                   </div>
//                 </div>

//                 {/* Upload */}
//                 <div className="space-y-2">

//                   <label className="text-sm text-gray-600 font-medium">
//                     Upload Payment Proof (jpg/png/pdf)
//                   </label>

//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={(e) =>
//                       setProofFile(e.target.files[0])
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
//                   />
//                 </div>

//                 {/* CTA */}
//                 <button
//                   onClick={submitManualOrder}
//                   className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
//                 >
//                   Submit Payment Proof
//                 </button>

//               </div>
//             </div>
//           )}

//           {/* RESELLER / DISTRIBUTOR */}
//           {['reseller', 'distributor'].includes(userRole) && (
//             <div className="space-y-6">

//               <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 shadow-sm">

//                 <h2 className="text-xl font-semibold text-gray-800 mb-5 border-l-4 border-teal-500 pl-3">
//                   Bank Details
//                 </h2>

//                 <ul className="text-sm text-gray-700 space-y-4 mb-6">

//                   <li>
//                     <strong>A/C Holder:</strong> Dataline Agencies
//                   </li>

//                   <li>
//                     <strong>Bank:</strong> HDFC BANK
//                   </li>

//                   <li className="flex items-center gap-2 flex-wrap">
//                     <strong>Account No:</strong>
//                     502900117382414

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           '502900117382414',
//                           'Account Number'
//                         )
//                       }
//                       className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//                     >
//                       Copy
//                     </button>
//                   </li>

//                   <li className="flex items-center gap-2 flex-wrap">
//                     <strong>IFSC:</strong>
//                     HDFC0000186

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           'HDFC0000186',
//                           'IFSC'
//                         )
//                       }
//                       className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded-lg transition"
//                     >
//                       Copy
//                     </button>
//                   </li>

//                   <li>
//                     <strong>Branch:</strong> Exhibition Road, Patna
//                   </li>
//                 </ul>

//                 {/* Divider */}
//                 <div className="flex items-center gap-3 my-6">
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                   <span className="text-gray-400 text-sm">OR</span>
//                   <div className="flex-1 h-px bg-gray-300"></div>
//                 </div>

//                 {/* UPI */}
//                 <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

//                   <h3 className="font-semibold text-gray-800 mb-3">
//                     UPI Payment
//                   </h3>

//                   <div className="flex items-center gap-3 flex-wrap">

//                     <span className="font-medium text-gray-700">
//                       9334108360@okbizaxis
//                     </span>

//                     <button
//                       onClick={() =>
//                         copyToClipboard(
//                           '9334108360@okbizaxis',
//                           'UPI ID'
//                         )
//                       }
//                       className="px-4 py-1.5 text-sm bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition"
//                     >
//                       Copy UPI ID
//                     </button>

//                   </div>
//                 </div>

//                 {/* QR */}
//                 <div className="text-center mb-6">

//                   <p className="text-gray-600 mb-3 font-medium">
//                     Scan QR to Pay
//                   </p>

//                   <div className="inline-block p-4 bg-white rounded-2xl shadow border">
//                     <img
//                       src={qrCode}
//                       alt="QR Code"
//                       className="w-40 h-40 object-cover"
//                     />
//                   </div>
//                 </div>

//                 {/* Upload */}
//                 <div className="space-y-2">

//                   <label className="text-sm text-gray-600 font-medium">
//                     Upload Payment Proof (jpg/png/pdf)
//                   </label>

//                   <input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={(e) =>
//                       setProofFile(e.target.files[0])
//                     }
//                     className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 bg-white focus:ring-2 focus:ring-teal-500 outline-none"
//                   />
//                 </div>

//                 {/* CTA */}
//                 <button
//                   onClick={submitManualOrder}
//                   className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all"
//                 >
//                   Submit Order
//                 </button>

//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </NavLayout>
//   );
// };

// export default PaymentPage;