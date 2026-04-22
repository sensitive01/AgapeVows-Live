import React, { useEffect, useState } from "react";
import {
  FaCog,
  FaTimes,
  FaUsers,
  FaSuitcase,
  FaEdit,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendar,
  FaCheckCircle,
} from "react-icons/fa";
import { FaSquarePen } from "react-icons/fa6";
import { IoDocumentText, IoChevronDown } from "react-icons/io5";
import Sidebar from "../../components/layout/Sidebar";
import jobImage from "../../../public/images/jobImage.jpg"; // Import your job image

const API_URL = import.meta.env.VITE_BASE_URL;

const defaultCategories = [
  {
    title: "Teaching Jobs",
    iconBlue: "/images/img_20.png",
    iconWhite: "/images/img_20_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Education",
  },
  {
    title: "Leadership and Administration",
    iconBlue: "/images/leadership.png",
    iconWhite: "/images/leadership1.png",
    lucideIcon: null,
    apiCategoryMatch: "Leadership",
  },
  {
    title: "Support and Student Welfare",
    iconBlue: "/images/img_25.png",
    iconWhite: "/images/img_25_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Support",
  },
  {
    title: "Extracurricular Activities",
    iconBlue: "/images/img_22.png",
    iconWhite: "/images/img_22_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Extracurricular",
  },
  {
    title: "Curriculum and Content Development",
    iconBlue: "/images/img_23.png",
    iconWhite: "/images/img_23_white.png",
    lucideIcon: null,
    apiCategoryMatch: "Curriculum",
  },
  {
    title: "EdTech and Digital Learning",
    iconBlue: "/images/img_24.png",
    iconWhite: "/images/img_24_white.png",
    lucideIcon: null,
    apiCategoryMatch: "IT",
  },
  {
    title: "Special Education and Inclusive Learning",
    iconBlue: "/images/special.png",
    iconWhite: "/images/special1.png",
    lucideIcon: null,
    apiCategoryMatch: "Special Education",
  },
  {
    title: "Non-Teaching Staffs",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaUsers,
    apiCategoryMatch: "Non-Teaching",
  },
  {
    title: "Training and Development",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaSquarePen,
    apiCategoryMatch: "Training",
  },
  {
    title: "Research and Policy Development",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: IoDocumentText,
    apiCategoryMatch: "Research",
  },
  {
    title: "Other Specialized Roles",
    iconBlue: null,
    iconWhite: null,
    lucideIcon: FaSuitcase,
    apiCategoryMatch: "Marketing",
  },
];

const JobAlert = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreferenceModalOpen, setIsPreferenceModalOpen] = useState(false);
  const [jobAlerts, setJobAlerts] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [matchingJobs, setMatchingJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPreferenceCategoryDropdown, setShowPreferenceCategoryDropdown] =
    useState(false);

  // Form state for job alerts
  const [formData, setFormData] = useState({
    salaryFrom: "",
    salaryTo: "",
    location: "",
    workType: "work_from_home",
    experience: "",
    jobCategories: [],
  });

  // Form state for preferences
  const [preferenceData, setPreferenceData] = useState({
    salaryFrom: "",
    salaryTo: "",
    location: "",
    workType: "work_from_home",
    experience: "",
    jobCategories: [],
  });

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchJobAlerts();
    fetchUserPreferences();
    fetchMatchingJobs();
  }, []);

  const fetchJobAlerts = async () => {
    try {
      const response = await fetch(`${API_URL}/get-job-alerts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMatchingJobs(data.jobAlerts || []);
        setUserPreferences(data.userJobPreference);

        if (data.userJobPreference) {
          setPreferenceData({
            salaryFrom: data.userJobPreference.salaryFrom || "",
            salaryTo: data.userJobPreference.salaryTo || "",
            location: data.userJobPreference.location || "",
            workType: data.userJobPreference.workType || "work_from_home",
            experience: data.userJobPreference.experience || "",
            jobCategories: data.userJobPreference.jobCategories || [],
          });
        }
      }
    } catch (error) {
      console.error("Error fetching job alerts:", error);
    }
  };

  const fetchUserPreferences = async () => {
    try {
      const response = await fetch(`${API_URL}/user-job-preferences`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserPreferences(data.preferences);
        // setMatchingJobs(data.jobAlerts || []);
      }
    } catch (error) {
      console.error("Error fetching user preferences:", error);
    }
  };

  const fetchMatchingJobs = async () => {
    try {
      const response = await fetch(`${API_URL}/matching-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMatchingJobs(data.jobs || []);
      }
    } catch (error) {
      console.error("Error fetching matching jobs:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferenceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (categoryMatch) => {
    setFormData((prev) => ({
      ...prev,
      jobCategories: prev.jobCategories.includes(categoryMatch)
        ? prev.jobCategories.filter((cat) => cat !== categoryMatch)
        : [...prev.jobCategories, categoryMatch],
    }));
  };

  const handlePreferenceCategoryChange = (categoryMatch) => {
    setPreferenceData((prev) => ({
      ...prev,
      jobCategories: prev.jobCategories.includes(categoryMatch)
        ? prev.jobCategories.filter((cat) => cat !== categoryMatch)
        : [...prev.jobCategories, categoryMatch],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.jobCategories.length === 0) {
      alert("Please select at least one job category.");
      return;
    }

    setLoading(true);

    try {
      const submitData = {
        ...formData,
        salaryRange: `${formData.salaryFrom} - ${formData.salaryTo}`,
      };

      const response = await fetch(`${API_URL}/add-job-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        setFormData({
          salaryFrom: "",
          salaryTo: "",
          location: "",
          workType: "work_from_home",
          experience: "",
          jobCategories: [],
        });
        setIsModalOpen(false);
        setShowCategoryDropdown(false);
        await fetchJobAlerts();
        alert("Job alert added successfully!");
      } else {
        alert("Failed to add job alert. Please try again.");
      }
    } catch (error) {
      console.error("Error adding job alert:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/add-job-alert`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(preferenceData),
      });

      if (response.ok) {
        setIsPreferenceModalOpen(false);
        await fetchJobAlerts();
        await fetchMatchingJobs();
        alert("Job preferences updated successfully!");
      } else {
        alert("Failed to update preferences. Please try again.");
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);
  const openModal = () => setIsModalOpen(true);
  const openPreferenceModal = () => setIsPreferenceModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setShowCategoryDropdown(false);
    setFormData({
      salaryFrom: "",
      salaryTo: "",
      location: "",
      workType: "work_from_home",
      experience: "",
      jobCategories: [],
    });
  };

  const closePreferenceModal = () => {
    setIsPreferenceModalOpen(false);
    setShowPreferenceCategoryDropdown(false);
    if (userPreferences) {
      setPreferenceData({
        salaryFrom: userPreferences.salaryFrom || "",
        salaryTo: userPreferences.salaryTo || "",
        location: userPreferences.location || "",
        workType: userPreferences.workType || "work_from_home",
        experience: userPreferences.experience || "",
        jobCategories: userPreferences.jobCategories || [],
      });
    }
  };

  const getSelectedCategoriesText = (categories) => {
    if (categories.length === 0) {
      return "Select job categories...";
    }
    if (categories.length === 1) {
      const category = defaultCategories.find(
        (cat) => cat.apiCategoryMatch === categories[0]
      );
      return category ? category.title : categories[0];
    }
    return `${categories.length} categories selected`;
  };

  const getCategoryTitle = (apiMatch) => {
    const category = defaultCategories.find(
      (cat) => cat.apiCategoryMatch === apiMatch
    );
    return category ? category.title : apiMatch;
  };

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              <div className="jobplugin__settings-content">
                {/* Job Preferences Section */}
                {userPreferences && (
                  <div
                    className="jobplugin__settings-card"
                    style={{ marginBottom: "24px" }}
                  >
                    <header className="jobplugin__settings-card__head">
                      <h3 className="h6">Your Job Preferences</h3>
                      <button
                        onClick={openPreferenceModal}
                        className="jobplugin__button jobplugin__bg-white jobplugin__border-primary small hover:jobplugin__bg-white"
                        style={{ color: "black" }}
                      >
                        <FaEdit style={{ marginRight: "5px" }} />
                        Edit Preferences
                      </button>
                    </header>
                    <div className="jobplugin__settings-card__body">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(200px, 1fr))",
                          gap: "16px",
                          padding: "16px 0",
                        }}
                      >
                        <div>
                          <strong>Salary Range:</strong>
                          <p>
                            ₹{userPreferences.salaryFrom} - ₹
                            {userPreferences.salaryTo}
                          </p>
                        </div>
                        <div>
                          <strong>Location:</strong>
                          <p>{userPreferences.location}</p>
                        </div>
                        <div>
                          <strong>Work Type:</strong>
                          <p>
                            {userPreferences.workType
                              ?.replace(/_/g, " ")
                              .replace(/\b\w/g, (l) => l.toUpperCase())}
                          </p>
                        </div>
                        <div>
                          <strong>Experience:</strong>
                          <p>{userPreferences.experience} years</p>
                        </div>
                      </div>
                      <div>
                        <strong>Preferred Categories:</strong>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "8px",
                          }}
                        >
                          {userPreferences.jobCategories?.map((category) => (
                            <span
                              key={category}
                              style={{
                                backgroundColor: "#e3f2fd",
                                color: "#1976d2",
                                padding: "4px 12px",
                                borderRadius: "16px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              {getCategoryTitle(category)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Matching Jobs Section with Card Layout */}
                <div className="jobplugin__settings-card">
                  <header className="jobplugin__settings-card__head">
                    <h3 className="h6">
                      Matching Jobs ({matchingJobs.length})
                    </h3>
                    <button
                      onClick={openModal}
                      className="jobplugin__button jobplugin__bg-white jobplugin__border-primary small hover:jobplugin__bg-white"
                      style={{ color: "black" }}
                    >
                      Add a Job Alert
                    </button>
                  </header>
                  <div className="jobplugin__settings-card__body">
                    {matchingJobs.length > 0 ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(300px, 1fr))",
                          gap: "20px",
                          padding: "10px 0",
                        }}
                      >
                        {matchingJobs.map((job) => (
                          <article
                            key={job._id}
                            className="featured-category-box"
                            style={{
                              position: "relative",
                              cursor: "pointer",
                              padding: "20px",
                              border: "1px solid #e5e7eb",
                              borderRadius: "12px",
                              backgroundColor: "white",
                              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0, 0, 0, 0.15)";
                              e.currentTarget.style.transform =
                                "translateY(-2px)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow =
                                "0 2px 4px rgba(0, 0, 0, 0.1)";
                              e.currentTarget.style.transform = "translateY(0)";
                            }}
                          >
                            <a
                              href={`/job-details/${job._id}`}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 1,
                                opacity: 0,
                              }}
                              aria-label={`View details for ${job.jobTitle} position at ${job.companyName}`}
                            />

                            {/* Posted Time Badge */}
                            <span
                              className="tag"
                              style={{
                                position: "absolute",
                                top: "15px",
                                right: "15px",
                                backgroundColor: "#fef3c7",
                                color: "#d97706",
                                padding: "4px 8px",
                                borderRadius: "4px",
                                fontSize: "12px",
                                fontWeight: "500",
                              }}
                            >
                              <b>Posted:</b> {formatDate(job.createdAt)}
                            </span>

                            {/* Company Logo Section */}
                            <div
                              className="img-holder"
                              style={{ marginBottom: "16px" }}
                            >
                              <div
                                style={{
                                  width: "78px",
                                  height: "78px",
                                  borderRadius: "8px",
                                  backgroundColor: "#f3f4f6",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  margin: "0 auto",
                                  position: "relative",
                                }}
                              >
                                {job.companyLogo ? (
                                  <img
                                    src={job.companyLogo}
                                    width="78"
                                    height="78"
                                    alt={job.companyName}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = jobImage;
                                    }}
                                  />
                                ) : (
                                  <img
                                    src={jobImage}
                                    width="78"
                                    height="78"
                                    alt={job.companyName}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: "8px",
                                    }}
                                  />
                                )}

                                {/* Employer Profile Picture Overlay */}
                                {job.employerProfilePic && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      bottom: "-8px",
                                      right: "-8px",
                                      width: "32px",
                                      height: "32px",
                                      borderRadius: "50%",
                                      border: "2px solid white",
                                      overflow: "hidden",
                                      backgroundColor: "white",
                                    }}
                                  >
                                    <img
                                      src={job.employerProfilePic}
                                      width="32"
                                      height="32"
                                      alt="Employer"
                                      style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                      }}
                                      onError={(e) => {
                                        e.target.style.display = "none";
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Company and Location Info */}
                            <div className="textbox">
                              <strong
                                className="h6 mb-0"
                                style={{
                                  display: "block",
                                  marginBottom: "4px",
                                }}
                              >
                                {job.companyName}
                              </strong>
                              <address
                                className="location"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "12px",
                                  fontSize: "14px",
                                  color: "#6b7280",
                                }}
                              >
                                <FaMapMarkerAlt
                                  style={{ marginRight: "4px" }}
                                />
                                <span>
                                  {job.isRemote ? "Remote" : job.location}
                                  {job.isRemote && job.location
                                    ? ` (${job.location})`
                                    : ""}
                                </span>
                              </address>

                              {/* Job Title and Category */}
                              <strong
                                className="h6 text-primary mb-0"
                                style={{
                                  display: "block",
                                  color: "#f59e0b",
                                  fontSize: "18px",
                                  marginBottom: "4px",
                                }}
                              >
                                {job.jobTitle}
                              </strong>
                              <span
                                className="subtitle"
                                style={{
                                  display: "block",
                                  color: "#374151",
                                  fontSize: "14px",
                                  marginBottom: "8px",
                                }}
                              >
                                {job.category}
                              </span>

                              {/* Experience Level */}
                              {job.experienceLevel && (
                                <span
                                  className="d-block small text-muted"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    marginBottom: "12px",
                                  }}
                                >
                                  <FaSuitcase style={{ marginRight: "4px" }} />
                                  {job.experienceLevel}
                                </span>
                              )}

                              <hr
                                style={{
                                  margin: "16px 0",
                                  borderColor: "#e5e7eb",
                                }}
                              />

                              {/* Salary and Job Type Info */}
                              <div
                                className="job-info"
                                style={{ marginBottom: "16px" }}
                              >
                                <span
                                  className="amount"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: "8px",
                                  }}
                                >
                                  <FaRupeeSign
                                    style={{
                                      marginRight: "4px",
                                      color: "#374151",
                                    }}
                                  />
                                  <strong
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: "600",
                                      color: "#374151",
                                    }}
                                  >
                                    ₹{job.salaryFrom} to ₹{job.salaryTo}
                                  </strong>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#6b7280",
                                      marginLeft: "4px",
                                    }}
                                  >
                                    /{job.salaryType?.toLowerCase() || "month"}
                                  </span>
                                </span>
                                <span
                                  className="subtext"
                                  style={{ fontSize: "14px" }}
                                >
                                  <b style={{ color: "#f59e0b" }}>Job Type:</b>{" "}
                                  <span style={{ color: "#374151" }}>
                                    {job.jobType}
                                  </span>
                                </span>
                              </div>

                              {/* Apply Button */}
                              <a
                                href={`/job-details/${job._id}`}
                                className="btn btn-dark-yellow btn-sm"
                                style={{
                                  position: "relative",
                                  zIndex: 2,
                                  backgroundColor: "#fbbf24",
                                  borderColor: "#fbbf24",
                                  color: "#1f2937",
                                  padding: "12px 24px",
                                  borderRadius: "8px",
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  transition: "all 0.2s",
                                  width: "100%",
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "#f59e0b";
                                  e.target.style.borderColor = "#f59e0b";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "#fbbf24";
                                  e.target.style.borderColor = "#fbbf24";
                                }}
                              >
                                <span
                                  className="btn-text"
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <span
                                    className="text"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FaCheckCircle
                                      style={{
                                        marginRight: "8px",
                                        color: "#374151",
                                      }}
                                    />
                                    Apply Now
                                  </span>
                                  <svg
                                    style={{
                                      marginLeft: "8px",
                                      width: "16px",
                                      height: "16px",
                                    }}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </span>
                              </a>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "40px",
                          color: "#6b7280",
                        }}
                      >
                        <p>No matching jobs found based on your preferences.</p>
                        {!userPreferences && (
                          <p>Set your job preferences to see matching jobs.</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Job Alert Modal */}
      {isModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              style={{
                padding: "24px 24px 0 24px",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1f2937",
                    paddingBottom: "16px",
                  }}
                >
                  Create Job Alert
                </h2>
                <button
                  onClick={closeModal}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div style={{ padding: "0 24px 24px 24px" }}>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Salary Range *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryFrom"
                        value={formData.salaryFrom}
                        onChange={handleInputChange}
                        placeholder="From (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          transition: "border-color 0.2s",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                    <span style={{ color: "#6b7280", fontWeight: "500" }}>
                      to
                    </span>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryTo"
                        value={formData.salaryTo}
                        onChange={handleInputChange}
                        placeholder="To (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "16px", marginBottom: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g., Mumbai, Delhi, Remote"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      required
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Work Type *
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleInputChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        outline: "none",
                      }}
                      required
                    >
                      <option value="work_from_home">Work From Home</option>
                      <option value="work_from_office">Work From Office</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 2-5 years, Fresher, 10+ years"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Job Categories *
                  </label>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={() =>
                        setShowCategoryDropdown(!showCategoryDropdown)
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        style={{
                          color:
                            formData.jobCategories.length === 0
                              ? "#9ca3af"
                              : "#374151",
                        }}
                      >
                        {getSelectedCategoriesText(formData.jobCategories)}
                      </span>
                      <IoChevronDown
                        style={{
                          transform: showCategoryDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>

                    {showCategoryDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "white",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          zIndex: 1000,
                          maxHeight: "300px",
                          overflowY: "auto",
                          marginTop: "4px",
                        }}
                      >
                        {defaultCategories.map((category, index) => (
                          <label
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "12px 16px",
                              cursor: "pointer",
                              borderBottom:
                                index < defaultCategories.length - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.jobCategories.includes(
                                category.apiCategoryMatch
                              )}
                              onChange={() =>
                                handleCategoryChange(category.apiCategoryMatch)
                              }
                              style={{
                                marginRight: "12px",
                                width: "16px",
                                height: "16px",
                                cursor: "pointer",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              {category.iconBlue && (
                                <img
                                  src={category.iconBlue}
                                  alt=""
                                  style={{ width: "20px", height: "20px" }}
                                />
                              )}
                              {category.lucideIcon && (
                                <category.lucideIcon
                                  size={20}
                                  color="#6b7280"
                                />
                              )}
                              <span
                                style={{ fontSize: "14px", color: "#374151" }}
                              >
                                {category.title}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {formData.jobCategories.length > 0 && (
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {formData.jobCategories.map((categoryMatch) => {
                        const category = defaultCategories.find(
                          (cat) => cat.apiCategoryMatch === categoryMatch
                        );
                        return (
                          <span
                            key={categoryMatch}
                            style={{
                              backgroundColor: "#eff6ff",
                              color: "#1d4ed8",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {category ? category.title : categoryMatch}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end",
                    paddingTop: "16px",
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: "12px 24px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#374151",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                  >
                    {loading ? "Creating..." : "Create Alert"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Preferences Modal */}
      {isPreferenceModalOpen && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div
              style={{
                padding: "24px 24px 0 24px",
                borderBottom: "1px solid #e5e7eb",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "600",
                    color: "#1f2937",
                    paddingBottom: "16px",
                  }}
                >
                  Edit Job Preferences
                </h2>
                <button
                  onClick={closePreferenceModal}
                  style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    color: "#6b7280",
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f3f4f6")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            <div style={{ padding: "0 24px 24px 24px" }}>
              <form onSubmit={handlePreferenceSubmit}>
                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Salary Range *
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryFrom"
                        value={preferenceData.salaryFrom}
                        onChange={handlePreferenceChange}
                        placeholder="From (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          transition: "border-color 0.2s",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                    <span style={{ color: "#6b7280", fontWeight: "500" }}>
                      to
                    </span>
                    <div style={{ flex: 1 }}>
                      <input
                        type="number"
                        name="salaryTo"
                        value={preferenceData.salaryTo}
                        onChange={handlePreferenceChange}
                        placeholder="To (₹)"
                        style={{
                          width: "100%",
                          padding: "12px 16px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          fontSize: "14px",
                          outline: "none",
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "16px", marginBottom: "20px" }}
                >
                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={preferenceData.location}
                      onChange={handlePreferenceChange}
                      placeholder="e.g., Mumbai, Delhi, Remote"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                      }}
                      required
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "8px",
                        fontWeight: "500",
                        color: "#374151",
                        fontSize: "14px",
                      }}
                    >
                      Work Type *
                    </label>
                    <select
                      name="workType"
                      value={preferenceData.workType}
                      onChange={handlePreferenceChange}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        outline: "none",
                      }}
                      required
                    >
                      <option value="work_from_home">Work From Home</option>
                      <option value="work_from_office">Work From Office</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Experience *
                  </label>
                  <input
                    type="text"
                    name="experience"
                    value={preferenceData.experience}
                    onChange={handlePreferenceChange}
                    placeholder="e.g., 2-5 years, Fresher, 10+ years"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "14px",
                      outline: "none",
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontWeight: "500",
                      color: "#374151",
                      fontSize: "14px",
                    }}
                  >
                    Job Categories *
                  </label>
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={() =>
                        setShowPreferenceCategoryDropdown(
                          !showPreferenceCategoryDropdown
                        )
                      }
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        backgroundColor: "white",
                        textAlign: "left",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span
                        style={{
                          color:
                            preferenceData.jobCategories.length === 0
                              ? "#9ca3af"
                              : "#374151",
                        }}
                      >
                        {getSelectedCategoriesText(
                          preferenceData.jobCategories
                        )}
                      </span>
                      <IoChevronDown
                        style={{
                          transform: showPreferenceCategoryDropdown
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                          transition: "transform 0.2s",
                        }}
                      />
                    </button>

                    {showPreferenceCategoryDropdown && (
                      <div
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: 0,
                          right: 0,
                          backgroundColor: "white",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                          zIndex: 1000,
                          maxHeight: "300px",
                          overflowY: "auto",
                          marginTop: "4px",
                        }}
                      >
                        {defaultCategories.map((category, index) => (
                          <label
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "12px 16px",
                              cursor: "pointer",
                              borderBottom:
                                index < defaultCategories.length - 1
                                  ? "1px solid #f3f4f6"
                                  : "none",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={preferenceData.jobCategories.includes(
                                category.apiCategoryMatch
                              )}
                              onChange={() =>
                                handlePreferenceCategoryChange(
                                  category.apiCategoryMatch
                                )
                              }
                              style={{
                                marginRight: "12px",
                                width: "16px",
                                height: "16px",
                                cursor: "pointer",
                              }}
                            />
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              {category.iconBlue && (
                                <img
                                  src={category.iconBlue}
                                  alt=""
                                  style={{ width: "20px", height: "20px" }}
                                />
                              )}
                              {category.lucideIcon && (
                                <category.lucideIcon
                                  size={20}
                                  color="#6b7280"
                                />
                              )}
                              <span
                                style={{ fontSize: "14px", color: "#374151" }}
                              >
                                {category.title}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  {preferenceData.jobCategories.length > 0 && (
                    <div
                      style={{
                        marginTop: "8px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {preferenceData.jobCategories.map((categoryMatch) => {
                        const category = defaultCategories.find(
                          (cat) => cat.apiCategoryMatch === categoryMatch
                        );
                        return (
                          <span
                            key={categoryMatch}
                            style={{
                              backgroundColor: "#eff6ff",
                              color: "#1d4ed8",
                              padding: "4px 8px",
                              borderRadius: "4px",
                              fontSize: "12px",
                              fontWeight: "500",
                            }}
                          >
                            {category ? category.title : categoryMatch}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    justifyContent: "flex-end",
                    paddingTop: "16px",
                    borderTop: "1px solid #e5e7eb",
                  }}
                >
                  <button
                    type="button"
                    onClick={closePreferenceModal}
                    style={{
                      padding: "12px 24px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      backgroundColor: "white",
                      color: "#374151",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: "12px 24px",
                      border: "none",
                      borderRadius: "8px",
                      backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                      color: "white",
                      cursor: loading ? "not-allowed" : "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.2s",
                    }}
                  >
                    {loading ? "Updating..." : "Update Preferences"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobAlert;
