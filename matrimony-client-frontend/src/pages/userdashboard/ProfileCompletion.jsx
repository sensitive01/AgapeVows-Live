import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaEllipsisH, FaChevronRight } from "react-icons/fa";

const ProfileCompletion = ({ userData }) => {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Function to calculate profile completion percentage
  const calculateProfileCompletion = (user) => {
    if (!user) {
      return 0;
    }

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
    
    console.log("ProfileCompletion: Calculation result:", {
      filledCount,
      totalFields,
      percentage,
      maritalStatus: user.maritalStatus,
      basicFieldsFilled: profileFields.basic.filter(f => {
        const val = user[f];
        return val !== null && val !== undefined && val !== "" && (!Array.isArray(val) || val.length > 0);
      }).length,
    });
    
    return percentage;
  };

  const [displayPercentage, setDisplayPercentage] = useState(0);

  // Update completion percentage whenever userData changes
  useEffect(() => {

    // Check if userData has content
    if (userData && typeof userData === 'object' && Object.keys(userData).length > 0) {
      const percentage = calculateProfileCompletion(userData);
      setCompletionPercentage(percentage);
      
      // React-based smooth counter animation
      let start = 0;
      const end = percentage;
      if (start === end) {
        setDisplayPercentage(end);
        return;
      }
      
      const duration = 1000;
      const incrementTime = 20; // ms
      const totalSteps = Math.ceil(duration / incrementTime);
      const stepValue = end / totalSteps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= totalSteps) {
          setDisplayPercentage(end);
          clearInterval(timer);
        } else {
          setDisplayPercentage(Math.ceil(currentStep * stepValue));
        }
      }, incrementTime);
      
      return () => clearInterval(timer);
    } else {
      setCompletionPercentage(0);
      setDisplayPercentage(0);
    }
  }, [userData]);

  return (
    <div className="col-lg-3 col-md-6 mb-4 d-flex">
      <div className="profile-completion-card d-flex flex-column w-100">
        <div className="profile-completion-header d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <div style={{ width: '28px', height: '28px', backgroundColor: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              <FaCheckSquare style={{ color: '#7c3aed', fontSize: '14px' }} />
            </div>
            <h3 className="profile-completion-title m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>Profile Completion</h3>
          </div>
          <FaEllipsisH style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate(`/user/user-profile-edit-page/${userData?._id}`)} />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1" style={{ padding: '10px 0 20px 0' }}>
          <div className="position-relative mb-4 flex-shrink-0" style={{ width: '160px', height: '160px', minHeight: '160px', minWidth: '160px' }}>
            {/* Sparkles */}
            <div style={{ position: 'absolute', top: '-5px', right: '-5px', fontSize: '20px' }}>✨</div>
            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <path
                className="circle-bg-dotted"
                d="M18 1.0 a 17 17 0 0 1 0 34 a 17 17 0 0 1 0 -34"
                fill="none" stroke="#e0c7ff" strokeWidth="0.3" strokeDasharray="0.5, 1"
              />
              <path
                className="circle-bg"
                d="M18 4.0 a 14 14 0 0 1 0 28 a 14 14 0 0 1 0 -28"
                fill="none" stroke="#f3f4f6" strokeWidth="2.5"
              />
              <path
                className="circle"
                strokeDasharray={`${displayPercentage * 0.88}, 100`}
                d="M18 4.0 a 14 14 0 0 1 0 28 a 14 14 0 0 1 0 -28"
                fill="none" stroke="url(#gradient)" strokeWidth="2.5" strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
              <h2 className="mb-0 fw-bold" style={{ color: '#6d28d9', fontSize: '2.8rem', lineHeight: '1', letterSpacing: '-1.5px', fontFamily: "'Outfit', 'Poppins', 'Inter', sans-serif" }}>
                {displayPercentage}<span style={{ fontSize: '1.2rem', marginLeft: '2px', letterSpacing: '0' }}>%</span>
              </h2>
              <span className="text-muted" style={{ fontSize: '0.85rem' }}>Completed</span>
            </div>
          </div>
          <p className="text-center text-muted mb-0" style={{ fontSize: '13px' }}>Complete your profile to get better matches</p>
        </div>
        <div className="mt-auto w-100 mb-5">
          <button onClick={() => navigate(`/user/user-profile-edit-page/${userData?._id}`)} className="dash-btn-outline w-100 d-flex justify-content-between align-items-center" style={{ borderColor: '#d8b4fe', color: '#6d28d9', borderRadius: '8px', padding: '12px 16px', background: 'transparent' }}>
            <span className="mx-auto fw-bold" style={{ fontSize: '14px' }}>Complete Your Profile</span>
            <FaChevronRight size={12} style={{ color: '#a855f7' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
