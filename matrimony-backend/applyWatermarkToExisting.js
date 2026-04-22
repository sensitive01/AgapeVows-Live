require("dotenv").config();
const dbConnect = require("./config/database/dbConnect");
const userModel = require("./models/userModel/userAuthModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Using the same config we added to your controller
const AGAPE_WATERMARK_CONFIG = [
  {
    overlay: {
      font_family: "Arial",
      font_size: 80,
      font_weight: "bold",
      text: "AgapeVows",
      stroke: "stroke"
    },
    color: "#ffffff",
    border: "5px_solid_black"
  },
  {
    flags: "layer_apply",
    gravity: "south_east",
    opacity: 65,
    x: 20,
    y: 20
  }
];

async function updateAllExistingImages() {
  await dbConnect();
  console.log("Connected to Database...");

  const users = await userModel.find({
    $or: [
      { profileImage: { $ne: "" } },
      { additionalImages: { $ne: [] } }
    ]
  });

  console.log(`Found ${users.length} users with images. Starting update...`);
  let updatedCount = 0;

  for (const user of users) {
    let changed = false;
    let newProfileImage = user.profileImage;
    let newAdditionalImages = [...(user.additionalImages || [])];

    // Helper to process Cloudinary URLs
    const processImage = async (imgUrl) => {
      if (!imgUrl || !imgUrl.includes("res.cloudinary.com")) return imgUrl;

      // Extract Public ID
      let publicId = null;
      const cloudinaryRegex = /https?:\/\/res\.cloudinary\.com\/[^/]+\/(?:image|raw|upload)\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+$/;
      const match = imgUrl.match(cloudinaryRegex);
      if (match && match[1]) publicId = match[1];
      else {
        const idx = imgUrl.indexOf("/upload/");
        if (idx !== -1) publicId = imgUrl.substring(idx + "/upload/".length).replace(/^v\d+\//, "").replace(/\.[^/.]+$/, "");
      }

      if (publicId) {
        try {
          console.log(`Processing: ${publicId}`);
          // ⚠️ This re-uploads the image and burns the new watermark into it
          const res = await cloudinary.uploader.upload(imgUrl, {
            public_id: publicId,
            overwrite: true,
            invalidate: true,
            transformation: AGAPE_WATERMARK_CONFIG
          });
          return res.secure_url;
        } catch (e) {
          console.error(`Failed to update ${publicId}:`, e.message);
          return imgUrl;
        }
      }
      return imgUrl;
    };

    // 1. Process Profile Image
    if (user.profileImage) {
      const newUrl = await processImage(user.profileImage);
      if (newUrl !== user.profileImage) {
        newProfileImage = newUrl;
        changed = true;
      }
    }

    // 2. Process Additional Images
    if (user.additionalImages && user.additionalImages.length > 0) {
      for (let i = 0; i < user.additionalImages.length; i++) {
        const newUrl = await processImage(user.additionalImages[i]);
        if (newUrl !== user.additionalImages[i]) {
          newAdditionalImages[i] = newUrl;
          changed = true;
        }
      }
    }

    // 3. Save to Database
    if (changed) {
      await userModel.updateOne(
        { _id: user._id },
        { profileImage: newProfileImage, additionalImages: newAdditionalImages }
      );
      updatedCount++;
      console.log(`✅ Updated User: ${user.userName} (${user._id})`);
    }
  }

  console.log(`🎉 Finished! Successfully updated images for ${updatedCount} users.`);
  process.exit(0);
}

updateAllExistingImages();
