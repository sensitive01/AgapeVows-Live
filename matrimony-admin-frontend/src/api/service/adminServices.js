// import { adminInstance } from "../axiosInstance";

// export const registerAdmin = async () => {
//   const response = await adminInstance.get(`/`);
//   return response;
// };

// export const verifyAdmin = async (loginData) => {
//   const response = await adminInstance.post(`/verify-admin`, { loginData });
//   return response;
// };

// export const getAllUserData = async () => {
//   const response = await adminInstance.get(`/get-all-users`);
//   return response;
// };


// export const getNewRequestedUsers = async () => {
//   const response = await adminInstance.get(`/get-all-new-requested-users`);
//   return response;
// };

// export const approveNewUser = async (userId) => {
//   const response = await adminInstance.put(`/approve-new-user/${userId}`);
//   return response;
// };

// export const getPaidUserData = async () => {
//   const response = await adminInstance.get(`/paid-users-data`);
//   return response;
// };


// export const addNewPlanData = async (planData) => {
//   const response = await adminInstance.post(`/add-new-plan-data`, { planData });
//   return response;
// };
// export const editPlanData = async (planId, planData) => {
//   const response = await adminInstance.put(`/edit-plan-data/${planId}`, { planData });
//   return response;
// };

// export const getAllPlanData = async () => {
//   const response = await adminInstance.get(`/get-all-plan-data`);
//   return response;
// };

// export const changePlanStatus = async (planId, planStatus) => {
//   const response = await adminInstance.put(`/edit-plan-status/${planId}`, { planStatus });
//   return response;
// };

// // Event Services
// export const getAllEvents = async () => {
//   const response = await adminInstance.get(`/get-all-events`);
//   return response;
// };

// export const addNewEvent = async (eventData) => {
//   // eventData should be FormData object
//   const response = await adminInstance.post(`/add-new-event`, eventData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response;
// };

// export const editEvent = async (eventId, eventData) => {
//   const response = await adminInstance.put(`/edit-event/${eventId}`, eventData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });
//   return response;
// };

// export const deleteEventData = async (eventId) => {
//   const response = await adminInstance.delete(`/delete-event/${eventId}`);
//   return response;
// };




// // USER MANAGEMENT SERVICES

// export const deleteUserById = async (userId) => {
//   return await adminInstance.delete(`/delete-user/${userId}`);
// };

// export const getUserById = async (userId) => {
//   return await adminInstance.get(`/get-user/${userId}`);
// };

// export const updateUserById = async (userId, userData) => {
//   return await adminInstance.put(`/update-user/${userId}`, userData);
// };



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
   USER MANAGEMENT
========================== */

// Get All Approved Users
export const getAllUserData = async () => {
  return await adminInstance.get(`/get-all-users`);
};

// Get New Requested Users
export const getNewRequestedUsers = async () => {
  return await adminInstance.get(`/get-all-new-requested-users`);
};

// Approve User
export const approveNewUser = async (userId) => {
  return await adminInstance.put(`/approve-new-user/${userId}`);
};

// Get Paid Users
export const getPaidUserData = async () => {
  return await adminInstance.get(`/paid-users-data`);
};

// Soft Delete User
export const deleteUserById = async (userId) => {
  return await adminInstance.delete(`/delete-user/${userId}`);
};

// Permanent Delete User
export const permanentDeleteUserById = async (userId) => {
  return await adminInstance.delete(`/permanent-delete-user/${userId}`);
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

// 🔥 OPTIONAL – Restore User
export const restoreUserById = async (userId) => {
  return await adminInstance.put(`/restore-user/${userId}`);
};

// Get Single User
export const getUserById = async (userId) => {
  return await adminInstance.get(`/get-user/${userId}`);
};

// Update User
export const updateUserById = async (userId, userData) => {
  return await adminInstance.put(`/update-user/${userId}`, userData);
};

// Verify User ID Proof
export const verifyIdProof = async (userId, status) => {
  return await adminInstance.put(`/verify-id-proof/${userId}`, { status });
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


/* =========================
   PLAN MANAGEMENT
========================== */

export const getAllPlanData = async () => {
  return await adminInstance.get(`/get-all-plan-data`);
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
  return await adminInstance.get(`/get-all-events`);
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
  return await adminInstance.get(`/deleted-users`);
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
    const response = await adminInstance.get(`/get-user-info/${userId}`);
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
  return await adminInstance.get(`/get-all-blogs`);
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
