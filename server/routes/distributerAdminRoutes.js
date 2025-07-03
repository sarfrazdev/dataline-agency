import express from 'express';
import {
  getDistributorOrders,
  getDistributorProducts,
  getDistributorNotifications,
  updateDistributorProfile
} from '../controllers/distributerAdminController.js';

import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  All endpoints for distributor admin (role check)
router.use(protect, authorizeRoles('distributor-admin'));

//  Distributor's own orders
router.get('/orders', getDistributorOrders);

//  Distributor's own products
router.get('/products', getDistributorProducts);

//  Distributor's notifications
router.get('/notifications', getDistributorNotifications);

//  Update own profile
router.put('/profile', updateDistributorProfile);

export default router;