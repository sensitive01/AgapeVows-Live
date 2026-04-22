import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

// Import images
import logo from "../../../../public/images/logo2.png";
import bg1 from "../../../assets/employer-admin/assets/img/bg/bg-01.webp";
import bg2 from "../../../assets/employer-admin/assets/img/bg/bg-02.png";
import bg3 from "../../../assets/employer-admin/assets/img/bg/bg-03.webp";
import authBg from "../../../assets/employer-admin/assets/img/bg/authentication-bg-01.webp";
import { registerEmployerAdmin } from "../../../api/services/projectServices";

const EmployerAdminRegister = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    employeradminUsername: "",
    employeradminEmail: "",
    employeradminMobile: "",
    employeradminPassword: "",
    employerconfirmPassword: "",
    agreeTerms: false,
  });

  // Separate error states for better message management
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // OTP states
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-specific errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear API error when user makes changes
    if (apiError) setApiError("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.employeradminUsername.trim()) {
      newErrors.employeradminUsername = "Name is required";
    }

    if (!formData.employeradminEmail.trim()) {
      newErrors.employeradminEmail = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.employeradminEmail)) {
        newErrors.employeradminEmail = "Please enter a valid email address";
      }
    }

    if (!formData.employeradminMobile.trim()) {
      newErrors.employeradminMobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.employeradminMobile)) {
      newErrors.employeradminMobile =
        "Please enter a valid 10-digit mobile number";
    }

    if (!formData.employeradminPassword) {
      newErrors.employeradminPassword = "Password is required";
    } else if (formData.employeradminPassword.length < 6) {
      newErrors.employeradminPassword =
        "Password must be at least 6 characters";
    }

    if (!formData.employerconfirmPassword) {
      newErrors.employerconfirmPassword = "Please confirm your password";
    } else if (
      formData.employeradminPassword !== formData.employerconfirmPassword
    ) {
      newErrors.employerconfirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms & Privacy";
    }

    if (!isOtpVerified) {
      newErrors.otp = "Please verify your email with OTP";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Send OTP to backend
  const sendOtp = async () => {
    if (!formData.employeradminEmail) {
      setOtpError("Please enter your email address first");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.employeradminEmail)) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employeradmin/sendemailotp`,
        {
          userEmail: formData.employeradminEmail,
        },
        {
          validateStatus: function (status) {
            return status === 200 || status === 401;
          },
        }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
        setOtpSuccess("OTP sent to your email successfully");
        setOtpError("");
      } else if (response.status === 401) {
        setOtpError(
          response.data.message || response.data.error || "User already exists"
        );
      } else {
        setOtpError(response.data.error || "Failed to send OTP");
      }
    } catch (error) {
      setOtpError(
        error.response?.data?.error || "Network error. Please try again."
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP with backend
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employeradmin/verifyemailotp`,
        {
          userEmail: formData.employeradminEmail,
          otp,
        }
      );

      if (response.status === 200) {
        setIsOtpVerified(true);
        setOtpSuccess("Email verified successfully!");
        setOtpError("");
      } else {
        setOtpError(response.data.error || "Invalid OTP");
        setIsOtpVerified(false);
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Verification failed");
      setIsOtpVerified(false);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Function to get the current message to display
  const getCurrentMessage = () => {
    // Priority: Registration errors/success > OTP errors > OTP success
    if (apiError) {
      return { type: "error", message: apiError };
    }
    if (registrationSuccess) {
      return { type: "success", message: "Registration successful!" };
    }
    if (otpError) {
      return { type: "error", message: otpError };
    }
    if (otpSuccess) {
      return { type: "success", message: otpSuccess };
    }
    return null;
  };

  const currentMessage = getCurrentMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    setRegistrationSuccess(false);

    if (!validateForm()) return;

    try {
      setLoading(true);

      const adminData = {
        employeradminUsername: formData.employeradminUsername,
        employeradminEmail: formData.employeradminEmail,
        employeradminMobile: formData.employeradminMobile,
        employeradminPassword: formData.employeradminPassword,
        employerconfirmPassword: formData.employerconfirmPassword,
      };

      await registerEmployerAdmin(adminData);

      setRegistrationSuccess(true);
      // Clear form on success
      setFormData({
        employeradminUsername: "",
        employeradminEmail: "",
        employeradminMobile: "",
        employeradminPassword: "",
        employerconfirmPassword: "",
        agreeTerms: false,
      });
    } catch (err) {
      console.error("Registration error:", err);

      const errorResponse = err.response?.data;
      const errorMessage =
        errorResponse?.message || err.message || "Registration failed";

      if (errorResponse?.errors) {
        // Handle specific field errors
        const fieldErrors = {};

        errorResponse.errors.forEach((error) => {
          if (
            error.path === "employeradminEmail" ||
            error.path === "userEmail"
          ) {
            fieldErrors.employeradminEmail = "This email is already registered";
            setApiError("Email address is already registered");
          } else if (
            error.path === "employeradminMobile" ||
            error.path === "userMobile"
          ) {
            fieldErrors.employeradminMobile =
              "This mobile number is already registered";
            setApiError("Mobile number is already registered");
          }
        });

        if (Object.keys(fieldErrors).length > 0) {
          setErrors((prev) => ({ ...prev, ...fieldErrors }));
        } else {
          setApiError(errorMessage);
        }
      } else if (
        errorMessage.includes("already exists") ||
        errorMessage.includes("duplicate")
      ) {
        // Handle generic duplicate errors
        if (errorMessage.toLowerCase().includes("email")) {
          setApiError("Email address is already registered");
          setErrors((prev) => ({
            ...prev,
            employeradminEmail: "This email is already registered",
          }));
        } else if (errorMessage.toLowerCase().includes("mobile")) {
          setApiError("Mobile number is already registered");
          setErrors((prev) => ({
            ...prev,
            employeradminMobile: "This mobile number is already registered",
          }));
        } else {
          setApiError(errorMessage);
        }
      } else {
        setApiError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

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
                        Empowering Schools with seamless and intelligent staff
                        management solutions.{" "}
                      </h1>
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
                    <form onSubmit={handleSubmit} className="vh-100" noValidate>
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        <div className="mx-auto mb-4 text-center">
                          <img
                            src={logo}
                            width="240px"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </div>
                        <div>
                          {/* Consolidated message display */}
                          {currentMessage && (
                            <div
                              className={`alert ${
                                currentMessage.type === "error"
                                  ? "alert-danger"
                                  : "alert-success"
                              } mb-3`}
                              role="alert"
                            >
                              {currentMessage.type === "success" &&
                              registrationSuccess ? (
                                <div className="d-flex flex-column">
                                  <span>{currentMessage.message}</span>
                                  <div className="mt-2">
                                    <Link
                                      to="/employer-admin/login"
                                      className="btn btn-sm btn-success"
                                    >
                                      Proceed to Login
                                    </Link>
                                  </div>
                                </div>
                              ) : (
                                currentMessage.message
                              )}
                            </div>
                          )}

                          {!registrationSuccess ? (
                            <>
                              <div className="text-center mb-3">
                                <h2 className="mb-2">Sign Up</h2>
                                <p className="mb-0">
                                  Please enter your details to sign up
                                </p>
                              </div>

                              <div className="mb-3">
                                <label className="form-label">Name</label>
                                <div className="input-group">
                                  <input
                                    type="text"
                                    name="employeradminUsername"
                                    value={formData.employeradminUsername}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${
                                      errors.employeradminUsername
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    required
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-user"></i>
                                  </span>
                                  {errors.employeradminUsername && (
                                    <div className="invalid-feedback">
                                      {errors.employeradminUsername}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mb-3">
                                <label className="form-label">
                                  Email Address
                                </label>
                                <div className="input-group">
                                  <input
                                    type="email"
                                    name="employeradminEmail"
                                    value={formData.employeradminEmail}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${
                                      errors.employeradminEmail
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    required
                                    disabled={isOtpSent}
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-mail"></i>
                                  </span>
                                  {errors.employeradminEmail && (
                                    <div className="invalid-feedback">
                                      {errors.employeradminEmail}
                                    </div>
                                  )}
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                  <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="form-control me-2"
                                    style={{ width: "150px" }}
                                    disabled={!isOtpSent}
                                    maxLength="6"
                                  />
                                  {!isOtpSent ? (
                                    <button
                                      type="button"
                                      onClick={sendOtp}
                                      className="btn btn-outline-primary"
                                      disabled={
                                        isSendingOtp ||
                                        !formData.employeradminEmail ||
                                        errors.employeradminEmail
                                      }
                                    >
                                      {isSendingOtp ? "Sending..." : "Send OTP"}
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={verifyOtp}
                                      className={`btn ${
                                        isOtpVerified
                                          ? "btn-success"
                                          : "btn-primary"
                                      }`}
                                      disabled={isVerifyingOtp || isOtpVerified}
                                    >
                                      {isVerifyingOtp
                                        ? "Verifying..."
                                        : isOtpVerified
                                        ? "Verified"
                                        : "Verify"}
                                    </button>
                                  )}
                                </div>
                                {/* Status messages for OTP */}
                                {isOtpSent &&
                                  !isOtpVerified &&
                                  !otpError &&
                                  !otpSuccess && (
                                    <small className="text-muted">
                                      OTP sent to your email
                                    </small>
                                  )}
                                {isOtpVerified && !otpSuccess && (
                                  <small className="text-success">
                                    Email verified successfully!
                                  </small>
                                )}
                                {errors.otp && (
                                  <div className="text-danger small mt-1">
                                    {errors.otp}
                                  </div>
                                )}
                              </div>

                              <div className="mb-3">
                                <label className="form-label">
                                  Mobile Number
                                </label>
                                <div className="input-group">
                                  <input
                                    type="tel"
                                    name="employeradminMobile"
                                    value={formData.employeradminMobile}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${
                                      errors.employeradminMobile
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    placeholder="Enter your 10-digit mobile number"
                                  />
                                  <span className="input-group-text border-start-0">
                                    <i className="ti ti-phone"></i>
                                  </span>
                                  {errors.employeradminMobile && (
                                    <div className="invalid-feedback">
                                      {errors.employeradminMobile}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div
                                  className="pass-group"
                                  style={{ position: "relative" }}
                                >
                                  <input
                                    type={passwordVisible ? "text" : "password"}
                                    name="employeradminPassword"
                                    value={formData.employeradminPassword}
                                    onChange={handleChange}
                                    className={`form-control ${
                                      errors.employeradminPassword
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ paddingRight: "40px" }}
                                    required
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
                                    {passwordVisible ? (
                                      <FaEyeSlash />
                                    ) : (
                                      <FaEye />
                                    )}
                                  </button>
                                  {errors.employeradminPassword && (
                                    <div className="invalid-feedback">
                                      {errors.employeradminPassword}
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
                                      confirmPasswordVisible
                                        ? "text"
                                        : "password"
                                    }
                                    name="employerconfirmPassword"
                                    value={formData.employerconfirmPassword}
                                    onChange={handleChange}
                                    className={`form-control ${
                                      errors.employerconfirmPassword
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    style={{ paddingRight: "40px" }}
                                    required
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
                                  {errors.employerconfirmPassword && (
                                    <div className="invalid-feedback">
                                      {errors.employerconfirmPassword}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="d-flex align-items-center justify-content-between mb-3">
                                <div className="d-flex align-items-center">
                                  <div className="form-check form-check-md mb-0">
                                    <input
                                      className="form-check-input"
                                      id="agreeTerms"
                                      type="checkbox"
                                      name="agreeTerms"
                                      checked={formData.agreeTerms}
                                      onChange={handleChange}
                                      required
                                    />
                                    <label
                                      htmlFor="agreeTerms"
                                      className="form-check-label text-dark mt-0"
                                    >
                                      Agree to{" "}
                                      <span className="text-primary">
                                        Terms & Privacy
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              {errors.agreeTerms && (
                                <div className="text-danger mb-3">
                                  {errors.agreeTerms}
                                </div>
                              )}

                              <div className="mb-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary w-100"
                                  disabled={
                                    loading ||
                                    !isOtpVerified ||
                                    !formData.agreeTerms
                                  }
                                >
                                  {loading ? (
                                    <>
                                      <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                      ></span>
                                      Processing...
                                    </>
                                  ) : (
                                    "Sign Up"
                                  )}
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="text-center">
                              <h4 className="text-success mb-3">
                                Registration Complete!
                              </h4>
                              <p className="mb-4">
                                Your account has been successfully created.
                              </p>
                              <Link
                                to="/employer-admin/login"
                                className="btn btn-primary"
                              >
                                Continue to Login
                              </Link>
                            </div>
                          )}

                          {!registrationSuccess && (
                            <div className="text-center">
                              <h6 className="fw-normal text-dark mb-0">
                                Already have an account?
                                <Link
                                  to="/employer-admin/login"
                                  className="hover-a"
                                >
                                  {" "}
                                  Sign In
                                </Link>
                              </h6>
                            </div>
                          )}
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

export default EmployerAdminRegister;
