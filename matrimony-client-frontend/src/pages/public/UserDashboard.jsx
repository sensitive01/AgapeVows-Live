import React, { useState, useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  FaArrowLeft,
  FaPowerOff,
  FaShare,
  FaEdit,
  FaPlus,
  FaTrash,
  FaSearch,
  FaBriefcase,
  FiHeart,
  FaCog,
  FaClock,
  FaTimes,
  FaCalendarAlt,
  FaFileAlt,
  FaCheckSquare,
  FaEllipsisH,
  FaChevronRight,
  FaCrown,
  FaWallet,
  FaGem,
  FaUsers,
  FaCheck,
  FaCalendarCheck,
} from "react-icons/fa";
import { FiEye, FiUsers, FiHeart, FiCalendar, FiPhone } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getEmployeeDetails } from "../../api/services/projectServices";
import axios from "axios";
import "./dashboard.css";

const UserDashboard = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [employerData, setEmployerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    matchingJobs: 0,
    appliedJobs: 0,
    shortlistedJobs: 0,
    pendingJob: 0,
  });
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  // Check if the current viewport is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Fetch employer data and stats
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        // Fetch employer data
        const data = await getEmployeeDetails(userData._id, token);
        console.log("userData", data);
        setEmployerData(data);

        let appliedCount = 0;
        let shortlistedCount = 0;
        let matchingCount = 0;
        let rejectedCount = 0;
        let pendingJob = 0;

        try {
          const appliedResponse = await axios.get(
            `${VITE_BASE_URL}/applicant/${userData._id}`
          );
          appliedCount = appliedResponse.data?.length || 0;
        } catch (appliedError) {
          console.log(
            "No applied jobs found or error fetching applied jobs:",
            appliedError
          );
        }

        try {
          const shortlistedResponse = await axios.get(
            `${VITE_BASE_URL}/fetchshorlitstedjobsemployee/${userData._id}`
          );
          shortlistedCount = shortlistedResponse.data?.length || 0;
        } catch (shortlistedError) {
          console.log(
            "No shortlisted jobs found or error fetching shortlisted jobs:",
            shortlistedError
          );
        }
        try {
          const pendingResponse = await axios.get(
            `${VITE_BASE_URL}/pendingJobs/${userData._id}`
          );
          pendingJob = pendingResponse.data?.length || 0;
        } catch (err) {
          console.log(
            "No pending jobs found or error fetching pending jobs:",
            err
          );
        }
        try {
          const rejectedResponse = await axios.get(
            `${VITE_BASE_URL}/getrejectedjob/${userData._id}`
          );
          rejectedCount = rejectedResponse.data?.length || 0;
        } catch (rejectedCounterr) {
          console.log(
            "No rejected jobs found or error fetching rejected jobs:",
            rejectedCounterr
          );
        }

        try {
          const allJobsResponse = await axios.get(
            `${VITE_BASE_URL}/employer/fetchjobs`
          );
          matchingCount =
            allJobsResponse.data?.filter((job) => job.isActive)?.length || 0;
        } catch (jobsError) {
          console.log("Error fetching jobs:", jobsError);
        }

        setIsNewUser(appliedCount === 0 && shortlistedCount === 0);

        setStats({
          matchingJobs: matchingCount,
          appliedJobs: appliedCount,
          shortlistedJobs: shortlistedCount,
          pendingJob: pendingJob,
          rejectedJob: rejectedCount,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleResumeBuilder = () => {
    navigate("/resume-builder");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const calculateProfileCompletion = (data) => {
    if (!data) return 0;

    const fieldsToCheck = [
      "firstName",
      "lastName",
      "userProfilePic",
      "userMobile",
      "userEmail",
      "institutionName",
      "institutionType",
      "board",
      "website",
      "address",
      "city",
      "state",
      "pincode",
    ];

    let completedFields = 0;

    fieldsToCheck.forEach((field) => {
      if (data[field] && data[field].toString().trim() !== "") {
        completedFields++;
      }
    });

    return Math.round((completedFields / fieldsToCheck.length) * 100);
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading your dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        <h5>Oops! Something went wrong</h5>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!employerData) {
    return (
      <div className="alert alert-warning m-4">
        <h5>Profile Not Found</h5>
        <p>We couldn't find your profile data. Please try logging in again.</p>
        <button className="btn btn-primary me-2" onClick={() => navigate("/login")}>
          Login Again
        </button>
      </div>
    );
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main className="jobplugin__main" style={{ paddingTop: '120px' }}>
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              {/* Settings Nav Opener */}
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

              <div className="jobplugin__settings-content">
                <div className="jobplugin__dashboard">
                  {/* Profile Block */}
                  <div className="jobplugin__profile">
                    <div className="jobplugin__profile-intro border border-dark shadow" style={{ borderWidth: "2px" }}>
                      <div
                        className="jobplugin__profile-intro__left"
                        style={{
                          display: "flex",
                          gap: "24px",
                          alignItems: "center"
                        }}
                      >
                        <div
                          className="jobplugin__profile-intro__image"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            width: "150px",
                            height: "150px",
                            flexShrink: 0,
                          }}
                        >
                          {/* Profile Avatar */}
                          <div
                            className="jobplugin__profile-intro__avatar"
                            style={{
                              width: "140px",
                              height: "140px",
                              borderRadius: "50%",
                              border: "4px solid #ffc107",
                              overflow: "hidden",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#f8f9fa",
                            }}
                          >
                            <img
                              src={employerData.userProfilePic || "images/img-profile.jpg"}
                              alt={`${employerData.firstName} ${employerData.lastName}`}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>

                          {/* Edit Icon Button */}
                          <Link
                            to={`/employee/edit/${employerData._id}`}
                            style={{
                              position: "absolute",
                              bottom: "5px",
                              right: "5px",
                              width: "35px",
                              height: "35px",
                              backgroundColor: "white",
                              borderRadius: "50%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "2px solid #007bff",
                              color: "#007bff",
                              textDecoration: "none",
                              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                              zIndex: 2,
                              transition: "all 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#007bff";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "white";
                              e.currentTarget.style.color = "#007bff";
                            }}
                          >
                            <FaEdit size={16} />
                          </Link>
                        </div>

                        <div className="jobplugin__profile-intro__Textbox">
                          <div className="jobplugin__profile-intro__info mb-0">
                            <h1 className="h5">
                              {employerData.userName} {employerData.lastName}
                            </h1>
                            <span className="jobplugin__article-toprated">{isNewUser ? "New Member" : "Verified Employee"}</span>
                          </div>
                          <address className="jobplugin__profile-intro__address">{employerData.city || "Location not specified"}</address>
                        </div>
                      </div>

                      {/* Buttons for Resume Builder and Logout */}
                      <div className="jobplugin__profile-buttons" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <button onClick={handleResumeBuilder} className="jobplugin__button border-dark shadow bg-success hover:jobplugin__bg-success-dark small">
                          <FaFileAlt /> &nbsp; Resume Builder
                        </button>
                        <button onClick={handleLogout} className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small">
                          <FaPowerOff /> &nbsp; Logout
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Dashboard Cards Grid */}
                  <div className="jobplugin__dashboard-block mt-4">
                    <div className="row g-4 mb-4">
                      {/* Profile Completion Card */}
                      <div className="col-md-6 mb-4 d-flex">
                        <div className="profile-completion-card d-flex flex-column w-100">
                          <div className="profile-completion-header">
                            <h3 className="profile-completion-title"><FaCheckSquare style={{ color: '#7c3aed' }} /> Profile Completion</h3>
                            <FaEllipsisH style={{ color: '#9ca3af', cursor: 'pointer' }} />
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ padding: '0px' }}>
                            <div className="position-relative mb-2" style={{ width: '80px', height: '80px' }}>
                              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                                <defs>
                                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                  </linearGradient>
                                </defs>
                                <path
                                  className="circle-bg"
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#f3f4f6"
                                  strokeWidth="3"
                                />
                                <path
                                  className="circle"
                                  strokeDasharray={`${calculateProfileCompletion(employerData)}, 100`}
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="url(#gradient)"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <div className="position-absolute top-50 start-50 translate-middle text-center">
                                <h2 className="mb-0 fw-bold" style={{ color: '#7c3aed', fontSize: '1.4rem', lineHeight: '1', letterSpacing: '-1px', fontFamily: "'Outfit', 'Poppins', 'Inter', sans-serif" }}>
                                  {calculateProfileCompletion(employerData)}<span style={{ fontSize: '0.8rem', marginLeft: '2px', letterSpacing: '0' }}>%</span>
                                </h2>
                                <span className="text-muted" style={{ fontSize: '0.65rem' }}>Completed</span>
                              </div>
                            </div>
                            <p className="text-center text-muted mb-4" style={{ fontSize: '0.9rem' }}>Complete your profile to get better matches</p>
                          </div>
                          <div className="mt-auto">
                            <Link to={`/employee/edit/${employerData?._id}`} className="dash-btn-outline">
                              Complete Your Profile <FaChevronRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Your Plan Card */}
                      <div className="col-lg-3 col-md-6 mb-4 d-flex">
                        <div className="plan-details-card d-flex flex-column w-100">
                          <div className="plan-details-header d-flex justify-content-between align-items-center mb-4">
                            <div className="d-flex align-items-center">
                              <FaCrown style={{ color: '#f59e0b', fontSize: '18px', marginRight: '8px' }} />
                              <h3 className="plan-details-title m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>Your Plan</h3>
                            </div>
                            <FaEllipsisH style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }} />
                          </div>
                          <div className="d-flex flex-column align-items-center justify-content-center mb-4 w-100">
                            <img src={planIcon} alt="Plan Icon" className="img-fluid mb-2" style={{ height: '90px' }} />
                            <span className="dash-badge dash-badge-premium d-inline-flex align-items-center justify-content-center px-3 py-1 fw-bold mt-2" style={{ backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '4px', fontSize: '11px' }}>
                              PREMIUM PLAN
                            </span>
                          </div>
                          <div className="d-flex justify-content-center w-100 mb-3">
                            <ul className="plan-details-list list-unstyled" style={{ fontSize: '13px', margin: '0' }}>
                              <li className="d-flex align-items-center mb-2"><FiCreditCard size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Amount:</span> <strong className="text-dark">₹499</strong></li>
                              <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Validity:</span> <strong className="text-dark">1 Month</strong></li>
                              <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Valid from:</span> <strong className="text-dark">28 Jun 2026</strong></li>
                              <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Valid till:</span> <strong className="text-dark">12 Aug 2026</strong></li>
                            </ul>
                          </div>
                          <div className="remaining-days-box d-flex align-items-center justify-content-center p-2 mb-3" style={{ backgroundColor: '#fffbeb', borderRadius: '6px', color: '#b45309', fontSize: '12px', fontWeight: 'bold' }}>
                            <FiCalendar style={{ marginRight: '6px' }} /> Remaining Days: 40 days
                          </div>
                          <div className="mt-auto w-100">
                            <button className="dash-btn-primary w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#6d28d9', border: 'none', borderRadius: '8px', padding: '12px 0', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
                              <FaCrown style={{ marginRight: '8px' }} /> Upgrade Now
                            </button>
                          </div>     </div>
                      </div>

                      {/* Active Plan Benefits Card */}
                      <div className="col-lg-6 col-md-12 mb-4 d-flex">
                        <div className="active-plan-card d-flex flex-column w-100">
                          <div className="active-plan-header mb-2">
                            <h3 className="active-plan-title"><FaGem style={{ color: '#8b5cf6' }} /> Active Plan Benefits</h3>
                            <span className="dash-badge dash-badge-active">Active</span>
                          </div>

                          <div className="active-plan-benefits-grid mt-2 flex-grow-1">
                            <div className="row g-3">
                              {/* Daily Profile View Limit */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FiEye size={16} color="#22c55e" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Profile Views</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>3</span>
                                      <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Interest Requests Daily */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FaCalendarAlt size={16} color="#ef4444" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Interests</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>0</span>
                                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of 1</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                                      <div className="progress-bar" style={{ width: '0%', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Contact Details Daily */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FaCalendarAlt size={16} color="#8b5cf6" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Contacts</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>0</span>
                                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of 1</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                                      <div className="progress-bar" style={{ width: '0%', backgroundColor: '#8b5cf6', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Total Profile Views */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FiEye size={16} color="#3b82f6" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Profile Views</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>8</span>
                                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of 50</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                                      <div className="progress-bar" style={{ width: '16%', backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Interest Requests Total */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FiHeart size={16} color="#ef4444" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Interests</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>0</span>
                                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of 5</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                                      <div className="progress-bar" style={{ width: '0%', backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Contact Details Total */}
                              <div className="col-xl-4 col-6">
                                <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                                  <div className="d-flex align-items-center mb-3">
                                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                                      <FiPhone size={16} color="#8b5cf6" />
                                    </div>
                                    <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Contacts</span>
                                  </div>
                                  <div className="mt-auto">
                                    <div className="d-flex justify-content-between align-items-end mb-2">
                                      <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>0</span>
                                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of 5</span>
                                    </div>
                                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                                      <div className="progress-bar" style={{ width: '0%', backgroundColor: '#8b5cf6', borderRadius: '2px' }}></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="active-plan-bottom mt-4">
                            <div className="p-3" style={{ backgroundColor: '#faf5ff', borderRadius: '8px', border: '1px solid #f3e8ff' }}>
                              <div className="row g-2" style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>
                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Profile view (Total): <strong className="text-dark">8</strong></span></div>
                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Send interest (Total): <strong className="text-dark">8</strong></span></div>
                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Contact View (Total): <strong className="text-dark">8</strong></span></div>

                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Profile view (Today): <strong className="text-dark">3</strong></span></div>
                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Send interest (Daily): <strong className="text-dark">1</strong></span></div>
                                <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Contact View (Daily): <strong className="text-dark">1</strong></span></div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center text-muted small mt-3" style={{ fontSize: '12px' }}>
                            <div className="d-flex align-items-center">
                              <FaCalendarAlt size={13} style={{ color: '#9ca3af', marginRight: '6px', marginBottom: '2px' }} />
                              <span>Valid till: <strong className="text-dark">12 Aug 2026, 3:52:53 pm</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default UserDashboard;
