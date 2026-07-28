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
import imageCompression from "browser-image-compression";

const compressionOptions = {
  maxSizeMB: 0.1,
  maxWidthOrHeight: 1280,
  useWebWorker: true,
};

const getCitiesList = (countryName, stateName) => {
  if (!countryName || !stateName) return [];
  const countryCode = Country.getAllCountries().find(c => c.name === countryName)?.isoCode || "";
  if (!countryCode) return [];
  const stateCode = State.getStatesOfCountry(countryCode).find(s => s.name === stateName)?.isoCode || "";
  if (!stateCode) return [];
  let cities = City.getCitiesOfState(countryCode, stateCode).map(city => city.name);
  if (stateName === "Karnataka") {
    if (!cities.includes("Hubballi")) cities.push("Hubballi");
    if (!cities.includes("Vijayanagara")) cities.push("Vijayanagara");
    cities.sort();
  }
  return cities;
};


const InputField = React.memo(({ label, name, type = "text", options = null, isMulti = false, col = "6", required = false, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  const otherOption = (options && !isMulti) ? options.find(opt => opt === "Others" || opt === "Other") : null;
  const isCustomValue = Boolean(otherOption && value && !options.includes(value));
  const isOtherSelected = Boolean(otherOption && (value === "Others" || value === "Other" || isCustomValue));
  const selectDisplayValue = isCustomValue ? otherOption : (value || "");
  const textDisplayValue = isCustomValue ? value : "";

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '38px',
      backgroundColor: required ? '#f8fafc' : '#ffffff',
      borderColor: state.isFocused ? '#0d6efd' : (required ? '#cbd5e1' : '#dee2e6'),
      borderWidth: required ? '1.5px' : '1px',
      borderRadius: '8px',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(13, 110, 253, 0.15)' : 'none',
      '&:hover': {
        borderColor: required ? '#94a3b8' : '#ced4da'
      }
    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };

  const inputStyle = {
    backgroundColor: required ? '#f8fafc' : '#ffffff',
    borderColor: required ? '#cbd5e1' : '#dee2e6',
    borderWidth: required ? '1.5px' : '1px',
    borderRadius: '8px',
    color: '#0f172a',
    fontSize: '0.9rem',
    fontWeight: '500',
    minHeight: type === 'textarea' ? 'auto' : '38px',
    ...(isPasswordField ? { paddingRight: "40px" } : {})
  };

  const getSelectValue = () => {
    if (isMulti) {
      if (Array.isArray(value)) {
        return value.map(val => ({ value: val, label: val }));
      }
      return [];
    }
    return selectDisplayValue ? { value: selectDisplayValue, label: selectDisplayValue } : null;
  };

  return (
    <div className={`col-md-${col}`}>
      <label className="form-label small fw-bold text-muted mb-1">{label} {required && <span className="text-danger fw-bold">*</span>}</label>
      {options ? (
        <div>
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
          {isOtherSelected && (
            <div className="mt-2">
              <label className="form-label small fw-bold text-muted mb-1">
                Please specify {label} <span className="text-danger fw-bold">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name={name}
                value={textDisplayValue}
                onChange={(e) => onChange({ target: { name, value: e.target.value } })}
                placeholder={`Enter ${label.toLowerCase()}`}
                required={true}
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: '#cbd5e1',
                  borderWidth: '1.5px',
                  borderRadius: '8px',
                  color: '#0f172a',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  minHeight: '40px'
                }}
              />
            </div>
          )}
        </div>
      ) : type === "textarea" ? (
        <textarea className="form-control" name={name} value={value || ""} onChange={onChange} rows="3" required={required} style={inputStyle} />
      ) : (
        <div className="position-relative">
          <input type={inputType} className="form-control" name={name} value={value || ""} onChange={onChange} required={required} style={inputStyle} />
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

const FormSection = ({ title, children, id }) => (
  <div id={id} className="card border-0 p-4 shadow-sm mb-4">
    <h5 className="fw-bold mb-4 border-bottom pb-2">{title}</h5>
    <div className="row g-3">{children}</div>
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
    aboutPartner: "",

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
  const [deleteProfileImageFlag, setDeleteProfileImageFlag] = useState(false);

  // --- Location Helpers (simplified for now to avoid complexity of nested loops) ---
  const allCountries = Country.getAllCountries();

  // --- Master Data ---
  const [casteOptions, setCasteOptions] = useState([]);
  const [partnerCasteOptions, setPartnerCasteOptions] = useState([]);
  const [denominationOptions, setDenominationOptions] = useState([]);
  const [partnerDenominationOptions, setPartnerDenominationOptions] = useState([]);

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

          const cleanCastes = fetchedCastes.filter((c) => c !== "Do not wish to specify" && c !== "Doesn't Matter" && c !== "Any" && c !== "Christian" && c !== "Others" && c !== "Other");
          setCasteOptions(["Do not wish to specify", "Christian", ...cleanCastes, "Others"]);
          setPartnerCasteOptions(["Any", "Christian", ...cleanCastes, "Others"]);

          const cleanDenominations = fetchedDenominations.filter((d) => d !== "Do not wish to specify" && d !== "Any" && d !== "Others" && d !== "Other");
          setDenominationOptions([...cleanDenominations, "Others"]);
          setPartnerDenominationOptions(["Any", ...cleanDenominations, "Others"]);
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

          const safeSplit = (val) => {
            if (Array.isArray(val)) return val;
            return (typeof val === 'string' && val.trim() !== '') ? val.split(',').map(s => s.trim()) : [];
          };

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
            currentDoorNo: parsedCurrent.doorNo || "",
            currentLocality: parsedCurrent.locality || "",
            currentCountry: parsedCurrent.country || "",
            currentState: parsedCurrent.state || "",
            currentDistrict: parsedCurrent.district || "",
            currentPincode: parsedCurrent.pincode || "",
            permanentDoorNo: parsedPermanent.doorNo || "",
            permanentLocality: parsedPermanent.locality || "",
            permanentCountry: parsedPermanent.country || "",
            permanentState: parsedPermanent.state || "",
            permanentDistrict: parsedPermanent.district || "",
            permanentPincode: parsedPermanent.pincode || "",
            sameAsCurrentAddress: false,
            partnerMaritalStatus: safeSplit(userData.partnerMaritalStatus),
            partnerMotherTongue: safeSplit(userData.partnerMotherTongue),
            partnerCaste: safeSplit(userData.partnerCaste),
            partnerPhysicalStatus: safeSplit(userData.partnerPhysicalStatus),
            partnerEatingHabits: safeSplit(userData.partnerEatingHabits),
            partnerDrinkingHabits: safeSplit(userData.partnerDrinkingHabits),
            partnerSmokingHabits: safeSplit(userData.partnerSmokingHabits),
            partnerDenomination: safeSplit(userData.partnerDenomination),
            partnerSpirituality: safeSplit(userData.partnerSpirituality),
            partnerEducation: safeSplit(userData.partnerEducation),
            partnerEmploymentType: safeSplit(userData.partnerEmploymentType),
            partnerOccupation: safeSplit(userData.partnerOccupation),
            partnerCountry: safeSplit(userData.partnerCountry),
            partnerState: safeSplit(userData.partnerState),
            partnerDistrict: safeSplit(userData.partnerDistrict),
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
    setDeleteProfileImageFlag(true);
    setProfileImageFile(null);
    setProfileImagePreview(null);
  };

  const handleAdditionalImagesChange = (e) => {
    if (!profileImagePreview) {
      alert("Please upload a profile picture first before uploading additional photos.");
      if (e.target) e.target.value = "";
      return;
    }
    const currentCount = additionalImagePreviews.length;
    if (currentCount >= 8) {
      alert("You can upload a maximum of 8 additional photos.");
      if (e.target) e.target.value = "";
      return;
    }
    let files = Array.from(e.target.files);
    if (currentCount + files.length > 8) {
      const allowed = 8 - currentCount;
      alert(`You can only upload up to ${allowed} more photo(s). Maximum allowed is 8 photos.`);
      files = files.slice(0, allowed);
    }
    const newPreviews = files.map(file => ({ url: URL.createObjectURL(file), file }));
    setAdditionalImageFiles(prev => [...prev, ...files]);
    setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
    if (e.target) e.target.value = "";
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
      const submitCurrentAddress = `${formData.currentDoorNo || ""}|||${formData.currentLocality || ""}|||${formData.currentCountry || ""}|||${formData.currentState || ""}|||${formData.currentDistrict || ""}|||${formData.currentPincode || ""}`;
      const submitPermanentAddress = formData.sameAsCurrentAddress
        ? submitCurrentAddress
        : `${formData.permanentDoorNo || ""}|||${formData.permanentLocality || ""}|||${formData.permanentCountry || ""}|||${formData.permanentState || ""}|||${formData.permanentDistrict || ""}|||${formData.permanentPincode || ""}`;

      const arrayFields = [
        "hobbies",
        "partnerEducation",
        "partnerEmploymentType",
        "partnerOccupation",
        "partnerCountry",
        "partnerState",
        "partnerDistrict"
      ];

      const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
        if (value !== "") {
          if (Array.isArray(value) && !arrayFields.includes(key)) {
            // Only join if it's an array of strings. Protect arrays of objects like paymentDetails.
            if (value.length === 0 || typeof value[0] === 'string') {
              acc[key] = value.join(",");
            } else {
              acc[key] = value;
            }
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      sanitizedData.currentAddress = submitCurrentAddress;
      sanitizedData.permanentAddress = submitPermanentAddress;

      if (formData.alternateMobile) {
        sanitizedData.contactPhone = formData.alternateMobile;
      }
      if (formData.alternateEmail) {
        sanitizedData.contactEmail = formData.alternateEmail;
      }

      const response = await updateUserById(id, sanitizedData);

      if (idProofFile) {
        const idFormData = new FormData();
        idFormData.append("idProof", idProofFile);
        try {
          await uploadIdProofByAdmin(id, idFormData);
        } catch (idErr) {
          console.error("Error uploading ID Proof:", idErr);
          showAlert({
            title: "Warning",
            text: "Profile updated, but failed to upload ID Proof.",
            icon: "warning",
          });
        }
      }

      if (profileImageFile || additionalImageFiles.length > 0 || deleteProfileImageFlag || deletedAdditionalImages.length > 0) {
        const imageFormData = new FormData();

        if (deleteProfileImageFlag) {
          imageFormData.append("deleteProfileImage", "true");
        }

        if (deletedAdditionalImages.length > 0) {
          deletedAdditionalImages.forEach((imgUrl) => {
            imageFormData.append("deletedAdditionalImages", imgUrl);
          });
        }

        if (profileImageFile) {
          try {
            if (profileImageFile.type.startsWith('image/')) {
              const compressedFile = await imageCompression(profileImageFile, compressionOptions);
              imageFormData.append("profileImage", compressedFile, profileImageFile.name);
            } else {
              imageFormData.append("profileImage", profileImageFile);
            }
          } catch (compErr) {
            console.error("Error compressing profile image:", compErr);
            imageFormData.append("profileImage", profileImageFile);
          }
        }
        if (additionalImageFiles.length > 0) {
          const compressedFiles = await Promise.all(
            additionalImageFiles.map(async (file) => {
              try {
                if (file.type.startsWith('image/')) {
                  const compressedFile = await imageCompression(file, compressionOptions);
                  return { file: compressedFile, name: file.name };
                }
                return { file, name: file.name };
              } catch (compErr) {
                console.error("Error compressing additional image:", compErr);
                return { file, name: file.name };
              }
            })
          );
          for (const { file, name } of compressedFiles) {
            imageFormData.append("additionalImages", file, name);
          }
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
        text: err.response?.data?.message || "Failed to update user",
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
  const renderField = (label, name, type = "text", options = null, col = "6", isMulti = false, required = false) => (
    <InputField
      key={name}
      label={label}
      name={name}
      type={type}
      options={options}
      isMulti={isMulti}
      col={col}
      required={required}
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

            </div>

            <div className="d-flex flex-column gap-4" id="profileSections">
              {/* AUTH & BASIC INFO */}
              <FormSection title="Basic Details" id="basic" >
                <InputField label="Full Name" name="userName" col="6" required value={formData.userName} onChange={handleChange} />
                <InputField label="Email Address" name="userEmail" type="email" col="6" required value={formData.userEmail} onChange={handleChange} />
                <InputField label="Mobile Number" name="userMobile" col="6" required value={formData.userMobile} onChange={handleChange} />
                <InputField label="Account Password" name="password" type="password" col="6" required value={formData.password} onChange={handleChange} />
                {renderField("About Me", "aboutMe", "textarea", null, "12")}
                <InputField label="Date of Birth" name="dateOfBirth" type="date" col="6" required value={formData.dateOfBirth} onChange={handleChange} />
                <InputField label="Gender" name="gender" options={DROPDOWN_OPTIONS.gender} col="6" required value={formData.gender} onChange={handleChange} />
                <InputField label="Profile Created By" name="profileCreatedFor" options={DROPDOWN_OPTIONS.profileCreatedFor} col="6" required value={formData.profileCreatedFor} onChange={handleChange} />
                <InputField label="Marital Status" name="maritalStatus" options={DROPDOWN_OPTIONS.maritalStatus} col="6" required value={formData.maritalStatus} onChange={handleChange} />
                <InputField label="Height" name="height" options={DROPDOWN_OPTIONS.height} col="6" required value={formData.height} onChange={handleChange} />
                <InputField label="Weight" name="weight" options={Array.from({ length: 101 }, (_, i) => String(i + 40))} col="6" required value={formData.weight} onChange={handleChange} />
                <InputField label="Body Type" name="bodyType" options={DROPDOWN_OPTIONS.bodyType} col="6" required value={formData.bodyType} onChange={handleChange} />
                <InputField label="Complexion" name="complexion" options={DROPDOWN_OPTIONS.complexion} col="6" required value={formData.complexion} onChange={handleChange} />
                <InputField label="Physical State" name="physicalStatus" options={DROPDOWN_OPTIONS.physicalStatus} col="6" required value={formData.physicalStatus} onChange={handleChange} />
                <InputField label="Age" name="age" options={Array.from({ length: 53 }, (_, i) => String(i + 18))} col="6" required value={formData.age} onChange={handleChange} />
                <InputField label="Eating Habits" name="eatingHabits" options={DROPDOWN_OPTIONS.eatingHabits} col="6" required value={formData.eatingHabits} onChange={handleChange} />
                <InputField label="Drinking Habits" name="drinkingHabits" options={DROPDOWN_OPTIONS.drinkingHabits} col="6" required value={formData.drinkingHabits} onChange={handleChange} />
                <InputField label="Smoking Habits" name="smokingHabits" options={DROPDOWN_OPTIONS.smokingHabits} col="6" required value={formData.smokingHabits} onChange={handleChange} />
                <InputField label="Mother Tongue" name="motherTongue" options={DROPDOWN_OPTIONS.motherTongue} col="6" required value={formData.motherTongue} onChange={handleChange} />
                <InputField label="Caste" name="caste" options={casteOptions} col="6" required value={formData.caste} onChange={handleChange} />
              </FormSection>

              {/* GALLERY */}
              <div id="gallery" className="mb-4">
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
              <FormSection title="Family Details" id="family" >
                <InputField label="Father's Name" name="fathersName" col="6" required value={formData.fathersName} onChange={handleChange} />
                {renderField("Father's Occupation", "fathersOccupation", "text", ["Retired", "Business", "Government Employee", "Private Employee", "Professional", "Farmer", "Homemaker", "Others"], "6")}
                <InputField label="Mother's Name" name="mothersName" col="6" required value={formData.mothersName} onChange={handleChange} />
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
                {renderField("Additional Details", "familyDetails", "textarea", null, "12")}
              </FormSection>

              {/* RELIGIOUS */}
              <FormSection title="Religious Information" id="religious" >
                {renderField("Denomination", "denomination", "text", denominationOptions, "6", false, true)}
                {renderField("Church Name", "church", "text", null, "6")}
                {renderField("Church Activity", "churchActivity", "text", DROPDOWN_OPTIONS.churchActivity, "6")}
                {renderField("Pastors Name", "pastorsName", "text", null, "6")}
                {renderField("Spirituality", "spirituality", "text", DROPDOWN_OPTIONS.spirituality, "6")}
                {renderField("Religious Detail", "religiousDetail", "textarea", null, "12")}
              </FormSection>

              {/* PROFESSIONAL */}
              <FormSection title="Professional Information" id="professional" >
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
              <FormSection title="Contact Information" id="contact" >
                {renderField("Contact Person Name", "contactPersonName", "text", null, "6", false, true)}
                {renderField("Relationship", "relationship", "text", DROPDOWN_OPTIONS.relationship, "6", false, true)}
                {renderField("Citizen Of", "citizenOf", "text", Country.getAllCountries().map(c => c.name), "6")}
                {renderField("Alternate Mobile", "contactPhone", "text", null, "6", false, true)}
                {renderField("Alternate Email", "contactEmail", "email", null, "6", false, true)}
                {renderField("Landline", "landlineNumber", "text", null, "6")}
                <div className="col-12 mt-4"> 
                  <h6 className="fw-bold border-bottom pb-2">Current Address</h6>
                </div>
                {renderField("Door / Flat No (Name), Street", "currentDoorNo", "text", null, "6", false, true)}
                {renderField("Locality / Area", "currentLocality", "text", null, "6", false, true)}
                {renderField("Country", "currentCountry", "text", Country.getAllCountries().map(c => c.name), "6", false, true)}
                {renderField("State", "currentState", "text", formData.currentCountry ? State.getStatesOfCountry(Country.getAllCountries().find(c => c.name === formData.currentCountry)?.isoCode || "").map(s => s.name) : [], "6", false, true)}
                {renderField("District", "currentDistrict", "text", getCitiesList(formData.currentCountry, formData.currentState), "6", false, true)}
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
                {renderField("District", "permanentDistrict", "text", getCitiesList(formData.permanentCountry, formData.permanentState), "6", false, true)}
                {renderField("Pincode", "permanentPincode", "text", null, "6")}
              </FormSection>

              {/* LIFESTYLE */}
              <FormSection title="Life style" id="lifestyle" >
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
              <FormSection title="Partner preference" id="partner" >
                {renderField("About Partner", "aboutPartner", "textarea", null, "12")}
                {renderField("Age From", "partnerAgeFrom", "text", Array.from({ length: 53 }, (_, i) => String(i + 18)), "6")}
                {renderField("Age To", "partnerAgeTo", "text", Array.from({ length: 53 }, (_, i) => String(i + 18)), "6")}
                {renderField("Desired Height From", "partnerHeight", "text", DROPDOWN_OPTIONS.height, "6")}
                {renderField("Desired Height To", "partnerHeightTo", "text", DROPDOWN_OPTIONS.height, "6")}
                {renderField("Preferred Marital Status", "partnerMaritalStatus", "text", DROPDOWN_OPTIONS.partnerMaritalStatus, "6", true)}
                {renderField("Preferred Mother Tongue", "partnerMotherTongue", "text", DROPDOWN_OPTIONS.partnerMotherTongue, "6", true)}
                {renderField("Preferred Caste", "partnerCaste", "text", partnerCasteOptions, "6", true)}
                {renderField("Preferred Physical Status", "partnerPhysicalStatus", "text", DROPDOWN_OPTIONS.partnerPhysicalStatus, "6", true)}
                {renderField("Preferred Eating Habits", "partnerEatingHabits", "text", DROPDOWN_OPTIONS.partnerEatingHabits, "6", true)}
                {renderField("Preferred Drinking Habits", "partnerDrinkingHabits", "text", DROPDOWN_OPTIONS.partnerDrinkingHabits, "6", true)}
                {renderField("Preferred Smoking Habits", "partnerSmokingHabits", "text", DROPDOWN_OPTIONS.partnerSmokingHabits, "6", true)}
                {renderField("Preferred Denomination", "partnerDenomination", "text", partnerDenominationOptions, "6", true)}
                {renderField("Preferred Spirituality", "partnerSpirituality", "text", DROPDOWN_OPTIONS.partnerSpirituality, "6", true)}
              </FormSection>

              {/* PARTNER PREFERENCES - PROFESSIONAL */}
              <FormSection title="Partner Preferences - Professional" id="partner_professional" >
                {renderField("Preferred Education", "partnerEducation", "text", DROPDOWN_OPTIONS.partnerEducation, "6", true)}
                {renderField("Preferred Employment Type", "partnerEmploymentType", "text", DROPDOWN_OPTIONS.partnerEmploymentType, "6", true)}
                {renderField("Preferred Occupation", "partnerOccupation", "text", DROPDOWN_OPTIONS.partnerOccupation, "6", true)}
                {renderField("Annual Income From", "partnerAnnualIncomeFrom", "text", ["50 Thousand", "1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore"], "6")}
                {renderField("Annual Income To", "partnerAnnualIncomeTo", "text", ["1 Lakh", "2 Lakhs", "3 Lakhs", "4 Lakhs", "5 Lakhs", "7 Lakhs", "10 Lakhs", "15 Lakhs", "20 Lakhs", "25 Lakhs", "30 Lakhs", "50 Lakhs", "75 Lakhs", "1 Crore", "Above 1 Crore"], "6")}
              </FormSection>

              {/* PARTNER PREFERENCES - LOCATION */}
              <FormSection title="Partner Preferences - location" id="partner_location" >
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
                          return getCitiesList(c.name, sName);
                        });
                      })))
                      : []
                  }
                  value={formData.partnerDistrict}
                  onChange={handleChange}
                />
              </FormSection>

              {/* UPLOAD PROOF */}
              <FormSection title="Upload Proof" id="upload_proof" >
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
