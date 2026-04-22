import React from 'react';

const UnitUpgradeModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div 
      className="modal fade show" 
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Upgrade Package</h4>
            <button 
              type="button" 
              className="btn-close custom-btn-close" 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              aria-label="Close"
            >
              <i className="ti ti-x"></i>
            </button>
          </div>
          
          <div className="p-3 mb-1">
            <div className="rounded bg-light p-3">                                                
              <h5 className="mb-3">Current Plan Details</h5>                                              
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">School Name</p>
                    <p className="text-gray-9">BrightWave Innovations</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Plan Name</p>
                    <p className="text-gray-9">Advanced</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Plan Type</p>
                    <p className="text-gray-9">Monthly</p>
                  </div>
                </div>
              </div>
              
              <div className="row align-items-center">
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Price</p>
                    <p className="text-gray-9">200</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Register Date</p>
                    <p className="text-gray-9">12 Sep 2024</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="fs-12 mb-0">Expiring On</p>
                    <p className="text-gray-9">11 Oct 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="modal-body pb-0">
              <h5 className="mb-4">Change Plan</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Name <span className="text-danger">*</span></label>
                    <select className="select form-control">
                      <option>Select</option>
                      <option>Advanced</option>
                      <option>Basic</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Type <span className="text-danger">*</span></label>
                    <select className="select form-control">
                      <option>Select</option>
                      <option>Monthly</option>
                      <option>Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Amount<span className="text-danger">*</span></label>
                    <input type="text" className="form-control" />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Payment Date <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Next Payment Date <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Expiring On <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-light me-2" 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UnitUpgradeModal;