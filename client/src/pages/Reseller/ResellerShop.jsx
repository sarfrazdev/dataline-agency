

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH, BASE_URL } from '../../utils/apiPath';
import { toast } from 'react-hot-toast';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import NavLayout from '../../components/auth/NavLayout';

const fallbackBrands = [
  'Prodot', 'HP', 'Dell', 'Lenovo', 'ASUS', 'Canon', 'Brother', 'Epson', 'TVSE', 'Samsung',
  'LG', 'TCL', 'Mantra', 'Morpho', 'Startek', 'Ricoh', 'Xerox', 'Pantum',
  'Logitech', 'Seagate', 'Toshiba', 'WD', 'SanDisk', 
 'CP Plus', 'Hikvision', 'Sony', 'Nikon', 'Zebronics',
  'TP-Link', 'D-Link',
];
fallbackBrands.push(
  'Geonix', 'Consistent', 'Electroline', 'Frontech', 'Acer',
  'Quick Heal', 'Ranz', 'Nova', 'AMD', 'BenQ',
  'Digisol', 'ESSL', 'Excelam', 'Honeywell', 'Intel',
  'Intex', 'Kingston', 'Lapcare', 'Lipi', 'Microtek',
  'NP', 'Numeric', 'People Link', 'Tenda', 'Cyber Power',
  'N Computing', 'Micron', 'Gigabyte', 'Microsoft',
  'Secure Eye', 'EVM', 'Cyber X', 'Fingers','Indiprint','Foxin','Nexivue'
);


const fallbackCategories = [
  'Laptop', 'Desktop', 'Printer', 'TV', 'Monitor', 'Biometrics', 'Cartridge', 'Ink Bottle',
  'Keyboard', 'Mouse', 'Internal HDD', 'External HDD', 'Pen Drive', 'Software', 'CCTV Camera',
  'Router', 'DVR', 'NVR', 'POE Switch', 'Tablets',  'Scanner',
  'SSD', 'Motherboard', 'UPS', 'SMPS', 'Cabinet', 'Laminator', 'Projector',
  'Toner Cartridge', 'Hub', 'Headphones', 'USB Hub', 'Ethernet Switch',
  'Laser Toner Powder', 'Photo Paper', 'Keyboard & Mouse Combo',
  'Web Camera', 'Barcode Scanner', 'Power Strip', 'CPU Fan', 'Mouse Pad',
  'RJ45 Splitter', 'Cleaning Kit', 'SSD Casing', 'Online UPS',
  'Cat 6 Cable', 'Rack', 'Media Converter', 'HDMI Extender',
  'HDMI Splitter', 'Power Adapter', '3 +1 Cable',
  "WiFi Adapter", "Cooling Pad", "UPS Battery", "Speaker",
  "Zero Client", "Graphics Card", "Gaming Cabinet",
  "Laptop Stand", "CCTV SMPS", "RAM", "Processor",
  "WiFi Camera", "CCTV Connector", "Adapter",
  "HDMI Cable", "Junction Box", "Gaming Chair",
  "4G Camera", "Barebone", "Micro SD Card",
  "Power Cable", "VGA Cable", "CAT6 Patch Cord",
  "Laptop Accessories", "Desktop Switch", "Splitter",
  "Wall Mount", "Printer Cable", "Laptop Adapter",
  "Earbuds", "DVD Writer", "Blower", "Networking Tools",
  "DMP Refills", "Dot Matrix Ribbon", "Surge Protector", "OPC Drum",'Antivirus','Extension cable'
];



const itemsPerPage = 52;

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
    .filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p?.name?.toLowerCase().includes(q) ||
        p?.brand?.toLowerCase().includes(q) ||
        p?.category?.toLowerCase().includes(q) ||
        p?.modelNo?.toLowerCase().includes(q)
      );
    })

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
  useEffect(() => {
    const savedPage = sessionStorage.getItem("currentPage");
    const savedScroll = sessionStorage.getItem("scrollPosition");

    if (savedPage) {
      setCurrentPage(Number(savedPage));
    }

    if (savedScroll) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedScroll));
      }, 100);
    }
  }, []);

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
    // <NavLayout>
    //      <div className="bg-[#2a2a2a] min-h-screen text-white">
    //   <div className="container mx-auto py-8 px-4 text-white">
    //     <h1 className="text-3xl font-bold text-center mb-8">Reseller IT Products</h1>

    //     {/* Filters */}
    //     <div className="flex flex-col md:flex-row gap-4 mb-8">
    //       <select value={selectedCategory} onChange={handleCategoryChange} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
    //         <option value="">All Categories</option>
    //         {fallbackCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
    //       </select>

    //       <select value={selectedBrand} onChange={handleBrandChange} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
    //         <option value="">All Brands</option>
    //         {fallbackBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
    //       </select>

    //       <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full md:w-1/3 p-2 rounded bg-gray-800 text-white">
    //         <option value="lowToHigh">Price: Low to High</option>
    //         <option value="highToLow">Price: High to Low</option>
    //       </select>
    //     </div>

    //     {/* Search */}
    //     <div className="mb-6 flex justify-center">
    //       <input
    //         value={searchQuery}
    //         onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
    //         placeholder="Search products..."
    //         className="w-full md:w-1/2 p-2 rounded border bg-gray-800 text-white placeholder-gray-400"
    //       />
    //     </div>

    //     {/* Product Grid */}

    //        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //               {displayedProducts.map(product => (

    //                 <div
    //                   key={product._id}
    //                   className="bg-gray-900 text-white rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-[1.02] hover:shadow-2xl"
    //                 >
    //       <div className="w-full h-64 flex items-center justify-center bg-white rounded-xl mb-4 cursor-pointer">
    //         <img
    //           src={product.images?.[0] || "/fallback.jpg"}
    //           alt={product.name}
    //           className="max-h-full max-w-full object-contain"
    //           onClick={() => navigate(`/product/${product._id}`)}
    //         />
    //         {product.stock === 0 && (
    //           <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
    //             Out of Stock
    //           </span>
    //         )}
    //       </div>

    //       <div className="space-y-1">
    //         <h2 className="text-lg font-semibold text-white">{product.name}</h2>
    //         <p className="text-sm text-gray-400">Brand: <span className="text-gray-200">{product.brand || 'N/A'}</span></p>
    //         <p className="text-sm text-gray-400">Model: <span className="text-gray-200">{product. modelNo || 'N/A'}</span></p>
    //       </div>

    //       <div className="flex justify-between items-center mt-4">
    //         <span className="font-bold text-blue-400 text-lg">₹{product.prices?.[role] || 'N/A'}</span>
    //         <div className="flex space-x-2">
    //           <button onClick={() => handleAddToWishlist(product._id)} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition cursor-pointer">
    //             <Heart className={`w-4 h-4 cursor-pointer ${wishlist.includes(product._id) ? 'fill-red-500 text-red-500' : 'text-red-400'}`} />
    //           </button>
    //           <button
    //             onClick={() => handleAddToCart(product._id)}
    //             disabled={product.stock === 0}
    //             className={`p-2 rounded-full ${
    //               product.stock === 0
    //                 ? 'bg-gray-500 cursor-not-allowed'
    //                 : 'bg-blue-600 hover:bg-blue-700 text-white'
    //             } transition cursor-pointer`}
    //           >
    //             <ShoppingCart className="w-4 h-4 cursor-pointer" />
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //        ))}
    //             </div>


    //     {/* Pagination */}
    //     <div className="flex justify-center items-center space-x-2 mt-8">
    //       <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
    //         Previous
    //       </button>
    //       <span>{currentPage} / {totalPages}</span>
    //       <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50">
    //         Next
    //       </button>
    //     </div>

    //     {/* Reset Button */}
    //     <div className="flex justify-center mt-6">
    //       <button onClick={resetFilters} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded">Clear Filters</button>
    //     </div>
    //   </div>
    // </div>
    // </NavLayout>
    <NavLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-10">

          {/* Title */}
          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            Reseller IT Products
          </h1>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="">All Categories</option>
              {fallbackCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="">All Brands</option>
              {fallbackBrands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>

          {/* Search */}
          <div className="mb-12 flex justify-center">
            <input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="w-full md:w-1/2 px-5 py-3 rounded-full border border-gray-200 shadow-sm focus:ring-2 focus:ring-cyan-400 outline-none"
            />
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayedProducts.map(product => (
              <div
                key={product._id}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col"
              >

                {/* Image */}
                <div
                  className="relative h-56 flex items-center justify-center bg-white cursor-pointer overflow-hidden"
                  // onClick={() => navigate(`/product/${product._id}`)}
                  onClick={() => {
                    sessionStorage.setItem("scrollPosition", window.scrollY);
                    sessionStorage.setItem("currentPage", currentPage);
                    navigate(`/product/${product._id}`);
                  }}
                >
                  <img
                    src={product.images?.[0] || "/fallback.jpg"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {product.stock === 0 && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4 flex-1 space-y-1">
                  <h2 className="text-sm font-semibold text-gray-900 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-xs text-gray-500">
                    {product.brand || 'N/A'} • {product.modelNo || 'N/A'}
                  </p>
                </div>

                {/* Bottom */}
                <div className="flex justify-between items-center px-4 pb-4">
                  <span className="text-lg font-bold text-teal-600">
                    ₹{product.prices?.[role] || 'N/A'}
                  </span>

                  <div className="flex gap-2">

                    {/* Wishlist */}
                    <button
                      onClick={() => handleAddToWishlist(product._id)}
                      className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition"
                    >
                      <Heart
                        className={`w-4 h-4 ${wishlist.includes(product._id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-500'
                          }`}
                      />
                    </button>

                    {/* Cart */}
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      disabled={product.stock === 0}
                      className={`p-2 rounded-full transition ${product.stock === 0
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-teal-500 hover:bg-teal-600 text-white shadow'
                        }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>

                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-gray-600">
              {currentPage} / {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-5 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 disabled:opacity-40"
            >
              Next
            </button>
          </div>

          {/* Reset */}
          <div className="flex justify-center mt-6">
            <button
              onClick={resetFilters}
              className="px-6 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow"
            >
              Clear Filters
            </button>
          </div>

        </div>
      </div>
    </NavLayout>

  );
};

export default ResellerShop;