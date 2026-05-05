import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-hot-toast';
import NavLayout from '../../components/auth/NavLayout';

const Notification = () => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser) {
      toast.error('User not logged in');
      return;
    }
    setUser(storedUser);
    fetchNotifications(storedUser.role);
  }, []);

  const fetchNotifications = async (role) => {
    try {
      let endpoint = '/notifications';

      if (role === 'reseller') {
        endpoint = '/notifications';
      } else if (role === 'distributor') {
        endpoint = '/notifications';
      }

      const { data } = await axiosInstance.get(endpoint);
    //   console.log('Fetched notifications:', data.notifications);
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Notification fetch error:', error);
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
  <NavLayout>
  <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-cyan-50 px-4 py-10">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
          📢 Notifications
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="animate-spin h-10 w-10 border-2 border-teal-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No notifications available.</p>
        </div>
      ) : (
        <ul className="space-y-5">
          {notifications.map((note, idx) => (
            <li
              key={idx}
              className="group relative bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-300"
            >
              {/* subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-teal-100 to-cyan-100 blur-xl"></div>

              <div className="relative z-10">
                {/* Top Row */}
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800"> 
                    {note.title || 'Notification'}
                  </h3>

                  {note.createdAt && (
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-3">
                      {formatDate(note.createdAt)}
                    </span>
                  )}
                </div>

                {/* Message */}
                <p className="text-gray-600 leading-relaxed text-sm">
                  {note.message}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
</NavLayout>
  );
};

export default Notification;
