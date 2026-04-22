import React, { useState } from "react";
import axios from "axios";

const AddCandidateModal = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    referralCode: "",
    verificationstatus: "pending",
    blockstatus: "unblock",
    emailverifedstatus: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form data
    if (formData.userPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (
      !formData.userName ||
      !formData.userMobile ||
      !formData.userEmail ||
      !formData.userPassword
    ) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.edprofio.com/signup",
        formData
      );

      if (
        response.data &&
        response.data.message === "Employee registered successfully."
      ) {
        setShowSuccessModal(true);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Server error during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose();
    // Reset form
    setFormData({
      userName: "",
      userMobile: "",
      userEmail: "",
      userPassword: "",
      confirmPassword: "",
      referralCode: "",
      verificationstatus: "pending",
      blockstatus: "unblock",
      emailverifedstatus: true,
    });
  };

  if (!show && !showSuccessModal) return null;

  return (
    <>
      {/* Main Add Candidate Modal */}
      {show && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="d-flex align-items-center">
                  <h4 className="modal-title me-2">Add New Employee</h4>
                </div>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  onClick={onClose}
                  aria-label="Close"
                >
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="contact-grids-tab">
                  <ul className="nav nav-underline" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${
                          activeTab === "basic-info" ? "active" : ""
                        }`}
                        onClick={() => setActiveTab("basic-info")}
                        type="button"
                      >
                        Basic Information
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  {activeTab === "basic-info" && (
                    <div
                      className="tab-pane fade show active"
                      id="basic-info"
                      role="tabpanel"
                      aria-labelledby="info-tab"
                      tabIndex="0"
                    >
                      <div className="modal-body pb-0">
                        {error && (
                          <div className="alert alert-danger mb-3">{error}</div>
                        )}
                        <div className="row">
                          {/* <div className="col-md-12">
                                                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                                                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                                <i className="ti ti-photo text-gray-2 fs-16"></i>
                                                            </div>                                              
                                                            <div className="profile-upload">
                                                                <div className="mb-2">
                                                                    <h6 className="mb-1">Upload Profile Image</h6>
                                                                    <p className="fs-12">Image should be below 4 mb</p>
                                                                </div>
                                                                <div className="profile-uploader d-flex align-items-center">
                                                                    <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                                                        Upload
                                                                        <input type="file" className="form-control image-sign" multiple />
                                                                    </div>
                                                                    <button type="button" className="btn btn-light btn-sm">Cancel</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> */}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Full Name{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="userName"
                                value={formData.userName}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Mobile Number{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="userMobile"
                                value={formData.userMobile}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Email <span className="text-danger"> *</span>
                              </label>
                              <input
                                type="email"
                                className="form-control"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Referral Code</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control" 
                                                                name="referralCode"
                                                                value={formData.referralCode}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>                                    
                                                    </div> */}
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Password <span className="text-danger"> *</span>
                              </label>
                              <div className="pass-group">
                                <input
                                  type="password"
                                  className="pass-input form-control"
                                  name="userPassword"
                                  value={formData.userPassword}
                                  onChange={handleInputChange}
                                  required
                                />
                                <span className="ti toggle-password ti-eye-off"></span>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">
                                Confirm Password{" "}
                                <span className="text-danger"> *</span>
                              </label>
                              <div className="pass-group">
                                <input
                                  type="password"
                                  className="pass-inputs form-control"
                                  name="confirmPassword"
                                  value={formData.confirmPassword}
                                  onChange={handleInputChange}
                                  required
                                />
                                <span className="ti toggle-passwords ti-eye-off"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-outline-light border me-2"
                          onClick={onClose}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-1"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center p-3">
                  <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                    <i className="ti ti-check fs-24"></i>
                  </span>
                  <h5 className="mb-2">Employee Added Successfully</h5>
                  <p className="mb-3">
                    {formData.userName} has been registered successfully.
                  </p>
                  <div>
                    <div className="row g-2">
                      <div className="col-6">
                        <button
                          className="btn btn-dark w-100"
                          onClick={handleSuccessModalClose}
                        >
                          Back to List
                        </button>
                      </div>
                      <div className="col-6">
                        <button className="btn btn-primary w-100">
                          Detail Page
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCandidateModal;
