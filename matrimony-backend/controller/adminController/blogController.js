const Blog = require("../../model/admin/blogModel");
const cloudinary = require("../../utils/cloudinaryConfig");
const fs = require("fs");

// ================= GET ALL =================
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= ADD BLOG =================
exports.addNewBlog = async (req, res) => {
  try {
    const { title, category, content, authorName, authorRole, status } =
      req.body;

    let coverImageUrl = "";
    let authorPhotoUrl = "";

    // Cover Image Upload
    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(
        req.files.coverImage[0].path,
        { folder: "blogs/cover" }
      );
      coverImageUrl = result.secure_url;
      fs.unlinkSync(req.files.coverImage[0].path);
    }

    // Author Photo Upload
    if (req.files?.authorPhoto) {
      const result = await cloudinary.uploader.upload(
        req.files.authorPhoto[0].path,
        { folder: "blogs/authors" }
      );
      authorPhotoUrl = result.secure_url;
      fs.unlinkSync(req.files.authorPhoto[0].path);
    }

    const newBlog = new Blog({
      title,
      category,
      content,
      authorName,
      authorRole,
      coverImage: coverImageUrl,
      authorPhoto: authorPhotoUrl,
      status,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= EDIT BLOG =================
exports.editBlog = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    if (req.files?.coverImage) {
      const result = await cloudinary.uploader.upload(
        req.files.coverImage[0].path,
        { folder: "blogs/cover" }
      );
      updateData.coverImage = result.secure_url;
      fs.unlinkSync(req.files.coverImage[0].path);
    }

    if (req.files?.authorPhoto) {
      const result = await cloudinary.uploader.upload(
        req.files.authorPhoto[0].path,
        { folder: "blogs/authors" }
      );
      updateData.authorPhoto = result.secure_url;
      fs.unlinkSync(req.files.authorPhoto[0].path);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updatedBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE =================
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};