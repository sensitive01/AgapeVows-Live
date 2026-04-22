import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get mobile number from navigation state
  const mobile = location.state?.mobile;

  // Redirect if no mobile number is found
  if (!mobile) {
    navigate("/forgot-password");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Only check if fields are empty
    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    try {
      setIsLoading(true);
      const payload = {
        userMobile: mobile,
        password,
        confirmPassword,
      };

      console.log("Sending password reset request with payload:", payload);

      const response = await axios.post(
        "https://api.edprofio.com/change-password",
        payload
      );
      console.log("Password reset response:", response.data);

      if (response.data.message === "Password updated successfully") {
        setSuccess("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(response.data.message || "Failed to update password");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Failed to update password. Please try again.";
      setError(errorMsg);
      console.error("Password reset error:", err.response?.data || err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>
      <div className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Decorative pattern" />
          </div>
          <br />
          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              <span className="jobplugin__userbox-bar"></span>

              <h1 className="text-secondary h3 mb-4">Reset Password</h1>
              <p className="mb-4">Enter your new password</p>

              {error && <div className="alert alert-danger mb-4">{error}</div>}

              {success && (
                <div className="alert alert-success mb-4">{success}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form-row mb-4">
                  <div
                    className="jobplugin__form-field"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="New Password"
                      style={{ padding: "10px 15px", paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
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
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="jobplugin__form-row mb-4">
                  <div
                    className="jobplugin__form-field"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="form-control"
                      placeholder="Confirm New Password"
                      style={{ padding: "10px 15px", paddingRight: "40px" }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
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
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Remember your password?{" "}
                  <a href="/login" className="text-primary hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
