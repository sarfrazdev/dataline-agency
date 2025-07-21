

//  Required Imports
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import validator from "validator";
import transporter from "../config/emailConfig.js"; 
import { generateId } from "../utils/generateID.js";
import { ROLES } from "../config/constants.js";

//  JWT Token Helper
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '364d',
  });
};

//  Login - End User or Reseller/Distributor
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password'); // Ensure password is included for comparison
    if (!user) return res.status(401).json({ message: "Invalid credentials (email not found)" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials (wrong password)" });

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed." });
  }
};

//  Register - End User
export const registerEndUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role: ROLES.ENDUSER });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: 'End user registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};


//  Register - Reseller
export const registerReseller = async (req, res) => {
  try {
    console.log("Incoming Reseller Registration Data:", req.body);

    const {
      name, email, password, firmName, constitutionOfFirm, gstNumber,
      panNumber, officeAddress, residenceAddress, mobile
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log("User already exists with email:", email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const uniqueId = await generateId('reseller');
    console.log("Generated Reseller ID:", uniqueId);

    const user = await User.create({
      name,
      email,
      password,
      role: ROLES.RESELLER,
      firmName,
      constitutionOfFirm,
      gstNumber,
      panNumber,
      officeAddress,
      residenceAddress,
      mobile,
      uniqueId,
    });

    const token = generateToken(user._id, user.role);
    console.log("Token generated:", token);

    res.status(201).json({
      message: 'Reseller registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        uniqueId: user.uniqueId,
      },
    });
  } catch (error) {
    console.error(" Registration Error:", error.message);
    res.status(500).json({ message: 'Reseller registration failed', error: error.message });
  }
};



//  Register - Distributor
export const registerDistributor = async (req, res) => {
  try {
    const {
      name, email, password, firmName, constitutionOfFirm, gstNumber,
      panNumber, officeAddress, residenceAddress, mobile
    } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: 'User already exists' });

    const uniqueId =await generateId('distributor');

    const user = await User.create({
      name,
      email,
      password,
      role: ROLES.DISTRIBUTOR,
      firmName,
      constitutionOfFirm,
      gstNumber,
      panNumber,
      officeAddress,
      residenceAddress,
      mobile,
      uniqueId,
    });

    const token = generateToken(user._id, user.role);
    res.status(201).json({
      message: 'Distributor registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        uniqueId: user.uniqueId,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Distributor registration failed', error: error.message });
  }
};


//  Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password'); // Ensure password is included for comparison
       console.log("REQ BODY:", req.body); 
    if (!user) return res.status(404).json({ message: 'Admin not found' });

    const allowedRoles = [
      ROLES.SUPERADMIN,
      ROLES.RESELLER_ADMIN,
      ROLES.DISTRIBUTOR_ADMIN,
      ROLES.ENDUSER_ADMIN
    ];

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Access denied: Not an admin' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, user.role);
    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

//  Get Current User
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to load profile' });
  }
};

//  Forgot Password

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.json({ success: false, message: "Email is required" });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
  
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; 
        await user.save();
      
        const mailOption = {
            from: process.env.SENDER_EMAIL, 
            to: user.email,
            subject: "Password Reset OTP",
            text: `Your OTP is ${otp}. It expires in 15 minutes.`
        };

        console.log("Sending email with options:", mailOption);
        console.log("SMTP Config:", {
            host: "smtp-relay.brevo.com",
            port: 587,
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD ? "[REDACTED]" : "undefined"
        });

        await transporter.sendMail(mailOption);
      

        return res.json({ success: true, message: "Reset password OTP sent to your email" });
    } catch (error) {
        console.error("Error in sendResetOtp:", error);
        return res.json({ success: false, message: "Failed to send OTP", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, message: "Email and new password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

 
    user.password = newPassword;  
    await user.save();          

    return res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const user = await User.findOne({
      email,
      resetOtp: otp.toString().trim(),
      resetOtpExpireAt: { $gt: Date.now() }, // optional: OTP is not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error in verifyOtp:", error);
    return res.status(500).json({ message: "OTP verification failed", error: error.message });
  }
};
