// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { BASE_URL, API_PATH } from '../utils/apiPath';
// import { toast } from 'react-hot-toast';
// import NavLayout from '../components/auth/NavLayout';

// const EnduserAdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [billInputs, setBillInputs] = useState({});

//   useEffect(() => {
//     fetchOrders();
//     const interval = setInterval(fetchOrders, 15000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `${BASE_URL}${API_PATH.ENDUSER_ADMIN.GET_ORDERS}`,
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
//         `${BASE_URL}${API_PATH.ENDUSER_ADMIN.UPDATE_ORDER_STATUS(orderId)}`,
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
//       toast.error('Failed to update status');
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

//   const handlePaymentStatusChange = async (id, newPaymentStatus) => {
//     try {
//       const paymentStatusUrl = typeof API_PATH.PAYMENT.UPDATE_PAYMENT_STATUS === 'function'
//         ? API_PATH.PAYMENT.UPDATE_PAYMENT_STATUS(id)
//         : API_PATH.PAYMENT.UPDATE_PAYMENT_STATUS;

//       await axiosInstance.put(
//         `${BASE_URL}${paymentStatusUrl}`,
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
//           order._id === id ? { ...order, paymentStatus: newPaymentStatus } : order
//         )
//       );
//     } catch (err) {
//       if (err.response) {
//         console.error("Payment API Error:", err.response.data);
//         toast.error(err.response.data.message || "Payment update failed");
//       } else {
//         console.error("Unknown Error:", err.message);
//         toast.error("Something went wrong");
//       }
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
//                 {/* Order Header + Customer Info */}
//                 <div className="flex flex-col gap-2">
//                   <div className="flex justify-between items-center">
//                     <h2 className="text-lg font-bold text-teal-700">
//                       Order #{order._id.slice(-6)}
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       {new Date(order.createdAt).toLocaleString()}
//                     </p>
//                   </div>
//                   <div className="bg-gray-100 p-2 rounded text-sm text-black">
//                     <p><strong>Name:</strong> {order.customer?.name}</p>
//                     <p><strong>Email:</strong> {order.customer?.email}</p>
//                     <p><strong>Phone:</strong> {order.customer?.phone}</p>
//                     <p><strong>Role:</strong> {order.customer?.role}</p>
//                   </div>
//                 </div>

//                 {/* Shipping Info */}
//                 <div>
//                   <h3 className="text-sm font-bold mb-1 text-gray-800">📍 Shipping Info</h3>
//                   <p className="text-sm">
//                     {order.shippingInfo?.fullName}, {order.shippingInfo?.phone},
//                     {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state} - {order.shippingInfo?.pincode}
//                   </p>
//                   {order.shippingInfo?.businessName && (
//                     <p className="text-sm">Business: {order.shippingInfo.businessName} | GST: {order.shippingInfo.gstNumber}</p>
//                   )}
//                 </div>

//                 {/* Ordered Items */}
//                 <div>
//                   <h3 className="text-sm font-bold mb-1 text-gray-800">🛍️ Ordered Items</h3>
//                   <ul className="text-sm list-disc pl-5 space-y-1">
//                     {order.items.map((item, idx) => (
//                       <li key={idx}>
//                         {item.product?.name} ({item.product?.brand || 'N/A'}) — {item.quantity} × ₹{item.price} = ₹{item.quantity * item.price}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 {/* Payment & Status Controls */}
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

//                 {/* Bill Upload & Actions */}
//                 <div className="pt-3 border-t border-gray-200">
//                   <label className="text-sm font-semibold block mb-1">Upload Bill (PDF):</label>
//                   <div className="flex flex-wrap gap-2 items-center">
//                     <input
//                       type="file"
//                       accept="application/pdf"
//                       onChange={(e) => setBillInputs({ ...billInputs, [order._id]: e.target.files[0] })}
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

// export default EnduserAdminOrders;


import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';
import ReactModal from 'react-modal';
import { X } from 'lucide-react'; 

const EnduserAdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billInputs, setBillInputs] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;
const [zoomImage, setZoomImage] = useState(null);


  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 60000); 
    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${BASE_URL}${API_PATH.ENDUSER_ADMIN.GET_ORDERS}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
   
      setOrders((data.orders || []).reverse());
       setCurrentPage(1);
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

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

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

            {currentOrders.map((order) => (
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
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
  <h3 className="text-md font-bold mb-3 text-gray-900">📦 Shipping & Customer Info</h3>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
    <div>
      <p><strong>Full Name:</strong> {order.shippingInfo?.fullName || 'N/A'}</p>
      <p><strong>Phone:</strong> {order.shippingInfo?.phone || 'N/A'}</p>
      <p><strong>Address:</strong> {order.shippingInfo?.address || 'N/A'}</p>
      <p><strong>City:</strong> {order.shippingInfo?.city || 'N/A'}</p>
      <p><strong>State:</strong> {order.shippingInfo?.state || 'N/A'}</p>
      <p><strong>Pincode:</strong> {order.shippingInfo?.pincode || 'N/A'}</p>
    </div>

    <div>
      <p><strong>Business Name:</strong> {order.shippingInfo?.businessName || 'N/A'}</p>
      <p><strong>GST Number:</strong> {order.shippingInfo?.gstNumber || 'N/A'}</p>
      <p><strong>PAN Number:</strong> {order.shippingInfo?.panNumber || 'N/A'}</p>
      <p><strong>Company Address:</strong> {order.shippingInfo?.companyAddress || 'N/A'}</p>
      <p><strong>Delivery Method:</strong> {order.shippingInfo?.deliveryMethod || 'N/A'}</p>
      <p><strong>Courier Option:</strong> {order.shippingInfo?.courierOption || 'N/A'}</p>
    </div>

    {order.shippingInfo?.courierOption === 'Custom' && (
      <div>
        <p><strong>Custom Courier:</strong> {order.shippingInfo?.customCourier || 'N/A'}</p>
      </div>
    )}

    {order.shippingInfo?.deliveryMethod === 'Bus' && (
      <div>
        <p><strong>Bus Name:</strong> {order.shippingInfo?.busName || 'N/A'}</p>
        <p><strong>Bus Number:</strong> {order.shippingInfo?.busNumber || 'N/A'}</p>
        <p><strong>Contact Number:</strong> {order.shippingInfo?.contactNumber || 'N/A'}</p>
      </div>
    )}
  </div>
</div>

             
                {/* Ordered Items */}
               <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 mb-4">
            <h3 className="text-md font-bold mb-3 text-gray-900">🛍️ Ordered Items</h3>

            <ul className="text-sm space-y-3">
              {order.items.map((item, idx) => {
                const product = item.product || {};
                return (
                  <li key={idx} className="border-b pb-2">
                    <div><strong>Product Name:</strong> {product.name || 'N/A'}</div>
                    <div><strong>Model No:</strong> {product.modelNo || 'N/A'}</div>
                    <div><strong>Brand:</strong> {product.brand || 'N/A'}</div>
                    <div><strong>Category:</strong> {product.category || 'N/A'}</div>
                  
                    <div><strong>Quantity:</strong> {item.quantity}</div>
                    <div><strong>Unit Price:</strong> ₹{item.price}</div>
                    <div><strong>Total:</strong> ₹{item.total || item.price * item.quantity}</div>
        </li>
      );
    })}
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
                      disabled={order.orderStatus === 'Cancelled'}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
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
               

{order.paymentMethod === 'bank_transfer' && order.paymentProof && (
  <div className="mb-4">
    <h3 className="text-sm font-bold mb-2 text-gray-800">📎 Payment Proof</h3>
    <div className="mt-2">
      {order.paymentProof.toLowerCase().endsWith('.pdf') ? (
        <a
          href={order.paymentProof.startsWith('http') ? order.paymentProof : `${window.location.origin}${order.paymentProof}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline text-sm inline-flex items-center gap-1"
        >
          View PDF Proof
        </a>
      ) : (
        <div className="group relative cursor-zoom-in w-fit">
          <img
            src={order.paymentProof.startsWith('http') ? order.paymentProof : `${window.location.origin}${order.paymentProof}`}
            alt="Payment Proof"
            className="w-40 h-auto border rounded-lg shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-blue-300"
            onClick={() =>
              setZoomImage(
                order.paymentProof.startsWith('http')
                  ? order.paymentProof
                  : `${window.location.origin}${order.paymentProof}`
              )
            }
            onError={(e) => {
              console.error('Error loading image:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
    </div>
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
        {totalPages > 1 && (
          <div className="flex justify-center gap-4 pt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              ⬅ Prev
            </button>
            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
            >
              Next ➡
            </button>
          </div>
        )}
        <ReactModal
  isOpen={!!zoomImage}
  onRequestClose={() => setZoomImage(null)}
  contentLabel="Zoomed Image"
  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
  overlayClassName="fixed inset-0 z-40 bg-black bg-opacity-70"
  ariaHideApp={false}
>
  <div className="relative max-w-4xl max-h-[90vh] overflow-auto bg-white p-4 rounded-lg shadow-xl">
    <button
      onClick={() => setZoomImage(null)}
      className="absolute top-2 right-2 text-gray-700 hover:text-black"
    >
      <X size={24} />
    </button>
    <img
      src={zoomImage}
      alt="Zoomed Payment Proof"
      className="max-w-full max-h-[80vh] rounded"
    />
  </div>
</ReactModal>

      </div>
     

    </NavLayout>
  );
};

export default EnduserAdminOrders;



