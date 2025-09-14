import React, { useEffect, useState } from 'react';
import axios from 'axios';
import{BASE_URL} from '../utils/apiPath';
import NavLayout from '../components/auth/NavLayout';


const ManageComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);
const fetchComplaints = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }
    
    // console.log('Current token:', token);
    
    const res = await axios.get(`${BASE_URL}/admin/contact-complaints`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setComplaints(res.data);
  } catch (err) {
    console.error('Error details:', err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
  const role = localStorage.getItem('role');
  if (role !== 'superadmin') {
    
    return;
  }
  fetchComplaints();
}, []);

  return (
   <NavLayout>
  <h2 className="text-3xl font-bold mb-6 text-white">Customer Complaints</h2>

  {loading ? (
    <p className="text-white">Loading complaints...</p>
  ) : complaints.length === 0 ? (
    <p className="text-gray-600">No complaints found.</p>
  ) : (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
      {complaints.map((complaint) => (
        <div
          key={complaint._id}
          className="bg-white rounded-xl shadow-md border border-gray-200 p-6 transition hover:shadow-lg"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-teal-600">
              {complaint.subject}
            </h3>
            <span className="text-sm text-gray-400">
              {new Date(complaint.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Name:</span>{' '}
              {complaint.name}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Email:</span>{' '}
              {complaint.email}
            </p>
            <p className="text-gray-700">
              <span className="font-medium text-gray-900">Mobile:</span>{' '}
              {complaint.subject}
            </p>
            <p className="text-gray-800 whitespace-pre-line mt-2">
              <span className="font-medium text-gray-900">Message:</span>{' '}
              {complaint.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</NavLayout>

  );
};

export default ManageComplaints;
