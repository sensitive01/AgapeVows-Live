import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaCheckCircle,
  FaChevronRight,
  FaStar,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import defaultEmployeeAvatar from "../../assets/employer-admin/assets/img/profiles/avatar-12.jpg";
import JobsFilter from "./Jobs/JobsFilter";
import { Search } from "lucide-react";

const CombinedJobsPage = () => {
  // State for filters (from PremiumAdvancedSearch)
  const [category, setCategory] = useState("All Categories");
  const [keyAttributes, setKeyAttributes] = useState({
    communicationSkills: false,
    excel: false,
  });
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 100000 });
  const [joiningTime, setJoiningTime] = useState("Any time");
  const [talentQuality, setTalentQuality] = useState({
    topRatedPlus: false,
    topRated: false,
    risingTalent: false,
  });
  const [englishLevel, setEnglishLevel] = useState("Any level");
  const [rating, setRating] = useState("Any rating");
  const [locationFilter, setLocationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Newest Jobs");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // State for accordions
  const [openAccordions, setOpenAccordions] = useState({
    category: true,
    keyAttributes: false,
    salary: false,
    joining: false,
    talentDetails: false,
  });

  // State for jobs data (from JobsPage)
  const locationHook = useLocation();
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
  });
  const [filterOptions, setFilterOptions] = useState({
    jobTypes: [],
    locations: [],
    experienceLevels: [],
    categories: [],
    specializations: [],
  });

  // Calculate counts for filter options
  const calculateCounts = (data) => {
    const counts = {
      categories: {},
      jobTypes: {},
      locations: {},
      experienceLevels: {},
      skills: {},
      englishLevels: {
        "Any level": data.length,
        Basic: 0,
        Conversational: 0,
        Fluent: 0,
        "Native or bilingual": 0,
      },
      ratings: {
        "Any rating": data.length,
        "4 stars": 0,
        "3 stars": 0,
        "2 stars": 0,
      },
      joiningTimes: {
        "Any time": data.length,
        Immediate: 0,
        "Less than 7 days": 0,
        "Less than 21 days": 0,
      },
    };

    data.forEach((job) => {
      // Count categories
      counts.categories[job.category] =
        (counts.categories[job.category] || 0) + 1;

      // Count job types
      counts.jobTypes[job.jobType] = (counts.jobTypes[job.jobType] || 0) + 1;

      // Count locations
      const location = job.isRemote ? "Remote" : job.location;
      counts.locations[location] = (counts.locations[location] || 0) + 1;

      // Count experience levels
      counts.experienceLevels[job.experienceLevel] =
        (counts.experienceLevels[job.experienceLevel] || 0) + 1;

      // Count skills
      if (job.skills) {
        job.skills.forEach((skill) => {
          counts.skills[skill] = (counts.skills[skill] || 0) + 1;
        });
      }
    });

    return counts;
  };

  // Handle filter changes (from PremiumAdvancedSearch)
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFilters({
      ...filters,
      category: e.target.value === "All Categories" ? "" : e.target.value,
    });
  };

  const handleKeyAttributeChange = (attr) =>
    setKeyAttributes({ ...keyAttributes, [attr]: !keyAttributes[attr] });

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setSalaryRange({ ...salaryRange, [name]: parseInt(value) });
    setFilters({
      ...filters,
      salaryFrom: name === "min" ? parseInt(value) : filters.salaryFrom,
      salaryTo: name === "max" ? parseInt(value) : filters.salaryTo,
    });
  };

  const handleJoiningTimeChange = (e) => setJoiningTime(e.target.value);
  const handleTalentQualityChange = (quality) =>
    setTalentQuality({ ...talentQuality, [quality]: !talentQuality[quality] });
  const handleEnglishLevelChange = (e) => setEnglishLevel(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);
  const handleLocationFilterChange = (e) => {
    setLocationFilter(e.target.value);
    setFilters({ ...filters, location: e.target.value });
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setFilters({ ...filters, searchQuery: e.target.value });
  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setFilters({
      ...filters,
      sort: e.target.value.toLowerCase().replace(" ", "-"),
    });
  };
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Accordion toggle handler
  const toggleAccordion = (accordionKey) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [accordionKey]: !prev[accordionKey],
    }));
  };

  // Apply filters (from PremiumAdvancedSearch)
  const applyFilters = (e) => {
    e.preventDefault();
    // Filter logic is already handled by the useEffect that watches the filters state
    setSidebarOpen(false);
  };

  // Clear filters (from PremiumAdvancedSearch)
  const clearFilters = (e) => {
    e.preventDefault();
    setCategory("All Categories");
    setKeyAttributes({ communicationSkills: false, excel: false });
    setSalaryRange({ min: 0, max: 100000 });
    setJoiningTime("Any time");
    setTalentQuality({
      topRatedPlus: false,
      topRated: false,
      risingTalent: false,
    });
    setEnglishLevel("Any level");
    setRating("Any rating");
    setLocationFilter("");
    setSearchQuery("");
    setSortBy("Newest Jobs");
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
  };

  // Jobs data fetching and filtering (from JobsPage)
  useEffect(() => {
    // Parse URL parameters
    const searchParams = new URLSearchParams(locationHook.search);
    const keyword = searchParams.get("keyword") || "";
    const locationParam = searchParams.get("location") || "";
    const categoryParam = searchParams.get("category") || "";

    // Initialize filters with URL parameters
    setFilters((prev) => ({
      ...prev,
      searchQuery: keyword,
      location: locationParam,
      category: categoryParam,
    }));
    setSearchQuery(keyword);
    setLocationFilter(locationParam);
    setCategory(categoryParam || "All Categories");
  }, [locationHook.search]);

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

        // Calculate counts for filter options
        const counts = calculateCounts(data);

        // Set filter options
        setFilterOptions({
          jobTypes: Object.keys(counts.jobTypes).filter(Boolean),
          locations: Object.keys(counts.locations).filter(Boolean),
          experienceLevels: Object.keys(counts.experienceLevels).filter(
            Boolean
          ),
          categories: Object.keys(counts.categories).filter(Boolean),
          specializations: Object.keys(counts.categories).filter(Boolean),
          counts, // Include counts for display
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

      // Apply category filter first (from URL parameter)
      if (filters.category) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.category &&
            job.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      // Then apply other filters
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

      // Apply location filter
      if (filters.location) {
        if (filters.location === "Remote") {
          filteredJobs = filteredJobs.filter((job) => job.isRemote);
        } else {
          filteredJobs = filteredJobs.filter(
            (job) => job.location === filters.location
          );
        }
      }

      // Apply other filters
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

  const clearAllFilters = () => {
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
    setCategory("All Categories");
    setSearchQuery("");
    setLocationFilter("");
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

  // Get counts for display
  const counts = filterOptions.counts || {
    categories: {},
    jobTypes: {},
    locations: {},
    experienceLevels: {},
    englishLevels: {},
    ratings: {},
    joiningTimes: {},
  };

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Careers @ EdProfio</h1>
                <p>job duties, job responsibilities, and skills required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="jobplugin__main">
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
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Image Description" />
          </div>
          <div className="jobplugin__container">
            {/* Main Head */}
            <div className="jobplugin__main-head">
              {/* Breadcrumbs */}
              <ul className="jobplugin__breadcrumbs">
                <li className="jobplugin__breadcrumbs-home">
                  <a className="hover:jobplugin__text-primary" href="#">
                    <span className="rj-icon rj-home"></span>
                  </a>
                </li>
                <li>
                  <a className="hover:jobplugin__text-primary" href="#">
                    Jobs
                  </a>
                </li>
                <li>Search</li>
              </ul>
            </div>

            {/* Page Search Form */}
            <div className="jobplugin__search">
              <input
                className="form-control"
                type="search"
                placeholder="Search jobs"
                name="search"
                onChange={handleSearchChange}
                value={searchQuery}
              />
              <button className="jobplugin__search-btn bg-primary hover:bg-secondary">
                <FaSearch className="rj-icon rj-search" />
              </button>
            </div>

            {/* Results Block */}
            <div className="jobplugin__results">
              {/* Results Aside - Filters */}
              <aside
                className={`jobplugin__results-aside ${
                  sidebarOpen ? "open" : ""
                }`}
              >
                {/* Results Aside Header */}
                <div className="jobplugin__results-aside__header">
                  <h2 className="h5 jobplugin__text-secondary">Filters</h2>
                  <button
                    className="jobplugin__results-aside__opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                    type="button"
                    onClick={toggleSidebar}
                  >
                    <span className="jobplugin__results-aside__opener-bar"></span>
                    <span className="jobplugin__results-aside__opener-overlay"></span>
                  </button>
                </div>

                {/* Results Aside Holder */}
                <div className="jobplugin__results-aside__holder">
                  {/* Results Aside Close */}
                  <button
                    type="button"
                    className="jobplugin__results-aside__close"
                    onClick={toggleSidebar}
                  >
                    <span className="jobplugin__bg-primary"></span>
                    <span className="jobplugin__bg-primary"></span>
                  </button>

                  <form onSubmit={applyFilters}>
                    {/* Category Filter */}
                    <div
                      className={`jobplugin__results-aside__box ${
                        openAccordions.category ? "active" : ""
                      }`}
                    >
                      <div
                        className="jobplugin__results-aside__head"
                        onClick={() => toggleAccordion("category")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 className="h6">Category</h2>
                        <span
                          className={`jobplugin__results-aside__button ${
                            openAccordions.category ? "open" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion("category");
                          }}
                          style={{
                            display: "inline-block",
                            width: "20px",
                            // height: '20px',
                            position: "relative",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "10px",
                              height: "2px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "2px",
                              height: "10px",
                              backgroundColor: "#333",
                              // transform: 'translate(-50%, -50%)',
                              transition: "transform 0.3s ease",
                              transform: openAccordions.category
                                ? "translate(-50%, -50%) rotate(90deg)"
                                : "translate(-50%, -50%) rotate(0deg)",
                            }}
                          ></span>
                        </span>
                      </div>
                      {openAccordions.category && (
                        <div
                          className="jobplugin__results-aside__drop"
                          style={{ padding: "15px 0" }}
                        >
                          <div className="jobplugin__results-aside__row">
                            <ul className="jobplugin__results-aside__list">
                              <li>
                                <label className="jobplugin__form-radio">
                                  <input
                                    type="radio"
                                    name="group01"
                                    checked={category === "All Categories"}
                                    onChange={handleCategoryChange}
                                    value="All Categories"
                                  />
                                  <span className="jobplugin__form-radio__btn"></span>
                                  <span className="label-text">
                                    All Categories ({allJobListings.length})
                                  </span>
                                </label>
                              </li>
                              {Object.entries(counts.categories).map(
                                ([cat, count]) => (
                                  <li key={cat}>
                                    <label className="jobplugin__form-radio">
                                      <input
                                        type="radio"
                                        name="group01"
                                        checked={category === cat}
                                        onChange={handleCategoryChange}
                                        value={cat}
                                      />
                                      <span className="jobplugin__form-radio__btn"></span>
                                      <span className="label-text">
                                        {cat} ({count})
                                      </span>
                                    </label>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Key Attributes Filter */}
                    <div
                      className={`jobplugin__results-aside__box ${
                        openAccordions.keyAttributes ? "active" : ""
                      }`}
                    >
                      <div
                        className="jobplugin__results-aside__head"
                        onClick={() => toggleAccordion("keyAttributes")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 className="h6">Key Attributes</h2>
                        <span
                          className={`jobplugin__results-aside__button ${
                            openAccordions.keyAttributes ? "open" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion("keyAttributes");
                          }}
                          style={{
                            display: "inline-block",
                            width: "20px",
                            // height: '20px',
                            position: "relative",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "10px",
                              height: "2px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "2px",
                              height: "10px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                              transition: "transform 0.3s ease",
                              transform: openAccordions.keyAttributes
                                ? "translate(-50%, -50%) rotate(90deg)"
                                : "translate(-50%, -50%) rotate(0deg)",
                            }}
                          ></span>
                        </span>
                      </div>
                      {openAccordions.keyAttributes && (
                        <div
                          className="jobplugin__results-aside__drop"
                          style={{ padding: "15px 0" }}
                        >
                          <div className="jobplugin__results-aside__row">
                            <strong className="jobplugin__results-aside__row-title">
                              Skills
                            </strong>
                            <ul className="jobplugin__results-aside__list">
                              {Object.entries(counts.skills || {})
                                .slice(0, 5)
                                .map(([skill, count]) => (
                                  <li key={skill}>
                                    <label className="jobplugin__form-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={keyAttributes[skill] || false}
                                        onChange={() =>
                                          handleKeyAttributeChange(skill)
                                        }
                                      />
                                      <span className="jobplugin__form-checkbox__btn"></span>
                                      <span className="label-text">
                                        {skill} ({count})
                                      </span>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Salary Filter */}
                    <div
                      className={`jobplugin__results-aside__box ${
                        openAccordions.salary ? "active" : ""
                      }`}
                    >
                      <div
                        className="jobplugin__results-aside__head"
                        onClick={() => toggleAccordion("salary")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 className="h6">Salary</h2>
                        <span
                          className={`jobplugin__results-aside__button ${
                            openAccordions.salary ? "open" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion("salary");
                          }}
                          style={{
                            display: "inline-block",
                            width: "20px",
                            // height: '20px',
                            position: "relative",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "10px",
                              height: "2px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "2px",
                              height: "10px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                              transition: "transform 0.3s ease",
                              transform: openAccordions.salary
                                ? "translate(-50%, -50%) rotate(90deg)"
                                : "translate(-50%, -50%) rotate(0deg)",
                            }}
                          ></span>
                        </span>
                      </div>
                      {openAccordions.salary && (
                        <div
                          className="jobplugin__results-aside__drop"
                          style={{ padding: "15px 0" }}
                        >
                          <div className="jobplugin__results-aside__row">
                            <strong className="jobplugin__results-aside__row-title">
                              Select range
                            </strong>
                            <div className="jobplugin__results-aside__rangebox">
                              <div className="jobplugin__results-aside__range-values">
                                <div className="jobplugin__results-aside__range-price">
                                  ₹{" "}
                                  <span id="min-amount">{salaryRange.min}</span>
                                </div>
                                <div className="jobplugin__results-aside__range-price">
                                  ₹{" "}
                                  <span id="max-amount">{salaryRange.max}</span>
                                </div>
                              </div>
                              <div className="jobplugin__results-aside__range">
                                <input
                                  type="range"
                                  min="0"
                                  max="100000"
                                  step="1000"
                                  value={salaryRange.min}
                                  onChange={(e) =>
                                    setSalaryRange({
                                      ...salaryRange,
                                      min: parseInt(e.target.value),
                                    })
                                  }
                                />
                                <input
                                  type="range"
                                  min="0"
                                  max="100000"
                                  step="1000"
                                  value={salaryRange.max}
                                  onChange={(e) =>
                                    setSalaryRange({
                                      ...salaryRange,
                                      max: parseInt(e.target.value),
                                    })
                                  }
                                />
                              </div>
                              <div className="jobplugin__results-aside__range-fields">
                                <div className="jobplugin__results-aside__range-field">
                                  <span className="jobplugin__results-aside__range-label">
                                    Min
                                  </span>
                                  <div className="jobplugin__results-aside__range-fieldwrap">
                                    <span className="jobplugin__results-aside__range-type jobplugin__text-primary">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      name="min"
                                      value={salaryRange.min}
                                      onChange={handleSalaryChange}
                                    />
                                  </div>
                                </div>
                                <div className="jobplugin__results-aside__range-field">
                                  <span className="jobplugin__results-aside__range-label">
                                    Max
                                  </span>
                                  <div className="jobplugin__results-aside__range-fieldwrap">
                                    <span className="jobplugin__results-aside__range-type jobplugin__text-primary">
                                      ₹
                                    </span>
                                    <input
                                      type="number"
                                      name="max"
                                      value={salaryRange.max}
                                      onChange={handleSalaryChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="jobplugin__results-aside__foot">
                            <button
                              type="submit"
                              className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Joining Time Filter */}
                    <div
                      className={`jobplugin__results-aside__box ${
                        openAccordions.joining ? "active" : ""
                      }`}
                    >
                      <div
                        className="jobplugin__results-aside__head"
                        onClick={() => toggleAccordion("joining")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 className="h6">Joining</h2>
                        <span
                          className={`jobplugin__results-aside__button ${
                            openAccordions.joining ? "open" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion("joining");
                          }}
                          style={{
                            display: "inline-block",
                            width: "20px",
                            // height: '20px',
                            position: "relative",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "10px",
                              height: "2px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "2px",
                              height: "10px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                              transition: "transform 0.3s ease",
                              transform: openAccordions.joining
                                ? "translate(-50%, -50%) rotate(90deg)"
                                : "translate(-50%, -50%) rotate(0deg)",
                            }}
                          ></span>
                        </span>
                      </div>
                      {openAccordions.joining && (
                        <div
                          className="jobplugin__results-aside__drop"
                          style={{ padding: "15px 0" }}
                        >
                          <div className="jobplugin__results-aside__row">
                            <ul className="jobplugin__results-aside__list">
                              {Object.entries(counts.joiningTimes).map(
                                ([time, count]) => (
                                  <li key={time}>
                                    <label className="jobplugin__form-radio">
                                      <input
                                        type="radio"
                                        name="group02"
                                        checked={joiningTime === time}
                                        onChange={() => setJoiningTime(time)}
                                      />
                                      <span className="jobplugin__form-radio__btn"></span>
                                      <span className="label-text">
                                        {time} ({count})
                                      </span>
                                    </label>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <div className="jobplugin__results-aside__foot">
                            <button
                              type="submit"
                              className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Talent Details Filter */}
                    <div
                      className={`jobplugin__results-aside__box ${
                        openAccordions.talentDetails ? "active" : ""
                      }`}
                    >
                      <div
                        className="jobplugin__results-aside__head"
                        onClick={() => toggleAccordion("talentDetails")}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <h2 className="h6">Talent Details</h2>
                        <span
                          className={`jobplugin__results-aside__button ${
                            openAccordions.talentDetails ? "open" : ""
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAccordion("talentDetails");
                          }}
                          style={{
                            display: "inline-block",
                            width: "20px",
                            position: "relative",
                            transition: "transform 0.3s ease",
                          }}
                        >
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "10px",
                              height: "2px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                            }}
                          ></span>
                          <span
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              width: "2px",
                              height: "10px",
                              backgroundColor: "#333",
                              transform: "translate(-50%, -50%)",
                              transition: "transform 0.3s ease",
                              transform: openAccordions.talentDetails
                                ? "translate(-50%, -50%) rotate(90deg)"
                                : "translate(-50%, -50%) rotate(0deg)",
                            }}
                          ></span>
                        </span>
                      </div>
                      {openAccordions.talentDetails && (
                        <div
                          className="jobplugin__results-aside__drop"
                          style={{ padding: "15px 0" }}
                        >
                          <div className="jobplugin__results-aside__row">
                            <strong className="jobplugin__results-aside__row-title">
                              English Level
                            </strong>
                            <ul className="jobplugin__results-aside__list">
                              {Object.entries(counts.englishLevels).map(
                                ([level, count]) => (
                                  <li key={level}>
                                    <label className="jobplugin__form-radio">
                                      <input
                                        type="radio"
                                        name="group03"
                                        checked={englishLevel === level}
                                        onChange={() => setEnglishLevel(level)}
                                      />
                                      <span className="jobplugin__form-radio__btn"></span>
                                      <span className="label-text">
                                        {level} ({count})
                                      </span>
                                    </label>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="jobplugin__results-aside__row">
                            <strong className="jobplugin__results-aside__row-title">
                              Rating
                            </strong>
                            <ul className="jobplugin__results-aside__list">
                              {Object.entries(counts.ratings).map(
                                ([ratingValue, count]) => (
                                  <li key={ratingValue}>
                                    <label className="jobplugin__form-radio">
                                      <input
                                        type="radio"
                                        name="group04"
                                        checked={rating === ratingValue}
                                        onChange={() => setRating(ratingValue)}
                                      />
                                      <span className="jobplugin__form-radio__btn"></span>
                                      <span className="label-text">
                                        {ratingValue.includes("stars") ? (
                                          <>
                                            {[...Array(5)].map((_, i) => (
                                              <span
                                                key={i}
                                                className={`jobplugin__results-aside__list-star ${
                                                  i < parseInt(ratingValue)
                                                    ? "jobplugin__text-primary"
                                                    : ""
                                                }`}
                                              >
                                                <FaStar />
                                              </span>
                                            ))}
                                            & up ({count})
                                          </>
                                        ) : (
                                          `${ratingValue} (${count})`
                                        )}
                                      </span>
                                    </label>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>

                          <div className="jobplugin__results-aside__row">
                            <strong className="jobplugin__results-aside__row-title">
                              Location
                            </strong>
                            <input
                              className="jobplugin__results-aside__input"
                              type="text"
                              placeholder="Search locations"
                              value={locationFilter}
                              onChange={handleLocationFilterChange}
                            />
                            <ul className="jobplugin__results-aside__list mt-2">
                              {Object.entries(counts.locations)
                                .slice(0, 5)
                                .map(([loc, count]) => (
                                  <li key={loc}>
                                    <label className="jobplugin__form-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={filters.location === loc}
                                        onChange={() =>
                                          setFilters({
                                            ...filters,
                                            location:
                                              filters.location === loc
                                                ? ""
                                                : loc,
                                          })
                                        }
                                      />
                                      <span className="jobplugin__form-checkbox__btn"></span>
                                      <span className="label-text">
                                        {loc} ({count})
                                      </span>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>

                          <div className="jobplugin__results-aside__foot">
                            <button
                              type="submit"
                              className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small"
                            >
                              Apply
                            </button>
                            <button
                              type="button"
                              onClick={clearFilters}
                              className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </aside>

              {/* Results Content - Jobs Listings */}
              <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75 ">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <header className="page-subheader mb-30 mb-md-40 d-lg-flex align-items-center justify-content-between">
                        <span></span>
                        <div className="subhead-filters">
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
                              className="h6 mb-25 mb-lg-0 text-dark me-3"
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
                          <div className="col-md-4 d-flex">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm me-2 flex-grow-1"
                              onClick={() => setShowFilters(!showFilters)}
                            >
                              <Search size={16} /> Filter Jobs
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary btn-sm"
                              onClick={clearAllFilters}
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
                          <div className="col-md-3">
                            <select
                              name="sort"
                              className="form-select form-select-sm"
                              value={sortBy}
                              onChange={handleSortChange}
                            >
                              <option value="Newest Jobs">Newest Jobs</option>
                              <option value="Oldest Jobs">Oldest Jobs</option>
                              <option value="Salary High">Salary High</option>
                              <option value="Salary Low">Salary Low</option>
                            </select>
                          </div>
                          <div className="grid-buttons">
                            <a
                              href="job-vacancies-list"
                              className="btn btn-list"
                              type="button"
                            >
                              <img
                                src="/images/list-icon.svg"
                                width="20"
                                height="20"
                                alt="List"
                              />
                            </a>{" "}
                            &nbsp;
                            <a
                              href="job-vacancies"
                              className="btn btn-grid active"
                              type="button"
                            >
                              <img
                                src="/images/grid-icon.svg"
                                width="22"
                                height="22"
                                alt="Grid"
                              />
                            </a>{" "}
                            &nbsp;
                            <a
                              href="job-vacancies-map"
                              className="btn btn-grid bg-white"
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

                      {/* Jobs Grid - 3 per row */}
                      <div className="row justify-content-center">
                        {loading ? (
                          Array(jobsPerPage)
                            .fill(0)
                            .map((_, index) => <SkeletonLoader key={index} />)
                        ) : currentJobs.length > 0 ? (
                          currentJobs.map((job, index) => (
                            <div
                              key={job._id || index}
                              className="col-12 col-sm-6 col-lg-4 col-xl-4 mb-15 mb-md-30"
                            >
                              <article className="featured-category-box pt-20">
                                <a
                                  href={`/job-details/${job._id}`}
                                  className="job-card-link"
                                  style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    zIndex: 1,
                                    opacity: 0,
                                  }}
                                  aria-label={`View details for ${job.jobTitle} position at ${job.companyName}`}
                                />

                                <span className="tag">
                                  <b className="text-primary">Posted:</b>{" "}
                                  {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                                <div className="img-holder">
                                  <img
                                    src={
                                      job.companyLogo ||
                                      "/images/default-company-logo.jpg"
                                    }
                                    width="78"
                                    height="78"
                                    alt={job.companyName}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "/images/default-company-logo.jpg";
                                    }}
                                  />

                                  {job.employerProfilePic && (
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
                                        src={job.employerProfilePic}
                                        width="40"
                                        height="40"
                                        alt="Employer"
                                        style={{ objectFit: "cover" }}
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src =
                                            "/images/default-profile-pic.jpg";
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
                                    <FaMapMarkerAlt className="icon icon-map-pin" />
                                    <span className="text">
                                      {job.isRemote ? "Remote" : job.location}
                                      {job.isRemote && job.location
                                        ? ` (${job.location})`
                                        : ""}
                                    </span>
                                  </address>
                                  <strong className="h6 text-primary mb-0">
                                    {job.jobTitle}
                                  </strong>
                                  <span className="subtitle">
                                    {job.category}
                                  </span>
                                  {job.experienceLevel && (
                                    <span className="d-block small text-muted mt-1">
                                      <i className="fas fa-briefcase me-1"></i>{" "}
                                      {job.experienceLevel}
                                    </span>
                                  )}
                                  <hr />
                                  <div className="job-info">
                                    <span className="amount">
                                      <strong>
                                        ₹ {job.salaryFrom || "NA"} to ₹{" "}
                                        {job.salaryTo || "NA"}
                                      </strong>
                                      /month
                                    </span>
                                    <span className="subtext">
                                      <b className="text-primary">Job Type:</b>{" "}
                                      {job.jobType}
                                    </span>
                                  </div>
                                  <a
                                    href={`/job-details/${job._id}`}
                                    className="btn btn-dark-yellow btn-sm"
                                    style={{ position: "relative", zIndex: 2 }}
                                  >
                                    <span className="btn-text">
                                      <span className="text">
                                        <FaCheckCircle className="text-secondary" />{" "}
                                        &nbsp; Apply Now
                                      </span>
                                      <FaChevronRight className="icon-chevron-right" />
                                    </span>
                                  </a>
                                </div>
                              </article>
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
                              onClick={clearAllFilters}
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
                                  <FaArrowLeft className="icon-arrow-left1" />
                                </button>
                              </li>
                              {[
                                ...Array(
                                  Math.ceil(
                                    filteredJobListings.length / jobsPerPage
                                  )
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
                                  Math.ceil(
                                    filteredJobListings.length / jobsPerPage
                                  )
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
                                  <FaArrowRight className="icon-arrow-right" />
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
            </div>
          </div>
        </div>
      </main>

      {/* Add shimmer animation */}
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

        .employer-profile-pic {
          transition: all 0.3s ease;
        }

        .employer-profile-pic:hover {
          transform: scale(1.1);
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

        /* Ensure pointer events work correctly */
        .btn-dark-yellow {
          pointer-events: auto;
        }
          .img-holder {
  position: relative;
  margin-bottom: 20px;
}

.employer-profile-pic {
  transition: all 0.3s ease;
}

.employer-profile-pic:hover {
  transform: scale(1.1);
}
      `}</style>
    </>
  );
};

export default CombinedJobsPage;
