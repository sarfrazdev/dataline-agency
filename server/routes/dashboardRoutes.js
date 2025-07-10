import express from 'express';
import { protect, authorizeRoles } from '../middleware/auth.js';
import {
  getDashboardStats,
  getResellerDashboard,
  getDistributorDashboard,
  getEndUserDashboard,
  updateOrderStatus,
  updatePaymentStatus,updateManualOrderStatus
} from '../controllers/dashboardController.js';
import { uploadProof } from '../middleware/uploadProof.js';

const router = express.Router();

// Super Admin Dashboard (Only for admin role)
router.get(
  '/super-admin',
  protect,
  authorizeRoles('superadmin'),
  getDashboardStats
);

// Reseller Admin Dashboard (Only for reseller-admin)
router.get(
  '/reseller',
  protect,
  authorizeRoles('reseller-admin'),
  getResellerDashboard
);

// Distributor Admin Dashboard (Only for distributor-admin)
router.get(
  '/distributor',
  protect,
  authorizeRoles('distributor-admin'),
  getDistributorDashboard
);

// End User Admin Dashboard (Only for enduser-admin)
router.get(
  '/user',
  protect,
  authorizeRoles('enduser-admin'),
  getEndUserDashboard
);

// Update Order Status — only allowed to Admins & Admin Panels
router.put(
  '/:orderId/status',
  protect,
  authorizeRoles('superadmin', 'reseller-admin', 'distributor-admin', 'enduser-admin'),
  updateOrderStatus
);
router.put(
  '/orders/:orderId/payment',
  protect,
  authorizeRoles('superadmin', 'reseller-admin', 'distributor-admin', 'enduser-admin'),
  updatePaymentStatus
);

router.put(
  '/orders/:orderId/manual-payment',
  protect,
  authorizeRoles('superadmin', 'reseller-admin', 'distributor-admin', 'enduser-admin'),
  updateManualOrderStatus
);

export default router;