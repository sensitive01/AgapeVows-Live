import React, { useState } from 'react';

const UnitAddSchoolModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountUrl: '',
    phone: '',
    website: '',
    password: '',
    confirmPassword: '',
    address: '',
    planName: '',
    planType: '',
    currency: '',
    language: '',
    status: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New School</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
              aria-label="Close"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-md-12">
                  <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                      <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="rounded-circle" />
                    </div>                                              
                    <div className="profile-upload">
                      <div className="mb-2">
                        <h6 className="mb-1">Upload Profile Image</h6>
                        <p className="fs-12">Image should be below 4 mb</p>
                      </div>
                      <div className="profile-uploader d-flex align-items-center">
                        <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                          Upload
                          <input type="file" className="form-control image-sign" multiple />
                        </div>
                        <button type="button" className="btn btn-light btn-sm">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Name <span className="text-danger"> *</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Account URL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="accountUrl"
                      value={formData.accountUrl}
                      onChange={handleChange}
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Phone Number <span className="text-danger"> *</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Website</label>
                    <input
                      type="text"
                      className="form-control"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Password <span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="pass-input form-control"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <span
                        className={`ti toggle-password ${showPassword ? "ti-eye" : "ti-eye-off"}`}
                        onClick={() => setShowPassword(!showPassword)}
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
                    <div className="pass-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="pass-inputs form-control"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <span
                        className={`ti toggle-passwords ${showConfirmPassword ? "ti-eye" : "ti-eye-off"}`}
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      ></span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Name <span className="text-danger"> *</span></label>
                    <select
                      className="form-select"
                      name="planName"
                      value={formData.planName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Advanced</option>
                      <option>Basic</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Type <span className="text-danger"> *</span></label>
                    <select
                      className="form-select"
                      name="planType"
                      value={formData.planType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Currency <span className="text-danger"> *</span></label>
                    <select
                      className="form-select"
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>USD</option>
                      <option>Euro</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Language <span className="text-danger"> *</span></label>
                    <select
                      className="form-select"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>English</option>
                      <option>Arabic</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add School</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UnitAddSchoolModal;