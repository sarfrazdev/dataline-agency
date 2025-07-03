// models/Notification.js
import mongoose from 'mongoose';

const orderNotificationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'order', etc.
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  forRole: { type: String, enum: ['reseller', 'distributor', 'enduser'], required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('OrderNotification', orderNotificationSchema);
