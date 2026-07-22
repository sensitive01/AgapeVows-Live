import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import UserSideBar from "../components/UserSideBar";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import { getUserProfile, uploadIdProof } from "../api/axiosService/userAuthService";
import profImage from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import LayoutComponent from "../components/layouts/LayoutComponent";
import { showAlert } from "../utils/alertService";
import MembershipBadge from "../components/common/MembershipBadge";
import MaskedIdGuide from "../assets/images/Masked_ID_Guide.pdf";
import imageCompression from 'browser-image-compression';

// Helper Components
const InfoRow = ({ label, value }) => {
  let normalizedValue = value;

  if (Array.isArray(value)) {
    normalizedValue = value.length > 0 ? value.join(", ") : "";
  }

  const displayValue = (normalizedValue === null || normalizedValue === undefined || normalizedValue === "")
    ? "Not Specified"
    : normalizedValue;

  const isSerializedAddress =
    typeof displayValue === "string" && displayValue.includes("|||");

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

      {isSerializedAddress ? (
        (() => {
          const parts = String(displayValue)
            .split("|||")
            .map((p) => p && p.trim())
            .filter(Boolean);

          const lines = [];
          if (parts[0]) lines.push(parts[0]);
          if (parts[1]) lines.push(parts[1]);

          const cityStatePincode = [parts[4], parts[3], parts[5]]
            .filter(Boolean)
            .join(", ");
          if (cityStatePincode) lines.push(cityStatePincode);

          if (parts[2] && !lines.includes(parts[2])) lines.push(parts[2]);

          return (
            <div style={{ color: "#111827", fontSize: "16px", fontWeight: 700, flex: "1 1 55%" }}>
              {lines.map((ln, idx) => (
                <div key={idx} style={{ marginBottom: 2 }}>{ln}</div>
              ))}
            </div>
          );
        })()
      ) : (
        <span
          className="font-source font-bold text-[16px]"
          style={{
            color: "#111827",
            wordBreak: "break-word",
            flex: "1 1 55%",
          }}
        >
          {displayValue}
        </span>
      )}
    </div>
  );
};

const ProfileSection = ({ title, icon, children, footerAlert }) => (
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
          <i className={`fa ${icon}`} style={{ color: "#fff", fontSize: "1.1rem" }}></i>
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
      <div className="profile-section-grid">
        {children}
      </div>
      {footerAlert && (
        <div style={{
          marginTop: "25px",
          padding: "14px 20px",
          background: "#f8f5fd",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "#58219f",
          fontSize: "14px",
          fontWeight: "500"
        }}>
          <i className="fa fa-shield" style={{ fontSize: "18px" }}></i>
          {footerAlert}
        </div>
      )}
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

// ----------------- DocumentVerificationSection -----------------
const DocumentVerificationSection = ({ userInfo, onUploadSuccess }) => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        showAlert({
          title: "File Too Large",
          text: "Maximum allowed file size is 5MB.",
          icon: "warning",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        showAlert({
          title: "File Too Large",
          text: "Maximum allowed file size is 5MB.",
          icon: "warning",
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!idType || !idNumber || !file) {
      showAlert({
        title: "Validation Error",
        text: "Please fill all fields and select a file.",
        icon: "warning",
      });
      return;
    }

    setIsUploading(true);
    try {
      let fileToUpload = file;
      if (file.type.startsWith("image/")) {
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          fileToUpload = await imageCompression(file, options);
        } catch (error) {
          console.error("Image compression error:", error);
        }
      }

      const formData = new FormData();
      formData.append("idProofType", idType);
      formData.append("idProofNumber", idNumber);
      formData.append("idProof", fileToUpload, file.name);

      const userId = localStorage.getItem("userId");

      const response = await uploadIdProof(userId, formData);

      if (response.status === 200) {
        showAlert({
          title: "Success",
          text: "ID Proof uploaded successfully for verification!",
          icon: "success",
        });
        onUploadSuccess();
      } else {
        showAlert({
          title: "Error",
          text: "Upload failed. Please try again.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      showAlert({
        title: "Error",
        text: "An error occurred during upload.",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (userInfo?.idVerificationStatus === "Uploaded") {
    return (
      <div className="col-12 mb-3">
        <div style={{
          padding: "20px",
          background: "#eff6ff",
          borderRadius: "8px",
          border: "1px solid #3b82f6",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <i className="fa fa-clock-o" style={{ color: "#3b82f6", fontSize: "2rem" }}></i>
          <div>
            <h5 style={{ margin: 0, color: "#1e40af", fontWeight: "700" }}>Waiting for Admin Verification</h5>
            <p style={{ margin: 0, color: "#1e3a8a", fontSize: "0.9rem" }}>Your identity document has been uploaded and is currently under review by our team.</p>
          </div>
        </div>
      </div>
    );
  }

  if (userInfo?.idVerificationStatus === "Verified") {
    return (
      <div className="col-12 mb-3">
        <div style={{
          padding: "20px",
          background: "#ecfdf5",
          borderRadius: "8px",
          border: "1px solid #10b981",
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <i className="fa fa-check-circle" style={{ color: "#10b981", fontSize: "2rem" }}></i>
          <div>
            <h5 style={{ margin: 0, color: "#065f46", fontWeight: "700" }}>Profile Verified</h5>
            <p style={{ margin: 0, color: "#047857", fontSize: "0.9rem" }}>Your identity has been successfully verified.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12 mb-4">
      {userInfo?.idVerificationStatus === "Rejected" && (
        <div
          className="alert alert-danger mt-3 mb-0"
          role="alert"
        >
          <h6 className="alert-heading font-weight-bold mb-1">
            <i className="fa fa-exclamation-circle me-2"></i>
            Verification Failed
          </h6>
          <p className="mb-0 small">
            Your verification failed. Please re-upload
            your document with a clear and visible
            picture.
          </p>
        </div>
      )}

      {userInfo?.profileVisibility === 'Hidden' && (
        <div className="alert alert-danger mt-3 mb-0 shadow-sm" role="alert" style={{ backgroundColor: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', borderRadius: '8px', padding: '15px' }}>
          <div className="d-flex align-items-start">
            <i className="fa fa-eye-slash" style={{ fontSize: '24px', marginRight: '15px', marginTop: '3px' }}></i>
            <div style={{ fontSize: '15px' }}>
              <h6 className="fw-bold mb-1">Your Profile is Hidden</h6>
              <p className="mb-0">You cannot view other profiles while your profile is hidden. <Link to="/user/user-settings-page" style={{ color: '#c53030', textDecoration: 'underline', fontWeight: 'bold' }}>Unhide Profile</Link></p>
            </div>
          </div>
        </div>
      )}
      <div style={{
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
      }}>
        <div className="doc-verify-left" style={{
          flex: "1 1 400px",
          padding: "40px",
          background: "#f8faff",
          borderRight: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          textAlign: "left"
        }}>
          <h3 style={{ fontWeight: "700", color: "#333", marginBottom: "20px", fontSize: "1.5rem" }}>Verify Your Profile</h3>
          <p style={{ color: "#555", fontSize: "1rem", lineHeight: "1.4", marginBottom: "25px", textAlign: "justify" }}>
            To ensure user authenticity and platform safety, AgapeVows requires all users to upload a masked version of a valid government ID, in compliance with the Indian IT Act 2000. Your ID information is securely handled and will not be shared with any third party. <br /><br /> This guide outlines how to correctly mask and upload your ID while safeguarding your sensitive details. Masking your ID helps protect it from misuse, even in the unlikely event of unauthorized access. Please <a href={MaskedIdGuide} target="_blank" rel="noopener noreferrer" style={{ color: "#5c2a9d", fontWeight: "600", textDecoration: "underline" }}>click here</a> to download the ID masking guide.
          </p>
          <h5 style={{ fontWeight: "700", color: "#333", marginBottom: "15px" }}>Important Notes</h5>
          <ul style={{ color: "#555", fontSize: "0.95rem", lineHeight: "1.7", listStyleType: "disc", paddingLeft: "20px", marginBottom: "30px" }}>
            <li style={{ marginBottom: "10px" }}>1. Do <strong>NOT</strong> upload unmasked IDs.</li>
            <li style={{ marginBottom: "10px" }}>2. Ensure the image is clear and readable.</li>
            <li style={{ marginBottom: "10px" }}>3. Files with improper masking may be rejected.</li>
            <li>4. Do <strong>NOT</strong> upload fake IDs. If found, your account may be suspended and banned from AgapeVows.</li>
          </ul>
          <div style={{ marginTop: "auto", textAlign: "left", width: "100%", fontSize: "0.85rem", color: "#888" }}>
            <p className="mb-1"><i className="fa fa-envelope me-2" style={{ color: "#5c2a9d" }}></i> profiles@agapevows.com</p>
            <p className="mb-0"><i className="fa fa-phone me-2" style={{ color: "#5c2a9d" }}></i> +91 96637-96699</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="doc-verify-right" style={{
          flex: "2 1 500px",
          padding: "40px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h5 style={{ fontWeight: "700", color: "#333", margin: 0 }}>ID Proof</h5>
            <span style={{ fontSize: "0.85rem", color: "#888" }}>My Home / <span style={{ color: "#5c2a9d" }}>Submit ID Proof</span></span>
          </div>

          <p style={{ color: "#777", fontSize: "0.85rem", marginBottom: "25px", borderTop: "1px solid #eee", paddingTop: "15px" }}>
            Upload your government approved identification proof i.e <strong>Passport or Aadhaar (Both Sides)</strong> along with your name, date of birth, and address, immediately to avoid deactivation without notice.
          </p>

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#555", marginBottom: "8px", display: "block" }}>ID Proof Type*</label>
              <select
                className="form-select"
                value={idType}
                onChange={(e) => setIdType(e.target.value)}
                style={{ borderRadius: "6px", padding: "10px" }}
              >
                <option value="">Select ID Type</option>
                <option value="Aadhar Number">Aadhar Number</option>
                <option value="Passport">Passport</option>
              </select>
            </div>
            <div className="col-md-6">
              <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#555", marginBottom: "8px", display: "block" }}>ID Proof Number*</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter ID Number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                style={{ borderRadius: "6px", padding: "10px" }}
              />
            </div>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragActive ? "#5c2a9d" : "#ddd"}`,
              borderRadius: "10px",
              padding: "40px",
              textAlign: "center",
              background: dragActive ? "#f5f3ff" : "#fafafa",
              cursor: "pointer",
              transition: "all 0.2s ease",
              position: "relative"
            }}
            onClick={() => document.getElementById("id-file-input").click()}
          >
            <input
              type="file"
              id="id-file-input"
              className="d-none"
              onChange={handleFileChange}
              accept=".png,.jpg,.jpeg,.pdf"
            />
            <div style={{ fontSize: "40px", color: "#ccc", marginBottom: "15px" }}>
              <i className="fa fa-cloud-upload"></i>
            </div>
            {file ? (
              <div style={{ color: "#5c2a9d", fontWeight: "600" }}>{file.name}</div>
            ) : (
              <>
                <p style={{ fontWeight: "600", color: "#555", margin: 0 }}>Drag & drop file here</p>
                <p style={{ color: "#999", fontSize: "0.75rem", marginTop: "10px" }}>Only PNG/JPG/JPEG/PDF format with maximum 5MB size allowed</p>
              </>
            )}
          </div>

          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              style={{
                background: "#5c2a9d",
                color: "#fff",
                border: "none",
                padding: "12px 40px",
                borderRadius: "6px",
                fontWeight: "600",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(92, 42, 157, 0.3)",
                transition: "all 0.2s ease",
                cursor: isUploading ? "not-allowed" : "pointer"
              }}
              onMouseOver={(e) => e.target.style.transform = "translateY(-2px)"}
              onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
            >
              {isUploading ? "UPLOADING..." : "UPLOAD ID PROOF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const UserProfilePage = () => {
  const userId = localStorage.getItem("userId");

  const [userInfo, setUserInfo] = useState(null);
  const [visibility, setVisibility] = useState("Public"); // 👈 FIRST
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const sanitizedId = (userId && userId.length > 24) ? userId.substring(0, 24) : userId;
      const response = await getUserProfile(sanitizedId);
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
    <div className="min-h-screen" style={{
      backgroundColor: "#f3f4f6"
    }}>
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "100px", paddingBottom: "40px" }}>
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
                className="col-12 col-md-9 col-lg-10 profile-right-column"
                style={{
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
                        className="btn edit-btn font-source font-semibold text-[18px]"
                        style={{
                          background: "#5c2a9d",
                          color: "#fff",
                          padding: "10px 24px",
                          borderRadius: "5px",
                          textDecoration: "none",
                          border: "none",
                        }}
                      >
                        <i
                          className="fa fa-edit"
                          style={{ marginRight: "8px" }}
                        ></i>
                        Edit profile
                      </Link>
                    </div>
                  </div>


                  {/* Profile Header Card */}
                  <div className="col-12 mb-4">
                    <div
                      className="db-profile profile-header"
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "25px",
                        flexWrap: "wrap",
                        padding: "25px",
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(10px)",
                        borderRadius: "12px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <div
                        className="img profile-img overflow-hidden rounded-full flex items-center justify-center bg-gray-200"
                        style={{
                          width: "130px",
                          height: "130px",
                          minWidth: "130px",
                          minHeight: "130px",
                          border: "5px solid #58219f",
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
                              fontSize: "clamp(1.3rem, 4vw, 2rem)",
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
                                flexWrap: "wrap",
                              }}
                            >
                              <strong style={{ color: "#333", minWidth: "70px" }}>User ID:</strong>
                              <span style={{ fontWeight: "500" }}>
                                {userInfo?.agwid || "Not Specified"}
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
                              <strong style={{ color: "#333", minWidth: "70px" }}>Mobile:</strong>
                              <span style={{ fontWeight: "500", wordBreak: "break-word" }}>
                                {userInfo?.userMobile || "Not Specified"}
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
                              <strong style={{ color: "#333", minWidth: "70px" }}>Email:</strong>
                              <span style={{ fontWeight: "500", wordBreak: "break-word" }}>
                                {userInfo?.userEmail || "Not Specified"}
                              </span>
                            </p>


                            {/* BADGES */}
                            <div
                              className="badge-container"
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
                                {visibility === "Public" ? "Visibility: All Users" : visibility === "Private" ? "Visibility: Premium Users" : `Visibility: ${visibility}`}
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
                                  Verified
                                </span>
                              )}



                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    {userInfo && userInfo.profileVisibility === 'Hidden' && (
                      <div className="alert alert-danger d-flex align-items-start mb-4 shadow-sm" role="alert" style={{ backgroundColor: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', borderRadius: '8px', padding: '15px' }}>
                        <i className="fa fa-eye-slash" style={{ fontSize: '24px', marginRight: '15px', marginTop: '3px' }}></i>
                        <div style={{ fontSize: '15px' }}>
                          <p className="mb-1">
                            <strong>Your profile is currently hidden.</strong>
                          </p>
                          <p className="mb-0">
                            Other members cannot see your profile, and you will not be able to view other member profiles until you unhide it. <Link to="/user/user-settings-page" style={{ color: '#c53030', textDecoration: 'underline', fontWeight: 'bold' }}>Unhide Profile</Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <DocumentVerificationSection
                    userInfo={userInfo}
                    onUploadSuccess={() => {
                      // Refresh profile data
                      const sanitizedId = (userId && userId.length > 24) ? userId.substring(0, 24) : userId;
                      getUserProfile(sanitizedId).then(res => {
                        if (res.status === 200) setUserInfo(res.data.data);
                      });
                    }}
                  />
                  {/* About Me Section */}
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

                  {/* Basic Details Section */}
                  <ProfileSection
                    title="Basic Details"
                    icon="fa-address-card"
                  // footerAlert="All details are provided by the member and are visible as per your privacy settings."
                  >
                    <InfoRow
                      label="Profile Created By"
                      value={userInfo?.profileCreatedFor}
                    />
                    <InfoRow label="Name" value={userInfo?.userName} />
                    <InfoRow
                      label="Age"
                      value={
                        userInfo?.age
                          ? `${userInfo.age} years`
                          : userInfo?.dateOfBirth
                            ? `${calculateAge(userInfo.dateOfBirth)} years`
                            : null
                      }
                    />
                    <InfoRow
                      label="Date of Birth"
                      value={
                        userInfo?.dateOfBirth
                          ? new Date(userInfo.dateOfBirth).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
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
                      label="Mother's Occupation"
                      value={userInfo?.mothersOccupation}
                    />
                    <InfoRow
                      label="Father's Profession"
                      value={userInfo?.fathersProfession}
                    />
                    <InfoRow
                      label="Mother's Profession"
                      value={userInfo?.mothersProfession}
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
                      label="Additional Details"
                      value={userInfo?.familyDetails}
                    />
                    <InfoRow
                      label="No. of Brothers"
                      value={userInfo?.numberOfBrothers}
                    />
                    <InfoRow
                      label="Married Brothers"
                      value={userInfo?.marriedBrothers}
                    />
                    <InfoRow
                      label="No. of Sisters"
                      value={userInfo?.numberOfSisters}
                    />
                    <InfoRow
                      label="Married Sisters"
                      value={userInfo?.marriedSisters}
                    />
                    {userInfo?.familyDetails && (
                      <div className="grid-span-full mt-3 flex flex-col" style={{ gridColumn: '1 / -1' }}>
                        <span className="font-source text-[16px] text-[#4b5563] font-semibold mb-1">
                          Family Details
                        </span>
                        <span className="font-source text-[16px] text-[#111827] whitespace-pre-wrap">
                          {userInfo.familyDetails}
                        </span>
                      </div>
                    )}
                  </ProfileSection>

                  <ProfileSection
                    title="Religious Information"
                    icon="fa-book"
                  >

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
                      label="Contact Person"
                      value={userInfo?.contactPersonName}
                    />
                    <InfoRow
                      label="Relationship"
                      value={userInfo?.relationship}
                    />
                    <InfoRow
                      label="Mobile Number"
                      value={userInfo?.contactPhone}
                    />

                    <InfoRow label="Email" value={userInfo?.contactEmail} />

                    <InfoRow
                      label="Landline"
                      value={userInfo?.landlineNumber}
                    />
                    <InfoRow label="Citizen Of" value={userInfo?.citizenOf} />
                    <InfoRow
                      label="Current Address"
                      value={userInfo?.currentAddress}
                    />
                    <InfoRow
                      label="Permanent Address"
                      value={userInfo?.permanentAddress}
                    />
                    <InfoRow label="Pincode" value={userInfo?.pincode} />
                    <InfoRow label="State" value={userInfo?.state} />
                    <InfoRow label="City" value={userInfo?.city} />

                  </ProfileSection>

                  {/* Lifestyle & Hobbies Section */}
                  <ProfileSection title="Lifestyle & Hobbies" icon="fa-music">
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
                      label="Exercise"
                      value={userInfo?.exercise}
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
                    {userInfo?.aboutPartner && (
                      <div className="grid-span-full" style={{ marginBottom: "15px" }}>
                        <h6 style={{ fontSize: "14px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                          About Partner
                        </h6>
                        <p style={{ fontSize: "15px", color: "#1f2937", lineHeight: "1.5" }}>
                          {userInfo.aboutPartner}
                        </p>
                      </div>
                    )}
                    <div className="grid-span-full" style={{ marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#5c2a9d",
                          marginTop: "20px",
                          marginBottom: "15px",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <span style={{ width: "4px", height: "18px", background: "#5c2a9d", borderRadius: "2px" }}></span>
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
                        userInfo?.partnerHeight && userInfo?.partnerHeightTo
                          ? `${userInfo.partnerHeight} to ${userInfo.partnerHeightTo}`
                          : userInfo?.partnerHeight
                            ? `${userInfo.partnerHeight}`
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

                    <div className="grid-span-full" style={{ marginTop: "30px", marginBottom: "10px" }}>
                      <h5
                        style={{
                          color: "#5c2a9d",
                          marginBottom: "15px",
                          fontWeight: "700",
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}
                      >
                        <span style={{ width: "4px", height: "18px", background: "#5c2a9d", borderRadius: "2px" }}></span>
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
                      value={userInfo?.partnerAnnualIncomeFrom && userInfo?.partnerAnnualIncomeTo
                        ? `${userInfo.partnerAnnualIncomeFrom} to ${userInfo.partnerAnnualIncomeTo}`
                        : userInfo?.partnerAnnualIncomeFrom || userInfo?.partnerAnnualIncomeTo}
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
