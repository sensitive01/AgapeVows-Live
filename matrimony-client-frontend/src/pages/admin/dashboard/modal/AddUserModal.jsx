import React, { useState } from 'react';

const AddUserModal = ({ show, onClose }) => {
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    employeeId: '',
    joiningDate: '',
    phoneNumber: '',
    postingSchool: '',
    department: '',
    designation: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    aboutTeacher: '',
    permissions: {
      holidays: { enabled: true, read: true, write: false, create: false, delete: true, import: false, export: false },
      leaves: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
      students: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
      subjects: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
      tasks: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
      chats: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
      library: { enabled: true, read: false, write: false, create: true, delete: false, import: true, export: false },
      timingSheets: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false }
    },
    enableAllModules: false,
    selectAll: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePermissionChange = (module, permission, value) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          [permission]: value
        }
      }
    }));
  };

  const toggleModule = (module, enabled) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [module]: {
          ...prev.permissions[module],
          enabled
        }
      }
    }));
  };

  const toggleAllModules = (enabled) => {
    const updatedPermissions = {};
    Object.keys(formData.permissions).forEach(module => {
      updatedPermissions[module] = {
        ...formData.permissions[module],
        enabled
      };
    });
    
    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions,
      enableAllModules: enabled
    }));
  };

  const toggleSelectAll = (selected) => {
    const updatedPermissions = {};
    Object.keys(formData.permissions).forEach(module => {
      updatedPermissions[module] = {
        ...formData.permissions[module],
        read: selected,
        write: selected,
        create: selected,
        delete: selected,
        import: selected,
        export: selected
      };
    });
    
    setFormData(prev => ({
      ...prev,
      permissions: updatedPermissions,
      selectAll: selected
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <div className="d-flex align-items-center">
              <h4 className="modal-title me-2">
                <i className="fa fa-graduation-cap text-primary"></i> Add New User
              </h4>
            </div>
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
            <div className="contact-grids-tab">
              <ul className="nav nav-underline" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'basic-info' ? 'active' : ''}`}
                    id="info-tab"
                    type="button"
                    onClick={() => setActiveTab('basic-info')}
                  >
                    Basic Information
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'permissions' ? 'active' : ''}`}
                    id="permissions-tab"
                    type="button"
                    onClick={() => setActiveTab('permissions')}
                  >
                    Permissions
                  </button>
                </li>
              </ul>
            </div>
            
            <div className="tab-content" id="myTabContent">
              {activeTab === 'basic-info' && (
                <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                  <div className="modal-body pb-0">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo text-gray-2 fs-16"></i>
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
                          <label className="form-label">First Name <span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Employee ID <span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="employeeId"
                            value={formData.employeeId}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Joining Date <span className="text-danger"> *</span></label>
                          <div className="input-icon-end position-relative">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="dd/mm/yyyy"
                              name="joiningDate"
                              value={formData.joiningDate}
                              onChange={handleChange}
                            />
                            <span className="input-icon-addon">
                              <i className="ti ti-calendar text-gray-7"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Phone Number <span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Posting School<span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="postingSchool"
                            value={formData.postingSchool}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Department</label>
                          <select
                            className="form-select"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            <option>All Department</option>
                            <option>Finance</option>
                            <option>Developer</option>
                            <option>Executive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Designation</label>
                          <select
                            className="form-select"
                            name="designation"
                            value={formData.designation}
                            onChange={handleChange}
                          >
                            <option>Select</option>
                            <option>Finance</option>
                            <option>Developer</option>
                            <option>Executive</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Username <span className="text-danger"> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Email <span className="text-danger"> *</span></label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Password <span className="text-danger"> *</span></label>
                          <div className="pass-group">
                            <input
                              type="password"
                              className="pass-input form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
                            <span className="ti toggle-password ti-eye-off"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Confirm Password <span className="text-danger"> *</span></label>
                          <div className="pass-group">
                            <input
                              type="password"
                              className="pass-inputs form-control"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <span className="ti toggle-passwords ti-eye-off"></span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">About Teacher<span className="text-danger"> *</span></label>
                          <textarea
                            className="form-control"
                            rows="3"
                            name="aboutTeacher"
                            value={formData.aboutTeacher}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-light border me-2" onClick={onClose}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={() => setActiveTab('permissions')}>Next</button>
                  </div>
                </div>
              )}
              
              {activeTab === 'permissions' && (
                <div className="tab-pane fade show active" id="permissions" role="tabpanel" aria-labelledby="permissions-tab" tabIndex="0">
                  <div className="modal-body">
                    <div className="card bg-light-500">
                      <div className="card-body d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h6>Enable Options</h6>
                        <div className="d-flex align-items-center justify-content-end">
                          <div className="form-check form-switch me-2">
                            <label className="form-check-label mt-0">
                              <input
                                className="form-check-input me-2"
                                type="checkbox"
                                role="switch"
                                checked={formData.enableAllModules}
                                onChange={(e) => toggleAllModules(e.target.checked)}
                              />
                              Enable all Module
                            </label>
                          </div>
                          <div className="form-check d-flex align-items-center">
                            <label className="form-check-label mt-0">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={formData.selectAll}
                                onChange={(e) => toggleSelectAll(e.target.checked)}
                              />
                              Select All
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive border rounded">
                      <table className="table">
                        <tbody>
                          {Object.entries(formData.permissions).map(([module, permissions]) => (
                            <tr key={module}>
                              <td>
                                <div className="form-check form-switch me-2">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input me-2"
                                      type="checkbox"
                                      role="switch"
                                      checked={permissions.enabled}
                                      onChange={(e) => toggleModule(module, e.target.checked)}
                                    />
                                    {module.charAt(0).toUpperCase() + module.slice(1).replace(/([A-Z])/g, ' $1')}
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.read}
                                      onChange={(e) => handlePermissionChange(module, 'read', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Read
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.write}
                                      onChange={(e) => handlePermissionChange(module, 'write', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Write
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.create}
                                      onChange={(e) => handlePermissionChange(module, 'create', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Create
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.delete}
                                      onChange={(e) => handlePermissionChange(module, 'delete', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Delete
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.import}
                                      onChange={(e) => handlePermissionChange(module, 'import', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Import
                                  </label>
                                </div>
                              </td>
                              <td>
                                <div className="form-check d-flex align-items-center">
                                  <label className="form-check-label mt-0">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={permissions.export}
                                      onChange={(e) => handlePermissionChange(module, 'export', e.target.checked)}
                                      disabled={!permissions.enabled}
                                    />
                                    Export
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-light border me-2" onClick={() => setActiveTab('basic-info')}>Back</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;