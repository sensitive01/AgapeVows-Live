const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  viewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel", // ✅ FIX
    required: true
  },
  viewedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel", // ✅ FIX
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent duplicate views
viewSchema.index(
  { viewerId: 1, viewedUserId: 1 },
  { unique: true }
);

module.exports = mongoose.model("ProfileView", viewSchema);