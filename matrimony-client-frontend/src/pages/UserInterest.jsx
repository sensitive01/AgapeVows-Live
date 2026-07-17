import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  getInterestedProfile,
  handleChangeInterestStatus,
  getSentInterestedProfile,
  markNotificationsRead
} from "../api/axiosService/userAuthService";
import { showAlert } from "../utils/alertService";
import MembershipBadge from "../components/common/MembershipBadge";
import dummyProfileImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";

const ProfileActionMenu = ({ profile, activeTab, navigate, handleAccept, handleReject }) => {
  const btnStyle = {
    padding: "6px 14px",
    borderRadius: "5px",
    fontSize: "0.85rem",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    whiteSpace: "nowrap",
    width: "130px"
  };

  return (
    <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", padding: "5px 0" }}>
      <button 
        style={{ ...btnStyle, backgroundColor: "#f3f4f6", color: "#374151" }} 
        onClick={() => navigate(`/profile-more-details/${profile.senderDetails._id}`)}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#e5e7eb"; }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; }}
      >
        <i className="fa fa-user"></i> View Profile
      </button>
      
      {activeTab === "pending" && (
        <>
          <button 
            style={{ ...btnStyle, backgroundColor: "#10b981", color: "white" }} 
            onClick={() => handleAccept(profile.senderId, "accepted")}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#059669"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.3)"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#10b981"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"; }}
          >
            <i className="fa fa-check"></i> Accept
          </button>
          <button 
            style={{ ...btnStyle, backgroundColor: "#ef4444", color: "white" }} 
            onClick={() => handleReject(profile.senderId, "rejected")}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#dc2626"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(239, 68, 68, 0.3)"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ef4444"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"; }}
          >
            <i className="fa fa-times"></i> Reject
          </button>
        </>
      )}

      {activeTab === "accepted" && (
        <button 
          style={{ ...btnStyle, backgroundColor: "#ef4444", color: "white" }} 
          onClick={() => handleReject(profile.senderId, "rejected")}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#dc2626"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(239, 68, 68, 0.3)"; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ef4444"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"; }}
        >
          <i className="fa fa-times"></i> Reject
        </button>
      )}

      {activeTab === "rejected" && (
        <button 
          style={{ ...btnStyle, backgroundColor: "#10b981", color: "white" }} 
          onClick={() => handleAccept(profile.senderId, "accepted")}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#059669"; e.currentTarget.style.boxShadow = "0 4px 6px rgba(16, 185, 129, 0.3)"; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#10b981"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)"; }}
        >
          <i className="fa fa-check"></i> Accept
        </button>
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
      let response;
      if (status === "sent") {
        response = await getSentInterestedProfile(userId);
      } else {
        response = await getInterestedProfile(userId, status);
      }
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
      <div className="db-inte-prof-list">
        <ul>
          {currentData.map((profile) => (
            <li key={profile._id}>
              <div
                className="db-int-pro-1"
                style={{
                  position: "relative",
                  width: "80px",
                  height: "95px" // extra space for badge
                }}
              >
                {/* Badge - TOP CENTER */}
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "50%",
                    transform: "translateX(-50%) scale(0.7)",
                    zIndex: 10
                  }}
                >
                  <MembershipBadge user={profile.senderDetails} isMini={true} />
                </div>

                {/* Profile Image */}
                <img
                  src={profile.senderDetails.profileImage || dummyProfileImage}
                  alt={profile.senderDetails.userName}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "15px"
                  }}
                  onError={(e) => { e.target.onerror = null; e.target.src = dummyProfileImage; }}
                />

                {/* Watermark Overlay */}
                <div
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "15px",
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                    userSelect: "none",
                    zIndex: 5,
                  }}
                >
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: "8px",
                      fontWeight: "1000",
                      letterSpacing: "1px",
                      whiteSpace: "nowrap",
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    AgapeVows.com
                  </span>
                </div>
              </div>
              
                {/* Date at the extreme right */}
                <span style={{ position: "absolute", right: "15px", top: "15px", fontSize: "0.85rem", color: "#888", fontWeight: "500" }}>
                  {new Date(profile.createdAt).toLocaleDateString()}
                </span>

                <div className="db-int-pro-2">
                  <h5 style={{ margin: 0 }}>{profile.senderDetails.agwid}</h5>
                
                <ol className="poi">
                  <li>
                    Age: <strong>{profile.senderDetails.age || "N/A"}</strong>
                  </li>
                  <li>
                    City: <strong>{profile.senderDetails.city || "N/A"}</strong>
                  </li>
                  <li>
                    Profession: <strong>{profile.senderDetails.jobType || profile.senderDetails.occupation || "N/A"}</strong>
                  </li>
                  <li>
                    Height: <strong>{profile.senderDetails.height ? `${profile.senderDetails.height} cm` : "N/A"}</strong>
                  </li>
                  <li>
                    Language: <strong>{profile.senderDetails.motherTongue || "N/A"}</strong>
                  </li>
                  <li>
                    Education: <strong>{profile.senderDetails.education || profile.senderDetails.degree || "N/A"}</strong>
                  </li>
                </ol>
                
                <div style={{ marginTop: "10px" }}>
                  <ProfileActionMenu 
                    profile={profile} 
                    activeTab={activeTab} 
                    navigate={navigate} 
                    handleAccept={handleAccept} 
                    handleReject={handleReject} 
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>

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
      <style>{`
        @media (max-width: 768px) {
          .db-pro-stat .dropdown {
            top: 10px !important;
            right: 10px !important;
          }
          .db-pro-stat .dropdown button.interest-top-dropdown {
            width: 30px !important;
            height: 30px !important;
            min-width: 30px !important;
            min-height: 30px !important;
            font-size: 14px !important;
          }
        }
      `}</style>
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "100px", paddingBottom: "40px" }}>
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
                          className="btn btn-outline-secondary interest-top-dropdown"
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
                                Accepted Request
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
                                Rejected Request
                              </button>
                            </li>
                            <li className="nav-item" style={{ flex: "0 0 auto" }}>
                              <button
                                className={`nav-link ${activeTab === "sent" ? "active" : ""
                                  }`}
                                style={{ whiteSpace: "nowrap" }}
                                type="button"
                                onClick={() => handleTabChange("sent")}
                              >
                                Interest Sent
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
