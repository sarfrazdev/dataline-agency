import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}/api/notifications?role=enduser-admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNotifications(data.notifications);
    } catch (err) {
      toast.error('Failed to load notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkRead = async (id) => {
    await axiosInstance.put(`${BASE_URL}/api/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchNotifications();
  };

  const handleDelete = async (id) => {
    await axiosInstance.delete(`${BASE_URL}/api/notifications/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchNotifications();
  };

  return (
    <NavLayout>
          <div className="bg-white text-black p-6 rounded shadow max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-bold mb-4">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600 text-sm">No new notifications.</p>
      ) : (
        notifications.map((notif) => (
          <div key={notif._id} className="border-b py-3 flex justify-between items-start">
            <div>
              <p className="text-sm">{notif.message}</p>
              <p className="text-xs text-gray-500">{new Date(notif.createdAt).toLocaleString()}</p>
            </div>
            <div className="flex flex-col gap-1 text-xs">
              {!notif.read && (
                <button
                  onClick={() => handleMarkRead(notif._id)}
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => handleDelete(notif._id)}
                className="text-red-600 underline hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
    </NavLayout>
  
  );
};

export default ManageNotifications;
