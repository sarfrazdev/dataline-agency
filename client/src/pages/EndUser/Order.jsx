import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import NavLayout from '../../components/auth/NavLayout';
import { ShoppingCart, XCircle, Loader } from 'lucide-react';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  const interval = setInterval(fetchOrders, 15000);

  return () => clearInterval(interval);
}, []);


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`${BASE_URL}${API_PATH.ORDERS.GET_USER_ORDERS}`);
      setOrders(response.data.orders);
    } catch (err) {
      console.error('Fetch Orders Error:', err);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };


const handleCancelOrder = async (orderId) => {
  const order = orders.find(o => o._id === orderId);
  if (!order) return toast.error('Order not found');

  if (['shipped', 'delivered', 'cancelled'].includes(order.orderStatus)) {
    return toast.error('You cannot cancel this order because it is already processed.');
  }

  const reason = prompt('Please provide a reason for cancellation:');
  if (!reason?.trim()) return toast.error('Cancellation reason is required');

  try {
    const { data } = await axiosInstance.put(
      `${BASE_URL}${API_PATH.ORDERS.CANCEL_ORDERS(orderId)}`,
      { reason }
    );

    toast.success(data.message || 'Order cancelled');

    // Update UI instantly
    setOrders(prev =>
      prev.map(o => o._id === orderId ? { ...o, orderStatus: 'cancelled' } : o)
    );
  } catch (err) {
    console.error('Cancel Order Error:', err);
    toast.error(err.response?.data?.message || 'Unable to cancel order.');
  }
};


  return (
    <NavLayout>
      <div className="container mx-auto px-4 py-8 text-white max-w-5xl">
        <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-teal-400" />
          My Orders
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-300">
            <Loader className="animate-spin mr-2" /> Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1f1f1f] border border-gray-700 rounded-2xl shadow p-6 transition hover:border-teal-600"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-teal-400">
                    Order #{order._id.slice(-6)}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase ${
                    order.orderStatus === 'cancelled'
                      ? 'bg-red-600 text-white'
                      : order.orderStatus === 'delivered'
                      ? 'bg-green-600 text-white'
                      : 'bg-yellow-500 text-black'
                  }`}>
                    {order.orderStatus || 'Processing'}
                  </span>
                </div>

                <ul className="mb-4 divide-y divide-gray-700">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="py-2 flex justify-between">
                      <span>{item?.product?.name} × {item?.quantity}</span>
                      <span className="text-teal-300 font-medium">₹{item?.price}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-sm text-gray-400 flex justify-between mb-2">
                  <span><strong>Total:</strong> ₹{order.totalAmount}</span>
                  <span><strong>Payment:</strong> {order.paymentStatus}</span>
                </div>
                <p className="text-sm text-gray-500">
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>

                {order.billUrl && (
                  <div className="flex gap-2 mt-2">
                    <a href={order.billUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline hover:text-blue-800">View Bill</a>
                    <a href={order.billUrl} download={`bill-order-${order._id.slice(-6)}.pdf`} className="text-green-600 text-xs underline hover:text-green-800">Download</a>
                  </div>
                )}

           
                {order.orderStatus === 'pending' || order.orderStatus === 'processing' || order.orderStatus==='placed' ? (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Order
                </button>
              ) : null}

              </div>
            ))}
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default OrderPage;
