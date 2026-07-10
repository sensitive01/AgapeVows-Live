const forgotPasswordOtp = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <h2 style="color: #A020F0; text-align: center;">Agape Vows Matrimony</h2>
      <p>Hi,</p>
      <p>We received a request to reset the password for your Agape Vows Matrimony account. Please use the following One-Time Password (OTP) to proceed:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; background-color: #f4f4f4; padding: 10px 20px; border-radius: 5px; border: 1px dashed #A020F0;">${otp}</span>
      </div>
      <p>This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
      <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2026 Agape Vows Matrimony. All rights reserved.</p>
    </div>
  `;
};

module.exports = forgotPasswordOtp;
