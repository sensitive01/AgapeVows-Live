// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Footer from "../components/Footer";
// import CopyRights from "../components/CopyRights";
// import { sendSignUpRequest } from "../api/axiosService/userSignUpService";
// import LayoutComponent from "../components/layouts/LayoutComponent";

// const UserSignUp = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     agree: false,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     setSuccess("");

//     if (
//       !formData.name ||
//       !formData.email ||
//       !formData.phone ||
//       !formData.password
//     ) {
//       setError("Please fill in all required fields");
//       setLoading(false);
//       return;
//     }

//     if (!formData.agree) {
//       setError("Please accept the terms and conditions");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await sendSignUpRequest(formData);
//       console.log(response.data);
//       if (response.status === 201) {
//         setSuccess(response.data.message);
//         setTimeout(() => {
//           navigate("/user/user-login");
//         }, 1500);
//       }
//     } catch (err) {
//       setError("User already exists");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div className="pt-16">
//         <div className="login">
//           <div className="container">
//             <div className="row">
//               <div className="inn">
//                 <div className="lhs">
//                   <div className="tit">
//                     <h2>
//                       Now{" "}
//                       <b style={{ color: "white" }}>Find your life partner</b>{" "}
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
//                       <h1>Sign up to Matrimony</h1>
//                       <p>
//                         Already a member? <a href="/user/user-login">Login</a>
//                       </p>
//                     </div>
//                     <div className="form-login">
//                       {error && (
//                         <div className="alert alert-danger" role="alert">
//                           {error}
//                         </div>
//                       )}
//                       {success && (
//                         <div className="alert alert-success" role="alert">
//                           {success}
//                         </div>
//                       )}
//                       <form onSubmit={handleSubmit}>
//                         <div className="form-group">
//                           <label className="lb">Name:</label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter your full name"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label className="lb">Email:</label>
//                           <input
//                             type="email"
//                             className="form-control"
//                             id="email"
//                             placeholder="Enter email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label className="lb">Phone:</label>
//                           <input
//                             type="tel"
//                             className="form-control"
//                             id="phone"
//                             placeholder="Enter phone number"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group">
//                           <label className="lb">Password:</label>
//                           <input
//                             type="password"
//                             className="form-control"
//                             id="pwd"
//                             placeholder="Enter password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                         <div className="form-group form-check">
//                           <label className="form-check-label">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               name="agree"
//                               checked={formData.agree}
//                               onChange={handleInputChange}
//                               required
//                             />{" "}
//                             Creating an account means you're okay with our{" "}
//                             <a href="#!">Terms of Service</a>, Privacy Policy,
//                             and our default Notification Settings.
//                           </label>
//                         </div>
//                         <button
//                           type="submit"
//                           className="btn"
//                           disabled={loading}
//                           style={{
//                             background: "#A020F0",
//                             borderColor: "#A020F0",
//                             color: "#fff",
//                           }}
//                         >
//                           {loading ? "Creating Account..." : "Create Account"}
//                         </button>
//                       </form>
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

// export default UserSignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { sendSignUpRequest } from "../api/axiosService/userSignUpService";
import LayoutComponent from "../components/layouts/LayoutComponent";
// ✅ REMOVED SidebarLoginComponent as we use the one from MainLayout
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// ✅ NEW ICON IMPORT
import { FaEye } from "react-icons/fa";

const UserSignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "in",
    password: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Login Popup Logic (Using MainLayout's sidebar)
  const openLoginPopup = (e) => {
    e.preventDefault();
    const menuPop = document.querySelector('.menu-pop1');
    const popBg = document.querySelector('.pop-bg');
    if (menuPop) menuPop.classList.add('act');
    if (popBg) popBg.classList.add('act');
    document.querySelectorAll('.mob-me-all').forEach((el) => el.classList.remove('act'));
    document.body.style.overflow = 'hidden';
  };

  // ✅ NEW STATE FOR PASSWORD VIEW
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ PHONE VALIDATION FUNCTION
  const validatePhone = () => {
    const phoneLength = formData.phone.length;

    if (formData.countryCode === "in" && phoneLength !== 12) {
      return "India number must be 10 digits";
    }

    if (formData.countryCode === "us" && phoneLength !== 11) {
      return "US number must be valid";
    }

    if (phoneLength < 10) {
      return "Invalid phone number";
    }

    if (phoneLength > 15) {
      return "Please enter correct number";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (!formData.agree) {
      setError("Please accept the terms and conditions");
      setLoading(false);
      return;
    }

    const phoneError = validatePhone();
    if (phoneError) {
      setError(phoneError);
      setLoading(false);
      return;
    }

    try {
      const response = await sendSignUpRequest(formData);
      console.log(response.data);
      if (response.status === 201) {
        setSuccess(response.data.message);
        setTimeout(() => {
          navigate("/user/user-login");
        }, 1500);
      }
    } catch (err) {
      setError("User already exists");
    } finally {
      setLoading(false);
    }
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
                      <span style={{ color: "#fff" }}>Now </span>
                      <b style={{ color: "#FFD700" }}>
                        Find Your Life Partner
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
                      <h1>Sign up to Matrimony</h1>
                      <p>
                        Already a member?{" "}
                        <a
                          href="#!"
                          onClick={openLoginPopup}
                        >
                          Login
                        </a>
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

                      <form onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label className="lb">Name:</label>
                          <input
                            type="text"
                            className="form-control custom-input"
                            placeholder="Enter your full name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control custom-input"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        {/* PHONE INPUT */}
                        <div className="form-group">
                          <label className="lb">Phone:</label>

                          <PhoneInput
                            country={"in"}
                            value={formData.phone}
                            onChange={(value, data) => {
                              setFormData((prev) => ({
                                ...prev,
                                phone: value,
                                countryCode: data.countryCode,
                              }));
                            }}
                            inputStyle={{ width: "100%" }}
                          />

                          {formData.phone.length > 15 && (
                            <small style={{ color: "red" }}>
                              Please enter correct number
                            </small>
                          )}
                        </div>

                        {/* ✅ PASSWORD FIELD WITH HOLD VIEW */}
                        <div className="form-group" style={{ position: "relative" }}>
                          <label className="lb">Password:</label>

                          <input
                            type={showPassword ? "text" : "password"}
                            className="form-control custom-input"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                          />

                          <FaEye
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "42px",
                              cursor: "pointer",
                              color: "#555",
                              zIndex: 10
                            }}
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            onTouchStart={() => setShowPassword(true)}
                            onTouchEnd={() => setShowPassword(false)}
                          />
                        </div>

                        <div className="form-group form-check">
                          <label className="form-check-label">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              name="agree"
                              checked={formData.agree}
                              onChange={handleInputChange}
                              required
                            />{" "}
                            Creating an account means you're okay with our{" "}
                            <a href="#!">Terms of Service</a>, Privacy Policy,
                            and our default Notification Settings.
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn"
                          disabled={loading}
                          style={{
                            background: "#A020F0",
                            borderColor: "#A020F0",
                            color: "#fff",
                          }}
                        >
                          {loading
                            ? "Creating Account..."
                            : "Create Account"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                {/* END RHS */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserSignUp;