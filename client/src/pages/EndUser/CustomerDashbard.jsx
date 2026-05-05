import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import NavLayout from '../../components/auth/NavLayout';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(storedUser);
  }, []);

  const role = user?.role || 'customer';
  const name = user?.name || 'Customer';

  return (
    <NavLayout>
      <div className="min-h-screen bg-[#f8fafc] py-10">
        <div className="container mx-auto px-4">

          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 capitalize tracking-tight">
              {role} Dashboard
            </h1>

            <div
              onClick={() => navigate('/notifications')}
              className="cursor-pointer group"
            >
              <div className="p-3 rounded-full bg-white shadow-md group-hover:shadow-lg transition">
                <Bell className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition" />
              </div>
            </div>
          </div>

          {/* Welcome */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                👋 Welcome, {name}
              </h2>
              <p className="text-gray-600 text-base">
                Manage your orders, wishlist, and personalized pricing right from your dashboard.
              </p>
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <DashboardCard
              title="👤 Profile"
              description="Update your personal information."
              onClick={() => navigate('/profile')}
            />

            <DashboardCard
              title="📦 My Orders"
              description="Track and manage your order history."
              onClick={() => navigate('/orders')}
            />

            <DashboardCard
              title="❤️ Wishlist"
              description="Check your saved products."
              onClick={() => navigate('/wishlist')}
            />

            <DashboardCard
              title="🛒 My Cart"
              description="Review products in your cart."
              onClick={() => navigate('/cart')}
            />

          </div>
        </div>
      </div>
    </NavLayout>
  );
};


const DashboardCard = ({ title, description, onClick }) => (
  <div
    onClick={onClick}
    className="group cursor-pointer"
  >
    <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition duration-300 group-hover:-translate-y-1 h-full flex flex-col justify-between">

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>


      <div className="mt-6">
        <span className="inline-block text-sm font-medium text-blue-600 group-hover:text-blue-700 transition">
          Open →
        </span>
      </div>

    </div>
  </div>
);

export default CustomerDashboard;