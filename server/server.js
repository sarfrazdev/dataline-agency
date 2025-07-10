import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'; 
import productRoutes from './routes/ProductRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import notificationRoutes from './routes/notificationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import distributerAdminRoutes from './routes/distributerAdminRoutes.js';
import endUserAdminRoutes from './routes/endUserAdminRoutes.js';
import resellerAdminRoutes from './routes/resellerAdminRoutes.js';
import superAdminRoutes from "./routes/superAdminRoutes.js";
import pricingRoutes from './routes/pricingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import shipmentRoutes from  './routes/shipmentRoutes.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}


dotenv.config();


connectDb();


const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/distributor', distributerAdminRoutes);
app.use('/api/enduser', endUserAdminRoutes);
app.use('/api/reseller', resellerAdminRoutes);
app.use('/api/admin', superAdminRoutes);
app.use('/api/pricing', pricingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/shipment', shipmentRoutes);


app.get('/',(req,res)=>{
  res.send('api is working')
})

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
