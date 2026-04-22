const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { _id: false } // Optional: Don't auto-create _id for each message
);

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
        required: true,
      },
    ],
    messages: [messageSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatModel", chatSchema);
