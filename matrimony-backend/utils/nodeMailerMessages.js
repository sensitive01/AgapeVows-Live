require("dotenv").config();
const nodemailer = require("nodemailer");

const templates = {
  verifyEmail: require("./emailTemplates/emailVerification"),
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
