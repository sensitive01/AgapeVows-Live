import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Search,
  Phone,
  Mail,
  Facebook,
  Twitter,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  User,
  Youtube,
  Instagram,
} from "lucide-react";
import logo from "../../../assets/images/Logo-new.png";
import { getUserProfile } from "../../../api/axiosService/userAuthService";
/* import profileImg from "../../../assets/images/profiles/1.jpg"; */ // Removed as we use generic icon now
import PreLoader from "../../PreLoader";
import GlobalSearchModal from "../../GlobalSearchModal";
import SidebarLoginComponent from "../../new-template/SidebarLoginComponent";

export const SERVICE_CATEGORIES = [
  { title: "Personalized Matrimony", path: "/personalized-matrimony" },
  { title: "NRI Matrimony", path: "/nri-matrimony" },
  { title: "Churches - Partner with Us", path: "/church-partner" },
  { title: "Become a Matrimonial Advisor", path: "/matrimonial-advisor" },
  { title: "Pre-Marital and Marital Counseling", path: "/marital-counseling" },
  { title: "Bridal Make-up", path: "/bridal-makeup" },
];

export const HELP_OPTIONS = [
  { title: "Contact Us", path: "/contact-page" },
  { title: "Report an Issue", path: "/report-issue" },
  { title: "FAQ's", path: "/faq" }
];

// ExploreDropdown Component - Redesigned as List
const ExploreDropdown = ({ isVisible }) => {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full left-0 mt-2 w-72 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 transition-all duration-300 ${isVisible
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible translate-y-2"
        }`}
    >
      {SERVICE_CATEGORIES.map((category, index) => (
        <a
          key={index}
          href={category.path}
          onClick={(e) => {
            if (!e.ctrlKey) {
              e.preventDefault();
              handleNavigate(category.path);
            } else {
              e.preventDefault();
              const newTab = window.open(category.path, "_blank");
              if (newTab) newTab.focus();
            }
          }}
          className="w-full text-left block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#4a2580] transition-colors font-medium border-b border-gray-50 last:border-0"
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ isVisible, onLogout }) => {
  const userId = localStorage.getItem("userId");
  const profileLinks = [
    { label: "My Dashboard", path: "/user/user-dashboard-page" },
    { label: "My Profile", path: "/user/user-profile-page" },

    // { label: "My Chatss", path: "/user/show-all-profiles/all-profile" },
    { label: "Change Password", path: `/reset-password/${userId}` },
    { label: "User Settings", path: "/user/user-settings-page" },
  ];

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 transition-all duration-300 ${isVisible
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible translate-y-2"
        }`}
    >
      {profileLinks.map((link, index) => (
        <a
          key={index}
          href={link.path}
          onClick={(e) => {
            if (!e.ctrlKey) {
              e.preventDefault();
              handleNavigate(link.path);
            } else {
              e.preventDefault();
              const newTab = window.open(link.path, "_blank");
              if (newTab) newTab.focus();
            }
          }}
          className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#4a2580] transition-colors"
        >
          {link.label}
        </a>
      ))}
      <hr className="my-1" />
      <button
        onClick={onLogout}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

const HelpDropdown = ({ isVisible }) => {
  const handleNavigate = (path) => {
    window.location.href = path;
  };

  return (
    <div
      className={`absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50 border border-gray-100 transition-all duration-300 ${isVisible
        ? "opacity-100 visible translate-y-0"
        : "opacity-0 invisible translate-y-2"
        }`}
    >
      {HELP_OPTIONS.map((item, index) => (
        <button
          key={index}
          onClick={() => handleNavigate(item.path)}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-[#4a2580] transition-colors font-medium border-b border-gray-50 last:border-0"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

const MainLayout = () => {
  const userId = localStorage.getItem("userId");
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExploreDropdownVisible, setIsExploreDropdownVisible] =
    useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileHelpOpen, setIsMobileHelpOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || null,
  );
  const [isUserActive, setIsUserActive] = useState(Boolean(userId));
  const [isHelpDropdownVisible, setIsHelpDropdownVisible] = useState(false);

  useEffect(() => {
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserProfile(userId);
      if (response.status === 200) {
        // Update with fresh data from server
        setUserName(response.data.data.userName || "User");
        setUserImage(response.data.data.profileImage || null);

        // Update storage to keep in sync
        if (response.data.data.userName)
          localStorage.setItem("userName", response.data.data.userName);
        if (response.data.data.profileImage)
          localStorage.setItem("userImage", response.data.data.profileImage);
      }
    };
    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleLogOut = () => {
    localStorage.clear();
    setIsUserActive(false);
    window.location.href = "/";
  };

  const handleNavigate = (path) => {
    window.location.href = path;
  };

  const openLoginPopup = (e) => {
    e.preventDefault();
    const menuPop = document.querySelector('.menu-pop1');
    const popBg = document.querySelector('.pop-bg');
    if (menuPop) menuPop.classList.add('act');
    if (popBg) popBg.classList.add('act');
    document.querySelectorAll('.mob-me-all').forEach((el) => el.classList.remove('act'));
    document.body.style.overflow = 'hidden';
  };

  const closePopup = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    document.querySelectorAll('.menu-pop, .pop-bg, .mob-me-all').forEach((el) => el.classList.remove('act'));
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      <div className="bg-[#4a2580] text-white text-xs py-2 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-purple-200">
                {isUserActive && (
                  <div
                    onClick={() => handleNavigate("/user/find-matches")}
                    className="flex items-center space-x-1"
                  >
                  </div>
                )}

              </div>
              <button
                onClick={() => handleNavigate("/blogs")}
                className="cursor-pointer hover:text-purple-200"
              >
                BLOGS
              </button>
              <button
                onClick={() => handleNavigate("/faq")}
                className="cursor-pointer hover:text-purple-200"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigate("/contact-page")}
                className="cursor-pointer hover:text-purple-200"
              >
                CONTACT
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <Phone className="w-4 h-4 !text-white" />
                <span className="!text-white font-medium">+91 96637 96699</span>
              </div>
              <div className="flex items-center space-x-2 text-white">
                <Mail className="w-4 h-4 !text-white" />
                <span className="!text-white font-medium uppercase">SUPPORT@AGAPEVOWS.COM</span>
              </div>
              <div className="flex space-x-3 text-white">
                <a href="https://www.facebook.com/AgapeVows/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-4 h-4 cursor-pointer hover:text-purple-200 !text-white" />
                </a>
                <a href="https://www.instagram.com/agapevows_matrimony" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-4 h-4 cursor-pointer hover:text-purple-200 !text-white" />
                </a>
                <a href="https://www.youtube.com/@AgapeVowsMatrimony" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-4 h-4 cursor-pointer hover:text-purple-200 !text-white" />
                </a>
              </div>
            </div>
          </div>

          <div className="md:hidden flex justify-between items-center">
            <div className="flex items-center space-x-3">
              {isUserActive && (
                <div
                  onClick={() => handleNavigate("/user/find-matches")}
                  className="cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                </div>
              )}
              <button
                onClick={() => handleNavigate("/blogs")}
                className="text-xs hover:text-purple-200"
              >
                BLOGS
              </button>
              <button
                onClick={() => handleNavigate("/faq")}
                className="text-xs hover:text-purple-200"
              >
                FAQ
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4" />
              <div className="flex space-x-2">
                <a href="https://www.facebook.com/AgapeVows/" target="_blank" rel="noopener noreferrer">
                  <Facebook className="w-3 h-3" />
                </a>
                <a href="https://www.instagram.com/agapevows_matrimony" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-3 h-3" />
                </a>
                <a href="https://www.youtube.com/@AgapeVowsMatrimony" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            <a
              href="/"
              className="flex items-center cursor-pointer shrink-0 mr-auto"
              onClick={(e) => {
                if (!e.ctrlKey) {
                  e.preventDefault();
                  handleNavigate("/");
                } else {
                  e.preventDefault();
                  const newTab = window.open("/", "_blank");
                  if (newTab) newTab.focus();
                }
              }}
            >
              <div className="text-2xl font-bold">
                <img
                  src={logo}
                  alt="agapevows_logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
                  style={{ marginTop: '-10px', transform: 'scale(1.5)', transformOrigin: 'left center' }}
                />
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="/about-us"
                onClick={(e) => {
                  if (!e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate("/about-us");
                  } else {
                    e.preventDefault();
                    const newTab = window.open("/about-us", "_blank");
                    if (newTab) newTab.focus();
                  }
                }}
                className={`hover-purple-shadow transition-all duration-200 font-source font-medium text-[18px] py-2 ${location.pathname === "/about-us"
                  ? "text-[#4a2580] font-bold border-b-2 border-[#4a2580]"
                  : "text-gray-800 hover:text-[#4a2580]"
                  }`}
              >
                ABOUT US
              </a>

              <a
                href="/user/find-matches"
                onClick={(e) => {
                  if (!e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate("/user/find-matches");
                  } else {
                    e.preventDefault();
                    const newTab = window.open("/user/find-matches", "_blank");
                    if (newTab) newTab.focus();
                  }
                }}
                className={`hover-purple-shadow flex items-center transition-all duration-200 font-source font-medium text-[18px] py-2 ${location.pathname === "/user/find-matches"
                  ? "text-[#4a2580] font-bold border-b-2 border-[#4a2580]"
                  : "text-gray-800 hover:text-[#4a2580]"
                  }`}
              >
                <Search className="w-4 h-4 mr-1 mb-0.5" /> SEARCH
              </a>

              <div
                className="relative"
                onMouseEnter={() => setIsExploreDropdownVisible(true)}
                onMouseLeave={() => setIsExploreDropdownVisible(false)}
              >
                <button
                  className={`hover-purple-shadow transition-all duration-200 font-source font-medium text-[18px] flex items-center py-2 ${location.pathname.includes("/personalized-matrimony") ||
                    location.pathname.includes("/nri-matrimony") ||
                    location.pathname.includes("/church-partner") ||
                    location.pathname.includes("/matrimonial-advisor") ||
                    location.pathname.includes("/marital-counseling") ||
                    location.pathname.includes("/bridal-makeup") ||
                    location.pathname.includes("/insurance-services") ||
                    location.pathname === "/user/user-service-page"
                    ? "text-[#4a2580] font-bold border-b-2 border-[#4a2580]"
                    : "text-gray-800 hover:text-[#4a2580]"
                    }`}
                >
                  SERVICES <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <ExploreDropdown
                  isVisible={isExploreDropdownVisible}
                  isUserActive={true}
                />
              </div>

              <a
                href="/user/events-page"
                onClick={(e) => {
                  if (!e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate("/user/events-page");
                  } else {
                    e.preventDefault();
                    const newTab = window.open("/user/events-page", "_blank");
                    if (newTab) newTab.focus();
                  }
                }}
                className={`nav-highlight-events font-source font-medium text-[18px] transition-all duration-200 py-2 ${location.pathname === "/user/events-page"
                  ? "border-b-2 border-[#4a2580]"
                  : ""
                  }`}
              >
                EVENTS
              </a>

              <a
                href="/user/user-plan-selection"
                onClick={(e) => {
                  if (!e.ctrlKey) {
                    e.preventDefault();
                    handleNavigate("/user/user-plan-selection");
                  } else {
                    e.preventDefault();
                    const newTab = window.open("/user/user-plan-selection", "_blank");
                    if (newTab) newTab.focus();
                  }
                }}
                className={`hover-purple-shadow transition-all duration-200 font-source font-medium text-[18px] py-2 ${location.pathname === "/user/user-plan-selection"
                  ? "text-[#4a2580] font-bold border-b-2 border-[#4a2580]"
                  : "text-gray-800 hover:text-[#4a2580]"
                  }`}
              >
                PLANS
              </a>

              <div
                className="relative"
                onMouseEnter={() => setIsHelpDropdownVisible(true)}
                onMouseLeave={() => setIsHelpDropdownVisible(false)}
              >
                <button
                  className={`hover-purple-shadow transition-all duration-200 font-source font-medium text-[18px] flex items-center py-2 ${location.pathname === "/help-support" ||
                    location.pathname === "/report-issue"
                    ? "text-[#4a2580] font-bold border-b-2 border-[#4a2580]"
                    : "text-gray-800 hover:text-[#4a2580]"
                    }`}
                >
                  HELP & SUPPORT <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                <HelpDropdown isVisible={isHelpDropdownVisible} />
              </div>
            </nav>

            <div className="hidden md:flex items-center space-x-3 justify-end">
              {isUserActive ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsProfileDropdownVisible(true)}
                  onMouseLeave={() => setIsProfileDropdownVisible(false)}
                >
                  <div className="flex items-center space-x-3 cursor-pointer">
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="font-medium" style={{ color: '#d4af37' }}>
                        {userName}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        MY PROFILE <ChevronDown className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                  <ProfileDropdown
                    isVisible={isProfileDropdownVisible}
                    onLogout={handleLogOut}
                  />
                </div>
              ) : (
                <>
                  <a
                    href="/user/user-sign-up"
                    onClick={(e) => {
                      if (!e.ctrlKey) {
                        e.preventDefault();
                        handleNavigate("/user/user-sign-up");
                      }
                    }}
                    className="bg-[#58219f] text-white px-6 py-2 rounded-full hover:bg-[#4a1b85] transition-colors font-medium shadow-md shadow-purple-100"
                  >
                    REGISTER FREE
                  </a>
                  <a
                    href="/user/user-login"
                    onClick={(e) => {
                      if (!e.ctrlKey) {
                        e.preventDefault();
                        handleNavigate("/user/user-login");
                      }
                    }}
                    className="text-gray-800 hover:text-[#4a2580] font-medium"
                  >
                    LOGIN
                  </a>
                </>
              )}
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t overflow-y-auto custom-scrollbar" style={{ maxHeight: "calc(100vh - 120px)" }}>
              <nav className="flex flex-col space-y-1 mt-4">
                <button
                  onClick={() => {
                    handleNavigate("/about-us");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium p-3 rounded-md transition-colors ${location.pathname === "/about-us"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-800 hover:text-[#4a2580] hover:bg-gray-50"
                    }`}
                >
                  ABOUT US
                </button>

                {isUserActive && (
                  <button
                    onClick={() => {
                      handleNavigate("/user/find-matches");
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-left font-medium p-3 rounded-md transition-colors ${location.pathname === "/user/find-matches"
                      ? "text-purple-600 bg-purple-50"
                      : "text-gray-800 hover:text-[#4a2580] hover:bg-gray-50"
                      }`}
                  >
                    SEARCH
                  </button>
                )}

                <div className="w-full">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex justify-between items-center font-medium p-3 rounded-md text-gray-800 hover:text-[#4a2580] hover:bg-gray-50 transition-colors"
                  >
                    <span>SERVICES</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileServicesOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 pr-2 flex flex-col space-y-1 mt-1 bg-gray-50/50 rounded-md py-2 border-l-2 border-purple-100 ml-2">
                      {SERVICE_CATEGORIES.map((category, index) => (
                        <a
                          key={index}
                          href={category.path}
                          onClick={(e) => {
                            if (!e.ctrlKey) {
                              e.preventDefault();
                              handleNavigate(category.path);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 rounded-md transition-colors"
                        >
                          {category.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href="/user/events-page"
                  onClick={(e) => {
                    if (!e.ctrlKey) {
                      e.preventDefault();
                      handleNavigate("/user/events-page");
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`w-full flex justify-between items-center p-3 rounded-md transition-colors ${location.pathname === "/user/events-page"
                    ? "bg-purple-50"
                    : "hover:bg-gray-50"
                    }`}
                >
                  <span className="nav-highlight-events">EVENTS</span>
                </a>

                <a
                  href="/user/user-plan-selection"
                  onClick={(e) => {
                    if (!e.ctrlKey) {
                      e.preventDefault();
                      handleNavigate("/user/user-plan-selection");
                      setIsMobileMenuOpen(false);
                    }
                  }}
                  className={`text-left block font-medium p-3 rounded-md transition-colors ${location.pathname === "/user/user-plan-selection"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-800 hover:text-[#4a2580] hover:bg-gray-50"
                    }`}
                >
                  PLANS
                </a>

                <div className="w-full">
                  <button
                    onClick={() => setIsMobileHelpOpen(!isMobileHelpOpen)}
                    className="w-full flex justify-between items-center font-medium p-3 rounded-md text-gray-800 hover:text-[#4a2580] hover:bg-gray-50 transition-colors"
                  >
                    <span>HELP & SUPPORT</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileHelpOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileHelpOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 pr-2 flex flex-col space-y-1 mt-1 bg-gray-50/50 rounded-md py-2 border-l-2 border-purple-100 ml-2">
                      {HELP_OPTIONS.map((item, index) => (
                        <a
                          key={index}
                          href={item.path}
                          onClick={(e) => {
                            if (!e.ctrlKey) {
                              e.preventDefault();
                              handleNavigate(item.path);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                          className="w-full text-left block px-4 py-2.5 text-sm text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 rounded-md transition-colors"
                        >
                          {item.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              <div className="mt-6 pt-4 border-t border-gray-100">
                {isUserActive ? (
                  <div className="space-y-1 px-2 pb-6">
                    <div className="flex items-center space-x-3 mb-4 p-2 bg-purple-50/50 rounded-lg">
                      {userImage ? (
                        <img
                          src={userImage}
                          alt="Profile"
                          className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 border-2 border-purple-200">
                          <User className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <div className="font-semibold text-sm" style={{ color: '#d4af37' }}>
                          {userName}
                        </div>
                        <div className="text-purple-600 font-medium text-xs">MY PROFILE</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleNavigate("/user/user-dashboard-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-profile-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() => {
                        handleNavigate(`/reset-password/${userId}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-settings-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-[#4a2580] hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      User Settings
                    </button>

                    <div className="my-2 border-t border-gray-100"></div>

                    <button
                      onClick={() => {
                        handleLogOut();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-red-600 hover:bg-red-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm flex items-center"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 px-2 pb-6">
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-sign-up");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-[#58219f] text-white py-2.5 rounded-lg font-medium hover:bg-[#4a1b85] transition-colors shadow-sm"
                    >
                      Register Free
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate("/user/user-login");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center text-[#7c3aed] border border-[#7c3aed] font-medium py-2.5 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <SidebarLoginComponent closePopup={closePopup} />

    </>
  );
};

export default MainLayout;
