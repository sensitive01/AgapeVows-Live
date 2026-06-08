import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { getAllIssues, getAllEnquiries, getAllReports, getAdminProfile } from "../../../api/service/adminServices";

const Sidebar = () => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});
  const [newCounts, setNewCounts] = useState({ issues: 0, enquiries: 0, reports: 0 });
  const [adminRole, setAdminRole] = useState(null);
  const [adminPermissions, setAdminPermissions] = useState([]);

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      getAdminProfile(adminId)
        .then((res) => {
          if (res.data?.success) {
            setAdminRole(res.data.data.role || "superadmin");
            setAdminPermissions(res.data.data.permissions || []);
          }
        })
        .catch((err) => console.error("Error fetching admin profile:", err));
    }
  }, []);

  const hasPermission = (key) => {
    if (adminRole === "superadmin") return true;
    return adminPermissions.includes(key);
  };

  useEffect(() => {
    // Automatically expand the "Users" menu if any sub-route related to users is active
    const usersRoutes = [
      "/admin/new-user-requests",
      "/admin/all-user-list",
      "/admin/paid-user-list",
      "/admin/add-new-user",
      "/admin/deleted-users",
      "/admin/billing-info/",
      "/admin/id-verification-requests",
      "/admin/verified-id-users",
      "/admin/contact-update-requests",
      "/admin/deactivated-users"
    ];
    if (usersRoutes.some(route => location.pathname.startsWith(route))) {
      setExpandedMenus(prev => ({ ...prev, users: true }));
    }

    const fetchCountsAndMarkRead = async () => {
      try {
        if (location.pathname === "/admin/issues") {
          localStorage.setItem("lastViewedIssues", new Date().toISOString());
        } else if (location.pathname === "/admin/enquiries") {
          localStorage.setItem("lastViewedEnquiries", new Date().toISOString());
        } else if (location.pathname === "/admin/reports") {
          localStorage.setItem("lastViewedReports", new Date().toISOString());
        }

        const [issuesRes, enqRes, repRes] = await Promise.all([
          getAllIssues().catch(() => ({ data: { data: [] } })),
          getAllEnquiries().catch(() => ({ data: { data: [] } })),
          getAllReports().catch(() => ({ data: { data: [] } }))
        ]);

        const issues = issuesRes?.data?.data || [];
        const enquiries = enqRes?.data?.data || [];
        const reports = repRes?.data?.data || [];

        const lastViewedIssues = new Date(localStorage.getItem("lastViewedIssues") || 0);
        const lastViewedEnquiries = new Date(localStorage.getItem("lastViewedEnquiries") || 0);
        const lastViewedReports = new Date(localStorage.getItem("lastViewedReports") || 0);

        setNewCounts({
          issues: issues.filter(i => new Date(i.createdAt) > lastViewedIssues).length,
          enquiries: enquiries.filter(e => new Date(e.createdAt) > lastViewedEnquiries).length,
          reports: reports.filter(r => new Date(r.createdAt) > lastViewedReports).length,
        });
      } catch (err) {
        console.error("Error fetching notification counts:", err);
      }
    };

    fetchCountsAndMarkRead();
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
          {hasPermission("users") && (
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
                {hasPermission("users.all") && (
                <li>
                  <Link 
                    to="/admin/all-user-list" 
                    style={isActive("/admin/all-user-list") ? activeLinkStyle : normalLinkStyle}
                  >
                    All Users
                  </Link>
                </li>
                )}
                {hasPermission("users.paid") && (
                <li>
                  <Link 
                    to="/admin/paid-user-list" 
                    style={isActive("/admin/paid-user-list") ? activeLinkStyle : normalLinkStyle}
                  >
                    Paid Users
                  </Link>
                </li>
                )}
                {hasPermission("users.add_new") && (
                <li>
                  <Link 
                    to="/admin/add-new-user" 
                    style={isActive("/admin/add-new-user") ? activeLinkStyle : normalLinkStyle}
                  >
                    Add new User
                  </Link>
                </li>
                )}
                {hasPermission("users.deleted") && (
                <li>
                  <Link 
                    to="/admin/deleted-users" 
                    style={isActive("/admin/deleted-users") ? activeLinkStyle : normalLinkStyle}
                  >
                    Deleted Users
                  </Link>
                </li>
                )}
                {hasPermission("users.deactivated") && (
                <li>
                  <Link 
                    to="/admin/deactivated-users" 
                    style={isActive("/admin/deactivated-users") ? activeLinkStyle : normalLinkStyle}
                  >
                    Deactivated Users
                  </Link>
                </li>
                )}

                {hasPermission("users.id_verification") && (
                <li>
                  <Link 
                    to="/admin/id-verification-requests" 
                    style={isActive("/admin/id-verification-requests") ? activeLinkStyle : normalLinkStyle}
                  >
                    ID Verification
                  </Link>
                </li>
                )}
                {hasPermission("users.verified_id") && (
                <li>
                  <Link 
                    to="/admin/verified-id-users" 
                    style={isActive("/admin/verified-id-users") ? activeLinkStyle : normalLinkStyle}
                  >
                    Verified Users
                  </Link>
                </li>
                )}
                {hasPermission("users.contact_updates") && (
                <li>
                  <Link 
                    to="/admin/contact-update-requests" 
                    style={isActive("/admin/contact-update-requests") ? activeLinkStyle : normalLinkStyle}
                  >
                    Contact Updates
                  </Link>
                </li>
                )}
              </ul>
            </div>
          </li>
          )}

          {/* PRICING */}
          {hasPermission("pricing") && (
          <li>
            <Link 
              to="/admin/pricing-plans-list" 
              style={isActive("/admin/pricing-plans-list") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>💳</span> Pricing Plans
            </Link>
          </li>
          )}

          {/* EVENTS */}
          {hasPermission("events") && (
          <li>
            <Link 
              to="/admin/events" 
              style={isActive("/admin/events") ? activeLinkStyle : normalLinkStyle}
            >
              <span style={iconStyle}>📅</span> Events
            </Link>
          </li>
          )}



          {/* ISSUES */}
          {hasPermission("issues") && (
          <li>
            <Link 
              to="/admin/issues" 
              style={{
                ...(isActive("/admin/issues") ? activeLinkStyle : normalLinkStyle),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span><span style={iconStyle}>⚠️</span> User Issues</span>
              {newCounts.issues > 0 && (
                <span className="badge bg-danger rounded-pill" style={{ marginRight: '15px' }}>{newCounts.issues}</span>
              )}
            </Link>
          </li>
          )}

          {hasPermission("enquiries") && (
          <li>
            <Link 
              to="/admin/enquiries" 
              style={{
                ...(isActive("/admin/enquiries") ? activeLinkStyle : normalLinkStyle),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span><span style={iconStyle}>✉️</span> Enquiries</span>
              {newCounts.enquiries > 0 && (
                <span className="badge bg-danger rounded-pill" style={{ marginRight: '15px' }}>{newCounts.enquiries}</span>
              )}
            </Link>
          </li>
          )}



          {/* REPORTS */}
          {hasPermission("reports") && (
          <li>
            <Link 
              to="/admin/reports" 
              style={{
                ...(isActive("/admin/reports") ? activeLinkStyle : normalLinkStyle),
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <span><span style={iconStyle}>🚩</span> User Reports</span>
              {newCounts.reports > 0 && (
                <span className="badge bg-danger rounded-pill" style={{ marginRight: '15px' }}>{newCounts.reports}</span>
              )}
            </Link>
          </li>
          )}
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
