
import mongoose from 'mongoose'

const shipmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRole: {
    type: String,
    enum: ['enduser', 'reseller', 'distributor'],
    required: true
  },
  fullName: String,
  email: { type: String, default: '' }, // Make email optional
  phone: String,
  address: String,
  city: String,
  state: String,
  pincode: String,

  // B2B only fields
  businessName: String,
  gstNumber: String,
  panNumber: String,
  companyAddress: String,

  // Delivery method - make required only for B2B
  deliveryMethod: {
    type: String,
    enum: ['courier', 'bus', 'transport', 'pickup'],
    default: 'courier' // Set default for end users
  },
  courierOption: String,
  customCourier: String,

  busName: String,
  busNumber: String,
  contactNumber: String
}, { timestamps: true });

export default mongoose.model('Shipment', shipmentSchema);