import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSearchSection.css';

// Import assets from new-template location
import bannerBg from '../../assets/new-template/images/ban-bg.jpg';
import bannerImg from '../../assets/new-template/images/banner.jpg';
import coupleImg1 from '../../assets/new-template/images/couples/1.jpg';
import coupleImg2 from '../../assets/new-template/images/couples/2.jpg';

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
          style={{ border: '1px solid #ddd' }}
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

    if (userId) {
      navigate("/show-searched-result", {
        state: { formData: formData },
      });
    } else {
      // Save redirect info in sessionStorage
      sessionStorage.setItem("redirectAfterLogin", "/show-searched-result");
      sessionStorage.setItem("searchData", JSON.stringify(formData));

      // Open Login Popup
      const menuPop = document.querySelector('.menu-pop1');
      const popBg = document.querySelector('.pop-bg');

      if (menuPop) menuPop.classList.add('act');
      if (popBg) popBg.classList.add('act');

      document.body.style.overflow = 'hidden';
    }
  }
  return (
    <div className="hero-main-wrapper">
      {/* BANNER SLIDER (BACKGROUND) */}
      <section className="hom-ban-sli">
        <div>
          <ul className="ban-sli">
            <li>
              <div>
                <img src={bannerBg} alt="Wedding Banner 1" loading="lazy" />
              </div>
            </li>
            <li>
              <div>
                <img src={bannerImg} alt="Wedding Banner 2" loading="lazy" />
              </div>
            </li>
            <li>
              <div>
                <img src={coupleImg1} alt="Recent Couple 1" loading="lazy" />
              </div>
            </li>
            <li>
              <div>
                <img src={coupleImg2} alt="Recent Couple 2" loading="lazy" />
              </div>
            </li>
          </ul>
        </div>
      </section>

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
                <i className="fa fa-star"></i> #1 Trusted Matrimony Brand
              </div>
              <h1>
                Begin Your Journey to
                <b>Eternal Love</b>
              </h1>
              <p>
                Discover meaningful connections and find your perfect life partner
                among thousands of verified profiles. Join the world's most trusted
                matrimony platform today.
              </p>
              <div className="hero-features">
                <div className="hero-feature-item">
                  <i className="fa fa-check"></i> 100% Verified Profiles
                </div>
                <div className="hero-feature-item">
                  <i className="fa fa-lock"></i> Secure & Private
                </div>
                <div className="hero-feature-item">
                  <i className="fa fa-heart"></i> Successful Stories
                </div>
              </div>
            </div>

            {/* Right Side: Modern Search Form */}
            <div className="hero-form-block">
              <div className="modern-search-card">
                <div className="search-card-head">
                  <h3>Find Your Match</h3>
                  <p>Fast & Efficient Way to Search</p>
                </div>
                <form className="modern-form" onSubmit={handleSearchClick}>
                  <div className="form-group">
                    <label>I'm looking for a</label>
                    <select
                      className="form-control"
                      value={formData.lookingFor}
                      onChange={(e) => handleInputChange("lookingFor", e.target.value)}
                    >
                      <option value="Bride">Bride (Woman)</option>
                      <option value="Groom">Groom (Man)</option>
                    </select>
                  </div>

                  <div className="form-group age-form-group">
                    <label>AGE</label>
                    <div className="age-slider-wrapper">
                      <div className="slider-track" style={{
                        background: `linear-gradient(to right, rgba(255,255,255,0.3) ${((formData.ageFrom - 18) / (70 - 18)) * 100}%, #9b4dff ${((formData.ageFrom - 18) / (70 - 18)) * 100}%, #9b4dff ${((formData.ageTo - 18) / (70 - 18)) * 100}%, rgba(255,255,255,0.3) ${((formData.ageTo - 18) / (70 - 18)) * 100}%)`
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

                  <div className="form-group search-dropdown">
                    <label>Religion / Community</label>
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

