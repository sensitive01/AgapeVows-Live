import React, { useState, useEffect } from "react";
import NewLayout from "./layout/NewLayout";
import { getAdminProfile, updateAdminProfile } from "../../api/service/adminServices";

const AdminProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    if (adminId) {
      fetchAdminProfile();
    }
  }, [adminId]);

  const fetchAdminProfile = async () => {
    try {
      const res = await getAdminProfile(adminId);
      if (res.data?.success) {
        setProfileData({
          name: res.data.data.adminName || "Admin",
          email: res.data.data.adminEmail || "",
          password: "",
        });
      }
    } catch (err) {
      console.error("Failed to fetch admin profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateAdminProfile(adminId, profileData);
      if (res.data?.success) {
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to update admin profile", err);
      setMessage("Failed to update profile.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Admin Profile</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Admin Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-form">
              {message && <div className="alert alert-info">{message}</div>}
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="form-inp">
                  <form onSubmit={handleSubmit}>
                    <div className="edit-pro-parti">
                      <div className="form-tit">
                        <h4>Admin access</h4>
                        <h1>Login details</h1>
                      </div>
                      <div className="form-group">
                        <label className="lb">Name:</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Admin Name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="lb">Email:</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="lb">Password (leave blank to keep current):</label>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Enter new password"
                          name="password"
                          value={profileData.password}
                          onChange={handleChange}
                        />
                        <span 
                          className="pass-view" 
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ cursor: "pointer" }}
                        >
                          <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`} aria-hidden="true"></i>
                        </span>
                      </div>
                      <div className="form-group" style={{marginTop: "20px"}}>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminProfile;
