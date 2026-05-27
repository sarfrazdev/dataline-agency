// import React, { useState, useEffect } from 'react';
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
//     businessName: '', panNumber: '', companyAddress: '',
//     deliveryMethod: '', courierOption: '', customCourier: '',
//     busName: '', busNumber: '', contactNumber: '',
//   });

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         setLoading(true);
//         const data = await getCart();
//         setCart(data);
//       } catch {
//         toast.error('Failed to load cart!');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchShippingInfo = async () => {
//       try {
//         const userId = localStorage.getItem('userId');
//         if (!userId) return;
//         const { data } = await axiosInstance.get(`${BASE_URL}/shipment/me`);
//         if (data?.shippingInfo?.userId === userId) {
//           setShippingInfo(data.shippingInfo);
//         }
//       } catch {
//         console.log('No saved shipment info found.');
//       }
//     };

//     const localData = localStorage.getItem('shippingInfo');
//     if (localData) setShippingInfo(JSON.parse(localData));

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
//       console.error(error);
//     }
//   };

//   const handleContinueToPayment = async () => {
//     const requiredFields = ['fullName', 'phone', 'address', 'city', 'state', 'pincode'];
//     for (let field of requiredFields) {
//       if (!shippingInfo[field]) return toast.error('Please fill all address details!');
//     }

//     if (!/^[1-9][0-9]{5}$/.test(shippingInfo.pincode)) {
//       return toast.error('Enter a valid 6-digit pincode!');
//     }

//     if (['reseller', 'distributor'].includes(userRole)) {
//       const { businessName, gstNumber, deliveryMethod } = shippingInfo;
//       if (!businessName || !gstNumber || !deliveryMethod) {
//         return toast.error('Please fill all business and delivery details!');
//       }
//       if (deliveryMethod === 'courier' && !shippingInfo.courierOption) {
//         return toast.error('Please select a courier option.');
//       }
//       if ((deliveryMethod === 'bus' || deliveryMethod === 'transport') &&
//           (!shippingInfo.busName || !shippingInfo.busNumber)) {
//         return toast.error('Please enter bus/transport details.');
//       }
//     } else {
//       shippingInfo.deliveryMethod = 'courier';
//     }

//     try {
//       toast.loading('Saving shipment info...');
//       await axiosInstance.post(`${BASE_URL}/shipment/create`, { ...shippingInfo });
//       localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
//       toast.dismiss();
//       toast.success('Shipment info saved!');

     
//       navigate('/payment', { state: { shippingInfo } });
//     } catch (error) {
//       toast.dismiss();
//       toast.error('Failed to save shipping info');
//     }
//   };

//   return (
 
//   <NavLayout>
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 px-4 py-10">
//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
//           🧾 Checkout
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="animate-spin h-12 w-12 border-2 border-teal-500 border-t-transparent rounded-full"></div>
//             <span className="ml-4 text-gray-500">Loading cart...</span>
//           </div>
//         ) : cart.items.length === 0 ? (
//           <div className="text-center py-20 text-gray-500 text-lg">
//             Your cart is empty.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//             {/* LEFT: FORM */}
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-l-4 border-teal-500 pl-3">
//                 Shipping Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {[
//                   { name: "fullName", placeholder: "Full Name" },
//                   { name: "phone", placeholder: "Phone Number" },
//                   { name: "address", placeholder: "Address", full: true },
//                   { name: "city", placeholder: "City" },
//                   { name: "state", placeholder: "State" },
//                   { name: "pincode", placeholder: "Pincode" }
//                 ].map((field) => (
//                   <input
//                     key={field.name}
//                     name={field.name}
//                     value={shippingInfo[field.name]}
//                     onChange={handleChange}
//                     placeholder={field.placeholder}
//                     className={`${
//                       field.full ? "col-span-full" : ""
//                     } px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none`}
//                   />
//                 ))}
//               </div>

//               {/* Business Section */}
//               {['reseller', 'distributor'].includes(userRole) && (
//                 <div className="mt-8 space-y-5">
//                   <h3 className="text-lg font-semibold text-gray-700">
//                     Business & Delivery
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input name="businessName" value={shippingInfo.businessName} onChange={handleChange} placeholder="Business Name" className="inputField" />
//                     <input name="panNumber" value={shippingInfo.panNumber} onChange={handleChange} placeholder="PAN Number" className="inputField" />
//                     <input name="companyAddress" value={shippingInfo.companyAddress} onChange={handleChange} placeholder="Company Address" className="inputField col-span-full" />
//                   </div>

//                   {/* Delivery Method */}
//                   <div className="flex flex-wrap gap-4 text-gray-700">
//                     {['courier', 'bus', 'transport'].map((method) => (
//                       <label key={method} className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="deliveryMethod"
//                           value={method}
//                           checked={shippingInfo.deliveryMethod === method}
//                           onChange={handleChange}
//                         />
//                         {method}
//                       </label>
//                     ))}
//                   </div>

//                   {/* Courier */}
//                   {shippingInfo.deliveryMethod === 'courier' && (
//                     <div className="flex flex-wrap gap-4">
//                       {['DTDC', 'FedEx', 'India Post', 'Ecom Express', 'Other'].map((opt) => (
//                         <label key={opt} className="flex items-center gap-2 text-gray-700">
//                           <input
//                             type="radio"
//                             name="courierOption"
//                             value={opt}
//                             checked={shippingInfo.courierOption === opt}
//                             onChange={handleChange}
//                           />
//                           {opt}
//                         </label>
//                       ))}

//                       {shippingInfo.courierOption === 'Other' && (
//                         <input
//                           name="customCourier"
//                           value={shippingInfo.customCourier}
//                           onChange={handleChange}
//                           placeholder="Courier Name"
//                           className="inputField w-full"
//                         />
//                       )}
//                     </div>
//                   )}

//                   {/* Transport */}
//                   {(shippingInfo.deliveryMethod === 'bus' || shippingInfo.deliveryMethod === 'transport') && (
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                       <input name="busName" value={shippingInfo.busName} onChange={handleChange} placeholder="Transport Name" className="inputField" />
//                       <input name="busNumber" value={shippingInfo.busNumber} onChange={handleChange} placeholder="Number" className="inputField" />
//                       <input name="contactNumber" value={shippingInfo.contactNumber} onChange={handleChange} placeholder="Contact" className="inputField" />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* RIGHT: SUMMARY */}
//             <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6 border-l-4 border-teal-500 pl-3">
//                 Order Summary
//               </h2>

//               <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
//                 {cart.items.map(item => (
//                   <div key={item._id} className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
//                     <div>
//                       <p className="text-gray-800 font-medium truncate max-w-[180px]">
//                         {item.product?.name || 'Product'}
//                       </p>
//                       <span className="text-xs text-gray-500">
//                         Qty: {item.quantity || 1}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-3">
//                       <span className="text-teal-600 font-semibold">
//                         ₹ {(item.price * item.quantity).toFixed(2)}
//                       </span>

//                       <button
//                         onClick={() => handleRemoveItem(item._id)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         ✖
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Total */}
//               <div className="border-t mt-6 pt-4 flex justify-between text-lg font-semibold">
//                 <span>Total</span>
//                 <span className="text-teal-600">
//                   ₹ {cart.totalAmount?.toFixed(2) || '0.00'}
//                 </span>
//               </div>

//               {/* CTA */}
//               <button
//                 onClick={handleContinueToPayment}
//                 className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-[1.02] transition"
//               >
//                 Continue to Payment →
//               </button>
//             </div>

//           </div>
//         )}
//       </div>
//     </div>
//   </NavLayout>
// );
  
// };

// export default CheckoutPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import NavLayout from "../../components/auth/NavLayout";
import axiosInstance from "../../utils/axiosInstance";
import { getCart, removeFromCart } from "../../utils/cartApi";
import { BASE_URL } from "../../utils/apiPath";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState({
    items: [],
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(true);

  const userRole =
    localStorage.getItem("role") || "enduser";

  const [shippingInfo, setShippingInfo] =
    useState({
      fullName: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",

      businessName: "",
      panNumber: "",
      gstNumber: "",
      companyAddress: "",

      deliveryMethod: "",
      courierOption: "",
      customCourier: "",

      busName: "",
      busNumber: "",
      contactNumber: "",
    });

  const inputField =
    "w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-teal-500 outline-none transition";

  useEffect(() => {
    fetchCart();
    fetchShippingInfo();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const data = await getCart();

      setCart({
        items: data?.items || [],
        totalAmount:
          data?.totalAmount || 0,
      });
    } catch {
      toast.error(
        "Failed to load cart"
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchShippingInfo =
    async () => {
      try {
        const localData =
          localStorage.getItem(
            "shippingInfo"
          );

        if (localData) {
          setShippingInfo(
            JSON.parse(localData)
          );
        }

        const { data } =
          await axiosInstance.get(
            `${BASE_URL}/shipment/me`
          );

        if (data?.shippingInfo) {
          setShippingInfo(
            data.shippingInfo
          );
        }
      } catch {
        console.log(
          "No previous shipping info"
        );
      }
    };

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem =
    async (productId) => {
      try {
        await removeFromCart(
          productId
        );

        toast.success(
          "Item removed"
        );

        fetchCart();
      } catch {
        toast.error(
          "Failed to remove item"
        );
      }
    };

  // const validateForm = () => {
  //   const requiredFields = [
  //     "fullName",
  //     "phone",
  //     "address",
  //     "city",
  //     "state",
  //     "pincode",
  //   ];

  //   const missing =
  //     requiredFields.find(
  //       (field) =>
  //         !shippingInfo[
  //           field
  //         ]?.trim()
  //     );

  //   if (missing) {
  //     toast.error(
  //       "Please fill all address details!"
  //     );
  //     return false;
  //   }

  //   if (
  //     !/^[6-9]\d{9}$/.test(
  //       shippingInfo.phone
  //     )
  //   ) {
  //     toast.error(
  //       "Enter valid phone number"
  //     );
  //     return false;
  //   }

  //   if (
  //     !/^[1-9][0-9]{5}$/.test(
  //       shippingInfo.pincode
  //     )
  //   ) {
  //     toast.error(
  //       "Enter valid pincode"
  //     );
  //     return false;
  //   }

  //   if (
  //     ["reseller", "distributor"].includes(
  //       userRole
  //     )
  //   ) {
  //     const {
  //       businessName,
  //       panNumber,
  //       deliveryMethod,
  //     } = shippingInfo;

  //     if (
  //       !businessName.trim() ||
  //       !panNumber.trim() ||
  //       !deliveryMethod
  //     ) {
  //       toast.error(
  //         "Please fill all business details"
  //       );
  //       return false;
  //     }

  //     if (
  //       deliveryMethod ===
  //         "courier" &&
  //       !shippingInfo.courierOption
  //     ) {
  //       toast.error(
  //         "Please select courier option"
  //       );
  //       return false;
  //     }

  //     if (
  //       shippingInfo.courierOption ===
  //         "Other" &&
  //       !shippingInfo.customCourier.trim()
  //     ) {
  //       toast.error(
  //         "Enter courier name"
  //       );
  //       return false;
  //     }

  //     if (
  //       ["bus", "transport"].includes(
  //         deliveryMethod
  //       )
  //     ) {
  //       if (
  //         !shippingInfo.busName.trim() ||
  //         !shippingInfo.busNumber.trim()
  //       ) {
  //         toast.error(
  //           "Please enter transport details"
  //         );
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // };

  const validateForm = () => {
  const requiredFields = [
    "fullName",
    "phone",
    "address",
    "city",
    "state",
    "pincode",
  ];

  // Address validation
  const missingField = requiredFields.find(
    (field) => !shippingInfo[field]?.trim()
  );

  if (missingField) {
    toast.error(
      "Please fill all address details!"
    );
    return false;
  }

  // Phone validation
  if (
    !/^[6-9]\d{9}$/.test(
      shippingInfo.phone
    )
  ) {
    toast.error(
      "Enter valid 10-digit phone number"
    );
    return false;
  }

  // Pincode validation
  if (
    !/^[1-9][0-9]{5}$/.test(
      shippingInfo.pincode
    )
  ) {
    toast.error(
      "Enter valid 6-digit pincode"
    );
    return false;
  }

  // Business Validation
  if (
    ["reseller", "distributor"].includes(
      userRole
    )
  ) {
    const {
      businessName,
      panNumber,
      gstNumber,
      deliveryMethod,
    } = shippingInfo;

    // Common business fields
    if (
      !businessName?.trim() ||
      !deliveryMethod
    ) {
      toast.error(
        "Please fill business details"
      );
      return false;
    }

    // Reseller → PAN required
    if (
      userRole === "reseller" &&
      !panNumber?.trim()
    ) {
      toast.error(
        "PAN Number is required"
      );
      return false;
    }

    // Distributor → GST required
    if (
      userRole === "distributor" &&
      !gstNumber?.trim()
    ) {
      toast.error(
        "GST Number is required"
      );
      return false;
    }

    // Courier validation
    if (
      deliveryMethod === "courier"
    ) {
      if (
        !shippingInfo.courierOption
      ) {
        toast.error(
          "Please select courier option"
        );
        return false;
      }

      // Other courier
      if (
        shippingInfo.courierOption ===
          "Other" &&
        !shippingInfo.customCourier?.trim()
      ) {
        toast.error(
          "Please enter courier name"
        );
        return false;
      }
    }

    // Bus/Transport validation
    if (
      ["bus", "transport"].includes(
        deliveryMethod
      )
    ) {
      if (
        !shippingInfo.busName?.trim() ||
        !shippingInfo.busNumber?.trim()
      ) {
        toast.error(
          "Please enter transport details"
        );
        return false;
      }

      // Optional contact validation
      if (
        shippingInfo.contactNumber &&
        !/^[6-9]\d{9}$/.test(
          shippingInfo.contactNumber
        )
      ) {
        toast.error(
          "Enter valid transport contact number"
        );
        return false;
      }
    }
  }

  return true;
};
  const handleContinueToPayment =
    async () => {
      if (!validateForm())
        return;

      const shipmentData = {
        ...shippingInfo,
        deliveryMethod:
          shippingInfo.deliveryMethod ||
          "courier",
      };

      try {
        const toastId =
          toast.loading(
            "Saving shipment..."
          );

        await axiosInstance.post(
          `${BASE_URL}/shipment/create`,
          shipmentData
        );

        localStorage.setItem(
          "shippingInfo",
          JSON.stringify(
            shipmentData
          )
        );

        toast.dismiss(
          toastId
        );

        toast.success(
          "Shipment saved!"
        );

        navigate(
          "/payment",
          {
            state: {
              shippingInfo:
                shipmentData,
            },
          }
        );
      } catch (error) {
        toast.dismiss();

        console.log(error);

        toast.error(
          "Failed to save shipment"
        );
      }
    };

  return (
    <NavLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50 py-10 px-4">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold text-center mb-10 text-teal-600">
            Checkout
          </h1>

          {loading ? (
            <div className="text-center py-20">
              Loading...
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">

              {/* FORM */}

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-semibold mb-6">
                  Shipping Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">

                  {[
                    {
                      name:"fullName",
                      placeholder:"Full Name"
                    },
                    {
                      name:"phone",
                      placeholder:"Phone"
                    },
                    {
                      name:"address",
                      placeholder:"Address",
                      full:true
                    },
                    {
                      name:"city",
                      placeholder:"City"
                    },
                    {
                      name:"state",
                      placeholder:"State"
                    },
                    {
                      name:"pincode",
                      placeholder:"Pincode"
                    }
                  ].map(field=>(
                    <input
                      key={field.name}
                      name={field.name}
                      value={shippingInfo[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className={`${inputField} ${field.full ? "md:col-span-2":""}`}
                    />
                  ))}

                </div>

                {["reseller","distributor"].includes(userRole) && (

                  <div className="mt-8 space-y-6">

                    <h3 className="font-semibold text-lg">
                      Business & Delivery
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">

                      <input
                        name="businessName"
                        value={shippingInfo.businessName}
                        onChange={handleChange}
                        placeholder="Business Name"
                        className={inputField}
                      />

                    {userRole === "reseller" && (
                        <input
                          name="panNumber"
                          value={shippingInfo.panNumber}
                          onChange={handleChange}
                          placeholder="PAN Number"
                          className={inputField}
                        />
                      )}

                      {userRole === "distributor" && (
                        <input
                          name="gstNumber"
                          value={shippingInfo.gstNumber}
                          onChange={handleChange}
                          placeholder="GST Number"
                          className={inputField}
                        />
                      )}

                      <input
                        name="companyAddress"
                        value={shippingInfo.companyAddress}
                        onChange={handleChange}
                        placeholder="Company Address"
                        className={`${inputField} md:col-span-2`}
                      />

                    </div>

                    {/* Delivery */}

                    <div className="flex flex-wrap gap-4">

                      {[
                        "courier",
                        "bus",
                        "transport"
                      ].map(method=>(
                        <label
                          key={method}
                          className="flex gap-2"
                        >
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value={method}
                            checked={
                              shippingInfo.deliveryMethod===method
                            }
                            onChange={handleChange}
                          />

                          {method}
                        </label>
                      ))}

                    </div>

                    {shippingInfo.deliveryMethod==="courier" && (

                      <div className="space-y-4">

                        <div className="flex flex-wrap gap-4">

                          {[
                            "DTDC",
                            "FedEx",
                            "India Post",
                            "Ecom Express",
                            "Other"
                          ].map(opt=>(
                            <label
                              key={opt}
                              className="flex gap-2"
                            >
                              <input
                                type="radio"
                                name="courierOption"
                                value={opt}
                                checked={
                                  shippingInfo.courierOption===opt
                                }
                                onChange={handleChange}
                              />

                              {opt}
                            </label>
                          ))}

                        </div>

                        {shippingInfo.courierOption==="Other" && (

                          <input
                            name="customCourier"
                            value={shippingInfo.customCourier}
                            onChange={handleChange}
                            placeholder="Courier Name"
                            className={inputField}
                          />

                        )}

                      </div>

                    )}

                    {(shippingInfo.deliveryMethod==="bus" ||
                    shippingInfo.deliveryMethod==="transport") && (

                      <div className="grid md:grid-cols-3 gap-4">

                        <input
                          name="busName"
                          value={shippingInfo.busName}
                          onChange={handleChange}
                          placeholder="Transport Name"
                          className={inputField}
                        />

                        <input
                          name="busNumber"
                          value={shippingInfo.busNumber}
                          onChange={handleChange}
                          placeholder="Number"
                          className={inputField}
                        />

                        <input
                          name="contactNumber"
                          value={shippingInfo.contactNumber}
                          onChange={handleChange}
                          placeholder="Contact"
                          className={inputField}
                        />

                      </div>

                    )}

                  </div>
                )}

              </div>

              {/* ORDER SUMMARY */}

              <div className="bg-white rounded-3xl shadow-xl p-8">

                <h2 className="text-2xl font-semibold mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-[350px] overflow-y-auto">

                  {cart.items.map(item=>(

                    <div
                      key={item._id}
                      className="flex justify-between bg-gray-50 p-4 rounded-xl"
                    >
                      <div>
                        <p>{item.product?.name}</p>
                        <small>
                          Qty:{item.quantity}
                        </small>
                      </div>

                      <div className="flex gap-4">

                        <span>
                          ₹{(
                            item.price*
                            item.quantity
                          ).toFixed(2)}
                        </span>

                        <button
                          onClick={()=>handleRemoveItem(item._id)}
                          className="text-red-500"
                        >
                          ✖
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

                <div className="border-t pt-5 mt-5 flex justify-between font-bold text-lg">

                  <span>Total</span>

                  <span>
                    ₹{cart.totalAmount.toFixed(2)}
                  </span>

                </div>

                <button
                  onClick={handleContinueToPayment}
                  className="w-full mt-6 py-4 rounded-xl bg-teal-500 text-white font-semibold hover:bg-teal-600 transition"
                >
                  Continue to Payment →
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </NavLayout>
  );
};

export default CheckoutPage;