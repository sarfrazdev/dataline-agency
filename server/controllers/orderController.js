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
    const userId = req.user._id;
    const userRole = req.user.role?.toLowerCase() || 'enduser';

    // ✅ Get the user's cart with populated product info
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'items.product',
      select: 'name prices stock quantityBasedPrices'
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty!' });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.product;
      const quantity = item.quantity;

      // ✅ Validate product and pricing
      if (!product || !product.prices) {
        console.warn(`Skipping item ${item.product?._id}: No product or pricing info`);
        continue; // skip to next item
      }

      let basePrice = product.prices[userRole];
      if (basePrice == null) {
        basePrice = product.prices.enduser;
      }

      if (basePrice == null) {
        console.warn(`Skipping item ${product._id}: No valid base price found`);
        continue;
      }

      if (product.stock < quantity) {
        return res.status(400).json({ message: `${product.name} is out of stock.` });
      }

      // ✅ Apply quantity based pricing
      let finalPrice = basePrice;
      if (product.quantityBasedPrices?.length > 0) {
        const slab = product.quantityBasedPrices.find(
          s => quantity >= s.minQty && (!s.maxQty || quantity <= s.maxQty)
        );
        if (slab) finalPrice = slab.price;
      }

      const itemTotal = finalPrice * quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product: product._id,
        quantity,
        price: finalPrice,
          total: finalPrice * quantity 
      });
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ message: 'No valid items to place order.' });
    }

    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount: Math.round(totalAmount * 100) / 100,
      paymentStatus: 'pending',
      orderStatus: 'placed'
    });

    await order.save();

    return res.status(201).json({
      message: 'Order placed successfully.',
      orderId: order._id,
      totalAmount: order.totalAmount
    });

  } catch (err) {
    console.error('❌ Error in createOrder:', err);
    return res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};



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

