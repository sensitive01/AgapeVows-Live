import React, { useState } from 'react';

const AddTeacherModal = ({ show, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    department: '',
    departmentHead: '',
    startDate: '02-05-2024',
    expiryDate: '02-05-2024',
    designation: '',
    password: '********',
    departmentStaffs: ['Jerald', 'Andrew', 'Philip', 'Davis'],
    departmentHeads: ['Hendry', 'James']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value.split(',').map(item => item.trim())
    }));
  };

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header header-border align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h5 className="modal-title me-2">Add Teacher</h5>
              <p className="text-dark">Employee ID : CAN-0004</p>
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
          
          <div className="add-info-fieldset">
            <div className="add-details-wizard p-3 pb-0">
              <ul className="progress-bar-wizard d-flex align-items-center border-bottom">
                <li className={`p-2 pt-0 ${currentStep === 1 ? 'active' : ''}`}>
                  <h6 className="fw-medium">Basic Information</h6>
                </li>
                <li className={`p-2 pt-0 ${currentStep === 2 ? 'active' : ''}`}>
                  <h6 className="fw-medium">Department</h6>
                </li>
              </ul>
            </div>

            {currentStep === 1 && (
              <fieldset id="first-field-file">
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                            <i className="ti ti-photo text-gray-2 fs-16"></i>
                          </div>
                          <div className="profile-upload">
                            <div className="mb-2">
                              <h6 className="mb-1">Upload profile picture</h6>
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
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Username</label>
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
                          <label className="form-label">Department</label>
                          <select
                            className="form-select"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Science">Science</option>
                            <option value="Physical Trainer">Physical Trainer</option>
                            <option value="Language">Language</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Department Head</label>
                          <select
                            className="form-select"
                            name="departmentHead"
                            value={formData.departmentHead}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="Anthony Lewis">Anthony Lewis</option>
                            <option value="Brian Villalobos">Brian Villalobos</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Start Date</label>
                              <div className="input-icon-end position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="dd/mm/yyyy"
                                  name="startDate"
                                  value={formData.startDate}
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
                              <label className="form-label">Expiry Date</label>
                              <div className="input-icon-end position-relative">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="dd/mm/yyyy"
                                  name="expiryDate"
                                  value={formData.expiryDate}
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
                              <label className="form-label">Designation</label>
                              <select
                                className="form-select"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                              >
                                <option value="">Select</option>
                                <option value="Admin">Admin</option>
                                <option value="Teacher">Teacher</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="mb-3">
                              <label className="form-label">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="d-flex align-items-center justify-content-end">
                      <button type="button" className="btn btn-outline-light border me-2" onClick={onClose}>Cancel</button>
                      <button type="button" className="btn btn-primary wizard-next-btn" onClick={handleNext}>Next</button>
                    </div>
                  </div>
                </form>
              </fieldset>
            )}

            {currentStep === 2 && (
              <fieldset>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label me-2">Department Staffs</label>
                          <input
                            className="form-control"
                            placeholder="Add new (comma separated)"
                            type="text"
                            value={formData.departmentStaffs.join(', ')}
                            onChange={(e) => handleArrayChange('departmentStaffs', e.target.value)}
                          />
                          <div className="mt-2">
                            {formData.departmentStaffs.map((staff, index) => (
                              <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                {staff}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label me-2">Department Heads</label>
                          <input
                            className="form-control"
                            placeholder="Add new (comma separated)"
                            type="text"
                            value={formData.departmentHeads.join(', ')}
                            onChange={(e) => handleArrayChange('departmentHeads', e.target.value)}
                          />
                          <div className="mt-2">
                            {formData.departmentHeads.map((head, index) => (
                              <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                {head}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div className="d-flex align-items-center justify-content-between">
                      <button type="button" className="btn btn-outline-light border" onClick={handleBack}>Back</button>
                      <div>
                        <button type="button" className="btn btn-outline-light border me-2" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </fieldset>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeacherModal;