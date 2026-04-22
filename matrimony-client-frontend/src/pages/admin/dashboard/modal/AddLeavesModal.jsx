import React, { useState } from 'react';

const AddLeavesModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    leaveType: '',
    fromDate: '',
    toDate: '',
    noOfDays: '',
    remainingDays: '4',
    reason: ''
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
    // Handle form submission here
    console.log(formData);
    onClose();
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered modal-md">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Leave Request</h4>
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
                    <label className="form-label">Employee Name</label>
                    <select
                      className="form-select"
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option>Anthony Lewis</option>
                      <option>Brian Villalobos</option>
                      <option>Harvey Smith</option>
                    </select>
                  </div>	
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Leave Type</label>
                    <select
                      className="form-select"
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handleChange}
                    >
                      <option>Select</option>
                      <option>Medical Leave</option>
                      <option>Casual Leave</option>
                      <option>Annual Leave</option>
                    </select>
                  </div>	
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">From</label>
                    <div className="input-icon-end position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="dd/mm/yyyy"
                        name="fromDate"
                        value={formData.fromDate}
                        onChange={handleChange}
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">To</label>
                    <div className="input-icon-end position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="dd/mm/yyyy"
                        name="toDate"
                        value={formData.toDate}
                        onChange={handleChange}
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>   
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">No of Days</label>
                    <input
                      type="text"
                      className="form-control"
                      name="noOfDays"
                      value={formData.noOfDays}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Remaining Days</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.remainingDays}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Reason</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLeavesModal;