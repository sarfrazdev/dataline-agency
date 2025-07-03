import express from 'express';
import { createReview, getReviewsForProduct, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Create review (any logged-in user)
router.post('/create', protect, createReview);

// Get reviews for a specific product
router.get('/product/:productId', getReviewsForProduct);

// Delete a review (admin or review owner)
router.delete('/:id', protect, deleteReview);

export default router;