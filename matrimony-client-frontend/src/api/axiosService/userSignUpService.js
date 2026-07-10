import { axiosInstance } from "../axiosInstance/commonInstance";

export const sendSignUpRequest = async (formData) => {
  const response = await axiosInstance.post(`/user/signup`, { formData });
  return response;
};

export const sendRegistrationOtpRequest = async (type, email, phone) => {
  const response = await axiosInstance.post(`/user/send-registration-otp`, { type, email, phone });
  return response;
};

export const verifyRegistrationOtpRequest = async (type, email, phone, otp) => {
  const response = await axiosInstance.post(`/user/verify-registration-otp`, { type, email, phone, otp });
  return response;
};

export const verifyUser = async (formData) => {
  const response = await axiosInstance.post(`/user/verify-login`, { formData });
  return response;
};

export const sendForgotPasswordRequest = async (data) => {
  const response = await axiosInstance.post(`/user/forgot-password`, data);
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
export const sendLoginOtpRequest = async (emailOrPhone) => {
  const response = await axiosInstance.post(`/user/send-login-otp`, { emailOrPhone });
  return response;
};

export const verifyLoginOtpRequest = async ({ userId, otp }) => {
  const response = await axiosInstance.post(`/user/verify-login-otp`, { userId, otp });
  return response;
};
