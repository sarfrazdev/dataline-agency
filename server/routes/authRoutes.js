import express from "express";
const router = express.Router();

import {
  loginUser,
  registerEndUser,
  registerReseller,
  registerDistributor,
  loginAdmin,
  getCurrentUser,
  forgotPassword,resetPassword,verifyOtp
  
 
} from "../controllers/authController.js";

import { protect } from "../middleware/auth.js";

//  General Auth
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-otp', verifyOtp);
// router.post('/find-id', findId);

//  Role-Based Registration
router.post('/register/enduser', registerEndUser);
router.post('/register/reseller', registerReseller);
router.post('/register/distributor', registerDistributor);

// Admin Login
router.post('/admin/login', loginAdmin);

export default router;
