import React, { useState } from 'react';

const AddNotificationModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    notificationType: 'Calls',
    dueDate: '',
    time: '',
    remainder: '',
    remainderType: '',
    owner: '',
    guests: '',
    description: '',
    events: '',
    contacts: '',
    teachers: ''
  });

  const [activeType, setActiveType] = useState('Calls');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (type) => {
    setActiveType(type);
    setFormData(prev => ({
      ...prev,
      notificationType: type
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
            <h4 className="modal-title">Add New Notification</h4>
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
                    <label className="form-label">Title <span className="text-danger"> *</span></label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>									
                </div>
                <div className="col-md-12">
                  <label className="form-label">Notification Type <span className="text-danger"> *</span></label>		
                  <div className="activity-items d-flex align-items-center mb-3">
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${activeType === 'Calls' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Calls'); }}
                    > 
                      <i className="ti ti-phone me-1"></i>Calls
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${activeType === 'Email' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Email'); }}
                    > 
                      <i className="ti ti-mail me-1"></i>Email
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${activeType === 'Meeting' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Meeting'); }}
                    > 
                      <i className="ti ti-user-circle me-1"></i>Meeting
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${activeType === 'Circular' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Circular'); }}
                    > 
                      <i className="ti ti-user-circle me-1"></i>Circular
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${activeType === 'Task' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Task'); }}
                    > 
                      <i className="ti ti-list-check me-1"></i>Task
                    </a>
                  </div>			
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Due Date <span className="text-danger"> *</span></label>
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
                    <label className="form-label">Time <span className="text-danger"> *</span></label>
                    <div className="input-icon-end position-relative">
                      <input
                        type="text"
                        className="form-control timepicker"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                      <span className="input-icon-addon">
                        <i className="ti ti-clock-hour-10 text-gray-7"></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 lead-phno-col del-phno-col">
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="input-block mb-3">
                        <label className="form-label">Remainder <span className="text-danger"> *</span></label>
                        <div className="input-icon-start position-relative">
                          <input
                            type="text"
                            className="form-control"
                            name="remainder"
                            value={formData.remainder}
                            onChange={handleChange}
                            required
                          />
                          <span className="input-icon-addon">
                            <i className="ti ti-bell text-gray-7"></i>
                          </span>
                        </div>
                      </div>
                    </div>	
                    <div className="col-lg-4 d-flex align-items-end">
                      <div className="input-block w-100 mb-3 d-flex align-items-center">
                        <div className="w-100">
                          <select
                            className="select"
                            name="remainderType"
                            value={formData.remainderType}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select</option>
                            <option>Work</option>
                            <option>Home</option>
                          </select>
                        </div>
                        <h6 className="fs-14 fw-normal ms-3">Before Use</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Owner <span className="text-danger"> *</span></label>
                    <select
                      className="select"
                      name="owner"
                      value={formData.owner}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Hendry Milner</option>
                      <option>Guilory Berggren</option>
                      <option>Jami Carlile</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label className="form-label">Guests <span className="text-danger"> *</span></label>
                    <select
                      className="select"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Darlee Robertson</option>
                      <option>Sharon Roy</option>
                      <option>Vaughan Lewis</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="mb-3">
                    <label className="form-label">Description <span className="text-danger"> *</span></label>
                    <div className="summernote"></div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Events <span className="text-danger"> *</span></label>
                      <a href="#" className="add-new text-primary" data-bs-toggle="modal" data-bs-target="#add_deals">
                        <i className="ti ti-plus text-primary me-1"></i>Add New
                      </a>
                    </div>
                    <select
                      className="select"
                      name="events"
                      value={formData.events}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>collins</option>
                      <option>konopelski</option>
                      <option>Adams</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Contacts <span className="text-danger"> *</span></label>
                      <a href="#" className="add-new text-primary" data-bs-toggle="modal" data-bs-target="#add_contact">
                        <i className="ti ti-plus text-primary me-1"></i>Add New
                      </a>
                    </div>
                    <select
                      className="select"
                      name="contacts"
                      value={formData.contacts}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>Hendry Milner</option>
                      <option>Guilory Berggren</option>	
                      <option>Jami Carlile</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Teachers<span className="text-danger"> *</span></label>
                      <a href="#" className="add-new text-primary" data-bs-toggle="modal" data-bs-target="#add_company">
                        <i className="ti ti-plus text-primary me-1"></i>Add New
                      </a>
                    </div>
                    <select
                      className="select"
                      name="teachers"
                      value={formData.teachers}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select</option>
                      <option>PGT Teachers</option>
                      <option>Physical Trainers</option>	
                      <option>Admin Staffs</option>
                    </select>
                  </div>									
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add Notifications</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNotificationModal;