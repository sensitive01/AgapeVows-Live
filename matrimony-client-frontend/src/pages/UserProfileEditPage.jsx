import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import SearchableSelect from "../components/SearchableSelect";
import {
  savePersonalInfo,
  getUserInfo,
  deleteAdditionalImages,
} from "../api/axiosService/userAuthService";

// --- Option Constants ---
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const PROFILE_CREATED_FOR_OPTIONS = ["Self", "Son", "Daughter", "Brother", "Sister", "Friend", "Relative"];
const MARITAL_STATUS_OPTIONS = ["Never Married", "Divorced", "Awaiting Divorce", "Widow/Widower"];
const HEIGHT_OPTIONS = ["4ft", "4ft 1in", "4ft 2in", "4ft 3in", "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in", "7ft", "7ft 1in", "7ft 2in", "7ft 3in", "7ft 4in", "7ft 5in", "7ft 6in", "7ft 7in", "7ft 8in", "7ft 9in", "7ft 10in", "7ft 11in", "8ft"];
const BODY_TYPE_OPTIONS = ["Average", "Slim", "Athletic", "Heavy"];
const COMPLEXION_OPTIONS = ["Fair", "Very Fair", "Wheatish", "Dark", "Very Dark"];
const EATING_HABITS_OPTIONS = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
const FAMILY_VALUE_OPTIONS = ["Traditional", "Moderate", "Liberal"];
const FAMILY_TYPE_OPTIONS = ["Joint", "Nuclear"];
const FAMILY_STATUS_OPTIONS = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
const EMPLOYMENT_TYPE_OPTIONS = ["Government", "Private", "Business", "Self Employed", "Not Working"];
const YES_NO_OPTIONS = ["No", "Yes", "Occasionally"];
const PHYSICAL_STATUS_OPTIONS = ["Normal", "Physically Challenged"];
const SMOKING_DRINKING_OPTIONS = ["No", "Yes", "Occasionally"];

// --- Memoized InputField Component ---
const InputField = React.memo(({ label, name, type = "text", options = null, col = "6", value, onChange, placeholder, required, searchable = false }) => (
  <div className={`col-md-${col} mb-3`}>
    <label className="form-label small fw-bold text-muted">
      {label} {required && <span className="text-danger">*</span>}
    </label>
    {type === "select" && searchable ? (
      <SearchableSelect
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={`Select ${label}`}
      />
    ) : options ? (
      <select className="form-select" name={name} value={value || ""} onChange={onChange} required={required}>
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea className="form-control" name={name} value={value || ""} onChange={onChange} rows="3" placeholder={placeholder} required={required} />
    ) : (
      <input type={type} className="form-control" name={name} value={value || ""} onChange={onChange} placeholder={placeholder} required={required} />
    )}
  </div>
));

InputField.displayName = 'InputField';

// --- Form Section Component ---
const FormSection = ({ title, children, id, activeTab }) => (
  <div className={`tab-pane fade ${activeTab === id ? "show active" : ""}`} id={id} role="tabpanel">
    <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: "12px" }}>
      <h5 className="fw-bold mb-4 border-bottom pb-2 text-primary">{title}</h5>
      <div className="row g-3">{children}</div>
    </div>
  </div>
);

// --- BasicInfomation Component ---
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

  const styles = {
    profileImageContainer: {
      position: "relative",
      width: "160px",
      height: "160px",
      margin: "0 auto 20px"
    },
    profileImage: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      objectFit: "cover",
      border: "4px solid #fff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      background: "#f8fafc",
    },
    editIconOverlay: {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#6366f1",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      border: "3px solid #fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      zIndex: 10,
    },
    deleteIconOverlay: {
      position: "absolute",
      bottom: "5px",
      left: "5px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      background: "#ef4444",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      border: "3px solid #fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      zIndex: 10,
    }
  };

  return (
    <div className="row">
      <div className="col-md-4 text-center border-end">
        <h6 className="fw-bold text-muted mb-3">Profile Picture</h6>
        <div style={styles.profileImageContainer}>
          <img
            src={profileImagePreview || "/assets/images/blue-circle-with-white-user_78370-4707.avif"}
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.editIconOverlay} onClick={() => profileImageInputRef.current?.click()} title="Change photo">
            <i className="fa fa-pencil"></i>
          </div>
          {profileImagePreview && (
            <div style={styles.deleteIconOverlay} onClick={handleDeleteProfileImage} title="Remove photo">
              <i className="fa fa-trash"></i>
            </div>
          )}
          <input
            ref={profileImageInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="d-none"
          />
        </div>
        <p className="small text-muted">Upload a clear face photo</p>
      </div>

      <div className="col-md-8 px-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold text-muted mb-0">Photo Album</h6>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm px-3 rounded-pill"
            onClick={() => additionalImagesInputRef.current?.click()}
          >
            <i className="fa fa-upload me-2"></i>Add Photos
          </button>
        </div>
        
        <input
          ref={additionalImagesInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleAdditionalImagesChange}
          className="d-none"
        />

        {additionalImagePreviews.length > 0 ? (
          <div className="row g-2">
            {additionalImagePreviews.map((preview, index) => (
              <div key={index} className="col-3">
                <div className="position-relative ratio ratio-1x1 rounded overflow-hidden border shadow-sm">
                  <img src={preview.url} alt="Album" className="object-fit-cover" />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                    style={{ width: "22px", height: "22px", borderRadius: "50%" }}
                    onClick={() => removeAdditionalImage(index)}
                  >
                    <i className="fa fa-times small"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4 bg-light rounded-3 border border-dashed">
            <i className="fa fa-images fa-2x text-muted mb-2"></i>
            <p className="small text-muted mb-0">No album photos yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Checkbox Group Component ---
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
    <div className="col-12 mt-3">
      <label className="form-label small fw-bold text-muted mb-2 d-block">{label}</label>
      <div className="row g-2">
        {options.map((option) => (
          <div key={option} className="col-md-3 col-6">
            <div 
              className={`p-2 rounded border small cursor-pointer transition-all ${selectedValues.includes(option) ? "bg-primary-subtle border-primary text-primary fw-bold" : "bg-white"}`}
              onClick={() => handleCheckboxChange(option)}
              style={{ cursor: "pointer" }}
            >
              <div className="form-check m-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedValues.includes(option)}
                  onChange={() => {}} // handled by parent div click
                />
                <label className="form-check-label ms-1">{option}</label>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main UserProfileEditPage Component
const UserProfileEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const [formData, setFormData] = useState({
    aboutMe: "", gender: "", profileCreatedFor: "", name: "", email: "", phone: "",
    dateOfBirth: "", age: "", bodyType: "", physicalStatus: "", complexion: "",
    height: "", weight: "", maritalStatus: "", marriedMonthYear: "",
    livingTogetherPeriod: "", divorcedMonthYear: "", reasonForDivorce: "",
    childStatus: "", numberOfChildren: "", eatingHabits: "", drinkingHabits: "",
    smokingHabits: "", motherTongue: "", caste: "",
    fathersName: "", mothersName: "", fathersOccupation: "", fathersProfession: "",
    mothersOccupation: "", fathersNative: "", mothersNative: "",
    familyValue: "", familyType: "", familyStatus: "", residenceType: "",
    numberOfBrothers: "", numberOfSisters: "",
    denomination: "", church: "", churchActivity: "", pastorsName: "",
    spirituality: "", religiousDetail: "",
    alternateMobile: "", landlineNumber: "", currentAddress: "", permanentAddress: "",
    contactPersonName: "", relationship: "", citizenOf: "", city: "", state: "", pincode: "",
    education: "", additionalEducation: "", college: "", educationDetail: "",
    employmentType: "", occupation: "", position: "", companyName: "", annualIncome: "",
    exercise: "", hobbies: [], interests: "", music: "", favouriteReads: "",
    favouriteCuisines: "", sportsActivities: "", dressStyles: "",
    whatsapp: "", facebook: "", instagram: "", x: "", youtube: "", linkedin: "",
    partnerAgeFrom: "", partnerAgeTo: "", partnerHeight: "", partnerMaritalStatus: "",
    partnerMotherTongue: "", partnerCaste: "", partnerPhysicalStatus: "",
    partnerEatingHabits: "", partnerDrinkingHabits: "", partnerSmokingHabits: "",
    partnerDenomination: "", partnerSpirituality: "", partnerEducation: "",
    partnerEmploymentType: "", partnerOccupation: "", partnerAnnualIncome: "",
    partnerCountry: "", partnerState: "", partnerDistrict: "",
    profileVisibility: "Public",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [deleteProfileImageFlag, setDeleteProfileImageFlag] = useState(false);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [existingAdditionalImages, setExistingAdditionalImages] = useState([]);
  const [deletedAdditionalImages, setDeletedAdditionalImages] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState("");
  const [deleteVideoFlag, setDeleteVideoFlag] = useState(false);
  const [idProofFile, setIdProofFile] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState(null);
  const [idVerificationStatus, setIdVerificationStatus] = useState("Pending");
  const [isUploadingId, setIsUploadingId] = useState(false);

  // Location Helpers
  const allCountries = useMemo(() => Country.getAllCountries(), []);
  const countryOptions = useMemo(() => allCountries.map(c => c.name), [allCountries]);
  
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const stateOptions = useMemo(() => 
    selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode).map(s => s.name) : []
  , [selectedCountryCode]);

  const cityOptions = useMemo(() => 
    (selectedCountryCode && selectedStateCode) ? City.getCitiesOfState(selectedCountryCode, selectedStateCode).map(c => c.name) : []
  , [selectedCountryCode, selectedStateCode]);

  useEffect(() => {
    const fetchUserData = async () => {
      const rawId = userId?.trim() || "";
      const sanitizedId = (rawId.length > 24) ? rawId.substring(0, 24) : rawId;
      if (!sanitizedId) return;

      try {
        const response = await getUserInfo(sanitizedId);
        if (response.status === 200 && response.data?.data) {
          const u = response.data.data;
          setFormData({
            aboutMe: u.aboutMe || "", gender: u.gender || "", profileCreatedFor: u.profileCreatedFor || "",
            name: u.userName || "", email: u.userEmail || "", phone: u.userMobile || "",
            dateOfBirth: u.dateOfBirth ? new Date(u.dateOfBirth).toISOString().split("T")[0] : "",
            age: u.age?.toString() || "", bodyType: u.bodyType || "", physicalStatus: u.physicalStatus || "",
            complexion: u.complexion || "", height: u.height || "", weight: u.weight || "",
            maritalStatus: u.maritalStatus || "", marriedMonthYear: u.marriedMonthYear || "",
            livingTogetherPeriod: u.livingTogetherPeriod || "", divorcedMonthYear: u.divorcedMonthYear || "",
            reasonForDivorce: u.reasonForDivorce || "", childStatus: u.childStatus || "",
            numberOfChildren: u.numberOfChildren || "", eatingHabits: u.eatingHabits || "",
            drinkingHabits: u.drinkingHabits || "", smokingHabits: u.smokingHabits || "",
            motherTongue: u.motherTongue || "", caste: u.caste || "",
            fathersName: u.fathersName || "", mothersName: u.mothersName || "",
            fathersOccupation: u.fathersOccupation || "", fathersProfession: u.fathersProfession || "",
            mothersOccupation: u.mothersOccupation || "", fathersNative: u.fathersNative || "",
            mothersNative: u.mothersNative || "", familyValue: u.familyValue || "",
            familyType: u.familyType || "", familyStatus: u.familyStatus || "",
            residenceType: u.residenceType || "", numberOfBrothers: u.numberOfBrothers || "",
            numberOfSisters: u.numberOfSisters || "", denomination: u.denomination || "",
            church: u.church || "", churchActivity: u.churchActivity || "",
            pastorsName: u.pastorsName || "", spirituality: u.spirituality || "",
            religiousDetail: u.religiousDetail || "", alternateMobile: u.alternateMobile || "",
            landlineNumber: u.landlineNumber || "", currentAddress: u.currentAddress || "",
            permanentAddress: u.permanentAddress || "", contactPersonName: u.contactPersonName || "",
            relationship: u.relationship || "", citizenOf: u.citizenOf || "",
            city: u.city || "", state: u.state || "", pincode: u.pincode || "",
            education: u.education || "", additionalEducation: u.additionalEducation || "",
            college: u.college || "", educationDetail: u.educationDetail || "",
            employmentType: u.employmentType || "", occupation: u.occupation || "",
            position: u.position || "", companyName: u.companyName || "",
            annualIncome: u.annualIncome || "", exercise: u.exercise || "",
            hobbies: Array.isArray(u.hobbies) ? u.hobbies : [], interests: u.interests || "",
            music: u.music || "", favouriteReads: u.favouriteReads || "",
            favouriteCuisines: u.favouriteCuisines || "", sportsActivities: u.sportsActivities || "",
            dressStyles: u.dressStyles || "", whatsapp: u.whatsapp || "",
            facebook: u.facebook || "", instagram: u.instagram || "", x: u.x || "",
            youtube: u.youtube || "", linkedin: u.linkedin || "",
            partnerAgeFrom: u.partnerAgeFrom || "", partnerAgeTo: u.partnerAgeTo || "",
            partnerHeight: u.partnerHeight || "", partnerMaritalStatus: u.partnerMaritalStatus || "",
            partnerMotherTongue: u.partnerMotherTongue || "", partnerCaste: u.partnerCaste || "",
            partnerPhysicalStatus: u.partnerPhysicalStatus || "", partnerEatingHabits: u.partnerEatingHabits || "",
            partnerDrinkingHabits: u.partnerDrinkingHabits || "", partnerSmokingHabits: u.partnerSmokingHabits || "",
            partnerDenomination: u.partnerDenomination || "", partnerSpirituality: u.partnerSpirituality || "",
            partnerEducation: u.partnerEducation || "", partnerEmploymentType: u.partnerEmploymentType || "",
            partnerOccupation: u.partnerOccupation || "", partnerAnnualIncome: u.partnerAnnualIncome || "",
            partnerCountry: u.partnerCountry || "", profileVisibility: u.profileVisibility || "Public",
          });

          if (u.profileImage) setProfileImagePreview(u.profileImage);
          if (u.additionalImages?.length > 0) {
            setAdditionalImagePreviews(u.additionalImages.map(url => ({ url, isExisting: true })));
            setExistingAdditionalImages(u.additionalImages);
          }
          if (u.selfIntroductionVideo) setVideoPreview(u.selfIntroductionVideo);
          if (u.idVerificationStatus) setIdVerificationStatus(u.idVerificationStatus);
          if (u.idProofDocument) setIdProofPreview(u.idProofDocument);

          if (u.citizenOf) {
            const country = allCountries.find(c => c.name === u.citizenOf);
            if (country) {
              setSelectedCountryCode(country.isoCode);
              const states = State.getStatesOfCountry(country.isoCode);
              const state = states.find(s => s.name === u.state);
              if (state) setSelectedStateCode(state.isoCode);
            }
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [userId, allCountries]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setHasUnsavedChanges(true);
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCountryChange = (e) => {
    const name = e.target.value;
    const country = allCountries.find(c => c.name === name);
    setSelectedCountryCode(country ? country.isoCode : "");
    setSelectedStateCode("");
    setFormData(prev => ({ ...prev, citizenOf: name, state: "", city: "" }));
    setHasUnsavedChanges(true);
  };

  const handleStateChange = (e) => {
    const name = e.target.value;
    const states = State.getStatesOfCountry(selectedCountryCode);
    const state = states.find(s => s.name === name);
    setSelectedStateCode(state ? state.isoCode : "");
    setFormData(prev => ({ ...prev, state: name, city: "" }));
    setHasUnsavedChanges(true);
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setDeleteProfileImageFlag(false);
      const reader = new FileReader();
      reader.onloadend = () => setProfileImagePreview(reader.result);
      reader.readAsDataURL(file);
      setHasUnsavedChanges(true);
    }
  };

  const handleDeleteProfileImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setDeleteProfileImageFlag(true);
    setHasUnsavedChanges(true);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImageFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdditionalImagePreviews(prev => [...prev, { url: reader.result, file, isExisting: false }]);
      };
      reader.readAsDataURL(file);
    });
    setHasUnsavedChanges(true);
  };

  const removeAdditionalImage = (index) => {
    const removed = additionalImagePreviews[index];
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (removed.isExisting) {
      setDeletedAdditionalImages(prev => [...prev, removed.url]);
      setExistingAdditionalImages(prev => prev.filter(url => url !== removed.url));
    } else {
      setAdditionalImageFiles(prev => prev.filter(f => f !== removed.file));
    }
    setHasUnsavedChanges(true);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      setDeleteVideoFlag(false);
      setVideoPreview(URL.createObjectURL(file));
      setHasUnsavedChanges(true);
    }
  };

  const handleDeleteVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setDeleteVideoFlag(true);
    setHasUnsavedChanges(true);
  };

  const handleHobbiesChange = (e) => {
    setFormData(prev => ({ ...prev, hobbies: e.target.value }));
    setHasUnsavedChanges(true);
  };

  const handleIdProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIdProofFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setIdProofPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleIdProofUpload = async () => {
    if (!idProofFile) return;
    setIsUploadingId(true);
    try {
      const fd = new FormData();
      fd.append("idProof", idProofFile);
      const baseUrl = import.meta.env.VITE_BASE_ROUTE;
      await axios.post(`${baseUrl}/upload-id-proof/${userId}`, fd);
      alert("ID Proof uploaded for verification.");
      setIdVerificationStatus("Uploaded");
      setIdProofFile(null);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setIsUploadingId(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    try {
      if (deletedAdditionalImages.length > 0) {
        await deleteAdditionalImages(userId, deletedAdditionalImages);
      }
      const fd = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === "hobbies") {
          formData.hobbies.forEach(h => fd.append("hobbies", h));
        } else {
          fd.append(key, formData[key] || "");
        }
      });
      if (profileImageFile) fd.append("profileImage", profileImageFile);
      if (deleteProfileImageFlag) fd.append("deleteProfileImage", "true");
      additionalImageFiles.forEach(f => fd.append("additionalImages", f));
      existingAdditionalImages.forEach(u => fd.append("existingAdditionalImages", u));
      if (videoFile) fd.append("selfIntroductionVideo", videoFile);
      if (deleteVideoFlag) fd.append("deleteSelfIntroductionVideo", "true");

      const res = await savePersonalInfo(fd, userId);
      if (res.status === 200) {
        alert("Profile saved!");
        setHasUnsavedChanges(false);
        navigate("/user/user-profile-page");
      }
    } catch (err) {
      alert("Save failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <i className="fa fa-spinner fa-spin fa-3x text-primary mb-3"></i>
        <p className="fw-bold">Loading Profile...</p>
      </div>
    </div>
  );

  const renderField = (label, name, type = "text", options = null, col = "6", placeholder = "", required = false, searchable = false) => (
    <InputField
      key={name} label={label} name={name} type={type} options={options}
      col={col} value={formData[name]} onChange={handleInputChange}
      placeholder={placeholder} required={required} searchable={searchable}
    />
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
      <LayoutComponent />
      <div style={{ paddingTop: "120px", paddingBottom: "40px" }}>
        <div className="container-fluid px-4">
          <div className="row g-4">
            <div className="col-lg-2">
              <UserSideBar sidebarTop="120px" />
            </div>
            <div className="col-lg-10">
              <div className="card border-0 shadow-sm" style={{ borderRadius: "15px" }}>
                <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="fw-bold mb-0">Edit Profile</h3>
                    <p className="text-muted small mb-0">Update your details to find your perfect match</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button className="btn btn-light rounded-pill px-4 border" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="btn btn-primary rounded-pill px-4 shadow" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>

                <div className="px-4 border-bottom bg-white sticky-top" style={{ top: "0", zIndex: 10 }}>
                  <ul className="nav nav-tabs border-0">
                    {[
                      { id: "basic", label: "General", icon: "fa-user" },
                      { id: "gallery", label: "Media", icon: "fa-image" },
                      { id: "family", label: "Family", icon: "fa-users" },
                      { id: "religious", label: "Religious", icon: "fa-church" },
                      { id: "professional", label: "Professional", icon: "fa-briefcase" },
                      { id: "contact", label: "Contact", icon: "fa-id-card" },
                      { id: "lifestyle", label: "Lifestyle", icon: "fa-heart" },
                      { id: "partner", label: "Partner Pref", icon: "fa-handshake-o" },
                      { id: "settings", label: "Verification", icon: "fa-cog" }
                    ].map(tab => (
                      <li className="nav-item" key={tab.id}>
                        <button
                          className={`nav-link border-0 border-bottom border-3 py-3 ${activeTab === tab.id ? "active border-primary text-primary fw-bold" : "text-muted border-transparent"}`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          <i className={`fa ${tab.icon} me-2`}></i>{tab.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-body p-4 bg-light-subtle">
                  <div className="tab-content">
                    <FormSection title="General Information" id="basic" activeTab={activeTab}>
                      {renderField("About Me", "aboutMe", "textarea", null, "12")}
                      {renderField("Full Name", "name", "text", null, "6", "", true)}
                      {renderField("Email", "email", "email", null, "6", "", true)}
                      {renderField("Gender", "gender", "select", GENDER_OPTIONS)}
                      {renderField("Created For", "profileCreatedFor", "select", PROFILE_CREATED_FOR_OPTIONS)}
                      {renderField("DOB", "dateOfBirth", "date")}
                      {renderField("Age", "age", "text", null, "6", "Calculated")}
                      {renderField("Height", "height", "select", HEIGHT_OPTIONS)}
                      {renderField("Weight (kg)", "weight")}
                      {renderField("Marital Status", "maritalStatus", "select", MARITAL_STATUS_OPTIONS)}
                      {renderField("Body Type", "bodyType", "select", BODY_TYPE_OPTIONS)}
                      {renderField("Complexion", "complexion", "select", COMPLEXION_OPTIONS)}
                      {renderField("Mother Tongue", "motherTongue")}
                      {renderField("Caste", "caste")}
                    </FormSection>

                    <div className={`tab-pane fade ${activeTab === "gallery" ? "show active" : ""}`}>
                      <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: "12px" }}>
                        <h5 className="fw-bold mb-4 text-primary">Media Gallery</h5>
                        <BasicInfomation
                          profileImagePreview={profileImagePreview}
                          handleProfileImageChange={handleProfileImageChange}
                          handleAdditionalImagesChange={handleAdditionalImagesChange}
                          additionalImagePreviews={additionalImagePreviews}
                          removeAdditionalImage={removeAdditionalImage}
                          handleDeleteProfileImage={handleDeleteProfileImage}
                        />
                        <div className="mt-5 pt-4 border-top">
                          <h6 className="fw-bold text-muted mb-3">Self Introduction Video</h6>
                          <div className="bg-light p-4 rounded-3 text-center border border-dashed">
                            {videoPreview ? (
                              <div className="position-relative d-inline-block">
                                <video src={videoPreview} controls style={{ maxWidth: "100%", maxHeight: "300px" }} className="rounded shadow" />
                                <button className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle" onClick={handleDeleteVideo}>
                                  <i className="fa fa-times"></i>
                                </button>
                              </div>
                            ) : (
                              <label className="p-4 w-100 cursor-pointer">
                                <i className="fa fa-video-camera fa-2x text-primary mb-2 d-block"></i>
                                <span className="text-primary fw-bold">Upload Introduction Video</span>
                                <input type="file" accept="video/*" className="d-none" onChange={handleVideoChange} />
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormSection title="Family Details" id="family" activeTab={activeTab}>
                      {renderField("Father's Name", "fathersName")}
                      {renderField("Mother's Name", "mothersName")}
                      {renderField("Father's Occupation", "fathersOccupation")}
                      {renderField("Mother's Occupation", "mothersOccupation")}
                      {renderField("Family Value", "familyValue", "select", FAMILY_VALUE_OPTIONS)}
                      {renderField("Family Type", "familyType", "select", FAMILY_TYPE_OPTIONS)}
                      {renderField("Family Status", "familyStatus", "select", FAMILY_STATUS_OPTIONS)}
                      {renderField("No. of Brothers", "numberOfBrothers", "number")}
                      {renderField("No. of Sisters", "numberOfSisters", "number")}
                    </FormSection>

                    <FormSection title="Religious Info" id="religious" activeTab={activeTab}>
                      {renderField("Denomination", "denomination")}
                      {renderField("Church", "church")}
                      {renderField("Pastor", "pastorsName")}
                      {renderField("Spirituality", "spirituality", "select", YES_NO_OPTIONS)}
                      {renderField("Details", "religiousDetail", "textarea", null, "12")}
                    </FormSection>

                    <FormSection title="Professional Info" id="professional" activeTab={activeTab}>
                      {renderField("Education", "education")}
                      {renderField("Employment", "employmentType", "select", EMPLOYMENT_TYPE_OPTIONS)}
                      {renderField("Occupation", "occupation")}
                      {renderField("Company", "companyName")}
                      {renderField("Income", "annualIncome")}
                      {renderField("College", "college")}
                    </FormSection>

                    <FormSection title="Contact Info" id="contact" activeTab={activeTab}>
                      {renderField("Address", "currentAddress", "textarea", null, "12")}
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">Country</label>
                        <select className="form-select" value={formData.citizenOf} onChange={handleCountryChange}>
                          <option value="">Select Country</option>
                          {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">State</label>
                        <select className="form-select" value={formData.state} onChange={handleStateChange} disabled={!selectedCountryCode}>
                          <option value="">Select State</option>
                          {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4">
                        <label className="form-label small fw-bold">City</label>
                        <select className="form-select" value={formData.city} onChange={handleInputChange} name="city" disabled={!selectedStateCode}>
                          <option value="">Select City</option>
                          {cityOptions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      {renderField("Phone", "phone")}
                      {renderField("Relationship", "relationship")}
                    </FormSection>

                    <FormSection title="Lifestyle" id="lifestyle" activeTab={activeTab}>
                      <CheckboxGroup
                        label="Hobbies" name="hobbies"
                        options={["Reading", "Music", "Travel", "Cooking", "Photography", "Sports", "Yoga", "Gardening"]}
                        selectedValues={formData.hobbies} onChange={handleHobbiesChange}
                      />
                      {renderField("Smoking", "smokingHabits", "select", SMOKING_DRINKING_OPTIONS)}
                      {renderField("Drinking", "drinkingHabits", "select", SMOKING_DRINKING_OPTIONS)}
                    </FormSection>

                    <FormSection title="Partner Preferences" id="partner" activeTab={activeTab}>
                      {renderField("Age From", "partnerAgeFrom", "number")}
                      {renderField("Age To", "partnerAgeTo", "number")}
                      {renderField("Height", "partnerHeight", "select", HEIGHT_OPTIONS)}
                      {renderField("Marital Status", "partnerMaritalStatus", "select", MARITAL_STATUS_OPTIONS)}
                      {renderField("Caste", "partnerCaste")}
                      {renderField("Education", "partnerEducation")}
                    </FormSection>

                    <FormSection title="Verification & Privacy" id="settings" activeTab={activeTab}>
                      <div className="col-12 mb-4">
                        <div className="bg-light p-4 rounded-3 d-flex justify-content-between align-items-center">
                          <div>
                            <h6 className="fw-bold mb-1">Profile Visibility</h6>
                            <p className="small text-muted mb-0">Manage who can see your profile</p>
                          </div>
                          <div className="btn-group border rounded-pill overflow-hidden bg-white">
                            <button className={`btn btn-sm px-4 ${formData.profileVisibility === "Public" ? "btn-primary" : "btn-light"}`} onClick={() => setFormData(p => ({ ...p, profileVisibility: "Public" }))}>Public</button>
                            <button className={`btn btn-sm px-4 ${formData.profileVisibility === "Private" ? "btn-primary" : "btn-light"}`} onClick={() => setFormData(p => ({ ...p, profileVisibility: "Private" }))}>Private</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="bg-light p-4 rounded-3">
                          <h6 className="fw-bold mb-3">ID Verification</h6>
                          <div className="row align-items-center">
                            <div className="col-md-6">
                              {idProofPreview ? (
                                <img src={idProofPreview} alt="ID" className="img-fluid rounded border shadow-sm" />
                              ) : (
                                <div className="border border-dashed p-5 text-center rounded bg-white text-muted small">No ID Uploaded</div>
                              )}
                            </div>
                            <div className="col-md-6 mt-3 mt-md-0">
                              <label className="btn btn-outline-primary w-100 mb-2">
                                <i className="fa fa-upload me-2"></i>Choose ID
                                <input type="file" className="d-none" onChange={handleIdProofChange} />
                              </label>
                              {idProofFile && (
                                <button className="btn btn-primary w-100" onClick={handleIdProofUpload} disabled={isUploadingId}>
                                  {isUploadingId ? "Uploading..." : "Submit Verification"}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </FormSection>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <CopyRights />
    </div>
  );
};

export default UserProfileEditPage;
