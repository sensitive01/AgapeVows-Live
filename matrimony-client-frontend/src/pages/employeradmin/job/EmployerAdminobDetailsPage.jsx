import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import appleIcon from "../../../assets/employer-admin/assets/img/icons/apple.svg";
import reactIcon from "../../../assets/employer-admin/assets/img/icons/react.svg";
import phpIcon from "../../../assets/employer-admin/assets/img/icons/php.svg";
import jobBg01 from "../../../assets/employer-admin/assets/img/bg/job-bg-01.png";
import jobBg02 from "../../../assets/employer-admin/assets/img/bg/job-bg-02.png";
import jobBg03 from "../../../assets/employer-admin/assets/img/bg/job-bg-03.png";
import jobBg04 from "../../../assets/employer-admin/assets/img/bg/job-bg-04.png";
import socialIcons from "../../../assets/employer-admin/assets/img/social/social-01.svg";
import socialIcons1 from "../../../assets/employer-admin/assets/img/social/social-02.svg";
import socialIcons2 from "../../../assets/employer-admin/assets/img/social/social-03.svg";
import socialIcons3 from "../../../assets/employer-admin/assets/img/social/social-04.svg";
import socialIcons4 from "../../../assets/employer-admin/assets/img/social/social-05.svg";
import socialIcons5 from "../../../assets/employer-admin/assets/img/social/social-06.svg";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import DOMPurify from "dompurify";

const EmployerAdminobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favoriteStatus, setfavoriteStatus] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return isNaN(date)
      ? "Invalid Date"
      : date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
  };

  const toggleFavorite = async (applicantId) => {
    try {
      const newFavoriteStatus = !favoriteStatus;
      const response = await axios.put(
        `https://api.edprofio.com/employer/updatefavorite/${id}/${applicantId}`,
        { favourite: newFavoriteStatus },
        {
          header: {
            Authorization: `Bearer ${localStorage.getItem(
              "EmployerAdminToken"
            )}`,
          },
        }
      );
      if (response.data.success) {
        setfavoriteStatus(newFavoriteStatus);
        const updatedJob = { ...job };
        const application = updatedJob.applications.find(
          (app) => app.applicantId === applicantId
        );
        if (application) {
          application.favourite = newFavoriteStatus;
          setJob(updatedJob);
        }
      }
    } catch (err) {
      console.error("Error updating favorite status:", err);
      setError(
        err.response?.data?.message || "Failed to update favorite status"
      );
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const EmployerAdminData = JSON.parse(
          localStorage.getItem("EmployerAdminData")
        );

        if (!EmployerAdminData || !EmployerAdminData._id) {
          throw new Error("Employer not authenticated");
        }

        const response = await axios.get(
          `https://api.edprofio.com/employer/viewjobs/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "EmployerAdminToken"
              )}`,
            },
          }
        );

        if (!response.data) {
          throw new Error("No job data received");
        }

        setJob(response.data);
        if (
          response.data.applications &&
          response.data.applications.length > 0
        ) {
          setfavoriteStatus(response.data.applications[0].favourite || false);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch job details"
        );
        console.error("Error fetching job details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedJobs = async () => {
      try {
        const EmployerAdminData = JSON.parse(
          localStorage.getItem("EmployerAdminData")
        );

        if (!EmployerAdminData || !EmployerAdminData._id) {
          return;
        }

        const response = await axios.get(
          `https://api.edprofio.com/employer/fetchjob/${EmployerAdminData._id}`
        );

        if (response.data && response.data.length > 0) {
          // Filter out the current job and limit to 4 related jobs
          const filtered = response.data
            .filter((j) => j._id !== id)
            .slice(0, 4)
            .map((job) => ({
              id: job._id,
              title: job.jobTitle,
              applicants: job.applications?.length || 0,
              location: job.location,
              salary: `${job.salaryFrom || "N/A"} - ${job.salaryTo || "N/A"} ${job.salaryType || ""
                }`,
              experience: job.experienceLevel || "Not specified",
              type: job.jobType || "Not specified",
              postedDate: formatDate(job.createdAt),
              icon: job.employerProfilePic || "default.svg",
              isRemote: job.isRemote || false,
            }));

          setRelatedJobs(filtered);
        }
      } catch (err) {
        console.error("Error fetching related jobs:", err);
      }
    };

    if (id) {
      fetchJobDetails();
      fetchRelatedJobs();
    } else {
      setError("Job ID is missing");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger">
        {error}
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="alert alert-warning">
        Job not found
        <button className="btn btn-link" onClick={() => navigate(-1)}>
          Go back
        </button>
      </div>
    );
  }

  const firstApplicantId =
    job.applications && job.applications.length > 0
      ? job.applications[0].applicantId
      : null;

  return (
    <>
      <EmployerAdminHeader />
      <div className="job-wrapper">
        <div className="breadcrumb position-relative bg-secondary py-5">
          <div className="my-5"></div>
          <div className="breadcrumb-bg">
            <span>
              <img src={jobBg01} className="job-bg-01" alt="Background" />
            </span>
            <span>
              <img src={jobBg02} className="job-bg-02" alt="Background" />
            </span>
            <span>
              <img src={jobBg03} className="job-bg-03" alt="Background" />
            </span>
            <span>
              <img src={jobBg04} className="job-bg-04" alt="Background" />
            </span>
          </div>
        </div>

        <h6 className="fw-medium d-flex align-items-center">
          <Link to="/employer/post-jobs">
            &nbsp; <i className="ti ti-arrow-left me-2"></i>Back to Jobs
          </Link>
        </h6>

        <div className="content px-0">
          <div className="container">
            {/* Job Header Card */}
            <div className="card card-translate-top">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-xl-9 col-md-8">
                    <div className="d-flex align-items-center mb-3">
                      <a href="#" className="me-2">
                        <span className="avatar avatar-lg bg-gray">
                          <img
                            src={job.employerProfilePic || appleIcon}
                            className="w-auto h-auto"
                            alt="Company"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = appleIcon;
                            }}
                          />
                        </span>
                      </a>
                      <div>
                        <h2 className="fw-medium mb-1 text-truncate text-primary">
                          {job.jobTitle}
                        </h2>
                        <p className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
                          <i className="ti ti-user-check text-primary me-2"></i>
                          {job.applications?.length || 0} Applicants
                        </p>
                        <p className="text-dark d-inline-flex align-items-center mb-0">
                          <i className="ti ti-briefcase text-primary me-2"></i>
                          Posted {formatDate(job.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-4">
                    <div className="d-flex align-items-center justify-content-end mb-3">
                      <p className="mb-0 me-3">Application End Date</p>
                      <span className="badge bg-primary-transparent">
                        {formatDate(job.deadline)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row align-items-center">
                  <div className="col-xl-6 col-md-6">
                    <div className="d-flex align-items-center flex-wrap row-gap-2">
                      <p className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
                        <i className="ti ti-map-pin-check text-primary me-2"></i>
                        {job.location} {job.isRemote && "(Remote)"}
                      </p>
                      <p className="text-dark d-inline-flex align-items-center mb-0 me-2 pe-2 border-end">
                        <i className="ti ti-currency-rupee text-primary me-2"></i>
                        {job.salaryFrom} - {job.salaryTo} {job.salaryType}
                      </p>
                      <p className="text-dark d-inline-flex align-items-center">
                        <i className="ti ti-briefcase text-primary me-2"></i>
                        {job.experienceLevel}
                      </p>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-6">
                    <div className="d-flex align-items-center justify-content-end">
                      <button
                        className="btn btn-secondary flex-fill me-2"
                        onClick={toggleModal}
                      >
                        <i className="ti ti-user-check"></i> Apply for a
                        Candidate
                      </button>
                      <Link
                        to={`/employer-admin/shortlisted-candidate-byjob/${id}`}
                        className="btn btn-primary flex-fill me-2"
                      >
                        <i className="ti ti-circle-check"></i> Shortlisted
                        Candidates
                      </Link>

                      {firstApplicantId && (
                        <button
                          className={`btn btn-icon ${favoriteStatus
                              ? "bg-warning text-white"
                              : "bg-transparent-dark text-primary"
                            }`}
                          onClick={() => toggleFavorite(firstApplicantId)}
                        >
                          <i className="ti ti-star"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Main Content */}
              <div className="col-lg-8">
                {/* Job Overview */}
                <div className="card">
                  <div className="card-body">
                    <div className="border-bottom pb-3 mb-3">
                      <h4 className="text-primary">Job Overview</h4>
                    </div>
                    <div className="row gy-4">
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-map-pin fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Location</h6>
                            <p>
                              {job.location} {job.isRemote && "(Remote)"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-book fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Job Type</h6>
                            <p>{job.jobType}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-clock fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Experience Level</h6>
                            <p>{job.experienceLevel}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-calendar fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Date Posted</h6>
                            <p>{formatDate(job.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-calendar-due fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Expiration Date</h6>
                            <p>{formatDate(job.deadline)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-school fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Education Level</h6>
                            <p>{job.educationLevel}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-3 col-md-4 col-sm-6">
                        <div className="d-flex align-items-center">
                          <span className="avatar avatar-lg bg-primary-transparent border border-primary flex-shrink-0 me-2">
                            <i className="ti ti-users fs-24"></i>
                          </span>
                          <div>
                            <h6 className="mb-1 fw-medium">Open Positions</h6>
                            <p>{job.openings}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Job Description */}
                <div className="card">
                  <div className="card-body">
                    <div className="border-bottom pb-3 mb-3">
                      <h4 className="text-primary">Job Description</h4>
                    </div>
                    <div
                      className="rich-text-display"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(job.description || ""),
                      }}
                    />
                  </div>
                </div>

                {/* Requirements */}
                {job.skills && job.skills.length > 0 && (
                  <div className="card">
                    <div className="card-body">
                      <div className="border-bottom pb-3 mb-3">
                        <h4 className="text-primary">Requirements</h4>
                      </div>
                      <ul>
                        {job.skills.map((skill, index) => (
                          <li
                            key={index}
                            className="d-flex align-items-center mb-2"
                          >
                            <img
                              src={
                                index % 3 === 0
                                  ? appleIcon
                                  : index % 3 === 1
                                    ? phpIcon
                                    : reactIcon
                              }
                              className="me-1"
                              alt="Icon"
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Benefits */}
                {job.benefits && (
                  <div className="card">
                    <div className="card-body">
                      <div className="border-bottom pb-3 mb-3">
                        <h4 className="text-primary">Benefits</h4>
                      </div>
                      <div
                        className="rich-text-display"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(job.benefits || ""),
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Share Job */}
                <div className="d-flex align-items-center mb-4">
                  <h5 className="text-primary me-3">Share this job</h5>
                  <div className="d-flex align-items-center">
                    <a href="#" className="btn border btn-white me-2">
                      <img src={socialIcons} alt="Social" />
                    </a>
                    <a href="#" class="btn border btn-white me-2">
                      <img src={socialIcons1} alt="Social" />
                    </a>
                    <a href="#" class="btn border btn-white me-2">
                      <img src={socialIcons2} alt="Social" />
                    </a>
                    <a href="#" class="btn border btn-white me-2">
                      <img src={socialIcons3} alt="Social" />
                    </a>
                    <a href="#" class="btn border btn-white me-2">
                      <img src={socialIcons4} alt="Social" />
                    </a>
                    <a href="#" class="btn border btn-white me-2">
                      <img src={socialIcons5} alt="Social" />
                    </a>
                    {/* Add other social icons similarly */}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-lg-4 theiaStickySidebar">
                {/* School Overview */}
                <div className="card">
                  <div className="card-body">
                    <div className="border-bottom pb-3 mb-3">
                      <h4 className="text-primary">Company Overview</h4>
                    </div>
                    <div className="card bg-light mb-3">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center">
                          <a href="#" className="me-2">
                            <span className="avatar avatar-lg bg-gray-100">
                              <img
                                src={job.employerProfilePic || appleIcon}
                                className="w-auto h-auto"
                                alt="Company"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = appleIcon;
                                }}
                              />
                            </span>
                          </a>
                          <div>
                            <h6 className="fw-medium mb-1 text-truncate">
                              <a href="#">{job.companyName}</a>
                            </h6>
                            {job.companyUrl && (
                              <a
                                href={job.companyUrl}
                                className="text-info"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {job.companyUrl}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Contact</span>
                        <p className="text-gray-7">{job.employerName}</p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Phone</span>
                        <p className="text-gray-7">
                          {job.contactPhone || "Not provided"}
                        </p>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Email</span>
                        <a
                          href={`mailto:${job.contactEmail}`}
                          className="text-info"
                        >
                          {job.contactEmail || "Not provided"}
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Location</span>
                        <p className="text-gray-7">{job.location}</p>
                      </div>

                      <hr className="border border-bottom border-grey" />

                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span>Social media</span>
                        <div className="icons-social d-flex align-items-center">
                          <a
                            href="#"
                            className="avatar avatar-rounded avatar-sm me-1"
                          >
                            <i className="ti ti-mail text-danger"></i>
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-rounded avatar-sm me-1"
                          >
                            <i className="ti ti-phone-call text-success"></i>
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-rounded avatar-sm me-1"
                          >
                            <i className="ti ti-message-2"></i>
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-rounded avatar-sm me-1"
                          >
                            <i className="ti ti-brand-skype text-info"></i>
                          </a>
                          <a
                            href="#"
                            className="avatar avatar-rounded avatar-sm"
                          >
                            <i className="ti ti-brand-facebook text-info"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {relatedJobs.length > 0 && (
              <>
                <hr />
                <br />

                {/* Related Jobs */}
                <h4 className="mb-3 text-primary">
                  Related Jobs <i className="ti ti-arrow-right"></i>
                </h4>
                <div className="row">
                  {relatedJobs.map((relatedJob) => (
                    <div
                      key={relatedJob.id}
                      className="col-xxl-3 col-lg-4 col-md-6"
                    >
                      <div className="card">
                        <div className="card-body">
                          <div className="card bg-light">
                            <div className="card-body p-3">
                              <div className="d-flex align-items-center">
                                <a href="#" className="me-2">
                                  <span className="avatar avatar-lg bg-gray border border-white">
                                    <img
                                      src={relatedJob.icon || appleIcon}
                                      className="w-auto h-auto"
                                      alt="Job"
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = appleIcon;
                                      }}
                                    />
                                  </span>
                                </a>
                                <div>
                                  <h6 className="fw-medium mb-1 text-truncate">
                                    <Link
                                      to={`/employer/post-jobs/${relatedJob.id}`}
                                    >
                                      {relatedJob.title}
                                    </Link>
                                  </h6>
                                  <p className="fs-12 text-gray fw-normal">
                                    {relatedJob.applicants} Applicants
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="d-flex flex-column mb-3">
                            <p className="text-dark d-inline-flex align-items-center mb-2">
                              <i className="ti ti-map-pin-check text-primary me-2"></i>
                              {relatedJob.location}{" "}
                              {relatedJob.isRemote && "(Remote)"}
                            </p>
                            <p className="text-dark d-inline-flex align-items-center mb-2">
                              <i className="ti ti-currency-rupee text-primary me-2"></i>
                              {relatedJob.salary}
                            </p>
                            <p className="text-dark d-inline-flex align-items-center">
                              <i className="ti ti-briefcase text-primary me-2"></i>
                              {relatedJob.experience}
                            </p>
                          </div>

                          <div className="mb-3">
                            <span className="badge badge-pink-transparent me-1">
                              {relatedJob.type}
                            </span>
                            <span className="badge bg-secondary-transparent">
                              Experience
                            </span>
                          </div>

                          <div className="progress progress-xs mb-2">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: "30%" }}
                            ></div>
                          </div>

                          <div>
                            <p className="fs-12 text-gray fw-normal">
                              10 of {relatedJob.applicants} filled
                            </p>
                          </div>

                          <div className="d-flex align-items-center justify-content-between border-top pt-3 mt-3">
                            <p className="d-inline-flex align-items-center text-gray-9 mb-0">
                              <i className="ti ti-clock me-1"></i>
                              {relatedJob.postedDate}
                            </p>
                            <div>
                              <button
                                className="btn btn-secondary"
                                onClick={toggleModal}
                              >
                                Post Again
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Apply Job Modal */}
        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="apply_job"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4>Add Candidate Details</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={toggleModal}
                    aria-label="Close"
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>

                <form action="">
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the candidate name"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contact Number</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter the candidate contact number"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter the candidate email id"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Other Notes</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Enter other details..."
                      ></textarea>
                    </div>
                    <div>
                      <label className="form-label">Upload Candidate CV</label>
                      <input
                        type="file"
                        className="form-control"
                        id="cv_upload"
                      />
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={toggleModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal Backdrop */}
        {showModal && <div className="modal-backdrop fade show"></div>}
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default EmployerAdminobDetailsPage;
