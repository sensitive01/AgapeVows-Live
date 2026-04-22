const Issue = require("../../model/user/issueModel");

/* =========================
   GET ALL ISSUES (ADMIN)
========================== */
const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: issues.length, // ✅ extra helpful
      data: issues,
    });
  } catch (err) {
    console.error("GET ISSUES ERROR:", err); // ✅ debug log

    res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
};

/* =========================
   UPDATE ISSUE (STATUS + REPLY)
========================== */
const updateIssue = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    // ✅ VALIDATION
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Issue ID is required",
      });
    }

    // OPTIONAL: status validation
    const validStatus = ["Pending", "In Progress", "Resolved"];

    let updateData = {};

    if (status) {
      if (!validStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status value",
        });
      }
      updateData.status = status;
    }

    if (adminReply !== undefined) {
      updateData.adminReply = adminReply;
    }

    const updated = await Issue.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: updated,
    });

  } catch (err) {
    console.error("UPDATE ISSUE ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

const deleteIssue  = async (req, res) => {
  try {
    const issue = await Issue.findByIdAndDelete(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllIssues,
  updateIssue,
  deleteIssue 
};