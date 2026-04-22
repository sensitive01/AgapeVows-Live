const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    userId: String,
    userName: String,
    userEmail: String,
    userMobile: String,
    agwid: String,
    details: String,
    attachment: String,

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    adminReply: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);