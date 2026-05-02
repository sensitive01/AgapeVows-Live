import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MatrimonyAdminLogin from "./components/admin/AdminLoginPage";
import AdminNewUserRequest from "./components/admin/AdminNewUserRequest";
import DashboardPage from "./components/admin/DashboardPage";
import AdminAllUsersList from "./components/admin/AdminAllUsersList";
import AdminFreeUserList from "./components/admin/AdminFreeUserList";
import AdminPremiumUserList from "./components/admin/AdminPremiumUserList";
import AdminAddNewUser from "./components/admin/AdminAddNewUser";
import AdminMetaTags from "./components/admin/AdminMetaTags";
import AdminGoogleAnalyticsCode from "./components/admin/AdminGoogleAnalyticsCode";
import AdminXmlSiteMap from "./components/admin/AdminXmlSiteMap";
import AdminAllPayments from "./components/admin/AdminAllPayments";
import AdminPricingPlans from "./components/admin/AdminPricingPlans";
import AdminPaymentGateWay from "./components/admin/AdminPaymentGateWay";
import AdminSettings from "./components/admin/AdminSettings";
import AdminEvents from "./components/admin/AdminEvents";
import AdminLayout from "./components/mainLayouts/AdminLayout";
import AdminDeletedUsers from "./components/admin/AdminDeletedUsers";
import AdminEditUser from "./components/admin/AdminEditUser";
import AdminViewNewUser from "./components/admin/AdminViewNewUser";
import AdminIssues from "./components/admin/AdminIssues";
import AdminBillingInfo from "./components/admin/AdminBillingInfo";
import AdminUserPlan from "./components/admin/AdminUserPlan";

import AdminBlogs from "./components/admin/AdminBlogs";
import AdminEnquiries from "./components/admin/AdminEnquiries";
import AdminFeedbacks from "./components/admin/AdminFeedbacks";
import AdminUnverifiedIdUsers from "./components/admin/AdminUnverifiedIdUsers";

function App() {
  useEffect(() => {
    // Synchronize logout across tabs
    const handleStorageChange = (e) => {
      // If adminId is removed or localStorage is cleared
      if ((e.key === "adminId" && !e.newValue) || e.key === null) {
        window.location.href = "/";
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Feature Flag for Security
    const ADD_SECURITY_CHECK = true;

    if (!ADD_SECURITY_CHECK) return;

    // Disable Right Click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable Keyboard Shortcuts (Screenshots, DevTools, Print, Save, Copy, Paste)
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
        e.key === "F13" ||
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

    // Universal Ctrl + Click handler to force foreground navigation
    const handleGlobalClick = (e) => {
      if (e.ctrlKey && e.button === 0) {
        const target = e.target.closest("a");
        if (target && target.href && target.href !== "javascript:void(0)" && !target.href.startsWith("#")) {
          e.preventDefault();
          e.stopPropagation();
          
          // Strategy: Programmatically click a target="_blank" link WITHOUT the Ctrl modifier.
          // This forces most browsers to treat it as a foreground tab open.
          const a = document.createElement("a");
          a.href = target.href;
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleGlobalClick, true);
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
      window.removeEventListener("click", handleGlobalClick, true);
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("copy", handleCopyCutPaste);
      window.removeEventListener("cut", handleCopyCutPaste);
      window.removeEventListener("paste", handleCopyCutPaste);
      window.removeEventListener("storage", handleStorageChange);
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/"
          element={
            <AdminLayout>
              <MatrimonyAdminLogin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/new-user-requests"
          element={
            <AdminLayout>
              <AdminNewUserRequest />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/all-user-list"
          element={
            <AdminLayout>
              <AdminAllUsersList />
            </AdminLayout>
          }
        />
        <Route
  path="/admin/edit-user/:id"
  element={
    <AdminLayout>
      <AdminEditUser />
    </AdminLayout>
  }
/>
<Route
  path="/admin/deleted-users"
  element={
    <AdminLayout>
      <AdminDeletedUsers />
    </AdminLayout>
  }
/>

        <Route
          path="/admin/paid-user-list"
          element={
            <AdminLayout>
              <AdminFreeUserList />
            </AdminLayout>
          }
        />
        {/* <Route
          path="/admin/standard-user-list"
          element={
            <AdminLayout>
              <AdminFreeUserList />
            </AdminLayout>
          }
        /> */}
        {/* <Route
          path="/admin/premium-user-list"
          element={
            <AdminLayout>
              <AdminPremiumUserList />
            </AdminLayout>
          }
        /> */}
        <Route
          path="/admin/add-new-user"
          element={
            <AdminLayout>
              <AdminAddNewUser />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/edit-user/:id"
          element={
            <AdminLayout>
              <AdminEditUser />
            </AdminLayout>
          }
        />

        <Route
          path="/admin/seo-meta-tags"
          element={
            <AdminLayout>
              <AdminMetaTags />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/seo-google-analystics-code"
          element={
            <AdminLayout>
              <AdminGoogleAnalyticsCode />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/seo-xml-site-map"
          element={
            <AdminLayout>
              <AdminXmlSiteMap />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/all-payments-list"
          element={
            <AdminLayout>
              <AdminAllPayments />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/pricing-plans-list"
          element={
            <AdminLayout>
              <AdminPricingPlans />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/payment-gateway"
          element={
            <AdminLayout>
              <AdminPaymentGateWay />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/settings-page"
          element={
            <AdminLayout>
              <AdminSettings />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminLayout>
              <AdminEvents />
            </AdminLayout>
          }
        />
        <Route
  path="/admin/issues"
  element={
    <AdminLayout>
      <AdminIssues />
    </AdminLayout>
  }
/>
        <Route
  path="/admin/new-user/:id"
  element={
    <AdminLayout>
      <AdminViewNewUser />
    </AdminLayout>
  }
/>
<Route
  path="/admin/billing-info/:id"
  element={
    <AdminLayout>
      <AdminBillingInfo />
    </AdminLayout>
  }
/>
<Route
  path="/admin/user-plan/:id"
  element={
    <AdminLayout>
      <AdminUserPlan />
    </AdminLayout>
  }
/>
<Route
  path="/admin/blogs"
  element={
    <AdminLayout>
      <AdminBlogs />
    </AdminLayout>
  }
/>
        <Route
          path="/admin/enquiries"
          element={
            <AdminLayout>
              <AdminEnquiries />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/feedbacks"
          element={
            <AdminLayout>
              <AdminFeedbacks />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/id-verification-requests"
          element={
            <AdminLayout>
              <AdminUnverifiedIdUsers />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
