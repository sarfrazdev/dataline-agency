// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { BASE_URL, API_PATH } from '../utils/apiPath';
// import { toast } from 'react-hot-toast';
// import NavLayout from '../components/auth/NavLayout';

// const ResellerAdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [billInputs, setBillInputs] = useState({});

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 15000); // auto refresh every 15s
//     return () => clearInterval(interval);
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `${BASE_URL}${API_PATH.RESELLER_ADMIN.GET_ORDERS}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setOrders(data.orders || []);
//     } catch (err) {
//       console.error('Order fetch error:', err);
//       toast.error('Failed to load orders');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axiosInstance.put(
//         `${BASE_URL}${API_PATH.RESELLER_ADMIN.UPDATE_ORDER_STATUS(orderId)}`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       toast.success('Order status updated');
//       setOrders(prev =>
//         prev.map(order =>
//           order._id === orderId ? { ...order, orderStatus: newStatus } : order
//         )
//       );
//     } catch (err) {
//       console.error('Status update error:', err);
//       toast.error('Failed to update order status');
//     }
//   };

//   const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
//     try {
//       await axiosInstance.put(
//         `${BASE_URL}${API_PATH.PAYMENT.UPDATE_PAYMENT_STATUS(orderId)}`,
//         { paymentStatus: newPaymentStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       toast.success('Payment status updated');
//       setOrders(prev =>
//         prev.map(order =>
//           order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
//         )
//       );
//     } catch (err) {
//       toast.error('Failed to update payment status');
//       console.error(err);
//     }
//   };

//   const handleBillUpload = async (orderId) => {
//     const file = billInputs[orderId];
//     if (!file || file.type !== 'application/pdf') {
//       return toast.error('Please upload a valid PDF file');
//     }

//     const formData = new FormData();
//     formData.append('billPdf', file);

//     try {
//       await axiosInstance.put(
//         `${BASE_URL}${API_PATH.ENDUSER_ADMIN.UPLOAD_BILL(orderId)}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       toast.success('Bill uploaded');
//       fetchOrders();
//     } catch (err) {
//       toast.error('Failed to upload bill');
//       console.error(err);
//     }
//   };

//   const handleDeleteBill = async (orderId) => {
//     if (!window.confirm('Are you sure you want to delete this bill?')) return;
//     try {
//       await axiosInstance.delete(
//         `${BASE_URL}${API_PATH.ORDERS.DELETE_BILL(orderId)}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       toast.success('Bill deleted');
//       fetchOrders();
//     } catch (err) {
//       toast.error('Failed to delete bill');
//       console.error(err);
//     }
//   };

//   return (
//     <NavLayout>
//       <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
//         <h1 className="text-3xl font-bold mb-6">📦 All Customer Orders</h1>

//         {loading ? (
//           <p className="text-center text-gray-400">Loading orders...</p>
//         ) : orders.length === 0 ? (
//           <p className="text-center text-gray-400">No orders found.</p>
//         ) : (
//           <div className="space-y-6">
//             {orders.map((order) => (
//               <div
//                 key={order._id}
//                 className="bg-white text-black rounded-xl shadow-md p-6 space-y-4"
//               >
//                 {/* Order Header */}
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-lg font-bold text-teal-700">
//                     Order #{order._id.slice(-6)}
//                   </h2>
//                   <p className="text-sm text-gray-600">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 {/* Customer Info */}
//                 <div>
//                   <h3 className="text-sm font-bold mb-1 text-gray-800">
//                     👤 Customer Info
//                   </h3>
//                   <p className="text-sm"><strong>Name:</strong> {order.shippingInfo?.fullName || 'N/A'}</p>
//                   <p className="text-sm"><strong>Phone:</strong> {order.shippingInfo?.phone || 'N/A'}</p>
//                   <p className="text-sm"><strong>Email:</strong> {order.shippingInfo?.email || 'N/A'}</p>
//                   <p className="text-sm"><strong>Address:</strong> {order.shippingInfo?.addressLine}, {order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.postalCode}</p>
//                 </div>

//                 {/* Ordered Items */}
//                 <div>
//                   <h3 className="text-sm font-bold mb-1 text-gray-800">🛍️ Ordered Items</h3>
//                   <ul className="text-sm list-disc pl-5 space-y-1">
//                     {order.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.product?.name || 'Product'} ({item.product?.brand || 'No Brand'}) — {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Status & Payment */}
//                 <div className="flex flex-wrap justify-between items-center gap-4">
//                   <div>
//                     <p className="text-sm"><strong>Status:</strong> {order.orderStatus}</p>
//                     <p className="text-sm"><strong>Payment:</strong> {order.paymentStatus}</p>
//                     <p className="text-sm"><strong>Total:</strong> ₹{order.totalAmount}</p>
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold mr-2">Update Status:</label>
//                     <select
//                       className="text-sm border px-2 py-1 rounded"
//                       value={order.orderStatus}
//                       onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                       disabled={order.orderStatus === 'cancelled'}
//                     >
//                       <option>Pending</option>
//                       <option>Processing</option>
//                       <option>Shipped</option>
//                       <option>Delivered</option>
//                       <option>Cancelled</option>
//                     </select>
//                     {order.orderStatus === 'cancelled' && (
//                       <p className="text-xs text-red-600 mt-1">Order is cancelled — status can't be changed</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Payment Status */}
//                 <div>
//                   <label className="text-sm font-semibold mr-2">Update Payment:</label>
//                   <select
//                     className="text-sm border px-2 py-1 rounded"
//                     value={order.paymentStatus}
//                     onChange={(e) => handlePaymentStatusChange(order._id, e.target.value)}
//                   >
//                     <option value="pending">Pending</option>
//                     <option value="paid">Paid</option>
//                     <option value="processing">Processing</option>
//                     <option value="failed">Failed</option>
//                   </select>
//                 </div>
//                {/* Payment Proof */}
//               {order.paymentMethod === 'bank_transfer' && order.paymentProof && (
//                 <div>
//                   <h3 className="text-sm font-bold mb-1 text-gray-800">📎 Payment Proof</h3>
//                   <a href={order.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
//                     View Proof
//                   </a>
//                 </div>
//               )}

//                 {/* Bill Upload */}
//                 <div className="pt-3 border-t border-gray-200">
//                   <label className="text-sm font-semibold block mb-1">Upload Bill (PDF):</label>
//                   <div className="flex flex-wrap gap-2 items-center">
//                     <input
//                       type="file"
//                       accept="application/pdf"
//                       onChange={(e) =>
//                         setBillInputs({ ...billInputs, [order._id]: e.target.files[0] })
//                       }
//                       className="text-sm border px-2 py-1 rounded"
//                     />
//                     <button
//                       onClick={() => handleBillUpload(order._id)}
//                       className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
//                     >
//                       Upload
//                     </button>
//                     {order.billUrl && (
//                       <>
//                         <a href={order.billUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">View</a>
//                         <a href={order.billUrl} download={`bill-${order._id}.pdf`} className="text-green-600 text-xs underline">Download</a>
//                         <button onClick={() => handleDeleteBill(order._id)} className="text-red-600 text-xs underline">Delete</button>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </NavLayout>
//   );
// };

// export default ResellerAdminOrders;


import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';

const ResellerAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billInputs, setBillInputs] = useState({});

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${BASE_URL}${API_PATH.RESELLER_ADMIN.GET_ORDERS}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Order fetch error:', err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `${BASE_URL}${API_PATH.RESELLER_ADMIN.UPDATE_ORDER_STATUS(orderId)}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Order status updated');
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Failed to update order status');
    }
  };

  const handlePaymentStatusChange = async (orderId, newPaymentStatus) => {
    try {
      await axiosInstance.put(
        `${BASE_URL}${API_PATH.PAYMENT.UPDATE_PAYMENT_STATUS(orderId)}`,
        { paymentStatus: newPaymentStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Payment status updated');
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
        )
      );
    } catch (err) {
      toast.error('Failed to update payment status');
      console.error(err);
    }
  };

  const handleBillUpload = async (orderId) => {
    const file = billInputs[orderId];
    if (!file || file.type !== 'application/pdf') {
      return toast.error('Please upload a valid PDF file');
    }

    const formData = new FormData();
    formData.append('billPdf', file);

    try {
      await axiosInstance.put(
        `${BASE_URL}${API_PATH.ENDUSER_ADMIN.UPLOAD_BILL(orderId)}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      toast.success('Bill uploaded');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to upload bill');
      console.error(err);
    }
  };

  const handleDeleteBill = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return;
    try {
      await axiosInstance.delete(
        `${BASE_URL}${API_PATH.ORDERS.DELETE_BILL(orderId)}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Bill deleted');
      fetchOrders();
    } catch (err) {
      toast.error('Failed to delete bill');
      console.error(err);
    }
  };
const updateManualPayment = async (orderId, status) => {
  if (!['paid', 'rejected'].includes(status)) {
    return toast.error('Invalid status value.');
  }

  try {
    await axiosInstance.put(
 `${BASE_URL}/api/dashboard/orders/${orderId}/manual-payment`,

      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    toast.success(`Payment ${status === 'paid' ? 'approved' : 'rejected'} successfully.`);
    fetchOrders(); // refresh after update
  } catch (err) {
    console.error('Manual Payment Update Error:', err.response?.data || err.message);
    toast.error('Failed to update manual payment');
  }
};

 
  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">📦 All Customer Orders</h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-400">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white text-black rounded-xl shadow-md p-6 space-y-4"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-teal-700">
                    Order #{order._id.slice(-6)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Customer Info */}
                <div>
                  <h3 className="text-sm font-bold mb-1 text-gray-800">
                    👤 Customer Info
                  </h3>
                  <p className="text-sm"><strong>Name:</strong> {order.shippingInfo?.fullName || 'N/A'}</p>
                  <p className="text-sm"><strong>Phone:</strong> {order.shippingInfo?.phone || 'N/A'}</p>
                  {/* <p className="text-sm"><strong>Email:</strong> {order.shippingInfo?.email || 'N/A'}</p> */}
                  <p className="text-sm"><strong>Address:</strong> {order.shippingInfo?.addressLine}, {order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.postalCode}</p>
                </div>

                {/* Ordered Items */}
                <div>
                  <h3 className="text-sm font-bold mb-1 text-gray-800">🛍️ Ordered Items</h3>
                  <ul className="text-sm list-disc pl-5 space-y-1">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product?.name || 'Product'} ({item.product?.brand || 'No Brand'}) — {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Status & Payment */}
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm"><strong>Status:</strong> {order.orderStatus}</p>
                    <p className="text-sm"><strong>Payment:</strong> {order.paymentStatus}</p>
                    <p className="text-sm"><strong>Total:</strong> ₹{order.totalAmount}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mr-2">Update Status:</label>
                    <select
                      className="text-sm border px-2 py-1 rounded"
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={order.orderStatus === 'cancelled'}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                    {order.orderStatus === 'cancelled' && (
                      <p className="text-xs text-red-600 mt-1">Order is cancelled — status can't be changed</p>
                    )}
                  </div>
                </div>

                {/* Payment Status */}
                <div>
                  <label className="text-sm font-semibold mr-2">Update Payment:</label>
                  <select
                    className="text-sm border px-2 py-1 rounded"
                    value={order.paymentStatus}
                    onChange={(e) => handlePaymentStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

                {/* Payment Proof */}
                {/* {order.paymentMethod === 'bank_transfer' && order.paymentProof && (
                  <div>
                    <h3 className="text-sm font-bold mb-1 text-gray-800">📎 Payment Proof</h3>
                    <a href={order.paymentProof} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">
                      View Proof
                    </a>

                    {order.paymentStatus === 'pending' && (
                      <div className="mt-2 flex gap-3">
                        <button
                          onClick={() => updateManualPayment(order._id, 'paid')}
                          className="bg-green-600 text-white text-xs px-3 py-1 rounded"
                        >
                          ✅ Approve
                        </button>
                        <button
                          onClick={() => updateManualPayment(order._id, 'rejected')}
                          className="bg-red-600 text-white text-xs px-3 py-1 rounded"
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                )} */}
                {order.paymentMethod === 'bank_transfer' && order.paymentProof && (
  <div>
    <h3 className="text-sm font-bold mb-1 text-gray-800">📎 Payment Proof</h3>
    
    <img
      src={`${BASE_URL}${order.paymentProof}`} 
      alt="Payment Proof"
      className="w-40 rounded border mt-2"
    />

    {order.paymentStatus === 'pending' && (
      <div className="mt-2 flex gap-3">
        <button
          onClick={() => updateManualPayment(order._id, 'paid')}
          className="bg-green-600 text-white text-xs px-3 py-1 rounded"
        >
          ✅ Approve
        </button>
        <button
          onClick={() => updateManualPayment(order._id, 'rejected')}
          className="bg-red-600 text-white text-xs px-3 py-1 rounded"
        >
          ❌ Reject
        </button>
      </div>
    )}
  </div>
)}



                {/* Bill Upload */}
                <div className="pt-3 border-t border-gray-200">
                  <label className="text-sm font-semibold block mb-1">Upload Bill (PDF):</label>
                  <div className="flex flex-wrap gap-2 items-center">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) =>
                        setBillInputs({ ...billInputs, [order._id]: e.target.files[0] })
                      }
                      className="text-sm border px-2 py-1 rounded"
                    />
                    <button
                      onClick={() => handleBillUpload(order._id)}
                      className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Upload
                    </button>
                    {order.billUrl && (
                      <>
                        <a href={order.billUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">View</a>
                        <a href={order.billUrl} download={`bill-${order._id}.pdf`} className="text-green-600 text-xs underline">Download</a>
                        <button onClick={() => handleDeleteBill(order._id)} className="text-red-600 text-xs underline">Delete</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default ResellerAdminOrders;

