import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  useEffect(() => {
    // Automatically expand the "Users" menu if any sub-route related to users is active
    const usersRoutes = [
      "/admin/new-user-requests",
      "/admin/all-user-list",
      "/admin/paid-user-list",
      "/admin/add-new-user",
      "/admin/deleted-users",
      "/admin/issues",
      "/admin/billing-info/",
      "/admin/new-user/"
    ];
    if (usersRoutes.some(route => location.pathname.startsWith(route))) {
      setExpandedMenus(prev => ({ ...prev, users: true }));
    }
  }, [location.pathname]);

  const toggleSubmenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const isActive = (path) => location.pathname === path;

  // Inline styles for high visual impact and clarity
  const iconStyle = {
    marginRight: "10px",
    fontSize: "18px",
  };

  const linkBaseStyle = {
    display: "block",
    padding: "10px 15px",
    borderRadius: "8px",
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    marginBottom: "4px",
    fontSize: "14px"
  };

  const activeLinkStyle = {
    ...linkBaseStyle,
    backgroundColor: "#e8f0fe", // Light blue background
    color: "#1a73e8", // Google-style blue
    fontWeight: "600",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
  };

  const normalLinkStyle = {
    ...linkBaseStyle,
    color: "#5f6368", // Neutral gray
  };

  return (
    <div className="pan-lhs ad-menu-main">
      <div className="ad-menu" style={{ padding: "15px" }}>
        <ul className="list-unstyled">
          <li>
            <Link 
              to="/admin/dashboard" 
              style={isActive("/admin/dashboard") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>🏠</span> Dashboard
            </Link>
          </li>

          {/* USERS GROUP */}
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                toggleSubmenu("users");
              }}
              style={{
                ...normalLinkStyle,
                color: expandedMenus.users ? "#1a73e8" : "#5f6368",
                fontWeight: expandedMenus.users ? "600" : "normal"
              }}
            >
              <span style={iconStyle}>👤</span> Users
              <i 
                className="fa fa-angle-right float-end" 
                style={{ 
                  marginTop: "4px",
                  transition: "transform 0.3s ease",
                  transform: expandedMenus.users ? "rotate(90deg)" : "rotate(0deg)"
                }}
              ></i>
            </a>

            <div 
              style={{ 
                display: expandedMenus.users ? "block" : "none", 
                marginLeft: "20px", 
                borderLeft: "2px solid #e8eaed",
                marginTop: "2px",
                marginBottom: "10px"
              }}
            >
              <ul className="list-unstyled" style={{ paddingLeft: "10px" }}>
                <li>
                  <Link 
                    to="/admin/new-user-requests" 
                    style={isActive("/admin/new-user-requests") ? activeLinkStyle : normalLinkStyle}
                  >
                    New User Requests
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/all-user-list" 
                    style={isActive("/admin/all-user-list") ? activeLinkStyle : normalLinkStyle}
                  >
                    All Users
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/paid-user-list" 
                    style={isActive("/admin/paid-user-list") ? activeLinkStyle : normalLinkStyle}
                  >
                    Paid Users
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/add-new-user" 
                    style={isActive("/admin/add-new-user") ? activeLinkStyle : normalLinkStyle}
                  >
                    Add new User
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/deleted-users" 
                    style={isActive("/admin/deleted-users") ? activeLinkStyle : normalLinkStyle}
                  >
                    Deleted Users
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/issues" 
                    style={isActive("/admin/issues") ? activeLinkStyle : normalLinkStyle}
                  >
                    Issues
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* PRICING */}
          <li>
            <Link 
              to="/admin/pricing-plans-list" 
              style={isActive("/admin/pricing-plans-list") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>💳</span> Pricing Plans
            </Link>
          </li>

          {/* EVENTS */}
          <li>
            <Link 
              to="/admin/events" 
              style={isActive("/admin/events") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>📅</span> Events
            </Link>
          </li>

          {/* BLOGS */}
          <li>
            <Link 
              to="/admin/blogs" 
              style={isActive("/admin/blogs") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>📝</span> Blogs
            </Link>
          </li>

          {/* ENQUIRIES */}
          <li>
            <Link 
              to="/admin/enquiries" 
              style={isActive("/admin/enquiries") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>✉️</span> Enquiries
            </Link>
          </li>

          {/* FEEDBACKS */}
          <li>
            <Link 
              to="/admin/feedbacks" 
              style={isActive("/admin/feedbacks") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>💬</span> Feedbacks
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .ad-menu a:hover {
          background-color: #f1f3f4;
          color: #1a73e8;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;