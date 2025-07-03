import Razorpay from 'razorpay';
import crypto from 'crypto';
import { config } from 'dotenv';

config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create a new payment order
export const createRazorpayOrder = async (amount, currency = "INR") => {
  const options = {
    amount: amount * 100, // Convert to paisa
    currency,
    payment_capture: 1
  };

  const order = await razorpay.orders.create(options);
  return order;
};

// Verify payment signature (from Razorpay webhook)
export const verifyRazorpaySignature = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};
