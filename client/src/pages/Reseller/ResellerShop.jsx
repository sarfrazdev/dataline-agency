
// Updated ResellerShop.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavLayout from '../../components/auth/NavLayout'; 

const fallbackBrands = [
  'HP', 'Dell', 'Lenovo', 'ASUS', 'Canon', 'Brother', 'Epson', 'TVSE', 'Samsung',
  'LG', 'TCL', 'Mantra', 'Morpho', 'Startek', 'Prodot', 'Ricoh', 'Xerox', 'Pantum',
  'Logitech', 'Seagate', 'Toshiba', 'WD', 'SanDisk', 'Antivirus', 'Accounting Software',
  'Printer Adjustment Software', 'CP Plus', 'Hikvision', 'Sony', 'Nikon', 'Zebronics',
  'TP-Link', 'D-Link'
];

const fallbackCategories = [
  'Laptop', 'Desktop', 'Printer', 'TV & Monitor', 'Biometrics', 'Cartridge', 'Ink Bottle',
  'Keyboard and Mouse', 'Internal / External HDD', 'Pen Drive', 'Software', 'CCTV Camera',
  'Router', 'DVR/NVR', 'POE Switch', 'Tablets', 'Refurbished', 'Accessories', 'Networking',
  'Surveillance', 'Scanner'
];

const itemsPerPage = 50;

const ResellerShop = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('lowToHigh');
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState(fallbackCategories);
  const [brands, setBrands] = useState(fallbackBrands);

  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));
  const role = 'reseller';

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const brandFromURL = query.get('brand') || '';
    const categoryFromURL = query.get('category') || '';

    setSelectedBrand(brandFromURL);
    setSelectedCategory(categoryFromURL);

    fetchProducts(brandFromURL, categoryFromURL);
  }, [location.search]);

  const fetchProducts = async (brand, category) => {
    try {
      const params = {};
      if (brand) params.brand = brand;
      if (category) params.category = category;

      const res = await axiosInstance.get(`${BASE_URL}${API_PATH.PRODUCTS.GET_ALL}`, { params });
      setProducts(res.data);
    } catch (err) {
      toast.error('Failed to load products');
    }
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const res = await axios.get(`${BASE_URL}${API_PATH.WISHLIST.GET}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const ids = res.data?.wishlist?.map(item => item.product?._id).filter(Boolean) || [];
      setWishlist(ids);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const updateURLParams = (brand, category) => {
    const query = new URLSearchParams();
    if (brand) query.set('brand', brand);
    if (category) query.set('category', category);
    navigate({ search: query.toString() });
  };

  const handleBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);
    updateURLParams(brand, selectedCategory);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    updateURLParams(selectedBrand, category);
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      const aPrice = a.prices?.[role] || 0;
      const bPrice = b.prices?.[role] || 0;
      return sortOrder === 'lowToHigh' ? aPrice - bPrice : bPrice - aPrice;
    });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const resetFilters = () => {
    setSelectedBrand('');
    setSelectedCategory('');
    setSearchQuery('');
    setSortOrder('lowToHigh');
    setCurrentPage(1);
    navigate({ search: '' });
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${BASE_URL}${API_PATH.WISHLIST.ADD}`, { productId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Added to wishlist');
      fetchWishlist();
    } catch {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleAddToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');
    try {
      await axiosInstance.post(`${BASE_URL}${API_PATH.CART.ADD}`, { productId, quantity: 1 }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Product added to cart');
    } catch (err) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <NavLayout>
         <div className="bg-[#2a2a2a] min-h-screen text-white">
      <div className="container mx-auto py-8 px-4 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Reseller IT Products</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <select value={selectedCategory} onChange={handleCategoryChange} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
            <option value="">All Categories</option>
            {fallbackCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select value={selectedBrand} onChange={handleBrandChange} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
            <option value="">All Brands</option>
            {fallbackBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
          </select>

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Search */}
        <div className="mb-6 flex justify-center">
          <input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            placeholder="Search products..."
            className="w-full md:w-1/2 p-2 rounded border bg-gray-800 text-white placeholder-gray-400"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProducts.map(product => (
            <div key={product._id} className="bg-gray-900 text-white rounded shadow p-4">
              <div className="relative">
                <img
                  src={product.images?.[0] || "/fallback.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                />
                {product.stock === 0 && (
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    Out of Stock
                  </span>
                )}
              </div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-blue-400">₹{product.prices?.[role] || 'N/A'}</span>
                <div className="flex space-x-2">
                  <button onClick={() => handleAddToWishlist(product._id)} className="p-2 rounded-full bg-gray-700">
                    <Heart className={`w-4 h-4 ${wishlist.includes(product._id) ? 'fill-red-500 text-red-500' : 'text-red-400'}`} />
                  </button>
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    disabled={product.stock === 0}
                    className={`p-2 rounded-full ${product.stock === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
            Previous
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
            Next
          </button>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center mt-6">
          <button onClick={resetFilters} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Clear Filters</button>
        </div>
      </div>
    </div>
    </NavLayout>
   
  );
};

export default ResellerShop;