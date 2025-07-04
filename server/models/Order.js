// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       quantity: Number,
//       price: Number
//     }
//   ],
//   cancellationReason: { type: String },
//   totalAmount: Number,
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed','processing'],
//     default: 'pending'
//   },
//   orderStatus: {
//     type: String,
//     enum: ['placed', 'shipped', 'delivered', 'cancelled'],
//     default: 'placed'
//   },
//   billUrl: {
//     type: String,
//     default: null
//   }
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema); 

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true }
    }
  ],
  shippingInfo: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    businessName: String,
    gstNumber: String,
    panNumber: String,
    companyAddress: String,
    deliveryMethod: String,
    courierOption: String,
    customCourier: String,
    busName: String,
    busNumber: String,
    contactNumber: String
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'processing'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'shipped', 'delivered', 'cancelled'],
    default: 'placed'
  },
  cancellationReason: { type: String },
  billUrl: { type: String, default: null },
  razorpayOrderId: { type: String },
  paymentId: { type: String }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);