const Report = require("../../model/user/reportModel");
const userModel = require("../../model/user/userModel");

const submitReport = async (req, res) => {
  try {
    const { reporterId, reportedUserId, reason, comments } = req.body;

    if (!reporterId || !reportedUserId || !reason) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newReport = new Report({
      reporterId,
      reportedUserId,
      reason,
      comments,
    });

    await newReport.save();

    // Send email notification to Admin
    const sendEmail = require("../../utils/nodeMailerMessages");
    try {
      await sendEmail(
        process.env.EMAIL_USER,
        "New User Report Received - Agape Vows",
        "formSubmission",
        ["User Report", { "Reporter ID": reporterId, "Reported User ID": reportedUserId, Reason: reason, Comments: comments }]
      );
    } catch (emailErr) {
      console.error("Failed to send report email:", emailErr);
    }

    // ✅ AUTOMATICALLY BLOCK THE REPORTED USER
    await userModel.findByIdAndUpdate(reporterId, {
      $addToSet: {
        blockedUsers: {
          user: reportedUserId,
          blockedAt: new Date()
        }
      }
    });

    res.status(201).json({
      success: true,
      message: "Report submitted successfully and user has been blocked",
    });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporterId", "userName agwid userEmail")
      .populate("reportedUserId", "userName agwid userEmail")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status } = req.body;

    if (!["Pending", "Resolved", "Ignored"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const updatedReport = await Report.findByIdAndUpdate(
      reportId,
      { status },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report status updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  submitReport,
  getAllReports,
  updateReportStatus,
};
