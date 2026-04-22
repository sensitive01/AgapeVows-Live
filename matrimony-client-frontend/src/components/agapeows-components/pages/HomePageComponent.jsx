import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import MainLayout from "../layout/MainLayout";
import QuickAccess from "../../QuickAccess";
import TrustBrands from "../../TrustBrands";
import WhyChooseUs from "../../WhyChooseUs";
import WelcomeTo from "../../WelcomeTo";
import CountModal from "../../CountModal";
import RecentCouples from "../../RecentCouples";
import GallaryStart from "../../GallaryStart";
import BlogPostStart from "../../BlogPostStart";
import FindYourPerfectMatchNow from "../../FindYourPerfectMatchNow";
import Footer from "../../Footer";
import CopyRights from "../../CopyRights";

// Hide scrollbar CSS
const scrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  html {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  
  body {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Communities data
const communities = [
  "Any",
  "Adventist",
  "AG (Assemblies of God)",
  "ACI (Anglican Church of India)",
  "Apostolic",
  "Assyrian",
  "Baptist",
  "Basel Mission",
  "Brethren",
  "Calvinist",
  "Cannonite",
  "Chaldean Syrian",
  "Cheramar",
  "Church of Christ",
  "Church of God",
  "CNI (Church of North India)",
  "Congregational",
  "CSI (Church of South India)",
  "Evangelical",
  "Indian Orthodox Christian",
  "IPC (Indian Pentecostal Church of God)",
  "Jewish",
  "Knanaya Catholic",
  "Knanaya Jacobite",
  "Knanaya Pentecostal",
  "Latin Catholic",
  "Latter Day Saints",
  "Lutheran",
  "Malabar Independent Syrian Church",
  "Malankara Catholic",
  "Malankara Mar Thoma (Marthoma)",
  "Melkite",
  "Mennonite",
  "Methodist",
  "Moravian",
  "Nadar Christian",
  "New Life Fellowship",
  "Orthodox",
  "Pentecost",
  "Presbyterian",
  "Protestant",
  "RC Anglo Indian",
  "Roman Catholic",
  "Salvation Army",
  "Seventh Day Adventist",
  "Syrian Catholic",
  "Syrian Orthodox",
  "Syro Malabar",
];

// States data
const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// Search dropdown component
const SearchDropdown = ({
  placeholder,
  options,
  value,
  onChange,
  searchTerm,
  onSearchChange,
  showDropdown,
  onToggleDropdown,
}) => {
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => onToggleDropdown(true)}
          className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={() => onToggleDropdown(!showDropdown)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto custom-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  onChange(option);
                  onSearchChange(option);
                  onToggleDropdown(false);
                }}
                className="px-4 py-2 hover:bg-purple-100 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0"
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();

  // Form data state with age range (no location)
  const [formData, setFormData] = useState({
    lookingFor: "Groom",
    ageFrom: 25,
    ageTo: 35,
    community: "",
  });

  // Search states
  const [communitySearch, setCommunitySearch] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);

  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images array
  const backgroundImages = [
    "https://i.pinimg.com/736x/75/cc/d2/75ccd26f56ea44b5fa45171ceac3cc56.jpg",
    "https://i.pinimg.com/1200x/9c/aa/9d/9caa9daf77921d0b2a18ffb3a98151ba.jpg",
    "https://i.pinimg.com/1200x/3a/00/ac/3a00ac10207b4fcfd87a93717d8aebc2.jpg",
  ];

  // Generate age options for dropdowns
  const generateAgeOptions = () => {
    const options = [];
    for (let i = 18; i <= 70; i++) {
      options.push(i);
    }
    return options;
  };

  const ageOptions = generateAgeOptions();

  // Auto-change background images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-dropdown")) {
        setShowCommunityDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle age from change with validation
  const handleAgeFromChange = (value) => {
    const newAgeFrom = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      ageFrom: newAgeFrom,
      ageTo: Math.max(newAgeFrom, prev.ageTo),
    }));
  };

  // Handle age to change with validation
  const handleAgeToChange = (value) => {
    const newAgeTo = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      ageTo: Math.max(prev.ageFrom, newAgeTo),
    }));
  };

  const handleSearchClick = () => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      // ✅ login irundha → data pass pannitu po
      navigate("/show-searched-result", {
        state: { formData: formData },
      });
    } else {
      // ❌ login illa → login + data save
      navigate("/user/user-login", {
        state: {
          from: "/show-searched-result",
          formData: formData, // 🔥 முக்கியம்
        },
      });
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Data:", formData);
  //   console.log("lookingFor:", formData.lookingFor);
  //   console.log("ageFrom:", formData.ageFrom);
  //   console.log("ageTo:", formData.ageTo);
  //   console.log("community:", formData.community);

  //   // Navigate to search results page with form data
  //   navigate("/show-searched-result", { state: { formData: formData } });
  // };


  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Logs (keep pannalaam)
    console.log("Form Data:", formData);
    console.log("lookingFor:", formData.lookingFor);
    console.log("ageFrom:", formData.ageFrom);
    console.log("ageTo:", formData.ageTo);
    console.log("community:", formData.community);

    // 🔐 Login check
    const isLoggedIn = localStorage.getItem("token");
    // or "userId"

    if (!isLoggedIn) {
      navigate("/user/user-login");
      return;
    }

    // ✅ If logged in
    navigate("/show-searched-result", {
      state: { formData: formData },
    });
  };

  // Calculate percentage for range slider
  const getPercentage = (value) => {
    return ((value - 18) / (70 - 18)) * 100;
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-orange-800">
      {/* Background Images with HIGH visibility - 85% opacity */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentBgIndex ? "opacity-85" : "opacity-0"
            }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {/* Minimal dark overlay - Only 15% for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-blue-900/10 to-purple-900/15"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Side - Hero Text with strong shadows for visibility */}
          <div className="text-center lg:text-left lg:flex-1">
            <h1
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
              style={{
                textShadow:
                  "3px 3px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
              }}
            >
              <span className="text-gray-200">#1</span> MATRIMONY
            </h1>
            <h2
              className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-2"
              style={{
                textShadow:
                  "3px 3px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
              }}
            >
              Find your
            </h2>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8"
              style={{
                textShadow:
                  "3px 3px 10px rgba(0,0,0,0.9), 0 0 25px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.6)",
              }}
            >
              <span className="text-purple-300">Right Match</span>{" "}
              <span className="text-white">here</span>
            </h2>

            <p
              className="text-white text-lg md:text-xl mb-12"
              style={{
                textShadow:
                  "2px 2px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)",
              }}
            >
              Most trusted Matrimony Brand in the World.
            </p>
          </div>

          {/* Right Side - Search Form with strong background */}
          <div
            className="rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl border border-white border-opacity-40"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Gender Selection */}
              <div>
                <label
                  className="block text-white text-sm font-medium mb-2 font-semibold"
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
                >
                  Looking For
                </label>
                <select
                  className="w-full bg-white text-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg font-medium"
                  value={formData.lookingFor}
                  onChange={(e) =>
                    handleInputChange("lookingFor", e.target.value)
                  }
                >
                  <option value="Groom">Groom</option>
                  <option value="Bride">Bride</option>
                </select>
              </div>

              {/* Age Range - Dual Handle Slider with Dropdowns */}
              <div>
                <label
                  className="block text-white text-sm font-medium mb-3 font-semibold uppercase tracking-wide"
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
                >
                  AGE
                </label>

                {/* Dual Range Slider */}
                <div className="relative pt-1 pb-6">
                  {/* Track */}
                  <div className="relative h-2 bg-gray-400 rounded-full">
                    {/* Active range highlight */}
                    <div
                      className="absolute h-2 bg-purple-600 rounded-full"
                      style={{
                        left: `${getPercentage(formData.ageFrom)}%`,
                        right: `${100 - getPercentage(formData.ageTo)}%`,
                      }}
                    ></div>

                    {/* From Handle */}
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={formData.ageFrom}
                      onChange={(e) => handleAgeFromChange(e.target.value)}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none range-slider"
                      style={{
                        zIndex: formData.ageFrom > formData.ageTo - 5 ? 5 : 3,
                      }}
                    />

                    {/* To Handle */}
                    <input
                      type="range"
                      min="18"
                      max="70"
                      value={formData.ageTo}
                      onChange={(e) => handleAgeToChange(e.target.value)}
                      className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none range-slider"
                      style={{ zIndex: 4 }}
                    />
                  </div>
                </div>

                {/* Min and Max Dropdowns */}
                <div className="flex items-center gap-2">
                  <select
                    value={formData.ageFrom}
                    onChange={(e) => handleAgeFromChange(e.target.value)}
                    className="flex-1 bg-white text-gray-700 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>

                  <span className="text-white font-medium px-2">to</span>

                  <select
                    value={formData.ageTo}
                    onChange={(e) => handleAgeToChange(e.target.value)}
                    className="flex-1 bg-white text-gray-700 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>
                        {age}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Community Search Dropdown */}
              <div className="search-dropdown">
                <label
                  className="block text-white text-sm font-medium mb-2 font-semibold"
                  style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
                >
                  Community
                </label>
                <SearchDropdown
                  placeholder="Choose your Christian Community"
                  options={communities}
                  value={formData.community}
                  onChange={(value) => handleInputChange("community", value)}
                  searchTerm={communitySearch}
                  onSearchChange={setCommunitySearch}
                  showDropdown={showCommunityDropdown}
                  onToggleDropdown={setShowCommunityDropdown}
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"   // ❗ முக்கியம் (submit இருந்து button ஆக மாற்று)
                onClick={handleSearchClick}   // ❗ function attach
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .opacity-85 {
          opacity: 0.85;
        }

        /* Custom scrollbar for dropdown */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #9333ea;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #7e22ce;
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #9333ea #f1f1f1;
        }

        /* Range slider styling */
        .range-slider {
          pointer-events: all;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 8px;
          background: transparent;
          margin: 0;
          padding: 0;
          z-index: 10;
        }

        .range-slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #9333ea;
          box-shadow: 0 2px 6px rgba(147, 51, 234, 0.4);
          cursor: pointer;
          position: relative;
          z-index: 11;
          margin-top: -4px;
        }

        .range-slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 8px;
          background: transparent;
        }

        .range-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #9333ea;
          box-shadow: 0 2px 6px rgba(147, 51, 234, 0.4);
          cursor: pointer;
        }

        .range-slider::-moz-range-track {
          width: 100%;
          height: 8px;
          background: transparent;
        }

        .range-slider::-ms-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #9333ea;
          box-shadow: 0 2px 6px rgba(147, 51, 234, 0.4);
          cursor: pointer;
        }

        .range-slider::-ms-fill-lower,
        .range-slider::-ms-fill-upper {
          background: transparent;
        }

        .range-slider:focus {
          outline: none;
        }

        .h-2.bg-gray-400.rounded-full {
          height: 8px !important;
          top: 0;
          position: relative !important;
          width: 100%;
        }
      `}</style>
    </section>
  );
};
// Main App Component
const HomePageComponent = () => {
  return (
    <div className="min-h-screen">
      {/* Add the scrollbar hiding styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />

      <div className="fixed top-0 left-0 right-0 z-50">
        <MainLayout />
      </div>
      <div className="pt-16">
        <HeroSection />
        <QuickAccess />
        <TrustBrands />
        <WhyChooseUs />
        <WelcomeTo />
        <CountModal />
        <RecentCouples />
        <GallaryStart />
        <BlogPostStart />
        <FindYourPerfectMatchNow />
        <Footer />
        {/* <CopyRights /> */}
      </div>
    </div>
  );
};

export default HomePageComponent;
