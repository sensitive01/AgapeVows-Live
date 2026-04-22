import React, { useState, useEffect } from "react";
import Jobsbreadcrumb from "./Jobsbreadcrumb";
import JobsFilter from "./JobsFilter";
import { Filter, Search, X, Bookmark, CheckCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import defaultEmployeeAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-20.jpg";
import jobImage from "../../../../public/images/jobImage.jpg";

const JobsPageList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [allJobListings, setAllJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  
  const [filterOptions, setFilterOptions] = useState({
    jobTypes: [],
    locations: [],
    experienceLevels: [],
    categories: [],
    specializations: [],
    instituteTypes: [],
    subcategories: [],
    levelExamTypes: [],
    roles: [],
    subjects: [],
    nonAcademicTypes: [],
  });

  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    experienceLevel: "",
    category: "",
    searchQuery: "",
    sort: "",
    salaryFrom: "",
    salaryTo: "",
    instituteType: "",
    subcategory: "",
    levelExamType: "",
    role: "",
    subject: "",
    nonAcademicType: "",
  });

  // Handle URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword") || "";
    const locationParam = searchParams.get("location") || "";
    const categoryParam = searchParams.get("category") || "";

    setFilters((prev) => ({
      ...prev,
      searchQuery: keyword,
      location: locationParam,
      category: categoryParam,
    }));
  }, [location.search]);

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

        // Extract subfilter options
        const uniqueInstituteTypes = [
          ...new Set(data.map((job) => job.instituteType)),
        ].filter(Boolean);
        const uniqueSubcategories = [
          ...new Set(data.map((job) => job.subcategory)),
        ].filter(Boolean);
        const uniqueLevelExamTypes = [
          ...new Set(data.map((job) => job.levelExamType)),
        ].filter(Boolean);
        const uniqueRoles = [...new Set(data.map((job) => job.role))].filter(
          Boolean
        );
        const uniqueSubjects = [
          ...new Set(data.map((job) => job.subject)),
        ].filter(Boolean);
        const uniqueNonAcademicTypes = [
          ...new Set(data.map((job) => job.nonAcademicType)),
        ].filter(Boolean);

        setFilterOptions({
          jobTypes: uniqueJobTypes,
          locations: uniqueLocations,
          experienceLevels: uniqueExperienceLevels,
          categories: uniqueCategories,
          specializations: uniqueSpecializations,
          instituteTypes:
            uniqueInstituteTypes.length > 0
              ? uniqueInstituteTypes
              : ["School", "College", "University", "Institute"],
          subcategories:
            uniqueSubcategories.length > 0
              ? uniqueSubcategories
              : ["Primary", "Secondary", "Higher Secondary"],
          levelExamTypes:
            uniqueLevelExamTypes.length > 0
              ? uniqueLevelExamTypes
              : ["Grade 1-5", "Grade 6-10", "Grade 11-12"],
          roles:
            uniqueRoles.length > 0
              ? uniqueRoles
              : ["Teacher", "Principal", "Coordinator", "Administrator"],
          subjects:
            uniqueSubjects.length > 0
              ? uniqueSubjects
              : ["Mathematics", "Science", "English", "History"],
          nonAcademicTypes:
            uniqueNonAcademicTypes.length > 0
              ? uniqueNonAcademicTypes
              : ["Sports", "Arts", "Music", "Dance"],
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

      // Apply category filter
      if (filters.category) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.category &&
            job.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

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

      // Apply subfilters
      if (filters.instituteType) {
        filteredJobs = filteredJobs.filter(
          (job) => job.instituteType === filters.instituteType
        );
      }
      if (filters.subcategory) {
        filteredJobs = filteredJobs.filter(
          (job) => job.subcategory === filters.subcategory
        );
      }
      if (filters.levelExamType) {
        filteredJobs = filteredJobs.filter(
          (job) => job.levelExamType === filters.levelExamType
        );
      }
      if (filters.role) {
        filteredJobs = filteredJobs.filter((job) => job.role === filters.role);
      }
      if (filters.subject) {
        filteredJobs = filteredJobs.filter(
          (job) => job.subject === filters.subject
        );
      }
      if (filters.nonAcademicType) {
        filteredJobs = filteredJobs.filter(
          (job) => job.nonAcademicType === filters.nonAcademicType
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
      instituteType: "",
      subcategory: "",
      levelExamType: "",
      role: "",
      subject: "",
      nonAcademicType: "",
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

      {/* Subfilter Bar - Added below breadcrumb */}
      <section
        className="subfilter-section"
        style={{
          backgroundColor: "#063970",
          padding: "19px 0 20px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-2 justify-content-center flex-nowrap">
            <div className="col-auto">
              <select
                name="jobType"
                className="form-select form-select-sm subfilter-select"
                value={filters.jobType}
                onChange={handleFilterChange}
                style={{ minWidth: "140px" }}
              >
                <option value="">Job Type</option>
                {filterOptions.jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="instituteType"
                className="form-select form-select-sm subfilter-select"
                value={filters.instituteType}
                onChange={handleFilterChange}
                style={{ minWidth: "160px" }}
              >
                <option value="">Institute Type</option>
                {filterOptions.instituteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="subcategory"
                className="form-select form-select-sm subfilter-select"
                value={filters.subcategory}
                onChange={handleFilterChange}
                style={{ minWidth: "140px" }}
              >
                <option value="">Subcategory</option>
                {filterOptions.subcategories.map((subcat) => (
                  <option key={subcat} value={subcat}>
                    {subcat}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="levelExamType"
                className="form-select form-select-sm subfilter-select"
                value={filters.levelExamType}
                onChange={handleFilterChange}
                style={{ minWidth: "180px" }}
              >
                <option value="">Level/Exam Type</option>
                {filterOptions.levelExamTypes.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="role"
                className="form-select form-select-sm subfilter-select"
                value={filters.role}
                onChange={handleFilterChange}
                style={{ minWidth: "120px" }}
              >
                <option value="">Role</option>
                {filterOptions.roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="subject"
                className="form-select form-select-sm subfilter-select"
                value={filters.subject}
                onChange={handleFilterChange}
                style={{ minWidth: "120px" }}
              >
                <option value="">Subject</option>
                {filterOptions.subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <select
                name="nonAcademicType"
                className="form-select form-select-sm subfilter-select"
                value={filters.nonAcademicType}
                onChange={handleFilterChange}
                style={{ minWidth: "210px" }}
              >
                <option value="">Non Academic Type</option>
                {filterOptions.nonAcademicTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-sm"
                onClick={clearFilters}
                disabled={
                  !filters.jobType &&
                  !filters.instituteType &&
                  !filters.subcategory &&
                  !filters.levelExamType &&
                  !filters.role &&
                  !filters.subject &&
                  !filters.nonAcademicType &&
                  !filters.location &&
                  !filters.experienceLevel &&
                  !filters.searchQuery &&
                  !filters.sort
                }
                style={{
                  backgroundColor: "white",
                  color: "#063970",
                  fontWeight: "500",
                  fontSize: "0.875rem",
                  padding: "0.375rem 1rem",
                  border: "2px solid white",
                  borderRadius: "0.25rem",
                  minWidth: "80px",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = "#063970";
                    e.currentTarget.style.color = "white";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = "#063970";
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Page subheader */}
                <header className="page-subheader mb-30 mb-md-40 d-xxl-flex align-items-center justify-content-between">
                  <h3 className="h6 mb-25 mb-xxl-0 text-secondary">
                    {filters.category
                      ? `${filteredJobListings.length} ${filters.category} Jobs Found`
                      : `${filteredJobListings.length} Jobs Found`}
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
                        href="job-vacancies-list"
                        className="btn btn-list active"
                        type="button"
                      >
                        <img
                          src="/images/list-icon.svg"
                          width="20"
                          height="20"
                          alt="List"
                        />
                      </a>
                      <a
                        href="job-vacancies"
                        className="btn btn-grid bg-light"
                        type="button"
                      >
                        <img
                          src="/images/grid-icon.svg"
                          width="22"
                          height="22"
                          alt="Grid"
                        />
                      </a>
                      <button
                        className="btn btn-filters filters-opener bg-light"
                        type="button"
                        onClick={() => setShowFilters(true)}
                      >
                        <Filter size={18} />
                      </button>
                      <a
                        href="job-vacancies-map"
                        className="btn btn-grid"
                        type="button"
                      >
                        <img
                          src="/images/icons8-place-marker.gif"
                          width="22"
                          height="22"
                          alt="Grid"
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
                      <h4>
                        {filters.category
                          ? `No ${filters.category} jobs found matching your criteria`
                          : "No jobs found matching your criteria"}
                      </h4>
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

      {/* Add CSS styles */}
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
        }

        .subfilter-section .subfilter-select {
          font-size: 0.875rem;
          padding: 0.5rem 2rem 0.5rem 0.75rem;
          border: 1px solid #e0e0e0;
          border-radius: 0.375rem;
          background-color: white;
          color: #333;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .subfilter-section .subfilter-select:focus {
          border-color: #4a90e2;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(74, 144, 226, 0.25);
        }

        .subfilter-section .btn-link:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 1400px) {
          .subfilter-section .row {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 5px;
          }
          
          .subfilter-section .col-auto {
            flex: 0 0 auto;
          }
        }

        @media (max-width: 991px) {
          .subfilter-section {
            padding: 10px 0;
          }
        }

        @media (max-width: 768px) {
          .subfilter-section .form-select-sm {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .subfilter-section .row {
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

// Job Card Component remains the same
const JobCard = ({ job, navigate }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const applicantId = userData?._id;

  useEffect(() => {
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
          <div
            className="img-holder"
            style={{ position: "relative", width: "78px", height: "78px" }}
          >
            <img
              src={jobImage}
              width="78"
              height="78"
              alt={job.companyName}
              style={{
                borderRadius: "8px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/default-company-logo.jpg";
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
                  zIndex: 1,
                }}
              >
                <img
                  src={job.employerProfilePic}
                  alt="Employer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
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

export default JobsPageList;