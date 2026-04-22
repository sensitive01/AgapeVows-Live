import React, { useState } from 'react';

const EditAccessModal = ({ show, onClose, onAddStage }) => {
    const [formData, setFormData] = useState({
        accessName: 'Marketing',
        accessType: 'all',
        selectedPeople: []
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
                        <h4 className="modal-title">Edit Access</h4>
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
                                    <div className="mb-3">
                                        <label className="form-label">Access Name <span className="text-danger"> *</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            name="accessName"
                                            value={formData.accessName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="input-block mb-3">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label className="form-label">Access Stages <span className="text-danger"> *</span></label>
                                            <button
                                                type="button"
                                                className="add-new text-primary"
                                                onClick={onAddStage}
                                            >
                                                <i className="ti ti-plus text-primary me-1"></i>Add New
                                            </button>
                                        </div>
                                        <div className="p-3 border border-gray br-5 mb-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2"><i className="ti ti-grip-vertical"></i></span>
                                                    <h6 className="fs-14 fw-normal">Inpipline</h6>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        type="button"
                                                        className="text-default me-2"
                                                        onClick={() => {
                                                            // Handle edit stage
                                                        }}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button type="button" className="text-default">
                                                        <i className="ti ti-trash text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 border border-gray br-5 mb-2">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2"><i className="ti ti-grip-vertical"></i></span>
                                                    <h6 className="fs-14 fw-normal">Follow Up</h6>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        type="button"
                                                        className="text-default me-2"
                                                        onClick={() => {
                                                            // Handle edit stage
                                                        }}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button type="button" className="text-default">
                                                        <i className="ti ti-trash text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 border border-gray br-5">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2"><i className="ti ti-grip-vertical"></i></span>
                                                    <h6 className="fs-14 fw-normal">Schedule Service</h6>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <button
                                                        type="button"
                                                        className="text-default me-2"
                                                        onClick={() => {
                                                            // Handle edit stage
                                                        }}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button type="button" className="text-default">
                                                        <i className="ti ti-trash text-danger"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Access</label>
                                        <div className="d-flex access-item nav">
                                            <div className="d-flex align-items-center">
                                                <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#all2">
                                                    <input 
                                                        type="radio" 
                                                        className="status-radio me-2" 
                                                        id="all2" 
                                                        name="accessType" 
                                                        value="all"
                                                        checked={formData.accessType === 'all'}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="all2">All</label>
                                                </div>
                                                <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#select-person2">
                                                    <input 
                                                        type="radio" 
                                                        className="status-radio me-2" 
                                                        id="select2" 
                                                        name="accessType" 
                                                        value="select-person"
                                                        checked={formData.accessType === 'select-person'}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="select2">Select Person</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-content">
                                            <div className={`tab-pane fade ${formData.accessType === 'select-person' ? 'show active' : ''}`} id="select-person2">
                                                <div className="access-wrapper">
                                                    <div className="p-3 border border-gray br-5 mb-2">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                    <img src="assets/img/profiles/avatar-20.jpg" className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a href="#">Sharon Roy</a></h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <a href="#" className="text-danger">Remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-3 border border-gray br-5 mb-2">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="d-flex align-items-center file-name-icon">
                                                                <a href="#" className="avatar avatar-md border avatar-rounded">
                                                                    <img src="assets/img/profiles/avatar-21.jpg" className="img-fluid" alt="img" />
                                                                </a>
                                                                <div className="ms-2">
                                                                    <h6 className="fw-medium"><a href="#">Sharon Roy</a></h6>
                                                                </div>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <a href="#" className="text-danger">Remove</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditAccessModal;