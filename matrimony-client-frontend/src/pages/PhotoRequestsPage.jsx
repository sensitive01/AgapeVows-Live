import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import Footer from "../components/Footer";
import dummyProfileImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import { getPhotoRequests } from "../api/axiosService/userAuthService";

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
      <div className="table-responsive mt-3 interest-responsive-table" style={{ background: "#fff", borderRadius: "12px", padding: "15px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", border: "1px solid #eaeaea" }}>
        <style>{`
          @media (max-width: 768px) {
            .interest-responsive-table {
              overflow-x: visible !important;
            }
            .interest-responsive-table table, .interest-responsive-table thead, .interest-responsive-table tbody, .interest-responsive-table th, .interest-responsive-table td, .interest-responsive-table tr {
              display: block;
            }
            .interest-responsive-table thead tr {
              display: none;
            }
            .interest-responsive-table tr {
              margin-bottom: 20px;
              border: 1px solid #eaeaea;
              border-radius: 12px;
              padding: 20px 10px 15px 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.05);
              position: relative;
              background: #fff;
            }
            .interest-responsive-table td {
              border: none !important;
              padding: 10px 5px !important;
              text-align: center;
              width: 100% !important;
            }
            .interest-responsive-table td:nth-child(1) {
              display: none;
            }
            .interest-responsive-table td:nth-child(3) > div {
              flex-direction: column !important;
              gap: 5px !important;
            }
            .interest-responsive-table td:nth-child(5) {
              position: static;
              margin-top: 15px;
              width: 100% !important;
              padding: 0 !important;
            }
          }
        `}</style>
        <table className="table align-middle table-hover">
          <thead className="table-light">
            <tr>
              <th scope="col" style={{ width: "5%", color: "#444", fontWeight: "600" }}>S.No</th>
              <th scope="col" style={{ width: "20%", textAlign: "center", color: "#444", fontWeight: "600" }}>Profile</th>
              <th scope="col" style={{ width: "45%", textAlign: "center", color: "#444", fontWeight: "600" }}>Details</th>
              <th scope="col" style={{ width: "15%", color: "#444", fontWeight: "600" }}>Date</th>
              <th scope="col" style={{ width: "15%", textAlign: "center", color: "#444", fontWeight: "600" }}>Actions</th>
            </tr>
          </thead>
          <tbody style={{ borderTop: "none" }}>
            {requests.map((request, index) => {
              const targetUser = isReceived ? request.requesterId : request.receiverId;
              if (!targetUser) return null;

              return (
                <tr key={request._id}>
                  <td style={{ fontWeight: "500", color: "#666", padding: "2px 8px" }}>{index + 1}</td>
                  
                  {/* Profile Section */}
                  <td style={{ padding: "2px 8px", textAlign: "center", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: 0, margin: 0 }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", width: "110px", height: "110px", minWidth: "110px", flexShrink: 0, padding: 0, margin: 0 }}>
                        <img
                          src={targetUser.profileImage || dummyProfileImage}
                          alt={targetUser.userName || targetUser.firstName || 'Profile'}
                          style={{ display: "block", width: "110px", height: "110px", minWidth: "110px", minHeight: "110px", objectFit: "cover", borderRadius: "50%", border: "none", padding: 0, margin: 0 }}
                          onError={(e) => { e.target.onerror = null; e.target.src = dummyProfileImage; }}
                        />
                      </div>
                      <h5 style={{ margin: 0, padding: 0, fontSize: "1rem", fontWeight: "700", color: "#4a2580", textAlign: "center", width: "100%", display: "block" }}>
                        {targetUser.agwid || targetUser.avId}
                      </h5>
                    </div>
                  </td>

                  {/* Details Section */}
                  <td style={{ color: "#555", fontSize: "0.85rem", padding: "2px 8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Age:</strong> {targetUser.age || "N/A"} yrs</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Location:</strong> {targetUser.location || "N/A"}</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Education:</strong> {targetUser.education || "N/A"}</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Job:</strong> {targetUser.occupation || "N/A"}</div>
                      <div style={{ whiteSpace: "nowrap" }}><strong>Religion:</strong> {targetUser.religion || targetUser.caste || "N/A"}</div>
                    </div>
                  </td>

                  {/* Date Section */}
                  <td style={{ color: "#888", fontSize: "0.85rem", whiteSpace: "nowrap", padding: "2px 8px" }}>
                    {formatDate(request.createdAt)}
                  </td>

                  {/* Actions Section */}
                  <td style={{ overflow: "visible", padding: "2px 8px" }}>
                    <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                      <button 
                        style={{ ...btnStyle, backgroundColor: "#f3f4f6", color: "#374151" }} 
                        onClick={() => navigate(`/profile-more-details/${targetUser._id || targetUser.id}`)}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#e5e7eb"; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#f3f4f6"; }}
                      >
                        <i className="fa fa-user"></i> View Profile
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 min-h-[500px]">
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
