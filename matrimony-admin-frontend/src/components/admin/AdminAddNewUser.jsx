import Select from "react-select";
import React, { useState } from "react";
import { DROPDOWN_OPTIONS } from "../../utils/dropdownOptions";
import { useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { Country, State, City } from "country-state-city";
import BasicInfomation from "./BasicInfomation";
import * as XLSX from "xlsx";
import { Modal } from "react-bootstrap";
import CustomTable from "./common/CustomTable";
import { registerUserByAdmin, bulkRegisterUsersByAdmin, uploadIdProofByAdmin } from "../../api/service/adminServices";
import { showAlert } from "../../utils/alertService";

const FormSection = ({ title, children, id, activeTab }) => (
  <div className={`tab-pane fade ${activeTab === id ? "show active" : ""}`} id={id} role="tabpanel">
    <div className="card border-0 p-4">
      <h5 className="fw-bold mb-4 border-bottom pb-2">{title}</h5>
      <div className="row g-3">{children}</div>
    </div>
  </div>
);

const InputField = ({ label, name, type = "text", options = null, isMulti = false, col = "6", required = false, formData, handleChange }) => {
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
      if (Array.isArray(formData[name])) {
        return formData[name].map(val => ({ value: val, label: val }));
      }
      return [];
    }
    return formData[name] ? { value: formData[name], label: formData[name] } : null;
  };

  return (
    <div className={`col-md-${col}`}>
      <label className="form-label small fw-bold text-muted">{label} {required && <span className="text-danger">*</span>}</label>
      {options ? (
        <Select
          isMulti={isMulti}
          options={options.map(opt => ({ value: opt, label: opt }))}
          value={getSelectValue()}
          onChange={(selectedOption) => {
            let value;
            if (isMulti) {
              value = selectedOption ? selectedOption.map(opt => opt.value) : [];
            } else {
              value = selectedOption ? selectedOption.value : '';
            }
            handleChange({ target: { name, value } });
          }}
          placeholder={`Select ${label}`}
          styles={customStyles}
          isClearable
          menuPortalTarget={document.body}
        />
      ) : type === "textarea" ? (
        <textarea className="form-control" name={name} value={formData[name] || ""} onChange={handleChange} rows="3" />
      ) : (
        <div className="position-relative">
          <input type={inputType} className="form-control" name={name} value={formData[name] || ""} onChange={handleChange} required={required} style={isPasswordField ? { paddingRight: "40px" } : {}} />
          {isPasswordField && (
            <button
              type="button"
              className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted px-3"
              style={{ textDecoration: 'none' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
InputField.displayName = 'InputField';
InputField.displayName = 'InputField';

const RELATIONSHIP_OPTIONS = ["Self", "Father", "Mother", "Brother", "Sister", "Uncle", "Aunt", "Relative", "Friend", "Other"];
const AdminAddNewUser = () => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [bulkData, setBulkData] = useState([]);
  const [isBulkUploading, setIsBulkUploading] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedBulkUser, setSelectedBulkUser] = useState(null);
  const [showBulkViewModal, setShowBulkViewModal] = useState(false);

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
    const allFields = {
      userName: "John Doe",
      userEmail: "john@example123.com", 
      userMobile: "9876543222",
      password: "password123", 

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

      fathersName: "James Doe",
      mothersName: "Mary Doe",
      fathersOccupation: "Retired",
      fathersProfession: "Teacher",
      mothersOccupation: "Homemaker",
      mothersProfession: "None",
      fathersNative: "Kochi",
      mothersNative: "Kottayam",
      familyValue: "Traditional",
      familyType: "Nuclear",
      familyStatus: "Middle Class",
      residenceType: "Owned",
      numberOfBrothers: "1",
      marriedBrothers: "0",
      numberOfSisters: "0",
      marriedSisters: "0",

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
      alternateEmail: "alternate@example.com",
      landlineNumber: "04842345678",
      currentAddress: "123 Main St, Kochi, Kerala",
      currentDoorNo: "123",
      currentLocality: "Main St",
      currentCountry: "India",
      currentState: "Kerala",
      currentDistrict: "Ernakulam",
      currentPincode: "682001",
      permanentAddress: "456 Side St, Kochi, Kerala",
      sameAsCurrentAddress: false,
      permanentDoorNo: "456",
      permanentLocality: "Side St",
      permanentCountry: "India",
      permanentState: "Kerala",
      permanentDistrict: "Ernakulam",
      permanentPincode: "682001",
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
      partnerHeightTo: "5ft 6in",
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
      partnerAnnualIncomeFrom: "5 Lakhs",
      partnerAnnualIncomeTo: "10 Lakhs",
      partnerCountry: "India",
      partnerState: "Kerala",
      partnerDistrict: "Ernakulam",

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
        const { successCount, failCount, errors } = response.data.data;
        if (failCount > 0) {
          showAlert({
            title: "Partial Success",
            text: `Added ${successCount} users. Failed ${failCount}. Check console for errors.`,
            icon: "warning",
          });
          console.log("Bulk upload errors:", errors);
        } else {
          showAlert({
            title: "Success",
            text: `Successfully added ${successCount} users.`,
            icon: "success",
          });
        }
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
        const newUserId = response.data.userId;

        if (idProofFile && newUserId) {
          const idFormData = new FormData();
          idFormData.append("idProof", idProofFile);
          await uploadIdProofByAdmin(newUserId, idFormData);
        }

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

  const bulkColumns = [
    {
      name: "S.NO",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "80px",
    },
    {
      name: "USERNAME",
      selector: row => row.userName || row.USERNAME || "",
      sortable: true,
    },
    {
      name: "USEREMAIL",
      selector: row => row.userEmail || row.USEREMAIL || "",
      sortable: true,
    },
    {
      name: "PASSWORD",
      selector: row => row.password || row.PASSWORD || "",
      sortable: false,
    },
    {
      name: "ACTION",
      cell: (row) => (
        <button 
          className="btn btn-sm btn-outline-primary fw-bold"
          onClick={() => {
            setSelectedBulkUser(row);
            setShowBulkViewModal(true);
          }}
        >
          View Profile
        </button>
      ),
      sortable: false,
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "12px",
        backgroundColor: "#f8f9fa",
      },
    },
    cells: {
      style: {
        fontSize: "12px",
        padding: "5px",
      },
    },
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
              {/* BASIC PERSONAL DETAILS */}
              <FormSection title="Basic Personal Details" id="basic" activeTab={activeTab}>
                <InputField label="About Me" name="aboutMe" type="textarea" col="12" formData={formData} handleChange={handleChange} />
                <InputField label="Full Name" name="userName" required formData={formData} handleChange={handleChange} />
                <InputField label="Email" name="userEmail" type="email" required formData={formData} handleChange={handleChange} />
                <InputField label="Phone" name="userMobile" required formData={formData} handleChange={handleChange} />
                <InputField label="Account Password" name="password" type="password" required formData={formData} handleChange={handleChange} />
                <InputField label="Date of Birth" name="dateOfBirth" type="date" formData={formData} handleChange={handleChange} />
                <InputField label="Gender" name="gender" options={DROPDOWN_OPTIONS.gender} formData={formData} handleChange={handleChange} />
                <InputField label="Profile Created By" name="profileCreatedFor" options={DROPDOWN_OPTIONS.profileCreatedFor} formData={formData} handleChange={handleChange} />
                <InputField label="Marital Status" name="maritalStatus" options={DROPDOWN_OPTIONS.maritalStatus} formData={formData} handleChange={handleChange} />
                <InputField label="Height" name="height" options={DROPDOWN_OPTIONS.height} formData={formData} handleChange={handleChange} />
                <InputField label="Weight" name="weight" options={Array.from({ length: 101 }, (_, i) => String(i + 40))} formData={formData} handleChange={handleChange} />
                <InputField label="Body Type" name="bodyType" options={DROPDOWN_OPTIONS.bodyType} formData={formData} handleChange={handleChange} />
                <InputField label="Complexion" name="complexion" options={DROPDOWN_OPTIONS.complexion} formData={formData} handleChange={handleChange} />
                <InputField label="Physical State" name="physicalStatus" options={DROPDOWN_OPTIONS.physicalStatus} formData={formData} handleChange={handleChange} />
                <InputField label="Age" name="age" options={Array.from({ length: 53 }, (_, i) => String(i + 18))} formData={formData} handleChange={handleChange} />
                <InputField label="Eating Habits" name="eatingHabits" options={DROPDOWN_OPTIONS.eatingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Drinking Habits" name="drinkingHabits" options={DROPDOWN_OPTIONS.drinkingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Smoking Habits" name="smokingHabits" options={DROPDOWN_OPTIONS.smokingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Mother Tongue" name="motherTongue" options={DROPDOWN_OPTIONS.motherTongue} formData={formData} handleChange={handleChange} />
                <InputField label="Caste" name="caste" options={DROPDOWN_OPTIONS.caste} formData={formData} handleChange={handleChange} />
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
                <InputField label="Father's Name" name="fathersName" formData={formData} handleChange={handleChange} />
                <InputField label="Father's Occupation" name="fathersOccupation" options={["Retired", "Business", "Government Employee", "Private Employee", "Professional", "Farmer", "Homemaker", "Others"]} formData={formData} handleChange={handleChange} />
                <InputField label="Mother's Name" name="mothersName" formData={formData} handleChange={handleChange} />
                <InputField label="Mother's Occupation" name="mothersOccupation" options={["Retired", "Business", "Government Employee", "Private Employee", "Professional", "Farmer", "Homemaker", "Others"]} formData={formData} handleChange={handleChange} />
                <InputField label="Father's Profession" name="fathersProfession" formData={formData} handleChange={handleChange} />
                <InputField label="Mother's Profession" name="mothersProfession" formData={formData} handleChange={handleChange} />
                <InputField label="Fathers' Native" name="fathersNative" formData={formData} handleChange={handleChange} />
                <InputField label="Mothers' Native" name="mothersNative" formData={formData} handleChange={handleChange} />
                <InputField label="Family Value" name="familyValue" options={DROPDOWN_OPTIONS.familyValue} formData={formData} handleChange={handleChange} />
                <InputField label="Family Type" name="familyType" options={DROPDOWN_OPTIONS.familyType} formData={formData} handleChange={handleChange} />
                <InputField label="Residence type" name="residenceType" options={DROPDOWN_OPTIONS.residenceType} formData={formData} handleChange={handleChange} />
                <InputField label="Family Status" name="familyStatus" options={DROPDOWN_OPTIONS.familyStatus} formData={formData} handleChange={handleChange} />
                <InputField label="No. of Brothers" name="numberOfBrothers" options={DROPDOWN_OPTIONS.numberOfBrothers} formData={formData} handleChange={handleChange} />
                <InputField label="Married Brothers" name="marriedBrothers" options={DROPDOWN_OPTIONS.marriedBrothers} formData={formData} handleChange={handleChange} />
                <InputField label="No. of Sisters" name="numberOfSisters" options={DROPDOWN_OPTIONS.numberOfSisters} formData={formData} handleChange={handleChange} />
                <InputField label="Married Sisters" name="marriedSisters" options={DROPDOWN_OPTIONS.marriedSisters} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* RELIGIOUS */}
              <FormSection title="Religious Information" id="religious" activeTab={activeTab}>
                <InputField label="Denomination" name="denomination" options={DROPDOWN_OPTIONS.denomination} formData={formData} handleChange={handleChange} />
                <InputField label="Church Name" name="church" formData={formData} handleChange={handleChange} />
                <InputField label="Church Activity" name="churchActivity" options={DROPDOWN_OPTIONS.churchActivity} formData={formData} handleChange={handleChange} />
                <InputField label="Pastors Name" name="pastorsName" formData={formData} handleChange={handleChange} />
                <InputField label="Spirituality" name="spirituality" options={DROPDOWN_OPTIONS.spirituality} formData={formData} handleChange={handleChange} />
                <InputField label="Religious Detail" name="religiousDetail" type="textarea" col="12" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PROFESSIONAL */}
              <FormSection title="Professional Information" id="professional" activeTab={activeTab}>
                <InputField label="Highest Education" name="education" options={DROPDOWN_OPTIONS.education} formData={formData} handleChange={handleChange} />
                <InputField label="Additional Education" name="additionalEducation" options={DROPDOWN_OPTIONS.additionalEducation} formData={formData} handleChange={handleChange} />
                <InputField label="College" name="college" formData={formData} handleChange={handleChange} />
                <InputField label="Education in Detail" name="educationDetail" type="textarea" col="12" formData={formData} handleChange={handleChange} />
                <InputField label="Employee Type" name="employmentType" options={DROPDOWN_OPTIONS.employmentType} formData={formData} handleChange={handleChange} />
                <InputField label="Position" name="position" formData={formData} handleChange={handleChange} />
                <InputField label="Occupation" name="occupation" options={DROPDOWN_OPTIONS.occupation} formData={formData} handleChange={handleChange} />
                <InputField label="Company Name" name="companyName" formData={formData} handleChange={handleChange} />
                <InputField label="Annual Income" name="annualIncome" options={DROPDOWN_OPTIONS.annualIncome} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* CONTACT */}
              <FormSection title="Contact Information" id="contact" activeTab={activeTab}>
                <InputField label="Contact Person Name" name="contactPersonName" formData={formData} handleChange={handleChange} />
                <InputField label="Relationship" name="relationship" options={DROPDOWN_OPTIONS.relationship} formData={formData} handleChange={handleChange} />
                <InputField label="Citizen Of" name="citizenOf" options={Country.getAllCountries().map(c => c.name)} formData={formData} handleChange={handleChange} />
                  <InputField label="Alternate Mobile" name="alternateMobile" formData={formData} handleChange={handleChange} />
                <InputField label="Alternate Email" name="alternateEmail" type="email" formData={formData} handleChange={handleChange} />
                <InputField label="Landline" name="landlineNumber" formData={formData} handleChange={handleChange} />
                <div className="col-12 mt-4">
                  <h6 className="fw-bold border-bottom pb-2">Current Address</h6>
                </div>
                <InputField label="Door / Flat No (Name), Street" name="currentDoorNo" formData={formData} handleChange={handleChange} />
                <InputField label="Locality / Area" name="currentLocality" formData={formData} handleChange={handleChange} />
                <InputField label="Country" name="currentCountry" options={Country.getAllCountries().map(c => c.name)} formData={formData} handleChange={handleChange} />
                <InputField label="State" name="currentState" options={formData.currentCountry ? State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "").map(s => s.name) : []} formData={formData} handleChange={handleChange} />
                <InputField label="District" name="currentDistrict" options={formData.currentState ? City.getCitiesOfState(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "", State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "").find(s => s.name === formData.currentState)?.isoCode || "").map(city => city.name) : []} formData={formData} handleChange={handleChange} />
                <InputField label="Pincode" name="currentPincode" formData={formData} handleChange={handleChange} />

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
                          handleChange({ target: { name: "sameAsCurrentAddress", value: checked } });
                          if (checked) {
                            handleChange({ target: { name: "permanentDoorNo", value: formData.currentDoorNo } });
                            handleChange({ target: { name: "permanentLocality", value: formData.currentLocality } });
                            handleChange({ target: { name: "permanentCountry", value: formData.currentCountry } });
                            handleChange({ target: { name: "permanentState", value: formData.currentState } });
                            handleChange({ target: { name: "permanentDistrict", value: formData.currentDistrict } });
                            handleChange({ target: { name: "permanentPincode", value: formData.currentPincode } });
                          } else {
                            handleChange({ target: { name: "permanentDoorNo", value: "" } });
                            handleChange({ target: { name: "permanentLocality", value: "" } });
                            handleChange({ target: { name: "permanentCountry", value: "" } });
                            handleChange({ target: { name: "permanentState", value: "" } });
                            handleChange({ target: { name: "permanentDistrict", value: "" } });
                            handleChange({ target: { name: "permanentPincode", value: "" } });
                          }
                        }}
                      />
                      <label className="form-check-label small" htmlFor="sameAsCurrentAddress">
                        Same as current address
                      </label>
                    </div>
                  </div>
                </div>
                <InputField label="Door / Flat No (Name), Street" name="permanentDoorNo" formData={formData} handleChange={handleChange} />
                <InputField label="Locality / Area" name="permanentLocality" formData={formData} handleChange={handleChange} />
                <InputField label="Country" name="permanentCountry" options={Country.getAllCountries().map(c => c.name)} formData={formData} handleChange={handleChange} />
                <InputField label="State" name="permanentState" options={formData.permanentCountry ? State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "").map(s => s.name) : []} formData={formData} handleChange={handleChange} />
                <InputField label="District" name="permanentDistrict" options={formData.permanentState ? City.getCitiesOfState(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "", State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.permanentCountry)?.isoCode || "").find(s => s.name === formData.permanentState)?.isoCode || "").map(city => city.name) : []} formData={formData} handleChange={handleChange} />
                <InputField label="Pincode" name="permanentPincode" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* LIFESTYLE */}
              <FormSection title="Life style" id="lifestyle" activeTab={activeTab}>
                <InputField label="Hobbies" name="hobbies" isMulti options={["Reading", "Sports", "Music", "Traveling", "Cooking", "Photography", "Dancing", "Gaming", "Painting", "Writing", "Gardening", "Yoga"]} formData={formData} handleChange={handleChange} />
                <InputField label="Interests" name="interests" formData={formData} handleChange={handleChange} />
                <InputField label="Music" name="music" formData={formData} handleChange={handleChange} />
                <InputField label="Favorite Reads" name="favouriteReads" formData={formData} handleChange={handleChange} />
                <InputField label="Favorite Cuisines" name="favouriteCuisines" formData={formData} handleChange={handleChange} />
                <InputField label="Exercise" name="exercise" options={DROPDOWN_OPTIONS.exercise} formData={formData} handleChange={handleChange} />
                <InputField label="Sport Activities" name="sportsActivities" formData={formData} handleChange={handleChange} />
                <InputField label="Dress Style" name="dressStyles" formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PARTNER PREFERENCES */}
              <FormSection title="Partner preference" id="partner" activeTab={activeTab}>
                <InputField label="Age From" name="partnerAgeFrom" options={Array.from({ length: 53 }, (_, i) => String(i + 18))} formData={formData} handleChange={handleChange} />
                <InputField label="Age To" name="partnerAgeTo" options={Array.from({ length: 53 }, (_, i) => String(i + 18))} formData={formData} handleChange={handleChange} />
                <InputField label="Desired Height From" name="partnerHeight" options={DROPDOWN_OPTIONS.height} formData={formData} handleChange={handleChange} />
                <InputField label="Desired Height To" name="partnerHeightTo" options={DROPDOWN_OPTIONS.height} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Marital Status" name="partnerMaritalStatus" isMulti options={DROPDOWN_OPTIONS.partnerMaritalStatus} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Mother Tongue" name="partnerMotherTongue" isMulti options={DROPDOWN_OPTIONS.partnerMotherTongue} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Caste" name="partnerCaste" isMulti options={DROPDOWN_OPTIONS.partnerCaste} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Physical Status" name="partnerPhysicalStatus" isMulti options={DROPDOWN_OPTIONS.partnerPhysicalStatus} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Eating Habits" name="partnerEatingHabits" isMulti options={DROPDOWN_OPTIONS.partnerEatingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Drinking Habits" name="partnerDrinkingHabits" isMulti options={DROPDOWN_OPTIONS.partnerDrinkingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Smoking Habits" name="partnerSmokingHabits" isMulti options={DROPDOWN_OPTIONS.partnerSmokingHabits} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Denomination" name="partnerDenomination" isMulti options={DROPDOWN_OPTIONS.partnerDenomination} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Spirituality" name="partnerSpirituality" isMulti options={DROPDOWN_OPTIONS.partnerSpirituality} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PARTNER PREFERENCES - PROFESSIONAL */}
              <FormSection title="Partner Preferences - Professional" id="partner_professional" activeTab={activeTab}>
                <InputField label="Preferred Education" name="partnerEducation" isMulti options={DROPDOWN_OPTIONS.partnerEducation} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Employment Type" name="partnerEmploymentType" isMulti options={DROPDOWN_OPTIONS.partnerEmploymentType} formData={formData} handleChange={handleChange} />
                <InputField label="Preferred Occupation" name="partnerOccupation" isMulti options={DROPDOWN_OPTIONS.partnerOccupation} formData={formData} handleChange={handleChange} />
                <InputField label="Annual Income From" name="partnerAnnualIncomeFrom" options={["50 Thousand", "1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore"]} formData={formData} handleChange={handleChange} />
                <InputField label="Annual Income To" name="partnerAnnualIncomeTo" options={["1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore", "Above 1 Crore"]} formData={formData} handleChange={handleChange} />
              </FormSection>

              {/* PARTNER PREFERENCES - LOCATION */}
                <FormSection title="Partner Preferences - location" id="partner_location" activeTab={activeTab}>
                  <InputField 
                    label="Preferred Country" 
                    name="partnerCountry" 
                    isMulti 
                    options={Country.getAllCountries().map(c => c.name)} 
                    formData={formData} 
                    handleChange={handleChange} 
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
                    formData={formData} 
                    handleChange={handleChange} 
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
                    formData={formData} 
                    handleChange={handleChange} 
                  />
                </FormSection>

              {/* UPLOAD PROOF */}
              <FormSection title="Upload Proof" id="upload_proof" activeTab={activeTab}>
                <InputField label="ID Proof Type" name="idProofType" options={["Aadhar Card", "Passport"]} formData={formData} handleChange={handleChange} />
                <InputField label="ID Proof Number" name="idProofNumber" formData={formData} handleChange={handleChange} />
                <div className="col-md-6 mb-3">
                  <label className="form-label small fw-bold text-muted">ID Proof Document</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*,.pdf"
                    onChange={(e) => setIdProofFile(e.target.files[0])}
                  />
                  {idProofFile && <small className="text-success mt-1 d-block">File selected: {idProofFile.name}</small>}
                </div>
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
            <div className="table-responsive mb-4" style={{ maxHeight: '250px', overflowX: 'auto', width: '100%' }}>
              <CustomTable itemsPerPage={10}
                columns={bulkColumns}
                data={bulkData.slice(0, 5)}
                customStyles={customStyles}
                noHeader
              />
              {bulkData.length > 5 && <p className="text-muted small text-center italic mt-2">Showing 5 of {bulkData.length} records</p>}
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

      {/* BULK VIEW PROFILE MODAL */}
      <Modal show={showBulkViewModal} onHide={() => setShowBulkViewModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold text-success fs-4">View User Data</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {selectedBulkUser && (
            <div className="row g-3">
              {Object.entries(selectedBulkUser).map(([key, value]) => (
                <div className="col-md-6" key={key}>
                  <div className="p-3 border rounded bg-light h-100 shadow-sm">
                    <strong className="text-capitalize text-muted mb-1 d-block" style={{ fontSize: "0.85rem" }}>
                      {key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}
                    </strong>
                    <span className="fw-bold text-dark">{value !== "" && value !== null && value !== undefined ? String(value) : "N/A"}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 p-4">
          <button className="btn btn-secondary rounded-pill px-4 shadow-sm fw-bold" onClick={() => setShowBulkViewModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </NewLayout>
  );
};

export default AdminAddNewUser;
