import Payment from '../models/Payment.js';
import Order from '../models/Order.js';

// Record payment details (called after successful payment from Razorpay/Stripe)
export const recordPayment = async (req, res) => {
  try {
    const { orderId, paymentGateway, transactionId, amount, status } = req.body;

    if (!orderId || !paymentGateway || !transactionId || !amount || !status) {
      return res.status(400).json({ message: "All payment details are required." });
    }

    const payment = new Payment({
      orderId,
      paymentGateway,
      transactionId,
      amount,
      status
    });

    await payment.save();

    // Update order paymentStatus
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: status === 'success' ? 'paid' : 'failed'
    });

    res.status(201).json({ message: "Payment recorded successfully", payment });
  } catch (err) {
    console.error("Record payment error:", err);
    res.status(500).json({ message: "Failed to record payment" });
  }
};

// Get all payments (admin only)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('orderId');
    res.status(200).json({ payments });
  } catch (err) {
    console.error("Get all payments error:", err);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};