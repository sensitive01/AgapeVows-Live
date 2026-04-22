import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Import images (use the same ones from login page)
import logo from "../../assets/employer/assets/img/logo - dark.png";
import bg1 from "../../assets/employer/assets/img/bg/bg-01.webp";
import bg2 from "../../assets/employer/assets/img/bg/bg-02.png";
import bg3 from "../../assets/employer/assets/img/bg/bg-03.webp";
import authBg from "../../assets/employer/assets/img/bg/authentication-bg-01.webp";
import { changeEmployerPassword } from "../../api/services/projectServices";

const EmployerResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email and verification status from navigation state
  const { email, verified } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    userEmail: email || "", // Pre-populate with email from state
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Redirect if not verified or no email
  useEffect(() => {
    if (!email || !verified) {
      // Redirect back to forgot password if no verified email
      navigate("/employer/forgot-password");
    }
  }, [email, verified, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }

    // Clear messages when user types
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.userEmail) {
      newErrors.userEmail = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.userEmail)) {
        newErrors.userEmail = "Please enter a valid email address";
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await changeEmployerPassword({
        userEmail: formData.userEmail, // Use email instead of mobile
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess("Password reset successfully!");
      // Clear form data on success
      setFormData({
        userEmail: formData.userEmail,
        password: "",
        confirmPassword: "",
      });

      // Redirect to login after success
      setTimeout(() => {
        navigate("/employer/login", {
          state: {
            message:
              "Password reset successfully. Please login with your new password.",
          },
        });
      }, 2000);
    } catch (err) {
      console.error("Password reset error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Don't render if not verified
  if (!email || !verified) {
    return null; // Component will redirect in useEffect
  }

  return (
    <div className="bg-white">
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              <div className="col-lg-8">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src={bg1} className="bg-1" alt="Background 1" />
                    <img src={bg2} className="bg-2" alt="Background 2" />
                    <img src={bg3} className="bg-3" alt="Background 3" />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      <h1
                        className="text-white display-1"
                        style={{ textAlign: "center" }}
                      >
                        Empowering Schools with seamless and intelligent staff management solutions.                      </h1>
                      <div className="my-4 mx-auto authen-overlay-img">
                        <img src={authBg} alt="Authentication Background" />
                      </div>
                      <div>
                          <p className="text-white fs-20 fw-semibold text-center">
                          Empower your teams operations effortlessly.
                          <br />
                          Elevate your entire institution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-lg-10 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4">
                        <div className="mx-auto mb-4 text-center">
                          <img
                            src={logo}
                            width="240px"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Reset Password</h2>
                            <p className="mb-0">
                              Create a new password for your account
                            </p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3">
                              {error}
                            </div>
                          )}

                          {success && (
                            <div className="alert alert-success mb-3">
                              {success}
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="email"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleChange}
                                className={`form-control border-end-0 ${
                                  errors.userEmail ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your email address"
                                disabled={true} // Disable since it comes from verified state
                                style={{ backgroundColor: "#f8f9fa" }}
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail"></i>
                              </span>
                              {errors.userEmail && (
                                <div className="invalid-feedback">
                                  {errors.userEmail}
                                </div>
                              )}
                            </div>
                            <small className="text-success">
                              <i className="ti ti-check-circle me-1"></i>
                              Email verified
                            </small>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <div
                              className="pass-group"
                              style={{ position: "relative" }}
                            >
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="Enter new password (minimum 6 characters)"
                                style={{ paddingRight: "40px" }}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#6c757d",
                                  padding: "5px",
                                }}
                              >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                              </button>
                              {errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <div
                              className="pass-group"
                              style={{ position: "relative" }}
                            >
                              <input
                                type={
                                  confirmPasswordVisible ? "text" : "password"
                                }
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.confirmPassword ? "is-invalid" : ""
                                }`}
                                placeholder="Confirm new password"
                                style={{ paddingRight: "40px" }}
                              />
                              <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#6c757d",
                                  padding: "5px",
                                }}
                              >
                                {confirmPasswordVisible ? (
                                  <FaEyeSlash />
                                ) : (
                                  <FaEye />
                                )}
                              </button>
                              {errors.confirmPassword && (
                                <div className="invalid-feedback">
                                  {errors.confirmPassword}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Resetting Password...
                                </>
                              ) : (
                                "Reset Password"
                              )}
                            </button>
                          </div>

                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Remember your password?{" "}
                              <Link to="/employer/login" className="hover-a">
                                {" "}
                                Sign In
                              </Link>
                            </h6>
                          </div>
                        </div>
                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">
                            Copyright &copy; 2025 - EdProfio
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerResetPassword;
