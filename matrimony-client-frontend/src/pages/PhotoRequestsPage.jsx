import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import dummyProfileImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import { getPhotoRequests, markNotificationsRead } from "../api/axiosService/userAuthService";
import MembershipBadge from "../components/common/MembershipBadge";

const PhotoRequestsPage = () => {
  const [activeTab, setActiveTab] = useState("received");
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        if (currentUserId) {
          const response = await getPhotoRequests(currentUserId);
          if (response.data && response.data.success) {
            setReceivedRequests(response.data.data.received || []);
            setSentRequests(response.data.data.sent || []);
          }
          markNotificationsRead(currentUserId, 'photorequests').catch(console.error);
        }
      } catch (error) {
        console.error("Error fetching photo requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [currentUserId]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

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

  const renderTable = (requests, isReceived) => {
    if (requests.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <i className={`fa ${isReceived ? "fa-envelope-open-o" : "fa-paper-plane-o"} text-4xl mb-3 opacity-30`}></i>
          <p>{isReceived ? "You have no pending photo requests." : "You haven't sent any photo requests yet."}</p>
        </div>
      );
    }

    return (
      <div className="db-inte-prof-list">
        <ul>
          {requests.map((request) => {
            const targetUser = isReceived ? request.requesterId : request.receiverId;
            if (!targetUser) return null;

            return (
              <li key={request._id}>
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
                    <MembershipBadge user={targetUser} isMini={true} />
                  </div>

                  {/* Profile Image */}
                  <img
                    src={targetUser.profileImage || dummyProfileImage}
                    alt={targetUser.userName || targetUser.firstName || 'Profile'}
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
                  {formatDate(request.createdAt)}
                </span>

                <div className="db-int-pro-2">
                  <h5 style={{ margin: 0 }}>{targetUser.agwid || targetUser.avId}</h5>

                  <ol className="poi">
                    <li>
                      Age: <strong>{targetUser.age || "N/A"}</strong>
                    </li>
                    <li>
                      City: <strong>{targetUser.location || targetUser.city || "N/A"}</strong>
                    </li>
                    <li>
                      Profession: <strong>{targetUser.occupation || targetUser.jobType || "N/A"}</strong>
                    </li>
                    <li>
                      Height: <strong>{targetUser.height ? `${targetUser.height} cm` : "N/A"}</strong>
                    </li>
                    <li>
                      Language: <strong>{targetUser.motherTongue || targetUser.language || "N/A"}</strong>
                    </li>
                    <li>
                      Education: <strong>{targetUser.education || targetUser.degree || "N/A"}</strong>
                    </li>
                  </ol>

                  <div style={{ marginTop: "10px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button 
                      style={{ ...btnStyle, backgroundColor: "#f3f4f6", color: "#374151" }} 
                      onClick={() => navigate(`/profile-more-details/${targetUser._id || targetUser.id}`)}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#e5e7eb"; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; }}
                    >
                      <i className="fa fa-user"></i> View Profile
                    </button>
                    {/* Add action buttons (accept/reject) if implemented in future */}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "130px", paddingBottom: "40px" }}>
        <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
            {/* Sidebar */}
            <div className="col-md-3 col-lg-2" style={{ paddingLeft: 0, marginLeft: "0px" }}>
              <UserSideBar />
            </div>

            {/* Main Page Content */}
            <div className="col-md-9 col-lg-10" style={{ paddingLeft: "20px", paddingRight: "15px" }}>
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                  <i className="fa fa-camera text-2xl text-[#58219f]"></i>
                  <h2 className="text-[28px] font-bold text-[#4a2580] font-playfair m-0">Photo Requests</h2>
                </div>

                {/* Custom Tabs UI */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    onClick={() => setActiveTab("received")}
                    className={`py-3 px-6 font-semibold text-sm transition-all relative ${
                      activeTab === "received" 
                        ? "text-[#58219f]" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Photo Requests ({receivedRequests.length})
                    {activeTab === "received" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#58219f]"></div>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab("sent")}
                    className={`py-3 px-6 font-semibold text-sm transition-all relative ${
                      activeTab === "sent" 
                        ? "text-[#58219f]" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Requested by Me ({sentRequests.length})
                    {activeTab === "sent" && (
                      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#58219f]"></div>
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                {loading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="spinner-border text-[#58219f]" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {activeTab === "received" && (
                      <div className="animate-fadeIn">
                        {renderTable(receivedRequests, true)}
                      </div>
                    )}

                    {activeTab === "sent" && (
                      <div className="animate-fadeIn">
                        {renderTable(sentRequests, false)}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PhotoRequestsPage;
