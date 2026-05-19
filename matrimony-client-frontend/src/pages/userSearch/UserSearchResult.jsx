import React, { useEffect, useState, useCallback, useMemo } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import ShowInterest from "./ShowInterest";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchSearchedProfileData,
  saveTheProfileAsShortlisted,
  getMyActivePlanData,
} from "../../api/axiosService/userAuthService";
import { showAlert } from "../../utils/alertService";

import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";
import MembershipBadge from "../../components/common/MembershipBadge";
import UserCardImageSlider from "../../components/common/UserCardImageSlider";

const UserSearchResult = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  console.log(state);
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const sortedUsers = useMemo(() => {
    const list = [...users];
    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.createdAt || b.lastLogin || 0) - new Date(a.createdAt || a.lastLogin || 0));
    }
    if (sortBy === "oldest") {
      return list.sort((a, b) => new Date(a.createdAt || a.lastLogin || 0) - new Date(b.createdAt || b.lastLogin || 0));
    }
    return list;
  }, [users, sortBy]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    gender: "",
    age: "",
    religion: "",
    location: "",
    availability: "all",
    profileType: "all",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserPlan, setCurrentUserPlan] = useState(null);

  /* Add viewType state */
  const [viewType, setViewType] = useState("list");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Function to fetch filtered data from API
  const fetchFilteredData = useCallback(
    async (filterParams) => {
      setLoading(true);
      try {
        // Combine initial search state with current filters
        const { formData, ...restState } = state || {};

        // Transform sidebar filters to match backend fields
        const transformedFilters = { ...filterParams };

        // Parse Age Range (e.g., "18-30")
        if (filterParams.age && filterParams.age.includes("-")) {
          const [min, max] = filterParams.age.split("-");
          transformedFilters.ageFrom = min;
          transformedFilters.ageTo = max;
          delete transformedFilters.age;
        }

        // Map Location to districtCity (matching backend expectation)
        if (filterParams.location) {
          transformedFilters.districtCity = filterParams.location;
          delete transformedFilters.location;
        }

        const requestData = {
          ...restState,
          ...(formData || {}),
          ...transformedFilters,
          userId, // Add userId to request
        };

        // Call your filter API endpoint
        const response = await fetchSearchedProfileData(requestData);

        if (response?.status === 200) {
          setUsers(response?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching filtered profiles:", error);
      } finally {
        setLoading(false);
      }
    },
    [state, userId],
  );

  // Fetch current user's active plan
  useEffect(() => {
    const fetchMyPlan = async () => {
      if (userId) {
        try {
          const res = await getMyActivePlanData(userId);
          if (res.status === 200) {
            setCurrentUserPlan(res.data.activePlan);
          }
        } catch (error) {
          console.error("Error fetching my active plan:", error);
        }
      }
    };
    fetchMyPlan();
  }, [userId]);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { formData, ...restState } = state || {};

        const requestData = {
          ...restState,
          ...(formData || {}),
          userId, // Add userId
        };

        const response = await fetchSearchedProfileData(requestData);

        if (response?.status === 200) {
          setUsers(response?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setUsers([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    // ✅ ALWAYS call API
    fetchData();

    // ✅ optional filter सेट
    if (state?.formData?.gender) {
      setFilters((prev) => ({
        ...prev,
        gender: state.formData.gender,
      }));
    }
  }, [state, userId]);

  // Debounced filter effect - calls API when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only call API if at least one filter has a value
      const hasActiveFilters = Object.values(filters).some(
        (value) => value !== "" && value !== "all",
      );

      if (hasActiveFilters) {
        fetchFilteredData(filters);
      }
    }, 500); // 500ms delay to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [filters, fetchFilteredData]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    const availability = e.target.id.replace("exav", "");
    setFilters((prev) => ({
      ...prev,
      availability: availability,
    }));
  };

  const handleProfileTypeChange = (e) => {
    const profileType = e.target.id.replace("exver", "");
    setFilters((prev) => ({
      ...prev,
      profileType: profileType,
    }));
  };

  // Reset filters function
  const resetFilters = () => {
    setFilters({
      gender: "",
      age: "",
      religion: "",
      location: "",
      availability: "all",
      profileType: "all",
    });
    // Fetch original data when filters are reset
    fetchFilteredData({
      gender: "",
      age: "",
      religion: "",
      location: "",
      availability: "all",
      profileType: "all",
    });
  };

  const handleSendInterest = (user) => {
    setSelectedUser(user);
    console.log("Interest sent to:", user.userName);
  };



  const handleViewProfile = (targetUser) => {
    if (!userId || state?.isGuest) {
      setShowLoginModal(true);
      return;
    }

    // ✅ CHECK PLAN RESTRICTION
    const targetUserActivePlan = targetUser.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const targetPlanName =
      targetUserActivePlan?.subscriptionType?.toLowerCase() || "";
    const myPlanName = currentUserPlan?.subscriptionType?.toLowerCase() || "";

    console.log("My Plan (Search):", myPlanName);
    console.log("Target Plan (Search):", targetPlanName);

    const isTargetRestricted =
      targetPlanName.includes("platinum") ||
      targetPlanName.includes("gold") ||
      targetPlanName.includes("golden");

    if (myPlanName.includes("premium")) {
      if (isTargetRestricted) {
        showAlert({
          title: "Upgrade Required",
          text: "Upgrade your plan to view Platinum and Golden Membership profiles.",
          icon: "info",
        });

        return;
      }
    }

    navigate(`/profile-more-details/${targetUser._id}`, { state: targetUser });
  };

  const shortListProfile = async (user) => {
    if (!userId || state?.isGuest) {
      setShowLoginModal(true);
      return;
    }
    const response = await saveTheProfileAsShortlisted(user._id, userId);
    if (response.status === 200) {
      showAlert({ text: response.data.message, icon: "success" });
      console.log("Profile saved as shortlisted");
    } else {
      console.error("Failed to save profile as shortlisted");
      showAlert({ text: response.data.message, icon: "error" });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
        <div className="all-pro-head">
          <div className="container">
            <div className="row">

              {/* <a href="#">
                Join now for Free{" "}
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </a> */}
            </div>
          </div>
        </div>
        <div className="fil-mob fil-mob-act">
          <h4>
            Profile filters{" "}
            <i className="fa fa-filter" aria-hidden="true"></i>{" "}
          </h4>
        </div>
      </div>

      <section>
        <div className="all-weddpro all-jobs all-serexp chosenini">
          <div className="container">
            <div className="row">
              {/* Left Sidebar Filter - Removed as per user request */}
              <div className="d-none col-md-3 fil-mob-view"></div>
              <div className="col-md-12">
                <div className="short-all">
                  <div className="short-lhs">
                    Showing <b>{users.length}</b> profiles
                    {loading && <span className="ml-2">Loading...</span>}
                  </div>
                  <div className="short-rhs">
                    <ul>
                      <li>Sort by:</li>
                      <li>
                        <div className="form-group">
                          <select
                            className="form-select"
                            style={{
                              padding: "6px 12px",
                              fontSize: "14px",
                              borderRadius: "4px",
                              border: "1px solid #ccc",
                              outline: "none",
                              cursor: "pointer"
                            }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="">Most relative</option>
                            <option value="newest">Date listed: Newest</option>
                            <option value="oldest">Date listed: Oldest</option>
                          </select>
                        </div>
                      </li>
                      <li>
                        <div
                          className={`sort-grid sort-grid-1 ${viewType === "grid" ? "act" : ""}`}
                          onClick={() => setViewType("grid")}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-th-large" aria-hidden="true"></i>
                        </div>
                      </li>
                      <li>
                        <div
                          className={`sort-grid sort-grid-2 ${viewType === "list" ? "act" : ""}`}
                          onClick={() => setViewType("list")}
                          style={{ cursor: "pointer" }}
                        >
                          <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Loading Indicator */}
                {loading && (
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}

                <div className="all-list-sh">
                  <ul
                    style={
                      viewType === "grid"
                        ? {
                          display: "flex",
                          flexWrap: "wrap",
                          margin: "0 -10px",
                        }
                        : {}
                    }
                  >
                    {Array.isArray(sortedUsers) && sortedUsers.map((user) => (
                      <li
                        key={user._id}
                        style={
                          viewType === "grid"
                            ? {
                              width: "50%",
                              padding: "0 10px",
                              marginBottom: "20px",
                            }
                            : { width: "100%", marginBottom: "20px" }
                        }
                      >
                        <div
                          className="search-result-card"
                          style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                          }}
                        >
                          {/* Header: ID and Last Login */}
                          <div
                            className="d-flex justify-content-between align-items-center mb-3"
                            style={{
                              borderBottom: "1px dashed #ccc",
                              paddingBottom: "8px",
                            }}
                          >
                            <div className="d-flex align-items-center gap-2">
                              <h5
                                style={{
                                  color: "#C2185B",
                                  fontWeight: "bold",
                                  margin: 0,
                                  fontSize: "16px",
                                }}
                              >
                                {user.agwid}
                              </h5>
                            </div>
                            <span
                              style={{
                                fontSize: "13px",
                                color: "#888",
                                fontStyle: "italic",
                              }}
                            >
                              Last login:{" "}
                              {user.lastLogin
                                ? new Date(user.lastLogin).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )
                                : "Recently"}
                            </span>
                          </div>

                          <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3">
                            {/* Left: Image */}
                            <div
                              onClick={() => handleViewProfile(user)}
                              style={{
                                height: "160px",
                                width: "220px",
                                flex: "0 0 220px",
                                overflow: "hidden",
                                borderRadius: "8px",
                                border: "1px solid #eedc9a",
                                cursor: "pointer",
                                position: 'relative'
                              }}
                            >
                              <UserCardImageSlider
                                user={user}
                                isAccepted={
                                  user.interestStatus === "accepted"
                                }
                                height="100%"
                                blur={state?.isGuest}
                                onImageClick={() => handleViewProfile(user)}
                              />
                              <div style={{
                                position: 'absolute',
                                top: '5px',
                                left: '5px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px',
                                zIndex: 10,
                                alignItems: 'flex-start'
                              }}>
                                <MembershipBadge user={user} isMini={true} />
                                {user.idVerificationStatus === 'Verified' && (
                                  <div className="membership-badge badge-verified badge-mini shadow-sm">
                                    <i className="fa fa-check-circle badge-icon"></i>
                                    <span className="badge-text">ID Verified</span>
                                  </div>
                                )}
                                {user.isPhoneVerified && (
                                  <div className="badge bg-info text-white p-1 shadow-sm" style={{ fontSize: '8px', borderRadius: '2px', border: '1px solid white' }}>
                                    <i className="fa fa-phone"></i>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Center: Details */}
                            <div className="flex-grow-1" style={{ cursor: 'pointer' }} onClick={() => handleViewProfile(user)}>
                              <div>
                                <h4
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    marginBottom: "8px",
                                    color: "#333",
                                  }}
                                >
                                  {[
                                    user.motherTongue,
                                    user.age && `${user.age} Yrs`,
                                    user.height,
                                  ]
                                    .filter(Boolean)
                                    .join(", ")}
                                </h4>

                                <div
                                  style={{
                                    fontSize: "14px",
                                    color: "#555",
                                    lineHeight: "1.8",
                                  }}
                                >
                                  <div className="mb-1">
                                    {[
                                      user.religion,
                                      user.caste,
                                      user.city,
                                      user.state,
                                      user.citizenOf,
                                    ]
                                      .filter((item) => item && item !== "NA")
                                      .join(", ")}
                                  </div>
                                  <div className="mb-1">
                                    {[
                                      user.education || user.degree,
                                      user.occupation || user.jobType,
                                    ]
                                      .filter(Boolean)
                                      .join(", ")}
                                  </div>
                                  <div
                                    style={{
                                      color: "#777",
                                      marginTop: "8px",
                                      fontSize: "13px",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                    }}
                                  >
                                    {user.jobDetails
                                      ? `${user.jobDetails} - `
                                      : ""}
                                    {user.aboutMe ||
                                      "No description available."}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Right: Buttons */}
                            <div className="d-flex align-items-center justify-content-md-end justify-content-center gap-2 mt-3 mt-sm-0 px-sm-2 pe-sm-5" style={{ alignSelf: "center", flexShrink: 0 }}>
                              <button
                                className="btn btn-sm text-white"
                                style={{
                                  backgroundColor: "#00bcd5", // Cyan matching screenshot
                                  border: "none",
                                  borderRadius: "4px",
                                  padding: "6px 15px",
                                  fontWeight: "500",
                                  whiteSpace: "nowrap"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewProfile(user);
                                }}
                              >
                                View Profile
                              </button>

                              <button
                                className="btn btn-sm text-white"
                                style={{
                                  backgroundColor: "#00bcd5", // Cyan matching screenshot
                                  border: "none",
                                  borderRadius: "4px",
                                  padding: "6px 15px",
                                  fontWeight: "500",
                                  whiteSpace: "nowrap"
                                }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  shortListProfile(user);
                                }}
                              >
                                Shortlist Profile
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* No Results Message */}
                {!loading && users.length === 0 && (
                  <div className="text-center py-5">
                    {state?.searchType === "bnr" ? (
                      <>
                        <h4 className="text-danger font-weight-bold" style={{ fontSize: "1.25rem" }}>
                          The AV ID is incorrect
                        </h4>
                        <p className="text-muted mt-2">
                          We couldn't find any profile with the ID "<strong>{state?.bnrId}</strong>". Please check the ID and try again.
                        </p>
                      </>
                    ) : (
                      <>
                        <h4>No profiles found</h4>
                        <p>Try adjusting your search filters</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Required Modal */}
      {showLoginModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 100001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "8px",
              width: "320px",
              textAlign: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4
              style={{ marginBottom: "15px", color: "#333", fontWeight: "600" }}
            >
              Login Required
            </h4>
            <p style={{ marginBottom: "25px", color: "#666" }}>
              Please login to shortlist this profile and access more features.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  background: "transparent",
                  cursor: "pointer",
                  color: "#555",
                }}
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: "5px",
                  background: "#00bcd5",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate("/user/user-login");
                }}
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Interest Modal */}
      {selectedUser && (
        <ShowInterest
          selectedUser={selectedUser}
          userId={userId}
          onSuccess={() => {
            setUsers((prevUsers) =>
              prevUsers.map((u) =>
                u._id === selectedUser._id
                  ? { ...u, interestStatus: "pending" }
                  : u,
              ),
            );
          }}
        />
      )}



      <Footer />

      {/* <CopyRights /> */}
    </div>
  );
};

export default UserSearchResult;
