const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const userModel = require("../../model/user/userModel");

// const generateAgwid = async () => {
//   try {
//     let isUnique = false;
//     let agwid = "";
//     let attempts = 0;

//     while (!isUnique && attempts < 20) {
//       attempts++;
//       // Determine number of digits: start with 6, switch to 7 if we have too many collisions
//       const digits = attempts > 10 ? 7 : 6;

//       // Generate random number
//       const max = Math.pow(10, digits);
//       const randomNumber = Math.floor(Math.random() * max);
//       const paddedNumber = randomNumber.toString().padStart(digits, "0");

//       agwid = `AGPW${paddedNumber}`;

//       const existingUser = await userModel.findOne({ agwid });
//       if (!existingUser) {
//         isUnique = true;
//       }
//     }

//     if (!isUnique) {
//       throw new Error("Failed to generate unique AGW ID after multiple attempts");
//     }

//     return agwid;
//   } catch (error) {
//     console.error("Error generating AGW ID:", error);
//     throw error;
//   }
// };


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

      agwid = `AGV${paddedNumber}`;

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



const saveSignUpData = async (req, res) => {
  try {
    const { formData } = req.body;

    console.log("FormData", formData);

    const { name, email, phone, password, agree } = formData;
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ userEmail: email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

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

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in saving the signup data", err);
    res.status(500).send("Error in saving the signup data");
  }
};

// const verifyLogin = async (req, res) => {
//   try {
//     const { formData } = req.body;
//     const { email, password, rememberMe } = formData;

//     console.log("formData", formData);

//     const user = await userModel.findOne({ userEmail: email });

//     if (!user) {
//       return res.status(401).json({ message: "User not found" });
//     }

//     const isMatch = await bcrypt.compare(password, user.userPassword);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid password" });
//     }

//     // if (!user.isEmailVerified) {
//     //   return res
//     //     .status(403)
//     //     .json({ message: "Please verify your email before logging in" });
//     // }

//     return res.status(200).json({
//       message: "Login successful",
//       userId: user._id,
//       rememberMe,
//       userName: user.userName,
//       profileImage: user.profileImage,
//     });
//   } catch (err) {
//     console.error("Error in verifying login", err);
//     res.status(500).send("Internal Server Error");
//   }
// };

const verifyLogin = async (req, res) => {
  try {
    const { formData } = req.body;
    const { email, password, rememberMe } = formData;

    const user = await userModel.findOne({ userEmail: email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // BLOCK DELETED USERS
    if (user.isDeleted) {
      return res.status(403).json({ message: "This account has been deleted.Please contact admin" });
    }

    const isMatch = await bcrypt.compare(password, user.userPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      userId: user._id,
      rememberMe,
      userName: user.userName,
      profileImage: user.profileImage,
    });
  } catch (err) {
    console.error("Error in verifying login", err);
    res.status(500).send("Internal Server Error");
  }
};


const userForgotPassword = async (req, res) => {
  try {
    const { emailOrPhone } = req.body.emailOrPhone;

    console.log("emailOrPhone", emailOrPhone);

    const user = await userModel.findOne({
      $or: [{ userEmail: emailOrPhone }, { userMobile: emailOrPhone }],
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
      expiresAt: Date.now() + 60 * 1000,
    };

    console.log(`Generated OTP for ${user.userEmail || user.userMobile}:`, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      userId: user._id,
      otp: otp,
    });
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

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.userPassword = hashedPassword;

    // Fix for validation error if profileCreatedFor is empty string
    if (user.profileCreatedFor === "") {
      user.profileCreatedFor = undefined;
    }

    await user.save();

    return res.status(200).json({ success: true, message: "Password updated successfully", userId });

  } catch (err) {
    console.log("Error in saving the new password", err);
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
};
