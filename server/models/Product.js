import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  brand: { type: String },
  

  category: { type: String },
  modelNo: { type: String },
  prices: {
    enduser: { type: Number, required: true },
    reseller: { type: Number, required: true },
    distributor: { type: Number, required: true },
  },
  gst: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  images: [String],
quantityBasedPrices: [
  {
    minQty: { type: Number, required: true },
    maxQty: Number, // optional
    price: { type: Number, required: true }
  }
]
}, { timestamps: true, 
   collation: { locale: 'en', strength: 2 }
});
productSchema.index({ brand: 1 });
productSchema.index({ category: 1 });

export default mongoose.model('Product', productSchema);
