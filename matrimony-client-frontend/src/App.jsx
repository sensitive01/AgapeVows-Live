import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import UserHomePage from "./pages/UserHomePage";
import UserLoginPage from "./pages/UserLoginPage";
import UserSignUp from "./pages/UserSignUp";
import UserWedding from "./pages/UserWedding";
import UserWeddingVideoPage from "./pages/UserWeddingVideoPage";
import UserSettingsPage from "./pages/UserSettingsPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserProfileEditPage from "./pages/UserProfileEditPage";
import UserPlanPage from "./pages/UserPlanPage";
import UserInterest from "./pages/UserInterest";
import UserChatPage from "./pages/UserChatPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import UserServicePage from "./pages/UserServicePage";
import UserAllProfilePage from "./pages/allprofile/UserAllProfilePage";
import AboutPage from "./pages/aboutPage/AboutPage";
import FaqPage from "./pages/faq/FaqPage";
import ContactPage from "./pages/contact/ContactPage";
import EnquiryPage from "./pages/enquirypage/EnquiryPage";
import JoinNow from "./pages/joinnow/JoinNow";
import MoreDetails from "./pages/allprofile/MoreDetails";
import ForgotPassword from "./pages/forgotpassword/ForgotPasswordPage";
import ChangePassword from "./pages/changepassword/ChangePassword";
import UserPlanSelection from "./pages/userplanselection/UserPlanSelection";
import UserSearchResult from "./pages/userSearch/UserSearchResult";
import AgapeVowsApp from "./components/sample/AgapeVowsApp";
import NewHomePageComponent from "./components/agapeows-components/pages/NewHomePageComponent";
import ShortListedProfile from "./pages/shortlist/ShortListedProfile";
import WhoViewedYou from "./hooks/whoviewedyou/WhoViewedYou";
import BlockedProfile from "./pages/blockedprofile/BlockedProfile";
import IgnoredProfile from "./pages/ignoredprofile/IgnoredProfile";
import Events from "./pages/public/Events"; // Import Events page
import GlobalSearchModal from "./components/GlobalSearchModal";
import HelpAndSupport from "./pages/HelpAndSupport";
import BridalMakeup from "./pages/public/BridalMakeup";
import InsuranceServices from "./pages/public/InsuranceServices";
import ReportIssue from "./pages/ReportIssue";
import PersonalizedMatrimony from "./pages/public/PersonalizedMatrimony";
import NriMatrimony from "./pages/public/NriMatrimony";
import ChurchPartner from "./pages/public/ChurchPartner";
import MatrimonialAdvisor from "./pages/public/MatrimonialAdvisor";
import MaritalCounseling from "./pages/public/MaritalCounseling";
import Blogs from "./pages/public/Blogs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component to handle page reloads
function ReloadHandler() {
  const location = useLocation();

  useEffect(() => {
    // Store the previous path to detect actual navigation
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = location.pathname;

    // Only reload if we're navigating from a different path
    if (previousPath && previousPath !== currentPath) {
      sessionStorage.setItem("previousPath", currentPath);
      window.location.reload();
    } else if (!previousPath) {
      // First visit, just store the path
      sessionStorage.setItem("previousPath", currentPath);
    }
  }, [location.pathname]);

  return null;
}

function App() {
  useEffect(() => {
    // Feature Flag for Security
    const ADD_SECURITY_CHECK = false;

    if (!ADD_SECURITY_CHECK) return;

    // Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable Keyboard Shortcuts (Screenshots, DevTools, Print, Save, Copy, Paste)
    // Handle PrintScreen instantly on keydown
    const handleKeyDown = (e) => {
      // Handle PrintScreen instantly on keydown
      if (e.key === "PrintScreen") {
        document.documentElement.style.display = "none";
        navigator.clipboard.writeText("");
        setTimeout(() => {
          document.documentElement.style.display = "block";
          alert("Screenshots are disabled!");
        }, 500);
        e.preventDefault();
        e.stopPropagation();
        return false;
      }

      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, and Screenshot interactions
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
        (e.ctrlKey && (e.key === "P" || e.key === "p")) ||
        (e.ctrlKey && (e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "V" || e.key === "v")) ||
        (e.ctrlKey && (e.key === "X" || e.key === "x")) ||
        (e.metaKey && e.shiftKey && (e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block Dragging
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Blur content when window loses focus (e.g. opening Snipping Tool)
    const handleBlur = () => {
      document.body.style.filter = "blur(20px)";
    };

    // Restore content when window regains focus
    const handleFocus = () => {
      document.body.style.filter = "none";
    };

    // Block Copy/Cut/Paste
    const handleCopyCutPaste = (e) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("copy", handleCopyCutPaste);
    window.addEventListener("cut", handleCopyCutPaste);
    window.addEventListener("paste", handleCopyCutPaste);

    // CSS to disable Text Selection & Print
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        transition: filter 0.1s;
      }
      @media print {
        html, body {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("copy", handleCopyCutPaste);
      window.removeEventListener("cut", handleCopyCutPaste);
      window.removeEventListener("paste", handleCopyCutPaste);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <ReloadHandler /> */}
      <Routes>
        {/* <Route path="/" element={<UserHomePage />} /> */}
        <Route path="/" element={<NewHomePageComponent />} />

        <Route path="/user/user-login" element={<UserLoginPage />} />
        <Route path="/user/user-sign-up" element={<UserSignUp />} />

        <Route path="/user/user-wedding-page" element={<UserWedding />} />
        <Route
          path="/user/user-wedding-video-page"
          element={<UserWeddingVideoPage />}
        />
        <Route path="/user/user-settings-page" element={<UserSettingsPage />} />
        <Route path="/user/user-profile-page" element={<UserProfilePage />} />
        <Route
          path="/user/user-profile-edit-page/:userId"
          element={<UserProfileEditPage />}
        />

        <Route
          path="/user/user-plan-selection"
          element={<UserPlanSelection />}
        />
        <Route path="/user/user-plan-page" element={<UserPlanPage />} />
        <Route path="/user/user-interest-page" element={<UserInterest />} />
        <Route path="/user/user-chat-page" element={<UserChatPage />} />

        <Route
          path="/user/user-dashboard-page"
          element={<UserDashboardPage />}
        />
        <Route path="/user/user-service-page" element={<UserServicePage />} />
        <Route
          path="/user/show-all-profiles/:searchContent"
          element={<UserAllProfilePage />}
        />
        <Route
          path="/user/short-listed-profiles-page"
          element={<ShortListedProfile />}
        />
        <Route path="/user/who-viewed-you-page" element={<WhoViewedYou />} />
        <Route
          path="/user/blocked-profiles-page"
          element={<BlockedProfile />}
        />
        <Route path="/help-support" element={<HelpAndSupport />} />
        <Route
          path="/user/ignored-profiles-page"
          element={<IgnoredProfile />}
        />

        <Route path="/show-searched-result" element={<UserSearchResult />} />
        <Route path="/user/find-matches" element={<GlobalSearchModal />} />
        <Route path="/reset-password/:userId" element={<ChangePassword />} />
        <Route path="/user/user-change-password/:userId" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/profile-more-details/:profileId"
          element={<MoreDetails />}
        />
        <Route path="/join-now-page" element={<JoinNow />} />
        <Route path="/enquiry-page" element={<EnquiryPage />} />
        <Route path="/contact-page" element={<ContactPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/bridal-makeup" element={<BridalMakeup />} />
        <Route path="/insurance-services" element={<InsuranceServices />} />
        <Route path="/user/events-page" element={<Events />} />

        <Route path="/report-issue" element={<ReportIssue />} />

        <Route path="/personalized-matrimony" element={<PersonalizedMatrimony />} />
        <Route path="/nri-matrimony" element={<NriMatrimony />} />
        <Route path="/church-partner" element={<ChurchPartner />} />
        <Route path="/matrimonial-advisor" element={<MatrimonialAdvisor />} />
        <Route path="/marital-counseling" element={<MaritalCounseling />} />
        <Route path="/blogs" element={<Blogs />} />
      </Routes>
    </Router>
  );
}

export default App;
