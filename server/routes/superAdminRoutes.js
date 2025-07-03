import express from 'express';
import {
  getAllOrders,
  getAllUsers,
  getAnalyticsSummary,
  sendNotification
} from '../controllers/SuperAdminController.js';

import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

router.use(protect, authorizeRoles('superadmin'));

router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);
router.get('/analytics', getAnalyticsSummary);
router.get('/notifications', sendNotification);

export default router;