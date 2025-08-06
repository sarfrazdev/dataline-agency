import multer from "multer";
import path from "path";

// PDF upload configuration
const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const pdfFilter = (req, file, cb) => { 
    // Simply return true/false without error
    cb(null, file.mimetype === 'application/pdf');
}

export const uploadPdf = multer({
    storage: pdfStorage,
    fileFilter: pdfFilter,
    limits: {
        fileSize: 10* 1024 * 1024 
    }
});