 import express from 'express';
import {
  getResellerOrders,
  getResellerProducts,
  getResellerNotifications,
  updateResellerProfile
} from '../controllers/resellerAdminController.js';

import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  All endpoints for reseller admin (role check)
router.use(protect, authorizeRoles('reseller-admin'));

//  Reseller's own orders
router.get('/orders', getResellerOrders);

//  Reseller's own products
router.get('/products', getResellerProducts);

//  Reseller's own notifications
router.get('/notifications', getResellerNotifications);

//  Update own profile
router.put('/profile', updateResellerProfile);

export default router;