import React, { useState } from 'react';

const TeacherModal = ({ show, onClose }) => {
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
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setCurrentStep(2);
    const handlePrev = () => setCurrentStep(1);

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header header-border align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                            <h5 className="modal-title me-2">Add Teacher</h5>
                            <p className="text-dark">Employee ID : CAN-0004</p>
                        </div>
                        <button type="button" className="btn-close custom-btn-close" onClick={onClose} aria-label="Close">
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <div className="add-info-fieldset">
                        <div className="add-details-wizard p-3 pb-0">
                            <ul className="progress-bar-wizard d-flex align-items-center border-bottom">
                                <li 
                                    className={currentStep === 1 ? "active p-2 pt-0" : "p-2 pt-0"} 
                                    onClick={() => setCurrentStep(1)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h6 className="fw-medium">Basic Information</h6>
                                </li>
                                <li 
                                    className={currentStep === 2 ? "active p-2 pt-0" : "p-2 pt-0"} 
                                    onClick={() => setCurrentStep(2)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <h6 className="fw-medium">Department</h6>
                                </li>
                            </ul>
                        </div>
                        
                        {currentStep === 1 && (
                            <fieldset id="first-field-file">
                                <form>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <ProfileUploadSection />
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Username</label>
                                                    <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Department</label>
                                                    <select className="select" name="department" value={formData.department} onChange={handleChange}>
                                                        <option>Select</option>
                                                        <option>Mathematics</option>
                                                        <option>Science</option>
                                                        <option>Physical Trainer</option>
                                                        <option>Language</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Department Head</label>
                                                    <select className="select" name="departmentHead" value={formData.departmentHead} onChange={handleChange}>
                                                        <option>Select</option>
                                                        <option>Anthony Lewis</option>
                                                        <option>Brian Villalobos</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <DateInput 
                                                            label="Start Date" 
                                                            value={formData.startDate} 
                                                            onChange={(value) => setFormData({...formData, startDate: value})}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <DateInput 
                                                            label="Expiry Date" 
                                                            value={formData.expiryDate} 
                                                            onChange={(value) => setFormData({...formData, expiryDate: value})}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Designation</label>
                                                            <select className="select" name="designation" value={formData.designation} onChange={handleChange}>
                                                                <option>Select</option>
                                                                <option>Admin</option>
                                                                <option>Teacher</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="mb-3">
                                                            <label className="form-label">Password</label>
                                                            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>
                                    <div className="modal-footer">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <button type="button" className="btn btn-outline-light border me-2" onClick={onClose}>Cancel</button>
                                            <button className="btn btn-primary wizard-next-btn" type="button" onClick={handleNext}>Next</button>
                                        </div>
                                    </div>
                                </form>
                            </fieldset>
                        )}
                        
                        {currentStep === 2 && (
                            <fieldset>
                                <form>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label me-2">Department Staffs</label>
                                                    <TagsInput 
                                                        tags={formData.departmentStaffs} 
                                                        onChange={(tags) => setFormData({...formData, departmentStaffs: tags})}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label me-2">Department Head</label>
                                                    <TagsInput 
                                                        tags={formData.departmentHeads} 
                                                        onChange={(tags) => setFormData({...formData, departmentHeads: tags})}
                                                    />
                                                </div>
                                            </div>
                                        </div>                                
                                    </div>
                                    <div className="modal-footer">
                                        <div className="d-flex align-items-center justify-content-end">
                                            <button type="button" className="btn btn-outline-light border me-2" onClick={handlePrev}>Back</button>
                                            <button className="btn btn-primary" type="button" onClick={onClose}>Submit</button>
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


const ProfileUploadSection = () => {
    return (
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
                    <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
                </div>
            </div>
        </div>
    );
};

const DateInput = ({ label, value, onChange }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <div className="input-icon-end position-relative">
                <input 
                    type="text" 
                    className="form-control datetimepicker" 
                    placeholder="dd/mm/yyyy" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <span className="input-icon-addon">
                    <i className="ti ti-calendar text-gray-7"></i>
                </span>
            </div>
        </div>
    );
};

const TagsInput = ({ tags, onChange }) => {
    const [inputValue, setInputValue] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && inputValue.trim()) {
            onChange([...tags, inputValue.trim()]);
            setInputValue('');
            e.preventDefault();
        }
    };

    const removeTag = (index) => {
        onChange(tags.filter((_, i) => i !== index));
    };

    return (
        <div className="tags-input-container">
            {tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                    <span className="tag-close" onClick={() => removeTag(index)}>×</span>
                </span>
            ))}
            <input
                type="text"
                className="form-control"
                placeholder="Add new"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default TeacherModal;