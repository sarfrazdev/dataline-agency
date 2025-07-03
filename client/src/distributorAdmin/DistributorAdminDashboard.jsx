import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import NavLayout from '../components/auth/NavLayout';

const DistributorAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get(
       `${BASE_URL}${API_PATH.DISTRIBUTOR_ADMIN.GET_DASHBOARD}`
,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 && response.data) {
        const { data } = response;
        setStats({
          totalOrders: data.totalOrders || 0,
          totalCustomers: data.totalUsers || 0,
        });
        setRecentOrders(data.recentOrders || []);
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
      toast.error(err.response?.data?.message || 'Failed to load dashboard data');
    }
  };

  // ✅ Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(
        `${BASE_URL}${API_PATH.ENDUSER_ADMIN.UPDATE_ORDER_STATUS(orderId)}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Order status updated');
      fetchDashboardData(); // Refresh orders
    } catch (err) {
      console.error('Status update error:', err);
      toast.error('Failed to update order status');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">Distributor Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-600 rounded p-4 shadow">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">{stats.totalOrders}</p>
          </div>

          <div className="bg-green-600 rounded p-4 shadow">
            <h2 className="text-lg font-semibold">Total Customers</h2>
            <p className="text-3xl font-bold">{stats.totalCustomers}</p>
          </div>

          <div
            className="bg-yellow-500 rounded p-4 shadow cursor-pointer hover:bg-yellow-400"
            onClick={() => navigate('/distributor-admin/notifications')}
          >
            <h2 className="text-lg font-semibold">Manage Notifications</h2>
            <p className="text-sm mt-2">Send updates to end users</p>
          </div>

          <div
            className="bg-purple-600 rounded p-4 shadow cursor-pointer hover:bg-purple-500"
            onClick={() => navigate('/distributor-admin/orders')}
          >
            <h2 className="text-lg font-semibold">View Orders</h2>
            <p className="text-sm mt-2">See all customer orders</p>
          </div>
        </div>

     
    
      </div>
    </NavLayout>
  );
};

export default DistributorAdminDashboard;
