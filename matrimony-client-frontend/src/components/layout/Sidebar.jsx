import React, { useState, useEffect } from "react";

const Sidebar = ({ isOpen, onClose }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <div
      className={`sidebar-container ${isMobile ? "mobile" : ""} ${
        isOpen ? "open" : ""
      }`}
    >
      <style jsx>{`
        /* Base Styles */
        .sidebar-container {
          width: 280px;
          height: 100vh;
          background: #ffffff;
          box-shadow: 2px 0 15px rgba(0, 0, 0, 0.08);
          left: 0;
          top: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          padding: 0;
          overflow-y: auto;
        }

        /* Mobile Styles */
        .sidebar-container.mobile {
          position: fixed;
          transform: translateX(-100%);
        }

        .sidebar-container.mobile.open {
          transform: translateX(0);
        }

        .close-button {
          position: absolute;
          right: 15px;
          top: 15px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          transition: background-color 0.2s;
        }

        .close-button:hover {
          background-color: #f5f5f5;
        }

        .close-line {
          display: block;
          width: 20px;
          height: 2px;
          background-color: #0066cc;
          margin: 2px 0;
          transition: all 0.3s;
        }

        .close-line:first-child {
          transform: rotate(45deg) translate(3px, 3px);
        }

        .close-line:last-child {
          transform: rotate(-45deg) translate(3px, -3px);
        }

        /* Menu Container */
        .menu-container {
          padding: 20px 0;
          margin-top: ${isMobile ? "40px" : "0"};
        }

        .menu-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        /* Main Menu Item */
        .menu-item {
          border-bottom: 1px solid #f0f0f0;
        }

        .menu-link {
          display: flex;
          align-items: center;
          padding: 16px 24px;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
        }

        .menu-link:hover {
          background-color: #f8f9ff;
          color: #0066cc;
          padding-left: 28px;
        }

        .menu-link.active {
          background-color: #e6f2ff;
          color: #0066cc;
          border-right: 3px solid #0066cc;
        }

        .menu-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          color: #666;
          transition: color 0.3s;
          flex-shrink: 0;
        }

        .menu-link:hover .menu-icon,
        .menu-link.active .menu-icon {
          color: #0066cc;
        }

        .menu-text {
          flex: 1;
        }

        .submenu-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
          color: #666;
        }

        .submenu-arrow.open {
          transform: rotate(180deg);
          color: #0066cc;
        }

        /* Submenu Styles */
        .submenu {
          background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
          border-left: 3px solid #e6f2ff;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .submenu.open {
          max-height: 400px;
        }

        .submenu.closed {
          max-height: 0;
        }

        .submenu-list {
          list-style: none;
          padding: 8px 0;
          margin: 0;
        }

        .submenu-item {
          position: relative;
        }

        .submenu-item::before {
          content: "";
          position: absolute;
          left: 40px;
          top: 50%;
          width: 4px;
          height: 4px;
          background: #ccc;
          border-radius: 50%;
          transform: translateY(-50%);
        }

        .submenu-link {
          display: flex;
          align-items: center;
          padding: 12px 24px 12px 56px;
          color: #555;
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .submenu-link:hover {
          background-color: rgba(0, 102, 204, 0.08);
          color: #0066cc;
          padding-left: 60px;
        }

        .submenu-link:hover::before {
          content: "";
          position: absolute;
          left: 24px;
          top: 50%;
          width: 2px;
          height: 20px;
          background: #0066cc;
          transform: translateY(-50%);
        }

        .submenu-icon {
          width: 16px;
          height: 16px;
          margin-right: 10px;
          color: #666;
          transition: color 0.3s;
        }

        .submenu-link:hover .submenu-icon {
          color: #0066cc;
        }

        /* Scrollbar Styling */
        .sidebar-container::-webkit-scrollbar {
          width: 6px;
        }

        .sidebar-container::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .sidebar-container::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .sidebar-container::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>

      {isMobile && (
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Close menu"
        >
          <span className="close-line"></span>
          <span className="close-line"></span>
        </button>
      )}

      <div className="menu-container">
        <ul className="menu-list">
          <li className="menu-item">
            <a className="menu-link" href="/dashboard">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              <span className="menu-text">Dashboard</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/employee-profile">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">My Profile</span>
            </a>
          </li>

          {/* <li className="menu-item">
            <a className="menu-link" href="/resume-builder">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">Resume Builder</span>
            </a>
          </li> */}

          <li className="menu-item">
            <button
              className={`menu-link ${
                openSubmenu === "my-jobs" ? "active" : ""
              }`}
              onClick={() => toggleSubmenu("my-jobs")}
            >
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm4-3a1 1 0 00-1 1v1h2V4a1 1 0 00-1-1zM4 9a1 1 0 000 2v5h12V9a1 1 0 100-2H4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">My Jobs</span>
              <svg
                className={`submenu-arrow ${
                  openSubmenu === "my-jobs" ? "open" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              className={`submenu ${
                openSubmenu === "my-jobs" ? "open" : "closed"
              }`}
            >
              <ul className="submenu-list">
                <li className="submenu-item">
                  <a className="submenu-link" href="/job-vacancies">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Search Jobs
                  </a>
                </li>
                {/* <li className="submenu-item">
                  <a className="submenu-link" href="/search">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Premium Advanced Search
                  </a>
                </li> */}
                <li className="submenu-item">
                  <a className="submenu-link" href="/job-alerts">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg>
                    Job Alerts
                  </a>
                </li>
                <li className="submenu-item">
                  <a className="submenu-link" href="/applied-jobs">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Applied Jobs
                  </a>
                </li>
                <li className="submenu-item">
                  <a className="submenu-link" href="/saved-jobs">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                    </svg>
                    Saved Jobs
                  </a>
                </li>
                <li className="submenu-item">
                  <a className="submenu-link" href="/shortlisted">
                    <svg
                      className="submenu-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Shortlisted Jobs
                  </a>
                </li>
              </ul>
            </div>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/certificates-trainings">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="menu-text">Certificates & Training</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/events">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">Events</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/refer-us">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">Refer & Earn</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/notifications">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">Notifications</span>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-link" href="/support">
              <svg
                className="menu-icon"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="menu-text">Inbox</span>
            </a>
          </li>

          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
