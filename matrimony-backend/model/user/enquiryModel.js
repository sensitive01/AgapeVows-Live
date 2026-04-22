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
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);