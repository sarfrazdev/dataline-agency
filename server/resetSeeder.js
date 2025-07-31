import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config(); // Load env vars

const admins = [
  {
    name: 'Super Admin',
    email: 'superadmin@dataline.co.in',
    password: 'superadmin123',
    role: 'superadmin',
  },
  {
    name: 'Distributor Admin',
    email: 'distributoradmin@dataline.co.in',
    password: 'distributor123',
    role: 'distributor-admin',
  },
  {
    name: 'Reseller Admin',
    email: 'reselleradmin@dataline.co.in',
    password: 'reseller123',
    role: 'reseller-admin',
  },
  {
    name: 'EndUser Admin',
    email: 'enduseradmin@dataline.co.in',
    password: 'enduser123',
    role: 'enduser-admin',
  },
];

const resetAndSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ DB Connected');

    // Delete all users
    await User.deleteMany({});
    console.log('🗑️ All users deleted');

    // Insert fresh admin users
    await User.insertMany(admins);
    console.log('✅ Admin users inserted');

    process.exit();
  } catch (err) {
    console.error('❌ Seeder Error:', err);
    process.exit(1);
  }
};

resetAndSeed();
