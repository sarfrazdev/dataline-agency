import React, { useState, useEffect } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import NavLayout from '../auth/NavLayout';
import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

  return (
   <NavLayout>
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10">
    <div className="max-w-7xl mx-auto px-4">

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        💖 My Wishlist
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading wishlist...</p>
      ) : wishlistItems.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {wishlistItems.map((product) => (
            <div
              key={product._id}
              className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
            >

              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={product.images?.[0] || '/placeholder.jpg'}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`)}
                  className="h-52 w-full object-cover cursor-pointer group-hover:scale-105 transition duration-500"
                />

                {/* Remove icon floating */}
                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow hover:bg-red-100 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">

                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h2>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <span className="text-xl font-bold text-blue-600 mb-4">
                  ₹{
                    user?.role === 'reseller'
                      ? product?.prices?.reseller
                      : user?.role === 'distributor'
                      ? product?.prices?.distributor
                      : product?.prices?.enduser
                  }
                </span>

                {/* Actions */}
                <div className="mt-auto flex gap-3">

                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.stock === 0}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition ${
                      product.stock === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>

      ) : (

        <div className="text-center mt-20">
          <p className="text-xl text-gray-500">Your wishlist is empty 😔</p>

          {(() => {
            const userRole = localStorage.getItem('role');
            switch (userRole) {
              case 'reseller':
                return (
                  <Link to="/reseller/shop" className="mt-4 inline-block text-blue-600 font-medium hover:underline text-lg">
                    Start Shopping →
                  </Link>
                );
              case 'distributor':
                return (
                  <Link to="/distributor/shop" className="mt-4 inline-block text-blue-600 font-medium hover:underline text-lg">
                    Start Shopping →
                  </Link>
                );
              default:
                return (
                  <Link to="/shop" className="mt-4 inline-block text-blue-600 font-medium hover:underline text-lg">
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
