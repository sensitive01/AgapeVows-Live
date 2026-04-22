import React, { useEffect, useState } from "react";
import { FaUserTie, FaEye, FaEyeSlash } from "react-icons/fa";
import { usePasswordToggle } from "../../../hooks/usePasswordToggle";
import { useLoginForm } from "../../../hooks/useLoginForm";
import { useLogin } from "../../../hooks/useLogin";
import { validateLoginForm } from "../../../utils/validateLogin";
import { Link, useNavigate } from "react-router-dom";
import { verifyTheUserExistOrNot } from "../../../api/services/projectServices";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();
  const [passwordInputType, passwordIcon, togglePassword] = usePasswordToggle();
  const [googleError, setGoogleError] = useState(null);
  const [linkedinError, setLinkedinError] = useState(null);
  const [isGoogleSignInProgress, setIsGoogleSignInProgress] = useState(false);
  const [isLinkedinSignInProgress, setIsLinkedinSignInProgress] =
    useState(false);

  const { values, errors, handleChange, handleSubmit } = useLoginForm(
    async (formValues) => {
      await login(formValues);
    },
    validateLoginForm,
    { initialValues: { userType: "employee" } }
  );

  // LinkedIn Sign-In Handler
  const handleLinkedInSignIn = () => {
    if (isLinkedinSignInProgress) return;
    setIsLinkedinSignInProgress(true);
    setLinkedinError(null);

    const LINKEDIN_CLIENT_ID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;

    if (!LINKEDIN_CLIENT_ID) {
      setLinkedinError("LinkedIn Client ID not configured");
      setIsLinkedinSignInProgress(false);
      return;
    }

    const REDIRECT_URI = encodeURIComponent(
      `${window.location.origin}/linkedin-callback`
    );
    const STATE = Math.random().toString(36).substring(2, 15);
    const SCOPE = encodeURIComponent("r_liteprofile r_emailaddress");

    // Store state in localStorage for verification
    localStorage.setItem("linkedin_state", STATE);

    const linkedinAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}&scope=${SCOPE}`;

    // Open LinkedIn OAuth in a popup
    const popup = window.open(
      linkedinAuthUrl,
      "linkedin-login",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    // Check if popup was blocked
    if (!popup || popup.closed || typeof popup.closed == "undefined") {
      setLinkedinError(
        "LinkedIn popup was blocked. Please allow popups and try again."
      );
      setIsLinkedinSignInProgress(false);
      return;
    }

    // Listen for popup messages
    const messageListener = (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "LINKEDIN_SUCCESS") {
        setIsLinkedinSignInProgress(false);
        popup.close();
        handleLinkedInCallback(event.data.code, event.data.state);
        window.removeEventListener("message", messageListener);
      } else if (event.data.type === "LINKEDIN_ERROR") {
        setIsLinkedinSignInProgress(false);
        setLinkedinError(event.data.error || "LinkedIn sign-in failed");
        popup.close();
        window.removeEventListener("message", messageListener);
      }
    };

    window.addEventListener("message", messageListener);

    // Check if popup is closed manually
    const checkClosed = setInterval(() => {
      if (popup.closed) {
        setIsLinkedinSignInProgress(false);
        setLinkedinError("LinkedIn sign-in was cancelled");
        clearInterval(checkClosed);
        window.removeEventListener("message", messageListener);
        localStorage.removeItem("linkedin_state");
      }
    }, 1000);
  };

  // Handle LinkedIn callback
  const handleLinkedInCallback = async (code, state) => {
    try {
      // Verify state
      const storedState = localStorage.getItem("linkedin_state");
      if (state !== storedState) {
        throw new Error("Invalid state parameter - possible CSRF attack");
      }

      // Exchange code for user data via your backend
      const response = await fetch("http://localhost:5000/api/auth/linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          code: code,
          redirectUri: `${window.location.origin}/linkedin-callback`,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("LinkedIn auth server error:", errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const userData = await response.json();

      if (userData.success) {
        // Store authentication data
        localStorage.setItem("authToken", userData.token);
        localStorage.setItem("userData", JSON.stringify(userData.user));
        localStorage.setItem("userType", "linkedin");

        navigate("/dashboard");
      } else {
        setLinkedinError(userData.message || "LinkedIn sign-in failed");
      }
    } catch (err) {
      console.error("LinkedIn callback error:", err);
      if (err.name === "TypeError" && err.message.includes("Failed to fetch")) {
        setLinkedinError(
          "Cannot connect to server. Please check if your backend is running on port 5000."
        );
      } else {
        setLinkedinError(`LinkedIn authentication failed: ${err.message}`);
      }
    } finally {
      localStorage.removeItem("linkedin_state");
    }
  };

  // Separate callback function for better error handling
  const handleGoogleCallback = async (response) => {
    console.log("Google response:", response);
    setIsGoogleSignInProgress(false);

    if (!response.credential) {
      setGoogleError("Google sign-in failed - no credential received");
      return;
    }

    try {
      const base64Url = response.credential.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const userInfo = JSON.parse(jsonPayload);
      const { email, picture, name } = userInfo;

      console.log("Extracted user info:", { email, name }); // Debug log

      const isExistresponse = await verifyTheUserExistOrNot(email);
      console.log("User existence check:", isExistresponse);

      const { exists, candidateData ,token} = isExistresponse;

      if (exists) {
   
        console.log("User exists, logging in..."); 

     

        localStorage.setItem("authToken", token);
        localStorage.setItem("userData", JSON.stringify(candidateData));
        localStorage.setItem("userType", "employee");

        navigate("/dashboard");
      } else {
   
        console.log("User doesn't exist"); // Debug log
        navigate(
          `/employee-registration?isgoogle=true&email=${encodeURIComponent(
            email
          )}&name=${encodeURIComponent(name)}`
        );
      }
    } catch (err) {
      console.error("Google authentication error:", err);
      setGoogleError(`Authentication failed: ${err.message}`);
    }
  };

  // Improved Google Sign-In Handler
  const handleGoogleSignIn = () => {
    if (isGoogleSignInProgress) return;
    setIsGoogleSignInProgress(true);
    setGoogleError(null);

    // Check if Google library is loaded
    if (!window.google || !window.google.accounts) {
      setGoogleError("Google Sign-In not loaded. Please refresh the page.");
      setIsGoogleSignInProgress(false);
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
        auto_select: false,
      });

      // Use a direct prompt with better error handling
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: render button programmatically
          const button = document.createElement("div");
          button.style.display = "none";
          document.body.appendChild(button);

          window.google.accounts.id.renderButton(button, {
            theme: "outline",
            size: "large",
            width: 200,
          });

          // Programmatically click the button
          const googleButton = button.querySelector("div[role=button]");
          if (googleButton) {
            googleButton.click();
          } else {
            setGoogleError(
              "Popup was blocked. Please allow popups for this site and try again."
            );
            setIsGoogleSignInProgress(false);
          }

          // Clean up
          setTimeout(() => {
            if (document.body.contains(button)) {
              document.body.removeChild(button);
            }
          }, 1000);
        }
      });
    } catch (err) {
      setIsGoogleSignInProgress(false);
      setGoogleError("Google sign-in initialization failed");
      console.error("Google Sign-In error:", err);
    }
  };

  // Load Google Sign-In script properly
  useEffect(() => {
    // Check if script is already loaded
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
      return;
    }

    // Check if script is already in the process of being loaded
    const existingScript = document.querySelector(
      'script[src="https://accounts.google.com/gsi/client"]'
    );

    if (existingScript) return;

    // Load the Google script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log("Google Sign-In script loaded");
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    };

    script.onerror = () => {
      console.error("Failed to load Google Sign-In script");
      setGoogleError("Failed to load Google Sign-In. Please refresh the page.");
    };

    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Clear any existing login data when component mounts
    localStorage.removeItem("authToken");
    localStorage.removeItem("employerToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userType");

    // Prevent automatic Google prompts
    const preventAutoPrompt = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.disableAutoSelect();
      }
    };

    // Run immediately and after a delay
    preventAutoPrompt();
    setTimeout(preventAutoPrompt, 1000);

    // Listen for page visibility changes to prevent prompts
    document.addEventListener("visibilitychange", preventAutoPrompt);

    return () => {
      document.removeEventListener("visibilitychange", preventAutoPrompt);
    };
  }, []);

  return (
    <>
      {/* Add CSS animations for loading spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .social-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 12px 24px;
            margin: 5px;
            border-radius: 8px;
            text-decoration: none;
            min-width: 180px;
            height: 45px;
            font-size: 14px;
            font-weight: 500;
            border: 1px solid #e0e0e0;
            transition: all 0.2s ease;
            cursor: pointer;
            background: white;
          }
          
          .social-btn:hover {
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            transform: translateY(-1px);
            text-decoration: none;
          }
          
          .social-btn.linkedin {
            background-color: #0077b5;
            color: white;
            border-color: #0077b5;
          }
          
          .social-btn.apple {
            background-color: #000;
            color: white;
            border-color: #000;
          }
        `}
      </style>

      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>

      <main className="jobplugin__main">
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
              <div style={{ textAlign: "center" }}>
                <p className="mb-0">
                  <b>Continue With</b>
                </p>

                {/* Single Google Sign-In Button - Clean Custom Implementation */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleSignInProgress}
                  className="social-btn"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 24px",
                    margin: "5px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    minWidth: "200px",
                    height: "45px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "1px solid #dadce0",
                    transition: "all 0.2s ease",
                    cursor: isGoogleSignInProgress ? "not-allowed" : "pointer",
                    opacity: isGoogleSignInProgress ? 0.7 : 1,
                    backgroundColor: "white",
                    color: "#3c4043",
                  }}
                >
                  {isGoogleSignInProgress ? (
                    <>
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          border: "2px solid #f3f3f3",
                          borderTop: "2px solid #4285f4",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          marginRight: "10px",
                        }}
                      ></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        style={{ marginRight: "10px" }}
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign in with Google
                    </>
                  )}
                </button>

                {/* LinkedIn Sign-In Button */}
                <button
                  type="button"
                  className="social-btn linkedin"
                  onClick={() => {
                    // Add LinkedIn functionality here later
                    alert("LinkedIn integration coming soon!");
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginRight: "10px" }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Continue with LinkedIn
                </button>

                {/* Apple Sign-In Button */}
                {/* <button
                  type="button"
                  className="social-btn apple"
                  onClick={() => {
                    // Add Apple functionality here later
                    alert("Apple Sign-In integration coming soon!");
                  }}
                >
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 814 1000"
                    fill="currentColor"
                    style={{ marginRight: "10px" }}
                  >
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-159.5 123.1-70.1 0-92.2-41.7-171.1-41.7-76.1 0-103.9 42.8-168.6 42.8-65.1 0-105.7-57.6-155.9-127.9C26.8 675.6-5.4 492.5-5.4 312.1c0-200.9 130.4-307.4 250.4-307.4 68.1 0 124.4 44.5 167.9 44.5 41.2 0 105.2-47.8 181.5-47.8 29.3 0 135.3 2.8 200.3 106.5zm-108.5-123.4C707.9 178.8 720.4 108.9 720.4 39c0-10.2-.6-20.7-1.9-30.1 0 0-49.6 2.4-101.8 39.5-45.2 32.7-85.2 74.9-98.8 129.6-2.4 9.7-3.7 19.9-3.7 30.1 0 9.7.6 18.6.9 27.2 3.2.1 8.5.2 14.8.2 46.1-.1 85.9-16.6 115.8-43.9z" />
                  </svg>
                  Continue with Apple
                </button> */}

                {googleError && (
                  <div
                    className="alert alert-danger mt-2"
                    style={{ margin: "10px auto", maxWidth: "400px" }}
                  >
                    {googleError}
                    <br />
                    <small>
                      Please: 1. Allow popups for this site 2. Enable
                      third-party cookies 3.{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setGoogleError(null);
                          handleGoogleSignIn();
                        }}
                        style={{
                          color: "#721c24",
                          textDecoration: "underline",
                        }}
                      >
                        Try again
                      </a>
                    </small>
                  </div>
                )}
              </div>
              <br />

              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>

              <h1 className="text-secondary h3 mb-0">Login To Continue</h1>
              <br />

              {error && (
                <div className="jobplugin__form-row">
                  <div className="alert alert-danger">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field col-md-6">
                      <input
                        type="email"
                        name="email"
                        value={values.email || ""}
                        onChange={handleChange}
                        style={{ padding: "5px 30px" }}
                        className={`form-control ${
                          errors.email ? "is-invalid" : ""
                        }`}
                        placeholder="Email Address"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                    <div
                      className="jobplugin__form-field col-md-6"
                      style={{ position: "relative" }}
                    >
                      <input
                        type={passwordInputType}
                        name="password"
                        value={values.password || ""}
                        onChange={handleChange}
                        style={{ padding: "5px 30px", paddingRight: "40px" }}
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Password"
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
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Logging in..."
                    ) : (
                      <>
                        <FaUserTie className="text-primary" /> &nbsp; Login
                      </>
                    )}
                  </button>
                </div>
              </form>
              <div className="text-center mb-3">
                <Link
                  to="/forgot-password"
                  className="jobplugin__userbox-textinfo"
                >
                  Forgot Password
                </Link>
              </div>
              <br />

              <div className="jobplugin__userbox-seperator">
                <span className="bg-light">or</span>
              </div>

              <p className="jobplugin__userbox-textinfo">
                Don't have an account?{" "}
                <a className="hover:jobplugin__text-primary" href="signup">
                  Sign Up
                </a>
              </p>
            </div>
          </div>

          <br />
        </div>
      </main>

      {/* Add this hidden div for Google fallback */}
      <div id="googleButtonContainer" style={{ display: "none" }}></div>
    </>
  );
};

export default LoginPage;
