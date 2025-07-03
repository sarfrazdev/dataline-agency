import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const deleteAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ MongoDB connected');

    const result = await User.deleteMany({
      email: {
        $in: [
          'superadmin@gmail.com',
          'reselleradmin@gmail.com',
          'distributoradmin@gmail.com',
          'enduseradmin@gmail.com',
        ],
      },
    });

    console.log(`🗑️ Deleted ${result.deletedCount} admin(s)`);
    process.exit();
  } catch (err) {
    console.error(' Error deleting admins:', err.message);
    process.exit(1);
  }
};

deleteAdmins();
