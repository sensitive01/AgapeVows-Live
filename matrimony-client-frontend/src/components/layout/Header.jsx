import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaSearch,
  FaHandshake,
  FaCalendarAlt,
  FaStar,
  FaQuestionCircle,
  FaUserCircle,
  FaSignOutAlt,
  FaTimes,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import logo from "../../assets/images/agapevows - logo.webp";
import { useLoginCleanup } from "../../hooks/useLoginCleanup";
import { FaSquarePen } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { getHeaderStaticsData } from "../../api/services/projectServices";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [showJobsMenu, setShowJobsMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("employerTypes");
  const [categoryCounts, setCategoryCounts] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const jobsMenuRef = useRef(null);

  // Use the login cleanup hook
  useLoginCleanup();

  const employerTypes = [
    { name: "Schools", icon: <FaSchool />, count: "15420 Jobs" },
    {
      name: "Coaching Institute",
      icon: <FaChalkboardTeacher />,
      count: "8750 Jobs",
    },
    { name: "Pre-Schools", icon: <FaChild />, count: "5280 Jobs" },
    { name: "EdTech Companies", icon: <FaLaptop />, count: "3640 Jobs" },
    {
      name: "College / Universities",
      icon: <FaUniversity />,
      count: "12890 Jobs",
    },
    { name: "Training Centers", icon: <FaBook />, count: "4320 Jobs" },
  ];

  const jobCategories = [
    {
      name: "Teaching Jobs",
      icon: <FaChalkboardTeacher />,
    },
    {
      name: "Leadership and Administration",
      icon: <FaUniversity />,
    },
    {
      name: "Support and Student Welfare",
      icon: <FaChild />,
    },
    {
      name: "Extracurricular Activities",
      icon: <FaBook />,
    },
    {
      name: "Curriculum and Content Development",
      icon: <FaSchool />,
    },
    {
      name: "EdTech and Digital Learning",
      icon: <FaLaptop />,
    },
    {
      name: "Special Education and Inclusive Learning",
      icon: <FaChalkboardTeacher />,
    },
    { name: "Non-Teaching Staffs", icon: <FaUsers /> },
    {
      name: "Training and Development",
      icon: <FaSquarePen />,
    },
    {
      name: "Research and Policy Development",
      icon: <IoDocumentText />,
    },
    {
      name: "Other Specialized Roles",
      icon: <FaSuitcase />,
    },
  ];

  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
    "Kolkata",
    "Ahmedabad",
  ];

  const designations = [
    "Principal",
    "Vice Principal",
    "Subject Teacher",
    "Assistant Teacher",
    "Academic Coordinator",
    "Lab Assistant",
    "Librarian",
    "Counselor",
  ];

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        // Check for userProfilePic or profileImage
        const profilePic =
          parsedUserData.userProfilePic || parsedUserData.profileImage;
        setUserProfilePic(profilePic);
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    }
  }, [location]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close jobs menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobsMenuRef.current && !jobsMenuRef.current.contains(event.target)) {
        setShowJobsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch category counts from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHeaderStaticsData();
        if (response.status === 200) {
          // Convert array to object for easy lookup
          const countsMap = {};
          response.data.data.forEach((item) => {
            countsMap[item.category] = item.count;
          });
          setCategoryCounts(countsMap);
        }
      } catch (error) {
        console.error("Error fetching header statistics:", error);
      }
    };
    fetchData();
  }, []);

  // Helper function to get count for a category
  const getCategoryCount = (categoryName) => {
    const count = categoryCounts[categoryName] || 0;
    return `${count} Job${count !== 1 ? "s" : ""}`;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfileClick = () => {
    navigate("/user/user-dashboard-page");
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    navigate("/user/user-login");
  };

  const handleLogin = () => {
    navigate("/user/user-login");
    setIsMenuOpen(false);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleAccountClick = () => {
    if (isLoggedIn) {
      handleProfileClick();
    } else {
      handleLogin();
    }
  };

  const isServicesActive = () => {
    const servicePaths = [
      "/personalized-matrimony",
      "/nri-matrimony",
      "/church-partner",
      "/matrimonial-advisor",
      "/marital-counseling",
      "/bridal-makeup",
      "/insurance-services",
      "/user/user-service-page"
    ];
    return servicePaths.some(path => location.pathname === path || location.pathname.includes(path));
  };

  const isHelpActive = () => {
    const helpPaths = ["/help-support", "/report-issue"];
    return helpPaths.some(path => location.pathname === path || location.pathname.includes(path));
  };

  const isActive = (path) => location.pathname === path;
  const activeStyle = { color: "#ffa500", fontWeight: "bold" };
  const normalStyle = {};

  const ProfilePicture = ({ size = "24px", className = "" }) => {
    if (userProfilePic) {
      return (
        <img
          src={userProfilePic}
          alt="Profile"
          className={className}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #fff",
          }}
          onError={(e) => {
            // Fallback to avatar if image fails to load
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "inline-block";
          }}
        />
      );
    }

    // Default avatar when no profile picture
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          backgroundColor: "#ffa500",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: parseInt(size) * 0.6 + "px",
          fontWeight: "bold",
          border: "2px solid #fff",
        }}
      >
        {/* You can use initials or a default icon */}
        <FaUserCircle style={{ fontSize: parseInt(size) * 0.8 + "px" }} />
      </div>
    );
  };

  return (
    <>
      <header
        className="header header-theme-9 bg-secondary"
        style={{ padding: "8px 0px" }}
      >
        <div className="container" style={{ maxWidth: "1440px" }}>
          <strong className="logo">
            <Link to="/">
              <img
                className="normal-logo"
                src={logo}
                width="175"
                height="43"
                alt="Agape Vows"
              />
              <img
                className="sticky-logo"
                src={logo}
                width="175"
                height="43"
                alt="Agape Vows"
              />
            </Link>
          </strong>

          <div className="main-nav">
            <button
              className="nav-opener d-flex d-lg-none"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "30px",
                height: "30px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "2px",
                  backgroundColor: "#fff",
                  margin: "2px 0",
                  transition: "0.3s",
                }}
              ></span>
            </button>

            {/* Desktop Navigation */}
            <div className="nav-drop d-none d-lg-block">
              <ul className="navigation">
                <li style={{ padding: "0px 15px" }}>
                  <Link
                    to="/about-us"
                    onClick={handleLinkClick}
                    style={isActive("/about-us") ? activeStyle : normalStyle}
                  >
                    <FaInfoCircle /> &nbsp; ABOUT US
                  </Link>
                </li>

                {isLoggedIn && (
                  <li style={{ padding: "0px 15px" }}>
                    <Link
                      to="/user/find-matches"
                      onClick={handleLinkClick}
                      style={isActive("/user/find-matches") ? activeStyle : normalStyle}
                    >
                      <FaSearch
                        style={
                          isActive("/user/find-matches") ? { color: "#ffa500" } : {}
                        }
                      />{" "}
                      &nbsp;
                      <span
                        style={
                          isActive("/user/find-matches")
                            ? { color: "#ffa500", fontWeight: "bold" }
                            : {}
                        }
                      >
                        SEARCH
                      </span>
                    </Link>
                  </li>
                )}

                <li style={{ padding: "0px 15px" }} className="dropdown">
                  <Link
                    to="/user/user-service-page"
                    className="dropdown-toggle"
                    style={isServicesActive() ? activeStyle : normalStyle}
                  >
                    <FaHandshake /> &nbsp; SERVICES
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/personalized-matrimony" onClick={handleLinkClick}>Personalized Matrimony</Link></li>
                    <li><Link className="dropdown-item" to="/nri-matrimony" onClick={handleLinkClick}>NRI Matrimony</Link></li>
                    <li><Link className="dropdown-item" to="/church-partner" onClick={handleLinkClick}>Churches - Partner with Us</Link></li>
                    <li><Link className="dropdown-item" to="/matrimonial-advisor" onClick={handleLinkClick}>Become a Matrimonial Advisor</Link></li>
                    <li><Link className="dropdown-item" to="/marital-counseling" onClick={handleLinkClick}>Counseling</Link></li>
                    <li><Link className="dropdown-item" to="/bridal-makeup" onClick={handleLinkClick}>Bridal Make-up</Link></li>
                    <li><Link className="dropdown-item" to="/insurance-services" onClick={handleLinkClick}>Insurance Services</Link></li>
                  </ul>
                </li>

                <li style={{ padding: "0px 15px" }}>
                  <Link
                    to="/user/events-page"
                    onClick={handleLinkClick}
                    style={isActive("/user/events-page") ? activeStyle : normalStyle}
                  >
                    <FaCalendarAlt /> &nbsp; EVENTS
                  </Link>
                </li>

                <li style={{ padding: "0px 15px" }}>
                  <Link
                    to="/user/user-plan-selection"
                    onClick={handleLinkClick}
                    style={isActive("/user/user-plan-selection") ? activeStyle : normalStyle}
                  >
                    <FaStar /> &nbsp; PLANS
                  </Link>
                </li>

                <li style={{ padding: "0px 15px" }} className="dropdown">
                  <Link
                    to="/help-support"
                    className="dropdown-toggle"
                    style={isHelpActive() ? activeStyle : normalStyle}
                  >
                    <FaQuestionCircle /> &nbsp; HELP & SUPPORT
                  </Link>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/help-support" onClick={handleLinkClick}>Help & Support</Link></li>
                    <li><Link className="dropdown-item" to="/report-issue" onClick={handleLinkClick}>Report Your Issue</Link></li>
                  </ul>
                </li>

                <li style={{ padding: "0px 5px" }} className="text-login">
                  <button
                    onClick={handleAccountClick}
                    style={{
                      backgroundColor: "#6b21a8",
                      color: "#fff",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      gap: "6px",
                      fontSize: "16px",
                      fontFamily: "poppins, sans-serif",
                      fontWeight: "400",
                      cursor: "pointer",
                      borderRadius: "8px"
                    }}
                  >
                    {isLoggedIn ? (
                      <>
                        <ProfilePicture size="20px" />
                        My Account
                      </>
                    ) : (
                      <>
                        <i
                          className="icon icon-users"
                          style={{ fontSize: "14px", color: "#fff" }}
                        ></i>
                        Account Login
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div
          className="mobile-nav-overlay d-lg-none"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
            display: "block",
          }}
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={`mobile-nav-menu d-lg-none ${isMenuOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isMenuOpen ? 0 : "-100%",
          width: "280px",
          height: "100vh",
          backgroundColor: "#063970",
          zIndex: 1000,
          transition: "right 0.3s ease-in-out",
          overflowY: "auto",
          paddingTop: "20px",
        }}
      >
        {/* Close button */}
        <button
          onClick={toggleMenu}
          style={{
            position: "absolute",
            top: "15px",
            left: "15px",
            background: "none",
            border: "none",
            color: "#ffa500",
            fontSize: "24px",
            cursor: "pointer",
            padding: "5px",
          }}
        >
          <FaTimes />
        </button>

        {/* Mobile Navigation Items */}
        <div style={{ padding: "50px 0 20px 0" }}>
          {[
            { path: "/about-us", label: "ABOUT US", icon: <FaInfoCircle /> },

            ...(isLoggedIn
              ? [{ path: "/user/find-matches", label: "SEARCH", icon: <FaSearch /> }]
              : []),

            { path: "/user/events-page", label: "EVENTS", icon: <FaCalendarAlt /> },
            { path: "/user/user-plan-selection", label: "PLANS", icon: <FaStar /> },
          ].map((item) => (
            <div key={item.path} style={{ marginBottom: "8px" }}>
              <Link
                to={item.path}
                onClick={handleLinkClick}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: isActive(item.path) ? "#ffa500" : "#fff",
                  backgroundColor: isActive(item.path) ? "rgba(255,255,255,0.1)" : "transparent",
                  textDecoration: "none",
                  fontSize: "16px",
                  fontWeight: isActive(item.path) ? "600" : "400",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {React.cloneElement(item.icon, { style: { marginRight: "12px", fontSize: "16px" } })}
                {item.label}
              </Link>
            </div>
          ))}

          {/* Services Dropdown in Mobile */}
          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={() => toggleDropdown("services")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: isServicesActive() ? "#ffa500" : "#fff",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: isServicesActive() ? "600" : "400",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaHandshake style={{ marginRight: "12px", fontSize: "16px" }} />
                SERVICES
              </div>
              {openDropdown === "services" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === "services" && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                {[
                  { path: "/user/user-service-page", label: "All Services" },
                  { path: "/personalized-matrimony", label: "Personalized Matrimony" },
                  { path: "/nri-matrimony", label: "NRI Matrimony" },
                  { path: "/church-partner", label: "Churches - Partner" },
                ].map(sub => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={handleLinkClick}
                    style={{
                      display: "block",
                      padding: "12px 20px 12px 52px",
                      color: isActive(sub.path) ? "#ffa500" : "#fff",
                      textDecoration: "none",
                      fontSize: "14px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Help Dropdown in Mobile */}
          <div style={{ marginBottom: "8px" }}>
            <button
              onClick={() => toggleDropdown("help")}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                color: isHelpActive() ? "#ffa500" : "#fff",
                background: "none",
                border: "none",
                fontSize: "16px",
                fontWeight: isHelpActive() ? "600" : "400",
                cursor: "pointer",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <FaQuestionCircle style={{ marginRight: "12px", fontSize: "16px" }} />
                HELP & SUPPORT
              </div>
              {openDropdown === "help" ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openDropdown === "help" && (
              <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                {[
                  { path: "/help-support", label: "Help & Support" },
                  { path: "/report-issue", label: "Report Issue" },
                ].map(sub => (
                  <Link
                    key={sub.path}
                    to={sub.path}
                    onClick={handleLinkClick}
                    style={{
                      display: "block",
                      padding: "12px 20px 12px 52px",
                      color: isActive(sub.path) ? "#ffa500" : "#fff",
                      textDecoration: "none",
                      fontSize: "14px",
                      borderBottom: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div
            style={{
              padding: "20px",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              marginTop: "10px"
            }}
          >
            <button
              onClick={isLoggedIn ? handleProfileClick : handleLogin}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                backgroundColor: isActive("/user/user-login") || isActive("/user/user-dashboard-page") ? "rgba(255,255,255,0.2)" : "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                borderRadius: "25px",
              }}
            >
              {isLoggedIn ? (
                <>
                  <ProfilePicture size="24px" />
                  <span style={{ marginLeft: "8px" }}>My Account</span>
                </>
              ) : (
                <>
                  <i
                    className="icon icon-users"
                    style={{ fontSize: "16px", marginRight: "8px" }}
                  ></i>
                  Login / Register
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
