import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { sendSignUpRequest, sendRegistrationOtpRequest, verifyRegistrationOtpRequest } from "../api/axiosService/userSignUpService";
import { showAlert, showOtpAlert } from "../utils/alertService";
import LayoutComponent from "../components/layouts/LayoutComponent";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePhone = () => {
    const phoneLength = formData.phone.length;
    if (formData.countryCode === "in" && phoneLength !== 12) return "India number must be 10 digits";
    if (formData.countryCode === "us" && phoneLength !== 11) return "US number must be valid";
    if (phoneLength < 10) return "Invalid phone number";
    if (phoneLength > 15) return "Please enter correct number";
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
      const otpResponse = await sendRegistrationOtpRequest(formData.email);

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

      <div className="flex-grow flex flex-col lg:flex-row-reverse pt-[72px]">
        
        {/* Form Section (Now on the Right) */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white relative z-10 shadow-xl">
          <div className="w-full max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Create Account</h2>
              <p className="text-gray-500">Join our Christian Matrimony Community</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                  placeholder="Enter your full name"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                  placeholder="Enter email"
                  autoComplete="off"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mobile Number</label>
                <PhoneInput
                  country={"in"}
                  value={formData.phone}
                  onChange={(value, data) => {
                    setFormData({ ...formData, phone: value, countryCode: data?.countryCode || "in" });
                  }}
                  inputStyle={{
                    width: "100%",
                    height: "46px",
                    borderRadius: "0.75rem",
                    borderColor: "#d1d5db",
                    paddingLeft: "48px",
                  }}
                  buttonStyle={{
                    borderTopLeftRadius: "0.75rem",
                    borderBottomLeftRadius: "0.75rem",
                    borderColor: "#d1d5db",
                    backgroundColor: "#f9fafb"
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition-colors"
                    placeholder="Create a password"
                    autoComplete="new-password"
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

              <div className="flex items-start mt-4">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={formData.agree}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-600">
                  I agree to the <a href="#!" className="text-purple-600 hover:underline">Terms & Conditions</a> and <a href="#!" className="text-purple-600 hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center mt-2 py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Processing...
                  </span>
                ) : (
                  "Register Now"
                )}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-600">
                Already a member?{" "}
                <Link to="/user/user-login" className="font-bold text-purple-600 hover:text-purple-500">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Image Section (Now on the Left) */}
        <div className="hidden lg:flex w-1/2 relative bg-gray-900">
          <img 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
            alt="Christian Wedding Vows" 
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-purple-900/40 to-transparent"></div>
          
          <div className="relative z-10 p-16 flex flex-col justify-end h-full text-white">
            <h1 className="text-5xl font-bold mb-6 font-serif leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              A Match Made <br/> in Heaven
            </h1>
            <p className="text-lg text-gray-200 mb-8 max-w-md leading-relaxed">
              Start your journey to finding a life partner who shares your faith, values, and vision for a Christ-centered marriage. Join our blessed community today.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/20 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Secure Data</h4>
                  <p className="text-xs text-gray-300">Total Privacy</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Faith-Based</h4>
                  <p className="text-xs text-gray-300">Shared Values</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Premium</h4>
                  <p className="text-xs text-gray-300">Elite Matches</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div>
                  <h4 className="font-bold">Trusted</h4>
                  <p className="text-xs text-gray-300">By Community</p>
                </div>
              </div>
            </div>

            <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:bg-black/30 transition-all">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path></svg>
              </div>
              <div className="flex items-center gap-4 mb-3 relative z-10">
                <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Michael & Emily" className="w-14 h-14 rounded-full border-2 border-white/30 object-cover" />
                <div>
                  <h4 className="font-bold text-white text-lg">Michael & Emily</h4>
                  <p className="text-xs font-semibold text-purple-200 tracking-wider uppercase">Married Aug 2023</p>
                </div>
              </div>
              <p className="text-sm italic text-gray-100 relative z-10 leading-relaxed">
                "Finding someone who shared my devotion to Christ was my priority. This platform made it so easy. We are forever grateful for this wonderful community."
              </p>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default UserSignUp;