import React, { useEffect, useState, useCallback } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_CARDS = [
  {
    label: 'Total Orders',
    key: 'totalOrders',
    bg: 'bg-blue-600',
    prefix: '',
    onClick: null,
  },
  {
    label: 'Total Revenue',
    key: 'totalRevenue',
    bg: 'bg-green-600',
    prefix: '₹',
    onClick: null,
  },
  {
    label: 'Total Users',
    key: 'totalUsers',
    bg: 'bg-purple-600',
    prefix: '',
    onClick: null,
  },
  {
    label: 'Low Stock Items',
    key: 'lowStockCount',
    bg: 'bg-red-500 hover:bg-red-400 cursor-pointer',
    prefix: '',
    onClick: (navigate) => navigate('/superadmin/low-stock'),
  },
];

const QUICK_ACTIONS = [
  {
    label: '📢 Manage Notifications',
    bg: 'bg-yellow-500 hover:bg-yellow-400',
    path: '/superadmin/notifications',
  },
  {
    label: '🛒 Manage Orders',
    bg: 'bg-indigo-500 hover:bg-indigo-400',
    path: '/superadmin/orders',
  },
  {
    label: '📦 Manage Products',
    bg: 'bg-teal-500 hover:bg-teal-400',
    path: '/superadmin/products',
  },
];

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axiosInstance.get(
        `${BASE_URL}/dashboard/super-admin`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats({
        totalOrders: data.totalOrders || 0,
        totalRevenue: data.totalRevenue || 0,
        totalUsers: data.totalUsers || 0,
        lowStockCount: data.lowStockCount || 0,
      });
    } catch (err) {
      toast.error('Failed to load dashboard data');
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">Super Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {DASHBOARD_CARDS.map((card) => (
            <div
              key={card.key}
              className={`${card.bg} rounded p-5 shadow`}
              onClick={card.onClick ? () => card.onClick(navigate) : undefined}
              style={card.onClick ? { cursor: 'pointer' } : {}}
            >
              <h2 className="text-md font-semibold">{card.label}</h2>
              <p className="text-3xl font-bold">
                {card.prefix}
                {stats[card.key] ?? 0}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.path}
              className={`${action.bg} rounded p-4 font-semibold`}
              onClick={() => navigate(action.path)}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </NavLayout>
  );
};

export default Dashboard;