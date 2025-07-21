import express from 'express';
import {
  getEndUserOrders,
  getEndUserNotifications,
  updateEndUserProfile,

} from '../controllers/endUserAdminController.js';

import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  All endpoints for end user admin (role check)
router.use(protect, authorizeRoles('enduser-admin'));

//  End user's own orders
router.get('/orders', getEndUserOrders);

//  End user's notifications
router.get('/notifications', getEndUserNotifications);

//  Update own profile
router.put('/profile', updateEndUserProfile);


export default router;