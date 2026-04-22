import React, { useState } from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';

const AddNewCandidate = () => {
  const [show, setShow] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    candidateId: 'EMP-0024',
    joiningDate: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    company: '',
    department: '',
    designation: '',
    about: ''
  });


  const [permissions, setPermissions] = useState({
    holidays: { read: true, write: false, create: false, delete: true, import: false, export: false },
    leaves: { read: false, write: false, create: false, delete: false, import: false, export: false },
    clients: { read: false, write: false, create: false, delete: false, import: false, export: false },
    projects: { read: false, write: false, create: false, delete: false, import: false, export: false },
    tasks: { read: false, write: false, create: false, delete: false, import: false, export: false },
    chats: { read: false, write: false, create: false, delete: false, import: false, export: false },
    assets: { read: false, write: false, create: true, delete: false, import: true, export: false },
    timingSheets: { read: false, write: false, create: false, delete: false, import: false, export: false }
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionChange = (module, permission) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [permission]: !prev[module][permission]
      }
    }));
  };

  const toggleModule = (module) => {
    const currentState = permissions[module].read;
    const newState = !currentState;
    
    setPermissions(prev => ({
      ...prev,
      [module]: {
        read: newState,
        write: newState,
        create: newState,
        delete: newState,
        import: newState,
        export: newState
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData, permissions);
    handleClose();
  };

  return (
    <>
      <button 
        onClick={handleShow} 
        className="btn btn-primary d-flex align-items-center"
      >
        <i className="ti ti-circle-plus me-2"></i>Add Candidate
      </button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <div className="d-flex align-items-center">
            <h4 className="modal-title me-2">Add New Candidate</h4>
            <span>Candidate ID : EMP-0024</span>
          </div>
          {/* <button 
            type="button" 
            className="btn-close custom-btn-close" 
            onClick={handleClose}
          >
            <i className="ti ti-x"></i>
          </button> */}
        </Modal.Header>
        
        <form onSubmit={handleSubmit}>
          <div className="contact-grids-tab">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="nav-underline"
            >
              <Tab eventKey="basic-info" title="Basic Information" className="nav-item">
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
                          onChange={handleInputChange}
                          required
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
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Candidate ID <span className="text-danger"> *</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="candidateId"
                          value={formData.candidateId}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Joining Date <span className="text-danger"> *</span></label>
                        <div className="input-icon-end position-relative">
                          <input 
                            type="date" 
                            className="form-control" 
                            name="joiningDate"
                            value={formData.joiningDate}
                            onChange={handleInputChange}
                            required
                          />
                          <span className="input-icon-addon">
                            <i className="ti ti-calendar text-gray-7"></i>
                          </span>
                        </div>
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
                          onChange={handleInputChange}
                          required
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
                          onChange={handleInputChange}
                          required
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
                            onChange={handleInputChange}
                            required
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
                            onChange={handleInputChange}
                            required
                          />
                          <span className="ti toggle-passwords ti-eye-off"></span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone Number <span className="text-danger"> *</span></label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Company<span className="text-danger"> *</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          required
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
                          onChange={handleInputChange}
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
                          onChange={handleInputChange}
                        >
                          <option>Select</option>
                          <option>Finance</option>
                          <option>Developer</option>
                          <option>Executive</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">About <span className="text-danger"> *</span></label>
                        <textarea 
                          className="form-control" 
                          rows="3"
                          name="about"
                          value={formData.about}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-outline-light border me-2" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </Tab>
              
              <Tab eventKey="address" title="Permissions" className="nav-item">
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
                              onChange={() => {
                                const newState = Object.keys(permissions).some(module => !permissions[module].read);
                                const updatedPermissions = {};
                                Object.keys(permissions).forEach(module => {
                                  updatedPermissions[module] = {
                                    read: newState,
                                    write: newState,
                                    create: newState,
                                    delete: newState,
                                    import: newState,
                                    export: newState
                                  };
                                });
                                setPermissions(updatedPermissions);
                              }}
                            />
                            Enable all Module
                          </label>
                        </div>
                        <div className="form-check d-flex align-items-center">
                          <label className="form-check-label mt-0">
                            <input 
                              className="form-check-input" 
                              type="checkbox" 
                              checked={Object.values(permissions).every(module => 
                                module.read && module.write && module.create && 
                                module.delete && module.import && module.export
                              )}
                              onChange={() => {
                                const newState = !Object.values(permissions).every(module => 
                                  module.read && module.write && module.create && 
                                  module.delete && module.import && module.export
                                );
                                const updatedPermissions = {};
                                Object.keys(permissions).forEach(module => {
                                  updatedPermissions[module] = {
                                    read: newState,
                                    write: newState,
                                    create: newState,
                                    delete: newState,
                                    import: newState,
                                    export: newState
                                  };
                                });
                                setPermissions(updatedPermissions);
                              }}
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
                        {Object.entries(permissions).map(([module, perms]) => (
                          <tr key={module}>
                            <td>
                              <div className="form-check form-switch me-2">
                                <label className="form-check-label mt-0">
                                  <input 
                                    className="form-check-input me-2" 
                                    type="checkbox" 
                                    role="switch"
                                    checked={perms.read}
                                    onChange={() => toggleModule(module)}
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
                                    checked={perms.read}
                                    onChange={() => handlePermissionChange(module, 'read')}
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
                                    checked={perms.write}
                                    onChange={() => handlePermissionChange(module, 'write')}
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
                                    checked={perms.create}
                                    onChange={() => handlePermissionChange(module, 'create')}
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
                                    checked={perms.delete}
                                    onChange={() => handlePermissionChange(module, 'delete')}
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
                                    checked={perms.import}
                                    onChange={() => handlePermissionChange(module, 'import')}
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
                                    checked={perms.export}
                                    onChange={() => handlePermissionChange(module, 'export')}
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
                  <button type="button" className="btn btn-outline-light border me-2" onClick={handleClose}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddNewCandidate;