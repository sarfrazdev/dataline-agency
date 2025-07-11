import Product from '../models/Product.js';
import XLSX from 'xlsx';
import mongoose from 'mongoose';

// Create Product (Admin Only)
import path from 'path';
import fs from 'fs';
export const createProduct = async (req, res) => {
  try {
    const { name, brand, category, modelNo, stock, gst, description } = req.body;

    const prices = typeof req.body.prices === 'string'
      ? JSON.parse(req.body.prices)
      : req.body.prices;

   const quantityBasedPrices = typeof req.body.quantityBasedPrices === 'string'
  ? JSON.parse(req.body.quantityBasedPrices)
  : req.body.quantityBasedPrices;


    const files = req.files || [];

    const imagePaths = files.map(file => {
      const fullUrl = `${req.protocol}://${req.get('host')}/uploads/products/${file.filename}`;
      return fullUrl;
    });

    const newProduct = await Product.create({
      name,
      brand,
      category,
      modelNo,
      description,
      prices,
      gst,
      stock,
      images: imagePaths,
      quantityBasedPrices
    });

    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({
      message: 'Failed to create product',
      error: err.message
    });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const { brand, category } = req.query;

//     const filter = {};

//     // if (brand && brand !== 'undefined' && brand.trim() !== '') {
//     //   filter.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
//     // }

//     // if (category && category !== 'undefined' && category.trim() !== '') {
//     //   filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
//     // }
//      if (brand) {
//       filter.brand = { $regex: new RegExp(`^${brand}$`, 'i') };
//     }

//     if (category) {
//       filter.category = { $regex: new RegExp(`^${category}$`, 'i') }; 
//     }

//     const products = await Product.find(filter);

//     const productsWithUrls = products.map(product => {
//       const productObj = product.toObject();
//       const imageUrls = (productObj.images || []).map(img =>
//         img.startsWith('http')
//           ? img
//           : `${req.protocol}://${req.get('host')}/uploads/products/${img.replace(/^.*[\\/]/, '')}`
//       );
//       return { ...productObj, images: imageUrls };
//     });

//     res.status(200).json(productsWithUrls);
//   } catch (err) {
//     console.error("Get all products error:", err);
//     res.status(500).json({ message: "Failed to fetch products" });
//   }
// };

// export const getAllProducts = async (req, res) => {
//   try {
//     console.log('Incoming query parameters:', req.query);
    
//     const { brand, category, icategory } = req.query;
//     const filter = {};
    
//     // Debug: Log raw parameters
//     console.log(`Raw parameters - brand: "${brand}", category: "${category}", icategory: "${icategory}"`);

//     // Handle brand filter
//     if (brand) {
//       const cleanedBrand = brand.trim();
//       console.log(`Processing brand filter: "${cleanedBrand}"`);
//       filter.brand = { $regex: new RegExp(`^${cleanedBrand}$`, 'i') };
//     }

//     // Handle category/icategory
//     const actualCategory = category || icategory;
//     if (actualCategory) {
//       const cleanedCategory = actualCategory.trim();
//       console.log(`Processing category filter: "${cleanedCategory}"`);
//       filter.category = { $regex: new RegExp(`^${cleanedCategory}$`, 'i') };
//     }

//     console.log('Final filter object:', JSON.stringify(filter, null, 2));

//     // Execute query with timing
//     console.time('ProductQueryTime');
//     const products = await Product.find(filter);
//     console.timeEnd('ProductQueryTime');

//     console.log(`Found ${products.length} products matching filters`);

//     // Process results
//     if (products.length === 0) {
//       console.warn('No products found with current filters');
//       // Verify if products exist without filters
//       const totalProducts = await Product.countDocuments({});
//       console.log(`Total products in database: ${totalProducts}`);
//     }

//     const productsWithUrls = products.map(product => {
//       const productObj = product.toObject();
//       return {
//         ...productObj,
//         images: (productObj.images || []).map(img => 
//           img.startsWith('http') 
//             ? img 
//             : `${req.protocol}://${req.get('host')}/uploads/products/${img.replace(/^.*[\\/]/, '')}`
//         )
//       };
//     });

//     res.status(200).json(productsWithUrls);
//   } catch (err) {
//     console.error('Full error details:', {
//       message: err.message,
//       stack: err.stack,
//       query: req.query,
//       timestamp: new Date().toISOString()
//     });
    
//     res.status(500).json({ 
//       message: "Failed to fetch products",
//       debug: {
//         suggestion: "Check server logs for detailed error information",
//         receivedQuery: req.query,
//         commonIssues: [
//           "Verify brand/category values exist in database",
//           "Check MongoDB connection",
//           "Validate product schema matches query structure"
//         ]
//       }
//     });
//   }
// };
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // FIX: convert image paths to full URLs
    const productWithFullUrls = {
      ...product.toObject(),
      images: (product.images || []).map(img =>
        img.startsWith('http')
          ? img
          : `${req.protocol}://${req.get('host')}/uploads/products/${img.replace(/^.*[\\/]/, '')}`
      )
    };

    res.status(200).json(productWithFullUrls);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { brand, category } = req.query;
    const filter = {};

    // Normalize brand filter
    if (brand) {
      const normalizedBrand = brand.toString().trim().toLowerCase();
      filter.brand = normalizedBrand; // Exact match since we stored in lowercase
    }

    // Normalize category filter
    if (category) {
      const normalizedCategory = category.toString().trim().toLowerCase();
      filter.category = normalizedCategory; // Exact match
    }

    const products = await Product.find(filter);

    // Process image URLs
    const productsWithUrls = products.map(product => ({
      ...product.toObject(),
      images: (product.images || []).map(img => 
        img.startsWith('http') 
          ? img 
          : `${req.protocol}://${req.get('host')}/uploads/products/${img.replace(/^.*[\\/]/, '')}`
      )
    }));

    res.status(200).json(productsWithUrls);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ 
      message: "Failed to fetch products",
      error: err.message
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, brand, category, modelNo, stock, gst, description, images
    } = req.body;

    // Parse prices and quantityDiscounts if they are strings
    const prices = typeof req.body.prices === 'string'
      ? JSON.parse(req.body.prices)
      : req.body.prices;


const quantityBasedPrices = typeof req.body.quantityBasedPrices === 'string'
  ? JSON.parse(req.body.quantityBasedPrices)
  : req.body.quantityBasedPrices;


    // Prepare update data
    const updateData = {
      name,
      brand,
      category,
      modelNo,
      description,
      prices,
      gst,
      stock,
   quantityBasedPrices
    };

    // Handle image uploads
    const imagePaths = req.files?.map(file => 
      file.path.replace(/\\/g, '/')      
               .replace(/^.*uploads\//, '') 
    ) || [];


    if (imagePaths.length > 0) {
      updateData.images = imagePaths;
    } else if (images && Array.isArray(images)) {
     
      updateData.images = images.map(img => 
        img.replace(/\\/g, '/').replace(/^.*uploads\//, '')
      );
    }

    // Update the product
    const updated = await Product.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true } 
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Normalize the image paths in the response
    const normalizedProduct = {
      ...updated.toObject(),
      images: updated.images.map(img => {
        if (!img) return '';
        return img.replace(/\\/g, '/').replace(/^.*uploads\//, '');
      })
    };

    res.status(200).json(normalizedProduct);
  } catch (err) {
    console.error('Update product error:', err);
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete Product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};

// utils/getDynamicPrice.js
export const getDynamicPrice = (quantity, quantityBasedPrices, fallbackPrice) => {
  let finalPrice = fallbackPrice;

  quantityBasedPrices?.forEach((slab) => {
    const withinMin = quantity >= slab.minQty;
    const withinMax = !slab.maxQty || quantity <= slab.maxQty;

    if (withinMin && withinMax) {
      finalPrice = slab.price;
    }
  });

  return finalPrice;
};




export const uploadExcelProducts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const workbook = XLSX.readFile(req.file.path);
    const sheetNames = workbook.SheetNames;
    const allProducts = [];

    for (const sheetName of sheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const sheetProducts = XLSX.utils.sheet_to_json(sheet);

      allProducts.push(...sheetProducts);
    }

    const insertedProducts = [];

    for (const item of allProducts) {
      const newProduct = new Product({
        name: item.name,
        description: item.description || '',
        brand: item.brand || '',
        category: item.category || '',
        modelNo: item.modelNo || '',
        prices: {
          enduser: Number(item.enduserPrice) || 0,
          reseller: Number(item.resellerPrice) || 0,
          distributor: Number(item.distributorPrice) || 0,
        },
        gst: Number(item.gst) || 0,
        stock: Number(item.stock) || 0,
        images: item.images ? item.images.split(',').map(i => i.trim()) : [],
        quantityBasedPrices: item.quantityBasedPrices
          ? JSON.parse(item.quantityBasedPrices)
          : []
      });

      await newProduct.save();
      insertedProducts.push(newProduct);
    }

    res.status(201).json({
      message: `Uploaded ${insertedProducts.length} products from ${sheetNames.length} sheet(s)`,
      insertedCount: insertedProducts.length,
    });
  } catch (err) {
    console.error("Excel Upload Error:", err);
    res.status(500).json({ message: 'Failed to upload products from Excel', error: err.message });
  }
};

export const getBrandsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category && category !== 'undefined') {
      filter.category = category;
    }

    const brands = await Product.find(filter).distinct('brand');

    res.status(200).json({ brands });
  } catch (err) {
    console.error('getBrandsByCategory error:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
//  GET /api/products/categories?brand=HP
export const getCategoriesByBrand = async (req, res) => {
  try {
    const { brand } = req.query;

    const filter = {};
    if (brand && brand !== 'undefined') {
      filter.brand = brand;
    }

    const categories = await Product.find(filter).distinct('category');

    res.status(200).json({ categories });
  } catch (err) {
    console.error('getCategoriesByBrand error:', err.message);
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};
