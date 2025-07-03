import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';

//  Reseller's own orders
export const getResellerOrders = async (req, res) => {
  try {
     const orders = await Order.find()
    .populate({
      path: 'user',
      select: 'name email role',
      match: { role: 'reseller' }
    });
  
  const filteredOrders = orders.filter(order => order.user !== null);
  
  res.status(200).json({
    success: true,
    orders: filteredOrders.map(order => ({
      ...order._doc,
      customerName: order.user.name,
      customerEmail: order.user.email
    }))
  });
  
    }catch (err) {
    console.error("Reseller orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};

//  Reseller's own products (optional - depends on business logic)
export const getResellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ reseller: req.user._id });
    res.status(200).json({ products });
  } catch (err) {
    console.error("Reseller products error:", err);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

//  Reseller's own notifications
export const getResellerNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ sentTo: req.user._id });
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Reseller notifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

//  Update own profile
export const updateResellerProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update reseller profile error:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};