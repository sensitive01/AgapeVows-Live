import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { sendSignUpRequest, sendRegistrationOtpRequest, verifyRegistrationOtpRequest } from "../api/axiosService/userSignUpService";
import { showAlert, showOtpAlert } from "../utils/alertService";
import LayoutComponent from "../components/layouts/LayoutComponent";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ExistingUserWarning from "../components/new-template/ExistingUserWarning";
import RegisterPageContent from "../components/new-template/RegisterPageContent";
import { FaRegUser, FaRegEnvelope, FaPhoneAlt, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "password") {
      setPasswordErrorMsg(validatePassword(value));
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
      showAlert({ title: "Validation Error", text: "Please accept the terms and conditions", icon: "warning" });
      setLoading(false);
      return;
    }

    const phoneError = validatePhone();
    if (phoneError) {
      showAlert({ title: "Validation Error", text: phoneError, icon: "warning" });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const otpResponse = await sendRegistrationOtpRequest(formData.email, formData.phone);

      if (otpResponse.status === 200) {
        setLoading(false);
        const otp = await showOtpAlert({ text: `A 4-digit OTP has been sent to ${formData.email}` });
        if (!otp) return;

        setLoading(true);
        const verifyResponse = await verifyRegistrationOtpRequest(formData.email, otp);

        if (verifyResponse.status === 200) {
          const response = await sendSignUpRequest(formData);
          if (response.status === 201) {
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

            showAlert({ title: "Success", text: response.data.message || "Account created successfully!", icon: "success" });
            setTimeout(() => {
              navigate(`/user/user-profile-edit-page/${userData.userId}`, { replace: true });
            }, 1500);
          }
        }
      }
    } catch (err) {
      console.error("Signup error:", err);
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
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center justify-between z-10 relative">

          {/* Left Text Content */}
          <div className="w-full lg:w-5/12 mb-12 lg:mb-0 text-left self-start lg:mt-0">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#4a2580] mb-8 leading-[1.1] tracking-tight font-cormorant">
              Begin Your Journey<br />
              with AgapeVows.<br />
              Register for Free.
            </h1>
            <div className="w-16 h-[2px] bg-[#4a2580] mb-8"></div>
            <h3 className="text-xl font-bold text-[#4a2580] mb-3">
              Your future spouse could be just one click away.
            </h3>
            <p className="text-[#4a2580] text-lg font-normal opacity-90">
              Take the first step today and create<br />your free AgapeVows profile.
            </p>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl relative w-full">
              <div className="text-center mb-6">
                <h2 className="text-[32px] font-bold text-[#4a2580] font-playfair">Create Your Account</h2>
                <div className="w-16 h-[2px] bg-[#4a2580] mx-auto mt-2"></div>
              </div>

              {existingUserWarning ? (
                <ExistingUserWarning
                  type={existingUserWarning.type}
                  name={existingUserWarning.name}
                  connectedContact={existingUserWarning.connectedContact}
                  loginId={existingUserWarning.loginId}
                  onTryAnotherWay={() => setExistingUserWarning(null)}
                />
              ) : (
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
                        className="block w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 bg-white"
                        placeholder="Enter your full name as it appears on your government issued ID"
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
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
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
                    <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#58219f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      We will send OTP to this mobile number for verification
                    </p>
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
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
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
                  <div className="flex items-start mt-4 bg-gray-50/50 p-2.5 rounded-lg">
                    <input
                      id="agree"
                      name="agree"
                      type="checkbox"
                      checked={formData.agree}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 text-[#58219f] focus:ring-[#58219f] border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="agree" className="ml-3 block text-[11.5px] text-gray-600 leading-relaxed cursor-pointer">
                      By creating an account with AgapeVows, you agree to our <a href="#!" className="text-[#58219f] font-bold hover:underline">Terms of Service</a>, and <a href="#!" className="text-[#58219f] font-bold hover:underline">Privacy Policy</a>. AgapeVows is intended strictly for Christian matrimonial purposes only and is not a dating platform.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 mt-3 py-3 px-4 border border-transparent rounded-xl shadow-md text-[15px] font-bold text-white bg-[#58219f] hover:bg-[#471b80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58219f] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
                  <div className="relative mt-5 mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-3 bg-white text-gray-400 font-semibold uppercase">OR</span>
                    </div>
                  </div>

                  {/* Sign In Link */}
                  <div className="text-center pb-0">
                    <p className="text-sm text-gray-600 font-medium">
                      Already have an account?{" "}
                      <Link to="/user/user-login" className="font-bold text-[#58219f] hover:text-[#471b80] transition-colors">
                        Sign In
                      </Link>
                    </p>
                  </div>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
      <RegisterPageContent />
      <Footer />
    </div>
  );
};

export default UserSignUp;