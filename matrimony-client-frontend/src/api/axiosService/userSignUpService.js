import { axiosInstance } from "../axiosInstance/commonInstance";

export const sendSignUpRequest = async (formData) => {
  const response = await axiosInstance.post(`/user/signup`, { formData });
  return response;
};

export const verifyUser = async (formData) => {
  const response = await axiosInstance.post(`/user/verify-login`, { formData });
  return response;
};

export const sendForgotPasswordRequest = async (emailOrPhone) => {
  const response = await axiosInstance.post(`/user/forgot-password`, {
    emailOrPhone,
  });
  return response;
};

export const verifyOtpRequest = async ({ userId, otp }) => {
  const response = await axiosInstance.post(`/user/verify-otp`, {
    userId,
    otp,
  });
  return response;
};

export const resetPasswordRequest = async ({ newPassword, userId }) => {
  const response = await axiosInstance.post(`/user/save-new-password/${userId}`, {newPassword});
  return response;
};

export const getAllEvents = async () => {
  const  response = await axiosInstance.get(`/user-auth/get-events`);
  return response;
};

export const getAllPublishedBlogs = async () => {
  const response = await axiosInstance.get(`/user-auth/get-blogs`);
  return response;
};