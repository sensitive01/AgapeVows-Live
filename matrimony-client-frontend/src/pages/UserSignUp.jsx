import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { sendSignUpRequest, sendRegistrationOtpRequest, verifyRegistrationOtpRequest } from "../api/axiosService/userSignUpService";
import { showAlert } from "../utils/alertService";
import Swal from "sweetalert2";
import LayoutComponent from "../components/layouts/LayoutComponent";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ExistingUserWarning from "../components/new-template/ExistingUserWarning";
import RegisterPageContent from "../components/new-template/RegisterPageContent";
import { FaRegUser, FaRegEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import registrationBg from '../assets/images/Registration-page-bg.png';

const UserSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [existingUserWarning, setExistingUserWarning] = useState(null);
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [agreeError, setAgreeError] = useState(false);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [mobileOtpValue, setMobileOtpValue] = useState("");
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordErrorMsg(validatePassword(value));
    }
    if (name === "agree") {
      setAgreeError(false);
    }
    if (name === "email") {
    }
  };

  const validatePhone = () => {
    const phoneLength = formData.phone.length;
    if (formData.countryCode === "in" && phoneLength !== 12) return "India number must be 10 digits";
    if (formData.countryCode === "us" && phoneLength !== 11) return "US number must be valid";
    if (phoneLength < 10) return "Invalid phone number";
    if (phoneLength > 15) return "Please enter correct number";
    return "";
  };

  const validatePassword = (password) => {
    if (password.length < 6 || password.length > 14) {
      return "Password must be 6 to 14 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must include at least one special character.";
    }
    return "";
  };

  const handleSendOtp = async () => {
    try {
      setMobileOtpLoading(true);
      const otpResponse = await sendRegistrationOtpRequest('mobile', formData.email, formData.phone);
      if (otpResponse.status === 200) {
        setShowOtpModal(true);
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      const errorMessage = err.response?.data?.message || "Failed to send OTP";

      if (errorMessage.toLowerCase().includes("already registered") || errorMessage.toLowerCase().includes("exists")) {
        const responseData = err.response?.data || {};
        const isMobile = errorMessage.toLowerCase().includes("phone") || errorMessage.toLowerCase().includes("mobile");
        setExistingUserWarning({
          type: isMobile ? "mobile" : "email",
          name: responseData.userName || formData.name || "User",
          connectedContact: responseData.connectedContact || "",
          loginId: isMobile ? formData.phone : formData.email
        });
        return false;
      }

      showAlert({ title: "Error", text: errorMessage, icon: "error" });
      return false;
    } finally {
      setMobileOtpLoading(false);
    }
    return true;
  };

  const handleVerifyAndSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!mobileOtpValue || mobileOtpValue.length < 6) {
      showAlert({ title: "Validation Error", text: "Please enter a valid 6-digit OTP", icon: "warning" });
      return;
    }

    try {
      setOtpVerifyLoading(true);
      const verifyResponse = await verifyRegistrationOtpRequest('mobile', formData.email, formData.phone, mobileOtpValue);
      if (verifyResponse.status === 200) {
        // OTP Verified, proceed to create account
        await createAccount();
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      showAlert({ title: "Error", text: "Invalid or expired OTP", icon: "error" });
    } finally {
      setOtpVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      showAlert({ title: "Validation Error", text: "Please fill in all required fields", icon: "warning" });
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setPasswordErrorMsg(passwordError);
      setLoading(false);
      return;
    }

    if (!formData.agree) {
      setAgreeError(true);
      setLoading(false);
      return;
    }

    const phoneError = validatePhone();
    if (phoneError) {
      showAlert({ title: "Validation Error", text: phoneError, icon: "warning" });
      setLoading(false);
      return;
    }

    // Trigger OTP send process instead of immediately submitting
    await handleSendOtp();
    setLoading(false);
  };

  const createAccount = async () => {
    try {
      setLoading(true);
      const response = await sendSignUpRequest(formData);
      if (response.status === 201) {
        setShowOtpModal(false);
        const userData = response.data;
        if (userData.userId) localStorage.setItem("userId", userData.userId);
        if (userData.token) localStorage.setItem("authToken", userData.token);
        if (userData.userName) localStorage.setItem("userName", userData.userName);
        if (userData.gender) localStorage.setItem("gender", userData.gender);
        if (userData.isProfileCompleted !== undefined) {
          localStorage.setItem("isProfileCompleted", String(userData.isProfileCompleted));
        } else {
          localStorage.setItem("isProfileCompleted", "false");
        }
        sessionStorage.setItem("session_active", "true");

        const navigateToProfileEdit = (stateObj = {}) => {
          navigate(`/user/user-profile-edit-page/${userData.userId}`, {
            replace: true,
            state: stateObj
          });
        };

        // Always pass the state to the Edit Profile page so the Welcome popup shows up
        navigateToProfileEdit({ showWelcomePlan: true });
      }
    } catch (err) {
      console.error("Signup error:", err);
      setShowOtpModal(false);
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";

      if (errorMessage.toLowerCase().includes("already registered") || errorMessage.toLowerCase().includes("exists")) {
        const isMobile = errorMessage.toLowerCase().includes("mobile") || errorMessage.toLowerCase().includes("phone");
        const isEmail = errorMessage.toLowerCase().includes("email");
        let type = "email";
        if (isMobile && isEmail) type = "both";
        else if (isMobile) type = "mobile";

        const responseData = err.response?.data || {};

        setExistingUserWarning({
          type: type,
          name: responseData.userName || formData.name || "User",
          connectedContact: responseData.connectedContact || "",
          loginId: type === "mobile" ? formData.phone : formData.email
        });
        return;
      }

      showAlert({ title: "Error", text: errorMessage, icon: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <LayoutComponent />
      </div>

      <div
        className="flex-grow relative flex items-center pt-[140px] min-h-[90vh]"
        style={{
          backgroundImage: `url(${registrationBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-12 py-12 flex flex-col lg:flex-row items-center justify-between z-10 relative">

          {/* Left Text Content */}
          <div className="w-full lg:w-7/12 mb-12 lg:mb-0 text-left self-start lg:mt-0 lg:pl-12 pr-4">
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[#4a2580] mb-2 leading-snug font-cormorant tracking-normal">
              Begin Your Journey
              with AgapeVows.<br />
              Register for Free.
            </h1>
            <div className="w-16 h-[2px] bg-[#4a2580] mb-3"></div>
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-[#4a2580] mb-2">
                Need help registering?
              </h3>
              <p className="text-[20px] text-[#4a2580] font-normal opacity-90 leading-snug">
                Download our Profile Template <a href="/Profile-template.docx" download="Profile-Template.docx" target="_blank" rel="noopener noreferrer" className="font-semibold underline">here</a>. Complete it with your details and email it along with your latest photos to <a href="mailto:profiles@agapevows.com" className="font-semibold underline">profiles@agapevows.com</a>, or send it to us on WhatsApp at <a href="https://wa.me/919663796699" className="font-semibold underline">+91 96637 96699</a>. Our team will create your profile and help you get started.
              </p>
            </div>

            <h3 className="text-xl font-bold text-[#4a2580] mb-2">
              Your future spouse could be just one click away.
            </h3>
            <p className="text-[#4a2580] text-lg font-normal opacity-90">
              Take the first step today and create<br />your free AgapeVows profile.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:w-4/12 lg:min-w-[450px]">
            <div className="bg-white rounded-[24px] p-10 sm:p-12 shadow-2xl relative w-full">
              <div className="text-center mb-6">
                <h2 className="text-[32px] font-bold text-[#4a2580] font-playfair">Create Your Account</h2>
                <div className="w-16 h-[2px] bg-[#4a2580] mx-auto mt-2"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3" autoComplete="off">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#58219f]">
                      <FaRegUser className="text-lg" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 placeholder:text-[12px] bg-white"
                      placeholder="Enter your full name"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#58219f]">
                      <FaRegEnvelope className="text-lg" />
                    </div>
                    <input
                      type="email"
                      name="registerEmail"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 bg-white"
                      placeholder="Enter your email address"
                      autoComplete="off"
                      required
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Mobile Number</label>
                  <div className="relative flex items-center border border-gray-200 rounded-xl focus-within:ring-1 focus-within:ring-[#58219f] focus-within:border-[#58219f] bg-white overflow-hidden">
                    <div className="pl-4 pr-2 flex items-center pointer-events-none text-[#58219f] border-r border-gray-200 bg-white z-10 h-full">
                      <FaPhoneAlt className="text-md" />
                    </div>
                    <PhoneInput
                      country={"in"}
                      value={formData.phone}
                      onChange={(value, data) => {
                        setFormData({ ...formData, phone: value, countryCode: data?.countryCode || "in" });
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "44px",
                        border: "none",
                        paddingLeft: "48px",
                        fontSize: "14px",
                        outline: "none",
                        boxShadow: "none"
                      }}
                      buttonStyle={{
                        border: "none",
                        backgroundColor: "transparent",
                        paddingLeft: "10px",
                      }}
                      containerStyle={{
                        flex: 1,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5 mt-2 pl-1">
                    <FiInfo className="text-[#58219f] text-[13px]" />
                    <span className="text-[12px] text-[#4a4a4a] font-medium">
                      We will send OTP to this mobile number for verification.
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-1.5">Create Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#58219f]">
                      <FaLock className="text-lg" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="registerPassword"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="block w-full pl-12 pr-12 py-2.5 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 bg-white"
                      placeholder="Choose a secure password"
                      autoComplete="new-password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#58219f] hover:text-[#471b80]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                    </button>
                  </div>
                  {passwordErrorMsg ? (
                    <p className="text-red-500 text-[11px] mt-1 font-semibold leading-relaxed">
                      {passwordErrorMsg}
                    </p>
                  ) : (
                    <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                      Password must be at least 6 - 14 characters long and include an uppercase letter, a number, and a special character.
                    </p>
                  )}
                </div>

                {/* Agree Checkbox */}
                <div className={`flex items-start mt-4 bg-gray-50/50 p-3 rounded-lg ${agreeError ? 'border border-red-300' : ''}`}>
                  <input
                    id="agree"
                    name="agree"
                    type="checkbox"
                    checked={formData.agree}
                    onChange={handleInputChange}
                    className="mt-0.5 h-[18px] w-[18px] min-w-[18px] text-[#58219f] focus:ring-[#58219f] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="agree" className="ml-3 block text-[11.5px] text-gray-600 leading-relaxed cursor-pointer">
                    By creating an account with AgapeVows, you agree to our <a href="#!" className="text-[#58219f] font-bold hover:underline">Terms of Service</a>, and <a href="#!" className="text-[#58219f] font-bold hover:underline">Privacy Policy</a>. AgapeVows is intended strictly for Christian matrimonial purposes only and is not a dating platform.
                  </label>
                </div>
                {agreeError && (
                  <p className="text-red-500 text-[11px] mt-1 font-semibold pl-2">
                    Please accept the terms of service and privacy policy to continue.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 mt-3 py-3 px-4 border border-transparent rounded-xl shadow-md text-[15px] font-bold text-white transition-all bg-[#58219f] hover:bg-[#471b80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58219f]"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaRegUser className="text-lg" />
                      Create Free Account
                    </>
                  )}
                </button>

                {/* Features */}
                <div className="flex justify-center items-center gap-3 text-[10px] sm:text-[11px] text-[#58219f] font-semibold mt-3 flex-wrap">
                  <span className="flex items-center gap-1"><FaCheckCircle className="text-[#58219f] text-xs" /> 100% Verified Profiles</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1">Safe & Private</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="flex items-center gap-1">Faith-Based Community</span>
                </div>

                {/* Divider */}
                <div className="relative mt-2 mb-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-white text-gray-400 font-semibold uppercase">OR</span>
                  </div>
                </div>

                {/* Sign In Link */}
                <div className="text-center pb-0 mt-0">
                  <p className="text-sm text-gray-600 font-medium mb-0">
                    Already have an account?{" "}
                    <Link to="/sign-in" className="font-bold text-[#58219f] hover:text-[#471b80] transition-colors">
                      Sign In
                    </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative animate__animated animate__zoomIn animate__faster w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-[#f4effa] rounded-full flex items-center justify-center mx-auto mb-3">
                <FaPhoneAlt className="text-[#58219f] text-xl" />
              </div>
              <h3 className="text-xl font-bold text-[#4a2580]">Verify Mobile Number</h3>
              <p className="text-sm text-gray-500 mt-2">
                We've sent a 6-digit OTP to <br /><span className="font-semibold text-gray-800">+{formData.phone}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyAndSubmit}>
              <div className="mb-6">
                <input
                  type="text"
                  maxLength="6"
                  value={mobileOtpValue}
                  onChange={(e) => setMobileOtpValue(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 border border-[#d1bcf5] rounded-xl focus:ring-[#58219f] focus:border-[#58219f] text-lg text-center tracking-[0.5em] font-bold"
                  placeholder="XXXXXX"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={otpVerifyLoading || mobileOtpValue.length < 6}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-[15px] font-bold text-white transition-all bg-[#58219f] hover:bg-[#471b80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58219f] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {otpVerifyLoading ? "Verifying..." : "Verify & Create Account"}
              </button>
            </form>

            <div className="text-center mt-5">
              <p className="text-xs text-gray-500">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={mobileOtpLoading}
                className="text-sm text-[#58219f] font-bold hover:underline mt-1"
              >
                {mobileOtpLoading ? "Sending..." : "Resend OTP"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing User Warning Modal */}
      {existingUserWarning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative animate__animated animate__zoomIn animate__faster w-full max-w-lg">
            <ExistingUserWarning
              type={existingUserWarning.type}
              name={existingUserWarning.name}
              connectedContact={existingUserWarning.connectedContact}
              loginId={existingUserWarning.loginId}
              onTryAnotherWay={() => setExistingUserWarning(null)}
            />
          </div>
        </div>
      )}

      <RegisterPageContent />
      <Footer />
    </div>
  );
};

export default UserSignUp;