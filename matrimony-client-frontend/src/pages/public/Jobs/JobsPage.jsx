import React, { useState, useEffect } from "react";
import Jobsbreadcrumb from "./Jobsbreadcrumb";
import { Search } from "lucide-react";
import JobsFilter from "./JobsFilter";
import { useLocation, useNavigate, Link } from "react-router-dom";
import defaultEmployeeAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-20.jpg";
import jobImage from "../../../../public/images/jobImage.jpg";

const JobsPage = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const location = useLocation();
  const [allJobListings, setAllJobListings] = useState([]);
  const [filteredJobListings, setFilteredJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
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
          `${VITE_BASE_URL}/employer/fetchjobs`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setAllJobListings(data);

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

        // Extract unique values for subfilters from your actual job data
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

        setError(null);
      } catch (err) {
        setError(err.message);
        setAllJobListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredJobs = [...allJobListings];

      if (filters.category) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.category &&
            job.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

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

      if (filters.location) {
        if (filters.location === "Remote") {
          filteredJobs = filteredJobs.filter((job) => job.isRemote);
        } else {
          filteredJobs = filteredJobs.filter(
            (job) => job.location === filters.location
          );
        }
      }

      if (filters.jobType) {
        filteredJobs = filteredJobs.filter(
          (job) => job.jobType === filters.jobType
        );
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

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobListings.slice(
    indexOfFirstJob,
    indexOfLastJob
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const SkeletonLoader = () => {
    return (
      <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-15 mb-md-30">
        <div
          className="featured-category-box pt-20"
          style={{
            height: "400px",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(90deg, #f5f5f5 25%, #e0e0e0 50%, #f5f5f5 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.5s infinite",
            }}
          ></div>
        </div>
      </div>
    );
  };

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

  const handleBreadcrumbFilter = ({ keyword, location }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchQuery: keyword || "",
      location: location || "",
    }));
  };

  const handleApplyFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setShowFilters(false);
  };

  return (
    <>
      <Jobsbreadcrumb
        onFilterChange={handleBreadcrumbFilter}
        initialKeyword={filters.searchQuery}
        initialLocation={filters.location}
      />

      {/* Subfilter Bar - Moved to blue background area */}
      {/* <section
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
      </section> */}

      <main className="main">
        {showFilters && (
          <div className="filter-sidebar-overlay">
            <JobsFilter
              filterOptions={filterOptions}
              currentFilters={filters}
              onApplyFilters={handleApplyFilters}
              onClose={() => setShowFilters(false)}
            />
            <div
              className="filter-sidebar-backdrop"
              onClick={() => setShowFilters(false)}
            />
          </div>
        )}

        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <header className="page-subheader mb-30 mb-md-40">
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="job-count">
                      {loading ? (
                        <div
                          style={{
                            width: "150px",
                            height: "24px",
                            backgroundColor: "#e0e0e0",
                            borderRadius: "4px",
                          }}
                        ></div>
                      ) : (
                        <h2
                          className="h6 mb-0 text-dark"
                          style={{
                            letterSpacing: "1px",
                            fontSize: "1.25rem",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <b>
                            {filters.category
                              ? `${filteredJobListings.length} ${filters.category} Jobs Found`
                              : `${filteredJobListings.length} Jobs Found`}
                          </b>
                        </h2>
                      )}
                    </div>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                      <div className="d-flex gap-2">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => setShowFilters(!showFilters)}
                        >
                          <Search size={16} className="me-1" /> Filter Jobs
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={clearFilters}
                          disabled={
                            !filters.jobType &&
                            !filters.location &&
                            !filters.experienceLevel &&
                            !filters.searchQuery &&
                            !filters.sort
                          }
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>

                      <div
                        className="sort-dropdown"
                        style={{ minWidth: "120px" }}
                      >
                        <select
                          name="sort"
                          className="form-select form-select-sm"
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

                      <div className="view-toggle-buttons d-flex gap-1">
                        <Link
                          to="/job-vacancies-list"
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "36px" }}
                          title="List View"
                        >
                          <img
                            src="/images/list-icon.svg"
                            width="18"
                            height="18"
                            alt="List"
                          />
                        </Link>
                        <Link
                          to="/job-vacancies"
                          className="btn btn-primary btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "36px" }}
                          title="Grid View"
                        >
                          <img
                            src="/images/grid-icon.svg"
                            width="18"
                            height="18"
                            alt="Grid"
                            style={{ color: "white" }}
                          />
                        </Link>
                        <Link
                          to="/job-vacancies-map"
                          className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center"
                          style={{ width: "40px", height: "36px" }}
                          title="Map View"
                        >
                          <img
                            src="/images/icons8-place-marker.gif"
                            width="18"
                            height="18"
                            alt="Map"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </header>

                <div className="row justify-content-center">
                  {loading ? (
                    Array(jobsPerPage)
                      .fill(0)
                      .map((_, index) => <SkeletonLoader key={index} />)
                  ) : currentJobs.length > 0 ? (
                    currentJobs.map((job, index) => (
                      <div
                        key={job._id || index}
                        className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-15 mb-md-30"
                      >
                        <JobCard
                          id={job._id}
                          postedTime={new Date(
                            job.createdAt
                          ).toLocaleDateString()}
                          companyLogo={
                            job.companyLogo ||
                            "/images/default-company-logo.jpg"
                          }
                          companyName={job.companyName}
                          location={job.location}
                          jobTitle={job.jobTitle}
                          subject={job.category}
                          salary={`₹ ${job.salaryFrom || "NA"} to ₹ ${
                            job.salaryTo || "NA"
                          }`}
                          jobType={job.jobType}
                          isRemote={job.isRemote}
                          experienceLevel={job.experienceLevel}
                          employerProfilePic={job.employerProfilePic}
                        />
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

                {!loading && filteredJobListings.length > jobsPerPage && (
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

        <section className="section section-theme-1 section-downloads pt-35 pt-md-60 pb-50 pb-md-75 pb-lg-75 pb-xl-110 pb-xxl-140">
          <br />
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-40 mb-lg-50">
              <h2 className="text-secondary">Download our mobile app</h2>
              <br />
              <p>
                Search through millions of jobs and find your right fit.
                <br />
                Install the app and apply now.
              </p>
            </header>
            <hr />
            <br />
            <div className="app-buttons">
              <a className="btn-app btn-play-store" href="#">
                <div className="store-icon">
                  <img
                    src="/images/icon-play-store.png"
                    width="28"
                    height="30"
                    alt="Google Play"
                  />
                </div>
                <div className="btn-text">
                  Download From <span>Google Play</span>
                </div>
              </a>
              <a className="btn-app btn-app-store" href="#">
                <div className="store-icon">
                  <img
                    src="/images/icon-app-store.png"
                    width="32"
                    height="38"
                    alt="App Store"
                  />
                </div>
                <div className="btn-text">
                  Download From <span>App Store</span>
                </div>
              </a>
            </div>
            <div className="icon ico01">
              <img src="/images/ico-app01.png" alt="Image Description" />
            </div>
            <div className="icon ico02">
              <img src="/images/ico-app02.png" alt="Image Description" />
            </div>
            <div className="icon ico03">
              <img src="/images/ico-app03.png" alt="Image Description" />
            </div>
            <div className="icon ico04">
              <img src="/images/ico-app04.png" alt="Image Description" />
            </div>
          </div>
        </section>
      </main>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .img-holder {
          position: relative;
          margin-bottom: 20px;
        }
        
        .btn-primary img {
          filter: brightness(0) invert(1);
        }

        .employer-profile-pic {
          transition: all 0.3s ease;
        }

        .employer-profile-pic:hover {
          transform: scale(1.1);
        }

        .filter-sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1000;
          display: flex;
        }

        .filter-sidebar-backdrop {
          flex: 1;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .custom-filters {
          width: 320px;
          height: 100vh;
          background: white;
          overflow-y: auto;
          padding: 20px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 1001;
        }

        .featured-category-box {
          position: relative;
          cursor: pointer;
        }

        .job-card-link:hover ~ .textbox .btn-dark-yellow,
        .job-card-link:focus ~ .textbox .btn-dark-yellow {
          background-color: #ffc107;
          border-color: #ffc107;
          color: #000;
        }

        .btn-dark-yellow {
          pointer-events: auto;
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
          .page-subheader .d-flex {
            flex-direction: column;
            align-items: stretch !important;
          }
          
          .job-count {
            text-align: center;
            margin-bottom: 1rem;
          }
          
          .view-toggle-buttons {
            justify-content: center;
          }

          .subfilter-section {
            padding: 10px 0;
          }
        }

        @media (max-width: 768px) {
          .custom-filters {
            width: 280px;
          }
          
          .page-subheader .d-flex > div:last-child {
            justify-content: center;
          }
          
          .sort-dropdown {
            min-width: 100px !important;
          }

          .subfilter-section .form-select-sm {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .page-subheader .d-flex > div:last-child {
            flex-direction: column;
            gap: 1rem !important;
          }
          
          .view-toggle-buttons {
            order: -1;
          }

          .subfilter-section .row {
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
};

const JobCard = ({
  id,
  postedTime,
  companyLogo,
  companyName,
  location,
  jobTitle,
  subject,
  salary,
  jobType,
  isRemote,
  experienceLevel,
  employerProfilePic,
}) => {
  const navigate = useNavigate();

  const handleJobClick = (e) => {
    e.preventDefault();
    navigate(`/job-details/${id}`);
  };

  return (
    <article className="featured-category-box pt-20">
      <div
        onClick={handleJobClick}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          cursor: "pointer",
        }}
        aria-label={`View details for ${jobTitle} position at ${companyName}`}
      />

      <span className="tag">
        <b className="text-primary">Posted:</b> {postedTime}
      </span>
      <div className="img-holder">
        <img
          src={jobImage}
          width="78"
          height="78"
          alt={companyName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = jobImage;
          }}
        />

        {employerProfilePic && (
          <div
            className="employer-profile-pic"
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
              src={employerProfilePic}
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
        <strong className="h6 mb-0">{companyName}</strong>
        <address className="location pt-0">
          <i className="icon icon-map-pin"></i>
          <span className="text">
            {isRemote ? "Remote" : location}
            {isRemote && location ? ` (${location})` : ""}
          </span>
        </address>
        <strong className="h6 text-primary mb-0">{jobTitle}</strong>
        <span className="subtitle">{subject}</span>
        {experienceLevel && (
          <span className="d-block small text-muted mt-1">
            <i className="fas fa-briefcase me-1"></i> {experienceLevel}
          </span>
        )}
        <hr />
        <div className="job-info">
          <span className="amount">
            <strong>{salary}</strong>/month
          </span>
          <span className="subtext">
            <b className="text-primary">Job Type:</b> {jobType}
          </span>
        </div>
        <button
          onClick={handleJobClick}
          className="btn btn-dark-yellow btn-sm"
          style={{ position: "relative", zIndex: 2 }}
        >
          <span className="btn-text">
            <span className="text">
              <i className="fa fa-check-circle text-secondary"></i> &nbsp; Apply
              Now
            </span>
            <i className="icon-chevron-right"></i>
          </span>
        </button>
      </div>
    </article>
  );
};

export default JobsPage;
