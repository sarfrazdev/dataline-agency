import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import NavLayout from './NavLayout';
import { BASE_URL, API_PATH } from '../../utils/apiPath';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('enduser');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    firmName: '',
    constitutionOfFirm: '',
    gstNumber: '',
    panNumber: '',
    officeAddress: '',
    residenceAddress: '',
    mobile: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

  let endpoint = '';
if (role === 'enduser') {
  endpoint = `${BASE_URL}${API_PATH.AUTH.REGISTER.ENDUSER}`;
} else if (role === 'reseller') {
  endpoint = `${BASE_URL}${API_PATH.AUTH.REGISTER.RESELLER}`;
} else if (role === 'distributor') {
  endpoint = `${BASE_URL}${API_PATH.AUTH.REGISTER.DISTRIBUTOR}`;
}


    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,

      };
      if (role !== 'enduser') {
        // Validate required fields for reseller/distributor
        if (
          !formData.firmName ||
          !formData.constitutionOfFirm ||
          !formData.panNumber ||
          !formData.officeAddress ||
          !formData.residenceAddress ||
          !formData.mobile
        ) {
          toast.error('Please fill all required fields for your role.');
          setIsLoading(false);
          return;
        }
        payload.firmName = formData.firmName;
        payload.constitutionOfFirm = formData.constitutionOfFirm;
        payload.gstNumber = formData.gstNumber;
        payload.panNumber = formData.panNumber;
        payload.officeAddress = formData.officeAddress;
        payload.residenceAddress = formData.residenceAddress;
        payload.mobile = formData.mobile;
      }

      const response = await axios.post(endpoint, payload);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Registration successful!');
      
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
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <NavLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Role</label>
              <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded">
                <option value="enduser">End User</option>
                <option value="reseller">Reseller</option>
                <option value="distributor">Distributor</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>
            <div>
              <label className="block font-medium">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1 text-sm text-gray-600">
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {role !== 'enduser' && (
              <>
                <div>
                  <label className="block font-medium">Firm Name</label>
                  <input type="text" name="firmName" value={formData.firmName} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">Constitution of Firm</label>
                  <input type="text" name="constitutionOfFirm" value={formData.constitutionOfFirm} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">GST Number (optional for Reseller)</label>
                  <input type="text" name="gstNumber" value={formData.gstNumber} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">PAN Number</label>
                  <input type="text" name="panNumber" value={formData.panNumber} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">Office Address</label>
                  <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">Residence Address</label>
                  <input type="text" name="residenceAddress" value={formData.residenceAddress} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div>
                  <label className="block font-medium">Mobile</label>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
              </>
            )}

            <button type="submit" disabled={isLoading} className={`w-full py-2 rounded ${isLoading ? 'bg-blue-300' : 'bg-blue-600'} text-white`}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </NavLayout>
  );
};

export default RegisterPage;
