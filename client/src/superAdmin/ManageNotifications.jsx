import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { BASE_URL, API_PATH } from '../utils/apiPath';
import { toast } from 'react-hot-toast';
import NavLayout from '../components/auth/NavLayout';
import { Trash2 } from 'lucide-react';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sentTo, setSentTo] = useState('all');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosInstance.get(`${BASE_URL}${API_PATH.NOTIFICATIONS.GET_ALL}`);
      setNotifications(data.notifications || []);
    } catch (err) {
      console.error('Fetch notifications error:', err);
      toast.error('Failed to load notifications');
    }
  };

  const handleSend = async () => {
    if (!title.trim() || !message.trim() || !sentTo) {
      return toast.error('Please provide title, message, and recipient');
    }

    try {
      setLoading(true);
      await axiosInstance.post(`${BASE_URL}${API_PATH.NOTIFICATIONS.CREATE}`, {
        title,
        message,
        sentTo,
      });
      toast.success('Notification sent successfully!');
      setTitle('');
      setMessage('');
      setSentTo('all');
      fetchNotifications();
    } catch (err) {
      console.error('Send notification error:', err);
      toast.error('Failed to send notification');
    } finally {
      setLoading(false);
    }
  };
const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to delete this notification?')) return;

  try {
    setDeletingId(id);
    await axiosInstance.delete(`${BASE_URL}/notifications/${id}`);
;

    toast.success('Notification deleted');
    setNotifications((prev) => prev.filter((note) => note._id !== id));
  } catch (err) {
    console.error('Delete error:', err?.response?.data || err.message);
    toast.error('Failed to delete notification');
  } finally {
    setDeletingId(null);
  }
};


  return (
    <NavLayout>
      <div className="min-h-screen p-6 bg-[#1e1e1e] text-white">
        <h1 className="text-3xl font-bold mb-6">📣 Manage Notifications</h1>

        {/* Create Notification */}
        <div className="bg-[#121212] p-6 rounded-lg shadow border border-gray-700 mb-8">
          <h2 className="text-xl font-semibold mb-4">Create New Notification</h2>

          <input
            type="text"
            placeholder="Enter notification title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 p-3 rounded border border-gray-600 bg-[#1e1e1e] text-white"
          />

          <textarea
            rows={4}
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full mb-4 p-3 rounded border border-gray-600 bg-[#1e1e1e] text-white"
          />

          <select
            value={sentTo}
            onChange={(e) => setSentTo(e.target.value)}
            className="w-full mb-4 p-3 rounded border border-gray-600 bg-[#1e1e1e] text-white"
          >
            <option value="all">All Users</option>
            <option value="enduser">End Users</option>
            <option value="reseller">Resellers</option>
            <option value="distributor">Distributors</option>
          </select>

          <button
            onClick={handleSend}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition"
          >
            {loading ? 'Sending...' : 'Send Notification'}
          </button>
        </div>

        {/* Notification List */}
        <div className="bg-[#121212] p-6 rounded-lg shadow border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">📜 Sent Notifications</h2>

          {notifications.length === 0 ? (
            <p className="text-gray-400">No notifications found.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((note) => (
                <li
                  key={note._id}
                  className="border border-gray-600 p-4 rounded bg-[#1a1a1a] relative"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-teal-400">{note.title}</h3>
                    <span className="text-sm text-gray-400">
                      {new Date(note.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <p className="text-gray-300">{note.message}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    Target: <span className="uppercase">{note.sentTo}</span>
                  </div>

                  <button
                    onClick={() => handleDelete(note._id)}
                    disabled={deletingId === note._id}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-600"
                    title="Delete notification"
                  >
                    {deletingId === note._id ? '...' : <Trash2 size={18} />}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </NavLayout>
  );
};

export default ManageNotifications;
