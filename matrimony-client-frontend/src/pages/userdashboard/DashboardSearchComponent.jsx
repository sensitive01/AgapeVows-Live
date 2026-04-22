import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalSearchModal from "../../components/GlobalSearchModal";

// Communities data (same as your hero section)
const communities = [
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

// States data (same as your hero section)
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

// Compact Search Dropdown Component
const CompactSearchDropdown = ({
  placeholder,
  options,
  value,
  onChange,
  className = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".compact-dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSearchTerm(option);
    onChange(option);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  return (
    <div
      className={`compact-dropdown-container position-relative ${className}`}
    >
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setShowDropdown(true)}
        style={{ fontSize: "12px" }}
      />

      {showDropdown && (
        <div
          className="dropdown-menu show position-absolute w-100"
          style={{
            top: "100%",
            left: 0,
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 1050,
            fontSize: "12px",
          }}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <button
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
                style={{ fontSize: "12px", padding: "4px 8px" }}
              >
                {option}
              </button>
            ))
          ) : (
            <div
              className="dropdown-item-text text-muted"
              style={{ fontSize: "12px" }}
            >
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Dashboard Search Component
const DashboardSearchComponent = ({ onSearch, loading = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lookingFor: "Groom",
    age: 28,
    community: "",
    location: "",
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search Data:", formData);
    if (onSearch) {
      onSearch(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      lookingFor: "Groom",
      age: 28,
      community: "",
      location: "",
    });
  };

  const handleSearchProfile = () => {
    navigate("/show-searched-result", { state: { formData: formData } });
  };

  return (
    <div className="card mb-4">
      <div className="card-body py-3">
        <form onSubmit={handleSearch}>
          <div className="row g-2 align-items-end">
            {/* Looking For */}
            <div className="col-md-2 col-sm-6">
              <label
                className="form-label mb-1"
                style={{ fontSize: "11px", fontWeight: "600" }}
              >
                Looking For
              </label>
              <select
                className="form-select form-select-sm"
                value={formData.lookingFor}
                onChange={(e) =>
                  handleInputChange("lookingFor", e.target.value)
                }
                style={{ fontSize: "12px" }}
              >
                <option value="Groom">Groom</option>
                <option value="Bride">Bride</option>
              </select>
            </div>

            {/* Age Slider */}
            <div className="col-md-2 col-sm-6">
              <div className="position-relative">
                <label
                  className="form-label mb-1"
                  style={{ fontSize: "11px", fontWeight: "600" }}
                >
                  Age: {formData.age}
                </label>
                <div className="position-relative">
                  <input
                    type="range"
                    min="18"
                    max="70"
                    value={formData.age}
                    onChange={(e) =>
                      handleInputChange("age", parseInt(e.target.value))
                    }
                    className="w-100 slider"
                    style={{
                      height: "12px",
                      background: `linear-gradient(to right, #9333ea 0%, #9333ea ${((formData.age - 18) / (70 - 18)) * 100
                        }%, #e5e7eb ${((formData.age - 18) / (70 - 18)) * 100
                        }%, #e5e7eb 100%)`,
                      borderRadius: "8px",
                      appearance: "none",
                      cursor: "pointer",
                    }}
                  />
                  {/* Tooltip */}
                  <div
                    className="position-absolute bg-dark text-white px-2 py-1 rounded"
                    style={{
                      top: "-40px",
                      left: `${((formData.age - 18) / (70 - 18)) * 100}%`,
                      transform: "translateX(-50%)",
                      fontSize: "12px",
                      pointerEvents: "none",
                    }}
                  >
                    {formData.age}
                    <div
                      className="position-absolute"
                      style={{
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "0",
                        height: "0",
                        borderLeft: "4px solid transparent",
                        borderRight: "4px solid transparent",
                        borderTop: "4px solid #000",
                      }}
                    ></div>
                  </div>
                </div>

                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #9333ea;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                  .slider::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #9333ea;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                  }
                `}</style>
              </div>
            </div>

            {/* Community */}
            <div className="col-md-3 col-sm-6">
              <label
                className="form-label mb-1"
                style={{ fontSize: "11px", fontWeight: "600" }}
              >
                Community
              </label>
              <CompactSearchDropdown
                placeholder="Select Community"
                options={communities}
                value={formData.community}
                onChange={(value) => handleInputChange("community", value)}
              />
            </div>

            {/* Location */}
            <div className="col-md-3 col-sm-6">
              <label
                className="form-label mb-1"
                style={{ fontSize: "11px", fontWeight: "600" }}
              >
                Location
              </label>
              <CompactSearchDropdown
                placeholder="Select State"
                options={states}
                value={formData.location}
                onChange={(value) => handleInputChange("location", value)}
              />
            </div>

            {/* Search Buttons */}
            <div className="col-md-2 col-sm-12">
              <div className="d-flex gap-1">
                <button
                  type="submit"
                  className="btn btn-secondary btn-sm flex-fill"
                  disabled={loading}
                  style={{ fontSize: "12px" }}
                  onClick={handleSearchProfile}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-1"
                        role="status"
                      ></span>
                      Search
                    </>
                  ) : (
                    <>
                      <i className="fa fa-search me-1"></i>
                      Search
                    </>
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleReset}
                  style={{ fontSize: "12px" }}
                >
                  <i className="fa fa-refresh"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/user/find-matches")}
                  style={{ fontSize: "12px" }}
                  title="Advanced / Global Search"
                >
                  <i className="fa fa-sliders"></i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Global Search Modal Triggered from Dashboard */}
      {/* Global Search Page Link - Component removed */}
    </div>
  );
};

export default DashboardSearchComponent;
