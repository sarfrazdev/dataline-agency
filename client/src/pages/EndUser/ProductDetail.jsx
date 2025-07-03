import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import NavLayout from '../../components/auth/NavLayout';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeSlabIndex, setActiveSlabIndex] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axiosInstance.get(`${BASE_URL}${API_PATH.PRODUCTS.GET_ONE(id)}`);
        setProduct(data);
        setActiveImage(data.images?.[0] || '');
        autoSelectSlab(data, 1);
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const getBasePrice = () => {
    if (!product || !user) return 0;
    if (user.role === 'reseller') return product.prices?.reseller || 0;
    if (user.role === 'distributor') return product.prices?.distributor || 0;
    return product.prices?.enduser || 0;
  };

  const autoSelectSlab = (productData, quantity) => {
    const slabs = productData.quantityBasedPrices || [];
    const index = slabs.findIndex(slab => quantity >= slab.minQty && (!slab.maxQty || quantity <= slab.maxQty));
    setActiveSlabIndex(index !== -1 ? index : null);
  };

  const handleQuantityChange = (qty) => {
    if (!product) return;
    if (qty < 1) qty = 1;
    if (qty > product.stock) {
      toast.error('Cannot exceed available stock');
      qty = product.stock;
    }
    setSelectedQty(qty);
    autoSelectSlab(product, qty);
  };

  const handleAddToCart = async () => {
    if (product.stock <= 0) return toast.error('Out of stock');
    if (selectedQty > product.stock) return toast.error('Quantity exceeds available stock');

    try {
      const response = await axiosInstance.post(`${BASE_URL}${API_PATH.CART.ADD}`, {
        productId: product._id,
        quantity: selectedQty,
      });
      if (response.status === 200) toast.success('Added to cart');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}${API_PATH.WISHLIST.ADD}`, {
        productId: product._id,
      });
      if (response.status === 200) toast.success('Added to wishlist');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add to wishlist');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        });
      } catch {
        toast.error('Sharing cancelled or failed');
      }
    } else {
      try {
        const dummyElement = document.createElement('textarea');
        document.body.appendChild(dummyElement);
        dummyElement.value = window.location.href;
        dummyElement.select();
        document.execCommand('copy');
        document.body.removeChild(dummyElement);
        toast.success('Link copied to clipboard');
      } catch {
        toast.error('Failed to copy link');
      }
    }
  };

  const basePrice = getBasePrice();
  const selectedSlab = product?.quantityBasedPrices?.[activeSlabIndex] || null;
  const finalPrice = selectedSlab?.price || basePrice;

  if (loading) return <div className="text-center mt-10 text-white">Loading...</div>;
  if (!product) return <div className="text-center mt-10 text-red-500">Product not found.</div>;

  return (
    <NavLayout>
      <div className="container mx-auto px-4 py-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <div
              className="cursor-zoom-in border border-gray-700 bg-white rounded-xl overflow-hidden max-h-[500px] shadow-xl mb-4"
              onClick={() => setIsZoomOpen(true)}
            >
              <img src={activeImage} alt="Product" className="w-full h-full object-contain" />
            </div>
            <div className="flex gap-3">
              {product.images?.slice(0, 4).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumb-${i}`}
                  onClick={() => setActiveImage(img)}
                  className={`h-20 w-20 object-cover rounded-md cursor-pointer border-2 transition-all duration-300 shadow-md ${
                    activeImage === img ? 'border-cyan-500 scale-110' : 'border-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-wide text-cyan-300">
              {product.name}
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-cyan-500 pl-4 italic">
              {product.description}
            </p>

            <div className="text-sm font-medium text-yellow-300">
              {product.stock > 0 ? `In Stock: ${product.stock}` : <span className="text-red-500 font-semibold">Out of Stock</span>}
            </div>

            <div className="text-3xl font-extrabold">
              Price: <span className="text-lime-400">₹{finalPrice.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3">
              <label className="font-semibold">Qty:</label>
              <input
                type="number"
                value={selectedQty}
                min={1}
                max={product.stock}
                onChange={(e) => handleQuantityChange(Number(e.target.value))}
                className="w-20 text-black rounded px-3 py-1 border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {product.quantityBasedPrices?.length > 0 && (
              <div className="space-y-2">
                <label className="font-semibold text-sm text-cyan-200">Discount Slabs:</label>
                <div className="flex flex-wrap gap-2">
                  {product.quantityBasedPrices.map((slab, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveSlabIndex(i);
                        setSelectedQty(slab.minQty);
                      }}
                      className={`px-4 py-1 border rounded-full text-sm font-medium transition ${
                        activeSlabIndex === i
                          ? 'bg-cyan-600 text-white shadow-lg'
                          : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-cyan-700'
                      }`}
                    >
                      {slab.minQty} - {slab.maxQty || '∞'} pcs @ ₹{slab.price}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                  product.stock <= 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'
                } shadow-lg`}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 rounded-lg font-semibold transition shadow-lg"
              >
                <Heart size={18} /> Wishlist
              </button>
              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition shadow-lg"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {isZoomOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <img src={activeImage} alt="Zoomed" className="max-w-4xl max-h-[90vh] object-contain rounded-lg shadow-xl" />
        </div>
      )}
    </NavLayout>
  );
};

export default ProductDetail;
