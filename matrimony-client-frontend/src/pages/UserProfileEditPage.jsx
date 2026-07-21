import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import {
  savePersonalInfo,
  getUserInfo,
  deleteAdditionalImages,
  uploadIdProof,
} from "../api/axiosService/userAuthService";
import { showAlert } from "../utils/alertService";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import SearchableSelect from "../components/SearchableSelect";
import MultiSearchSelect from "../components/MultiSearchSelect";
import { Country, State, City } from "country-state-city";
import { indianDistricts } from "../utils/indianDistricts";
import { MasterDataContext } from "../context/MasterDataContext";


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
      flexWrap: "wrap",
      gap: "40px",
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
      background: "#5c2a9d",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      boxShadow: "0 4px 12px rgba(92, 42, 157, 0.4)",
      transition: "all 0.3s ease",
      border: "4px solid #fff",
      zIndex: 10,
    },
    editIconOverlayHover: {
      background: "#4b2282",
      transform: "scale(1.05)",
      boxShadow: "0 6px 16px rgba(92, 42, 157, 0.5)",
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
      borderColor: "#5c2a9d",
      color: "#5c2a9d",
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
      <h2 style={{ ...styles.sectionTitle, marginBottom: "8px" }}>Upload Your Photos</h2>
      <div style={{
        backgroundColor: "#f3e8ff",
        border: "1px solid #d8b4fe",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.05)"
      }}>
        <p style={{ color: "#581c87", fontSize: "17px", margin: 0, fontWeight: "600", lineHeight: "1.6" }}>
          Profiles with clear photos receive up to <span style={{ fontWeight: "800", color: "#6b21a8", fontSize: "20px" }}>8x more interests</span> and profile views. Upload your photos now to find better matches!
        </p>
      </div>

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
  max,
  onClick,
}) => (
  <div className={`flex ${layout === "vertical" ? "flex-col" : "flex-col md:flex-row"} ${layout === "vertical" || type === "textarea" ? "items-start" : "items-start md:items-center"} gap-1 md:gap-2 mb-3 w-full`}>
    <label
      className={`text-sm font-semibold text-gray-700 m-0 block ${layout === "vertical" ? "w-full" : "w-full md:min-w-[130px] md:max-w-[130px]"}`}
      style={{
        marginTop: (type === "textarea" && layout !== "vertical") ? "10px" : "0",
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
                style={{ cursor: readOnly ? "not-allowed" : "pointer", width: "16px", height: "16px", accentColor: "#5c2a9d" }}
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
          onClick={onClick}
          required={required}
          placeholder={placeholder}
          readOnly={readOnly}
          max={max}
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
  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-2 mb-3 w-full">
    <label className="text-sm font-semibold text-gray-700 m-0 w-full md:min-w-[130px] md:max-w-[130px] block">
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
    <div className="flex flex-col md:flex-row items-start gap-1 md:gap-2 mb-3 w-full col-span-full">
      <label
        className="text-sm font-semibold text-gray-700 m-0 w-full md:min-w-[130px] md:max-w-[130px] block md:mt-2"
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
                accentColor: "#5c2a9d",
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
  const { castes, denominations } = useContext(MasterDataContext);
  const { userId: rawUserId } = useParams();
  const userId = (rawUserId && typeof rawUserId === "string" && rawUserId.length > 24)
    ? rawUserId.substring(0, 24)
    : rawUserId;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.showWelcomePlan) {
      Swal.fire({
        html: `
          <div style="font-family: 'Inter', sans-serif; color: #333; padding: 10px;">
            <h2 style="color: #4b1e7a; font-size: 26px; font-weight: 700; text-align: center; margin-bottom: 15px; margin-top: 0;">Welcome to AgapeVows!</h2>
            <div style="text-align: center; font-size: 15px; line-height: 1.6; margin-bottom: 20px;">
              We're delighted to have you join our community.<br/>
              You've been given <span style="color: #4b1e7a; font-weight: 700;">FREE access</span> to our <span style="color: #4b1e7a; font-weight: 700;">Welcome Plan</span>,<br/> a premium membership valid for <span style="color: #4b1e7a; font-weight: 700;">60 days</span>.
            </div>

            <div style="background-color: #f8f5fb; border-radius: 12px; padding: 20px 25px; margin-bottom: 25px;">
              <h3 style="color: #4b1e7a; font-size: 16px; font-weight: 700; text-align: center; margin-bottom: 20px; margin-top: 0;">Your plan includes:</h3>
              
              <div style="display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background-color: #4b1e7a; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                  <div style="font-size: 15px; border-bottom: 1px solid #eaeaea; padding-bottom: 15px; width: 100%; text-align: left;">
                    View up to <span style="color: #4b1e7a; font-weight: 700;">100</span> profiles
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background-color: #4b1e7a; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div style="font-size: 15px; border-bottom: 1px solid #eaeaea; padding-bottom: 15px; width: 100%; text-align: left;">
                    View contact details of <span style="color: #4b1e7a; font-weight: 700;">5</span> matching profiles
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background-color: #4b1e7a; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </div>
                  <div style="font-size: 15px; border-bottom: 1px solid #eaeaea; padding-bottom: 15px; width: 100%; text-align: left;">
                    Send up to <span style="color: #4b1e7a; font-weight: 700;">5</span> interests
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 15px;">
                  <div style="background-color: #4b1e7a; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; justify-content: center; align-items: center; flex-shrink: 0;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  </div>
                  <div style="font-size: 15px; padding-bottom: 0px; width: 100%; text-align: left;">
                    <span style="color: #4b1e7a; font-weight: 700;">60 Days</span> Validity
                  </div>
                </div>
              </div>
            </div>

            <div style="text-align: center; font-size: 13px; line-height: 1.6; color: #111;">
              Complete your profile to unlock your dashboard, where you can view your<br/>membership details and begin connecting with verified Christian profiles<br/>that match your preferences.
            </div>
            
            <div style="text-align: center; font-size: 14px; font-weight: 700; color: #4b1e7a; margin-top: 15px;">
              Thank you for being part of AgapeVows. We wish you all the best.
            </div>
          </div>
         `,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'OK',
        confirmButtonColor: '#4b1e7a',
        width: '600px',
        padding: '1rem',
        customClass: {
          confirmButton: 'px-8 py-2 rounded text-white font-bold tracking-wide'
        }
      });

      // Clear the state so it doesn't pop up again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
    const [isEducationOther, setIsEducationOther] = useState(false);
    const [isAdditionalEducationOther, setIsAdditionalEducationOther] = useState(false);
    const [isEmploymentTypeOther, setIsEmploymentTypeOther] = useState(false);
    const [isOccupationOther, setIsOccupationOther] = useState(false);
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
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [pendingNav, setPendingNav] = useState(null);


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

          const parseMulti = (val) => {
            if (Array.isArray(val)) {
              return val.flatMap(item =>
                typeof item === 'string' ? item.split(',').map(s => s.trim()).filter(Boolean) : item
              );
            }
            if (typeof val === 'string' && val.trim() !== '') return val.split(',').map(s => s.trim()).filter(Boolean);
            return val ? [val] : [];
          };

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
            hobbies: parseMulti(userData.hobbies),
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
            partnerMaritalStatus: parseMulti(userData.partnerMaritalStatus),
            partnerMotherTongue: parseMulti(userData.partnerMotherTongue),
            partnerCaste: parseMulti(userData.partnerCaste),
            partnerPhysicalStatus: parseMulti(userData.partnerPhysicalStatus),
            partnerEatingHabits: parseMulti(userData.partnerEatingHabits),
            partnerDrinkingHabits: parseMulti(userData.partnerDrinkingHabits),
            partnerSmokingHabits: parseMulti(userData.partnerSmokingHabits),
            partnerDenomination: parseMulti(userData.partnerDenomination),
            partnerSpirituality: parseMulti(userData.partnerSpirituality),
            partnerEducation: parseMulti(userData.partnerEducation),
            partnerEmploymentType: parseMulti(userData.partnerEmploymentType),
            partnerOccupation: parseMulti(userData.partnerOccupation),
            partnerAnnualIncomeFrom: userData.partnerAnnualIncomeFrom || "",
            partnerAnnualIncomeTo: userData.partnerAnnualIncomeTo || "",
            partnerCountry: parseMulti(userData.partnerCountry),
            partnerState: parseMulti(userData.partnerState),
            partnerDistrict: parseMulti(userData.partnerDistrict),
            profileVisibility: userData.profileVisibility || "Public",
          };

          setFormData(loadedData);

          // Check if occupations are "Others"
          if (loadedData.education && ![
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
                          "Others"
                        ].includes(loadedData.education)) {
              setIsEducationOther(true);
            }
            if (loadedData.additionalEducation && ![
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
                          "Others"
                        ].includes(loadedData.additionalEducation)) {
              setIsAdditionalEducationOther(true);
            }
            if (loadedData.employmentType && ![
                          "Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                          "Others"
                        ].includes(loadedData.employmentType)) {
              setIsEmploymentTypeOther(true);
            }
            if (loadedData.occupation && ![
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
                          "Others"
                        ].includes(loadedData.occupation)) {
              setIsOccupationOther(true);
            }
            
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

    const missingFields = [];
    if (!formData.profileCreatedFor) missingFields.push("Profile Created By");
    if (!formData.gender) missingFields.push("Gender");
    if (!formData.dateOfBirth) missingFields.push("Date of Birth");
    if (!formData.age) missingFields.push("Age");
    if (!formData.bodyType) missingFields.push("Body Type");
    if (!formData.physicalStatus) missingFields.push("Physical Status");
    if (!formData.complexion) missingFields.push("Complexion");
    if (!formData.height) missingFields.push("Height");
    if (!formData.weight) missingFields.push("Weight");
    if (!formData.motherTongue) missingFields.push("Mother Tongue");
    if (!formData.caste) missingFields.push("Caste");
    if (!formData.maritalStatus) missingFields.push("Marital Status");
    if (!formData.eatingHabits) missingFields.push("Eating Habits");
    if (!formData.drinkingHabits) missingFields.push("Drinking Habits");
    if (!formData.smokingHabits) missingFields.push("Smoking Habits");

    if (!formData.fathersName) missingFields.push("Father's Name");
    if (!formData.mothersName) missingFields.push("Mother's Name");
    if (!formData.denomination) missingFields.push("Denomination");
    if (!formData.contactPersonName) missingFields.push("Contact Person Name");
    if (!formData.relationship) missingFields.push("Relationship with Contact Person");
    if (!formData.contactEmail) missingFields.push("Contact Email");
    if (!formData.contactPhone) missingFields.push("Alternate Mobile Number");
    if (!formData.currentDoorNo || !formData.currentLocality || !formData.currentCountry || !formData.currentState || !formData.currentDistrict) {
      missingFields.push("Current Address (all fields)");
    }

    if (missingFields.length > 0) {
      showAlert({
        title: "Please Complete Your Profile",
        html: `<div style="margin-top: -8px; font-size: 17px; color: #111; font-weight: bold;">
                 Please fill all the mandatory<span style="color: red;">*</span> details to continue.
               </div>`,
        icon: "warning"
      });
      return;
    }

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
      // Step 3: Handle profile image (with compression)
      // ========================
      const compressionOptions = {
        maxSizeMB: 0.1, // compress to max 100KB to fit under Nginx default 1MB limits for up to 10 images
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };

      if (profileImageFile) {
        try {
          // If it's an image, compress it. Otherwise, upload as is.
          if (profileImageFile.type.startsWith('image/')) {
            const compressedFile = await imageCompression(profileImageFile, compressionOptions);
            submitFormData.append("profileImage", compressedFile, profileImageFile.name);
          } else {
            submitFormData.append("profileImage", profileImageFile);
          }
        } catch (error) {
          console.error("Error compressing profile image:", error);
          submitFormData.append("profileImage", profileImageFile);
        }
      }
      if (deleteProfileImageFlag) {
        submitFormData.append("deleteProfileImage", "true");
      }

      // ========================
      // Step 4: Handle additional images (with compression)
      // ========================
      if (additionalImageFiles.length > 0) {
        for (const file of additionalImageFiles) {
          try {
            if (file.type.startsWith('image/')) {
              const compressedFile = await imageCompression(file, compressionOptions);
              submitFormData.append("additionalImages", compressedFile, file.name);
            } else {
              submitFormData.append("additionalImages", file);
            }
          } catch (error) {
            console.error("Error compressing additional image:", error);
            submitFormData.append("additionalImages", file);
          }
        }
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
        localStorage.setItem("isProfileCompleted", "true");

        // Optional: navigate after update
        setTimeout(() => {
          navigate(`/user/user-dashboard-page`, { state: { profileJustCompleted: true } });
        }, 500);
      } else {
        let errorMessage = response.data?.message || "Error updating profile. Please try again.";
        if (response.data?.error) {
          errorMessage = `${errorMessage}: ${response.data.error}`;
        }
        showAlert({ text: errorMessage, icon: "error" });
        console.error("Update failed:", response);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
      let errorMessage =
        error.response?.data?.message || error.message || "Error updating profile. Please try again.";
      
      // If the backend provided a specific error reason, append it or use it
      if (error.response?.data?.error) {
        errorMessage = `${errorMessage}: ${error.response.data.error}`;
      }
        
      if (errorMessage === "Network Error") {
        errorMessage = "Failed to connect to the server. Your images might be too large, or your internet connection was interrupted. Please try uploading fewer images.";
      }
      
      showAlert({ text: errorMessage, icon: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ========================
  // Warn user about unsaved changes
  // ========================
  useEffect(() => {
    // 1. Handle native browser refresh/close
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    // 2. Handle React Router client-side navigation (intercepting link clicks)
    const handleGlobalClick = (e) => {
      if (!hasUnsavedChanges) return;

      const target = e.target.closest('a');
      if (target && target.href && !target.hasAttribute("download") && target.target !== "_blank") {
        try {
          const url = new URL(target.href);
          // Exclude in-page anchors
          if (url.origin === window.location.origin && url.pathname === window.location.pathname) return;

          e.preventDefault();
          e.stopPropagation();

          setShowUnsavedModal(true);
          setPendingNav(target.href);
        } catch (err) {
          // invalid url, ignore
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    // Use capture phase to intercept before React Router Link handles the click
    document.addEventListener("click", handleGlobalClick, { capture: true });

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
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
      let errorMessage = error.response?.data?.message || error.message || "Error uploading ID proof. Please try again.";
      if (error.response?.data?.error) {
        errorMessage = `${errorMessage}: ${error.response.data.error}`;
      }
      if (errorMessage === "Network Error") {
        errorMessage = "Failed to connect to the server. Your ID proof file might be too large, or your internet connection was interrupted.";
      }
      showAlert({ text: errorMessage, icon: "error" });
    } finally {
      setIsUploadingId(false);
    }
  };


  return (
    <div className="min-h-screen" style={{
      backgroundColor: "#f3f4f6"
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
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}>
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
                <form onSubmit={handleSubmit} noValidate>
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
                        background: isSubmitting ? "#9ca3af" : "#5c2a9d",
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
                          e.target.style.background = "#4b2282";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#5c2a9d";
                        }
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Save Changes"}
                    </button>
                  </div>

                  <BasicInfomation
                    profileImagePreview={profileImagePreview}
                    handleProfileImageChange={handleProfileImageChange}
                    handleAdditionalImagesChange={handleAdditionalImagesChange}
                    additionalImagePreviews={additionalImagePreviews}
                    removeAdditionalImage={removeAdditionalImage}
                    handleDeleteProfileImage={handleDeleteProfileImage}
                  />

                  {/* <FormSection title="Government ID Verification" zIndex={22}>
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
                            Please upload a valid government-issued ID (Aadhar, Passport, etc.) for verification.
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
                  </FormSection> */}

                  <FormSection
                    title="Basic Details"
                    zIndex={20}
                    subtitle={
                      <p style={{ color: "#5c2a9d", fontWeight: "bold", margin: 0 }}>
                        Please ensure your Name and Date of Birth matches with your ID Proof (Aadhaar or Passport) for verification
                      </p>
                    }
                  >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
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
                        required
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
                        required
                        type="select"
                        value={formData.profileCreatedFor}
                        onChange={handleInputChange}
                        options={["Self", "Sibling", "Parents/Guardian", "Friend", "Relative", "Pastor"]}
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
                        required
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        readOnly={isDobReadOnly}
                        helpText={isDobReadOnly ? "To change DOB, please contact Customer Support." : ""}
                        max={new Date().toISOString().split('T')[0]}
                        onClick={(e) => {
                          if (!isDobReadOnly && typeof e.target.showPicker === 'function') {
                            e.target.showPicker();
                          }
                        }}
                      />
                      <FormInput
                        label="Age"
                        name="age"
                        required
                        type="select"
                        searchable={true}
                        value={formData.age}
                        onChange={handleInputChange}
                        options={ageOptions}
                      />
                      <FormInput
                        label="Body Type"
                        name="bodyType"
                        required
                        type="select"
                        value={formData.bodyType}
                        onChange={handleInputChange}
                        options={["Slim", "Average", "Athletic", "Heavy"]}
                      />
                      <FormInput
                        label="Physical Status"
                        name="physicalStatus"
                        required
                        type="select"
                        value={formData.physicalStatus}
                        onChange={handleInputChange}
                        options={["Normal", "Physically Challenged"]}
                      />
                      <FormInput
                        label="Complexion"
                        name="complexion"
                        required
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
                        required
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
                        required
                        type="select"
                        searchable={true}
                        value={formData.weight}
                        onChange={handleInputChange}
                        options={Array.from({ length: 101 }, (_, i) => String(i + 40))}
                      />

                      <FormInput
                        label="Mother Tongue"
                        name="motherTongue"
                        required
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
                        required
                        type="select"
                        searchable={true}
                        value={formData.caste}
                        onChange={handleInputChange}
                        options={[
                          "Do not wish to specify",
                          ...castes,
                          "Other",
                        ]}
                      />
                      <div style={{ gridColumn: "1 / -1" }}>
                        <FormInput
                          label="Marital Status"
                          name="maritalStatus"
                          required
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
                          required
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
                          required
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
                          required
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
                      <FormInput
                        label="Father's Name"
                        name="fathersName"
                        required
                        value={formData.fathersName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Mother's Name"
                        name="mothersName"
                        required
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
                              bottom: "22px",
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
                              bottom: "22px",
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
                      <div className='col-span-full grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-x-[120px] md:gap-y-6'>
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
                      <FormInput
                        label="Denomination"
                        name="denomination"
                        required
                        type="select"
                        searchable={true}
                        value={formData.denomination}
                        onChange={handleInputChange}
                        options={[
                          "Don't wish to specify",
                          ...denominations,
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
                      <p style={{ fontWeight: "700", color: "#5c2a9d", fontSize: "1.2rem", marginBottom: "16px" }}>
                        Prefer communication through a family member or representative?
                      </p>
                      <ul style={{ paddingLeft: "20px", margin: "0", fontSize: "1.05rem", lineHeight: "1.7", display: "flex", flexDirection: "column", gap: "10px", fontWeight: "500" }}>
                        <li style={{ color: "#5c2a9d" }}>To help protect your privacy and avoid unwanted spam or fraudulent calls, AgapeVows recommends providing an alternate contact number for communication with interested matches. This number should be different from the primary phone number you have used to create your profile (if the profile was created using Bride or Groom’s phone number).</li>
                        <li style={{ color: "#5c2a9d" }}>You may update the contact details of a parent, family member, guardian, or trusted representative who can communicate on behalf of you. Only users who express interest in connecting with you will be able to view these details.</li>
                        <li style={{ color: "#5c2a9d" }}>If you prefer to communicate directly with interested matches, you may enter your own phone number in the Alternate Mobile Number field.</li>
                      </ul>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>

                      <FormInput
                        label="Contact Person Name"
                        name="contactPersonName"
                        required
                        value={formData.contactPersonName}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Relationship"
                        name="relationship"
                        required
                        type="select"
                        searchable={true}
                        value={formData.relationship}
                        onChange={handleInputChange}
                        options={["Self", "Sibling", "Parents/Guardian", "Friend", "Relative", "Pastor"]}
                      />

                      <FormInput
                        label="Contact Email"
                        name="contactEmail"
                        required
                        type="email"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                      />
                      <FormInput
                        label="Alternate Mobile Number"
                        name="contactPhone"
                        required
                        type="tel"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
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

                      <InlineFormInput required label="Door / Flat No (Name), Street" name="currentDoorNo" value={formData.currentDoorNo} onChange={handleInputChange} autoComplete="new-password" />
                      <InlineFormInput required label="Locality / Area" name="currentLocality" value={formData.currentLocality} onChange={handleInputChange} autoComplete="new-password" />
                      <InlineFormInput required label="Country" name="currentCountry" type="select" searchable={true} options={countryOptions} value={formData.currentCountry} onChange={handleInputChange} />
                      <InlineFormInput required label="State" name="currentState" type="select" searchable={true} options={currentStateOptions} value={formData.currentState} onChange={handleInputChange} />
                      <InlineFormInput required label="District" name="currentDistrict" type="select" searchable={true} options={currentDistrictOptions} value={formData.currentDistrict} onChange={handleInputChange} />
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
                      {!isEducationOther && ( ["B.Arch",
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
                          "Others",].includes(formData.education) || !formData.education) ? (
                        <FormInput
                          label="Highest Education"
                          name="education"
                          type="select"
                          searchable={true}
                          value={formData.education}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsEducationOther(true);
                              setFormData(prev => ({ ...prev, education: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={["B.Arch",
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
                          "Others",]}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Highest Education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="Enter highest education"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsEducationOther(false);
                              setFormData(prev => ({ ...prev, education: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              bottom: "22px",
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
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}
                      {!isAdditionalEducationOther && ( ["B.Arch",
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
                          "Others",].includes(formData.additionalEducation) || !formData.additionalEducation) ? (
                        <FormInput
                          label="Additional Education"
                          name="additionalEducation"
                          type="select"
                          searchable={true}
                          value={formData.additionalEducation}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsAdditionalEducationOther(true);
                              setFormData(prev => ({ ...prev, additionalEducation: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={["B.Arch",
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
                          "Others",]}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Additional Education"
                            name="additionalEducation"
                            value={formData.additionalEducation}
                            onChange={handleInputChange}
                            placeholder="Enter additional education"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsAdditionalEducationOther(false);
                              setFormData(prev => ({ ...prev, additionalEducation: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              bottom: "22px",
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
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}
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
                      {!isEmploymentTypeOther && ( ["Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                          "Others"].includes(formData.employmentType) || !formData.employmentType) ? (
                        <FormInput
                          label="Employment Type"
                          name="employmentType"
                          type="select"
                          searchable={true}
                          value={formData.employmentType}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsEmploymentTypeOther(true);
                              setFormData(prev => ({ ...prev, employmentType: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={["Private Sector",
                          "Government",
                          "Self Employed",
                          "Business",
                          "Not Working",
                          "Others"]}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Employment Type"
                            name="employmentType"
                            value={formData.employmentType}
                            onChange={handleInputChange}
                            placeholder="Enter employment type"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsEmploymentTypeOther(false);
                              setFormData(prev => ({ ...prev, employmentType: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              bottom: "22px",
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
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}
                      {!isOccupationOther && ( ["Accountant",
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
                          "Others"].includes(formData.occupation) || !formData.occupation) ? (
                        <FormInput
                          label="Occupation"
                          name="occupation"
                          type="select"
                          searchable={true}
                          value={formData.occupation}
                          onChange={(e) => {
                            if (e.target.value === "Others") {
                              setIsOccupationOther(true);
                              setFormData(prev => ({ ...prev, occupation: "" }));
                            } else {
                              handleInputChange(e);
                            }
                          }}
                          options={["Accountant",
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
                          "Others"]}
                        />
                      ) : (
                        <div style={{ position: "relative" }}>
                          <FormInput
                            label="Occupation"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Enter occupation"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsOccupationOther(false);
                              setFormData(prev => ({ ...prev, occupation: "" }));
                            }}
                            style={{
                              position: "absolute",
                              right: "12px",
                              bottom: "22px",
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
                          >
                            <i className="fa fa-times"></i>
                          </button>
                        </div>
                      )}
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

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-[600] text-[#374151]">Partner Age</label>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                            <select name="partnerAgeFrom" value={formData.partnerAgeFrom} onChange={handleInputChange} style={selectStyle} className="w-full sm:flex-1">
                              <option value="">Select Age</option>
                              {ageOptions.map(age => <option key={age} value={age}>{age}</option>)}
                            </select>
                            <span className="text-[14px] text-[#6b7280] text-center sm:text-left">To</span>
                            <select name="partnerAgeTo" value={formData.partnerAgeTo} onChange={handleInputChange} style={selectStyle} className="w-full sm:flex-1">
                              <option value="">Select Age</option>
                              {ageOptions.map(age => <option key={age} value={age}>{age}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[14px] font-[600] text-[#374151]">Partner Height</label>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full">
                            <select name="partnerHeight" value={formData.partnerHeight} onChange={handleInputChange} style={selectStyle} className="w-full sm:flex-1">
                              <option value="">Select Height</option>
                              {heightOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                            <span className="text-[14px] text-[#6b7280] text-center sm:text-left">To</span>
                            <select name="partnerHeightTo" value={formData.partnerHeightTo} onChange={handleInputChange} style={selectStyle} className="w-full sm:flex-1">
                              <option value="">Select Height</option>
                              {heightOptions.map(h => <option key={h} value={h}>{h}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5 mt-5 mb-0">
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
                          "Any",
                          ...castes,
                          "Other",
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
                          ...denominations,
                          "Other",
                        ]}
                      />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6 mt-3'>
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
                        options={["Any", "Normal", "Physically Challenged",]}
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
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-[120px] md:gap-y-6'>
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
                        background: isSubmitting ? "#9ca3af" : "#5c2a9d",
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
                          e.target.style.background = "#4b2282";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.target.style.background = "#5c2a9d";
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

      {/* Unsaved Changes Modal */}
      {showUnsavedModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999999 }}>
          <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", width: "90%", maxWidth: "420px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", textAlign: "center" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fee2e2", color: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto", fontSize: "24px" }}>
              <i className="fa fa-exclamation-triangle"></i>
            </div>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "22px", color: "#1f2937", fontWeight: "700" }}>Unsaved Changes</h3>
            <p style={{ margin: "0 0 28px 0", color: "#4b5563", fontSize: "16px", lineHeight: "1.5" }}>
              Changes that you made may not be saved. Are you sure you want to leave this page?
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                type="button"
                onClick={() => setShowUnsavedModal(false)}
                style={{ padding: "12px 24px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "15px", cursor: "pointer", flex: 1, transition: "background 0.2s" }}
                onMouseEnter={(e) => e.target.style.background = "#e5e7eb"}
                onMouseLeave={(e) => e.target.style.background = "#f3f4f6"}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowUnsavedModal(false);
                  setHasUnsavedChanges(false);
                  setTimeout(() => {
                    if (pendingNav) {
                      try {
                        const url = new URL(pendingNav);
                        if (url.origin === window.location.origin) {
                          navigate(url.pathname + url.search + url.hash);
                        } else {
                          window.location.href = pendingNav;
                        }
                      } catch (err) {
                        window.location.href = pendingNav;
                      }
                    }
                  }, 50);
                }}
                style={{ padding: "12px 24px", background: "#5c2a9d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", fontSize: "15px", cursor: "pointer", flex: 1, transition: "background 0.2s" }}
                onMouseEnter={(e) => e.target.style.background = "#4b2282"}
                onMouseLeave={(e) => e.target.style.background = "#5c2a9d"}
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UserProfileEditPage;