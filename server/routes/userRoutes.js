import express from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect, authorizeRoles } from '../middleware/auth.js';

const router = express.Router();

//  All routes for admin only
router.use(protect, authorizeRoles('admin'));

//  Get all users
router.get('/', getAllUsers);

//  Get single user by ID
router.get('/:id', getUserById);

//  Update user by ID
router.put('/:id', updateUser);

//  Delete user by ID
router.delete('/:id', deleteUser);

export default router;