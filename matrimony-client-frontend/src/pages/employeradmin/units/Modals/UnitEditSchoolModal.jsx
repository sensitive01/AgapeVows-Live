import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const schoolEditSchoolModal = ({ show, onClose, school, onSave }) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    institutionName: "",
    board: "",
    institutionType: "",
    website: "",
    userEmail: "",
    userMobile: "",
    employerType: "",
    userProfilePic: "",
  });
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  useEffect(() => {
    if (school && school.originalData) {
      setFormData({
        schoolName: school.originalData.schoolName || "",
        firstName: school.originalData.firstName || "",
        lastName: school.originalData.lastName || "",
        address: school.originalData.address || "",
        city: school.originalData.city || "",
        state: school.originalData.state || "",
        pincode: school.originalData.pincode || "",
        institutionName: school.originalData.institutionName || "",
        board: school.originalData.board || "",
        institutionType: school.originalData.institutionType || "",
        website: school.originalData.website || "",
        userEmail: school.originalData.userEmail || "",
        userMobile: school.originalData.userMobile || "",
        employerType: school.originalData.employerType || "",
        userProfilePic: school.originalData.userProfilePic || "",
      });
    }
  }, [school]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (!validTypes.includes(file.type)) {
        setUploadError("Please select a valid image file (JPEG, PNG, GIF)");
        return;
      }

      if (file.size > maxSize) {
        setUploadError("File size should be less than 2MB");
        return;
      }

      setUploadError(null);
      setProfilePicFile(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          userProfilePic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = async (file) => {
    if (!file) return null;

    const token = localStorage.getItem("EmployerAdminToken");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileType", "profileImage");

    try {
      const response = await axios.put(
        `https://api.edprofio.com/employer/uploadprofilepic/${school.id}?fileType=profileImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile picture updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return response.data.file.url;
      } else {
        throw new Error(response.data.message || "Upload failed");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(`Profile picture upload failed: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setUploadError(null);

    try {
      const token = localStorage.getItem("EmployerAdminToken");

      // Upload profile picture if changed
      let newProfilePicUrl = formData.userProfilePic;
      if (profilePicFile) {
        try {
          newProfilePicUrl = await uploadProfilePicture(profilePicFile);
        } catch (err) {
          console.error("Profile picture upload failed:", err);
          // Error toast is already shown in uploadProfilePicture
        }
      }

      // Update other profile data
      const response = await axios.put(
        `https://api.edprofio.com/employer/updateemployer/${school.id}`,
        {
          ...formData,
          ...(newProfilePicUrl && { userProfilePic: newProfilePicUrl }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("school updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        onSave(response.data.data);
        onClose();
      } else {
        throw new Error(response.data.message || "Failed to update school");
      }
    } catch (error) {
      console.error("Error updating school:", error);
      setError(
        error.response?.data?.message ||
          "Failed to update school. Please try again."
      );
      toast.error(
        error.response?.data?.message ||
          "Failed to update school. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit school</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
              aria-label="Close"
              disabled={isSubmitting}
            >
              <i className="ti ti-x"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="contact-grids-tab">
              <ul className="nav nav-underline" id="myTab2" role="tablist">
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
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      activeTab === "address" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("address")}
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

            <div className="tab-content" id="myTabContent2">
              {/* Basic Info Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "basic-info" ? "show active" : ""
                }`}
                id="basic-info2"
                role="tabpanel"
                aria-labelledby="info-tab2"
                tabIndex="0"
              >
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                        {formData.userProfilePic ? (
                          <img
                            src={formData.userProfilePic}
                            alt="Profile Preview"
                            className="avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0"
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo text-gray-2 fs-16"></i>
                          </div>
                        )}
                        <div className="profile-upload">
                          <div className="mb-2">
                            <h6 className="mb-1">Upload Profile Image</h6>
                            <p className="fs-12">
                              Image should be below 2MB (JPEG, PNG, GIF)
                            </p>
                            {uploadError && (
                              <div className="alert alert-danger py-1 mb-2">
                                {uploadError}
                              </div>
                            )}
                          </div>
                          <div className="profile-uploader d-flex align-items-center">
                            <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                              Upload
                              <input
                                type="file"
                                className="form-control image-sign"
                                onChange={handleFileChange}
                                accept="image/*"
                                disabled={isSubmitting}
                              />
                            </div>
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  userProfilePic:
                                    school.originalData.userProfilePic || "",
                                }));
                                setProfilePicFile(null);
                                setUploadError(null);
                              }}
                              disabled={isSubmitting}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          School Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="schoolName"
                          value={formData.schoolName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Institution Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleChange}
                          disabled={isSubmitting}
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
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
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
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
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
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          Mobile <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="userMobile"
                          value={formData.userMobile}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Board</label>
                        <input
                          type="text"
                          className="form-control"
                          name="board"
                          value={formData.board}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Institution Type</label>
                        <select
                          className="form-select"
                          name="institutionType"
                          value={formData.institutionType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        >
                          <option value="">Select</option>
                          <option value="School">School</option>
                          <option value="College">College</option>
                          <option value="University">University</option>
                          <option value="Coaching Center">
                            Coaching Center
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Employer Type</label>
                        <select
                          className="form-select"
                          name="employerType"
                          value={formData.employerType}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        >
                          <option value="">Select</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Principal">Principal</option>
                          <option value="Administrator">Administrator</option>
                          <option value="HR">HR</option>
                        </select>
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
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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

              {/* Address Tab */}
              <div
                className={`tab-pane fade ${
                  activeTab === "address" ? "show active" : ""
                }`}
                id="address2"
                role="tabpanel"
                aria-labelledby="address-tab2"
                tabIndex="0"
              >
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">
                          Address <span className="text-danger">*</span>
                        </label>
                        <textarea
                          className="form-control"
                          rows="3"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          disabled={isSubmitting}
                        ></textarea>
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
                          disabled={isSubmitting}
                        />
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
                          disabled={isSubmitting}
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
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light me-2"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default schoolEditSchoolModal;
