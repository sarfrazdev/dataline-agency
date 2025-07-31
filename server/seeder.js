import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config(); 

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

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB Connected');

    for (const admin of admins) {
      const exists = await User.findOne({ email: admin.email });
      if (exists) {
        console.log(` Admin with email ${admin.email} already exists.`);
        continue;
      }

      await User.create(admin); // Let mongoose schema handle password hashing
      console.log(`Created admin: ${admin.email}`);
    }

    process.exit();
  } catch (err) {
    console.error(' Seeder Error:', err);
    process.exit(1);
  }
};

seedAdmins();
