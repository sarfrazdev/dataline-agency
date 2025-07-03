import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config(); 

const seedAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully!');

    const admins = [
      {
        name: 'Super Admin',
        email: 'superadmin@gmail.com',
        password: await bcrypt.hash('superpass', 10),
        role: 'superadmin',
      },
      {
        name: 'Reseller Admin',
        email: 'reselleradmin@gmail.com',
        password: await bcrypt.hash('resellerpass', 10),
        role: 'reseller-admin',
      },
      {
        name: 'Distributor Admin',
        email: 'distributoradmin@gmail.com',
        password: await bcrypt.hash('distributorpass', 10),
        role: 'distributor-admin',
      },
      {
        name: 'Enduser Admin',
        email: 'enduseradmin@gmail.com',
        password: await bcrypt.hash('enduserpass', 10),
        role: 'enduser-admin',
      },
    ];

    await User.insertMany(admins);
    console.log('4 admins created!');
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

seedAdmins();
