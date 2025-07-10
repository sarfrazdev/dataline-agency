import Order from '../models/Order.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import shipment from '../models/shipment.js';

// End user view their own orders

// export const getEndUserOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate({
//         path: 'user',
//         select: 'name email phone role',
//         match: { role: 'enduser' }
//       })
//       .populate({
//         path: 'items.product',
//         select: 'name brand model category',
//         populate: {
//           path: 'brand',
//           select: 'name'
//         }
//       })
//       .populate({
//         path: 'shipment',
//         select: 'fullName email phone address city state pincode businessName gstNumber deliveryMethod busName busNumber contactNumber'
//       });

//     const filteredOrders = orders.filter(order => order.user !== null);

//     res.status(200).json({
//       success: true,
//       orders: filteredOrders.map(order => ({
//         _id: order._id,
//         createdAt: order.createdAt,
//         totalAmount: order.totalAmount,
//         orderStatus: order.orderStatus,
//         paymentStatus: order.paymentStatus,
//         billUrl: order.billUrl,

//         // Full Customer Info
//         customer: {
//           name: order.user.name,
//           email: order.user.email,
//           phone: order.user.phone,
//           role: order.user.role
//         },

//         // Full Shipment Info
//         shippingInfo: order.shipment,

//         // Ordered Items with Full Product Info
//         items: order.items.map(item => ({
//           quantity: item.quantity,
//           price: item.price,
//           total: item.quantity * item.price,
//           product: {
//             _id: item.product?._id || 'N/A',
//             name: item.product?.name || 'N/A',
//             brand: item.product?.brand?.name || 'N/A',
//             model: item.product?.model || 'N/A',
//             category: item.product?.category || 'N/A',
//           }
//         }))
//       }))
//     });

//   } catch (error) {
//     console.error('❌ End User Orders Fetch Error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// End user notifications
export const getEndUserNotifications = async (req, res) => {
  try {
    // Find notifications for the admin user
    const notifications = await Notification.find({ 
      sentTo: req.user._id,
      type: 'order' 
    })
    .sort({ createdAt: -1 })
    .populate({
      path: 'order',
      select: 'orderNumber totalAmount status'
    });

    res.status(200).json({ 
      success: true,
      notifications 
    });
  } catch (err) {
    console.error("End user notifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications." });
  }
};

export const createOrderNotification = async (orderId, adminId) => {
  try {
    await Notification.create({
      type: 'order',
      message: 'New order has been placed',
      sentTo: adminId,
      order: orderId,
      isRead: false
    });
  } catch (error) {
    console.error('Create notification error:', error);
  }
};

// Update own profile
export const updateEndUserProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true }
    ).select('-password');

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Update end user profile error:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
};

export const getEndUserOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: 'user',
        select: 'name email role',
        match: { role: 'enduser' }
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