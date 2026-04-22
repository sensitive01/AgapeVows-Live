import React, { useState } from 'react';

const AddNoteModal = ({ 
    show, 
    onClose, 
    onSubmit, 
    isUpdating,
    selectedStatus,
    onStatusChange,
    statusOptions,
    getStatusBadgeClass
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
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
        if (!formData.title.trim() || !formData.description.trim()) return;
        onSubmit(formData);
    };

    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Update Status & Add Notes</h4>
                        <button 
                            type="button" 
                            className="btn-close custom-btn-close" 
                            onClick={onClose}
                            aria-label="Close"
                            disabled={isUpdating}
                        >
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Status*</label>
                                        <select
                                            className={`form-select form-control bg-${getStatusBadgeClass(selectedStatus).replace('bg-', '')}-transparent`}
                                            value={selectedStatus}
                                            onChange={(e) => onStatusChange(e.target.value)}
                                            disabled={isUpdating}
                                            required
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="mb-3">
                                        <label className="form-label">Note Title*</label>
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            disabled={isUpdating}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="mb-0 summer-description-box notes-summernote">
                                        <label className="form-label">Description*</label>
                                        <textarea
                                            className="form-control"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows="4"
                                            required
                                            disabled={isUpdating}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-light me-2" 
                                onClick={onClose}
                                disabled={isUpdating}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isUpdating || !formData.title.trim() || !formData.description.trim()}
                            >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNoteModal;