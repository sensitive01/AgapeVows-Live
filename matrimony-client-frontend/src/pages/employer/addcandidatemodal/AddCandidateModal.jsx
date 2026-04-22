import React, { useState } from 'react';

const AddCandidateModal = ({ show, onClose }) => {
    const [activeTab, setActiveTab] = useState('basic-info');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        candidateId: '',
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
        holidays: { enabled: true, read: true, write: false, create: false, delete: true, import: false, export: false },
        leaves: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        clients: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        projects: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        tasks: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        chats: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        assets: { enabled: true, read: false, write: false, create: true, delete: false, import: true, export: false },
        timingSheets: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false }
    });
    const [selectAll, setSelectAll] = useState(false);
    const [enableAllModules, setEnableAllModules] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePermissionChange = (module, field, value) => {
        setPermissions(prev => ({
            ...prev,
            [module]: {
                ...prev[module],
                [field]: value
            }
        }));
    };

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        
        const updatedPermissions = { ...permissions };
        for (const module in updatedPermissions) {
            for (const field in updatedPermissions[module]) {
                if (field !== 'enabled') {
                    updatedPermissions[module][field] = newSelectAll;
                }
            }
        }
        setPermissions(updatedPermissions);
    };

    const toggleEnableAllModules = () => {
        const newEnableAll = !enableAllModules;
        setEnableAllModules(newEnableAll);
        
        const updatedPermissions = { ...permissions };
        for (const module in updatedPermissions) {
            updatedPermissions[module].enabled = newEnableAll;
        }
        setPermissions(updatedPermissions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData, permissions);
        setShowSuccessModal(true);
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        onClose();
    };

    if (!show && !showSuccessModal) return null;

    return (
        <>
            {/* Main Add Candidate Modal */}
            {show && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <div className="d-flex align-items-center">
                                    <h4 className="modal-title me-2">Add New Candidate</h4>
                                    <span>Candidate ID : EMP -0024</span>
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
                                                onClick={() => setActiveTab('basic-info')}
                                                type="button"
                                            >
                                                Basic Information
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
                                                                onChange={handleInputChange}
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
                                                            />
                                                        </div>                                    
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Joining Date <span className="text-danger"> *</span></label>
                                                            <div className="input-icon-end position-relative">
                                                                <input 
                                                                    type="text" 
                                                                    className="form-control datetimepicker" 
                                                                    placeholder="dd/mm/yyyy"
                                                                    name="joiningDate"
                                                                    value={formData.joiningDate}
                                                                    onChange={handleInputChange}
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
                                                                />
                                                                <span className="ti toggle-passwords ti-eye-off"></span>
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
                                                                onChange={handleInputChange}
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
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-outline-light border me-2" onClick={onClose}>Cancel</button>
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="text-center p-3">
                                    <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                                        <i className="ti ti-check fs-24"></i>
                                    </span>
                                    <h5 className="mb-2">Candidate Added Successfully</h5>
                                    <p className="mb-3">
                                        {`${formData.firstName} ${formData.lastName}`} has been added with Client ID: 
                                        <span className="text-primary">#EMP-{formData.candidateId.padStart(4, '0')}</span>
                                    </p>
                                    <div>
                                        <div className="row g-2">
                                            <div className="col-6">
                                                <button className="btn btn-dark w-100" onClick={handleSuccessModalClose}>
                                                    Back to List
                                                </button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-primary w-100">
                                                    Detail Page
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddCandidateModal;