import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = () => {
  // Get token
  const token = localStorage.getItem('token');

  if (!token) {
    toast.error('Please login to continue');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;