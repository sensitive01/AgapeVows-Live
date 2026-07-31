// const express = require("express");
// const adminRoutes = express.Router();
// const adminController = require("../../controller/adminController/adminController");
// const planController = require("../../controller/adminController/planController")
// const eventController = require("../../controller/adminController/eventController");
// const upload = require("../../middleware/multer");


// adminRoutes.get("/", adminController.registerAdmin);
// adminRoutes.get("/get-all-users", adminController.getAllUsersData);
// adminRoutes.get("/get-all-new-requested-users", adminController.getAllNewRequestedUsersData);
// adminRoutes.get("/paid-users-data", adminController.getPaidUsersData);
// adminRoutes.get("/get-all-plan-data", planController.getAllPlanData);
// adminRoutes.delete("/delete-user/:id", adminController.deleteUser);
// adminRoutes.get("/get-user/:id", adminController.getUserById);
// adminRoutes.put("/update-user/:id", adminController.updateUser);






// adminRoutes.post("/verify-admin", adminController.verifyAdmin);
// adminRoutes.post("/add-new-plan-data", planController.addNewPlanData);



// adminRoutes.put("/approve-new-user/:userId", adminController.approveNewUser);
// adminRoutes.put("/edit-plan-data/:planId", planController.editPlanData);
// adminRoutes.put("/edit-plan-status/:planId", planController.editPlanStatus);

// adminRoutes.get("/get-all-events", eventController.getAllEvents);
// adminRoutes.post("/add-new-event", upload.single("image"), eventController.addNewEvent);
// adminRoutes.put("/edit-event/:id", upload.single("image"), eventController.editEvent);
// adminRoutes.delete("/delete-event/:id", eventController.deleteEvent);







// module.exports = adminRoutes;


const express = require("express");
const adminRoutes = express.Router();

const adminController = require("../../controller/adminController/adminController");
const planController = require("../../controller/adminController/planController");
const eventController = require("../../controller/adminController/eventController");
const blogController = require("../../controller/adminController/blogController");
const issueController = require("../../controller/adminController/issueController");
const enquiryController = require("../../controller/adminController/enquiryController");

const reportController = require("../../controller/userController/reportController");
const upload = require("../../middleware/multer");

/* =========================
   ADMIN AUTH
========================== */
adminRoutes.get("/", adminController.registerAdmin);
adminRoutes.post("/verify-admin", adminController.verifyAdmin);

// ID PROOF UPLOAD (ADMIN)
adminRoutes.post("/upload-id-proof/:userId", upload.single("idProof"), adminController.uploadIdProofAdmin);

adminRoutes.post(
  "/upload-user-images/:userId",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 },
  ]),
  adminController.uploadUserImagesAdmin
);

/* =========================
   DASHBOARD & USERS
========================== */
adminRoutes.get("/get-admin-profile/:id", adminController.getAdminProfile);
adminRoutes.put("/update-admin-profile/:id", adminController.updateAdminProfile);
adminRoutes.post("/create-subadmin", adminController.createSubadmin);
adminRoutes.get("/get-all-subadmins", adminController.getAllSubadmins);
adminRoutes.put("/update-subadmin/:id", adminController.updateSubadmin);
adminRoutes.delete("/delete-subadmin/:id", adminController.deleteSubadmin);

/* =========================
   USER MANAGEMENT
========================== */
adminRoutes.get("/get-all-users", adminController.getAllUsersData);
adminRoutes.get("/get-user/:id", adminController.getUserById);
adminRoutes.put("/update-user/:id", adminController.updateUser);





adminRoutes.get("/paid-users-data", adminController.getPaidUsersData);

adminRoutes.delete("/delete-user/:id", adminController.deleteUser);
adminRoutes.delete("/permanent-delete-user/:id", adminController.permanentDeleteUser);
adminRoutes.put("/restore-user/:id", adminController.restoreUser);
adminRoutes.get("/deleted-users", adminController.getDeletedUsers);
adminRoutes.get("/deactivated-users", adminController.getDeactivatedUsers);
adminRoutes.put("/deactivate-user/:id", adminController.deactivateUser);

adminRoutes.put(
  "/verify-id-proof/:userId",
  adminController.verifyIdProof
);

adminRoutes.get(
  "/get-unverified-id-users",
  adminController.getUnverifiedIdProofUsers
);

adminRoutes.get(
  "/get-verified-id-users",
  adminController.getVerifiedIdProofUsers
);

adminRoutes.put(
  "/verify-mobile/:userId",
  adminController.verifyMobile
);

adminRoutes.put(
  "/toggle-restriction/:userId",
  adminController.toggleUserRestriction
);

adminRoutes.get("/contact-update-requests", adminController.getContactUpdateRequests);
adminRoutes.put("/approve-contact-update/:userId", adminController.approveContactUpdate);
adminRoutes.put("/reject-contact-update/:userId", adminController.rejectContactUpdate);

adminRoutes.post("/register-user", adminController.registerUser);
adminRoutes.post("/bulk-register-users", adminController.bulkRegisterUsers);
adminRoutes.get("/export-users", adminController.exportAllUsersData);

/* =========================
   PLAN MANAGEMENT
========================== */
adminRoutes.get("/get-all-plan-data", planController.getAllPlanData);
adminRoutes.post("/add-new-plan-data", planController.addNewPlanData);
adminRoutes.put("/edit-plan-data/:planId", planController.editPlanData);
adminRoutes.put("/edit-plan-status/:planId", planController.editPlanStatus);
adminRoutes.put("/upgrade-plan/:id", adminController.upgradeUserPlan);

/* =========================
   ISSUE MANAGEMENT
========================== */
adminRoutes.get("/get-all-issues", issueController.getAllIssues);
adminRoutes.put("/update-issue/:id", issueController.updateIssue);
adminRoutes.delete("/delete-issue/:id", issueController.deleteIssue);

/* =========================
   EVENT MANAGEMENT
========================== */
adminRoutes.get("/get-all-events", eventController.getAllEvents);

adminRoutes.post(
  "/add-new-event",
  upload.single("image"),
  eventController.addNewEvent
);

adminRoutes.put(
  "/edit-event/:id",
  upload.single("image"),
  eventController.editEvent
);

adminRoutes.delete("/delete-event/:id", eventController.deleteEvent);



// GET all enquiries
adminRoutes.get(
  "/get-all-enquiries",
  enquiryController.getAllEnquiries
);

// DELETE enquiry
adminRoutes.delete(
  "/delete-enquiry/:id",
  enquiryController.deleteEnquiry
);

// UPDATE enquiry
adminRoutes.put(
  "/update-enquiry/:id",
  enquiryController.updateEnquiry
);

/* =========================
   REPORT MANAGEMENT
========================== */
adminRoutes.get("/get-all-reports", reportController.getAllReports);
adminRoutes.put("/update-report/:reportId", reportController.updateReportStatus);


/* =========================
   BLOG MANAGEMENT
========================== */

// Get All Blogs
adminRoutes.get("/get-all-blogs", blogController.getAllBlogs);

// Add New Blog
adminRoutes.post(
  "/add-new-blog",
  upload.any(),
  blogController.addNewBlog
);

// Edit Blog
adminRoutes.put(
  "/edit-blog/:id",
  upload.any(),
  blogController.editBlog
);

// Delete Blog
adminRoutes.delete("/delete-blog/:id", blogController.deleteBlog);

/* =========================
   MASTER DATA MANAGEMENT
========================== */
adminRoutes.get("/get-all-master-data", adminController.getAllMasterData);
adminRoutes.post("/add-master-data", adminController.addMasterData);
adminRoutes.put("/update-master-data/:id", adminController.updateMasterData);

/* =========================
   EXPORT (ALWAYS LAST)
========================== */
module.exports = adminRoutes;