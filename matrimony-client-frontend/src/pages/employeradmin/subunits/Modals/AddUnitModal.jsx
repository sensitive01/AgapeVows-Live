import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUnitModal = ({ show, onClose, onSave }) => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // OTP State
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);

  const employerAdminData = JSON.parse(localStorage.getItem("EmployerAdminData") || "{}");
  const organizationid = employerAdminData._id || "";

  const [formData, setFormData] = useState({
    schoolName: "",
    firstName: "",
    lastName: "",
    address: "",
    organizationid: organizationid,
    city: "",
    state: "",
    pincode: "",
    institutionName: "",
    board: "",
    institutionType: "",
    website: "",
    userEmail: "",
    userMobile: "",
    userPassword: "",
    userProfilePic: "",
    employerType: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // FIXED: Convert error objects to strings
  const getErrorMessage = (error) => {
    // If error is already a string, return it
    if (typeof error === 'string') {
      return error;
    }
    
    // If error is an object, extract the message
    if (error && typeof error === 'object') {
      // Try different common error object structures
      if (error.message) return String(error.message);
      if (error.error) return String(error.error);
      if (error.msg) return String(error.msg);
      
      // If it has code and command, it might be a database error
      if (error.code) {
        return `Error code: ${error.code}`;
      }
      
      // Last resort: stringify the object
      return JSON.stringify(error);
    }
    
    // Default fallback
    return "An unknown error occurred";
  };

  const sendOtp = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Validation
    if (!formData.userEmail) {
      const msg = "Please enter your email address first";
      setOtpError(msg);
      toast.error(msg);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.userEmail)) {
      const msg = "Please enter a valid email address";
      setOtpError(msg);
      toast.error(msg);
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    axios.post(
      `${VITE_BASE_URL}/employer/sendemailotp`,
      { userEmail: formData.userEmail },
      { 
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then((response) => {
      console.log("API Response:", response.data);
      
      if (response.status===200) {
        setIsOtpSent(true);
        setOtpError("");
        toast.success("OTP sent successfully!");
      } else {
        // FIXED: Convert error to string
        const errorMsg = getErrorMessage(response.data.error) || "Failed to send OTP";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    })
    .catch((error) => {
      console.error("API ERROR:", error);
      console.error("Error response:", error.response?.data);
      
      // FIXED: Properly handle error objects
      let errorMsg = "Failed to send OTP. Please try again.";
      
      if (error.response?.data) {
        errorMsg = getErrorMessage(error.response.data.error || error.response.data);
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setOtpError(errorMsg);
      toast.error(errorMsg);
    })
    .finally(() => {
      setIsSendingOtp(false);
    });
  };

  const verifyOtp = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    axios.post(
      `${VITE_BASE_URL}/employer/verifyemailotp`,
      { userEmail: formData.userEmail, otp },
      { timeout: 10000 }
    )
    .then((response) => {
      if (response.status===200) {
        setIsOtpVerified(true);
        setOtpError("");
        toast.success("Email verified!");
      } else {
        const errorMsg = getErrorMessage(response.data.error) || "Invalid OTP";
        setOtpError(errorMsg);
        toast.error(errorMsg);
      }
    })
    .catch((error) => {
      const errorMsg = getErrorMessage(error.response?.data?.error) || "Verification failed";
      setOtpError(errorMsg);
      toast.error(errorMsg);
    })
    .finally(() => {
      setIsVerifyingOtp(false);
    });
  };

  const handleNext = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (
      !formData.schoolName ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.institutionName ||
      !formData.board ||
      !formData.institutionType ||
      !formData.userMobile ||
      !formData.userPassword ||
      !formData.employerType
    ) {
      const errorMsg = "Please fill all required fields";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (phoneExists) {
      const errorMsg = "Phone number is already registered";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    if (formData.userEmail && !isOtpVerified) {
      const errorMsg = "Please verify your email with OTP";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setError(null);
    setActiveTab("address");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsSubmitting(true);
    setError(null);

    if (!formData.address || !formData.country || !formData.state || !formData.city || !formData.pincode) {
      const errorMsg = "Please fill all address fields";
      setError(errorMsg);
      toast.error(errorMsg);
      setIsSubmitting(false);
      return;
    }

    if (phoneExists) {
      const errorMsg = "Phone number is already registered";
      setError(errorMsg);
      toast.error(errorMsg);
      setIsSubmitting(false);
      return;
    }

    if (formData.userEmail && !isOtpVerified) {
      const errorMsg = "Please verify your email with OTP";
      setError(errorMsg);
      toast.error(errorMsg);
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("EmployerAdminToken");
    
    axios.post(
      "https://api.edprofio.com/employeradmin/createemployer",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    )
    .then((response) => {
      console.log("Employer created:", response.data);
      toast.success("Unit created successfully!");

      if (typeof onSave === "function") {
        onSave(response.data.data);
      }

      // Reset form
      setFormData({
        schoolName: "",
        firstName: "",
        lastName: "",
        address: "",
        organizationid: organizationid,
        city: "",
        state: "",
        pincode: "",
        institutionName: "",
        board: "",
        institutionType: "",
        website: "",
        userEmail: "",
        userMobile: "",
        userPassword: "",
        userProfilePic: "",
        employerType: "",
        country: "",
      });

      setOtp("");
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setActiveTab("basic-info");

      setTimeout(() => {
        onClose();
      }, 1500);
    })
    .catch((err) => {
      console.error("Error creating employer:", err);
      const errorMsg = getErrorMessage(err.response?.data?.message || err.response?.data) || "Failed to create unit";
      setError(errorMsg);
      toast.error(errorMsg);
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Unit</h4>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="contact-grids-tab">
                <ul className="nav nav-underline">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "basic-info" ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("basic-info");
                      }}
                      type="button"
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "address" ? "active" : ""}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("address");
                      }}
                      type="button"
                    >
                      Address
                    </button>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="alert alert-danger mx-3 mt-3">{error}</div>
              )}

              <div className="tab-content">
                {/* Basic Info Tab */}
                <div className={`tab-pane fade ${activeTab === "basic-info" ? "show active" : ""}`}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            School Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="schoolName"
                            autoComplete="organization"
                            value={formData.schoolName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            First Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Institution Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="institutionName"
                            autoComplete="organization"
                            value={formData.institutionName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Board <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="board"
                            value={formData.board}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Institution Type <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="institutionType"
                            value={formData.institutionType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="School">School</option>
                            <option value="College">College</option>
                            <option value="University">University</option>
                            <option value="Coaching">Coaching</option>
                          </select>
                        </div>
                      </div>

                      {/* Email with OTP */}
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Email (Optional)</label>
                          <input
                            type="email"
                            className="form-control"
                            name="userEmail"
                            autoComplete="email"
                            value={formData.userEmail}
                            onChange={handleChange}
                            disabled={isOtpSent}
                          />
                          
                          {formData.userEmail && (
                            <div className="mt-2">
                              <div className="d-flex gap-2 align-items-center">
                                <input
                                  type="text"
                                  placeholder="Enter 6-digit OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                  className="form-control"
                                  style={{ maxWidth: "150px" }}
                                  disabled={!isOtpSent}
                                  maxLength="6"
                                  autoComplete="one-time-code"
                                />
                                {!isOtpSent ? (
                                  <button
                                    type="button"
                                    onClick={sendOtp}
                                    className="btn btn-primary btn-sm"
                                    disabled={isSendingOtp}
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {isSendingOtp ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-1" />
                                        Sending...
                                      </>
                                    ) : (
                                      "Send OTP"
                                    )}
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={verifyOtp}
                                    className={`btn btn-sm ${isOtpVerified ? "btn-success" : "btn-primary"}`}
                                    disabled={isVerifyingOtp || isOtpVerified || otp.length !== 6}
                                    style={{ whiteSpace: "nowrap" }}
                                  >
                                    {isVerifyingOtp ? (
                                      <>
                                        <span className="spinner-border spinner-border-sm me-1" />
                                        Verifying...
                                      </>
                                    ) : isOtpVerified ? (
                                      <>✓ Verified</>
                                    ) : (
                                      "Verify OTP"
                                    )}
                                  </button>
                                )}
                              </div>
                              {isOtpSent && !isOtpVerified && (
                                <small className="text-muted d-block mt-1">OTP sent to your email</small>
                              )}
                              {isOtpVerified && (
                                <small className="text-success d-block mt-1">✓ Email verified!</small>
                              )}
                              {otpError && (
                                <div className="text-danger small mt-1">{otpError}</div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Mobile Number <span className="text-danger">*</span>
                          </label>
                          <input
                            type="tel"
                            className="form-control"
                            name="userMobile"
                            autoComplete="tel"
                            value={formData.userMobile}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Password <span className="text-danger">*</span>
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="userPassword"
                            autoComplete="new-password"
                            value={formData.userPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Employer Type <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="employerType"
                            value={formData.employerType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="Admin">Admin</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Staff">Staff</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={onClose}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-primary" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                </div>

                {/* Address Tab */}
                <div className={`tab-pane fade ${activeTab === "address" ? "show active" : ""}`}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Address <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="address"
                            autoComplete="street-address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Country <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option value="USA">USA</option>
                            <option value="India">India</option>
                            <option value="UK">UK</option>
                            <option value="Canada">Canada</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            State <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            City <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Pincode <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-light" onClick={onClose}>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting || (formData.userEmail && !isOtpVerified)}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AddUnitModal;