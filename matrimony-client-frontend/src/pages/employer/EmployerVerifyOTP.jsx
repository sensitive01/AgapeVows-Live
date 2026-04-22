// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// // Import images
// import logo from '../../assets/employer/assets/img/logo.svg';
// import bg1 from '../../assets/employer/assets/img/bg/bg-01.webp';
// import bg2 from '../../assets/employer/assets/img/bg/bg-02.png';
// import bg3 from '../../assets/employer/assets/img/bg/bg-03.webp';
// import authBg from '../../assets/employer/assets/img/bg/authentication-bg-01.webp';

// const EmployerVerifyOTP = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [timer, setTimer] = useState(60);
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const inputRefs = useRef([]);

//   // Initialize with location state
//   useEffect(() => {
//     if (location.state?.mobile) {
//       setMobile(location.state.mobile);
//       // Mask the mobile number for display
//       const maskedMobile = location.state.mobile.replace(/(\d{3})\d{4}(\d{3})/, '$1****$2');
//       setMobile(maskedMobile);
//     }
//     if (location.state?.email) {
//       setEmail(location.state.email);
//     }
//   }, [location.state]);

//   // Timer countdown
//   useEffect(() => {
//     let interval;
//     if (timer > 0) {
//       interval = setInterval(() => {
//         setTimer(prev => prev - 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [timer]);

//   const handleChange = (e, index) => {
//     const value = e.target.value;

//     // Only allow numbers
//     if (value && !/^\d+$/.test(value)) {
//       return;
//     }

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto focus to next input
//     if (value && index < 3 && inputRefs.current[index + 1]) {
//       inputRefs.current[index + 1].focus();
//     }

//     // Auto submit when all digits are entered
//     if (index === 3 && value) {
//       const fullOtp = newOtp.join('');
//       if (fullOtp.length === 4) {
//         handleSubmit(fullOtp);
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData('text/plain').trim();

//     if (/^\d{4}$/.test(pasteData)) {
//       const newOtp = pasteData.split('').slice(0, 4);
//       setOtp(newOtp);
//       handleSubmit(pasteData);
//     }
//   };

//   const handleSubmit = async (otpValue) => {
//     const otpToVerify = otpValue || otp.join('');

//     if (otpToVerify.length !== 4) {
//       setError('Please enter a valid 4-digit OTP');
//       return;
//     }

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post(
//         'https://api.edprofio.com/employer/employerverify-otp',
//         { otp: otpToVerify }
//       );

//       if (response.data.success) {
//         // OTP verified successfully
//         navigate('/employer/reset-password', {
//           state: {
//             mobile: location.state?.mobile,
//             email: location.state?.email
//           }
//         });
//       } else {
//         setError(response.data.message || 'Invalid OTP');
//       }
//     } catch (err) {
//       console.error('OTP verification error:', err);
//       if (err.response) {
//         setError(err.response.data.message || 'OTP verification failed');
//       } else {
//         setError('Network error. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     if (timer > 0) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       // Use the resend OTP endpoint instead of forgot password
//       const response = await axios.post(
//         'https://api.edprofio.com/employer/employerresend-otp',
//         { userMobile: location.state?.mobile }
//       );

//       if (response.data.message === "OTP sent successfully") {
//         setTimer(60); // Reset timer
//         setOtp(['', '', '', '']); // Clear previous OTP
//         if (inputRefs.current[0]) {
//           inputRefs.current[0].focus(); // Focus on first input
//         }
//         setError(null);
//       } else {
//         setError(response.data.message || 'Failed to resend OTP');
//       }
//     } catch (err) {
//       console.error('Resend OTP error:', err);
//       if (err.response) {
//         setError(err.response.data.message || 'Failed to resend OTP');
//       } else {
//         setError('Network error. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="bg-white">
//       {/* Main Wrapper */}
//       <div className="main-wrapper">
//         <div className="container-fuild">
//           <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
//             <div className="row">
//               <div className="col-lg-8">
//                 <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
//                   <div className="bg-overlay-img">
//                     <img src={bg1} className="bg-1" alt="Background 1" />
//                     <img src={bg2} className="bg-2" alt="Background 2" />
//                     <img src={bg3} className="bg-3" alt="Background 3" />
//                   </div>
//                   <div className="authentication-card w-100">
//                     <div className="authen-overlay-item border w-100">
//                       <h1 className="text-white display-1">Empowering Schools <br /> through seamless Staff <br /> management.</h1>
//                       <div className="my-4 mx-auto authen-overlay-img">
//                         <img src={authBg} alt="Authentication Background" />
//                       </div>
//                       <div>
//                         <p className="text-white fs-20 fw-semibold text-center">
//                           Efficiently manage your workforce, streamline <br /> operations effortlessly.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-4 col-md-12 col-sm-12">
//                 <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
//                   <div className="col-lg-10 mx-auto vh-100">
//                     <form
//                       onSubmit={(e) => {
//                         e.preventDefault();
//                         handleSubmit();
//                       }}
//                       className="vh-100 digit-group"
//                     >
//                       <div className="vh-100 d-flex flex-column justify-content-between p-4">
//                         <div className="mx-auto text-center pt-4">
//                           <img src={logo} width="240px" className="img-fluid" alt="Logo" />
//                         </div>
//                         <div>
//                           <div className="text-center mb-3">
//                             <h2 className="mb-2">2 Step Verification</h2>
//                             <p className="mb-0">
//                               Please enter the OTP received to confirm your account ownership.
//                               A code has been sent to {email ?
//                                 `******${email.split('@')[0].slice(-3)}@${email.split('@')[1]}` :
//                                 mobile}
//                             </p>
//                           </div>

//                           {error && (
//                             <div className="alert alert-danger mb-3">
//                               {error}
//                             </div>
//                           )}

//                           <div className="text-center otp-input">
//                             <div className="d-flex align-items-center mb-3">
//                               {[0, 1, 2, 3].map((index) => (
//                                 <input
//                                   key={index}
//                                   type="text"
//                                   className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3"
//                                   id={`digit-${index + 1}`}
//                                   name={`digit-${index + 1}`}
//                                   value={otp[index]}
//                                   onChange={(e) => handleChange(e, index)}
//                                   onKeyDown={(e) => handleKeyDown(e, index)}
//                                   onPaste={handlePaste}
//                                   maxLength="1"
//                                   ref={(el) => (inputRefs.current[index] = el)}
//                                   autoFocus={index === 0}
//                                   disabled={isLoading}
//                                 />
//                               ))}
//                             </div>
//                             <div>
//                               <div className="badge bg-danger-transparent mb-3">
//                                 <p className="d-flex align-items-center">
//                                   <i className="ti ti-clock me-1"></i>
//                                   {formatTime(timer)}
//                                 </p>
//                               </div>
//                               <div className="mb-3 d-flex justify-content-center">
//                                 <p className="text-gray-9">
//                                   Didn't get the OTP?{' '}
//                                   <button
//                                     type="button"
//                                     className={`text-primary ${timer > 0 ? 'text-muted' : ''}`}
//                                     onClick={handleResendOTP}
//                                     disabled={timer > 0 || isLoading}
//                                   >
//                                     Resend OTP
//                                   </button>
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                           <div className="mb-3">
//                             <button
//                               type="submit"
//                               className="btn btn-primary w-100"
//                               disabled={isLoading || otp.join('').length !== 4}
//                             >
//                               {isLoading ? (
//                                 <>
//                                   <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                                   Verifying...
//                                 </>
//                               ) : 'Verify & Proceed'}
//                             </button>
//                           </div>
//                         </div>
//                         <div className="mt-5 pb-4 text-center">
//                           <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EdProfio</p>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerVerifyOTP;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import images
import logo from "../../assets/employer/assets/img/logo - dark.png";
import bg1 from "../../assets/employer/assets/img/bg/bg-01.webp";
import bg2 from "../../assets/employer/assets/img/bg/bg-02.png";
import bg3 from "../../assets/employer/assets/img/bg/bg-03.webp";
import authBg from "../../assets/employer/assets/img/bg/authentication-bg-01.webp";

const EmployerVerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [displayMobile, setDisplayMobile] = useState("");
  const [actualMobile, setActualMobile] = useState("");
  const [email, setEmail] = useState("");
  const inputRefs = useRef([]);
  const [currentOtp, setCurrentOtp] = useState("");

  const showOtpToast = (otpValue, isNew = false) => {
    toast.info(
      <div>
        <div>
          {isNew ? "New " : ""}Development OTP: <strong>{otpValue}</strong>
        </div>
        <div className="small">This is shown for testing purposes only</div>
      </div>,
      {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    );
  };

  // Initialize with location state
  useEffect(() => {
    if (location.state?.mobile) {
      const originalMobile = location.state.mobile;
      setActualMobile(originalMobile); // Store original for API calls
      // Mask the mobile number for display
      const maskedMobile = originalMobile.replace(
        /(\d{3})\d{4}(\d{3})/,
        "$1****$2"
      );
      setDisplayMobile(maskedMobile);
    }
    if (location.state?.email) {
      setEmail(location.state.email);
    }

    // Check for OTP in session storage first
    const sessionOtp = sessionStorage.getItem("tempOtp");
    if (sessionOtp) {
      setCurrentOtp(sessionOtp);
      showOtpToast(sessionOtp, true);
      sessionStorage.removeItem("tempOtp");
    }
    // If no session OTP, check location state
    else if (location.state?.otp) {
      setCurrentOtp(location.state.otp);
      showOtpToast(location.state.otp);
      // Clear the OTP from location state
      window.history.replaceState({ ...location.state, otp: undefined }, "");
    }
  }, [location.state]);

  // Timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus to next input
    if (value && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }

    // Auto submit when all digits are entered
    if (index === 3 && value) {
      const fullOtp = newOtp.join("");
      if (fullOtp.length === 4) {
        handleSubmit(fullOtp);
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split("").slice(0, 4);
      setOtp(newOtp);
      handleSubmit(pasteData);
    }
  };

  const handleSubmit = async (otpValue) => {
    const otpToVerify = otpValue || otp.join("");

    if (otpToVerify.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://api.edprofio.com/employer/employerverify-otp",
        { otp: otpToVerify }
      );

      if (response.data.success) {
        navigate("/employer/reset-password", {
          state: {
            mobile: actualMobile, // Use the actual mobile number
            email: location.state?.email,
          },
        });
      } else {
        setError(response.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      if (err.response) {
        setError(err.response.data.message || "OTP verification failed");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer > 0) return;

    if (!actualMobile) {
      setError("Mobile number not found");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Sending resend OTP request with mobile:", actualMobile);
      const response = await axios.post(
        "https://api.edprofio.com/employer/employerresend-otp",
        { userMobile: actualMobile } // Use the actual unmasked number
      );

      if (response.data.message === "OTP sent successfully") {
        setTimer(30); // Reset timer
        setOtp(["", "", "", ""]); // Clear previous OTP
        setCurrentOtp(response.data.otp); // Store the new OTP
        showOtpToast(response.data.otp, true); // Show new OTP

        // Store in sessionStorage temporarily
        sessionStorage.setItem("tempOtp", response.data.otp);

        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend OTP error:", err);
      if (err.response) {
        setError(err.response.data.message || "Failed to resend OTP");
      } else {
        setError("Network error. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="bg-white">
      {/* Toast Container */}
      <ToastContainer />

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
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-lg-10 mx-auto vh-100">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                      className="vh-100 digit-group"
                    >
                      <div className="vh-100 d-flex flex-column justify-content-between p-4">
                        <div className="mx-auto text-center pt-4">
                          <img
                            src={logo}
                            width="240px"
                            className="img-fluid"
                            alt="Logo"
                          />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">2 Step Verification</h2>
                            <p className="mb-0">
                              Please enter the OTP received to confirm your
                              account ownership. A code has been sent to{" "}
                              {email
                                ? `******${email.split("@")[0].slice(-3)}@${
                                    email.split("@")[1]
                                  }`
                                : displayMobile}
                            </p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3">
                              {error}
                            </div>
                          )}

                          <div className="text-center otp-input">
                            <div className="d-flex align-items-center mb-3">
                              {[0, 1, 2, 3].map((index) => (
                                <input
                                  key={index}
                                  type="text"
                                  className="rounded w-100 py-sm-3 py-2 text-center fs-26 fw-bold me-3"
                                  id={`digit-${index + 1}`}
                                  name={`digit-${index + 1}`}
                                  value={otp[index]}
                                  onChange={(e) => handleChange(e, index)}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  onPaste={handlePaste}
                                  maxLength="1"
                                  ref={(el) => (inputRefs.current[index] = el)}
                                  autoFocus={index === 0}
                                  disabled={isLoading}
                                />
                              ))}
                            </div>
                            <div>
                              <div className="badge bg-danger-transparent mb-3">
                                <p className="d-flex align-items-center">
                                  <i className="ti ti-clock me-1"></i>
                                  {formatTime(timer)}
                                </p>
                              </div>
                              <div className="mb-3 d-flex justify-content-center">
                                <p className="text-gray-9">
                                  Didn't get the OTP?{" "}
                                  <button
                                    type="button"
                                    className={`text-primary ${
                                      timer > 0 ? "text-muted" : ""
                                    }`}
                                    onClick={handleResendOTP}
                                    disabled={timer > 0 || isLoading}
                                  >
                                    Resend OTP
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isLoading || otp.join("").length !== 4}
                            >
                              {isLoading ? (
                                <>
                                  <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                  ></span>
                                  Verifying...
                                </>
                              ) : (
                                "Verify & Proceed"
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

export default EmployerVerifyOTP;
