import React, { useEffect, useState } from "react";

import UserSideBar from "../../components/UserSideBar";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import { getWhoViewedYouData } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";
import MembershipBadge from "../../components/common/MembershipBadge";

const WhoViewedYou = () => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle view profile navigation
  const handleViewProfile = (profileId) => {
    navigate(`/profile-more-details/${profileId}`);
  };

  // Fetch who viewed you profiles
  const fetchWhoViewedYou = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getWhoViewedYouData(userId);
      if (response.status === 200) {
        setProfileData(response.data.data || []);
      } else {
        setError("Failed to fetch profile views");
      }
    } catch (err) {
      // setError("Error fetching data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchWhoViewedYou();
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
            className="fa fa-eye"
            style={{ fontSize: "3rem", marginBottom: "1rem" }}
          ></i>
          <p>No profile views yet.</p>
        </div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {profileData.filter((profile) => profile).map((profile) => (
            <li key={profile._id}>
              <div
                className="db-int-pro-1"
                style={{
                  position: "relative",
                  width: "100px",
                  height: "100px" // 👈 space for badge
                }}
              >
                {/* ✅ Badge - TOP CENTER */}
                <div
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "50%",
                    transform: "translateX(-50%) scale(0.7)",
                    zIndex: 10
                  }}
                >
                  <MembershipBadge user={profile} isMini={true} />
                </div>

                {/* ✅ Profile Image */}
                <img
                  src={profile.profileImage || "images/profiles/default.jpg"}
                  alt={profile.userName}
                  style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: "15px" // 👈 push image down
                  }}
                />
              </div>
              <div className="db-int-pro-2">
                <h5>{profile.userName}</h5>
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
                      backgroundColor: "#e9e9e3ff",   // blue color
                      color: "#a934e3ff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "0.3s ease"
                    }}
                   
                  >
                    View Full Profile
                  </button>
                  {profile.viewedAt && (
                    <span
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      <i className="fa fa-clock-o me-1"></i>
                      {new Date(profile.viewedAt).toLocaleDateString()}
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
                      <i className="fa fa-eye me-2"></i>
                      Who Viewed You
                    </h2>

                    <div className="db-pro-stat">
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

export default WhoViewedYou;
