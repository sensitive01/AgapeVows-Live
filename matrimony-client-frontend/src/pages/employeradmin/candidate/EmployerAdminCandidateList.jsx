import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployerCandidatesDetails from "./EmployerCandidatesDetails";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import AddCandidateModal from "../addcandidatemodal/AddCandidateModal";
import EditCandidateModal from "../addcandidatemodal/EditCandidatemodal";
import defaultEmployeeReport from "../../../assets/employer-admin/assets/img/reports-img/employee-report-icon.svg";
import defaultEmployeesuccess from "../../../assets/employer-admin/assets/img/reports-img/employee-report-success.svg";
import defaultEmployeeinfo from "../../../assets/employer-admin/assets/img/reports-img/employee-report-info.svg";
import defaultEmployeedanger from "../../../assets/employer-admin/assets/img/reports-img/employee-report-danger.svg";
import user13 from "../../../assets/employer-admin/assets/img/users/user-13.jpg";
const EmployerAdminCandidateList = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  // const [dateRange, setDateRange] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
  const [showEditCandidateModal, setShowEditCandidateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // Dynamic filter states
  const [jobCategories, setJobCategories] = useState({});
  const [jobTypes, setJobTypes] = useState({});
  const [gender, setGender] = useState("All");
  const [salaryRange, setSalaryRange] = useState({ min: "", max: "" });
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [experienceRange, setExperienceRange] = useState({ min: "", max: "" });
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const getDynamicDateRangeOptions = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    return [
      {
        label: "Today",
        value: "today",
        dateLabel: `${currentDate.toString().padStart(2, "0")}/${currentMonth
          .toString()
          .padStart(2, "0")}/${currentYear}`,
      },
      {
        label: "Yesterday",
        value: "yesterday",
        dateLabel: (() => {
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          return `${yesterday.getDate().toString().padStart(2, "0")}/${(
            yesterday.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${yesterday.getFullYear()}`;
        })(),
      },
      {
        label: "Last 7 Days",
        value: "last7days",
        dateLabel: (() => {
          const week = new Date(today);
          week.setDate(week.getDate() - 7);
          return `${week.getDate().toString().padStart(2, "0")}/${(
            week.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${week.getFullYear()} - ${currentDate
            .toString()
            .padStart(2, "0")}/${currentMonth
            .toString()
            .padStart(2, "0")}/${currentYear}`;
        })(),
      },
      {
        label: "Last 30 Days",
        value: "last30days",
        dateLabel: (() => {
          const month = new Date(today);
          month.setDate(month.getDate() - 30);
          return `${month.getDate().toString().padStart(2, "0")}/${(
            month.getMonth() + 1
          )
            .toString()
            .padStart(2, "0")}/${month.getFullYear()} - ${currentDate
            .toString()
            .padStart(2, "0")}/${currentMonth
            .toString()
            .padStart(2, "0")}/${currentYear}`;
        })(),
      },
      {
        label: "This Year",
        value: "thisyear",
        dateLabel: `01/01/${currentYear} - 31/12/${currentYear}`,
      },
      {
        label: "Last Year",
        value: "lastyear",
        dateLabel: `01/01/${currentYear - 1} - 31/12/${currentYear - 1}`,
      },
      {
        label: "Custom Range",
        value: "custom",
        dateLabel: "Select dates",
      },
    ];
  };

  const handleDateRangeSelect = (option) => {
    if (option.value === "custom") {
      setSelectedDateRange("Custom Range");
      return;
    }

    setSelectedDateRange(option.label);
    const today = new Date();
    let startDate, endDate;

    switch (option.value) {
      case "today":
        startDate = endDate = today.toISOString().split("T")[0];
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        startDate = endDate = yesterday.toISOString().split("T")[0];
        break;
      case "last7days":
        const week = new Date(today);
        week.setDate(week.getDate() - 7);
        startDate = week.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "last30days":
        const month = new Date(today);
        month.setDate(month.getDate() - 30);
        startDate = month.toISOString().split("T")[0];
        endDate = today.toISOString().split("T")[0];
        break;
      case "thisyear":
        startDate = `${today.getFullYear()}-01-01`;
        endDate = `${today.getFullYear()}-12-31`;
        break;
      case "lastyear":
        startDate = `${today.getFullYear() - 1}-01-01`;
        endDate = `${today.getFullYear() - 1}-12-31`;
        break;
      default:
        return;
    }

    setDateRange({ start: startDate, end: endDate });
  };

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("EmployerAdminToken");
        const employerAdminData = JSON.parse(
          localStorage.getItem("EmployerAdminData") || "{}"
        );

        if (!token || !employerAdminData._id) {
          navigate("/employer/login");
          return;
        }

        const response = await fetch(
          `https://api.edprofio.com/employer/viewallappliedcandi/${employerAdminData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const data = await response.json();
        setCandidates(data.data || []);
        setFilteredCandidates(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate]);

  // Extract filter options from candidates
  useEffect(() => {
    if (candidates.length > 0) {
      // Get unique job categories
      const categories = [
        ...new Set(candidates.map((c) => c.jobCategory).filter(Boolean)),
      ];
      const initialCategories = categories.reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {});

      // Get unique job types
      const types = [
        ...new Set(candidates.map((c) => c.jobType).filter(Boolean)),
      ];
      const initialTypes = types.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      setJobCategories(initialCategories);
      setJobTypes(initialTypes);
    }
  }, [candidates]);

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...candidates];

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      // Set time to beginning and end of day respectively
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((candidate) => {
        if (!candidate.appliedDate) return false;
        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= startDate && appliedDate <= endDate;
      });
    }

    // Role filter
    if (selectedRole !== "All") {
      filtered = filtered.filter(
        (candidate) => candidate.jobrole === selectedRole
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (candidate) => candidate.employapplicantstatus === selectedStatus
      );
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.firstName?.toLowerCase().includes(term) ||
          candidate.email?.toLowerCase().includes(term) ||
          candidate.jobTitle?.toLowerCase().includes(term)
      );
    }

    // Job Category filter
    const selectedCategories = Object.keys(jobCategories).filter(
      (cat) => jobCategories[cat]
    );
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((candidate) =>
        selectedCategories.includes(candidate.jobCategory)
      );
    }

    // Job Type filter
    const selectedJobTypes = Object.keys(jobTypes).filter(
      (type) => jobTypes[type]
    );
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.jobType && selectedJobTypes.includes(candidate.jobType)
      );
    }

    // Gender filter
    if (gender !== "All") {
      filtered = filtered.filter((candidate) => candidate.gender === gender);
    }

    // Salary Range filter
    if (salaryRange.min || salaryRange.max) {
      filtered = filtered.filter((candidate) => {
        const candidateSalary = candidate.salary || 0;
        const min = salaryRange.min ? parseInt(salaryRange.min) : 0;
        const max = salaryRange.max ? parseInt(salaryRange.max) : Infinity;
        return candidateSalary >= min && candidateSalary <= max;
      });
    }

    // Location filter
    if (location) {
      filtered = filtered.filter((candidate) =>
        candidate.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Qualification filter
    if (qualification) {
      filtered = filtered.filter((candidate) =>
        candidate.qualification
          ?.toLowerCase()
          .includes(qualification.toLowerCase())
      );
    }

    // Experience Range filter
    if (experienceRange.min || experienceRange.max) {
      filtered = filtered.filter((candidate) => {
        const candidateExp = candidate.experience || 0;
        const min = experienceRange.min ? parseInt(experienceRange.min) : 0;
        const max = experienceRange.max
          ? parseInt(experienceRange.max)
          : Infinity;
        return candidateExp >= min && candidateExp <= max;
      });
    }

    setFilteredCandidates(filtered);
    setShowFilterSidebar(false);
  };

  // Reset all filters
  const resetFilters = () => {
    // Reset job categories
    const resetCategories = Object.keys(jobCategories).reduce(
      (acc, category) => {
        acc[category] = false;
        return acc;
      },
      {}
    );

    // Reset job types
    const resetTypes = Object.keys(jobTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    setJobCategories(resetCategories);
    setJobTypes(resetTypes);
    setGender("All");
    setSalaryRange({ min: "", max: "" });
    setLocation("");
    setQualification("");
    setExperienceRange({ min: "", max: "" });
    setDateRange({ start: "", end: "" });
    setSelectedDateRange("This Year");
    setFilteredCandidates(candidates);
  };

  // Handle job category checkbox change
  const handleJobCategoryChange = (category) => {
    setJobCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Handle job type checkbox change
  const handleJobTypeChange = (type) => {
    setJobTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterCandidates(role, selectedStatus, searchTerm);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    filterCandidates(selectedRole, status, searchTerm);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterCandidates(selectedRole, selectedStatus, term);
  };

  const filterCandidates = (role, status, searchTerm) => {
    let filtered = [...candidates];

    if (role !== "All") {
      filtered = filtered.filter((candidate) => candidate.jobrole === role);
    }

    if (status !== "All") {
      filtered = filtered.filter(
        (candidate) => candidate.employapplicantstatus === status
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (candidate) =>
          candidate.firstName.toLowerCase().includes(term) ||
          candidate.email.toLowerCase().includes(term) ||
          candidate.jobTitle.toLowerCase().includes(term)
      );
    }

    setFilteredCandidates(filtered);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCandidates(
        filteredCandidates.map((candidate) => candidate._id)
      );
    } else {
      setSelectedCandidates([]);
    }
  };

  const handleSelectCandidate = (candidateId) => {
    if (selectedCandidates.includes(candidateId)) {
      setSelectedCandidates(
        selectedCandidates.filter((id) => id !== candidateId)
      );
    } else {
      setSelectedCandidates([...selectedCandidates, candidateId]);
    }
  };

  const handleDeleteClick = (candidate) => {
    setCandidateToDelete(candidate);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (candidateToDelete) {
        const token = localStorage.getItem("EmployerAdminToken");
        const response = await fetch(
          `https://api.edprofio.com/employer/deletecandidate/${candidateToDelete._id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete candidate");
        }

        // Remove the deleted candidate from state
        setCandidates(
          candidates.filter((c) => c._id !== candidateToDelete._id)
        );
        setFilteredCandidates(
          filteredCandidates.filter((c) => c._id !== candidateToDelete._id)
        );
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setCandidateToDelete(null);
    }
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetails(true);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Applied":
        return "border border-purple text-purple";
      case "Scheduled":
        return "border border-pink text-pink";
      case "Interviewed":
        return "border border-info text-info";
      case "Offered":
        return "border border-warning text-warning";
      case "Hired":
        return "border border-success text-success";
      case "Rejected":
        return "border border-danger text-danger";
      default:
        return "border border-purple text-purple";
    }
  };
  useEffect(() => {
    applyFilters();
  }, [selectedRole, selectedStatus, searchTerm, dateRange]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="text-center py-5">Loading candidates...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>
              &nbsp; <i className="fa fa-users text-primary"></i> Candidates
            </h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => setShowDateDropdown(!showDateDropdown)}
              >
                <i className="ti ti-calendar me-1"></i>
                {selectedDateRange || "Select Date Range"}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  showDateDropdown ? "show" : ""
                }`}
                style={{ minWidth: "280px" }}
              >
                {selectedDateRange === "Custom Range" ? (
                  // Custom Range Date Picker View
                  <li className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Select Date Range</h6>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setSelectedDateRange("")}
                      >
                        <i className="ti ti-arrow-left"></i> Back
                      </button>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <input
                        type="date"
                        className="form-control me-2"
                        style={{ fontSize: "12px" }}
                        value={dateRange.start}
                        onChange={(e) => {
                          setDateRange({ ...dateRange, start: e.target.value });
                          if (dateRange.end && e.target.value) {
                            setSelectedDateRange(
                              `${e.target.value} - ${dateRange.end}`
                            );
                          }
                        }}
                        placeholder="Start Date"
                      />
                      <span className="me-2">to</span>
                      <input
                        type="date"
                        className="form-control"
                        style={{ fontSize: "12px" }}
                        value={dateRange.end}
                        onChange={(e) => {
                          setDateRange({ ...dateRange, end: e.target.value });
                          if (dateRange.start && e.target.value) {
                            setSelectedDateRange(
                              `${dateRange.start} - ${e.target.value}`
                            );
                          }
                        }}
                        min={dateRange.start}
                        placeholder="End Date"
                      />
                    </div>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          setDateRange({ start: "", end: "" });
                          setSelectedDateRange("");
                          setShowDateDropdown(false);
                        }}
                      >
                        Clear
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (dateRange.start && dateRange.end) {
                            setShowDateDropdown(false);
                          }
                        }}
                        disabled={!dateRange.start || !dateRange.end}
                      >
                        Apply
                      </button>
                    </div>
                  </li>
                ) : (
                  // Regular Date Range Options
                  <>
                    {getDynamicDateRangeOptions().map((option) => (
                      <li key={option.value}>
                        <button
                          className="dropdown-item rounded-1 d-flex justify-content-between align-items-center"
                          onClick={() => {
                            handleDateRangeSelect(option);
                            setShowDateDropdown(false);
                          }}
                        >
                          <span>{option.label}</span>
                          <small className="text-muted">
                            {option.dateLabel}
                          </small>
                        </button>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>

            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                {selectedRole || "Role"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleRoleFilter("All")}
                  >
                    All Roles
                  </button>
                </li>
                {Array.from(new Set(candidates.map((c) => c.jobrole))).map(
                  (role) => (
                    <li key={role}>
                      <button
                        className="dropdown-item rounded-1"
                        onClick={() => handleRoleFilter(role)}
                      >
                        {role}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                {selectedStatus || "Select Status"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("All")}
                  >
                    All Statuses
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Pending")}
                  >
                    Pending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Scheduled")}
                  >
                    Scheduled
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Interviewed")}
                  >
                    Interviewed
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Offered")}
                  >
                    Offered
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Hired")}
                  >
                    Hired
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Rejected")}
                  >
                    Rejected
                  </button>
                </li>
              </ul>
            </div>

            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Sort By: {sortBy}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button className="dropdown-item rounded-1">
                    Recently Added
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-1">Ascending</button>
                </li>
                <li>
                  <button className="dropdown-item rounded-1">
                    Descending
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-1">
                    Last Month
                  </button>
                </li>
                <li>
                  <button className="dropdown-item rounded-1">
                    Last 7 Days
                  </button>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <input
                type="text"
                className="form-control border-0"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-icon btn-sm me-1">
                <i className="ti ti-search"></i>
              </button>
            </div>

            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <button
                className="btn btn-icon btn-sm me-1 toggle-theme"
                onClick={() => setShowFilterSidebar(true)}
              >
                <i className="ti ti-filter"></i>
              </button>
            </div>

            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <button
                className="btn btn-icon btn-sm active bg-primary text-white me-1"
                onClick={() => navigate("/employer-admin/candidate-list")}
              >
                <i className="ti ti-list-tree"></i>
              </button>
              <button
                className="btn btn-icon btn-sm"
                onClick={() => navigate("/employer-admin/new-candidate")}
              >
                <i className="ti ti-layout-grid"></i>
              </button>
            </div>

            <div className="me-2">
              <div className="dropdown">
                <button
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="ti ti-file-export me-1"></i>Export
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <button className="dropdown-item rounded-1">
                      <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item rounded-1">
                      <i className="ti ti-file-type-xls me-1"></i>Export as
                      Excel
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowAddCandidateModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>Add Candidate
            </button>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          <div className="col-xl-6 d-flex">
            <div className="row flex-fill">
              {/* Total Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="overflow-hidden d-flex mb-2 align-items-center">
                      <span className="me-2">
                        <img
                          src={defaultEmployeeReport}
                          alt="Img"
                          className="img-fluid"
                        />
                      </span>
                      <div>
                        <p className="fs-14 fw-bold mb-1 text-primary">
                          Total Candidates
                        </p>
                        <h5>{candidates.length}</h5>
                      </div>
                    </div>
                    <div>
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          +20.01%
                        </span>
                        from last week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Total Candidates */}

              {/* Shortlisted Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="overflow-hidden d-flex mb-2 align-items-center">
                      <span className="me-2">
                        <img
                          src={defaultEmployeesuccess}
                          alt="Img"
                          className="img-fluid"
                        />
                      </span>
                      <div>
                        <p className="fs-14 fw-bold mb-1 text-primary">
                          Shortlisted Candidates
                        </p>
                        <h5>{candidates.filter((c) => c.favourite).length}</h5>
                      </div>
                    </div>
                    <div>
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          +20.01%
                        </span>
                        from last week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Shortlisted Candidates */}

              {/* New Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="overflow-hidden d-flex mb-2 align-items-center">
                      <span className="me-2">
                        <img
                          src={defaultEmployeeinfo}
                          alt="Img"
                          className="img-fluid"
                        />
                      </span>
                      <div>
                        <p className="fs-14 fw-bold mb-1 text-primary">
                          New Candidates
                        </p>
                        <h5>
                          {
                            candidates.filter((c) => {
                              const appliedDate = new Date(c.appliedDate);
                              const sevenDaysAgo = new Date();
                              sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                              return appliedDate > sevenDaysAgo;
                            }).length
                          }
                        </h5>
                      </div>
                    </div>
                    <div>
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          +20.01%
                        </span>
                        from last week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /New Candidates */}

              {/* Inactive Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div className="overflow-hidden d-flex mb-2 align-items-center">
                      <span className="me-2">
                        <img
                          src={defaultEmployeedanger}
                          alt="Img"
                          className="img-fluid"
                        />
                      </span>
                      <div>
                        <p className="fs-14 fw-bold mb-1 text-primary">
                          Inactive Candidates
                        </p>
                        <h5>
                          {
                            candidates.filter(
                              (c) =>
                                c.status === "Rejected" ||
                                c.status === "Withdrawn"
                            ).length
                          }
                        </h5>
                      </div>
                    </div>
                    <div>
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          +20.01%
                        </span>
                        from last week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Inactive Candidates */}
            </div>
          </div>

          <div className="col-xl-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header border-0 pb-0">
                <div className="d-flex flex-wrap justify-content-between align-items-center row-gap-2">
                  <div className="d-flex align-items-center">
                    <span className="me-2">
                      <i className="ti ti-chart-bar text-danger"></i>
                    </span>
                    <h5>Candidates</h5>
                  </div>
                  <div className="d-flex align-items-center">
                    <p className="d-inline-flex align-items-center me-3 mb-0">
                      <i className="ti ti-square-filled fs-12 text-success me-2"></i>
                      Active Candidates
                    </p>
                    <p className="d-inline-flex align-items-center">
                      <i className="ti ti-square-filled fs-12 text-gray-1 me-2 mb-0"></i>
                      Inactive Candidates
                    </p>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle btn btn-sm fs-12 btn-light d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                    >
                      {selectedYear}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2">
                      <li>
                        <button className="dropdown-item rounded-1">
                          2025
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-1">
                          2024
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-1">
                          2023
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-1">
                          2022
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body py-0">
                <div id="employee-reports" style={{ height: "200px" }}>
                  {/* Chart would go here */}
                  <div className="text-center py-5">
                    Candidate statistics chart
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body p-0">
            <div className="custom-datatable-filter table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                          checked={
                            selectedCandidates.length ===
                              filteredCandidates.length &&
                            filteredCandidates.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>Cand ID</th>
                    <th>Candidate</th>
                    <th>Applied Role</th>
                    <th>Contact</th>
                    <th>Applied Date</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <tr key={candidate._id}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedCandidates.includes(
                                candidate._id
                              )}
                              onChange={() =>
                                handleSelectCandidate(candidate._id)
                              }
                            />
                          </div>
                        </td>
                        <td>
                          Cand-
                          {candidate._id.substring(candidate._id.length - 4)}
                        </td>
                        <td>
                          <div className="d-flex align-items-center file-name-icon">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                                viewCandidateDetails(candidate);
                              }}
                              className="avatar avatar-md"
                            >
                              <img
                                src={candidate.profileurl || user13}
                                className="img-fluid rounded-circle"
                                alt="img"
                                onError={(e) => {
                                  e.target.src = user13; // Fallback if the image fails to load
                                }}
                              />
                            </a>
                            <div className="ms-2">
                              <h6 className="fw-medium">
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    viewCandidateDetails(candidate);
                                  }}
                                  data-bs-toggle="offcanvas"
                                  data-bs-target="#candidate_details"
                                >
                                  {candidate.firstName}
                                </a>
                              </h6>
                              <span className="d-block mt-1">
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                    viewCandidateDetails(candidate);
                                  }}
                                >
                                  {candidate.currentcity}
                                </a>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          {candidate.jobTitle}
                          <br />
                          <span className="d-block mt-1">
                            <a href="#">
                              {candidate.experience} years of experience
                            </a>
                          </span>
                        </td>
                        <td>
                          <div className="action-icon d-inline-flex">
                            <a href={`tel:${candidate.phone}`} className="me-2">
                              <i className="ti ti-phone text-success"></i>
                            </a>
                            <a href={`sms:${candidate.phone}`} className="me-2">
                              <i className="ti ti-message"></i>
                            </a>
                            <a
                              href={`mailto:${candidate.email}`}
                              className="me-2"
                            >
                              <i className="ti ti-mail text-danger"></i>
                            </a>
                          </div>
                        </td>
                        <td>{formatDate(candidate.appliedDate)}</td>
                        <td>
                          <div className="d-inline-flex">
                            <a
                              href={candidate.resume?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray me-2 fs-16"
                            >
                              <i className="ti ti-file-text"></i>
                            </a>
                            <a
                              href={candidate.resume?.url}
                              download
                              className="text-gray fs-16"
                            >
                              <i className="ti ti-download"></i>
                            </a>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadge(
                              candidate.employapplicantstatus
                            )}`}
                          >
                            <i className="ti ti-point-filled"></i>
                            {candidate.employapplicantstatus}
                          </span>
                        </td>
                        <td>
                          <div className="action-icon d-inline-flex">
                            <a
                              onClick={() => setShowEditCandidateModal(true)}
                              className="me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#edit_employee"
                            >
                              <i className="ti ti-edit"></i>
                            </a>
                            <a
                              href="javascript:void(0);"
                              onClick={() => handleDeleteClick(candidate)}
                            >
                              <i className="ti ti-trash text-danger"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-4">
                        No candidates found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar */}
      <div
        className={`sidebar-themesettings offcanvas offcanvas-end ${
          showFilterSidebar ? "show" : ""
        }`}
        id="theme-setting"
        style={{ visibility: showFilterSidebar ? "visible" : "hidden" }}
      >
        <div className="offcanvas-header d-flex align-items-center justify-content-between bg-dark">
          <div>
            <h3 className="mb-1 text-white">Filter Jobs</h3>
            <p className="text-light">Search & Filter</p>
          </div>
          <a
            href="#"
            className="custom-btn-close d-flex align-items-center justify-content-center text-white"
            onClick={(e) => {
              e.preventDefault();
              setShowFilterSidebar(false);
            }}
          >
            <i className="ti ti-x"></i>
          </a>
        </div>
        <div className="themesettings-inner offcanvas-body">
          <div
            className="accordion accordion-customicon1 accordions-items-seperate"
            id="settingtheme"
          >
            {/* Job Category */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#layoutsetting"
                  aria-expanded="true"
                >
                  Select Job Category
                </button>
              </h2>
              <div
                id="layoutsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="row gx-3">
                    <div className="form-group">
                      <div className="checkbox-limit">
                        <ul className="checkbox-list">
                          {Object.keys(jobCategories).map((category) => (
                            <React.Fragment key={category}>
                              <li>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={jobCategories[category]}
                                    onChange={() =>
                                      handleJobCategoryChange(category)
                                    }
                                  />
                                  <span className="fake-checkbox"></span>
                                  <span className="label-text">{category}</span>
                                </label>
                              </li>
                              <br />
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Type */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#layoutsetting1"
                  aria-expanded="true"
                >
                  Select Job Type
                </button>
              </h2>
              <div
                id="layoutsetting1"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="row gx-3">
                    <div className="form-group">
                      <div className="checkbox-limit">
                        <ul className="checkbox-list">
                          {Object.keys(jobTypes).map((type) => (
                            <React.Fragment key={type}>
                              <li>
                                <label className="custom-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={jobTypes[type]}
                                    onChange={() => handleJobTypeChange(type)}
                                  />
                                  <span className="fake-checkbox"></span>
                                  <span className="label-text">{type}</span>
                                </label>
                              </li>
                              <br />
                            </React.Fragment>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarsetting"
                  aria-expanded="true"
                >
                  Gender
                </button>
              </h2>
              <div
                id="sidebarsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="d-flex align-items-center">
                    <div className="theme-width m-1 me-2">
                      <input
                        type="radio"
                        name="gender"
                        id="maleGender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={() => setGender("Male")}
                      />
                      <label
                        htmlFor="maleGender"
                        className="d-block rounded fs-12"
                      >
                        Male
                      </label>
                    </div>
                    <div className="theme-width m-1 me-2">
                      <input
                        type="radio"
                        name="gender"
                        id="femaleGender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={() => setGender("Female")}
                      />
                      <label
                        htmlFor="femaleGender"
                        className="d-block rounded fs-12"
                      >
                        Female
                      </label>
                    </div>
                    <div className="theme-width m-1">
                      <input
                        type="radio"
                        name="gender"
                        id="allGender"
                        value="All"
                        checked={gender === "All"}
                        onChange={() => setGender("All")}
                      />
                      <label
                        htmlFor="allGender"
                        className="d-block rounded fs-12"
                      >
                        All
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Salary Range */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#cardsetting"
                  aria-expanded="true"
                >
                  Salary Range
                </button>
              </h2>
              <div
                id="cardsetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body pb-0">
                  <div className="row gx-3">
                    <div className="form-group">
                      <div className="price-inputs d-flex">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="From"
                          value={salaryRange.min}
                          onChange={(e) =>
                            setSalaryRange({
                              ...salaryRange,
                              min: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="To"
                          value={salaryRange.max}
                          onChange={(e) =>
                            setSalaryRange({
                              ...salaryRange,
                              max: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarsetting1"
                  aria-expanded="true"
                >
                  Location
                </button>
              </h2>
              <div
                id="sidebarsetting1"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Choose Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Qualification */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#modesetting"
                  aria-expanded="true"
                >
                  Qualification
                </button>
              </h2>
              <div
                id="modesetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body">
                  <div className="row gx-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button text-dark fs-16"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#sizesetting"
                  aria-expanded="true"
                >
                  Experience
                </button>
              </h2>
              <div
                id="sizesetting"
                className="accordion-collapse collapse show"
              >
                <div className="accordion-body pb-0">
                  <div className="row gx-3">
                    <div className="price-inputs d-flex">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="From"
                        value={experienceRange.min}
                        onChange={(e) =>
                          setExperienceRange({
                            ...experienceRange,
                            min: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="To"
                        value={experienceRange.max}
                        onChange={(e) =>
                          setExperienceRange({
                            ...experienceRange,
                            max: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 pt-0">
          <div className="row gx-3">
            <div className="col-6">
              <button
                className="btn btn-light close-theme w-100"
                onClick={resetFilters}
              >
                <i className="ti ti-restore me-1"></i>Reset
              </button>
            </div>
            <div className="col-6">
              <button className="btn btn-primary w-100" onClick={applyFilters}>
                <i className="ti ti-circle-check me-1"></i>Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {showFilterSidebar && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowFilterSidebar(false)}
        ></div>
      )}

      <div
        className={`modal fade ${showDeleteModal ? "show" : ""}`}
        id="delete_modal"
        style={{ display: showDeleteModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body text-center">
              <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                <i className="ti ti-trash text-danger-x fs-36"></i>
              </span>
              <h4 className="mb-1">Confirm Delete</h4>
              <p className="mb-3">
                {candidateToDelete
                  ? `Are you sure you want to delete ${candidateToDelete.firstName}? This action cannot be undone.`
                  : "You want to delete all the marked items, this cant be undone once you delete."}
              </p>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-light me-3"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && <div className="modal-backdrop fade show"></div>}
      {selectedCandidate && (
        <EmployerCandidatesDetails
          show={showDetails}
          onClose={() => setShowDetails(false)}
          candidate={selectedCandidate}
        />
      )}
      <AddCandidateModal
        show={showAddCandidateModal}
        onClose={() => setShowAddCandidateModal(false)}
      />
      <EditCandidateModal
        show={showEditCandidateModal}
        onClose={() => setShowEditCandidateModal(false)}
      />
      <EmployerAdminFooter />
    </>
  );
};

export default EmployerAdminCandidateList;
