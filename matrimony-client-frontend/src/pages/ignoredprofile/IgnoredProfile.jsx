import React, { useEffect, useState } from "react";

import UserSideBar from "../../components/UserSideBar";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import {
  getIgnoredProfilesData,
  unignoreProfile,
} from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";
import MembershipBadge from "../../components/common/MembershipBadge";

const IgnoredProfile = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [unignoringId, setUnignoringId] = useState(null);

  // Handle view profile navigation
  const handleViewProfile = (profileId) => {
    navigate(`/profile-more-details/${profileId}`);
  };

  // Handle unignore profile
  const handleUnignoreProfile = async (profileId) => {
    if (window.confirm("Are you sure you want to unignore this profile?")) {
      setUnignoringId(profileId);
      try {
        const response = await unignoreProfile(userId, profileId);
        if (response.status === 200) {
          // Remove the unignored profile from the list
          setProfileData(
            profileData.filter((profile) => profile._id !== profileId),
          );
          alert("Profile unignored successfully!");
        } else {
          alert("Failed to unignore profile");
        }
      } catch (err) {
        alert("Error unignoring profile: " + err.message);
      } finally {
        setUnignoringId(null);
      }
    }
  };

  // Fetch ignored profiles
  const fetchIgnoredProfiles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getIgnoredProfilesData(userId);
      if (response.status === 200) {
        setProfileData(response.data.data || []);
      } else {
        setError("Failed to fetch ignored profiles");
      }
    } catch (err) {
      // setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchIgnoredProfiles();
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
            className="fa fa-times-circle"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          ></i>
          <p>No ignored profiles.</p>
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
                     opacity: "0.6",
                   }}
                 />
                 <div style={{ position: 'absolute', top: '2px', left: '2px', zIndex: 10 }}>
                   <MembershipBadge user={profile} isMini={true} />
                 </div>
               </div>
              <div className="db-int-pro-2">
                <h5>
                  {profile.userName}
                  <span
                    className="badge bg-secondary ms-2"
                    style={{ fontSize: "0.7rem" }}
                  >
                    Ignored
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
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      textDecoration: "underline",
                      color: "inherit",
                    }}
                  >
                    View full profile
                  </button>
                  <button
                    onClick={() => handleUnignoreProfile(profile._id)}
                    className="btn btn-sm btn-outline-primary"
                    disabled={unignoringId === profile._id}
                  >
                    {unignoringId === profile._id ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-1"
                          role="status"
                        ></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fa fa-undo me-1"></i>
                        Unignore
                      </>
                    )}
                  </button>
                  {profile.ignoredAt && (
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className="fa fa-clock-o me-1"></i>
                      Ignored on{" "}
                      {new Date(profile.ignoredAt).toLocaleDateString()}
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
                      <i className="fa fa-times-circle me-2"></i>
                      Ignored Profiles
                    </h2>

                    <div className="db-pro-stat">
                      <div className="alert alert-warning" role="alert">
                        <i className="fa fa-info-circle me-2"></i>
                        These profiles won't appear in your search results or
                        recommendations. You can unignore them anytime.
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

export default IgnoredProfile;
