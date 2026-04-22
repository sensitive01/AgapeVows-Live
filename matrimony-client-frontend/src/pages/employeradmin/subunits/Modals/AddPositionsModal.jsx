// import React from 'react';

// const AddPositionsModal = ({ show, onClose, onAddAccess }) => {
//     if (!show) return null;

//     return (
//         <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//                 <div className="modal-content">
//                     <div className="modal-header">
//                         <h4 className="modal-title">Add New Positions</h4>
//                         <button
//                             type="button"
//                             className="btn-close custom-btn-close"
//                             onClick={onClose}
//                             aria-label="Close"
//                         >
//                             <i className="ti ti-x"></i>
//                         </button>
//                     </div>
//                     <form>
//                         <div className="modal-body pb-0">
//                             <div className="row">
//                                 <div className="col-md-12">
//                                     <div className="mb-3">
//                                         <label className="form-label">Position Name <span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>PGT Teacher</option>
//                                             <option>Maintenance</option>
//                                             <option>Admin Staff</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <div className="d-flex justify-content-between align-items-center">
//                                             <label className="form-label">Access <span className="text-danger"> *</span></label>
//                                             <button
//                                                 type="button"
//                                                 className="add-new text-primary"
//                                                 onClick={onAddAccess}
//                                                   style={{border:'none', backgroundColor: 'white'}}
//                                             >
//                                                 <i className="ti ti-plus text-primary me-1"></i>Add New
//                                             </button>
//                                         </div>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>Recruitment</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Status <span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>Open</option>
//                                             <option>Won</option>
//                                             <option>Lost</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Position Value  <span className="text-danger"> *</span></label>
//                                         <input type="text" className="form-control" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Currency<span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>Dollar</option>
//                                             <option>Euro</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Period <span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>Days</option>
//                                             <option>Months</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Period Value  <span className="text-danger"> *</span></label>
//                                         <input type="text" className="form-control" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="mb-3">
//                                         <label className="form-label">Job Reporting to<span className="text-danger"> *</span></label>
//                                         <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Vaughan Lewis" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="mb-3">
//                                         <label className="form-label">Skills<span className="text-danger"> *</span></label>
//                                         <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Office Management App,Clinic Management,Educational Platform" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Due Date <span className="text-danger"> *</span> </label>
//                                         <div className="input-icon-end position-relative">
//                                             <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
//                                             <span className="input-icon-addon">
//                                                 <i className="ti ti-calendar text-gray-7"></i>
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Expected Closing  Date <span className="text-danger"> *</span> </label>
//                                         <div className="input-icon-end position-relative">
//                                             <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
//                                             <span className="input-icon-addon">
//                                                 <i className="ti ti-calendar text-gray-7"></i>
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="mb-3">
//                                         <label className="form-label">Assignee <span className="text-danger"> *</span></label>
//                                         <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Vaughan Lewis" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Tags  <span className="text-danger"> *</span></label>
//                                         <input className="form-control" placeholder="Add new" type="text" name="Label" defaultValue="Collab" />
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Followup Date   <span className="text-danger"> *</span></label>
//                                         <div className="input-icon-end position-relative">
//                                             <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
//                                             <span className="input-icon-addon">
//                                                 <i className="ti ti-calendar text-gray-7"></i>
//                                             </span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Source  <span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>Phone Calls</option>
//                                             <option>Social Media</option>
//                                             <option>Refferal Sites</option>
//                                             <option>Web Analytics</option>
//                                             <option>Previous Purchase</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                     <div className="mb-3">
//                                         <label className="form-label">Priority   <span className="text-danger"> *</span></label>
//                                         <select className="form-select">
//                                             <option>Select</option>
//                                             <option>High</option>
//                                             <option>Low</option>
//                                             <option>Medium</option>
//                                         </select>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-12">
//                                     <div className="mb-3">
//                                         <label className="form-label">Description    <span className="text-danger"> *</span></label>
//                                         <textarea className="form-control"></textarea>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-light me-2" onClick={onClose}>Cancel</button>
//                             <button type="submit" className="btn btn-primary">Add Position</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddPositionsModal;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPositionsModal = ({ show, onClose, onAddAccess }) => {
  // Get employerId from localStorage
  // const storedData = JSON.parse(localStorage.getItem('EmployerAdminData')) || {};
  // const employerId = storedData.admin?._id || '';
  const employerAdminData = JSON.parse(
    localStorage.getItem("EmployerAdminData") || "{}"
  );
  const employid = employerAdminData._id || "";

  const [formData, setFormData] = useState({
    companyName: "",
    employid: employid,
    jobTitle: "",
    description: "",
    category: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "",
    jobType: "",
    experienceLevel: "",
    educationLevel: "",
    openings: "",
    locationTypes: [],
    location: "",
    isRemote: false,
    skills: [],
    benefits: "",
    contactEmail: "",
    contactPhone: "",
    companyUrl: "",
    applicationInstructions: "",
    deadline: "",
    priority: "",
    status: "Open",
    applydatetime: new Date().toISOString(),
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "isRemote") {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else if (name === "skills") {
      const skillsArray = value.split(",").map((skill) => skill.trim());
      setFormData((prev) => ({ ...prev, skills: skillsArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://api.edprofio.com/employer/postjob",
        formData
      );

      toast.success("Position created successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      onClose();
      setFormData({
        ...formData,
        companyName: "",
        jobTitle: "",
        description: "",
        category: "",
        salaryFrom: "",
        salaryTo: "",
        salaryType: "",
        jobType: "",
        experienceLevel: "",
        educationLevel: "",
        openings: "",
        locationTypes: [],
        location: "",
        isRemote: false,
        skills: [],
        benefits: "",
        contactEmail: "",
        contactPhone: "",
        companyUrl: "",
        applicationInstructions: "",
        deadline: "",
        priority: "",
        status: "Open",
        applydatetime: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error posting job:", error);
      toast.error("Failed to create position. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (error.response?.data) {
        setErrors(
          error.response.data.errors || { message: error.response.data.message }
        );
      } else {
        setErrors({ message: "An error occurred while posting the job" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Add New Job Position</h4>
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
                {errors.message && (
                  <div className="alert alert-danger">{errors.message}</div>
                )}
                <div className="row">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Company Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Job Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Job Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Temporary">Temporary</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Experience Level <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Education Level <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="High School">High School</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Number of Openings{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="openings"
                        value={formData.openings}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Salary Range (From){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="salaryFrom"
                        value={formData.salaryFrom}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Salary Range (To) <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="salaryTo"
                        value={formData.salaryTo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Salary Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="salaryType"
                        value={formData.salaryType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="Per Year">Per Year</option>
                        <option value="Per Month">Per Month</option>
                        <option value="Per Hour">Per Hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Location Type <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="locationTypes"
                        value={formData.locationTypes[0] || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            locationTypes: [e.target.value],
                          }))
                        }
                        required
                      >
                        <option value="">Select</option>
                        <option value="On-site">On-site</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="isRemote"
                          checked={formData.isRemote}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">
                          This is a remote position
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Location <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Required Skills (comma separated){" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="skills"
                        value={formData.skills.join(", ")}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Benefits</label>
                      <textarea
                        className="form-control"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Contact Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Contact Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">Company Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="companyUrl"
                        value={formData.companyUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Application Instructions{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="applicationInstructions"
                        value={formData.applicationInstructions}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Application Deadline{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Priority <span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Job Description <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <label className="form-label">
                          Access <span className="text-danger"> *</span>
                        </label>
                        <button
                          type="button"
                          className="add-new text-primary"
                          onClick={onAddAccess}
                          style={{ border: "none", backgroundColor: "white" }}
                        >
                          <i className="ti ti-plus text-primary me-1"></i>Add
                          New
                        </button>
                      </div>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Recruitment</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Status <span className="text-danger"> *</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Open</option>
                        <option>Won</option>
                        <option>Lost</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Position Value <span className="text-danger"> *</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Currency<span className="text-danger"> *</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Dollar</option>
                        <option>Euro</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Period <span className="text-danger"> *</span>
                      </label>
                      <select className="form-select">
                        <option>Select</option>
                        <option>Days</option>
                        <option>Months</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">
                        Period Value <span className="text-danger"> *</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light me-2"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPositionsModal;
