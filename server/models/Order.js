
// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   items: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//       total: { type: Number, required: true }
//     }
//   ],
//   shippingInfo: {
//     fullName: String,
//     phone: String,
//     address: String,
//     city: String,
//     state: String,
//     pincode: String,
//     businessName: String,
//     gstNumber: String,
//     panNumber: String,
//     companyAddress: String,
//     deliveryMethod: String,
//     courierOption: String,
//     customCourier: String,
//     busName: String,
//     busNumber: String,
//     contactNumber: String
//   },
//   totalAmount: { type: Number, required: true },
//   paymentStatus: {
//     type: String,
//     enum: ['pending', 'paid', 'failed', 'processing'],
//     default: 'pending'
//   },
//   orderStatus: {
//     type: String,
//     enum: ['placed', 'shipped', 'delivered', 'cancelled'],
//     default: 'placed'
//   },
//   cancellationReason: { type: String },
//   billUrl: { type: String, default: null },

  
//   paymentMethod: {
//   type: String,
//   enum: ['razorpay', 'bank_transfer'],
//   default: 'razorpay'
// },
// paymentProof: { type: String, default: null }
// }, { timestamps: true });

// export default mongoose.models.Order || mongoose.model('Order', orderSchema);


// Order.js
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
  // Add shipment field if needed
  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment' // Make sure you have a Shipment model if using this
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'processing'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    // enum: ['placed', 'shipped', 'delivered', 'cancelled'],
    //  enum: ['placed', 'shipped', 'delivered', 'cancelled', 'confirmed'],
     enum: ['placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'placed'
  },
  cancellationReason: { type: String },
  billUrl: { type: String, default: null },
  paymentMethod: {
    type: String,
    enum: ['razorpay', 'bank_transfer'],
    default: 'razorpay'
  },
  paymentProof: { type: String, default: null }
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
