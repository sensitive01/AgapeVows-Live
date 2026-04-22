const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  state: { type: String },      // New Field
  contact: { type: String },    // New Field
  email: { type: String },      // New Field
  mapLink: { type: String },    // New Field
  description: { type: String },
  details: { type: String },    // New Field (Additional Details)
  image: { type: String },      // Stores Cloudinary URL
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  isPinned: { type: Boolean, default: false }, // New Field
  createdAt: { type: Date, default: Date.now },
  churchName: { type: String, required: true },
});

module.exports = mongoose.model("Event", eventSchema);