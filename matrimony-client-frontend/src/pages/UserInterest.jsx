import React, { useEffect, useState } from "react";
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

const UserInterest = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!profileData || profileData.length === 0) {
      return (
        <div className="text-center">No profiles found for this category.</div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {profileData
            .filter((profile) => profile && profile.senderDetails)
            .map((profile) => (
              <li 
                key={profile._id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  marginBottom: "15px",
                  background: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  border: "1px solid #eaeaea",
                  gap: "20px",
                  flexWrap: "wrap"
                }}
              >
                {/* 1. Profile Section (Image, Badge, Name) */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", minWidth: "150px" }}>
                  <div style={{ position: "relative", width: "80px", height: "80px", marginTop: "15px" }}>
                    <div style={{ position: "absolute", top: "-25px", left: "50%", transform: "translateX(-50%)", zIndex: 10, display: "flex", flexDirection: "column", gap: "2px", alignItems: "center" }}>
                      <MembershipBadge user={profile.senderDetails} isMini={true} />
                      {profile.senderDetails.idVerificationStatus === "Verified" && (
                        <div className="badge bg-success shadow-sm" style={{ fontSize: "0.65rem", padding: "3px 6px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "3px" }}>
                          <i className="fa fa-check-circle"></i> VERIFIED
                        </div>
                      )}
                    </div>
                    <img
                      src={profile.senderDetails.profileImage || "images/profiles/default.jpg"}
                      alt={profile.senderDetails.userName}
                      style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%", border: "2px solid #f3f4f6" }}
                    />
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <h5 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "600", color: "#333" }}>
                      {profile.senderDetails.userName}
                    </h5>
                    <div style={{ fontSize: "0.85rem", color: "#888", marginTop: "4px" }}>
                      {new Date(profile.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* 2. Data Section (Age, Height, City, Job) */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px", minWidth: "200px", color: "#555", fontSize: "0.95rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "600", color: "#444", minWidth: "60px" }}>Age:</span>
                    <span>{profile.senderDetails.age} yrs</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "600", color: "#444", minWidth: "60px" }}>Height:</span>
                    <span>{profile.senderDetails.height} cm</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "600", color: "#444", minWidth: "60px" }}>City:</span>
                    <span>{profile.senderDetails.city}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: "600", color: "#444", minWidth: "60px" }}>Job:</span>
                    <span>{profile.senderDetails.jobType || "Not specified"}</span>
                  </div>
                  
                  {profile.message && (
                    <div style={{ fontSize: "0.85rem", color: "#666", fontStyle: "italic", padding: "6px 12px", background: "#fef8f8", borderRadius: "8px", borderLeft: "3px solid #ff5e62", marginTop: "4px", display: "inline-block" }}>
                      "{profile.message}"
                    </div>
                  )}
                </div>

                {/* 3. Buttons Section */}
                <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    onClick={() => navigate(`/profile-more-details/${profile.senderDetails._id}`)}
                    style={{
                      backgroundColor: "#f3f4f6", color: "#4b5563", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "0.2s"
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                  >
                    View Profile
                  </button>

                  {activeTab === "pending" && (
                    <>
                      <button
                        type="button"
                        onClick={() => handleAccept(profile.senderId, "accepted")}
                        style={{
                          backgroundColor: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "0.2s"
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        onClick={() => handleReject(profile.senderId, "rejected")}
                        style={{
                          backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "0.2s"
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {activeTab === "accepted" && (
                    <button
                      type="button"
                      onClick={() => handleReject(profile.senderId, "rejected")}
                      style={{
                        backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "0.2s"
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#dc2626")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#ef4444")}
                    >
                      Reject
                    </button>
                  )}
                  {activeTab === "rejected" && (
                    <button
                      type="button"
                      onClick={() => handleAccept(profile.senderId, "accepted")}
                      style={{
                        backgroundColor: "#10b981", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem", fontWeight: "500", transition: "0.2s"
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#059669")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#10b981")}
                    >
                      Accept
                    </button>
                  )}
                </div>
              </li>
          ))}
        </ul>
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
