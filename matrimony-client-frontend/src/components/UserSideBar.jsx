// import React, { useEffect, useState } from "react";
// import { getUserProfile } from "../api/axiosService/userAuthService";
// import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";

// const UserSideBar = ({ sidebarTop = "115px" }) => {
//   const userId = localStorage.getItem("userId");
//   const [userInfo, setUserInfo] = useState(null);
//   const currentPath = window.location.pathname;
//   const [hoveredIndex, setHoveredIndex] = useState(null);

//   // index of currently visible image
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   // Modal state for photo gallery
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await getUserProfile(userId);
//       if (response.status === 200) {
//         setUserInfo(response.data.data);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   // array of images: profile + additionalImages (if any)
//   const images = [
//     userInfo?.profileImage || profImage,
//     ...(Array.isArray(userInfo?.additionalImages)
//       ? userInfo.additionalImages
//       : []),
//   ];

//   const handlePrev = () => {
//     if (images.length === 0) return;
//     setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     if (images.length === 0) return;
//     setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const navItems = [
//     {
//       path: "/user/user-dashboard-page",
//       icon: "fa fa-tachometer",
//       label: "Dashboard",
//     },
//     { path: "/user/user-profile-page", icon: "fa fa-male", label: "Profile" },
//     {
//       path: "/user/user-interest-page",
//       icon: "fa fa-handshake-o",
//       label: "Interests",
//     },
//     {
//       path: "/user/user-chat-page",
//       icon: "fa fa-commenting-o",
//       label: "Chat list",
//     },
//     {
//       path: "/user/short-listed-profiles-page",
//       icon: "fa fa-bookmark",
//       label: "Short listed Profiles",
//     },
//     {
//       path: "/user/who-viewed-you-page",
//       icon: "fa fa-eye",
//       label: "Who Viewed You",
//     },
//     {
//       path: "/user/blocked-profiles-page",
//       icon: "fa fa-ban",
//       label: "Blocked Profiles",
//     },
//     {
//       path: "/user/ignored-profiles-page",
//       icon: "fa fa-times-circle",
//       label: "Ignored Profiles",
//     },
//     { path: "/user/user-plan-page", icon: "fa fa-money", label: "Plan" },
//     { path: "/user/user-settings-page", icon: "fa fa-cog", label: "Setting" },
//     { path: "/user/user-login", icon: "fa fa-sign-out", label: "Log out" },
//   ];

//   const styles = {
//     sidebarSticky: {
//       position: "sticky",
//       top: sidebarTop,
//       width: "100%", // Restored width
//       // height and overflow removed to eliminate scrolling and let it fit naturally
//       background: "#fff",
//       border: "1px solid #e9ecef",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
//       zIndex: 40,
//     },
//     dbNav: {
//       width: "100%",
//     },
//     dbNavPro: {
//       width: "100%",
//       padding: "5px", // Further reduced padding
//       background: "#fff",
//       borderBottom: "1px solid #e9ecef",
//     },
//     imageWrapper: {
//       position: "relative",
//       width: "100%",
//     },
//     dbNavProImg: {
//       width: "100%",
//       height: "auto",
//       aspectRatio: "1",
//       objectFit: "cover",
//       borderRadius: "8px",
//       border: "2px solid #e9ecef",
//       display: "block",
//     },
//     arrowButton: {
//       position: "absolute",
//       top: "50%",
//       transform: "translateY(-50%)",
//       width: "32px",
//       height: "32px",
//       borderRadius: "50%",
//       border: "none",
//       background: "rgba(0,0,0,0.45)",
//       color: "#fff",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       fontSize: "16px",
//       zIndex: 2,
//     },
//     arrowLeft: {
//       left: "-10px",
//     },
//     arrowRight: {
//       right: "-10px",
//     },
//     dbNavList: {
//       padding: "0",
//       background: "#fff",
//     },
//     ul: {
//       listStyle: "none",
//       margin: "0",
//       padding: "0",
//     },
//     li: {
//       borderBottom: "1px solid #f0f0f0",
//     },
//     liLast: {
//       borderBottom: "none",
//     },
//     link: {
//       display: "flex",
//       alignItems: "center",
//       padding: "5px 10px", // Minimal padding
//       color: "#333",
//       textDecoration: "none",
//       fontSize: "14px",
//       fontWeight: "400",
//       transition: "all 0.2s ease",
//       position: "relative",
//     },
//     linkHover: {
//       background: "#f8f9fa",
//       color: "#667eea",
//     },
//     linkActive: {
//       background: "#667eea",
//       color: "#fff",
//     },
//     linkActiveBefore: {
//       content: '""',
//       position: "absolute",
//       left: "0",
//       top: "0",
//       bottom: "0",
//       width: "4px",
//       background: "#4c51bf",
//     },
//     icon: {
//       width: "20px",
//       marginRight: "12px",
//       fontSize: "15px",
//       textAlign: "center",
//     },
//     span: {
//       flex: "1",
//     },
//     // Modal styles
//     modalOverlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0, 0, 0, 0.75)",
//       backdropFilter: "blur(12px)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 99999,
//       padding: "40px",
//     },
//     modalContent: {
//       position: "relative",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       width: "100%",
//       height: "100%",
//     },
//     modalImage: {
//       maxWidth: "85vw",
//       maxHeight: "85vh",
//       width: "auto",
//       height: "auto",
//       objectFit: "contain",
//       borderRadius: "16px",
//       boxShadow: "0 30px 80px rgba(0, 0, 0, 0.5)",
//       border: "4px solid rgba(255, 255, 255, 0.1)",
//     },
//     modalArrowButton: {
//       position: "absolute",
//       top: "50%",
//       transform: "translateY(-50%)",
//       width: "50px",
//       height: "50px",
//       borderRadius: "50%",
//       border: "none",
//       background: "rgba(255, 255, 255, 0.95)",
//       color: "#667eea",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       cursor: "pointer",
//       fontSize: "20px",
//       zIndex: 100000,
//       transition: "all 0.3s ease",
//       boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
//     },
//     modalArrowLeft: {
//       left: "30px",
//     },
//     modalArrowRight: {
//       right: "30px",
//     },
//     closeButton: {
//       position: "absolute",
//       top: "30px",
//       right: "30px",
//       width: "45px",
//       height: "45px",
//       borderRadius: "50%",
//       border: "none",
//       background: "rgba(255, 255, 255, 0.95)",
//       color: "#e74c3c",
//       fontSize: "18px",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 100001,
//       transition: "all 0.3s ease",
//       boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
//     },
//     imageCounter: {
//       position: "absolute",
//       bottom: "40px",
//       left: "50%",
//       transform: "translateX(-50%)",
//       background: "rgba(102, 126, 234, 0.95)",
//       backdropFilter: "blur(10px)",
//       color: "#fff",
//       padding: "12px 28px",
//       borderRadius: "30px",
//       fontSize: "16px",
//       fontWeight: "700",
//       letterSpacing: "1.5px",
//       boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
//       border: "2px solid rgba(255, 255, 255, 0.3)",
//     },
//   };

//   return (
//     <>
//       <div style={styles.sidebarSticky}>
//         <div style={styles.dbNav}>
//           {/* Profile Image with Arrows */}
//           <div style={styles.dbNavPro}>
//             <div style={styles.imageWrapper}>
//               <img
//                 src={images[currentImageIndex]}
//                 style={{ ...styles.dbNavProImg, cursor: "pointer" }}
//                 alt="Profile"
//                 onClick={() => {
//                   console.log("Image clicked, opening modal");
//                   setIsModalOpen(true);
//                 }}
//               />

//               {/* always render arrows; they will still work even with one image */}
//               <button
//                 type="button"
//                 style={{ ...styles.arrowButton, ...styles.arrowLeft }}
//                 onClick={handlePrev}
//               >
//                 <i className="fa fa-chevron-left" />
//               </button>
//               <button
//                 type="button"
//                 style={{ ...styles.arrowButton, ...styles.arrowRight }}
//                 onClick={handleNext}
//               >
//                 <i className="fa fa-chevron-right" />
//               </button>
//             </div>
//           </div>

//           {/* Navigation Menu */}
//           <div style={styles.dbNavList}>
//             <ul style={styles.ul}>
//               {navItems.map((item, index) => {
//                 const isActive = currentPath === item.path;
//                 const isHovered = hoveredIndex === index;
//                 const isLast = index === navItems.length - 1;

//                 return (
//                   <li key={index} style={isLast ? styles.liLast : styles.li}>
//                     <a
//                       href={item.path}
//                       style={{
//                         ...styles.link,
//                         ...(isActive && styles.linkActive),
//                         ...(isHovered && !isActive && styles.linkHover),
//                       }}
//                       onMouseEnter={() => setHoveredIndex(index)}
//                       onMouseLeave={() => setHoveredIndex(null)}
//                     >
//                       {isActive && (
//                         <span style={styles.linkActiveBefore}></span>
//                       )}

//                       <i
//                         className={item.icon}
//                         aria-hidden="true"
//                         style={styles.icon}
//                       ></i>

//                       <span style={styles.span}>{item.label}</span>
//                     </a>
//                   </li>
//                 );
//               })}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Photo Gallery Modal - Rendered outside sidebar for proper z-index */}
//       {isModalOpen && (
//         <div style={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
//           <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
//             {/* Close Button */}
//             <button
//               style={styles.closeButton}
//               onClick={() => setIsModalOpen(false)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = "#e74c3c";
//                 e.currentTarget.style.color = "#fff";
//                 e.currentTarget.style.transform = "scale(1.1)";
//                 e.currentTarget.style.boxShadow =
//                   "0 8px 20px rgba(231, 76, 60, 0.3)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = "#fff";
//                 e.currentTarget.style.color = "#e74c3c";
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.boxShadow =
//                   "0 4px 12px rgba(0, 0, 0, 0.08)";
//               }}
//               title="Close (Esc)"
//             >
//               <i className="fa fa-times" />
//             </button>

//             {/* Main Image */}
//             <img
//               src={images[currentImageIndex]}
//               style={styles.modalImage}
//               alt={`Photo ${currentImageIndex + 1}`}
//             />

//             {/* Navigation Arrows */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   type="button"
//                   style={{
//                     ...styles.modalArrowButton,
//                     ...styles.modalArrowLeft,
//                   }}
//                   onClick={handlePrev}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#667eea";
//                     e.currentTarget.style.color = "#fff";
//                     e.currentTarget.style.transform =
//                       "translateY(-50%) scale(1.1)";
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 20px rgba(102, 126, 234, 0.3)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = "#fff";
//                     e.currentTarget.style.color = "#667eea";
//                     e.currentTarget.style.transform =
//                       "translateY(-50%) scale(1)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 12px rgba(0, 0, 0, 0.08)";
//                   }}
//                   title="Previous (←)"
//                 >
//                   <i className="fa fa-chevron-left" />
//                 </button>
//                 <button
//                   type="button"
//                   style={{
//                     ...styles.modalArrowButton,
//                     ...styles.modalArrowRight,
//                   }}
//                   onClick={handleNext}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = "#667eea";
//                     e.currentTarget.style.color = "#fff";
//                     e.currentTarget.style.transform =
//                       "translateY(-50%) scale(1.1)";
//                     e.currentTarget.style.boxShadow =
//                       "0 8px 20px rgba(102, 126, 234, 0.3)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.color = "#667eea";
//                     e.currentTarget.style.background = "#fff";
//                     e.currentTarget.style.transform =
//                       "translateY(-50%) scale(1)";
//                     e.currentTarget.style.boxShadow =
//                       "0 4px 12px rgba(0, 0, 0, 0.08)";
//                   }}
//                   title="Next (→)"
//                 >
//                   <i className="fa fa-chevron-right" />
//                 </button>
//               </>
//             )}

//             {/* Image Counter */}
//             {images.length > 1 && (
//               <div style={styles.imageCounter}>
//                 {currentImageIndex + 1} / {images.length}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserSideBar;



import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import { Link } from "react-router-dom";
import MembershipBadge from "./common/MembershipBadge";

const UserSideBar = ({ sidebarTop = "40px" }) => {
  const userId = localStorage.getItem("userId");
  const currentPath = window.location.pathname;

  const [userInfo, setUserInfo] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [imgHover, setImgHover] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
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
    { path: "/user/user-interest-page", icon: "fa fa-heart", label: "Interests" },
    { path: "/user/user-chat-page", icon: "fa fa-comments", label: "Chat" },
    { path: "/user/short-listed-profiles-page", icon: "fa fa-bookmark", label: "Shortlist" },
    { path: "/user/who-viewed-you-page", icon: "fa fa-eye", label: "Viewed You" },
    { path: "/user/blocked-profiles-page", icon: "fa fa-ban", label: "Blocked" },
    { path: "/user/ignored-profiles-page", icon: "fa fa-times-circle", label: "Ignored" },
    { path: "/user/user-plan-page", icon: "fa fa-credit-card", label: "Plan" },
    { path: "/user/user-settings-page", icon: "fa fa-cog", label: "Settings" },
    { path: "/user/user-login", icon: "fa fa-sign-out", label: "Logout", danger: true },
  ];

  const styles = {
    sidebar: {
      position: "sticky",
      top: sidebarTop,
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
      overflow: "hidden",
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
      border: "4px solid #667eea",
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
      background: "#667eea",
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
      marginBottom: "4px",
    },

    link: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      borderRadius: "10px",
      textDecoration: "none",
      color: "#4a5568",
      transition: "0.25s",
      position: "relative",
    },

    activeLink: {
      background: "#f0f4ff",
      color: "#667eea",
      fontWeight: "600",
    },

    activeDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#667eea",
      position: "absolute",
      left: "10px",
    },

    icon: {
      width: "22px",
      fontSize: "16px",
      marginRight: "14px",
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
      marginLeft: "12px",
      background: "#2d3748",
      color: "#fff",
      padding: "8px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: "500",
      whiteSpace: "nowrap",
      zIndex: 1000,
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

          <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
            <MembershipBadge user={userInfo} />
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
      position: "relative",
    }}
    onMouseEnter={() => setHoveredIndex(i)}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    {active && <span style={styles.activeDot}></span>}
    <i className={item.icon} style={styles.icon}></i>
    {item.label}

    <div
      style={{
        ...styles.tooltip,
        ...(hoveredIndex === i && styles.tooltipVisible),
      }}
    >
      <span style={styles.tooltipArrow}></span>
      {item.label}
    </div>
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
