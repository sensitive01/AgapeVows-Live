import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import EmployerHeader from "./EmployerHeader";
import EmployerFooter from "./EmployerFooter";
import { ArrowLeft, Save, Loader, AlertCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditJobPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [newLocationType, setNewLocationType] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    category: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "Monthly",
    locationTypes: [],
    skills: [],
    benefits: "",
    jobType: "Full Time",
    experienceLevel: "",
    educationLevel: "",
    deadline: "",
    openings: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    isRemote: false,
    companyUrl: "",
    applicationInstructions: "",
    priority: "Normal",
    isActive: true,
  });

  // Rich text editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("employerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      console.log("Fetching job details for ID:", id);

      const response = await axios.get(
        `https://api.edprofio.com/employer/viewjobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Job details fetched:", response.data);

      if (response.data) {
        const job = response.data;

        // Format deadline for date input
        const deadline = job.deadline
          ? new Date(job.deadline).toISOString().split("T")[0]
          : "";

        setFormData({
          companyName: job.companyName || "",
          jobTitle: job.jobTitle || "",
          description: job.description || "",
          category: job.category || "",
          salaryFrom: job.salaryFrom || "",
          salaryTo: job.salaryTo || "",
          salaryType: job.salaryType || "Monthly",
          locationTypes: job.locationTypes || [],
          skills: job.skills || [],
          benefits: job.benefits || "",
          jobType: job.jobType || "Full Time",
          experienceLevel: job.experienceLevel || "",
          educationLevel: job.educationLevel || "",
          deadline: deadline,
          openings: job.openings || "",
          contactEmail: job.contactEmail || "",
          contactPhone: job.contactPhone || "",
          location: job.location || "",
          isRemote: job.isRemote || false,
          companyUrl: job.companyUrl || "",
          applicationInstructions: job.applicationInstructions || "",
          priority: job.priority || "Normal",
          isActive: job.isActive !== undefined ? job.isActive : true,
        });
      }
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError(
        err.response?.data?.message || "Failed to load job details"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleBenefitsChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      benefits: value,
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddLocationType = () => {
    if (
      newLocationType.trim() &&
      !formData.locationTypes.includes(newLocationType.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        locationTypes: [...prev.locationTypes, newLocationType.trim()],
      }));
      setNewLocationType("");
    }
  };

  const handleRemoveLocationType = (typeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      locationTypes: prev.locationTypes.filter((type) => type !== typeToRemove),
    }));
  };

  const validateForm = () => {
    console.log("Validating form data:", formData);

    // Check required fields
    if (!formData.companyName || !formData.companyName.trim()) {
      setError("Company Name is required");
      return false;
    }
    if (!formData.jobTitle || !formData.jobTitle.trim()) {
      setError("Job Title is required");
      return false;
    }
    if (!formData.description || !formData.description.trim()) {
      setError("Job Description is required");
      return false;
    }
    if (!formData.category) {
      setError("Category is required");
      return false;
    }
    if (!formData.salaryFrom) {
      setError("Salary From is required");
      return false;
    }
    if (!formData.salaryTo) {
      setError("Salary To is required");
      return false;
    }
    if (!formData.experienceLevel) {
      setError("Experience Level is required");
      return false;
    }
    if (!formData.educationLevel) {
      setError("Education Level is required");
      return false;
    }
    if (!formData.deadline) {
      setError("Application Deadline is required");
      return false;
    }
    if (!formData.openings) {
      setError("Number of Openings is required");
      return false;
    }
    if (!formData.contactEmail || !formData.contactEmail.trim()) {
      setError("Contact Email is required");
      return false;
    }
    if (!formData.contactPhone || !formData.contactPhone.trim()) {
      setError("Contact Phone is required");
      return false;
    }
    if (!formData.location || !formData.location.trim()) {
      setError("Location is required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");
    console.log("Current form data:", formData);

    // Clear any previous errors
    setError(null);

    // Validate form
    if (!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      setSaving(true);
      setSuccessMessage("");

      const token = localStorage.getItem("employerToken");
      const employerData = JSON.parse(localStorage.getItem("employerData"));

      console.log("Employer Data:", employerData);

      if (!token || !employerData || !employerData._id) {
        throw new Error("Authentication required. Please login again.");
      }

      // Prepare data for submission
      const submitData = {
        companyName: formData.companyName,
        jobTitle: formData.jobTitle,
        description: formData.description,
        category: formData.category,
        salaryFrom: formData.salaryFrom,
        salaryTo: formData.salaryTo,
        salaryType: formData.salaryType,
        locationTypes: formData.locationTypes,
        skills: formData.skills,
        benefits: formData.benefits,
        jobType: formData.jobType,
        experienceLevel: formData.experienceLevel,
        educationLevel: formData.educationLevel,
        deadline: formData.deadline
          ? new Date(formData.deadline).toISOString()
          : null,
        openings: formData.openings,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        location: formData.location,
        isRemote: formData.isRemote,
        companyUrl: formData.companyUrl,
        applicationInstructions: formData.applicationInstructions,
        priority: formData.priority,
        isActive: formData.isActive,
      };

      console.log("Submitting data:", submitData);
      console.log("API URL:", `https://api.edprofio.com/employer/editjob/${id}`);

      const response = await axios.put(
        `https://api.edprofio.com/employer/editjob/${id}`,
        submitData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        setSuccessMessage("Job updated successfully!");
        
        // Redirect to job details after 2 seconds
        setTimeout(() => {
          navigate(`/employer/post-jobs/${id}`);
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to update job");
      }
    } catch (err) {
      console.error("Error updating job:", err);
      console.error("Error response:", err.response?.data);
      
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to update job. Please try again."
      );
      
      // Scroll to top to show error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error && !formData.jobTitle) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="container">
            <div className="alert alert-danger">
              <AlertCircle className="me-2" />
              {error}
              <Link to="/employer/post-jobs" className="btn btn-link">
                Back to Jobs
              </Link>
            </div>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="content">
        <div className="container">
          {/* Breadcrumb */}
          <div className="d-flex align-items-center mb-4">
            <Link
              to={`/employer/post-jobs/${id}`}
              className="btn btn-light me-3"
            >
              <ArrowLeft className="me-2" size={18} />
              Back
            </Link>
            <h2 className="mb-0">Edit Job</h2>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="alert alert-success alert-dismissible fade show">
              <i className="ti ti-check me-2"></i>
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger alert-dismissible fade show">
              <AlertCircle className="me-2" size={18} />
              {error}
              <button
                type="button"
                className="btn-close"
                onClick={() => setError(null)}
              ></button>
            </div>
          )}

          {/* Edit Form */}
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Left Column */}
              <div className="col-lg-8">
                {/* Basic Information */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Basic Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Company Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Job Title <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">
                          Job Description <span className="text-danger">*</span>
                        </label>
                        <ReactQuill
                          theme="snow"
                          value={formData.description}
                          onChange={handleDescriptionChange}
                          modules={modules}
                          style={{ height: "200px", marginBottom: "50px" }}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Category <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="IT & Software">IT & Software</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="Finance">Finance</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Education">Education</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Job Type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          name="jobType"
                          value={formData.jobType}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="Full Time">Full Time</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                          <option value="Freelance">Freelance</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Salary & Experience */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Salary & Experience</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          Salary From <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="salaryFrom"
                          value={formData.salaryFrom}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">
                          Salary To <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="salaryTo"
                          value={formData.salaryTo}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary Type</label>
                        <select
                          className="form-select"
                          name="salaryType"
                          value={formData.salaryType}
                          onChange={handleInputChange}
                        >
                          <option value="Monthly">Monthly</option>
                          <option value="Yearly">Yearly</option>
                          <option value="Hourly">Hourly</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Experience Level <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          name="experienceLevel"
                          value={formData.experienceLevel}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Experience</option>
                          <option value="Fresher">Fresher</option>
                          <option value="1-2 Years">1-2 Years</option>
                          <option value="2-5 Years">2-5 Years</option>
                          <option value="5-10 Years">5-10 Years</option>
                          <option value="10+ Years">10+ Years</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          Education Level <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          name="educationLevel"
                          value={formData.educationLevel}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Education</option>
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Bachelor's Degree">Bachelor's Degree</option>
                          <option value="Master's Degree">Master's Degree</option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills & Benefits */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Skills & Benefits</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Skills Required</label>
                      <div className="d-flex align-items-center mb-2">
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Add skill and press Add"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSkill();
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddSkill}
                        >
                          Add
                        </button>
                      </div>
                      <div>
                        {formData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="badge bg-primary me-1 mb-1"
                          >
                            {skill}
                            <button
                              type="button"
                              className="btn-close btn-close-white ms-1"
                              onClick={() => handleRemoveSkill(skill)}
                              style={{ fontSize: "0.5rem" }}
                            />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Benefits</label>
                      <ReactQuill
                        theme="snow"
                        value={formData.benefits}
                        onChange={handleBenefitsChange}
                        modules={modules}
                        style={{ height: "150px", marginBottom: "50px" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Location</h5>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label">
                          Location <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="e.g., Bangalore, Karnataka"
                          required
                        />
                      </div>

                      <div className="col-12 mb-3">
                        <label className="form-label">Location Types</label>
                        <div className="d-flex align-items-center mb-2">
                          <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Add location type and press Add"
                            value={newLocationType}
                            onChange={(e) => setNewLocationType(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddLocationType();
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddLocationType}
                          >
                            Add
                          </button>
                        </div>
                        <div>
                          {formData.locationTypes.map((type, index) => (
                            <span
                              key={index}
                              className="badge bg-secondary me-1 mb-1"
                            >
                              {type}
                              <button
                                type="button"
                                className="btn-close btn-close-white ms-1"
                                onClick={() => handleRemoveLocationType(type)}
                                style={{ fontSize: "0.5rem" }}
                              />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remoteCheck"
                            name="isRemote"
                            checked={formData.isRemote}
                            onChange={handleInputChange}
                          />
                          <label className="form-check-label" htmlFor="remoteCheck">
                            This is a Remote Job
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-lg-4">
                {/* Job Settings */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Job Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Number of Openings <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="openings"
                        value={formData.openings}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Application Deadline <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-select"
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                      >
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="activeCheck"
                          name="isActive"
                          checked={formData.isActive}
                          onChange={handleInputChange}
                        />
                        <label className="form-check-label" htmlFor="activeCheck">
                          Job is Active
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Contact Information</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Contact Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Contact Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Company Website</label>
                      <input
                        type="url"
                        className="form-control"
                        name="companyUrl"
                        value={formData.companyUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Instructions */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Additional Instructions</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">
                        Application Instructions
                      </label>
                      <textarea
                        className="form-control"
                        name="applicationInstructions"
                        value={formData.applicationInstructions}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Any special instructions for applicants..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card">
                  <div className="card-body">
                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-2"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <Loader className="me-2" size={18} />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="me-2" size={18} />
                          Update Job
                        </>
                      )}
                    </button>
                    <Link
                      to={`/employer/post-jobs/${id}`}
                      className="btn btn-light w-100"
                    >
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <EmployerFooter />
    </>
  );
};

export default EditJobPage;