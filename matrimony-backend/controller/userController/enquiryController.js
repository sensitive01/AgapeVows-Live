const Enquiry = require("../../model/user/enquiryModel");

/* =========================
   CREATE ENQUIRY (USER)
========================== */
const createEnquiry = async (req, res) => {
  try {
    console.log("📥 Incoming Enquiry:", req.body);

    const { name, phone, email, message } = req.body;

    // ✅ Validation
    if (!name || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, Phone and Message are required",
      });
    }

    const newEnquiry = new Enquiry({
      name,
      phone,
      email,
      message,
    });

    await newEnquiry.save();

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
    });

  } catch (error) {
    console.error("❌ createEnquiry error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};

module.exports = { createEnquiry };