

//  Required Imports
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import validator from "validator";
import sendEmail from "../utils/sendEmail.js";
import { generateId } from "../utils/generateID.js";
import { ROLES } from "../config/constants.js";

//  JWT Token Helper
const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: '60d',
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
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail({ to: user.email, subject: "Password Reset Request", text: `Click the link: ${resetLink}` });

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (err) {
    res.status(500).json({ message: "Server error during password reset." });
  }
};

//  Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Password reset failed" });
  }
};

//  Find Unique ID
export const findId = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: `Your ${user.role} ID is: ${user.uniqueId}`
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to find ID" });
  }
};
