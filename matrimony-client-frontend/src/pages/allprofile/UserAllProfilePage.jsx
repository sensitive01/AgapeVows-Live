import React, { useEffect, useState } from "react";
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

const UserAllProfilePage = () => {
  const userId = localStorage.getItem("userId");
  const [users, setUsers] = useState([]);
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

    if (filters.location && user.city !== filters.location) return false;

    return true;
  });

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

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="all-pro-head">
          <div className="container">
            <div className="row">
              <h1>Lakhs of Happy Marriages</h1>
              <a href="#">
                Join now for Free{" "}
                <i className="fa fa-handshake-o" aria-hidden="true"></i>
              </a>
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
                          <select className="chosen-select">
                            <option value="">Most relative</option>
                            <option value="Men">Date listed: Newest</option>
                            <option value="Men">Date listed: Oldest</option>
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
                    {filteredUsers.map((user) => (
                      <li key={user._id}>
                        <div
                          className={`all-pro-box ${Math.random() > 0.5 ? "user-avil-onli" : ""
                            }`}
                          data-useravil={
                            Math.random() > 0.5 ? "avilyes" : "avilno"
                          }
                          data-aviltxt={
                            Math.random() > 0.5 ? "Available online" : "Offline"
                          }
                        >
                          <div className="pro-img">
                            <a href="#">
                              <img
                                src={
                                  user.profileImage ||
                                  "images/default-profile.jpg"
                                }
                                alt={user.userName}
                                onError={(e) => {
                                  e.target.src = "images/default-profile.jpg";
                                }}
                              />
                            </a>
                            <div
                              className="pro-ave"
                              title="User currently available"
                            >
                              <span
                                className={`pro-ave-${Math.random() > 0.5 ? "yes" : "no"
                                  }`}
                              ></span>
                            </div>
                            <div className="pro-avl-status">
                              {Math.random() > 0.5 ? (
                                <h5>Available Online</h5>
                              ) : (
                                <>
                                  <h5>Last login 10 mins ago</h5>
                                  <span className="marqu">
                                    Last login 10 mins ago | I'll be available
                                    on 10:00 AM
                                  </span>
                                </>
                              )}
                            </div>

                            {/* Image Overlays */}
                            <div className="pro-img-badges" style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              display: 'flex',
                              flexDirection: 'column',
                              gap: '6px',
                              zIndex: 10
                            }}>
                              <MembershipBadge user={user} isMini={true} />
                              {user.idVerificationStatus === 'Verified' && (
                                <div className="badge bg-success border border-white shadow-sm" style={{ padding: '4px 8px', fontSize: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <i className="fa fa-check-circle"></i> ID Verified
                                </div>
                              )}
                              {user.isPhoneVerified && (
                                <div className="badge bg-info text-white border border-white shadow-sm" style={{ padding: '4px 8px', fontSize: '10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <i className="fa fa-phone"></i> Verified Mobile
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pro-detail">
                            <h4>
                              <a href="#" onClick={(e) => handleViewProfile(e, user)}>{user.userName}</a>
                            </h4>
                            <div className="pro-bio">
                              <span>{user.degree || "Not specified"}</span>
                              <span>{user.jobType || "Not specified"}</span>
                              <span>
                                {user.age || "Not specified"} Years old
                              </span>
                              <span>
                                Height: {user.height || "Not specified"}Cms
                              </span>
                            </div>
                            <div className="links">
                              <span
                                className="cta-chat"
                                onClick={() => openChat(user)}
                              >
                                Chat now
                              </span>
                              <a href={`https://wa.me/${user.whatsapp}`}>
                                WhatsApp
                              </a>
                              <a
                                href="#!"
                                className="cta cta-sendint"
                                data-bs-toggle="modal"
                                data-bs-target="#sendInter"
                                onClick={() => setSelectedUser(user)}
                              >
                                Send interest
                              </a>
                              <a href="#" onClick={(e) => handleViewProfile(e, user)}>
                                More details
                              </a>
                            </div>
                          </div>
                          <span
                            className="enq-sav"
                            data-toggle="tooltip"
                            title="Click to save this profile."
                          >
                            <i
                              className="fa fa-thumbs-o-up"
                              aria-hidden="true"
                            ></i>
                          </span>
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

      <ToastContainer />
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserAllProfilePage;
