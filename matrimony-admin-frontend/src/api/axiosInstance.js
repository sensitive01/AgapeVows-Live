import axios from "axios";

export const adminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_ROUTE}/admin`,
});

adminInstance.interceptors.request.use(
  (config) => {
    const adminId = localStorage.getItem("adminId");
    const adminToken = localStorage.getItem("adminToken");
    if (adminId) {
      config.headers["admin-id"] = adminId;
    }
    if (adminToken) {
      config.headers["Authorization"] = `Bearer ${adminToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

adminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("Error in Axios interceptor response", error);
    } else {
      console.log("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
