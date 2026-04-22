import React, { useEffect, useState } from "react";
import user01 from "../../assets/employer/assets/img/users/user-01.jpg";
import AddNoteModal from "../../components/common/AddNoteModal";
import { FaLink, FaFilePdf } from "react-icons/fa";

const EmployerCandidatesDetails = ({ show, onClose, candidate, onCandidateUpdate }) => {
  console.log("candidate", candidate);
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
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    location: "",
    interviewType: "In-Person",
    notes: "",
  });

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

  useEffect(() => {
    // Update selectedStatus when candidate prop changes
    if (candidate?.employapplicantstatus) {
      setSelectedStatus(candidate.employapplicantstatus);
    }
  }, [candidate?.employapplicantstatus]);

  const fetchCandidateDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("employerToken");
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

  const updateLocalState = (newStatus, newNotes) => {
    // Update local component state
    setSelectedStatus(newStatus);
    setNotes(newNotes);
    
    // Update candidate details
    setCandidateDetails(prev => ({
      ...prev,
      employapplicantstatus: newStatus,
      notes: newNotes,
    }));

    // Create updated candidate object for parent component
    const updatedCandidate = {
      ...candidate,
      employapplicantstatus: newStatus,
      notes: newNotes,
      statusHistory: [
        {
          status: newStatus,
          notes: newNotes,
          updatedAt: new Date().toISOString(),
        },
        ...(candidate?.statusHistory || [])
      ]
    };

    // Notify parent component about the update
    if (onCandidateUpdate) {
      onCandidateUpdate(updatedCandidate);
    }
  };

  const handleSubmitNote = async (noteData) => {
    try {
      setIsUpdating(true);
      setUpdateError(null);

      const token = localStorage.getItem("employerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Get employer data
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      if (!employerData || !employerData._id) {
        throw new Error("Employer information not found");
      }

      // Create a new note with timestamp
      const newNote = `[${new Date().toLocaleString()}] ${noteData.title}: ${
        noteData.description
      }\n${notes || ""}`;

      const applicationId = candidate._id || candidate.applicantId;
      const employerId = employerData._id;

      // Update both status and notes in the backend
      const response = await fetch(
        `https://api.edprofio.com/employer/updaee/${applicationId}/${employerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employapplicantstatus: selectedStatus,
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

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || "Update failed");
      }

      console.log("Notes updated successfully, response:", responseData);

      // Update local state
      updateLocalState(selectedStatus, newNote);
      
      // Refetch candidate details to ensure data is in sync with backend
      await fetchCandidateDetails();
      
      setShowModal(false);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);

    } catch (err) {
      console.error("Error updating notes:", err);
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusUpdate = async () => {
    // Check if status is Interview Scheduled and show modal
    if (selectedStatus === "Interview Scheduled") {
      setShowInterviewModal(true);
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(false);

      const token = localStorage.getItem("employerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Get employer data
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      if (!employerData || !employerData._id) {
        throw new Error("Employer information not found");
      }

      const statusNote = `Status updated to ${selectedStatus} at ${new Date().toLocaleString()}`;
      const updatedNotes = notes ? `${statusNote}\n${notes}` : statusNote;

      // Use the correct API endpoint - should match the one used in the search component
      const applicationId = candidate._id || candidate.applicantId;
      const employerId = employerData._id;

      console.log("Updating status with:", {
        applicationId,
        employerId,
        status: selectedStatus
      });

      const response = await fetch(
        `https://api.edprofio.com/employer/updaee/${applicationId}/${employerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employapplicantstatus: selectedStatus,
            notes: updatedNotes,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update candidate status"
        );
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || "Update failed");
      }

      console.log("Status update successful, response:", responseData);

      // Update local state
      updateLocalState(selectedStatus, updatedNotes);
      
      // Refetch candidate details to ensure data is in sync with backend
      await fetchCandidateDetails();
      
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);

    } catch (err) {
      console.error("Error updating candidate status:", err);
      setUpdateError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleInterviewSchedule = async () => {
    try {
      setIsUpdating(true);
      setUpdateError(null);
      setUpdateSuccess(false);

      const token = localStorage.getItem("employerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Get employer data
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      if (!employerData || !employerData._id) {
        throw new Error("Employer information not found");
      }

      // Validate interview details
      if (!interviewDetails.date || !interviewDetails.time) {
        throw new Error("Please select interview date and time");
      }

      // Create interview note
      const interviewNote = `Interview Scheduled\n` +
        `Date: ${new Date(interviewDetails.date).toLocaleDateString()}\n` +
        `Time: ${interviewDetails.time}\n` +
        `Type: ${interviewDetails.interviewType}\n` +
        `${interviewDetails.location ? `Location: ${interviewDetails.location}\n` : ""}` +
        `${interviewDetails.notes ? `Notes: ${interviewDetails.notes}\n` : ""}` +
        `Scheduled at: ${new Date().toLocaleString()}`;

      const updatedNotes = notes ? `${interviewNote}\n\n${notes}` : interviewNote;

      const applicationId = candidate._id || candidate.applicantId;
      const employerId = employerData._id;

      console.log("Scheduling interview with:", {
        applicationId,
        employerId,
        interviewDetails
      });

      const response = await fetch(
        `https://api.edprofio.com/employer/updaee/${applicationId}/${employerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            employapplicantstatus: "Interview Scheduled",
            notes: updatedNotes,
            interviewDate: interviewDetails.date,
            interviewTime: interviewDetails.time,
            interviewLocation: interviewDetails.location,
            interviewType: interviewDetails.interviewType,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to schedule interview"
        );
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || "Update failed");
      }

      console.log("Interview scheduled successfully, response:", responseData);

      // Update local state
      updateLocalState("Interview Scheduled", updatedNotes);
      
      // Refetch candidate details to ensure data is in sync with backend
      await fetchCandidateDetails();
      
      // Reset interview details
      setInterviewDetails({
        date: "",
        time: "",
        location: "",
        interviewType: "In-Person",
        notes: "",
      });

      setShowInterviewModal(false);
      setUpdateSuccess(true);
      
      setTimeout(() => setUpdateSuccess(false), 3000);

    } catch (err) {
      console.error("Error scheduling interview:", err);
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
                     {candidateDetails?.userName || "Candidate"}
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

        {/* Social Links Card */}
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

        {/* Media Profile Card */}
        <div className="card">
          <div className="card-header">
            <h5>Media Profile</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {/* Audio Profile Section */}
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
              {/* Video Profile Section */}
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

        {/* Rest of the profile sections... */}
        {/* Documents, Grade Levels, Address, Education, Work Experience, Skills sections remain the same */}
        {/* ... Include all other sections from your original code ... */}
      </>
    );
  };

  const renderPipelineTab = () => {
    const currentStageIndex = pipelineStages.indexOf(selectedStatus);
    return (
      <>
        {/* Success/Error Messages */}
        {updateSuccess && (
          <div className="alert alert-success alert-dismissible fade show">
            <i className="ti ti-check me-2"></i>
            Status updated successfully!
          </div>
        )}
        {updateError && (
          <div className="alert alert-danger alert-dismissible fade show">
            <i className="ti ti-alert-circle me-2"></i>
            {updateError}
          </div>
        )}

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
                  <div>
                    <span
                      className={`badge ${getStatusBadgeClass(selectedStatus)}`}
                    >
                      {selectedStatus}
                    </span>
                    <small className="text-muted d-block mt-1">
                      {new Date().toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
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
                    disabled={isUpdating}
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
                onClick={handleStatusUpdate}
                disabled={isUpdating || !selectedStatus}
              >
                {isUpdating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Updating...
                  </>
                ) : (
                  "Update Status"
                )}
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
              <>
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              <>
                <i className="ti ti-circle-plus me-1"></i>Add Notes
              </>
            )}
          </button>
        </div>
        <div className="card-body">
          {/* Success/Error Messages */}
          {updateSuccess && (
            <div className="alert alert-success alert-dismissible fade show">
              <i className="ti ti-check me-2"></i>
              Notes updated successfully!
            </div>
          )}
          {updateError && (
            <div className="alert alert-danger alert-dismissible fade show">
              <i className="ti ti-alert-circle me-2"></i>
              {updateError}
            </div>
          )}

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
          <div className="candidate-details-page px-3">
            <div className="offcanvas-header border-bottom mb-3  ">
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
                              {candidateDetails.userName}{" "}
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
                            <div>
                              <span
                                className={`badge ${getStatusBadgeClass(
                                  selectedStatus
                                )}`}
                              >
                                {selectedStatus}
                              </span>
                              <small className="text-muted d-block mt-1">
                                {new Date().toLocaleString("en-GB", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </small>
                            </div>
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
              className="tab-content "
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

      {/* Interview Scheduling Modal */}
      {showInterviewModal && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1050,
            }}
            onClick={() => setShowInterviewModal(false)}
          />
          <div
            className="modal fade show"
            style={{
              display: "block",
              zIndex: 1051,
            }}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Schedule Interview</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowInterviewModal(false)}
                    disabled={isUpdating}
                  ></button>
                </div>
                <div className="modal-body">
                  {updateError && (
                    <div className="alert alert-danger alert-dismissible fade show">
                      <i className="ti ti-alert-circle me-2"></i>
                      {updateError}
                    </div>
                  )}
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Interview Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={interviewDetails.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) =>
                          setInterviewDetails({
                            ...interviewDetails,
                            date: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        Interview Time <span className="text-danger">*</span>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        value={interviewDetails.time}
                        onChange={(e) =>
                          setInterviewDetails({
                            ...interviewDetails,
                            time: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Interview Type</label>
                      <select
                        className="form-select"
                        value={interviewDetails.interviewType}
                        onChange={(e) =>
                          setInterviewDetails({
                            ...interviewDetails,
                            interviewType: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                      >
                        <option value="In-Person">In-Person</option>
                        <option value="Video Call">Video Call</option>
                        <option value="Phone Call">Phone Call</option>
                        <option value="Online">Online</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Location/Link</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={
                          interviewDetails.interviewType === "Video Call"
                            ? "Meeting link"
                            : interviewDetails.interviewType === "Phone Call"
                            ? "Phone number"
                            : "Office address"
                        }
                        value={interviewDetails.location}
                        onChange={(e) =>
                          setInterviewDetails({
                            ...interviewDetails,
                            location: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label className="form-label">Additional Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Add any additional information for the candidate..."
                        value={interviewDetails.notes}
                        onChange={(e) =>
                          setInterviewDetails({
                            ...interviewDetails,
                            notes: e.target.value,
                          })
                        }
                        disabled={isUpdating}
                      ></textarea>
                    </div>

                    <div className="col-12">
                      <div className="alert alert-info">
                        <i className="ti ti-info-circle me-2"></i>
                        <strong>Candidate Information:</strong>
                        <div className="mt-2">
                          <p className="mb-1">
                            <strong>Name:</strong> {candidateDetails?.userName}
                          </p>
                          <p className="mb-1">
                            <strong>Email:</strong>{" "}
                            {candidateDetails?.userEmail}
                          </p>
                          <p className="mb-0">
                            <strong>Phone:</strong>{" "}
                            {candidateDetails?.userMobile || "Not specified"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowInterviewModal(false)}
                    disabled={isUpdating}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleInterviewSchedule}
                    disabled={
                      isUpdating ||
                      !interviewDetails.date ||
                      !interviewDetails.time
                    }
                  >
                    {isUpdating ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Scheduling...
                      </>
                    ) : (
                      <>
                        <i className="ti ti-calendar-event me-1"></i>
                        Schedule Interview
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EmployerCandidatesDetails;