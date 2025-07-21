import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, API_PATH } from '../../utils/apiPath';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get email from previous page
  const email = location.state?.email;

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email not found. Please try again.');
      navigate('/forgot-password');
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        otp,
      });
      toast.success(res.data.message || 'OTP Verified Successfully');

      // ✅ Navigate to reset password with email
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleVerify} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

        {/* Email is not shown to user */}
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          placeholder="Enter OTP"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 w-full py-2 text-white rounded hover:bg-blue-700"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
