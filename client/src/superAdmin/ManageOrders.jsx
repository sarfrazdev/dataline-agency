import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billInputs, setBillInputs] = useState({});

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get(
        `${BASE_URL}${API_PATH.ORDERS.GET_ALL}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setOrders(data.orders || []);
    } catch (err) {
      console.error('Order fetch error:', err);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `${BASE_URL}${API_PATH.ORDERS.UPDATE_STATUS(orderId)}`,
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

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">📦 Manage All Orders</h1>

        {loading ? (
          <div className="text-center text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400">No orders found</div>
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
                  <p className="text-sm">
                    <strong>Role:</strong>{' '}
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        order.user?.role === 'reseller'
                          ? 'bg-orange-100 text-orange-800'
                          : order.user?.role === 'distributor'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.user?.role || 'N/A'}
                    </span>
                  </p>
                  <p className="text-sm"><strong>Name:</strong> {order.shippingInfo?.fullName || 'N/A'}</p>
                  <p className="text-sm"><strong>Email:</strong> {order.shippingInfo?.email || 'N/A'}</p>
                  <p className="text-sm"><strong>Phone:</strong> {order.shippingInfo?.phone || 'N/A'}</p>
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

                {/* Order Status & Payment */}
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
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
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

                {/* Payment Update */}
                <div>
                  <label className="text-sm font-semibold mr-2">Update Payment:</label>
                  <select
                    className="text-sm border px-2 py-1 rounded"
                    value={order.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>

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

export default ManageOrders;
