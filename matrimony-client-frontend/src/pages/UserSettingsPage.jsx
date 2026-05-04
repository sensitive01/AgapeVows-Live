import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import { deactivateProfile, getUserInfo } from "../api/axiosService/userAuthService";
import { resetPasswordRequest } from "../api/axiosService/userSignUpService";
import { toast } from "react-toastify";
import { confirmAction } from "../utils/alertService";

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [activeTab, setActiveTab] = useState("mobile");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [deactivationDescription, setDeactivationDescription] = useState("");

  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const reasons = [
    "Found my partner in AgapeVows",
    "Found my partner elsewhere",
    "Not interested",
    "Need short break but will come back",
    "Going to pursue higher studies"
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserInfo(userId);
        if (res?.data?.success) {
          setUserData(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    if (userId) fetchUserData();
  }, [userId]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordRequest({
        newPassword: passwordData.newPassword,
        userId
      });
      if (res.status === 200) {
        toast.success("Password updated successfully");
        setPasswordData({ newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async () => {
    if (!deactivationReason) {
      toast.warn("Please select a reason for deactivation");
      return;
    }

    const confirmed = await confirmAction({
      title: "Deactivate Profile?",
      text: "Are you sure you want to deactivate your profile? You will be logged out.",
      icon: "warning",
      confirmButtonText: "Yes, Deactivate",
    });

    if (!confirmed) return;

    setLoading(true);
    try {
      const response = await deactivateProfile(userId, { deactivationReason, deactivationDescription });
      if (response.status === 200) {
        toast.success("Your profile has been deactivated successfully.");
        localStorage.clear();
        navigate("/user/user-login");
      }
    } catch (error) {
      toast.error("Failed to deactivate profile.");
    } finally {
      setLoading(false);
      setShowDeactivateModal(false);
    }
  };

  const tabList = [
    { id: "mobile", label: "Update Mobile Number", icon: "fa-mobile" },
    { id: "email", label: "Update Email Address", icon: "fa-envelope" },
    { id: "password", label: "Change Password", icon: "fa-lock" },
    { id: "privacy", label: "Privacy Settings", icon: "fa-shield" },
    { id: "notifications", label: "Notifications", icon: "fa-bell" },
    { id: "deactivate", label: "Deactivate Profile", icon: "fa-user-times" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "170px", paddingBottom: "40px" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <UserSideBar sidebarTop="120px" />
            </div>

            <div className="col-md-9">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="row g-0" style={{ minHeight: "600px" }}>
                  <div className="col-md-4 border-end bg-light">
                    <div className="list-group list-group-flush">
                      {tabList.map((tab) => (
                        <button
                          key={tab.id}
                          className={`list-group-item list-group-item-action border-0 py-3 d-flex align-items-center gap-3 ${
                            activeTab === tab.id ? "active bg-primary text-white" : "bg-light"
                          }`}
                          onClick={() => setActiveTab(tab.id)}
                        >
                          <i className={`fa ${tab.icon} fa-fw`}></i>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="col-md-8 p-4">
                    {activeTab === "mobile" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                          <i className="fa fa-mobile text-primary"></i>
                          Update Mobile Number
                        </h4>
                        <div className="mb-4">
                          <label className="text-muted small mb-1">Current Mobile Number :</label>
                          <div className="h5 font-weight-bold">{userData?.userMobile || "Loading..."}</div>
                        </div>
                        <div className="alert alert-info py-3">
                          <i className="fa fa-phone-alt me-2"></i>
                          Call us at <strong className="text-primary">8122234414</strong> to update your phone number
                        </div>
                      </div>
                    )}

                    {activeTab === "email" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                          <i className="fa fa-envelope text-primary"></i>
                          Update Email Address
                        </h4>
                        <div className="mb-4">
                          <label className="text-muted small mb-1">Current Email Address :</label>
                          <div className="h5 font-weight-bold">{userData?.userEmail || "Loading..."}</div>
                        </div>
                        <div className="alert alert-info py-3">
                          <i className="fa fa-envelope me-2"></i>
                          Contact support at <strong className="text-primary">support@agapevows.com</strong> to change your email
                        </div>
                      </div>
                    )}

                    {activeTab === "password" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                          <i className="fa fa-lock text-primary"></i>
                          Change Password
                        </h4>
                        <form onSubmit={handlePasswordChange}>
                          <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              required
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Confirm New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              required
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                            />
                          </div>
                          <button type="submit" className="btn btn-primary px-4" disabled={loading}>
                            {loading ? "Updating..." : "Update Password"}
                          </button>
                        </form>
                      </div>
                    )}

                    {activeTab === "privacy" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                          <i className="fa fa-shield text-primary"></i>
                          Privacy Settings
                        </h4>
                        <div className="mb-4">
                          <label className="form-label font-weight-bold">Profile Visibility</label>
                          <p className="text-muted small">Control who can view your profile details.</p>
                          <select 
                            className="form-select"
                            value={userData?.profileVisibility || "Private"}
                            onChange={() => {}} // Placeholder for now
                          >
                            <option value="Public">All Users</option>
                            <option value="Private">Premium Users Only</option>
                            <option value="Hidden">Hide from Everyone</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label className="form-label font-weight-bold">Interest Requests</label>
                          <p className="text-muted small">Control who can send you interest requests.</p>
                          <select className="form-select">
                            <option value="All users">All users</option>
                            <option value="Premium">Premium Users Only</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {activeTab === "notifications" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2">
                          <i className="fa fa-bell text-primary"></i>
                          Notifications
                        </h4>
                        <div className="list-group list-group-flush">
                          {[
                            { id: "not-interest", label: "Interest Request", desc: "Interest request email notifications" },
                            { id: "not-chat", label: "Chat", desc: "New chat notifications" },
                            { id: "not-views", label: "Profile Views", desc: "Get notified when someone views your profile" },
                            { id: "not-match", label: "New Profile Match", desc: "You get the profile match emails" }
                          ].map(item => (
                            <div key={item.id} className="list-group-item px-0 py-3 d-flex justify-content-between align-items-center">
                              <div>
                                <h6 className="mb-0">{item.label}</h6>
                                <p className="text-muted small mb-0">{item.desc}</p>
                              </div>
                              <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" defaultChecked />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === "deactivate" && (
                      <div>
                        <h4 className="mb-4 border-bottom pb-2 d-flex align-items-center gap-2 text-danger">
                          <i className="fa fa-user-times"></i>
                          Deactivate Profile
                        </h4>
                        <p className="text-muted">Temporarily hide your profile from the platform. You can reactivate it later by contacting support.</p>
                        <button 
                          className="btn btn-outline-danger mt-3 px-4"
                          onClick={() => setShowDeactivateModal(true)}
                        >
                          Proceed to Deactivation
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDeactivateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Deactivate Profile</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeactivateModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <p>We are sorry to see you go. Please tell us why you want to deactivate your profile:</p>
                <div className="form-group mt-3">
                  <select 
                    className="form-select" 
                    value={deactivationReason}
                    onChange={(e) => setDeactivationReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label className="form-label small">Tell us more (optional):</label>
                  <textarea 
                    className="form-control" 
                    rows="3" 
                    placeholder="Enter additional details..."
                    value={deactivationDescription}
                    onChange={(e) => setDeactivationDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer bg-light border-0">
                <button type="button" className="btn btn-link text-muted" onClick={() => setShowDeactivateModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-danger px-4" 
                  onClick={handleDeactivate}
                  disabled={loading || !deactivationReason}
                >
                  {loading ? "Deactivating..." : "Confirm Deactivation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettingsPage;
