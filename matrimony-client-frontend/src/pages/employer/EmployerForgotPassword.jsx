import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import images
import logo from "../../../public/images/logo2.png";
import bg1 from "../../assets/employer/assets/img/bg/bg-01.webp";
import bg2 from "../../assets/employer/assets/img/bg/bg-02.png";
import bg3 from "../../assets/employer/assets/img/bg/bg-03.webp";
import authBg from "../../assets/employer/assets/img/bg/authentication-bg-04.svg";

const EmployerForgotPassword = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    userEmail: "",
  });
  const [errors, setErrors] = useState({});

  // OTP state
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Loading states
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Message states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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

  const validateEmail = () => {
    const newErrors = {};

    if (!formData.userEmail) {
      newErrors.userEmail = "Email address is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.userEmail)) {
        newErrors.userEmail = "Please enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOtp = () => {
    if (!otp) {
      setOtpError("Please enter the OTP");
      return false;
    }
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("Please enter a valid 6-digit OTP");
      return false;
    }
    return true;
  };

  // Send OTP to email
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!validateEmail()) return;

    setIsSendingOtp(true);
    setError(null);
    setSuccess(null);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employer/sendemailotpforgot`,
        {
          userEmail: formData.userEmail,
        },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 500; // Handle all expected status codes
          },
        }
      );

      if (response.status === 200) {
        setIsOtpSent(true);
        setOtpSuccess("OTP has been sent to your email address");
        setSuccess("Please check your email for the OTP");
      } else if (response.status === 404) {
        setError("No account found with this email address");
      } else if (response.status === 400) {
        setError(response.data.message || "Invalid request");
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to send OTP");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    if (!validateOtp()) return;

    setIsVerifyingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/employer/verifyemailotpforgot`,
        {
          userEmail: formData.userEmail,
          otp: otp,
        }
      );

      if (response.status === 200) {
        setIsOtpVerified(true);
        setOtpSuccess("OTP verified successfully!");
        setSuccess("Email verified! You can now reset your password.");

        // Navigate to reset password page with verified email
        setTimeout(() => {
          navigate("/employer/reset-password", {
            state: {
              email: formData.userEmail,
              verified: true,
            },
          });
        }, 1500);
      } else {
        setOtpError(response.data.error || "Invalid OTP");
        setIsOtpVerified(false);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "OTP verification failed";
      setOtpError(errorMessage);
      setIsOtpVerified(false);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    setOtp(""); // Clear current OTP
    setIsOtpSent(false);
    setIsOtpVerified(false);
    await sendOtp({ preventDefault: () => {} }); // Call sendOtp without form submission
  };

  // Get current message to display
  const getCurrentMessage = () => {
    if (error) return { type: "error", message: error };
    if (success) return { type: "success", message: success };
    if (otpError) return { type: "error", message: otpError };
    if (otpSuccess) return { type: "success", message: otpSuccess };
    return null;
  };

  const currentMessage = getCurrentMessage();

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
                        Empowering Schools with seamless and intelligent staff management solutions. 
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
                  <div className="col-md-10 mx-auto vh-100">
                    <form onSubmit={sendOtp} className="vh-100">
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
                            <h2 className="mb-2">Forgot Password?</h2>
                            <p className="mb-0">
                              {!isOtpSent
                                ? "Enter your registered email address and we'll send you an OTP to reset your password."
                                : "Enter the 6-digit OTP sent to your email address."}
                            </p>
                          </div>

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
                              {currentMessage.message}
                            </div>
                          )}

                          {!isOtpVerified && (
                            <>
                              <div className="mb-3">
                                <label className="form-label">
                                  Email Address
                                </label>
                                <div className="input-group">
                                  <input
                                    type="email"
                                    name="userEmail"
                                    value={formData.userEmail}
                                    onChange={handleChange}
                                    className={`form-control border-end-0 ${
                                      errors.userEmail ? "is-invalid" : ""
                                    }`}
                                    placeholder="Enter your registered email address"
                                    disabled={isOtpSent}
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

                                {/* OTP Input and Verification */}
                                {isOtpSent && (
                                  <div className="mt-3">
                                    <div className="d-flex align-items-center">
                                      <input
                                        type="text"
                                        placeholder="Enter 6-digit OTP"
                                        value={otp}
                                        onChange={(e) =>
                                          setOtp(
                                            e.target.value
                                              .replace(/\D/g, "")
                                              .slice(0, 6)
                                          )
                                        }
                                        className="form-control me-2"
                                        style={{ width: "200px" }}
                                        maxLength="6"
                                        disabled={isOtpVerified}
                                      />
                                      <button
                                        type="button"
                                        onClick={verifyOtp}
                                        className={`btn ${
                                          isOtpVerified
                                            ? "btn-success"
                                            : "btn-primary"
                                        }`}
                                        disabled={
                                          isVerifyingOtp ||
                                          isOtpVerified ||
                                          !otp
                                        }
                                      >
                                        {isVerifyingOtp
                                          ? "Verifying..."
                                          : isOtpVerified
                                          ? "Verified"
                                          : "Verify OTP"}
                                      </button>
                                    </div>

                                    {/* Resend OTP option */}
                                    {!isOtpVerified && (
                                      <div className="mt-2">
                                        <small className="text-muted">
                                          Didn't receive the OTP?{" "}
                                          <button
                                            type="button"
                                            onClick={resendOtp}
                                            className="btn btn-link p-0 text-decoration-underline"
                                            style={{ fontSize: "inherit" }}
                                            disabled={isSendingOtp}
                                          >
                                            {isSendingOtp
                                              ? "Sending..."
                                              : "Resend OTP"}
                                          </button>
                                        </small>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Send OTP Button */}
                              {!isOtpSent && (
                                <div className="mb-3">
                                  <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={isSendingOtp}
                                  >
                                    {isSendingOtp ? (
                                      <>
                                        <span
                                          className="spinner-border spinner-border-sm me-2"
                                          role="status"
                                          aria-hidden="true"
                                        ></span>
                                        Sending OTP...
                                      </>
                                    ) : (
                                      "Send OTP"
                                    )}
                                  </button>
                                </div>
                              )}
                            </>
                          )}

                          {/* Success state after OTP verification */}
                          {isOtpVerified && (
                            <div className="text-center">
                              <div className="mb-4">
                                <i
                                  className="ti ti-check-circle text-success"
                                  style={{ fontSize: "48px" }}
                                ></i>
                                <h4 className="text-success mt-2">
                                  Email Verified!
                                </h4>
                                <p className="text-muted">
                                  Redirecting to password reset page...
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Return to
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

export default EmployerForgotPassword;
