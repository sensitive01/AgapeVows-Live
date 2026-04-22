import React, { useEffect, useState } from "react";

import UserSideBar from "../../components/UserSideBar";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import {
  getBlockedProfilesData,
  unblockProfile,
} from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";

const BlockedProfile = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unblockingId, setUnblockingId] = useState(null);

  // Handle view profile navigation
  const handleViewProfile = (profileId) => {
    navigate(`/profile-more-details/${profileId}`);
  };

  // Handle unblock profile
  const handleUnblockProfile = async (profileId) => {
    if (window.confirm("Are you sure you want to unblock this profile?")) {
      setUnblockingId(profileId);
      try {
        const response = await unblockProfile(userId, profileId);
        if (response.status === 200) {
          // Remove the unblocked profile from the list
          setProfileData(
            profileData.filter((profile) => profile._id !== profileId),
          );
          alert("Profile unblocked successfully!");
        } else {
          alert("Failed to unblock profile");
        }
      } catch (err) {
        alert("Error unblocking profile: " + err.message);
      } finally {
        setUnblockingId(null);
      }
    }
  };

  // Fetch blocked profiles
  const fetchBlockedProfiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getBlockedProfilesData(userId);
      if (response.status === 200) {
        setProfileData(response.data.data || []);
      } else {
        setError("Failed to fetch blocked profiles");
      }
    } catch (err) {
      // setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBlockedProfiles();
  }, []);

  // Render profile list
  const renderProfileList = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    if (error) {
      return <div className="alert alert-danger">{error}</div>;
    }

    if (profileData.length === 0) {
      return (
        <div className="text-center py-5 text-muted">
          <i
            className="fa fa-ban"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          ></i>
          <p>No blocked profiles.</p>
        </div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {profileData.filter((profile) => profile).map((profile) => (
            <li key={profile._id}>
              <div className="db-int-pro-1">
                <img
                  src={profile.profileImage || "images/profiles/default.jpg"}
                  alt={profile.userName}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    filter: "grayscale(50%)",
                  }}
                />
              </div>
              <div className="db-int-pro-2">
                <h5>
                  {profile.userName}
                  <span
                    className="badge bg-danger ms-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Blocked
                  </span>
                </h5>
                <ol className="poi">
                  <li>
                    City: <strong>{profile.city}</strong>
                  </li>
                  <li>
                    Age: <strong>{profile.age}</strong>
                  </li>
                  <li>
                    Height: <strong>{profile.height} cm</strong>
                  </li>
                  <li>
                    Education: <strong>{profile.degree}</strong>
                  </li>
                </ol>
                <div className="d-flex gap-2 align-items-center">
                  <button
  onClick={() => handleViewProfile(profile._id)}
  className="cta-5"
  style={{
    backgroundColor: "#ff5e62",
    color: "#fff",
    border: "none",
    padding: "3px 8px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: "500",
    display: "inline-block",
    transition: "all 0.3s ease"
  }}
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = "#e14b50";
    e.target.style.transform = "scale(1.05)";
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = "#ff5e62";
    e.target.style.transform = "scale(1)";
  }}
>
  View Full Profile
</button>
                  <button
                    onClick={() => handleUnblockProfile(profile._id)}
                    className="btn btn-sm btn-outline-success"
                    disabled={unblockingId === profile._id}
                  >
                    {unblockingId === profile._id ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                        ></span>
                        Unblocking...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-unlock me-1"></i>
                        Unblock
                      </>
                    )}
                  </button>
                  {profile.blockedAt && (
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className="fa fa-clock-o me-1"></i>
                      Blocked on{" "}
                      {new Date(profile.blockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
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
                    <h2 className="db-tit">
                      <i className="fa fa-ban me-2"></i>
                      Blocked Profiles
                    </h2>

                    <div className="db-pro-stat">
                      <div className="alert alert-info" role="alert">
                        <i className="fa fa-info-circle me-2"></i>
                        These profiles are blocked and cannot contact you or
                        view your profile.
                      </div>

                      <div className="db-inte-main">
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
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default BlockedProfile;
