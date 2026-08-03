import React, { useEffect, useState, useMemo } from "react";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import { Link } from "react-router-dom";
import MembershipBadge from "./common/MembershipBadge";

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
      "mothersProfession",
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
      "contactPhone",
      "alternateMobile",
      "landlineNumber",
      "contactEmail",
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

  let totalFields = 0;
  let filledFields = 0;

  // Process core sections (always applicable)
  const coreSections = [
    "basic",
    "family",
    "religious",
    "professional",
    "contact",
    "lifestyle",
    "partners",
    "profile",
  ];

  coreSections.forEach((section) => {
    profileFields[section].forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledFields++;
      }
    });
  });

  // Handle conditional sections based on marital status
  const maritalStatus = user.maritalStatus;

  if (
    maritalStatus === "Married" ||
    maritalStatus === "Widowed" ||
    maritalStatus === "Awaiting Divorce"
  ) {
    profileFields.married.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledFields++;
      }
    });
  }

  if (maritalStatus === "Divorced") {
    profileFields.divorced.forEach((field) => {
      totalFields++;
      if (isFieldFilled(user[field])) {
        filledFields++;
      }
    });
  }

  // Calculate percentage
  if (totalFields === 0) return 0;
  return Math.round((filledFields / totalFields) * 100);
};

const UserSideBar = ({ sidebarTop = "40px" }) => {
  const userId = localStorage.getItem("userId");
  const currentPath = window.location.pathname;

  const [userInfo, setUserInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgHover, setImgHover] = useState(false);

  const completionPercentage = useMemo(() => calculateProfileCompletion(userInfo), [userInfo]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      const res = await getUserProfile(userId);
      if (res.status === 200) {
        setUserInfo(res.data.data);
      }
    };
    fetchProfile();
  }, [userId]);

  const images = [
    userInfo?.profileImage || profImage,
    ...(Array.isArray(userInfo?.additionalImages)
      ? userInfo.additionalImages
      : []),
  ];

  const handlePrev = () =>
    setCurrentImageIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  const handleNext = () =>
    setCurrentImageIndex((p) => (p === images.length - 1 ? 0 : p + 1));

  const navItems = [
    { path: "/user/user-dashboard-page", icon: "fa fa-home", label: "Dashboard" },
    { path: "/user/user-profile-page", icon: "fa fa-user", label: "Profile" },
    { path: "/user/user-interest-page", icon: "fa fa-heart", label: "Interests", unreadCount: userInfo?.unreadInterestsCount || 0 },

    { path: "/user/short-listed-profiles-page", icon: "fa fa-bookmark", label: "Shortlist", unreadCount: userInfo?.unreadShortlistsCount || 0 },
    { path: "/user/who-viewed-you-page", icon: "fa fa-eye", label: "Viewed You", unreadCount: userInfo?.unreadViewsCount || 0 },
    { path: "/user/photo-requests-page", icon: "fa fa-camera", label: "Photo Requests", unreadCount: userInfo?.unreadPhotoRequestsCount || 0 },
    { path: "/user/blocked-profiles-page", icon: "fa fa-ban", label: "Blocked" },
    { path: "/user/user-plan-page", icon: "fa fa-credit-card", label: "Plan" },
    { path: "/user/user-settings-page", icon: "fa fa-cog", label: "Settings" },
    { path: "/sign-in", icon: "fa fa-sign-out", label: "Logout", danger: true },
  ];

  const styles = {
    sidebar: {
      position: "sticky",
      top: sidebarTop,
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      overflow: "hidden",
      marginBottom: "30px",
    },

    profileBox: {
      padding: "10px",
      textAlign: "center",
      borderBottom: "1px solid #edf2f7",
    },

    imgWrapper: {
      position: "relative",
      width: "140px",
      margin: "auto",
    },

    profileImg: {
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #58219f",
      cursor: "pointer",
    },

    arrow: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "34px",
      height: "34px",
      borderRadius: "50%",
      border: "none",
      background: "#5c2a9d",
      color: "#fff",
      opacity: imgHover ? 1 : 0,
      transition: "0.3s",
      cursor: "pointer",
    },

    leftArrow: { left: "-12px" },
    rightArrow: { right: "-12px" },

    userName: {
      marginTop: "12px",
      fontWeight: "600",
      fontSize: "15px",
      color: "#2d3748",
    },

    menu: {
      listStyle: "none",
      padding: "10px",
      margin: 0,
    },

    menuItem: {
      marginBottom: "2px",
    },

    link: {
      display: "flex",
      alignItems: "center",
      padding: "8px 16px",
      borderRadius: "10px",
      color: "#4a5568",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s",
    },

    activeLink: {
      background: "#ebf4ff",
      color: "#3182ce",
      fontWeight: "600",
    },

    activeDot: {
      position: "absolute",
      left: "6px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "4px",
      height: "4px",
      borderRadius: "50%",
      background: "#3182ce",
    },

    icon: {
      width: "20px",
      marginRight: "14px",
      fontSize: "16px",
      textAlign: "center",
    },

    danger: {
      color: "#e53e3e",
    },

    tooltip: {
      position: "absolute",
      left: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      background: "#2d3748",
      color: "#fff",
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      whiteSpace: "nowrap",
      marginLeft: "15px",
      pointerEvents: "none",
      opacity: 0,
      visibility: "hidden",
      transition: "opacity 0.2s, visibility 0.2s",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },

    tooltipVisible: {
      opacity: 1,
      visibility: "visible",
    },

    tooltipArrow: {
      position: "absolute",
      right: "100%",
      top: "50%",
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: "5px 5px 5px 0",
      borderColor: "transparent #2d3748 transparent transparent",
      marginRight: "-1px",
    },

    modal: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 99999,
    },

    modalImg: {
      maxWidth: "85vw",
      maxHeight: "85vh",
      borderRadius: "16px",
    },
  };

  return (
    <>
      <div style={styles.sidebar}>
        <div style={styles.profileBox}>
          <div
            style={styles.imgWrapper}
            onMouseEnter={() => setImgHover(true)}
            onMouseLeave={() => setImgHover(false)}
          >
            <img
              src={images[currentImageIndex]}
              alt="Profile"
              style={styles.profileImg}
              onClick={() => setIsModalOpen(true)}
            />

            {images.length > 1 && (
              <>
                <button style={{ ...styles.arrow, ...styles.leftArrow }} onClick={handlePrev}>
                  ‹
                </button>
                <button style={{ ...styles.arrow, ...styles.rightArrow }} onClick={handleNext}>
                  ›
                </button>
              </>
            )}
          </div>

          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {userInfo?.agwid && <span style={{ fontWeight: 'bold', fontSize: '15px', color: '#2d3748' }}>{userInfo.agwid}</span>}
            <MembershipBadge user={userInfo} />
            <span style={{ fontSize: '13px', color: '#ffffff', fontWeight: '500', background: '#4a2580', padding: '4px 10px', borderRadius: '20px', border: '1px solid #4a2580' }}>
              Profile: {completionPercentage}% Completed
            </span>
          </div>

          {/* <div style={styles.userName}>{userInfo?.name || "User"}</div> */}
        </div>

        <ul style={styles.menu}>
          {navItems.map((item, i) => {
            const active = currentPath === item.path;
            const hovered = hoveredIndex === i;

            return (
              <li key={i} style={styles.menuItem}>
                <Link
                  to={item.path}
                  style={{
                    ...styles.link,
                    ...(active && styles.activeLink),
                    ...(item.danger && styles.danger),
                    ...(item.unreadCount > 0 && { fontWeight: "bold", color: "#2d3748" }),
                    position: "relative",
                  }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {active && <span style={styles.activeDot}></span>}
                  <i className={item.icon} style={styles.icon}></i>
                  {item.label}

                  {item.unreadCount > 0 && (
                    <span style={{
                      background: "#e53e3e",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: "bold",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      marginLeft: "auto"
                    }}>
                      {item.unreadCount}
                    </span>
                  )}


                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {isModalOpen && (
        <div style={styles.modal} onClick={() => setIsModalOpen(false)}>

          {/* LEFT */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              style={{
                position: "absolute",
                left: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "30px",
                background: "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              ‹
            </button>
          )}

          {/* IMAGE */}
          <img
            src={images[currentImageIndex]}
            alt="Preview"
            style={styles.modalImg}
            onClick={(e) => e.stopPropagation()}
          />

          {/* RIGHT */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "30px",
                background: "#667eea",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                cursor: "pointer",
              }}
            >
              ›
            </button>
          )}

        </div>
      )}
    </>
  );
};

export default UserSideBar;
