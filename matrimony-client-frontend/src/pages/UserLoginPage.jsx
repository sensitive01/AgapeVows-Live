// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Make sure you have react-router-dom installed

// import Footer from "../components/Footer";
// import CopyRights from "../components/CopyRights";
// import { verifyUser } from "../api/axiosService/userSignUpService";
// import LayoutComponent from "../components/layouts/LayoutComponent";

// const UserLoginPage = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     rememberMe: false,
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (errors[name]) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = "Email is required";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "Please enter a valid email address";
//     }

//     if (!formData.password) {
//       newErrors.password = "Password is required";
//     } else if (formData.password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters long";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError("");

//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await verifyUser(formData);
//       if (response.status === 200) {
//         localStorage.setItem("userId", response.data.userId);
//         localStorage.setItem("userName", response.data.userName);
//         if (response.data.profileImage) {
//           localStorage.setItem("userImage", response.data.profileImage);
//         }
//         navigate("/user/user-dashboard-page", { replace: true });
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       if (error.response && error.response.data) {
//         setLoginError(error.response.data.message || "Invalid credentials");
//       } else {
//         setLoginError(
//           "Network error. Please check your connection and try again.",
//         );
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div className="pt-16">
//         <div className="login" style={{ paddingTop: "40px" }}>
//           <div className="container">
//             <div className="row">
//               <div className="inn">
//                 <div className="lhs">
//                   <div className="tit">
//                     <h2>
//                       Now{" "}
//                       <b style={{ color: "white" }}>
//                         Find <br /> your life partner
//                       </b>{" "}
//                       Easy and fast.
//                     </h2>
//                   </div>
//                   <div className="im">
//                     <img src="images/login-couple.png" alt="" />
//                   </div>
//                   <div className="log-bg">&nbsp;</div>
//                 </div>
//                 <div className="rhs">
//                   <div>
//                     <div className="form-tit">
//                       <h4>Start for free</h4>
//                       <h1>Sign in to Matrimony</h1>
//                       <p>
//                         Not a member?{" "}
//                         <a href="/user/user-sign-up">Sign up now</a>
//                       </p>
//                     </div>
//                     <div className="form-login">
//                       <form onSubmit={handleSubmit}>
//                         {loginError && (
//                           <div className="alert alert-danger" role="alert">
//                             {loginError}
//                           </div>
//                         )}

//                         <div className="form-group">
//                           <label className="lb">Email:</label>
//                           <input
//                             type="email"
//                             className={`form-control ${
//                               errors.email ? "is-invalid" : ""
//                             }`}
//                             id="email"
//                             placeholder="Enter email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             disabled={isLoading}
//                           />
//                           {errors.email && (
//                             <div className="invalid-feedback">
//                               {errors.email}
//                             </div>
//                           )}
//                         </div>

//                         <div className="form-group">
//                           <label className="lb">Password:</label>
//                           <input
//                             type="password"
//                             className={`form-control ${
//                               errors.password ? "is-invalid" : ""
//                             }`}
//                             id="pwd"
//                             placeholder="Enter password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             disabled={isLoading}
//                           />
//                           {errors.password && (
//                             <div className="invalid-feedback">
//                               {errors.password}
//                             </div>
//                           )}
//                         </div>

//                         <div className="form-group form-check">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="rememberMe"
//                               checked={formData.rememberMe}
//                               onChange={handleInputChange}
//                               disabled={isLoading}
//                             />{" "}
//                             Remember me
//                           </label>
//                         </div>

//                         <button
//                           type="submit"
//                           className="btn"
//                           disabled={isLoading}
//                           style={{
//                             background: "#A020F0",
//                             borderColor: "#A020F0",
//                             color: "#fff",
//                           }}
//                         >
//                           {isLoading ? "Signing in..." : "Sign in"}
//                         </button>
//                       </form>

//                       <div
//                         className="forgot-password"
//                         style={{ marginTop: "15px" }}
//                       >
//                         <a href="/forgot-password">Forgot your password?</a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//       <CopyRights />
//     </div>
//   );
// };

// export default UserLoginPage;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { verifyUser } from "../api/axiosService/userSignUpService";
import LayoutComponent from "../components/layouts/LayoutComponent";

const UserLoginPage = () => {
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

  // 👁️ password visibility state
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

        const redirectPath =
          location.state?.from || "/user/user-dashboard-page";

        navigate(redirectPath, {
          replace: true,
          state: {
            formData: location.state?.formData,
          },
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setLoginError(error.response.data.message || "Invalid credentials");
      } else {
        setLoginError(
          "Network error. Please check your connection and try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="login" style={{ paddingTop: "40px" }}>
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
                      <span style={{ color: "#fff" }}>Now </span>
                      <b style={{ color: "#FFD700" }}>
                        Find <br /> your life partner
                      </b>{" "}
                      <span style={{ color: "#fff" }}>Easy and fast.</span>
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
                      <h4>Start for free</h4>
                      <h1>Sign in to Matrimony</h1>
                      <p>
                        Not a member?{" "}
                        <a href="/user/user-sign-up">Sign up now</a>
                      </p>
                    </div>

                    <div className="form-login">
                      <form onSubmit={handleSubmit}>
                        {loginError && (
                          <div className="alert alert-danger" role="alert">
                            {loginError}
                          </div>
                        )}

                        {/* Email */}
                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""
                              }`}
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            style={{ caretColor: "black" }} // ✅ cursor fix
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email}
                            </div>
                          )}
                        </div>

                        {/* Password */}
                        <div
                          className="form-group"
                          style={{ position: "relative" }}
                        >
                          <label className="lb">Password:</label>

                          <input
                            type={showPassword ? "text" : "password"}
                            className={`form-control ${errors.password ? "is-invalid" : ""
                              }`}
                            id="pwd"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            style={{
                              paddingRight: "40px",
                              caretColor: "black", // ✅ cursor fix
                            }}
                          />

                          {/* 👁️ Press & Hold */}
                          <span
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            onTouchStart={() => setShowPassword(true)}
                            onTouchEnd={() => setShowPassword(false)}
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "38px",
                              cursor: "pointer",
                            }}
                          >
                            👁️
                          </span>

                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password}
                            </div>
                          )}
                        </div>

                        {/* Remember me */}
                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="rememberMe"
                              checked={formData.rememberMe}
                              onChange={handleInputChange}
                              disabled={isLoading}
                            />{" "}
                            Remember me
                          </label>
                        </div>

                        {/* Submit */}
                        <button
                          type="submit"
                          className="btn"
                          disabled={isLoading}
                          style={{
                            background: "#A020F0",
                            borderColor: "#A020F0",
                            color: "#fff",
                          }}
                        >
                          {isLoading ? "Signing in..." : "Sign in"}
                        </button>
                      </form>

                      <div
                        className="forgot-password"
                        style={{ marginTop: "15px" }}
                      >
                        <a href="/forgot-password">
                          Forgot your password?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                {/* rhs end */}
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

export default UserLoginPage;