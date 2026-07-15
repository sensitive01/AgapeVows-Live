import React, { useEffect, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// CRITICAL FIX: Clean up invalid localStorage values before app initialization
const storedUserId = localStorage.getItem("userId");
if (storedUserId === "null" || storedUserId === "undefined") {
  localStorage.removeItem("userId");
  localStorage.removeItem("authToken");
}

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen w-full bg-white/80">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#58219f]"></div>
  </div>
);

const UserHomePage = React.lazy(() => import("./pages/UserHomePage"));
const UserLoginPage = React.lazy(() => import("./pages/UserLoginPage"));
const UserSignUp = React.lazy(() => import("./pages/UserSignUp"));
const UserWedding = React.lazy(() => import("./pages/UserWedding"));
const UserWeddingVideoPage = React.lazy(() => import("./pages/UserWeddingVideoPage"));
const UserSettingsPage = React.lazy(() => import("./pages/UserSettingsPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
const UserProfileEditPage = React.lazy(() => import("./pages/UserProfileEditPage"));
const UserPlanPage = React.lazy(() => import("./pages/UserPlanPage"));
const UserInterest = React.lazy(() => import("./pages/UserInterest"));
const UserDashboardPage = React.lazy(() => import("./pages/UserDashboardPage"));
const UserServicePage = React.lazy(() => import("./pages/UserServicePage"));
const UserAllProfilePage = React.lazy(() => import("./pages/allprofile/UserAllProfilePage"));
const AboutPage = React.lazy(() => import("./pages/aboutPage/AboutPage"));
const FaqPage = React.lazy(() => import("./pages/faq/FaqPage"));
const ContactPage = React.lazy(() => import("./pages/contact/ContactPage"));
const EnquiryPage = React.lazy(() => import("./pages/enquirypage/EnquiryPage"));
const JoinNow = React.lazy(() => import("./pages/joinnow/JoinNow"));
const MoreDetails = React.lazy(() => import("./pages/allprofile/MoreDetails"));
const ForgotPassword = React.lazy(() => import("./pages/forgotpassword/ForgotPasswordPage"));
const ChangePassword = React.lazy(() => import("./pages/changepassword/ChangePassword"));
const UserPlanSelection = React.lazy(() => import("./pages/userplanselection/UserPlanSelection"));
const UserSearchResult = React.lazy(() => import("./pages/userSearch/UserSearchResult"));
const AgapeVowsApp = React.lazy(() => import("./components/sample/AgapeVowsApp"));
const NewHomePageComponent = React.lazy(() => import("./components/agapeows-components/pages/NewHomePageComponent"));
const ShortListedProfile = React.lazy(() => import("./pages/shortlist/ShortListedProfile"));
const WhoViewedYou = React.lazy(() => import("./hooks/whoviewedyou/WhoViewedYou"));
const BlockedProfile = React.lazy(() => import("./pages/blockedprofile/BlockedProfile"));
const IgnoredProfile = React.lazy(() => import("./pages/ignoredprofile/IgnoredProfile"));
const Events = React.lazy(() => import("./pages/public/Events"));
const GlobalSearchModal = React.lazy(() => import("./components/GlobalSearchModal"));
const HelpAndSupport = React.lazy(() => import("./pages/HelpAndSupport"));
const BridalMakeup = React.lazy(() => import("./pages/public/BridalMakeup"));
const InsuranceServices = React.lazy(() => import("./pages/public/InsuranceServices"));
const ReportIssue = React.lazy(() => import("./pages/ReportIssue"));
const PersonalizedMatrimony = React.lazy(() => import("./pages/public/PersonalizedMatrimony"));
const NriMatrimony = React.lazy(() => import("./pages/public/NriMatrimony"));
const ChurchPartner = React.lazy(() => import("./pages/public/ChurchPartner"));
const MatrimonialAdvisor = React.lazy(() => import("./pages/public/MatrimonialAdvisor"));
const MaritalCounseling = React.lazy(() => import("./pages/public/MaritalCounseling"));
const Blogs = React.lazy(() => import("./pages/public/Blogs"));
const BlogDetailsPage = React.lazy(() => import("./pages/public/Blogs/[id]"));
const PrivacyPolicy = React.lazy(() => import("./pages/policy/PrivacyPolicy"));
const TermsOfUse = React.lazy(() => import("./pages/policy/TermsOfUse"));

// SEO Pages
const SafetySecurity = React.lazy(() => import("./pages/seo/SafetySecurity"));
const SuccessStories = React.lazy(() => import("./pages/seo/SuccessStories"));
const LocationMatrimony = React.lazy(() => import("./pages/seo/LocationMatrimony"));
const DenominationMatrimony = React.lazy(() => import("./pages/seo/DenominationMatrimony"));

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./ScrollTop";
import { HelmetProvider } from "react-helmet-async";
import NotFoundPage from "./components/common/NotFoundPage";
import SEOHelmet from "./components/common/SEOHelmet";

// Component to handle dynamic SEO tags globally
function SEOManager() {
  const location = useLocation();
  const privatePaths = [
    '/user/user-login',
    '/user/user-sign-up',
    '/user/user-dashboard-page',
    '/user/user-profile-page',
    '/user/user-settings-page',
    '/user/user-plan-page',
    '/user/who-viewed-you-page',
    '/user/blocked-profiles-page',
    '/user/ignored-profiles-page',
    '/profile-more-details'
  ];
  const isPrivate = privatePaths.some(path => location.pathname.startsWith(path));

  return <SEOHelmet canonicalUrl={location.pathname} noindex={isPrivate} />;
}

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

// Guard component to enforce profile completion
import { useNavigate } from "react-router-dom";
import { showAlert } from "./utils/alertService";
const ProfileCompletionGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isProfileCompleted = localStorage.getItem("isProfileCompleted") === "true";

    const publicPaths = [
      '/', '/user/user-login', '/user/user-sign-up',
      '/help-support', '/show-searched-result', '/forgot-password',
      '/contact-us', '/about-us', '/faq', '/events', '/blogs',
      '/safety-security', '/success-stories'
    ];

    const isPublic = publicPaths.includes(location.pathname) ||
      location.pathname.startsWith('/reset-password') ||
      location.pathname.startsWith('/user/user-change-password') ||
      location.pathname.startsWith('/location/') ||
      location.pathname.startsWith('/denomination/');

    if (userId && !isProfileCompleted && !isPublic) {
      if (!location.pathname.includes('/user/user-profile-edit-page')) {
        showAlert({
          title: "Incomplete Profile",
          text: "Please fill all the mandatory details to continue.",
          icon: "warning"
        });

        // Use timeout to allow React Router to settle if called during initial mount
        setTimeout(() => {
          navigate(`/user/user-profile-edit-page/${userId}`, { replace: true });
        }, 0);
      }
    }
  }, [location.pathname, navigate]);

  return children;
};

function App() {
  useEffect(() => {
    // =============================================
    // REMEMBER ME + SESSION CHECK
    // =============================================
    const rememberMe = localStorage.getItem("rememberMe");
    const hasBrowserSession = document.cookie.includes("browser_session=active");

    if (rememberMe === "false" && !hasBrowserSession) {
      // If we don't have an active session for this browser, clear the global login state
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userImage");
      localStorage.removeItem("gender");
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("isProfileCompleted");
      localStorage.removeItem("authToken");
    } else if (localStorage.getItem("userId")) {
      // Mark this browser session as active
      document.cookie = "browser_session=active; path=/";
      sessionStorage.setItem("session_active", "true");
    }

    // =============================================
    // INACTIVITY AUTO-LOGOUT (1 HOUR = 60 MINUTES)
    // =============================================
    const INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000; // 60*60*1000 minutes
    let inactivityTimer = null;

    const doLogout = () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return; // Already logged out

      // Clear all auth data
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userImage");
      localStorage.removeItem("gender");
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("isProfileCompleted");
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("session_active");
      document.cookie = "browser_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      // Redirect to login
      window.location.href = "/user/user-login";
    };

    const resetInactivityTimer = () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
      // Only set timer if user is logged in
      if (localStorage.getItem("userId")) {
        inactivityTimer = setTimeout(doLogout, INACTIVITY_TIMEOUT_MS);
      }
    };

    // Events that count as "activity"
    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetInactivityTimer, { passive: true });
    });

    // Start the timer on mount if logged in
    resetInactivityTimer();

    // =============================================
    // CROSS-TAB LOGOUT SYNC
    // =============================================
    const handleStorageChange = (e) => {
      // If userId is removed or localStorage is cleared
      if ((e.key === "userId" && !e.newValue) || e.key === null) {
        window.location.href = "/";
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Feature Flag for Security
    const ADD_SECURITY_CHECK = true;

    if (!ADD_SECURITY_CHECK) {
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        activityEvents.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
        if (inactivityTimer) clearTimeout(inactivityTimer);
      };
    }


    // Disable Keyboard Shortcuts (Screenshots, DevTools, Print, Save, Copy, Paste)
    const handleKeyDown = (e) => {

      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, and Screenshot interactions
      if (
        e.key === "F13" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.ctrlKey && (e.key === "S" || e.key === "s")) ||
        (e.ctrlKey && (e.key === "P" || e.key === "p")) ||
        (e.metaKey && e.shiftKey && (e.key === "S" || e.key === "s"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };



    window.addEventListener("keydown", handleKeyDown);

    // CSS to disable Text Selection & Print
    const style = document.createElement("style");
    style.innerHTML = `
      body {
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
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("storage", handleStorageChange);
      activityEvents.forEach((event) => window.removeEventListener(event, resetInactivityTimer));
      if (inactivityTimer) clearTimeout(inactivityTimer);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <SEOManager />
        <ScrollToTop />
        <ToastContainer position="top-right" autoClose={3000} />
        {/* <ReloadHandler /> */}
        <ProfileCompletionGuard>
          <Suspense fallback={<PageLoader />}>
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


              <Route
                path="/user/user-dashboard-page"
                element={<UserDashboardPage />}
              />
              <Route path="/user/user-service-page" element={<UserServicePage />} />
              <Route
                path="/user/show-all-profiles"
                element={<UserAllProfilePage />}
              />
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
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
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
              <Route path="/blog-details/:id" element={<BlogDetailsPage />} />

              <Route path="/safety-security" element={<SafetySecurity />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/location/:locationName" element={<LocationMatrimony />} />
              <Route path="/denomination/:denominationName" element={<DenominationMatrimony />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ProfileCompletionGuard>
      </Router>
    </HelmetProvider>
  );
}

export default App;
