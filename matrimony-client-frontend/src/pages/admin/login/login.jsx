// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// // Import images
// import logo from '../../../assets/admin/assets/img/logo.svg';
// import bg1 from '../../../assets/admin/assets/img/bg/bg-01.webp';
// import bg2 from '../../../assets/admin/assets/img/bg/bg-02.png';
// import bg3 from '../../../assets/admin/assets/img/bg/bg-03.webp';
// import authBg from '../../../assets/admin/assets/img/bg/authentication-bg-01.webp';
// import googleLogo from '../../../assets/admin/assets/img/icons/google-logo.svg';
// import appleLogo from '../../../assets/admin/assets/img/icons/apple-logo.svg';
// import linkedinLogo from '../../../assets/admin/assets/img/icons/linkedin.svg';

// const AdminLoginPage = () => {
//     const navigate = useNavigate();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     // Form state - changed from email to username to match the API
//     const [formData, setFormData] = useState({
//         username: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [rememberMe, setRememberMe] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));

//         // Clear error when user types
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: null
//             }));
//         }
//     };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form
//     const formErrors = {};
//     if (!formData.username) formErrors.username = 'Username is required';
//     if (!formData.password) formErrors.password = 'Password is required';

//     setErrors(formErrors);

//     if (Object.keys(formErrors).length > 0) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//         const response = await fetch('https://api.edprofio.com/admin/adminlogin', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 username: formData.username,
//                 password: formData.password
//             })
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             throw new Error(data.message || 'Login failed');
//         }

//         if (!data.success) {
//             throw new Error(data.message || 'Invalid credentials');
//         }

//         // Since backend doesn't return admin data, we'll store just the username
//         // and fetch complete admin data later when needed
//         const adminData = {
//             username: formData.username
//         };

//         // Store authentication status and admin data in localStorage
//         localStorage.setItem('adminToken', 'admin-authenticated');
//         localStorage.setItem('adminData', JSON.stringify(adminData));

//         // Navigate to dashboard
//         navigate('/admin/dashboard');

//     } catch (err) {
//         setError(err.message || 'Login failed. Please try again.');
//         console.error('Login error:', err);
//     } finally {
//         setIsLoading(false);
//     }
// };

//     const togglePasswordVisibility = () => {
//         setPasswordVisible(!passwordVisible);
//     };

//     return (
//         <div className="bg-white">
//             {/* Main Wrapper */}
//             <div className="main-wrapper">
//                 <div className="container-fuild">
//                     <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
//                         <div className="row">
//                             <div className="col-lg-5">
//                                 <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
//                                     <div className="bg-overlay-img">
//                                         <img src={bg1} className="bg-1" alt="Background 1" />
//                                         <img src={bg2} className="bg-2" alt="Background 2" />
//                                         <img src={bg3} className="bg-3" alt="Background 3" />
//                                     </div>
//                                     <div className="authentication-card w-100">
//                                         <div className="authen-overlay-item border w-100">
//                                             <h1 className="text-white display-1">
//                                                 Empowering Schools <br /> through seamless Staff <br /> management.
//                                             </h1>
//                                             <div className="my-4 mx-auto authen-overlay-img">
//                                                 <img src={authBg} alt="Authentication Background" />
//                                             </div>
//                                             <div>
//                                                 <p className="text-white fs-20 fw-semibold text-center">
//                                                     Efficiently manage your workforce, streamline <br /> operations effortlessly.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-lg-7 col-md-12 col-sm-12">
//                                 <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
//                                     <div className="col-md-7 mx-auto vh-100">
//                                         <form onSubmit={handleSubmit} className="vh-100">
//                                             <div className="vh-100 d-flex flex-column justify-content-between p-4">
//                                                 <div className="mx-auto mb-4 text-center">
//                                                     <img src={logo} width="240px" className="img-fluid" alt="Logo" />
//                                                 </div>
//                                                 <div>
//                                                     <div className="text-center mb-3">
//                                                         <h2 className="mb-2">Sign In</h2>
//                                                         <p className="mb-0">Please enter your details to sign in</p>
//                                                     </div>

//                                                     {error && (
//                                                         <div className="alert alert-danger mb-3">
//                                                             {error}
//                                                         </div>
//                                                     )}

//                                                     <div className="mb-3">
//                                                         <label className="form-label">Username</label>
//                                                         <div className="input-group">
//                                                             <input
//                                                                 type="text"
//                                                                 name="username"
//                                                                 value={formData.username}
//                                                                 onChange={handleChange}
//                                                                 className={`form-control border-end-0 ${errors.username ? 'is-invalid' : ''}`}
//                                                                 placeholder="Enter your username"
//                                                             />
//                                                             <span className="input-group-text border-start-0">
//                                                                 <i className="ti ti-user"></i>
//                                                             </span>
//                                                             {errors.username && <div className="invalid-feedback">{errors.username}</div>}
//                                                         </div>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <label className="form-label">Password</label>
//                                                         <div className="pass-group">
//                                                             <input
//                                                                 type={passwordVisible ? "text" : "password"}
//                                                                 name="password"
//                                                                 value={formData.password}
//                                                                 onChange={handleChange}
//                                                                 className={`pass-input form-control ${errors.password ? 'is-invalid' : ''}`}
//                                                                 placeholder="Enter your password"
//                                                             />
//                                                             <span
//                                                                 className={`ti toggle-password ${passwordVisible ? 'ti-eye' : 'ti-eye-off'}`}
//                                                                 onClick={togglePasswordVisibility}
//                                                                 style={{ cursor: 'pointer' }}
//                                                             ></span>
//                                                             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                                                         </div>
//                                                     </div>
//                                                     <div className="d-flex align-items-center justify-content-between mb-3">
//                                                         <div className="d-flex align-items-center">
//                                                             <div className="form-check form-check-md mb-0">
//                                                                 <input
//                                                                     className="form-check-input"
//                                                                     id="remember_me"
//                                                                     type="checkbox"
//                                                                     checked={rememberMe}
//                                                                     onChange={() => setRememberMe(!rememberMe)}
//                                                                 />
//                                                                 <label htmlFor="remember_me" className="form-check-label mt-0">
//                                                                     Remember Me
//                                                                 </label>
//                                                             </div>
//                                                         </div>
//                                                         <div className="text-end">
//                                                             <Link to="/admin/forgot-password" className="link-danger">
//                                                                 Forgot Password?
//                                                             </Link>
//                                                         </div>
//                                                     </div>
//                                                     <div className="mb-3">
//                                                         <button
//                                                             type="submit"
//                                                             className="btn btn-primary w-100"
//                                                             disabled={isLoading}
//                                                         >
//                                                             {isLoading ? (
//                                                                 <>
//                                                                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                                                     Signing In...
//                                                                 </>
//                                                             ) : 'Sign In'}
//                                                         </button>
//                                                     </div>
//                                                     {/* <div className="text-center">
//                                                         <h6 className="fw-normal text-dark mb-0">
//                                                             Don't have an account?{' '}
//                                                             <Link to="/admin/register" className="hover-a">
//                                                                 Create Account
//                                                             </Link>
//                                                         </h6>
//                                                     </div>
//                                                     <div className="login-or">
//                                                         <span className="span-or">Or</span>
//                                                     </div>
//                                                     <div className="mt-2">
//                                                         <div className="d-flex align-items-center justify-content-center flex-wrap">
//                                                             <div className="text-center me-2 flex-fill">
//                                                                 <button
//                                                                     type="button"
//                                                                     className="br-10 p-2 btn btn-outline-light border d-flex align-items-center justify-content-center"
//                                                                 >
//                                                                     <img
//                                                                         className="img-fluid m-1"
//                                                                         src={googleLogo}
//                                                                         alt="Google"
//                                                                     />
//                                                                 </button>
//                                                             </div>
//                                                             <div className="text-center me-2 flex-fill">
//                                                                 <button
//                                                                     type="button"
//                                                                     className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
//                                                                 >
//                                                                     <img
//                                                                         className="img-fluid m-1"
//                                                                         src={appleLogo}
//                                                                         alt="Apple"
//                                                                     />
//                                                                 </button>
//                                                             </div>
//                                                             <div className="text-center flex-fill">
//                                                                 <button
//                                                                     type="button"
//                                                                     className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
//                                                                 >
//                                                                     <img
//                                                                         className="img-fluid m-1"
//                                                                         src={linkedinLogo}
//                                                                         width="20px"
//                                                                         alt="LinkedIn"
//                                                                     />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </div> */}
//                                                 </div>
//                                                 <div className="mt-5 pb-4 text-center">
//                                                     <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EdProfio</p>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminLoginPage;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import images
import logo from "../../../assets/admin/assets/img/logo - dark.png";
import bg1 from "../../../assets/admin/assets/img/bg/bg-01.webp";
import bg2 from "../../../assets/admin/assets/img/bg/bg-02.png";
import bg3 from "../../../assets/admin/assets/img/bg/bg-03.webp";
import authBg from "../../../assets/admin/assets/img/bg/authentication-bg-01.webp";
import googleLogo from "../../../assets/admin/assets/img/icons/google-logo.svg";
import appleLogo from "../../../assets/admin/assets/img/icons/apple-logo.svg";
import linkedinLogo from "../../../assets/admin/assets/img/icons/linkedin.svg";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state - changed from email to username to match the API
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = {};
    if (!formData.username) formErrors.username = "Username is required";
    if (!formData.password) formErrors.password = "Password is required";

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.edprofio.com/admin/adminlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (!data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Since backend only returns adminid and username, we'll store those
      const adminData = {
        adminid: data.data.adminid,
        username: data.data.username,
      };

      // Store authentication status and admin data in localStorage
      localStorage.setItem("adminToken", "admin-authenticated");
      localStorage.setItem("adminData", JSON.stringify(adminData));

      // If remember me is checked, store credentials
      if (rememberMe) {
        localStorage.setItem(
          "rememberedAdmin",
          JSON.stringify({
            username: formData.username,
            // Note: We're not storing password for security reasons
          })
        );
      } else {
        localStorage.removeItem("rememberedAdmin");
      }

      // Navigate to dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
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
              <div className="col-lg-5">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src={bg1} className="bg-1" alt="Background 1" />
                    <img src={bg2} className="bg-2" alt="Background 2" />
                    <img src={bg3} className="bg-3" alt="Background 3" />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      <h1 className="text-white display-1">
                        Empowering Schools <br /> through seamless Staff <br />{" "}
                        management.
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
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-md-7 mx-auto vh-100">
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
                            <label className="form-label">Username</label>
                            <div className="input-group">
                              <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className={`form-control border-end-0 ${
                                  errors.username ? "is-invalid" : ""
                                }`}
                                placeholder="Enter your username"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-user"></i>
                              </span>
                              {errors.username && (
                                <div className="invalid-feedback">
                                  {errors.username}
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
                                to="/admin/forgot-password"
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

export default AdminLoginPage;
