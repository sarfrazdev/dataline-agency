// seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; 

dotenv.config();


const admins = [
  {
    name: 'Super Admin', 
    email: 'superadmin@example.com',
    password: 'superadmin123',
    role: 'superadmin',
  },
  {
    name: 'Distributor Admin', 
    email: 'distributoradmin@example.com',
    password: 'distributor123',
    role: 'distributor-admin',
  },
  {
    name: 'Reseller Admin', 
    email: 'reselleradmin@example.com',
    password: 'reseller123',
    role: 'reseller-admin',
  },
  {
    name: 'Enduser Admin', 
    email: 'enduseradmin@example.com',
    password: 'enduser123',
    role: 'enduser-admin',
  },
];


const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('✅ Connected to MongoDB');

    for (const admin of admins) {
      const exists = await User.findOne({ email: admin.email });
      if (exists) {
        console.log(`⚠️ Admin already exists: ${admin.email}`);
        continue;
      }

      await User.create(admin);
      console.log(`✅ Admin created: ${admin.email}`);
    }

    process.exit();
  } catch (err) {
    console.error('❌ Seeder Error:', err);
    process.exit(1);
  }
};

seedAdmins();
