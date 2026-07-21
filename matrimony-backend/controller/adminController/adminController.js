const bcrypt = require("bcrypt");
const {
  ADMIN_EMAIL_ID,
  ADMIN_PASSWORD,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = require("../../config/variables/variables");
const adminModel = require("../../model/admin/adminModel");
const userModel = require("../../model/user/userModel");
const masterDataModel = require("../../model/admin/masterDataModel");
const { generateAgwid } = require("../userController/userSignupController");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/* =========================
   REGISTER ADMIN
========================== */
const registerAdmin = async (req, res) => {
  try {
    const adminEmail = ADMIN_EMAIL_ID;
    const adminPassword = ADMIN_PASSWORD;

    const existingAdmin = await adminModel.findOne({ role: 'superadmin' });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: "Admin already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const newAdmin = new adminModel({
      adminEmail,
      adminPassword: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (err) {
    console.error("Error in registerAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   VERIFY ADMIN
========================== */
const verifyAdmin = async (req, res) => {
  try {
    const { loginData } = req.body;
    const { email, password } = loginData;

    const normalizedEmail = email.trim().toLowerCase();
    const admin = await adminModel.findOne({ adminEmail: normalizedEmail });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.adminPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || 'agape_vows_secret_key_2026', { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      adminId: admin._id,
      role: admin.role,
      permissions: admin.permissions,
    });
  } catch (err) {
    console.error("Error in verifyAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET ALL APPROVED USERS
========================== */
const getAllUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isDeleted: false },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
          agwid: 1,
          createdAt: 1,
          isProfileCompleted: 1,
          dateOfBirth: 1,
          maritalStatus: 1,
          motherTongue: 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error in getAllUsersData", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET PAID USERS
========================== */
const getPaidUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isAnySubscriptionTaken: true, isDeleted: false },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
            agwid: 1,
            createdAt: 1,
            isAnySubscriptionTaken: 1,
          "paymentDetails.subscriptionValidFrom": 1,
          "paymentDetails.subscriptionValidTo": 1,
          "paymentDetails.subscriptionType": 1,
          "paymentDetails.subscriptionAmount": 1,
          "paymentDetails.subscriptionStatus": 1,
          "paymentDetails.subscriptionTransactionDate": 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Paid users fetched successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error in getPaidUsersData", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



/* =========================
   SOFT DELETE USER
========================== */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User soft deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   PERMANENT DELETE USER (Hard Delete)
========================== */
const permanentDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User permanently deleted successfully",
      deletedUser: deletedUser,
    });
  } catch (err) {
    console.error("Error permanently deleting user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


/* =========================
   GET USER BY ID
========================== */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   UPDATE USER
========================== */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await userModel.findOneAndUpdate(
      { _id: id, isDeleted: false },
      updatedData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    const restoredUser = await userModel.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
        profileStatus: "Active",
        deactivatedAt: null,
      },
      { new: true }
    );

    if (!restoredUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User restored successfully",
    });
  } catch (err) {
    console.error("Error restoring user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET ALL DELETED USERS
========================== */
const getDeletedUsers = async (req, res) => {
  try {
    const deletedUsers = await userModel
      .find(
        { isDeleted: true },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
          createdAt: 1,
          deletedAt: 1,
          agwid: 1,
        }
      )
      .sort({ deletedAt: -1 });

    res.status(200).json({
      success: true,
      data: deletedUsers,
    });
  } catch (err) {
    console.error("Error fetching deleted users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getDeactivatedUsers = async (req, res) => {
  try {
    const deactivatedUsers = await userModel
      .find(
        { profileStatus: "Deactivated", isDeleted: false },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
            agwid: 1,
            createdAt: 1,
            deactivatedAt: 1,
          deactivationReason: 1,
          deactivationDescription: 1,
          whatsapp: 1,
          alternateMobile: 1,
          currentAddress: 1,
          agwid: 1,
        }
      )
      .sort({ deactivatedAt: -1 });

    res.status(200).json({
      success: true,
      data: deactivatedUsers,
    });
  } catch (err) {
    console.error("Error fetching deactivated users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};




/* =========================
   VERIFY ID PROOF
========================== */
const verifyIdProof = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // "Verified" or "Rejected"

    if (!["Verified", "Rejected", "Pending", "Uploaded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Verified', 'Rejected', 'Pending', or 'Uploaded'.",
      });
    }

    const updateData = { idVerificationStatus: status };
    if (status === "Verified") {
      updateData.idVerifiedAt = new Date();
    } else if (status === "Pending" || status === "Uploaded") {
      // Clear the verified date if undoing
      updateData.idVerifiedAt = null;
    }

    const userData = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `ID Proof ${status.toLowerCase()} successfully`,
    });
  } catch (err) {
    console.error("Error verifying ID proof:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET UNVERIFIED ID USERS
========================== */
const getUnverifiedIdProofUsers = async (req, res) => {
  try {
    const userData = await userModel.aggregate([
      {
        $match: {
          idVerificationStatus: { $ne: "Verified" },
          isDeleted: false,
        },
      },
      {
        $addFields: {
          statusWeight: {
            $switch: {
              branches: [
                { case: { $eq: ["$idVerificationStatus", "Uploaded"] }, then: 1 },
                { case: { $eq: ["$idVerificationStatus", "Rejected"] }, then: 2 },
                { case: { $eq: ["$idVerificationStatus", "Pending"] }, then: 3 },
              ],
              default: 4,
            },
          },
        },
      },
      {
        $sort: { statusWeight: 1, createdAt: -1 },
      },
      {
        $project: {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          profileImage: 1,
          idProofDocument: 1,
          idProofType: 1,
          idProofNumber: 1,
          idVerificationStatus: 1,
          createdAt: 1,
          agwid: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    console.error("Error fetching unverified users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   GET VERIFIED ID USERS
========================== */
const getVerifiedIdProofUsers = async (req, res) => {
  try {
    const userData = await userModel.aggregate([
      {
        $match: {
          idVerificationStatus: "Verified",
          isDeleted: false,
        },
      },
      {
        $sort: { idVerifiedAt: -1, createdAt: -1 },
      },
      {
        $project: {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          profileImage: 1,
          idProofDocument: 1,
          idProofType: 1,
          idProofNumber: 1,
          idVerificationStatus: 1,
          createdAt: 1,
          idVerifiedAt: 1,
          agwid: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    console.error("Error fetching verified users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const verifyMobile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { isVerified } = req.body;

    const userData = await userModel.findByIdAndUpdate(
      userId,
      { isPhoneVerified: isVerified },
      { new: true }
    );

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Mobile phone ${isVerified ? "verified" : "unverified"} successfully`,
    });
  } catch (err) {
    console.error("Error verifying mobile phone:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   REGISTER NEW USER (ADMIN)
========================== */
const registerUser = async (req, res) => {
  try {
    const userData = req.body;
    const { userEmail, userMobile, password } = userData;

    const existingUser = await userModel.findOne({
      $or: [{ userEmail }, { userMobile }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email or mobile already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password || "Admin@123", 10);
    const agwid = await generateAgwid();

    const newUser = new userModel({
      ...userData,
      userPassword: hashedPassword,
      agwid,

      profileStatus: "Active",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: newUser._id,
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Internal server error",
    });
  }
};

/* =========================
   BULK REGISTER USERS
========================== */
const bulkRegisterUsers = async (req, res) => {
  try {
    const { users } = req.body;
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ success: false, message: "No user data provided" });
    }

    const results = {
      successCount: 0,
      failCount: 0,
      errors: [],
    };

    for (const userData of users) {
      try {
        const sanitizedData = {};
        for (const [key, value] of Object.entries(userData)) {
           if (value !== "" && value !== null && value !== undefined) {
              sanitizedData[key] = value;
           }
        }

        const { userEmail, userMobile, password } = sanitizedData;
        
        if (!userEmail || !userMobile) {
          results.failCount++;
          results.errors.push({ email: userEmail || "Unknown", reason: "Missing email or mobile" });
          continue;
        }

        const existingUser = await userModel.findOne({
          $or: [{ userEmail }, { userMobile }],
        });

        if (existingUser) {
          results.failCount++;
          results.errors.push({ email: userEmail, reason: "User already exists" });
          continue;
        }

        const hashedPassword = await bcrypt.hash(password || "Admin@123", 10);
        const agwid = await generateAgwid();

        const newUser = new userModel({
          ...sanitizedData,
          userPassword: hashedPassword,
          agwid,

          profileStatus: "Active",
        });

        await newUser.save();
        results.successCount++;
      } catch (innerErr) {
        results.failCount++;
        results.errors.push({ email: userData.userEmail, reason: innerErr.message });
      }
    }

    res.status(200).json({
      success: true,
      message: "Bulk registration complete",
      data: results,
    });
  } catch (err) {
    console.error("Error in bulkRegisterUsers:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   EXPORT ALL USERS DATA
========================== */
const exportAllUsersData = async (req, res) => {
  try {
    const userData = await userModel.find(
      { isDeleted: false },
      { userPassword: 0 }
    ).lean();

    res.status(200).json({
      success: true,
      message: "All user data fetched for export",
      data: userData,
    });
  } catch (err) {
    console.error("Error in exportAllUsersData:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   CONTACT UPDATE REQUESTS
========================== */
const getContactUpdateRequests = async (req, res) => {
  try {
    const requests = await userModel.find(
      { contactUpdateStatus: "Pending" },
      { userName: 1, userEmail: 1, userMobile: 1, requestedMobile: 1, requestedEmail: 1, agwid: 1, createdAt: 1, profileImage: 1 }
    ).sort({ updatedAt: -1 });

    res.status(200).json({ success: true, data: requests });
  } catch (err) {
    console.error("Error fetching contact update requests:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const approveContactUpdate = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.requestedMobile) user.userMobile = user.requestedMobile;
    if (user.requestedEmail) user.userEmail = user.requestedEmail;

    user.contactUpdateStatus = "Approved";
    user.requestedMobile = null;
    user.requestedEmail = null;

    await user.save();

    res.status(200).json({ success: true, message: "Contact update approved" });
  } catch (err) {
    console.error("Error approving contact update:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const rejectContactUpdate = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.contactUpdateStatus = "Rejected";
    user.requestedMobile = null;
    user.requestedEmail = null;

    await user.save();

    res.status(200).json({ success: true, message: "Contact update rejected" });
  } catch (err) {
    console.error("Error rejecting contact update:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deactivateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deactivatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        profileStatus: "Deactivated",
        deactivatedAt: new Date(),
        deactivationReason: "Deactivated by Admin",
      },
      { new: true }
    );

    if (!deactivatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deactivated successfully",
    });
  } catch (err) {
    console.error("Error deactivating user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   UPGRADE USER PLAN (Manual)
========================== */
const upgradeUserPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { plan } = req.body;

    if (!plan) {
      return res.status(400).json({ success: false, message: "Plan details are required." });
    }

    const validFrom = new Date();
    
    // calculate Valid To
    const date = new Date(validFrom);
    const dur = parseInt(plan.duration) || 0;
    const type = (plan.durationType || "months").toLowerCase();
    if (type.includes("day")) {
      date.setDate(date.getDate() + dur);
    } else if (type.includes("month")) {
      date.setMonth(date.getMonth() + dur);
    } else if (type.includes("year")) {
      date.setFullYear(date.getFullYear() + dur);
    } else {
      date.setMonth(date.getMonth() + dur);
    }
    const validTo = date;

    const orderId = "admin_" + Date.now();

    const updateData = {
      $push: {
        paymentDetails: {
          subscriptionValidFrom: validFrom,
          subscriptionValidTo: validTo,
          subscriptionType: plan.name,
          subscriptionAmount: plan.price || 0,
          subscriptionStatus: "Active",
          subscriptionTransactionDate: validFrom,
          subscriptionTransactionId: plan.paymentId || "admin_manual",
          subscriptionOrderId: orderId,
          isEmployeeAssisted: true,
          maxProfiles: plan.maxProfiles,
          profilesViewedCount: 0,
          dailyLimit: plan.dailyLimit,
          dailyViewedCount: 0,
          lastViewDate: new Date(),
          canViewProfiles: plan.canViewProfiles,
          viewContactDetails: plan.viewContactDetails,
          sendInterestRequest: plan.sendInterestRequest,
          maxSendInterest: plan.maxSendInterest,
          dailyLimitSendInterest: plan.dailyLimitSendInterest,
          interestSentCount: 0,
          dailyInterestSentCount: 0,
          lastInterestSentDate: new Date(),
          maxViewContact: plan.maxViewContact,
          dailyLimitViewContact: plan.dailyLimitViewContact,
          contactViewCount: 0,
          dailyContactViewCount: 0,
          lastContactViewDate: new Date(),
        },
      },
      $set: {
        isAnySubscriptionTaken: true,
      },
    };

    const updatedUser = await userModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Clear old view counts
    await userModel.updateMany(
      { profileViews: id },
      { $pull: { profileViews: id } }
    );
    await userModel.updateMany(
      { contactViews: id },
      { $pull: { contactViews: id } }
    );

    return res.status(200).json({
      success: true,
      message: "Plan upgraded successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error upgrading user plan:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* =========================
   SUBADMIN MANAGEMENT
========================== */
const getAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findById(id).select("-adminPassword");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateAdminProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    
    const updateData = {};
    if (name) updateData.adminName = name;
    if (email) updateData.adminEmail = email;
    
    if (password) {
      updateData.adminPassword = await bcrypt.hash(password, 10);
    }
    
    const updatedAdmin = await adminModel.findByIdAndUpdate(id, updateData, { new: true }).select("-adminPassword");
    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
    
    res.status(200).json({ success: true, message: "Admin profile updated successfully", data: updatedAdmin });
  } catch (err) {
    console.error("Error updating admin profile:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const createSubadmin = async (req, res) => {
  try {
    const { email, password, permissions } = req.body;
    
    const existingAdmin = await adminModel.findOne({ adminEmail: email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin email already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newSubadmin = new adminModel({
      adminEmail: email,
      adminPassword: hashedPassword,
      role: 'subadmin',
      permissions: permissions || []
    });
    
    await newSubadmin.save();
    res.status(201).json({ success: true, message: "Subadmin created successfully" });
  } catch (err) {
    console.error("Error creating subadmin:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllSubadmins = async (req, res) => {
  try {
    const subadmins = await adminModel.find({ role: 'subadmin' }).select("-adminPassword").sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subadmins });
  } catch (err) {
    console.error("Error fetching subadmins:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateSubadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, permissions } = req.body;
    
    const updateData = { adminEmail: email, permissions: permissions || [] };
    if (password) {
      updateData.adminPassword = await bcrypt.hash(password, 10);
    }
    
    const updatedSubadmin = await adminModel.findByIdAndUpdate(id, updateData, { new: true }).select("-adminPassword");
    if (!updatedSubadmin) {
      return res.status(404).json({ success: false, message: "Subadmin not found" });
    }
    
    res.status(200).json({ success: true, message: "Subadmin updated successfully", data: updatedSubadmin });
  } catch (err) {
    console.error("Error updating subadmin:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteSubadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubadmin = await adminModel.findOneAndDelete({ _id: id, role: 'subadmin' });
    if (!deletedSubadmin) {
      return res.status(404).json({ success: false, message: "Subadmin not found" });
    }
    res.status(200).json({ success: true, message: "Subadmin deleted successfully" });
  } catch (err) {
    console.error("Error deleting subadmin:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* =========================
   UPLOAD ID PROOF (ADMIN)
========================== */
const uploadIdProofAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: `matrimony/users/${userId}/idProof`,
      resource_type: "auto",
    });

    const { idProofType, idProofNumber } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        idProofDocument: result.secure_url,
        idProofType: idProofType || "",
        idProofNumber: idProofNumber || "",
        idVerificationStatus: "Uploaded",
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "ID Proof uploaded successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error in uploadIdProofAdmin:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   MASTER DATA MANAGEMENT
========================== */
const getAllMasterData = async (req, res) => {
  try {
    const data = await masterDataModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (err) {
    console.error("Error fetching master data:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const addMasterData = async (req, res) => {
  try {
    const { name, type } = req.body;
    
    // Check if it already exists
    const existing = await masterDataModel.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') }, type });
    if (existing) {
      return res.status(400).json({ success: false, message: `${type} with this name already exists` });
    }

    const newData = new masterDataModel({ name, type });
    await newData.save();
    
    res.status(201).json({ success: true, message: `${type} added successfully`, data: newData });
  } catch (err) {
    console.error("Error adding master data:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateMasterData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, isActive } = req.body;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const updated = await masterDataModel.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updated) {
      return res.status(404).json({ success: false, message: "Master data not found" });
    }
    
    res.status(200).json({ success: true, message: "Updated successfully", data: updated });
  } catch (err) {
    console.error("Error updating master data:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/* =========================
   UPLOAD USER IMAGES (Admin)
========================== */
const uploadUserImagesAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const files = req.files;

    if (!files) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const updates = {};
    const fs = require('fs');

    // Profile Image
    if (files?.profileImage?.[0]) {
      const profile = await cloudinary.uploader.upload(
        files.profileImage[0].path,
        {
          folder: `matrimony/users/${userId}/profileImage`,
          resource_type: "auto",
        }
      );
      updates.profileImage = profile.secure_url;
      try { fs.unlinkSync(files.profileImage[0].path); } catch (e) {}
    }

    // Additional Images
    if (files?.additionalImages?.length > 0) {
      const additionalImageUrls = [];
      for (const file of files.additionalImages) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: `matrimony/users/${userId}/additionalImages`,
          resource_type: "auto",
        });
        additionalImageUrls.push(result.secure_url);
        try { fs.unlinkSync(file.path); } catch (e) {}
      }
      
      const user = await userModel.findById(userId);
      let existingImages = user.additionalImages || [];
      updates.additionalImages = [...existingImages, ...additionalImageUrls];
    }

    if (Object.keys(updates).length > 0) {
      const updatedUser = await userModel.findByIdAndUpdate(userId, updates, { new: true });
      return res.status(200).json({ success: true, data: updatedUser, message: "Images uploaded successfully" });
    } else {
      return res.status(200).json({ success: true, message: "No new images uploaded" });
    }

  } catch (err) {
    console.error("Error in uploadUserImagesAdmin:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getPaidUsersData,
  registerAdmin,
  verifyAdmin,
  uploadIdProofAdmin,
  uploadUserImagesAdmin,
  getAllUsersData,
  deleteUser,
  permanentDeleteUser,
  getUserById,
  restoreUser,
  updateUser,
  getDeletedUsers,
  getDeactivatedUsers,
  deactivateUser,
  verifyIdProof,
  verifyMobile,
  registerUser,
  bulkRegisterUsers,
  getUnverifiedIdProofUsers,
  exportAllUsersData,
  getContactUpdateRequests,
  approveContactUpdate,
  rejectContactUpdate,
  getVerifiedIdProofUsers,
  upgradeUserPlan,
  getAdminProfile,
  createSubadmin,
  getAllSubadmins,
  updateSubadmin,
  deleteSubadmin,
  updateAdminProfile,
  getAllMasterData,
  addMasterData,
  updateMasterData,
};
