import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { verifyUser, sendLoginOtpRequest, verifyLoginOtpRequest } from "../api/axiosService/userSignUpService";
import { showAlert } from "../utils/alertService";
import LayoutComponent from "../components/layouts/LayoutComponent";

const UserLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const firstOtpInputRef = useRef(null);

  // activeView can be: 'choose_method', 'email_otp_entry', 'password_entry', 'otp_verification'
  const [activeView, setActiveView] = useState("choose_method");
  const [loginMode, setLoginMode] = useState("email_otp"); // internal tracking for OTP length/API
  
  const [formData, setFormData] = useState({
    emailOrPhone: "91",
    password: "",
    rememberMe: false,
    otp: ["", "", "", "", "", ""],
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [userId, setUserId] = useState(null); 
  
  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0 && activeView === "otp_verification") {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, activeView]);

  // Focus first OTP input when step changes
  useEffect(() => {
    if (activeView === "otp_verification" && firstOtpInputRef.current) {
      setTimeout(() => {
        firstOtpInputRef.current.focus();
      }, 100);
    }
  }, [activeView]);



  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleOtpChange = (index, value) => {
    const maxDigits = 4;
    
    if (value.length > 1 && /^\d+$/.test(value)) {
       const digits = value.split("").slice(0, maxDigits);
       const newOtp = [...formData.otp];
       digits.forEach((d, i) => { if(index + i < newOtp.length) newOtp[index + i] = d; });
       setFormData({ ...formData, otp: newOtp });
       const nextIndex = Math.min(index + digits.length, maxDigits - 1);
       const nextInput = document.getElementById(`otp-${nextIndex}`);
       if (nextInput) nextInput.focus();
       return;
    }

    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prevState) => ({ ...prevState, otp: newOtp }));
      if (value && index < maxDigits - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDisplayNumber = (number, mode) => {
    return number;
  };

  const switchView = (view, mode) => {
    setActiveView(view);
    if(mode) setLoginMode(mode);
    setLoginError("");
    setSuccessMsg("");
    setErrors({});
    const otpArray = ["", "", "", ""];
    
    let defaultEmailOrPhone = formData.emailOrPhone;
    if (view === "email_otp_entry" || view === "password_entry") {
      // Clear it if switching to an email field and it currently holds a phone number
      if (!defaultEmailOrPhone.includes("@")) {
         defaultEmailOrPhone = "";
      }
    }

    setFormData({ ...formData, emailOrPhone: defaultEmailOrPhone, password: "", otp: otpArray });
  };

  const finishLogin = (userData) => {
    localStorage.setItem("userId", userData.userId);
    if (userData.token) localStorage.setItem("authToken", userData.token);
    if (userData.userName) localStorage.setItem("userName", userData.userName);
    if (userData.gender) localStorage.setItem("gender", userData.gender);
    if (userData.profileImage) localStorage.setItem("userImage", userData.profileImage);
    localStorage.setItem("rememberMe", formData.rememberMe.toString());
    sessionStorage.setItem("session_active", "true");

    const redirectPath = location.state?.from || "/user/user-dashboard-page";
    navigate(redirectPath, { replace: true, state: { formData: location.state?.formData } });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    if (!formData.emailOrPhone || !formData.password) {
      setLoginError("Please enter both email and password.");
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
      setLoginError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async (e) => {
    if(e) e.preventDefault();
    setLoginError("");
    setSuccessMsg("");
    if (!formData.emailOrPhone) {
      setLoginError("Please enter your details.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await sendLoginOtpRequest(formData.emailOrPhone);
      if (response.data && response.data.success) {
        setUserId(response.data.userId);
        setActiveView("otp_verification");
        setTimer(60);
        setCanResend(false);
        setFormData((prev) => ({ ...prev, otp: ["", "", "", ""] }));
      } else {
         setLoginError(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      setLoginError(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoginError("");
    const otpString = formData.otp.join("");
    const requiredLength = 4;

    if (otpString.length !== requiredLength) {
      setLoginError(`Please enter the complete ${requiredLength}-digit OTP`);
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyLoginOtpRequest({ userId, otp: otpString });
      if (response.data && response.data.success) finishLogin(response.data);
    } catch (error) {
      console.error("Verify OTP error:", error);
      setLoginError(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- SVGs ---
  const BackIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );



  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 6L12 13L2 6" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const PasswordIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 12H22M18 14H20M18 10H20" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const SupportIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 14V11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11V14" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 14H8V17H6V14ZM16 14H18V17H16V14Z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17Z" fill="#7c3aed"/>
    </svg>
  );

  return (
    <div className="min-h-screen" style={{ background: "#fcfcfc" }}>
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pb-12 px-4 flex justify-center" style={{ minHeight: "calc(100vh - 80px)", paddingTop: "140px" }}>
        
        <style>{`
          .login-card {
            background: #ffffff;
            width: 100%;
            max-width: 480px;
            border-radius: 12px;
            padding: 40px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.06);
            border: 1px solid #f0f0f0;
          }
          .login-card h2 {
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 8px;
            font-family: 'Inter', sans-serif;
          }
          .login-card p.subtitle {
            font-size: 15px;
            color: #666;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          .input-group-custom {
            display: flex;
            align-items: center;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            overflow: hidden;
            margin-bottom: 20px;
            background: #fff;
            transition: border-color 0.2s;
          }
          .input-group-custom:focus-within {
            border-color: #7c3aed;
          }
          .input-group-custom .prefix {
            padding: 14px 16px;
            background: #fff;
            color: #333;
            font-weight: 500;
            border-right: 1px solid #e0e0e0;
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .input-group-custom input {
            flex: 1;
            padding: 14px 16px;
            border: none;
            outline: none;
            font-size: 15px;
            color: #333;
          }
          .btn-primary-custom {
            width: 100%;
            padding: 14px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
          }
          .btn-primary-custom.disabled {
            background: #f0f0f0;
            color: #a0a0a0;
            cursor: not-allowed;
          }
          .btn-primary-custom.active {
            background: #f3f4f6;
            color: #d1d5db;
          }
          .btn-primary-custom.active.ready {
            background: #7c3aed;
            color: #ffffff;
          }
          .btn-primary-custom.active.ready:hover {
            background: #6d28d9;
          }
          .try-another-way {
            text-align: center;
            margin-top: 24px;
          }
          .try-another-way a {
            color: #7c3aed;
            text-transform: uppercase;
            font-weight: 600;
            font-size: 14px;
            text-decoration: underline;
            text-decoration-thickness: 1px;
            text-underline-offset: 4px;
            cursor: pointer;
          }
          .try-another-way a:hover {
            color: #6d28d9;
          }
          
          /* Choose Method Styles */
          .back-button {
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            margin-bottom: 24px;
            transition: background 0.2s;
          }
          .back-button:hover {
            background: #f8f9fa;
          }
          .method-list {
            display: flex;
            flex-direction: column;
            gap: 0;
            margin-top: 10px;
            border-top: 1px solid #f0f0f0;
          }
          .method-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 20px 0;
            border-bottom: 1px solid #f0f0f0;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .method-item:hover {
            opacity: 0.7;
          }
          .method-item span.title {
            font-size: 16px;
            color: #1a1a1a;
            font-weight: 500;
          }
          .method-item p.desc {
            font-size: 13px;
            color: #888;
            margin: 2px 0 0 0;
          }
          
          /* OTP Styles */
          .otp-inputs {
            display: flex;
            gap: 12px;
            justify-content: center;
            margin-bottom: 24px;
          }
          .otp-input {
            width: 48px;
            height: 56px;
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: #fff;
            outline: none;
            transition: all 0.2s;
            color: #333;
          }
          .otp-input:focus {
            border-color: #7c3aed;
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
          }
          
          /* Standard Input (Email/Password) */
          .standard-input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            outline: none;
            font-size: 15px;
            margin-bottom: 20px;
            transition: border-color 0.2s;
          }
          .standard-input:focus {
            border-color: #7c3aed;
          }

        `}</style>

        <div className="login-card">

           {loginError && (
              <div style={{ padding: "12px", background: "#fee2e2", color: "#dc2626", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                {loginError}
              </div>
            )}
            
            {successMsg && (
              <div style={{ padding: "12px", background: "#dcfce7", color: "#16a34a", borderRadius: "8px", marginBottom: "20px", fontSize: "14px" }}>
                {successMsg}
              </div>
            )}



            {activeView === "choose_method" && (
              <div>

                <h2>Choose Your Sign-in Method</h2>
                <p className="subtitle">Pick the option that works best for you.</p>
                
                <div className="method-list">

                  <div className="method-item" onClick={() => switchView('email_otp_entry', 'email_otp')}>
                    <EmailIcon />
                    <div>
                      <span className="title">Get OTP Via Email</span>
                    </div>
                  </div>
                  <div className="method-item" onClick={() => switchView('password_entry', 'email_password')}>
                    <PasswordIcon />
                    <div>
                      <span className="title">Login with Password</span>
                    </div>
                  </div>
                  <div className="method-item" onClick={() => navigate('/contact-page')}>
                    <SupportIcon />
                    <div>
                      <span className="title">Get Support</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeView === "email_otp_entry" && (
              <form onSubmit={(e) => { e.preventDefault(); handleSendOtp(); }}>
                <button type="button" className="back-button" onClick={() => switchView('choose_method')}>
                  <BackIcon />
                </button>
                <h2>Login with Email</h2>
                <p className="subtitle">Please enter your email to receive a secure OTP</p>
                
                <input 
                  type="email" 
                  className="standard-input"
                  placeholder="Email Address" 
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  autoFocus
                />
                
                <button 
                  type="submit"
                  disabled={!formData.emailOrPhone || !formData.emailOrPhone.includes('@') || isLoading}
                  className={`btn-primary-custom ${(formData.emailOrPhone && formData.emailOrPhone.includes('@') && !isLoading) ? 'active ready' : 'disabled'}`}
                >
                  {isLoading ? "SENDING..." : "GET OTP"}
                </button>
              </form>
            )}

            {activeView === "password_entry" && (
              <form onSubmit={handlePasswordSubmit}>
                <button type="button" className="back-button" onClick={() => switchView('choose_method')}>
                  <BackIcon />
                </button>
                <h2>Login with Password</h2>
                <p className="subtitle">Enter your credentials to access your account</p>
                
                <input 
                  type="email" 
                  className="standard-input"
                  placeholder="Email Address" 
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  autoFocus
                />
                
                <input 
                  type="password" 
                  className="standard-input"
                  placeholder="Password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{ marginBottom: '10px' }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                   {/* <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666', cursor: 'pointer' }}>
                     <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleInputChange} style={{ accentColor: '#7c3aed' }} />
                     Remember me
                   </label> */}
                   <a href="/forgot-password" style={{ fontSize: '14px', color: '#7c3aed', textDecoration: 'underline' }}>Forgot password?</a>
                </div>

                <button 
                  type="submit"
                  disabled={!formData.emailOrPhone || !formData.password || isLoading}
                  className={`btn-primary-custom ${(formData.emailOrPhone && formData.password && !isLoading) ? 'active ready' : 'disabled'}`}
                >
                  {isLoading ? "SIGNING IN..." : "SIGN IN"}
                </button>
              </form>
            )}

            {activeView === "otp_verification" && (
              <form onSubmit={handleVerifyOtp}>
                <button type="button" className="back-button" onClick={() => switchView('email_otp_entry', 'email_otp')}>
                  <BackIcon />
                </button>
                <h2>Enter Verification Code</h2>
                <p className="subtitle">
                  We've sent a code to <br/><strong style={{color: '#333'}}>{formatDisplayNumber(formData.emailOrPhone, loginMode)}</strong>
                </p>
                
                <div className="otp-inputs">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={index === 0 ? firstOtpInputRef : null}
                      id={`otp-${index}`}
                      type="text"
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      maxLength="1"
                    />
                  ))}
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className={`btn-primary-custom ${!isLoading ? 'active ready' : 'disabled'}`}
                  style={{ marginBottom: '20px' }}
                >
                  {isLoading ? "VERIFYING..." : "VERIFY CODE"}
                </button>
                
                <div style={{ textAlign: "center" }}>
                  {timer > 0 ? (
                    <p style={{ color: "#888", fontSize: "14px" }}>
                      Resend code in <strong style={{color: '#333'}}>{formatTime(timer)}</strong>
                    </p>
                  ) : (
                    <a onClick={(e) => { e.preventDefault(); handleSendOtp(); }} style={{ color: "#7c3aed", fontWeight: "600", fontSize: "14px", cursor: "pointer", textDecoration: "underline" }}>
                      Resend Code
                    </a>
                  )}
                </div>
              </form>
            )}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserLoginPage;
