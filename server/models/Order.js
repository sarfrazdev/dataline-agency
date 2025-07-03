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

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number
    }
  ],

  shipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shipment',
    required: true
  },

  cancellationReason: { type: String },
  totalAmount: Number,

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

  billUrl: {
    type: String,
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
