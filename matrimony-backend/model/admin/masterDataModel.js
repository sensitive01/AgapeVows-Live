const mongoose = require("mongoose");

const masterDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["caste", "denomination"], // Expandable in the future
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate names within the same type
masterDataSchema.index({ name: 1, type: 1 }, { unique: true });

const masterDataModel = mongoose.model("MasterData", masterDataSchema);

module.exports = masterDataModel;
