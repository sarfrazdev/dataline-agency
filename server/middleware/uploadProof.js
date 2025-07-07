import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload folder exists
const proofDir = path.join(process.cwd(), 'uploads', 'paymentProofs');
if (!fs.existsSync(proofDir)) {
  fs.mkdirSync(proofDir, { recursive: true });
  console.log('✅ Created folder: uploads/paymentProofs');
}

// Storage engine
const proofStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, proofDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

// File filter: only accept jpg, png, pdf
const proofFileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, WEBP, GIF and PDF files are allowed!'), false);
  }
};

// Export multer instance
export const uploadProof = multer({
  storage: proofStorage,
  fileFilter: proofFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
