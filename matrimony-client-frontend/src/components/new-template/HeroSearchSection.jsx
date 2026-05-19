import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSearchSection.css';

// Import assets from new-template location
import bannerBg from '../../assets/new-template/images/ban-bg.jpg';
import bannerImg from '../../assets/new-template/images/banner.jpg';
import coupleImg1 from '../../assets/new-template/images/couples/1.jpg';
import coupleImg2 from '../../assets/new-template/images/couples/2.jpg';
import landingPageBg from '../../assets/images/landing-page.png';
import landingPageBg1 from '../../assets/images/landing-page1.png';
import landingPageBg2 from '../../assets/images/landing-page2.png';
import landingPageBg3 from '../../assets/images/landing-page3.png';

const backgroundImages = [
  landingPageBg,
  landingPageBg1,
  landingPageBg2,
  landingPageBg3
];

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
  // If the search term is the same as the selected value, show all options to allow changing
  const isSelectedValue = searchTerm === value;
  const filteredOptions = isSelectedValue 
    ? options 
    : options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="relative">
      <div className="relative group">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
            onToggleDropdown(true);
          }}
          onFocus={(e) => {
            e.target.select();
            onToggleDropdown(true);
          }}
          className="w-full bg-white text-gray-700 px-4 py-3 rounded-lg border border-gray-200 group-hover:border-purple-300 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-200 font-medium placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => {
            if (!showDropdown) onSearchChange(""); // Clear search to show all when opening via arrow
            onToggleDropdown(!showDropdown);
          }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
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
        <div className="absolute z-[9999] w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-2xl max-h-64 overflow-y-auto custom-scrollbar">
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

export default function HeroSearchSection() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    lookingFor: "Groom",
    ageFrom: 25,
    ageTo: 35,
    community: "",
  });

  const [communitySearch, setCommunitySearch] = useState("");
  const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000); // Transition every 6 seconds
    return () => clearInterval(timer);
  }, []);

  const ageOptions = Array.from({ length: 53 }, (_, i) => 18 + i);

  useEffect(() => {
    if (window.$ && window.$.fn.slick) {
      const $carousel = window.$('.ban-sli');
      if ($carousel.length && !$carousel.hasClass('slick-initialized')) {
        $carousel.slick({
          dots: false,
          infinite: true,
          speed: 1000,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
          fade: true,
          cssEase: 'linear'
        });
      }
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
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

  const handleAgeFromChange = (value) => {
    const newAgeFrom = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      ageFrom: newAgeFrom,
      ageTo: Math.max(newAgeFrom, prev.ageTo),
    }));
  };

  const handleAgeToChange = (value) => {
    const newAgeTo = parseInt(value);
    setFormData((prev) => ({
      ...prev,
      ageTo: Math.max(prev.ageFrom, newAgeTo),
    }));
  };

  const handleSearchClick = (e) => {
    if (e) e.preventDefault();
    const userId = localStorage.getItem("userId");

    // Always navigate to search results. 
    // The results page will handle blurred profiles for guests.
    navigate("/show-searched-result", {
      state: {
        formData: formData,
        isGuest: !userId
      },
    });
  };
  return (
    <div className="hero-main-wrapper">
      {/* BACKGROUND CAROUSEL */}
      <div className="hero-static-bg">
        {backgroundImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Matrimony Landing ${index + 1}`}
            className={`hero-carousel-slide ${index === currentImageIndex ? 'active' : ''}`}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>

      {/* HERO CONTENT & SEARCH */}
      <section
        className="hero-search-container"
        style={{ marginBottom: '-34px' }}
      >
        <div className="container">
          <div className="hero-content-wrapper">

            {/* Left Side: Professional Content */}
            <div className="hero-text-block">
              <div className="hero-badge">
                <span className="hero-badge-icon">†</span> India's Trusted Christian Matrimony
              </div>
              <h1>
                Christian Matrimony,<br/>
                <b>Built on Trust</b>
              </h1>
              <div className="hero-divider">
                <span className="hero-divider-line"></span>
                <i className="fa fa-heart hero-divider-icon"></i>
                <span className="hero-divider-line"></span>
              </div>
              <p>
                Connect with verified Christian singles who
                share your faith, values, and intention for
                a meaningful marriage.
              </p>
              <div className="hero-features">
                <div className="hero-feature-item">
                  <div className="hero-feature-icon-wrapper">
                    <svg className="hero-feature-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span>100%</span>
                    <span>Verified</span>
                    <span>Profiles</span>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <div className="hero-feature-icon-wrapper">
                    <svg className="hero-feature-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span>Safe &</span>
                    <span>Private</span>
                    <span>Platform</span>
                  </div>
                </div>
                <div className="hero-feature-item">
                  <div className="hero-feature-icon-wrapper">
                    <svg className="hero-feature-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span>Faith-Based</span>
                    <span>Matching</span>
                    <span>System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Modern Search Form */}
            <div className="hero-form-block">
              <div className="modern-search-card">
                <div className="search-card-head">
                  <h3>Search Verified Profiles</h3>
                </div>
                <form className="modern-form" onSubmit={handleSearchClick}>
                  <div className="form-group">
                    <label>I'M LOOKING FOR A</label>
                    <div className="gender-toggle-wrapper">
                      <button
                        type="button"
                        className={`gender-toggle-btn ${formData.lookingFor === 'Bride' ? 'active' : ''}`}
                        onClick={() => handleInputChange("lookingFor", "Bride")}
                      >
                        {formData.lookingFor === 'Bride' ? (
                          <i className="fa fa-check-circle gender-icon"></i>
                        ) : (
                          <i className="fa fa-circle-o gender-icon"></i>
                        )}
                        Bride
                      </button>
                      <button
                        type="button"
                        className={`gender-toggle-btn ${formData.lookingFor === 'Groom' ? 'active' : ''}`}
                        onClick={() => handleInputChange("lookingFor", "Groom")}
                      >
                        {formData.lookingFor === 'Groom' ? (
                          <i className="fa fa-check-circle gender-icon"></i>
                        ) : (
                          <i className="fa fa-circle-o gender-icon"></i>
                        )}
                        Groom
                      </button>
                    </div>
                  </div>

                  <div className="form-group age-form-group">
                    <label>AGE</label>
                    <div className="age-slider-wrapper">
                      <div className="slider-track" style={{
                        background: `linear-gradient(to right, #e5e7eb ${((formData.ageFrom - 18) / (70 - 18)) * 100}%, #7c3aed ${((formData.ageFrom - 18) / (70 - 18)) * 100}%, #7c3aed ${((formData.ageTo - 18) / (70 - 18)) * 100}%, #e5e7eb ${((formData.ageTo - 18) / (70 - 18)) * 100}%)`
                      }}></div>
                      <input
                        type="range"
                        min="18"
                        max="70"
                        value={formData.ageFrom}
                        onChange={(e) => handleAgeFromChange(e.target.value)}
                        className="age-range min-age"
                      />
                      <input
                        type="range"
                        min="18"
                        max="70"
                        value={formData.ageTo}
                        onChange={(e) => handleAgeToChange(e.target.value)}
                        className="age-range max-age"
                      />
                    </div>
                    <div className="age-dropdown-row">
                      <select
                        value={formData.ageFrom}
                        onChange={(e) => handleAgeFromChange(e.target.value)}
                        className="age-select"
                      >
                        {ageOptions.map(age => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                      <span className="age-to-text">to</span>
                      <select
                        value={formData.ageTo}
                        onChange={(e) => handleAgeToChange(e.target.value)}
                        className="age-select"
                      >
                        {ageOptions.map(age => (
                          <option key={age} value={age}>{age}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group search-dropdown" style={{ marginBottom: "25px" }}>
                    <label>CHRISTIAN COMMUNITY</label>
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

                  <button type="submit" className="hero-search-btn">
                    <i className="fa fa-search"></i> Search Profiles
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Custom scrollbar styles for community dropdown */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
}

