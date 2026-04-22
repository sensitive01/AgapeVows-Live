// models/Plan.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Basic", "Premium", "Platinum", "Golden membership"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceType: {
      type: String,
      enum: ["₹", "$", "€"],
      default: "₹",
    },
    // NEW: Duration fields
    duration: {
      type: Number,
      required: true,
    },
    durationType: {
      type: String,
      enum: ["days", "months", "years"],
      default: "months",
      required: true,
    },
    maxProfiles: {
      type: mongoose.Schema.Types.Mixed, // Can be Number or String ("unlimited")
      required: true,
    },
    profilesType: {
      type: String,
      enum: ["Total", "Per day", "Per month", "Per Year"],
      default: "Total",
      required: true,
    },
    // NEW: Daily limit field
    dailyLimit: {
      type: String, // Can be number or "unlimited"
      required: true,
    },
    canViewProfiles: {
      type: String,
      required: true,
    },
    viewContactDetails: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    sendInterestRequest: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    startChat: {
      type: String,
      enum: ["Yes", "No"],
      required: true,
    },
    // NEW: Dedicated manager field
    dedicatedManager: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlanSchema", planSchema);
