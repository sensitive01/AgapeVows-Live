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


function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
