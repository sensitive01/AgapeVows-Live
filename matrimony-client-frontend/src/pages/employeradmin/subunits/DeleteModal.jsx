import React from 'react';

const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div className="modal-content">
          <div className="modal-body text-center">
            <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
              <i className="ti ti-trash text-danger-x fs-36"></i>
            </span>
            <h4 className="mb-1">Confirm Deletion</h4>
            <p className="mb-3">You want to delete all the marked items, this can't be undone once you delete.</p>
            <div className="d-flex justify-content-center">
              <button 
                className="btn btn-light me-3" 
                onClick={onClose}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={onConfirm}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;