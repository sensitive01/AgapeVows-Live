const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendEmail = require("../../utils/nodeMailerMessages");
const admin = require("../../utils/firebaseAdmin");
const { getAuth } = require("firebase-admin/auth");

const userModel = require("../../model/user/userModel");
const planModel = require("../../model/admin/planModel");
const paymentModel = require("../../model/user/planBookings");
const jwt = require("jsonwebtoken");

const generateAgwid = async () => {
  try {
    let isUnique = false;
    let agwid = "";
    let attempts = 0;

    while (!isUnique && attempts < 20) {
      attempts++;

      // Always 6 digits
      const randomNumber = Math.floor(Math.random() * 1000000);
      const paddedNumber = randomNumber.toString().padStart(6, "0");

      agwid = `AV${paddedNumber}`;

      const existingUser = await userModel.findOne({ agwid });
      if (!existingUser) {
        isUnique = true;
      }
    }

    if (!isUnique) {
      throw new Error("Failed to generate unique AGW ID");
    }

    return agwid;
  } catch (error) {
    console.error("Error generating AGW ID:", error);
    throw error;
  }
};



const maskEmail = (email) => {
  if (!email) return "";
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const name = parts[0];
  const domain = parts[1];
  if (name.length <= 2) return `${name[0]}***@${domain}`;
  return `${name.slice(0, 2)}***${name.slice(-1)}@${domain}`;
};

const maskPhone = (phone) => {
  if (!phone) return "";
  if (phone.length <= 4) return phone;
  // Assumes format like 919876543210
  return `+${phone.slice(0, 2)} ${phone.slice(2, 4)}*****${phone.slice(-2)}`;
};

const saveSignUpData = async (req, res) => {
  try {
    const { formData } = req.body;

    const { name, email, phone, password, agree } = formData;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
        userName: existingUser.userName,
        connectedContact: maskPhone(existingUser.userMobile)
      });
    }

    const existingPhone = await userModel.findOne({ userMobile: phone });
    if (existingPhone) {
      return res.status(409).json({
        message: "Phone number already registered",
        userName: existingPhone.userName,
        connectedContact: maskEmail(existingPhone.userEmail)
      });
    }

    // Check if mobile is verified
    const isMobileVerified = req.app.locals[`verified_${phone}`];

    if (!isMobileVerified) {
      return res.status(403).json({ message: "Please verify your mobile number first" });
    }

    // Clear verification flag after use
    delete req.app.locals[`verified_${phone}`];

    const hashedPassword = await bcrypt.hash(password, 10);

    let agwid = await generateAgwid();

    // Simple retry mechanism for race conditions check
    const existingAgwid = await userModel.findOne({ agwid });
    if (existingAgwid) {
      agwid = await generateAgwid();
    }

    const newUser = new userModel({
      userName: name,
      userEmail: email,
      userMobile: phone,
      userPassword: hashedPassword,
      isTermsAggreed: agree,
      agwid: agwid,
    });

    await newUser.save();

    let assignedWelcomePlan = null;
    // Check for active Welcome plan (Disabled automatic application per new requirement)
    /*
    try {
      const welcomePlan = await planModel.findOne({ name: "Welcome plan", status: "Active" });
      if (welcomePlan) {
        assignedWelcomePlan = welcomePlan;
        // Auto-assign welcome plan
        const orderId = `AV${Math.floor(100000 + Math.random() * 900000)}`;
        const payment = new paymentModel({
          userId: newUser._id,
          razorpayPaymentId: "free_welcome",
          orderId: orderId,
          planId: welcomePlan._id,
          planName: welcomePlan.name,
          amount: 0,
          paymentStatus: "success",
          paymentMethod: "free",
          planDetails: {
            name: welcomePlan.name,
            price: welcomePlan.price,
            duration: welcomePlan.duration,
            durationType: welcomePlan.durationType,
            maxProfiles: welcomePlan.maxProfiles,
            profilesType: welcomePlan.profilesType,
            dailyLimit: welcomePlan.dailyLimit,
            canViewProfiles: welcomePlan.canViewProfiles,
            maxSendInterest: welcomePlan.maxSendInterest,
            dailyLimitSendInterest: welcomePlan.dailyLimitSendInterest,
            maxViewContact: welcomePlan.maxViewContact,
            dailyLimitViewContact: welcomePlan.dailyLimitViewContact,
          }
        });
        await payment.save();

        const validFrom = new Date();
        let validTo = new Date(validFrom);
        if (welcomePlan.durationType?.toLowerCase() === "days") {
          validTo.setDate(validTo.getDate() + parseInt(welcomePlan.duration));
        } else if (welcomePlan.durationType?.toLowerCase() === "months") {
          validTo.setMonth(validTo.getMonth() + parseInt(welcomePlan.duration));
        } else if (welcomePlan.durationType?.toLowerCase() === "years") {
          validTo.setFullYear(validTo.getFullYear() + parseInt(welcomePlan.duration));
        }
        newUser.paymentDetails.push({
          subscriptionValidFrom: validFrom,
          subscriptionValidTo: validTo,
          subscriptionType: welcomePlan.name,
          subscriptionStatus: "Active",
          subscriptionOrderId: "WELCOME_PLAN_ORDER",
          subscriptionTransactionId: "WELCOME_PLAN_TXN",
          canViewProfiles: welcomePlan.canViewProfiles || "All Profiles",
          viewContactDetails: welcomePlan.viewContactDetails || "No",
          sendInterestRequest: welcomePlan.sendInterestRequest || "No",
          maxProfiles: welcomePlan.maxProfiles || 0,
          dailyLimit: welcomePlan.dailyLimit || 0,
          maxSendInterest: welcomePlan.maxSendInterest || "0",
          dailyLimitSendInterest: welcomePlan.dailyLimitSendInterest || "0",
          maxViewContact: welcomePlan.maxViewContact || "0",
          dailyLimitViewContact: welcomePlan.dailyLimitViewContact || "0"
        });
        newUser.isAnySubscriptionTaken = true;
        await newUser.save();
      }
    } catch (planErr) {
      console.error("Error assigning welcome plan:", planErr);
    }
    */

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET || 'agape_vows_secret_key_2026',
      { expiresIn: '21d' }
    );

    try {
      const smsPayload = {
        "sender_id": "AGVOWS",
        "template_id": "1777178453882115102", // DLT template ID
        "priority": 0,
        "dcs": 0,
        "messages": [
          {
            "mobile": phone,
            "message": "Welcome to AgapeVows! Your account has been successfully created.\n\nPlease complete your profile and upload your recent photographs at https://agapevows.com to receive your matching profiles.\n\nNeed help? Write to us at support@agapevows.com or WhatsApp at +91 96637 96699. Best wishes from AgapeVows team.",
            "transaction_id": `TXN-${Date.now()}`
          }
        ]
      };

      const smsResponse = await fetch('https://portal.weformsolution.com/sms/api/send-campaign', {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.SMS_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(smsPayload)
      });
      const smsResponseText = await smsResponse.text();
      console.log(`Registration Confirmation SMS API Response: [${smsResponse.status}]`, smsResponseText);
    } catch (smsError) {
      console.error("Failed to send Registration Confirmation SMS:", smsError);
    }

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser._id,
      userName: newUser.userName,
      gender: newUser.gender,
      isProfileCompleted: newUser.isProfileCompleted,
      welcomePlan: assignedWelcomePlan
    });
  } catch (err) {
    console.error("Error in saving the signup data", err);
    res.status(500).json({ message: err.message || "Error in saving the signup data" });
  }
};

const verifyLogin = async (req, res) => {
  try {
    const formData = req.body.formData || {};
    const { email, password, rememberMe } = formData;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Try matching exactly, or adjusting for common India country code issue
    let phoneQueryWith91 = email;
    let phoneQueryWithout91 = email;
    if (/^\d{10}$/.test(email)) {
      phoneQueryWith91 = `91${email}`;
    } else if (/^91\d{10}$/.test(email)) {
      phoneQueryWithout91 = email.substring(2);
    }

    const user = await userModel.findOne({
      $or: [
        { userEmail: email },
        { userMobile: email },
        { userMobile: phoneQueryWith91 },
        { userMobile: phoneQueryWithout91 }
      ],
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.isDeleted) {
      return res.status(403).json({ message: "This account has been deleted. Please contact admin" });
    }

    if (user.profileStatus === "Deactivated") {
      return res.status(403).json({ message: "Account is deactivated. Contact admin to reactivate." });
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await userModel.updateOne({ _id: user._id }, { $set: { lastLogin: new Date() } });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'agape_vows_secret_key_2026', { expiresIn: '21d' });

    return res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      rememberMe,
      userName: user.userName,
      profileImage: user.profileImage,
      gender: user.gender,
      isProfileCompleted: user.isProfileCompleted
    });
  } catch (err) {
    console.error("Error in verifying login", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userForgotPassword = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: "Email or Phone is required" });
    }

    let phoneQueryWith91 = emailOrPhone;
    let phoneQueryWithout91 = emailOrPhone;
    if (/^\d{10}$/.test(emailOrPhone)) {
      phoneQueryWith91 = `91${emailOrPhone}`;
    } else if (/^91\d{10}$/.test(emailOrPhone)) {
      phoneQueryWithout91 = emailOrPhone.substring(2);
    }

    const user = await userModel.findOne({
      $or: [
        { userEmail: emailOrPhone },
        { userMobile: emailOrPhone },
        { userMobile: phoneQueryWith91 },
        { userMobile: phoneQueryWithout91 }
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    const key = `otp_${user._id}`;
    req.app.locals[key] = {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000,
    };

    if (emailOrPhone.includes('@')) {
      try {
        await sendEmail(emailOrPhone, "Password Reset OTP - Agape Vows Matrimony", "forgotPasswordOtp", [otp]);
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully to your email",
          userId: user._id
        });
      } catch (emailError) {
        console.error("Failed to send forgot password email:", emailError);
        return res.status(200).json({
          success: true,
          message: "OTP generated (Email failed to send, please check console)",
          userId: user._id,
          otp: otp
        });
      }
    } else {
      try {
        const smsPayload = {
          "sender_id": "AGVOWS",
          "template_id": "1707178329955243008", // Reusing the welcome/verification template for now as requested
          "priority": 0,
          "dcs": 0,
          "messages": [
            {
              "mobile": emailOrPhone,
              "message": `Welcome to AgapeVows! Your verification code is ${otp}. It expires in 10 minutes. Do not share this OTP with anyone. - AGVOWS`,
              "transaction_id": `TXN-${Date.now()}`
            }
          ]
        };

        const smsResponse = await fetch('https://portal.weformsolution.com/sms/api/send-campaign', {
          method: 'POST',
          headers: {
            'X-API-Key': process.env.SMS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(smsPayload)
        });

        const smsResponseText = await smsResponse.text();
        console.log(`WeForm SMS API Response: [${smsResponse.status}]`, smsResponseText);

        if (!smsResponse.ok || smsResponseText.includes('"success":false')) {
          throw new Error(`SMS API Failed: ${smsResponseText}`);
        }

        console.log(`OTP SMS sent to ${emailOrPhone}`);
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully to your mobile",
          userId: user._id
        });
      } catch (smsError) {
        console.error("Failed to send SMS OTP:", smsError);
        return res.status(500).json({ success: false, message: "Failed to send SMS. Please check your SMS API key or provider status." });
      }
    }
  } catch (err) {
    console.error("Error in verify user in forgot password", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const userVerifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "Missing userId or OTP" });
    }

    const key = `otp_${userId}`;
    const storedOtpData = req.app.locals[key];

    if (!storedOtpData) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      delete req.app.locals[key];
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    if (parseInt(otp) !== storedOtpData.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    delete req.app.locals[key];

    return res.status(200).json({ success: true, message: "OTP verified successfully", userId: userId });

  } catch (err) {
    console.error("Error in verify OTP", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const saveNewPassword = async (req, res) => {
  try {
    const { userId } = req.params;
    const { newPassword } = req.body;

    if (!userId || !newPassword) {
      return res.status(400).json({ success: false, message: "Missing userId or new password" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { userPassword: hashedPassword },
      { new: true, runValidators: false }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, message: "Password updated successfully", userId });

  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const sendRegistrationOtp = async (req, res) => {
  try {
    const { type, email, phone } = req.body;

    if (!type || (type === 'email' && !email) || (type === 'mobile' && !phone)) {
      return res.status(400).json({ success: false, message: "Invalid request. Missing email or phone for the requested type." });
    }

    if (type === 'email') {
      const existingUser = await userModel.findOne({ userEmail: email });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists with this email",
          userName: existingUser.userName,
          connectedContact: maskPhone(existingUser.userMobile)
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      req.app.locals[`reg_otp_email_${email}`] = {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };

      try {
        await sendEmail(email, "Verify your email - Agape Vows Matrimony", "otpVerification", [otp]);
        return res.status(200).json({ success: true, message: "OTP sent successfully to your email" });
      } catch (emailError) {
        console.error("Failed to send registration email:", emailError);
        return res.status(200).json({ success: true, message: "OTP generated (Email failed to send, please check console)", devOtp: otp });
      }

    } else if (type === 'mobile') {
      const existingPhone = await userModel.findOne({ userMobile: phone });
      if (existingPhone) {
        return res.status(409).json({
          success: false,
          message: "Phone number already registered",
          userName: existingPhone.userName,
          connectedContact: maskEmail(existingPhone.userEmail)
        });
      }

      const otp = Math.floor(100000 + Math.random() * 900000);
      req.app.locals[`reg_otp_mobile_${phone}`] = {
        otp,
        expiresAt: Date.now() + 10 * 60 * 1000,
      };

      try {
        const smsPayload = {
          "sender_id": "AGVOWS",
          "template_id": "1707178329955243008",
          "priority": 0,
          "dcs": 0,
          "messages": [
            {
              "mobile": phone,
              "message": `Welcome to AgapeVows! Your verification code is ${otp}. It expires in 10 minutes. Do not share this OTP with anyone. - AGVOWS`,
              "transaction_id": `TXN-${Date.now()}`
            }
          ]
        };

        const smsResponse = await fetch('https://portal.weformsolution.com/sms/api/send-campaign', {
          method: 'POST',
          headers: {
            'X-API-Key': process.env.SMS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(smsPayload)
        });

        const smsResponseText = await smsResponse.text();
        console.log(`WeForm SMS API Response: [${smsResponse.status}]`, smsResponseText);

        if (!smsResponse.ok || smsResponseText.includes('"success":false')) {
          throw new Error(`SMS API Failed: ${smsResponseText}`);
        }

        console.log(`OTP SMS sent to ${phone}`);
        return res.status(200).json({ success: true, message: "OTP sent successfully to your mobile" });
      } catch (smsError) {
        console.error("Failed to send SMS OTP:", smsError);
        return res.status(500).json({ success: false, message: "Failed to send SMS. Please check your SMS API key or provider status." });
      }
    } else {
      return res.status(400).json({ success: false, message: "Invalid type specified" });
    }
  } catch (err) {
    console.error("Error in sendRegistrationOtp", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyRegistrationOtp = async (req, res) => {
  try {
    const { type, email, phone, otp } = req.body;

    if (!type || !otp) {
      return res.status(400).json({ success: false, message: "Type and OTP are required" });
    }

    let key = '';
    let target = '';

    if (type === 'email' && email) {
      key = `reg_otp_email_${email}`;
      target = email;
    } else if (type === 'mobile' && phone) {
      key = `reg_otp_mobile_${phone}`;
      target = phone;
    } else {
      return res.status(400).json({ success: false, message: "Invalid type or missing contact info" });
    }

    const storedOtpData = req.app.locals[key];

    if (!storedOtpData) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      delete req.app.locals[key];
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    if (parseInt(otp) !== storedOtpData.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    // Mark as verified in session/locals
    req.app.locals[`verified_${target}`] = true;
    delete req.app.locals[key];

    return res.status(200).json({ success: true, message: `${type === 'email' ? 'Email' : 'Mobile'} verified successfully` });
  } catch (err) {
    console.error("Error in verifyRegistrationOtp", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


const sendLoginOtp = async (req, res) => {
  try {
    const { emailOrPhone } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: "Email or Phone is required" });
    }

    const user = await userModel.findOne({
      $or: [{ userEmail: emailOrPhone }, { userMobile: emailOrPhone }],
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    if (user.isDeleted) {
      return res.status(403).json({ success: false, message: "This account has been deleted. Please contact admin" });
    }

    if (user.profileStatus === "Deactivated") {
      return res.status(403).json({ success: false, message: "Account is deactivated. Contact admin to reactivate." });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const key = `login_otp_${user._id}`;

    req.app.locals[key] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    // If it's an email, try sending an email
    if (emailOrPhone.includes('@')) {
      try {
        await sendEmail(emailOrPhone, "Your Login OTP - Agape Vows Matrimony", "otpVerification", [otp]);
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully to your email",
          userId: user._id
        });
      } catch (emailError) {
        console.error("Failed to send login email:", emailError);
        return res.status(200).json({
          success: true,
          message: "OTP generated (Email failed to send, please check console)",
          userId: user._id
        });
      }
    } else {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

  } catch (err) {
    console.error("Error in sendLoginOtp", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
      return res.status(400).json({ success: false, message: "User ID and OTP are required" });
    }

    const key = `login_otp_${userId}`;
    const storedOtpData = req.app.locals[key];

    if (!storedOtpData) {
      return res.status(400).json({ success: false, message: "OTP not found or expired" });
    }

    if (Date.now() > storedOtpData.expiresAt) {
      delete req.app.locals[key];
      return res.status(400).json({ success: false, message: "OTP has expired" });
    }

    if (parseInt(otp) !== storedOtpData.otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    delete req.app.locals[key];

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'agape_vows_secret_key_2026', { expiresIn: '21d' });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      userId: user._id,
      userName: user.userName,
      profileImage: user.profileImage,
      gender: user.gender
    });
  } catch (err) {
    console.error("Error in verifyLoginOtp", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



module.exports = {
  saveSignUpData,
  verifyLogin,
  userForgotPassword,
  userVerifyOtp,
  saveNewPassword,
  generateAgwid,
  sendRegistrationOtp,
  verifyRegistrationOtp,
  sendLoginOtp,
  verifyLoginOtp,
};
