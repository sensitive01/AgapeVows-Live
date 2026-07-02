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
    const { title, category, authorName, authorRole, status, sections } = req.body;

    let coverImageUrl = "";
    let authorPhotoUrl = "";
    let parsedSections = [];

    if (sections) {
      parsedSections = JSON.parse(sections);
    }

    const coverImageFile = req.files?.find(f => f.fieldname === 'coverImage');
    const authorPhotoFile = req.files?.find(f => f.fieldname === 'authorPhoto');

    // Cover Image Upload
    if (coverImageFile) {
      const result = await cloudinary.uploader.upload(
        coverImageFile.path,
        { folder: "blogs/cover" }
      );
      coverImageUrl = result.secure_url;
      fs.unlinkSync(coverImageFile.path);
    }

    // Author Photo Upload
    if (authorPhotoFile) {
      const result = await cloudinary.uploader.upload(
        authorPhotoFile.path,
        { folder: "blogs/authors" }
      );
      authorPhotoUrl = result.secure_url;
      fs.unlinkSync(authorPhotoFile.path);
    }

    // Process section images
    for (let i = 0; i < parsedSections.length; i++) {
      const sectionImageFile = req.files?.find(f => f.fieldname === `sectionImage_${i}`);
      if (sectionImageFile) {
        const result = await cloudinary.uploader.upload(
          sectionImageFile.path,
          { folder: "blogs/sections" }
        );
        parsedSections[i].image = result.secure_url;
        fs.unlinkSync(sectionImageFile.path);
      }
    }

    const newBlog = new Blog({
      title,
      category,
      sections: parsedSections,
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

    if (updateData.sections) {
      updateData.sections = JSON.parse(updateData.sections);
    }

    const coverImageFile = req.files?.find(f => f.fieldname === 'coverImage');
    const authorPhotoFile = req.files?.find(f => f.fieldname === 'authorPhoto');

    if (coverImageFile) {
      const result = await cloudinary.uploader.upload(
        coverImageFile.path,
        { folder: "blogs/cover" }
      );
      updateData.coverImage = result.secure_url;
      fs.unlinkSync(coverImageFile.path);
    }

    if (authorPhotoFile) {
      const result = await cloudinary.uploader.upload(
        authorPhotoFile.path,
        { folder: "blogs/authors" }
      );
      updateData.authorPhoto = result.secure_url;
      fs.unlinkSync(authorPhotoFile.path);
    }

    if (updateData.sections) {
      for (let i = 0; i < updateData.sections.length; i++) {
        const sectionImageFile = req.files?.find(f => f.fieldname === `sectionImage_${i}`);
        if (sectionImageFile) {
          const result = await cloudinary.uploader.upload(
            sectionImageFile.path,
            { folder: "blogs/sections" }
          );
          updateData.sections[i].image = result.secure_url;
          fs.unlinkSync(sectionImageFile.path);
        }
      }
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