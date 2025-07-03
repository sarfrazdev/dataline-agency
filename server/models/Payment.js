import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  paymentGateway: { type: String, enum: ['razorpay', 'stripe'] },
  transactionId: String,
  amount: Number,
  status: { type: String, enum: ['success', 'failed', 'pending'] },
  createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Payment",paymentSchema)