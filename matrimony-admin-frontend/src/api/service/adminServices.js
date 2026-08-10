import { adminInstance } from "../axiosInstance";

/* =========================
   ADMIN AUTH
========================== */

export const registerAdmin = async () => {
  return await adminInstance.get(`/`);
};

export const verifyAdmin = async (loginData) => {
  return await adminInstance.post(`/verify-admin`, { loginData });
};

/* =========================
   SUBADMIN MANAGEMENT
========================== */
export const getAdminProfile = async (id) => {
  return await adminInstance.get(`/get-admin-profile/${id}?t=${new Date().getTime()}`);
};

export const updateAdminProfile = async (id, data) => {
  return await adminInstance.put(`/update-admin-profile/${id}`, data);
};

export const createSubadmin = async (data) => {
  return await adminInstance.post(`/create-subadmin`, data);
};

export const getAllSubadmins = async () => {
  return await adminInstance.get(`/get-all-subadmins?t=${new Date().getTime()}`);
};

export const updateSubadmin = async (id, data) => {
  return await adminInstance.put(`/update-subadmin/${id}`, data);
};

export const deleteSubadmin = async (id) => {
  return await adminInstance.delete(`/delete-subadmin/${id}`);
};

/* =========================
   MASTER DATA MANAGEMENT
========================== */
export const getAllMasterData = async () => {
  return await adminInstance.get(`/get-all-master-data?t=${new Date().getTime()}`);
};

export const addMasterData = async (data) => {
  return await adminInstance.post(`/add-master-data`, data);
};

export const updateMasterData = async (id, data) => {
  return await adminInstance.put(`/update-master-data/${id}`, data);
};


/* =========================
   USER MANAGEMENT
========================== */

// Get All Approved Users
export const getAllUserData = async () => {
  return await adminInstance.get(`/get-all-users?t=${new Date().getTime()}`);
};


// Get Paid Users
export const getPaidUserData = async () => {
  return await adminInstance.get(`/paid-users-data?t=${new Date().getTime()}`);
};

// Soft Delete User
export const deleteUserById = async (userId) => {
  return await adminInstance.delete(`/delete-user/${userId}`);
};

// Permanent Delete User
export const permanentDeleteUserById = async (userId) => {
  return await adminInstance.delete(`/permanent-delete-user/${userId}`);
};

// Deactivate User
export const deactivateUserById = async (userId) => {
  return await adminInstance.put(`/deactivate-user/${userId}`);
};

// Remove User Subscription
export const removeUserSubscription = async (userId) => {
  return await adminInstance.put(`/remove-subscription/${userId}`);
};

// Upgrade User Plan Manually
export const upgradeUserPlan = async (userId, planData) => {
  return await adminInstance.put(`/upgrade-plan/${userId}`, { plan: planData });
};

// Email User Invoice
export const emailUserInvoice = async (userId) => {
  return await adminInstance.post(`/email-invoice/${userId}`);
};

// OPTIONAL – Restore User
export const restoreUserById = async (userId) => {
  return await adminInstance.put(`/restore-user/${userId}`);
};

// Get Single User
export const getUserById = async (userId) => {
  return await adminInstance.get(`/get-user/${userId}?t=${new Date().getTime()}`);
};

// Update User
export const updateUserById = async (userId, userData) => {
  return await adminInstance.put(`/update-user/${userId}`, userData);
};

// Verify User ID Proof
export const verifyIdProof = async (userId, status) => {
  return await adminInstance.put(`/verify-id-proof/${userId}`, { status });
};

// Get Unverified ID Users
export const getUnverifiedIdUsers = async () => {
  return await adminInstance.get(`/get-unverified-id-users?t=${new Date().getTime()}`);
};

// Get Verified ID Users
export const getVerifiedIdUsers = async () => {
  return await adminInstance.get(`/get-verified-id-users?t=${new Date().getTime()}`);
};

// Toggle User Restriction
export const toggleUserRestrictionAPI = async (userId, isRestricted) => {
  return await adminInstance.put(`/toggle-restriction/${userId}`, { isRestricted });
};

// Verify Mobile Phone
export const verifyMobile = async (userId, isVerified) => {
  return await adminInstance.put(`/verify-mobile/${userId}`, { isVerified });
};

// Register Single User (Admin)
export const registerUserByAdmin = async (userData) => {
  return await adminInstance.post(`/register-user`, userData);
};

// Bulk Register Users (Admin)
export const bulkRegisterUsersByAdmin = async (users) => {
  return await adminInstance.post(`/bulk-register-users`, { users });
};

// Export All Users
export const exportUsersData = async () => {
  return await adminInstance.get(`/export-users`, {
    responseType: "blob",
  });
};

// Upload ID Proof
export const uploadIdProofByAdmin = async (userId, formData) => {
  return await adminInstance.post(`/upload-id-proof/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Upload User Images (Profile + Additional)
export const uploadUserImagesAdmin = async (userId, formData) => {
  return await adminInstance.post(`/upload-user-images/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* =========================
   PLAN MANAGEMENT
========================== */

export const getAllPlanData = async () => {
  return await adminInstance.get(`/get-all-plan-data?t=${new Date().getTime()}`);
};

export const addNewPlanData = async (planData) => {
  return await adminInstance.post(`/add-new-plan-data`, { planData });
};

export const editPlanData = async (planId, planData) => {
  return await adminInstance.put(`/edit-plan-data/${planId}`, { planData });
};

export const changePlanStatus = async (planId, planStatus) => {
  return await adminInstance.put(`/edit-plan-status/${planId}`, { planStatus });
};


/* =========================
   EVENT MANAGEMENT
========================== */

export const getAllEvents = async () => {
  return await adminInstance.get(`/get-all-events?t=${new Date().getTime()}`);
};

export const addNewEvent = async (eventData) => {
  return await adminInstance.post(`/add-new-event`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const editEvent = async (eventId, eventData) => {
  return await adminInstance.put(`/edit-event/${eventId}`, eventData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteEventData = async (eventId) => {
  return await adminInstance.delete(`/delete-event/${eventId}`);
};

export const getDeletedUsers = async () => {
  return await adminInstance.get(`/deleted-users?t=${new Date().getTime()}`);
};

export const getDeactivatedUsers = async () => {
  return await adminInstance.get(`/deactivated-users?t=${new Date().getTime()}`);
};

// Delete Additional Images (Admin)
export const deleteAdditionalImagesByAdmin = async (userId, imagesToDelete) => {
  try {
    const response = await adminInstance.post(
      `/delete-additional-images/${userId}`,
      { imagesToDelete }
    );
    return response;
  } catch (error) {
    console.error("Admin: Error deleting additional images:", error);
    throw error;
  }
};

// Get User Info (Admin)
export const getUserInfoByAdmin = async (userId) => {
  try {
    const response = await adminInstance.get(`/get-user-info/${userId}?t=${new Date().getTime()}`);
    return response;
  } catch (error) {
    console.error("Admin: Error fetching user info:", error);
    throw error;
  }
};

// Save Personal Info (Admin)
export const savePersonalInfoByAdmin = async (formData, userId) => {
  try {
    const response = await adminInstance.post(
      `/complete-profile-data/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Admin: Error saving personal info:", error);
    throw error;
  }
};

/* =========================
   BLOG MANAGEMENT
========================== */

// Get All Blogs
export const getAllBlogs = async () => {
  return await adminInstance.get(`/get-all-blogs?t=${new Date().getTime()}`);
};

// Add New Blog
export const addNewBlog = async (blogData) => {
  // blogData must be FormData (image upload irundha)
  return await adminInstance.post(`/add-new-blog`, blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Edit Blog
export const editBlog = async (blogId, blogData) => {
  return await adminInstance.put(`/edit-blog/${blogId}`, blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete Blog
export const deleteBlog = async (blogId) => {
  return await adminInstance.delete(`/delete-blog/${blogId}`);
};


/* =========================
   ISSUE MANAGEMENT
========================== */

// Get All Issues
export const getAllIssues = async () => {
  return await adminInstance.get(`/get-all-issues`);
};

// Update Issue (status + reply)
export const updateIssue = async (issueId, data) => {
  return await adminInstance.put(`/update-issue/${issueId}`, data);
};

export const deleteIssue = (id) => {
  return adminInstance.delete(`/delete-issue/${id}`);
};


export const getAllEnquiries = async () => {
  return await adminInstance.get(`/get-all-enquiries`);
};

// Delete Enquiry
export const deleteEnquiry = async (id) => {
  return await adminInstance.delete(`/delete-enquiry/${id}`);
};

// Update Enquiry
export const updateEnquiry = async (id, data) => {
  return await adminInstance.put(`/update-enquiry/${id}`, data);
};


/* =========================
   FEEDBACK MANAGEMENT
========================== */

// Get All Feedbacks
export const getAllFeedbacks = async () => {
  return await adminInstance.get(`/get-all-feedbacks`);
};

// Update Feedback Status
export const updateFeedback = async (id, data) => {
  return await adminInstance.put(`/update-feedback/${id}`, data);
};

// Delete Feedback
export const deleteFeedback = async (id) => {
  return await adminInstance.delete(`/delete-feedback/${id}`);
};

/* =========================
   REPORT MANAGEMENT
========================== */

// Get All Reports
export const getAllReports = async () => {
  return await adminInstance.get(`/get-all-reports`);
};

// Update Report Status
export const updateReportStatus = async (reportId, data) => {
  return await adminInstance.put(`/update-report/${reportId}`, data);
};

/* =========================
   CONTACT UPDATE REQUESTS
========================== */

export const getContactUpdateRequests = async () => {
  return await adminInstance.get(`/contact-update-requests`);
};

export const approveContactUpdate = async (userId) => {
  return await adminInstance.put(`/approve-contact-update/${userId}`);
};

export const rejectContactUpdate = async (userId) => {
  return await adminInstance.put(`/reject-contact-update/${userId}`);
};
