import React, { useState } from 'react';

const AddUserModal = ({ show, onClose, onAddPositions }) => {
    const [activeTab, setActiveTab] = useState('basic-info');
    const [formData, setFormData] = useState({
        // Basic Info
        firstName: '',
        lastName: '',
        jobTitle: '',
        unitName: '',
        email: '',
        phoneNumber: '',
        phoneNumber2: '',
        fax: '',
        positions: '',
        dateOfBirth: '',
        ratings: '',
        owner: '',
        industry: '',
        currency: '',
        language: '',
        tags: '',
        source: '',
        // Address
        address: '',
        country: '',
        state: '',
        city: '',
        zipcode: '',
        // Social Profiles
        facebook: '',
        twitter: '',
        linkedin: '',
        skype: '',
        whatsapp: '',
        instagram: '',
        // Access
        visibility: 'public',
        status: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add New User</h4>
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
                            <ul className="nav nav-underline" id="myTab1" role="tablist">
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
                                        className={`nav-link ${activeTab === 'address' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('address')}
                                        type="button"
                                    >
                                        Address
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'social-profile' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('social-profile')}
                                        type="button"
                                    >
                                        Social Profile
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link ${activeTab === 'access' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('access')}
                                        type="button"
                                    >
                                        Access
                                    </button>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content" id="myTabContent1">
                            <div className={`tab-pane fade ${activeTab === 'basic-info' ? 'show active' : ''}`} id="basic-info1" role="tabpanel" aria-labelledby="info-tab1" tabIndex="0">
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
                                        <div className="col-md-4">
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
                                        <div className="col-md-4">
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
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Job Title <span className="text-danger"> *</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="jobTitle"
                                                    value={formData.jobTitle}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Unit Name <span className="text-danger"> *</span></label>
                                                <select 
                                                    className="form-select"
                                                    name="unitName"
                                                    value={formData.unitName}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option>School Unit Name</option>
                                                    <option>Stellar Dynamics</option>
                                                    <option>Quantum Nexus</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input 
                                                    type="email" 
                                                    className="form-control" 
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
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
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Phone Number 2<span className="text-danger"> *</span></label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="phoneNumber2"
                                                    value={formData.phoneNumber2}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Fax</label>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    name="fax"
                                                    value={formData.fax}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-block mb-3">
                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                    <label className="col-form-label p-0">Positions <span className="text-danger"> *</span></label>
                                                    <button
                                                        type="button"
                                                        className="add-new text-primary"
                                                        onClick={() => {
                                                            if (onAddPositions) {
                                                                onAddPositions();
                                                            }
                                                        }}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
                                                        <i className="ti ti-plus text-primary me-1"></i>Add New
                                                    </button>
                                                </div>
                                                <select 
                                                    className="form-select"
                                                    name="positions"
                                                    value={formData.positions}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option>Collins</option>
                                                    <option>Konopelski</option>
                                                    <option>Adams</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Date of Birth <span className="text-danger"> *</span> </label>
                                                <div className="input-icon-end position-relative">
                                                    <input 
                                                        type="text" 
                                                        className="form-control datetimepicker" 
                                                        placeholder="dd/mm/yyyy" 
                                                        name="dateOfBirth"
                                                        value={formData.dateOfBirth}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="ti ti-calendar text-gray-7"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Ratings <span className="text-danger"> *</span></label>
                                                <div className="input-icon-end position-relative">
                                                    <input 
                                                        type="text" 
                                                        className="form-control" 
                                                        name="ratings"
                                                        value={formData.ratings}
                                                        onChange={handleChange}
                                                    />
                                                    <span className="input-icon-addon">
                                                        <i className="ti ti-star text-gray-6"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Owner  <span className="text-danger"> *</span></label>
                                                <select 
                                                    className="form-select"
                                                    name="owner"
                                                    value={formData.owner}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option>Hendry Milner</option>
                                                    <option>Guilory Berggren</option>
                                                    <option>Jami Carlile</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label className="form-label">Industry <span className="text-danger"> *</span></label>
                                                <select 
                                                    className="form-select"
                                                    name="industry"
                                                    value={formData.industry}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option>Retail Industry</option>
                                                    <option>Banking</option>
                                                    <option>Hotels</option>
                                                    <option>Financial Services</option>
                                                    <option>Insurance</option>
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
                                                >
                                                    <option value="">Select</option>
                                                    <option>English</option>
                                                    <option>Arabic</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Tags <span className="text-danger"> *</span> </label>
                                                <input 
                                                    className="form-control" 
                                                    placeholder="Add new" 
                                                    type="text" 
                                                    name="tags" 
                                                    value={formData.tags}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Source <span className="text-danger"> *</span> </label>
                                                <select 
                                                    className="form-select"
                                                    name="source"
                                                    value={formData.source}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select</option>
                                                    <option>Phone Calls</option>
                                                    <option>Social Media</option>
                                                    <option>Refferal Sites</option>
                                                    <option>Web Analytics</option>
                                                    <option>Previous Purchase</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                            {/* Address Tab */}
                            <div className={`tab-pane fade ${activeTab === 'address' ? 'show active' : ''}`} id="address1" role="tabpanel" aria-labelledby="address-tab1" tabIndex="0">
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Address <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Country <span className="text-danger"> *</span></label>
                                                <select
                                                    className="form-select"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option>USA</option>
                                                    <option>Canada</option>
                                                    <option>Germany</option>
                                                    <option>France</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">State <span className="text-danger"> *</span></label>
                                                <select
                                                    className="form-select"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option>California</option>
                                                    <option>New York</option>
                                                    <option>Texas</option>
                                                    <option>Florida</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">City <span className="text-danger"> *</span></label>
                                                <select
                                                    className="form-select"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    required
                                                >
                                                    <option value="">Select</option>
                                                    <option>Los Angeles</option>
                                                    <option>San Diego</option>
                                                    <option>Fresno</option>
                                                    <option>San Francisco</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Zipcode <span className="text-danger">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="zipcode"
                                                    value={formData.zipcode}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>

                            {/* Social Profiles Tab */}
                            <div className={`tab-pane fade ${activeTab === 'social-profile' ? 'show active' : ''}`} id="social-profile1" role="tabpanel" aria-labelledby="social-profile-tab1" tabIndex="0">
                                <div className="modal-body pb-0">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Facebook</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="facebook"
                                                    value={formData.facebook}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Twitter</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="twitter"
                                                    value={formData.twitter}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">LinkedIn</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="linkedin"
                                                    value={formData.linkedin}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Skype</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="skype"
                                                    value={formData.skype}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Whatsapp</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    name="whatsapp"
                                                    value={formData.whatsapp}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Instagram</label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name="instagram"
                                                    value={formData.instagram}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>

                            {/* Access Tab */}
                            <div className={`tab-pane fade ${activeTab === 'access' ? 'show active' : ''}`} id="access1" role="tabpanel" aria-labelledby="access-tab1" tabIndex="0">
                                <div className="modal-body pb-0">
                                    <div className="mb-4">
                                        <h6 className="fs-14 fw-medium mb-1">Visibility</h6>
                                        <div className="d-flex align-items-center">
                                            <div className="form-check me-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="visibility"
                                                    id="flexRadioDefault01"
                                                    value="public"
                                                    checked={formData.visibility === 'public'}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label text-dark" htmlFor="flexRadioDefault01">
                                                    Public
                                                </label>
                                            </div>
                                            <div className="form-check me-3">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="visibility"
                                                    id="flexRadioDefault02"
                                                    value="private"
                                                    checked={formData.visibility === 'private'}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label text-dark" htmlFor="flexRadioDefault02">
                                                    Private
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="visibility"
                                                    id="flexRadioDefault03"
                                                    value="select-people"
                                                    checked={formData.visibility === 'select-people'}
                                                    onChange={handleChange}
                                                />
                                                <label className="form-check-label text-dark" htmlFor="flexRadioDefault03">
                                                    Select People
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {formData.visibility === 'select-people' && (
                                        <div className="p-3 bg-gray br-5 mb-4">
                                            <div className="d-flex align-items-center mb-3">
                                                <input className="form-check-input me-1" type="checkbox" id="user-06" />
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <a href="#" className="avatar avatar-md border avatar-rounded">
                                                        <img src="assets/img/reports/user-01.jpg" className="img-fluid" alt="img" />
                                                    </a>
                                                    <div className="ms-2">
                                                        <h6 className="fw-normal"><a href="#">Michael Walker</a></h6>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* More user checkboxes... */}
                                            <div className="d-flex align-items-center justify-content-center">
                                                <button type="button" className="btn btn-primary">Confirm</button>
                                            </div>
                                        </div>
                                    )}
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
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;