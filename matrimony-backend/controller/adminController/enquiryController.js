const Enquiry = require("../../model/user/enquiryModel");

/* =========================
   GET ALL ENQUIRIES
========================== */
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    });

  } catch (err) {
    console.error("GET ENQUIRIES ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
    });
  }
};

/* =========================
   DELETE ENQUIRY
========================== */
const deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });

  } catch (err) {
    console.error("DELETE ENQUIRY ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry",
    });
  }
};

module.exports = {
  getAllEnquiries,
  deleteEnquiry
};