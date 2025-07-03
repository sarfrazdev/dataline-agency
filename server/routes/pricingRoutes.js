import express from 'express';
import { getDynamicPrice } from '../controllers/pricingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

//  Get dynamic price for a product (requires login)
router.post('/calculate', protect, getDynamicPrice);

export default router;