import mongoose from "mongoose";

const pricingRuleSchema = new mongoose.Schema({
  role: { type: String, enum: ['reseller', 'distributor'], required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  minQty: Number,
  maxQty: Number,
  discountPercent: Number
}, { timestamps: true });

export default mongoose.model("PricingRule",pricingRuleSchema)