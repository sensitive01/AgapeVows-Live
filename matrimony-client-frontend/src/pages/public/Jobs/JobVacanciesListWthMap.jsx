import React, { useState, useEffect } from "react";
import JobsFilter from "./JobsFilter";
import Jobsbreadcrumb from "./Jobsbreadcrumb";
import { Filter, Search, X, Bookmark, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import defaultEmployeeAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-20.jpg";

const JobVacanciesListWthMap = () => {
  const [allJobListings, setAllJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(7);
  const [currentView, setCurrentView] = useState("list"); // Added for view state
  const [filterOptions, setFilterOptions] = useState({
    jobTypes: [],
    locations: [],
    experienceLevels: [],
    categories: [],
    specializations: [],
  });
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    experienceLevel: "",
    category: "",
    searchQuery: "",
    sort: "",
    salaryFrom: "",
    salaryTo: "",
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchjobs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setAllJobListings(data);
        setFilteredJobListings(data);

        // Extract filter options from data
        const uniqueJobTypes = [
          ...new Set(data.map((job) => job.jobType)),
        ].filter(Boolean);
        const uniqueLocations = [
          ...new Set(
            data.flatMap((job) => (job.isRemote ? ["Remote"] : [job.location]))
          ),
        ].filter(Boolean);
        const uniqueExperienceLevels = [
          ...new Set(data.map((job) => job.experienceLevel)),
        ].filter(Boolean);
        const uniqueCategories = [
          ...new Set(data.map((job) => job.category)),
        ].filter(Boolean);
        const uniqueSpecializations = [
          ...new Set(data.map((job) => job.category)),
        ].filter(Boolean);

        setFilterOptions({
          jobTypes: uniqueJobTypes,
          locations: uniqueLocations,
          experienceLevels: uniqueExperienceLevels,
          categories: uniqueCategories,
          specializations: uniqueSpecializations,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredJobs = [...allJobListings];

      // Apply search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filteredJobs = filteredJobs.filter((job) => {
          const jobTitle = job.jobTitle?.toLowerCase() || "";
          const companyName = job.companyName?.toLowerCase() || "";
          const category = job.category?.toLowerCase() || "";
          const skillsRequired = job.skills?.join(" ")?.toLowerCase() || "";

          return (
            jobTitle.includes(query) ||
            companyName.includes(query) ||
            category.includes(query) ||
            skillsRequired.includes(query)
          );
        });
      }

      // Apply other filters
      if (filters.jobType) {
        filteredJobs = filteredJobs.filter(
          (job) => job.jobType === filters.jobType
        );
      }
      if (filters.location) {
        if (filters.location === "Remote") {
          filteredJobs = filteredJobs.filter((job) => job.isRemote);
        } else {
          filteredJobs = filteredJobs.filter(
            (job) => job.location === filters.location
          );
        }
      }
      if (filters.experienceLevel) {
        filteredJobs = filteredJobs.filter(
          (job) => job.experienceLevel === filters.experienceLevel
        );
      }
      if (filters.category) {
        filteredJobs = filteredJobs.filter(
          (job) => job.category === filters.category
        );
      }

      // Apply sorting
      if (filters.sort) {
        filteredJobs = [...filteredJobs].sort((a, b) => {
          switch (filters.sort) {
            case "newest":
              return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
            case "oldest":
              return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
            case "salary-high":
              return (b.salaryTo || 0) - (a.salaryTo || 0);
            case "salary-low":
              return (a.salaryFrom || 0) - (b.salaryFrom || 0);
            default:
              return 0;
          }
        });
      }

      // Apply salary range filter
      if (filters.salaryFrom || filters.salaryTo) {
        filteredJobs = filteredJobs.filter((job) => {
          const salaryFrom = job.salaryFrom || 0;
          const salaryTo = job.salaryTo || Infinity;
          return (
            (!filters.salaryFrom || salaryFrom >= filters.salaryFrom) &&
            (!filters.salaryTo || salaryTo <= filters.salaryTo)
          );
        });
      }

      setFilteredJobListings(filteredJobs);
      setCurrentPage(1);
    };

    if (allJobListings.length > 0) {
      applyFilters();
    }
  }, [filters, allJobListings]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery,
    }));
  };

  const clearFilters = () => {
    setFilters({
      jobType: "",
      location: "",
      experienceLevel: "",
      searchQuery: "",
      sort: "",
      category: "",
      salaryFrom: "",
      salaryTo: "",
    });
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
      searchInput.value = "";
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setShowFilters(false);
  };

  const handleBreadcrumbFilter = ({ keyword, location }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: keyword || "",
      location: location || "",
    }));
  };

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobListings.slice(
    indexOfFirstJob,
    indexOfLastJob
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading jobs</h5>
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

  return (
    <>
      <Jobsbreadcrumb onFilterChange={handleBreadcrumbFilter} />

      {/* Main Content */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pb-35 pb-lg-0 pt-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-7 pt-35 pt-md-50 pt-lg-75 pb-35 pb-md-50 pb-xl-75">
                {/* Page subheader */}
                <header className="page-subheader mb-30 mb-md-40 d-xxl-flex align-items-center justify-content-between">
                  <h3 className="h6 mb-25 mb-xxl-0 text-secondary">
                    {filteredJobListings.length} jobs found
                  </h3>
                  <div className="subhead-filters d-xxl-flex align-items-center justify-content-between">
                    <div className="subhead-filters-item">
                      <div style={{ marginLeft: "10px" }}>
                        <select
                          name="sort"
                          className="form-select"
                          value={filters.sort}
                          onChange={handleFilterChange}
                        >
                          <option value="">Sort by</option>
                          <option value="newest">Newest</option>
                          <option value="oldest">Oldest</option>
                          <option value="salary-high">Salary High</option>
                          <option value="salary-low">Salary Low</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid-buttons">
                      <a
                        href="job-vacancies-list-with-map"
                        className={`btn btn-list ${
                          currentView === "list" ? "active" : ""
                        }`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentView("list");
                          // Add navigation logic here if needed
                        }}
                        style={{
                          backgroundColor:
                            currentView === "list" ? "white" : "#f8f9fa",
                          border: "1px solid #dee2e6",
                          color: currentView === "list" ? "#495057" : "#6c757d",
                          boxShadow:
                            currentView === "list"
                              ? "0 2px 8px rgba(0,0,0,0.15)"
                              : "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src="/images/list-icon.svg"
                          width="20"
                          height="20"
                          alt="List"
                        />
                      </a>
                      <a
                        href="job-vacancies-grid-with-map"
                        className={`btn btn-grid ${
                          currentView === "grid" ? "active" : ""
                        }`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentView("grid");
                          // Add navigation logic here if needed
                        }}
                        style={{
                          backgroundColor:
                            currentView === "grid" ? "white" : "#f8f9fa",
                          border: "1px solid #dee2e6",
                          color: currentView === "grid" ? "#495057" : "#6c757d",
                          boxShadow:
                            currentView === "grid"
                              ? "0 2px 8px rgba(0,0,0,0.15)"
                              : "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "4px",
                        }}
                      >
                        <img
                          src="/images/grid-icon.svg"
                          width="22"
                          height="22"
                          alt="Grid"
                        />
                      </a>
                      <button
                        className="btn btn-filters filters-opener"
                        type="button"
                        onClick={() => setShowFilters(true)}
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #dee2e6",
                          color: "#6c757d",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "4px",
                        }}
                      >
                        <Filter size={18} />
                      </button>
                      <a
                        href="job-vacancies-list"
                        className={`btn btn-map ${
                          currentView === "map" ? "active" : ""
                        }`}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentView("map");
                          // Add navigation logic here if needed
                        }}
                        style={{
                          backgroundColor:
                            currentView === "map" ? "white" : "#f8f9fa",
                          border: "1px solid #dee2e6",
                          color: currentView === "map" ? "#495057" : "#6c757d",
                          boxShadow:
                            currentView === "map"
                              ? "0 2px 8px rgba(0,0,0,0.15)"
                              : "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          transition: "all 0.2s ease",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginLeft: "4px",
                        }}
                      >
                        <img
                          src="/images/icons8-place-marker.gif"
                          width="22"
                          height="22"
                          alt="Map View"
                        />
                      </a>
                    </div>
                  </div>
                </header>

                <form onSubmit={handleSearch} className="mb-4">
                  <div className="input-group">
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      placeholder="Search jobs..."
                      defaultValue={filters.searchQuery}
                    />
                    <button className="btn btn-primary" type="submit">
                      <Search size={18} />
                    </button>
                    {(filters.jobType ||
                      filters.location ||
                      filters.experienceLevel ||
                      filters.category) && (
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={clearFilters}
                      >
                        <X size={18} />
                      </button>
                    )}
                  </div>
                </form>

                <div className="row justify-content-center">
                  {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                      <div key={job._id} className="col-12 mb-40 mb-md-40">
                        <JobCard job={job} navigate={navigate} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <img
                        src={defaultEmployeeAvatar}
                        alt="No jobs found"
                        width="150"
                        className="mb-3"
                      />
                      <h4>No jobs found matching your criteria</h4>
                      <p className="text-muted">
                        Try adjusting your search filters
                      </p>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={clearFilters}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </div>

                {/* Pagination Block */}
                {filteredJobListings.length > jobsPerPage && (
                  <div className="pagination-block pt-20 pt-lg-30 pt-xl-50 pb-0">
                    <div className="container d-flex align-items-center justify-content-center">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <i className="icon-arrow-left1"></i>
                          </button>
                        </li>
                        {[
                          ...Array(
                            Math.ceil(filteredJobListings.length / jobsPerPage)
                          ).keys(),
                        ].map((number) => (
                          <li
                            key={number + 1}
                            className={`page-item ${
                              currentPage === number + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(number + 1)}
                            >
                              {number + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage ===
                            Math.ceil(filteredJobListings.length / jobsPerPage)
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={
                              currentPage ===
                              Math.ceil(
                                filteredJobListings.length / jobsPerPage
                              )
                            }
                          >
                            <i className="icon-arrow-right"></i>
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              <div className="col-12 col-lg-5">
                <div className="aside-map">
                  <div
                    id="map"
                    style={{
                      height: "100%",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="text-center">
                      <img
                        src="/images/map-placeholder.png"
                        alt="Map view"
                        style={{ maxWidth: "100%" }}
                      />
                      <p className="mt-3">Map view will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Filter Sidebar */}
      {showFilters && (
        <div className="filter-overlay" onClick={() => setShowFilters(false)}>
          <div
            className="filter-container"
            onClick={(e) => e.stopPropagation()}
          >
            <JobsFilter
              filterOptions={filterOptions}
              currentFilters={filters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}

      {/* Enhanced CSS */}
      <style jsx>{`
        .filter-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          display: flex;
          justify-content: flex-start;
        }
        .filter-container {
          height: 100%;
          overflow-y: auto;
          background: white;
          width: 350px;
          padding: 20px;
        }
        .aside-map {
          position: sticky;
          top: 0;
          height: 100vh;
          overflow: hidden;
        }
        .grid-buttons {
          display: flex;
          gap: 0;
        }
        .grid-buttons .btn:hover {
          background-color: white !important;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .grid-buttons .btn.active {
          background-color: white !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          border-color: #007bff !important;
        }
      `}</style>
    </>
  );
};

// Job Card Component
const JobCard = ({ job, navigate }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  // Get applicant ID from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const applicantId = userData?._id;

  useEffect(() => {
    // Check if job is already saved by this applicant
    if (job.saved && applicantId) {
      const isJobSaved = job.saved.some(
        (save) => String(save.applicantId) === String(applicantId)
      );
      setIsSaved(isJobSaved);
    }
  }, [job.saved, applicantId]);

  const handleSaveJob = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!applicantId) {
      // Redirect to login if user is not logged in
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
            jobId: job._id,
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

  return (
    <article className="popular-jobs-box">
      <div className="box-holder border border-grey shadow">
        <div className="job-info shadow">
          <div className="img-holder" style={{ position: "relative" }}>
            <img
              src={job.companyLogo || "/images/default-company-logo.jpg"}
              width="78"
              height="78"
              alt={job.companyName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-company-logo.jpg";
              }}
              style={{ borderRadius: "8px" }}
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
                  zIndex: 1,
                }}
              >
                <img
                  src={job.employerProfilePic}
                  width="40"
                  height="40"
                  alt="Employer"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/default-profile-pic.jpg";
                  }}
                />
              </div>
            )}
          </div>
          <div className="textbox">
            <button
              onClick={handleSaveJob}
              className="btn-bookmark"
              disabled={isSaving}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <Bookmark
                className={isSaved ? "text-secondary" : "text-primary"}
                size={20}
                fill={isSaved ? "#6c757d" : "none"}
              />
            </button>
            <h3 className="h5 mb-0">{job.jobTitle}</h3>
            <ul className="meta-list">
              <li>
                <span className="text">{job.companyName}</span>
              </li>
              <li>
                <i className="icon-map-pin"></i>
                <span className="text">
                  {job.isRemote ? "Remote" : job.location}
                  {job.isRemote && job.location ? ` (${job.location})` : ""}
                </span>
              </li>
            </ul>
            <ul className="tags-list">
              <li>
                <span className="tag">{job.jobType}</span>
              </li>
              <li>
                <span className="tag">{job.experienceLevel}</span>
              </li>
              {job.isRemote && (
                <li>
                  <span className="tag">Remote</span>
                </li>
              )}
              {job.category && (
                <li>
                  <span className="tag">{job.category}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <footer className="jobs-foot">
          <strong className="amount">
            ₹{job.salaryFrom || "NA"} to ₹{job.salaryTo || "NA"}
            <span>/{job.salaryType || "month"}</span>
          </strong>
          <a href={`/job-details/${job._id}`} className="btn btn-green btn-sm">
            <span className="btn-text">
              <CheckCircle className="text-primary" size={18} /> &nbsp; Apply
              Now
            </span>
          </a>
        </footer>
        {saveError && (
          <div className="alert alert-danger mt-2">{saveError}</div>
        )}
      </div>
    </article>
  );
};

export default JobVacanciesListWthMap;
