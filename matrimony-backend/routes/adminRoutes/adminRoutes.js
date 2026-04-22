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
const feedbackController = require("../../controller/adminController/feedbackController");
const upload = require("../../middleware/multer");

/* =========================
   ADMIN AUTH
========================== */
adminRoutes.get("/", adminController.registerAdmin);
adminRoutes.post("/verify-admin", adminController.verifyAdmin);

/* =========================
   USER MANAGEMENT
========================== */
adminRoutes.get("/get-all-users", adminController.getAllUsersData);
adminRoutes.get("/get-user/:id", adminController.getUserById);
adminRoutes.put("/update-user/:id", adminController.updateUser);

adminRoutes.get(
  "/get-all-new-requested-users",
  adminController.getAllNewRequestedUsersData
);

adminRoutes.put(
  "/approve-new-user/:userId",
  adminController.approveNewUser
);

adminRoutes.get("/paid-users-data", adminController.getPaidUsersData);

adminRoutes.delete("/delete-user/:id", adminController.deleteUser);
adminRoutes.delete("/permanent-delete-user/:id", adminController.permanentDeleteUser);
adminRoutes.put("/restore-user/:id", adminController.restoreUser);
adminRoutes.get("/deleted-users", adminController.getDeletedUsers);

adminRoutes.put(
  "/verify-id-proof/:userId",
  adminController.verifyIdProof
);

adminRoutes.put(
  "/verify-mobile/:userId",
  adminController.verifyMobile
);

adminRoutes.post("/register-user", adminController.registerUser);
adminRoutes.post("/bulk-register-users", adminController.bulkRegisterUsers);

/* =========================
   PLAN MANAGEMENT
========================== */
adminRoutes.get("/get-all-plan-data", planController.getAllPlanData);
adminRoutes.post("/add-new-plan-data", planController.addNewPlanData);
adminRoutes.put("/edit-plan-data/:planId", planController.editPlanData);
adminRoutes.put("/edit-plan-status/:planId", planController.editPlanStatus);

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

/* =========================
   FEEDBACK MANAGEMENT
========================== */
adminRoutes.get("/get-all-feedbacks", feedbackController.getAllFeedbacks);
adminRoutes.put("/update-feedback/:id", feedbackController.updateFeedbackStatus);
adminRoutes.delete("/delete-feedback/:id", feedbackController.deleteFeedback);


/* =========================
   BLOG MANAGEMENT
========================== */

// Get All Blogs
adminRoutes.get("/get-all-blogs", blogController.getAllBlogs);

// Add New Blog
adminRoutes.post(
  "/add-new-blog",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorPhoto", maxCount: 1 },
  ]),
  blogController.addNewBlog
);

// Edit Blog
adminRoutes.put(
  "/edit-blog/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "authorPhoto", maxCount: 1 },
  ]),
  blogController.editBlog
);

// Delete Blog
adminRoutes.delete("/delete-blog/:id", blogController.deleteBlog);

/* =========================
   EXPORT (ALWAYS LAST)
========================== */
module.exports = adminRoutes;