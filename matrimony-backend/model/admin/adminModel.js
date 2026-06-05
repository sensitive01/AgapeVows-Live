// models/adminModel.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    adminEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    adminPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['superadmin', 'subadmin'],
      default: 'superadmin'
    },
    permissions: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
