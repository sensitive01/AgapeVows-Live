import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import UserSideBar from "../components/UserSideBar";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import LayoutComponent from "../components/layouts/LayoutComponent";
import MembershipBadge from "../components/common/MembershipBadge";

// Helper Components
const InfoRow = ({ label, value }) => {
  if (!value) return null;
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        padding: "8px 0",
        fontSize: "0.95rem",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <span style={{ color: "#666", fontWeight: "500", minWidth: "150px" }}>
        {label}:
      </span>
      <span
        style={{
          color: "#333",
          fontWeight: "600",
          flex: 1,
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
};

const ProfileSection = ({ title, icon, children }) => (
  <div className="col-12 mb-3">
    <div
      style={{
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <h4
        style={{
          marginBottom: "15px",
          fontSize: "1.2rem",
          fontWeight: "600",
          color: "#333",
          borderBottom: "2px solid #7c3aed",
          paddingBottom: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <i className={`fa ${icon}`} style={{ color: "#7c3aed" }}></i>
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
    </div>
  </div>
);

const SocialLink = ({ icon, color, label, value }) => (
  <a
    href={value.startsWith("http") ? value : `https://${value}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textDecoration: "none",
      padding: "8px 16px",
      borderRadius: "15px",
      background: "#f3f4f6",
      transition: "all 0.2s ease",
      fontSize: "0.9rem",
    }}
  >
    <i
      className={`fa ${icon}`}
      style={{ fontSize: "1.1rem", color: color }}
    ></i>
    <span style={{ color: "#333", fontWeight: "500" }}>{label}</span>
  </a>
);

// ----------------- VideoCard with small modal video -----------------
function VideoCard({ videoUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (!videoUrl) {
      alert("Please upload the video");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Inline Thumbnail Preview */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          padding: "8px 10px",
          width: "220px",
          cursor: videoUrl ? "pointer" : "not-allowed",
          background: "#f9fafb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
        onClick={handleCardClick}
      >
        {videoUrl ? (
          <video
            src={videoUrl}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
            muted
            playsInline
          />
        ) : (
          <i
            className="fa fa-file-video-o"
            style={{ fontSize: "20px", color: "#667eea" }}
          ></i>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "13px", fontWeight: "500" }}>
            SelfIntroduction.mp4
          </span>
          <span style={{ fontSize: "11px", color: "#6b7280" }}>
            {videoUrl ? "Click to view video" : "No video uploaded"}
          </span>
        </div>

        {videoUrl && (
          <a
            href={videoUrl}
            download="SelfIntroduction.mp4"
            style={{
              marginLeft: "auto",
              background: "#667eea",
              color: "#fff",
              padding: "3px 6px",
              borderRadius: "4px",
              fontSize: "11px",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onClick={(e) => e.stopPropagation()} // prevent modal open
          >
            <i className="fa fa-download"></i>
          </a>
        )}
      </div>

      {/* Modal with Small Video */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "8px",
              padding: "20px",
              width: "300px",      // 👈 small width
              height: "480px",     // 👈 small height
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "transparent",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            <video
              src={videoUrl}
              controls
              autoPlay
              style={{
                width: "100%",    // fits container
                height: "100%",   // fits container
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}


const UserProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const [userInfo, setUserInfo] = useState(null);
  const [visibility, setVisibility] = useState("Public"); // 👈 FIRST
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        setUserInfo(response.data.data);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    if (userInfo?.profileVisibility) {
      setVisibility(userInfo.profileVisibility);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      setCompletionPercentage(calculateProfileCompletion(userInfo));
    }
  }, [userInfo]);

  const calculateProfileCompletion = (user) => {
    if (!user) return 0;

    // Define all profile fields grouped by section
    const profileFields = {
      basic: [
        "profileCreatedFor",
        "userName",
        "dateOfBirth",
        "bodyType",
        "physicalStatus",
        "complexion",
        "height",
        "weight",
        "maritalStatus",
        "eatingHabits",
        "drinkingHabits",
        "smokingHabits",
        "motherTongue",
        "caste",
      ],
      married: [
        "marriedMonthYear",
        "livingTogetherPeriod",
        "childStatus",
        "numberOfChildren",
      ],
      divorced: ["divorcedMonthYear", "reasonForDivorce"],
      family: [
        "fathersName",
        "mothersName",
        "fathersOccupation",
        "fathersProfession",
        "mothersOccupation",
        "fathersNative",
        "mothersNative",
        "familyValue",
        "familyType",
        "familyStatus",
        "residenceType",
        "numberOfBrothers",
        "numberOfSisters",
      ],
      religious: [
        "religion",
        "denomination",
        "church",
        "churchActivity",
        "pastorsName",
        "spirituality",
        "religiousDetail",
      ],
      professional: [
        "education",
        "additionalEducation",
        "college",
        "educationDetail",
        "employmentType",
        "occupation",
        "position",
        "companyName",
        "annualIncome",
      ],
      contact: [
        "userMobile",
        "alternateMobile",
        "landlineNumber",
        "userEmail",
        "currentAddress",
        "permanentAddress",
        "city",
        "state",
        "pincode",
        "citizenOf",
        "contactPersonName",
        "relationship",
      ],
      lifestyle: [
        "hobbies",
        "interests",
        "music",
        "favouriteReads",
        "favouriteCuisines",
        "sportsActivities",
        "dressStyles",
      ],
      partners: [
        "partnerAgeFrom",
        "partnerAgeTo",
        "partnerHeight",
        "partnerMaritalStatus",
        "partnerMotherTongue",
        "partnerCaste",
        "partnerPhysicalStatus",
        "partnerEatingHabits",
        "partnerDrinkingHabits",
        "partnerSmokingHabits",
        "partnerDenomination",
        "partnerSpirituality",
        "partnerEducation",
        "partnerEmploymentType",
        "partnerOccupation",
        "partnerAnnualIncome",
        "partnerCountry",
        "partnerState",
        "partnerDistrict",
      ],
      profile: ["profileImage", "aboutMe"],
    };

    // Helper function to check if a field is filled
    const isFieldFilled = (fieldValue) => {
      return (
        fieldValue !== null &&
        fieldValue !== undefined &&
        fieldValue !== "" &&
        (!Array.isArray(fieldValue) || fieldValue.length > 0)
      );
    };

    // Count filled fields
    let filledCount = 0;
    let totalFields = 0;

    // Count basic fields
    profileFields.basic.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Add married fields if marital status indicates marriage
    if (
      user.maritalStatus &&
      user.maritalStatus !== "Never Married" &&
      user.maritalStatus !== "Unmarried"
    ) {
      profileFields.married.forEach((field) => {
        totalFields++;
        if (isFieldFilled(user[field])) {
          filledCount++;
        }
      });
    }

    // Add divorced fields if marital status is divorced
    if (
      user.maritalStatus === "Divorced" ||
      user.maritalStatus === "Awaiting Divorce"
    ) {
      profileFields.divorced.forEach((field) => {
        totalFields++;
        if (isFieldFilled(user[field])) {
          filledCount++;
        }
      });
    }

    // Count family fields
    profileFields.family.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count religious fields
    profileFields.religious.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count professional fields
    profileFields.professional.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count contact fields
    profileFields.contact.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count lifestyle fields
    profileFields.lifestyle.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count partner preference fields
    profileFields.partners.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Count profile related fields
    profileFields.profile.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledCount++;
      }
    });

    // Calculate percentage
    const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;
    return percentage;
  };

  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };




  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              {/* Sidebar - Left Column */}
              <div
                className="col-12 col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              {/* Profile Content - Right Column with Vertical Scroll */}
              <div
                className="col-12 col-md-9 col-lg-10"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "15px",
                  height: "auto",
                  overflow: "visible",
                  overflowX: "hidden",
                }}
              >
                <div className="row">
                  {/* Header with Edit Button */}
                  <div className="col-12">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      <h2 className="db-tit" style={{ margin: 0 }}>
                        My Profile
                      </h2>
                      <Link
                        to={`/user/user-profile-edit-page/${userId}`}
                        className="btn btn-primary edit-btn"
                        style={{
                          padding: "10px 24px",
                          fontSize: "24px",
                          borderRadius: "5px",
                          textDecoration: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Edit Profile
                      </Link>
                    </div>
                  </div>

                  {/* Profile Header Card */}
                  <div className="col-12 mb-4">
                    <div
                      className="db-profile"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "25px",
                        flexWrap: "wrap",
                        padding: "25px",
                        background: "#fff",
                        borderRadius: "10px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      }}
                    >
                      <div
                        className="img profile-img overflow-hidden rounded-full flex items-center justify-center bg-gray-200"
                        style={{
                          width: "130px",
                          height: "130px",
                          minWidth: "130px",
                          minHeight: "130px",
                          border: "5px solid #7c3aed",
                          borderRadius: "50%",
                        }}
                      >
                        {userInfo?.profileImage ? (
                          <img
                            src={userInfo.profileImage}
                            loading="lazy"
                            alt="Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                            onError={(e) => {
                              e.target.src = profImage;
                            }}
                          />
                        ) : (
                          <img
                            src={profImage}
                            loading="lazy"
                            alt="Default Profile"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                              borderRadius: "50%",
                            }}
                          />
                        )}

                        {/* Image Overlays */}
                        <div style={{
                          position: 'absolute',
                          top: '10px',
                          left: '0px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px',
                          zIndex: 10
                        }}>
                          <MembershipBadge user={userInfo} isMini={true} />
                          {userInfo?.idVerificationStatus === 'Verified' && (
                            <div className="badge bg-success shadow-sm" style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid white' }}>
                              <i className="fa fa-check-circle"></i>
                            </div>
                          )}
                          {userInfo?.isPhoneVerified && (
                            <div className="badge bg-info text-white shadow-sm" style={{ padding: '4px 8px', fontSize: '9px', borderRadius: '4px', border: '1px solid white' }}>
                              <i className="fa fa-phone"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div
                        className="profile-info"
                        style={{
                          flex: 1,
                          width: "100%",
                        }}
                      >
                        <div className="user-details">
                          <h3
                            style={{
                              margin: "0 0 10px 0",
                              fontSize: "clamp(1.3rem, 4vw, 2rem)", // ✅ responsive font
                              fontWeight: "700",
                              color: "#333",
                              wordBreak: "break-word",
                            }}
                          >
                            {userInfo?.userName || "User Name"}
                          </h3>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {/* USER ID */}
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "clamp(0.85rem, 3vw, 1rem)",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flexWrap: "wrap", // ✅ important
                              }}
                            >
                              <i className="fa fa-id-card" style={{ color: "#7c3aed" }}></i>
                              <span style={{ fontWeight: "500" }}>
                                <strong style={{ color: "#333" }}>User ID:</strong>{" "}
                                {userInfo?.agwid || "Not provided"}
                              </span>
                            </p>

                            {/* MOBILE */}
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "clamp(0.85rem, 3vw, 1rem)",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              <i className="fa fa-phone" style={{ color: "#7c3aed" }}></i>
                              <span style={{ fontWeight: "500", wordBreak: "break-word" }}>
                                {userInfo?.userMobile || "Not provided"}
                              </span>
                            </p>

                            {/* EMAIL */}
                            <p
                              style={{
                                margin: "0",
                                color: "#666",
                                fontSize: "clamp(0.85rem, 3vw, 1rem)",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: "8px",
                                flexWrap: "wrap",
                              }}
                            >
                              <i className="fa fa-envelope" style={{ color: "#7c3aed" }}></i>
                              <span style={{ fontWeight: "500", wordBreak: "break-word" }}>
                                {userInfo?.userEmail || "Not provided"}
                              </span>
                            </p>

                            {/* BADGES */}
                            <div
                              style={{
                                marginTop: "8px",
                                display: "flex",
                                gap: "8px",
                                flexWrap: "wrap", // ✅ wraps on mobile
                              }}
                            >
                              <span
                                className={`badge ${completionPercentage >= 75
                                    ? "bg-success"
                                    : completionPercentage >= 50
                                      ? "bg-info"
                                      : completionPercentage >= 25
                                        ? "bg-warning text-dark"
                                        : "bg-secondary"
                                  }`}
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
                                  fontWeight: "600",
                                  borderRadius: "20px",
                                }}
                              >
                                {completionPercentage}% Completed
                              </span>

                              <MembershipBadge user={userInfo} />

                              <span
                                className="badge bg-info"
                                style={{
                                  padding: "6px 12px",
                                  fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
                                  fontWeight: "600",
                                  borderRadius: "20px",
                                }}
                              >
                                {visibility}
                              </span>

                              {userInfo?.idVerificationStatus === "Verified" && (
                                <span
                                  className="badge"
                                  style={{
                                    padding: "6px 12px",
                                    fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    background: "#dcfce7",
                                    color: "#15803d",
                                    border: "1px solid #86efac",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                  }}
                                >
                                  <i className="fa fa-check-circle"></i>
                                  ID Verified
                                </span>
                              )}


                              {userInfo?.isPhoneVerified && (
                                <span
                                  className="badge bg-info text-white"
                                  style={{
                                    padding: "6px 12px",
                                    fontSize: "clamp(0.7rem, 2.5vw, 0.9rem)",
                                    fontWeight: "600",
                                    borderRadius: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                  }}
                                >
                                  <i className="fa fa-phone"></i>
                                  Phone Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

            {userInfo && (
  <ProfileSection title="Self Introduction Video" icon="fa-video">
    <VideoCard videoUrl={userInfo.selfIntroductionVideo} />
  </ProfileSection>
)}
                  {/* About Me Section */}
                  {userInfo?.aboutMe && (
                    <div className="col-12 mb-3">
                      <div
                        style={{
                          padding: "20px",
                          background: "#fff",
                          borderRadius: "10px",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                        }}
                      >
                        <h4
                          style={{
                            marginBottom: "15px",
                            fontSize: "1.3rem",
                            fontWeight: "600",
                            color: "#333",
                            borderBottom: "2px solid #7c3aed",
                            paddingBottom: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <i
                            className="fa fa-user-circle"
                            style={{ color: "#7c3aed" }}
                          ></i>
                          About Me
                        </h4>
                        <p
                          style={{
                            color: "#666",
                            fontSize: "1rem",
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

                  {/* Basic Details Section */}
                  <ProfileSection title="Basic Details" icon="fa-info-circle">
                    <InfoRow
                      label="Profile Created By"
                      value={userInfo?.profileCreatedFor}
                    />
                    <InfoRow label="Name" value={userInfo?.userName} />
                    <InfoRow
                      label="Age"
                      value={
                        userInfo?.dateOfBirth
                          ? `${calculateAge(
                            userInfo.dateOfBirth,
                          )} years / ${new Date(
                            userInfo.dateOfBirth,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}`
                          : null
                      }
                    />
                    <InfoRow label="Body Type" value={userInfo?.bodyType} />
                    <InfoRow
                      label="Physical Status"
                      value={userInfo?.physicalStatus}
                    />
                    <InfoRow label="Complexion" value={userInfo?.complexion} />
                    <InfoRow label="Height" value={userInfo?.height || null} />
                    <InfoRow label="Weight" value={userInfo?.weight || null} />
                    <InfoRow
                      label="Marital Status"
                      value={userInfo?.maritalStatus}
                    />

                    {userInfo?.maritalStatus &&
                      userInfo.maritalStatus !== "Never Married" && (
                        <>
                          <InfoRow
                            label="Married Month & Year"
                            value={userInfo?.marriedMonthYear}
                          />
                          <InfoRow
                            label="Living Together Period"
                            value={userInfo?.livingTogetherPeriod}
                          />
                          <InfoRow
                            label="Child Status"
                            value={userInfo?.childStatus}
                          />
                          <InfoRow
                            label="No. of Children"
                            value={userInfo?.numberOfChildren}
                          />
                        </>
                      )}

                    {(userInfo?.maritalStatus === "Divorced" ||
                      userInfo?.maritalStatus === "Awaiting Divorce") && (
                        <>
                          <InfoRow
                            label="Divorced Month & Year"
                            value={userInfo?.divorcedMonthYear}
                          />
                          <InfoRow
                            label="Reason for Divorce"
                            value={userInfo?.reasonForDivorce}
                          />
                        </>
                      )}

                    <InfoRow
                      label="Eating Habits"
                      value={userInfo?.eatingHabits}
                    />
                    <InfoRow
                      label="Drinking Habits"
                      value={userInfo?.drinkingHabits}
                    />
                    <InfoRow
                      label="Smoking Habits"
                      value={userInfo?.smokingHabits}
                    />
                    <InfoRow
                      label="Mother Tongue"
                      value={userInfo?.motherTongue}
                    />
                    <InfoRow label="Caste" value={userInfo?.caste} />
                  </ProfileSection>

                  {/* Family Details Section */}
                  <ProfileSection title="Family Details" icon="fa-users">
                    <InfoRow
                      label="Father's Name"
                      value={userInfo?.fathersName}
                    />
                    <InfoRow
                      label="Mother's Name"
                      value={userInfo?.mothersName}
                    />
                    <InfoRow
                      label="Father's Occupation"
                      value={userInfo?.fathersOccupation}
                    />
                    <InfoRow
                      label="Father's Profession"
                      value={userInfo?.fathersProfession}
                    />
                    <InfoRow
                      label="Mother's Occupation"
                      value={userInfo?.mothersOccupation}
                    />
                    <InfoRow
                      label="Father's Native"
                      value={userInfo?.fathersNative}
                    />
                    <InfoRow
                      label="Mother's Native"
                      value={userInfo?.mothersNative}
                    />
                    <InfoRow
                      label="Family Value"
                      value={userInfo?.familyValue}
                    />
                    <InfoRow label="Family Type" value={userInfo?.familyType} />
                    <InfoRow
                      label="Family Status"
                      value={userInfo?.familyStatus}
                    />
                    <InfoRow
                      label="Residence Type"
                      value={userInfo?.residenceType}
                    />
                    <InfoRow
                      label="No. of Brothers"
                      value={userInfo?.numberOfBrothers}
                    />
                    <InfoRow
                      label="No. of Sisters"
                      value={userInfo?.numberOfSisters}
                    />
                  </ProfileSection>

                  {/* Religious Information Section */}
                  <ProfileSection
                    title="Religious Information"
                    icon="fa-praying-hands"
                  >
                    <InfoRow label="Religion" value={userInfo?.religion} />
                    <InfoRow
                      label="Denomination"
                      value={userInfo?.denomination}
                    />
                    <InfoRow label="Church" value={userInfo?.church} />
                    <InfoRow
                      label="Church Activity"
                      value={userInfo?.churchActivity}
                    />
                    <InfoRow
                      label="Pastor's Name"
                      value={userInfo?.pastorsName}
                    />
                    <InfoRow
                      label="Spirituality"
                      value={userInfo?.spirituality}
                    />
                    <InfoRow
                      label="Religious Detail"
                      value={userInfo?.religiousDetail}
                    />
                  </ProfileSection>

                  {/* Professional Information Section */}
                  <ProfileSection
                    title="Professional Information"
                    icon="fa-briefcase"
                  >
                    <InfoRow label="Education" value={userInfo?.education} />
                    <InfoRow
                      label="Additional Education"
                      value={userInfo?.additionalEducation}
                    />
                    <InfoRow
                      label="College/Institution"
                      value={userInfo?.college}
                    />
                    <InfoRow
                      label="Education in Detail"
                      value={userInfo?.educationDetail}
                    />
                    <InfoRow
                      label="Employment Type"
                      value={userInfo?.employmentType}
                    />
                    <InfoRow label="Occupation" value={userInfo?.occupation} />
                    <InfoRow label="Position" value={userInfo?.position} />
                    <InfoRow
                      label="Company Name"
                      value={userInfo?.companyName}
                    />
                    <InfoRow
                      label="Annual Income"
                      value={userInfo?.annualIncome}
                    />
                  </ProfileSection>

                  {/* Contact Information Section */}
                  <ProfileSection
                    title="Contact Information"
                    icon="fa-address-card"
                  >
                    <InfoRow
                      label="Mobile Number"
                      value={userInfo?.userMobile}
                    />
                    <InfoRow
                      label="Alternate Mobile"
                      value={userInfo?.alternateMobile}
                    />
                    <InfoRow
                      label="Landline"
                      value={userInfo?.landlineNumber}
                    />
                    <InfoRow label="Email" value={userInfo?.userEmail} />
                    <InfoRow
                      label="Current Address"
                      value={userInfo?.currentAddress}
                    />
                    <InfoRow
                      label="Permanent Address"
                      value={userInfo?.permanentAddress}
                    />
                    <InfoRow label="City" value={userInfo?.city} />
                    <InfoRow label="State" value={userInfo?.state} />
                    <InfoRow label="Pincode" value={userInfo?.pincode} />
                    <InfoRow label="Citizen Of" value={userInfo?.citizenOf} />
                    <InfoRow
                      label="Contact Person"
                      value={userInfo?.contactPersonName}
                    />
                    <InfoRow
                      label="Relationship"
                      value={userInfo?.relationship}
                    />
                  </ProfileSection>

                  {/* Lifestyle & Hobbies Section */}
                  <ProfileSection title="Lifestyle & Hobbies" icon="fa-guitar">
                    <InfoRow
                      label="Hobbies"
                      value={
                        Array.isArray(userInfo?.hobbies)
                          ? userInfo.hobbies.join(", ")
                          : userInfo?.hobbies
                      }
                    />
                    <InfoRow label="Interests" value={userInfo?.interests} />
                    <InfoRow label="Music" value={userInfo?.music} />
                    <InfoRow
                      label="Favourite Reads"
                      value={userInfo?.favouriteReads}
                    />
                    <InfoRow
                      label="Favourite Cuisines"
                      value={userInfo?.favouriteCuisines}
                    />
                    <InfoRow
                      label="Sports/Activities"
                      value={userInfo?.sportsActivities}
                    />
                    <InfoRow
                      label="Dress Styles"
                      value={userInfo?.dressStyles}
                    />
                  </ProfileSection>

                  {/* Partner Preferences Section */}
                  <ProfileSection title="Partner Preferences" icon="fa-heart">
                    <div style={{ marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#7c3aed",
                          marginTop: "10px",
                          marginBottom: "15px",
                          fontWeight: "600",
                          fontSize: "1.05rem",
                        }}
                      >
                        Basic & Religious
                      </h5>
                    </div>
                    <InfoRow
                      label="Age Range"
                      value={
                        userInfo?.partnerAgeFrom && userInfo?.partnerAgeTo
                          ? `${userInfo.partnerAgeFrom} - ${userInfo.partnerAgeTo} Years`
                          : null
                      }
                    />
                    <InfoRow
                      label="Height"
                      value={
                        userInfo?.partnerHeight
                          ? `${userInfo.partnerHeight} cm`
                          : null
                      }
                    />
                    <InfoRow
                      label="Marital Status"
                      value={userInfo?.partnerMaritalStatus}
                    />
                    <InfoRow
                      label="Mother Tongue"
                      value={userInfo?.partnerMotherTongue}
                    />
                    <InfoRow label="Caste" value={userInfo?.partnerCaste} />
                    <InfoRow
                      label="Physical Status"
                      value={userInfo?.partnerPhysicalStatus}
                    />
                    <InfoRow
                      label="Eating Habits"
                      value={userInfo?.partnerEatingHabits}
                    />
                    <InfoRow
                      label="Drinking Habits"
                      value={userInfo?.partnerDrinkingHabits}
                    />
                    <InfoRow
                      label="Smoking Habits"
                      value={userInfo?.partnerSmokingHabits}
                    />
                    <InfoRow
                      label="Denomination"
                      value={userInfo?.partnerDenomination}
                    />
                    <InfoRow
                      label="Spirituality"
                      value={userInfo?.partnerSpirituality}
                    />

                    <div style={{ marginTop: "20px", marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#7c3aed",
                          marginBottom: "15px",
                          fontWeight: "600",
                          fontSize: "1.05rem",
                        }}
                      >
                        Professional & Location
                      </h5>
                    </div>
                    <InfoRow
                      label="Education"
                      value={userInfo?.partnerEducation}
                    />
                    <InfoRow
                      label="Employment Type"
                      value={userInfo?.partnerEmploymentType}
                    />
                    <InfoRow
                      label="Occupation"
                      value={userInfo?.partnerOccupation}
                    />
                    <InfoRow
                      label="Annual Income"
                      value={userInfo?.partnerAnnualIncome}
                    />
                    <InfoRow label="Country" value={userInfo?.partnerCountry} />
                    <InfoRow label="State" value={userInfo?.partnerState} />
                    <InfoRow
                      label="District"
                      value={userInfo?.partnerDistrict}
                    />
                  </ProfileSection>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserProfilePage;
