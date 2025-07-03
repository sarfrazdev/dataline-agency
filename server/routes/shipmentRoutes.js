import express from 'express'
const router = express.Router();
import  {  createShipment ,getMyShipment}  from '../controllers/shipmentController.js';
import { protect } from '../middleware/auth.js';

router.post('/create',protect,createShipment);
router.get('/me', protect, getMyShipment); 
export default router
