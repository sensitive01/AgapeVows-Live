import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { getUserById, updateUserById, uploadIdProofByAdmin } from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";
import { Country, State, City } from "country-state-city";
import BasicInfomation from "./BasicInfomation";
import profImages from "/assets/images/profiles/1.jpg";

// Define all options outside component to prevent inline array recreation
const GENDER_OPTIONS = ["Male", "Female", "Other"];
const PROFILE_CREATED_FOR_OPTIONS = ["Self", "Son", "Daughter", "Brother", "Sister", "Friend"];
const MARITAL_STATUS_OPTIONS = ["Never Married", "Divorced", "Awaiting Divorce", "Widow/Widower"];
const HEIGHT_OPTIONS = ["4ft", "4ft 1in", "4ft 2in", "4ft 3in", "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in", "7ft"];
const BODY_TYPE_OPTIONS = ["Average", "Slim", "Athletic", "Heavy"];
const COMPLEXION_OPTIONS = ["Fair", "Very Fair", "Wheatish", "Dark"];
const EATING_HABITS_OPTIONS = ["Vegetarian", "Non-Vegetarian", "Eggetarian"];
const FAMILY_VALUE_OPTIONS = ["Traditional", "Moderate", "Liberal"];
const FAMILY_TYPE_OPTIONS = ["Joint", "Nuclear"];
const FAMILY_STATUS_OPTIONS = ["Middle Class", "Upper Middle Class", "Rich", "Affluent"];
const EMPLOYMENT_TYPE_OPTIONS = ["Government", "Private", "Business", "Self Employed", "Not Working"];
const YES_NO_OPTIONS = ["No", "Yes", "Occasionally"];
const RELATIONSHIP_OPTIONS = ["Self", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Relative", "Friend", "Other"];

// Memoized InputField component - prevents re-render on parent state changes
const InputField = React.memo(({ label, name, type = "text", options = null, col = "6", value, onChange }) => (
  <div className={`col-md-${col}`}>
    <label className="form-label small fw-bold text-muted">{label}</label>
    {options ? (
      <select className="form-select" name={name} value={value || ""} onChange={onChange}>
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea className="form-control" name={name} value={value || ""} onChange={onChange} rows="3" />
    ) : (
      <input type={type} className="form-control" name={name} value={value || ""} onChange={onChange} />
    )}
  </div>
));

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
            dateOfBirth: userData.dateOfBirth?.split("T")[0] || "",
            hobbies: Array.isArray(userData.hobbies) ? userData.hobbies : [],
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
  const renderField = (label, name, type = "text", options = null, col = "6") => (
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
                <h3 className="fw-bold mb-0">Edit User Profile</h3>
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
                {renderField("Gender", "gender", "text", ["Male", "Female", "Other"], "6")}
                {renderField("Profile Created For", "profileCreatedFor", "text", ["Self", "Son", "Daughter", "Brother", "Sister", "Friend"], "6")}
                {renderField("Marital Status", "maritalStatus", "text", ["Never Married", "Divorced", "Awaiting Divorce", "Widow/Widower"], "6")}
                {renderField("Height", "height", "text", ["4ft", "4ft 1in", "4ft 2in", "4ft 3in", "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in", "7ft"], "6")}
                {renderField("Weight", "weight", "text", null, "6")}
                {renderField("Body Type", "bodyType", "text", ["Average", "Slim", "Athletic", "Heavy"], "6")}
                {renderField("Complexion", "complexion", "text", ["Fair", "Very Fair", "Wheatish", "Dark"], "6")}
                {renderField("Physical State", "physicalStatus", "text", ["Normal", "Physically Challenged"], "6")}
                {renderField("Age", "age", "number", null, "6")}
                {renderField("Eating Habits", "eatingHabits", "text", ["Vegetarian", "Non-Vegetarian", "Eggetarian"], "6")}
                {renderField("Drinking Habits", "drinkingHabits", "text", ["No", "Yes", "Occasionally"], "6")}
                {renderField("Smoking Habits", "smokingHabits", "text", ["No", "Yes", "Occasionally"], "6")}
                {renderField("Mother Tongue", "motherTongue", "text", null, "6")}
                {renderField("Caste", "caste", "text", null, "6")}
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
                {renderField("Father's Occupation", "fathersOccupation", "text", null, "6")}
                {renderField("Mother's Name", "mothersName", "text", null, "6")}
                {renderField("Mother's Occupation", "mothersOccupation", "text", null, "6")}
                {renderField("Father's Profession", "fathersProfession", "text", null, "6")}
                {renderField("Mother's Profession", "mothersProfession", "text", null, "6")}
                {renderField("Fathers' Native", "fathersNative", "text", null, "6")}
                {renderField("Mothers' Native", "mothersNative", "text", null, "6")}
                {renderField("Family Value", "familyValue", "text", ["Traditional", "Moderate", "Liberal"], "6")}
                {renderField("Family Type", "familyType", "text", ["Joint", "Nuclear"], "6")}
                {renderField("Residence type", "residenceType", "text", ["Apartment", "House", "Villa", "Townhouse", "Condo", "Duplex", "Other"], "6")}
                {renderField("Family Status", "familyStatus", "text", ["Middle Class", "Upper Middle Class", "Rich", "Affluent"], "6")}
                {renderField("No. of Brothers", "numberOfBrothers", "number", null, "6")}
                {renderField("Married Brothers", "marriedBrothers", "number", null, "6")}
                {renderField("No. of Sisters", "numberOfSisters", "number", null, "6")}
                {renderField("Married Sisters", "marriedSisters", "number", null, "6")}
              </FormSection>

              {/* RELIGIOUS */}
              <FormSection title="Religious Information" id="religious" activeTab={activeTab}>
                {renderField("Denomination", "denomination", "text", null, "6")}
                {renderField("Church Name", "church", "text", null, "6")}
                {renderField("Church Activity", "churchActivity", "text", null, "6")}
                {renderField("Pastors Name", "pastorsName", "text", null, "6")}
                {renderField("Spirituality", "spirituality", "text", null, "6")}
                {renderField("Religious Detail", "religiousDetail", "textarea", null, "12")}
              </FormSection>

              {/* PROFESSIONAL */}
              <FormSection title="Professional Information" id="professional" activeTab={activeTab}>
                {renderField("Highest Education", "education", "text", null, "6")}
                {renderField("Additional Education", "additionalEducation", "text", null, "6")}
                {renderField("College", "college", "text", null, "6")}
                {renderField("Education in Detail", "educationDetail", "textarea", null, "12")}
                {renderField("Employee Type", "employmentType", "text", ["Government", "Private", "Business", "Self Employed", "Not Working"], "6")}
                {renderField("Position", "position", "text", null, "6")}
                {renderField("Occupation", "occupation", "text", null, "6")}
                {renderField("Company Name", "companyName", "text", null, "6")}
                {renderField("Annual Income", "annualIncome", "text", null, "6")}
              </FormSection>

              {/* CONTACT */}
              <FormSection title="Contact Information" id="contact" activeTab={activeTab}>
                {renderField("Contact Person Name", "contactPersonName", "text", null, "6")}
                {renderField("Relationship", "relationship", "text", RELATIONSHIP_OPTIONS, "6")}
                {renderField("Alternate Mobile", "alternateMobile", "text", null, "6")}
                {renderField("Alternate Email", "alternateEmail", "email", null, "6")}
                {renderField("Landline", "landlineNumber", "text", null, "6")}
                <div className="col-12 mt-4">
                  <h6 className="fw-bold border-bottom pb-2">Current Address</h6>
                </div>
                {renderField("Door / Flat No (Name), Street", "currentDoorNo", "text", null, "6")}
                {renderField("Locality / Area", "currentLocality", "text", null, "6")}
                {renderField("Country", "currentCountry", "text", null, "6")}
                {renderField("State", "currentState", "text", null, "6")}
                {renderField("District", "currentDistrict", "text", null, "6")}
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
                {renderField("Country", "permanentCountry", "text", null, "6")}
                {renderField("State", "permanentState", "text", null, "6")}
                {renderField("District", "permanentDistrict", "text", null, "6")}
                {renderField("Pincode", "permanentPincode", "text", null, "6")}
              </FormSection>

              {/* LIFESTYLE */}
              <FormSection title="Life style" id="lifestyle" activeTab={activeTab}>
                {renderField("Hobbies", "hobbies", "text", null, "6")}
                {renderField("Interests", "interests", "text", null, "6")}
                {renderField("Music", "music", "text", null, "6")}
                {renderField("Favorite Reads", "favouriteReads", "text", null, "6")}
                {renderField("Favorite Cuisines", "favouriteCuisines", "text", null, "6")}
                {renderField("Exercise", "exercise", "text", null, "6")}
                {renderField("Sport Activities", "sportsActivities", "text", null, "6")}
                {renderField("Dress Style", "dressStyles", "text", null, "6")}
              </FormSection>

              {/* PARTNER PREFERENCES */}
              <FormSection title="Partner preference" id="partner" activeTab={activeTab}>
                {renderField("Age From", "partnerAgeFrom", "number", null, "6")}
                {renderField("Age To", "partnerAgeTo", "number", null, "6")}
                {renderField("Desired Height From", "partnerHeight", "text", null, "6")}
                {renderField("Desired Height To", "partnerHeightTo", "text", null, "6")}
                {renderField("Preferred Marital Status", "partnerMaritalStatus", "text", null, "6")}
                {renderField("Preferred Mother Tongue", "partnerMotherTongue", "text", null, "6")}
                {renderField("Preferred Caste", "partnerCaste", "text", null, "6")}
                {renderField("Preferred Physical Status", "partnerPhysicalStatus", "text", null, "6")}
                {renderField("Preferred Eating Habits", "partnerEatingHabits", "text", null, "6")}
                {renderField("Preferred Drinking Habits", "partnerDrinkingHabits", "text", null, "6")}
                {renderField("Preferred Smoking Habits", "partnerSmokingHabits", "text", null, "6")}
                {renderField("Preferred Denomination", "partnerDenomination", "text", null, "6")}
                {renderField("Preferred Spirituality", "partnerSpirituality", "text", null, "6")}
              </FormSection>

              {/* PARTNER PREFERENCES - PROFESSIONAL */}
              <FormSection title="Partner Preferences - Professional" id="partner_professional" activeTab={activeTab}>
                {renderField("Preferred Education", "partnerEducation", "text", null, "6")}
                {renderField("Preferred Employment Type", "partnerEmploymentType", "text", null, "6")}
                {renderField("Preferred Occupation", "partnerOccupation", "text", null, "6")}
                {renderField("Annual Income From", "partnerAnnualIncomeFrom", "text", null, "6")}
                {renderField("Annual Income To", "partnerAnnualIncomeTo", "text", null, "6")}
              </FormSection>

              {/* PARTNER PREFERENCES - LOCATION */}
              <FormSection title="Partner Preferences - location" id="partner_location" activeTab={activeTab}>
                {renderField("Preferred Country", "partnerCountry", "text", null, "6")}
                {renderField("Preferred State", "partnerState", "text", null, "6")}
                {renderField("Preferred District", "partnerDistrict", "text", null, "6")}
              </FormSection>

              {/* UPLOAD PROOF */}
              <FormSection title="Upload Proof" id="upload_proof" activeTab={activeTab}>
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
