import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';

import ContactComplaint from '../models/ContactComplaint.js';

//  Get all orders (Super admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
     .populate({
        path: 'items.product',
        select: 'name modelNo brand category' 
      });


    res.status(200).json({ orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders." });
  }
};

//  Get all users (Super admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ users });
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

//  Get analytics summary (Super admin)
export const getAnalyticsSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalSales = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    res.status(200).json({
      totalUsers,
      totalOrders,
      totalProducts,
      totalSales: totalSales[0]?.total || 0
    });
  } catch (err) {
    console.error("Get analytics summary error:", err);
    res.status(500).json({ message: "Failed to fetch analytics." });
  }
};


export const sendNotification = async (req, res) => {
  try {
    const notifications = await Notification.find({
      $or:[
        {sentTo:"all"},
        {sentTo:"distributor"}
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching distributor notifications:", err);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await ContactComplaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Server error' });
  }
};