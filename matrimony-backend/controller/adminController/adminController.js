// const bcrypt = require("bcrypt");
// const {
//   ADMIN_EMAIL_ID,
//   ADMIN_PASSWORD,
// } = require("../../config/variables/variables");
// const adminModel = require("../../model/admin/adminModel");
// const userModel = require("../../model/user/userModel");

// const registerAdmin = async (req, res) => {
//   try {
//     const adminEmail = ADMIN_EMAIL_ID;
//     const adminPassword = ADMIN_PASSWORD;

//     const existingAdmin = await adminModel.findOne({ adminEmail });

//     if (existingAdmin) {
//       return res.status(200).json({
//         success: true,
//         message: "Admin already registered",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(adminPassword, 10);

//     const newAdmin = new adminModel({
//       adminEmail,
//       adminPassword: hashedPassword,
//     });

//     await newAdmin.save();

//     res.status(201).json({
//       success: true,
//       message: "Admin registered successfully",
//     });
//   } catch (err) {
//     console.error("Error in registerAdmin:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const verifyAdmin = async (req, res) => {
//   try {
//     const { loginData } = req.body;
//     const { email, password } = loginData;

//     const admin = await adminModel.findOne({ adminEmail: email });

//     if (!admin) {
//       return res.status(404).json({
//         success: false,
//         message: "Admin not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, admin.adminPassword);

//     if (!isMatch) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Admin login successful",
//       adminId: admin._id,
//     });
//   } catch (err) {
//     console.error("Error in verifyAdmin:", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const getAllUsersData = async (req, res) => {
//   try {
//     const userData = await userModel
//       .find(
//         { isApproved: true },
//         {
//           userEmail: 1,
//           userMobile: 1,
//           userName: 1,
//           gender: 1,
//           city: 1,
//           profileImage: 1,
//         }
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "All users fetched successfully",
//       data: userData,
//     });
//   } catch (err) {
//     console.error("Error in getAllUsersData", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const getPaidUsersData = async (req, res) => {
//   try {
//     const userData = await userModel
//       .find(
//         { isAnySubscriptionTaken: true },
//         {
//           userEmail: 1,
//           userMobile: 1,
//           userName: 1,
//           gender: 1,
//           city: 1,
//           profileImage: 1,
//           isAnySubscriptionTaken: 1,
//           "paymentDetails.subscriptionValidFrom": 1,
//           "paymentDetails.subscriptionValidTo": 1,
//           "paymentDetails.subscriptionType": 1,
//           "paymentDetails.subscriptionAmount": 1,
//           "paymentDetails.subscriptionStatus": 1,
//           "paymentDetails.subscriptionTransactionDate": 1,
//         }
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       message: "Paid users fetched successfully",
//       data: userData,
//     });
//   } catch (err) {
//     console.error("Error in getPaidUsersData", err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const getAllNewRequestedUsersData = async (req, res) => {
//   try {
//     const userData = await userModel
//       .find(
//         { isApproved: false },
//         {
//           userEmail: 1,
//           userMobile: 1,
//           userName: 1,
//           gender: 1,
//           profileImage: 1,
//           paymentDetails: 1,
//           createdAt: 1,
//         }
//       )
//       .sort({ createdAt: -1 });

//     res.status(200).json({ success: true, data: userData });
//   } catch (err) {
//     console.error("Error fetching unapproved users:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// const approveNewUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     const userData = await userModel.findByIdAndUpdate(
//       userId,
//       { isApproved: true },
//       { new: true }
//     );

//     if (!userData) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User approved successfully",
//     });
//   } catch (err) {
//     console.error("Error approving user:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedUser = await userModel.findByIdAndDelete(id);

//     if (!deletedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });
//   } catch (err) {
//     console.error("Error deleting user:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const user = await userModel.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     console.error("Error fetching user:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// const updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedData = req.body;

//     const updatedUser = await userModel.findByIdAndUpdate(
//       id,
//       updatedData,
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: updatedUser,
//     });
//   } catch (err) {
//     console.error("Error updating user:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// module.exports = {
//   getPaidUsersData,
//   approveNewUser,
//   getAllNewRequestedUsersData,
//   registerAdmin,
//   verifyAdmin,
//   getAllUsersData,
//   deleteUser,
//   getUserById,     // ✅ add
//   updateUser,      // ✅ add
// };



const bcrypt = require("bcrypt");
const {
  ADMIN_EMAIL_ID,
  ADMIN_PASSWORD,
} = require("../../config/variables/variables");
const adminModel = require("../../model/admin/adminModel");
const userModel = require("../../model/user/userModel");
const { generateAgwid } = require("../userController/userSignupController");

/* =========================
   REGISTER ADMIN
========================== */
const registerAdmin = async (req, res) => {
  try {
    const adminEmail = ADMIN_EMAIL_ID;
    const adminPassword = ADMIN_PASSWORD;

    const existingAdmin = await adminModel.findOne({ adminEmail });

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

    const admin = await adminModel.findOne({ adminEmail: email });

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

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      adminId: admin._id,
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
        {
          isApproved: true,
          $or: [
            { isDeleted: false },
            { isDeleted: { $exists: false } }
          ],
        },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          city: 1,
          profileImage: 1,
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
   GET NEW REQUESTED USERS
========================== */
const getAllNewRequestedUsersData = async (req, res) => {
  try {
    const userData = await userModel
      .find(
        { isApproved: false, isDeleted: false },
        {
          userEmail: 1,
          userMobile: 1,
          userName: 1,
          gender: 1,
          profileImage: 1,
          paymentDetails: 1,
          createdAt: 1,
        }
      )
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: userData });
  } catch (err) {
    console.error("Error fetching unapproved users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* =========================
   APPROVE USER
========================== */
const approveNewUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userData = await userModel.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      { isApproved: true },
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
      message: "User approved successfully",
    });
  } catch (err) {
    console.error("Error approving user:", err);
    return res.status(500).json({
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
          deletedAt: 1,
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




/* =========================
   VERIFY ID PROOF
========================== */
const verifyIdProof = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body; // "Verified" or "Rejected"

    if (!["Verified", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be 'Verified' or 'Rejected'.",
      });
    }

    const userData = await userModel.findByIdAndUpdate(
      userId,
      { idVerificationStatus: status },
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
      isApproved: true,
      profileStatus: "Active",
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* =========================
   BULK REGISTER USERS
========================== */
const bulkRegisterUsers = async (req, res) => {
  try {
    console.log("bulk upload",req.body)
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
        const { userEmail, userMobile, password } = userData;
        
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
          ...userData,
          userPassword: hashedPassword,
          agwid,
          isApproved: true,
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

module.exports = {
  getPaidUsersData,
  approveNewUser,
  getAllNewRequestedUsersData,
  registerAdmin,
  verifyAdmin,
  getAllUsersData,
  deleteUser,
  permanentDeleteUser,
  getUserById,
  restoreUser,
  updateUser,
  getDeletedUsers,
  verifyIdProof,
  verifyMobile,
  registerUser,
  bulkRegisterUsers,
};
