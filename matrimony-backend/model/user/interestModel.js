const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    targetUserId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    sharedSections: {
      about: { type: Boolean, default: false },
      photoGallery: { type: Boolean, default: false },
      contactInfo: { type: Boolean, default: false },
      personalInfo: { type: Boolean, default: false },
      hobbies: { type: Boolean, default: false },
      socialMedia: { type: Boolean, default: false },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("InterestModel", interestSchema);
