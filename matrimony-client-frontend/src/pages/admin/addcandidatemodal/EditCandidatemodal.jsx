import React, { useState, useEffect } from "react";

const EditCandidateModal = ({ show, candidate, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState("basic-info2");
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userMobile: "",
    gender: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    currentCity: "",
    specialization: "",
    expectedSalary: "",
    profilesummary: "",
    github: "",
    linkedin: "",
    portfolio: "",
    maritalStatus: "",
    languages: [],
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [education, setEducation] = useState([]);
  const [workExperience, setWorkExperience] = useState([]);

  // Fetch candidate details when modal opens
  useEffect(() => {
    if (show && candidate) {
      fetchCandidateDetails();
    }
  }, [show, candidate]);

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.edprofio.com/fetchemployee/${candidate._id}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }

      const data = await response.json();

      // Set form data from API response
      setFormData({
        userName: data.userName || "",
        userEmail: data.userEmail || "",
        userMobile: data.userMobile || "",
        gender: data.gender || "",
        dob: data.dob || "",
        addressLine1: data.addressLine1 || "",
        addressLine2: data.addressLine2 || "",
        city: data.city || "",
        state: data.state || "",
        pincode: data.pincode || "",
        currentCity: data.currentCity || "",
        specialization: data.specialization || "",
        expectedSalary: data.expectedSalary || "",
        profilesummary: data.profilesummary || "",
        github: data.github || "",
        linkedin: data.linkedin || "",
        portfolio: data.portfolio || "",
        maritalStatus: data.maritalStatus || "",
        languages: data.languages || [],
        skills: data.skills || [],
      });

      // Set education and work experience
      setEducation(data.education || []);
      setWorkExperience(data.workExperience || []);
    } catch (err) {
      console.error("Error fetching candidate details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayInputChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Prepare the data to send
      const updateData = {
        ...formData,
        education,
        workExperience,
      };

      const response = await fetch(
        `https://api.edprofio.com/updateprofile/${candidate._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update candidate");
      }

      const updatedCandidate = await response.json();
      onUpdate(updatedCandidate);
      onClose();
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <div className="d-flex align-items-center">
              <h4 className="modal-title me-2">Edit Candidate</h4>
              <span>
                Candidate ID :{" "}
                {candidate._id.substring(candidate._id.length - 4)}
              </span>
            </div>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
              aria-label="Close"
              disabled={loading}
            >
              <i className="ti ti-x"></i>
            </button>
          </div>

          {loading && !formData.userName ? (
            <div className="modal-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading candidate details...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact-grids-tab">
                <ul className="nav nav-underline" id="myTab2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "basic-info2" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("basic-info2")}
                      type="button"
                      id="info-tab2"
                      data-bs-toggle="tab"
                      data-bs-target="#basic-info2"
                    >
                      Basic Information
                    </button>
                  </li>
                </ul>
              </div>

              {error && (
                <div className="alert alert-danger mx-3 mt-3">
                  {error}
                  <button
                    type="button"
                    className="btn-close float-end"
                    onClick={() => setError(null)}
                  ></button>
                </div>
              )}

              <div className="tab-content" id="myTabContent2">
                {activeTab === "basic-info2" && (
                  <div
                    className="tab-pane fade show active"
                    id="basic-info2"
                    role="tabpanel"
                    aria-labelledby="info-tab2"
                    tabIndex="0"
                  >
                    <div className="modal-body pb-0">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                            <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                              <img
                                src={
                                  candidate.userProfilePic ||
                                  "assets/img/users/user-13.jpg"
                                }
                                alt="img"
                                className="rounded-circle"
                                onError={(e) => {
                                  e.target.src = "assets/img/users/user-13.jpg";
                                }}
                              />
                            </div>
                            <div className="profile-upload">
                              <div className="mb-2">
                                <h6 className="mb-1">Profile Image</h6>
                                <p className="fs-12">Current profile picture</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Username <span className="text-danger">*</span>
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
                              Email <span className="text-danger">*</span>
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

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Phone <span className="text-danger">*</span>
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
                            <label className="form-label">Gender</label>
                            <select
                              className="form-select"
                              name="gender"
                              value={formData.gender}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Date of Birth</label>
                            <input
                              type="text"
                              className="form-control"
                              name="dob"
                              value={formData.dob}
                              onChange={handleInputChange}
                              placeholder="DD/MM/YYYY"
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Specialization</label>
                            <input
                              type="text"
                              className="form-control"
                              name="specialization"
                              value={formData.specialization}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Current City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="currentCity"
                              value={formData.currentCity}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Expected Salary
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              name="expectedSalary"
                              value={formData.expectedSalary}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="mb-3">
                            <label className="form-label">Address Line 1</label>
                            <input
                              type="text"
                              className="form-control"
                              name="addressLine1"
                              value={formData.addressLine1}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mb-3">
                            <label className="form-label">Address Line 2</label>
                            <input
                              type="text"
                              className="form-control"
                              name="addressLine2"
                              value={formData.addressLine2}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">State</label>
                            <input
                              type="text"
                              className="form-control"
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <label className="form-label">Pincode</label>
                            <input
                              type="text"
                              className="form-control"
                              name="pincode"
                              value={formData.pincode}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">GitHub Profile</label>
                            <input
                              type="text"
                              className="form-control"
                              name="github"
                              value={formData.github}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              LinkedIn Profile
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Portfolio Website
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="portfolio"
                              value={formData.portfolio}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">Marital Status</label>
                            <select
                              className="form-select"
                              name="maritalStatus"
                              value={formData.maritalStatus}
                              onChange={handleInputChange}
                            >
                              <option value="">Select Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Divorced">Divorced</option>
                              <option value="Widowed">Widowed</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Languages (comma separated)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.languages.join(", ")}
                              onChange={(e) =>
                                handleArrayInputChange(e, "languages")
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              Skills (comma separated)
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              value={formData.skills.join(", ")}
                              onChange={(e) =>
                                handleArrayInputChange(e, "skills")
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="mb-3">
                            <label className="form-label">
                              Profile Summary
                            </label>
                            <textarea
                              className="form-control"
                              rows="3"
                              name="profilesummary"
                              value={formData.profilesummary}
                              onChange={handleInputChange}
                            ></textarea>
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
                            Updating...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCandidateModal;
