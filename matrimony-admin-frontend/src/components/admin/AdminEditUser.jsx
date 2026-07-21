import Select from "react-select";
import React, { useEffect, useState, useCallback } from "react";
import { DROPDOWN_OPTIONS } from "../../utils/dropdownOptions";
import { useParams, useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { getUserById, updateUserById, uploadIdProofByAdmin, getAllMasterData, uploadUserImagesAdmin } from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";
import { Country, State, City } from "country-state-city";
import BasicInfomation from "./BasicInfomation";
import profImages from "/assets/images/profiles/1.jpg";


const InputField = React.memo(({ label, name, type = "text", options = null, isMulti = false, col = "6", value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;
  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: '38px',
      borderColor: '#dee2e6',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#dee2e6'
      }
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  const getSelectValue = () => {
    if (isMulti) {
      if (Array.isArray(value)) {
        return value.map(val => ({ value: val, label: val }));
      }
      return [];
    }
    return value ? { value: value, label: value } : null;
  };

  return (
    <div className={`col-md-${col}`}>
      <label className="form-label small fw-bold text-muted">{label}</label>
      {options ? (
        <Select
          isMulti={isMulti}
          options={options.map(opt => ({ value: opt, label: opt }))}
          value={getSelectValue()}
          onChange={(selectedOption) => {
            let val;
            if (isMulti) {
              val = selectedOption ? selectedOption.map(opt => opt.value) : [];
            } else {
              val = selectedOption ? selectedOption.value : '';
            }
            onChange({ target: { name, value: val } });
          }}
          placeholder={`Select ${label}`}
          styles={customStyles}
          isClearable
          menuPortalTarget={document.body}
        />
      ) : type === "textarea" ? (
        <textarea className="form-control" name={name} value={value || ""} onChange={onChange} rows="3" />
      ) : (
        <div className="position-relative">
          <input type={inputType} className="form-control" name={name} value={value || ""} onChange={onChange} style={isPasswordField ? { paddingRight: "40px" } : {}} />
          {isPasswordField && (
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted px-3"
              style={{ textDecoration: 'none', zIndex: 10 }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

const FormSection = ({ title, children, id, activeTab }) => (
  <div className={`tab-pane fade ${activeTab === id ? "show active" : ""}`} id={id} role="tabpanel">
    <div className="card border-0 p-4">
      <h5 className="fw-bold mb-4 border-bottom pb-2">{title}</h5>
      <div className="row g-3">{children}</div>
    </div>
  </div>
);

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const [formData, setFormData] = useState({
    // --- Authentication ---
    userName: "",
    userEmail: "",
    userMobile: "",
// --- Basic Info ---
    aboutMe: "",
    gender: "",
    profileCreatedFor: "",
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

    // --- Family Details ---
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
    familyDetails: "",
    numberOfBrothers: "",
    marriedBrothers: "",
    numberOfSisters: "",
    marriedSisters: "",

    // --- Religious Info ---
    religion: "",
    denomination: "",
    church: "",
    churchActivity: "",
    pastorsName: "",
    spirituality: "",
    religiousDetail: "",

    // --- Contact Info ---
    alternateMobile: "",
    alternateEmail: "",
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

    // --- Professional Info ---
    education: "",
    additionalEducation: "",
    college: "",
    educationDetail: "",
    employmentType: "",
    occupation: "",
    position: "",
    companyName: "",
    annualIncome: "",

    // --- Lifestyle ---
    exercise: "",
    hobbies: [],
    interests: "",
    music: "",
    favouriteReads: "",
    favouriteCuisines: "",
    sportsActivities: "",
    dressStyles: "",

    // --- Partner Preferences ---
    partnerAgeFrom: "",
    partnerAgeTo: "",
    partnerHeight: "",
    partnerHeightTo: "",
    partnerMaritalStatus: "",
    partnerMotherTongue: "",
    partnerCaste: "",
    partnerPhysicalStatus: "",
    partnerEatingHabits: "",
    partnerDrinkingHabits: "",
    partnerSmokingHabits: "",
    partnerDenomination: "",
    partnerSpirituality: "",
    partnerEducation: "",
    partnerEmploymentType: "",
    partnerOccupation: "",
    partnerAnnualIncomeFrom: "",
    partnerAnnualIncomeTo: "",
    partnerCountry: "",
    partnerState: "",
    partnerDistrict: "",

    // --- Profile Visibility ---
    profileVisibility: "Public",

    // --- Upload Proof ---
    idProofType: "",
    idProofNumber: "",
  });

  // --- Profile Images ---
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState([]);
  const [idProofFile, setIdProofFile] = useState(null);
  const [deletedAdditionalImages, setDeletedAdditionalImages] = useState([]);

  // --- Location Helpers (simplified for now to avoid complexity of nested loops) ---
  const allCountries = Country.getAllCountries();

  // --- Master Data ---
  const [casteOptions, setCasteOptions] = useState([]);
  const [denominationOptions, setDenominationOptions] = useState([]);

  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        const res = await getAllMasterData();
        if (res.data?.success) {
          const fetchedCastes = res.data.data
            .filter((c) => c.type === "caste" && c.isActive)
            .map((c) => c.name)
            .sort((a, b) => a.localeCompare(b));
          const fetchedDenominations = res.data.data
            .filter((d) => d.type === "denomination" && d.isActive)
            .map((d) => d.name)
            .sort((a, b) => a.localeCompare(b));
          setCasteOptions(fetchedCastes);
          setDenominationOptions(fetchedDenominations);
        }
      } catch (err) {
        console.error("Failed to fetch master data", err);
      }
    };
    fetchMasterData();
  }, []);

  // --- Fetch user data ---
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        if (response.status === 200) {
          const userData = response.data.data;
          console.log("AdminEditUser: Fetched user data:", userData);

          // Map backend fields to local formData
          setFormData({
            ...userData,
            userName: userData.userName || "",
            userEmail: userData.userEmail || "",
            userMobile: userData.userMobile || "",
            familyStatus: userData.familyStatus || "",
            residenceType: userData.residenceType || "",
            familyDetails: userData.familyDetails || "",
            dateOfBirth: userData.dateOfBirth?.split("T")[0] || "",
            hobbies: Array.isArray(userData.hobbies) ? userData.hobbies : [],
            idProofType: userData.idProofType || "",
            idProofNumber: userData.idProofNumber || "",
          });

          if (userData.profileImage) setProfileImagePreview(userData.profileImage);
          if (userData.additionalImages?.length > 0) {
            setAdditionalImagePreviews(userData.additionalImages.map(url => ({ url, isExisting: true })));
          }
        }
      } catch (err) {
        console.error("Error loading user:", err);
        showAlert({
          title: "Error",
          text: "Failed to load user data",
          icon: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDeleteProfileImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => ({ url: URL.createObjectURL(file), file }));
    setAdditionalImageFiles(prev => [...prev, ...files]);
    setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeAdditionalImage = (index) => {
    const removed = additionalImagePreviews[index];
    if (removed.isExisting) {
      setDeletedAdditionalImages(prev => [...prev, removed.url]);
    }
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
    if (!removed.isExisting) {
      setAdditionalImageFiles(prev => prev.filter(f => f !== removed.file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await updateUserById(id, formData);
        
      if (idProofFile) {
        const idFormData = new FormData();
        idFormData.append("idProof", idProofFile);
        await uploadIdProofByAdmin(id, idFormData);
      }

      if (profileImageFile || additionalImageFiles.length > 0) {
        const imageFormData = new FormData();
        if (profileImageFile) {
          imageFormData.append("profileImage", profileImageFile);
        }
        if (additionalImageFiles.length > 0) {
          additionalImageFiles.forEach(file => {
            imageFormData.append("additionalImages", file);
          });
        }
        await uploadUserImagesAdmin(id, imageFormData);
      }

      if (response.status === 200) {
        showAlert({
          title: "Success",
          text: "User updated successfully",
          icon: "success",
        });
        navigate(-1);
      }
    } catch (err) {
      console.error("Update error:", err);
      showAlert({
        title: "Error",
        text: "Failed to update user",
        icon: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return (
    <NewLayout>
      <div className="text-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </NewLayout>
  );


  // Helper to create InputField with automatic props
  const renderField = (label, name, type = "text", options = null, col = "6", isMulti = false) => (
    <InputField
      key={name}
      label={label}
      name={name}
      type={type}
      options={options}
      col={col}
      value={formData[name]}
      onChange={handleChange}
    />
  );

  return (
    <NewLayout>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="fw-bold mb-0">Edit User Profile {formData?.agwid ? `- ${formData.agwid}` : ""}</h3>
                <p className="text-muted small mb-0">Modify full details for {formData.userName}</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm px-4 rounded-pill" onClick={() => navigate(-1)}>Cancel</button>
                <button className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm" onClick={handleSubmit} disabled={updating}>
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            <div className="px-4 pt-4">
              <ul className="nav nav-tabs border-0" id="profileTabs" role="tablist">
                {[
                  { id: "basic", label: "Basic Details", icon: "fa-user-plus" },
                  { id: "gallery", label: "Gallery", icon: "fa-image" },
                  { id: "family", label: "Family Details", icon: "fa-users" },
                  { id: "religious", label: "Religious Information", icon: "fa-book" },
                  { id: "professional", label: "Professional Information", icon: "fa-briefcase" },
                  { id: "contact", label: "Contact Information", icon: "fa-phone" },
                  { id: "lifestyle", label: "Life style", icon: "fa-heart" },
                  { id: "partner", label: "Partner preference", icon: "fa-handshake-o" },
                  { id: "partner_professional", label: "Partner Preferences - Professional", icon: "fa-briefcase" },
                  { id: "partner_location", label: "Partner Preferences - location", icon: "fa-map-marker" },
                  { id: "upload_proof", label: "Upload Proof", icon: "fa-id-card" }
                ].map((tab) => (
                  <li className="nav-item" key={tab.id}>
                    <button
                      className={`nav-link border-0 rounded-top-4 px-4 py-3 ${activeTab === tab.id ? "active bg-white fw-bold shadow-sm" : "text-muted"}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      <i className={`fa ${tab.icon} me-2`}></i>{tab.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="tab-content" id="profileTabsContent">
              {/* AUTH & BASIC INFO */}
              <FormSection title="Basic Details" id="basic" activeTab={activeTab}>
                {renderField("Full Name", "userName", "text", null, "6")}
                {renderField("Email Address", "userEmail", "email", null, "6")}
                {renderField("Mobile Number", "userMobile", "text", null, "6")}
                {renderField("Account Password", "password", "password", null, "6")}
                {renderField("About Me", "aboutMe", "textarea", null, "12")}
                {renderField("Date of Birth", "dateOfBirth", "date", null, "6")}
                {renderField("Gender", "gender", "text", DROPDOWN_OPTIONS.gender, "6")}
                {renderField("Profile Created By", "profileCreatedFor", "text", DROPDOWN_OPTIONS.profileCreatedFor, "6")}
                {renderField("Marital Status", "maritalStatus", "text", DROPDOWN_OPTIONS.maritalStatus, "6")}
                {renderField("Height", "height", "text", DROPDOWN_OPTIONS.height, "6")}
                {renderField("Weight", "weight", "text", Array.from({ length: 101 }, (_, i) => String(i + 40)), "6")}
                {renderField("Body Type", "bodyType", "text", DROPDOWN_OPTIONS.bodyType, "6")}
                {renderField("Complexion", "complexion", "text", DROPDOWN_OPTIONS.complexion, "6")}
                {renderField("Physical State", "physicalStatus", "text", DROPDOWN_OPTIONS.physicalStatus, "6")}
                {renderField("Age", "age", "text", Array.from({ length: 53 }, (_, i) => String(i + 18)), "6")}
                {renderField("Eating Habits", "eatingHabits", "text", DROPDOWN_OPTIONS.eatingHabits, "6")}
                {renderField("Drinking Habits", "drinkingHabits", "text", DROPDOWN_OPTIONS.drinkingHabits, "6")}
                {renderField("Smoking Habits", "smokingHabits", "text", DROPDOWN_OPTIONS.smokingHabits, "6")}
                {renderField("Mother Tongue", "motherTongue", "text", DROPDOWN_OPTIONS.motherTongue, "6")}
                {renderField("Caste", "caste", "text", casteOptions, "6")}
              </FormSection>

              {/* GALLERY */}
              <div className={`tab-pane fade ${activeTab === "gallery" ? "show active" : ""}`} id="gallery">
                <div className="card border-0 p-4 text-center">
                  <p className="text-muted mb-4 small">Upload a profile picture and additional gallery images.</p>
                  <BasicInfomation
                    profileImagePreview={profileImagePreview}
                    handleProfileImageChange={handleProfileImageChange}
                    handleAdditionalImagesChange={handleAdditionalImagesChange}
                    additionalImagePreviews={additionalImagePreviews}
                    removeAdditionalImage={removeAdditionalImage}
                    handleDeleteProfileImage={handleDeleteProfileImage}
                  />
                </div>
              </div>

              {/* FAMILY */}
              <FormSection title="Family Details" id="family" activeTab={activeTab}>
                {renderField("Father's Name", "fathersName", "text", null, "6")}
                {renderField("Father's Occupation", "fathersOccupation", "text", ["Retired", "Business", "Government Employee", "Private Employee", "Professional", "Farmer", "Homemaker", "Others"], "6")}
                {renderField("Mother's Name", "mothersName", "text", null, "6")}
                {renderField("Mother's Occupation", "mothersOccupation", "text", ["Retired", "Business", "Government Employee", "Private Employee", "Professional", "Farmer", "Homemaker", "Others"], "6")}
                {renderField("Father's Profession", "fathersProfession", "text", null, "6")}
                {renderField("Mother's Profession", "mothersProfession", "text", null, "6")}
                {renderField("Fathers' Native", "fathersNative", "text", null, "6")}
                {renderField("Mothers' Native", "mothersNative", "text", null, "6")}
                {renderField("Family Value", "familyValue", "text", DROPDOWN_OPTIONS.familyValue, "6")}
                {renderField("Family Type", "familyType", "text", DROPDOWN_OPTIONS.familyType, "6")}
                {renderField("Residence type", "residenceType", "text", DROPDOWN_OPTIONS.residenceType, "6")}
                {renderField("Family Status", "familyStatus", "text", DROPDOWN_OPTIONS.familyStatus, "6")}
                {renderField("No. of Brothers", "numberOfBrothers", "number", null, "6")}
                {renderField("Married Brothers", "marriedBrothers", "number", null, "6")}
                {renderField("No. of Sisters", "numberOfSisters", "number", null, "6")}
                {renderField("Married Sisters", "marriedSisters", "number", null, "6")}
                {renderField("Additional Family Details", "familyDetails", "textarea", null, "12")}
              </FormSection>

              {/* RELIGIOUS */}
              <FormSection title="Religious Information" id="religious" activeTab={activeTab}>
                {renderField("Denomination", "denomination", "text", denominationOptions, "6")}
                {renderField("Church Name", "church", "text", null, "6")}
                {renderField("Church Activity", "churchActivity", "text", DROPDOWN_OPTIONS.churchActivity, "6")}
                {renderField("Pastors Name", "pastorsName", "text", null, "6")}
                {renderField("Spirituality", "spirituality", "text", DROPDOWN_OPTIONS.spirituality, "6")}
                {renderField("Religious Detail", "religiousDetail", "textarea", null, "12")}
              </FormSection>

              {/* PROFESSIONAL */}
              <FormSection title="Professional Information" id="professional" activeTab={activeTab}>
                {renderField("Highest Education", "education", "text", DROPDOWN_OPTIONS.education, "6")}
                {renderField("Additional Education", "additionalEducation", "text", DROPDOWN_OPTIONS.additionalEducation, "6")}
                {renderField("College", "college", "text", null, "6")}
                {renderField("Education in Detail", "educationDetail", "textarea", null, "12")}
                {renderField("Employee Type", "employmentType", "text", DROPDOWN_OPTIONS.employmentType, "6")}
                {renderField("Position", "position", "text", null, "6")}
                {renderField("Occupation", "occupation", "text", DROPDOWN_OPTIONS.occupation, "6")}
                {renderField("Company Name", "companyName", "text", null, "6")}
                {renderField("Annual Income", "annualIncome", "text", DROPDOWN_OPTIONS.annualIncome, "6")}
              </FormSection>

              {/* CONTACT */}
              <FormSection title="Contact Information" id="contact" activeTab={activeTab}>
                {renderField("Contact Person Name", "contactPersonName", "text", null, "6")}
                {renderField("Relationship", "relationship", "text", DROPDOWN_OPTIONS.relationship, "6")}
                {renderField("Citizen Of", "citizenOf", "text", Country.getAllCountries().map(c => c.name), "6")}
                {renderField("Alternate Mobile", "alternateMobile", "text", null, "6")}
                {renderField("Alternate Email", "alternateEmail", "email", null, "6")}
                {renderField("Landline", "landlineNumber", "text", null, "6")}
                <div className="col-12 mt-4">
                  <h6 className="fw-bold border-bottom pb-2">Current Address</h6>
                </div>
                {renderField("Door / Flat No (Name), Street", "currentDoorNo", "text", null, "6")}
                {renderField("Locality / Area", "currentLocality", "text", null, "6")}
                {renderField("Country", "currentCountry", "text", Country.getAllCountries().map(c => c.name), "6")}
                {renderField("State", "currentState", "text", formData.currentCountry ? State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "").map(s => s.name) : [], "6")}
                {renderField("District", "currentDistrict", "text", formData.currentState ? City.getCitiesOfState(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "", State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "").find(s => s.name === formData.currentState)?.isoCode || "").map(city => city.name) : [], "6")}
                {renderField("Pincode", "currentPincode", "text", null, "6")}

                <div className="col-12 mt-4">
                  <div className="d-flex align-items-center border-bottom pb-2">
                    <h6 className="fw-bold mb-0">Permanent Address</h6>
                    <div className="form-check ms-3">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        id="sameAsCurrentAddress" 
                        name="sameAsCurrentAddress"
                        checked={formData.sameAsCurrentAddress}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setFormData(prev => {
                            const updated = { ...prev, sameAsCurrentAddress: checked };
                            if (checked) {
                              updated.permanentDoorNo = prev.currentDoorNo;
                              updated.permanentLocality = prev.currentLocality;
                              updated.permanentCountry = prev.currentCountry;
                              updated.permanentState = prev.currentState;
                              updated.permanentDistrict = prev.currentDistrict;
                              updated.permanentPincode = prev.currentPincode;
                            } else {
                              updated.permanentDoorNo = "";
                              updated.permanentLocality = "";
                              updated.permanentCountry = "";
                              updated.permanentState = "";
                              updated.permanentDistrict = "";
                              updated.permanentPincode = "";
                            }
                            return updated;
                          });
                        }}
                      />
                      <label className="form-check-label small" htmlFor="sameAsCurrentAddress">
                        Same as current address
                      </label>
                    </div>
                  </div>
                </div>
                {renderField("Door / Flat No (Name), Street", "permanentDoorNo", "text", null, "6")}
                {renderField("Locality / Area", "permanentLocality", "text", null, "6")}
                {renderField("Country", "permanentCountry", "text", Country.getAllCountries().map(c => c.name), "6")}
                {renderField("State", "permanentState", "text", formData.permanentCountry ? State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "").map(s => s.name) : [], "6")}
                {renderField("District", "permanentDistrict", "text", formData.permanentState ? City.getCitiesOfState(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "", State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "").find(s => s.name === formData.permanentState)?.isoCode || "").map(city => city.name) : [], "6")}
                {renderField("Pincode", "permanentPincode", "text", null, "6")}
              </FormSection>

              {/* LIFESTYLE */}
              <FormSection title="Life style" id="lifestyle" activeTab={activeTab}>
                {renderField("Hobbies", "hobbies", "text", ["Reading", "Sports", "Music", "Traveling", "Cooking", "Photography", "Dancing", "Gaming", "Painting", "Writing", "Gardening", "Yoga"], "6", true)}
                {renderField("Interests", "interests", "text", null, "6")}
                {renderField("Music", "music", "text", null, "6")}
                {renderField("Favorite Reads", "favouriteReads", "text", null, "6")}
                {renderField("Favorite Cuisines", "favouriteCuisines", "text", null, "6")}
                {renderField("Exercise", "exercise", "text", DROPDOWN_OPTIONS.exercise, "6")}
                {renderField("Sport Activities", "sportsActivities", "text", null, "6")}
                {renderField("Dress Style", "dressStyles", "text", null, "6")}
              </FormSection>

              {/* PARTNER PREFERENCES */}
              <FormSection title="Partner preference" id="partner" activeTab={activeTab}>
                {renderField("Age From", "partnerAgeFrom", "text", Array.from({ length: 53 }, (_, i) => String(i + 18)), "6")}
                {renderField("Age To", "partnerAgeTo", "text", Array.from({ length: 53 }, (_, i) => String(i + 18)), "6")}
                {renderField("Desired Height From", "partnerHeight", "text", DROPDOWN_OPTIONS.height, "6")}
                {renderField("Desired Height To", "partnerHeightTo", "text", DROPDOWN_OPTIONS.height, "6")}
                {renderField("Preferred Marital Status", "partnerMaritalStatus", "text", DROPDOWN_OPTIONS.partnerMaritalStatus, "6", true)}
                {renderField("Preferred Mother Tongue", "partnerMotherTongue", "text", DROPDOWN_OPTIONS.partnerMotherTongue, "6", true)}
                {renderField("Preferred Caste", "partnerCaste", "text", casteOptions, "6", true)}
                {renderField("Preferred Physical Status", "partnerPhysicalStatus", "text", DROPDOWN_OPTIONS.partnerPhysicalStatus, "6", true)}
                {renderField("Preferred Eating Habits", "partnerEatingHabits", "text", DROPDOWN_OPTIONS.partnerEatingHabits, "6", true)}
                {renderField("Preferred Drinking Habits", "partnerDrinkingHabits", "text", DROPDOWN_OPTIONS.partnerDrinkingHabits, "6", true)}
                {renderField("Preferred Smoking Habits", "partnerSmokingHabits", "text", DROPDOWN_OPTIONS.partnerSmokingHabits, "6", true)}
                {renderField("Preferred Denomination", "partnerDenomination", "text", denominationOptions, "6", true)}
                {renderField("Preferred Spirituality", "partnerSpirituality", "text", DROPDOWN_OPTIONS.partnerSpirituality, "6", true)}
              </FormSection>

              {/* PARTNER PREFERENCES - PROFESSIONAL */}
              <FormSection title="Partner Preferences - Professional" id="partner_professional" activeTab={activeTab}>
                {renderField("Preferred Education", "partnerEducation", "text", DROPDOWN_OPTIONS.partnerEducation, "6", true)}
                {renderField("Preferred Employment Type", "partnerEmploymentType", "text", DROPDOWN_OPTIONS.partnerEmploymentType, "6", true)}
                {renderField("Preferred Occupation", "partnerOccupation", "text", DROPDOWN_OPTIONS.partnerOccupation, "6", true)}
                {renderField("Annual Income From", "partnerAnnualIncomeFrom", "text", ["50 Thousand", "1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore"], "6")}
                {renderField("Annual Income To", "partnerAnnualIncomeTo", "text", ["1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore", "Above 1 Crore"], "6")}
              </FormSection>

              {/* PARTNER PREFERENCES - LOCATION */}
                <FormSection title="Partner Preferences - location" id="partner_location" activeTab={activeTab}>
                  <InputField 
                    label="Preferred Country" 
                    name="partnerCountry" 
                    isMulti 
                    options={Country.getAllCountries().map(c => c.name)} 
                    value={formData.partnerCountry} 
                    onChange={handleChange} 
                  />
                  <InputField 
                    label="Preferred State" 
                    name="partnerState" 
                    isMulti 
                    options={
                      (formData.partnerCountry && formData.partnerCountry.length > 0)
                        ? Array.from(new Set(formData.partnerCountry.flatMap(cName => {
                            const c = Country.getAllCountries().find(curr => curr.name === cName);
                            return c ? State.getStatesOfCountry(c.isoCode).map(s => s.name) : [];
                          })))
                        : State.getStatesOfCountry("IN").map(s => s.name)
                    } 
                    value={formData.partnerState} 
                    onChange={handleChange} 
                  />
                  <InputField 
                    label="Preferred District" 
                    name="partnerDistrict" 
                    isMulti 
                    options={
                      (formData.partnerState && formData.partnerState.length > 0)
                        ? Array.from(new Set(formData.partnerState.flatMap(sName => {
                            const allCountries = Country.getAllCountries();
                            const countriesToSearch = (formData.partnerCountry && formData.partnerCountry.length > 0)
                              ? allCountries.filter(c => formData.partnerCountry.includes(c.name))
                              : allCountries.filter(c => c.isoCode === "IN");
                            return countriesToSearch.flatMap(c => {
                              const s = State.getStatesOfCountry(c.isoCode).find(state => state.name === sName);
                              return s ? City.getCitiesOfState(c.isoCode, s.isoCode).map(city => city.name) : [];
                            });
                          })))
                        : []
                    }
                    value={formData.partnerDistrict} 
                    onChange={handleChange} 
                  />
                </FormSection>

              {/* UPLOAD PROOF */}
              <FormSection title="Upload Proof" id="upload_proof" activeTab={activeTab}>
                {renderField("ID Proof Type", "idProofType", "text", ["Aadhar Card", "Passport"], "6")}
                {renderField("ID Proof Number", "idProofNumber", "text", null, "6")}
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold text-muted">ID Proof Document</label>
                  <input
                    type="file"
                    className="form-control bg-light"
                    accept="image/*,.pdf"
                    onChange={(e) => setIdProofFile(e.target.files[0])}
                  />
                  {idProofFile && <small className="text-success mt-1 d-block">File selected: {idProofFile.name}</small>}
                  {!idProofFile && formData.idProofDocument && (
                    <small className="text-muted mt-1 d-block">Current: <a href={formData.idProofDocument} target="_blank" rel="noreferrer">View File</a></small>
                  )}
                </div>
              </FormSection>
            </div>
            
            <div className="card-footer bg-white p-4 border-0 d-flex justify-content-end gap-3 mt-4">
              <button className="btn btn-light px-5 rounded-pill" onClick={() => navigate(-1)}>Discard</button>
              <button className="btn btn-primary px-5 rounded-pill shadow" onClick={handleSubmit} disabled={updating}>
                {updating ? "Updating..." : "Save All Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminEditUser;
