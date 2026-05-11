require("dotenv").config();
const nodemailer = require("nodemailer");

const templates = {
  verifyEmail: require("./emailTemplates/emailVerification"),
  otpVerification: require("./emailTemplates/otpVerification"),
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendEmail = async (to, subject, templateName, templateParams = []) => {
  try {
    if (process.env.EMAIL_PASS === "your_app_password_here" || !process.env.EMAIL_USER) {
      console.warn("Email not sent: EMAIL_USER or EMAIL_PASS not configured in .env");
      throw new Error("Email credentials not configured");
    }

    const generateTemplate = templates[templateName];
    if (!generateTemplate) {
      throw new Error(`Email template "${templateName}" not found.`);
    }

    const html = generateTemplate(...templateParams);

    const mailOptions = {
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendEmail;
