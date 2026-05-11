const express = require("express");
const userSignupRoutes = express.Router();
const userSignupController = require("../../controller/userController/userSignupController")

userSignupRoutes.post("/signup",userSignupController.saveSignUpData)
userSignupRoutes.post("/send-registration-otp", userSignupController.sendRegistrationOtp);
userSignupRoutes.post("/verify-registration-otp", userSignupController.verifyRegistrationOtp);
userSignupRoutes.post("/verify-login",userSignupController.verifyLogin)
userSignupRoutes.post("/forgot-password",userSignupController.userForgotPassword)
userSignupRoutes.post("/verify-otp",userSignupController.userVerifyOtp)
userSignupRoutes.post("/save-new-password/:userId",userSignupController.saveNewPassword)









module.exports = userSignupRoutes;