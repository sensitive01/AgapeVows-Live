import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { verifyUser } from "../api/axiosService/userSignUpService";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import LoginPageContent from "../components/new-template/LoginPageContent";

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

      <div className="flex-grow flex pt-[72px]"> {/* Adjust for fixed header */}
        
        {/* Left Side - Image & Trust Indicators */}
        <div className="hidden lg:flex w-1/2 relative bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1544592433-f72beba2c140?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
            alt="Christian Wedding" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent"></div>
          
          <div className="relative z-10 p-16 flex flex-col justify-end h-full text-white">
            <h1 className="text-5xl font-bold mb-6 font-serif leading-tight text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Find Your Soulmate <br/> in Christ
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md leading-relaxed">
              Join the most trusted Christian matrimony platform. Over 25 years of building Christ-centered families. Let us help you find the one God has prepared for you.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/20 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">100% Verified</h4>
                  <p className="text-xs text-gray-300">Genuine Profiles</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">2M+ Success</h4>
                  <p className="text-xs text-gray-300">Happy Marriages</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Privacy 1st</h4>
                  <p className="text-xs text-gray-300">Secure Data</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold text-white">Global Reach</h4>
                  <p className="text-xs text-gray-300">Worldwide Matches</p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:bg-black/30 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
              </div>
              <div className="flex items-center gap-4 mb-3 relative z-10">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Sarah & John" className="w-14 h-14 rounded-full border-2 border-white/30 object-cover" />
                <div>
                  <h4 className="font-bold text-white text-lg">Sarah & John</h4>
                  <p className="text-xs font-semibold text-purple-200 tracking-wider uppercase">Married May 2025</p>
                </div>
              </div>
              <p className="text-sm italic text-gray-100 relative z-10 leading-relaxed">
                "We met here and instantly connected over our shared faith. God's timing is truly perfect. Highly recommended for any Christian seeking a life partner!"
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500">Sign in to your account to continue</p>
            </div>

            {loginError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm font-medium text-red-800">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address or Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                  </div>
                  <input
                    type="text"
                    name="emailOrPhone"
                    value={formData.emailOrPhone}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                    placeholder="Enter your email or phone"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <Link to="/forgot-password" className="text-sm font-semibold text-purple-600 hover:text-purple-500">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {showPassword ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      )}
                      {!showPassword && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />}
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link to="/user/user-sign-up" className="font-bold text-purple-600 hover:text-purple-500">
                  Register Now
                </Link>
              </p>
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
