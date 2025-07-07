
// // export default CheckoutPage;
// import React,{ useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-hot-toast';
// import NavLayout from '../../components/auth/NavLayout';
// import axiosInstance from '../../utils/axiosInstance';
// import { getCart, removeFromCart } from '../../utils/cartApi';
// import { BASE_URL } from '../../utils/apiPath';

// const CheckoutPage = () => {
//   const [cart, setCart] = useState({ items: [], totalAmount: 0 });
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userRole = localStorage.getItem('role') || 'enduser';

//   const [shippingInfo, setShippingInfo] = useState({
//     fullName: '', phone: '', address: '', city: '', state: '', pincode: '',
//     businessName: '', gstNumber: '', panNumber: '', companyAddress: '',
//     deliveryMethod: '', courierOption: '', customCourier: '',
//     busName: '', busNumber: '', contactNumber: '',
//   });

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         setLoading(true);
//         const data = await getCart();
//         setCart(data);
//       } catch (err) {
//         toast.error('Failed to load cart!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchShippingInfo = async () => {
//       try {
//         // Only fetch shipment info for the currently logged-in user
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;

//         const { data } = await axiosInstance.get(`${BASE_URL}/shipment/me`);
//         if (data && data.shippingInfo && data.shippingInfo.userId === userId) {
//           setShippingInfo(data.shippingInfo);
//         }
//       } catch {
//         console.log('No saved shipment info found.');
//       }
//     };

//     const localData = localStorage.getItem('shippingInfo');
//     if (localData) {
//       setShippingInfo(JSON.parse(localData));
//     }

//     fetchCart();
//     fetchShippingInfo();
//   }, []);

//   const handleChange = (e) => {
//     setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       await removeFromCart(productId);
//       toast.success('Item removed from cart');
//       const updatedCart = await getCart();
//       setCart(updatedCart);
//     } catch (error) {
//       toast.error('Failed to remove item');
//       console.error('Remove item error:', error);
//     }
//   };

//   // const handlePlaceOrder = async () => {
//   //   const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
//   //   for (let field of requiredFields) {
//   //     if (!shippingInfo[field]) return toast.error('Please fill all address details!');
//   //   }

//   //   if (!/^[1-9][0-9]{5}$/.test(shippingInfo.pincode)) {
//   //     return toast.error('Enter a valid 6-digit pincode!');
//   //   }

//   //   if (['reseller', 'distributor'].includes(userRole)) {
//   //     const { businessName, gstNumber, deliveryMethod } = shippingInfo;
//   //     if (!businessName || !gstNumber || !deliveryMethod) {
//   //       return toast.error('Please fill all business and delivery details!');
//   //     }
//   //     if (deliveryMethod === 'courier' && !shippingInfo.courierOption) {
//   //       return toast.error('Please select a courier option.');
//   //     }
//   //     if ((deliveryMethod === 'bus' || deliveryMethod === 'transport') && (!shippingInfo.busName || !shippingInfo.busNumber)) {
//   //       return toast.error('Please enter bus/transport details.');
//   //     }
//   //   } else {
//   //     shippingInfo.deliveryMethod = 'courier';
//   //   }

//   //   try {
//   //     toast.loading('Saving shipment info...');
//   //     await axiosInstance.post(`${BASE_URL}/shipment/create`, { ...shippingInfo, userRole });
//   //     localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
//   //     toast.dismiss();
//   //     toast.success('Shipment info saved!');

//   //     toast.loading('Creating order...');
//   //     const { data } = await axiosInstance.post(`${BASE_URL}/orders`, {
//   //       shippingInfo,
//   //     });

//   //     const { orderId, razorpayOrderId, amount, currency, keyId } = data;

//   //     const options = {
//   //       key: keyId,
//   //       amount: amount.toString(),
//   //       currency,
//   //       name: 'Hubnet',
//   //       description: 'Order Payment',
//   //       order_id: razorpayOrderId,
//   //       handler: async function (response) {
//   //         try {
//   //           await axiosInstance.post(`${BASE_URL}/payment/verify`, {
//   //             orderId,
//   //             paymentId: response.razorpay_payment_id,
//   //             razorpayOrderId: response.razorpay_order_id,
//   //             signature: response.razorpay_signature,
//   //           });
//   //           toast.dismiss();
//   //           toast.success('Payment successful!');
//   //           navigate('/orders');
//   //         } catch {
//   //           toast.dismiss();
//   //           toast.error('Payment verification failed!');
//   //         }
//   //       },
//   //       prefill: {
//   //         name: shippingInfo.fullName,
//   //         email: '',
//   //         contact: shippingInfo.phone,
//   //       },
//   //       theme: { color: '#22d3ee' },
//   //     };

//   //     const razorpay = new window.Razorpay(options);
//   //     razorpay.open();
//   //   } catch (error) {
//   //     toast.dismiss();
//   //     toast.error('Failed to place order');
//   //     console.error('Order Error:', error);
//   //   }
//   // };


//   const handlePlaceOrder = async () => {
//   const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
//   for (let field of requiredFields) {
//     if (!shippingInfo[field]) return toast.error('Please fill all address details!');
//   }

//   if (!/^[1-9][0-9]{5}$/.test(shippingInfo.pincode)) {
//     return toast.error('Enter a valid 6-digit pincode!');
//   }

//   if (['reseller', 'distributor'].includes(userRole)) {
//     const { businessName, gstNumber, deliveryMethod } = shippingInfo;
//     if (!businessName || !gstNumber || !deliveryMethod) {
//       return toast.error('Please fill all business and delivery details!');
//     }
//     if (deliveryMethod === 'courier' && !shippingInfo.courierOption) {
//       return toast.error('Please select a courier option.');
//     }
//     if ((deliveryMethod === 'bus' || deliveryMethod === 'transport') &&
//         (!shippingInfo.busName || !shippingInfo.busNumber)) {
//       return toast.error('Please enter bus/transport details.');
//     }
//   } else {
//     shippingInfo.deliveryMethod = 'courier';
//   }

//   try {
//     toast.loading('Saving shipment info...');
//     await axiosInstance.post(`${BASE_URL}/shipment/create`, { ...shippingInfo });
//     localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
//     toast.dismiss();
//     toast.success('Shipment info saved!');

//     toast.loading('Creating order...');

//     // ✅ Correct: only send shippingInfo
//     const { data } = await axiosInstance.post(`${BASE_URL}/orders`, {
//       shippingInfo
//     });

//     const { orderId, razorpayOrderId, amount, currency, keyId } = data || {};

//     if (!orderId || !razorpayOrderId || !amount || !currency || !keyId) {
//       toast.dismiss();
//       toast.error('Payment initialization failed: Missing payment/order details.');
//       return;
//     }

//     const options = {
//       key: keyId,
//       amount: amount.toString(),
//       currency,
//       name: 'Hubnet',
//       description: 'Order Payment',
//       order_id: razorpayOrderId,
//       handler: async function (response) {
//         try {
//           await axiosInstance.post(`${BASE_URL}/payment/verify`, {
//             orderId,
//             paymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             signature: response.razorpay_signature,
//           });
//           toast.dismiss();
//           toast.success('Payment successful!');
//           navigate('/orders');
//         } catch {
//           toast.dismiss();
//           toast.error('Payment verification failed!');
//         }
//       },
//       prefill: {
//         name: shippingInfo.fullName,
//         email: '',
//         contact: shippingInfo.phone
//       },
//       theme: { color: '#22d3ee' },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   } catch (error) {
//     toast.dismiss();
//     if (error.response?.data?.message) {
//       toast.error(error.response.data.message);  // 🧠 Show exact error
//     } else {
//       toast.error('Failed to place order');
//     }
//     console.error('Order Error:', error);
//   }
// };

//   return (
//     <NavLayout>
//       <div className="container mx-auto max-w-7xl p-6 text-white">
//         <h1 className="text-4xl font-extrabold mb-10 text-center text-cyan-400 drop-shadow-lg">🧾 Checkout</h1>

//         {loading ? (
//           <div className="flex justify-center items-center h-40">
//             <span className="border-4 border-cyan-400 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
//             <span className="ml-4 text-cyan-300">Loading cart...</span>
//           </div>
//         ) : cart.items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-40">
//             <p className="text-gray-400 text-lg">Your cart is empty.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Shipping Form */}
//             <div className="bg-gradient-to-br from-[#1a1a1d] to-[#101014] p-6 rounded-lg shadow-xl">
//               <h2 className="text-2xl font-bold mb-4 text-cyan-300">Shipping Info</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <input name="fullName" value={shippingInfo.fullName} onChange={handleChange} placeholder="Full Name" className="input" />
//                 <input name="phone" value={shippingInfo.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
//                 <input name="address" value={shippingInfo.address} onChange={handleChange} placeholder="Address" className="input col-span-full" />
//                 <input name="city" value={shippingInfo.city} onChange={handleChange} placeholder="City" className="input" />
//                 <input name="state" value={shippingInfo.state} onChange={handleChange} placeholder="State" className="input" />
//                 <input name="pincode" value={shippingInfo.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
//               </div>

//               {['reseller', 'distributor'].includes(userRole) && (
//                 <div className="mt-6 space-y-4">
//                   <h3 className="text-lg font-semibold text-cyan-200">Business & Delivery</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input name="businessName" value={shippingInfo.businessName} onChange={handleChange} placeholder="Business Name" className="input" />
//                     <input name="gstNumber" value={shippingInfo.gstNumber} onChange={handleChange} placeholder="GST Number" className="input" />
//                     <input name="panNumber" value={shippingInfo.panNumber} onChange={handleChange} placeholder="PAN Number" className="input" />
//                     <input name="companyAddress" value={shippingInfo.companyAddress} onChange={handleChange} placeholder="Company Address" className="input" />
//                   </div>
//                   <div className="flex gap-4">
//                     {['courier', 'bus', 'transport'].map((method) => (
//                       <label key={method} className="text-white">
//                         <input type="radio" name="deliveryMethod" value={method} checked={shippingInfo.deliveryMethod === method} onChange={handleChange} className="mr-2" />
//                         {method.charAt(0).toUpperCase() + method.slice(1)}
//                       </label>
//                     ))}
//                   </div>
//                   {shippingInfo.deliveryMethod === 'courier' && (
//                     <div className="flex flex-wrap gap-4">
//                       {['DTDC', 'FedEx', 'India Post', 'Ecom Express', 'Other'].map((option) => (
//                         <label key={option} className="text-white">
//                           <input type="radio" name="courierOption" value={option} checked={shippingInfo.courierOption === option} onChange={handleChange} className="mr-2" />
//                           {option}
//                         </label>
//                       ))}
//                       {shippingInfo.courierOption === 'Other' && (
//                         <input name="customCourier" value={shippingInfo.customCourier} onChange={handleChange} placeholder="Courier Name" className="input mt-2 w-full" />
//                       )}
//                     </div>
//                   )}
//                   {(shippingInfo.deliveryMethod === 'bus' || shippingInfo.deliveryMethod === 'transport') && (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <input name="busName" value={shippingInfo.busName} onChange={handleChange} placeholder="Bus/Transport Name" className="input" />
//                       <input name="busNumber" value={shippingInfo.busNumber} onChange={handleChange} placeholder="Bus Number" className="input" />
//                       <input name="contactNumber" value={shippingInfo.contactNumber} onChange={handleChange} placeholder="Transport Contact" className="input" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* Order Summary */}
//          <div className="bg-[#151518] p-6 rounded-lg shadow-xl flex flex-col justify-between">
//   <h2 className="text-xl font-bold text-cyan-300 mb-4">Order Summary</h2>
//   <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
//     {cart.items.map(item => (
//       <div key={item._id} className="flex justify-between bg-[#23232a] rounded px-3 py-2 items-center">
//         <div className="flex flex-col max-w-[140px]">
//           <span className="truncate">{item.product?.name || 'Unknown Product'}</span>
//           <span className="text-xs text-gray-400">x {item.quantity || 1}</span>
//         </div>
//         <div className="flex items-center gap-3">
//           <span className="font-semibold text-cyan-400">
//             ₹ {(item.price && item.quantity) ? (item.price * item.quantity).toFixed(2) : '0.00'}
//           </span>
//           <button
//             onClick={() => handleRemoveItem(item._id)}
//             className="text-red-400 hover:text-red-600 text-lg font-bold"
//             title="Remove item"
//           >
//             ✖
//           </button>
//         </div>
//       </div>
//     ))}
//   </div>
//   <div className="border-t border-gray-700 my-4"></div>
//   <div className="flex justify-between text-lg font-semibold">
//     <span>Total</span>
//     <span className="text-cyan-400">₹ {cart.totalAmount ? cart.totalAmount.toFixed(2) : '0.00'}</span>
//   </div>
//   <button onClick={handlePlaceOrder} className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg text-lg font-semibold transition">Place Order & Pay</button>
// </div>
//           </div>
//         )}
//       </div>
//       <style>{`
//         .input {
//           background-color: #1e1e24;
//           border: 1px solid #333;
//           color: white;
//           padding: 0.75rem 1rem;
//           border-radius: 0.5rem;
//           width: 100%;
//         }
//         .input:focus {
//           border-color: #22d3ee;
//           outline: none;
//         }
//       `}</style>
//     </NavLayout>
//   );
// };

// export default CheckoutPage;
// Updated CheckoutPage.jsx
// 1. No payment here
// 2. Only saves shipping info and redirects to /payment

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import NavLayout from '../../components/auth/NavLayout';
import axiosInstance from '../../utils/axiosInstance';
import { getCart, removeFromCart } from '../../utils/cartApi';
import { BASE_URL } from '../../utils/apiPath';

const CheckoutPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role') || 'enduser';

  const [shippingInfo, setShippingInfo] = useState({
    fullName: '', phone: '', address: '', city: '', state: '', pincode: '',
    businessName: '', gstNumber: '', panNumber: '', companyAddress: '',
    deliveryMethod: '', courierOption: '', customCourier: '',
    busName: '', busNumber: '', contactNumber: '',
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await getCart();
        setCart(data);
      } catch {
        toast.error('Failed to load cart!');
      } finally {
        setLoading(false);
      }
    };

    const fetchShippingInfo = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;
        const { data } = await axiosInstance.get(`${BASE_URL}/shipment/me`);
        if (data?.shippingInfo?.userId === userId) {
          setShippingInfo(data.shippingInfo);
        }
      } catch {
        console.log('No saved shipment info found.');
      }
    };

    const localData = localStorage.getItem('shippingInfo');
    if (localData) setShippingInfo(JSON.parse(localData));

    fetchCart();
    fetchShippingInfo();
  }, []);

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
      toast.success('Item removed from cart');
      const updatedCart = await getCart();
      setCart(updatedCart);
    } catch (error) {
      toast.error('Failed to remove item');
      console.error(error);
    }
  };

  const handleContinueToPayment = async () => {
    const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
    for (let field of requiredFields) {
      if (!shippingInfo[field]) return toast.error('Please fill all address details!');
    }

    if (!/^[1-9][0-9]{5}$/.test(shippingInfo.pincode)) {
      return toast.error('Enter a valid 6-digit pincode!');
    }

    if (['reseller', 'distributor'].includes(userRole)) {
      const { businessName, gstNumber, deliveryMethod } = shippingInfo;
      if (!businessName || !gstNumber || !deliveryMethod) {
        return toast.error('Please fill all business and delivery details!');
      }
      if (deliveryMethod === 'courier' && !shippingInfo.courierOption) {
        return toast.error('Please select a courier option.');
      }
      if ((deliveryMethod === 'bus' || deliveryMethod === 'transport') &&
          (!shippingInfo.busName || !shippingInfo.busNumber)) {
        return toast.error('Please enter bus/transport details.');
      }
    } else {
      shippingInfo.deliveryMethod = 'courier';
    }

    try {
      toast.loading('Saving shipment info...');
      await axiosInstance.post(`${BASE_URL}/shipment/create`, { ...shippingInfo });
      localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
      toast.dismiss();
      toast.success('Shipment info saved!');

      // 🚀 Redirect to new payment page
      navigate('/payment', { state: { shippingInfo } });
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to save shipping info');
    }
  };

  return (
    <NavLayout>
      <div className="container mx-auto max-w-7xl p-6 text-white">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-cyan-400 drop-shadow-lg">🧾 Checkout</h1>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <span className="border-4 border-cyan-400 border-t-transparent rounded-full w-10 h-10 animate-spin"></span>
            <span className="ml-4 text-cyan-300">Loading cart...</span>
          </div>
        ) : cart.items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-gray-400 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           <div className="bg-gradient-to-br from-[#1a1a1d] to-[#101014] p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-cyan-300">Shipping Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="fullName" value={shippingInfo.fullName} onChange={handleChange} placeholder="Full Name" className="input" />
                <input name="phone" value={shippingInfo.phone} onChange={handleChange} placeholder="Phone Number" className="input" />
                <input name="address" value={shippingInfo.address} onChange={handleChange} placeholder="Address" className="input col-span-full" />
                <input name="city" value={shippingInfo.city} onChange={handleChange} placeholder="City" className="input" />
                <input name="state" value={shippingInfo.state} onChange={handleChange} placeholder="State" className="input" />
                <input name="pincode" value={shippingInfo.pincode} onChange={handleChange} placeholder="Pincode" className="input" />
              </div>

             {['reseller', 'distributor'].includes(userRole) && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-200">Business & Delivery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="businessName" value={shippingInfo.businessName} onChange={handleChange} placeholder="Business Name" className="input" />
                    <input name="gstNumber" value={shippingInfo.gstNumber} onChange={handleChange} placeholder="GST Number" className="input" />
                    <input name="panNumber" value={shippingInfo.panNumber} onChange={handleChange} placeholder="PAN Number" className="input" />
                    <input name="companyAddress" value={shippingInfo.companyAddress} onChange={handleChange} placeholder="Company Address" className="input" />
                  </div>
                  <div className="flex gap-4">
                    {['courier', 'bus', 'transport'].map((method) => (
                      <label key={method} className="text-white">
                        <input type="radio" name="deliveryMethod" value={method} checked={shippingInfo.deliveryMethod === method} onChange={handleChange} className="mr-2" />
                        {method.charAt(0).toUpperCase() + method.slice(1)}
                      </label>
                    ))}
                  </div>
                  {shippingInfo.deliveryMethod === 'courier' && (
                    <div className="flex flex-wrap gap-4">
                      {['DTDC', 'FedEx', 'India Post', 'Ecom Express', 'Other'].map((option) => (
                        <label key={option} className="text-white">
                          <input type="radio" name="courierOption" value={option} checked={shippingInfo.courierOption === option} onChange={handleChange} className="mr-2" />
                          {option}
                        </label>
                      ))}
                      {shippingInfo.courierOption === 'Other' && (
                        <input name="customCourier" value={shippingInfo.customCourier} onChange={handleChange} placeholder="Courier Name" className="input mt-2 w-full" />
                      )}
                    </div>
                  )}
                  {(shippingInfo.deliveryMethod === 'bus' || shippingInfo.deliveryMethod === 'transport') && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input name="busName" value={shippingInfo.busName} onChange={handleChange} placeholder="Bus/Transport Name" className="input" />
                      <input name="busNumber" value={shippingInfo.busNumber} onChange={handleChange} placeholder="Bus Number" className="input" />
                      <input name="contactNumber" value={shippingInfo.contactNumber} onChange={handleChange} placeholder="Transport Contact" className="input" />
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="bg-[#151518] p-6 rounded-lg shadow-xl flex flex-col justify-between">
              <h2 className="text-xl font-bold text-cyan-300 mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {cart.items.map(item => (
                  <div key={item._id} className="flex justify-between bg-[#23232a] rounded px-3 py-2 items-center">
                    <div className="flex flex-col max-w-[140px]">
                      <span className="truncate">{item.product?.name || 'Unknown Product'}</span>
                      <span className="text-xs text-gray-400">x {item.quantity || 1}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-cyan-400">
                        ₹ {(item.price && item.quantity) ? (item.price * item.quantity).toFixed(2) : '0.00'}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="text-red-400 hover:text-red-600 text-lg font-bold"
                        title="Remove item"
                      >✖</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 my-4"></div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-cyan-400">₹ {cart.totalAmount ? cart.totalAmount.toFixed(2) : '0.00'}</span>
              </div>
              <button
                onClick={handleContinueToPayment}
                className="mt-6 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-lg text-lg font-semibold transition"
              >Continue to Payment</button>
            </div>
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default CheckoutPage;
