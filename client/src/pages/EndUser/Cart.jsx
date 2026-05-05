import React, { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart } from '../../utils/cartApi';
import { toast } from 'react-hot-toast';
import NavLayout from '../../components/auth/NavLayout';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (err) {
      console.error('Cart load error:', err);
      toast.error(err.message || 'Failed to load cart!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await updateCartItem(itemId, newQty);
      toast.success('Quantity updated');
      fetchCart();
    } catch (err) {
      console.error('Update quantity error:', err);
      toast.error(err.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed');
      fetchCart();
    } catch (err) {
      console.error('Remove item error:', err);
      toast.error(err.message || 'Failed to remove item');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const inStockItems = cart.items.filter((item) => item.product?.stock > 0);

  const computedTotal = inStockItems.reduce((sum, item) => {
    const unitPrice = item.price || 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <NavLayout>
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-cyan-50 text-gray-800 px-4 py-10">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            🛒 Your Cart
          </h1>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin h-12 w-12 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading your cart...</p>
            </div>
          ) : inStockItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600 mb-6">
                Your cart is empty 😕
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow hover:scale-105 transition"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {inStockItems.map((item) => {
                  const unitPrice = item.price || 0;
                  const subtotal = unitPrice * item.quantity;
                  const product = item.product;

                  const activeSlabIndex = product?.quantityBasedPrices?.findIndex(
                    (slab) =>
                      item.quantity >= slab.minQty &&
                      (!slab.maxQty || item.quantity <= slab.maxQty)
                  );

                  return (
                    <div
                      key={item._id}
                      className="group flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-white shadow-sm hover:shadow-xl transition duration-300"
                    >
                      {/* Left */}
                      <div className="flex items-center gap-5 w-full md:w-auto">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.name}
                          className="h-28 w-28 object-cover rounded-xl cursor-pointer hover:scale-105 transition"
                          onClick={() => navigate(`/product/${product._id}`)}
                        />

                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {product?.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            {product?.brand || 'No Brand'}
                          </p>

                          {/* ❌ STOCK REMOVED */}

                          <p className="text-sm text-gray-700 mt-1">
                            {formatCurrency(unitPrice)}
                          </p>

                          {product?.quantityBasedPrices?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {product.quantityBasedPrices.map((slab, idx) => {
                                const isActive = idx === activeSlabIndex;
                                const label = slab.maxQty
                                  ? `${slab.minQty}-${slab.maxQty}`
                                  : `${slab.minQty}+`;

                                return (
                                  <span
                                    key={idx}
                                    className={`px-3 py-1 text-xs rounded-full ${
                                      isActive
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-100 text-gray-600'
                                    }`}
                                  >
                                    {label} @ ₹{slab.price}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col md:flex-row items-center gap-5 w-full md:w-auto">

                        <div className="flex items-center rounded-full bg-gray-100 px-2 py-1">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-lg text-gray-600 hover:text-teal-500"
                          >
                            −
                          </button>

                          <span className="px-4 text-lg font-semibold text-gray-800">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            disabled={item.quantity >= product.stock}
                            className="px-3 py-1 text-lg text-gray-600 hover:text-teal-500 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-lg font-bold text-teal-600">
                          {formatCurrency(subtotal)}
                        </div>

                        <button
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-sm text-red-500 hover:text-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800">Total</h3>
                  <p className="text-3xl font-bold text-teal-600">
                    {formatCurrency(computedTotal)}
                  </p>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-semibold hover:scale-[1.02] transition shadow-md"
                >
                  Proceed to Checkout →
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </NavLayout>
  );
};

export default CartPage;