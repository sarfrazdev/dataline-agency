import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
 import ContactComplaint from '../models/ContactComplaint.js';

import fs from 'fs';
import path from 'path';

//  Super Admin Dashboard
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalProducts = await Product.countDocuments();
        const complaintOrEnquiry = await ContactComplaint.countDocuments(); 
    res.status(200).json({
      totalUsers,
      totalOrders,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalProducts,
        complaintOrEnquiry,
    });
  } catch (err) {
    console.error("Super Admin Dashboard Error:", err);
    res.status(500).json({ message: "Failed to get dashboard stats" });
  }
};



export const getEndUserDashboard = async (req, res) => {
  try {
    const endUsers = await User.find({ role: 'enduser' }).select('_id');
    const endUserIds = endUsers.map(user => user._id);

    const totalOrders = await Order.countDocuments({ user: { $in: endUserIds } });

    //  Fetch all orders from end users sorted by newest first
    const recentOrders = await Order.find({ user: { $in: endUserIds } })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items.product', 'name')
      .select('user items totalAmount createdAt paymentProof paymentStatus orderStatus');

    //  Fetch manual bank transfer orders (still pending)
    const manualOrders = await Order.find({
      user: { $in: endUserIds },
      paymentMethod: 'bank_transfer',
      paymentStatus: 'pending'
    })
      .sort({ createdAt: -1 })
      .populate('user', 'name email')
      .populate('items.product', 'name');

    res.status(200).json({
      totalOrders,
      totalUsers: endUsers.length,
      recentOrders,
      manualOrders
    });

  } catch (err) {
    console.error("Enduser Dashboard Stats Error:", err);
    res.status(500).json({ message: "Failed to fetch dashboard data." });
  }
};



export const getResellerDashboard = async (req, res) => {
 try {
    const reseller = await User.find({ role: 'reseller' }).select('_id');

    const resellerIds = reseller.map(user => user._id);

    const totalOrders = await Order.countDocuments({ user: { $in: resellerIds } });
    const recentOrders = await Order.find({ user: { $in: resellerIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    const formattedRecent = recentOrders.map(order => ({
      ...order._doc,
      customerName: order.user?.name,
      customerEmail: order.user?.email,
    }));

    res.status(200).json({
      totalOrders,
      totalUsers: reseller.length,
      recentOrders: formattedRecent,
    });
  }  catch (err) {
    console.error("Reseller Dashboard Error:", err);
    res.status(500).json({ message: "Failed to get reseller dashboard data" });
  }
};

//  Distributor Dashboard
export const getDistributorDashboard = async (req, res) => {
 try {
    const distributor = await User.find({ role: 'distributor' }).select('_id');

    const distributorIds = distributor.map(user => user._id);

    const totalOrders = await Order.countDocuments({ user: { $in: distributorIds } });
    const recentOrders = await Order.find({ user: { $in: distributorIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('user', 'name email');

    const formattedRecent = recentOrders.map(order => ({
      ...order._doc,
      customerName: order.user?.name,
      customerEmail: order.user?.email,
    }));

    res.status(200).json({
      totalOrders,
      totalUsers: distributor.length,
      recentOrders: formattedRecent,
    });
  } catch (err) {
    console.error("Distributor Dashboard Error:", err);
    res.status(500).json({ message: "Failed to get distributor dashboard data" });
  }
};

//  End User Dashboard (basic order count and spending)


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = ['placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order });
  } catch (err) {
    console.error('Order status update error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    if (!paymentStatus) {
      return res.status(400).json({ message: 'Payment status is required' });
    }

    // Check if the status is valid (optional extra validation)
    const validStatuses = ['pending', 'failed', 'processing', 'paid'];
    if (!validStatuses.includes(paymentStatus)) {
      return res.status(400).json({ message: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus },
      { new: true, runValidators: true } 
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
if (order.orderStatus === 'Cancelled') {
  return res.status(400).json({ message: 'Cannot update status for a cancelled order' });
}
    res.status(200).json({ 
      message: 'Payment status updated successfully',
      order 
    });
  } catch (error) {
    console.error('Update Payment Status Error:', error);
    res.status(500).json({ 
      message: 'Server error while updating payment status',
      error: error.message 
    });
  }
};





export const updateManualOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['paid', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid payment status.' });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    //  Update payment status
    order.paymentStatus = status;
    if (status === 'paid') {
      order.orderStatus = 'confirmed';
    }

    //  If file uploaded, update paymentProof
    if (req.file) {
      const filePath = `/uploads/paymentProofs/${req.file.filename}`;
      const fullUrl = `${req.protocol}://${req.get('host')}${filePath}`;
      order.paymentProof = fullUrl;
    }

    await order.save();

    res.status(200).json({
      message: `Payment ${status === 'paid' ? 'approved' : 'rejected'} successfully.`,
      paymentProof: order.paymentProof || null
    });
  } catch (err) {
    console.error('Error in updateManualOrderStatus:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
