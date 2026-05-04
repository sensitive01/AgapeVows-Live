import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { Country, State, City } from "country-state-city";
import BasicInfomation from "./BasicInfomation";
import * as XLSX from "xlsx";
import { Modal } from "react-bootstrap";
import { registerUserByAdmin, bulkRegisterUsersByAdmin } from "../../api/service/adminServices";
import { showAlert } from "../../utils/alertService";

const FormSection = ({ title, children, id, activeTab }) => (
  <div className={`tab-pane fade ${activeTab === id ? "show active" : ""}`} id={id} role="tabpanel">
    <div className="card border-0 p-4">
      <h5 className="fw-bold mb-4 border-bottom pb-2">{title}</h5>
      <div className="row g-3">{children}</div>
    </div>
  </div>
);

const InputField = ({ label, name, type = "text", options = null, col = "6", required = false, formData, handleChange }) => (
  <div className={`col-md-${col}`}>
    <label className="form-label small fw-bold text-muted">{label} {required && <span className="text-danger">*</span>}</label>
    {options ? (
      <select className="form-select" name={name} value={formData[name] || ""} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>
    ) : type === "textarea" ? (
      <textarea className="form-control" name={name} value={formData[name] || ""} onChange={handleChange} rows="3" />
    ) : (
      <input type={type} className="form-control" name={name} value={formData[name] || ""} onChange={handleChange} required={required} />
    )}
  </div>
);
InputField.displayName = 'InputField';

const RELATIONSHIP_OPTIONS = ["Self", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Relative", "Friend", "Other"];
const AdminAddNewUser = () => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [bulkData, setBulkData] = useState([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const [formData, setFormData] = useState({
    // --- Authentication ---
    userName: "",
    userEmail: "",
    userMobile: "",
    password: "",
    confirmPassword: "",

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
    fathersNative: "",
    mothersNative: "",
    familyValue: "",
    familyType: "",
    familyStatus: "",
    residenceType: "",
    numberOfBrothers: "",
    numberOfSisters: "",

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
    landlineNumber: "",
    currentAddress: "",
    permanentAddress: "",
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
    partnerAnnualIncome: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
    setAdditionalImageFiles(prev => prev.filter(f => f !== removed.file));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setBulkData(data);
    };
    reader.readAsBinaryString(file);
  };

  const downloadTemplate = () => {
    // Generate an object with all keys from formData as column headers
    const allFields = {
      // --- Authentication ---
      userName: "John Doe",
      userEmail: "john@example.com",
      userMobile: "9876543210",
      password: "password123",

      // --- Basic Info ---
      aboutMe: "I am a software engineer looking for a life partner.",
      gender: "Male",
      profileCreatedFor: "Self",
      dateOfBirth: "1995-05-15",
      age: "29",
      bodyType: "Slim",
      physicalStatus: "Normal",
      complexion: "Fair",
      height: "5ft 8in",
      weight: "70",
      maritalStatus: "Never Married",
      marriedMonthYear: "",
      livingTogetherPeriod: "",
      divorcedMonthYear: "",
      reasonForDivorce: "",
      childStatus: "No",
      numberOfChildren: "0",
      eatingHabits: "Vegetarian",
      drinkingHabits: "No",
      smokingHabits: "No",
      motherTongue: "Malayalam",
      caste: "RC",

      // --- Family Details ---
      fathersName: "James Doe",
      mothersName: "Mary Doe",
      fathersOccupation: "Retired",
      fathersProfession: "Teacher",
      mothersOccupation: "Homemaker",
      fathersNative: "Kochi",
      mothersNative: "Kottayam",
      familyValue: "Traditional",
      familyType: "Nuclear",
      familyStatus: "Middle Class",
      residenceType: "Owned",
      numberOfBrothers: "1",
      numberOfSisters: "0",

      // --- Religious Info ---
      religion: "Christian",
      denomination: "Roman Catholic",
      church: "St. Marys Church",
      churchActivity: "Choir Member",
      pastorsName: "Fr. Thomas",
      spirituality: "Religious",
      religiousDetail: "Regular church goer",

      // --- Contact Info ---
      alternateMobile: "9000000000",
      landlineNumber: "04842345678",
      currentAddress: "123 Main St, Kochi, Kerala",
      permanentAddress: "456 Side St, Kochi, Kerala",
      contactPersonName: "James Doe",
      relationship: "Father",
      citizenOf: "India",
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",

      // --- Professional Info ---
      education: "B.Tech Computer Science",
      additionalEducation: "MBA",
      college: "Model Engineering College",
      educationDetail: "Completed in 2017",
      employmentType: "Private",
      occupation: "Software Engineer",
      position: "Senior Lead",
      companyName: "Tech Corp",
      annualIncome: "1200000",

      // --- Lifestyle ---
      exercise: "Regularly",
      hobbies: "Reading, Travelling",
      interests: "Technology, Cooking",
      music: "Classical",
      favouriteReads: "Novels",
      favouriteCuisines: "South Indian",
      sportsActivities: "Football",
      dressStyles: "Formal",

      // --- Partner Preferences ---
      partnerAgeFrom: "22",
      partnerAgeTo: "27",
      partnerHeight: "5ft 2in",
      partnerMaritalStatus: "Never Married",
      partnerMotherTongue: "Malayalam",
      partnerCaste: "RC",
      partnerPhysicalStatus: "Normal",
      partnerEatingHabits: "Vegetarian",
      partnerDrinkingHabits: "No",
      partnerSmokingHabits: "No",
      partnerDenomination: "Roman Catholic",
      partnerSpirituality: "Religious",
      partnerEducation: "Degree",
      partnerEmploymentType: "Any",
      partnerOccupation: "Any",
      partnerAnnualIncome: "Any",
      partnerCountry: "India",
      partnerState: "Kerala",
      partnerDistrict: "Ernakulam",

      // --- Profile Visibility ---
      profileVisibility: "Public",
    };

    const ws = XLSX.utils.json_to_sheet([allFields]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "Full_Bulk_User_Template.xlsx");
  };

  const handleBulkSubmit = async () => {
    if (bulkData.length === 0) {
      showAlert({
        title: "No Data",
        text: "Please upload an Excel file first.",
        icon: "warning",
      });
      return;
    }
    setIsBulkUploading(true);
    try {
      const response = await bulkRegisterUsersByAdmin(bulkData);
      if (response.status === 200) {
        showAlert({
          title: "Success",
          text: `Bulk Registration Complete`,
          icon: "success",
        });
        setBulkData([]);
        setShowBulkModal(false);
      }
    } catch (err) {
      console.error("Bulk upload error:", err);
      showAlert({
        title: "Error",
        text: err.response?.data?.message || "Failed to upload bulk users",
        icon: "error",
      });
    } finally {
      setIsBulkUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userName || !formData.userEmail || !formData.password) {
      showAlert({
        title: "Validation Error",
        text: "Please fill in basic authentication details (Name, Email, Password)",
        icon: "warning",
      });
      setActiveTab("basic");
      return;
    }
    setUpdating(true);

    // Sanitize data: remove ALL empty strings to avoid Mongoose validation errors
    // for fields like age (Number), dateOfBirth (Date), or Enums (gender, etc.)
    const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
      if (value !== "") {
        acc[key] = value;
      }
      return acc;
    }, {});

    try {
      const response = await registerUserByAdmin(sanitizedData);
      if (response.data.success) {
        showAlert({
          title: "Success",
          text: "User Profile Created Successfully!",
          icon: "success",
        });
        navigate(-1);
      }
    } catch (err) {
      console.error("Creation error:", err);
      showAlert({
        title: "Error",
        text: err.response?.data?.message || "Failed to create user (Internal Error)",
        icon: "error",
      });
    } finally {
      setUpdating(false);
    }
  };



  return (
    <NewLayout>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white p-4 border-0 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="fw-bold mb-0 text-primary">Register New User</h3>
                <p className="text-muted small mb-0">Create a full user profile starting with basic information.</p>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-outline-secondary btn-sm px-4 rounded-pill" onClick={() => navigate(-1)}>Cancel</button>
                <button className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm fw-bold" onClick={() => setShowBulkModal(true)}>
                  <i className="fa fa-file-excel-o me-2"></i>Bulk Upload
                </button>
                <button className="btn btn-success btn-sm px-4 rounded-pill shadow-sm fw-bold" onClick={handleSubmit} disabled={updating}>
                  {updating ? "Saving..." : "Create User Profile"}
                </button>
              </div>
            </div>

            <div className="bg-light px-4 pt-4">
              <ul className="nav nav-tabs border-0" id="profileTabs" role="tablist">
                {[
                  { id: "basic", label: "Auth & Basic", icon: "fa-user-plus" },
                  { id: "gallery", label: "Gallery", icon: "fa-image" },
                  { id: "family", label: "Family", icon: "fa-users" },
                  { id: "religious", label: "Religious", icon: "fa-church" },
                  { id: "professional", label: "Education & Work", icon: "fa-briefcase" },
                  { id: "contact", label: "Contact", icon: "fa-phone" },
                  { id: "lifestyle", label: "Lifestyle", icon: "fa-heart" },
                  { id: "partner", label: "Partner Preferences", icon: "fa-handshake-o" }
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
              <FormSection title="Authentication & Basic Details" id="basic" activeTab={activeTab}>
                <InputField label="Full Name" name="userName" required formData={formData} handleChange={handleChange} />
                <InputField label="Email Address" name="userEmail" type="email" required formData={formData} handleChange={handleChange} />
                <InputField label="Mobile Number" name="userMobile" required formData={formData} handleChange={handleChange} />
                <InputField label="Account Password" name="password" type="password" required formData={formData} handleChange={handleChange} />
                <InputField label="About Me" name="aboutMe" type="textarea" col="12" formData={formData} handleChange={handleChange} />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" formData={formData} handleChange={handleChange} />
                <InputField label="Gender" name="gender" options={["Male", "Female", "Other"]} formData={formData} handleChange={handleChange} />
                <InputField label="Profile Created For" name="profileCreatedFor" options={["Self", "Son", "Daughter", "Brother", "Sister", "Friend"]} formData={formData} handleChange={handleChange} />
                <InputField label="Marital Status" name="maritalStatus" options={["Never Married", "Divorced", "Awaiting Divorce", "Widow/Widower"]} formData={formData} handleChange={handleChange} />
                <InputField label="Height" name="height" options={["4ft", "4ft 1in", "4ft 2in", "4ft 3in", "4ft 4in", "4ft 5in", "4ft 6in", "4ft 7in", "4ft 8in", "4ft 9in", "4ft 10in", "4ft 11in", "5ft", "5ft 1in", "5ft 2in", "5ft 3in", "5ft 4in", "5ft 5in", "5ft 6in", "5ft 7in", "5ft 8in", "5ft 9in", "5ft 10in", "5ft 11in", "6ft", "6ft 1in", "6ft 2in", "6ft 3in", "6ft 4in", "6ft 5in", "6ft 6in", "6ft 7in", "6ft 8in", "6ft 9in", "6ft 10in", "6ft 11in", "7ft"]} formData={formData} handleChange={handleChange} />
                <InputField label="Weight" name="weight" formData={formData} handleChange={handleChange} />
                <InputField label="Body Type" name="bodyType" options={["Average", "Slim", "Athletic", "Heavy"]} formData={formData} handleChange={handleChange} />
                <InputField label="Complexion" name="complexion" options={["Fair", "Very Fair", "Wheatish", "Dark"]} formData={formData} handleChange={handleChange} />
                <InputField label="Eating Habits" name="eatingHabits" options={["Vegetarian", "Non-Vegetarian", "Eggetarian"]} formData={formData} handleChange={handleChange} />
                <InputField label="Mother Tongue" name="motherTongue" formData={formData} handleChange={handleChange} />
                <InputField label="Caste" name="caste" formData={formData} handleChange={handleChange} />
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
              <FormSection title="Family Background" id="family" activeTab={activeTab}>
                <InputField label="Father's Name" name="fathersName" formData={formData} handleChange={handleChange} />
                <InputField label="Father's Occupation" name="fathersOccupation" formData={formData} handleChange={handleChange} />
                <InputField label="Mother's Name" name="mothersName" formData={formData} handleChange={handleChange} />
                <InputField label="Mother's Occupation" name="mothersOccupation" formData={formData} handleChange={handleChange} />
                <InputField label="Family Value" name="familyValue" options={["Traditional", "Moderate", "Liberal"]} formData={formData} handleChange={handleChange} />
                <InputField label="Family Type" name="familyType" options={["Joint", "Nuclear"]} formData={formData} handleChange={handleChange} />
                <InputField label="Family Status" name="familyStatus" options={["Middle Class", "Upper Middle Class", "Rich", "Affluent"]} formData={formData} handleChange={handleChange} />
                <InputField label="No. of Brothers" name="numberOfBrothers" type="number" formData={formData} handleChange={handleChange} />
                <InputField label="No. of Sisters" name="numberOfSisters" type="number" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* RELIGIOUS */}
              <FormSection title="Religious Information" id="religious" activeTab={activeTab}>
                <InputField label="Religion" name="religion" formData={formData} handleChange={handleChange} />
                <InputField label="Denomination" name="denomination" formData={formData} handleChange={handleChange} />
                <InputField label="Church Name" name="church" formData={formData} handleChange={handleChange} />
                <InputField label="Pastors Name" name="pastorsName" formData={formData} handleChange={handleChange} />
                <InputField label="Religious Detail" name="religiousDetail" type="textarea" col="12" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PROFESSIONAL */}
              <FormSection title="Education & Career" id="professional" activeTab={activeTab}>
                <InputField label="Education" name="education" formData={formData} handleChange={handleChange} />
                <InputField label="College / University" name="college" formData={formData} handleChange={handleChange} />
                <InputField label="Employment Type" name="employmentType" options={["Government", "Private", "Business", "Self Employed", "Not Working"]} formData={formData} handleChange={handleChange} />
                <InputField label="Occupation" name="occupation" formData={formData} handleChange={handleChange} />
                <InputField label="Annual Income" name="annualIncome" formData={formData} handleChange={handleChange} />
                <InputField label="Company Name" name="companyName" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* CONTACT */}
              <FormSection title="Contact Details" id="contact" activeTab={activeTab}>
                <InputField label="Current Address" name="currentAddress" type="textarea" col="12" formData={formData} handleChange={handleChange} />
                <InputField label="City" name="city" formData={formData} handleChange={handleChange} />
                <InputField label="State" name="state" formData={formData} handleChange={handleChange} />
                <InputField label="Pincode" name="pincode" formData={formData} handleChange={handleChange} />
                <InputField label="Citizen Of" name="citizenOf" formData={formData} handleChange={handleChange} />
                <InputField label="Alternate Mobile" name="alternateMobile" formData={formData} handleChange={handleChange} />
                <InputField label="Contact Person Name" name="contactPersonName" formData={formData} handleChange={handleChange} />
                <InputField label="Relationship" name="relationship" options={RELATIONSHIP_OPTIONS} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* LIFESTYLE */}
              <FormSection title="Lifestyle & Interests" id="lifestyle" activeTab={activeTab}>
                <InputField label="Hobbies" name="hobbies" formData={formData} handleChange={handleChange} />
                <InputField label="Smoking Habits" name="smokingHabits" options={["No", "Yes", "Occasionally"]} formData={formData} handleChange={handleChange} />
                <InputField label="Drinking Habits" name="drinkingHabits" options={["No", "Yes", "Occasionally"]} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PARTNER PREFERENCES */}
              <FormSection title="Ideal Partner Preferences" id="partner" activeTab={activeTab}>
                <InputField label="Age From" name="partnerAgeFrom" type="number" formData={formData} handleChange={handleChange} />
                <InputField label="Age To" name="partnerAgeTo" type="number" formData={formData} handleChange={handleChange} />
                <InputField label="Desired Height" name="partnerHeight" formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Marital Status" name="partnerMaritalStatus" formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Caste" name="partnerCaste" formData={formData} handleChange={handleChange} />
                <InputField label="Preferred City/State" name="partnerState" formData={formData} handleChange={handleChange} />
              </FormSection>
            </div>

            <div className="card-footer bg-white p-4 border-0 d-flex justify-content-end gap-3 mt-4">
              <button className="btn btn-light px-5 rounded-pill" onClick={() => navigate(-1)}>Discard</button>
              <button className="btn btn-success px-5 rounded-pill shadow-lg fw-bold" onClick={handleSubmit} disabled={updating}>
                {updating ? "Creating..." : "Create User Profile"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* BULK UPLOAD MODAL */}
      <Modal show={showBulkModal} onHide={() => setShowBulkModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-primary">Bulk User Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <i className="fa fa-file-excel-o fa-3x text-success mb-2"></i>
            <p className="text-muted">Upload an Excel sheet to register multiple users at once.</p>
          </div>

          <div className="d-flex justify-content-center gap-3 mb-4">
            <button className="btn btn-outline-primary rounded-pill px-4" onClick={downloadTemplate}>
              <i className="fa fa-download me-2"></i> Download Sample Template
            </button>
          </div>

          <div className="upload-box border rounded-4 p-5 bg-light mb-4 text-center" style={{ borderStyle: 'dashed', borderWidth: '2px', borderColor: '#198754' }}>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="form-control mb-3"
              id="excelUploadModal"
            />
            <label htmlFor="excelUploadModal" className="text-muted cursor-pointer">
              {bulkData.length > 0 ? `${bulkData.length} records found in file` : "Click to select your Excel file here"}
            </label>
          </div>

          {bulkData.length > 0 && (
            <div className="table-responsive mb-4" style={{ maxHeight: '250px' }}>
              <table className="table table-sm table-hover small">
                <thead className="table-light sticky-top">
                  <tr>
                    {Object.keys(bulkData[0]).slice(0, 8).map((key, i) => (
                      <th key={i}>{key}</th>
                    ))}
                    {Object.keys(bulkData[0]).length > 8 && <th>...</th>}
                  </tr>
                </thead>
                <tbody>
                  {bulkData.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).slice(0, 8).map((val, j) => (
                        <td key={j} className="text-truncate" style={{ maxWidth: '100px' }}>{val}</td>
                      ))}
                      {Object.values(row).length > 8 && <td>...</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
              {bulkData.length > 5 && <p className="text-muted small text-center italic">Showing 5 of {bulkData.length} records</p>}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 p-4">
          <button className="btn btn-light rounded-pill px-4" onClick={() => setShowBulkModal(false)}>Close</button>
          <button
            className="btn btn-success rounded-pill px-5 shadow fw-bold"
            onClick={handleBulkSubmit}
            disabled={isBulkUploading || bulkData.length === 0}
          >
            {isBulkUploading ? "Processing..." : `Import ${bulkData.length} Users`}
          </button>
        </Modal.Footer>
      </Modal>
    </NewLayout>
  );
};

export default AdminAddNewUser;
