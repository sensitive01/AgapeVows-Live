import axios from "axios";

export const adminInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_ROUTE}/admin`,
});

adminInstance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      config.headers["user-id"] = userId;
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
