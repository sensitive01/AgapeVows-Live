import React, { useEffect, useState } from "react";
import user01 from "../../../assets/employer-admin/assets/img/users/user-01.jpg";
import AddNoteModal from "../../../components/common/AddNoteModal";
import { FaLink, FaFilePdf } from "react-icons/fa";
const EmployerCandidatesDetails = ({ show, onClose, candidate }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showModal, setShowModal] = useState(false);
  const [candidateDetails, setCandidateDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(
    candidate?.employapplicantstatus || "Pending"
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [notes, setNotes] = useState(candidate?.notes || "");

  useEffect(() => {
    if (show && candidate) {
      fetchCandidateDetails();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show, candidate]);

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("EmployerAdminToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://api.edprofio.com/fetchemployee/${candidate.applicantId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch candidate details");
      }

      const data = await response.json();
      setCandidateDetails(data);
      setNotes(data.notes || candidate?.notes || "");
      setSelectedStatus(
        data.employapplicantstatus ||
          candidate?.employapplicantstatus ||
          "Pending"
      );
    } catch (err) {
      console.error("Error fetching candidate details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitNote = async (noteData) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);

      const token = localStorage.getItem("EmployerAdminToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Create a new note with timestamp
      const newNote = `[${new Date().toLocaleString()}] ${noteData.title}: ${
        noteData.description
      }\n${notes || ""}`;

      // Update both status and notes in the backend
      const response = await fetch(
        `https://api.edprofio.com/employer/update-status/${candidate._id}/${candidate.applicantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: selectedStatus,
            notes: newNote,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update status and notes"
        );
      }

      // Update local state
      setNotes(newNote);
      setShowModal(false);
      setUpdateSuccess(true);

      // Refresh candidate details
      fetchCandidateDetails();
    } catch (err) {
      console.error("Error updating notes:", err);
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(false);

      const token = localStorage.getItem("EmployerAdminToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch(
        `https://api.edprofio.com/employer/update-status/${candidate._id}/${candidate.applicantId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: selectedStatus,
            notes: notes || "Status updated with no additional notes",
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update candidate status"
        );
      }

      setUpdateSuccess(true);
      fetchCandidateDetails();
    } catch (err) {
      console.error("Error updating candidate status:", err);
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";

    if (dateString instanceof Date || dateString.includes("-")) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    if (dateString.includes("/")) {
      const [day, month, year] = dateString.split("/");
      return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    return dateString;
  };

  const statusOptions = [
    "Pending",
    "Hold",
    "In Progress",
    "Interview Scheduled",
    "Hired",
    "Rejected",
  ];

  const pipelineStages = [
    "Pending",
    "Hold",
    "In Progress",
    "Interview Scheduled",
    "Hired",
    "Rejected",
  ];
  const getStatusBadgeClass = (status) => {
    return "bg-purple";
  };

  const getNextStage = () => {
    const currentIndex = pipelineStages.indexOf(selectedStatus);
    if (currentIndex < pipelineStages.length - 1) {
      return pipelineStages[currentIndex + 1];
    }
    return null;
  };

  const moveToNextStage = () => {
    const nextStage = getNextStage();
    if (nextStage) {
      setSelectedStatus(nextStage);
      handleStatusUpdate();
    }
  };

  // Add these constants/functions near your other utility functions
  const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const renderProfileTab = () => {
    if (!candidateDetails) return null;

    return (
      <>
        <div className="card">
          <div className="card-header">
            <h5>Personal Information</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Candidate Name</p>
                  <h6 className="fw-normal">
                    {candidateDetails.firstName}{" "}
                    {candidateDetails.lastName || ""}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Phone</p>
                  <h6 className="fw-normal">
                    {candidateDetails.userMobile ||
                      candidateDetails.phone ||
                      "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Gender</p>
                  <h6 className="fw-normal">
                    {candidateDetails.gender || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Date of Birth</p>
                  <h6 className="fw-normal">
                    {formatDate(candidateDetails.dob)}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Email</p>
                  <h6 className="fw-normal">
                    <a
                      href={`mailto:${
                        candidateDetails.userEmail || candidateDetails.email
                      }`}
                    >
                      {candidateDetails.userEmail ||
                        candidateDetails.email ||
                        "Not specified"}
                    </a>
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Marital Status</p>
                  <h6 className="fw-normal">
                    {candidateDetails.maritalStatus || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Languages</p>
                  <h6 className="fw-normal">
                    {candidateDetails.languages?.join(", ") || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Total Experience</p>
                  <h6 className="fw-normal">
                    {candidateDetails.totalExperience === "Fresher"
                      ? "Fresher"
                      : `${candidateDetails.totalExperience || "0"} years`}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Social Links</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              {candidateDetails.linkedin && (
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="mb-1">LinkedIn</p>
                    <h6 className="fw-normal">
                      <a
                        href={candidateDetails.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLink className="me-1" /> View Profile
                      </a>
                    </h6>
                  </div>
                </div>
              )}
              {candidateDetails.github && (
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="mb-1">GitHub</p>
                    <h6 className="fw-normal">
                      <a
                        href={candidateDetails.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLink className="me-1" /> View Profile
                      </a>
                    </h6>
                  </div>
                </div>
              )}
              {candidateDetails.portfolio && (
                <div className="col-md-4">
                  <div className="mb-3">
                    <p className="mb-1">Portfolio</p>
                    <h6 className="fw-normal">
                      <a
                        href={candidateDetails.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLink className="me-1" /> View Website
                      </a>
                    </h6>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Media Profile</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Audio Profile Section - Now in first column */}
              <div className="col-md-6">
                <div className="mb-4">
                  <h6 className="fw-medium mb-3">Audio Introduction</h6>
                  {candidateDetails.introductionAudio?.url ? (
                    <div className="bg-light rounded-lg p-3">
                      <div className="d-flex align-items-center mb-2">
                        <div className="flex-grow">
                          <p className="mb-0">
                            {candidateDetails.introductionAudio.name}
                          </p>
                          <small className="text-muted">
                            Duration:{" "}
                            {formatDuration(
                              candidateDetails.introductionAudio.duration
                            )}
                          </small>
                        </div>
                      </div>
                      <audio controls className="w-100 mt-2">
                        <source
                          src={candidateDetails.introductionAudio.url}
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  ) : (
                    <div className="bg-light rounded-lg p-3 text-center text-muted">
                      No audio introduction available
                    </div>
                  )}
                </div>
              </div>
              {/* Video Profile Section - Now in second column */}
              <div className="col-md-6">
                <div>
                  <h6 className="fw-medium mb-3">Video Profile</h6>
                  {candidateDetails.profileVideo?.url ? (
                    <div className="bg-light rounded-lg overflow-hidden">
                      <div className="p-3">
                        <div className="d-flex align-items-center mb-2">
                          <div className="flex-grow">
                            <p className="mb-0">
                              {candidateDetails.profileVideo.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ratio ratio-16x9">
                        <video
                          controls
                          className="w-100"
                          poster={
                            candidateDetails.profileVideo.thumbnail ||
                            candidateDetails.profileImage ||
                            user01
                          }
                        >
                          <source
                            src={candidateDetails.profileVideo.url}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-light rounded-lg p-3 text-center text-muted">
                      <div className="ratio ratio-16x9">
                        <img
                          src={candidateDetails.profileImage || user01}
                          alt="Profile"
                          className="img-fluid"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <p className="mt-2 mb-0">No video profile available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Documents</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <span className="avatar avatar-lg bg-light-500 border text-dark me-2">
                    <i className="ti ti-file-description fs-24"></i>
                  </span>
                  <div>
                    <h6 className="fw-medium">
                      {candidateDetails.resume?.name || "Resume.pdf"}
                    </h6>
                    <span>Download</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 text-md-end">
                  {candidateDetails.resume?.url ? (
                    <a
                      href={candidateDetails.resume.url}
                      className="btn btn-dark d-inline-flex align-items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ti ti-download me-1"></i>Download
                    </a>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      No Resume Available
                    </button>
                  )}
                </div>
              </div>
            </div>
            {candidateDetails.coverLetterFile?.url && (
              <div className="row align-items-center mt-3">
                <div className="col-md-6">
                  <div className="d-flex align-items-center mb-3">
                    <span className="avatar avatar-lg bg-light-500 border text-dark me-2">
                      <i className="ti ti-file-description fs-24"></i>
                    </span>
                    <div>
                      <h6 className="fw-medium">
                        {candidateDetails.coverLetterFile?.name ||
                          "CoverLetter.pdf"}
                      </h6>
                      <span>Download</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3 text-md-end">
                    <a
                      href={candidateDetails.coverLetterFile.url}
                      className="btn btn-dark d-inline-flex align-items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ti ti-download me-1"></i>Download
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {candidateDetails.gradeLevels?.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h5>Grade Levels</h5>
            </div>
            <div className="card-body pb-0">
              <div className="d-flex flex-wrap gap-2">
                {candidateDetails.gradeLevels.map((grade, index) => (
                  <span key={index} className="badge bg-primary-transparent">
                    {grade}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="card">
          <div className="card-header">
            <h5>Address Information</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="mb-3">
                  <p className="mb-1">Address</p>
                  <h6 className="fw-normal">
                    {candidateDetails.addressLine1 || "Not specified"}
                    {candidateDetails.addressLine2 &&
                      `, ${candidateDetails.addressLine2}`}
                  </h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <p className="mb-1">City</p>
                  <h6 className="fw-normal">
                    {candidateDetails.city ||
                      candidateDetails.currentCity ||
                      "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <p className="mb-1">State</p>
                  <h6 className="fw-normal">
                    {candidateDetails.state || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <p className="mb-1">Pincode</p>
                  <h6 className="fw-normal">
                    {candidateDetails.pincode || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <p className="mb-1">Preferred Location</p>
                  <h6 className="fw-normal">
                    {candidateDetails.preferredLocation || "Not specified"}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {candidateDetails.education?.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h5>Education</h5>
            </div>
            <div className="card-body pb-0">
              {candidateDetails.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-medium mb-0">{edu.degree}</h6>
                    <span className="badge bg-light text-dark">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </span>
                  </div>
                  <p className="mb-1">{edu.institution}</p>
                  <p className="text-muted">{edu.type}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {candidateDetails.workExperience?.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h5>Work Experience</h5>
            </div>
            <div className="card-body pb-0">
              {candidateDetails.workExperience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-medium mb-0">{exp.position}</h6>
                    <span className="badge bg-light text-dark">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="mb-1">
                    {exp.company} ({exp.employmentType})
                  </p>
                  {exp.description && (
                    <p className="text-muted">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h5>Skills</h5>
          </div>
          <div className="card-body pb-0">
            <div className="d-flex flex-wrap gap-2">
              {candidateDetails.skills?.length > 0 ? (
                candidateDetails.skills.map((skill, index) => (
                  <span key={index} className="badge bg-primary-transparent">
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills specified</p>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Resume</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <span className="avatar avatar-lg bg-light-500 border text-dark me-2">
                    <i className="ti ti-file-description fs-24"></i>
                  </span>
                  <div>
                    <h6 className="fw-medium">
                      {candidateDetails.resume?.name || "Resume.pdf"}
                    </h6>
                    <span>Download</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 text-md-end">
                  {candidateDetails.resume?.url ? (
                    <a
                      href={candidateDetails.resume.url}
                      className="btn btn-dark d-inline-flex align-items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ti ti-download me-1"></i>Download
                    </a>
                  ) : (
                    <button className="btn btn-secondary" disabled>
                      No Resume Available
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {candidateDetails.profilesummary && (
          <div className="card">
            <div className="card-header">
              <h5>Profile Summary</h5>
            </div>
            <div className="card-body">
              <p>{candidateDetails.profilesummary}</p>
            </div>
          </div>
        )}
      </>
    );
  };
  const renderPipelineTab = () => {
    const currentStageIndex = pipelineStages.indexOf(selectedStatus);
    return (
      <>
        <div className="card">
          <div className="card-body">
            <h5 className="fw-medium mb-2">Candidate Pipeline Stage</h5>
            <div className="pipeline-list candidates border-0 mb-0">
              <ul className="mb-0">
                {pipelineStages.map((stage, index) => {
                  const isActive = index <= currentStageIndex;
                  return (
                    <li key={stage}>
                      <a
                        href="javascript:void(0);"
                        className={isActive ? "bg-purple" : "bg-gray-100"}
                        onClick={() => setSelectedStatus(stage)}
                        style={{
                          whiteSpace: "nowrap",
                          fontSize: "12px",
                        }}
                      >
                        {stage}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h5>Details</h5>
          </div>
          <div className="card-body pb-0">
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Current Status</p>
                  <span
                    className={`badge ${getStatusBadgeClass(
                      selectedStatus
                    )} d-inline-flex align-items-center`}
                  >
                    <i className="ti ti-point-filled me-1"></i>
                    {selectedStatus}
                  </span>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Applied Role</p>
                  <h6 className="fw-normal">
                    {candidate?.jobrole || "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Applied Date</p>
                  <h6 className="fw-normal">
                    {candidate?.appliedDate
                      ? new Date(candidate.appliedDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Not specified"}
                  </h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mb-3">
                  <p className="mb-1">Recruiter</p>
                  <div className="d-flex align-items-center">
                    <a
                      href="#"
                      className="avatar avatar-sm avatar-rounded me-2"
                    >
                      <img src={user01} alt="Img" />
                    </a>
                    <h6>
                      <a href="#">Recruiter Name</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex align-items-center justify-content-end gap-2">
              <div className="mb-0">
                <div className="dropdown">
                  <button
                    className={`btn btn-${getStatusBadgeClass(
                      selectedStatus
                    ).replace("bg-", "")} dropdown-toggle`}
                    type="button"
                    id="statusDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedStatus}
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="statusDropdown"
                  >
                    {pipelineStages.map((status) => (
                      <li key={status}>
                        <button
                          className="dropdown-item"
                          onClick={() => setSelectedStatus(status)}
                        >
                          {status}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setShowModal(true)}
                disabled={isUpdating || !selectedStatus}
              >
                {isUpdating ? "Updating..." : "Submit"}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .pipeline-list.candidates ul {
            display: flex;
            padding: 0;
            margin: 0;
            list-style: none;
            gap: 0px;
          }
          .pipeline-list.candidates ul li {
            flex: 1;
            text-align: center;
          }
          .pipeline-list.candidates ul li a {
            display: block;
            padding: 10px;
            border-radius: 6px;
            color: white;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            top: 0;
            right: 0px;
            width: 45px;
            height: 45px;
          }
          .pipeline-list.candidates ul li a.bg-purple {
            background-color: #7a6fbe;
          }
          .pipeline-list.candidates ul li a.bg-gray-100 {
            background-color: #f5f7fb;
            color: #495057;
          }
          .btn-purple {
            background-color: #7a6fbe;
            border-color: #7a6fbe;
            color: white;
          }
          .btn-purple:hover {
            background-color: #6a5fae;
            border-color: #6a5fae;
            color: white;
          }
        `}</style>
      </>
    );
  };
  const renderNotesTab = () => {
    return (
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <h5 className="mb-0">Notes</h5>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowModal(true)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              "Processing..."
            ) : (
              <>
                <i className="ti ti-circle-plus me-1"></i>Add Notes
              </>
            )}
          </button>
        </div>
        <div className="card-body">
          <div className="mb-4">
            {notes ? (
              <div
                className="p-3 bg-light rounded"
                style={{
                  whiteSpace: "pre-wrap",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {notes}
              </div>
            ) : (
              <p className="text-muted mb-0">
                No notes available. Add notes about this candidate.
              </p>
            )}
          </div>

          {updateError && (
            <div className="alert alert-danger">
              <i className="ti ti-alert-circle me-2"></i>
              {updateError}
            </div>
          )}
          {updateSuccess && (
            <div className="alert alert-success">
              <i className="ti ti-check me-2"></i>
              Notes updated successfully!
            </div>
          )}

          {candidate?.statusHistory?.length > 0 && (
            <div className="mt-4">
              <h6>Status History</h6>
              <div
                className="list-group"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {candidate.statusHistory.map((history, index) => (
                  <div key={index} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                      <span
                        className={`badge ${getStatusBadgeClass(
                          history.status
                        )}`}
                      >
                        {history.status}
                      </span>
                      <small className="text-muted">
                        {new Date(history.updatedAt).toLocaleString()}
                      </small>
                    </div>
                    {history.notes && (
                      <div
                        className="mt-2 p-2 bg-light rounded"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {history.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{ visibility: "visible", zIndex: 1045 }}
      >
        <div className="offcanvas-body p-0">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="offcanvas offcanvas-end show"
        tabIndex="-1"
        style={{ visibility: "visible", zIndex: 1045 }}
      >
        <div className="offcanvas-body p-0">
          <div className="alert alert-danger m-3">
            <i className="ti ti-alert-circle me-2"></i>
            {error}
          </div>
          <button
            className="btn btn-primary m-3"
            onClick={fetchCandidateDetails}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000000",
            opacity: 0.1,
            zIndex: 1040,
          }}
          onClick={onClose}
        />
      )}

      <div
        className={`offcanvas offcanvas-end ${show ? "show" : ""}`}
        tabIndex="-1"
        id="candidate_details"
        style={{
          visibility: show ? "visible" : "hidden",
          zIndex: 1045,
          width: "800px",
        }}
      >
        <div className="offcanvas-body p-0">
          <div className="candidate-details-page">
            <div className="offcanvas-header border-bottom">
              <h4 className="d-flex align-items-center">
                Candidate Details
                <span className="badge bg-primary-transparent fw-medium ms-2">
                  {candidateDetails?.userName || "Candidate"}
                </span>
              </h4>
              <button
                type="button"
                className="btn-close custom-btn-close"
                onClick={onClose}
                aria-label="Close"
              >
                <i className="ti ti-x"></i>
              </button>
            </div>

            {candidateDetails && (
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center flex-wrap flex-md-nowrap row-gap-3">
                    <span className="avatar avatar-xxxl candidate-img flex-shrink-0 me-3">
                      <img
                        src={
                          candidateDetails.profileImage ||
                          candidateDetails.userProfilePic ||
                          user01
                        }
                        alt="Candidate"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = user01;
                        }}
                      />
                    </span>
                    <div className="flex-fill border rounded p-3 pb-0">
                      <div className="row align-items-center">
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="mb-1">Candidate Name</p>
                            <h6 className="fw-normal">
                              {candidateDetails.firstName}{" "}
                              {candidateDetails.lastName || ""}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="mb-1">Applied Role</p>
                            <h6 className="fw-normal">
                              {candidate?.jobrole || "Not specified"}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="mb-1">Applied Date</p>
                            <h6 className="fw-normal">
                              {candidate?.appliedDate
                                ? new Date(
                                    candidate.appliedDate
                                  ).toLocaleDateString()
                                : "Not specified"}
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="mb-1">Email</p>
                            <h6 className="fw-normal">
                              <a
                                href={`mailto:${
                                  candidateDetails.userEmail ||
                                  candidateDetails.email
                                }`}
                              >
                                {candidateDetails.userEmail ||
                                  candidateDetails.email ||
                                  "Not specified"}
                              </a>
                            </h6>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="mb-3">
                            <p className="mb-1">Current Status</p>
                            <span
                              className={`badge ${getStatusBadgeClass(
                                candidate?.employapplicantstatus || "Pending"
                              )}`}
                            >
                              {candidate?.employapplicantstatus || "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="contact-grids-tab p-0 mb-3">
              <ul className="nav nav-underline" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link pt-0 ${
                      activeTab === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    Profile
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link pt-0 ${
                      activeTab === "pipeline" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("pipeline")}
                  >
                    Hiring Pipeline
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link pt-0 ${
                      activeTab === "notes" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("notes")}
                  >
                    Notes
                  </button>
                </li>
              </ul>
            </div>
            <div
              className="tab-content px-3"
              id="myTabContent"
              style={{ paddingBottom: "20px" }}
            >
              <div
                className={`tab-pane fade ${
                  activeTab === "profile" ? "show active" : ""
                }`}
              >
                {activeTab === "profile" && renderProfileTab()}
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "pipeline" ? "show active" : ""
                }`}
              >
                {activeTab === "pipeline" && renderPipelineTab()}
              </div>
              <div
                className={`tab-pane fade ${
                  activeTab === "notes" ? "show active" : ""
                }`}
              >
                {activeTab === "notes" && renderNotesTab()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddNoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmitNote}
        isUpdating={isUpdating}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        statusOptions={statusOptions}
        getStatusBadgeClass={getStatusBadgeClass}
      />
    </>
  );
};

export default EmployerCandidatesDetails;
