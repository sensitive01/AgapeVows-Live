const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const userModel = require("../model/user/userModel"); // ✅ correct path
const { deleteProfileImage } = require("../controller/userController/userAuthController");

router.delete("/:userId/profileImage", deleteProfileImage);
// ======================
// Multer setup for file uploads
// ======================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../uploads", req.params.userId);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ======================
// Upload additional images
// ======================
router.post(
  "/:userId/additionalImages",
  upload.array("additionalImages", 10), // max 10 images at a time
  async (req, res) => {
    try {
      const { userId } = req.params;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ success: false, message: "No images uploaded" });
      }

      const imagePaths = files.map(
        (file) => `/uploads/${userId}/${file.filename}`
      );

      // Save to DB
      const user = await userModel.findById(userId);
      if (!user) return res.status(404).json({ success: false, message: "User not found" });

      if (!user.additionalImages) user.additionalImages = [];
      user.additionalImages.push(...imagePaths);
      await user.save();

      res.status(200).json({
        success: true,
        message: "Images uploaded successfully",
        images: imagePaths,
      });
    } catch (err) {
      console.error("Error uploading images:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  }
);

// ======================
// DELETE additional image
// ======================
router.delete("/:userId/additionalImages", async (req, res) => {
  try {
    const { userId } = req.params;
    const { imagePath } = req.body;

    if (!imagePath) {
      return res.status(400).json({ success: false, message: "Image path required" });
    }

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Remove from DB
    user.additionalImages = user.additionalImages.filter((img) => img !== imagePath);
    await user.save();

    // Remove file from local storage
    const fullPath = path.join(__dirname, "../../", imagePath);
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);

    res.status(200).json({ success: true, message: "Image removed successfully" });
  } catch (err) {
    console.error("Error deleting image:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
