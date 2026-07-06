import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUser } from "../api/axiosService/userSignUpService";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import LoginPageContent from "../components/new-template/LoginPageContent";
import loginBg from '../assets/images/login-page-bg.png';
import { ShieldCheck, Heart, Lock, Church, User, Eye, EyeOff } from 'lucide-react';
const UserLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    setLoginError("");
  };

  const finishLogin = (userData) => {
    localStorage.setItem("userId", userData.userId);
    if (userData.token) localStorage.setItem("authToken", userData.token);
    if (userData.userName) localStorage.setItem("userName", userData.userName);
    if (userData.gender) localStorage.setItem("gender", userData.gender);
    if (userData.profileImage) localStorage.setItem("userImage", userData.profileImage);
    if (userData.isProfileCompleted !== undefined) {
      localStorage.setItem("isProfileCompleted", String(userData.isProfileCompleted));
    }
    localStorage.setItem("rememberMe", formData.rememberMe.toString());
    sessionStorage.setItem("session_active", "true");

    let redirectPath = location.state?.from || "/user/user-dashboard-page";
    if (location.state?.fromSignUp) {
      redirectPath = "/user/user-profile-edit-page";
    }
    navigate(redirectPath, { replace: true, state: { formData: location.state?.formData } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!formData.emailOrPhone || !formData.password) {
      setLoginError("Please enter both email/phone and password.");
      return;
    }
    
    setIsLoading(true);
    try {
      const payload = {
        email: formData.emailOrPhone,
        password: formData.password,
        rememberMe: formData.rememberMe,
      };
      const response = await verifyUser(payload);
      if (response.status === 200) finishLogin(response.data);
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
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
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row items-center justify-between z-10 relative">

          {/* Left Text Content */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-[#58219f] mb-2 font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
              Welcome Back!
            </h1>
            <p className="text-[#58219f] text-lg font-medium opacity-90 mb-8">
              Sign in to continue your search
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-lg mx-auto lg:mx-0">
              {/* Feature 1 */}
              <div className="flex flex-col items-center lg:items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#f2ecfc] flex items-center justify-center mb-2 text-[#58219f]">
                  <ShieldCheck size={28} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#58219f] mb-1 text-sm sm:text-base">100% Verified Profiles</h4>
                <p className="text-xs sm:text-sm text-[#58219f]/80 leading-relaxed max-w-[200px]">
                  All profiles are Mobile & Govt. ID verified
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center lg:items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#f2ecfc] flex items-center justify-center mb-2 text-[#58219f]">
                  <Heart size={28} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#58219f] mb-1 text-sm sm:text-base">Faith-Based Matching</h4>
                <p className="text-xs sm:text-sm text-[#58219f]/80 leading-relaxed max-w-[200px]">
                  Connect with Christians who share your faith and values.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center lg:items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#f2ecfc] flex items-center justify-center mb-2 text-[#58219f]">
                  <Lock size={28} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#58219f] mb-1 text-sm sm:text-base">Privacy First</h4>
                <p className="text-xs sm:text-sm text-[#58219f]/80 leading-relaxed max-w-[200px]">
                  Your data and conversations are always secure.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center lg:items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#f2ecfc] flex items-center justify-center mb-2 text-[#58219f]">
                  <Church size={28} strokeWidth={1.5} />
                </div>
                <h4 className="font-bold text-[#58219f] mb-1 text-sm sm:text-base">Many Denominations.</h4>
                <p className="text-xs sm:text-sm text-[#58219f]/80 leading-relaxed max-w-[200px]">
                  Find profiles from various Christian denominations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full lg:w-5/12">
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-2xl relative w-full">
              <div className="text-center mb-6">
                <h2 className="text-[28px] sm:text-[32px] font-bold text-[#58219f] font-serif" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Sign in to continue
                </h2>
              </div>

              {loginError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                  <span className="text-sm font-medium text-red-800">{loginError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <div>
                  <label className="block text-xs font-bold text-gray-900 mb-1.5 tracking-wide">Email Address or Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#58219f]">
                      <User size={20} strokeWidth={2} />
                    </div>
                    <input
                      type="text"
                      name="emailOrPhone"
                      value={formData.emailOrPhone}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 bg-white"
                      placeholder="Enter your email or phone"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-900 tracking-wide">Password</label>
                    <Link to="/forgot-password" className="text-xs font-semibold text-[#58219f] hover:text-[#471b80]">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#58219f]">
                      <Lock size={20} strokeWidth={2} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-[#58219f] focus:border-[#58219f] sm:text-sm transition-colors text-gray-800 placeholder-gray-400 bg-white"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#58219f] hover:text-[#471b80]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-2">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#58219f] focus:ring-[#58219f] border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 cursor-pointer">
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-[15px] font-bold text-white bg-[#58219f] hover:bg-[#471b80] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#58219f] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative mt-6 mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-400 font-semibold uppercase">OR</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center pb-0">
                <p className="text-sm text-gray-600 font-medium">
                  Don't have an account?{" "}
                  <Link to="/user/user-sign-up" className="font-bold text-[#58219f] hover:text-[#471b80] transition-colors">
                    Register Now
                  </Link>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
      <LoginPageContent />
      <Footer />
    </div>
  );
};

export default UserLoginPage;
