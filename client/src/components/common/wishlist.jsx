import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import NavLayout from '../auth/NavLayout';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return toast.error('Please login to view your wishlist');

      setLoading(true);
      const response = await axiosInstance.get(`${BASE_URL}${API_PATH.WISHLIST.GET}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const wishlist = response.data.wishlist || [];

      if (wishlist[0]?.name) {
        setWishlistItems(wishlist);
      } else {
        const productDetails = await Promise.all(
          wishlist.map(async (id) => {
            try {
              const res = await axiosInstance.get(`${BASE_URL}${API_PATH.PRODUCTS.GET_BY_ID}/${id}`);
              return res.data;
            } catch {
              return null;
            }
          })
        );
        setWishlistItems(productDetails.filter(Boolean));
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return toast.error('Please login');

      await axiosInstance.post(
        `${BASE_URL}${API_PATH.WISHLIST.REMOVE}`,
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Removed from wishlist');
      fetchWishlist();
    } catch (err) {
      console.error('Remove error:', err);
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return toast.error('Please login to add to cart');

      await axiosInstance.post(
        `${BASE_URL}${API_PATH.CART.ADD}`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Added to cart!');
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error('Failed to add to cart');
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <NavLayout>
      <div className="min-h-screen bg-[#1e1e1e] text-white px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-10 text-teal-400">💖 My Wishlist</h1>

          {loading ? (
            <p className="text-center text-gray-400">Loading wishlist...</p>
          ) : wishlistItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {wishlistItems.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#2d2d2d] rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="h-52 w-full object-cover"
                  /> */}
                  <img
                      src={product.images?.[0] || '/placeholder.jpg'}
                      alt={product.name}
                      className="h-52 w-full object-cover"
                    />

                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-xl font-semibold text-teal-300 mb-1">{product.name}</h2>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                    <div className="mt-auto flex justify-between items-center">
                   <span className="text-xl font-semibold text-blue-400 mb-4">
                          ₹ {
                            user?.role === 'reseller'
                              ? product?.prices?.reseller
                              : user?.role === 'distributor'
                              ? product?.prices?.distributor
                              : product?.prices?.enduser
                          }
                        </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRemoveFromWishlist(product._id)}
                          className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4 text-white" />
                        </button>
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition"
                          title="Add to Cart"
                        >
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-20 text-gray-400">
              <p className="text-xl">Your wishlist is empty 😔</p>
              {(() => {
                const userRole = localStorage.getItem('role');
                switch (userRole) {
                  case 'reseller':
                    return (
                      <Link to="/reseller/shop" className="mt-4 inline-block text-teal-400 hover:underline text-lg">
                        Start Shopping →
                      </Link>
                    );
                  case 'distributor':
                    return (
                      <Link to="/distributor/shop" className="mt-4 inline-block text-teal-400 hover:underline text-lg">
                        Start Shopping →
                      </Link>
                    );
                  default:
                    return (
                      <Link to="/shop" className="mt-4 inline-block text-teal-400 hover:underline text-lg">
                        Start Shopping →
                      </Link>
                    );
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </NavLayout>
  );
};

export default Wishlist;
