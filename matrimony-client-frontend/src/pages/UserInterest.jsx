import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  getInterestedProfile,
  handleChangeInterestStatus,
  markNotificationsRead
} from "../api/axiosService/userAuthService";
import { showAlert } from "../utils/alertService";
import MembershipBadge from "../components/common/MembershipBadge";

const ProfileActionMenu = ({ profile, activeTab, navigate, handleAccept, handleReject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} style={{ position: "relative", display: "inline-block", textAlign: "left" }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: "#f8f9fa", border: "1px solid #ddd", borderRadius: "4px", fontSize: "1.2rem", padding: "2px 12px", color: "#444", cursor: "pointer", outline: "none", fontWeight: "bold" }}
      >
        &#8942;
      </button>
      {isOpen && (
        <div style={{ position: "absolute", right: "50%", transform: "translateX(50%)", top: "100%", marginTop: "5px", background: "#fff", border: "1px solid #eaeaea", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 9999, minWidth: "140px", overflow: "hidden" }}>
          <button style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #f1f1f1", padding: "10px 15px", cursor: "pointer", fontSize: "0.85rem", color: "#333", whiteSpace: "nowrap" }} onClick={() => { setIsOpen(false); navigate(`/profile-more-details/${profile.senderDetails._id}`); }}>
            <i className="fa fa-user" style={{ width: "20px", color: "#4b5563" }}></i> View Profile
          </button>
          
          {activeTab === "pending" && (
            <>
              <button style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #f1f1f1", padding: "10px 15px", cursor: "pointer", fontSize: "0.85rem", color: "#333", whiteSpace: "nowrap" }} onClick={() => { setIsOpen(false); handleAccept(profile.senderId, "accepted"); }}>
                <i className="fa fa-check-circle" style={{ width: "20px", color: "#10b981" }}></i> Accept
              </button>
              <button style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 15px", cursor: "pointer", fontSize: "0.85rem", color: "#333", whiteSpace: "nowrap" }} onClick={() => { setIsOpen(false); handleReject(profile.senderId, "rejected"); }}>
                <i className="fa fa-trash" style={{ width: "20px", color: "#ef4444" }}></i> Reject
              </button>
            </>
          )}

          {activeTab === "accepted" && (
            <button style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 15px", cursor: "pointer", fontSize: "0.85rem", color: "#333", whiteSpace: "nowrap" }} onClick={() => { setIsOpen(false); handleReject(profile.senderId, "rejected"); }}>
              <i className="fa fa-trash" style={{ width: "20px", color: "#ef4444" }}></i> Reject
            </button>
          )}

          {activeTab === "rejected" && (
            <button style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "10px 15px", cursor: "pointer", fontSize: "0.85rem", color: "#333", whiteSpace: "nowrap" }} onClick={() => { setIsOpen(false); handleAccept(profile.senderId, "accepted"); }}>
              <i className="fa fa-check-circle" style={{ width: "20px", color: "#10b981" }}></i> Accept
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const UserInterest = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Fetch data based on status
  const fetchProfileData = async (status) => {
    setLoading(true);
    setError("");
    try {
      const response = await getInterestedProfile(userId, status);
      if (response.status === 200) {
        setActiveTab(status);
        setProfileData(response.data.data);
      } else {
        setError("Failed to fetch profile data");
      }
    } catch (err) {
      setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (status) => {
    setActiveTab(status);
    setCurrentPage(1);
    fetchProfileData(status);
  };

  // Initial load
  useEffect(() => {
    fetchProfileData("pending");
    markNotificationsRead(userId, 'interests').catch(console.error);
  }, []);

  const handleAccept = async (profileId, status) => {
    try {
      const response = await handleChangeInterestStatus(
        userId,
        profileId,
        status,
      );

      if (response.status === 200) {
        showAlert({
          title: "Success",
          text: "Profile request accepted successfully!",
          icon: "success",
        });
        // Switch to accepted tab and fetch data
        await fetchProfileData("accepted");
      } else {
        showAlert({
          title: "Error",
          text: "Failed to accept the request. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Error accepting request: " + error.message,
        icon: "error",
      });
    }
  };

  const handleReject = async (profileId, status) => {
    try {
      console.log("Rejecting profile:", profileId, status);
      const response = await handleChangeInterestStatus(
        userId,
        profileId,
        status,
      );

      if (response.status === 200) {
        showAlert({
          title: "Success",
          text: "Profile request rejected successfully!",
          icon: "success",
        });
        // Switch to rejected tab and fetch data
        await fetchProfileData("rejected");
      } else {
        showAlert({
          title: "Error",
          text: "Failed to reject the request. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Error rejecting request: " + error.message,
        icon: "error",
      });
    }
  };


  // Render profile list
  const renderProfileList = () => {
    if (loading) {
      return <div className="text-center">Loading...</div>;
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }

    const filteredData = profileData.filter((profile) => profile && profile.senderDetails);

    if (!filteredData || filteredData.length === 0) {
      return (
        <div className="text-center">No profiles found for this category.</div>
      );
    }

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <div className="table-responsive mt-3 interest-responsive-table" style={{ background: "#fff", borderRadius: "12px", padding: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #eaeaea" }}>
        <style>{`
          @media (max-width: 768px) {
            .interest-responsive-table {
              overflow-x: visible !important;
            }
            .interest-responsive-table table, .interest-responsive-table thead, .interest-responsive-table tbody, .interest-responsive-table th, .interest-responsive-table td, .interest-responsive-table tr {
              display: block;
            }
            .interest-responsive-table thead tr {
              display: none;
            }
            .interest-responsive-table tr {
              margin-bottom: 20px;
              border: 1px solid #eaeaea;
              border-radius: 12px;
              padding: 20px 10px 15px 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              position: relative;
              background: #fff;
            }
            .interest-responsive-table td {
              border: none !important;
              padding: 10px 5px !important;
              text-align: center;
              width: 100% !important;
            }
            /* Hide S.No */
            .interest-responsive-table td:nth-child(1) {
              display: none;
            }
            /* Stack details vertically */
            .interest-responsive-table td:nth-child(3) > div {
              flex-direction: column !important;
              gap: 5px !important;
            }
            /* Position the Actions dropdown in top right corner of card */
            .interest-responsive-table td:nth-child(5) {
              position: absolute;
              top: 10px;
              right: 10px;
              width: auto !important;
              padding: 0 !important;
            }
          }
        `}</style>
        <table className="table align-middle table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: "5%", color: "#444", fontWeight: "600" }}>S.No</th>
              <th scope="col" style={{ width: "20%", textAlign: "center", color: "#444", fontWeight: "600" }}>Profile</th>
              <th scope="col" style={{ width: "45%", color: "#444", fontWeight: "600" }}>Details</th>
              <th scope="col" style={{ width: "15%", color: "#444", fontWeight: "600" }}>Date</th>
              <th scope="col" style={{ width: "15%", textAlign: "center", color: "#444", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ borderTop: "none" }}>
            {currentData.map((profile, index) => (
                <tr key={profile._id}>
                  <td style={{ fontWeight: "500", color: "#666", padding: "2px 8px" }}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  {/* 1. Profile Section */}
                  <td style={{ padding: "2px 8px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
                      <div style={{ transform: "scale(0.4)", transformOrigin: "center center", marginBottom: "-25px", marginTop: "-15px" }}>
                        <MembershipBadge user={profile.senderDetails} isMini={true} />
                      </div>
                      <div style={{ position: "relative", width: "95px", height: "95px" }}>
                        <img
                          src={profile.senderDetails.profileImage || "images/profiles/default.jpg"}
                          alt={profile.senderDetails.userName}
                          style={{ width: "95px", height: "95px", objectFit: "cover", borderRadius: "50%", border: "none" }}
                        />
                        {profile.senderDetails.idVerificationStatus === "Verified" && (
                          <span className="badge bg-success shadow-sm" style={{ position: "absolute", bottom: "-5px", left: "50%", transform: "translateX(-50%)", fontSize: "0.5rem", padding: "2px 4px", borderRadius: "10px" }}>
                            <i className="fa fa-check-circle"></i>
                          </span>
                        )}
                      </div>
                      <h5 style={{ margin: 0, fontSize: "0.95rem", fontWeight: "600", color: "#333", textAlign: "center", marginTop: "0", marginBottom: "0" }}>
                        {profile.senderDetails.agwid}
                      </h5>
                    </div>
                  </td>

                  {/* 2. Details Section */}
                  <td style={{ color: "#555", fontSize: "0.85rem", padding: "2px 8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Age:</strong> {profile.senderDetails.age} yrs</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Height:</strong> {profile.senderDetails.height} cm</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>City:</strong> {profile.senderDetails.city}</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Job:</strong> {profile.senderDetails.jobType || "Not specified"}</div>
                    </div>
                  </td>

                  {/* 3. Date Section */}
                  <td style={{ color: "#888", fontSize: "0.85rem", whiteSpace: "nowrap", padding: "2px 8px" }}>
                    {new Date(profile.createdAt).toLocaleDateString()}
                  </td>

                  {/* 4. Actions Section */}
                  <td style={{ overflow: "visible", padding: "2px 8px" }}>
                    <div style={{ textAlign: "center" }}>
                      <ProfileActionMenu 
                        profile={profile} 
                        activeTab={activeTab} 
                        navigate={navigate} 
                        handleAccept={handleAccept} 
                        handleReject={handleReject} 
                      />
                    </div>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "15px", padding: "10px 5px", borderTop: "1px solid #eaeaea" }}>
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
              className="btn btn-sm"
              style={{ background: currentPage === 1 ? "#f8f9fa" : "#fff", border: "1px solid #ddd", color: currentPage === 1 ? "#aaa" : "#555", borderRadius: "6px", padding: "6px 15px", fontWeight: "500", cursor: currentPage === 1 ? "not-allowed" : "pointer", outline: "none" }}
            >
              Previous
            </button>
            <span style={{ fontSize: "0.95rem", color: "#666", fontWeight: "500" }}>
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
              className="btn btn-sm"
              style={{ background: currentPage === totalPages ? "#f8f9fa" : "#fff", border: "1px solid #ddd", color: currentPage === totalPages ? "#aaa" : "#555", borderRadius: "6px", padding: "6px 15px", fontWeight: "500", cursor: currentPage === totalPages ? "not-allowed" : "pointer", outline: "none" }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12 db-sec-com">
                    <h2 className="db-tit">Interest Request</h2>


                    <div className="db-pro-stat">
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              Edit Profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View Profile
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Plan Change
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              Download Invoice Now
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="db-inte-main">
                        <div
                          style={{
                            overflowX: "auto",
                          }}
                        >
                          <ul
                            className="nav nav-tabs"
                            role="tablist"
                            style={{
                              flexWrap: "nowrap",
                              display: "flex",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <li className="nav-item" style={{ flex: "0 0 auto" }}>
                              <button
                                className={`nav-link ${activeTab === "pending" ? "active" : ""
                                  }`}
                                style={{ whiteSpace: "nowrap" }}
                                type="button"
                                onClick={() => handleTabChange("pending")}
                              >
                                New Requests
                              </button>
                            </li>
                            <li className="nav-item" style={{ flex: "0 0 auto" }}>
                              <button
                                className={`nav-link ${activeTab === "accepted" ? "active" : ""
                                  }`}
                                style={{ whiteSpace: "nowrap" }}
                                type="button"
                                onClick={() => handleTabChange("accepted")}
                              >
                                Accept Request
                              </button>
                            </li>
                            <li className="nav-item" style={{ flex: "0 0 auto" }}>
                              <button
                                className={`nav-link ${activeTab === "rejected" ? "active" : ""
                                  }`}
                                style={{ whiteSpace: "nowrap" }}
                                type="button"
                                onClick={() => handleTabChange("rejected")}
                              >
                                Reject Request
                              </button>
                            </li>
                          </ul>
                          <div className="tab-content">
                            <div className="container tab-pane active">
                              <br />
                              {renderProfileList()}
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
      </div>
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserInterest;
