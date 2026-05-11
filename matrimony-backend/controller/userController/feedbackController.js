const Feedback = require("../../model/user/feedbackModel");

// Post feedback by user
exports.postFeedback = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields (name, email, message)",
      });
    }

    const newFeedback = new Feedback({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newFeedback.save();

    // Send email notification to Admin
    const sendEmail = require("../../utils/nodeMailerMessages");
    try {
      await sendEmail(
        process.env.EMAIL_USER,
        "New Feedback Received - Agape Vows",
        "formSubmission",
        ["Feedback", { Name: name, Email: email, Phone: phone, Subject: subject, Message: message }]
      );
    } catch (emailErr) {
      console.error("Failed to send feedback email:", emailErr);
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: " + error.message,
    });
  }
};
