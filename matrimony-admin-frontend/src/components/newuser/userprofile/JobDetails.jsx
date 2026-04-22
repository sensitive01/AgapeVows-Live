import React from "react";

const JobDetails = ({ formData, handleInputChange }) => {
  return (
    <div className="edit-pro-parti">
      <div className="form-tit">
        <h4>Job details</h4>
        <h1>Job & Education</h1>
      </div>
      <div className="form-group">
        <label className="lb">Job type:</label>
        <select
          className="form-select chosen-select"
          name="jobType"
          value={formData.jobType}
          onChange={handleInputChange}
        >
          <option value="">Select Job Type</option>
          <option value="Business">Business</option>
          <option value="Employee">Employee</option>
          <option value="Government">Government</option>
          <option value="Jobless">Jobless</option>
        </select>
      </div>
      <div className="form-group">
        <label className="lb">Company name:</label>
        <input
          type="text"
          className="form-control"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">Salary:</label>
          <input
            type="text"
            className="form-control"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">Job total experience:</label>
          <input
            type="text"
            className="form-control"
            name="jobExperience"
            value={formData.jobExperience}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <label className="lb">Degree:</label>
        <input
          type="text"
          className="form-control"
          name="degree"
          value={formData.degree}
          onChange={handleInputChange}
        />
      </div>
      <div className="row">
        <div className="col-md-6 form-group">
          <label className="lb">School:</label>
          <input
            type="text"
            className="form-control"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 form-group">
          <label className="lb">College:</label>
          <input
            type="text"
            className="form-control"
            name="college"
            value={formData.college}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
