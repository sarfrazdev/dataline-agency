import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';

const LowStockProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLowStockProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axiosInstance.get(`${BASE_URL}/products?lowStock=true`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts(data.products || []);
    } catch (err) {
      console.error('Low stock fetch error:', err);
      toast.error('Failed to fetch low stock products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLowStockProducts();
  }, []);

  return (
    <NavLayout>
      <div className="min-h-screen bg-[#1e1e1e] text-white p-6">
        <h1 className="text-3xl font-bold mb-6">📉 Low Stock Products</h1>

        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400">No low stock products found</div>
        ) : (
          <div className="bg-white text-black p-4 rounded shadow overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 text-left">Product</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Brand</th>
                  <th className="p-2 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t">
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.category}</td>
                    <td className="p-2">{product.brand}</td>
                    <td className="p-2 text-red-600 font-semibold">{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </NavLayout>
  );
};

export default LowStockProducts;