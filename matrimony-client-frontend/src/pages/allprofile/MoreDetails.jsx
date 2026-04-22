// import React, { useEffect, useState, useMemo, useCallback } from "react";
// import { io } from "socket.io-client";
// import LayoutComponent from "../../components/layouts/LayoutComponent";
// import { useParams } from "react-router-dom";
// import {
//   getAllChatDoneByTheUser,
//   getTheProfieMoreDetails,
//   sendChatMessage,
//   getInterestedProfile,
//   isUserMadeTheInterest,
// } from "../../api/axiosService/userAuthService";
// import Footer from "../../components/Footer";
// import CopyRights from "../../components/CopyRights";
// import ShowInterest from "./ShowInterest";
// import ChatUi from "./ChatUi";
// import DisPlayProfileDetails from "./DisPlayProfileDetails";
// import defaultProfileImg from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";
// import maleDefault from "../../assets/images/profiles/men1.jpg";
// import femaleDefault from "../../assets/images/profiles/12.jpg";
// import { getUserProfile } from "../../api/axiosService/userAuthService";

// import profImage from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";




// // Helper Components
// const InfoRow = ({ label, value }) => {
//   if (!value) return null;
//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "10px",
//         padding: "8px 0",
//         fontSize: "0.95rem",
//         borderBottom: "1px solid #f0f0f0",
//       }}
//     >
//       <span style={{ color: "#666", fontWeight: "500", minWidth: "200px" }}>
//         {label}:
//       </span>
//       <span
//         style={{
//           color: "#333",
//           fontWeight: "600",
//           flex: 1,
//           wordBreak: "break-word",
//         }}
//       >
//         {value}
//       </span>
//     </div>
//   );
// };

// const ProfileSection = ({ title, icon, children }) => (
//   <div className="col-12 mb-3">
//     <div
//       style={{
//         padding: "20px",
//         background: "#fff",
//         borderRadius: "8px",
//         boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h4
//         style={{
//           marginBottom: "15px",
//           fontSize: "1.2rem",
//           fontWeight: "600",
//           color: "#333",
//           borderBottom: "2px solid #7c3aed",
//           paddingBottom: "10px",
//           display: "flex",
//           alignItems: "center",
//           gap: "10px",
//         }}
//       >
//         <i className={`fa ${icon}`} style={{ color: "#7c3aed" }}></i>
//         {title}
//       </h4>
//       <div style={{ display: "flex", flexDirection: "column" }}>{children}</div>
//     </div>
//   </div>
// );

// const SocialLink = ({ icon, color, label, value }) => (
//   <a
//     href={value.startsWith("http") ? value : `https://${value}`}
//     target="_blank"
//     rel="noopener noreferrer"
//     style={{
//       display: "flex",
//       alignItems: "center",
//       gap: "8px",
//       textDecoration: "none",
//       padding: "8px 16px",
//       borderRadius: "15px",
//       background: "#f3f4f6",
//       transition: "all 0.2s ease",
//       fontSize: "0.9rem",
//     }}
//   >
//     <i
//       className={`fa ${icon}`}
//       style={{ fontSize: "1.1rem", color: color }}
//     ></i>
//     <span style={{ color: "#333", fontWeight: "500" }}>{label}</span>
//   </a>
// );
// const MoreDetails = () => {
// const { profileId } = useParams();

//   const [userInfo, setUserInfo] = useState(null);
//   const [visibility, setVisibility] = useState("Public"); // 👈 FIRST
//   const [completionPercentage, setCompletionPercentage] = useState(0);

// useEffect(() => {
//   const fetchData = async () => {
//     if (!profileId) return;

//     try {
//       const response = await getTheProfieMoreDetails(profileId);
//       if (response.status === 200) {
//         setUserInfo(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };

//   fetchData();
// }, [profileId]);

//   useEffect(() => {
//     if (userInfo?.profileVisibility) {
//       setVisibility(userInfo.profileVisibility);
//     }
//   }, [userInfo]);

//   useEffect(() => {
//     if (userInfo) {
//       setCompletionPercentage(calculateProfileCompletion(userInfo));
//     }
//   }, [userInfo]);

//   const calculateProfileCompletion = (user) => {
//     if (!user) return 0;

//     // Define all profile fields grouped by section
//     const profileFields = {
//       basic: [
//         "profileCreatedFor",
//         "userName",
//         "dateOfBirth",
//         "bodyType",
//         "physicalStatus",
//         "complexion",
//         "height",
//         "weight",
//         "maritalStatus",
//         "eatingHabits",
//         "drinkingHabits",
//         "smokingHabits",
//         "motherTongue",
//         "caste",
//       ],
//       married: [
//         "marriedMonthYear",
//         "livingTogetherPeriod",
//         "childStatus",
//         "numberOfChildren",
//       ],
//       divorced: ["divorcedMonthYear", "reasonForDivorce"],
//       family: [
//         "fathersName",
//         "mothersName",
//         "fathersOccupation",
//         "fathersProfession",
//         "mothersOccupation",
//         "fathersNative",
//         "mothersNative",
//         "familyValue",
//         "familyType",
//         "familyStatus",
//         "residenceType",
//         "numberOfBrothers",
//         "numberOfSisters",
//       ],
//       religious: [
//         "religion",
//         "denomination",
//         "church",
//         "churchActivity",
//         "pastorsName",
//         "spirituality",
//         "religiousDetail",
//       ],
//       professional: [
//         "education",
//         "additionalEducation",
//         "college",
//         "educationDetail",
//         "employmentType",
//         "occupation",
//         "position",
//         "companyName",
//         "annualIncome",
//       ],
//       contact: [
//         "userMobile",
//         "alternateMobile",
//         "landlineNumber",
//         "userEmail",
//         "currentAddress",
//         "permanentAddress",
//         "city",
//         "state",
//         "pincode",
//         "citizenOf",
//         "contactPersonName",
//         "relationship",
//       ],
//       lifestyle: [
//         "hobbies",
//         "interests",
//         "music",
//         "favouriteReads",
//         "favouriteCuisines",
//         "sportsActivities",
//         "dressStyles",
//       ],
//       partners: [
//         "partnerAgeFrom",
//         "partnerAgeTo",
//         "partnerHeight",
//         "partnerMaritalStatus",
//         "partnerMotherTongue",
//         "partnerCaste",
//         "partnerPhysicalStatus",
//         "partnerEatingHabits",
//         "partnerDrinkingHabits",
//         "partnerSmokingHabits",
//         "partnerDenomination",
//         "partnerSpirituality",
//         "partnerEducation",
//         "partnerEmploymentType",
//         "partnerOccupation",
//         "partnerAnnualIncome",
//         "partnerCountry",
//         "partnerState",
//         "partnerDistrict",
//       ],
//       profile: ["profileImage", "aboutMe"],
//     };

//     // Helper function to check if a field is filled
//     const isFieldFilled = (fieldValue) => {
//       return (
//         fieldValue !== null &&
//         fieldValue !== undefined &&
//         fieldValue !== "" &&
//         (!Array.isArray(fieldValue) || fieldValue.length > 0)
//       );
//     };

//     // Count filled fields
//     let filledCount = 0;
//     let totalFields = 0;

//     // Count basic fields
//     profileFields.basic.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Add married fields if marital status indicates marriage
//     if (
//       user.maritalStatus &&
//       user.maritalStatus !== "Never Married" &&
//       user.maritalStatus !== "Unmarried"
//     ) {
//       profileFields.married.forEach((field) => {
//         totalFields++;
//         if (isFieldFilled(user[field])) {
//           filledCount++;
//         }
//       });
//     }

//     // Add divorced fields if marital status is divorced
//     if (
//       user.maritalStatus === "Divorced" ||
//       user.maritalStatus === "Awaiting Divorce"
//     ) {
//       profileFields.divorced.forEach((field) => {
//         totalFields++;
//         if (isFieldFilled(user[field])) {
//           filledCount++;
//         }
//       });
//     }

//     // Count family fields
//     profileFields.family.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count religious fields
//     profileFields.religious.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count professional fields
//     profileFields.professional.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count contact fields
//     profileFields.contact.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count lifestyle fields
//     profileFields.lifestyle.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count partner preference fields
//     profileFields.partners.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Count profile related fields
//     profileFields.profile.forEach((field) => {
//       totalFields++;
//       if (isFieldFilled(user[field])) {
//         filledCount++;
//       }
//     });

//     // Calculate percentage
//     const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;
//     return percentage;
//   };

//   const calculateAge = (dob) => {
//     if (!dob) return null;
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age;
//   };




//   return (
//     <div className="min-h-screen">
//       {/* Fixed Header */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       {/* Main Content Area */}
//       <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
//         <div className="db">
//           <div
//             className="container-fluid"
//             style={{ paddingLeft: 0, paddingRight: 0 }}
//           >
//             <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>

//               <div
//                 className="col-md-9 col-lg-10"
//                 style={{
//                   paddingLeft: "20px",
//                   paddingRight: "15px",
//                   height: "calc(100vh - 80px)",
//                   overflowY: "auto",
//                   overflowX: "hidden",
//                 }}
//               >
//                 <div className="row">
//                   {/* Header with Edit Button */}
//                   <div className="col-12">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         marginBottom: "20px",
//                       }}
//                     >
//                       <h2 className="db-tit" style={{ margin: 0 }}>
//                         My Profile
//                       </h2>

//                     </div>
//                   </div>

//                   {/* Profile Header Card */}
//                   <div className="col-12 mb-4">
//                     <div
//                       className="db-profile"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "25px",
//                         padding: "25px",
//                         background: "#fff",
//                         borderRadius: "10px",
//                         boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//                       }}
//                     >
//                       <div
//                         className="img overflow-hidden rounded-full flex items-center justify-center bg-gray-200"
//                         style={{
//                           width: "130px",
//                           height: "130px",
//                           minWidth: "130px",
//                           minHeight: "130px",
//                           border: "5px solid #7c3aed",
//                           borderRadius: "50%",
//                         }}
//                       >
//                         {userInfo?.profileImage ? (
//                           <img
//                             src={userInfo.profileImage}
//                             loading="lazy"
//                             alt="Profile"
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                               objectPosition: "center",
//                               borderRadius: "50%",
//                             }}
//                             onError={(e) => {
//                               e.target.src = profImage;
//                             }}
//                           />
//                         ) : (
//                           <img
//                             src={profImage}
//                             loading="lazy"
//                             alt="Default Profile"
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                               objectPosition: "center",
//                               borderRadius: "50%",
//                             }}
//                           />
//                         )}
//                       </div>

//                       <div className="profile-info" style={{ flex: 1 }}>
//                         <div className="user-details">
//                           <h3
//                             style={{
//                               margin: "0 0 15px 0",
//                               fontSize: "2rem",
//                               fontWeight: "700",
//                               color: "#333",
//                             }}
//                           >
//                             {userInfo?.userName || "User Name"}
//                           </h3>
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "column",
//                               gap: "10px",
//                             }}
//                           >
//                             <p
//                               style={{
//                                 margin: "0",
//                                 color: "#666",
//                                 fontSize: "1rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "10px",
//                               }}
//                             >
//                               <i
//                                 className="fa fa-id-card"
//                                 style={{ color: "#7c3aed", width: "18px" }}
//                               ></i>
//                               <span style={{ fontWeight: "500" }}>
//                                 <strong style={{ color: "#333" }}>
//                                   User ID:
//                                 </strong>{" "}
//                                 {userInfo?.agwid || "Not provided"}
//                               </span>
//                             </p>

//                             <p
//                               style={{
//                                 margin: "0",
//                                 color: "#666",
//                                 fontSize: "1rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "10px",
//                               }}
//                             >
//                               <i
//                                 className="fa fa-phone"
//                                 style={{ color: "#7c3aed", width: "18px" }}
//                               ></i>
//                               <span style={{ fontWeight: "500" }}>
//                                 {userInfo?.userMobile || "Not provided"}
//                               </span>
//                             </p>
//                             <p
//                               style={{
//                                 margin: "0",
//                                 color: "#666",
//                                 fontSize: "1rem",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 gap: "10px",
//                               }}
//                             >
//                               <i
//                                 className="fa fa-envelope"
//                                 style={{ color: "#7c3aed", width: "18px" }}
//                               ></i>
//                               <span style={{ fontWeight: "500" }}>
//                                 {userInfo?.userEmail || "Not provided"}
//                               </span>
//                             </p>
//                             <div
//                               style={{
//                                 marginTop: "5px",
//                                 display: "flex",
//                                 gap: "10px",
//                                 alignItems: "center",
//                               }}
//                             >
//                               <span
//                                 className={`badge ${
//                                   completionPercentage >= 75
//                                     ? "bg-success"
//                                     : completionPercentage >= 50
//                                       ? "bg-info"
//                                       : completionPercentage >= 25
//                                         ? "bg-warning text-dark"
//                                         : "bg-secondary"
//                                 }`}
//                                 style={{
//                                   padding: "8px 16px",
//                                   fontSize: "0.9rem",
//                                   fontWeight: "600",
//                                   borderRadius: "20px",
//                                 }}
//                               >
//                                 {completionPercentage}% Completed
//                               </span>
//                               <span
//                                 className="badge bg-info"
//                                 style={{
//                                   padding: "8px 16px",
//                                   fontSize: "0.9rem",
//                                   fontWeight: "600",
//                                   borderRadius: "20px",
//                                 }}
//                               >
//                                 {visibility}
//                               </span>

//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* About Me Section */}
// {userInfo?.aboutMe && (
//   <div className="col-12 mb-3">
//     <div
//       style={{
//         padding: "20px",
//         background: "#fff",
//         borderRadius: "10px",
//         boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
//       }}
//     >
//       <h4
//         style={{
//           marginBottom: "15px",
//           fontSize: "1.3rem",
//           fontWeight: "600",
//           color: "#333",
//           borderBottom: "2px solid #7c3aed",
//           paddingBottom: "10px",
//           display: "flex",
//           alignItems: "center",
//           gap: "10px",
//         }}
//       >
//         <i
//           className="fa fa-user-circle"
//           style={{ color: "#7c3aed" }}
//         ></i>
//         About Me
//       </h4>
//       <p
//         style={{
//           color: "#666",
//           fontSize: "1rem",
//           lineHeight: "1.6",
//           whiteSpace: "pre-line",
//           margin: 0,
//         }}
//       >
//         {userInfo.aboutMe}
//       </p>
//     </div>
//   </div>
// )}

// {/* Basic Details Section */}
// <ProfileSection title="Basic Details" icon="fa-info-circle">
//   <InfoRow
//     label="Profile Created By"
//     value={userInfo?.profileCreatedFor}
//   />
//   <InfoRow label="Name" value={userInfo?.userName} />
//   <InfoRow
//     label="Age"
//     value={
//       userInfo?.dateOfBirth
//         ? `${calculateAge(
//             userInfo.dateOfBirth,
//           )} years / ${new Date(
//             userInfo.dateOfBirth,
//           ).toLocaleDateString("en-US", {
//             month: "short",
//             day: "numeric",
//             year: "numeric",
//           })}`
//         : null
//     }
//   />
//   <InfoRow label="Body Type" value={userInfo?.bodyType} />
//   <InfoRow
//     label="Physical Status"
//     value={userInfo?.physicalStatus}
//   />
//   <InfoRow label="Complexion" value={userInfo?.complexion} />
//   <InfoRow label="Height" value={userInfo?.height || null} />
//   <InfoRow label="Weight" value={userInfo?.weight || null} />
//   <InfoRow
//     label="Marital Status"
//     value={userInfo?.maritalStatus}
//   />

//   {userInfo?.maritalStatus &&
//     userInfo.maritalStatus !== "Never Married" && (
//       <>
//         <InfoRow
//           label="Married Month & Year"
//           value={userInfo?.marriedMonthYear}
//         />
//         <InfoRow
//           label="Living Together Period"
//           value={userInfo?.livingTogetherPeriod}
//         />
//         <InfoRow
//           label="Child Status"
//           value={userInfo?.childStatus}
//         />
//         <InfoRow
//           label="No. of Children"
//           value={userInfo?.numberOfChildren}
//         />
//       </>
//     )}

//   {(userInfo?.maritalStatus === "Divorced" ||
//     userInfo?.maritalStatus === "Awaiting Divorce") && (
//     <>
//       <InfoRow
//         label="Divorced Month & Year"
//         value={userInfo?.divorcedMonthYear}
//       />
//       <InfoRow
//         label="Reason for Divorce"
//         value={userInfo?.reasonForDivorce}
//       />
//     </>
//   )}

//   <InfoRow
//     label="Eating Habits"
//     value={userInfo?.eatingHabits}
//   />
//   <InfoRow
//     label="Drinking Habits"
//     value={userInfo?.drinkingHabits}
//   />
//   <InfoRow
//     label="Smoking Habits"
//     value={userInfo?.smokingHabits}
//   />
//   <InfoRow
//     label="Mother Tongue"
//     value={userInfo?.motherTongue}
//   />
//   <InfoRow label="Caste" value={userInfo?.caste} />
// </ProfileSection>

// {/* Family Details Section */}
// <ProfileSection title="Family Details" icon="fa-users">
//   <InfoRow
//     label="Father's Name"
//     value={userInfo?.fathersName}
//   />
//   <InfoRow
//     label="Mother's Name"
//     value={userInfo?.mothersName}
//   />
//   <InfoRow
//     label="Father's Occupation"
//     value={userInfo?.fathersOccupation}
//   />
//   <InfoRow
//     label="Father's Profession"
//     value={userInfo?.fathersProfession}
//   />
//   <InfoRow
//     label="Mother's Occupation"
//     value={userInfo?.mothersOccupation}
//   />
//   <InfoRow
//     label="Father's Native"
//     value={userInfo?.fathersNative}
//   />
//   <InfoRow
//     label="Mother's Native"
//     value={userInfo?.mothersNative}
//   />
//   <InfoRow
//     label="Family Value"
//     value={userInfo?.familyValue}
//   />
//   <InfoRow label="Family Type" value={userInfo?.familyType} />
//   <InfoRow
//     label="Family Status"
//     value={userInfo?.familyStatus}
//   />
//   <InfoRow
//     label="Residence Type"
//     value={userInfo?.residenceType}
//   />
//   <InfoRow
//     label="No. of Brothers"
//     value={userInfo?.numberOfBrothers}
//   />
//   <InfoRow
//     label="No. of Sisters"
//     value={userInfo?.numberOfSisters}
//   />
// </ProfileSection>

// {/* Religious Information Section */}
// <ProfileSection
//   title="Religious Information"
//   icon="fa-praying-hands"
// >
//   <InfoRow label="Religion" value={userInfo?.religion} />
//   <InfoRow
//     label="Denomination"
//     value={userInfo?.denomination}
//   />
//   <InfoRow label="Church" value={userInfo?.church} />
//   <InfoRow
//     label="Church Activity"
//     value={userInfo?.churchActivity}
//   />
//   <InfoRow
//     label="Pastor's Name"
//     value={userInfo?.pastorsName}
//   />
//   <InfoRow
//     label="Spirituality"
//     value={userInfo?.spirituality}
//   />
//   <InfoRow
//     label="Religious Detail"
//     value={userInfo?.religiousDetail}
//   />
// </ProfileSection>

// {/* Professional Information Section */}
// <ProfileSection
//   title="Professional Information"
//   icon="fa-briefcase"
// >
//   <InfoRow label="Education" value={userInfo?.education} />
//   <InfoRow
//     label="Additional Education"
//     value={userInfo?.additionalEducation}
//   />
//   <InfoRow
//     label="College/Institution"
//     value={userInfo?.college}
//   />
//   <InfoRow
//     label="Education in Detail"
//     value={userInfo?.educationDetail}
//   />
//   <InfoRow
//     label="Employment Type"
//     value={userInfo?.employmentType}
//   />
//   <InfoRow label="Occupation" value={userInfo?.occupation} />
//   <InfoRow label="Position" value={userInfo?.position} />
//   <InfoRow
//     label="Company Name"
//     value={userInfo?.companyName}
//   />
//   <InfoRow
//     label="Annual Income"
//     value={userInfo?.annualIncome}
//   />
// </ProfileSection>

// {/* Contact Information Section */}
// <ProfileSection
//   title="Contact Information"
//   icon="fa-address-card"
// >
//   <InfoRow
//     label="Mobile Number"
//     value={userInfo?.userMobile}
//   />
//   <InfoRow
//     label="Alternate Mobile"
//     value={userInfo?.alternateMobile}
//   />
//   <InfoRow
//     label="Landline"
//     value={userInfo?.landlineNumber}
//   />
//   <InfoRow label="Email" value={userInfo?.userEmail} />
//   <InfoRow
//     label="Current Address"
//     value={userInfo?.currentAddress}
//   />
//   <InfoRow
//     label="Permanent Address"
//     value={userInfo?.permanentAddress}
//   />
//   <InfoRow label="City" value={userInfo?.city} />
//   <InfoRow label="State" value={userInfo?.state} />
//   <InfoRow label="Pincode" value={userInfo?.pincode} />
//   <InfoRow label="Citizen Of" value={userInfo?.citizenOf} />
//   <InfoRow
//     label="Contact Person"
//     value={userInfo?.contactPersonName}
//   />
//   <InfoRow
//     label="Relationship"
//     value={userInfo?.relationship}
//   />
// </ProfileSection>

// {/* Lifestyle & Hobbies Section */}
// <ProfileSection title="Lifestyle & Hobbies" icon="fa-guitar">
//   <InfoRow
//     label="Hobbies"
//     value={
//       Array.isArray(userInfo?.hobbies)
//         ? userInfo.hobbies.join(", ")
//         : userInfo?.hobbies
//     }
//   />
//   <InfoRow label="Interests" value={userInfo?.interests} />
//   <InfoRow label="Music" value={userInfo?.music} />
//   <InfoRow
//     label="Favourite Reads"
//     value={userInfo?.favouriteReads}
//   />
//   <InfoRow
//     label="Favourite Cuisines"
//     value={userInfo?.favouriteCuisines}
//   />
//   <InfoRow
//     label="Sports/Activities"
//     value={userInfo?.sportsActivities}
//   />
//   <InfoRow
//     label="Dress Styles"
//     value={userInfo?.dressStyles}
//   />
// </ProfileSection>

// {/* Partner Preferences Section */}
// <ProfileSection title="Partner Preferences" icon="fa-heart">
//   <div style={{ marginBottom: "10px" }}>
//     <h5
//       style={{
//         color: "#7c3aed",
//         marginTop: "10px",
//         marginBottom: "15px",
//         fontWeight: "600",
//         fontSize: "1.05rem",
//       }}
//     >
//       Basic & Religious
//     </h5>
//   </div>
//   <InfoRow
//     label="Age Range"
//     value={
//       userInfo?.partnerAgeFrom && userInfo?.partnerAgeTo
//         ? `${userInfo.partnerAgeFrom} - ${userInfo.partnerAgeTo} Years`
//         : null
//     }
//   />
//   <InfoRow
//     label="Height"
//     value={
//       userInfo?.partnerHeight
//         ? `${userInfo.partnerHeight} cm`
//         : null
//     }
//   />
//   <InfoRow
//     label="Marital Status"
//     value={userInfo?.partnerMaritalStatus}
//   />
//   <InfoRow
//     label="Mother Tongue"
//     value={userInfo?.partnerMotherTongue}
//   />
//   <InfoRow label="Caste" value={userInfo?.partnerCaste} />
//   <InfoRow
//     label="Physical Status"
//     value={userInfo?.partnerPhysicalStatus}
//   />
//   <InfoRow
//     label="Eating Habits"
//     value={userInfo?.partnerEatingHabits}
//   />
//   <InfoRow
//     label="Drinking Habits"
//     value={userInfo?.partnerDrinkingHabits}
//   />
//   <InfoRow
//     label="Smoking Habits"
//     value={userInfo?.partnerSmokingHabits}
//   />
//   <InfoRow
//     label="Denomination"
//     value={userInfo?.partnerDenomination}
//   />
//   <InfoRow
//     label="Spirituality"
//     value={userInfo?.partnerSpirituality}
//   />

//   <div style={{ marginTop: "20px", marginBottom: "10px" }}>
//     <h5
//       style={{
//         color: "#7c3aed",
//         marginBottom: "15px",
//         fontWeight: "600",
//         fontSize: "1.05rem",
//       }}
//     >
//       Professional & Location
//     </h5>
//   </div>
//   <InfoRow
//     label="Education"
//     value={userInfo?.partnerEducation}
//   />
//   <InfoRow
//     label="Employment Type"
//     value={userInfo?.partnerEmploymentType}
//   />
//   <InfoRow
//     label="Occupation"
//     value={userInfo?.partnerOccupation}
//   />
//   <InfoRow
//     label="Annual Income"
//     value={userInfo?.partnerAnnualIncome}
//   />
//   <InfoRow label="Country" value={userInfo?.partnerCountry} />
//   <InfoRow label="State" value={userInfo?.partnerState} />
//   <InfoRow
//     label="District"
//     value={userInfo?.partnerDistrict}
//   />
// </ProfileSection>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//       <CopyRights />
//     </div>
//   );
// };

// export default MoreDetails;




// import React, { useEffect, useState, useMemo } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import LayoutComponent from "../../components/layouts/LayoutComponent";
// import Footer from "../../components/Footer";
// import CopyRights from "../../components/CopyRights";
// import ShowInterest from "./ShowInterest";
// import { getTheProfieMoreDetails, getUserProfile } from "../../api/axiosService/userAuthService";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChurch } from '@fortawesome/free-solid-svg-icons';
// import profImage from "../../assets/images/blue-circle-with-white-user_78370-4707.avif";

// // Helper Components
// const InfoRow = ({ label, value }) => {
//   if (!value) return null;
//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: "10px",
//         padding: "8px 0",
//         fontSize: "0.95rem",
//         borderBottom: "1px solid #f0f0f0",
//       }}
//     >
//       <span style={{ color: "#666", fontWeight: "500", minWidth: "200px" }}>{label}:</span>
//       <span style={{ color: "#333", fontWeight: "600", flex: 1, wordBreak: "break-word" }}>{value}</span>
//     </div>
//   );
// };

// const ProfileSection = ({ title, icon, children }) => (
//   <div className="col-12">
//     <div style={{ padding: "12px 0", borderBottom: "1px solid #e5e7eb" }}>
//       <h4
//         style={{
//           marginBottom: "8px",
//           fontSize: "1.05rem",
//           fontWeight: "600",
//           color: "#333",
//           display: "flex",
//           alignItems: "center",
//           gap: "8px",
//         }}
//       >
//         <FontAwesomeIcon icon={faChurch} style={{ color: "#7c3aed" }} />
//         {title}
//       </h4>
//       <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>{children}</div>
//     </div>
//   </div>
// );

// const MoreDetails = () => {
//   const { profileId } = useParams();
//   const navigate = useNavigate();
//   const currentUserId = localStorage.getItem("userId");

//   const [userInfo, setUserInfo] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [showInterestModalUser, setShowInterestModalUser] = useState(null);
//   const [zoomImage, setZoomImage] = useState(null);
//   const [zoomLevel, setZoomLevel] = useState(1);
//   const [loadingUser, setLoadingUser] = useState(true);
//   const [showContact, setShowContact] = useState(false);
//   const [showUpgradePopup, setShowUpgradePopup] = useState(false);
//   // Fetch current logged-in user
//   useEffect(() => {
//     const fetchCurrentUser = async () => {
//       try {
//         const res = await getUserProfile(currentUserId);
//         if (res.status === 200) {
//           setCurrentUser(res.data.data);
//         }
//       } catch (err) {
//         console.error("Error fetching current user:", err);
//       } finally {
//         setLoadingUser(false); // ✅ முக்கியம்
//       }
//     };

//     fetchCurrentUser();
//   }, [currentUserId]);

//   const isPaidUser = useMemo(() => {
//     if (!currentUser) return false;
//     if (!currentUser.isAnySubscriptionTaken) return false;
//     return currentUser.paymentDetails?.some(p => p.subscriptionStatus?.toLowerCase() === "active");
//   }, [currentUser]);

//   // Fetch profile details
//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!profileId) return;
//       try {
//         const response = await getTheProfieMoreDetails(profileId);
//         if (response.status === 200) setUserInfo(response.data.data);
//       } catch (err) {
//         console.error("Error fetching profile details:", err);
//       }
//     };
//     fetchProfile();
//   }, [profileId]);

//   const calculateAge = (dob) => {
//     if (!dob) return null;
//     const birthDate = new Date(dob);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
//     return age;
//   };

//   const handleShowInterestClick = () => {
//     setShowInterestModalUser(userInfo);
//   };

//   if (loadingUser) {
//     return null;
//   }

//   const handleContactClick = () => {
//     if (!isPaidUser) {
//       setShowUpgradePopup(true);
//     } else {
//       setShowContact(true);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white-100">
//       {/* Fixed Header */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
//         <div className="db">
//           <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
//             <div className="row" style={{ marginLeft: 0, marginRight: 0, position: "relative" }}>

//               {/* Left Column: Profile Image + Show Interest */}
//               <div
//                 className="col-md-3 col-lg-2"
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   gap: "20px",
//                   paddingTop: "0px",
//                   paddingBottom: "20px",

//                 }}
//               >
//                 <div
//                   style={{
//                     position: "relative",
//                     width: "100%",
//                     padding: "10px",
//                     background: "#fff",
//                     borderRadius: "12px",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div style={{ position: "relative", width: "100%", maxWidth: "300px", margin: "0 auto" }}>
//                     <img
//                       src={userInfo?.profileImage || profImage}
//                       alt="Profile"
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         borderRadius: "12px",
//                         objectFit: "cover",
//                         display: "block",
//                       }}
//                     />
//                     <div
//                       style={{
//                         position: "absolute",
//                         top: "10px",
//                         right: "10px",
//                         background: "#7c3aed",
//                         color: "#fff",
//                         padding: "6px 10px",
//                         borderRadius: "50%",
//                         fontSize: "1.1rem",
//                         cursor: "pointer",
//                       }}
//                       title="Zoom"
//                       onClick={() => setZoomImage(userInfo?.profileImage || profImage)}
//                     >
//                       <i className="fa fa-search-plus"></i>
//                     </div>
//                   </div>

//                   <button
//                     disabled={!isPaidUser}
//                     style={{
//                       width: "100%",
//                       background: isPaidUser ? "#7c3aed" : "#999",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "8px",
//                       padding: "12px 0",
//                       fontSize: "1rem",
//                       fontWeight: "600",
//                       gap: "90px",
//                       cursor: isPaidUser ? "pointer" : "not-allowed",
//                       opacity: isPaidUser ? 1 : 0.6,
//                     }}
//                     onClick={(e) => {
//                       if (!isPaidUser) {
//                         e.preventDefault();
//                         return;
//                       }
//                       handleShowInterestClick();
//                     }}
//                     {...(isPaidUser && {
//                       "data-bs-toggle": "modal",
//                       "data-bs-target": "#sendInter",
//                     })}
//                   >
//                     Send Interest
//                   </button>
//                 </div>
//               </div>

//               {/* Right Column */}
//               <div className="col-md-9 col-lg-10" style={{ paddingLeft: "40px", paddingRight: "15px", position: "relative" }}>
//                 {/* AGW ID - always visible */}
//                 <div
//                   style={{
//                     textAlign: "center",
//                     background: "rgba(124, 58, 237, 0.85)",
//                     color: "#fff",
//                     padding: "8px 16px",
//                     borderRadius: "20px",
//                     fontWeight: "600",
//                     marginBottom: "10px",
//                     fontSize: "1rem",
//                     display: "inline-block",
//                     zIndex: 10,
//                   }}
//                 >
//                   AGW ID: {userInfo?.agwid || "N/A"}
//                 </div>

//                 {/* Blur other profile details for unpaid users */}
//                 <div
//                 // style={{
//                 //   filter: isPaidUser ? "none" : "blur(8px)",
//                 //   pointerEvents: isPaidUser ? "auto" : "none",
//                 //   userSelect: isPaidUser ? "auto" : "none",
//                 //   transition: "0.3s ease",
//                 // }}
//                 >
//                   {/* About Me */}
//                   {userInfo?.aboutMe && (
//                     <div
//                       style={{
//                         background: "#fff",
//                         padding: "20px",
//                         borderRadius: "10px",
//                         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//                         marginBottom: "25px",
//                       }}
//                     >
//                       <h4 style={{ color: "#7c3aed", marginBottom: "10px" }}>About Me</h4>
//                       <p style={{ whiteSpace: "pre-line", color: "#444", margin: 0 }}>{userInfo.aboutMe}</p>
//                     </div>
//                   )}

//                   {/* All Profile Sections */}
//                   {[
//                     {
//                       title: "Basic Details",
//                       icon: "fa-info-circle",
//                       data: [
//                         { label: "Profile Created By", value: userInfo?.profileCreatedFor },
//                         { label: "Name", value: userInfo?.userName },
//                         { label: "Age", value: userInfo?.dateOfBirth ? `${calculateAge(userInfo.dateOfBirth)} years` : null },
//                         { label: "Body Type", value: userInfo?.bodyType },
//                         { label: "Physical Status", value: userInfo?.physicalStatus },
//                         { label: "Complexion", value: userInfo?.complexion },
//                         { label: "Height", value: userInfo?.height },
//                         { label: "Weight", value: userInfo?.weight },
//                         { label: "Marital Status", value: userInfo?.maritalStatus },
//                         { label: "Eating Habits", value: userInfo?.eatingHabits },
//                       ],
//                     },
//                     {
//                       title: "Family Details",
//                       icon: "fa-users",
//                       data: [
//                         { label: "Father's Name", value: userInfo?.fathersName },
//                         { label: "Mother's Name", value: userInfo?.mothersName },
//                         { label: "Father's Occupation", value: userInfo?.fathersOccupation },
//                         { label: "Mother's Occupation", value: userInfo?.mothersOccupation },
//                         { label: "Family Value", value: userInfo?.familyValue },
//                         { label: "Family Type", value: userInfo?.familyType },
//                         { label: "No. of Brothers", value: userInfo?.numberOfBrothers },
//                         { label: "No. of Sisters", value: userInfo?.numberOfSisters },
//                         { label: "Residence Type", value: userInfo?.residenceType },
//                         { label: "Family Status", value: userInfo?.familyStatus },
//                       ],
//                     },
//                     {
//                       title: "Religious Information",
//                       icon: "fa-church",
//                       data: [
//                         { label: "Religion", value: userInfo?.religion },
//                         { label: "Denomination", value: userInfo?.denomination },
//                         { label: "Church", value: userInfo?.church },
//                         { label: "Church Activity", value: userInfo?.churchActivity },
//                         { label: "Pastor's Name", value: userInfo?.pastorsName },
//                         { label: "Spirituality", value: userInfo?.spirituality },
//                         { label: "Religious Detail", value: userInfo?.religiousDetail },
//                       ],
//                     },
//                     {
//                       title: "Professional Information",
//                       icon: "fa-briefcase",
//                       data: [
//                         { label: "Education", value: userInfo?.education },
//                         { label: "Additional Education", value: userInfo?.additionalEducation },
//                         { label: "College/Institution", value: userInfo?.college },
//                         { label: "Education in Detail", value: userInfo?.educationDetail },
//                         { label: "Employment Type", value: userInfo?.employmentType },
//                         { label: "Occupation", value: userInfo?.occupation },
//                         { label: "Position", value: userInfo?.position },
//                         { label: "Company Name", value: userInfo?.companyName },
//                         { label: "Annual Income", value: userInfo?.annualIncome },
//                       ],
//                     },
//                     {
//                       title: "Contact Information",
//                       icon: "fa-address-card",
//                       data: showContact
//                         ? [
//                           { label: "Mobile Number", value: userInfo?.userMobile },
//                           { label: "Alternate Mobile", value: userInfo?.alternateMobile },
//                           { label: "Landline", value: userInfo?.landlineNumber },
//                           { label: "Email", value: userInfo?.userEmail },
//                           { label: "Current Address", value: userInfo?.currentAddress },
//                           { label: "Permanent Address", value: userInfo?.permanentAddress },
//                           { label: "City", value: userInfo?.city },
//                           { label: "State", value: userInfo?.state },
//                           { label: "Pincode", value: userInfo?.pincode },
//                           { label: "Citizen Of", value: userInfo?.citizenOf },
//                         ]
//                         : [],
//                     },
//                     {
//                       title: "Lifestyle & Hobbies",
//                       icon: "fa-music",
//                       data: [
//                         { label: "Hobbies", value: Array.isArray(userInfo?.hobbies) ? userInfo.hobbies.join(", ") : userInfo?.hobbies },
//                         { label: "Interests", value: userInfo?.interests },
//                         { label: "Music", value: userInfo?.music },
//                         { label: "Favourite Reads", value: userInfo?.favouriteReads },
//                         { label: "Favourite Cuisines", value: userInfo?.favouriteCuisines },
//                         { label: "Sports/Activities", value: userInfo?.sportsActivities },
//                         { label: "Dress Styles", value: userInfo?.dressStyles },
//                       ],
//                     },
//                     {
//                       title: "Partner Preferences",
//                       icon: "fa-heart",
//                       data: [
//                         { label: "Age Range", value: userInfo?.partnerAgeFrom && userInfo?.partnerAgeTo ? `${userInfo.partnerAgeFrom} - ${userInfo.partnerAgeTo} Years` : null },
//                         { label: "Height", value: userInfo?.partnerHeight ? `${userInfo.partnerHeight} cm` : null },
//                         { label: "Marital Status", value: userInfo?.partnerMaritalStatus },
//                         { label: "Mother Tongue", value: userInfo?.partnerMotherTongue },
//                         { label: "Caste", value: userInfo?.partnerCaste },
//                         { label: "Physical Status", value: userInfo?.partnerPhysicalStatus },
//                         { label: "Eating Habits", value: userInfo?.partnerEatingHabits },
//                         { label: "Drinking Habits", value: userInfo?.partnerDrinkingHabits },
//                         { label: "Smoking Habits", value: userInfo?.partnerSmokingHabits },
//                         { label: "Denomination", value: userInfo?.partnerDenomination },
//                         { label: "Spirituality", value: userInfo?.partnerSpirituality },
//                         { label: "Education", value: userInfo?.partnerEducation },
//                         { label: "Employment Type", value: userInfo?.partnerEmploymentType },
//                         { label: "Occupation", value: userInfo?.partnerOccupation },
//                         { label: "Annual Income", value: userInfo?.partnerAnnualIncome },
//                         { label: "Country", value: userInfo?.partnerCountry },
//                         { label: "State", value: userInfo?.partnerState },
//                         { label: "District", value: userInfo?.partnerDistrict },
//                       ],
//                     },
//                   ].map((section, idx) => (
//                     <React.Fragment key={idx}>

//                       {/* Contact Button */}
//                       {section.title === "Contact Information" && !showContact && (
//                         <div style={{ marginBottom: "15px" }}>
//                           <button
//                             onClick={handleContactClick}
//                             style={{
//                               background: "#7c3aed",
//                               color: "#fff",
//                               border: "none",
//                               padding: "10px 20px",
//                               borderRadius: "8px",
//                               cursor: "pointer",
//                               fontWeight: "600",
//                             }}
//                           >
//                             View Contact Information
//                           </button>
//                         </div>
//                       )}

//                       <ProfileSection title={section.title} icon={section.icon}>
//                         <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
//                           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
//                             {section.data.slice(0, 5).map((item, i) => (
//                               <InfoRow key={i} {...item} />
//                             ))}
//                           </div>
//                           <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
//                             {section.data.slice(5).map((item, i) => (
//                               <InfoRow key={i} {...item} />
//                             ))}
//                           </div>
//                         </div>
//                       </ProfileSection>

//                     </React.Fragment>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Paid Users Only Overlay
//      {!loadingUser && !isPaidUser && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000,
//             background: "rgba(0, 0, 0, 0.65)",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "40px 30px",
//               borderRadius: "12px",
//               boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
//               maxWidth: "400px",
//               width: "100%",
//               textAlign: "center",
//             }}
//           >
//             <h4 style={{ marginBottom: "15px", fontSize: "1.5rem", fontWeight: "700", color: "#333" }}>
//               🔒 Paid Users Only
//             </h4>
//             <p style={{ marginBottom: "25px", fontSize: "1rem", color: "#555" }}>
//               Upgrade your plan to view full profile details.
//             </p>
//             <button
//               onClick={() => navigate("/user/user-plan-selection")}
//               style={{
//                 background: "#7c3aed",
//                 color: "#fff",
//                 border: "none",
//                 padding: "12px 25px",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 fontWeight: "600",
//                 fontSize: "1rem",
//               }}
//               onMouseEnter={e => (e.currentTarget.style.background = "#6d28d9")}
//               onMouseLeave={e => (e.currentTarget.style.background = "#7c3aed")}
//             >
//               Upgrade Now
//             </button>
//           </div>
//         </div>
//       )} */}

//       {showInterestModalUser && (
//         <ShowInterest
//           selectedUser={showInterestModalUser}
//           userId={userInfo?._id}
//           onSuccess={() => alert("Interest sent successfully!")}
//         />
//       )}

//       {zoomImage && (
//         <div
//           onClick={() => {
//             setZoomImage(null);
//             setZoomLevel(1);
//           }}
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.9)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 10000,
//             cursor: "zoom-out",
//           }}
//         >
//           <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: "1.5rem", fontWeight: "600" }}>
//             {userInfo?.userName}
//           </div>

//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{ position: "absolute", bottom: "30px", display: "flex", gap: "15px" }}
//           >
//             <button
//               onClick={() => setZoomLevel((z) => Math.max(0.5, z - 0.2))}
//               style={{ padding: "10px 15px", fontSize: "1.2rem", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer", fontWeight: "600" }}
//             >
//               -
//             </button>
//             <button
//               onClick={() => setZoomLevel(1)}
//               style={{ padding: "10px 15px", fontSize: "1rem", borderRadius: "8px", border: "none", background: "#444", color: "#fff", cursor: "pointer", fontWeight: "600" }}
//             >
//               Reset
//             </button>
//             <button
//               onClick={() => setZoomLevel((z) => Math.min(3, z + 0.2))}
//               style={{ padding: "10px 15px", fontSize: "1.2rem", borderRadius: "8px", border: "none", background: "#7c3aed", color: "#fff", cursor: "pointer", fontWeight: "600" }}
//             >
//               +
//             </button>
//           </div>

//           <img
//             src={zoomImage}
//             alt="Zoomed"
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               maxWidth: "100vw",
//               maxHeight: "100vh",
//               objectFit: "contain",
//               borderRadius: "12px",
//               transform: `scale(${zoomLevel})`,
//               transition: "transform 0.2s ease",
//               cursor: "grab",
//             }}
//           />
//         </div>
//       )}
//       {showUpgradePopup && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0, 0, 0, 0.65)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             backdropFilter: "blur(4px)",
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: "35px 30px",
//               borderRadius: "16px",
//               textAlign: "center",
//               width: "100%",
//               maxWidth: "380px",
//               boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
//               animation: "fadeInScale 0.3s ease",
//             }}
//           >
//             {/* Icon */}
//             <div
//               style={{
//                 fontSize: "40px",
//                 marginBottom: "10px",
//               }}
//             >
//               🔒
//             </div>

//             {/* Title */}
//             <h3
//               style={{
//                 fontSize: "1.4rem",
//                 fontWeight: "700",
//                 marginBottom: "10px",
//                 color: "#111",
//               }}
//             >
//               Premium Feature
//             </h3>

//             {/* Description */}
//             <p
//               style={{
//                 fontSize: "0.95rem",
//                 color: "#666",
//                 marginBottom: "25px",
//               }}
//             >
//               Upgrade your plan to unlock contact details and connect directly.
//             </p>

//             {/* Buttons */}
//             <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
//               <button
//                 onClick={() => navigate("/user/user-plan-selection")}
//                 style={{
//                   background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
//                   color: "#fff",
//                   border: "none",
//                   padding: "10px 18px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                   fontSize: "0.95rem",
//                   transition: "0.2s",
//                 }}
//                 onMouseEnter={(e) =>
//                   (e.currentTarget.style.transform = "scale(1.05)")
//                 }
//                 onMouseLeave={(e) =>
//                   (e.currentTarget.style.transform = "scale(1)")
//                 }
//               >
//                 Upgrade Now
//               </button>

//               <button
//                 onClick={() => setShowUpgradePopup(false)}
//                 style={{
//                   background: "#f3f4f6",
//                   color: "#333",
//                   border: "none",
//                   padding: "10px 18px",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontWeight: "500",
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>

//           {/* Animation */}
//           <style>
//             {`
//         @keyframes fadeInScale {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//       `}
//           </style>
//         </div>
//       )}
//       <Footer />
//       <CopyRights />
//     </div>
//   );
// };

// export default MoreDetails;





import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import ShowInterest from "./ShowInterest";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTheProfieMoreDetails, getUserProfile, getMyActivePlanData, sendChatMessage } from "../../api/axiosService/userAuthService";
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
        handleContactClick(); // Or you can keep alert("Please subscribe to your plan.");
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
                disabled={!isPaidUser}
                className={`interest-btn ${isPaidUser ? "" : "disabled"}`}
                onClick={(e) => {
                  if (!isPaidUser) {
                    e.preventDefault();
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
            </div>
          </div>

          {/* Right Column */}
          <div className="profile-right">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <div className="agv-id" style={{ marginBottom: "0", display: 'flex', alignItems: 'center', gap: '10px' }}>
                AGV ID: {userInfo?.agwid || "N/A"}
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
            <p>Upgrade your plan to unlock contact details and connect directly.</p>
            <div className="upgrade-buttons">
              <button onClick={() => navigate("/user/user-plan-selection")} className="upgrade-btn">Upgrade Now</button>
              <button onClick={() => setShowUpgradePopup(false)} className="cancel-btn">Cancel</button>
            </div>
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


