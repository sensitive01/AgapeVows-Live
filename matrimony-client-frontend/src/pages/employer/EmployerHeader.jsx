import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  MessageSquare,
  Star,
  Calendar,
  HelpCircle,
  Maximize2,
  Bell,
  Plus,
  LayoutDashboard,
  Users,
  Briefcase,
  Menu,
  X,
  Grid,
} from "lucide-react";
import user19 from "../../../public/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const EmployerHeader = () => {
  const [candidatesDropdown, setCandidatesDropdown] = useState(false);
  const [jobsDropdown, setJobsDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const fetchEmployerProfile = async () => {
      try {
        const token = localStorage.getItem("employerToken");
        const employerData = JSON.parse(localStorage.getItem("employerData"));

        if (!token || !employerData) {
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
          throw new Error("Failed to fetch employer details");
        }

        const data = await response.json();
        setProfilePic(data.userProfilePic);
      } catch (err) {
        console.error("Error fetching employer profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployerProfile();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear all employer-related data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("employerToken");
    localStorage.removeItem("employerData");

    // Close any open dropdowns/menus
    setProfileDropdown(false);
    setMobileMenuOpen(false);

    // Navigate to login page
    navigate("/employer/login");
  };

  const candidatesOptions = [
    { name: "Search Candidates", path: "/employer/search" },
    { name: "Saved Candidates", path: "/employer/saved-candidates" },
  ];

  const jobsOptions = [
    // { name: 'Post Jobs', path: '/employer/post-jobs' },
    { name: "List Jobs", path: "/employer/post-jobs" },
    { name: "Applied Candidates", path: "/employer/applied-candidates " },
    {
      name: "Shortlisted Candidates",
      path: "/employer/shortlisted-candidates",
    },
  ];

  const notifications = [
    {
      id: 1,
      avatar: "assets/img/profiles/avatar-27.jpg",
      name: "Shawn",
      message: "performance in Math is below the threshold.",
      time: "Just Now",
    },
    {
      id: 2,
      avatar: "assets/img/profiles/avatar-23.jpg",
      name: "Sylvia",
      message: "added appointment on 02:00 PM",
      time: "10 mins ago",
      hasActions: true,
    },
    {
      id: 3,
      avatar: "assets/img/profiles/avatar-25.jpg",
      name: "George",
      message: "New student record is created by Teressa",
      time: "2 hrs ago",
    },
    {
      id: 4,
      avatar: "assets/img/profiles/avatar-01.jpg",
      name: "Elisa",
      message: "A new teacher record",
      time: "09:45 AM",
    },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setCandidatesDropdown(false);
    setJobsDropdown(false);
  };

  return (
    <>
      <header
        className="bg-secondary border-bottom px-4 py-2 fixed-top"
        style={{
          borderColor: "#e5e7eb",
        }}
      >
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <div className="d-flex align-items-center me-4">
              <Link
                to="/employer/new-candidate"
                className="d-flex align-items-center justify-content-center me-3 rounded"
                style={{
                  width: "100px",
                }}
              >
                <img src={user19} alt="Logo" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="d-none d-lg-flex align-items-center">
            <div className="d-flex align-items-center">
              <Link
                to="/employer/dashboard"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-2 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-layout-grid-remove text-primary me-1"></i>
                <span className="text-white">Dashboard</span>
              </Link>
              <div className="position-relative me-1">
                <div
                  className="d-flex align-items-center fw-medium px-3 py-2 rounded dropdown nav-link-hover"
                  onClick={() => {
                    setCandidatesDropdown(!candidatesDropdown);
                    setJobsDropdown(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className="ti ti-user-circle text-primary me-1"></i>
                  <span className="text-white">Candidates</span>
                  <ChevronDown className="ms-1" size={16} />
                </div>

                {candidatesDropdown && (
                  <div
                    className="position-absolute bg-white border rounded shadow-sm"
                    style={{
                      top: "100%",
                      left: "0",
                      minWidth: "180px",
                      zIndex: 1000,
                      marginTop: "4px",
                    }}
                  >
                    {candidatesOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.path}
                        className="px-3 py-2 dropdown-item text-decoration-none"
                        style={{
                          cursor: "pointer",
                          color: "#374151",
                          display: "block",
                          borderBottom:
                            index < candidatesOptions.length - 1
                              ? "1px solid #f1f5f9"
                              : "none",
                        }}
                        onClick={() => {
                          setCandidatesDropdown(false);
                        }}
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="position-relative me-1">
                <div
                  className="d-flex align-items-center fw-medium px-3 py-2 rounded dropdown nav-link-hover"
                  onClick={() => {
                    setJobsDropdown(!jobsDropdown);
                    setCandidatesDropdown(false);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <i className="ti ti-smart-home text-primary me-1"></i>
                  <span className="text-white">Jobs</span>
                  <ChevronDown className="me-2" size={16} />
                </div>
                {jobsDropdown && (
                  <div
                    className="position-absolute bg-white border rounded shadow-sm"
                    style={{
                      top: "100%",
                      left: "0",
                      minWidth: "180px",
                      zIndex: "1000",
                      marginTop: "4px",
                    }}
                  >
                    {jobsOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.path}
                        className="px-3 py-2 dropdown-item text-decoration-none"
                        style={{
                          cursor: "pointer",
                          color: "#374151",
                          display: "block",
                          borderBottom:
                            index < jobsOptions.length - 1
                              ? "1px solid #f1f5f9"
                              : "none",
                        }}
                        onClick={() => {
                          setJobsDropdown(false);
                        }}
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                to="/employer/messages"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-1 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-brand-hipchat text-primary me-1"></i>
                <span className="text-white">Messages</span>
              </Link>
              <Link
                to="/employer/plans-grid"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-1 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-star text-primary me-1"></i>
                <span className="text-white">Upgrade Plan</span>
              </Link>
              {/* <Link
                to="/employer/events"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-1 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-home text-primary me-1"></i>
                <span className="text-dark">Events</span>
              </Link> */}
              <Link
                to="/employer/calendar-events"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-1 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-dashboard text-primary me-1"></i>
                <span className="text-white">Reminder</span>
              </Link>
              <Link
                to="/employer/FAQs"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded me-1 menu text-decoration-none nav-link-hover"
              >
                <i className="ti ti-info-circle text-primary me-1"></i>
                <span className="text-white">FAQ</span>
              </Link>
            </div>
          </nav>

          {/* Right side items */}
          <div className="d-flex align-items-center">
            {/* Desktop Right Items */}
            <div className="d-none d-lg-flex align-items-center">
              {/* Fullscreen Button */}
              {/* <button className="btn btn-link p-2 text-secondary me-2">
                <Maximize2 size={16} />
              </button> */}

              {/* Support Button with Badge */}
              {/* <Link
                to="/employer/support"
                className="btn btn-link p-2 text-secondary me-2 position-relative text-decoration-none"
              >
                <HelpCircle size={16} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
                  style={{
                    width: "16px",
                    height: "16px",
                    fontSize: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  5
                </span>
              </Link> */}

              {/* Ads Button */}
              {/* <Link
                to="#"
                className="btn fw-medium me-2 text-decoration-none"
                style={{
                  backgroundColor: "#063970",
                  color: "white",
                  border: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                Ads
              </Link> */}
            </div>

            {/* Notification Dropdown */}
            <div className="me-2 position-relative" ref={notificationRef}>
              {/* <button
                className="btn btn-link p-2 text-secondary position-relative"
                onClick={() => {
                  setNotificationDropdown(!notificationDropdown);
                  setProfileDropdown(false);
                }}
              >
                <Bell size={16} />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
                  <span className="visually-hidden">New alerts</span>
                </span>
              </button> */}

              {notificationDropdown && (
                <div
                  className="dropdown-menu show notification-dropdown p-4 shadow"
                  style={{
                    width: "360px",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 1000,
                    display: "block",
                  }}
                >
                  <div className="d-flex align-items-center justify-content-between border-bottom p-0 pb-3 mb-3">
                    <h4 className="notification-title">Notifications (2)</h4>
                    <div className="d-flex align-items-center">
                      <a href="#" className="text-primary fs-15 me-3 lh-1">
                        Mark all as read
                      </a>
                      <div className="dropdown">
                        <a
                          href="#"
                          className="bg-white dropdown-toggle"
                          data-bs-toggle="dropdown"
                        >
                          <Calendar size={16} className="me-1" />
                          Today
                        </a>
                        <ul className="dropdown-menu mt-2 p-3">
                          <li>
                            <a href="#" className="dropdown-item rounded-1">
                              This Week
                            </a>
                          </li>
                          <li>
                            <a href="#" className="dropdown-item rounded-1">
                              Last Week
                            </a>
                          </li>
                          <li>
                            <a href="#" className="dropdown-item rounded-1">
                              Last Month
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="noti-content">
                    <div className="d-flex flex-column">
                      {notifications.map((notification, index) => (
                        <div
                          key={notification.id}
                          className={`${
                            index < notifications.length - 1
                              ? "border-bottom mb-3 pb-3"
                              : "border-0 mb-3 pb-0"
                          }`}
                        >
                          <a href="#">
                            <div className="d-flex">
                              <span className="avatar avatar-lg me-2 flex-shrink-0">
                                <img
                                  src={notification.avatar}
                                  alt="Profile"
                                  className="img-fluid rounded-circle"
                                />
                              </span>
                              <div className="flex-grow-1">
                                <p className="mb-1">
                                  <span className="text-dark fw-semibold">
                                    {notification.name}
                                  </span>{" "}
                                  {notification.message}
                                </p>
                                <span className="text-muted small">
                                  {notification.time}
                                </span>
                                {notification.hasActions && (
                                  <div className="d-flex justify-content-start align-items-center mt-1">
                                    <span className="btn btn-light btn-sm me-2">
                                      Deny
                                    </span>
                                    <span className="btn btn-primary btn-sm">
                                      Approve
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-flex p-0">
                    <a href="#" className="btn btn-light w-100 me-2">
                      Cancel
                    </a>
                    <a
                      href="/employer/notifications"
                      className="btn btn-primary w-100"
                    >
                      View All
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="dropdown position-relative " ref={profileRef}>
              <button
                className="btn btn-link p-0 border-0"
                onClick={() => {
                  setProfileDropdown(!profileDropdown);
                  setNotificationDropdown(false);
                }}
              >
                <div className="avatar avatar-md">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="avatar-initial rounded-circle"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      className="avatar-initial rounded-circle bg-white"
                      style={{ color: "black" }}
                    >
                      A
                    </span>
                  )}
                </div>
              </button>

              {profileDropdown && (
                <div
                  className="dropdown-menu show shadow p-0"
                  style={{
                    width: "280px",
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 1000,
                    display: "block",
                  }}
                >
                  <div className="card mb-0">
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <span className="avatar avatar-lg me-2">
                          {profilePic ? (
                            <img
                              src={profilePic}
                              alt="Profile"
                              className="avatar-initial rounded-circle"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <span className="avatar-initial rounded-circle bg-primary">
                              A
                            </span>
                          )}
                        </span>
                        <div>
                          <h5 className="mb-0 text-primary">EdProfio</h5>
                          <p className="fs-12 fw-medium mb-0">
                            <a href="/employer/profile">School</a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <Link
                        className="dropdown-item d-inline-flex align-items-center p-0 py-2 text-decoration-none"
                        to="/employer/profile"
                        onClick={() => setProfileDropdown(false)}
                      >
                        <span className="me-1 text-primary">↑</span>My Account
                      </Link>
                    </div>
                    <div className="card-footer py-1">
                      <button
                        className="dropdown-item d-inline-flex align-items-center p-0 py-2 text-decoration-none border-0 bg-transparent w-100 text-start"
                        onClick={handleLogout}
                      >
                        <FiLogOut className="me-2 text-primary" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="d-lg-none ms-2">
              <button
                className="btn btn-link p-2 text-secondary"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="d-lg-none mobile-menu bg-white border-top mt-2 pt-3"
            ref={mobileMenuRef}
            style={{ borderColor: "#e5e7eb" }}
          >
            {/* Mobile Navigation Links */}
            <div className="mb-3">
              {/* Candidates Section */}
              <Link
                to="/employer/dashboard"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-layout-grid-remove text-primary me-1"></i>
                <span className="text-dark">dashboard</span>
              </Link>
              <div className="mb-2">
                <div
                  className="d-flex align-items-center justify-content-between fw-medium px-3 py-2 rounded mobile-dropdown-header"
                  onClick={() => setCandidatesDropdown(!candidatesDropdown)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: candidatesDropdown
                      ? "#f8f9fa"
                      : "transparent",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="ti ti-user-circle text-primary me-1"></i>
                    <span className="text-dark">Candidates</span>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${
                      candidatesDropdown ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </div>
                {candidatesDropdown && (
                  <div className="mobile-dropdown-content bg-light rounded mx-3 mt-2">
                    {candidatesOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.path}
                        className="d-block px-3 py-2 text-decoration-none mobile-dropdown-item"
                        style={{ color: "#374151" }}
                        onClick={closeMobileMenu}
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Jobs Section */}
              <div className="mb-2">
                <div
                  className="d-flex align-items-center justify-content-between fw-medium px-3 py-2 rounded mobile-dropdown-header"
                  onClick={() => setJobsDropdown(!jobsDropdown)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: jobsDropdown ? "#f8f9fa" : "transparent",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="ti ti-smart-home text-primary me-1"></i>
                    <span className="text-dark">Jobs</span>
                  </div>
                  <ChevronDown
                    className={`transition-transform ${
                      jobsDropdown ? "rotate-180" : ""
                    }`}
                    size={16}
                  />
                </div>
                {jobsDropdown && (
                  <div className="mobile-dropdown-content bg-light rounded mx-3 mt-2">
                    {jobsOptions.map((option, index) => (
                      <Link
                        key={index}
                        to={option.path}
                        className="d-block px-3 py-2 text-decoration-none mobile-dropdown-item"
                        style={{ color: "#374151" }}
                        onClick={closeMobileMenu}
                      >
                        {option.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Regular Menu Items */}
              <Link
                to="/employer/messages"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-brand-hipchat text-primary me-1"></i>
                <span className="text-dark">Messages</span>
              </Link>
              <Link
                to="/employer/plans-grid"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-star text-primary me-1"></i>
                <span className="text-dark">Upgrade Plan</span>
              </Link>
              <Link
                to="/employer/events"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-home text-primary me-1"></i>
                <span className="text-dark">Events</span>
              </Link>
              <Link
                to="/employer/calendar-events"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-dashboard text-primary me-1"></i>
                <span className="text-dark">Reminder</span>
              </Link>
              <Link
                to="/employer/FAQs"
                className="d-flex align-items-center fw-medium px-3 py-2 rounded mb-2 menu text-decoration-none mobile-menu-item"
                onClick={closeMobileMenu}
              >
                <i className="ti ti-info-circle text-primary me-1"></i>
                <span className="text-dark">FAQ</span>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div
              className="border-top pt-3 mt-3"
              style={{ borderColor: "#e5e7eb" }}
            >
              <div className="d-flex flex-wrap gap-2 px-3">
                <Link
                  to="/employer/support"
                  className="btn btn-outline-secondary btn-sm d-flex align-items-center text-decoration-none"
                  onClick={closeMobileMenu}
                >
                  <HelpCircle className="me-1" size={14} />
                  Support (5)
                </Link>
                <Link
                  to="/employer/ads"
                  className="btn btn-sm text-decoration-none flex-grow-1"
                  style={{
                    backgroundColor: "#063970",
                    color: "white",
                    border: "none",
                  }}
                  onClick={closeMobileMenu}
                >
                  Ads
                </Link>
              </div>
              <div className="mt-3 px-3">
                <button
                  className="btn btn-outline-danger btn-sm w-100 d-flex align-items-center justify-content-center"
                  onClick={handleLogout}
                >
                  <FiLogOut className="me-1" size={14} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>
          {`
            /* Updated hover styles for navigation links */
            .nav-link-hover:hover {
              background-color: #f8f9fa !important;
            }

            .nav-link-hover:hover span {
              color: #000 !important;
            }

            .dropdown:hover {
              background-color: #f8f9fa !important;
            }

            .dropdown:hover span {
              color: #000 !important;
            }

            .text-secondary:hover {
              color: #374151 !important;
            }

            .menu:hover {
              color: #f9ab00 !important;
            }

            .btn-link:hover {
              background-color: #f8f9fa !important;
            }

            .dropdown-item:hover {
              background-color: #f8f9fa !important;
              color: #f97316 !important;
            }

            .notification-dropdown {
              background-color: white;
              border: 1px solid #dee2e6;
              border-radius: 0.375rem;
            }

            .avatar {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: 600;
            }

            .avatar-sm {
              width: 32px;
              height: 32px;
              font-size: 0.875rem;
            }

            /* Updated profile avatar size */
            .avatar-md {
              width: 44px;
              height: 44px;
              font-size: 1rem;
            }

            .avatar-lg {
              width: 48px;
              height: 48px;
              font-size: 1.25rem;
            }

            .avatar-initial {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
            }

            .bg-primary {
              background-color: #f9ab00 !important;
            }

            /* Mobile Menu Styles */
            .mobile-menu {
              animation: slideDown 0.3s ease-out;
            }

            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .mobile-dropdown-header:hover {
              background-color: #f8f9fa !important;
            }

            .mobile-dropdown-item:hover {
              background-color: #f8f9fa !important;
              color: #f97316 !important;
            }

            .mobile-menu-item:hover {
              background-color: #f8f9fa !important;
            }

            .transition-transform {
              transition: transform 0.2s ease;
            }

            .rotate-180 {
              transform: rotate(180deg);
            }

            /* Responsive Notification Dropdown */
            @media (max-width: 575px) {
              .notification-dropdown {
                width: 300px !important;
                right: -100px !important;
              }
            }

            @media (max-width: 480px) {
              .notification-dropdown {
                width: 280px !important;
                right: -120px !important;
              }
            }

            /* Responsive Profile Dropdown */
            @media (max-width: 575px) {
              .dropdown-menu.show {
                width: 250px !important;
                right: -50px !important;
              }
            }

            @media (max-width: 480px) {
              .dropdown-menu.show {
                width: 220px !important;
                right: -70px !important;
              }
            }

            body {
              padding-top: 70px;
            }
          `}
        </style>
      </header>
    </>
  );
};

export default EmployerHeader;
