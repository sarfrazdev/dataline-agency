import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  sentTo: { type: String, enum: ['all', 'reseller', 'distributor', 'enduser'] },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Notification',notificationSchema)
