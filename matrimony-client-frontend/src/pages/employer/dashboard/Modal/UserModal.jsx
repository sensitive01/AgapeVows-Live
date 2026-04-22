import React, { useState } from 'react';

const UserModal = ({ show, onClose }) => {
    const [activeTab, setActiveTab] = useState('basic-info');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        employeeId: '',
        joiningDate: '',
        phone: '',
        school: '',
        department: '',
        designation: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        about: ''
    });

    const [permissions, setPermissions] = useState({
        holidays: { enabled: true, read: true, write: false, create: false, delete: true, import: false, export: false },
        leaves: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        students: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        subjects: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        tasks: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        chats: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false },
        library: { enabled: true, read: false, write: false, create: true, delete: false, import: true, export: false },
        timingSheets: { enabled: false, read: false, write: false, create: false, delete: false, import: false, export: false }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const togglePermission = (module, field) => {
        if (field === 'enabled') {
            setPermissions(prev => ({
                ...prev,
                [module]: { ...prev[module], enabled: !prev[module].enabled }
            }));
        } else {
            setPermissions(prev => ({
                ...prev,
                [module]: { ...prev[module], [field]: !prev[module][field] }
            }));
        }
    };

    const toggleAllPermissions = (enabled) => {
        const newPermissions = {};
        Object.keys(permissions).forEach(module => {
            newPermissions[module] = {
                ...permissions[module],
                enabled,
                read: enabled,
                write: enabled,
                create: enabled,
                delete: enabled,
                import: enabled,
                export: enabled
            };
        });
        setPermissions(newPermissions);
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="d-flex align-items-center">
                            <h4 className="modal-title me-2"><i className="fa fa-graduation-cap text-primary"></i> Add New User</h4>
                        </div>
                        <button type="button" className="btn-close custom-btn-close" onClick={onClose} aria-label="Close">
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <form>
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
                                <li className="nav-item" role="presentation">
                                    <button 
                                        className={`nav-link ${activeTab === 'permissions' ? 'active' : ''}`} 
                                        onClick={() => setActiveTab('permissions')}
                                        type="button"
                                    >
                                        Permissions
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            {activeTab === 'basic-info' && (
                                <div className="tab-pane fade show active" id="basic-info" role="tabpanel" aria-labelledby="info-tab" tabIndex="0">
                                    <div className="modal-body pb-0 ">    
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ProfileUploadSection />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">First Name <span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Employee ID <span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" name="employeeId" value={formData.employeeId} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <DateInput 
                                                    label="Joining Date" 
                                                    name="joiningDate"
                                                    value={formData.joiningDate}
                                                    onChange={(value) => setFormData({...formData, joiningDate: value})}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Phone Number <span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Posting School<span className="text-danger"> *</span></label>
                                                    <input type="text" className="form-control" name="school" value={formData.school} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Department</label>
                                                    <select className="select" name="department" value={formData.department} onChange={handleChange}>
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
                                                    <select className="select" name="designation" value={formData.designation} onChange={handleChange}>
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
                                                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Email <span className="text-danger"> *</span></label>
                                                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                                                </div>                                    
                                            </div>
                                            <div className="col-md-6">
                                                <PasswordInput 
                                                    label="Password" 
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <PasswordInput 
                                                    label="Confirm Password" 
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">About Teacher<span className="text-danger"> *</span></label>
                                                    <textarea className="form-control" rows="3" name="about" value={formData.about} onChange={handleChange}></textarea>
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
                                <div className="tab-pane fade" id="address" role="tabpanel" aria-labelledby="address-tab" tabIndex="0">
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
                                                            onChange={() => toggleAllPermissions(!Object.values(permissions).every(p => p.enabled))}
                                                        />
                                                            Enable all Module
                                                        </label>
                                                    </div>
                                                    <div className="form-check d-flex align-items-center">
                                                        <label className="form-check-label mt-0">
                                                            <input 
                                                                className="form-check-input" 
                                                                type="checkbox" 
                                                                checked={Object.values(permissions).every(p => 
                                                                    p.read && p.write && p.create && p.delete && p.import && p.export
                                                                )}
                                                                onChange={(e) => toggleAllPermissions(e.target.checked)}
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
                                                                        checked={perms.enabled}
                                                                        onChange={() => togglePermission(module, 'enabled')}
                                                                    />
                                                                        {module.charAt(0).toUpperCase() + module.slice(1)}
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
                                                                            onChange={() => togglePermission(module, 'read')}
                                                                            disabled={!perms.enabled}
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
                                                                            onChange={() => togglePermission(module, 'write')}
                                                                            disabled={!perms.enabled}
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
                                                                            onChange={() => togglePermission(module, 'create')}
                                                                            disabled={!perms.enabled}
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
                                                                            onChange={() => togglePermission(module, 'delete')}
                                                                            disabled={!perms.enabled}
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
                                                                            onChange={() => togglePermission(module, 'import')}
                                                                            disabled={!perms.enabled}
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
                                                                            onChange={() => togglePermission(module, 'export')}
                                                                            disabled={!perms.enabled}
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
                                        <button type="button" className="btn btn-primary" onClick={onClose}>Save</button>
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

const ProfileUploadSection = () => {
    return (
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
    );
};

const DateInput = ({ label, value, onChange, required = false }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label} {required && <span className="text-danger">*</span>}</label>
            <div className="input-icon-end position-relative">
                <input 
                    type="text" 
                    className="form-control datetimepicker" 
                    placeholder="dd/mm/yyyy" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                />
                <span className="input-icon-addon">
                    <i className="ti ti-calendar text-gray-7"></i>
                </span>
            </div>
        </div>
    );
};

const PasswordInput = ({ label, value, onChange, required = false }) => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className="mb-3">
            <label className="form-label">{label} {required && <span className="text-danger">*</span>}</label>
            <div className="pass-group">
                <input 
                    type={showPassword ? "text" : "password"} 
                    className="pass-input form-control" 
                    value={value}
                    onChange={onChange}
                    required={required}
                />
                <span 
                    className={`ti toggle-password ${showPassword ? 'ti-eye' : 'ti-eye-off'}`}
                    onClick={() => setShowPassword(!showPassword)}
                ></span>
            </div>
        </div>
    );
};

export default UserModal;