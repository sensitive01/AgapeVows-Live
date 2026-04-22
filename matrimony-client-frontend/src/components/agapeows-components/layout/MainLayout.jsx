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
} from "lucide-react";
import logo from "../../../assets/images/agapevows - logo.webp";
import { getUserProfile } from "../../../api/axiosService/userAuthService";
/* import profileImg from "../../../assets/images/profiles/1.jpg"; */ // Removed as we use generic icon now
import PreLoader from "../../PreLoader";
import GlobalSearchModal from "../../GlobalSearchModal";
import SidebarLoginComponent from "../../new-template/SidebarLoginComponent";
import FloatingContactSidebar from "./FloatingContactSidebar";

export const SERVICE_CATEGORIES = [
  { title: "Personalized Matrimony", path: "/personalized-matrimony" },
  { title: "NRI Matrimony", path: "/nri-matrimony" },
  { title: "Churches - Partner with Us", path: "/church-partner" },
  { title: "Become a Matrimonial Advisor", path: "/matrimonial-advisor" },
  { title: "Pre-Marital and Marital Counseling", path: "/marital-counseling" },
  { title: "Bridal Make-up", path: "/bridal-makeup" },
  { title: "Insurance Services", path: "/insurance-services" },
];

export const HELP_OPTIONS = [
  { title: "Help & Support", path: "/help-support" },
  { title: "Report Your Issue", path: "/report-issue" },
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
        <button
          key={index}
          onClick={() => handleNavigate(category.path)}
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium border-b border-gray-50 last:border-0"
        >
          {category.title}
        </button>
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
        <button
          key={index}
          onClick={() => handleNavigate(link.path)}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
        >
          {link.label}
        </button>
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
          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium border-b border-gray-50 last:border-0"
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
  /* import { User as UserIcon } from "lucide-react"; */
  // Need to add User to imports first.

  const [userImage, setUserImage] = useState(
    localStorage.getItem("userImage") || null,
  ); // Initialize from storage
  /* const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); */ // Removed unused var
  const [isUserActive, setIsUserActive] = useState(Boolean(userId));
  const [isHelpDropdownVisible, setIsHelpDropdownVisible] = useState(false);

  useEffect(() => {
    // setIsUserActive(Boolean(userId)); // Removed to prevent double check/re-render logic if handled in init.
    // Actually, keep it if userId changes dynamically? no, userId is const outside.
    // Ideally useEffect should react to something. But userId is from localstorage at render time.
    /* const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } */
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
      {/* <PreLoader /> */}
      {/* Top Bar - Fixed Responsive */}
      <div className="bg-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Desktop & Tablet */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-purple-200">
                {isUserActive && (
                  <div
                    onClick={() => handleNavigate("/user/find-matches")}
                    className="flex items-center space-x-1"
                  >
                    {/* <Search className="w-4 h-4" /> */}
                  </div>
                )}
                <button onClick={() => handleNavigate("/blogs")}>
                  BLOGS
                </button>
              </div>
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
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 5312 5312</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>HELP@COMPANY.COM</span>
              </div>
              <div className="flex space-x-2">
                <Facebook className="w-4 h-4 cursor-pointer hover:text-purple-200" />
                <Twitter className="w-4 h-4 cursor-pointer hover:text-purple-200" />
                <MessageCircle className="w-4 h-4 cursor-pointer hover:text-purple-200" />
              </div>
            </div>
          </div>

          {/* Mobile */}
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
                <Facebook className="w-3 h-3" />
                <Twitter className="w-3 h-3" />
                <MessageCircle className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4">
          <div className="flex items-center gap-4 md:gap-8">
            {/* Logo - Aligned to Left */}
            <div
              className="flex items-center cursor-pointer shrink-0 mr-auto"
              onClick={() => handleNavigate("/")}
            >
              <div className="text-2xl font-bold">
                <img
                  src={logo}
                  alt="agapevows_logo"
                  className="h-8 w-auto sm:h-10 md:h-12 lg:h-14 object-contain"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={() => handleNavigate("/about-us")}
                className={`transition-all duration-200 font-medium py-2 ${location.pathname === "/about-us"
                  ? "text-purple-600 font-bold border-b-2 border-purple-600"
                  : "text-gray-800 hover:text-purple-600"
                  }`}
              >
                ABOUT US
              </button>

              {isUserActive && (
                <button
                  onClick={() => handleNavigate("/user/find-matches")}
                  className={`group flex items-center space-x-2 font-medium transition-all duration-200 py-2 ${location.pathname === "/user/find-matches"
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-800 hover:text-purple-600"
                    }`}
                >
                  <Search
                    className={`w-4 h-4 transition-colors duration-200 ${location.pathname === "/user/find-matches"
                      ? "text-purple-600"
                      : "text-gray-800 group-hover:text-purple-600"
                      }`}
                  />
                  <span>SEARCH</span>
                </button>
              )}

              <div
                className="relative"
                onMouseEnter={() => setIsExploreDropdownVisible(true)}
                onMouseLeave={() => setIsExploreDropdownVisible(false)}
              >
                <button
                  className={`transition-all duration-200 font-medium flex items-center py-2 ${location.pathname.includes("/personalized-matrimony") ||
                    location.pathname.includes("/nri-matrimony") ||
                    location.pathname.includes("/church-partner") ||
                    location.pathname.includes("/matrimonial-advisor") ||
                    location.pathname.includes("/marital-counseling") ||
                    location.pathname.includes("/bridal-makeup") ||
                    location.pathname.includes("/insurance-services") ||
                    location.pathname === "/user/user-service-page"
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-800 hover:text-purple-600"
                    }`}
                >
                  SERVICES <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <ExploreDropdown
                  isVisible={isExploreDropdownVisible}
                  isUserActive={true}
                />
              </div>

              <button
                onClick={() => handleNavigate("/user/events-page")}
                className={`transition-all duration-200 font-medium py-2 ${location.pathname === "/user/events-page"
                  ? "text-purple-600 font-bold border-b-2 border-purple-600"
                  : "text-gray-800 hover:text-purple-600"
                  }`}
              >
                EVENTS
              </button>

              <button
                onClick={() => handleNavigate("/user/user-plan-selection")}
                className={`transition-all duration-200 font-medium py-2 ${location.pathname === "/user/user-plan-selection"
                  ? "text-purple-600 font-bold border-b-2 border-purple-600"
                  : "text-gray-800 hover:text-purple-600"
                  }`}
              >
                PLANS
              </button>

              <div
                className="relative"
                onMouseEnter={() => setIsHelpDropdownVisible(true)}
                onMouseLeave={() => setIsHelpDropdownVisible(false)}
              >
                <button
                  className={`transition-all duration-200 font-medium flex items-center py-2 ${location.pathname === "/help-support" ||
                    location.pathname === "/report-issue"
                    ? "text-purple-600 font-bold border-b-2 border-purple-600"
                    : "text-gray-800 hover:text-purple-600"
                    }`}
                >
                  HELP & SUPPORT <ChevronDown className="w-4 h-4 ml-1" />
                </button>

                <HelpDropdown isVisible={isHelpDropdownVisible} />
              </div>
            </nav>

            {/* User Profile or Auth Buttons */}
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
                  <button
                    onClick={() => handleNavigate("/user/user-sign-up")}
                    className="text-gray-800 hover:text-purple-600 font-medium"
                  >
                    REGISTER
                  </button>
                  <button
                    onClick={openLoginPopup}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    LOGIN
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
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
                    : "text-gray-800 hover:text-purple-600 hover:bg-gray-50"
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
                      : "text-gray-800 hover:text-purple-600 hover:bg-gray-50"
                      }`}
                  >
                    SEARCH
                  </button>
                )}

                {/* SERVICES Mobile Dropdown Accordion */}
                <div className="w-full">
                  <button
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className="w-full flex justify-between items-center font-medium p-3 rounded-md text-gray-800 hover:text-purple-600 hover:bg-gray-50 transition-colors"
                  >
                    <span>SERVICES</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Expanded Dropdown Panel */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileServicesOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 pr-2 flex flex-col space-y-1 mt-1 bg-gray-50/50 rounded-md py-2 border-l-2 border-purple-100 ml-2">
                      {SERVICE_CATEGORIES.map((category, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleNavigate(category.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        >
                          {category.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleNavigate("/user/events-page");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium p-3 rounded-md transition-colors ${location.pathname === "/user/events-page"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-800 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                >
                  EVENTS
                </button>

                <button
                  onClick={() => {
                    handleNavigate("/user/user-plan-selection");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium p-3 rounded-md transition-colors ${location.pathname === "/user/user-plan-selection"
                    ? "text-purple-600 bg-purple-50"
                    : "text-gray-800 hover:text-purple-600 hover:bg-gray-50"
                    }`}
                >
                  PLANS
                </button>

                {/* HELP & SUPPORT Dropdown Accordion */}
                <div className="w-full">
                  <button
                    onClick={() => setIsMobileHelpOpen(!isMobileHelpOpen)}
                    className="w-full flex justify-between items-center font-medium p-3 rounded-md text-gray-800 hover:text-purple-600 hover:bg-gray-50 transition-colors"
                  >
                    <span>HELP & SUPPORT</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileHelpOpen ? "rotate-180" : ""}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileHelpOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="pl-4 pr-2 flex flex-col space-y-1 mt-1 bg-gray-50/50 rounded-md py-2 border-l-2 border-purple-100 ml-2">
                      {HELP_OPTIONS.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            handleNavigate(item.path);
                            setIsMobileMenuOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Mobile Profile or Auth */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                {isUserActive ? (
                  <div className="space-y-1 px-2">
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
                      className="w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      My Dashboard
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-profile-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      My Profile
                    </button>
                    {/* Kept My Chats */}
                    <button
                      onClick={() => {
                        handleNavigate("/user/show-all-profiles/all-profile");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      My Chats
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate(`/reset-password/${userId}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
                    >
                      Change Password
                    </button>
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-settings-page");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2.5 rounded-md transition-colors font-medium text-sm"
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
                  <div className="space-y-3 px-2">
                    <button
                      onClick={() => {
                        handleNavigate("/user/user-sign-up");
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center text-purple-600 border border-purple-600 font-medium py-2.5 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      REGISTER
                    </button>
                    <button
                      onClick={(e) => {
                        openLoginPopup(e);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-medium hover:bg-purple-700 transition-colors shadow-sm"
                    >
                      LOGIN
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating Contact Sidebar */}
      <FloatingContactSidebar />
      {/* END Floating Contact Sidebar */}

      {/* LOGIN POPUP */}
      <SidebarLoginComponent closePopup={closePopup} />
      {/* END LOGIN POPUP */}

    </>
  );
};

export default MainLayout;
