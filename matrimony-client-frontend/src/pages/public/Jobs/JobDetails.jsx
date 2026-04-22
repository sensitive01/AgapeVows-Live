import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bookmark, CheckCircle, Share2 } from "lucide-react";
import defaultLogo from "../../../../public/images/jobImage.jpg"
import DOMPurify from "dompurify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Get applicant ID from localStorage (assuming it's stored after login)
  const userData = JSON.parse(localStorage.getItem("userData"));
  const applicantId = userData?._id;

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.edprofio.com/employer/viewjobs/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }

        const data = await response.json();
        setJob(data);

        // Check if job is already saved by this applicant
        if (data.saved && applicantId) {
          const isJobSaved = data.saved.some(
            (save) => String(save.applicantId) === String(applicantId)
          );
          setIsSaved(isJobSaved);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, applicantId]);

  const handleSaveJob = async () => {
    if (!applicantId) {
      // Redirect to login if user is not logged in
      localStorage.setItem("redirectAfterLogin", `/job-details/${id}`);
      navigate("/login");
      return;
    }

    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetch(
        "https://api.edprofio.com/employer/toggleSaveJob",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            applicantId,
            jobId: id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to toggle save job");
      }

      const result = await response.json();
      setIsSaved(result.isSaved);

      // Show success message
      if (result.isSaved) {
        alert("Job saved successfully!");
      } else {
        alert("Job removed from saved jobs.");
      }
    } catch (err) {
      setSaveError(err.message);
      console.error("Error saving job:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewSavedJobs = () => {
    navigate("/saved-jobs");
  };

  const handleApplyNow = () => {
    if (!applicantId) {
      localStorage.setItem("redirectAfterLogin", `/apply/${job._id}`);
      navigate("/login");
      return;
    }
    navigate(`/apply/${job._id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading job details</h5>
        <p>{error}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
        <h4>Job not found</h4>
        <p className="text-muted">
          The job you're looking for doesn't exist or may have been removed
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Sub Visual of the page - Updated with better spacing and styling */}
      <div className="job-header-section">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="job-header-content">
                <h1 className="job-title-hero">{job.jobTitle}</h1>
                <div className="job-meta-info">
                  <span className="company-name">{job.companyName}</span>
                  <span className="location-info">
                    <i className="icon-map-pin"></i>
                    {job.isRemote ? "Remote" : job.location}
                    {job.isRemote && job.location ? ` (${job.location})` : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="main">
        {/* Jobs Details Section */}
        <section className="section section-job-details section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-100 pb-35 pb-md-50 pb-xl-100">
          <div className="container">
            <header className="job-details-header mb-30 mb-md-45 mb-lg-60">
              <ul className="post-meta">
                <li>{job.companyName}</li>
                <li>
                  <i className="icon icon-map-pin"></i>
                  <span className="text">
                    {job.isRemote ? "Remote" : job.location}
                    {job.isRemote && job.location ? ` (${job.location})` : ""}
                  </span>
                </li>
              </ul>
              <h2 className="job-title-secondary">{job.jobTitle}</h2>
              <div className="social-info">
                <strong className="title">Social Sharing:</strong>
                <ul className="social-networks">
                  <li>
                    <a className="bg-light-sky border border-none" href="#">
                      <i className="icon-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a className="bg-light-sky border border-none" href="#">
                      <i className="icon-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a className="bg-light-sky border border-none" href="#">
                      <i className="icon-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a className="bg-light-sky border border-none" href="#">
                      <i className="icon-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="utility-buttons">
                <button
                  onClick={handleSaveJob}
                  className="btn-tag"
                  disabled={isSaving}
                >
                  <Bookmark
                    className={isSaved ? "text-secondary" : "text-primary"}
                    size={20}
                    fill={isSaved ? "#6c757d" : "none"}
                  />
                  {isSaving ? "..." : ""}
                </button>
                <button className="btn-tag">
                  <Share2 className="text-primary" size={20} />
                </button>
                {isSaved && (
                  <button
                    onClick={handleViewSavedJobs}
                    className="btn btn-sm btn-outline-secondary ms-2"
                  >
                    View Saved Jobs
                  </button>
                )}
              </div>
              {saveError && (
                <div className="alert alert-danger mt-2">{saveError}</div>
              )}
            </header>

            <div className="row">
              <div className="col-12 col-md-7 col-xl-8">
                <div className="text-holder">
                  <h3 className="section-heading text-secondary">Overview</h3>
                  <div
                    className="rich-text-display"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        job.description || "No overview provided for this position."
                      ),
                    }}
                  />
                </div>

                <div className="text-holder">
                  <h3 className="section-heading text-secondary">
                    Job Description
                  </h3>
                  <div
                    className="rich-text-display"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(
                        job.description || "No detailed description provided."
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="col-12 col-md-5 col-xl-4 pt-35 pt-md-0">
                <div className="company-info-box bg-light-sky">
                  <div
                    className="company-info-head"
                    style={{ textAlign: "center" }}
                  >
                    <div className="company-logo">
                      <img
                        src={defaultLogo}
                        width="198"
                        height="198"
                        alt={job.companyName}
                      />
                      {job.employerProfilePic && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: "0px",
                            right: "0px",
                            width: "100%",
                            height: "100%",
                            borderRadius: "50%",
                            border: "3px solid white",
                            overflow: "hidden",
                            backgroundColor: "white",
                          }}
                        >
                          <img
                            src={job.employerProfilePic || defaultLogo}
                            width="50"
                            height="50"
                            alt="Employer"
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/images/default-profile-pic.jpg";
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="textbox">
                      <h4 className="company-name-heading text-secondary">
                        {job.companyName}
                      </h4>
                      <p>{job.category}</p>
                      {job.companyUrl && (
                        <p>
                          <a
                            href={
                              job.companyUrl.startsWith("http")
                                ? job.companyUrl
                                : `https://${job.companyUrl}`
                            }
                          >
                            {job.companyUrl}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="company-info-job">
                    <ul className="job-info-list">
                      <li>
                        <span className="text">Salary</span>
                        <span className="text">
                          ₹{job.salaryFrom} to ₹{job.salaryTo} /{" "}
                          {job.salaryType || "month"}
                        </span>
                      </li>
                      <li>
                        <span className="text">Experience</span>
                        <span className="text">
                          {job.experienceLevel || "Not specified"}
                        </span>
                      </li>
                      <li>
                        <span className="text">Job Type</span>
                        <span className="text">{job.jobType}</span>
                      </li>
                      <li>
                        <span className="text">Posted</span>
                        <span className="text">{job.applydatetime}</span>
                      </li>
                    </ul>
                    <a
                      onClick={handleApplyNow}
                      className="btn btn-secondary btn-sm"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="btn-text">
                        <CheckCircle className="text-primary" size={18} />{" "}
                        &nbsp; Apply Now
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-12 col-md-6 col-xl-6">
                <div className="text-holder">
                  <h3 className="section-heading text-secondary">
                    Skills Required
                  </h3>
                  <ul className="check-list">
                    {job.skills && job.skills.length > 0 ? (
                      job.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))
                    ) : (
                      <li>No specific skills listed</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="col-12 col-md-6 col-xl-6">
                <div className="text-holder">
                  <h3 className="section-heading text-secondary">Benefits</h3>
                  <p>{job.benefits || "No benefits information provided"}</p>
                </div>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-12 col-md-6 col-xl-6">
                <div className="text-holder">
                  <h3 className="section-heading text-secondary">
                    Application Instructions
                  </h3>
                  <p>
                    {job.applicationInstructions ||
                      "No specific instructions provided"}
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-xl-6">
                <div className="text-holder note-box bg-light-sky border border-none">
                  <h3 className="contact-heading text-secondary">
                    Contact Information:
                  </h3>
                  <hr />
                  <p style={{ textAlign: "justify" }}>
                    {job.contactEmail && (
                      <>
                        <strong>Email:</strong> {job.contactEmail}
                        <br />
                      </>
                    )}
                    {job.contactPhone && (
                      <>
                        <strong>Phone:</strong> {job.contactPhone}
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Job Header Section - Professional Clean Design */
        .job-header-section {
          background: #f8f9fa;
          border-bottom: 1px solid #dee2e6;
          margin-top: 90px; /* Space from navigation bar */
          padding: 40px 0;
          color: #333;
        }

        .job-header-content {
          position: relative;
        }

        .job-title-hero {
          font-size: 2.5rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #2c3e50;
          line-height: 1.2;
        }

        .job-meta-info {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 15px;
        }

        .company-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: #495057;
          background: #e9ecef;
          padding: 8px 16px;
          border-radius: 6px;
          border: 1px solid #ced4da;
        }

        .location-info {
          font-size: 1rem;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6c757d;
          background: #ffffff;
          padding: 8px 14px;
          border-radius: 6px;
          border: 1px solid #ced4da;
        }

        .location-info i {
          font-size: 1rem;
        }

        /* Company Logo - Professional */
        .company-logo {
          position: relative;
          margin: 0 auto;
          width: 198px;
          height: 198px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid #dee2e6;
          background: #fff;
        }

        .employer-profile-pic {
          transition: none;
        }

        /* Professional Section Titles */
        .job-title-secondary {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2c3e50 !important;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid #007bff;
        }

        /* Clean Section Headings */
        .section-heading {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 20px !important;
          color: #2c3e50 !important;
          padding-left: 0;
        }

        .section-heading::before {
          display: none;
        }

        /* Professional Company Info */
        .company-name-heading {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 10px !important;
          color: #2c3e50 !important;
        }

        /* Clean Contact Heading */
        .contact-heading {
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 15px !important;
          color: #495057 !important;
        }

        /* Simple Info Labels */
        .info-label {
          font-size: 0.95rem;
          font-weight: 600;
          color: #495057 !important;
        }

        /* Clean Company Info Box */
        .company-info-box {
          border-radius: 8px;
          border: 1px solid #dee2e6;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        /* Responsive Design - Clean and Professional */
        @media (max-width: 768px) {
          .job-header-section {
            margin-top: 80px;
            padding: 30px 0;
          }

          .job-title-hero {
            font-size: 2rem;
          }
          
          .job-title-secondary {
            font-size: 1.5rem;
          }
          
          .section-heading {
            font-size: 1.3rem;
          }

          .job-meta-info {
            gap: 15px;
          }

          .company-name {
            font-size: 1rem;
          }

          .location-info {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .job-header-section {
            margin-top: 70px;
            padding: 25px 0;
          }

          .job-title-hero {
            font-size: 1.8rem;
          }
          
          .job-title-secondary {
            font-size: 1.4rem;
          }
          
          .section-heading {
            font-size: 1.2rem;
          }

          .job-meta-info {
            flex-direction: column;
            gap: 10px;
          }

          .company-name, .location-info {
            font-size: 0.95rem;
          }
        }

        /* Remove fancy transitions */
        * {
          transition: none;
        }
      `}</style>
    </>
  );
};

export default JobDetails;
