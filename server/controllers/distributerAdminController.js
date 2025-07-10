import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Notification from '../models/Notification.js';

//  Distributor's own orders
export const getDistributorOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email role',
        match: { role: 'distributor' }
      })
      .populate({
        path: 'items.product',
        select: 'name modelNo brand category' 
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


//  Distributor's own products
export const getDistributorProducts = async (req, res) => {
  try {
    console.log("Fetching products for:", req.user); 

    const products = await Product.find({ distributor: req.user._id });

    res.status(200).json({ products });
  } catch (err) {
    console.error("Distributor products error:", err);
    res.status(500).json({ message: "Failed to fetch distributor products." });
  }

};

//  Distributor's own notifications
export const getDistributorNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ sentTo: req.user._id });
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Distributor notifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

//  Update own profile
export const updateDistributorProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update distributor profile error:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};