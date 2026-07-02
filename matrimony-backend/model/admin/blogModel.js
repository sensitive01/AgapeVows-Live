const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    sections: [
      {
        heading: { type: String, required: true },
        content: { type: String, required: true },
        image: { type: String }, // Optional image
      }
    ],

    content: { type: String }, // For legacy blogs


    authorName: { type: String, required: true },

    authorRole: { type: String, required: true },

    coverImage: { type: String, required: true },

    authorPhoto: { type: String, required: true },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);