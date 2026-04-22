// models/Payment.js
// const mongoose = require("mongoose");

// const paymentSchema = new mongoose.Schema(
//   {
//     orderId: { type: String },
//     razorpayPaymentId: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     planId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Plan",
//       required: true,
//     },
//     planName: {
//       type: String,
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "INR",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["success", "failed"],
//       required: true,
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["razorpay", "wallet", "cash"],
//       required: true,
//     },
//     timestamp: {
//       type: Date,
//       default: Date.now,
//     },
//     status:{type:String,default:"Active"},
//     planDetails: {
//       name: String,
//       price: Number,
//       priceType: String,
//       maxProfiles: Number,
//       profilesType: String,
//       canViewProfiles: String,
//       viewContactDetails: String,
//       sendInterestRequest: String,
//       startChat: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("planPayment", paymentSchema);

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    // 🔥 ORDER ID (IMPORTANT)
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    razorpayPaymentId: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    planName: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    paymentStatus: {
      type: String,
      enum: ["success", "failed"],
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["razorpay", "wallet", "cash"],
      required: true,
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      default: "Active",
    },

    // ✅ PLAN DETAILS
    planDetails: {
      name: String,
      price: Number,
      duration: Number,
      durationType: String,
      maxProfiles: Number,
      profilesType: String,
      dailyLimit: String,
      canViewProfiles: String,
      viewContactDetails: String,
      sendInterestRequest: String,
      startChat: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("planPayment", paymentSchema);