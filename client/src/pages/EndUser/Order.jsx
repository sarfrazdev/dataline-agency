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
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
    <div className="max-w-5xl mx-auto px-4">

      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-blue-100 rounded-xl">
          <ShoppingCart className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          My Orders
        </h2>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">
          <Loader className="animate-spin mr-2" />
          Loading orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (

        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6"
            >

              {/* Top */}
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-6)}
                </h3>

                <span className={`px-4 py-1 text-xs font-semibold rounded-full capitalize ${
                  order.orderStatus === 'cancelled'
                    ? 'bg-red-100 text-red-600'
                    : order.orderStatus === 'delivered'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {order.orderStatus || 'Processing'}
                </span>
              </div>

              {/* Items */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-4 space-y-3">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-gray-700 text-sm">
                      {item?.product?.name} × {item?.quantity}
                    </p>
                    <p className="text-gray-900 font-semibold">
                      ₹{item?.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-600 mb-2 gap-2">
                <span><strong>Total:</strong> ₹{order.totalAmount}</span>
                <span><strong>Payment:</strong> {order.paymentStatus}</span>
              </div>

              <p className="text-xs text-gray-400 mb-3">
                Ordered on: {new Date(order.createdAt).toLocaleString()}
              </p>

              {/* Bill */}
              {order.billUrl && (
                <div className="flex gap-4 mb-3 text-sm">
                  <a
                    href={order.billUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline"
                  >
                    View Bill
                  </a>
                  <a
                    href={order.billUrl}
                    download={`bill-order-${order._id.slice(-6)}.pdf`}
                    className="text-green-600 font-medium hover:underline"
                  >
                    Download
                  </a>
                </div>
              )}

              {/* Cancel */}
              {(order.orderStatus === 'pending' ||
                order.orderStatus === 'processing' ||
                order.orderStatus === 'placed') && (
                <button
                  onClick={() => handleCancelOrder(order._id)}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel Order
                </button>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  </div>
</NavLayout>
  );
};

export default OrderPage;
