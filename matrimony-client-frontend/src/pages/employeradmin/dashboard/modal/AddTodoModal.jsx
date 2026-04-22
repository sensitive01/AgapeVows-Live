import React, { useState } from 'react';

const AddTodoModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    priority: '',
    description: '',
    assignee: '',
    status: ''
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add New Todo</h4>
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
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Todo Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Tag</label>
                    <select
                      className="form-select"
                      name="tag"
                      value={formData.tag}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Internal</option>
                      <option>Candidates</option>
                      <option>Meetings</option>
                      <option>Reminder</option>
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Low</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="mb-3">
                    <label className="form-label">Descriptions</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Add Assignee</label>
                    <select
                      className="form-select"
                      name="assignee"
                      value={formData.assignee}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Sophie</option>
                      <option>Cameron</option>
                      <option>Doris</option>
                      <option>Rufana</option>
                    </select>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-0">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="">Select</option>
                      <option>Completed</option>
                      <option>Pending</option>
                      <option>Onhold</option>
                      <option>Inprogress</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">Add New Todo</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;