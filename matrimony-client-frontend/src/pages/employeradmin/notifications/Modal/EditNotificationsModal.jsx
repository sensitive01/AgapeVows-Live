import React, { useState } from 'react';

const EditNotificationModal = ({ show, onClose, notificationData }) => {
  // Initialize form data with default values or passed notificationData
  const [formData, setFormData] = useState({
    title: notificationData?.title || "We scheduled a meeting for next week",
    notificationType: notificationData?.notificationType || "Calls",
    dueDate: notificationData?.dueDate || "",
    time: notificationData?.time || "",
    remainder: notificationData?.remainder || "",
    remainderType: notificationData?.remainderType || "Work",
    owner: notificationData?.owner || "Hendry Milner",
    guests: notificationData?.guests || "Sharon Roy",
    description: notificationData?.description || "",
    events: notificationData?.events || "konopelski",
    contacts: notificationData?.contacts || "Guilory Berggren",
    teachers: notificationData?.teachers || "Select Teacher"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notificationType: type
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Updated notification:", formData);
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
            <h4 className="modal-title">Edit Notifications</h4>
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
                  <label className="form-label">Notifications Type <span className="text-danger"> *</span></label>		
                  <div className="activity-items d-flex align-items-center mb-3">
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${formData.notificationType === 'Calls' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Calls'); }}
                    > 
                      <i className="ti ti-phone me-1"></i>Calls
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${formData.notificationType === 'Email' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Email'); }}
                    > 
                      <i className="ti ti-mail me-1"></i>Email
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${formData.notificationType === 'Meeting' ? 'active' : ''}`}
                      onClick={(e) => { e.preventDefault(); handleTypeChange('Meeting'); }}
                    > 
                      <i className="ti ti-user-circle me-1"></i>Meeting
                    </a>
                    <a 
                      href="#" 
                      className={`br-5 d-flex align-items-center justify-content-center me-2 ${formData.notificationType === 'Task' ? 'active' : ''}`}
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
                            <option selected={formData.remainderType === "Work"}>Work</option>
                            <option selected={formData.remainderType === "Home"}>Home</option>
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
                      <option selected={formData.owner === "Hendry Milner"}>Hendry Milner</option>
                      <option selected={formData.owner === "Guilory Berggren"}>Guilory Berggren</option>
                      <option selected={formData.owner === "Jami Carlile"}>Jami Carlile</option>
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
                      <option selected={formData.guests === "Darlee Robertson"}>Darlee Robertson</option>
                      <option selected={formData.guests === "Sharon Roy"}>Sharon Roy</option>
                      <option selected={formData.guests === "Vaughan Lewis"}>Vaughan Lewis</option>
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
                      <option selected={formData.events === "collins"}>collins</option>
                      <option selected={formData.events === "konopelski"}>konopelski</option>
                      <option selected={formData.events === "Adams"}>Adams</option>
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
                      <option selected={formData.contacts === "Hendry Milner"}>Hendry Milner</option>
                      <option selected={formData.contacts === "Guilory Berggren"}>Guilory Berggren</option>	
                      <option selected={formData.contacts === "Jami Carlile"}>Jami Carlile</option>
                    </select>
                  </div>									
                </div>
                <div className="col-md-12">
                  <div className="input-block mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <label className="col-form-label">Teachers <span className="text-danger"> *</span></label>
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
                      <option selected={formData.teachers === "Select Teacher"}>Select Teacher</option>
                      <option selected={formData.teachers === "Epicurean Delights"}>Epicurean Delights</option>
                      <option selected={formData.teachers === "Nimbus Networks"}>Nimbus Networks</option>	
                      <option selected={formData.teachers === "UrbanPulse Design"}>UrbanPulse Design</option>
                    </select>
                  </div>									
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNotificationModal;