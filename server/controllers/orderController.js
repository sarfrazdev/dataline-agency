import Order from '../models/Order.js';
import Cart from '../models/cart.js';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import orderNotification from '../models/orderNotification.js'
import Razorpay from 'razorpay';
import { getDynamicPrice } from './productController.js';

export const createOrder = async (req, res) => {
  try {
    const { shippingInfo } = req.body;
    const userId = req.user._id;
    const userRole = req.user.role;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;
      const quantity = item.quantity;

      if (!product || !product.prices || !product.prices[userRole]) {
        return res.status(400).json({ message: `Invalid pricing for ${product?.name}` });
      }

      // Check stock
      if (product.stock < quantity) {
        return res.status(400).json({ message: `${product.name} is out of stock.` });
      }

      const basePrice = product.prices[userRole];
      const unitPrice = getDynamicPrice(quantity, product.quantityBasedPrices, basePrice);
      const itemTotal = unitPrice * quantity;

      totalAmount += itemTotal;

      // Add order item
      orderItems.push({
        product: product._id,
        quantity,
        price: unitPrice,
        total: itemTotal,
        appliedSlab: product.quantityBasedPrices?.find(slab =>
          quantity >= slab.minQty && (!slab.maxQty || quantity <= slab.maxQty)
        ) || null
      });
    }

    // Round to 2 decimals
    totalAmount = Math.round(totalAmount * 100) / 100;

    if (totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid total amount' });
    }

    // Save order in DB
    const order = new Order({
      user: userId,
      items: orderItems,
      shippingInfo,
      totalAmount,
      paymentStatus: 'pending',
      orderStatus: 'placed'
    });

    await order.save();

    // Razorpay Integration
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalAmount * 100), 
      currency: 'INR',
      receipt: order._id.toString(),
      notes: {
        user: userId.toString(),
        order: order._id.toString()
      }
    });


    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.status(201).json({
      message: "Order created",
      orderId: order._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: 'Failed to create order', error: err.message });
  }
};


// Verify Payment
export const verifyPayment = async (req, res) => {
  const { orderId, paymentId, razorpayOrderId, signature } = req.body;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(razorpayOrderId + '|' + paymentId)
    .digest('hex');

  if (expectedSignature !== signature) {
    return res.status(400).json({ message: 'Invalid payment signature' });
  }

  await Order.findByIdAndUpdate(orderId, {
    paymentStatus: 'paid'
  });

  res.status(200).json({ message: 'Payment verified & order confirmed!' });
};

// Get orders of logged-in user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate({
        path: 'items.product',
        select: 'name price brand imageUrl description', 
      })
      .populate({
        path: 'user',
        select: 'name email role mobile', 
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ orders });
  } catch (err) {
    console.error('Get user orders error:', err);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};


// Cancel order with reason
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  if (!reason) {
    return res.status(400).json({ message: 'Cancellation reason is required' });
  }

  try {
    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Paid orders cannot be cancelled' });
    }

    if (order.orderStatus === 'shipped' || order.orderStatus === 'delivered') {
      return res.status(400).json({ message: 'Order already processed, cannot cancel now' });
    }

    if (order.orderStatus === 'cancelled') {
      return res.status(400).json({ message: 'Order is already cancelled' });
    }

    order.orderStatus = 'cancelled';
    order.cancellationReason = reason;
    await order.save();

    return res.status(200).json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    console.error('Cancel order error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const uploadBill = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'No PDF file uploaded' });

  // Create bills directory if it doesn't exist
  const billsDir = path.join(process.cwd(), 'uploads/bills');
  if (!fs.existsSync(billsDir)) {
    fs.mkdirSync(billsDir, { recursive: true });
  }

  // Move file to bills directory
  const oldPath = path.join(process.cwd(), 'uploads', file.filename);
  const newPath = path.join(billsDir, file.filename);
  
  try {
    await fs.promises.rename(oldPath, newPath);
    
    const billUrl = `${req.protocol}://${req.get('host')}/uploads/bills/${file.filename}`;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Delete old bill file if exists
    if (order.billUrl) {
      const oldFilename = order.billUrl.split('/').pop();
      const oldFilePath = path.join(billsDir, oldFilename);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    order.billUrl = billUrl;
    await order.save();

    res.status(200).json({ message: 'Bill uploaded successfully', billUrl });
  } catch (err) {
    console.error('Bill upload error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteBill = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (!order.billUrl) {
      return res.status(400).json({ message: 'No bill to delete' });
    }

    const filename = order.billUrl.split('/').pop();
    const filePath = path.join(process.cwd(), 'uploads/bills', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    order.billUrl = null;
    await order.save();

    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (err) {
    console.error('Bill delete error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// export const notifyOrder = async (req, res) => {
//   const { order } = req.body;

//   if (!order || !order._id) {
//     return res.status(400).json({ message: 'Invalid order data' });
//   }

//   try {
//     await createOrderNotification(req, order);
//     res.status(200).json({ message: 'Notification created successfully' });
//   } catch (err) {
//     console.error('Notification error:', err);
//     res.status(500).json({ message: 'Failed to create notification' });
//   }
// };
export const createOrderNotification = async (req, order) => {
  const roles = ['enduser', 'reseller', 'distributor'];
  for (const role of roles) {
    await orderNotification.create({
      type: 'order',
      message: `New order placed by ${req.user.name} — ₹${order.totalAmount}`,
      orderId: order._id,
      userId: req.user._id,
      forRole: role,
      read: false
    });
  }
};

