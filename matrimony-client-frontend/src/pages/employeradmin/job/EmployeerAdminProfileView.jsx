import React, { useEffect, useState } from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import { fetchEmployerAdminProfile } from '../../../api/services/projectServices';
import { useNavigate } from 'react-router-dom';

const EmployeerAdminProfileView = () => {
  const [profileData, setProfileData] = useState({
    employeradminUsername: '',
    employeradminEmail: '',
    employeradminMobile: '',
    employeradminProfilePic: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Get admin ID from localStorage
        const adminData = JSON.parse(localStorage.getItem('EmployerAdminData'));
        if (!adminData || !adminData._id) {
          throw new Error('Admin data not found');
        }

        const response = await fetchEmployerAdminProfile(adminData._id);
        
        setProfileData(response.admin);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Failed to load profile data');
        // Redirect to login if unauthorized
        if (err.response?.status === 401) {
          navigate('/employer-admin/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="alert alert-danger">{error}</div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  // Split username into first and last name
  const nameParts = profileData.employeradminUsername?.split(' ') || [];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Settings</h2>
          </div>
        </div>
        {/* /Breadcrumb */}

        <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
          <li className="nav-item">
            <a className="nav-link active" href="/employer-admin/school-profile">
              <i className="ti ti-settings me-2"></i>Profile Details
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/school-details">
              <i className="ti ti-world-cog me-2"></i>School Information
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="plan-and-subscription">
              <i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan & Subscription
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="hired-candidates">
              <i className="ti ti-server-cog me-2"></i>Hired Candidates
            </a>
          </li>
        </ul>
        <div className="row">
          <div className="col-xl-3 theiaStickySidebar">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column list-group settings-list">
                  <a
                    href="/employer-admin/school-profile"
                    className="d-inline-flex align-items-center rounded active py-2 px-3"
                  >
                    <i className="ti ti-arrow-badge-right me-2"></i> Profile Settings
                  </a>
                  <a
                    href="/employer-admin/security-settings"
                    className="d-inline-flex align-items-center rounded py-2 px-3"
                  >
                    Security Settings
                  </a>
                  <a
                    href="#"
                    className="d-inline-flex align-items-center rounded py-2 px-3"
                  >
                    Additional Menu
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="card">
              <div className="card-body">
                <div className="border-bottom mb-3 pb-3">
                  <h4>
                    <i className="ti ti-user me-2 text-primary"></i> Profile Information
                  </h4>
                </div>
                <form action="/employer-admin/school-profile">
                  <div className="border-bottom mb-3">
                    <div className="row">
                      <div className="col-md-12">
                        <div>
                          <h6 className="mb-3 text-primary">Basic Information</h6>
                          <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                            {profileData.employeradminProfilePic ? (
                              <div className="avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 overflow-hidden">
                                <img 
                                  src={profileData.employeradminProfilePic} 
                                  alt="Profile" 
                                  className="w-100 h-100 object-cover"
                                />
                              </div>
                            ) : (
                              <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                <i className="ti ti-photo text-gray-3 fs-16"></i>
                              </div>
                            )}
                            <div className="profile-upload">
                              <div className="mb-2">
                                <h6 className="mb-1">Profile Photo</h6>
                                <p className="fs-12">
                                  Recommended image size is 40px x 40px
                                </p>
                              </div>
                              <div className="profile-uploader d-flex align-items-center">
                                <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                                  Upload
                                  <input
                                    type="file"
                                    className="form-control image-sign"
                                    multiple=""
                                  />
                                </div>
                                <a
                                  href="javascript:void(0);"
                                  className="btn btn-light btn-sm"
                                >
                                  Cancel
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">First Name</label>
                          </div>
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={firstName}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Last Name</label>
                          </div>
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={lastName}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Email</label>
                          </div>
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={profileData.employeradminEmail || ''}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-4">
                            <label className="form-label mb-md-0">Phone</label>
                          </div>
                          <div className="col-md-8">
                            <input 
                              type="text" 
                              className="form-control" 
                              value={profileData.employeradminMobile || ''}
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom mb-3">
                    <h6 className="mb-3">Address Information</h6>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">Address Line :</label>
                          </div>
                          <div className="col-md-9">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter School Address Line"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">State :</label>
                          </div>
                          <div className="col-md-9">
                            <div>
                              <select className="select" disabled>
                                <option>Select</option>
                                <option>Karnataka</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">City :</label>
                          </div>
                          <div className="col-md-9">
                            <select className="select" disabled>
                              <option>Select</option>
                              <option>Bengaluru</option>
                              <option>Mysuru</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-3">
                            <label className="form-label mb-md-0">Taluk :</label>
                          </div>
                          <div className="col-md-9">
                            <div>
                              <select className="select" disabled>
                                <option>Select</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-6">
                            <label className="form-label mb-md-0">Postal Code :</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="6 Digit Pincode"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row align-items-center mb-3">
                          <div className="col-md-2">
                            <label className="form-label mb-md-0">Landmark:</label>
                          </div>
                          <div className="col-md-10">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Address landmark"
                              readOnly
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end">
                    <button
                      type="button"
                      className="btn btn-outline-light border me-3"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default EmployeerAdminProfileView;