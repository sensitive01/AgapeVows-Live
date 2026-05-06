import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import ShowInterest from "./ShowInterest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTheProfieMoreDetails, getUserProfile, getMyActivePlanData, sendChatMessage, submitReport } from "../../api/axiosService/userAuthService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { io } from "socket.io-client";
import ChatUi from "./ChatUi";
import { faChurch, faHeart, faBriefcase, faInfoCircle, faUsers, faAddressCard, faMusic, faVideo } from '@fortawesome/free-solid-svg-icons';
import profImage from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";

// Helper Components
const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div className="info-row">
      <span className="info-label">{label}:</span>
      <span className="info-value">{value}</span>
    </div>
  );
};

const ProfileSection = ({ title, icon, children }) => (
  <div className="profile-section card">
    <h4 className="profile-section-title">
      <FontAwesomeIcon icon={icon} style={{ color: "#7c3aed" }} />
      {title}
    </h4>
    <div className="profile-section-content">{children}</div>
  </div>
);

const VideoCard = ({ videoUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoUrl) return null;

  return (
    <>
      <div
        className="video-card"
        onClick={() => setIsOpen(true)}
      >
        <video
          src={videoUrl}
          muted
          className="video-thumb"
        />
        <div className="video-label">
          SelfIntroduction.mp4
        </div>
      </div>

      {isOpen && (
        <div className="video-modal" onClick={() => setIsOpen(false)}>
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoUrl}
              controls
              autoPlay
              className="video-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

const MoreDetails = () => {
  const { profileId } = useParams();
  const chipStyle = {
  background: "#f3f4f6",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "0.9rem",
  fontWeight: "500",
  color: "#333",
  display: "flex",
  alignItems: "center",
  gap: "5px",
};
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem("userId");

  const [userInfo, setUserInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [showInterestModalUser, setShowInterestModalUser] = useState(null);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [loadingUser, setLoadingUser] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportComments, setReportComments] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!reportReason) {
      toast.error("Please select a reason for reporting");
      return;
    }

    setIsReporting(true);
    try {
      const reportData = {
        reporterId: currentUserId,
        reportedUserId: profileId,
        reason: reportReason,
        comments: reportComments,
      };

      const res = await submitReport(reportData);
      if (res.status === 201 || res.data.success) {
        toast.success("User reported and blocked successfully. They will appear in your Blocked section.");
        setShowReportModal(false);
        setReportReason("");
        setReportComments("");
        
        // Optionally redirect to blocked profiles page
        setTimeout(() => {
          navigate("/user/blocked-profiles-page");
        }, 2000);
      }
    } catch (err) {
      console.error("Error reporting user:", err);
      toast.error("Failed to submit report. Please try again later.");
    } finally {
      setIsReporting(false);
    }
  };

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  // Chat States
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_ROUTE;

  // Socket
  useEffect(() => {
    if (!currentUserId || !baseUrl) return;
    const newSocket = io(baseUrl, {
      query: { userId: currentUserId },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
    });

    newSocket.on("receive_message", (message) => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: message.id,
          senderId: message.senderId,
          sender: message.senderId === currentUserId ? "user" : "profile",
          text: message.text,
          message: message.text,
          timestamp: new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    });

    newSocket.on("users_online", (userIds) => setOnlineUsers(userIds));
    newSocket.on("user_joined", (id) => setOnlineUsers((prev) => [...prev, id]));
    newSocket.on("user_left", (id) => setOnlineUsers((prev) => prev.filter(uid => uid !== id)));

    return () => newSocket.close();
  }, [currentUserId, baseUrl]);

  // Fetch current logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getUserProfile(currentUserId);
        if (res.status === 200) {
          setCurrentUser(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchCurrentUser();
  }, [currentUserId]);

  const isPaidUser = useMemo(() => {
    if (!currentUser) return false;
    if (!currentUser.isAnySubscriptionTaken) return false;
    return currentUser.paymentDetails?.some(p => p.subscriptionStatus?.toLowerCase() === "active");
  }, [currentUser]);

  // Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      if (!profileId) return;
      try {
        const response = await getTheProfieMoreDetails(profileId, currentUserId);
        if (response.status === 200) {
          setUserInfo(response.data.data);
          window.dispatchEvent(new Event("planUpdated"));
        }
      } catch (err) {
        if (err.response && err.response.status === 403) {
          const errMsg = err.response.data?.message || "Limit Reached";
          toast.error(errMsg, { position: "top-center" });
          setTimeout(() => navigate(-1), 1500);
        } else {
          console.error("Error fetching profile details:", err);
        }
      }
    };
    fetchProfile();
  }, [profileId]);

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleShowInterestClick = () => {
    setShowInterestModalUser(userInfo);
  };

  if (loadingUser) return null;

  const handleContactClick = () => {
    if (!isPaidUser) {
      setShowUpgradePopup(true);
    } else {
      setShowContact(true);
    }
  };

  const handleStartChat = async () => {
    try {
      if (isPaidUser) {
        setIsChatOpen(true);
        if (socket && userInfo?._id) {
          const roomId = `chat_${[currentUserId, userInfo._id].sort().join("_")}`;
          socket.emit("join_chat_room", { roomId });
        }
      } else {
        handleContactClick();
      }
    } catch (error) {
      alert("Please subscribe to your plan.");
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !userInfo?._id) return;
    try {
      const messageData = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        text: newMessage,
        senderId: currentUserId,
        recipientId: userInfo._id,
        roomId: `chat_${[currentUserId, userInfo._id].sort().join("_")}`,
        timestamp: new Date().toISOString(),
      };
      const tempMessage = {
        id: messageData.id,
        senderId: currentUserId,
        sender: "user",
        text: newMessage,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setChatMessages((prev) => [...prev, tempMessage]);
      if (socket) socket.emit("send_message", messageData);
      await sendChatMessage(currentUserId, tempMessage, userInfo._id);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="fixed-header">
        <LayoutComponent />
      </div>

      <div className="profile-content">
        <div className="profile-grid container-fluid">
          {/* Left Column */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-image-wrapper">
                <img
                  src={userInfo?.profileImage || profImage}
                  alt="Profile"
                  className="profile-image"
                />
                <div className="zoom-btn" title="Zoom" onClick={() => setZoomImage(userInfo?.profileImage || profImage)}>
                  <i className="fa fa-search-plus"></i>
                </div>

                {/* Overlays */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  zIndex: 10
                }}>
                  {userInfo?.isAnySubscriptionTaken && (
                    <div className="badge bg-warning text-dark border border-white shadow-sm" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa fa-star"></i> PREMIUM
                    </div>
                  )}
                  {userInfo?.idVerificationStatus === 'Verified' && (
                    <div className="badge bg-success border border-white shadow-sm" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa fa-check-circle"></i> ID VERIFIED
                    </div>
                  )}
                  {userInfo?.isPhoneVerified && (
                    <div className="badge bg-info text-white border border-white shadow-sm" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <i className="fa fa-phone"></i> MOBILE VERIFIED
                    </div>
                  )}
                </div>
              </div>

             
              <button
                className="interest-btn"
                onClick={(e) => {
                  if (!isPaidUser) {
                    setShowUpgradePopup(true);
                    return;
                  }
                  handleShowInterestClick();
                }}
                {...(isPaidUser && {
                  "data-bs-toggle": "modal",
                  "data-bs-target": "#sendInter",
                })}
              >
                Send Interest
              </button>

               {/* View Contact Information Button moved immediately below profile picture */}
              {!showContact && (
                <button
                  onClick={handleContactClick}
                  className="view-contact-btn"
                  style={{ width: "100%", marginBottom: "10px" }}
                >
                  View Contact Information
                </button>
              )}
              {/* Contact Details in LEFT COLUMN */}
{showContact && (
  <div style={{ width: "100%", marginTop: "10px" }}>
    <div style={{ ...chipStyle, width: "100%" }}>
      👤 {userInfo?.userName}
    </div>

    <div style={{ ...chipStyle, width: "100%" }}>
      📞 {userInfo?.userMobile}
    </div>

    {userInfo?.alternateMobile && (
      <div style={{ ...chipStyle, width: "100%" }}>
        📱 {userInfo?.alternateMobile}
      </div>
    )}

    {userInfo?.userEmail && (
      <div style={{ ...chipStyle, width: "100%" }}>
        📧 {userInfo?.userEmail}
      </div>
    )}

    {userInfo?.city && (
      <div style={{ ...chipStyle, width: "100%" }}>
        📍 {userInfo?.city}, {userInfo?.state}
      </div>
    )}
  </div>
)}
              
              <button
                onClick={() => setShowReportModal(true)}
                className="report-user-btn"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  padding: "10px 0",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fecaca";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fee2e2";
                }}
              >
                <i className="fa fa-flag"></i> Report User
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-right">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <div className="agv-id" style={{ marginBottom: "0", display: 'flex', alignItems: 'center', gap: '10px' }}>
                AV ID: {userInfo?.agwid || "N/A"}
                <div className="d-flex gap-2 ms-2">
                  {userInfo?.isAnySubscriptionTaken && (
                    <span className="badge rounded-pill bg-warning text-dark" style={{ fontSize: '12px', padding: '5px 12px' }}>
                      <i className="fa fa-star me-1"></i>Premium
                    </span>
                  )}
                  {userInfo?.idVerificationStatus === 'Verified' && (
                    <span className="badge rounded-pill bg-success" style={{ fontSize: '12px', padding: '5px 12px' }}>
                      <i className="fa fa-check-circle me-1"></i>ID Verified
                    </span>
                  )}
                  {userInfo?.isPhoneVerified && (
                    <span className="badge rounded-pill bg-info text-white" style={{ fontSize: '12px', padding: '5px 12px' }}>
                      <i className="fa fa-phone me-1"></i>Phone Verified
                    </span>
                  )}
                </div>
              </div>
              <button
                className="start-chat-top-btn"
                onClick={handleStartChat}
              >
                Start Chat
              </button>
            </div>

            {/* Profile Snippet at top */}
            {userInfo && (
             <div
  style={{
    background: "#fff",
    padding: "15px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
    marginBottom: "25px",
    borderLeft: "4px solid #7c3aed",
  }}
>
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    }}
  >
    {calculateAge(userInfo?.dateOfBirth) && (
      <span style={chipStyle}>
        🎂 {calculateAge(userInfo.dateOfBirth)} yrs
      </span>
    )}

    {userInfo?.height && (
      <span style={chipStyle}>
        📏 {userInfo.height}
      </span>
    )}

    {userInfo?.motherTongue && (
      <span style={chipStyle}>
        🗣 {userInfo.motherTongue}
      </span>
    )}

    {userInfo?.occupation && (
      <span style={chipStyle}>
        💼 {userInfo.occupation}
      </span>
    )}

    {userInfo?.annualIncome && (
      <span style={chipStyle}>
        💰 {userInfo.annualIncome}
      </span>
    )}

    {userInfo?.caste && (
      <span style={chipStyle}>
        🧬 {userInfo.caste}
      </span>
    )}

    {userInfo?.fathersNative && (
      <span style={chipStyle}>
        📍 {userInfo.fathersNative}
      </span>
    )}

    {userInfo?.maritalStatus && (
      <span style={chipStyle}>
        💍 {userInfo.maritalStatus}
      </span>
    )}

    {userInfo?.education && (
      <span style={chipStyle}>
        🎓 {userInfo.education}
      </span>
    )}

    {userInfo?.religion && (
      <span style={chipStyle}>
        ⛪ {userInfo.religion}
      </span>
    )}
  </div>
</div>
            )}

            {userInfo?.aboutMe && (
              <div className="about-me card">
                <h4>About Me</h4>
                <p>{userInfo.aboutMe}</p>
              </div>
            )}
{/* 
          {userInfo?.selfIntroductionVideo &&
 userInfo.selfIntroductionVideo.trim() !== "" && (
  <div className="profile-section card">
    <h4>Self Introduction Video</h4>
    <VideoCard
      videoUrl={userInfo.selfIntroductionVideo}
    />
  </div>
)} */}

{userInfo?.selfIntroductionVideo &&
 userInfo.selfIntroductionVideo.trim() !== "" && (
  <ProfileSection title="Self Introduction Video" icon={faVideo}>
    <VideoCard videoUrl={userInfo.selfIntroductionVideo} />
  </ProfileSection>
)}
            {/* Profile Sections */}
            {[
              {
                title: "Basic Details",
                icon: faInfoCircle,
                data: [
                  { label: "Profile Created By", value: userInfo?.profileCreatedFor },
                  { label: "Age", value: userInfo?.dateOfBirth ? `${calculateAge(userInfo.dateOfBirth)} years` : null },
                  { label: "Body Type", value: userInfo?.bodyType },
                  { label: "Physical Status", value: userInfo?.physicalStatus },
                  { label: "Complexion", value: userInfo?.complexion },
                  { label: "Height", value: userInfo?.height },
                  { label: "Weight", value: userInfo?.weight },
                  { label: "Marital Status", value: userInfo?.maritalStatus },
                  { label: "Eating Habits", value: userInfo?.eatingHabits },
                   { label: "Drinking Habits", value: userInfo?.drinkingHabits },
                    { label: "Smoking Habits", value: userInfo?.smokingHabits },
                     { label: "Mother Tongue", value: userInfo?.motherTongue },
                      { label: "Caste", value: userInfo?.caste },
                ],
              },
              {
                title: "Family Details",
                icon: faUsers,
                data: [
                  { label: "Father's Name", value: userInfo?.fathersName },
                  { label: "Mother's Name", value: userInfo?.mothersName },
                  { label: "Father's Occupation", value: userInfo?.fathersOccupation },
                  { label: "Mother's Occupation", value: userInfo?.mothersOccupation },
                  { label: "Father's Native ", value: userInfo?.fathersNative },
                   { label: "Mother's Native ", value: userInfo?.mothersNative },
                  { label: "Family Value", value: userInfo?.familyValue },
                  { label: "Family Type", value: userInfo?.familyType },
                  { label: "No. of Brothers", value: userInfo?.numberOfBrothers },
                  { label: "No. of Sisters", value: userInfo?.numberOfSisters },
                  { label: "Residence Type", value: userInfo?.residenceType },
                  { label: "Family Status", value: userInfo?.familyStatus },
                ],
              },
              {
                title: "Religious Information",
                icon: faChurch,
                data: [
                  { label: "Religion", value: userInfo?.religion },
                  { label: "Denomination", value: userInfo?.denomination },
                  { label: "Church", value: userInfo?.church },
                  { label: "Church Activity", value: userInfo?.churchActivity },
                  { label: "Pastor's Name", value: userInfo?.pastorsName },
                  { label: "Spirituality", value: userInfo?.spirituality },
                  { label: "Religious Detail", value: userInfo?.religiousDetail },
                ],
              },
              {
                title: "Professional Information",
                icon: faBriefcase,
                data: [
                  { label: "Education", value: userInfo?.education },
                  { label: "Additional Education", value: userInfo?.additionalEducation },
                  { label: "College/Institution", value: userInfo?.college },
                  { label: "Education in Detail", value: userInfo?.educationDetail },
                  { label: "Employment Type", value: userInfo?.employmentType },
                  { label: "Occupation", value: userInfo?.occupation },
                  { label: "Position", value: userInfo?.position },
                  { label: "Company Name", value: userInfo?.companyName },
                  { label: "Annual Income", value: userInfo?.annualIncome },
                ],
              },
              // {
              //   title: "Contact Information",
              //   icon: faAddressCard,
              //   data: showContact
              //     ? [
              //         { label: "Name", value: userInfo?.userName },
              //         { label: "Mobile Number", value: userInfo?.userMobile },
              //       { label: "Alternate Mobile", value: userInfo?.alternateMobile },
              //       { label: "Landline", value: userInfo?.landlineNumber },
              //       { label: "Email", value: userInfo?.userEmail },
              //       { label: "Current Address", value: userInfo?.currentAddress },
              //       { label: "Permanent Address", value: userInfo?.permanentAddress },
              //       { label: "City", value: userInfo?.city },
              //       { label: "State", value: userInfo?.state },
              //       { label: "Pincode", value: userInfo?.pincode },
              //       { label: "Citizen Of", value: userInfo?.citizenOf },
              //     ]
              //     : [],
              // },
              {
                title: "Lifestyle & Hobbies",
                icon: faMusic,
                data: [
                  { label: "Hobbies", value: Array.isArray(userInfo?.hobbies) ? userInfo.hobbies.join(", ") : userInfo?.hobbies },
                  { label: "Interests", value: userInfo?.interests },
                  { label: "Music", value: userInfo?.music },
                  { label: "Favourite Reads", value: userInfo?.favouriteReads },
                  { label: "Favourite Cuisines", value: userInfo?.favouriteCuisines },
                  { label: "Sports/Activities", value: userInfo?.sportsActivities },
                  { label: "Dress Styles", value: userInfo?.dressStyles },
                ],
              },
              {
                title: "Partner Preferences",
                icon: faHeart,
                data: [
                  { label: "Age Range", value: userInfo?.partnerAgeFrom && userInfo?.partnerAgeTo ? `${userInfo.partnerAgeFrom} - ${userInfo.partnerAgeTo} Years` : null },
                  { label: "Height", value: userInfo?.partnerHeight ? `${userInfo.partnerHeight} cm` : null },
                  { label: "Marital Status", value: userInfo?.partnerMaritalStatus },
                  { label: "Mother Tongue", value: userInfo?.partnerMotherTongue },
                  { label: "Caste", value: userInfo?.partnerCaste },
                  { label: "Physical Status", value: userInfo?.partnerPhysicalStatus },
                  { label: "Eating Habits", value: userInfo?.partnerEatingHabits },
                  { label: "Drinking Habits", value: userInfo?.partnerDrinkingHabits },
                  { label: "Smoking Habits", value: userInfo?.partnerSmokingHabits },
                  { label: "Denomination", value: userInfo?.partnerDenomination },
                  { label: "Spirituality", value: userInfo?.partnerSpirituality },
                  { label: "Education", value: userInfo?.partnerEducation },
                  { label: "Employment Type", value: userInfo?.partnerEmploymentType },
                  { label: "Occupation", value: userInfo?.partnerOccupation },
                  { label: "Annual Income", value: userInfo?.partnerAnnualIncome },
                  { label: "Country", value: userInfo?.partnerCountry },
                  { label: "State", value: userInfo?.partnerState },
                  { label: "District", value: userInfo?.partnerDistrict },
                ],
              },
            ].map((section, idx) => (
              <React.Fragment key={idx}>

               <ProfileSection title={section.title} icon={section.icon}>
  <div className="profile-section-grid">
    <div>
      {section.data.slice(0, 7).map((item, i) => (
        <InfoRow key={i} {...item} />
      ))}
    </div>

    <div>
      {section.data.slice(7, 14).map((item, i) => (
        <InfoRow key={i} {...item} />
      ))}
    </div>
  </div>
</ProfileSection>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Show Interest Modal */}
      {showInterestModalUser && (
        <ShowInterest
          selectedUser={showInterestModalUser}
          userId={userInfo?._id}
          onSuccess={() => alert("Interest sent successfully!")}
        />
      )}

      {/* Zoom Image Modal */}
      {zoomImage && (
        <div className="zoom-overlay" onClick={() => { setZoomImage(null); setZoomLevel(1); }}>
          <div className="zoom-image-wrapper" onClick={(e) => e.stopPropagation()}>
            <img src={zoomImage} alt="Zoomed" style={{ transform: `scale(${zoomLevel})` }} />
            <div className="zoom-controls">
              <button onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.2))}>-</button>
              <button onClick={() => setZoomLevel(1)}>Reset</button>
              <button onClick={() => setZoomLevel((z) => Math.min(3, z + 0.2))}>+</button>
            </div>
          </div>
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

      {/* Report Modal */}
      {showReportModal && (
        <div className="upgrade-popup">
          <div className="upgrade-content" style={{ maxWidth: "450px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 style={{ margin: 0, color: "#dc2626" }}>Report User</h3>
              <button 
                onClick={() => setShowReportModal(false)}
                style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleReportSubmit} style={{ textAlign: "left" }}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
                  Reason for Reporting
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.95rem"
                  }}
                  required
                >
                  <option value="">Select a reason</option>
                  <option value="Inappropriate profile picture">Inappropriate profile picture</option>
                  <option value="Fake profile">Fake profile</option>
                  <option value="Misleading information">Misleading information</option>
                  <option value="Abusive behavior">Abusive behavior</option>
                  <option value="Spam/Promotional content">Spam/Promotional content</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontWeight: "600", color: "#374151" }}>
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={reportComments}
                  onChange={(e) => setReportComments(e.target.value)}
                  placeholder="Provide more details about why you are reporting this user..."
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    fontSize: "0.95rem",
                    minHeight: "100px",
                    resize: "vertical"
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    color: "#374151",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isReporting}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#dc2626",
                    color: "#fff",
                    fontWeight: "600",
                    cursor: isReporting ? "not-allowed" : "pointer",
                    opacity: isReporting ? 0.7 : 1
                  }}
                >
                  {isReporting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
      {/* <CopyRights /> */}
      <ToastContainer />

      {/* Chat Ui */}
      {isChatOpen && userInfo && (
        <ChatUi
          setIsChatOpen={setIsChatOpen}
          handleChatSubmit={handleChatSubmit}
          profileData={{
            userName: userInfo.userName,
            profileImage: userInfo.profileImage || "images/profiles/2.jpg",
            receiverId: userInfo._id,
            isOnline: onlineUsers.includes(userInfo._id),
          }}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          socket={socket}
          userId={currentUserId}
          setChatMessages={setChatMessages}
          onReportUser={() => setShowReportModal(true)}
        />
      )}

      {/* Styles */}
      <style>{`
        .profile-page { min-height: 100vh; background: #f9fafb; font-family: 'Inter', sans-serif; }
        .fixed-header { top: 0; left: 0; right: 0; z-index: 50; position: fixed; }
        .profile-content { padding-top: 200px; padding-bottom: 100px; }
        .profile-grid { display: flex; gap: 30px; }
        .profile-left {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: auto; /* let it shrink to fit content */
}
        .profile-right { flex: 2.5; }
        .profile-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); width: 100%; max-width: 320px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .profile-image-wrapper { position: relative; width: 100%; }
        .profile-image { width: 100%; border-radius: 12px; object-fit: cover; }
        .zoom-btn { position: absolute; top: 10px; right: 10px; background: #7c3aed; color: #fff; border-radius: 50%; padding: 6px 10px; cursor: pointer; font-size: 1.1rem; }
        .interest-btn { width: 100%; background: #7c3aed; color: #fff; border-radius: 8px; padding: 12px 0; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .interest-btn.disabled { background: #999; cursor: not-allowed; opacity: 0.6; }
        .agv-id { text-align: center; background: rgba(124, 58, 237, 0.85); color: #fff; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 1rem; }
        .start-chat-top-btn { background: #3b82f6; color: #fff; padding: 10px 24px; border-radius: 20px; font-weight: 600; cursor: pointer; border: none; font-size: 1rem; transition: background 0.2s; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
        .start-chat-top-btn:hover { background: #2563eb; }
        .about-me { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); margin-bottom: 25px; }
        .about-me h4 { color: #7c3aed; margin-bottom: 10px; }
        .video-card {
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid #e5e7eb;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  background: #f9fafb;
  width: 240px;
}

.video-thumb {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.video-label {
  font-size: 14px;
  font-weight: 500;
}

.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.video-modal-content {
  background: #fff;
  padding: 15px;
  border-radius: 12px;
  width: 320px;
  height: 500px;
}

.video-full {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
        .info-row { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
        .info-label { color: #666; font-weight: 500; min-width: 180px; }
        .info-value { color: #333; font-weight: 600; flex: 1; word-break: break-word; }
        .profile-section.card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 25px; }
        .profile-section-title { margin-bottom: 15px; display: flex; align-items: center; gap: 10px; font-size: 1.1rem; font-weight: 600; color: #333; }
.profile-snippet-card {
  background: #fff;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.05);
  margin-bottom: 25px;
  border-left: 4px solid #7c3aed;
}

.snippet-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
}

        .profile-section-grid {
  display: flex;
  gap: 50px;
}

.profile-section-grid > div {
  flex: 1;
}
        .zoom-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 10000; cursor: zoom-out; }
        .zoom-image-wrapper { position: relative; }
        .zoom-image-wrapper img { max-width: 100vw; max-height: 90vh; border-radius: 12px; transition: transform 0.2s ease; cursor: grab; }
        .zoom-controls { position: absolute; bottom: -60px; display: flex; gap: 15px; justify-content: center; width: 100%; }
        .zoom-controls button { padding: 10px 15px; font-size: 1.2rem; border-radius: 8px; border: none; background: #7c3aed; color: #fff; cursor: pointer; font-weight: 600; }
        .contact-btn-wrapper { margin-bottom: 15px; }
        .view-contact-btn { background: #7c3aed; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; }
        .view-contact-btn:hover { background: #6d28d9; }
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
      `}</style>
    </div>
  );
};

export default MoreDetails;


