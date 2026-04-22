import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap"; // Import Bootstrap's Modal
import EmployerHeader from "./EmployerHeader";
import EmployerFooter from "./EmployerFooter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultImage from "../../../public/images/profileImage.jpg"

const EmployeerProfileView = () => {
  const [schoolData, setSchoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const modalRef = useRef(null);
  const passwordModalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchoolDetails = async () => {
      try {
        const token = localStorage.getItem("employerToken");
        const employerData = JSON.parse(localStorage.getItem("employerData"));
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          `https://api.edprofio.com/employer/fetchemployer/${employerData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch school details");
        }

        const data = await response.json();
        setSchoolData(data);
        setEditData({
          firstName: data.firstName,
          lastName: data.lastName,
          userEmail: data.userEmail,
          userMobile: data.userMobile,
          address: data.address,
          state: data.state,
          pincode: data.pincode,
          city: data.city,
          schoolName: data.schoolName,
          website: data.website,
          board: data.board,
          institutionType: data.institutionType,
        });
        setProfilePicPreview(data.userProfilePic);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchoolDetails();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError(null);
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
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
      setProfilePic(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfilePicture = async () => {
    if (!profilePic) return null;

    const token = localStorage.getItem("employerToken");
    const employerData = JSON.parse(localStorage.getItem("employerData"));

    const formData = new FormData();
    formData.append("file", profilePic);
    formData.append("fileType", "profileImage"); // Changed from 'profile' to 'profileImage'

    try {
      const response = await fetch(
        `https://api.edprofio.com/employer/uploadprofilepic/${employerData._id}?fileType=profileImage`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Upload failed");
      }

      const data = await response.json();
      return data.file.url;
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadError(null);

    try {
      const token = localStorage.getItem("employerToken");
      const employerData = JSON.parse(localStorage.getItem("employerData"));

      // Upload profile picture if changed
      let newProfilePicUrl = schoolData.userProfilePic;
      if (profilePic) {
        try {
          newProfilePicUrl = await uploadProfilePicture();
          // Update the preview with the new URL from server
          setProfilePicPreview(newProfilePicUrl);
        } catch (uploadError) {
          console.error("Profile picture upload failed:", uploadError);
          toast.error(`Profile picture update failed: ${uploadError.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }

      // Update other profile data
      const updateResponse = await fetch(
        `https://api.edprofio.com/employer/updateemployer/${employerData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...editData,
            ...(newProfilePicUrl && { userProfilePic: newProfilePicUrl }),
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json().catch(() => ({}));
        throw new Error(errorData.message || "Profile update failed");
      }

      const updatedData = await updateResponse.json();
      setSchoolData(updatedData);

      // Update local storage if needed
      if (newProfilePicUrl) {
        const updatedEmployerData = {
          ...employerData,
          userProfilePic: newProfilePicUrl,
        };
        localStorage.setItem(
          "employerData",
          JSON.stringify(updatedEmployerData)
        );
      }

      // Close modal
      const modal = Modal.getInstance(modalRef.current);
      modal.hide();

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters long");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError(null);

    try {
      const token = localStorage.getItem("employerToken");
      const employerData = JSON.parse(localStorage.getItem("employerData"));

      const response = await fetch(
        `https://api.edprofio.com/employer/changeMyPassword/${employerData._id}`,

        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Password change failed");
      }

      // Reset password form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      // Close modal
      const modal = Modal.getInstance(passwordModalRef.current);
      modal.hide();

      toast.success("Password changed successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.error("Password change error:", err);
      setPasswordError(err.message);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Function to show the modal
  const showModal = () => {
    const modal = new Modal(modalRef.current);
    modal.show();
  };

  // Function to show password change modal
  const showPasswordModal = () => {
    const modal = new Modal(passwordModalRef.current);
    modal.show();
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!schoolData) {
    return <div className="alert alert-warning">No school data found</div>;
  }

  return (
    <>
      <EmployerHeader />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h6 className="fw-medium d-inline-flex align-items-center mb-3 mb-sm-0">
              <a href="#">
                <i className="ti ti-arrow-left me-2"></i>School Details
              </a>
            </h6>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="mb-2">
              <button className="btn btn-warning" onClick={showModal}>
                <i className="ti ti-edit me-1"></i>Edit School
              </button>
              {/* <button className="btn btn-secondary align-items-center ms-2">
                <i className="ti ti-circle-plus me-2"></i>Bank & Statutory
              </button> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-4 theiaStickySidebar">
            <div className="card card-bg-1">
              <div className="card-body p-0">
                <span
                  className="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2"
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={profilePicPreview ||defaultImage}
                    className="w-auto h-auto"
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <div className="text-center px-3 pb-3 border-bottom">
                  <div className="mb-3">
                    <h5 className="d-flex align-items-center justify-content-center mb-1">
                      {schoolData.schoolName}
                    </h5>
                    <span className="badge badge-soft-secondary fw-medium me-2">
                      <i className="ti ti-point-filled me-1"></i>{" "}
                      {schoolData.board || "CBSE"}
                    </span>
                    <span className="badge badge-soft-secondary fw-medium me-2">
                      <i className="ti ti-point-filled me-1"></i>{" "}
                      {schoolData.institutionType || "School"}
                    </span>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="d-inline-flex align-items-center">
                        <i className="ti ti-id me-2"></i>
                        Client ID
                      </span>
                      <p className="text-dark">{schoolData._id}</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="d-inline-flex align-items-center">
                        <i className="ti ti-star me-2"></i>
                        Admin
                      </span>
                      <p className="text-dark">
                        {schoolData.firstName} {schoolData.lastName}
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <span className="d-inline-flex align-items-center">
                        <i className="ti ti-calendar-check me-2"></i>
                        Registered On
                      </span>
                      <p className="text-dark">
                        {new Date(schoolData.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* UPDATED BUTTON SECTION - Both buttons same size */}
                    <div className="row gx-2 mt-3">
                      <div className="col-12 mb-2">
                        <button
                          className="btn btn-dark w-100"
                          onClick={showModal}
                        >
                          <i className="ti ti-edit me-1"></i>Edit Info
                        </button>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-danger w-100"
                          onClick={showPasswordModal}
                        >
                          <i className="ti ti-lock me-1"></i>Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-bottom">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6>Basic information</h6>
                    <button className="btn btn-icon btn-sm" onClick={showModal}>
                      <i className="ti ti-edit"></i>
                    </button>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-phone me-2"></i>
                      Phone
                    </span>
                    <p className="text-dark">{schoolData.userMobile}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-mail-check me-2"></i>
                      Email
                    </span>
                    <span className="text-info d-inline-flex align-items-center">
                      {schoolData.userEmail}
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="d-inline-flex align-items-center">
                      <i className="ti ti-map-pin-check me-2"></i>
                      Address
                    </span>
                    <p className="text-dark text-end">
                      {schoolData.address}, <br />
                      {schoolData.city}, {schoolData.state},{" "}
                      {schoolData.pincode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8">{/* Other content can go here */}</div>
        </div>
      </div>

      {/* Edit School Modal */}
      <div
        className="modal fade"
        id="editModal"
        ref={modalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <div className="d-flex align-items-center">
                <h4 className="modal-title me-2">Edit Employer</h4>
                <span>Employer ID : {schoolData?._id}</span>
              </div>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body pb-0">
                <div className="row">
                  {/* Profile Picture Upload */}
                  <div className="col-12 mb-4">
                    <div className="d-flex flex-column align-items-center">
                      <div className="position-relative mb-3">
                        <img
                          src={
                            profilePicPreview || defaultImage
                          }
                          className="rounded-circle border border-3 border-primary"
                          alt="Profile"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                        <label
                          htmlFor="profilePicUpload"
                          className="btn btn-sm btn-icon btn-primary position-absolute rounded-circle"
                          style={{
                            bottom: "10px",
                            right: "10px",
                            width: "32px",
                            height: "32px",
                          }}
                        >
                          <i className="ti ti-camera"></i>
                          <input
                            type="file"
                            id="profilePicUpload"
                            className="d-none"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </div>
                      <div className="text-center">
                        <p className="mb-1">
                          Click on the camera icon to change profile picture
                        </p>
                        <small className="text-muted">
                          Allowed JPG, GIF or PNG. Max size 2MB
                        </small>
                        {uploadError && (
                          <div className="alert alert-danger mt-2 py-1">
                            {uploadError}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        First Name <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={editData.firstName || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={editData.lastName || ""}
                        onChange={handleInputChange}
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
                        value={editData.userEmail || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Phone Number <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="userMobile"
                        value={editData.userMobile || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        School Name<span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="schoolName"
                        value={editData.schoolName || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Website</label>
                      <input
                        type="text"
                        className="form-control"
                        name="website"
                        value={editData.website || ""}
                        onChange={handleInputChange}
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
                        value={editData.board || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Institution Type</label>
                      <input
                        type="text"
                        className="form-control"
                        name="institutionType"
                        value={editData.institutionType || ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Address <span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={editData.address || ""}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        City <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={editData.city || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        State <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        value={editData.state || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label className="form-label">
                        Pincode <span className="text-danger"> *</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="pincode"
                        value={editData.pincode || ""}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light border me-2"
                  data-bs-dismiss="modal"
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
            </form>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      <div
        className="modal fade"
        id="changePasswordModal"
        ref={passwordModalRef}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Change Password</h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>
            <form onSubmit={handlePasswordSubmit}>
              <div className="modal-body">
                {passwordError && (
                  <div className="alert alert-danger">{passwordError}</div>
                )}

                <div className="mb-3">
                  <label className="form-label">
                    Current Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      className="form-control"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.current ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    New Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      className="form-control"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter new password"
                      minLength="6"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.new ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                  <small className="text-muted">
                    Password must be at least 6 characters long
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Confirm New Password <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      className="form-control"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Confirm new password"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      <i
                        className={`ti ${
                          showPasswords.confirm ? "ti-eye-off" : "ti-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-light border me-2"
                  data-bs-dismiss="modal"
                  disabled={isChangingPassword}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-danger"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Changing Password...
                    </>
                  ) : (
                    <>
                      <i className="ti ti-lock me-1"></i>
                      Change Password
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <EmployerFooter />
    </>
  );
};

export default EmployeerProfileView;