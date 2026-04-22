// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const OTPVerificationPage = () => {
//   const [otp, setOtp] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [resendLoading, setResendLoading] = useState(false);
//   const [countdown, setCountdown] = useState(30);
//   const [mobile, setMobile] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state?.mobile) {
//       setMobile(location.state.mobile);
//     } else {
//       navigate('/forgot-password');
//     }
//   }, [location, navigate]);

//   useEffect(() => {
//     let timer;
//     if (countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!otp) {
//       setError('Please enter the OTP');
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const payload = { otp };
//       console.log('Sending OTP verification request with payload:', payload);

//       const response = await axios.post('https://api.edprofio.com/verify-otp', payload);
//       console.log('OTP verification response:', response.data);

//       if (response.data.success) {
//         navigate('/reset-password', { state: { mobile } });
//       } else {
//         setError(response.data.message || 'OTP verification failed');
//       }
//     } catch (err) {
//       console.error('OTP verification error:', err.response?.data || err);
//       setError(err.response?.data?.message || 'Failed to verify OTP. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     try {
//       setResendLoading(true);
//       const payload = { userMobile: mobile };
//       console.log('Sending OTP resend request with payload:', payload);

//       const response = await axios.post('https://api.edprofio.com/resend-otp', payload);
//       console.log('OTP resend response:', response.data);

//       if (response.data.message === "OTP sent successfully") {
//         setCountdown(30);
//         setError('');
//       } else {
//         setError(response.data.message || 'Failed to resend OTP');
//       }
//     } catch (err) {
//       console.error('Resend OTP error:', err.response?.data || err);
//       setError(err.response?.data?.message || 'Failed to resend OTP. Please try again.');
//     } finally {
//       setResendLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>
//       <div className="jobplugin__main">
//         <div className="jobplugin__main-holder">
//           <span className="jobplugin__pattern default-right"></span>
//           <span className="jobplugin__pattern default-left"></span>
//           <div className="jobplugin__visual-pattern">
//             <img src="images/visual-pattern.png" alt="Decorative pattern" />
//           </div>
//           <br />
//           <div className="jobplugin__container">
//             <div className="jobplugin__userbox bg-light shadow">
//               <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
//               <span className="jobplugin__userbox-bar"></span>

//               <h1 className="text-secondary h3 mb-4">Verify OTP</h1>
//               <p className="mb-4">Enter the OTP sent to your mobile number</p>

//               {error && (
//                 <div className="alert alert-danger mb-4">{error}</div>
//               )}

//               <form onSubmit={handleSubmit}>
//                 <div className="jobplugin__form-row mb-4">
//                   <div className="jobplugin__form-field">
//                     <input
//                       type="text"
//                       value={otp}
//                       onChange={(e) => setOtp(e.target.value)}
//                       className="form-control"
//                       placeholder="Enter OTP"
//                       style={{ padding: "10px 15px" }}
//                     />
//                   </div>
//                 </div>

//                 <div className="jobplugin__userbox-button">
//                   <button
//                     type="submit"
//                     className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? 'Verifying...' : 'Verify OTP'}
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-4 text-center">
//                 {countdown > 0 ? (
//                   <p>Resend OTP in {countdown} seconds</p>
//                 ) : (
//                   <button
//                     onClick={handleResendOTP}
//                     disabled={resendLoading}
//                     className="text-primary hover:underline bg-transparent border-none"
//                   >
//                     {resendLoading ? 'Sending...' : 'Resend OTP'}
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OTPVerificationPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [mobile, setMobile] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.mobile) {
      setMobile(location.state.mobile);
      if (location.state.otp) {
        setReceivedOtp(location.state.otp);
        setSuccessMessage(`OTP sent successfully: ${location.state.otp}`);
        setTimeout(() => setSuccessMessage(""), 10000); // Hide after 10 seconds
      }
    } else {
      navigate("/forgot-password");
    }
  }, [location, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    try {
      setIsLoading(true);
      const payload = { otp };
      console.log("Sending OTP verification request with payload:", payload);

      const response = await axios.post(
        "https://api.edprofio.com/verify-otp",
        payload
      );
      console.log("OTP verification response:", response.data);

      if (response.data.success) {
        navigate("/reset-password", { state: { mobile } });
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (err) {
      console.error("OTP verification error:", err.response?.data || err);
      setError(
        err.response?.data?.message || "Failed to verify OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendLoading(true);
      const payload = { userMobile: mobile };
      console.log("Sending OTP resend request with payload:", payload);

      const response = await axios.post(
        "https://api.edprofio.com/resend-otp",
        payload
      );
      console.log("OTP resend response:", response.data);

      if (response.data.message === "OTP sent successfully") {
        setReceivedOtp(response.data.otp);
        setSuccessMessage(`New OTP sent successfully: ${response.data.otp}`);
        setTimeout(() => setSuccessMessage(""), 10000); // Hide after 10 seconds
        setCountdown(30);
        setError("");
      } else {
        setError(response.data.message || "Failed to resend OTP");
      }
    } catch (err) {
      console.error("Resend OTP error:", err.response?.data || err);
      setError(
        err.response?.data?.message || "Failed to resend OTP. Please try again."
      );
    } finally {
      setResendLoading(false);
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

              <h1 className="text-secondary h3 mb-4">Verify OTP</h1>
              <p className="mb-4">Enter the OTP sent to your mobile number</p>

              {error && <div className="alert alert-danger mb-4">{error}</div>}

              {successMessage && (
                <div
                  className="alert alert-success mb-4"
                  style={{
                    position: "fixed",
                    right: "20px",
                    top: "20px",
                    zIndex: 1000,
                  }}
                >
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form-row mb-4">
                  <div className="jobplugin__form-field">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="form-control"
                      placeholder="Enter OTP"
                      style={{ padding: "10px 15px" }}
                    />
                  </div>
                </div>

                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                {countdown > 0 ? (
                  <p>Resend OTP in {countdown} seconds</p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={resendLoading}
                    className="text-primary hover:underline bg-transparent border-none"
                  >
                    {resendLoading ? "Sending..." : "Resend OTP"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OTPVerificationPage;
