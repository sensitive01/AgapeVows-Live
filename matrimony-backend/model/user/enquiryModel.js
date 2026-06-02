const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: String,
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Closed"],
    default: "New",
  },
  replyMessage: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);