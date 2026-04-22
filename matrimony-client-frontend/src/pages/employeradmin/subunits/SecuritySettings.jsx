import React, { useState } from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const SecuritySettings = () => {
  // Modal visibility states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangeEmail, setShowChangeEmail] = useState(false);
  const [showChangePhone, setShowChangePhone] = useState(false);
  const [showDeviceManagement, setShowDeviceManagement] = useState(false);
  const [showAccountActivity, setShowAccountActivity] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  // Change Password Modal
  const ChangePasswordModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Change Password</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="mb-3">
                  <label className="form-label">Current Password <span className="text-danger">*</span></label>
                  <div className="pass-group">
                    <input 
                      type={showCurrentPassword ? "text" : "password"} 
                      className="pass-input form-control" 
                    />
                    <span 
                      className={`ti toggle-password ${showCurrentPassword ? 'ti-eye' : 'ti-eye-off'}`}
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    ></span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password<span className="text-danger">*</span></label>
                  <div className="pass-group">
                    <input 
                      type={showNewPassword ? "text" : "password"} 
                      className="pass-inputs form-control" 
                    />
                    <span 
                      className={`ti toggle-passwords ${showNewPassword ? 'ti-eye' : 'ti-eye-off'}`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    ></span>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password<span className="text-danger">*</span></label>
                  <div className="pass-group">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="form-control pass-inputa" 
                    />
                    <span 
                      className={`ti toggle-passworda ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></span>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top">
              <div className="acc-submit">
                <button className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" type="submit">Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Change Email Modal
  const ChangeEmailModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Change Email</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="wallet-add">
                  <div className="mb-3">
                    <label className="form-label">Current Email Address</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Email Address <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">OTP<span className="text-danger">*</span></label>
                    <div className="pass-group">
                      <input 
                        type={showOTP ? "text" : "password"} 
                        className="form-control pass-inputa" 
                      />
                      <span 
                        className={`ti toggle-passworda ${showOTP ? 'ti-eye' : 'ti-eye-off'}`}
                        onClick={() => setShowOTP(!showOTP)}
                      ></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top">
              <div className="acc-submit">
                <button className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" type="submit">Update Email ID</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Change Phone Modal
  const ChangePhoneModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content doctor-profile">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Change Phone Number</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body p-4">
              <form>
                <div className="wallet-add">
                  <div className="mb-3">
                    <label className="form-label">Current Phone Number</label>
                    <input className="form-control form-control-lg group_formcontrol" id="phone" name="phone" type="text" placeholder="Enter Phone Number" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">New Phone Number <span className="text-danger">*</span></label>
                    <input className="form-control form-control-lg group_formcontrol" id="phone1" name="phone" type="text" placeholder="Enter Phone Number" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">OTP<span className="text-danger">*</span></label>
                    <div className="pass-group">
                      <input 
                        type={showOTP ? "text" : "password"} 
                        className="form-control pass-inputa" 
                      />
                      <span 
                        className={`ti toggle-passworda ${showOTP ? 'ti-eye' : 'ti-eye-off'}`}
                        onClick={() => setShowOTP(!showOTP)}
                      ></span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-top">
              <div className="acc-submit">
                <button className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                <button className="btn btn-dark" type="submit">Change Number</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Device Management Modal
  const DeviceManagementModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Device Management</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Device</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>IP Address</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chrome - Windows</td>
                      <td>15 May 2025, 10:30 AM</td>
                      <td>New York / USA</td>
                      <td>232.222.12.72</td>
                      <td>
                        <span><i className="ti ti-trash text-danger"></i></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Safari Macos</td>
                      <td>10 Apr 2025, 05:15 PM</td>
                      <td>New York / USA</td>
                      <td>224.111.12.75</td>
                      <td>
                        <span><i className="ti ti-trash text-danger"></i></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Firefox Windows</td>
                      <td>15 Mar 2025, 02:40 PM</td>
                      <td>New York / USA</td>
                      <td>111.222.13.28</td>
                      <td>
                        <span><i className="ti ti-trash text-danger"></i></span>
                      </td>
                    </tr>
                    <tr>
                      <td>Safari Macos</td>
                      <td>15 May 2025, 10:30 AM</td>
                      <td>New York / USA</td>
                      <td>333.555.10.54</td>
                      <td>
                        <span><i className="ti ti-trash text-danger"></i></span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Account Activity Modal
  const AccountActivityModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Account Activity</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="table">
                <table className="table">
                  <thead className="thead-light">
                    <tr>
                      <th>Device</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>IP Address</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Chrome - Windows</td>
                      <td>15 May 2025, 10:30 AM</td>
                      <td>New York / USA</td>
                      <td>232.222.12.72</td>
                      <td>
                        <span className="badge badge-sm badge-success"><i className="ti ti-point-filled me-1"></i>connect</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Safari Macos</td>
                      <td>10 Apr 2025, 05:15 PM</td>
                      <td>New York / USA</td>
                      <td>224.111.12.75</td>
                      <td>
                        <span className="badge badge-sm badge-success"><i className="ti ti-point-filled me-1"></i>connect</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Firefox Windows</td>
                      <td>15 Mar 2025, 02:40 PM</td>
                      <td>New York / USA</td>
                      <td>111.222.13.28</td>
                      <td>
                        <span className="badge badge-sm badge-success"><i className="ti ti-point-filled me-1"></i>connect</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Safari Macos</td>
                      <td>15 May 2025, 10:30 AM</td>
                      <td>New York / USA</td>
                      <td>333.555.10.54</td>
                      <td>
                        <span className="badge badge-sm badge-success"><i className="ti ti-point-filled me-1"></i>connect</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Delete Account Modal
  const DeleteAccountModal = ({ show, onClose }) => {
    if (!show) return null;

    return (
      <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header d-flex align-items-center justify-content-between border-bottom">
              <h5 className="modal-title">Delete Account</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <form>
              <div className="modal-body">
                <p className="mb-3">Are you sure you want to delete This Account? To delete your account, Type your password.</p>
                <div className="mb-3">
                  <label className="form-label">Confirm Password<span className="text-danger">*</span></label>
                  <div className="pass-group">
                    <input 
                      type={showConfirmPassword ? "text" : "password"} 
                      className="form-control pass-inputa" 
                    />
                    <span 
                      className={`ti toggle-passworda ${showConfirmPassword ? 'ti-eye' : 'ti-eye-off'}`}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    ></span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary">Delete Account</button>
              </div>  
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
      <>
        <EmployerAdminHeader />
    <div className="content">
      {/* Breadcrumb */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1"> &nbsp; <i className="fa fa-cogs fa-spin text-primary"></i> Settings</h2>
        </div>
      </div>
      {/* /Breadcrumb */}

      <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
        <li className="nav-item">
          <a className="nav-link active" href="/employer-admin/school-profile"><i className="ti ti-settings me-2"></i>Profile Details</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/school-details"><i className="ti ti-world-cog me-2"></i>School Information</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/plan-and-subscription"><i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan & Subscription</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/hired-candidates"><i className="ti ti-server-cog me-2"></i>Hired Candidates</a>
        </li>
      </ul>
      
      <div className="row">
        <div className="col-xl-3 theiaStickySidebar">
          <div className="card">
            <div className="card-body">
              <div className="d-flex flex-column list-group settings-list">
                <a href="/employer-admin/school-profile" className="d-inline-flex align-items-center rounded py-2 px-3">Profile Settings</a>
                <a href="/employer-admin/security-settings" className="d-inline-flex align-items-center rounded active py-2 px-3"><i className="ti ti-arrow-badge-right me-2"></i> Security Settings</a>
                <a href="#" className="d-inline-flex align-items-center rounded py-2 px-3">Additional Menu</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-9">
          <div className="card">
            <div className="card-body">
              <div className="border-bottom mb-3 pb-3">
                <h4><i className="ti ti-lock me-2 text-primary"></i> Security Settings</h4>
              </div>
              <div>
                {/* Password Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium mb-1 text-primary">Password</h5>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 me-2 pe-2 border-end">Set a unique password to protect the account</p>
                      <p>Last Changed 03 Jan 2024, 09:00 AM</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark btn-sm" onClick={() => setShowChangePassword(true)}>
                      <i className="ti ti-lock"></i> Change Password
                    </button>
                  </div>
                </div>

                {/* Two Factor Authentication Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium mb-1 text-primary">Two Factor Authentication</h5>
                    <p>Receive codes via SMS or email every time you login</p>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark btn-sm">Enable</button>
                  </div>
                </div>

                {/* Block Account Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium d-flex align-items-center mb-1 text-primary">
                      Block Account
                      <span className="badge badge-xs ms-2 bg-outline-success rounded-pill d-flex align-items-center">
                        <i className="ti ti-point-filled"></i>Connected
                      </span>
                    </h5>
                    <p>Block / Pause Account Access</p>
                  </div>
                  <div className="mb-3">
                    <div className="form-check form-check-md form-switch me-2">
                      <input className="form-check-input me-2" type="checkbox" role="switch" />
                    </div>
                  </div>
                </div>

                {/* Phone Number Verification Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium d-flex align-items-center mb-1 text-primary">
                      Phone Number Verification <span><i className="ti ti-discount-check-filled text-success ms-2"></i></span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 me-2 pe-2 border-end">The Phone Number associated with the account</p>
                      <p>Verified Mobile Number : +99264710583</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-outline-light btn-sm border me-2">Remove</button>
                    <button className="btn btn-dark btn-sm" onClick={() => setShowChangePhone(true)}>Change</button>
                  </div>
                </div>

                {/* Email Verification Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium d-flex align-items-center mb-1 text-primary">
                      Email Verification <span><i className="ti ti-discount-check-filled text-success ms-2"></i></span>
                    </h5>
                    <div className="d-flex align-items-center">
                      <p className="mb-0 me-2 pe-2 border-end">The email address associated with the account</p>
                      <p>Verified Email : <a href="" className="__cf_email__" data-cfemail="b0d9ded6dff0d5c8d1ddc0dcd59ed3dfdd">[email&#160;protected]</a></p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-outline-light btn-sm border me-2">Remove</button>
                    <button className="btn btn-dark btn-sm" onClick={() => setShowChangeEmail(true)}>Change</button>
                  </div>
                </div>

                {/* Device Management Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium mb-1 text-primary">Device Management</h5>
                    <p>The devices associated with the account</p>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark btn-sm" onClick={() => setShowDeviceManagement(true)}>Manage</button>
                  </div>
                </div>

                {/* Account Activity Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium mb-1 text-primary">Account Activity</h5>
                    <p>The activities of the account</p>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark btn-sm" onClick={() => setShowAccountActivity(true)}>View</button>
                  </div>
                </div>

                {/* Deactivate Account Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap border-bottom mb-3">
                  <div className="mb-3">
                    <h5 className="fw-medium mb-1 text-primary">Deactivate Account</h5>
                    <p>This will shutdown your account. Your account will be reactive when you sign in again</p>
                  </div>
                  <div className="mb-3">
                    <button className="btn btn-dark btn-sm">Deactivate</button>
                  </div>
                </div>

                {/* Delete Account Section */}
                <div className="d-flex justify-content-between align-items-center flex-wrap row-gap-3">
                  <div>
                    <h5 className="fw-medium mb-1 text-primary">Delete Account</h5>
                    <p>Your account will be permanently deleted</p>
                  </div>
                  <div>
                    <button className="btn btn-dark btn-sm" onClick={() => setShowDeleteAccount(true)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modals */}
      <ChangePasswordModal show={showChangePassword} onClose={() => setShowChangePassword(false)} />
      <ChangeEmailModal show={showChangeEmail} onClose={() => setShowChangeEmail(false)} />
      <ChangePhoneModal show={showChangePhone} onClose={() => setShowChangePhone(false)} />
      <DeviceManagementModal show={showDeviceManagement} onClose={() => setShowDeviceManagement(false)} />
      <AccountActivityModal show={showAccountActivity} onClose={() => setShowAccountActivity(false)} />
      <DeleteAccountModal show={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
    </div>
      <EmployerAdminFooter />
      </>
  );
};

export default SecuritySettings;