import React, { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const AddAccessModal = ({ show, onClose, onAddStage, onEditStage }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        // Perform your delete action here
        console.log('Deleting:', itemToDelete);
        setShowDeleteModal(false);
        setItemToDelete(null);
    };
    if (!show) return null;

    return (
        <>
            <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Add New Access</h4>
                            <button
                                type="button"
                                className="btn-close custom-btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <i className="ti ti-x"></i>
                            </button>
                        </div>
                        <form>
                            <div class="modal-body pb-0">
                                <div class="row"></div>
                                <div className="col-md-12">
                                    <div class="mb-3">
                                        <label className="form-label">Access Name <span class="text-danger"> *</span></label>
                                        <input type="text" className="form-control" />
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
                                                  style={{border:'none', backgroundColor: 'white'}}
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
                                                        onClick={() => onEditStage('Inpipline')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-default"
                                                        onClick={() => handleDeleteClick('Inpipline')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
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
                                                        onClick={() => onEditStage('Follow Up')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-default"
                                                        onClick={() => handleDeleteClick('Follow Up')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
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
                                                        onClick={() => onEditStage('Schedule Service')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="text-default"
                                                        onClick={() => handleDeleteClick('Schedule Service')}
                                                          style={{border:'none', backgroundColor: 'white'}}
                                                    >
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
                                                <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#all">
                                                    <input type="radio" className="status-radio me-2" id="all" name="status" defaultChecked />
                                                    <label htmlFor="all">All</label>
                                                </div>
                                                <div className="radio-btn d-flex align-items-center" data-bs-toggle="tab" data-bs-target="#select-person">
                                                    <input type="radio" className="status-radio me-2" id="select" name="status" />
                                                    <label htmlFor="select">Select Person</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-content">
                                            <div className="tab-pane fade" id="select-person">
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
                            <div className="modal-footer">
                                <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Add Access</button>
                            </div>
                        </form>
                    </div >
                </div >
            </div >
            <DeleteConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Access Stage"
                message={`Are you sure you want to delete "${itemToDelete}"? This action cannot be undone.`}
            />
        </>
    );
};

export default AddAccessModal;