import {
  ChevronDown,
  Facebook,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Search,
  Twitter,
  X,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";

// ExploreDropdown Component
const ExploreDropdown = () => {
  const categories = [
    {
      title: "Browse profiles",
      subtitle: "1200+ VERIFIED PROFILES",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-pink-500 to-purple-600",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop&crop=face",
      path: "/user/show-all-profiles/all-profiles",
    },
    {
      title: "Wedding page",
      subtitle: "MAKE RESERVATION",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-purple-600 to-blue-600",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop",
      path: "/user/user-wedding-page",
    },
    {
      title: "All Services",
      subtitle: "COMPLETE SERVICE DIRECTORY",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-green-500 to-teal-600",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&h=200&fit=crop",
      path: "/user/user-service-page",
    },
    {
      title: "Join Now",
      subtitle: "START YOUR JOURNEY",
      buttonText: "MORE DETAILS",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-600",
      image:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop",
      path: "/user/user-sign-up",
    },
  ];

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // Replace with your actual navigation logic (React Router, Next.js Router, etc.)
  };

  return (
    <div className="absolute top-full left-0 mt-2 w-screen max-w-6xl bg-white shadow-2xl rounded-lg p-8 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        EXPLORE CATEGORIES
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${category.bgColor} text-white rounded-lg p-6 min-h-48 flex flex-col justify-between relative overflow-hidden group/card hover:scale-105 transition-transform duration-300 cursor-pointer`}
            onClick={() => handleNavigate(category.path)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-30">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full transform -translate-x-8 translate-y-8"></div>
            </div>

            <div className="relative z-10">
              <h4 className="text-lg font-bold mb-1">{category.title}</h4>
              <p className="text-xs opacity-90 mb-4">{category.subtitle}</p>
            </div>

            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors self-start relative z-10">
              {category.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Dropdown Component
const ProfileDropdown = ({ onLogout }) => {
  const profileLinks = [
    { label: "My Profile", path: "/user/user-dashboard-page" },
    { label: "My Chats", path: "/user/show-all-profiles/all-profile" },
    { label: "User Settings", path: "/user/user-settings-page" },
  ];

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // Replace with your actual navigation logic
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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

const TopHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  const [userName, setUserName] = useState("Ashley emyy");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsUserActive(Boolean(userId)); // Fixed the logic

    // Get user name from localStorage or API
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setIsUserActive(false);
    window.location.href = "/";
  };

  const handleNavigate = (path) => {
    console.log(`Navigating to: ${path}`);
    // Replace with your actual navigation logic (React Router, Next.js Router, etc.)
    // For React Router: navigate(path);
    // For Next.js: router.push(path);
  };

  const topBarLinks = [
    { label: "ABOUT", path: "/about" },
    { label: "FAQ", path: "/faq" },
    { label: "CONTACT", path: "/contact-page" },
  ];

  const mainNavLinks = [
    { label: "HOME", path: "/" },
    { label: "PLANS", path: "/user/user-plan-selection" },
    { label: "SUCCESS STORIES", path: "/success-stories" },
    { label: "HELP & SUPPORTS", path: "/help-support" },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-purple-600 text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Search className="w-4 h-4" />
            {topBarLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(link.path)}
                className="hover:text-purple-200 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91 5312 5312</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>HELP@COMPANY.COM</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Facebook className="w-4 h-4 cursor-pointer hover:text-purple-200" />
              <Twitter className="w-4 h-4 cursor-pointer hover:text-purple-200" />
              <MessageCircle className="w-4 h-4 cursor-pointer hover:text-purple-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigate("/")}
            >
              <div className="text-2xl font-bold">
                <span className="text-purple-600">av</span>
                <span className="text-gray-800">AgapeVows</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {mainNavLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(link.path)}
                  className="text-gray-800 hover:text-purple-600 font-medium transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <div className="relative group">
                <button className="text-gray-800 hover:text-purple-600 font-medium flex items-center">
                  EXPLORE <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                <ExploreDropdown />
              </div>
            </nav>

            {/* User Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isUserActive ? (
                <div className="relative group">
                  <div className="flex items-center space-x-3 cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                      loading="lazy"
                    />
                    <div>
                      <div className="text-gray-800 font-medium">
                        {userName}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        MY PROFILE <ChevronDown className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                  <ProfileDropdown onLogout={handleLogOut} />
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleNavigate("/user/user-sign-up")}
                    className="text-gray-800 hover:text-purple-600 font-medium transition-colors"
                  >
                    REGISTER
                  </button>
                  <button
                    onClick={() => handleNavigate("/user/user-login")}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                  >
                    LOGIN
                  </button>
                </div>
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
            <div className="md:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-3 mt-4">
                {mainNavLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleNavigate(link.path);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-gray-800 hover:text-purple-600 font-medium py-2"
                  >
                    {link.label}
                  </button>
                ))}

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-gray-800 hover:text-purple-600 font-medium py-2"
                >
                  EXPLORE
                </button>

                {/* Mobile User Actions */}
                <div className="pt-4 border-t">
                  {isUserActive ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3 mb-3">
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                          loading="lazy"
                        />
                        <div className="text-gray-800 font-medium">
                          {userName}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleNavigate("/user/user-dashboard-page");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-gray-700 py-2"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          handleNavigate("/user/show-all-profiles/all-profile");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-gray-700 py-2"
                      >
                        My Chats
                      </button>
                      <button
                        onClick={() => {
                          handleNavigate("/user/user-settings-page");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-gray-700 py-2"
                      >
                        User Settings
                      </button>
                      <button
                        onClick={() => {
                          handleLogOut();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-red-600 py-2"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          handleNavigate("/user/user-sign-up");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left text-gray-800 hover:text-purple-600 font-medium py-2"
                      >
                        REGISTER
                      </button>
                      <button
                        onClick={() => {
                          handleNavigate("/user/user-login");
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                      >
                        LOGIN
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default TopHeader;
