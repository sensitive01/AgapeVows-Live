import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaPowerOff,
  FaEdit,
  FaLink,
  FaFilePdf,
  FaKey,
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaGraduationCap,
  FaBriefcase,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  getEmployeeDetails,
  changePassword,
} from "../../api/services/projectServices";

const EmployeProfile = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        const data = await getEmployeeDetails(userData._id, token);
        setEmployeeData(data);
      } catch (err) {
        setError(err.message || "Failed to fetch employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPasswordError("");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordError("All fields are required");
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

    try {
      setPasswordLoading(true);
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData"));

      await changePassword({
        userId: userData._id,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      alert("Password changed successfully!");
    } catch (err) {
      setPasswordError(err.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Present";

    if (dateString.includes("-")) {
      const date = new Date(dateString);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${year}`;
    } else if (dateString.includes("/")) {
      const parts = dateString.split("/");
      if (parts.length === 2) {
        return dateString;
      } else if (parts.length === 3) {
        return `${parts[1]}/${parts[2]}`;
      }
    }
    return dateString;
  };

  const formatDOB = (dobString) => {
    if (!dobString) return "Not specified";

    if (dobString.includes("-")) {
      const date = new Date(dobString);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return dobString;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!employeeData) {
    return <div className="alert alert-info">No employee data found</div>;
  }

  return (
    <>
      <style>
        {`
             .profile-image-fix {
            width: 120px !important;
            height: 120px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            border: 4px solid #fff !important;
            position: relative !important;
            background: #f8f9fa !important;
          }
          .profile-image-fix img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            border-radius: 50% !important;
            display: block !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .jobplugin__profile-intro__image::before {
            width: 28px !important;
            height: 28px !important;
            border-radius: 100% !important;
            border: 5px solid #fff !important;
            background: #063970 !important;
            content: "" !important;
            position: absolute !important;
            left: 8px !important;
            top: 5px !important;
            z-index: 10 !important;
          }

          /* Main section headings - change to #ffa500 color */
          .jobplugin__profile-box__heading h2.h6.fw-semibold.text-dark,
          .jobplugin__profile-block__header h2.h5.fw-semibold.text-dark {
            color: #ffa500 !important;
          }

          /* Labels - change to #ffa500 color */
          .jobplugin__profile-box__body small.text-muted.text-uppercase.fw-medium,
          .jobplugin__profile-box__body .text-muted.text-uppercase.fw-medium {
            color: #ffa500 !important;
          }

          /* Detail values - increase font size to 18px */
          .jobplugin__profile-box__body div[style*="fontSize: \"14px\""],
          .jobplugin__profile-box__body div[style*="font-size: 14px"] {
            font-size: 18px !important;
          }

          /* Contact Information details */
          .jobplugin__profile-box__body .ms-4 {
            font-size: 18px !important;
          }

          /* Personal Details values */
          .jobplugin__profile-box__body .col-12 > div:last-child {
            font-size: 18px !important;
          }

          /* Address details */
          .jobplugin__profile-box__body .text-muted[style*="fontSize: \"14px\""],
          .jobplugin__profile-box__body .text-muted[style*="font-size: 14px"] {
            font-size: 18px !important;
          }

          /* Education and Work Experience content */
          .jobplugin__profile-block__body .text-muted[style*="fontSize: \"14px\""],
          .jobplugin__profile-block__body .text-muted[style*="font-size: 14px"] {
            font-size: 17px !important;
          }

          /* Education and Work Experience titles */
          .jobplugin__profile-block__body h6.fw-semibold.text-dark[style*="fontSize: \"15px\""] {
            font-size: 18px !important;
          }

          /* Profile summary text */
          .jobplugin__profile-block__body p[style*="fontSize: \"14px\""],
          .jobplugin__profile-block__body p[style*="font-size: 14px"] {
            font-size: 17px !important;
          }

          /* Document names and descriptions */
          .jobplugin__profile-block__body p.text-muted.mb-3.small,
          .jobplugin__profile-block__body p.text-muted.mb-0[style*="fontSize: \"13px\""] {
            font-size: 16px !important;
          }

          /* Document headings */
          .jobplugin__profile-block__body h6.mb-0.fw-semibold[style*="fontSize: \"14px\""] {
            font-size: 17px !important;
            color: #ffa500 !important;
          }

          /* Skills and Languages tags */
          .jobplugin__profile-block__body span[style*="fontSize: \"13px\""] {
            font-size: 16px !important;
          }

          /* Media profile section labels */
          .jobplugin__profile-box__body h6.fw-medium[style*="fontSize: \"14px\""] {
            color: #ffa500 !important;
            font-size: 17px !important;
          }

          /* Media profile file names */
          .jobplugin__profile-box__body .text-truncate.fw-medium[style*="fontSize: \"13px\""] {
            font-size: 16px !important;
          }

          /* Grade level tags */
          .jobplugin__profile-box__body span.border.px-2.py-1.rounded[style*="fontSize: \"12px\""] {
            font-size: 15px !important;
          }
          .profile-image-fix {
            width: 120px !important;
            height: 120px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
            border: 4px solid #fff !important;
            position: relative !important;
            background: #f8f9fa !important;
          }
          .profile-image-fix img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            border-radius: 50% !important;
            display: block !important;
            border: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .jobplugin__profile-intro__image::before {
            width: 28px !important;
            height: 28px !important;
            border-radius: 100% !important;
            border: 5px solid #fff !important;
            background: #063970 !important;
            content: "" !important;
            position: absolute !important;
            left: 8px !important;
            top: 5px !important;
            z-index: 10 !important;
          }
        `}
      </style>
      <div className="subvisual-block subvisual-theme-1 bg-light d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main bg-light">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__profile">
              <div className="jobplugin__profile-intro border border-dark shadow">
                <div className="jobplugin__profile-intro__left">
                  <div className="jobplugin__profile-intro__image border-primary">
                    <div className="jobplugin__profile-intro__avatar">
                      <img
                        src={
                          employeeData.userProfilePic ||
                          employeeData.profileImage ||
                          "images/img-profile.jpg"
                        }
                        alt={employeeData.userName}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          display: "block",
                        }}
                        onError={(e) => {
                          e.target.src = "images/img-profile.jpg";
                        }}
                      />
                    </div>
                    <Link
                      to={`/employee/edit/${employeeData._id}`}
                      className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                  <div className="jobplugin__profile-intro__Textbox">
                    <div className="jobplugin__profile-intro__info mb-0">
                      <h1 className="h4 fw-semibold text-dark mb-1">
                        {employeeData.userName}
                      </h1>
                      {employeeData.isVerified && (
                        <span className="badge bg-success small">Verified</span>
                      )}
                    </div>
                    <div className="text-muted mb-2 d-flex align-items-center">
                      <FaMapMarkerAlt className="me-1" size={14} />
                      <span style={{ fontSize: "14px" }}>
                        {employeeData.currentCity ||
                          employeeData.city ||
                          "Location not specified"}
                      </span>
                    </div>
                    {employeeData.specialization && (
                      <div className="text-muted d-flex align-items-center">
                        <FaBriefcase className="me-1" size={14} />
                        <span style={{ fontSize: "14px" }}>
                          {employeeData.specialization}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="jobplugin__profile-intro__right">
                  <Link
                    to="/dashboard"
                    className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small text-black"
                  >
                    <FaArrowLeft /> &nbsp; Back to Dashboard
                  </Link>
                  <button
                    onClick={() => setShowPasswordModal(true)}
                    className="jobplugin__button border-dark shadow bg-warning hover:jobplugin__bg-warning-dark small"
                  >
                    <FaKey /> &nbsp; Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small"
                  >
                    <FaPowerOff /> &nbsp; Logout
                  </button>
                </div>
              </div>

              {/* Password Change Modal */}
              {showPasswordModal && (
                <div
                  className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                  style={{ zIndex: 1050, backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  <div
                    className="bg-white shadow-lg"
                    style={{
                      maxWidth: "380px",
                      width: "90%",
                      borderRadius: "8px",
                    }}
                  >
                    <div className="px-3 py-3 border-bottom d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold">Change Password</h5>
                      <button
                        type="button"
                        className="border-0 bg-transparent"
                        onClick={closePasswordModal}
                        style={{ cursor: "pointer" }}
                      >
                        <FaTimes />
                      </button>
                    </div>

                    <div className="px-3 py-3">
                      <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                          <label
                            htmlFor="currentPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="newPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            minLength="6"
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        <div className="mb-3">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label mb-1"
                            style={{ fontSize: "14px" }}
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            className="form-control form-control-sm"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            style={{ borderRadius: "6px", padding: "8px 12px" }}
                            required
                          />
                        </div>

                        {passwordError && (
                          <div
                            className="alert alert-danger py-2 mb-3"
                            style={{ fontSize: "13px" }}
                          >
                            {passwordError}
                          </div>
                        )}

                        <div className="d-flex gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-secondary"
                            onClick={closePasswordModal}
                            disabled={passwordLoading}
                            style={{ padding: "6px 16px" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="btn btn-sm btn-primary"
                            disabled={passwordLoading}
                            style={{ padding: "6px 16px" }}
                          >
                            {passwordLoading ? "Changing..." : "Change"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              <div className="jobplugin__profile-container">
                <aside className="jobplugin__profile-aside">
                  {/* Contact Info */}
                  <div className="jobplugin__profile-box border border-dark shadow mb-4">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h6 fw-semibold text-dark mb-1">
                          Contact Information
                        </h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body p-3">
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          <FaPhone className="text-muted me-2" size={14} />
                          <small
                            className="text-muted text-uppercase fw-medium"
                            style={{ fontSize: "11px", letterSpacing: "0.5px" }}
                          >
                            Phone
                          </small>
                        </div>
                        <div className="ms-4" style={{ fontSize: "14px" }}>
                          {employeeData.userMobile || "Not provided"}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-1">
                          <FaEnvelope className="text-muted me-2" size={14} />
                          <small
                            className="text-muted text-uppercase fw-medium"
                            style={{ fontSize: "11px", letterSpacing: "0.5px" }}
                          >
                            Email
                          </small>
                        </div>
                        <div className="ms-4" style={{ fontSize: "14px" }}>
                          {employeeData.userEmail}
                        </div>
                      </div>

                      {employeeData.linkedin && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <FaLink className="text-muted me-2" size={14} />
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              LinkedIn
                            </small>
                          </div>
                          <div className="ms-4">
                            <a
                              href={employeeData.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                              style={{ fontSize: "14px" }}
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}

                      {employeeData.github && (
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-1">
                            <FaLink className="text-muted me-2" size={14} />
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              GitHub
                            </small>
                          </div>
                          <div className="ms-4">
                            <a
                              href={employeeData.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                              style={{ fontSize: "14px" }}
                            >
                              View Profile
                            </a>
                          </div>
                        </div>
                      )}

                      {employeeData.portfolio && (
                        <div className="mb-0">
                          <div className="d-flex align-items-center mb-1">
                            <FaGlobe className="text-muted me-2" size={14} />
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Portfolio
                            </small>
                          </div>
                          <div className="ms-4">
                            <a
                              href={employeeData.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                              style={{ fontSize: "14px" }}
                            >
                              View Website
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Media Profile */}
                  <div className="jobplugin__profile-box border border-dark shadow mb-4">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h6 fw-semibold text-dark mb-1">
                          Media Profile
                        </h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body p-3">
                      {/* Audio Profile Section */}
                      <div className="mb-4">
                        <h6
                          className="fw-medium mb-2 text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          Audio Introduction
                        </h6>
                        {employeeData.introductionAudio?.url ? (
                          <div
                            className="border rounded p-3"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="mb-2">
                              <div
                                className="text-truncate fw-medium"
                                style={{ fontSize: "13px" }}
                              >
                                {employeeData.introductionAudio.name}
                              </div>
                              <small className="text-muted">
                                Duration:{" "}
                                {formatDuration(
                                  employeeData.introductionAudio.duration
                                )}
                              </small>
                            </div>
                            <audio
                              controls
                              className="w-100"
                              style={{ height: "35px" }}
                            >
                              <source
                                src={employeeData.introductionAudio.url}
                                type="audio/mpeg"
                              />
                              Your browser does not support the audio element.
                            </audio>
                          </div>
                        ) : (
                          <div
                            className="border rounded p-3 text-center text-muted"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <small>No audio introduction available</small>
                          </div>
                        )}
                      </div>

                      {/* Video Profile Section */}
                      <div>
                        <h6
                          className="fw-medium mb-2 text-dark"
                          style={{ fontSize: "14px" }}
                        >
                          Video Profile
                        </h6>
                        {employeeData.profileVideo?.url ? (
                          <div
                            className="border rounded p-3"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="mb-2">
                              <div
                                className="text-truncate fw-medium"
                                style={{ fontSize: "13px" }}
                              >
                                {employeeData.profileVideo.name}
                              </div>
                            </div>
                            <div className="ratio ratio-16x9">
                              <video
                                controls
                                className="w-100 rounded"
                                poster={
                                  employeeData.profileVideo.thumbnail ||
                                  employeeData.profileImage ||
                                  "images/img-profile.jpg"
                                }
                              >
                                <source
                                  src={employeeData.profileVideo.url}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="border rounded p-3 text-center text-muted"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="ratio ratio-16x9">
                              <div className="d-flex align-items-center justify-content-center">
                                <small>No video profile available</small>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="jobplugin__profile-box border border-dark shadow mb-4">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h6 fw-semibold text-dark mb-1">
                          Personal Details
                        </h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body p-3">
                      <div className="row g-3">
                        <div className="col-12">
                          <div className="mb-1">
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Gender
                            </small>
                          </div>
                          <div style={{ fontSize: "14px" }}>
                            {employeeData.gender || "Not specified"}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="mb-1">
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Date of Birth
                            </small>
                          </div>
                          <div style={{ fontSize: "14px" }}>
                            {formatDOB(employeeData.dob)}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="mb-1">
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Marital Status
                            </small>
                          </div>
                          <div style={{ fontSize: "14px" }}>
                            {employeeData.maritalStatus || "Not specified"}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="mb-1">
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Total Experience
                            </small>
                          </div>
                          <div style={{ fontSize: "14px" }}>
                            {employeeData.totalExperience || "Not specified"}
                            {employeeData.totalExperience &&
                            employeeData.totalExperience !== "Fresher"
                              ? " years"
                              : ""}
                          </div>
                        </div>

                        {employeeData.expectedSalary && (
                          <div className="col-12">
                            <div className="mb-1">
                              <small
                                className="text-muted text-uppercase fw-medium"
                                style={{
                                  fontSize: "11px",
                                  letterSpacing: "0.5px",
                                }}
                              >
                                Expected Annual Salary
                              </small>
                            </div>
                            <div style={{ fontSize: "14px" }}>
                              ₹{employeeData.expectedSalary.toLocaleString()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="jobplugin__profile-box border border-dark shadow mb-4">
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h6 fw-semibold text-dark mb-1">
                          Address
                        </h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      <div className="jobplugin__profile-box__buttons">
                        <Link
                          to={`/employee/edit/${employeeData._id}`}
                          className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </div>
                    <div className="jobplugin__profile-box__body p-3">
                      <div className="mb-3">
                        <div className="mb-1">
                          <small
                            className="text-muted text-uppercase fw-medium"
                            style={{ fontSize: "11px", letterSpacing: "0.5px" }}
                          >
                            Current Address
                          </small>
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "14px", lineHeight: "1.4" }}
                        >
                          {employeeData.addressLine1 ? (
                            <>
                              <div>{employeeData.addressLine1}</div>
                              {employeeData.addressLine2 && (
                                <div>{employeeData.addressLine2}</div>
                              )}
                              <div>
                                {employeeData.city && `${employeeData.city}, `}
                                {employeeData.state}
                              </div>
                              {employeeData.pincode && (
                                <div>PIN: {employeeData.pincode}</div>
                              )}
                            </>
                          ) : (
                            <div>Address not specified</div>
                          )}
                        </div>
                      </div>

                      {employeeData.preferredLocation && (
                        <div>
                          <div className="mb-1">
                            <small
                              className="text-muted text-uppercase fw-medium"
                              style={{
                                fontSize: "11px",
                                letterSpacing: "0.5px",
                              }}
                            >
                              Preferred Location
                            </small>
                          </div>
                          <div
                            className="text-muted"
                            style={{ fontSize: "14px" }}
                          >
                            {employeeData.preferredLocation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Grade Levels */}
                  {employeeData.gradeLevels?.length > 0 && (
                    <div className="jobplugin__profile-box border border-dark shadow mb-4">
                      <div className="jobplugin__profile-box__head">
                        <div className="jobplugin__profile-box__heading">
                          <h2 className="h6 fw-semibold text-dark mb-1">
                            Grade Levels
                          </h2>
                          <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                        </div>
                        <div className="jobplugin__profile-box__buttons">
                          <Link
                            to={`/employee/edit/${employeeData._id}`}
                            className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                          >
                            <FaEdit />
                          </Link>
                        </div>
                      </div>
                      <div className="jobplugin__profile-box__body p-3">
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.gradeLevels.map((grade, index) => (
                            <span
                              key={index}
                              className="border px-2 py-1 rounded text-muted"
                              style={{
                                fontSize: "12px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              {grade}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </aside>

                <div className="jobplugin__profile-content border border-dark shadow">
                  {/* Profile Summary */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">
                        Profile Summary
                      </h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      <div
                        className="p-3"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "4px",
                        }}
                      >
                        <p
                          className="mb-0 text-muted"
                          style={{ fontSize: "14px", lineHeight: "1.6" }}
                        >
                          {employeeData.profilesummary ||
                            employeeData.coverLetter ||
                            "No profile summary available. Add a compelling summary to showcase your skills and experience to potential employers."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">
                        Education
                      </h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.education?.length > 0 ? (
                        <div className="education-timeline">
                          {employeeData.education.map((edu, index) => (
                            <div
                              key={index}
                              className="border rounded p-3 mb-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <div className="row align-items-start">
                                <div className="col-md-8">
                                  <h6
                                    className="fw-semibold text-dark mb-1"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {edu.degree}
                                  </h6>
                                  <div
                                    className="text-muted mb-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {edu.institution}
                                  </div>
                                  <div className="d-flex align-items-center gap-2">
                                    <span
                                      className="badge bg-secondary"
                                      style={{ fontSize: "11px" }}
                                    >
                                      {edu.type}
                                    </span>
                                    <small className="text-muted">
                                      {formatDate(edu.startDate)} -{" "}
                                      {formatDate(edu.endDate)}
                                    </small>
                                  </div>
                                </div>
                                <div className="col-md-4 text-md-end">
                                  <small className="text-muted">
                                    {edu.endDate ? "Completed" : "Ongoing"}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="border rounded p-4 text-center text-muted"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            No education details added yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">
                        Work Experience
                      </h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.workExperience?.length > 0 ? (
                        <div className="experience-timeline">
                          {employeeData.workExperience.map((exp, index) => (
                            <div
                              key={index}
                              className="border rounded p-3 mb-3"
                              style={{ backgroundColor: "#f8f9fa" }}
                            >
                              <div className="row align-items-start">
                                <div className="col-md-8">
                                  <h6
                                    className="fw-semibold text-dark mb-1"
                                    style={{ fontSize: "15px" }}
                                  >
                                    {exp.position}
                                  </h6>
                                  <div
                                    className="text-muted mb-2"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {exp.company}
                                  </div>
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <span
                                      className="badge bg-secondary"
                                      style={{ fontSize: "11px" }}
                                    >
                                      {exp.employmentType}
                                    </span>
                                    <small className="text-muted">
                                      {formatDate(exp.startDate)} -{" "}
                                      {formatDate(exp.endDate)}
                                    </small>
                                  </div>
                                  {exp.description && (
                                    <p
                                      className="text-muted mb-0"
                                      style={{
                                        fontSize: "14px",
                                        lineHeight: "1.5",
                                      }}
                                    >
                                      {exp.description}
                                    </p>
                                  )}
                                </div>
                                <div className="col-md-4 text-md-end">
                                  <small className="text-muted">
                                    {exp.endDate ? "Completed" : "Current"}
                                  </small>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : employeeData.totalExperience === "Fresher" ? (
                        <div
                          className="border rounded p-4 text-center text-muted"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <h6 className="mb-2 text-dark">Fresher</h6>
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            Ready to start professional journey
                          </p>
                        </div>
                      ) : (
                        <div
                          className="border rounded p-4 text-center text-muted"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            No work experience added yet.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">
                        Documents
                      </h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      <div className="row g-3">
                        {/* Resume */}
                        <div className="col-md-6">
                          <div
                            className="border rounded p-3 h-100"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <FaFilePdf
                                className="text-muted me-2"
                                size={20}
                              />
                              <h6
                                className="mb-0 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                Resume
                              </h6>
                            </div>
                            {employeeData.resume?.url ? (
                              <>
                                <p className="text-muted mb-3 small">
                                  {employeeData.resume.name || "Resume.pdf"}
                                </p>
                                <a
                                  href={employeeData.resume.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className=" bg-dark btn btn-outline-dark btn-sm"
                                  style={{ fontSize: "13px", color: "white" }}
                                >
                                  Download
                                </a>
                              </>
                            ) : (
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "13px" }}
                              >
                                No resume uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="col-md-6">
                          <div
                            className="border rounded p-3 h-100"
                            style={{ backgroundColor: "#f8f9fa" }}
                          >
                            <div className="d-flex align-items-center mb-2">
                              <FaFilePdf
                                className="text-muted me-2"
                                size={20}
                              />
                              <h6
                                className="mb-0 fw-semibold"
                                style={{ fontSize: "14px" }}
                              >
                                Cover Letter
                              </h6>
                            </div>
                            {employeeData.coverLetterFile?.url ? (
                              <>
                                <p className="text-muted mb-3 small">
                                  {employeeData.coverLetterFile.name ||
                                    "Cover-Letter.pdf"}
                                </p>
                                <a
                                  href={employeeData.coverLetterFile.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className=" bg-dark btn btn-outline-dark btn-sm"
                                  style={{ fontSize: "13px", color: "white" }}
                                >
                                  Download
                                </a>
                              </>
                            ) : (
                              <p
                                className="text-muted mb-0"
                                style={{ fontSize: "13px" }}
                              >
                                No cover letter uploaded yet.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">Skills</h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.skills?.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="border px-3 py-1 rounded text-dark"
                              style={{
                                fontSize: "13px",
                                backgroundColor: "#f8f9fa",
                                fontWeight: "500",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="border rounded p-4 text-center text-muted"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            No skills added yet
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="jobplugin__profile-block mb-4">
                    <div className="jobplugin__profile-block__header border-bottom pb-3 mb-4">
                      <h2 className="h5 fw-semibold text-dark mb-0">
                        Languages
                      </h2>
                      <Link
                        to={`/employee/edit/${employeeData._id}`}
                        className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                      >
                        <FaEdit />
                      </Link>
                    </div>
                    <div className="jobplugin__profile-block__body">
                      {employeeData.languages?.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {employeeData.languages.map((language, index) => (
                            <span
                              key={index}
                              className="border px-3 py-1 rounded text-dark"
                              style={{
                                fontSize: "13px",
                                backgroundColor: "#f8f9fa",
                                fontWeight: "500",
                              }}
                            >
                              {language}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div
                          className="border rounded p-4 text-center text-muted"
                          style={{ backgroundColor: "#f8f9fa" }}
                        >
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            No languages added yet
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EmployeProfile;
