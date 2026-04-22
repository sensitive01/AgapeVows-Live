import React, { useState } from 'react';

const AddStageModal  = ({ show, onClose, onAddStage }) => {
    const [stageName, setStageName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!stageName.trim()) return; // Validate stage name is not empty
        
        onAddStage(stageName);
        setStageName(''); // Reset form
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add New Stage</h4>
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
                                        <label className="form-label">Stage Name <span className="text-danger">*</span></label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={stageName}
                                            onChange={(e) => setStageName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Add Stage</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddStageModal ;