import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, API_PATH } from '../../utils/apiPath';

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: ''
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}${API_PATH.AUTH.RESET_PASSWORD}`, formData);
      toast.success(res.data.message || 'Password reset successful');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Reset Password</h2>
        <input
          type="email"
          name="email"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="otp"
          className="border p-2 w-full mb-3 rounded"
          placeholder="Enter OTP"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          className="border p-2 w-full mb-4 rounded"
          placeholder="New Password"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-600 w-full py-2 text-white rounded hover:bg-green-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
