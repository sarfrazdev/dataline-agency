// routes/wishlistRoutes.js
import express from 'express';
import { protect } from '../middleware/auth.js';
import {getWishlist,addToWishlist,removeFromWishlist} from '../controllers/wishlistController.js';

const router = express.Router();

router.get('/get', protect, getWishlist);
router.post('/add', protect, addToWishlist);
router.post('/remove', protect, removeFromWishlist);

export default router;
