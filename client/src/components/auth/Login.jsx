import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import NavLayout from './NavLayout';
import { BASE_URL, API_PATH } from '../../utils/apiPath';
const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}${API_PATH.AUTH.LOGIN}`, formData);

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!');

      switch (user.role) {
        case 'superadmin':
          navigate('/superadmin/dashboard');
          break;
        case 'reseller-admin':
          navigate('/reseller-admin/dashboard');
          break;
        case 'distributor-admin':
          navigate('/distributor-admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                className="border border-gray-300 rounded w-full p-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="border border-gray-300 rounded w-full p-2"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 text-sm text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded ${isLoading ? 'bg-blue-300' : 'bg-blue-600'} text-white`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <p>
              Don't have an account?{' '}
              <span
                onClick={() => navigate('/register')}
                className="cursor-pointer ml-1 text-blue-600 hover:underline"
              >
                Register
              </span>
            </p>
          </form>
           <div className="text-right text-sm">
              <span
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Forgot Password?
              </span>
            </div>
        </div>
       
      </div>
    </NavLayout>
  );
};

export default LoginPage;