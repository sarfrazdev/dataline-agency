// delete.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // Adjust path as needed

dotenv.config();

const adminEmails = [
  'superadmin@example.com',
  'distributoradmin@example.com',
  'reselleradmin@example.com',
  'enduseradmin@example.com',
];

const deleteAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    for (const email of adminEmails) {
      const result = await User.deleteOne({ email });
      if (result.deletedCount > 0) {
        console.log(`🗑️ Deleted admin: ${email}`);
      } else {
        console.log(`⚠️ Admin not found: ${email}`);
      }
    }

    process.exit();
  } catch (err) {
    console.error('❌ Delete Error:', err);
    process.exit(1);
  }
};

deleteAdmins();
