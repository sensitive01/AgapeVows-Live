import React, { useState } from 'react';

const UpgradePackageModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    planName: '',
    planType: '',
    amount: '',
    paymentDate: '',
    nextPaymentDate: '',
    expiringDate: ''
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
    console.log('Form submitted:', formData);
    // Handle form submission logic here
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Upgrade Package</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
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
                    <p className="fs-12 mb-0">Unit Name</p>
                    <p className="text-gray-9">School Unit Name</p>
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

          <form onSubmit={handleSubmit}>
            <div className="modal-body pb-0">
              <h5 className="mb-4">Change Plan</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Name <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="planName"
                      value={formData.planName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Basic">Basic</option>
                      <option value="Enterprise">Enterprise</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Plan Type <span className="text-danger">*</span></label>
                    <select
                      className="form-select"
                      name="planType"
                      value={formData.planType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Amount<span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Payment Date <span className="text-danger">*</span></label>
                    <div className="input-icon-end position-relative">
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="dd/mm/yyyy"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleChange}
                        required
                      />
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
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="dd/mm/yyyy"
                        name="nextPaymentDate"
                        value={formData.nextPaymentDate}
                        onChange={handleChange}
                        required
                      />
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
                      <input
                        type="text"
                        className="form-control datetimepicker"
                        placeholder="dd/mm/yyyy"
                        name="expiringDate"
                        value={formData.expiringDate}
                        onChange={handleChange}
                        required
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpgradePackageModal;