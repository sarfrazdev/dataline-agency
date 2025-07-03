import express from 'express';
import {
  createNotification,
  getAllNotifications,
  deleteNotification
} from '../controllers/notificationController.js';
import {  createOrderNotification} from '../controllers/orderController.js';

import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  Create notification (admin only)
router.post('/create', protect, authorizeRoles('superadmin'), createNotification);

//  Get all notifications (public)
router.get('/', getAllNotifications);

//  Delete notification (admin only)
router.delete('/:id', protect, authorizeRoles('superadmin'), deleteNotification);

router.post('/', protect,  createOrderNotification);
export default router;