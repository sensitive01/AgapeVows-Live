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
import { showAlert } from "../utils/alertService";
import { useParams, useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import SearchableSelect from "../components/SearchableSelect";
import MultiSearchSelect from "../components/MultiSearchSelect";
import { Country, State, City } from "country-state-city";
import { indianDistricts } from "../utils/indianDistricts";


const getDistrictsForState = (countryName, stateName, allCountries) => {
  if (!countryName || !stateName) return [];
  
  if (countryName === "India") {
    const indianState = indianDistricts.states.find(s => s.state.toLowerCase() === stateName.toLowerCase());
    if (indianState && indianState.districts) {
      return indianState.districts;
    }
  }
  
  const c = allCountries.find((country) => country.name === countryName);
  if (!c) return [];
  const states = State.getStatesOfCountry(c.isoCode);
  const s = states.find((state) => state.name === stateName);
  return s ? City.getCitiesOfState(c.isoCode, s.isoCode).map((city) => city.name) : [];
};

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


const FormSection = ({ title, subtitle, children, zIndex = 1 }) => (
  <div
    className="form-section"
    style={{
      position: "relative",
      padding: "clamp(20px, 4vw, 32px)",
      background: "rgba(255, 255, 255, 0.95)",
      borderRadius: "12px",
      marginBottom: "24px",
      boxShadow: "0 8px 32px rgba(0,0,0,0.05)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      zIndex: zIndex,
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
        marginBottom: subtitle ? "8px" : "32px",
        marginTop: "0",
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <div style={{ marginBottom: "24px" }}>
        {subtitle}
      </div>
    )}
    <div
      style={{ height: "1px", background: "#e5e7eb", margin: "0 0 32px 0" }}
    ></div>
    {children}
  </div>
);


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
  readOnly = false,
  helpText,
  isMulti = false,
  layout = "horizontal",
}) => (
  <div style={{ display: "flex", flexDirection: layout === "vertical" ? "column" : "row", alignItems: (layout === "vertical" || type === "textarea") ? "flex-start" : "center", gap: layout === "vertical" ? "4px" : "8px", marginBottom: "12px", width: "100%" }}>
    <label
      style={{
        fontSize: "14px",
        fontWeight: "600",
        color: "#374151",
        minWidth: layout === "vertical" ? "auto" : "130px",
        maxWidth: layout === "vertical" ? "none" : "130px",
        marginBottom: "0",
        marginTop: (type === "textarea" && layout !== "vertical") ? "10px" : "0",
        display: "block",
      }}
    >
      {label}
      {required && (
        <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>
      )}
    </label>
    <div style={{ flex: 1, width: "100%" }}>
    {type === "select" && searchable ? (
      <SearchableSelect
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={`Select ${label}`}
        disabled={readOnly}
        isMulti={isMulti}
      />
    ) : type === "select" ? (
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        disabled={readOnly}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: readOnly ? "#9ca3af" : "#374151",
          background: readOnly ? "#f3f4f6" : "#fff",
          cursor: readOnly ? "not-allowed" : "pointer",
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
    ) : type === "radio" ? (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "4px" }}>
        {options.map((option) => (
          <label key={option} style={{ display: "flex", alignItems: "center", gap: "6px", cursor: readOnly ? "not-allowed" : "pointer", fontSize: "14px", color: "#374151", fontWeight: "normal" }}>
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              disabled={readOnly}
              style={{ cursor: readOnly ? "not-allowed" : "pointer", width: "16px", height: "16px", accentColor: "#7c3aed" }}
            />
            {option}
          </label>
        ))}
      </div>
    ) : type === "textarea" ? (
      <textarea
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={4}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: readOnly ? "#9ca3af" : "#374151",
          background: readOnly ? "#f3f4f6" : "#fff",
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
        readOnly={readOnly}
        style={{
          width: "100%",
          padding: "10px 14px",
          border: "2px solid #e5e7eb",
          borderRadius: "6px",
          fontSize: "14px",
          color: readOnly ? "#9ca3af" : "#374151",
          background: readOnly ? "#f3f4f6" : "#fff",
          cursor: readOnly ? "not-allowed" : "text",
          transition: "border-color 0.2s ease",
        }}
      />
    )}
    {helpText && (
      <p style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
        {helpText}
      </p>
    )}
    </div>
  </div>
);

const InlineFormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options,
  required,
  placeholder,
  searchable = false,
  readOnly = false,
  autoComplete,
}) => (
  <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
    <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", margin: 0, minWidth: "130px", maxWidth: "130px", display: "block" }}>
      {label}
      {required && <span style={{ color: "#ef4444", marginLeft: "4px" }}>*</span>}
    </label>
    <div style={{ flex: 1, width: "100%" }}>
      {type === "select" && searchable ? (
        <SearchableSelect
          name={name}
          value={value}
          onChange={onChange}
          options={options}
          placeholder={`Select ${label}`}
          disabled={readOnly}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          disabled={readOnly}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "14px",
            color: readOnly ? "#9ca3af" : "#374151",
            background: readOnly ? "#f3f4f6" : "#fff",
            cursor: readOnly ? "not-allowed" : "pointer",
            transition: "border-color 0.2s ease",
          }}
        >
          <option value="" disabled>Select {label}</option>
          {options?.map((opt, i) => (
            <option key={i} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          readOnly={readOnly}
          autoComplete={autoComplete}
          style={{
            width: "100%",
            padding: "10px 14px",
            border: "2px solid #e5e7eb",
            borderRadius: "6px",
            fontSize: "14px",
            color: readOnly ? "#9ca3af" : "#374151",
            background: readOnly ? "#f3f4f6" : "#fff",
            cursor: readOnly ? "not-allowed" : "text",
            transition: "border-color 0.2s ease",
          }}
        />
      )}
    </div>
  </div>
);

const CheckboxGroup = ({ label, name, options, selectedValues, onChange }) => {
  const handleCheckboxChange = (option) => {
    const exclusiveOptions = ["Any", "Doesn't Matter", "Don't wish to specify", "None"];
    let updatedValues;

    if (exclusiveOptions.includes(option)) {
      if (selectedValues.includes(option)) {
        updatedValues = [];
      } else {
        updatedValues = [option];
      }
    } else {
      const filteredValues = selectedValues.filter(v => !exclusiveOptions.includes(v));
      if (filteredValues.includes(option)) {
        updatedValues = filteredValues.filter(v => v !== option);
      } else {
        updatedValues = [...filteredValues, option];
      }
    }

    onChange({
      target: {
        name: name,
        value: updatedValues,
      },
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", gap: "8px", marginBottom: "12px", gridColumn: "1 / -1" }}>
      <label
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          minWidth: "130px",
          maxWidth: "130px",
          marginTop: "8px",
          display: "block",
        }}
      >
        {label}
      </label>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          maxHeight: "240px",
          overflowY: "auto",
          paddingRight: "8px",
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


const UserProfileEditPage = () => {
  const { userId: rawUserId } = useParams();
  const userId = (rawUserId && typeof rawUserId === "string" && rawUserId.length > 24)
    ? rawUserId.substring(0, 24)
    : rawUserId;
  const navigate = useNavigate();

  const [isGenderReadOnly, setIsGenderReadOnly] = useState(false);
  const [isDobReadOnly, setIsDobReadOnly] = useState(false);

  const selectStyle = {
    flex: 1,
    minWidth: "140px",
    padding: "10px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#374151",
    background: "#fff",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const [formData, setFormData] = useState({
    aboutMe: "",
    gender: "",
    profileCreatedFor: "",
    name: "",
    contactEmail: "",
    contactPhone: "",
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

    fathersName: "",
    mothersName: "",
    fathersOccupation: "",
    fathersProfession: "",
    mothersOccupation: "",
    mothersProfession: "",
    fathersNative: "",
    mothersNative: "",
    familyValue: "",
    familyType: "",
    familyStatus: "",
    residenceType: "",
    numberOfBrothers: "",
    marriedBrothers: "",
    numberOfSisters: "",
    marriedSisters: "",

    denomination: "",
    church: "",
    churchActivity: "",
    pastorsName: "",
    spirituality: "",
    religiousDetail: "",

    alternateMobile: "",
    landlineNumber: "",
    currentAddress: "",
    currentDoorNo: "",
    currentLocality: "",
    currentCountry: "",
    currentState: "",
    currentDistrict: "",
    currentPincode: "",

    permanentAddress: "",
    sameAsCurrentAddress: false,
    permanentDoorNo: "",
    permanentLocality: "",
    permanentCountry: "",
    permanentState: "",
    permanentDistrict: "",
    permanentPincode: "",
    
    contactPersonName: "",
    relationship: "",
    citizenOf: "",
    city: "",
    state: "",
    pincode: "",

    education: "",
    additionalEducation: "",
    college: "",
    educationDetail: "",
    employmentType: "",
    occupation: "",
    position: "",
    companyName: "",
    annualIncome: "",

    exercise: "",
    hobbies: [],
    interests: "",
    music: "",
    favouriteReads: "",
    favouriteCuisines: "",
    sportsActivities: "",
    dressStyles: "",

    whatsapp: "",
    facebook: "",
    instagram: "",
    x: "",
    youtube: "",
    linkedin: "",

    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerHeight: "",
    partnerHeightTo: "",
    partnerMaritalStatus: [],
    partnerMotherTongue: [],
    partnerCaste: [],
    partnerPhysicalStatus: [],
    partnerEatingHabits: [],
    partnerDrinkingHabits: [],
    partnerSmokingHabits: [],
    partnerDenomination: [],
    partnerSpirituality: [],

    partnerEducation: [],
    partnerEmploymentType: [],
    partnerOccupation: [],
    partnerAnnualIncomeFrom: "",
    partnerAnnualIncomeTo: "",

    partnerCountry: [],
    partnerState: [],
    partnerDistrict: [],

    profileVisibility: "Public",
  });

  const [isFatherOther, setIsFatherOther] = useState(false);
  const [isMotherOther, setIsMotherOther] = useState(false);

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


  const [idProofFile, setIdProofFile] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [idVerificationStatus, setIdVerificationStatus] = useState("Pending");
  const [idProofDocument, setIdProofDocument] = useState("");
  const [isUploadingId, setIsUploadingId] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ageOptions = Array.from({ length: 53 }, (_, i) => (i + 18).toString());

  const heightOptions = [
    "4ft", "4ft 1in", "4ft 2in", "4ft 3in", "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in",
    "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in",
    "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in",
    "7ft", "7ft 1in", "7ft 2in", "7ft 3in", "7ft 4in", "7ft 5in", "7ft 6in", "7ft 7in", "7ft 8in", "7ft 9in", "7ft 10in", "7ft 11in", "8ft",
  ];

  const hobbiesOptions = [
    "Reading", "Sports", "Music", "Traveling", "Cooking", "Photography", 
    "Dancing", "Gaming", "Painting", "Writing", "Gardening", "Yoga",
  ];

  const parentOccupationOptions = [
    "Retired", "Business", "Government Employee", "Private Employee", 
    "Professional", "Farmer", "Homemaker", "Others",
  ];

  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const allCountries = Country.getAllCountries();
  const countryOptions = allCountries.map((country) => country.name);

  const stateOptions = selectedCountryCode
    ? State.getStatesOfCountry(selectedCountryCode).map((state) => state.name)
    : [];

  const currentStateOptions = formData.currentCountry
    ? (() => {
        const c = allCountries.find((country) => country.name === formData.currentCountry);
        return c ? State.getStatesOfCountry(c.isoCode).map((s) => s.name) : [];
      })()
    : [];

  const permanentStateOptions = formData.permanentCountry
    ? (() => {
        const c = allCountries.find((country) => country.name === formData.permanentCountry);
        return c ? State.getStatesOfCountry(c.isoCode).map((s) => s.name) : [];
      })()
    : [];

  const currentDistrictOptions = getDistrictsForState(formData.currentCountry, formData.currentState, allCountries);

  const permanentDistrictOptions = getDistrictsForState(formData.permanentCountry, formData.permanentState, allCountries);

  const cityOptions =
    selectedCountryCode && selectedStateCode
      ? City.getCitiesOfState(selectedCountryCode, selectedStateCode).map(
        (city) => city.name,
      )
      : [];

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

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    const states = State.getStatesOfCountry(selectedCountryCode) || [];
    const state = states.find((s) => s.name === stateName);
    setSelectedStateCode(state ? state.isoCode : "");
    setFormData((prev) => ({
      ...prev,
      state: stateName,
      city: "",
    }));
    setHasUnsavedChanges(true);
  };

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

    let foundCountryCode = "";
    let foundStateCode = "";
    let foundCountryName = "";
    let foundStateName = "";
    let cityFound = false;

    for (const country of allCountries) {
      if (cityFound) break;
      const states = State.getStatesOfCountry(country.isoCode) || [];

      for (const state of states) {
        if (cityFound) break;
        const cities = City.getCitiesOfState(country.isoCode, state.isoCode) || [];
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

    setFormData((prev) => ({
      ...prev,
      city: cityName,
      state: foundStateName || prev.state,
      citizenOf: foundCountryName || prev.citizenOf,
    }));

    if (foundCountryCode) {
      setSelectedCountryCode(foundCountryCode);
    }
    if (foundStateCode) {
      setSelectedStateCode(foundStateCode);
    }

    setHasUnsavedChanges(true);
  };

  const handlePartnerCountryChange = (e) => {
    const countries = e.target.value;
    setFormData((prev) => ({
      ...prev,
      partnerCountry: countries,
      partnerState: [],
      partnerDistrict: [],
    }));
    setHasUnsavedChanges(true);
  };

  const handlePartnerStateChange = (e) => {
    const states = e.target.value;
    setFormData((prev) => ({
      ...prev,
      partnerState: states,
      partnerDistrict: [],
    }));
    setHasUnsavedChanges(true);
  };

  const handlePartnerDistrictChange = (e) => {
    const districts = e.target.value;
    setFormData((prev) => ({
      ...prev,
      partnerDistrict: districts,
    }));
    setHasUnsavedChanges(true);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfo(userId);

        if (response.status === 200) {
          const userData = response.data.data;

          const parseAddress = (addrStr) => {
            if (!addrStr) return {};
            const parts = addrStr.split('|||');
            if (parts.length >= 6) {
              return {
                 doorNo: parts[0] || "",
                 locality: parts[1] || "",
                 country: parts[2] || "",
                 state: parts[3] || "",
                 district: parts[4] || "",
                 pincode: parts[5] || ""
              };
            }
            return { doorNo: addrStr }; // Legacy fallback
          };
          const parsedCurrent = parseAddress(userData.currentAddress);
          const parsedPermanent = parseAddress(userData.permanentAddress);

          const loadedData = {
            aboutMe: userData.aboutMe || "",
            gender: userData.gender || "",
            profileCreatedFor: userData.profileCreatedFor || "",
            name: userData.userName || "",
            contactEmail: userData.contactEmail || "",
            contactPhone: userData.contactPhone || "",
            dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : "",
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
            mothersProfession: userData.mothersProfession || "",
            fathersNative: userData.fathersNative || "",
            mothersNative: userData.mothersNative || "",
            familyValue: userData.familyValue || "",
            familyType: userData.familyType || "",
            familyStatus: userData.familyStatus || "",
            residenceType: userData.residenceType || "",
            numberOfBrothers: userData.numberOfBrothers || "",
            marriedBrothers: userData.marriedBrothers || "",
            numberOfSisters: userData.numberOfSisters || "",
            marriedSisters: userData.marriedSisters || "",
            denomination: userData.denomination || "",
            church: userData.church || "",
            churchActivity: userData.churchActivity || "",
            pastorsName: userData.pastorsName || "",
            spirituality: userData.spirituality || "",
            religiousDetail: userData.religiousDetail || "",
            alternateMobile: userData.alternateMobile || "",
            landlineNumber: userData.landlineNumber || "",
            currentAddress: userData.currentAddress || "",
            currentDoorNo: parsedCurrent.doorNo || "",
            currentLocality: parsedCurrent.locality || "",
            currentCountry: parsedCurrent.country || "",
            currentState: parsedCurrent.state || "",
            currentDistrict: parsedCurrent.district || "",
            currentPincode: parsedCurrent.pincode || "",
            permanentAddress: userData.permanentAddress || "",
            sameAsCurrentAddress: false,
            permanentDoorNo: parsedPermanent.doorNo || "",
            permanentLocality: parsedPermanent.locality || "",
            permanentCountry: parsedPermanent.country || "",
            permanentState: parsedPermanent.state || "",
            permanentDistrict: parsedPermanent.district || "",
            permanentPincode: parsedPermanent.pincode || "",
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
            partnerHeightTo: userData.partnerHeightTo || "",
            partnerMaritalStatus: Array.isArray(userData.partnerMaritalStatus) ? userData.partnerMaritalStatus : userData.partnerMaritalStatus ? [userData.partnerMaritalStatus] : [],
            partnerMotherTongue: Array.isArray(userData.partnerMotherTongue) ? userData.partnerMotherTongue : userData.partnerMotherTongue ? [userData.partnerMotherTongue] : [],
            partnerCaste: Array.isArray(userData.partnerCaste) ? userData.partnerCaste : userData.partnerCaste ? [userData.partnerCaste] : [],
            partnerPhysicalStatus: Array.isArray(userData.partnerPhysicalStatus) ? userData.partnerPhysicalStatus : userData.partnerPhysicalStatus ? [userData.partnerPhysicalStatus] : [],
            partnerEatingHabits: Array.isArray(userData.partnerEatingHabits) ? userData.partnerEatingHabits : userData.partnerEatingHabits ? [userData.partnerEatingHabits] : [],
            partnerDrinkingHabits: Array.isArray(userData.partnerDrinkingHabits) ? userData.partnerDrinkingHabits : userData.partnerDrinkingHabits ? [userData.partnerDrinkingHabits] : [],
            partnerSmokingHabits: Array.isArray(userData.partnerSmokingHabits) ? userData.partnerSmokingHabits : userData.partnerSmokingHabits ? [userData.partnerSmokingHabits] : [],
            partnerDenomination: Array.isArray(userData.partnerDenomination) ? userData.partnerDenomination : userData.partnerDenomination ? [userData.partnerDenomination] : [],
            partnerSpirituality: Array.isArray(userData.partnerSpirituality) ? userData.partnerSpirituality : userData.partnerSpirituality ? [userData.partnerSpirituality] : [],
            partnerEducation: Array.isArray(userData.partnerEducation) ? userData.partnerEducation : userData.partnerEducation ? [userData.partnerEducation] : [],
            partnerEmploymentType: Array.isArray(userData.partnerEmploymentType) ? userData.partnerEmploymentType : userData.partnerEmploymentType ? [userData.partnerEmploymentType] : [],
            partnerOccupation: Array.isArray(userData.partnerOccupation) ? userData.partnerOccupation : userData.partnerOccupation ? [userData.partnerOccupation] : [],
            partnerAnnualIncomeFrom: userData.partnerAnnualIncomeFrom || "",
            partnerAnnualIncomeTo: userData.partnerAnnualIncomeTo || "",
            partnerCountry: Array.isArray(userData.partnerCountry) ? userData.partnerCountry : userData.partnerCountry ? [userData.partnerCountry] : [],
            partnerState: Array.isArray(userData.partnerState) ? userData.partnerState : userData.partnerState ? [userData.partnerState] : [],
            partnerDistrict: Array.isArray(userData.partnerDistrict) ? userData.partnerDistrict : userData.partnerDistrict ? [userData.partnerDistrict] : [],
            profileVisibility: userData.profileVisibility || "Public",
          };

          setFormData(loadedData);

          // Check if occupations are "Others"
          if (loadedData.fathersOccupation && !parentOccupationOptions.includes(loadedData.fathersOccupation)) {
            setIsFatherOther(true);
          }
          if (loadedData.mothersOccupation && !parentOccupationOptions.includes(loadedData.mothersOccupation)) {
            setIsMotherOther(true);
          }

          if (userData.gender) {
            setIsGenderReadOnly(true);
          }
          if (userData.dateOfBirth) {
            setIsDobReadOnly(true);
          }

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



          if (userData.idVerificationStatus) {
            setIdVerificationStatus(userData.idVerificationStatus);
          }
          if (userData.idProofDocument) {
            setIdProofDocument(userData.idProofDocument);
            setIdProofPreview(userData.idProofDocument);
          }
        }
      } catch (err) {
        console.error("Error loading user info:", err);
        showAlert({ text: "Error loading user data. Please try again.", icon: "error" });
      } finally {
        setIsLoading(false);
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
          const states = State.getStatesOfCountry(country.isoCode) || [];
          const state = states.find((s) => s.name === formData.state);
          if (state) {
            setSelectedStateCode(state.isoCode);
          }
        }
      }
    }
  }, [formData.citizenOf, formData.state, allCountries]);

  const handleSameAsCurrentChange = (e) => {
    const isChecked = e.target.checked;
    setHasUnsavedChanges(true);
    if (isChecked) {
      setFormData((prev) => ({
        ...prev,
        sameAsCurrentAddress: true,
        permanentDoorNo: prev.currentDoorNo,
        permanentLocality: prev.currentLocality,
        permanentCountry: prev.currentCountry,
        permanentState: prev.currentState,
        permanentDistrict: prev.currentDistrict,
        permanentPincode: prev.currentPincode,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        sameAsCurrentAddress: false,
      }));
    }
  };

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
            setDeletedAdditionalImages([]);
          }
        } catch (deleteError) {
          console.error("Error deleting images from Cloudinary:", deleteError);
          showAlert({ text: "Error deleting some images. Continuing with profile update...", icon: "warning" });
        }
      }

      // ========================
      // Step 2: Build FormData
      // ========================
      const submitFormData = new FormData();

      // Serialize Address fields
      const submitCurrentAddress = `${formData.currentDoorNo || ""}|||${formData.currentLocality || ""}|||${formData.currentCountry || ""}|||${formData.currentState || ""}|||${formData.currentDistrict || ""}|||${formData.currentPincode || ""}`;
      const submitPermanentAddress = formData.sameAsCurrentAddress 
        ? submitCurrentAddress 
        : `${formData.permanentDoorNo || ""}|||${formData.permanentLocality || ""}|||${formData.permanentCountry || ""}|||${formData.permanentState || ""}|||${formData.permanentDistrict || ""}|||${formData.permanentPincode || ""}`;
        
      const modifiedFormData = { ...formData };
      modifiedFormData.currentAddress = submitCurrentAddress;
      modifiedFormData.permanentAddress = submitPermanentAddress;

      // Append all form fields
      Object.keys(modifiedFormData).forEach((key) => {
        if (key === "hobbies") {
          if (Array.isArray(modifiedFormData[key]) && modifiedFormData[key].length > 0) {
            modifiedFormData[key].forEach((hobby, index) => {
              submitFormData.append(`hobbies[${index}]`, hobby);
            });
          } else {
            submitFormData.append("hobbies", "");
          }
        } else {
          submitFormData.append(key, modifiedFormData[key] || "");
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
      // Step 6: Send FormData to backend
      // ========================
      const response = await savePersonalInfo(submitFormData, userId);

      if (response.status === 200 || response.data?.success) {
        showAlert({ text: "Profile updated successfully!", icon: "success" });

        // Clear video file state and update preview

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
        showAlert({ text: errorMessage, icon: "error" });
        console.error("Update failed:", response);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error updating profile. Please try again.";
      showAlert({ text: errorMessage, icon: "error" });
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

      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 200) {
        showAlert({ text: "ID Proof uploaded successfully (via test route). It is now pending admin approval.", icon: "success" });
        setIdVerificationStatus("Uploaded");
        setIdProofFile(null);
      }
    } catch (error) {
      console.error("Error uploading ID proof (test route):", error);
      showAlert({ text: "Error uploading ID proof. Please try again.", icon: "error" });
    } finally {
      setIsUploadingId(false);
    }
  };


  return (
    <div style={{ 
      minHeight: "100vh", 
      backgroundImage: "url('/images/bg-profile.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      backgroundColor: "#f5f5f5"
    }}>
      <style>{`
        body { 
          background-image: url('/images/bg-profile.png') !important;
          background-size: cover !important;
          background-position: center !important;
          background-attachment: fixed !important;
          background-color: #f5f5f5 !important; 
        }
        .container-fluid { background: transparent !important; }
        .form-section:focus-within {
          z-index: 100 !important;
        }
      `}</style>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "170px", paddingBottom: "40px" }}>
        <div style={{ background: "transparent", minHeight: "100vh" }}>
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
                style={{ paddingLeft: "20px", paddingRight: "20px" }}
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

                  <FormSection title="Government ID Verification" zIndex={22}>
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


                  {/* Basic Details Section */}
                  <FormSection 
                    title="Basic Details" 
                    zIndex={20}
                    subtitle={
                      <p style={{ color: "purple", fontWeight: "bold", margin: 0 }}>
                        Please ensure your Name and Date of Birth matches with your ID Proof (Aadhaar or Passport) for verification
                      </p>
                    }
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
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
                        options={["Male", "Female"]}
                        readOnly={isGenderReadOnly}
                        helpText={isGenderReadOnly ? "To change gender, please contact Customer Support." : ""}
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
                        readOnly={isDobReadOnly}
                        helpText={isDobReadOnly ? "To change DOB, please contact Customer Support." : ""}
                      />
                      <FormInput
                        label="Age"
                        name="age"
                        type="select"
                        searchable={true}
                        value={formData.age}
                        onChange={handleInputChange}
                        options={ageOptions}
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
                        type="select"
                        searchable={true}
                        value={formData.weight}
                        onChange={handleInputChange}
                        options={Array.from({ length: 101 }, (_, i) => String(i + 40))}
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
                          "Achari",
                          "Adhi Karnataka",
                          "Adhi Dravidar",
                          "Agamudaiyar",
                          "Agarwal",
                          "Anglo Indian",
                          "Arora",
                          "Arunthathiyar",
                          "Arya Vysya",
                          "Ayyaraka",
                          "Badaga",
                          "Bajantri",
                          "Balija",
                          "Bc",
                          "Besta",
                          "Bharathar",
                          "Bhatraju",
                          "Bhovi",
                          "Billava",
                          "Boyar",
                          "Brahmin Bhatta",
                          "Brahmin Daivadnya",
                          "Brahmin Deshastha",
                          "Brahmin Dhiman",
                          "Brahmin Garhwali",
                          "Brahmin Gurukkal",
                          "Brahmin Iyengar",
                          "Brahmin Niyogi",
                          "Brahmin Others",
                          "Caste No Bar",
                          "Cheraman",
                          "Chettiar",
                          "Devanga",
                          "Devendra Kula Vellalar",
                          "Ediga",
                          "Ezhava",
                          "Fernando",
                          "Garo",
                          "Gavara",
                          "Gowda",
                          "Gounder",
                          "Gramani",
                          "Intercaste",
                          "Jagamar",
                          "Kallar",
                          "Kamalar",
                          "Kamma",
                          "Kammalar",
                          "Kapu",
                          "Karuneegar",
                          "Khasi",
                          "Knanaya",
                          "Kongu Vellala Gounder",
                          "Kuki",
                          "Kulal",
                          "Kulalar",
                          "Kuravan",
                          "Lal",
                          "Linga Yath",
                          "Madiga",
                          "Mahar",
                          "Mahendra",
                          "Mala",
                          "Mannadiyar",
                          "Maravar",
                          "Maruthuvar",
                          "Matang",
                          "Meenavar",
                          "Mizo",
                          "Moogaveera",
                          "Moopanar",
                          "Mudaliar",
                          "Mukkuvar",
                          "Muslim Ansari",
                          "Muslim Bohra",
                          "Muthuraja",
                          "NAA",
                          "Nadar",
                          "Naga",
                          "Naicker",
                          "Naidu",
                          "Nair",
                          "Navithar",
                          "OBC",
                          "OC",
                          "Oraon",
                          "Padaiyachi",
                          "Padmasali",
                          "Pallar",
                          "Pandaram",
                          "Parkava",
                          "Paravar",
                          "Parayar",
                          "Parkava Kulam",
                          "Penwj",
                          "Perika",
                          "Pillai",
                          "Pillaimar",
                          "Pulayar",
                          "Rajaka",
                          "Rajput",
                          "Reddy",
                          "Sakkiliar",
                          "Sambavar",
                          "SC",
                          "Sennai Thalaivar",
                          "Senguntha Mudaliar",
                          "Settibalija",
                          "Sourashtra",
                          "Sozhiya Vellalar",
                          "ST",
                          "Telega",
                          "Thevar",
                          "Thuluva Vellalar",
                          "Udayar",
                          "Urali Gounder",
                          "Vaishnava",
                          "Valluvan",
                          "Vaniya Chettiar",
                          "Vannar",
                          "Vathiriyar",
                          "Veera Saivam",
                          "Velama",
                          "Vellalar",
                          "Vettuva Gounder",
                          "Vishwakarma",
                          "Vokkalinga",
                          "Yadhav",
                          "Yadhava",
                          "Yogeeswarar",
                          "Other",
                        ]}
                      />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Marital Status"
                          name="maritalStatus"
                          type="radio"
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
                      </div>
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
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Eating Habits"
                          name="eatingHabits"
                          type="radio"
                          value={formData.eatingHabits}
                          onChange={handleInputChange}
                          options={["Vegetarian", "Non-Vegetarian", "Eggetarian"]}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Drinking Habits"
                          name="drinkingHabits"
                          type="radio"
                          value={formData.drinkingHabits}
                          onChange={handleInputChange}
                          options={[
                            "Never Drinks",
                            "Drinks Socially",
                            "Drinks Regularly",
                          ]}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Smoking Habits"
                          name="smokingHabits"
                          type="radio"
                          value={formData.smokingHabits}
                          onChange={handleInputChange}
                          options={[
                            "Never Smokes",
                            "Smokes Occasionally",
                            "Smokes Regularly",
                          ]}
                        />
                      </div>
                    </div>
                  </FormSection>

                  {/* Family Details Section */}
                  <FormSection title="Family Details" zIndex={19}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
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
                      {!isFatherOther && (parentOccupationOptions.includes(formData.fathersOccupation) || !formData.fathersOccupation) ? (
                        <FormInput
                          label="Father's Occupation"
                          name="fathersOccupation"
                          type="select"
                          value={formData.fathersOccupation}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsFatherOther(true);
                              setFormData(prev => ({ ...prev, fathersOccupation: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={parentOccupationOptions}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Father's Occupation"
                            name="fathersOccupation"
                            value={formData.fathersOccupation}
                            onChange={handleInputChange}
                            placeholder="Enter father's occupation"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsFatherOther(false);
                              setFormData(prev => ({ ...prev, fathersOccupation: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "38px",
                              background: "#f3f4f6",
                              border: "none",
                              borderRadius: "4px",
                              width: "24px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              color: "#6b7280",
                              zIndex: 5
                            }}
                            title="Back to list"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}

                      {!isMotherOther && (parentOccupationOptions.includes(formData.mothersOccupation) || !formData.mothersOccupation) ? (
                        <FormInput
                          label="Mother's Occupation"
                          name="mothersOccupation"
                          type="select"
                          value={formData.mothersOccupation}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsMotherOther(true);
                              setFormData(prev => ({ ...prev, mothersOccupation: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={parentOccupationOptions}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Mother's Occupation"
                            name="mothersOccupation"
                            value={formData.mothersOccupation}
                            onChange={handleInputChange}
                            placeholder="Enter mother's occupation"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsMotherOther(false);
                              setFormData(prev => ({ ...prev, mothersOccupation: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "38px",
                              background: "#f3f4f6",
                              border: "none",
                              borderRadius: "4px",
                              width: "24px",
                              height: "24px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              color: "#6b7280",
                              zIndex: 5
                            }}
                            title="Back to list"
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}

                      <FormInput
                        label="Father's Profession"
                        name="fathersProfession"
                        value={formData.fathersProfession}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Mother's Profession"
                        name="mothersProfession"
                        value={formData.mothersProfession}
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
                      <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "16px" }}>
                        <FormInput
                          label="No. of Brothers"
                          name="numberOfBrothers"
                          type="select"
                          value={formData.numberOfBrothers}
                          onChange={handleInputChange}
                          options={["0", "1", "2", "3", "4", "5+"]}
                          layout="vertical"
                        />
                        <FormInput
                          label="Brothers Married"
                          name="marriedBrothers"
                          type="select"
                          value={formData.marriedBrothers}
                          onChange={handleInputChange}
                          options={["0", "1", "2", "3", "4", "5+"]}
                          layout="vertical"
                        />
                        <FormInput
                          label="No. of Sisters"
                          name="numberOfSisters"
                          type="select"
                          value={formData.numberOfSisters}
                          onChange={handleInputChange}
                          options={["0", "1", "2", "3", "4", "5+"]}
                          layout="vertical"
                        />
                        <FormInput
                          label="Sisters Married"
                          name="marriedSisters"
                          type="select"
                          value={formData.marriedSisters}
                          onChange={handleInputChange}
                          options={["0", "1", "2", "3", "4", "5+"]}
                          layout="vertical"
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Family Value"
                          name="familyValue"
                          type="radio"
                          value={formData.familyValue}
                          onChange={handleInputChange}
                          options={[
                            "Orthodox",
                            "Traditional",
                            "Moderate",
                            "Liberal",
                          ]}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Family Type"
                          name="familyType"
                          type="radio"
                          value={formData.familyType}
                          onChange={handleInputChange}
                          options={["Joint Family", "Nuclear Family", "others"]}
                        /> 
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Family Status"
                          name="familyStatus"
                          type="radio"
                          value={formData.familyStatus}
                          onChange={handleInputChange}
                          options={[
                            "Lower Middle Class",
                            "Middle Class",
                            "Upper Middle Class",
                            "Rich",
                            "Affluent"
                          ]}
                        />
                      </div>
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Residence Type"
                          name="residenceType"
                          type="radio"
                          value={formData.residenceType}
                          onChange={handleInputChange}
                          options={["Own House", "Rented House", "Company Lease"]}
                        />
                      </div>
                    </div>
                  </FormSection>

                  {/* Religious Information Section */}
                  <FormSection title="Religious Information" zIndex={18}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
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
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Spirituality"
                          name="spirituality"
                          type="radio"
                          value={formData.spirituality}
                          onChange={handleInputChange}
                          options={[
                            "Very Religious",
                            "Religious",
                            "Moderately Religious",
                            "Not Religious",
                          ]}
                        />
                      </div>
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
                  <FormSection title="Contact Information" zIndex={17}>
                    <div style={{ marginBottom: "30px", marginTop: "10px" }}>
                      <p style={{ fontWeight: "700", color: "#6a1b9a", fontSize: "1.2rem", marginBottom: "16px" }}>
                        Prefer communication through a family member or a trusted representative?
                      </p>
                      <ul style={{ paddingLeft: "20px", margin: "0", fontSize: "1.05rem", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "10px", fontWeight: "500" }}>
                        <li style={{ color: "#6a1b9a" }}>To help protect your privacy and avoid unwanted spam or fraudulent calls, AgapeVows recommends providing an alternate contact number for communication with interested matches. This number should be different from the primary phone number used to create your profile (if the profile was created by the Bride or Groom).</li>
                        <li style={{ color: "#6a1b9a" }}>You may share the contact details of a parent, family member, guardian, or trusted representative who can communicate on your behalf. Only users who express interest in connecting with you will be able to view these details.</li>
                        <li style={{ color: "#6a1b9a" }}>If you prefer to communicate directly with interested matches, you may enter your own phone number in the Alternate Mobile Number field.</li>
                      </ul>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
                      }}
                    >

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
                          "Self",
                          "Father",
                          "Mother",
                          "Brother",
                          "Sister",
                          "Uncle",
                          "Aunt",
                          "Pastor",
                          "Relative",
                          "Friend",
                          "Other",
                        ]}
                      />


                      <FormInput
                        label="Contact Email"
                        name="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Alternate Mobile Number"
                        name="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                      <FormInput
                        label="Landline Number"
                        name="landlineNumber"
                        value={formData.landlineNumber}
                        onChange={handleInputChange}
                      />
                      {/* Current Address Block */}
                      <div style={{ gridColumn: "1 / -1", marginTop: "16px", marginBottom: "0px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                          Current Address: <span style={{ fontSize: "13px", fontWeight: "normal", color: "#6b7280" }}>(Enter current location, if you are working away from home)</span>
                        </h4>
                      </div>

                      <InlineFormInput label="Door / Flat No (Name), Street" name="currentDoorNo" value={formData.currentDoorNo} onChange={handleInputChange} autoComplete="new-password" />
                      <InlineFormInput label="Locality / Area" name="currentLocality" value={formData.currentLocality} onChange={handleInputChange} autoComplete="new-password" />
                      <InlineFormInput label="Country" name="currentCountry" type="select" searchable={true} options={countryOptions} value={formData.currentCountry} onChange={handleInputChange} />
                      <InlineFormInput label="State" name="currentState" type="select" searchable={true} options={currentStateOptions} value={formData.currentState} onChange={handleInputChange} />
                      <InlineFormInput label="District" name="currentDistrict" type="select" searchable={true} options={currentDistrictOptions} value={formData.currentDistrict} onChange={handleInputChange} />
                      <InlineFormInput label="Pincode" name="currentPincode" value={formData.currentPincode} onChange={handleInputChange} />
                      <InlineFormInput label="Citizen Of" name="citizenOf" type="select" searchable={true} options={countryOptions} value={formData.citizenOf} onChange={handleCountryChange} />

                      {/* Permanent Address Block */}
                      <div style={{ gridColumn: "1 / -1", marginTop: "24px", marginBottom: "0px", borderBottom: "1px solid #e5e7eb", paddingBottom: "4px", display: "flex", justifyContent: "flex-start", gap: "24px", alignItems: "center" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "700", color: "#1f2937", margin: 0 }}>
                          Permanent Address
                        </h4>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#374151", cursor: "pointer", fontWeight: "600" }}>
                          <input type="checkbox" checked={formData.sameAsCurrentAddress} onChange={handleSameAsCurrentChange} style={{ width: "16px", height: "16px", cursor: "pointer" }} />
                          Same as current address
                        </label>
                      </div>

                      <InlineFormInput label="Door / Flat No (Name), Street" name="permanentDoorNo" value={formData.permanentDoorNo} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} autoComplete="new-password" />
                      <InlineFormInput label="Locality / Area" name="permanentLocality" value={formData.permanentLocality} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} autoComplete="new-password" />
                      <InlineFormInput label="Country" name="permanentCountry" type="select" searchable={true} options={countryOptions} value={formData.permanentCountry} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} />
                      <InlineFormInput label="State" name="permanentState" type="select" searchable={true} options={permanentStateOptions} value={formData.permanentState} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} />
                      <InlineFormInput label="District" name="permanentDistrict" type="select" searchable={true} options={permanentDistrictOptions} value={formData.permanentDistrict} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} />
                      <InlineFormInput label="Pincode" name="permanentPincode" value={formData.permanentPincode} onChange={handleInputChange} readOnly={formData.sameAsCurrentAddress} />
                    </div>
                  </FormSection>

                  {/* Professional Information Section */}
                  <FormSection title="Professional Information" zIndex={16}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
                      }}
                    >
                      <FormInput
                        label="Highest Education"
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
                          "Any",
                              "0 - 50 Thousand",
                              "50 Thousand - 1 Lakh",
                              "1 Lakh - 2 Lakhs",
                              "2 Lakhs - 3 Lakhs",
                              "3 Lakhs - 4 Lakhs",
                              "4 Lakhs - 5 Lakhs",
                              "5 Lakhs - 7 Lakhs",
                              "7 Lakhs - 8 Lakhs",
                              "8 Lakhs - 9 Lakhs",
                              "9 Lakhs - 10 Lakhs",
                              "10 Lakhs - 12 Lakhs",
                              "12 Lakhs - 14 Lakhs",
                              "14 Lakhs - 16 Lakhs",
                              "16 Lakhs - 18 Lakhs",
                              "18 Lakhs - 20 Lakhs",
                              "20 Lakhs - 25 Lakhs",
                              "25 Lakhs - 30 Lakhs",
                              "30 Lakhs - 35 Lakhs",
                              "35 Lakhs - 40 Lakhs",
                              "40 Lakhs - 45 Lakhs",
                              "45 Lakhs - 50 Lakhs",
                              "50 Lakhs - 60 Lakhs",
                              "60 Lakhs - 70 Lakhs",
                              "70 Lakhs - 80 Lakhs",
                              "80 Lakhs - 90 Lakhs",
                              "90 Lakhs - 1 Crore",
                              "1 Crore - 2 Crore",
                              "Above 2 Crore",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Lifestyle Section with Checkboxes */}
                  <FormSection title="Lifestyle" zIndex={15}>
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
                          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                          columnGap: "120px",
                          rowGap: "24px",
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

                  {/* Partner Preferences */}
                  <FormSection title="Partner Preference" zIndex={14}>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "24px",
                        marginBottom: "24px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "20px",
                          borderBottom: "1px solid #f3f4f6",
                          paddingBottom: "10px",
                        }}
                      >
                        <span style={{ fontSize: "14px", fontWeight: "700", color: "#374151" }}>
                          Basic & Religion Preferences
                        </span>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Partner Age</label>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            <select name="partnerAgeFrom" value={formData.partnerAgeFrom} onChange={handleInputChange} style={selectStyle}>
                              <option value="">Select Age</option>
                              {ageOptions.map(age => <option key={age} value={age}>{age}</option>)}
                            </select>
                            <span style={{ fontSize: "14px", color: "#6b7280", whiteSpace: "nowrap" }}>To</span>
                            <select name="partnerAgeTo" value={formData.partnerAgeTo} onChange={handleInputChange} style={selectStyle}>
                              <option value="">Select Age</option>
                              {ageOptions.map(age => <option key={age} value={age}>{age}</option>)}
                            </select>
                          </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Partner Height</label>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                            <select name="partnerHeight" value={formData.partnerHeight} onChange={handleInputChange} style={selectStyle}>
                              <option value="">Select Height</option>
                              {heightOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span style={{ fontSize: "14px", color: "#6b7280", whiteSpace: "nowrap" }}>To</span>
                            <select name="partnerHeightTo" value={formData.partnerHeightTo} onChange={handleInputChange} style={selectStyle}>
                              <option value="">Select Height</option>
                              {heightOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                        columnGap: "20px",
                        marginTop: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <FormInput
                        label="Partner Mother Tongue"
                        name="partnerMotherTongue"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerMotherTongue}
                        onChange={handleInputChange}
                        options={[
                          "Any",
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
                        label="Partner Caste"
                        name="partnerCaste"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerCaste}
                        onChange={handleInputChange}
                        options={[
                          "Doesn't Matter",
                          "Achari",
                          "Adhi Karnataka",
                          "Adhi Dravidar",
                          "Agamudaiyar",
                          "Agarwal",
                          "Anglo Indian",
                          "Arora",
                          "Arunthathiyar",
                          "Arya Vysya",
                          "Ayyaraka",
                          "Badaga",
                          "Bajantri",
                          "Balija",
                          "Bc",
                          "Besta",
                          "Bharathar",
                          "Bhatraju",
                          "Bhovi",
                          "Billava",
                          "Boyar",
                          "Brahmin Bhatta",
                          "Brahmin Daivadnya",
                          "Brahmin Deshastha",
                          "Brahmin Dhiman",
                          "Brahmin Garhwali",
                          "Brahmin Gurukkal",
                          "Brahmin Iyengar",
                          "Brahmin Niyogi",
                          "Brahmin Others",
                          "Caste No Bar",
                          "Cheraman",
                          "Chettiar",
                          "Devanga",
                          "Devendra Kula Vellalar",
                          "Ediga",
                          "Ezhava",
                          "Fernando",
                          "Garo",
                          "Gavara",
                          "Gowda",
                          "Gounder",
                          "Gramani",
                          "Intercaste",
                          "Jagamar",
                          "Kallar",
                          "Kamalar",
                          "Kamma",
                          "Kammalar",
                          "Kapu",
                          "Karuneegar",
                          "Khasi",
                          "Knanaya",
                          "Kongu Vellala Gounder",
                          "Kuki",
                          "Kulal",
                          "Kulalar",
                          "Kuravan",
                          "Lal",
                          "Linga Yath",
                          "Madiga",
                          "Mahar",
                          "Mahendra",
                          "Mala",
                          "Mannadiyar",
                          "Maravar",
                          "Maruthuvar",
                          "Matang",
                          "Meenavar",
                          "Mizo",
                          "Moogaveera",
                          "Moopanar",
                          "Mudaliar",
                          "Mukkuvar",
                          "Muslim Ansari",
                          "Muslim Bohra",
                          "Muthuraja",
                          "NAA",
                          "Nadar",
                          "Naga",
                          "Naicker",
                          "Naidu",
                          "Nair",
                          "Navithar",
                          "OBC",
                          "OC",
                          "Oraon",
                          "Padaiyachi",
                          "Padmasali",
                          "Pallar",
                          "Pandaram",
                          "Parkava",
                          "Paravar",
                          "Parayar",
                          "Parkava Kulam",
                          "Penwj",
                          "Perika",
                          "Pillai",
                          "Pillaimar",
                          "Pulayar",
                          "Rajaka",
                          "Rajput",
                          "Reddy",
                          "Sakkiliar",
                          "Sambavar",
                          "SC",
                          "Sennai Thalaivar",
                          "Senguntha Mudaliar",
                          "Settibalija",
                          "Sourashtra",
                          "Sozhiya Vellalar",
                          "ST",
                          "Telega",
                          "Thevar",
                          "Thuluva Vellalar",
                          "Udayar",
                          "Urali Gounder",
                          "Vaishnava",
                          "Valluvan",
                          "Vaniya Chettiar",
                          "Vannar",
                          "Vathiriyar",
                          "Veera Saivam",
                          "Velama",
                          "Vellalar",
                          "Vettuva Gounder",
                          "Vishwakarma",
                          "Vokkalinga",
                          "Yadhav",
                          "Yadhava",
                          "Yogeeswarar",
                          "Other",
                          "Any",
                        ]}
                      />
                      <FormInput
                        label="Partner Denomination"
                        name="partnerDenomination"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerDenomination}
                        onChange={handleInputChange}
                        options={[
                          "Any",
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
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
                        marginTop: "20px",
                      }}
                    >
                      <CheckboxGroup
                        label="Partner Marital Status"
                        name="partnerMaritalStatus"
                        selectedValues={formData.partnerMaritalStatus}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Never Married",
                          "Divorced",
                          "Separated",
                          "Widow / Widower",
                          "Awaiting Divorce",
                          "Annulled",
                        ]}
                      />

                      <CheckboxGroup
                        label="Partner Physical Status"
                        name="partnerPhysicalStatus"
                        selectedValues={formData.partnerPhysicalStatus}
                        onChange={handleInputChange}
                        options={["Normal", "Physically Challenged", "Any"]}
                      />
                      <CheckboxGroup
                        label="Partner Eating Habits"
                        name="partnerEatingHabits"
                        selectedValues={formData.partnerEatingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Vegetarian",
                          "Vegan",
                          "Non-Vegetarian",
                          "Occasionally Non-Vegetarian",
                          "Eggetarian",
                        ]}
                      />
                      <CheckboxGroup
                        label="Partner Drinking Habits"
                        name="partnerDrinkingHabits"
                        selectedValues={formData.partnerDrinkingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Never Drinks",
                          "Drinks Socially",
                          "Drinks Regularly",
                        ]}
                      />
                      <CheckboxGroup
                        label="Partner Smoking Habits"
                        name="partnerSmokingHabits"
                        selectedValues={formData.partnerSmokingHabits}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Never Smokes",
                          "Smokes Occasionally",
                          "Smokes Regularly",
                        ]}
                      />

                      <CheckboxGroup
                        label="Partner Spirituality"
                        name="partnerSpirituality"
                        selectedValues={formData.partnerSpirituality}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Very Religious",
                          "Religious",
                          "Moderately Religious",
                          "Not Religious",
                        ]}
                      />
                    </div>
                  </FormSection>

                  {/* Partner Preferences - Professional */}
                  <FormSection title="Partner Preferences - Professional" zIndex={13}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        columnGap: "120px",
                        rowGap: "24px",
                      }}
                    >
                      <FormInput
                        label="Partner Education"
                        name="partnerEducation"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerEducation}
                        onChange={handleInputChange}
                        options={[
                          "Any",
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
                        ]}
                      />
                      <FormInput
                        label="Partner Employment Type"
                        name="partnerEmploymentType"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerEmploymentType}
                        onChange={handleInputChange}
                        options={[
                          "Any",
                          "Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                        ]}
                      />
                      <FormInput
                        label="Partner Occupation"
                        name="partnerOccupation"
                        type="select"
                        searchable={true}
                        isMulti={true}
                        value={formData.partnerOccupation}
                        onChange={handleInputChange}
                        options={[
                          "Any",
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
                      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "8px", marginBottom: "12px", width: "100%" }}>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", minWidth: "130px", maxWidth: "130px", display: "block" }}>
                          Partner Annual Income
                        </label>
                        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px", flexWrap: "nowrap" }}>
                          <select name="partnerAnnualIncomeFrom" value={formData.partnerAnnualIncomeFrom} onChange={handleInputChange} style={{ ...selectStyle, padding: "6px 8px", fontSize: "13px", width: "100%", minWidth: "0" }}>
                            <option value="">From</option>
                            {[
                              "50 Thousand",
                              "1 Lakh",
                              "2 Lakhs",
                              "3 Lakhs",
                              "4 Lakhs",
                              "5 Lakhs",
                              "7 Lakhs",
                              "10 Lakhs",
                              "15 Lakhs",
                              "20 Lakhs",
                              "30 Lakhs",
                              "50 Lakhs",
                              "1 Crore",
                            ].map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                          <span style={{ fontSize: "14px", color: "#6b7280", whiteSpace: "nowrap" }}>To</span>
                          <select name="partnerAnnualIncomeTo" value={formData.partnerAnnualIncomeTo} onChange={handleInputChange} style={{ ...selectStyle, padding: "6px 8px", fontSize: "13px", width: "100%", minWidth: "0" }}>
                            <option value="">To</option>
                            {[
                              "1 Lakh",
                              "2 Lakhs",
                              "3 Lakhs",
                              "4 Lakhs",
                              "5 Lakhs",
                              "7 Lakhs",
                              "10 Lakhs",
                              "15 Lakhs",
                              "20 Lakhs",
                              "30 Lakhs",
                              "50 Lakhs",
                              "1 Crore",
                              "Above 1 Crore",
                            ].map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  </FormSection>

                  {/* Partner Preferences - Location */}
                  <FormSection title="Partner Preferences - Location" zIndex={12}>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1fr)",
                        gap: "20px",
                      }}
                    >
                      <div>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Partner Country</label>
                        <MultiSearchSelect
                          name="partnerCountry"
                          value={formData.partnerCountry}
                          onChange={handlePartnerCountryChange}
                          options={allCountries.map(c => c.name)}
                          placeholder="Search Country..."
                        />
                      </div>
 
                      <div>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Partner State</label>
                        <MultiSearchSelect
                          name="partnerState"
                          value={formData.partnerState}
                          onChange={handlePartnerStateChange}
                          options={
                            formData.partnerCountry.length > 0 
                              ? Array.from(new Set(formData.partnerCountry.flatMap(cName => {
                                  const c = allCountries.find(curr => curr.name === cName);
                                  return c ? State.getStatesOfCountry(c.isoCode).map(s => s.name) : [];
                                })))
                              : State.getStatesOfCountry("IN").map(s => s.name)
                          }
                          placeholder="Search State..."
                        />
                      </div>
 
                      <div>
                        <label style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px", display: "block" }}>Partner District / City</label>
                        <MultiSearchSelect
                          name="partnerDistrict"
                          value={formData.partnerDistrict}
                          onChange={handlePartnerDistrictChange}
                          options={
                            formData.partnerState.length > 0
                              ? Array.from(new Set(formData.partnerState.flatMap(sName => {
                                  const countriesToSearch = formData.partnerCountry.length > 0 
                                    ? allCountries.filter(c => formData.partnerCountry.includes(c.name))
                                    : allCountries.filter(c => c.isoCode === "IN");
                                  
                                  return countriesToSearch.flatMap(c => {
                                    if (c.name === "India") {
                                       const indianState = indianDistricts.states.find(s => s.state.toLowerCase() === sName.toLowerCase());
                                       if (indianState && indianState.districts) return indianState.districts;
                                    }
                                    const states = State.getStatesOfCountry(c.isoCode);
                                    const s = states.find(curr => curr.name === sName);
                                    return s ? City.getCitiesOfState(c.isoCode, s.isoCode).map(city => city.name) : [];
                                  });
                                })))
                              : []
                          }
                          placeholder="Search District / City..."
                        />
                      </div>
                    </div>
                  </FormSection>

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
    </div>
  );
};

export default UserProfileEditPage;