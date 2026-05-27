import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileCompletion = ({ userData }) => {
  const navigate = useNavigate();
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Function to calculate profile completion percentage
  const calculateProfileCompletion = (user) => {
    if (!user) {
      console.log("ProfileCompletion: user is null or undefined");
      return 0;
    }

    console.log("ProfileCompletion: Calculating for user:", {
      _id: user._id,
      userName: user.userName,
      userEmail: user.userEmail,
      totalKeys: Object.keys(user).length,
    });

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
    console.log("ProfileCompletion useEffect triggered with userData:", {
      hasData: !!userData,
      _id: userData?._id,
      userName: userData?.userName,
      dataLength: userData ? Object.keys(userData).length : 0,
    });
    
    // Check if userData has content
    if (userData && typeof userData === 'object' && Object.keys(userData).length > 0) {
      const percentage = calculateProfileCompletion(userData);
      console.log("ProfileCompletion: Setting completionPercentage to:", percentage);
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
      console.log("ProfileCompletion: userData is empty or invalid");
      setCompletionPercentage(0);
      setDisplayPercentage(0);
    }
  }, [userData]);

  return (
    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com h-100">
      <h2 className="db-tit">Profiles status</h2>
      <div className="db-pro-stat h-100" style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
        <h6>Profile completion</h6>
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/user-profile-edit-page/${userData?._id}`);
                }}
              >
                Edit profile
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/user-profile-page`);
                }}
              >
                View profile
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/user-settings-page`);
                }}
              >
                Profile visibility settings
              </a>
            </li>
          </ul>
        </div>
        <div className="db-pro-pgog">
          <span>
            <b className="profile-count">{displayPercentage}</b>%
          </span>
        </div>
        <ul className="pro-stat-ic">
          {/* <li>
            <span>
              <i className="fa fa-heart-o like" aria-hidden="true"></i>
              <b>12</b>Likes
            </span>
          </li> */}
          <li>
            <span>
              <i className="fa fa-eye view" aria-hidden="true"></i>
              <b>{userData?.viewsCount || 0}</b>Views
            </span>
          </li>
          <li>
            <span>
              <i className="fa fa-handshake-o inte" aria-hidden="true"></i>
              <b>{userData?.interestsCount || 0}</b>Interests
            </span>
          </li>
          {/* <li>
            <span>
              <i className="fa fa-hand-pointer-o clic" aria-hidden="true"></i>
              <b>12</b>Clicks
            </span>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCompletion;
