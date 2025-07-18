
import ContactComplaint from '../models/ContactComplaint.js';

export const createComplaint = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const complaint = new ContactComplaint({ name, email, subject, message });
    await complaint.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Complaint Error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
