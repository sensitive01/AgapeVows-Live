// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure uploads directory exists
// const uploadDir = "uploads/";
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

// module.exports = upload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==========================
// Ensure uploads directory exists
// ==========================
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// ==========================
// Multer Storage configuration
// ==========================
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Unique filename: timestamp + original extension
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

// ==========================
// File Type Filter
// Allow images (jpeg, jpg, png) and videos (mp4, mov, avi)
// ==========================
const fileFilter = (req, file, cb) => {
    const allowedImageTypes = /jpeg|jpg|png/;
    const allowedVideoTypes = /mp4|mov|avi/;

    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedImageTypes.test(ext) || allowedVideoTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images (jpeg, jpg, png) and videos (mp4, mov, avi) are allowed"));
    }
};

// ==========================
// Multer upload instance
// ==========================
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50 MB max per file
    },
});

module.exports = upload;

