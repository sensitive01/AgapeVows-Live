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
} from "../../api/axiosService/userAuthService.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
import maleDefault from "../../assets/images/profiles/men1.jpg";
import femaleDefault from "../../assets/images/profiles/12.jpg";
import MembershipBadge from "../../components/common/MembershipBadge";

const UserCardImageSlider = ({ user, isAccepted, height = "220px" }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const allImages = useMemo(() => {
    const defaultImg =
      user.gender === "Male" || user.gender === "Groom"
        ? maleDefault
        : user.gender === "Female" || user.gender === "Bride"
          ? femaleDefault
          : defaultProfileImg;

    const images = [];

    if (user.profileImage) {
      images.push(user.profileImage);
    }

    if (user.additionalImages && user.additionalImages.length > 0) {
      images.push(...user.additionalImages);
    }

    // Remove duplicates
    const uniqueImages = [...new Set(images)];

    // Return unique images or default if empty
    return uniqueImages.length > 0 ? uniqueImages : [defaultImg];
  }, [user]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1,
    );
  };

  const openZoom = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAccepted) {
      setIsZoomOpen(true);
    }
  };

  return (
    <>
      <div style={{ position: "relative", width: "100%", height: height }}>
        <div
          onClick={openZoom}
          style={{
            display: "block",
            height: "100%",
            cursor: isAccepted ? "pointer" : "default",
          }}
        >
          <img
            src={allImages[currentImageIndex]}
            alt={user.userName}
            onError={(e) => {
              const defaultImg =
                user.gender === "Male" || user.gender === "Groom"
                  ? maleDefault
                  : user.gender === "Female" || user.gender === "Bride"
                    ? femaleDefault
                    : defaultProfileImg;
              e.target.src = defaultImg;
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        </div>

        {allImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                top: "50%",
                left: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-left"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                background: "rgba(0, 0, 0, 0.5)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <i
                className="fa fa-chevron-right"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
          </>
        )}
      </div>

      {isZoomOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.9)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomOpen(false);
          }}
        >
          <div
            style={{ position: "relative", maxWidth: "90%", maxHeight: "90%" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[currentImageIndex]}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              style={{
                position: "fixed",
                top: "20px",
                right: "30px",
                background: "rgba(0,0,0,0.5)",
                border: "none",
                color: "white",
                fontSize: "40px",
                cursor: "pointer",
                padding: "0 10px",
                borderRadius: "5px",
                zIndex: 100000,
              }}
            >
              &times;
            </button>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10094;
                </button>
                <button
                  onClick={nextImage}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  &#10095;
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const UserSearchResult = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  console.log(state);
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
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
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
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

        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching filtered profiles:", error);
      } finally {
        setLoading(false);
      }
    },
    [state],
  );

  // Initial data fetch
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const { formData, ...restState } = state || {};
  //       const requestData = {
  //         ...restState,
  //         ...(formData || {}),
  //         userId, // Add userId to request
  //       };

  //       const response = await fetchSearchedProfileData(requestData);
  //       if (response.status === 200) {
  //         setUsers(response.data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profiles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (state) {
  //     if (state.formData && state.formData.gender) {
  //       setFilters((prev) => ({
  //         ...prev,
  //         gender: state.formData.gender,
  //       }));
  //     }
  //     fetchData();
  //   }
  // }, [state]);

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

        if (response.status === 200) {
          setUsers(response.data.data || []);
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

  const handleChatSend = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      const newMessage = {
        sender: "me",
        message: chatMessage,
        timestamp: new Date().toISOString(),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage("");

      // Simulate reply after 1 second
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "them",
            message: "Thanks for your message! I'll reply soon.",
            timestamp: new Date().toISOString(),
          },
        ]);
      }, 1000);
    }
  };

  const openChat = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
    setChatMessages([]); // Clear previous chat when opening new one

    // Add to active chats if not already there
    if (!activeChats.some((chat) => chat._id === user._id)) {
      setActiveChats([...activeChats, user]);
    }
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  const handleViewProfile = (targetUser) => {
    if (!userId) {
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
        toast.error("Upgrade your plan to view Platinum and Golden Membership profiles.", {
          position: "top-center",
          autoClose: 30000, // 30 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
    }

    navigate(`/profile-more-details/${targetUser._id}`, { state: targetUser });
  };

  const shortListProfile = async (user) => {
    if (!userId) {
      setShowLoginModal(true);
      return;
    }
    const response = await saveTheProfileAsShortlisted(user._id, userId);
    if (response.status === 200) {
      alert(response.data.message);
      console.log("Profile saved as shortlisted");
    } else {
      console.error("Failed to save profile as shortlisted");
      alert(response.data.message);
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
              <h1>Lakhs of Happy Marriages</h1>
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
                          <select className="chosen-select">
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
                    {users.map((user) => (
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

                          <div className="row">
                            {/* Left: Image */}
                            <div
                              className="col-md-3 col-sm-4 mb-3 mb-sm-0"
                              style={{ margin: 0 }}
                            >
                              <div
                                style={{
                                  height: "160px",
                                  overflow: "hidden",
                                  borderRadius: "4px",
                                  border: "1px solid #eee",
                                  cursor: "pointer",
                                  position: 'relative'
                                }}
                                onClick={() => handleViewProfile(user)}
                              >
                                <UserCardImageSlider
                                  user={user}
                                  isAccepted={
                                    user.interestStatus === "accepted"
                                  }
                                  height="100%"
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
                                    <div className="badge bg-success p-1 shadow-sm" style={{ fontSize: '8px', borderRadius: '2px', border: '1px solid white' }}>
                                      <i className="fa fa-check-circle"></i>
                                    </div>
                                  )}
                                  {user.isPhoneVerified && (
                                    <div className="badge bg-info text-white p-1 shadow-sm" style={{ fontSize: '8px', borderRadius: '2px', border: '1px solid white' }}>
                                      <i className="fa fa-phone"></i>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Center: Details */}
                            <div className="col-md-9 col-sm-8 d-flex flex-column" style={{ cursor: 'pointer' }} onClick={() => handleViewProfile(user)}>
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

                              {/* Bottom Right: Buttons */}
                              <div className="d-flex justify-content-end gap-2 mt-3">
                                <button
                                  className="btn btn-sm text-white"
                                  style={{
                                    backgroundColor: "#00bcd5", // Cyan matching screenshot
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "6px 15px",
                                    fontWeight: "500",
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
                                  }}
                                  onClick={() => shortListProfile(user)}
                                >
                                  Shortlist Profile
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* No Results Message */}
                {!loading && users.length === 0 && (
                  <div className="text-center py-4">
                    <h4>No profiles found</h4>
                    <p>Try adjusting your search filters</p>
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
                onClick={() => navigate("/user/user-login")}
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

      {/* Enhanced Chat Box */}
      {isChatOpen && selectedUser && (
        <div
          className="chatbox"
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "350px",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            boxShadow: "0 0 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
            overflow: "hidden",
          }}
        >
          <div
            className="chat-header"
            style={{
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderBottom: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={selectedUser.profileImage || "images/default-profile.jpg"}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
                alt={selectedUser.userName}
              />
              <h4 style={{ margin: 0 }}>{selectedUser.userName}</h4>
            </div>
            <span
              className="comm-msg-pop-clo"
              onClick={closeChat}
              style={{
                cursor: "pointer",
                fontSize: "20px",
                color: "#999",
              }}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>

          <div
            className="chat-messages"
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
            }}
          >
            {chatMessages.length === 0 ? (
              <div
                className="chat-welcome"
                style={{
                  textAlign: "center",
                  color: "#999",
                  marginTop: "50%",
                }}
              >
                Start a new conversation with {selectedUser.userName}
              </div>
            ) : (
              chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "10px",
                    textAlign: msg.sender === "me" ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "8px 12px",
                      borderRadius:
                        msg.sender === "me"
                          ? "18px 18px 0 18px"
                          : "18px 18px 18px 0",
                      backgroundColor:
                        msg.sender === "me" ? "#007bff" : "#f1f1f1",
                      color: msg.sender === "me" ? "#fff" : "#333",
                      maxWidth: "80%",
                    }}
                  >
                    {msg.message}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginTop: "4px",
                      textAlign: msg.sender === "me" ? "right" : "left",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          <div
            className="chat-input"
            style={{
              padding: "10px",
              borderTop: "1px solid #eee",
              backgroundColor: "#f8f9fa",
            }}
          >
            <form onSubmit={handleChatSend} style={{ display: "flex" }}>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Type a message..."
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "20px",
                  outline: "none",
                }}
                required
              />
              <button
                type="submit"
                style={{
                  marginLeft: "10px",
                  padding: "10px 15px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Active Chats Indicator */}
      {activeChats.length > 0 && !isChatOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            zIndex: 999,
          }}
          onClick={() => setIsChatOpen(true)}
        >
          <i
            className="fa fa-comments"
            aria-hidden="true"
            style={{ fontSize: "20px" }}
          ></i>
          <span
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "red",
              color: "#fff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            {activeChats.length}
          </span>
        </div>
      )}

      <ToastContainer />
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserSearchResult;
