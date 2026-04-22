const emailVerification = (name, verifyUrl) => {
  return `
    <p>Hi ${name},</p>
    <p>Thank you for signing up. Please verify your email by clicking the button below:</p>
    <a href="${verifyUrl}" style="padding:10px 15px;background:#007BFF;color:white;text-decoration:none;border-radius:5px;">Verify Email</a>
    <p>If you didn’t request this, please ignore this email.</p>
  `;
};

module.exports = emailVerification;
