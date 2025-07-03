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
      <div className="container mx-auto px-4 py-6 text-white">
        <h1 className="text-2xl font-bold mb-6">📢 Notifications</h1>

        {loading ? (
          <p className="text-gray-400">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-gray-500">No notifications available.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((note, idx) => (
              <li
                key={idx}
                className="bg-[#1e1e1e] border border-gray-700 p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-teal-400">
                    {note.title || 'Notification'}
                  </h3>
                  {note.createdAt && (
                    <span className="text-sm text-gray-400">
                      {formatDate(note.createdAt)}
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mt-1">{note.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </NavLayout>
  );
};

export default Notification;
