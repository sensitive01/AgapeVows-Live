import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { validateRegistrationForm } from "../../../utils/validations";
import { useRegistrationForm } from "../../../hooks/useRegistrationForm";
import { useEmployeeRegistration } from "../../../hooks/useEmployeeRegistration";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";
import { useAutoClearMessages } from "../../../hooks/useAutoClearMessages";

const EmployeeRegistration = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const params = Object.fromEntries(queryParams.entries());

  const isGoogle = params.isgoogle === "true";
  const googleEmail = params.email || "";
  const googleName = params.name || "";
  const prefilledEmail = params.email || "";

  console.log("Query params:", params);
  console.log("Prefilled email:", prefilledEmail);
  console.log("Google name:", googleName);

  const navigate = useNavigate();
  const { register, isLoading, error, success, clearMessages } =
    useEmployeeRegistration();
  const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  const [confirmPasswordInputType, confirmPasswordIcon, toggleConfirmPassword] =
    usePasswordToggle();

  // State for OTP functionality
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(!!prefilledEmail);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // State for referral code
  const [referralCode, setReferralCode] = useState("");

  useAutoClearMessages();

  const { values, errors, handleChange, handleSubmit } = useRegistrationForm(
    async (formValues) => {
      if (!isOtpVerified && !prefilledEmail) {
        setOtpError("Please verify your email first");
        return;
      }

      const { confirmPassword, ...employeeData } = formValues;
      
      // Add referral code to employee data if provided
      if (referralCode.trim()) {
        employeeData.referralCode = referralCode.trim();
      }
      
      const response = await register(employeeData);
      if (response) {
        setTimeout(() => navigate("/login"), 2000);
      }
    },
    validateRegistrationForm
  );

  // Effect to prefill form data from query parameters
  useEffect(() => {
    if (prefilledEmail && !values.userEmail) {
      const emailEvent = {
        target: {
          name: "userEmail",
          value: prefilledEmail,
          type: "email",
        },
      };
      handleChange(emailEvent);
    }

    if (googleName && !values.userName) {
      const nameEvent = {
        target: {
          name: "userName",
          value: googleName,
          type: "text",
        },
      };
      handleChange(nameEvent);
    }
  }, [
    prefilledEmail,
    googleName,
    values.userEmail,
    values.userName,
    handleChange,
  ]);

  const sendOtp = async () => {
    if (!values.userEmail || errors.userEmail) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/sendemailotp`,
        {
          userEmail: values.userEmail,
        },
        {
          validateStatus: function (status) {
            return status === 200 || status === 401;
          },
        }
      );

      console.log("otp", response);

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
      setOtpError("Network error. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");
    setOtpSuccess("");

    try {
      const response = await axios.post(`${VITE_BASE_URL}/verifyemailotp`, {
        userEmail: values.userEmail,
        otp,
      });

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
    if (error) {
      return { type: "error", message: error };
    }
    if (success) {
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

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Employee Registration</h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <br />

          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>

              <h1 className="text-secondary h3">
                Sign Up to Search & Apply jobs
              </h1>

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  {/* Consolidated message display */}
                  {currentMessage && (
                    <div className="jobplugin__form-row">
                      <div
                        className={`alert ${
                          currentMessage.type === "error"
                            ? "alert-danger"
                            : "alert-success"
                        }`}
                      >
                        {currentMessage.message}
                      </div>
                    </div>
                  )}

                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="userName"
                        placeholder="Full Name"
                        value={values.userName || ""}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.userName ? "is-invalid" : ""
                        }`}
                        style={{ padding: "5px 30px" }}
                      />
                      {errors.userName && (
                        <div className="invalid-feedback">
                          {errors.userName}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      {prefilledEmail ? (
                        <>
                          <input
                            type="email"
                            name="userEmail"
                            placeholder="Email Address"
                            value={values.userEmail || prefilledEmail || ""}
                            onChange={handleChange}
                            className={`form-control ${
                              errors.userEmail ? "is-invalid" : ""
                            }`}
                            style={{ padding: "5px 30px" }}
                            readOnly={true}
                          />
                          {errors.userEmail && (
                            <div className="invalid-feedback">
                              {errors.userEmail}
                            </div>
                          )}
                          <small className="text-success">
                            Email verified via external authentication
                          </small>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              display: "flex",
                              gap: "20px",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: 2 }}>
                              <input
                                type="email"
                                name="userEmail"
                                placeholder="Email Address"
                                value={values.userEmail || ""}
                                onChange={handleChange}
                                className={`form-control ${
                                  errors.userEmail ? "is-invalid" : ""
                                }`}
                                style={{ padding: "5px 30px" }}
                                disabled={isOtpSent}
                              />
                              {errors.userEmail && (
                                <div className="invalid-feedback">
                                  {errors.userEmail}
                                </div>
                              )}
                            </div>

                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="form-control"
                                style={{ padding: "5px 10px" }}
                                disabled={!isOtpSent}
                                maxLength="6"
                              />
                            </div>

                            <div style={{ flex: 1 }}>
                              {!isOtpSent ? (
                                <button
                                  type="button"
                                  onClick={sendOtp}
                                  className="btn btn-secondary"
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    padding: "3px 8px",
                                    height: "46px",
                                    lineHeight: "1.2",
                                    fontSize: "14px",
                                  }}
                                  disabled={isSendingOtp || !!errors.userEmail}
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
                                  style={{
                                    whiteSpace: "nowrap",
                                    width: "100%",
                                    padding: "3px 8px",
                                    height: "34px",
                                    lineHeight: "1.2",
                                    fontSize: "14px",
                                  }}
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
                          </div>

                          {/* Keep only status messages, not error messages */}
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
                        </>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="userMobile"
                        placeholder="Phone Number"
                        value={values.userMobile || ""}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.userMobile ? "is-invalid" : ""
                        }`}
                        style={{ padding: "5px 30px" }}
                      />
                      {errors.userMobile && (
                        <div className="invalid-feedback">
                          {errors.userMobile}
                        </div>
                      )}
                    </div>
                    <div
                      className="jobplugin__form-field"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={passwordInputType}
                        name="userPassword"
                        placeholder="Password"
                        value={values.userPassword || ""}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.userPassword ? "is-invalid" : ""
                        }`}
                        style={{
                          padding: "5px 30px 5px 30px",
                          paddingRight: "40px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
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
                        {passwordIcon === "show" ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      {errors.userPassword && (
                        <div className="invalid-feedback">
                          {errors.userPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__form-row">
                    <div
                      className="jobplugin__form-field"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={confirmPasswordInputType}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword || ""}
                        onChange={handleChange}
                        className={`form-control ${
                          errors.confirmPassword ? "is-invalid" : ""
                        }`}
                        style={{
                          padding: "5px 30px 5px 30px",
                          paddingRight: "40px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
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
                        {confirmPasswordIcon === "show" ? (
                          <FaEye />
                        ) : (
                          <FaEyeSlash />
                        )}
                      </button>
                      {errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="referralCode"
                        placeholder="Referral Code (Optional)"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                        className="form-control"
                        style={{
                          padding: "5px 30px 5px 30px",
                          paddingRight: "40px",
                        }}
                      />
                      <small className="text-muted" style={{ fontSize: "12px" }}>
                        Have a referral code? Enter it here to get benefits
                      </small>
                    </div>
                  </div>

                  <hr />

                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field mb-0">
                      <label className="jobplugin__form-checkbox">
                        <input
                          type="checkbox"
                          name="sendEmails"
                          checked={values.sendEmails || false}
                          onChange={handleChange}
                        />
                        <span className="jobplugin__form-checkbox__btn"></span>
                      </label>
                      <span className="label-text">
                        Send me helpful emails to find suitable jobs.
                      </span>
                      {errors.sendEmails && (
                        <div className="invalid-feedback d-block">
                          {errors.sendEmails}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <label className="jobplugin__form-checkbox">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={values.agreeTerms || false}
                          onChange={handleChange}
                        />
                        <span className="jobplugin__form-checkbox__btn"></span>
                      </label>
                      <span className="label-text">
                        Yes, I understand and agree to the{" "}
                        <a className="hover:jobplugin__text-primary" href="#">
                          Terms of Service
                        </a>
                        , including the{" "}
                        <a className="hover:jobplugin__text-primary" href="#">
                          User Agreement
                        </a>{" "}
                        and{" "}
                        <a className="hover:jobplugin__text-primary" href="#">
                          Privacy Policy
                        </a>
                        .
                      </span>
                      {errors.agreeTerms && (
                        <div className="invalid-feedback d-block">
                          {errors.agreeTerms}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading || !isOtpVerified}
                  >
                    {isLoading ? (
                      "Registering..."
                    ) : (
                      <>
                        <i
                          className="icon icon-briefcase3 text-primary"
                          style={{ fontSize: "14px" }}
                        ></i>
                        &nbsp; Signup
                      </>
                    )}
                  </button>
                </div>
              </form>
              <br />

              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>

              <p className="jobplugin__userbox-textinfo">
                Already have an account?{" "}
                
                  className="hover:jobplugin__text-primary"
                  href="/login"
                <a>
                  <i className="fa fa-user-circle"></i> Log In
                </a>
              </p>
            </div>
          </div>
          <br />
        </div>
      </main>
    </>
  );
};

export default EmployeeRegistration;