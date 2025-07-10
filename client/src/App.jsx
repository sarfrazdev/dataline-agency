import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/auth/Login';
//import Register from './components/auth/Register';
import ProtectedRoute from './routes/RoleBasedRoute';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Blog from './pages/Blog';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Support from './pages/Support';
import Cart from './pages/EndUser/Cart';
import Checkout from './pages/EndUser/Checkout';
import Wishlist from './components/common/wishlist';
import Profile from './pages/EndUser/Profile';
import Order from './pages/EndUser/Order';
import ProductDetail from './pages/EndUser/ProductDetail';

import CustomerDashboard from './pages/EndUser/CustomerDashbard';
import ResellerShop from './pages/Reseller/ResellerShop';
import DistributorShop from './pages/DisrtibutorCustomer/DistributorShop';

import EnduserAdminDashboard from './enduserAdmin/EnduserAdminDashboard';
import EnduserAdminOrder from './enduserAdmin/EnduserAdminOrder';
import ManageNotification from './enduserAdmin/ManageNotification';

import ResellerAdminDashboard from './resellerAdmin/ResellerAdminDashboard';
import ResellerAdminOrders from './resellerAdmin/ResellerAdminOrder';

import DistributorAdminDashboard from './distributorAdmin/DistributorAdminDashboard';
import DistributorAdminOrders from './distributorAdmin/DistributorAdminOrder';
import './index.css';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './superAdmin/Dashboard';
import Products from './superAdmin/Products';
import ManageOrders from './superAdmin/ManageOrders';
import LowStockProducts from './superAdmin/LowStockProducts';
import ManageNotifications from './superAdmin/ManageNotifications';
import OurTeam from './components/common/OurTeam';
import  Notification  from "./components/common/Notification"
import Slider from './components/common/Slider';
import Choose from './components/common/Choose';
// import BrandSection from './components/common/Brandsection';
import BrandSection from './components/common/BrandSection';
import Imagesection from './components/common/Imagesection';
import TopCategoriesSection from './components/common/TopCategoriesSection';
import PaymentPage from './pages/EndUser/PaymentPage';
import ForgotPasswordPage from './components/auth/ForgotPassword';
import ResetPasswordPage from './components/auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/register/enduser" element={<EndUserRegister />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/support" element={<Support />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Order />} />
       <Route path='/notifications' element={<Notification/>}/>
       <Route path='/slider' element={<Slider/>}/>
       <Route path='/choose' element={<Choose/>}/>
      <Route path='/brand-section' element={<BrandSection/>}/>
      <Route path='/topcategories-section' element={<TopCategoriesSection/>} />
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Authenticated Customer Roles */}
          <Route element={<ProtectedRoute allowedRoles={['reseller', 'distributor', 'enduser']} />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
            <Route path="/reseller/shop" element={<ResellerShop />} />
            <Route path="/distributor/shop" element={<DistributorShop />} />
            <Route path='/image-section' element={<Imagesection/>}/>
          </Route>

          {/* Enduser Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['enduser-admin']} />}>
          <Route path="/enduser-admin/dashboard" element={<EnduserAdminDashboard />} />
          <Route path="/enduser-admin/orders" element={<EnduserAdminOrder />} />
          <Route path="/enduser-admin/notifications" element={<ManageNotification />} />
        </Route>

        {/* Reseller Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['reseller-admin']} />}>
          <Route path="/reseller-admin/dashboard" element={<ResellerAdminDashboard />} />
          <Route path="/reseller-admin/orders" element={<ResellerAdminOrders />} />
          <Route path="/reseller-admin/notifications" element={<ManageNotification />} />
        </Route>

        {/* Distributor Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['distributor-admin']} />}>
          <Route path="/distributor-admin/dashboard" element={<DistributorAdminDashboard />} />
          <Route path="/distributor-admin/orders" element={<DistributorAdminOrders />} />
        </Route>

        {/* Super Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
          <Route path="/superadmin/dashboard" element={<Dashboard />} />
          <Route path="/superadmin/products" element={<Products />} />
          <Route path="/superadmin/orders" element={<ManageOrders />} />
          <Route path="/superadmin/low-stock" element={<LowStockProducts />} />
          <Route path="/superadmin/notifications" element={<ManageNotifications />} />
        </Route>
            <Route path='/our-team' element={<OurTeam/>}/>
      </Routes>
      
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  );
}

export default App;
