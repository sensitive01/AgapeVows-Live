import React, { useState } from "react";
import { postJob } from "../../api/services/projectServices";
import { useNavigate } from "react-router-dom";
import { useEmployeeRegistration } from "../../hooks/useEmployeeRegistration";
import axios from "axios";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";

const PostJob = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
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
    priority: "Medium",
    status: "Active",
  });

  const [skillsInput, setSkillsInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const navigate = useNavigate();
  const { schoolregister } = useEmployeeRegistration();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Reset OTP verification if email changes
    if (name === "contactEmail") {
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtp("");
      setOtpError("");
    }
  };

  const handleSkillsChange = (e) => {
    setSkillsInput(e.target.value);
  };

  const addSkill = () => {
    if (skillsInput.trim() && !formData.skills.includes(skillsInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillsInput.trim()],
      }));
      setSkillsInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  // Rich text editor configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  const handleRichChange = (field) => (content) => {
    setFormData((prev) => ({ ...prev, [field]: content }));
  };

  // Send OTP function
  const sendOtp = async () => {
    if (!formData.contactEmail) {
      setOtpError("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.contactEmail)) {
      setOtpError("Please enter a valid email address");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    try {
      const response = await axios.post(`${VITE_BASE_URL}/sendemailotp`, {
        userEmail: formData.contactEmail,
      });
      console.log("response",response)

      if (response.status === 200) {
        setIsOtpSent(true);
        setOtpError("");
      } else {
        setOtpError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Verify OTP function
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      const response = await axios.post(`${VITE_BASE_URL}/verify-otp`, {
        email: formData.contactEmail,
        otp,
      });

      if (response.data.success) {
        setIsOtpVerified(true);
        setOtpError("");
      } else {
        setOtpError(response.data.error || "Invalid OTP");
        setIsOtpVerified(false);
      }
    } catch (error) {
      setOtpError(error.response?.data?.error || "Verification failed");
      setIsOtpVerified(false);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      setError("Please verify your email address first");
      return;
    }

    setLoading(true);

    let employid = localStorage.getItem("employid");

    if (!employid) {
      try {
        const employerData = {
          schoolName: formData.companyName,
          firstName: "Admin",
          lastName: "User",
          userEmail: formData.contactEmail,
          userMobile: formData.contactPhone || "0000000000",
          userPassword: "defaultPassword123",
          employerType: "company",
          sendEmails: false,
          agreeTerms: true,
        };

        const response = await schoolregister(employerData);
        employid = response.data.employid || response.data.id;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || "Failed to create employer profile";
        setError(errorMessage);
        setLoading(false);
        return;
      }
    }

    try {
      await postJob({ ...formData, employid });
      setSuccess(true);
      setFormData({
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
        status: "Active",
      });
      // Reset OTP states
      setIsOtpSent(false);
      setIsOtpVerified(false);
      setOtp("");
      setOtpError("");
      navigate("/job-vacancies");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data?.message || 'An error occurred while processing your request');
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection and try again.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(err.message || 'An unexpected error occurred');
      }
      console.error('Error posting job:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">
                  Post a Job Vacancy for FREE
                </h1>
                <p>Feel free to get in touch with us. Need Help?</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <br />
          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              <h1 className="text-secondary h3">Job Details</h1>

              {success && (
                <div className="alert alert-success">
                  Job posted successfully!
                </div>
              )}

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form">
                  {/* Company Name */}
                  <label htmlFor="companyName">&nbsp;&nbsp;Company Name</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        style={{ padding: "5px 30px" }}
                        className="form-control"
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Job Title */}
                  <label htmlFor="jobTitle">&nbsp;&nbsp;Job Title</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="jobTitle"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="Job Title"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Job Description */}
                  <label htmlFor="description">
                    &nbsp;&nbsp;Job Description
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={handleRichChange("description")}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Detailed job description"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <label htmlFor="category">&nbsp;&nbsp;Category</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="category"
                        className="form-control"
                        value={formData.category}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Category Type</option>
                        <option value="Teaching Jobs">Teaching Jobs</option>
                        <option value="Leadership and Administration">
                          Leadership and Administration
                        </option>
                        <option value="Support and Student Welfare">
                          Support and Student Welfare
                        </option>
                        <option value="Extracurricular Activities">
                          Extracurricular Activities
                        </option>
                        <option value="Curriculum and Content Development">
                          Curriculum and Content Development
                        </option>
                        <option value="EdTech and Digital Learning">
                          EdTech and Digital Learning
                        </option>
                        <option value="Special Education and Inclusive Learning">
                          Special Education and Inclusive Learning
                        </option>
                        <option value="Non-Teaching Staffs">
                          Non-Teaching Staffs
                        </option>
                        <option value="Training and Development">
                          Training and Development
                        </option>
                        <option value="Research and Policy Development">
                          Research and Policy Development
                        </option>
                        <option value="Other Specialized Roles">
                          Other Specialized Roles
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Job Type */}
                  <label htmlFor="jobType">&nbsp;&nbsp;Job Type</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="jobType"
                        className="form-control"
                        value={formData.jobType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Job Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Temporary">Temporary</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience Level */}
                  <label htmlFor="experienceLevel">
                    &nbsp;&nbsp;Experience Level
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="experienceLevel"
                        className="form-control"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select Experience Level</option>
                        <option value="Entry Level">Entry Level</option>
                        <option value="Mid Level">Mid Level</option>
                        <option value="Senior Level">Senior Level</option>
                        <option value="Executive">Executive</option>
                      </select>
                    </div>
                  </div>

                  {/* Education Level */}
                  <label htmlFor="educationLevel">
                    &nbsp;&nbsp;Education Level
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <select
                        name="educationLevel"
                        className="form-control"
                        value={formData.educationLevel}
                        onChange={handleChange}
                      >
                        <option value="">Select Education Level</option>
                        <option value="High School">High School</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's">Bachelor's</option>
                        <option value="Master's">Master's</option>
                        <option value="PhD">PhD</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>

                  {/* Salary Information */}
                  <label>&nbsp;&nbsp;Salary Information</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="salaryFrom"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="From"
                        value={formData.salaryFrom}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="salaryTo"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="To"
                        value={formData.salaryTo}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <select
                        name="salaryType"
                        className="form-control"
                        value={formData.salaryType}
                        onChange={handleChange}
                      >
                        <option value="">Type</option>
                        <option value="Monthly">Per Monthly</option>
                        <option value="Yearly">LPA</option>
                      </select>
                    </div>
                  </div>

                  {/* Openings */}
                  <label htmlFor="openings">
                    &nbsp;&nbsp;Number of Openings
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="openings"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="Number of positions available"
                        value={formData.openings}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Location Information */}
                  <label>&nbsp;&nbsp;Location Information</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="location"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="Location (e.g., City, State)"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="jobplugin__form-field">
                      <label>
                        <input
                          type="checkbox"
                          name="isRemote"
                          checked={formData.isRemote}
                          onChange={handleChange}
                        />{" "}
                        Remote Work Available
                      </label>
                    </div>
                  </div>

                  {/* Skills */}
                  <label htmlFor="skills">&nbsp;&nbsp;Required Skills</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <div className="skills-input-container">
                        <input
                          type="text"
                          value={skillsInput}
                          onChange={handleSkillsChange}
                          className="form-control"
                          style={{ padding: "5px 30px" }}
                          placeholder="Add skills (press Enter or click Add)"
                        />
                        <button
                          type="button"
                          className="btn btn-sm btn-primary ml-2"
                          onClick={addSkill}
                        >
                          Add
                        </button>
                      </div>
                      <div className="skills-tags mt-2">
                        {formData.skills.map((skill, index) => (
                          <span key={index} className="skill-tag">
                            {skill}
                            <button
                              type="button"
                              className="skill-remove"
                              onClick={() => removeSkill(skill)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Benefits */}
                  <label htmlFor="benefits">&nbsp;&nbsp;Benefits</label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <ReactQuill
                        className="rich-editor-full"
                        theme="snow"
                        value={formData.benefits}
                        onChange={handleRichChange("benefits")}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Describe benefits offered"
                      />
                    </div>
                  </div>

                  {/* Contact Information with OTP - FIXED LAYOUT */}
                  <label>&nbsp;&nbsp;Contact Information</label>

                  {/* Email and OTP row */}
                  <div
                    className="jobplugin__form-row"
                    style={{ marginBottom: "15px" }}
                  >
                    <div
                      className="jobplugin__form-field"
                      style={{ flex: "2" }}
                    >
                      <input
                        type="email"
                        name="contactEmail"
                        className="form-control"
                        style={{ padding: "10px 15px" }}
                        placeholder="Contact Email"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        disabled={isOtpSent}
                        required
                      />
                    </div>
                    <div
                      className="jobplugin__form-field"
                      style={{ flex: "1" }}
                    >
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="form-control"
                        style={{ padding: "10px 15px" }}
                        disabled={!isOtpSent}
                        maxLength="6"
                      />
                    </div>
                    <div
                      className="jobplugin__form-field"
                      style={{ flex: "0 0 auto" }}
                    >
                      {!isOtpSent ? (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="btn btn-secondary"
                          style={{
                            whiteSpace: "nowrap",
                            padding: "10px 15px",
                            fontSize: "14px",
                          }}
                          disabled={isSendingOtp || !formData.contactEmail}
                        >
                          {isSendingOtp ? "Sending..." : "Send OTP"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={verifyOtp}
                          className={`btn ${isOtpVerified ? "btn-success" : "btn-primary"
                            }`}
                          style={{
                            whiteSpace: "nowrap",
                            padding: "10px 15px",
                            fontSize: "14px",
                          }}
                          disabled={isVerifyingOtp || isOtpVerified}
                        >
                          {isVerifyingOtp
                            ? "Verifying..."
                            : isOtpVerified
                              ? "✓ Verified"
                              : "Verify"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Status messages */}
                  <div style={{ marginBottom: "15px" }}>
                    {isOtpSent && !isOtpVerified && (
                      <small
                        className="text-muted"
                        style={{ display: "block", marginBottom: "5px" }}
                      >
                        📧 OTP sent to your email
                      </small>
                    )}
                    {isOtpVerified && (
                      <small
                        className="text-success"
                        style={{ display: "block", marginBottom: "5px" }}
                      >
                        ✅ Email verified successfully!
                      </small>
                    )}
                    {otpError && (
                      <div
                        className="text-danger small"
                        style={{ marginBottom: "5px" }}
                      >
                        ❌ {otpError}
                      </div>
                    )}
                  </div>

                  {/* Phone number field */}
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="text"
                        name="contactPhone"
                        className="form-control"
                        style={{ padding: "10px 15px" }}
                        placeholder="Contact Phone Number"
                        value={formData.contactPhone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Company URL */}
                  <label htmlFor="companyUrl">
                    &nbsp;&nbsp;Company Website
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="url"
                        name="companyUrl"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        placeholder="Company Website URL"
                        value={formData.companyUrl}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Application Instructions */}
                  <label htmlFor="applicationInstructions">
                    &nbsp;&nbsp;Application Instructions
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <ReactQuill
                        className="rich-editor-full"
                        theme="snow"
                        value={formData.applicationInstructions}
                        onChange={handleRichChange("applicationInstructions")}
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="How should candidates apply?"
                      />
                    </div>
                  </div>

                  {/* Deadline */}
                  <label htmlFor="deadline">
                    &nbsp;&nbsp;Application Deadline
                  </label>
                  <div className="jobplugin__form-row">
                    <div className="jobplugin__form-field">
                      <input
                        type="date"
                        name="deadline"
                        className="form-control"
                        style={{ padding: "5px 30px" }}
                        value={formData.deadline}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={loading || !isOtpVerified}
                  >
                    {loading ? (
                      <>
                        <i
                          className="icon icon-spinner spinner"
                          style={{ fontSize: "14px" }}
                        ></i>
                        &nbsp;Posting Job...
                      </>
                    ) : (
                      <>
                        <i
                          className="icon icon-check-circle text-primary"
                          style={{ fontSize: "14px" }}
                        ></i>
                        &nbsp;Post Job
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
      </main>

      {/* CSS for styling */}
      <style jsx>{`
        .skills-input-container {
          display: flex;
          align-items: center;
        }

        .skills-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .skill-tag {
          background-color: #e0e0e0;
          padding: 3px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
        }

        .skill-remove {
          background: none;
          border: none;
          cursor: pointer;
          margin-left: 5px;
          color: #666;
        }

        .skill-remove:hover {
          color: #f00;
        }

        /* Make rich editors take full width of form field */
        .rich-editor-full { width: 100%; }
        .rich-editor-full .ql-container { width: 100%; }
        .rich-editor-full .ql-editor { min-height: 150px; }
      `}</style>
    </div>
  );
};

export default PostJob;
