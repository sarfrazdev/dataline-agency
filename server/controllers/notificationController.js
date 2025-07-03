import Notification from '../models/Notification.js';

// Create notification (admin only)
export const createNotification = async (req, res) => {
  try {
    const { title, message, sentTo } = req.body;

    if (!title || !message || !sentTo) {
      return res.status(400).json({ message: "Please provide title, message, and sentTo." });
    }

    const newNotification = new Notification({
      title,
      message,
      sentTo
    });

    const savedNotification = await newNotification.save();
    res.status(201).json({ message: "Notification created.", notification: savedNotification });
  } catch (err) {
    console.error("Create notification error:", err);
    res.status(500).json({ message: "Failed to create notification" });
  }
};


// Get all notifications (admin or public view)
export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Get notifications error:", err);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// Delete notification (admin only)
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.error("Delete notification error:", err);
    res.status(500).json({ message: "Failed to delete notification" });
  }
};