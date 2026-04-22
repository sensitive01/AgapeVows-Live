import React, { useState } from 'react';

const EditCandidateModal = ({ show, onClose }) => {
    const [activeTab, setActiveTab] = useState('basic-info2');
    const [formData, setFormData] = useState({
        firstName: 'Anthony',
        lastName: 'Lewis',
        candidateId: 'EMP-0024',
        joiningDate: '17-10-2022',
        username: 'Anthony',
        email: 'anthony@example.com',
        password: '',
        confirmPassword: '',
        phoneNumber: '(123) 4567 890',
        company: 'Abac Company',
        department: 'Finance',
        designation: 'Finance',
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
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center">
                            <h4 className="modal-title me-2">Edit Candidate</h4>
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
                            <ul className="nav nav-underline" id="myTab2" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button 
                                        className={`nav-link ${activeTab === 'basic-info2' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('basic-info2')}
                                        type="button"
                                        id="info-tab2"
                                        data-bs-toggle="tab"
                                        data-bs-target="#basic-info2"
                                    >
                                        Basic Information
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent2">
                            {activeTab === 'basic-info2' && (
                                <div className="tab-pane fade show active" id="basic-info2" role="tabpanel" aria-labelledby="info-tab2" tabIndex="0">
                                    <div className="modal-body pb-0">    
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">                                                
                                                    <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                                                        <img src="assets/img/users/user-13.jpg" alt="img" className="rounded-circle" />
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
                                                        value={formData.firstName}
                                                        onChange={(e) => handleInputChange({ target: { name: 'firstName', value: e.target.value }})}
                                                    />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={formData.lastName}
                                                        onChange={(e) => handleInputChange({ target: { name: 'lastName', value: e.target.value }})}
                                                    />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Candidate ID <span className="text-danger"> *</span></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={formData.candidateId}
                                                        onChange={(e) => handleInputChange({ target: { name: 'candidateId', value: e.target.value }})}
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
                                                            value={formData.joiningDate}
                                                            onChange={(e) => handleInputChange({ target: { name: 'joiningDate', value: e.target.value }})}
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
                                                        value={formData.username}
                                                        onChange={(e) => handleInputChange({ target: { name: 'username', value: e.target.value }})}
                                                    />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email <span className="text-danger"> *</span></label>
                                                    <input 
                                                        type="email" 
                                                        className="form-control" 
                                                        value={formData.email}
                                                        onChange={(e) => handleInputChange({ target: { name: 'email', value: e.target.value }})}
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
                                                            value={formData.password}
                                                            onChange={(e) => handleInputChange({ target: { name: 'password', value: e.target.value }})}
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
                                                            value={formData.confirmPassword}
                                                            onChange={(e) => handleInputChange({ target: { name: 'confirmPassword', value: e.target.value }})}
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
                                                        value={formData.phoneNumber}
                                                        onChange={(e) => handleInputChange({ target: { name: 'phoneNumber', value: e.target.value }})}
                                                    />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Company<span className="text-danger"> *</span></label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        value={formData.company}
                                                        onChange={(e) => handleInputChange({ target: { name: 'company', value: e.target.value }})}
                                                    />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Department</label>
                                                    <select 
                                                        className="form-select"
                                                        value={formData.department}
                                                        onChange={(e) => handleInputChange({ target: { name: 'department', value: e.target.value }})}
                                                    >
                                                        <option>Select</option>
                                                        <option>All Department</option>
                                                        <option selected={formData.department === 'Finance'}>Finance</option>
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
                                                        value={formData.designation}
                                                        onChange={(e) => handleInputChange({ target: { name: 'designation', value: e.target.value }})}
                                                    >
                                                        <option>Select</option>
                                                        <option selected={formData.designation === 'Finance'}>Finance</option>
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
                                                        value={formData.about}
                                                        onChange={(e) => handleInputChange({ target: { name: 'about', value: e.target.value }})}
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
    );
};

export default EditCandidateModal;