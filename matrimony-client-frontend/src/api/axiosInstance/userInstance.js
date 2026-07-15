import axios from "axios";

export const userInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_ROUTE}/user-auth`,
});

userInstance.interceptors.request.use(
  (config) => {
    const userId = localStorage.getItem("userId");
    const authToken = localStorage.getItem("authToken");

    // CRITICAL FIX: Block invalid API requests
    if (config.url && (config.url.includes("/null") || config.url.includes("/undefined"))) {
      // Return a dummy resolved promise to avoid crashing frontend components without try-catch
      return Promise.reject({
        response: { 
          status: 400,
          data: { success: false, message: "Invalid user ID" }
        },
        message: "Invalid user ID intercepted"
      });
    }

    if (userId && userId !== "null" && userId !== "undefined") {
      config.headers["user-id"] = userId; 
    }
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
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
