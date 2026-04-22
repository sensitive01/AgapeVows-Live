import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowLeft, ChevronDown } from "lucide-react";
import MainLayout from "./agapeows-components/layout/MainLayout";
import Footer from "./Footer";
import { Country, State, City } from "country-state-city";

import { getUserProfile } from "../api/axiosService/userAuthService";

const generateHeightOptions = () => {
  const options = [];
  for (let ft = 4; ft <= 7; ft++) {
    for (let inch = 0; inch <= 11; inch++) {
      options.push({
        value: `${ft}.${inch}`,
        label: inch === 0 ? `${ft}ft` : `${ft}ft ${inch}in`,
      });
    }
  }
  options.push({ value: "8.0", label: "8ft" });
  return options;
};

const heightOptions = generateHeightOptions();

// Sample Data for Dropdowns
const CASTES = [
  "Brahmin",
  "Nair",
  "Ezhava",
  "Christian - RC",
  "Muslim - Sunni",
  "Other",
];
const DENOMINATIONS = [
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
];
const MOTHER_TONGUES = [
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
];
const EDUCATIONS = [
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
];
const OCCUPATIONS = [
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
  "Other",
];

const CustomSelect = ({ options, value, onChange, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Helper to determine if options are objects
  const isObject = options.length > 0 && typeof options[0] === "object";

  const filteredOptions = options.filter((option) => {
    const label = isObject ? option.label : option;
    return label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Find label for currently selected value
  const getDisplayValue = () => {
    if (!value) return placeholder;
    if (isObject) {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : value;
    }
    return value;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm bg-white cursor-pointer flex justify-between items-center outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minHeight: "38px" }}
      >
        <span className={value ? "text-gray-900" : "text-gray-500"}>
          {getDisplayValue()}
        </span>
        <ChevronDown className="w-4 h-4 text-gray-500" />
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-white border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onKeyDown={(e) => e.stopPropagation()}
            />
          </div>
          <div
            className="px-3 py-2 text-sm hover:bg-purple-50 cursor-pointer text-gray-700 font-medium border-b border-gray-100"
            onClick={() => {
              onChange("");
              setIsOpen(false);
              setSearchTerm("");
            }}
          >
            Select
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const optValue = isObject ? option.value : option;
              const optLabel = isObject ? option.label : option;
              const isSelected = value === optValue;

              return (
                <div
                  key={optValue}
                  className={`px-3 py-2 text-sm hover:bg-purple-50 cursor-pointer text-gray-700 ${isSelected ? "bg-purple-50 text-purple-700 font-medium" : ""}`}
                  onClick={() => {
                    onChange(optValue);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {optLabel}
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500 text-center">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const AGE_FROM_OPTIONS = [...Array(43)].map((_, i) => (18 + i).toString());
const AGE_TO_OPTIONS = [...Array(53)].map((_, i) => (18 + i).toString());

const INCOME_OPTIONS = [
  { value: "0.5", label: "50 Thousands" },
  { value: "1", label: "1 Lakh" },
  { value: "2", label: "2 Lakhs" },
  { value: "3", label: "3 Lakhs" },
  { value: "4", label: "4 Lakhs" },
  { value: "5", label: "5 Lakhs" },
  { value: "6", label: "6 Lakhs" },
  { value: "7", label: "7 Lakhs" },
  { value: "8", label: "8 Lakhs" },
  { value: "9", label: "9 Lakhs" },
  { value: "10", label: "10 Lakhs" },
  { value: "12", label: "12 Lakhs" },
  { value: "14", label: "14 Lakhs" },
  { value: "16", label: "16 Lakhs" },
  { value: "18", label: "18 Lakhs" },
  { value: "20", label: "20 Lakhs" },
  { value: "25", label: "25 Lakhs" },
  { value: "30", label: "30 Lakhs" },
  { value: "35", label: "35 Lakhs" },
  { value: "40", label: "40 Lakhs" },
  { value: "50", label: "50 Lakhs" },
  { value: "60", label: "60 Lakhs" },
  { value: "70", label: "70 Lakhs" },
  { value: "80", label: "80 Lakhs" },
  { value: "90", label: "90 Lakhs" },
  { value: "100", label: "1 Crore" },
  { value: "101", label: "1 Crore+" },
];

const GlobalSearchModal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("quick");
  const [bnrId, setBnrId] = useState("");

  const userId = localStorage.getItem("userId");

  // Search Form State
  const [formData, setFormData] = useState({
    // Quick Search
    ageFrom: "18",
    ageTo: "30",
    caste: "",
    maritalStatus: [], // changed to array for multiple selection
    denomination: "",
    gender: "", // Initialize gender
    // Regular Search (adds)
    heightFrom: "",
    heightTo: "",
    motherTongue: "",
    // Advanced Search (adds)
    physicalStatus: [],
    education: "",
    occupation: "",
    annualIncomeFrom: "",
    annualIncomeTo: "",
    country: "",
    state: "",
    districtCity: "",
    familyStatus: [],
    showWithPhoto: false,
    dontShowIgnored: false,
    dontShowViewed: false,
    dontShowShortlisted: false,
    numberOfChildren: "", // Added for child status
    childrenStatus: "",
  });

  const handlePhysicalStatusChange = (status) => {
    setFormData((prev) => {
      let newStatus = [...(prev.physicalStatus || [])];

      if (status === "Doesn't Matter") {
        if (newStatus.includes("Doesn't Matter")) {
          // If "Doesn't Matter" is already selected and clicked again, deselect all
          return { ...prev, physicalStatus: [] };
        } else {
          // Select "Doesn't Matter" and automatically select all other options
          const allStatuses = [
            "Doesn't Matter",
            "Normal",
            "Physically Challenged",
          ];
          return { ...prev, physicalStatus: allStatuses };
        }
      } else {
        // Normal toggle for other options
        if (newStatus.includes("Doesn't Matter")) {
          // If "Doesn't Matter" is selected, others are blocked. Do nothing.
          return prev;
        }

        if (newStatus.includes(status)) {
          newStatus = newStatus.filter((s) => s !== status);
        } else {
          newStatus.push(status);
        }
        return { ...prev, physicalStatus: newStatus };
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const response = await getUserProfile(userId);
        if (response.status === 200) {
          const user = response.data.data;
          let searchGender = "";
          if (user.gender === "Male" || user.gender === "Groom") {
            searchGender = "Female";
          } else if (user.gender === "Female" || user.gender === "Bride") {
            searchGender = "Male";
          }
          if (searchGender) {
            setFormData((prev) => ({ ...prev, gender: searchGender }));
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchData();
  }, [userId]);

  // Dynamic Location Options
  const allCountries = Country.getAllCountries().map((c) => ({
    value: c.isoCode,
    label: c.name,
  }));

  const allStates = formData.country
    ? State.getStatesOfCountry(formData.country).map((s) => ({
      value: s.isoCode,
      label: s.name,
    }))
    : [];

  const allCities =
    formData.country && formData.state
      ? City.getCitiesOfState(formData.country, formData.state).map((c) => ({
        value: c.name,
        label: c.name,
      }))
      : [];

  const handleInputChange = (field, value) => {
    setFormData((prev) => {
      const updates = { [field]: value };

      // Cascading resets for location
      if (field === "country") {
        updates.state = "";
        updates.districtCity = "";
      } else if (field === "state") {
        updates.districtCity = "";
      }

      return { ...prev, ...updates };
    });
  };

  const handleSearch = () => {
    // Navigate to search results with data
    navigate("/show-searched-result", {
      state: {
        searchType: activeTab,
        formData: formData,
      },
    });
  };

  const handleBnrSearch = () => {
    if (!bnrId.trim()) {
      alert("Please enter an AGWID ID");
      return;
    }
    navigate("/show-searched-result", {
      state: {
        searchType: "bnr",
        bnrId: bnrId,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MainLayout />
      </div>

      <div style={{ paddingTop: "20px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-12 col-lg-12"
                style={{ paddingLeft: "15px", paddingRight: "15px" }}
              >
                {/* Main Content - Single Section */}
                <div className="bg-white rounded-lg shadow-md">
                  <div className="p-3 md:p-4">
                    {/* Heading */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Search className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <h1 className="text-xl font-semibold text-gray-900">
                            Find Your Match
                          </h1>
                          <p className="text-xs text-gray-500">
                            Search profiles based on your preferences
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Search by AGWID ID */}
                    <div className="flex justify-center mb-3">
                      <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md bg-gradient-to-r from-purple-50 to-pink-50 p-3 rounded-lg border border-purple-200">
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                          Search by AGVID ID:
                        </span>
                        <input
                          type="text"
                          className="w-full flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          placeholder="Enter ID"
                          value={bnrId}
                          onChange={(e) => setBnrId(e.target.value)}
                        />
                        <button
                          onClick={handleBnrSearch}
                          className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Search
                        </button>
                      </div>
                    </div>

                    <div className="relative mb-3">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">OR</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 bg-gray-100 rounded-lg p-1 mb-6">
                      <button
                        className={`py-2 text-sm font-medium rounded-md transition-all
${activeTab === "quick"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        onClick={() => setActiveTab("quick")}
                      >
                        Quick Search
                      </button>
                      <button
                        className={`py-3 text-center text-xs md:text-sm font-medium transition-all px-1 h-full flex items-center justify-center ${activeTab === "regular"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        onClick={() => setActiveTab("regular")}
                      >
                        Regular Search
                      </button>
                      <button
                        className={`py-3 text-center text-xs md:text-sm font-medium transition-all px-1 h-full flex items-center justify-center ${activeTab === "advanced"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                          }`}
                        onClick={() => setActiveTab("advanced")}
                      >
                        Advanced Search
                      </button>
                    </div>

                    {/* Tab Content */}
                    <div className="bg-white rounded-b-lg text-sm">
                      {/* Quick Search Fields */}
                      {activeTab === "quick" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 pb-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Age
                            </label>
                            <div className="flex items-center gap-2 w-full md:w-2/3">
                              <CustomSelect
                                className="w-full"
                                options={AGE_FROM_OPTIONS}
                                value={formData.ageFrom.toString()}
                                onChange={(val) =>
                                  handleInputChange("ageFrom", val)
                                }
                                placeholder="From"
                              />
                              <span className="text-xs">To</span>
                              <CustomSelect
                                className="w-full"
                                options={AGE_TO_OPTIONS}
                                value={formData.ageTo.toString()}
                                onChange={(val) =>
                                  handleInputChange("ageTo", val)
                                }
                                placeholder="To"
                              />
                              <span className="text-xs text-gray-500 hidden sm:inline">
                                Years
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Marital Status
                            </label>
                            <CustomSelect
                              className="w-full md:w-2/3"
                              options={[
                                "Any",
                                "Never Married",
                                "Separated",
                                "Divorced",
                                "Widow / Widower",
                                "Awaiting Divorce",
                                "Annulled",
                              ]}
                              value={
                                Array.isArray(formData.maritalStatus)
                                  ? formData.maritalStatus[0]
                                  : formData.maritalStatus
                              }
                              onChange={(val) => {
                                if (val === "Any") {
                                  const allStatuses = [
                                    "Any",
                                    "Never Married",
                                    "Separated",
                                    "Divorced",
                                    "Widow / Widower",
                                    "Awaiting Divorce",
                                    "Annulled",
                                  ];
                                  handleInputChange(
                                    "maritalStatus",
                                    allStatuses,
                                  );
                                } else {
                                  handleInputChange(
                                    "maritalStatus",
                                    val ? [val] : [],
                                  );
                                }
                              }}
                              placeholder="Select"
                            />
                          </div>

                          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Denomination
                            </label>
                            <CustomSelect
                              className="w-full md:w-2/3"
                              options={DENOMINATIONS}
                              value={formData.denomination}
                              onChange={(val) =>
                                handleInputChange("denomination", val)
                              }
                              placeholder="Select"
                            />
                          </div>
                        </div>
                      )}

                      {/* Regular Search Fields */}
                      {activeTab === "regular" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                            {/* Age */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Age
                              </label>
                              <div className="flex items-center gap-2 w-full md:w-2/3">
                                <CustomSelect
                                  className="w-full"
                                  options={AGE_FROM_OPTIONS}
                                  value={formData.ageFrom.toString()}
                                  onChange={(val) =>
                                    handleInputChange("ageFrom", val)
                                  }
                                  placeholder="From"
                                />
                                <span className="text-sm">To</span>
                                <CustomSelect
                                  className="w-full"
                                  options={AGE_TO_OPTIONS}
                                  value={formData.ageTo.toString()}
                                  onChange={(val) =>
                                    handleInputChange("ageTo", val)
                                  }
                                  placeholder="To"
                                />
                                <span className="text-xs md:text-sm text-gray-500 hidden sm:inline">
                                  Years
                                </span>
                              </div>
                            </div>

                            {/* Height */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Height
                              </label>
                              <div className="flex items-center gap-2 w-full md:w-2/3">
                                <CustomSelect
                                  className="w-full"
                                  options={heightOptions}
                                  value={formData.heightFrom}
                                  onChange={(val) =>
                                    handleInputChange("heightFrom", val)
                                  }
                                  placeholder="Select"
                                />
                                <span className="text-xs">To</span>
                                <CustomSelect
                                  className="w-full"
                                  options={heightOptions}
                                  value={formData.heightTo}
                                  onChange={(val) =>
                                    handleInputChange("heightTo", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                            </div>

                            {/* Mother Tongue */}
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-0">
                              <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                                Mother Tongue
                              </label>
                              <CustomSelect
                                className="w-full md:w-2/3"
                                options={MOTHER_TONGUES}
                                value={formData.motherTongue}
                                onChange={(val) =>
                                  handleInputChange("motherTongue", val)
                                }
                                placeholder="Select"
                              />
                            </div>
                          </div>

                          {/* Marital Status */}
                          <div className="flex flex-col md:flex-row items-center mt-4 gap-2 md:gap-0">
                            <label className="w-full md:w-1/3 text-gray-700 font-medium text-xs md:text-sm">
                              Marital Status
                            </label>
                            <CustomSelect
                              className="w-full md:w-2/3"
                              options={[
                                "Any",
                                "Never Married",
                                "Separated",
                                "Divorced",
                                "Widow / Widower",
                                "Awaiting Divorce",
                                "Annulled",
                              ]}
                              value={
                                Array.isArray(formData.maritalStatus)
                                  ? formData.maritalStatus[0]
                                  : formData.maritalStatus
                              }
                              onChange={(val) => {
                                if (val === "Any") {
                                  const allStatuses = [
                                    "Any",
                                    "Never Married",
                                    "Separated",
                                    "Divorced",
                                    "Widow / Widower",
                                    "Awaiting Divorce",
                                    "Annulled",
                                  ];
                                  handleInputChange(
                                    "maritalStatus",
                                    allStatuses,
                                  );
                                } else {
                                  handleInputChange(
                                    "maritalStatus",
                                    val ? [val] : [],
                                  );
                                }
                              }}
                              placeholder="Select"
                            />
                          </div>

                          {/* Child Status - Conditional Display */}
                          {formData.maritalStatus &&
                            formData.maritalStatus.length > 0 &&
                            !formData.maritalStatus.includes(
                              "Never Married",
                            ) && (
                              <div className="flex flex-col md:flex-row items-start mt-4 gap-2 md:gap-0">
                                <label className="w-full md:w-1/6 text-gray-700 font-medium pt-0 md:pt-1 text-xs md:text-sm">
                                  Child Status
                                </label>
                                <div className="w-full md:w-5/6 flex flex-wrap gap-4">
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs md:text-sm text-gray-600">
                                      No. of Children
                                    </label>
                                    <select
                                      className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                                      value={formData.numberOfChildren}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "numberOfChildren",
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      <option value="None">None</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3+">3+</option>
                                    </select>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label className="text-xs md:text-sm text-gray-600">
                                      Children Living Status
                                    </label>
                                    <select
                                      className="border border-gray-300 rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                                      value={formData.childrenStatus}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "childrenStatus",
                                          e.target.value,
                                        )
                                      }
                                    >
                                      <option value="">Select</option>
                                      <option value="Living with me">
                                        Living with me
                                      </option>
                                      <option value="Not living with me">
                                        Not living with me
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                          {/* More Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Caste
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={CASTES}
                                value={formData.caste}
                                onChange={(val) =>
                                  handleInputChange("caste", val)
                                }
                                placeholder="Select"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Denomination
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={DENOMINATIONS}
                                value={formData.denomination}
                                onChange={(val) =>
                                  handleInputChange("denomination", val)
                                }
                                placeholder="Select"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Education
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={EDUCATIONS}
                                value={formData.education}
                                onChange={(val) =>
                                  handleInputChange("education", val)
                                }
                                placeholder="Select"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Country
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={allCountries}
                                value={formData.country}
                                onChange={(val) =>
                                  handleInputChange("country", val)
                                }
                                placeholder="Select"
                              />
                            </div>

                            <div className="flex flex-col gap-2">
                              {/* Advanced Search uses Country, State, District/City logic */}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Advanced Search */}
                      {activeTab === "advanced" && (
                        <div className="space-y-6">
                          {/* Basic Fields */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Age */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Age
                                </label>
                                <div className="flex items-center gap-2">
                                  <CustomSelect
                                    className="flex-1"
                                    options={AGE_FROM_OPTIONS}
                                    value={formData.ageFrom.toString()}
                                    onChange={(val) =>
                                      handleInputChange("ageFrom", val)
                                    }
                                    placeholder="From"
                                  />
                                  <span className="text-xs">To</span>
                                  <CustomSelect
                                    className="flex-1"
                                    options={AGE_TO_OPTIONS}
                                    value={formData.ageTo.toString()}
                                    onChange={(val) =>
                                      handleInputChange("ageTo", val)
                                    }
                                    placeholder="To"
                                  />
                                  <span className="text-xs text-gray-500 hidden sm:inline">
                                    Years
                                  </span>
                                </div>
                              </div>

                              {/* Height */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Height
                                </label>
                                <div className="flex items-center gap-2">
                                  <CustomSelect
                                    className="w-full"
                                    options={heightOptions}
                                    value={formData.heightFrom}
                                    onChange={(val) =>
                                      handleInputChange("heightFrom", val)
                                    }
                                    placeholder="Select"
                                  />
                                  <span className="text-xs">To</span>
                                  <CustomSelect
                                    className="w-full"
                                    options={heightOptions}
                                    value={formData.heightTo}
                                    onChange={(val) =>
                                      handleInputChange("heightTo", val)
                                    }
                                    placeholder="Select"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {/* Mother Tongue */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Mother Tongue
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={MOTHER_TONGUES}
                                  value={formData.motherTongue}
                                  onChange={(val) =>
                                    handleInputChange("motherTongue", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>

                              {/* Caste */}
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Caste
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={CASTES}
                                  value={formData.caste}
                                  onChange={(val) =>
                                    handleInputChange("caste", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                            </div>

                            {/* Denomination */}
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Denomination
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={DENOMINATIONS}
                                value={formData.denomination}
                                onChange={(val) =>
                                  handleInputChange("denomination", val)
                                }
                                placeholder="Select"
                              />
                            </div>

                            {/* Marital Status */}
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Marital Status
                              </label>
                              <CustomSelect
                                className="w-full"
                                options={[
                                  "Any",
                                  "Never Married",
                                  "Separated",
                                  "Divorced",
                                  "Widow / Widower",
                                  "Awaiting Divorce",
                                  "Annulled",
                                ]}
                                value={
                                  Array.isArray(formData.maritalStatus)
                                    ? formData.maritalStatus[0]
                                    : formData.maritalStatus
                                }
                                onChange={(val) => {
                                  if (val === "Any") {
                                    const allStatuses = [
                                      "Any",
                                      "Never Married",
                                      "Separated",
                                      "Divorced",
                                      "Widow / Widower",
                                      "Awaiting Divorce",
                                      "Annulled",
                                    ];
                                    handleInputChange(
                                      "maritalStatus",
                                      allStatuses,
                                    );
                                  } else {
                                    handleInputChange(
                                      "maritalStatus",
                                      val ? [val] : [],
                                    );
                                  }
                                }}
                                placeholder="Select"
                              />
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Physical Status */}
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                              Physical Status
                            </h4>
                            <div className="flex flex-wrap gap-3 md:gap-4">
                              {[
                                "Doesn't Matter",
                                "Normal",
                                "Physically Challenged",
                              ].map((status) => (
                                <label
                                  key={status}
                                  className={`flex items-center gap-2 cursor-pointer ${formData.physicalStatus.includes("Doesn't Matter") && status !== "Doesn't Matter" ? "opacity-50" : ""}`}
                                >
                                  <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    checked={(
                                      formData.physicalStatus || []
                                    ).includes(status)}
                                    onChange={() =>
                                      handlePhysicalStatusChange(status)
                                    }
                                    disabled={
                                      formData.physicalStatus.includes(
                                        "Doesn't Matter",
                                      ) && status !== "Doesn't Matter"
                                    }
                                  />
                                  <span className="text-gray-700 text-xs md:text-sm">
                                    {status}
                                  </span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Professional Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                              Professional Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Education
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={EDUCATIONS}
                                  value={formData.education}
                                  onChange={(val) =>
                                    handleInputChange("education", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Occupation
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={OCCUPATIONS}
                                  value={formData.occupation}
                                  onChange={(val) =>
                                    handleInputChange("occupation", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="text-gray-700 font-medium text-xs md:text-sm">
                                Annual Income
                              </label>
                              <div className="flex items-center gap-2">
                                <CustomSelect
                                  className="flex-1"
                                  options={INCOME_OPTIONS}
                                  value={formData.annualIncomeFrom}
                                  onChange={(val) =>
                                    handleInputChange("annualIncomeFrom", val)
                                  }
                                  placeholder="Any"
                                />
                                <span className="text-xs text-gray-500">
                                  To
                                </span>
                                <CustomSelect
                                  className="flex-1"
                                  options={INCOME_OPTIONS}
                                  value={formData.annualIncomeTo}
                                  onChange={(val) =>
                                    handleInputChange("annualIncomeTo", val)
                                  }
                                  placeholder="Any"
                                />
                              </div>
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Location Details */}
                          <div className="space-y-3">
                            <h4 className="font-semibold text-gray-800 text-sm md:text-base">
                              Location Details
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  Country
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={allCountries}
                                  value={formData.country}
                                  onChange={(val) =>
                                    handleInputChange("country", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  State
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={allStates}
                                  value={formData.state}
                                  onChange={(val) =>
                                    handleInputChange("state", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-gray-700 font-medium text-xs md:text-sm">
                                  District/City
                                </label>
                                <CustomSelect
                                  className="w-full"
                                  options={allCities}
                                  value={formData.districtCity}
                                  onChange={(val) =>
                                    handleInputChange("districtCity", val)
                                  }
                                  placeholder="Select"
                                />
                              </div>
                            </div>
                          </div>

                          <hr className="border-gray-200" />

                          {/* Family Details & Display Settings */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
                            {/* Family Details */}
                            <div>
                              <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                Family Details
                              </h4>
                              <p className="text-xs md:text-sm text-gray-600 mb-2">
                                Family Status
                              </p>
                              <div className="flex flex-wrap gap-3">
                                {[
                                  "Lower Middle Class",
                                  "Middle Class",
                                  "Upper Middle Class",
                                  "Rich",
                                  "Affluent",
                                ].map((status) => (
                                  <label
                                    key={status}
                                    className="flex items-center gap-2 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      {status}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            {/* Display Settings */}
                            <div className="space-y-4">
                              {/* Show Profiles */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                  Show Profiles
                                </h4>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                    checked={formData.showWithPhoto}
                                    onChange={(e) =>
                                      handleInputChange(
                                        "showWithPhoto",
                                        e.target.checked,
                                      )
                                    }
                                  />
                                  <span className="text-gray-700 text-xs md:text-sm">
                                    With Photo
                                  </span>
                                </label>
                              </div>

                              {/* Don't Show */}
                              <div>
                                <h4 className="font-semibold text-gray-800 mb-3 text-sm md:text-base">
                                  Don't show
                                </h4>
                                <div className="flex flex-col gap-2">
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowIgnored}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowIgnored",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Ignored Profiles
                                    </span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowViewed}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowViewed",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Viewed Profiles
                                    </span>
                                  </label>
                                  <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="checkbox"
                                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
                                      checked={formData.dontShowShortlisted}
                                      onChange={(e) =>
                                        handleInputChange(
                                          "dontShowShortlisted",
                                          e.target.checked,
                                        )
                                      }
                                    />
                                    <span className="text-gray-700 text-xs md:text-sm">
                                      Shortlisted Profiles
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bottom Action Bar */}
                      <div className="flex justify-center mt-6 pt-4 border-t border-gray-200">
                        <button
                          onClick={handleSearch}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-sm transition-all transform hover:scale-105"
                        >
                          Search Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GlobalSearchModal;
