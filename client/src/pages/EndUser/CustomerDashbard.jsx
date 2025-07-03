import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import NavLayout from '../../components/auth/NavLayout';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
    fetchNotifications(storedUser.role);
  }, []);

  const fetchNotifications = async (role) => {
    try {
      let endpoint = '/notifications';
      // if (role === 'reseller') endpoint = '/reseller/notifications';
      // if (role === 'distributor') endpoint = '/distributor/notifications';

      const { data } = await axiosInstance.get(endpoint);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Notification fetch error:', error);
      toast.error('Failed to fetch notifications');
    }
  };

  const role = user?.role || 'customer';
  const name = user?.name || 'Customer';

  return (
    <NavLayout>
      <div className="container mx-auto px-4 py-6 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight capitalize">
            {role} Dashboard
          </h1>

          {/* Notification Bell */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate('/notifications')}
          >
            <Bell className="w-6 h-6 text-teal-400 animate-pulse" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold">
                {notifications.length}
              </span>
            )}
          </div>
        </div>

        {/* Welcome Box */}
        <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">👋 Welcome, {name}</h2>
          <p className="text-gray-400">
            Manage your orders, wishlist, and personalized pricing right from your dashboard.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile */}
          <DashboardCard
            title="👤 Profile"
            description="Update your personal information."
            onClick={() => navigate('/profile')}
          />

          {/* Orders */}
          <DashboardCard
            title="📦 My Orders"
            description="Track and manage your order history."
            onClick={() => navigate('/orders')}
          />

          {/* Wishlist */}
          <DashboardCard
            title="❤️ Wishlist"
            description="Check your saved products."
            onClick={() => navigate('/wishlist')}
          />

          {/* Cart */}
          <DashboardCard
            title="🛒 My Cart"
            description="Review products in your cart."
            onClick={() => navigate('/cart')}
          />
        </div>
      </div>
    </NavLayout>
  );
};

// Reusable Card Component
const DashboardCard = ({ title, description, onClick }) => (
  <div className="bg-[#121212] p-5 rounded-lg border border-gray-700 shadow hover:shadow-teal-500/20 transition">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
    <button
      onClick={onClick}
      className="mt-4 inline-block bg-teal-600 hover:bg-teal-500 text-white text-sm px-4 py-2 rounded transition"
    >
      View
    </button>
  </div>
);

export default CustomerDashboard;
