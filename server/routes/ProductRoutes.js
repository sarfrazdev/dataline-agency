
import express from 'express';
import Joi from 'joi';
import { validateInput } from '../middleware/validateInput.js';
import { protect, authorizeRoles } from '../middleware/auth.js';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,uploadExcelProducts,
  getBrandsByCategory,
  getCategoriesByBrand,

} from '../controllers/productController.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ensure the uploads/products folder exists
const uploadsDir = path.resolve('uploads', 'products');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/products/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  brand: Joi.string().optional(),
  category: Joi.string().optional(),
  modelNo: Joi.string().optional(),
  stock: Joi.number().required(),
  gst: Joi.number().optional(),
  prices: Joi.object({
    enduser: Joi.number().required(),
    reseller: Joi.number().required(),
    distributor: Joi.number().required()
  }).required(),
  quantityDiscounts: Joi.array().items(
    Joi.object({
      minQty: Joi.number().required(),
      maxQty: Joi.number().optional(),
      discountPercent: Joi.number().optional()
    })
  ).optional()
});

// Create Product (Admin only)
router.post('/create',
  protect,
  authorizeRoles('superadmin'),
  upload.array('images', 3),
  createProduct
);

// Get all products (public)
router.get('/', getAllProducts);

// Get product by ID (public)
router.get('/:id', getProductById);

// Update product (admin only)
router.put('/:id',
  protect,
  authorizeRoles('superadmin'),
  upload.array('images', 3),
  updateProduct
);

// Delete product (admin only)
router.delete('/:id',
  protect,
  authorizeRoles('superadmin'),
  deleteProduct
);

router.post('/upload-excel',
  protect,
  authorizeRoles('superadmin'),
  upload.single('file'), 
  uploadExcelProducts
);

router.get('/brands', getBrandsByCategory);
router.get('/categories', getCategoriesByBrand);




export default router;

