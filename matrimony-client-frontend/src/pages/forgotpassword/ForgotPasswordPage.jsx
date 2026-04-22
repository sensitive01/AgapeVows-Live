import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import {
  sendForgotPasswordRequest,
  verifyOtpRequest,
} from "../../api/axiosService/userSignUpService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const firstOtpInputRef = useRef(null);

  const [step, setStep] = useState(1); // 1: Email/Phone, 2: OTP Verification
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    otp: ["", "", "", ""],
  });

  const [displayOtp, setDisplayOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [userId, setUserId] = useState(null);

  // Login Popup Logic (Using MainLayout's sidebar)
  const openLoginPopup = (e) => {
    e.preventDefault();
    const menuPop = document.querySelector(".menu-pop1");
    const popBg = document.querySelector(".pop-bg");
    if (menuPop) menuPop.classList.add("act");
    if (popBg) popBg.classList.add("act");
    document.querySelectorAll(".mob-me-all").forEach((el) => el.classList.remove("act"));
    document.body.style.overflow = "hidden";
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
    } else if (timer === 0 && step === 2) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  // Focus first OTP input when step changes to 2
  useEffect(() => {
    if (step === 2 && firstOtpInputRef.current) {
      setTimeout(() => {
        firstOtpInputRef.current.focus();
      }, 100);
    }
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prevState) => ({
        ...prevState,
        otp: newOtp,
      }));

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace to move to previous input
    if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmitEmailPhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.emailOrPhone) {
      setError("Please enter your email or phone number");
      setLoading(false);
      return;
    }

    try {
      // Replace with your actual API call
      const response = await sendForgotPasswordRequest({
        emailOrPhone: formData.emailOrPhone,
      });
      if (response.status === 200) {
        setSuccess(response.data.message);
        setUserId(response.data.userId);
        setDisplayOtp(response.data.otp);

        setStep(2);
        setTimer(60);
        setCanResend(false);
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const otpString = formData.otp.join("");

    if (otpString.length !== 4) {
      setError("Please enter the complete 4-digit OTP");
      setLoading(false);
      return;
    }

    try {
      const response = await verifyOtpRequest({
        userId,
        otp: otpString,
      });

      if (response.status === 200) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate(`/reset-password/${userId}`);
        }, 1500);
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Replace with your actual API call
      const response = await sendForgotPasswordRequest({
        emailOrPhone: formData.emailOrPhone,
      });

      if (response.status === 200) {
        setSuccess(response.data.message);
        setUserId(response.data.userId);
        setDisplayOtp(response.data.otp);

        setTimer(60);
        setCanResend(false);

        setFormData((prev) => ({ ...prev, otp: ["", "", "", ""] }));

        // Focus first input after resend
        if (firstOtpInputRef.current) {
          setTimeout(() => {
            firstOtpInputRef.current.focus();
          }, 100);
        }
      }
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Enhanced OTP input styles
  const otpInputStyle = {
    width: "60px",
    height: "60px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
    border: "2px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    color: "#333",
    transition: "all 0.3s ease",
    outline: "none",
  };

  const otpInputFocusStyle = {
    ...otpInputStyle,
    borderColor: "#007bff",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 0 5px rgba(0, 123, 255, 0.3)",
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div
                  className="lhs"
                  style={{
                    background: '#A020F0',
                  }}
                >
                  <div className="tit">
                    <h2>
                      <span style={{ color: "#fff" }}>Reset your </span>
                      <b style={{ color: "#FFD700" }}>Password</b>
                      <span style={{ color: "#fff" }}> Easy and fast.</span>
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Password Recovery</h4>
                      <h1>{step === 1 ? "Forgot Password" : "Verify OTP"}</h1>
                      <p>
                        Remember your password?{" "}
                        <a href="#!" onClick={openLoginPopup}>Login</a>
                      </p>
                    </div>
                    <div className="form-login">
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      {success && (
                        <div className="alert alert-success" role="alert">
                          {success}
                        </div>
                      )}

                      {step === 1 ? (
                        <form onSubmit={handleSubmitEmailPhone}>
                          <div className="form-group">
                            <label className="lb">Email or Phone:</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your email or phone number"
                              name="emailOrPhone"
                              value={formData.emailOrPhone}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                          >
                            {loading ? "Sending OTP..." : "Send OTP"}
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleSubmitOtp}>
                          <div className="form-group">
                            <label className="lb">Enter 4-digit OTP:</label>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "#666",
                                marginBottom: "10px",
                              }}
                            >
                              OTP sent to {formData.emailOrPhone}
                            </p>
                            <p
                              style={{
                                fontSize: "14px",
                                color: "red",
                                marginBottom: "20px",
                              }}
                            >
                              {`Dummy Otp is ${displayOtp}`}
                            </p>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                                marginBottom: "15px",
                              }}
                            >
                              {formData.otp.map((digit, index) => (
                                <input
                                  key={index}
                                  ref={index === 0 ? firstOtpInputRef : null}
                                  id={`otp-${index}`}
                                  type="text"
                                  className="form-control"
                                  value={digit}
                                  onChange={(e) =>
                                    handleOtpChange(index, e.target.value)
                                  }
                                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                  onFocus={(e) => {
                                    Object.assign(
                                      e.target.style,
                                      otpInputFocusStyle
                                    );
                                  }}
                                  onBlur={(e) => {
                                    Object.assign(
                                      e.target.style,
                                      otpInputStyle
                                    );
                                  }}
                                  maxLength="1"
                                  style={otpInputStyle}
                                />
                              ))}
                            </div>
                            {timer > 0 && (
                              <p
                                style={{
                                  textAlign: "center",
                                  color: "#666",
                                  fontSize: "14px",
                                  marginBottom: "15px",
                                }}
                              >
                                Resend OTP in {formatTime(timer)}
                              </p>
                            )}
                          </div>

                          <div
                            style={{
                              display: "flex",
                              gap: "10px",
                              flexDirection: "column",
                            }}
                          >
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={loading}
                            >
                              {loading ? "Verifying..." : "Verify OTP"}
                            </button>

                            {canResend && (
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleResendOtp}
                                disabled={loading}
                              >
                                {loading ? "Resending..." : "Resend OTP"}
                              </button>
                            )}
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* <CopyRights /> */}
    </div>
  );
};

export default ForgotPassword;
