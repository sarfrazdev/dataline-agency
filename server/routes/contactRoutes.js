
import express from 'express';
import { createComplaint } from '../controllers/contactController.js';

const router = express.Router();


router.post('/contact', createComplaint);

export default router;
