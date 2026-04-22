import React, { useState, useEffect } from 'react';

const EditStageModal = ({ 
  show, 
  onClose, 
  onSave, 
  initialStageName = "Inpipeline" 
}) => {
  const [stageName, setStageName] = useState(initialStageName);
  const [isFormValid, setIsFormValid] = useState(false);

  // Reset form when initialStageName changes
  useEffect(() => {
    setStageName(initialStageName);
  }, [initialStageName]);

  // Validate form
  useEffect(() => {
    setIsFormValid(stageName.trim().length > 0);
  }, [stageName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    onSave(stageName);
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Stage</h4>
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
                    <label className="form-label">
                      Edit Name <span className="text-danger">*</span>
                    </label>
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
              <button 
                type="button" 
                className="btn btn-light me-2" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!isFormValid}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStageModal;