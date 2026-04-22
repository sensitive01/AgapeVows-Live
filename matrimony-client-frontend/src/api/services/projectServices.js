import { projectServices } from "../axios/axiosInstance";

export const registerEmployee = async (employeeData) => {
  try {
    const response = await projectServices.post("/signup", employeeData);
    return response;
  } catch (err) {
    throw err;
  }
};
export const changeUserPassword = async (userId, newPassword) => {
  try {
    const response = await projectServices.put(
      `/api/user/reset-password/${userId}`,
      {
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Change password error:", error);
    throw error.response?.data || error;
  }
};


export const loginEmployee = async (loginData) => {
  try {
    const response = await projectServices.post("/login", loginData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loginSchool = async (loginData) => {
  try {
    const response = await projectServices.post("/employer/loginweb", loginData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getEmployeeDetails = async (employeeId, token) => {
  try {
    const response = await projectServices.get(`/fetchemployee/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error;
  }
};

export const updateEmployeeProfile = async (id, data, token) => {
  try {
    const response = await projectServices.put(`/updateprofile/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update employee profile"
    );
  }
};

export const uploadEmployeeFile = async (id, formData, fileType, token) => {
  try {
    const response = await projectServices.put(
      `/uploadfile/${id}?fileType=${fileType}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to upload employee file"
    );
  }
};

export const getEmployeerDetails = async (employeerId, token) => {
  try {
    const response = await projectServices.get(
      `/employer/fetchemployer/${employeerId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching employee details:", error);
    throw error;
  }
};

export const updateEmployerDetails = async (id, data, token) => {
  try {
    const response = await projectServices.put(
      `/employer/updateemployer/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update employer details"
    );
  }
};

export const uploadProfilePicture = async (id, formData, token) => {
  try {
    const response = await projectServices.put(
      `/employer/uploadprofilepic/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update employer details"
    );
  }
};

export const postJob = async (jobData) => {
  try {
    const response = await projectServices.post("/job", jobData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message ||
                        error.message ||
                        'Failed to post job. Please try again.';
    throw new Error(errorMessage);
  }
};

export const getAllEvents = async () => {
  try {
    const response = await projectServices.get("/admin/get-all-events");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getMyEvents = async (userId) => {
  try {
    const response = await projectServices.get(`/employer/getmyevents/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const getEventDetails = async (eventId) => {
  try {
    const response = await projectServices.get(`/employer/details/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(
      `/employer/updateevent/${eventId}`,
      eventData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};
export const registerForEvent = async (eventId, registrationData) => {
  try {
    const response = await projectServices.post(
      `/employer/events/${eventId}/registerevents`,
      registrationData, // Send as JSON
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const registerEmployerAdmin = async (adminData) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employeradminsignup",
      adminData
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const loginEmployerAdmin = async (credentials) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employerloginAdmin",
      {
        employeradminEmail: credentials.email,
        employeradminPassword: credentials.password,
      }
    );

    return {
      token: response.data.token,
      admin: response.data.admin,
    };
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const ForgotPasswordEmployerAdmin = async (employeradminEmail) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employeradminforgotpassword",
      {
        employeradminEmail,
      }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const VerifyOtpEmployerAdmin = async (email, otp) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employeradminverifyotp",
      {
        employeradminEmail: email,
        otp,
      }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const ResendEmployerAdminOTP = async (employeradminEmail) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employeradminforgotpassword",
      {
        employeradminEmail,
      }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const ChangePasswordEmployerAdmin = async (
  email,
  password,
  confirmPassword
) => {
  try {
    const response = await projectServices.post(
      "/employeradmin/employeradminchangepassword",
      {
        employeradminEmail: email,
        password,
        confirmPassword,
      }
    );
    return response.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

export const fetchEmployerAdminProfile = async (id) => {
  try {
    const response = await projectServices.get(
      `/employeradmin/fetchprofile/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("EmployerAdminToken")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const changePassword = async ({
  userId,
  currentPassword,
  newPassword,
}) => {
  try {
    const response = await projectServices.put(
      `/employeee-change-password/${userId}`,
      {
        currentPassword,
        newPassword,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const verifyTheUserExistOrNot = async (email) => {
  try {
    const response = await projectServices.get(
      `/verify-the-candidate-register-or-not/${email}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getJobAndEmployerCount = async () => {
  try {
    const response = await projectServices.get(
      `/employer/get-job-and-employer-count`
    );
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};


export const getEmployerDashboardData = async (employerId) => {
  try {
    const response = await projectServices.get(
      `/employer/get-employer-dashnoard-count/${employerId}`
    );
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};




export const registerEventEmployee = async (participantId,mobileNumber,eventId,status) => {
  try {
    const response = await projectServices.post(
      `/employer/events/${eventId}/registereventsemployee/${participantId}`,{mobileNumber,status}
    );
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getHeaderStaticsData = async () => {
  try {
    const response = await projectServices.get(
      `/get-header-categories-count`
    );
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getIsEmployerSubscribed = async (employerId) => {
  try {
    const response = await projectServices.get(
      `/employer/get-is-employer-subscribed/${employerId}`
    );
    return response;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};