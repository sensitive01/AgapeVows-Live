import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyUser } from "../../api/axiosService/userSignUpService";
import loginBg from "../../assets/new-template/images/login-bg.png";
import loginCouple from "../../assets/new-template/images/login-couple.png";

export default function SidebarLoginComponent({ closePopup }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await verifyUser(formData);

      if (response.status === 200) {
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);

        if (response.data.profileImage) {
          localStorage.setItem("userImage", response.data.profileImage);
        }

        // ✅ Get redirect path from sessionStorage
        const redirectPath =
          sessionStorage.getItem("redirectAfterLogin") ||
          "/user/user-dashboard-page";

        // ✅ Get search data if exists
        const searchData = sessionStorage.getItem("searchData");

        // Close popup first
        if (closePopup) closePopup();

        // ✅ Navigate properly
        navigate(redirectPath, {
          replace: true,
          state: searchData ? { formData: JSON.parse(searchData) } : {},
        });

        // ✅ Clear sessionStorage (important)
        sessionStorage.removeItem("redirectAfterLogin");
        sessionStorage.removeItem("searchData");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || "Invalid credentials");
      } else {
        setLoginError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pop-bg" onClick={closePopup}></div>
      <div className="menu-pop menu-pop1 large-login-drawer login-mobile-fix" style={{
        height: 'auto',
        minHeight: 'auto',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 50px rgba(0,0,0,0.2)',
        background: '#fff',
        transition: 'all 0.5s ease-in-out',
        zIndex: 10001
      }}>
        <style>{`
          .login-mobile-fix {
            width: 90%;
            max-width: 950px;
          }
          
          .login-flex-row {
            display: flex;
            flex-direction: row;
            min-height: 580px;
          }

          .login-left-side {
            width: 42%;
            background: #c9a227;
            padding: 60px 45px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            overflow: hidden;
          }

          .login-right-side {
            width: 58%;
            padding: 60px 70px;
            background: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          /* Premium Close Button */
          .custom-close-btn {
            cursor: pointer;
            z-index: 1000;
            position: absolute;
            right: 20px;
            top: 20px;
            color: #fff;
            background: #e91e63;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 24px;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(233, 30, 99, 0.3);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }

          .custom-close-btn:hover {
            transform: scale(1.1) rotate(90deg);
            background: #c2185b;
            box-shadow: 0 6px 15px rgba(233, 30, 99, 0.5);
          }

          .custom-close-btn:active {
            transform: scale(0.9);
          }

          /* Movement Animation for People/Branding Content */
          .celebration-movement {
            animation: sway 4s ease-in-out infinite;
          }

          @keyframes sway {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(1deg); }
          }

          .moving-people-bg {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 180px;
            background-image: url(${loginBg});
            background-size: cover;
            background-position: center bottom;
            background-repeat: no-repeat;
            z-index: 1;
            animation: jump 3s ease-in-out infinite;
          }

          @keyframes jump {
            0%, 100% { transform: scale(1) translateY(0); }
            50% { transform: scale(1.05) translateY(-5px); }
          }

          @media (max-width: 991px) {
            .login-mobile-fix {
               width: 92% !important;
               max-height: 85vh !important;
               overflow-y: auto !important;
               top: 55% !important; /* Move it down slightly from top */
               margin: 20px 0 !important;
            }
            .login-flex-row {
              flex-direction: column;
              min-height: auto;
            }
            .login-left-side {
              width: 100%;
              padding: 30px 20px;
              height: 280px; /* Increased height as requested */
            }
            .login-right-side {
              width: 100%;
              padding: 30px 20px;
            }
            .login-left-side h1 {
              font-size: 28px !important;
              margin-bottom: 10px !important;
            }
            .login-left-side h2 {
              font-size: 18px !important;
            }
            .moving-people-bg {
               height: 160px;
            }
            .custom-close-btn {
              right: 15px;
              top: 15px;
              width: 35px;
              height: 35px;
              font-size: 20px;
            }
          }

          @media (max-width: 480px) {
            .login-left-side {
              height: 250px;
              padding: 20px 15px;
            }
            .login-left-side h1 {
              font-size: 24px !important;
            }
            .login-right-side {
              padding: 25px 15px;
            }
          }
        `}</style>

        <span
          className="custom-close-btn"
          onClick={closePopup}
          title="Close"
        >
          &times;
        </span>

        <div className="login-flex-row">

          {/* Left Side: Branding with Celebration Movement */}
          <div className="login-left-side">
            <div className="celebration-movement" style={{ zIndex: 2 }}>
              <h2 style={{ fontSize: '38px', fontWeight: '400', color: '#9333ea', lineHeight: '1', margin: '0 0 10px 0' }}>Now</h2>
              <h1 style={{ fontSize: '72px', fontWeight: '800', color: '#fff', lineHeight: '0.9', margin: '0 0 20px 0' }}>Find your life partner</h1>
              <h2 style={{ fontSize: '48px', fontWeight: '700', color: '#9333ea', lineHeight: '1', margin: 0 }}>Easy and fast.</h2>
            </div>

            <div className="moving-people-bg"></div>
          </div>

          {/* Right Side: Form */}
          <div className="login-right-side">
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ color: '#d4a373', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '1px' }}>Start for free</h4>
              <h1 style={{ fontSize: '30px', fontWeight: '700', color: '#1a1a1a', marginBottom: '10px' }}>Sign in to Matrimony</h1>
              <p style={{ fontSize: '15px', color: '#666' }}>
                Not a member? <a href="/user/user-sign-up" style={{ color: '#3498db', fontWeight: '700' }}>Sign up now</a>
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ borderTop: '1px solid #efefef', paddingTop: '20px' }}>
              {loginError && (
                <div className="alert alert-danger" style={{ borderRadius: '8px', fontSize: '14px' }}>
                  {loginError}
                </div>
              )}

              <div className="form-group" style={{ marginBottom: '22px' }}>
                <label style={{ fontWeight: '700', marginBottom: '8px', display: 'block', color: '#333', fontSize: '14px' }}>Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  style={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '12px 15px',
                    height: 'auto',
                    fontSize: '15px'
                  }}
                />
                {errors.email && (
                  <div className="invalid-feedback" style={{ display: 'block' }}>{errors.email}</div>
                )}
              </div>

              <div className="form-group" style={{ position: "relative", marginBottom: '22px' }}>
                <label style={{ fontWeight: '700', marginBottom: '8px', display: 'block', color: '#333', fontSize: '14px' }}>Password:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    style={{
                      paddingRight: '45px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '12px 15px',
                      height: 'auto',
                      fontSize: '15px'
                    }}
                  />
                  <span
                    onMouseDown={() => setShowPassword(true)}
                    onMouseUp={() => setShowPassword(false)}
                    onMouseLeave={() => setShowPassword(false)}
                    onTouchStart={() => setShowPassword(true)}
                    onTouchEnd={() => setShowPassword(false)}
                    style={{ position: "absolute", right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: "pointer", fontSize: '20px', color: '#999' }}
                  >
                    👁️
                  </span>
                </div>
                {errors.password && (
                  <div className="invalid-feedback" style={{ display: 'block' }}>{errors.password}</div>
                )}
              </div>

              <div className="d-flex align-items-center mb-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="rememberMe" style={{ color: '#888', fontSize: '14px', marginLeft: '10px', cursor: 'pointer', marginBottom: 0 }}>
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
                style={{
                  background: "#9b30ff",
                  border: 'none',
                  color: "#fff",
                  width: '100%',
                  padding: '14px',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '700',
                  boxShadow: '0 5px 15px rgba(155, 48, 255, 0.3)'
                }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <a href="/forgot-password" style={{ color: '#333', fontSize: '14px', fontWeight: '600', textDecoration: 'none' }}>Forgot your password?</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
