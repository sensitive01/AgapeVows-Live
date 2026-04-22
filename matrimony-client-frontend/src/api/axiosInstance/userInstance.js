import axios from "axios";

export const userInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_ROUTE}/user-auth`,
});

userInstance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      config.headers["user-id"] = userId; 
    }
    // Add cache control headers to prevent caching of API responses
    config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
    return config;
  },
  (error) => {
    console.log("Error in Axios interceptor request", error);
    return Promise.reject(error);
  }
);

userInstance.interceptors.response.use(
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
