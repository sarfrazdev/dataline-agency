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
      <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-teal-400 mb-10">🛒 Your Cart</h1>

          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading your cart...</p>
            </div>
          ) : inStockItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl font-medium text-gray-300 mb-4">
                Your cart is empty or all items are out of stock 😕
              </p>
              <button
                onClick={() => navigate('/shop')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
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
                    (slab) => item.quantity >= slab.minQty && (!slab.maxQty || item.quantity <= slab.maxQty)
                  );

                  return (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row items-center justify-between bg-[#2a2a2a] rounded-lg shadow hover:shadow-lg transition duration-300 p-5"
                    >
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <img
                          src={product.images?.[0] || '/placeholder.jpg'}
                          alt={product.name}
                          className="h-32 w-32 object-cover rounded-md"
                        />
                        <div>
                          <h2 className="text-lg font-semibold text-white">{product?.name}</h2>
                          <p className="text-sm text-gray-400">{product?.brand || 'No Brand'}</p>
                          <p className="text-sm text-yellow-400 mt-1">Available: {product?.stock || 0}</p>
                          <p className="text-sm text-gray-300 mt-1">Price: {formatCurrency(unitPrice)}</p>

                          {product?.quantityBasedPrices?.length > 0 && (
                            <div className="mt-2">
                              <p className="text-xs text-gray-400 mb-1">Discount Slabs:</p>
                              <div className="flex flex-wrap gap-2">
                                {product.quantityBasedPrices.map((slab, idx) => {
                                  const isActive = idx === activeSlabIndex;
                                  const label = slab.maxQty
                                    ? `${slab.minQty}-${slab.maxQty} pcs`
                                    : `${slab.minQty}+ pcs`;

                                  return (
                                    <span
                                      key={idx}
                                      className={`px-3 py-1 text-xs rounded-full border ${
                                        isActive
                                          ? 'bg-teal-600 text-white'
                                          : 'bg-gray-800 text-gray-300 border-gray-600'
                                      }`}
                                    >
                                      {label} @ ₹{slab.price}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 sm:mt-0 w-full sm:w-auto justify-between">
                        <div className="flex items-center bg-gray-800 rounded overflow-hidden border border-gray-600">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-lg font-bold"
                          >−</button>
                          <span className="px-6 py-2 bg-gray-900 text-white text-lg font-semibold text-center min-w-[40px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className={`px-4 py-2 ${
                              item.quantity >= product.stock
                                ? 'bg-gray-700 cursor-not-allowed'
                                : 'bg-gray-700 hover:bg-gray-600'
                            } text-white text-lg font-bold`}
                            disabled={item.quantity >= product.stock}
                          >+</button>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="font-bold text-teal-400 text-lg">{formatCurrency(subtotal)}</span>
                          <button
                            onClick={() => handleRemoveItem(item._id)}
                            className="text-red-500 hover:text-red-400 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-10 border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-white">Total</h3>
                  <p className="text-2xl font-bold text-teal-400">{formatCurrency(computedTotal)}</p>
                </div>

                {inStockItems.length === 0 ? (
                  <p className="text-red-400 text-center text-lg">No items available for checkout.</p>
                ) : (
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-lg text-lg transition"
                  >
                    Proceed to Checkout
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </NavLayout>
  );
};

export default CartPage;
