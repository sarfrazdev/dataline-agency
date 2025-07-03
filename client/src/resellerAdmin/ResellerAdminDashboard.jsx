

// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { BASE_URL, API_PATH } from '../utils/apiPath';
// import { useNavigate } from 'react-router-dom';
// import NavLayout from '../components/auth/NavLayout';
// import { toast } from 'react-hot-toast';

// const ResellerAdminDashboard = () => {
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalCustomers: 0,
//   });
//   const [recentOrders, setRecentOrders] = useState([]);

//   const navigate = useNavigate();

//   const fetchDashboardData = async () => {
//     try {
//       const { data } = await axiosInstance.get(
//         `${BASE_URL}/dashboard/reseller`, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//         });
//       setStats({
//         totalOrders: data.totalOrders || 0,
//         totalCustomers: data.totalUsers || 0,
//       });
//       setRecentOrders(data.recentOrders || []);
//     } catch (err) {
//       console.error('Reseller Admin Dashboard Error:', err);
//       toast.error(err.response?.data?.message || 'Failed to fetch dashboard data');
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   return (
//     <NavLayout>
//       <div className="min-h-screen bg-[#1e1e1e] text-white p-6">
//         <h1 className="text-3xl font-bold mb-6">Reseller Admin Dashboard</h1>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-blue-600 rounded p-4 shadow">
//             <h2 className="text-lg font-semibold">Total Orders</h2>
//             <p className="text-3xl font-bold">{stats.totalOrders}</p>
//           </div>

//           <div className="bg-green-600 rounded p-4 shadow">
//             <h2 className="text-lg font-semibold">Total Customers</h2>
//             <p className="text-3xl font-bold">{stats.totalCustomers}</p>
//           </div>

//           <div
//             className="bg-yellow-500 rounded p-4 shadow cursor-pointer hover:bg-yellow-400"
//             onClick={() => navigate('/reseller-admin/notifications')}
//           >
//             <h2 className="text-lg font-semibold">Manage Notifications</h2>
//             <p className="text-sm mt-2">Send messages to reseller users</p>
//           </div>
//         </div>

     
//       </div>
//     </NavLayout>
//   );
// };

// export default ResellerAdminDashboard;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import NavLayout from '../components/auth/NavLayout';

const ResellerAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
  });

  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        `${BASE_URL}${API_PATH.ADMIN_PANEL.RESELLER_ADMIN}`, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200 && response.data) {
        const { data } = response;
        setStats({
          totalOrders: data.totalOrders || 0,
          totalCustomers: data.totalUsers || 0,
        });
      }
    } catch (err) {
      console.error('Dashboard load error:', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
      toast.error(err.response?.data?.message || 'Failed to load dashboard data');
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">Reseller Admin Dashboard</h1>

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
            onClick={() => navigate('/reseller-admin/notifications')}
          >
            <h2 className="text-lg font-semibold">Manage Notifications</h2>
            <p className="text-sm mt-2">Send updates to reseller users</p>
          </div>

          <div
            className="bg-purple-600 rounded p-4 shadow cursor-pointer hover:bg-purple-500"
            onClick={() => navigate('/reseller-admin/orders')}
          >
            <h2 className="text-lg font-semibold">View Orders</h2>
            <p className="text-sm mt-2">See all reseller customer orders</p>
          </div>
        </div>
      </div>
    </NavLayout>
  );
};

export default ResellerAdminDashboard;
