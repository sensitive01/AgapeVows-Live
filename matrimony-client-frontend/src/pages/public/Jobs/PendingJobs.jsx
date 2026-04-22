import React, { useState, useEffect } from "react";
import {
  FaCog,
  FaChevronRight,
  FaClock,
  FaArrowLeft,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import Sidebar from "../../../../src/components/layout/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";
import jobImage from "../../../../public/images/jobImage.jpg";

const PendingJobs = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pendingJobs, setPendingJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 9;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const fetchPendingJobs = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData || !userData._id) {
          setPendingJobs([]);
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://api.edprofio.com/applicant/${userData._id}`
        );

        if (response.data) {
          // Filter for pending jobs (status: "pending" or "applied")
          const filtered = response.data.filter(
            (job) => job.status === "pending" || job.status === "applied" || !job.status
          );
          setPendingJobs(filtered);
        } else {
          setPendingJobs([]);
        }
      } catch (err) {
        if (err.response?.data?.message === "No applied jobs found") {
          setPendingJobs([]);
        } else {
          console.error("Error fetching pending jobs:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Failed to fetch pending jobs"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPendingJobs();
  }, []);

  // Calculate pagination values
  const totalJobs = pendingJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = pendingJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        if (totalPages > 4) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        if (totalPages > 4) {
          pageNumbers.push("...");
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>
              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

              <div className="jobplugin__settings-content">
                <div className="jobplugin__settings-head">
                  <h2 className="h5">Pending Jobs</h2>
                  <span className="jobplugin__settings-head__bar jobplugin__bg-warning"></span>
                  <p className="jobplugin__settings-head__text">
                    Jobs awaiting employer review
                  </p>
                  {totalJobs > 0 && (
                    <p className="text-muted small">
                      Showing {indexOfFirstJob + 1}-
                      {Math.min(indexOfLastJob, totalJobs)} of {totalJobs}{" "}
                      pending jobs
                    </p>
                  )}
                </div>

                {error ? (
                  <div className="alert alert-warning">{error}</div>
                ) : pendingJobs.length > 0 ? (
                  <>
                    <div className="row justify-content-center">
                      {currentJobs.map((job) => (
                        <div
                          key={job._id}
                          className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                        >
                          <article className="featured-category-box border border-warning pt-20">
                            <span className="tag bg-warning text-dark">
                              {job.jobType || "Full Time"}
                            </span>
                            <div className="img-holder">
                              <img
                                src={job.companyLogo || jobImage}
                                width="78"
                                height="78"
                                alt={job.companyName}
                                onError={(e) => {
                                  e.target.src = jobImage;
                                }}
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
                                    border: "2px solid white",
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                  }}
                                >
                                  <img
                                    src={job.employerProfilePic || jobImage}
                                    width="40"
                                    height="40"
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
                              <strong className="h6 mb-0">
                                {job.companyName}
                              </strong>
                              <address className="location pt-0">
                                <IoLocationOutline className="icon icon-map-pin" />
                                <span className="text">
                                  {job.location || "Location not specified"}
                                </span>
                              </address>
                              <strong className="h6 text-warning mb-0">
                                {job.title || "Job Title"}
                              </strong>
                              <span className="subtitle">
                                {job.subject || "Subject"}
                              </span>
                              <hr />
                              <div className="job-info">
                                <span className="amount">
                                  <strong>
                                    {job.salary
                                      ? `₹${job.salary.min || "0"} - ₹${
                                          job.salary.max || "0"
                                        }`
                                      : "Salary not specified"}
                                  </strong>
                                  /month
                                </span>
                                <span className="subtext">
                                  <b className="text-warning">Applied:</b>{" "}
                                  {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <Link
                                to={`/job-details/${job._id}`}
                                className="btn btn-warning btn-sm"
                              >
                                <span className="btn-text">
                                  <FaClock className="text-dark me-1" />
                                  View Details
                                  <FaChevronRight className="icon-chevron-right" />
                                </span>
                              </Link>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                        <div className="container d-flex align-items-center justify-content-center">
                          <ul className="pagination">
                            <li
                              className={`page-item ${
                                currentPage === 1 ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage - 1);
                                }}
                              >
                                <FaArrowLeft className="icon-arrow-left1" />
                              </a>
                            </li>

                            {getPageNumbers().map((pageNum, index) =>
                              pageNum === "..." ? (
                                <li
                                  key={`ellipsis-${index}`}
                                  className="page-item disabled"
                                >
                                  <span className="page-link">...</span>
                                </li>
                              ) : (
                                <li
                                  key={pageNum}
                                  className={`page-item ${
                                    currentPage === pageNum ? "active" : ""
                                  }`}
                                >
                                  <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePageChange(pageNum);
                                    }}
                                  >
                                    {pageNum}
                                  </a>
                                </li>
                              )
                            )}

                            <li
                              className={`page-item ${
                                currentPage === totalPages ? "disabled" : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handlePageChange(currentPage + 1);
                                }}
                              >
                                <FaArrowRight className="icon-arrow-right" />
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="empty-state text-center py-5 px-3">
                    <div className="empty-state-icon mb-4">
                      <FaClock size={80} className="text-warning" />
                    </div>
                    <h3 className="text-secondary mb-3">No Pending Jobs</h3>
                    <p className="text-muted mb-4 px-md-5 mx-md-5">
                      You don't have any pending job applications at the moment.
                      Keep applying to new opportunities!
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                      <Link to="/jobs" className="btn btn-warning">
                        <FaSearch className="me-2" />
                        Browse Jobs
                      </Link>
                      <Link to="/applied-jobs" className="btn btn-outline-secondary">
                        View All Applications
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <style>
        {`
        .img-holder {
          position: relative;
          width: 78px;
          height: 78px;
          margin: 0 auto 15px;
        }

        .employer-profile-pic {
          transition: all 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .employer-profile-pic:hover {
          transform: scale(1.1);
        }

        .pagination .page-link {
          cursor: pointer;
        }

        .pagination .page-item.disabled .page-link {
          cursor: not-allowed;
        }

        .border-warning {
          border-color: #ffc107 !important;
        }

        .featured-category-box:hover {
          border-color: #ffb300 !important;
          box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
        }
        `}
      </style>
    </>
  );
};

export default PendingJobs;