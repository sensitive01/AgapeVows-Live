import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import ShowInterest from "./ShowInterest";
import RelatedProfiles from "./RelatedProfiles";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTheProfieMoreDetails, getUserProfile, viewContactDetails, sendChatMessage, submitReport, isUserMadeTheInterest, saveTheProfileAsShortlisted, getShortListedProfileData, removeShortlistedProfile, sendPhotoRequest } from "../../api/axiosService/userAuthService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { showAlert, confirmAction } from "../../utils/alertService";

import { faChurch, faHeart, faBriefcase, faInfoCircle, faUsers, faAddressCard, faMusic, faVideo, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import profImage from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";

// Helper Components
const InfoRow = ({ label, value }) => {
  let displayValue = value;

  if (Array.isArray(value)) {
    displayValue = value.length > 0 ? value.join(", ") : null;
  } else if (typeof value === 'string' && value.trim() === '') {
    displayValue = null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        padding: "10px 0",
      }}
    >
      <span
        className="font-source text-[16px]"
        style={{
          color: "#4b5563",
          flex: "1 1 45%",
          paddingRight: "10px"
        }}
      >
        {label}
      </span>
      <span
        className="font-source font-bold text-[16px]"
        style={{
          color: "#111827",
          wordBreak: "break-word",
          flex: "1 1 55%",
        }}
      >
        {displayValue || "Not Specified"}
      </span>
    </div>
  );
};

const ProfileSection = ({ title, icon, children }) => (
  <div className="col-12 mb-4">
    <div
      style={{
        padding: "30px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#58219f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <FontAwesomeIcon icon={icon} style={{ color: "#fff", fontSize: "1.1rem" }} />
        </div>
        <div style={{ position: "relative", paddingBottom: "6px" }}>
          <h4
            className="font-source font-bold text-[24px]"
            style={{ color: "#58219f", margin: 0 }}
          >
            {title}
          </h4>
          <span style={{ position: "absolute", bottom: 0, left: 0, width: "35px", height: "3px", background: "#58219f", borderRadius: "2px" }}></span>
        </div>
      </div>
      <div className="profile-section-content">{children}</div>
    </div>
  </div>
);



const MoreDetails = () => {
  const { profileId } = useParams();
  const chipStyle = {
    background: "#f3f4f6",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "16px",
    fontFamily: "'Source Sans 3', sans-serif",
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
  const [isContactLoading, setIsContactLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [upgradePopupType, setUpgradePopupType] = useState('premium');
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [reportComments, setReportComments] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [interestStatus, setInterestStatus] = useState(null);
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [isShortlisting, setIsShortlisting] = useState(false);
  const [isPhotoRequested, setIsPhotoRequested] = useState(() => {
    return localStorage.getItem(`photoRequested_${profileId}`) === "true";
  });

  const handleRequestPhoto = async () => {
    try {
      const res = await sendPhotoRequest(currentUserId, profileId);
      if (res.data && res.data.success) {
        setIsPhotoRequested(true);
        localStorage.setItem(`photoRequested_${profileId}`, "true");
        toast.success("Photo requested successfully!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message === "Photo request already sent") {
        setIsPhotoRequested(true);
        localStorage.setItem(`photoRequested_${profileId}`, "true");
        toast.info("Photo request already sent");
      } else {
        toast.error("Failed to request photo");
      }
    }
  };

  useEffect(() => {
    setIsShortlisted(false);
    const fetchShortlistStatus = async () => {
      if (currentUserId && profileId) {
        try {
          const response = await getShortListedProfileData(currentUserId);
          if (response.data && response.data.success) {
            const shortlistData = Array.isArray(response.data.data?.shortlistedByYou) ? response.data.data.shortlistedByYou : [];
            const listed = shortlistData.some(p => p.profileId === profileId || p._id === profileId);
            setIsShortlisted(listed);
          }
        } catch (error) {
          console.error("Error fetching shortlist status", error);
        }
      }
    };
    fetchShortlistStatus();
  }, [currentUserId, profileId]);

  useEffect(() => {
    setInterestStatus(null);
    const fetchInterestStatus = async () => {
      if (currentUserId && profileId) {
        try {
          const response = await isUserMadeTheInterest(currentUserId, profileId);
          if (response.data && response.data.success) {
            setInterestStatus(response.data.status);
          }
        } catch (error) {
          console.error("Error fetching interest status", error);
        }
      }
    };
    fetchInterestStatus();
  }, [currentUserId, profileId]);

  const allImages = useMemo(() => {
    if (!userInfo) return [];
    const images = [];
    if (userInfo.profileImage) {
      images.push(userInfo.profileImage);
    }
    if (userInfo.additionalImages && userInfo.additionalImages.length > 0) {
      images.push(...userInfo.additionalImages);
    }
    const unique = [...new Set(images)];
    return unique.length > 0 ? unique : [profImage];
  }, [userInfo]);

  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (allImages.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? allImages.length - 1 : prev - 1
      );
    }
  };

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

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
          showAlert({
            title: "Limit Reached",
            text: errMsg,
            icon: "error",
          });
          setTimeout(() => navigate("/user/user-plan-selection"), 1500);
        } else {
          console.error("Error fetching profile details:", err);
        }
      }
    };
    fetchProfile();
  }, [profileId, currentUserId, navigate]);

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
    setTimeout(() => {
      const modalElement = document.getElementById("sendInter");
      if (modalElement && window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElement);
        modal.show();
      }
    }, 50);
  };

  if (loadingUser) return null;

  const handleContactClick = async () => {
    if (!isPaidUser) {
      setUpgradePopupType('premium');
      setShowUpgradePopup(true);
      return;
    }
    setIsContactLoading(true);
    try {
      const response = await viewContactDetails(profileId, currentUserId);
      if (response?.data?.success) {
        setShowContact(true);
        window.dispatchEvent(new Event("planUpdated"));
      }
    } catch (err) {
      setUpgradePopupType('limit');
      setShowUpgradePopup(true);
    } finally {
      setIsContactLoading(false);
    }
  };

  const handleShortlistClick = async () => {
    if (isShortlisting) return;

    if (isShortlisted) {
      const isConfirmed = await confirmAction({
        title: 'Remove from Shortlist?',
        text: 'Are you sure you want to remove this profile from your shortlist?',
        confirmButtonText: 'Yes, Remove',
      });
      if (!isConfirmed) return;

      setIsShortlisting(true);
      try {
        const res = await removeShortlistedProfile(profileId, currentUserId);
        if (res.status === 200 || res.data?.success) {
          setIsShortlisted(false);
          toast.success("Profile removed from shortlist!");
        }
      } catch (err) {
        console.error("Error removing shortlisted profile:", err);
        toast.error("Failed to remove profile from shortlist.");
      } finally {
        setIsShortlisting(false);
      }
    } else {
      const isConfirmed = await confirmAction({
        title: 'Shortlist Profile?',
        text: 'Are you sure you want to add this profile to your shortlist?',
        confirmButtonText: 'Yes, Shortlist',
      });
      if (!isConfirmed) return;

      setIsShortlisting(true);
      try {
        const res = await saveTheProfileAsShortlisted(profileId, currentUserId);
        if (res.status === 200 || res.data?.success) {
          setIsShortlisted(true);
          toast.success("Profile Shortlisted!");
        }
      } catch (err) {
        console.error("Error shortlisting profile:", err);
        toast.error("Failed to shortlist profile.");
      } finally {
        setIsShortlisting(false);
      }
    }
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="fixed-header">
        <LayoutComponent />
      </div>

      <div className="profile-content">
        <div className="profile-grid" style={{ paddingLeft: '4%', paddingRight: '4%' }}>
          {/* Left Column */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-image-wrapper" style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden", borderRadius: "8px", background: "#f3f4f6" }}>
                <img
                  src={allImages[currentImageIndex] || profImage}
                  alt="Profile"
                  className="profile-image"
                  onClick={() => setZoomImage(allImages[currentImageIndex] || profImage)}
                  style={{ width: "100%", height: "100%", cursor: "pointer", objectFit: "contain" }}
                />

                {/* Watermark Overlay on the Right Side */}
                <div
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: 0,
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
                      color: "rgba(255, 255, 255, 0.45)",
                      fontFamily: "'Outfit', 'Inter', sans-serif",
                      fontSize: "16px",
                      fontWeight: "600",
                      letterSpacing: "3px",
                      whiteSpace: "nowrap",
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    AgapeVows.com
                  </span>
                </div>

                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "10px",
                        transform: "translateY(-50%)",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.8)"}
                      onMouseLeave={(e) => e.target.style.background = "rgba(0, 0, 0, 0.5)"}
                    >
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button
                      onClick={nextImage}
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        background: "rgba(0, 0, 0, 0.5)",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        width: "35px",
                        height: "35px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 10,
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => e.target.style.background = "rgba(0, 0, 0, 0.8)"}
                      onMouseLeave={(e) => e.target.style.background = "rgba(0, 0, 0, 0.5)"}
                    >
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </>
                )}

                <div className="zoom-btn" title="Zoom" onClick={() => setZoomImage(allImages[currentImageIndex] || profImage)}>
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
                      <i className="fa fa-check-circle"></i> VERIFIED
                    </div>
                  )}

                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                {(!userInfo?.profileImage && (!userInfo?.additionalImages || userInfo.additionalImages.length === 0)) && (
                  <button
                    className="interest-btn font-cormorant font-bold text-[20px]"
                    style={{
                      width: "100%",
                      height: "40px",
                      marginBottom: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      padding: "0",
                      background: isPhotoRequested ? "#10b981" : "#d97706",
                      color: "#fff",
                      border: "none"
                    }}
                    onClick={handleRequestPhoto}
                  >
                    <i className="fa fa-camera me-2"></i>
                    {isPhotoRequested ? "Photo Requested" : "Request Photo"}
                  </button>
                )}
                <button
                  className="interest-btn font-cormorant font-bold text-[20px]"
                  style={{
                    width: "100%",
                    height: "40px",
                    marginBottom: "0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    padding: "0",
                    background: interestStatus ? "#10b981" : "#58219f",
                    color: "#fff",
                    border: "none"
                  }}
                  onClick={(e) => {
                    if (!isPaidUser) {
                      setUpgradePopupType('premium');
                      setShowUpgradePopup(true);
                      return;
                    }
                    handleShowInterestClick();
                  }}
                >
                  <i className="fa fa-envelope-o me-2"></i>
                  {interestStatus ? "Already Interest Sent" : "Send Interest"}
                </button>

                <button
                  onClick={handleShortlistClick}
                  className="shortlist-btn font-cormorant font-bold text-[20px]"
                  style={{
                    width: "100%",
                    height: "40px",
                    marginBottom: "0",
                    background: isShortlisted ? "#10b981" : "#58219f",
                    color: "#ffffff",
                    border: "none",
                    padding: "0",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px"
                  }}
                  disabled={isShortlisting}
                >
                  <i className={`fa ${isShortlisted ? 'fa-heart' : 'fa-heart-o'}`}></i>
                  {isShortlisting ? "Please wait..." : (isShortlisted ? "Profile Shortlisted" : "Shortlist")}
                </button>

                {/* View Contact Information Button moved immediately below profile picture */}
                {!showContact && (
                  <button
                    onClick={handleContactClick}
                    disabled={isContactLoading}
                    className="view-contact-btn font-cormorant font-bold text-[20px]"
                    style={{
                      width: "100%",
                      height: "40px",
                      marginBottom: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      padding: "0",
                      background: "#58219f",
                      color: "#fff",
                      border: "none",
                      opacity: isContactLoading ? 0.7 : 1,
                      cursor: isContactLoading ? "not-allowed" : "pointer"
                    }}
                  >
                    {isContactLoading ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Loading...</>
                    ) : (
                      <><i className="fa fa-user-circle-o me-2"></i> View Contact Information</>
                    )}
                  </button>
                )}
                {/* Contact Details in LEFT COLUMN */}
                {showContact && (
                  <div style={{ width: "100%", marginTop: "4px", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ ...chipStyle, width: "100%", whiteSpace: "nowrap", overflowX: "auto", fontSize: "calc(0.85rem + 2px)", fontWeight: "bold", marginBottom: "5px" }}>
                      👤 User Name: {userInfo?.userName || "Not specified"}
                    </div>

                    <div style={{ height: "2px", background: "#cbd5e1", margin: "2px 0", borderRadius: "2px", width: "100%" }}></div>

                    <div style={{ ...chipStyle, width: "100%", whiteSpace: "nowrap", overflowX: "auto", fontSize: "calc(0.85rem + 2px)" }}>
                      👤 Contact Person: {userInfo?.contactPersonName || "Not specified"}
                    </div>

                    <div style={{ ...chipStyle, width: "100%", whiteSpace: "nowrap", overflowX: "auto", fontSize: "calc(0.85rem + 2px)" }}>
                      🤝 Relationship: {userInfo?.relationship || "Not specified"}
                    </div>

                    <div style={{ ...chipStyle, width: "100%", whiteSpace: "nowrap", overflowX: "auto", fontSize: "calc(0.85rem + 2px)" }}>
                      📞 Phone Number: {userInfo?.contactPhone || "Not specified"}
                    </div>

                    <div style={{ ...chipStyle, width: "100%", whiteSpace: "nowrap", overflowX: "auto", fontSize: "calc(0.85rem + 2px)" }}>
                      📧 Email: {userInfo?.contactEmail || "Not specified"}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowReportModal(true)}
                className="report-user-btn font-cormorant font-bold text-[20px]"
                style={{
                  width: "100%",
                  height: "40px",
                  marginTop: "0px",
                  background: "#fee2e2",
                  color: "#dc2626",
                  border: "1px solid #fecaca",
                  padding: "0",
                  borderRadius: "8px",
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
              <div
                className="font-cormorant"
                style={{
                  background: "#58219f",
                  color: "#fff",
                  padding: "4px 16px",
                  borderRadius: "18px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  lineHeight: "1",
                  fontVariantNumeric: "lining-nums",
                }}
              >
                AV ID: {userInfo?.agwid || "N/A"}
                <div className="d-flex gap-2">
                  {userInfo?.isAnySubscriptionTaken && (
                    <span className="badge rounded-pill text-dark font-source" style={{ backgroundColor: "#facc15", fontSize: '13px', fontWeight: '500', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', height: 'fit-content' }}>
                      <i className="fa fa-star"></i>Premium
                    </span>
                  )}
                  {userInfo?.idVerificationStatus === 'Verified' && (
                    <span className="badge rounded-pill bg-success text-white font-source" style={{ fontSize: '13px', fontWeight: '500', padding: '3px 10px', display: 'flex', alignItems: 'center', gap: '4px', height: 'fit-content' }}>
                      <i className="fa fa-check-circle"></i>Verified
                    </span>
                  )}
                </div>
              </div>
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
                  borderLeft: "4px solid #58219f",
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

                  {userInfo?.denomination && (
                    <span style={chipStyle}>
                      ⛪ {userInfo.denomination}
                    </span>
                  )}

                  {(() => {
                    const addressParts = userInfo?.currentAddress ? userInfo.currentAddress.split('|||') : [];
                    const district = addressParts[4]?.trim() || userInfo?.city || "";
                    const state = addressParts[3]?.trim() || userInfo?.state || "";
                    const country = addressParts[2]?.trim() || userInfo?.country;
                    const locationArray = [district, state, country].filter(Boolean);
                    const locationString = locationArray.length > 0 ? locationArray.join(", ") : userInfo?.fathersNative;
                    return locationString ? (
                      <span style={chipStyle}>
                        <i className="fa fa-map-marker" aria-hidden="true" style={{ color: '#007bff', fontSize: '14px' }}></i> {locationString}
                      </span>
                    ) : null;
                  })()}

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


                </div>
              </div>
            )}

            {userInfo?.aboutMe && (
              <div className="col-12 mb-4">
                <div
                  style={{
                    padding: "30px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                    borderLeft: "6px solid #58219f"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#58219f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className="fa fa-user" style={{ color: "#fff", fontSize: "1.1rem" }}></i>
                    </div>
                    <h4
                      className="font-source font-bold text-[24px]"
                      style={{ color: "#58219f", margin: 0 }}
                    >
                      About Me
                    </h4>
                  </div>
                  <p
                    className="font-source font-normal text-[16px]"
                    style={{
                      color: "#111827",
                      lineHeight: "1.6",
                      whiteSpace: "pre-line",
                      margin: 0,
                    }}
                  >
                    {userInfo.aboutMe}
                  </p>
                </div>
              </div>
            )}

            {/* Profile Sections */}
            {[
              {
                title: "Basic Details",
                icon: faAddressCard,
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
                title: "Location Details",
                icon: faMapMarkerAlt,
                data: [
                  { label: "City", value: (userInfo?.currentAddress?.split('|||')[4]?.trim()) || userInfo?.city },
                  { label: "State", value: (userInfo?.currentAddress?.split('|||')[3]?.trim()) || userInfo?.state },
                  { label: "Country", value: (userInfo?.currentAddress?.split('|||')[2]?.trim()) || userInfo?.citizenOf },
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
                  { label: "Father's Profession", value: userInfo?.fathersProfession },
                  { label: "Mother's Profession", value: userInfo?.mothersProfession },
                  { label: "Father's Native ", value: userInfo?.fathersNative },
                  { label: "Mother's Native ", value: userInfo?.mothersNative },
                  { label: "Family Value", value: userInfo?.familyValue },
                  { label: "Family Type", value: userInfo?.familyType },
                  { label: "No. of Brothers", value: userInfo?.numberOfBrothers },
                  { label: "No. of Sisters", value: userInfo?.numberOfSisters },
                  { label: "Residence Type", value: userInfo?.residenceType },
                  { label: "Family Status", value: userInfo?.familyStatus },
                ],
                fullWidthData: userInfo?.familyDetails ? [
                  { label: "Additional Details", value: userInfo?.familyDetails }
                ] : []
              },
              {
                title: "Religious Information",
                icon: faChurch,
                data: [

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
                  { label: "Annual Income", value: userInfo?.partnerAnnualIncomeFrom && userInfo?.partnerAnnualIncomeTo ? `${userInfo.partnerAnnualIncomeFrom} to ${userInfo.partnerAnnualIncomeTo}` : userInfo?.partnerAnnualIncomeFrom || userInfo?.partnerAnnualIncomeTo },
                  { label: "Country", value: userInfo?.partnerCountry },
                  { label: "State", value: userInfo?.partnerState },
                  { label: "District", value: userInfo?.partnerDistrict },
                ],
                fullWidthData: userInfo?.aboutPartner ? [
                  { label: "About Partner", value: userInfo?.aboutPartner }
                ] : []
              },
            ].map((section, idx) => {
              const half = Math.ceil(section.data.length / 2);
              return (
                <React.Fragment key={idx}>
                  <ProfileSection title={section.title} icon={section.icon}>
                    <div className="profile-section-grid">
                      <div>
                        {section.data.slice(0, half).map((item, i) => (
                          <InfoRow key={i} {...item} />
                        ))}
                      </div>

                      <div>
                        {section.data.slice(half).map((item, i) => (
                          <InfoRow key={i} {...item} />
                        ))}
                      </div>
                    </div>
                    {section.fullWidthData && section.fullWidthData.length > 0 && (
                      <div className="mt-4 flex flex-col">
                        {section.fullWidthData.map((item, i) => (
                           <div key={i} className="flex flex-col mb-3">
                             <span className="font-source text-[16px] text-[#4b5563] font-semibold mb-1">
                               {item.label}
                             </span>
                             <span className="font-source text-[16px] text-[#111827] whitespace-pre-wrap">
                               {item.value}
                             </span>
                           </div>
                        ))}
                      </div>
                    )}
                  </ProfileSection>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Show Interest Modal */}
      <ShowInterest
        selectedUser={showInterestModalUser || userInfo || {}}
        userId={currentUserId}
        onSuccess={() => {
          setInterestStatus("pending");
          window.dispatchEvent(new Event("planUpdated"));
        }}
      />

      {/* Zoom Image Modal */}
      {zoomImage && (
        <div className="zoom-overlay" onClick={() => { setZoomImage(null); setZoomLevel(1); }} style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="zoom-image-wrapper" style={{ position: 'relative', width: '80vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={allImages[currentImageIndex] || profImage}
              alt="Zoomed"
              style={{
                transform: `scale(${zoomLevel})`,
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                cursor: allImages.length > 1 ? "pointer" : "default",
                transition: "transform 0.2s ease"
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (allImages.length > 1) {
                  nextImage();
                }
              }}
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.25)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px 15px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                  }}
                >
                  &#10094;
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "-60px",
                    transform: "translateY(-50%)",
                    background: "rgba(255, 255, 255, 0.25)",
                    border: "none",
                    color: "white",
                    fontSize: "30px",
                    cursor: "pointer",
                    padding: "10px 15px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                  }}
                >
                  &#10095;
                </button>
              </>
            )}

            <div className="zoom-controls" onClick={(e) => e.stopPropagation()}>
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
            <div className="upgrade-icon">{upgradePopupType === 'limit' ? '⚠️' : '🔒'}</div>
            <h3>{upgradePopupType === 'limit' ? 'Limit Reached' : 'Premium Feature'}</h3>
            <p>
              {upgradePopupType === 'limit'
                ? 'You have reached your limit. Please upgrade your plan to continue.'
                : 'Upgrade your plan to unlock premium features and connect directly with your matches.'}
            </p>
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

      <RelatedProfiles />
      <Footer />
      {/* <CopyRights /> */}
      <ToastContainer />



      {/* Styles */}
      <style>{`
        .profile-page { min-height: 100vh; background: #f9fafb; font-family: 'Inter', sans-serif; }
        .fixed-header { top: 0; left: 0; right: 0; z-index: 50; position: fixed; }
        .profile-content { padding-top: 200px; padding-bottom: 100px; }
        .profile-grid { display: flex; gap: 40px; justify-content: flex-start; }
        .profile-left {
  flex: 0 0 320px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: auto;
}
        .profile-right { flex: 1; max-width: 1000px; }
        .profile-card { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); width: 100%; max-width: 320px; display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .profile-image-wrapper { position: relative; width: 100%; }
        .profile-image { width: 100%; border-radius: 12px; object-fit: cover; }
        .zoom-btn { position: absolute; top: 10px; right: 10px; background: #58219f; color: #fff; border-radius: 50%; padding: 6px 10px; cursor: pointer; font-size: 1.1rem; }
        .interest-btn { width: 100%; background: #58219f; color: #fff; border-radius: 8px; padding: 12px 0; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .interest-btn.disabled { background: #999; cursor: not-allowed; opacity: 0.6; }
        .agv-id { text-align: center; background: #58219f; color: #fff; padding: 8px 16px; border-radius: 20px; font-weight: 600; display: inline-block; font-size: 1rem; }
        .start-chat-top-btn { background: #3b82f6; color: #fff; padding: 10px 24px; border-radius: 20px; font-weight: 600; cursor: pointer; border: none; font-size: 1rem; transition: background 0.2s; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
        .start-chat-top-btn:hover { background: #2563eb; }
        .about-me { background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); margin-bottom: 25px; }
        .about-me h4 { color: #58219f; margin-bottom: 10px; }
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
  border-left: 4px solid #58219f;
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

@media (max-width: 992px) {
  .profile-section-grid {
    flex-direction: column;
    gap: 15px;
  }
}
        .zoom-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; z-index: 10000; cursor: zoom-out; }
        .zoom-image-wrapper { position: relative; }
        .zoom-image-wrapper img { max-width: 100vw; max-height: 90vh; border-radius: 12px; transition: transform 0.2s ease; cursor: grab; }
        .zoom-controls { position: absolute; bottom: -60px; display: flex; gap: 15px; justify-content: center; width: 100%; }
        .zoom-controls button { padding: 10px 15px; font-size: 1.2rem; border-radius: 8px; border: none; background: #58219f; color: #fff; cursor: pointer; font-weight: 600; }
        .contact-btn-wrapper { margin-bottom: 15px; }
        .view-contact-btn { background: #58219f; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.2s; }
        .view-contact-btn:hover { background: #381c60; }
        .upgrade-popup { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.65); display: flex; justify-content: center; align-items: center; z-index: 9999; backdrop-filter: blur(4px); }
        .upgrade-content { background: #fff; padding: 35px 30px; border-radius: 16px; text-align: center; width: 100%; max-width: 380px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); animation: fadeInScale 0.3s ease; }
        .upgrade-icon { font-size: 40px; margin-bottom: 10px; }
        .upgrade-content h3 { font-size: 1.4rem; font-weight: 700; margin-bottom: 10px; color: #111; }
        .upgrade-content p { font-size: 0.95rem; color: #666; margin-bottom: 25px; }
        .upgrade-buttons { display: flex; gap: 10px; justify-content: center; }
        .upgrade-btn { background: linear-gradient(135deg, #58219f, #381c60); color: #fff; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem; transition: transform 0.2s; }
        .upgrade-btn:hover { transform: scale(1.05); }
        .cancel-btn { background: #f3f4f6; color: #333; border: none; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 500; font-size: 0.9rem; }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default MoreDetails;


