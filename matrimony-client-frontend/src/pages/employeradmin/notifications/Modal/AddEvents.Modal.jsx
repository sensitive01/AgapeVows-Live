import React, { useState } from 'react';

const AddEventsModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    eventName: '',
    pipeline: '',
    status: '',
    dealValue: '',
    currency: '',
    period: '',
    periodValue: '',
    contact: ['Vaughan Lewis'],
    project: ['Office Management App', 'Clinic Management', 'Educational Platform'],
    dueDate: '',
    expectedClosingDate: '',
    assignee: ['Vaughan Lewis'],
    tags: ['Collab'],
    followupDate: '',
    source: '',
    priority: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagsChange = (name, value) => {
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
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New Events</h4>
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
                    <label className="form-label">Event Name <span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="eventName"
                      value={formData.eventName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Collins</option>
                      <option>Konopelski</option>
                      <option>Adams</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="input-block mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="form-label">Status <span className="text-danger"> *</span></label>
                      <a 
                        href="#" 
                        className="add-new text-primary" 
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="ti ti-plus text-primary me-1"></i>Add New
                      </a>
                    </div>
                    <select 
                      className="select" 
                      name="pipeline"
                      value={formData.pipeline}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Sales</option>
                      <option>Marketing</option>
                      <option>Calls</option>
                    </select>
                  </div>		
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Status <span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Open</option>
                      <option>Won</option>
                      <option>Lost</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Deal Value  <span className="text-danger"> *</span></label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="dealValue"
                      value={formData.dealValue}
                      onChange={handleChange}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Currency<span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="currency"
                      value={formData.currency}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Dollar</option>
                      <option>Euro</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Period <span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="period"
                      value={formData.period}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Days</option>
                      <option>Months</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Period Value  <span className="text-danger"> *</span></label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="periodValue"
                      value={formData.periodValue}
                      onChange={handleChange}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Contact <span className="text-danger"> *</span></label>
                    <input 
                      className="input-tags form-control" 
                      placeholder="Add new" 
                      type="text" 
                      value={formData.contact.join(',')}
                      onChange={(e) => handleTagsChange('contact', e.target.value.split(','))}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Project<span className="text-danger"> *</span></label>
                    <input 
                      className="input-tags form-control" 
                      placeholder="Add new" 
                      type="text" 
                      value={formData.project.join(',')}
                      onChange={(e) => handleTagsChange('project', e.target.value.split(','))}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Due Date <span className="text-danger"> *</span> </label>
                    <div className="input-icon-end position-relative">
                      <input 
                        type="text" 
                        className="form-control datetimepicker" 
                        placeholder="dd/mm/yyyy"
                        name="dueDate"
                        value={formData.dueDate}
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
                    <label className="form-label">Expected Closing Date <span className="text-danger"> *</span> </label>
                    <div className="input-icon-end position-relative">
                      <input 
                        type="text" 
                        className="form-control datetimepicker" 
                        placeholder="dd/mm/yyyy"
                        name="expectedClosingDate"
                        value={formData.expectedClosingDate}
                        onChange={handleChange}
                        required
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-calendar text-gray-7"></i>
                      </span>
                    </div>
                  </div>	
                </div>
                <div className="col-md-12">
                  <div className="mb-3 ">
                    <label className="form-label">Assignee <span className="text-danger"> *</span></label>
                    <input 
                      className="input-tags form-control" 
                      placeholder="Add new" 
                      type="text" 
                      value={formData.assignee.join(',')}
                      onChange={(e) => handleTagsChange('assignee', e.target.value.split(','))}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Tags  <span className="text-danger"> *</span></label>
                    <input 
                      className="input-tags form-control" 
                      placeholder="Add new" 
                      type="text" 
                      value={formData.tags.join(',')}
                      onChange={(e) => handleTagsChange('tags', e.target.value.split(','))}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Followup Date   <span className="text-danger"> *</span></label>
                    <div className="input-icon-end position-relative">
                      <input 
                        type="text" 
                        className="form-control datetimepicker" 
                        placeholder="dd/mm/yyyy"
                        name="followupDate"
                        value={formData.followupDate}
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
                  <div className="mb-3 ">
                    <label className="form-label">Source  <span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Phone Calls</option>
                      <option>Social Media</option>
                      <option>Refferal Sites</option>
                      <option>Web Analytics</option>
                      <option>Previous Purchase</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 ">
                    <label className="form-label">Priority   <span className="text-danger"> *</span></label>
                    <select 
                      className="select" 
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>High</option>
                      <option>Low</option>
                      <option>Medium</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3 ">
                    <label className="form-label">Description    <span className="text-danger"> *</span></label>
                    <textarea 
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Deal</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEventsModal;