import React, { useState } from 'react';

const LeaveModal = ({ show, onClose }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        leaveType: '',
        fromDate: '',
        toDate: '',
        days: '',
        reason: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (!show) return null;

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Add Leave Request</h4>
                        <button type="button" className="btn-close custom-btn-close" onClick={onClose} aria-label="Close">
                            <i className="ti ti-x"></i>
                        </button>
                    </div>
                    <form>
                        <div className="modal-body pb-0">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Employee Name</label>
                                        <select className="select" name="employeeName" value={formData.employeeName} onChange={handleChange}>
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
                                        <select className="select" name="leaveType" value={formData.leaveType} onChange={handleChange}>
                                            <option>Select</option>
                                            <option>Medical Leave</option>
                                            <option>Casual Leave</option>
                                            <option>Annual Leave</option>
                                        </select>
                                    </div>    
                                </div>
                                <div className="col-md-6">
                                    <DateInput 
                                        label="From" 
                                        name="fromDate"
                                        value={formData.fromDate}
                                        onChange={(value) => setFormData({...formData, fromDate: value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <DateInput 
                                        label="To" 
                                        name="toDate"
                                        value={formData.toDate}
                                        onChange={(value) => setFormData({...formData, toDate: value})}
                                    />
                                </div>   
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">No of Days</label>
                                        <input type="text" className="form-control" name="days" value={formData.days} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Remaining Days</label>
                                        <input type="text" className="form-control" value="4" disabled />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <label className="form-label">Reason</label>
                                        <textarea className="form-control" rows="3" name="reason" value={formData.reason} onChange={handleChange}></textarea>
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

const DateInput = ({ label, value, onChange }) => {
    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <div className="input-icon-end position-relative">
                <input 
                    type="text" 
                    className="form-control datetimepicker" 
                    placeholder="dd/mm/yyyy" 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
                <span className="input-icon-addon">
                    <i className="ti ti-calendar text-gray-7"></i>
                </span>
            </div>
        </div>
    );
};

export default LeaveModal;