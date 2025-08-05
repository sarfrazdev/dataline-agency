import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';
import { Pencil, Trash2 } from 'lucide-react';

const itemsPerPage = 10;

const getDynamicPrice = (quantity, slabs = [], basePrice) => {
  let price = basePrice;
  slabs.forEach(slab => {
    const isMin = quantity >= slab.minQty;
    const isMax = !slab.maxQty || quantity <= slab.maxQty;
    if (isMin && isMax && slab.price) {
      price = slab.price;
    }
  });
  return price;
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '', brand: '', category: '', modelNo: '',
    prices: { enduser: '', reseller: '', distributor: '' },
    gst: '', stock: '', description: '',
    quantityBasedPrices: [], images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantityMap, setQuantityMap] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}${API_PATH.PRODUCTS.GET_ALL}`);
      setProducts(data || []);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setFormData(prev => ({ ...prev, images: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleAddDiscount = () => {
    setFormData({
      ...formData,
      quantityBasedPrices: [...formData.quantityBasedPrices, { minQty: '', maxQty: '', price: '' }]
    });
  };

  const handleDiscountChange = (index, field, value) => {
    const updated = [...formData.quantityBasedPrices];
    updated[index][field] = value;
    setFormData({ ...formData, quantityBasedPrices: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('brand', formData.brand);
    form.append('category', formData.category);
    form.append('modelNo', formData.modelNo);
    form.append('gst', formData.gst);
    form.append('stock', formData.stock);
    form.append('description', formData.description);
    form.append('prices', JSON.stringify(formData.prices));
    form.append('quantityBasedPrices', JSON.stringify(formData.quantityBasedPrices));
    formData.images.forEach(img => form.append('images', img));

    try {
      if (isEditMode) {
        await axiosInstance.put(`${BASE_URL}${API_PATH.PRODUCTS.UPDATE(editId)}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product updated');
      } else {
        await axiosInstance.post(`${BASE_URL}${API_PATH.PRODUCTS.CREATE}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Product added');
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', brand: '', category: '', modelNo: '', prices: { enduser: '', reseller: '', distributor: '' },
      gst: '', stock: '', description: '', quantityBasedPrices: [], images: []
    });
    setImagePreviews([]);
    setIsEditMode(false);
    setEditId(null);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name || '',
      brand: product.brand || '',
      category: product.category || '',
      modelNo: product.modelNo || '',
      gst: product.gst || '',
      stock: product.stock || '',
      description: product.description || '',
      prices: {
        enduser: product.prices?.enduser || '',
        reseller: product.prices?.reseller || '',
        distributor: product.prices?.distributor || ''
      },
      quantityBasedPrices: Array.isArray(product.quantityBasedPrices) ? product.quantityBasedPrices : [],
      images: []
    });
    setImagePreviews(
      Array.isArray(product.images) && product.images.length > 0
        ? product.images.map(img => img.startsWith('http') ? img : `${BASE_URL}${img}`)
        : []
    );
    setEditId(product._id);
    setIsEditMode(true);
  };
  
const handleExcelUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file); 
  try {
    await axiosInstance.post(
      `${BASE_URL}/products/upload-excel`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    toast.success("Excel uploaded successfully");
    fetchProducts(); 
  } catch (err) {
    console.error("Excel upload error:", err);
    toast.error(err?.response?.data?.message || "Failed to upload Excel");
  }
};


  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`${BASE_URL}${API_PATH.PRODUCTS.DELETE(id)}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  useEffect(() => {
    fetchProducts();
    return () => imagePreviews.forEach(url => URL.revokeObjectURL(url));
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.modelNo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">📦 SuperAdmin - Manage Products</h1>

        <div className="bg-white text-black p-4 rounded shadow mb-6">
            <label className="font-semibold block mb-2">📥 Upload Products via Excel (.xlsx or .csv)</label>
            <input
              type="file"
              accept=".xlsx, .csv"
              onChange={handleExcelUpload}
              className="border p-2 rounded w-full"
            />
</div>


        <form onSubmit={handleSubmit} className="bg-white text-black p-4 rounded shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 rounded" required />
          <input placeholder="Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} className="border p-2 rounded" required />
          <input placeholder="Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="border p-2 rounded" required />
          <input placeholder="Model No" value={formData.modelNo} onChange={(e) => setFormData({ ...formData, modelNo: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="border p-2 rounded" required />
          <input placeholder="GST (%)" type="number" value={formData.gst} onChange={(e) => setFormData({ ...formData, gst: e.target.value })} className="border p-2 rounded" />
          <input placeholder="Price (End User)" type="number" value={formData.prices.enduser} onChange={(e) => setFormData({ ...formData, prices: { ...formData.prices, enduser: e.target.value } })} className="border p-2 rounded" required />
          <input placeholder="Price (Reseller)" type="number" value={formData.prices.reseller} onChange={(e) => setFormData({ ...formData, prices: { ...formData.prices, reseller: e.target.value } })} className="border p-2 rounded" required />
          <input placeholder="Price (Distributor)" type="number" value={formData.prices.distributor} onChange={(e) => setFormData({ ...formData, prices: { ...formData.prices, distributor: e.target.value } })} className="border p-2 rounded" required />
          {/* <input placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="border p-2 rounded col-span-full" required /> */}
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="border p-2 rounded col-span-full"
            rows={4}
            required
          />


          <div className="col-span-full">
            <label className="block mb-2 font-semibold">Upload Images (Max 3)</label>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="border p-2 rounded w-full" />
          </div>

          <div className="flex gap-2 col-span-full">
            {imagePreviews.map((url, i) => (
              <div key={i} className="relative">
                <img src={url} alt="preview" className="w-16 h-16 object-cover rounded" />
                <button type="button" onClick={() => {
                  const newPreviews = [...imagePreviews];
                  newPreviews.splice(i, 1);
                  setImagePreviews(newPreviews);
                  if (url.startsWith('blob:')) {
                    const newImages = [...formData.images];
                    newImages.splice(i, 1);
                    setFormData({ ...formData, images: newImages });
                  }
                }} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">×</button>
              </div>
            ))}
          </div>

          <div className="col-span-full">
            <label className="font-semibold text-black">Quantity-based Prices</label>
            {formData.quantityBasedPrices.map((d, i) => (
              <div key={i} className="flex gap-2 my-1">
                <input type="number" placeholder="Min Qty" value={d.minQty} onChange={(e) => handleDiscountChange(i, 'minQty', e.target.value)} className="border p-1 rounded w-1/4" required />
                <input type="number" placeholder="Max Qty" value={d.maxQty} onChange={(e) => handleDiscountChange(i, 'maxQty', e.target.value)} className="border p-1 rounded w-1/4" />
                <input type="number" placeholder="Dynamic Price (₹)" value={d.price} onChange={(e) => handleDiscountChange(i, 'price', e.target.value)} className="border p-1 rounded w-1/2" required />
              </div>
            ))}
            <button type="button" onClick={handleAddDiscount} className="mt-2 text-blue-600 text-sm underline">+ Add Price Slab</button>
          </div>

          <button type="submit" className="bg-blue-600 text-white rounded p-2 col-span-full">{isEditMode ? 'Update Product' : 'Add Product'}</button>
        </form>

        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search products..." className="p-2 w-full mb-4 rounded border-2 border-white text-white" />

        {loading ? <p className="text-gray-400">Loading...</p> : (
          <div className="overflow-x-auto bg-white text-black p-4 rounded shadow">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Brand</th>
                  <th className="p-2">Model</th>
                  <th className="p-2">Qty</th>
                  <th className="p-2">Images</th>
                  <th className="p-2">Prices</th>
                  <th className="p-2">Dynamic Price</th>
                  <th className="p-2">Stock</th>
                  <th className="p-2">Actions</th>
                  <th className="p-2">Description</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((product) => {
                  const qty = quantityMap[product._id] || 1;
                  const basePrice = Number(product.prices?.enduser) || 0;
                  const finalPrice = getDynamicPrice(qty, product.quantityBasedPrices, basePrice);
                  return (
                    <tr key={product._id} className="border-t">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.brand}</td>
                      <td className="p-2">{product.modelNo}</td>
                      <td className="p-2">
                        <input type="number" value={qty} min={1} onChange={(e) => setQuantityMap({ ...quantityMap, [product._id]: parseInt(e.target.value) || 1 })} className="w-16 p-1 border rounded" />
                      </td>
                      <td className="p-2">
                        {product.images.map((img, i) => (
                          <img key={i} src={img.startsWith('http') ? img : `${BASE_URL}${img}`} className="w-12 h-12 object-cover rounded mr-1 inline-block" alt="product" />
                        ))}
                      </td>
                      <td className="p-2 text-sm">₹{product.prices.enduser} / ₹{product.prices.reseller} / ₹{product.prices.distributor}</td>
                      <td className="p-2">₹{finalPrice.toFixed(2)}</td>
                      <td className="p-2">{product.stock}</td>
                      <td className="p-2 flex gap-2">
                        <button onClick={() => handleEdit(product)} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                        <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </td>
                      <td className="p-2 whitespace-pre-wrap">{product.description}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {filteredProducts.length > itemsPerPage && (
          <div className="flex justify-center items-center space-x-2 mt-4 text-white">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'} transition`}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition disabled:opacity-50">Next</button>
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default Products;
