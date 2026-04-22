import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  savePersonalInfo,
  getUserInfo,
  deleteAdditionalImages,
  uploadIdProof,
} from "../api/axiosService/userAuthService";
import { useParams, useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import SearchableSelect from "../components/SearchableSelect";
import { Country, State, City } from "country-state-city";

// BasicInfomation Component (same as before)
const BasicInfomation = ({
  profileImagePreview,
  handleProfileImageChange,
  handleAdditionalImagesChange,
  additionalImagePreviews = [],
  removeAdditionalImage,
  handleDeleteProfileImage,
}) => {
  const profileImageInputRef = useRef(null);
  const additionalImagesInputRef = useRef(null);

  const handleEditIconClick = () => {
    profileImageInputRef.current?.click();
  };

  const handleChooseFilesClick = () => {
    additionalImagesInputRef.current?.click();
  };

  const imagePreviews = Array.isArray(additionalImagePreviews)
    ? additionalImagePreviews
    : [];

  const styles = {
    sectionContainer: {
      padding: "32px",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
    sectionHeader: {
      marginBottom: "8px",
      fontSize: "11px",
      fontWeight: "700",
      color: "#6b7280",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
    sectionTitle: {
      fontSize: "28px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "32px",
      marginTop: "0",
    },
    divider: {
      height: "1px",
      background: "#e5e7eb",
      margin: "32px 0",
    },
    contentRow: {
      display: "flex",
      gap: "60px",
      alignItems: "flex-start",
    },
    leftColumn: {
      flex: "0 0 auto",
    },
    rightColumn: {
      flex: "1",
    },
    profileImageContainer: {
      position: "relative",
      width: "160px",
      height: "160px",
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #e5e7eb",
      background: "#f9fafb",
    },
    profileImagePlaceholder: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: "#f3f4f6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "3px solid #e5e7eb",
      color: "#9ca3af",
      fontSize: "14px",
      fontWeight: "500",
    },
    editIconOverlay: {
      position: "absolute",
      bottom: "4px",
      right: "4px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "#667eea",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
      transition: "all 0.3s ease",
      border: "4px solid #fff",
      zIndex: 10,
    },
    editIconOverlayHover: {
      background: "#5568d3",
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(102, 126, 234, 0.5)",
    },
    editIcon: {
      color: "#fff",
      fontSize: "18px",
    },
    deleteIconOverlay: {
      position: "absolute",
      bottom: "4px",
      left: "4px",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      background: "#ef4444",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
      transition: "all 0.3s ease",
      border: "4px solid #fff",
      zIndex: 10,
    },
    deleteIconOverlayHover: {
      background: "#dc2626",
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(239, 68, 68, 0.5)",
    },
    deleteIcon: {
      color: "#fff",
      fontSize: "18px",
    },
    hiddenInput: {
      display: "none",
    },
    label: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#374151",
      marginBottom: "12px",
      display: "block",
    },
    additionalImagesContainer: {
      marginTop: "0",
    },
    chooseFilesButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "11px 24px",
      background: "#fff",
      border: "2px solid #d1d5db",
      borderRadius: "6px",
      color: "#374151",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    chooseFilesButtonHover: {
      background: "#f9fafb",
      borderColor: "#667eea",
      color: "#667eea",
    },
    selectedFileName: {
      display: "inline-block",
      marginLeft: "16px",
      fontSize: "14px",
      color: "#6b7280",
      fontWeight: "500",
    },
    imagePreviewsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
      gap: "16px",
      marginTop: "20px",
    },
    imagePreviewItem: {
      position: "relative",
      width: "100%",
      paddingBottom: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      border: "2px solid #e5e7eb",
      background: "#f9fafb",
    },
    imagePreview: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    removeButton: {
      position: "absolute",
      top: "6px",
      right: "6px",
      width: "28px",
      height: "28px",
      borderRadius: "50%",
      background: "#ef4444",
      border: "2px solid #fff",
      color: "#fff",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      transition: "all 0.2s ease",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    },
    removeButtonHover: {
      background: "#dc2626",
      transform: "scale(1.1)",
    },
  };

  const [isEditHovered, setIsEditHovered] = React.useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = React.useState(false);
  const [isChooseFilesHovered, setIsChooseFilesHovered] = React.useState(false);
  const [hoveredRemoveIndex, setHoveredRemoveIndex] = React.useState(null);

  return (
    <div style={styles.sectionContainer}>
      <div style={styles.sectionHeader}>PROFILE</div>
      <h2 style={styles.sectionTitle}>Upload Profile & Album Photos</h2>

      <div style={styles.divider}></div>

      <div style={styles.contentRow}>
        <div style={styles.leftColumn}>
          <label style={styles.label}>Profile Picture:</label>
          <div style={styles.profileImageContainer}>
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>No Image</div>
            )}

            <div
              style={{
                ...styles.editIconOverlay,
                ...(isEditHovered && styles.editIconOverlayHover),
              }}
              onClick={handleEditIconClick}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
              title="Change profile picture"
            >
              <i className="fa fa-pencil" style={styles.editIcon}></i>
            </div>

            {profileImagePreview && (
              <div
                style={{
                  ...styles.deleteIconOverlay,
                  ...(isDeleteHovered && styles.deleteIconOverlayHover),
                }}
                onClick={handleDeleteProfileImage}
                onMouseEnter={() => setIsDeleteHovered(true)}
                onMouseLeave={() => setIsDeleteHovered(false)}
                title="Delete profile picture"
              >
                <i className="fa fa-trash" style={styles.deleteIcon}></i>
              </div>
            )}

            <input
              ref={profileImageInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              style={styles.hiddenInput}
            />
          </div>
        </div>

        <div style={styles.rightColumn}>
          <label style={styles.label}>Additional Images:</label>
          <div style={styles.additionalImagesContainer}>
            <button
              type="button"
              style={{
                ...styles.chooseFilesButton,
                ...(isChooseFilesHovered && styles.chooseFilesButtonHover),
              }}
              onClick={handleChooseFilesClick}
              onMouseEnter={() => setIsChooseFilesHovered(true)}
              onMouseLeave={() => setIsChooseFilesHovered(false)}
            >
              <i className="fa fa-upload"></i>
              Choose Files
            </button>

            {imagePreviews.length > 0 && (
              <span style={styles.selectedFileName}>
                {imagePreviews.length} file(s) selected
              </span>
            )}

            <input
              ref={additionalImagesInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              style={styles.hiddenInput}
            />

            {imagePreviews.length > 0 && (
              <div style={styles.imagePreviewsGrid}>
                {imagePreviews.map((preview, index) => (
                  <div key={index} style={styles.imagePreviewItem}>
                    <img
                      src={preview.url}
                      alt={`Additional ${index + 1}`}
                      style={styles.imagePreview}
                    />
                    <button
                      type="button"
                      style={{
                        ...styles.removeButton,
                        ...(hoveredRemoveIndex === index &&
                          styles.removeButtonHover),
                      }}
                      onClick={() => removeAdditionalImage(index)}
                      onMouseEnter={() => setHoveredRemoveIndex(index)}
                      onMouseLeave={() => setHoveredRemoveIndex(null)}
                      title="Remove image"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Section Component
const FormSection = ({ title, children }) => (
  <div
    style={{
      padding: "32px",
      background: "#fff",
      borderRadius: "8px",
      marginBottom: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    }}
  >
    <div
      style={{
        marginBottom: "8px",
        fontSize: "11px",
        fontWeight: "700",
        color: "#6b7280",
        textTransform: "uppercase",
        letterSpacing: "1px",
      }}
    >
      SECTION
    </div>
    <h2
      style={{
        fontSize: "28px",
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: "32px",
        marginTop: "0",
      }}
    >
      {title}
    </h2>
    <div
      style={{ height: "1px", background: "#e5e7eb", margin: "0 0 32px 0" }}
    ></div>
    {children}
  </div>
);

// Reusable Form Input Component
const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  required,
  placeholder,
  searchable = false,
}) => (
  <div>
    <label
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        marginBottom: "8px",
        display: "block",
      }}
    >
      {label}
      {required && (
        <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
      )}
    </label>
    {type === "select" && searchable ? (
      <SearchableSelect
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={`Select ${label}`}
      />
    ) : type === "select" ? (
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          cursor: "pointer",
          transition: "border-color 0.2s ease",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={4}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          resize: "vertical",
          transition: "border-color 0.2s ease",
        }}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: "#374151",
          background: "#fff",
          transition: "border-color 0.2s ease",
        }}
      />
    )}
  </div>
);

// NEW: Checkbox Group Component for Hobbies
const CheckboxGroup = ({ label, name, options, selectedValues, onChange }) => {
  const handleCheckboxChange = (option) => {
    const updatedValues = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];

    onChange({
      target: {
        name: name,
        value: updatedValues,
      },
    });
  };

  return (
    <div>
      <label
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "12px",
          display: "block",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "12px",
        }}
      >
        {options.map((option) => (
          <label
            key={option}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              padding: "8px",
              borderRadius: "6px",
              transition: "background 0.2s ease",
              background: selectedValues.includes(option)
                ? "#f0f4ff"
                : "transparent",
            }}
          >
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              style={{
                width: "18px",
                height: "18px",
                cursor: "pointer",
                accentColor: "#667eea",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#374151",
              }}
            >
              {option}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// Main UserProfileEditPage Component
const UserProfileEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Basic Details
    aboutMe: "",
    gender: "",
    profileCreatedFor: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    bodyType: "",
    physicalStatus: "",
    complexion: "",
    height: "",
    weight: "",
    maritalStatus: "",
    marriedMonthYear: "",
    livingTogetherPeriod: "",
    divorcedMonthYear: "",
    reasonForDivorce: "",
    childStatus: "",
    numberOfChildren: "",
    eatingHabits: "",
    drinkingHabits: "",
    smokingHabits: "",
    motherTongue: "",
    caste: "",

    // Family Details
    fathersName: "",
    mothersName: "",
    fathersOccupation: "",
    fathersProfession: "",
    mothersOccupation: "",
    fathersNative: "",
    mothersNative: "",
    familyValue: "",
    familyType: "",
    familyStatus: "",
    residenceType: "",
    numberOfBrothers: "",
    numberOfSisters: "",

    // Religious Information
    denomination: "",
    church: "",
    churchActivity: "",
    pastorsName: "",
    spirituality: "",
    religiousDetail: "",

    // Contact Information
    alternateMobile: "",
    landlineNumber: "",
    currentAddress: "",
    permanentAddress: "",
    contactPersonName: "",
    relationship: "",
    citizenOf: "",
    city: "",
    state: "",
    pincode: "",

    // Professional Information
    education: "",
    additionalEducation: "",
    college: "",
    educationDetail: "",
    employmentType: "",
    occupation: "",
    position: "",
    companyName: "",
    annualIncome: "",

    // Lifestyle
    exercise: "",
    hobbies: [],
    interests: "",
    music: "",
    favouriteReads: "",
    favouriteCuisines: "",
    sportsActivities: "",
    dressStyles: "",

    // Social Media
    whatsapp: "",
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    linkedin: "",

    // Partner Preferences - Basic & Religion
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerHeight: "",
    partnerMaritalStatus: "",
    partnerMotherTongue: "",
    partnerCaste: "",
    partnerPhysicalStatus: "",
    partnerEatingHabits: "",
    partnerDrinkingHabits: "",
    partnerSmokingHabits: "",
    partnerDenomination: "",
    partnerSpirituality: "",

    // Partner Preferences - Professional
    partnerEducation: "",
    partnerEmploymentType: "",
    partnerOccupation: "",
    partnerAnnualIncome: "",

    // Partner Preferences - Location
    partnerCountry: "",
    partnerState: "",
    partnerDistrict: "",

    // Profile Visibility
    profileVisibility: "Public",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [deleteProfileImageFlag, setDeleteProfileImageFlag] = useState(false);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([]);
  const [deletedAdditionalImages, setDeletedAdditionalImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);
 const [videoFile, setVideoFile] = useState(null);
const [videoPreview, setVideoPreview] = useState(""); // local preview or existing video URL
const [deleteVideoFlag, setDeleteVideoFlag] = useState(false);
const [existingVideoUrl, setExistingVideoUrl] = useState(""); // video stored in DB

  const [idProofFile, setIdProofFile] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [idVerificationStatus, setIdVerificationStatus] = useState("Pending");
  const [idProofDocument, setIdProofDocument] = useState("");
  const [isUploadingId, setIsUploadingId] = useState(false);

  // Hobbies options for checkboxes
  const hobbiesOptions = [
    "Reading",
    "Sports",
    "Music",
    "Traveling",
    "Cooking",
    "Photography",
    "Dancing",
    "Gaming",
    "Painting",
    "Writing",
    "Gardening",
    "Yoga",
  ];

  // Location selection state
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  // Get all countries
  const allCountries = Country.getAllCountries();
  const countryOptions = allCountries.map((country) => country.name);

  // Get states for selected country
  const stateOptions = selectedCountryCode
    ? State.getStatesOfCountry(selectedCountryCode).map((state) => state.name)
    : [];

  // Get cities for selected state
  const cityOptions =
    selectedCountryCode && selectedStateCode
      ? City.getCitiesOfState(selectedCountryCode, selectedStateCode).map(
          (city) => city.name,
        )
      : [];

  // Handle country change
  const handleCountryChange = (e) => {
    const countryName = e.target.value;
    const country = allCountries.find((c) => c.name === countryName);
    setSelectedCountryCode(country ? country.isoCode : "");
    setSelectedStateCode("");
    setFormData((prev) => ({
      ...prev,
      citizenOf: countryName,
      state: "",
      city: "",
    }));
    setHasUnsavedChanges(true);
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    const states = State.getStatesOfCountry(selectedCountryCode);
    const state = states.find((s) => s.name === stateName);
    setSelectedStateCode(state ? state.isoCode : "");
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      city: "",
    }));
    setHasUnsavedChanges(true);
  };

  // Handle city change - Auto-populate state and country
  const handleCityChange = (e) => {
    const cityName = e.target.value;
    
    if (!cityName) {
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
      setHasUnsavedChanges(true);
      return;
    }

    // Find the country and state for this city
    let foundCountryCode = "";
    let foundStateCode = "";
    let foundCountryName = "";
    let foundStateName = "";
    let cityFound = false;

    for (const country of allCountries) {
      if (cityFound) break;
      const states = State.getStatesOfCountry(country.isoCode);
      
      for (const state of states) {
        if (cityFound) break;
        const cities = City.getCitiesOfState(country.isoCode, state.isoCode);
        const city = cities.find((c) => c.name.toLowerCase() === cityName.toLowerCase());
        
        if (city) {
          foundCountryCode = country.isoCode;
          foundStateCode = state.isoCode;
          foundCountryName = country.name;
          foundStateName = state.name;
          cityFound = true;
          break;
        }
      }
    }

    // Update form data with city, state, and country
    setFormData((prev) => ({
      ...prev,
      city: cityName,
      state: foundStateName || prev.state,
      citizenOf: foundCountryName || prev.citizenOf,
    }));

    // Update state codes for proper dropdown management
    if (foundCountryCode) {
      setSelectedCountryCode(foundCountryCode);
    }
    if (foundStateCode) {
      setSelectedStateCode(foundStateCode);
    }

    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo(userId);
        if (response.status === 200) {
          const userData = response.data.data;

          const loadedData = {
            aboutMe: userData.aboutMe || "",
            gender: userData.gender || "",
            profileCreatedFor: userData.profileCreatedFor || "",
            name: userData.userName || "",
            email: userData.userEmail || "",
            phone: userData.userMobile || "",
            dateOfBirth: userData.dateOfBirth
              ? userData.dateOfBirth.split("T")[0]
              : "",
            age: userData.age ? userData.age.toString() : "",
            bodyType: userData.bodyType || "",
            physicalStatus: userData.physicalStatus || "",
            complexion: userData.complexion || "",
            height: userData.height || "",
            weight: userData.weight || "",
            maritalStatus: userData.maritalStatus || "",
            marriedMonthYear: userData.marriedMonthYear || "",
            livingTogetherPeriod: userData.livingTogetherPeriod || "",
            divorcedMonthYear: userData.divorcedMonthYear || "",
            reasonForDivorce: userData.reasonForDivorce || "",
            childStatus: userData.childStatus || "",
            numberOfChildren: userData.numberOfChildren || "",
            eatingHabits: userData.eatingHabits || "",
            drinkingHabits: userData.drinkingHabits || "",
            smokingHabits: userData.smokingHabits || "",
            motherTongue: userData.motherTongue || "",
            caste: userData.caste || "",
            fathersName: userData.fathersName || "",
            mothersName: userData.mothersName || "",
            fathersOccupation: userData.fathersOccupation || "",
            fathersProfession: userData.fathersProfession || "",
            mothersOccupation: userData.mothersOccupation || "",
            fathersNative: userData.fathersNative || "",
            mothersNative: userData.mothersNative || "",
            familyValue: userData.familyValue || "",
            familyType: userData.familyType || "",
            familyStatus: userData.familyStatus || "",
            residenceType: userData.residenceType || "",
            numberOfBrothers: userData.numberOfBrothers || "",
            numberOfSisters: userData.numberOfSisters || "",
            denomination: userData.denomination || "",
            church: userData.church || "",
            churchActivity: userData.churchActivity || "",
            pastorsName: userData.pastorsName || "",
            spirituality: userData.spirituality || "",
            religiousDetail: userData.religiousDetail || "",
            alternateMobile: userData.alternateMobile || "",
            landlineNumber: userData.landlineNumber || "",
            currentAddress: userData.currentAddress || "",
            permanentAddress: userData.permanentAddress || "",
            contactPersonName: userData.contactPersonName || "",
            relationship: userData.relationship || "",
            citizenOf: userData.citizenOf || "",
            city: userData.city || "",
            state: userData.state || "",
            pincode: userData.pincode || "",
            education: userData.education || "",
            additionalEducation: userData.additionalEducation || "",
            college: userData.college || "",
            educationDetail: userData.educationDetail || "",
            employmentType: userData.employmentType || "",
            occupation: userData.occupation || "",
            position: userData.position || "",
            companyName: userData.companyName || "",
            annualIncome: userData.annualIncome || "",
            hobbies: Array.isArray(userData.hobbies) ? userData.hobbies : [],
            interests: userData.interests || "",
            music: userData.music || "",
            favouriteReads: userData.favouriteReads || "",
            favouriteCuisines: userData.favouriteCuisines || "",
            exercise: userData.exercise || "",
            sportsActivities: userData.sportsActivities || "",
            dressStyles: userData.dressStyles || "",
            whatsapp: userData.whatsapp || "",
            facebook: userData.facebook || "",
            instagram: userData.instagram || "",
            x: userData.x || "",
            youtube: userData.youtube || "",
            linkedin: userData.linkedin || "",
            partnerAgeFrom: userData.partnerAgeFrom || "",
            partnerAgeTo: userData.partnerAgeTo || "",
            partnerHeight: userData.partnerHeight || "",
            partnerMaritalStatus: userData.partnerMaritalStatus || "",
            partnerMotherTongue: userData.partnerMotherTongue || "",
            partnerCaste: userData.partnerCaste || "",
            partnerPhysicalStatus: userData.partnerPhysicalStatus || "",
            partnerEatingHabits: userData.partnerEatingHabits || "",
            partnerDrinkingHabits: userData.partnerDrinkingHabits || "",
            partnerSmokingHabits: userData.partnerSmokingHabits || "",
            partnerDenomination: userData.partnerDenomination || "",
            partnerSpirituality: userData.partnerSpirituality || "",
            partnerEducation: userData.partnerEducation || "",
            partnerEmploymentType: userData.partnerEmploymentType || "",
            partnerOccupation: userData.partnerOccupation || "",
            partnerAnnualIncome: userData.partnerAnnualIncome || "",
            partnerCountry: userData.partnerCountry || "",
            partnerState: userData.partnerState || "",
            partnerDistrict: userData.partnerDistrict || "",
            profileVisibility: userData.profileVisibility || "Public",
          };

          setFormData(loadedData);

          // ===========================
        // Set profile image preview
        // ===========================
        if (userData.profileImage) {
          setProfileImagePreview(userData.profileImage);
        }

        // ===========================
        // Set additional images
        // ===========================
        if (userData.additionalImages && userData.additionalImages.length > 0) {
          const existingImages = userData.additionalImages.map((url) => ({
            url,
            isExisting: true,
          }));
          setAdditionalImagePreviews(existingImages);
          setExistingAdditionalImages(userData.additionalImages);
        }

        // ===========================
        // Set self-introduction video
        // ===========================
        if (userData.selfIntroductionVideo) {
          setExistingVideoUrl(userData.selfIntroductionVideo);
          setVideoPreview(userData.selfIntroductionVideo);
        }

        if (userData.idVerificationStatus) {
          setIdVerificationStatus(userData.idVerificationStatus);
        }
        if (userData.idProofDocument) {
          setIdProofDocument(userData.idProofDocument);
          setIdProofPreview(userData.idProofDocument);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("Error loading user data. Please try again.");
    }
  };

  if (userId) {
    fetchUserData();
  }
}, [userId]);

  // Initialize country and state codes when formData changes
  useEffect(() => {
    if (formData.citizenOf) {
      const country = allCountries.find((c) => c.name === formData.citizenOf);
      if (country) {
        setSelectedCountryCode(country.isoCode);

        if (formData.state) {
          const states = State.getStatesOfCountry(country.isoCode);
          const state = states.find((s) => s.name === formData.state);
          if (state) {
            setSelectedStateCode(state.isoCode);
          }
        }
      }
    }
  }, [formData.citizenOf, formData.state, allCountries]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setHasUnsavedChanges(true);

    const updatedData = { ...formData, [name]: value };

    if (name === "dateOfBirth") {
      updatedData.age = calculateAge(value).toString();
    }

    setFormData(updatedData);
  };

  const handleVisibilityChange = (visibility) => {
    setHasUnsavedChanges(true);
    setFormData((prev) => ({
      ...prev,
      profileVisibility: visibility,
    }));
    setShowVisibilityOptions(false);
  };

  const handleHobbiesChange = (e) => {
    setHasUnsavedChanges(true);

    // For checkbox group
    if (Array.isArray(e.target.value)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: e.target.value,
      }));
    } else {
      // For text input (backward compatibility)
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        hobbies: value
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
      }));
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHasUnsavedChanges(true);
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setHasUnsavedChanges(true);
      setAdditionalImageFiles((prev) => [...prev, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setAdditionalImagePreviews((prev) => [
            ...prev,
            {
              url: reader.result,
              file: file,
              isExisting: false,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteProfileImage = () => {
    setHasUnsavedChanges(true);
    if (profileImagePreview) {
      // If there's an existing image being previewed, mark it for deletion
      setDeleteProfileImageFlag(true);
      setProfileImageFile(null);
      setProfileImagePreview(null);
    }
  };

  const removeAdditionalImage = (index) => {
    setHasUnsavedChanges(true);
    const imageToRemove = additionalImagePreviews[index];
    setAdditionalImagePreviews((prev) => prev.filter((_, i) => i !== index));

    if (imageToRemove.isExisting) {
      // Track deletion of existing image
      setDeletedAdditionalImages((prev) => [...prev, imageToRemove.url]);
      setExistingAdditionalImages((prev) =>
        prev.filter((url) => url !== imageToRemove.url),
      );
    } else if (imageToRemove.file) {
      setAdditionalImageFiles((prev) =>
        prev.filter((file) => file !== imageToRemove.file),
      );
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // ========================
    // Step 1: Delete removed additional images from Cloudinary
    // ========================
    if (deletedAdditionalImages.length > 0) {
      try {
        const deleteResponse = await deleteAdditionalImages(userId, deletedAdditionalImages);
        if (deleteResponse.status === 200) {
          console.log("Deleted images successfully from Cloudinary");
          setDeletedAdditionalImages([]);
        }
      } catch (deleteError) {
        console.error("Error deleting images from Cloudinary:", deleteError);
        alert("Error deleting some images. Continuing with profile update...");
      }
    }

    // ========================
    // Step 2: Build FormData
    // ========================
    const submitFormData = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      if (key === "hobbies") {
        if (Array.isArray(formData[key]) && formData[key].length > 0) {
          formData[key].forEach((hobby, index) => {
            submitFormData.append(`hobbies[${index}]`, hobby);
          });
        } else {
          submitFormData.append("hobbies", "");
        }
      } else {
        submitFormData.append(key, formData[key] || "");
      }
    });

    // ========================
    // Step 3: Handle profile image
    // ========================
    if (profileImageFile) {
      submitFormData.append("profileImage", profileImageFile);
    }
    if (deleteProfileImageFlag) {
      submitFormData.append("deleteProfileImage", "true");
    }

    // ========================
    // Step 4: Handle additional images
    // ========================
    if (additionalImageFiles.length > 0) {
      additionalImageFiles.forEach((file) => {
        submitFormData.append("additionalImages", file);
      });
    }

    // Include existing additional images
    if (existingAdditionalImages.length > 0) {
      existingAdditionalImages.forEach((url, index) => {
        submitFormData.append(`existingAdditionalImages[${index}]`, url);
      });
    }

    // ========================
    // Step 5: Handle self-introduction video
    // ========================
    if (videoFile) {
      submitFormData.append("selfIntroductionVideo", videoFile);
    }
    if (deleteVideoFlag) {
      submitFormData.append("deleteSelfIntroductionVideo", "true");
    }

    // ========================
    // Step 6: Send FormData to backend
    // ========================
    console.log("Submitting form data...");
    const response = await savePersonalInfo(submitFormData, userId);
    console.log("Response:", response);

    if (response.status === 200 || response.data?.success) {
      alert("Profile updated successfully!");

      // Clear video file state and update preview
      setVideoFile(null);
      setVideoPreview(response.data.data.selfIntroductionVideo || null);

      // Reset flags and deleted images list
      setHasUnsavedChanges(false);
      setDeleteProfileImageFlag(false);
      setDeletedAdditionalImages([]);

      // Optional: navigate after update
      setTimeout(() => {
        navigate(`/user/user-profile-page`);
      }, 500);
    } else {
      const errorMessage = response.data?.message || "Error updating profile. Please try again.";
      alert(errorMessage);
      console.error("Update failed:", response);
    }
  } catch (error) {
    console.error("Error submitting profile:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Error updating profile. Please try again.";
    alert(errorMessage);
  } finally {
    setIsSubmitting(false);
  }
};

// ========================
// Warn user about unsaved changes
// ========================
useEffect(() => {
  const handleBeforeUnload = (e) => {
    if (hasUnsavedChanges) {
      e.preventDefault();
      e.returnValue = "";
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);
  return () => window.removeEventListener("beforeunload", handleBeforeUnload);
}, [hasUnsavedChanges]);

// ========================
// Video handlers
// ========================
const handleVideoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setHasUnsavedChanges(true);
    setVideoFile(file);
    setDeleteVideoFlag(false); // reset delete flag
    setVideoPreview(URL.createObjectURL(file));
  }
};

const handleDeleteVideo = () => {
  setHasUnsavedChanges(true);
  setVideoFile(null);
  setVideoPreview(null);
  setDeleteVideoFlag(true); // mark for deletion
};

const handleIdProofChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setIdProofFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setIdProofPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

const handleIdProofUpload = async () => {
  if (!idProofFile) return;
  setIsUploadingId(true);
  try {
    const formData = new FormData();
    formData.append("idProof", idProofFile);
    
    // Using manual axios for direct control
    const baseUrl = import.meta.env.VITE_BASE_ROUTE;
    const url = `${baseUrl}/test-upload-id-proof/${userId}`;
    console.log("HITTING TEST URL:", url);
    
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    if (response.status === 200) {
      alert("ID Proof uploaded successfully (via test route). It is now pending admin approval.");
      setIdVerificationStatus("Uploaded");
      setIdProofFile(null);
    }
  } catch (error) {
    console.error("Error uploading ID proof (test route):", error);
    alert("Error uploading ID proof. Please try again.");
  } finally {
    setIsUploadingId(false);
  }
};

// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);  

//     try {
//       // Step 1: Delete additional images from Cloudinary if any were removed
//       if (deletedAdditionalImages.length > 0) {
//         console.log("Deleting images from Cloudinary:", deletedAdditionalImages);
//         try {
//           const deleteResponse = await deleteAdditionalImages(
//             userId,
//             deletedAdditionalImages,
//           );
//           if (deleteResponse.status === 200) {
//             console.log("Images deleted successfully from Cloudinary");
//             setDeletedAdditionalImages([]); // Clear the deleted images list
//           }
//         } catch (deleteError) {
//           console.error("Error deleting images from Cloudinary:", deleteError);
//           alert("Error deleting some images. Continuing with profile update...");
//         }
//       }

//       // Step 2: Update the profile with remaining data
//       const submitFormData = new FormData();

//       // Append all form fields
//       Object.keys(formData).forEach((key) => {
//         if (key === "hobbies") {
//           if (Array.isArray(formData[key]) && formData[key].length > 0) {
//             formData[key].forEach((hobby, index) => {
//               submitFormData.append(`hobbies[${index}]`, hobby);
//             });
//           } else {
//             submitFormData.append("hobbies", "");
//           }
//         } else {
//           const value = formData[key];
//           submitFormData.append(key, value || "");
//         }
//       });

//       // Append profile image if changed
//       if (profileImageFile) {
//         submitFormData.append("profileImage", profileImageFile);
//       }

//       // Append delete profile image flag if needed
//       if (deleteProfileImageFlag) {
//         submitFormData.append("deleteProfileImage", "true");
//       }

//       // Append new additional images
//       if (additionalImageFiles.length > 0) {
//         additionalImageFiles.forEach((file) => {
//           submitFormData.append("additionalImages", file);
//         });
//       }
      

//       // Append video if new
// if (videoFile) {
//   submitFormData.append("selfIntroductionVideo", videoFile);
// }

// // Append delete flag if video removed
// if (deleteVideoFlag) {
//   submitFormData.append("deleteSelfIntroductionVideo", "true");
// }



//       // Append existing additional images that weren't removed
//       if (existingAdditionalImages.length > 0) {
//         existingAdditionalImages.forEach((url, index) => {
//           submitFormData.append(`existingAdditionalImages[${index}]`, url);
//         });
//       }

//       console.log("Submitting form data...");
//       console.log(
//         "Form data to submit:",
//         Object.fromEntries(submitFormData.entries()),
//       );

//       const response = await savePersonalInfo(submitFormData, userId);

//       console.log("Response:", response);

//       if (response.status === 200 || response.data?.success) {
//         setHasUnsavedChanges(false);
//         setDeleteProfileImageFlag(false);
//         setDeletedAdditionalImages([]); // Clear the deleted images list
//         alert("Profile updated successfully!");

//         // Small delay before navigation to ensure alert is seen
//         setTimeout(() => {
//           navigate(`/user/user-profile-page`);
//         }, 500);
//       } else {
//         const errorMessage =
//           response.data?.message || "Error updating profile. Please try again.";
//         alert(errorMessage);
//         console.error("Update failed:", response);
//       }
//     } catch (error) {
//       console.error("Error details:", error);
//       const errorMessage =
//         error.response?.data?.message ||
//         error.message ||
//         "Error updating profile. Please try again.";
//       alert(errorMessage);

//       if (error.response) {
//         console.error("Response error:", error.response.data);
//         console.error("Response status:", error.response.status);
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Warn user about unsaved changes
//   useEffect(() => {
//     const handleBeforeUnload = (e) => {
//       if (hasUnsavedChanges) {
//         e.preventDefault();
//         e.returnValue = "";
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//   }, [hasUnsavedChanges]);




  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {hasUnsavedChanges && (
              <div
                style={{
                  background: "#fef3c7",
                  border: "1px solid #f59e0b",
                  borderRadius: "6px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                  marginLeft: "15px",
                  marginRight: "15px",
                  fontSize: "14px",
                  color: "#92400e",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i className="fa fa-exclamation-triangle"></i>
                You have unsaved changes. Please submit the form to save your
                changes.
              </div>
            )}

            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              {/* Sidebar - Left Column */}
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar key="edit-sidebar-v4" />
              </div>
              {/* Main Content - Right Column */}
              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <form onSubmit={handleSubmit}>
                  {/* Top Buttons Section */}
                  <div
                    style={{
                      background: "#fff",
                      padding: "20px 24px",
                      borderRadius: "8px",
                      marginBottom: "24px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                      position: "sticky",
                      top: "115px",
                      zIndex: 30,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      disabled={isSubmitting}
                      style={{
                        padding: "10px 24px",
                        background: "#fff",
                        color: "#374151",
                        border: "2px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: "10px 24px",
                        background: isSubmitting ? "#9ca3af" : "#667eea",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#5568d3";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#667eea";
                        }
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Save Changes"}
                    </button>
                  </div>

                  {/* Profile Image Upload Section */}
                  <BasicInfomation
                    profileImagePreview={profileImagePreview}
                    handleProfileImageChange={handleProfileImageChange}
                    handleAdditionalImagesChange={handleAdditionalImagesChange}
                    additionalImagePreviews={additionalImagePreviews}
                    removeAdditionalImage={removeAdditionalImage}
                    handleDeleteProfileImage={handleDeleteProfileImage}
                  />

                  <FormSection title="Self Introduction Video">
  <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
    {videoPreview ? (
      <div style={{ position: "relative", display: "inline-block" }}>
       <video
  src={videoPreview}
  controls
  style={{
    width: "200px", // smaller size
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  }}
/>
        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDeleteVideo}
          style={{
            position: "absolute",
            top: "6px",
            right: "6px",
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#ef4444",
            border: "2px solid #fff",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Remove video"
        >
          <i className="fa fa-times"></i>
        </button>

        {/* Download Button */}
        <a
          href={videoPreview}
          download="SelfIntroduction.mp4"
          style={{
            position: "absolute",
            bottom: "6px",
            right: "6px",
            padding: "6px 10px",
            background: "#667eea",
            color: "#fff",
            fontSize: "12px",
            fontWeight: "600",
            borderRadius: "6px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#5568d3";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#667eea";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <i className="fa fa-download"></i> Download
        </a>
      </div>
    ) : (
      <div>
        <input
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          style={{
            padding: "8px",
            border: "2px dashed #d1d5db",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            background: "#f9fafb",
          }}
        />
        <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "6px" }}>
          Upload a short self-introduction video
        </p>
      </div>
    )}
  </div>
</FormSection>

<FormSection title="Government ID Verification">
  <div style={{
    background: "#f8fafc",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0"
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
      <div>
        <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#1e293b", marginBottom: "4px" }}>
          Verify your identity
        </h4>
        <p style={{ fontSize: "14px", color: "#64748b" }}>
          Please upload a valid government-issued ID (Aadhar, PAN, Passport, etc.) for verification.
        </p>
      </div>
      <div style={{
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700",
        textTransform: "uppercase",
        background: idVerificationStatus === "Verified" ? "#dcfce7" : idVerificationStatus === "Rejected" ? "#fee2e2" : idVerificationStatus === "Uploaded" ? "#fef9c3" : "#f1f5f9",
        color: idVerificationStatus === "Verified" ? "#15803d" : idVerificationStatus === "Rejected" ? "#b91c1c" : idVerificationStatus === "Uploaded" ? "#854d0e" : "#475569",
        border: "1px solid",
        borderColor: idVerificationStatus === "Verified" ? "#86efac" : idVerificationStatus === "Rejected" ? "#fecaca" : idVerificationStatus === "Uploaded" ? "#fef08a" : "#cbd5e1"
      }}>
        {idVerificationStatus}
      </div>
    </div>

    {idVerificationStatus === "Verified" ? (
      <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#15803d", background: "#f0fdf4", padding: "16px", borderRadius: "8px", border: "1px solid #bbf7d0" }}>
        <i className="fa fa-check-circle" style={{ fontSize: "20px" }}></i>
        <div>
          <p style={{ fontWeight: "600", margin: 0 }}>Your ID has been verified!</p>
          <p style={{ fontSize: "13px", margin: 0 }}>A verified badge is now visible on your profile.</p>
        </div>
      </div>
    ) : (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {idProofPreview && (
          <div style={{ position: "relative", width: "fit-content" }}>
            {idProofDocument?.toLowerCase().endsWith(".pdf") || (idProofFile && idProofFile.type === "application/pdf") ? (
              <div style={{
                width: "200px",
                height: "150px",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                color: "#64748b"
              }}>
                <i className="fa fa-file-pdf-o" style={{ fontSize: "40px", color: "#ef4444", marginBottom: "8px" }}></i>
                <span style={{ fontSize: "12px", fontWeight: "600" }}>PDF Document</span>
              </div>
            ) : (
              <img
                src={idProofPreview}
                alt="ID Proof Preview"
                style={{
                  width: "200px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                }}
              />
            )}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <label style={{
            padding: "10px 20px",
            background: "#fff",
            border: "2px dashed #cbd5e1",
            borderRadius: "8px",
            color: "#475569",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
            display: "inline-block"
          }}>
            <i className="fa fa-upload" style={{ marginRight: "8px" }}></i>
            {idProofFile ? "Change File" : "Choose ID File"}
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleIdProofChange}
              style={{ display: "none" }}
            />
          </label>

          {idProofFile && (
            <button
              type="button"
              onClick={handleIdProofUpload}
              disabled={isUploadingId}
              style={{
                padding: "10px 24px",
                background: "#6366f1",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: isUploadingId ? "not-allowed" : "pointer",
                boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.4)",
                transition: "all 0.2s ease"
              }}
            >
              {isUploadingId ? (
                <><i className="fa fa-spinner fa-spin" style={{ marginRight: "8px" }}></i> Uploading...</>
              ) : (
                "Upload & Submit"
              )}
            </button>
          )}
        </div>
        
        {idVerificationStatus === "Rejected" && (
          <p style={{ fontSize: "13px", color: "#dc2626", fontWeight: "500", marginTop: "8px" }}>
            <i className="fa fa-exclamation-circle" style={{ marginRight: "6px" }}></i>
            Your previous document was rejected. Please upload a clear, valid ID.
          </p>
        )}
      </div>
    )}
  </div>
</FormSection>

                  {/* Profile Visibility Toggle Section */}
                  <div
                    style={{
                      padding: "24px",
                      background: "#fff",
                      borderRadius: "8px",
                      marginBottom: "24px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: "16px",
                            fontWeight: "600",
                            color: "#1f2937",
                            marginBottom: "8px",
                            marginTop: "0",
                          }}
                        >
                          Profile Visibility
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            color: "#6b7280",
                            margin: "0",
                          }}
                        >
                          Current Status: <strong>{formData.profileVisibility}</strong>
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setShowVisibilityOptions(!showVisibilityOptions)
                        }
                        style={{
                          padding: "10px 20px",
                          background: "#667eea",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#5568d3";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#667eea";
                        }}
                      >
                        {showVisibilityOptions ? "Cancel" : "Change Visibility"}
                      </button>
                    </div>

                    {/* Visibility Options */}
                    {showVisibilityOptions && (
                      <div
                        style={{
                          marginTop: "20px",
                          paddingTop: "20px",
                          borderTop: "1px solid #e5e7eb",
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "16px",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleVisibilityChange("Public")}
                          style={{
                            padding: "20px 16px",
                            background:
                              formData.profileVisibility === "Public"
                                ? "#ecf0ff"
                                : "#f9fafb",
                            border:
                              formData.profileVisibility === "Public"
                                ? "2px solid #667eea"
                                : "2px solid #e5e7eb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (formData.profileVisibility !== "Public") {
                              e.target.style.borderColor = "#d1d5db";
                              e.target.style.background = "#f3f4f6";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (formData.profileVisibility !== "Public") {
                              e.target.style.borderColor = "#e5e7eb";
                              e.target.style.background = "#f9fafb";
                            }
                          }}
                        >
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#1f2937",
                              marginBottom: "6px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <i className="fa fa-globe"></i>
                            Public
                            {formData.profileVisibility === "Public" && (
                              <i
                                className="fa fa-check-circle"
                                style={{ color: "#667eea", marginLeft: "auto" }}
                              ></i>
                            )}
                          </div>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#6b7280",
                              margin: "0",
                            }}
                          >
                            Your profile is visible to all users
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleVisibilityChange("Private")}
                          style={{
                            padding: "20px 16px",
                            background:
                              formData.profileVisibility === "Private"
                                ? "#ecf0ff"
                                : "#f9fafb",
                            border:
                              formData.profileVisibility === "Private"
                                ? "2px solid #667eea"
                                : "2px solid #e5e7eb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            textAlign: "left",
                          }}
                          onMouseEnter={(e) => {
                            if (formData.profileVisibility !== "Private") {
                              e.target.style.borderColor = "#d1d5db";
                              e.target.style.background = "#f3f4f6";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (formData.profileVisibility !== "Private") {
                              e.target.style.borderColor = "#e5e7eb";
                              e.target.style.background = "#f9fafb";
                            }
                          }}
                        >
                          <div
                            style={{
                              fontSize: "16px",
                              fontWeight: "600",
                              color: "#1f2937",
                              marginBottom: "6px",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <i className="fa fa-lock"></i>
                            Private
                            {formData.profileVisibility === "Private" && (
                              <i
                                className="fa fa-check-circle"
                                style={{ color: "#667eea", marginLeft: "auto" }}
                              ></i>
                            )}
                          </div>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "#6b7280",
                              margin: "0",
                            }}
                          >
                            Only you and admins can view your profile
                          </p>
                        </button>
                      </div>
                    )}
                  </div>

               
                  {/* Basic Details Section */}
                  <FormSection title="Basic Details">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="About Me"
                          name="aboutMe"
                          type="textarea"
                          value={formData.aboutMe}
                          onChange={handleInputChange}
                          placeholder="Write a brief introduction about yourself..."
                          rows={4}
                        />
                      </div>
                      <FormInput
                        label="Gender"
                        name="gender"
                        type="select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        options={["Male", "Female", "Other"]}
                      />
                      <FormInput
                        label="Profile Created By"
                        name="profileCreatedFor"
                        type="select"
                        value={formData.profileCreatedFor}
                        onChange={handleInputChange}
                        options={[
                          "Self",
                          "Son",
                          "Daughter",
                          "Brother",
                          "Sister",
                          "Friend",
                          "Relative",
                        ]}
                      />
                      <FormInput
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                      <FormInput
                        label="Date of Birth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Calculated automatically"
                      />
                      <FormInput
                        label="Body Type"
                        name="bodyType"
                        type="select"
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        options={["Slim", "Average", "Athletic", "Heavy"]}
                      />
                      <FormInput
                        label="Physical Status"
                        name="physicalStatus"
                        type="select"
                        value={formData.physicalStatus}
                        onChange={handleInputChange}
                        options={["Normal", "Physically Challenged"]}
                      />
                      <FormInput
                        label="Complexion"
                        name="complexion"
                        type="select"
                        value={formData.complexion}
                        onChange={handleInputChange}
                        options={[
                          "Very Fair",
                          "Fair",
                          "Wheatish",
                          "Dark",
                          "Very Dark",
                        ]}
                      />
                      <FormInput
                        label="Height"
                        name="height"
                        type="select"
                        searchable={true}
                        value={formData.height}
                        onChange={handleInputChange}
                        options={[
                          "4ft",
                          "4ft 1in",
                          "4ft 2in",
                          "4ft 3in",
                          "4ft 4in",
                          "4ft 5in",
                          "4ft 6in",
                          "4ft 7in",
                          "4ft 8in",
                          "4ft 9in",
                          "4ft 10in",
                          "4ft 11in",
                          "5ft",
                          "5ft 1in",
                          "5ft 2in",
                          "5ft 3in",
                          "5ft 4in",
                          "5ft 5in",
                          "5ft 6in",
                          "5ft 7in",
                          "5ft 8in",
                          "5ft 9in",
                          "5ft 10in",
                          "5ft 11in",
                          "6ft",
                          "6ft 1in",
                          "6ft 2in",
                          "6ft 3in",
                          "6ft 4in",
                          "6ft 5in",
                          "6ft 6in",
                          "6ft 7in",
                          "6ft 8in",
                          "6ft 9in",
                          "6ft 10in",
                          "6ft 11in",
                          "7ft",
                          "7ft 1in",
                          "7ft 2in",
                          "7ft 3in",
                          "7ft 4in",
                          "7ft 5in",
                          "7ft 6in",
                          "7ft 7in",
                          "7ft 8in",
                          "7ft 9in",
                          "7ft 10in",
                          "7ft 11in",
                          "8ft",
                        ]}
                      />
                      <FormInput
                        label="Weight (kg)"
                        name="weight"
                        value={formData.weight}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Marital Status"
                        name="maritalStatus"
                        type="select"
                        value={formData.maritalStatus}
                        onChange={handleInputChange}
                        options={[
                          "Never Married",
                          "Separated",
                          "Divorced",
                          "Widow / Widower",
                          "Awaiting Divorce",
                          "Annulled",
                        ]}
                      />
                      {formData.maritalStatus &&
                        formData.maritalStatus !== "Never Married" && (
                          <>
                            <FormInput
                              label="Married Month & Year"
                              name="marriedMonthYear"
                              value={formData.marriedMonthYear}
                              onChange={handleInputChange}
                            />
                            <FormInput
                              label="Living Together Period"
                              name="livingTogetherPeriod"
                              value={formData.livingTogetherPeriod}
                              onChange={handleInputChange}
                            />
                          </>
                        )}

                      {(formData.maritalStatus === "Divorced" ||
                        formData.maritalStatus === "Awaiting Divorce") && (
                        <>
                          <FormInput
                            label="Divorced Month & Year"
                            name="divorcedMonthYear"
                            value={formData.divorcedMonthYear}
                            onChange={handleInputChange}
                          />
                          <div style={{ gridColumn: "1 / -1" }}>
                            <FormInput
                              label="Reason for Divorce"
                              name="reasonForDivorce"
                              type="textarea"
                              value={formData.reasonForDivorce}
                              onChange={handleInputChange}
                            />
                          </div>
                        </>
                      )}

                      {formData.maritalStatus &&
                        formData.maritalStatus !== "Never Married" && (
                          <>
                            <FormInput
                              label="Child Status"
                              name="childStatus"
                              type="select"
                              value={formData.childStatus}
                              onChange={handleInputChange}
                              options={[
                                "No Children",
                                "Have Children - Living Together",
                                "Have Children - Not Living Together",
                              ]}
                            />
                            <FormInput
                              label="Number of Children"
                              name="numberOfChildren"
                              value={formData.numberOfChildren}
                              onChange={handleInputChange}
                            />
                          </>
                        )}
                      <FormInput
                        label="Eating Habits"
                        name="eatingHabits"
                        type="select"
                        value={formData.eatingHabits}
                        onChange={handleInputChange}
                        options={["Vegetarian", "Non-Vegetarian", "Eggetarian"]}
                      />
                      <FormInput
                        label="Drinking Habits"
                        name="drinkingHabits"
                        type="select"
                        value={formData.drinkingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Never Drinks",
                          "Drinks Socially",
                          "Drinks Regularly",
                        ]}
                      />
                      <FormInput
                        label="Smoking Habits"
                        name="smokingHabits"
                        type="select"
                        value={formData.smokingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Never Smokes",
                          "Smokes Occasionally",
                          "Smokes Regularly",
                        ]}
                      />
                      <FormInput
                        label="Mother Tongue"
                        name="motherTongue"
                        type="select"
                        searchable={true}
                        value={formData.motherTongue}
                        onChange={handleInputChange}
                        options={[
                          "Aka",
                          "Arabic",
                          "Arunachali",
                          "Assamese",
                          "Awadhi",
                          "Bengali",
                          "Bhojpuri",
                          "Bhutia",
                          "Bihari",
                          "Brij",
                          "Chatisgarhi",
                          "Chinese",
                          "Dogri",
                          "English",
                          "French",
                          "Garhwali",
                          "Garo",
                          "Gujarati",
                          "Haryanvi",
                          "Himachali/Pahari",
                          "Hindi",
                          "Kanauji",
                          "Kannada",
                          "Kashmiri",
                          "Khandesi",
                          "Khasi",
                          "Konkani",
                          "Koshali",
                          "Kumaoni",
                          "Kutchi",
                          "Ladacki",
                          "Lepcha",
                          "Magahi",
                          "Maithili",
                          "Malay",
                          "Malayalam",
                          "Manipuri",
                          "Marathi",
                          "Marwari",
                          "Miji",
                          "Mizo",
                          "Monpa",
                          "Nepali",
                          "Odia",
                          "Persian",
                          "Punjabi",
                          "Rajasthani",
                          "Russian",
                          "Sanskrit",
                          "Santhali",
                          "Sindhi",
                          "Spanish",
                          "Swedish",
                          "Tagalog",
                          "Tamil",
                          "Telugu",
                          "Tulu",
                          "Urdu",
                          "Other",
                        ]}
                      />
                      <FormInput
                        label="Caste"
                        name="caste"
                        type="select"
                        searchable={true}
                        value={formData.caste}
                        onChange={handleInputChange}
                        options={[
                          "Do not wish to specify",
                          "Latin Catholic",
                          "Roman Catholic",
                          "Syro Malabar",
                          "Syro Malankara",
                          "Knanaya Catholic",
                          "CSI (Church of South India)",
                          "Pentecostal",
                          "Jacobite",
                          "Orthodox",
                          "Marthoma",
                          "Protestant",
                          "Anglican",
                          "Baptist",
                          "Methodist",
                          "Presbyterian",
                          "Seventh Day Adventist",
                          "Assembly of God",
                          "Brethren",
                          "Other",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Family Details Section */}
                  <FormSection title="Family Details">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Father's Name"
                        name="fathersName"
                        value={formData.fathersName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Mother's Name"
                        name="mothersName"
                        value={formData.mothersName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Father's Occupation"
                        name="fathersOccupation"
                        value={formData.fathersOccupation}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Father's Profession"
                        name="fathersProfession"
                        value={formData.fathersProfession}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Mother's Occupation"
                        name="mothersOccupation"
                        value={formData.mothersOccupation}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Father's Native"
                        name="fathersNative"
                        value={formData.fathersNative}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Mother's Native"
                        name="mothersNative"
                        value={formData.mothersNative}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Family Value"
                        name="familyValue"
                        type="select"
                        value={formData.familyValue}
                        onChange={handleInputChange}
                        options={[
                          "Orthodox",
                          "Traditional",
                          "Moderate",
                          "Liberal",
                        ]}
                      />
                      <FormInput
                        label="Family Type"
                        name="familyType"
                        type="select"
                        value={formData.familyType}
                        onChange={handleInputChange}
                        options={["Joint Family", "Nuclear Family"]}
                      />
                      <FormInput
                        label="Family Status"
                        name="familyStatus"
                        type="select"
                        value={formData.familyStatus}
                        onChange={handleInputChange}
                        options={[
                          "Middle Class",
                          "Upper Middle Class",
                          "High Class",
                        ]}
                      />
                      <FormInput
                        label="Residence Type"
                        name="residenceType"
                        type="select"
                        value={formData.residenceType}
                        onChange={handleInputChange}
                        options={["Own House", "Rented House", "Company Lease"]}
                      />
                      <FormInput
                        label="Number of Brothers"
                        name="numberOfBrothers"
                        value={formData.numberOfBrothers}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Number of Sisters"
                        name="numberOfSisters"
                        value={formData.numberOfSisters}
                        onChange={handleInputChange}
                      />
                    </div>
                  </FormSection>

                  {/* Religious Information Section */}
                  <FormSection title="Religious Information">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Denomination"
                        name="denomination"
                        type="select"
                        searchable={true}
                        value={formData.denomination}
                        onChange={handleInputChange}
                        options={[
                          "ACI - Anglican Church Of India",
                          "Adventist",
                          "AG - Assembly of God",
                          "Anglican",
                          "Anglo Indian",
                          "Apostolic",
                          "Baptist",
                          "Believers Church",
                          "Brethren",
                          "Catholic",
                          "Catholic - Knanaya",
                          "Catholic - Latin",
                          "Catholic - Malankara",
                          "Catholic - Roman",
                          "Catholic - Syro Malabar",
                          "Chaldean Syrian",
                          "Charismatic",
                          "Christian - Others",
                          "Church Of Christ",
                          "Church Of God",
                          "CNI - Church Of North India",
                          "Congregational",
                          "CPM - Ceylon Pentecostal Mission",
                          "CSI - Church Of South India",
                          "Don't wish to specify",
                          "Evangelist",
                          "Independent Church",
                          "Jacobite",
                          "Jacobite - Knanaya",
                          "Jehovah Shammah",
                          "Jehovah's Witnesses",
                          "Knanaya",
                          "Knanaya Catholic",
                          "Knanaya Jacobite",
                          "Latin Catholic",
                          "Lutheran",
                          "Malankara Catholic",
                          "Marthoma",
                          "Methodist",
                          "Moravian",
                          "Muslim - Sunni",
                          "Orthodox",
                          "Orthodox - Knanaya",
                          "Pentecost",
                          "Presbyterian",
                          "Protestant",
                          "Reformed",
                          "Revival",
                          "Salvation Army",
                          "Seventh-day Adventist",
                          "St. Thomas Evangelical",
                          "Syro Malabar",
                          "Syrian Catholic",
                          "TPM - The Pentecostal Mission",
                          "Other",
                        ]}
                      />
                      <FormInput
                        label="Church"
                        name="church"
                        value={formData.church}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Church Activity"
                        name="churchActivity"
                        type="select"
                        searchable={true}
                        value={formData.churchActivity}
                        onChange={handleInputChange}
                        options={[
                          "Church Choir",
                          "Worship Leader",
                          "Youth Fellowship",
                          "Sunday School",
                          "Music & Ministry",
                          "Prayer Group",
                          "Bible Study",
                          "Evangelism",
                          "Volunteer",
                          "Other",
                        ]}
                      />
                      <FormInput
                        label="Pastor's Name"
                        name="pastorsName"
                        value={formData.pastorsName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Spirituality"
                        name="spirituality"
                        type="select"
                        value={formData.spirituality}
                        onChange={handleInputChange}
                        options={[
                          "Very Religious",
                          "Religious",
                          "Moderately Religious",
                          "Not Religious",
                        ]}
                      />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Religious Detail"
                          name="religiousDetail"
                          type="textarea"
                          value={formData.religiousDetail}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </FormSection>

                  {/* Contact Information Section */}
                  <FormSection title="Contact Information">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Mobile Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <FormInput
                        label="Alternate Mobile Number"
                        name="alternateMobile"
                        type="tel"
                        value={formData.alternateMobile}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                      <FormInput
                        label="Landline Number"
                        name="landlineNumber"
                        value={formData.landlineNumber}
                        onChange={handleInputChange}
                      />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Current Address"
                          name="currentAddress"
                          type="textarea"
                          value={formData.currentAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Permanent Address"
                          name="permanentAddress"
                          type="textarea"
                          value={formData.permanentAddress}
                          onChange={handleInputChange}
                        />
                      </div>
                      <FormInput
                        label="City"
                        name="city"
                        type="text"
                        placeholder="Enter city name"
                        value={formData.city}
                        onChange={handleCityChange}
                      />
                      <FormInput
                        label="State"
                        name="state"
                        type="select"
                        searchable={true}
                        value={formData.state}
                        onChange={handleStateChange}
                        options={stateOptions}
                      />
                      <FormInput
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Country"
                        name="citizenOf"
                        type="select"
                        searchable={true}
                        value={formData.citizenOf}
                        onChange={handleCountryChange}
                        options={countryOptions}
                      />
                      <FormInput
                        label="Contact Person Name"
                        name="contactPersonName"
                        value={formData.contactPersonName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Relationship"
                        name="relationship"
                        type="select"
                        searchable={true}
                        value={formData.relationship}
                        onChange={handleInputChange}
                        options={[
                          "Father",
                          "Mother",
                          "Brother",
                          "Sister",
                          "Uncle",
                          "Aunt",
                          "Cousin",
                          "Friend",
                          "Self",
                          "Other",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Professional Information Section */}
                  <FormSection title="Professional Information">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Education"
                        name="education"
                        type="select"
                        searchable={true}
                        value={formData.education}
                        onChange={handleInputChange}
                        options={[
                          "B.Arch",
                          "B.Com",
                          "B.Ed",
                          "B.Pharm",
                          "B.Sc",
                          "B.Sc (Hons)",
                          "B.E",
                          "B.Tech",
                          "BA",
                          "BBA",
                          "BCA",
                          "BDS",
                          "BHM",
                          "BAMS",
                          "BHMS",
                          "BSw",
                          "LLB",
                          "M.Arch",
                          "M.Com",
                          "M.Ed",
                          "M.Pharm",
                          "M.Sc",
                          "M.E",
                          "M.Tech",
                          "MA",
                          "MBA",
                          "MCA",
                          "MDS",
                          "MHM",
                          "MSW",
                          "LLM",
                          "MBBS",
                          "MD",
                          "MS",
                          "Ph.D",
                          "Diploma",
                          "Polytechnic",
                          "Trade School",
                          "Higher Secondary / Plus Two",
                          "SSLC / 10th",
                          "Other",
                        ]}
                      />
                      <FormInput
                        label="Additional Education"
                        name="additionalEducation"
                        type="select"
                        searchable={true}
                        value={formData.additionalEducation}
                        onChange={handleInputChange}
                        options={[
                          "B.Arch",
                          "B.Com",
                          "B.Ed",
                          "B.Pharm",
                          "B.Sc",
                          "B.E",
                          "B.Tech",
                          "BA",
                          "BBA",
                          "BCA",
                          "BDS",
                          "BHM",
                          "BAMS",
                          "BHMS",
                          "BSw",
                          "LLB",
                          "M.Arch",
                          "M.Com",
                          "M.Ed",
                          "M.Pharm",
                          "M.Sc",
                          "M.E",
                          "M.Tech",
                          "MA",
                          "MBA",
                          "MCA",
                          "MDS",
                          "MHM",
                          "MSW",
                          "LLM",
                          "MBBS",
                          "MD",
                          "MS",
                          "Ph.D",
                          "Diploma",
                          "Polytechnic",
                          "Trade School",
                          "Higher Secondary / Plus Two",
                          "SSLC / 10th",
                          "Other",
                        ]}
                      />
                      <FormInput
                        label="College"
                        name="college"
                        value={formData.college}
                        onChange={handleInputChange}
                      />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Education in Detail"
                          name="educationDetail"
                          type="textarea"
                          value={formData.educationDetail}
                          onChange={handleInputChange}
                        />
                      </div>
                      <FormInput
                        label="Employment Type"
                        name="employmentType"
                        type="select"
                        searchable={true}
                        value={formData.employmentType}
                        onChange={handleInputChange}
                        options={[
                          "Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                        ]}
                      />
                      <FormInput
                        label="Occupation"
                        name="occupation"
                        type="select"
                        searchable={true}
                        value={formData.occupation}
                        onChange={handleInputChange}
                        options={[
                          "Accountant",
                          "Actor",
                          "Administrative Professional",
                          "Advertising Professional",
                          "Agri-Business Professional",
                          "Air Hostess / Flight Attendant",
                          "Architect",
                          "Artist",
                          "Auditor",
                          "Banking Professional",
                          "Beautician",
                          "Biologist / Botanist",
                          "Business",
                          "Chartered Accountant",
                          "Civil Engineer",
                          "Clerical Official",
                          "Commercial Pilot",
                          "Company Secretary",
                          "Computer Professional",
                          "Consultant",
                          "Contractor",
                          "Cost Accountant",
                          "Creative Person",
                          "Customer Support Professional",
                          "Defense Employee",
                          "Dentist",
                          "Designer",
                          "Doctor",
                          "Economist",
                          "Engineer",
                          "Engineer (Mechanical)",
                          "Engineer (Project)",
                          "Entertainment Professional",
                          "Event Manager",
                          "Executive",
                          "Factory Worker",
                          "Farmer",
                          "Fashion Designer",
                          "Finance Professional",
                          "Flight Attendant",
                          "Government Employee",
                          "Graphic Designer",
                          "Health Care Professional",
                          "Hotel Management Professional",
                          "HR Professional",
                          "Human Resources Professional",
                          "Indian Administrative Services (IAS)",
                          "Indian Foreign Services (IFS)",
                          "Indian Police Services (IPS)",
                          "Interior Designer",
                          "Investment Professional",
                          "IT Professional",
                          "Journalist",
                          "Lawyer",
                          "Lecturer",
                          "Legal Professional",
                          "Manager",
                          "Marketing Professional",
                          "Media Professional",
                          "Medical Professional",
                          "Merchant Naval Officer",
                          "Microbiologist",
                          "Military",
                          "Model",
                          "Musician",
                          "Nurse",
                          "Nutritionist",
                          "Occupational Therapist",
                          "Optician",
                          "Pharmacist",
                          "Photographer",
                          "Physical Therapist",
                          "Physician",
                          "Pilot",
                          "Police",
                          "Politician",
                          "Professor",
                          "Psychologist",
                          "Public Relations Professional",
                          "Real Estate Professional",
                          "Researcher",
                          "Retired",
                          "Sales Professional",
                          "Scientist",
                          "Secretary",
                          "Security Professional",
                          "Self Employed",
                          "Social Worker",
                          "Software Consultant",
                          "Software Engineer",
                          "Sportsman",
                          "Student",
                          "Teacher",
                          "Technician",
                          "Training Professional",
                          "Transportation Professional",
                          "Veterinary Doctor",
                          "Volunteer",
                          "Writer",
                          "Zoologist",
                          "Not Working",
                        ]}
                      />
                      <FormInput
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Company Name"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Annual Income"
                        name="annualIncome"
                        type="select"
                        searchable={true}
                        value={formData.annualIncome}
                        onChange={handleInputChange}
                        options={[
                          "50 Thousands",
                          "1 Lakh",
                          "2 Lakhs",
                          "3 Lakhs",
                          "4 Lakhs",
                          "5 Lakhs",
                          "6 Lakhs",
                          "7 Lakhs",
                          "8 Lakhs",
                          "9 Lakhs",
                          "10 Lakhs",
                          "12 Lakhs",
                          "14 Lakhs",
                          "16 Lakhs",
                          "18 Lakhs",
                          "20 Lakhs",
                          "25 Lakhs",
                          "30 Lakhs",
                          "35 Lakhs",
                          "40 Lakhs",
                          "50 Lakhs",
                          "60 Lakhs",
                          "70 Lakhs",
                          "80 Lakhs",
                          "90 Lakhs",
                          "1 Crore",
                          "1 Crore+",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Lifestyle Section with Checkboxes */}
                  <FormSection title="Lifestyle">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: "20px",
                      }}
                    >
                      {/* Hobbies as Checkboxes */}
                      <div style={{ gridColumn: "1 / -1" }}>
                        <CheckboxGroup
                          label="Hobbies"
                          name="hobbies"
                          options={hobbiesOptions}
                          selectedValues={
                            Array.isArray(formData.hobbies)
                              ? formData.hobbies
                              : []
                          }
                          onChange={handleHobbiesChange}
                        />
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "20px",
                        }}
                      >
                        <FormInput
                          label="Interests"
                          name="interests"
                          value={formData.interests}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          label="Music"
                          name="music"
                          value={formData.music}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          label="Favourite Reads"
                          name="favouriteReads"
                          value={formData.favouriteReads}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          label="Favourite Cuisines"
                          name="favouriteCuisines"
                          value={formData.favouriteCuisines}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          label="Exercise"
                          name="exercise"
                          type="select"
                          value={formData.exercise}
                          onChange={handleInputChange}
                          options={["Regular", "Occasional", "Rare", "Never"]}
                        />
                        <FormInput
                          label="Sports Activities"
                          name="sportsActivities"
                          value={formData.sportsActivities}
                          onChange={handleInputChange}
                        />
                        <FormInput
                          label="Dress Styles"
                          name="dressStyles"
                          value={formData.dressStyles}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </FormSection>

                  {/* Partner Preferences - Basic & Religion */}
                  <FormSection title="Partner Preferences - Basic & Religion">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Partner Age From"
                        name="partnerAgeFrom"
                        value={formData.partnerAgeFrom}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Partner Age To"
                        name="partnerAgeTo"
                        value={formData.partnerAgeTo}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Partner Height"
                        name="partnerHeight"
                        value={formData.partnerHeight}
                        onChange={handleInputChange}
                        placeholder="e.g., 160-180 cm"
                      />
                      <FormInput
                        label="Partner Marital Status"
                        name="partnerMaritalStatus"
                        type="select"
                        searchable={true}
                        value={formData.partnerMaritalStatus}
                        onChange={handleInputChange}
                        options={[
                          "Never Married",
                          "Divorced",
                          "Separated",
                          "Widow / Widower",
                          "Awaiting Divorce",
                          "Annulled",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Mother Tongue"
                        name="partnerMotherTongue"
                        type="select"
                        searchable={true}
                        value={formData.partnerMotherTongue}
                        onChange={handleInputChange}
                        options={[
                          "Aka",
                          "Arabic",
                          "Arunachali",
                          "Assamese",
                          "Awadhi",
                          "Bengali",
                          "Bhojpuri",
                          "Bhutia",
                          "Bihari",
                          "Brij",
                          "Chatisgarhi",
                          "Chinese",
                          "Dogri",
                          "English",
                          "French",
                          "Garhwali",
                          "Garo",
                          "Gujarati",
                          "Haryanvi",
                          "Himachali/Pahari",
                          "Hindi",
                          "Kanauji",
                          "Kannada",
                          "Kashmiri",
                          "Khandesi",
                          "Khasi",
                          "Konkani",
                          "Koshali",
                          "Kumaoni",
                          "Kutchi",
                          "Ladacki",
                          "Lepcha",
                          "Magahi",
                          "Maithili",
                          "Malay",
                          "Malayalam",
                          "Manipuri",
                          "Marathi",
                          "Marwari",
                          "Miji",
                          "Mizo",
                          "Monpa",
                          "Nepali",
                          "Odia",
                          "Persian",
                          "Punjabi",
                          "Rajasthani",
                          "Russian",
                          "Sanskrit",
                          "Santhali",
                          "Sindhi",
                          "Spanish",
                          "Swedish",
                          "Tagalog",
                          "Tamil",
                          "Telugu",
                          "Tulu",
                          "Urdu",
                          "Other",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Caste"
                        name="partnerCaste"
                        type="select"
                        searchable={true}
                        value={formData.partnerCaste}
                        onChange={handleInputChange}
                        options={[
                          "Doesn't wish to specify",
                          "Latin Catholic",
                          "Roman Catholic",
                          "Syro Malabar",
                          "Syro Malankara",
                          "Knanaya Catholic",
                          "CSI (Church of South India)",
                          "Pentecostal",
                          "Jacobite",
                          "Orthodox",
                          "Marthoma",
                          "Protestant",
                          "Anglican",
                          "Baptist",
                          "Methodist",
                          "Presbyterian",
                          "Seventh Day Adventist",
                          "Assembly of God",
                          "Brethren",
                          "Other",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Physical Status"
                        name="partnerPhysicalStatus"
                        type="select"
                        value={formData.partnerPhysicalStatus}
                        onChange={handleInputChange}
                        options={["Normal", "Physically Challenged", "Any"]}
                      />
                      <FormInput
                        label="Partner Eating Habits"
                        name="partnerEatingHabits"
                        type="select"
                        value={formData.partnerEatingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Vegetarian",
                          "Non-Vegetarian",
                          "Eggetarian",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Drinking Habits"
                        name="partnerDrinkingHabits"
                        type="select"
                        value={formData.partnerDrinkingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Never Drinks",
                          "Drinks Socially",
                          "Drinks Regularly",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Smoking Habits"
                        name="partnerSmokingHabits"
                        type="select"
                        value={formData.partnerSmokingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Never Smokes",
                          "Smokes Occasionally",
                          "Smokes Regularly",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Denomination"
                        name="partnerDenomination"
                        type="select"
                        searchable={true}
                        value={formData.partnerDenomination}
                        onChange={handleInputChange}
                        options={[
                          "ACI - Anglican Church Of India",
                          "Adventist",
                          "AG - Assembly of God",
                          "Anglican",
                          "Anglo Indian",
                          "Apostolic",
                          "Baptist",
                          "Believers Church",
                          "Brethren",
                          "Catholic",
                          "Catholic - Knanaya",
                          "Catholic - Latin",
                          "Catholic - Malankara",
                          "Catholic - Roman",
                          "Catholic - Syro Malabar",
                          "Chaldean Syrian",
                          "Charismatic",
                          "Christian - Others",
                          "Church Of Christ",
                          "Church Of God",
                          "CNI - Church Of North India",
                          "Congregational",
                          "CPM - Ceylon Pentecostal Mission",
                          "CSI - Church Of South India",
                          "Don't wish to specify",
                          "Evangelist",
                          "Independent Church",
                          "Jacobite",
                          "Jacobite - Knanaya",
                          "Jehovah Shammah",
                          "Jehovah's Witnesses",
                          "Knanaya",
                          "Knanaya Catholic",
                          "Knanaya Jacobite",
                          "Latin Catholic",
                          "Lutheran",
                          "Malankara Catholic",
                          "Marthoma",
                          "Methodist",
                          "Moravian",
                          "Muslim - Sunni",
                          "Orthodox",
                          "Orthodox - Knanaya",
                          "Pentecost",
                          "Presbyterian",
                          "Protestant",
                          "Reformed",
                          "Revival",
                          "Salvation Army",
                          "Seventh-day Adventist",
                          "St. Thomas Evangelical",
                          "Syro Malabar",
                          "Syrian Catholic",
                          "TPM - The Pentecostal Mission",
                          "Other",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Spirituality"
                        name="partnerSpirituality"
                        type="select"
                        value={formData.partnerSpirituality}
                        onChange={handleInputChange}
                        options={[
                          "Very Religious",
                          "Religious",
                          "Moderately Religious",
                          "Not Religious",
                          "Any",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Partner Preferences - Professional */}
                  <FormSection title="Partner Preferences - Professional">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Partner Education"
                        name="partnerEducation"
                        type="select"
                        searchable={true}
                        value={formData.partnerEducation}
                        onChange={handleInputChange}
                        options={[
                          "B.Arch",
                          "B.Com",
                          "B.Ed",
                          "B.Pharm",
                          "B.Sc",
                          "B.Tech",
                          "BA",
                          "BBA",
                          "BCA",
                          "BDS",
                          "BHM",
                          "BAMS",
                          "BHMS",
                          "BSw",
                          "LLB",
                          "M.Arch",
                          "M.Com",
                          "M.Ed",
                          "M.Pharm",
                          "M.Sc",
                          "M.Tech",
                          "MA",
                          "MBA",
                          "MCA",
                          "MDS",
                          "MHM",
                          "MSW",
                          "LLM",
                          "MBBS",
                          "MD",
                          "MS",
                          "Ph.D",
                          "Diploma",
                          "Polytechnic",
                          "Trade School",
                          "Higher Secondary / Plus Two",
                          "SSLC / 10th",
                          "Other",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Employment Type"
                        name="partnerEmploymentType"
                        type="select"
                        searchable={true}
                        value={formData.partnerEmploymentType}
                        onChange={handleInputChange}
                        options={[
                          "Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Occupation"
                        name="partnerOccupation"
                        type="select"
                        searchable={true}
                        value={formData.partnerOccupation}
                        onChange={handleInputChange}
                        options={[
                          "Accountant",
                          "Actor",
                          "Administrative Professional",
                          "Advertising Professional",
                          "Agri-Business Professional",
                          "Air Hostess / Flight Attendant",
                          "Architect",
                          "Artist",
                          "Auditor",
                          "Banking Professional",
                          "Beautician",
                          "Biologist / Botanist",
                          "Business",
                          "Chartered Accountant",
                          "Civil Engineer",
                          "Clerical Official",
                          "Commercial Pilot",
                          "Company Secretary",
                          "Computer Professional",
                          "Consultant",
                          "Contractor",
                          "Cost Accountant",
                          "Creative Person",
                          "Customer Support Professional",
                          "Defense Employee",
                          "Dentist",
                          "Designer",
                          "Doctor",
                          "Economist",
                          "Engineer",
                          "Engineer (Mechanical)",
                          "Engineer (Project)",
                          "Entertainment Professional",
                          "Event Manager",
                          "Executive",
                          "Factory Worker",
                          "Farmer",
                          "Fashion Designer",
                          "Finance Professional",
                          "Flight Attendant",
                          "Government Employee",
                          "Graphic Designer",
                          "Health Care Professional",
                          "Hotel Management Professional",
                          "HR Professional",
                          "Human Resources Professional",
                          "Indian Administrative Services (IAS)",
                          "Indian Foreign Services (IFS)",
                          "Indian Police Services (IPS)",
                          "Interior Designer",
                          "Investment Professional",
                          "IT Professional",
                          "Journalist",
                          "Lawyer",
                          "Lecturer",
                          "Legal Professional",
                          "Manager",
                          "Marketing Professional",
                          "Media Professional",
                          "Medical Professional",
                          "Merchant Naval Officer",
                          "Microbiologist",
                          "Military",
                          "Model",
                          "Musician",
                          "Nurse",
                          "Nutritionist",
                          "Occupational Therapist",
                          "Optician",
                          "Pharmacist",
                          "Photographer",
                          "Physical Therapist",
                          "Physician",
                          "Pilot",
                          "Police",
                          "Politician",
                          "Professor",
                          "Psychologist",
                          "Public Relations Professional",
                          "Real Estate Professional",
                          "Researcher",
                          "Retired",
                          "Sales Professional",
                          "Scientist",
                          "Secretary",
                          "Security Professional",
                          "Self Employed",
                          "Social Worker",
                          "Software Consultant",
                          "Software Engineer",
                          "Sportsman",
                          "Student",
                          "Teacher",
                          "Technician",
                          "Training Professional",
                          "Transportation Professional",
                          "Veterinary Doctor",
                          "Volunteer",
                          "Writer",
                          "Zoologist",
                          "Not Working",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Annual Income"
                        name="partnerAnnualIncome"
                        value={formData.partnerAnnualIncome}
                        onChange={handleInputChange}
                        placeholder="e.g., 5-10 Lakhs"
                      />
                    </div>
                  </FormSection>

                  {/* Partner Preferences - Location */}
                  <FormSection title="Partner Preferences - Location">
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <FormInput
                        label="Partner Country"
                        name="partnerCountry"
                        value={formData.partnerCountry}
                        onChange={handleInputChange}
                        placeholder="Any"
                      />
                      <FormInput
                        label="Partner State"
                        name="partnerState"
                        value={formData.partnerState}
                        onChange={handleInputChange}
                        placeholder="Any"
                      />
                      <FormInput
                        label="Partner Residing District"
                        name="partnerDistrict"
                        value={formData.partnerDistrict}
                        onChange={handleInputChange}
                        placeholder="Any"
                      />
                    </div>
                  </FormSection>

                  {/* Submit Button */}
                  <div
                    style={{
                      background: "#fff",
                      padding: "20px 24px",
                      borderRadius: "8px",
                      marginTop: "24px",
                      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "12px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      disabled={isSubmitting}
                      style={{
                        padding: "12px 32px",
                        background: "#fff",
                        color: "#374151",
                        border: "2px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        padding: "12px 32px",
                        background: isSubmitting ? "#9ca3af" : "#667eea",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#5568d3";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#667eea";
                        }
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserProfileEditPage;
