import express from 'express';
import { recordPayment, getAllPayments } from '../controllers/paymentController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  Record payment (public after payment gateway callback)
router.post('/record', recordPayment);

//  Admin view all payments
router.get('/all', protect, authorizeRoles('admin'), getAllPayments);

export default router;