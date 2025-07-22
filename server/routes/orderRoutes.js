import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createOrder,
  verifyPayment,
  getUserOrders,
  cancelOrder,

  uploadBill,
  deleteBill,
  createManualOrder
} from '../controllers/orderController.js';

import { uploadPdf } from '../middleware/uploadPdf.js';
import { uploadProof } from '../middleware/uploadProof.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/', protect, getUserOrders);
router.put('/cancel/:id', protect, cancelOrder);

// Upload PDF bill
router.put('/bill/:id', protect, uploadPdf.single('billPdf'), uploadBill);
router.delete('/bill/:id', protect, deleteBill);
router.post('/manual', protect, uploadProof.single('paymentProof'), createManualOrder);

export default router;
