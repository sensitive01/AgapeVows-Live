import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'quill/dist/quill.snow.css'; // Changed from react-quill/dist to quill/dist
import "./richStyle.css";

const BasicInfoTab = ({
    selectedFile,
    onFileChange,
    formData,
    onInputChange,
    onAddSkill,
    onRemoveSkill,
}) => {
    const [newSkill, setNewSkill] = useState("");

    const handleSkillKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onAddSkill(newSkill);
            setNewSkill("");
        }
    };

    // Rich text editor modules configuration
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'indent',
        'link'
    ];

    // Handler for rich text editor changes
    const handleRichTextChange = (content, fieldName) => {
        onInputChange({
            target: {
                name: fieldName,
                value: content
            }
        });
    };

    return (
        <div className="tab-pane fade show active" id="basic-info" role="tabpanel">
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Company Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={formData.companyName}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Job Title <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                </div>

                {/* Job Description - WITH RICH TEXT EDITOR */}
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">
                            Job Description <span className="text-danger">*</span>
                        </label>
                        <ReactQuill
                            theme="snow"
                            value={formData.description}
                            onChange={(content) => handleRichTextChange(content, 'description')}
                            modules={modules}
                            formats={formats}
                            placeholder="Enter detailed job description..."
                            style={{ minHeight: '200px' }}
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">
                            Category <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={onInputChange}
                            required
                        >
                            <option value="">Select Category</option>
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
                            <option value="Non-Teaching Staffs">Non-Teaching Staffs</option>
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
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Job Type</label>
                        <select
                            className="form-select"
                            name="jobType"
                            value={formData.jobType}
                            onChange={onInputChange}
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

                {/* Experience & Education */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Experience Level</label>
                        <select
                            className="form-select"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={onInputChange}
                        >
                            <option value="">Select Experience Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="Executive">Executive</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Education Level</label>
                        <select
                            className="form-select"
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={onInputChange}
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

                {/* Salary Range */}
                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Salary From <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="salaryFrom"
                            value={formData.salaryFrom}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">
                            Salary To <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            name="salaryTo"
                            value={formData.salaryTo}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="mb-3">
                        <label className="form-label">Salary Type</label>
                        <select
                            className="form-select"
                            name="salaryType"
                            value={formData.salaryType}
                            onChange={onInputChange}
                        >
                            <option value="">Type</option>
                            <option value="Monthly">Per Monthly</option>
                            <option value="Yearly">LPA</option>
                        </select>
                    </div>
                </div>

                {/* Number of Openings */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Number of Openings</label>
                        <input
                            type="number"
                            className="form-control"
                            name="openings"
                            value={formData.openings}
                            onChange={onInputChange}
                            min="1"
                        />
                    </div>
                </div>

                {/* Application Deadline */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Application Deadline</label>
                        <input
                            type="date"
                            className="form-control"
                            name="deadline"
                            value={formData.deadline}
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                {/* Skills */}
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Skills</label>
                        <div className="d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control me-2"
                                placeholder="Add skill and press Enter"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={handleSkillKeyPress}
                            />
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    onAddSkill(newSkill);
                                    setNewSkill("");
                                }}
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-2">
                            {formData.skills.map((skill, index) => (
                                <span key={index} className="badge bg-light text-dark me-1 mb-1">
                                    {skill}
                                    <button
                                        type="button"
                                        className="btn-close ms-1"
                                        onClick={() => onRemoveSkill(skill)}
                                        style={{ fontSize: "0.5rem" }}
                                    />
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Contact Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={onInputChange}
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
                            onChange={onInputChange}
                        />
                    </div>
                </div>

                {/* Company URL */}
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Company Website</label>
                        <input
                            type="url"
                            className="form-control"
                            name="companyUrl"
                            value={formData.companyUrl}
                            onChange={onInputChange}
                            placeholder="https://example.com"
                        />
                    </div>
                </div>

                {/* Benefits - WITH RICH TEXT EDITOR */}
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Benefits</label>
                        <ReactQuill
                            theme="snow"
                            value={formData.benefits}
                            onChange={(content) => handleRichTextChange(content, 'benefits')}
                            modules={modules}
                            formats={formats}
                            placeholder="Describe benefits (e.g., health insurance, flexible hours, etc.)"
                            style={{ minHeight: '150px' }}
                        />
                    </div>
                </div>

                {/* Application Instructions - WITH RICH TEXT EDITOR */}
                <div className="col-md-12">
                    <div className="mb-3">
                        <label className="form-label">Application Instructions</label>
                        <ReactQuill
                            theme="snow"
                            value={formData.applicationInstructions}
                            onChange={(content) => handleRichTextChange(content, 'applicationInstructions')}
                            modules={modules}
                            formats={formats}
                            placeholder="Special instructions for applicants"
                            style={{ minHeight: '150px' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicInfoTab;