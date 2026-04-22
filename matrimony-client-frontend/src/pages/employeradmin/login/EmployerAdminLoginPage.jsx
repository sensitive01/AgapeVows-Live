import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import images
import logo from "../../../../public/images/logo2.png";
import bg1 from "../../../assets/employer-admin/assets/img/bg/bg-01.webp";
import bg2 from "../../../assets/employer-admin/assets/img/bg/bg-02.png";
import bg3 from "../../../assets/employer-admin/assets/img/bg/bg-03.webp";
import authBg from "../../../assets/employer-admin/assets/img/bg/authentication-bg-01.webp";
import googleLogo from "../../../assets/employer-admin/assets/img/icons/google-logo.svg";
import appleLogo from "../../../assets/employer-admin/assets/img/icons/apple-logo.svg";
import linkedinLogo from "../../../assets/employer-admin/assets/img/icons/linkedin.svg";
import { loginEmployerAdmin } from "../../../api/services/projectServices";

const EmployerAdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = {};
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.password) formErrors.password = "Password is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginEmployerAdmin({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("EmployerAdminToken", response.token);
      const adminData = {
        _id: response.admin._id,
        email: response.admin.employeradminEmail,
        username: response.admin.employeradminUsername,
      };

      if (rememberMe) {
        localStorage.setItem("EmployerAdminData", JSON.stringify(adminData));
      } else {
        localStorage.setItem("EmployerAdminData", JSON.stringify(adminData));
      }
      navigate("/employer-admin/school-profile");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="bg-white">
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              {/* Changed from col-lg-5 to col-lg-8 to match first layout */}
              <div className="col-lg-8">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src={bg1} className="bg-1" alt="Background 1" />
                    <img src={bg2} className="bg-2" alt="Background 2" />
                    <img src={bg3} className="bg-3" alt="Background 3" />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      {/* Updated text alignment to match first layout */}
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
              {/* Changed from col-lg-7 to col-lg-4 to match first layout */}
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  {/* Changed from col-md-7 to col-lg-10 to match first layout */}
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
                            <h2 className="mb-2">Sign In</h2>
                            <p className="mb-0">
                              Please enter your details to sign in
                            </p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3">
                              {error}
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`form-control border-end-0 ${
                                  errors.email ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your email"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail"></i>
                              </span>
                              {errors.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="pass-group">
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pass-input form-control ${
                                  errors.password ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your password"
                              />
                              <span
                                className={`ti toggle-password ${
                                  passwordVisible ? "ti-eye" : "ti-eye-off"
                                }`}
                                onClick={togglePasswordVisibility}
                                style={{ cursor: "pointer" }}
                              ></span>
                              {errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <input
                                  className="form-check-input"
                                  id="remember_me"
                                  type="checkbox"
                                  checked={rememberMe}
                                  onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label
                                  htmlFor="remember_me"
                                  className="form-check-label mt-0"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                            <div className="text-end">
                              <Link
                                to="/employer-admin/forgot-password"
                                className="link-danger"
                              >
                                Forgot Password?
                              </Link>
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
                                  Signing In...
                                </>
                              ) : (
                                "Sign In"
                              )}
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Don't have an account?{" "}
                              <Link
                                to="/employer-admin/register"
                                className="hover-a"
                              >
                                Create Account
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

export default EmployerAdminLoginPage;
