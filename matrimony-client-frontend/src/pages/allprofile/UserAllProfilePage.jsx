import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import {
  fetchAllUserProfiles,
  fetchAllUserProfilesHome,
  getMyActivePlanData,
} from "../../api/axiosService/userAuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowInterest from "./ShowInterest";
import MembershipBadge from "../../components/common/MembershipBadge";
import UserCardImageSlider from "../../components/common/UserCardImageSlider";

const UserAllProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    age: "",
    religion: "",
    location: "",
    availability: "all",
    profileType: "all",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatMessage, setChatMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChats, setActiveChats] = useState([]);

  const [currentUserPlan, setCurrentUserPlan] = useState(null);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);

  const isPaidUser = useMemo(() => {
    if (!currentUserPlan) return false;
    return currentUserPlan.subscriptionStatus?.toLowerCase() === "active";
  }, [currentUserPlan]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userId) {
          response = await fetchAllUserProfiles(userId);
        } else {
          response = await fetchAllUserProfilesHome();
        }
        if (response.status === 200) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      availability: e.target.id.replace("exav", ""),
    }));
  };

  const handleProfileTypeChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      profileType: e.target.id.replace("exver", ""),
    }));
  };

  const filteredUsers = users.filter((user) => {
    if (filters.gender && user.gender !== filters.gender) return false;

    if (filters.age) {
      const [minAge, maxAge] = filters.age.split(" to ").map(Number);
      if (user.age < minAge || user.age > maxAge) return false;
    }

    if (filters.religion && filters.religion !== "Any" && user.religion !== filters.religion)
      return false;

    if (filters.location && user.city !== filters.location) return false;

    return true;
  });

  const sortedFilteredUsers = useMemo(() => {
    const list = [...filteredUsers];
    if (sortBy === "newest") {
      return list.sort((a, b) => new Date(b.createdAt || b.lastLogin || 0) - new Date(a.createdAt || a.lastLogin || 0));
    }
    if (sortBy === "oldest") {
      return list.sort((a, b) => new Date(a.createdAt || a.lastLogin || 0) - new Date(b.createdAt || b.lastLogin || 0));
    }
    return list;
  }, [filteredUsers, sortBy]);

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

  const handleViewProfile = (e, targetUser) => {
    e.preventDefault();
    if (!userId) {
      window.location.href = "/user/user-login"; // Simple redirect for now
      return;
    }

    // ✅ CHECK PLAN RESTRICTION
    const targetUserActivePlan = targetUser.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const myPlanName = currentUserPlan?.subscriptionType?.toLowerCase() || "";
    const targetPlanName = targetUserActivePlan?.subscriptionType?.toLowerCase() || "";

    console.log("My Plan (AllProfiles):", myPlanName);
    console.log("Target Plan (AllProfiles):", targetPlanName);

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

    window.location.href = `/profile-more-details/${targetUser._id}`;
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
              <div className="col-md-3 fil-mob-view">
                <span className="filter-clo">+</span>
                <div className="filt-com lhs-cate">
                  <h4>
                    <i className="fa fa-search" aria-hidden="true"></i> I'm
                    looking for
                  </h4>
                  <div className="form-group">
                    <select
                      className="chosen-select"
                      name="gender"
                      value={filters.gender}
                      onChange={handleFilterChange}
                    >
                      <option value="">I'm looking for</option>
                      <option value="Male">Men</option>
                      <option value="Female">Women</option>
                    </select>
                  </div>
                </div>
                <div className="filt-com lhs-cate">
                  <h4>
                    <i className="fa fa-clock-o" aria-hidden="true"></i>Age
                  </h4>
                  <div className="form-group">
                    <select
                      className="chosen-select"
                      name="age"
                      value={filters.age}
                      onChange={handleFilterChange}
                    >
                      <option value="">Select age</option>
                      <option value="18 to 30">18 to 30</option>
                      <option value="31 to 40">31 to 40</option>
                      <option value="41 to 50">41 to 50</option>
                      <option value="51 to 60">51 to 60</option>
                      <option value="61 to 70">61 to 70</option>
                      <option value="71 to 80">71 to 80</option>
                      <option value="81 to 90">81 to 90</option>
                      <option value="91 to 100">91 to 100</option>
                    </select>
                  </div>
                </div>
                <div className="filt-com lhs-cate">
                  <h4>
                    <i className="fa fa-bell-o" aria-hidden="true"></i>Select
                    Religion
                  </h4>
                  <div className="form-group">
                    <select
                      className="chosen-select"
                      name="religion"
                      value={filters.religion}
                      onChange={handleFilterChange}
                    >
                      <option value="">Religion</option>
                      <option value="Any">Any</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Muslim">Muslim</option>
                      <option value="Jain">Jain</option>
                      <option value="Christian">Christian</option>
                    </select>
                  </div>
                </div>
                <div className="filt-com lhs-cate">
                  <h4>
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                    Location
                  </h4>
                  <div className="form-group">
                    <select
                      className="chosen-select"
                      name="location"
                      value={filters.location}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Locations</option>
                      <option value="Chennai">Chennai</option>
                      <option value="Bangaluru">Bangaluru</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>
                </div>
                <div className="filt-com lhs-rati lhs-avail lhs-cate">
                  <h4>
                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>{" "}
                    Availablity
                  </h4>
                  <ul>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_avail"
                          className="rating_check"
                          id="exav1"
                          checked={filters.availability === "1"}
                          onChange={handleAvailabilityChange}
                        />
                        <label htmlFor="exav1">All</label>
                      </div>
                    </li>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_avail"
                          className="rating_check"
                          id="exav2"
                          checked={filters.availability === "2"}
                          onChange={handleAvailabilityChange}
                        />
                        <label htmlFor="exav2">Available</label>
                      </div>
                    </li>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_avail"
                          className="rating_check"
                          id="exav3"
                          checked={filters.availability === "3"}
                          onChange={handleAvailabilityChange}
                        />
                        <label htmlFor="exav3">Offline</label>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="filt-com lhs-rati lhs-ver lhs-cate">
                  <h4>
                    <i className="fa fa-shield" aria-hidden="true"></i>Profile
                  </h4>
                  <ul>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_veri"
                          className="rating_check"
                          id="exver1"
                          checked={filters.profileType === "1"}
                          onChange={handleProfileTypeChange}
                        />
                        <label htmlFor="exver1">All</label>
                      </div>
                    </li>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_veri"
                          className="rating_check"
                          id="exver2"
                          checked={filters.profileType === "2"}
                          onChange={handleProfileTypeChange}
                        />
                        <label htmlFor="exver2">Premium</label>
                      </div>
                    </li>
                    <li>
                      <div className="rbbox">
                        <input
                          type="radio"
                          name="expert_veri"
                          className="rating_check"
                          id="exver3"
                          checked={filters.profileType === "3"}
                          onChange={handleProfileTypeChange}
                        />
                        <label htmlFor="exver3">Free</label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="filt-com filt-send-query">
                  <div className="send-query">
                    <h5>What are you looking for?</h5>
                    <p>We will help you to arrange the best match to you.</p>
                    <a href="#!" data-toggle="modal" data-target="#expfrm">
                      Send your queries
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                <div className="short-all">
                  <div className="short-lhs">
                    Showing <b>{filteredUsers.length}</b> profiles
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
                        <div className="sort-grid sort-grid-1">
                          <i className="fa fa-th-large" aria-hidden="true"></i>
                        </div>
                      </li>
                      <li>
                        <div className="sort-grid sort-grid-2 act">
                          <i className="fa fa-bars" aria-hidden="true"></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="all-list-sh">
                  <ul>
                    {sortedFilteredUsers.map((user) => (<li key={user._id} style={{ width: "100%", marginBottom: "20px" }}>
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
                            onClick={(e) => handleViewProfile(e, user)}
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
                              height="100%"
                              onImageClick={(e) => handleViewProfile(e, user)}
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
                          <div className="flex-grow-1" style={{ cursor: 'pointer' }} onClick={(e) => handleViewProfile(e, user)}>
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
                              className="btn btn-sm text-white px-3 py-2"
                              style={{
                                backgroundColor: "#00bcd5", // Cyan matching screenshot
                                border: "none",
                                borderRadius: "4px",
                                fontWeight: "500",
                                whiteSpace: "nowrap"
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleViewProfile(e, user);
                              }}
                            >
                              View Profile
                            </button>

                            <button
                              className="btn btn-sm text-white px-3 py-2"
                              style={{
                                backgroundColor: "#00bcd5", // Cyan matching screenshot
                                border: "none",
                                borderRadius: "4px",
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Send Interest Modal */}
      {selectedUser && (
        <ShowInterest selectedUser={selectedUser} userId={userId} />
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

      {/* Upgrade Popup */}
      {showUpgradePopup && (
        <div className="upgrade-popup">
          <div className="upgrade-content">
            <div className="upgrade-icon">🔒</div>
            <h3>Premium Feature</h3>
            <p>Upgrade your plan to unlock premium features and connect directly with your matches.</p>
            <div className="upgrade-buttons">
              <button onClick={() => navigate("/user/user-plan-selection")} className="upgrade-btn">Upgrade Now</button>
              <button onClick={() => setShowUpgradePopup(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .upgrade-popup { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.65); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(4px); }
        .upgrade-content { background: #fff; padding: 35px 30px; border-radius: 16px; text-align: center; width: 100%; max-width: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); animation: fadeInScale 0.3s ease; }
        .upgrade-icon { font-size: 40px; margin-bottom: 10px; }
        .upgrade-content h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; color: #111; }
        .upgrade-content p { font-size: 0.95rem; color: #666; margin-bottom: 25px; }
        .upgrade-buttons { display: flex; gap: 10px; justify-content: center; }
        .upgrade-btn { background: linear-gradient(135deg, #7c3aed, #6d28d9); color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s; }
        .upgrade-btn:hover { transform: scale(1.05); }
        .cancel-btn { background: #f3f4f6; color: #333; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 0.9rem; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        .all-pro-box > .pro-img-badges { display: none !important; }
      `}</style>

      <ToastContainer />
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserAllProfilePage;
