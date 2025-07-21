import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BASE_URL, API_PATH } from '../../utils/apiPath';
import { useNavigate, useLocation } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}${API_PATH.AUTH.FORGOT_PASSWORD}`, { email });

      if (res.data.success) {
        toast.success(res.data.message || 'OTP sent to your email');
        navigate('/verify-otp', { state: { email } });
      } else {
        toast.error(res.data.message || 'Failed to send OTP');
      }

    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSendOtp} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
        <label>Email Address</label>
        <input
          type="email"
          className="border p-2 w-full mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded ${loading ? 'bg-blue-300' : 'bg-blue-600'} text-white`}
        >
          {loading ? 'Sending OTP...' : 'Send OTP'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
