import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  ChevronDown,
  PlusCircle,
  Check,
  X,
  ArrowUp,
  ArrowUpRight,
  RotateCw,
  CheckCircle2,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";

const EmployeerAdminJobList = () => {
  // State for dropdowns
  const [selectedRole, setSelectedRole] = useState("Role");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);

  // State for modals
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const dateDropdownRef = useRef(null);
  // State for form tabs
  const [activeTab, setActiveTab] = useState("basic-info");

  // State for table selection
  const [selectAll, setSelectAll] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [candidateStats, setCandidateStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    new: 0,
  });

  const [statusDistribution, setStatusDistribution] = useState({
    pending: 0,
    onHold: 0,
    inProgress: 0,
    completed: 0,
  });
  // State for jobs data
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Refs for dropdown click outside handling
  const roleDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const sortDropdownRef = useRef(null);
  const exportDropdownRef = useRef(null);

  const handleEditClick = (job) => {
    setEditingJob(job.id);
    setShowEditModal(true);
  };

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
      setShowDateDropdown(true);
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
    setShowDateDropdown(false);
  };

  const applyFilters = () => {
    setIsFiltering(true);
    let filtered = [...jobs];

    // Apply date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      // Set time to beginning and end of day respectively
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((job) => {
        if (!job.createdDate) return false;
        const jobDate = new Date(job.createdDate);
        return jobDate >= startDate && jobDate <= endDate;
      });
    }

    // Apply role filter if not default
    if (selectedRole !== "Role") {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(selectedRole.toLowerCase())
      );
    }

    // Apply status filter if not default
    if (selectedStatus !== "Select Status") {
      filtered = filtered.filter(
        (job) => job.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    // Apply sorting
    if (sortBy === "Recently Added") {
      filtered.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
    } else if (sortBy === "Ascending") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "Descending") {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortBy === "Last Month") {
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      filtered = filtered.filter(
        (job) => new Date(job.createdDate) >= lastMonth
      );
    } else if (sortBy === "Last 7 Days") {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      filtered = filtered.filter(
        (job) => new Date(job.createdDate) >= lastWeek
      );
    }

    setFilteredJobs(filtered);
    setIsFiltering(false);

    // Update stats based on filtered jobs
    const stats = calculateCandidateStats(filtered);
    setCandidateStats(stats);

    const distribution = calculateStatusDistribution(filtered);
    setStatusDistribution(distribution);
  };

  const resetFilters = () => {
    setSelectedRole("Role");
    setSelectedStatus("Select Status");
    setSortBy("Last 7 Days");
    setDateRange({ start: "", end: "" });
    setSelectedDateRange("This Year");
    setFilteredJobs(jobs);

    // Reset stats to original jobs data
    const stats = calculateCandidateStats(jobs);
    setCandidateStats(stats);

    const distribution = calculateStatusDistribution(jobs);
    setStatusDistribution(distribution);
  };

  useEffect(() => {
    if (jobs.length > 0) {
      setFilteredJobs(jobs);
      const stats = calculateCandidateStats(jobs);
      setCandidateStats(stats);
      const distribution = calculateStatusDistribution(jobs);
      setStatusDistribution(distribution);
    }
  }, [jobs]);

  useEffect(() => {
    applyFilters();
  }, [dateRange, selectedRole, selectedStatus, sortBy, jobs]);

  const calculateCandidateStats = (jobs) => {
    let total = 0;
    let completed = 0;
    let pending = 0;
    let newCandidates = 0;

    jobs.forEach((job) => {
      total += job.applications || 0;
      completed += Math.floor((job.applications || 0) * 0.7);
      pending += Math.floor((job.applications || 0) * 0.2);
      newCandidates += Math.floor((job.applications || 0) * 0.1);
    });

    return {
      total,
      completed,
      pending,
      new: newCandidates,
    };
  };

  const calculateStatusDistribution = (jobs) => {
    const statusCounts = {
      Active: 0,
      Inactive: 0,
    };

    jobs.forEach((job) => {
      if (job.status === "Active") {
        statusCounts.Active++;
      } else {
        statusCounts.Inactive++;
      }
    });

    return {
      pending: Math.floor(jobs.length * 0.3),
      onHold: Math.floor(jobs.length * 0.1),
      inProgress: Math.floor(jobs.length * 0.2),
      completed: Math.floor(jobs.length * 0.4),
      ...statusCounts,
    };
  };

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("EmployerAdminToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      const employerData = JSON.parse(
        localStorage.getItem("EmployerAdminData") || {}
      );
      const response = await axios.get(
        `https://api.edprofio.com/employer/fetchjob/${employerData._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const formattedJobs = response.data.map((job) => ({
        id: job._id,
        title: job.jobTitle,
        experience: job.experienceLevel || "Not specified",
        location: job.location,
        salary: `${job.salaryFrom || "N/A"} - ${job.salaryTo || "N/A"} ${
          job.salaryType || ""
        }`,
        salaryFrom: job.salaryFrom,
        salaryTo: job.salaryTo,
        postedDate: formatDate(job.createdAt),
        addOns: `${job.jobType || ""} / ${job.isRemote ? "Remote" : "On-site"}`,
        applications: job.applications?.length || 0,
        status: job.isActive ? "Active" : "Inactive",
        createdDate: new Date(job.createdAt),
        description: job.description,
        skills: job.skills || [],
        employerProfilePic: job.employerProfilePic || "default.svg",
      }));

      setJobs(formattedJobs);
      setFilteredJobs(formattedJobs);

      // Calculate and set candidate statistics
      const stats = calculateCandidateStats(formattedJobs);
      setCandidateStats(stats);

      // Calculate and set status distribution
      const distribution = calculateStatusDistribution(formattedJobs);
      setStatusDistribution(distribution);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message || "Failed to load jobs");
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Toggle job status
  const toggleJobStatus = async (jobId, currentStatus) => {
    try {
      const token = localStorage.getItem("EmployerAdminToken");
      const newStatus = !currentStatus;

      await axios.put(
        `https://api.edprofio.com/employer/updatejobstatus/${jobId}`,
        { isActive: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setJobs(
        jobs.map((job) =>
          job.id === jobId
            ? { ...job, status: newStatus ? "Active" : "Inactive" }
            : job
        )
      );

      // Update filtered jobs as well
      setFilteredJobs(
        filteredJobs.map((job) =>
          job.id === jobId
            ? { ...job, status: newStatus ? "Active" : "Inactive" }
            : job
        )
      );
    } catch (err) {
      console.error("Error updating job status:", err);
      alert("Failed to update job status");
    }
  };

  // Post new job
  const postJob = async (jobData) => {
    try {
      const token = localStorage.getItem("EmployerAdminToken");
      const employerData = JSON.parse(
        localStorage.getItem("EmployerAdminData") || {}
      );

      const response = await axios.post(
        "https://api.edprofio.com/employer/postjob",
        {
          ...jobData,
          employid: employerData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setShowAddJobModal(false);
        setShowSuccessModal(true);
        fetchJobs(); // Refresh jobs list
      }
    } catch (err) {
      console.error("Error posting job:", err);
      alert("Failed to post job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle select all jobs
  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked);
    setSelectedJobs(isChecked ? filteredJobs.map((job) => job.id) : []);
  };

  // Handle individual job selection
  const handleJobSelect = (id) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setShowRoleDropdown(false);
      }
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setShowStatusDropdown(false);
      }
      if (
        sortDropdownRef.current &&
        !sortDropdownRef.current.contains(event.target)
      ) {
        setShowSortDropdown(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target)
      ) {
        setShowExportDropdown(false);
      }
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target)
      ) {
        setShowDateDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  ChartJS.register(ArcElement, Tooltip, Legend);

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Page Header */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="my-auto">
            <h2>
              &nbsp; <Briefcase className="text-primary" /> Jobs
            </h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            {/* Date Range Picker */}
            <div className="dropdown me-2" ref={dateDropdownRef}>
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
                  <li className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Select Date Range</h6>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setSelectedDateRange("This Year")}
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
                          setSelectedDateRange("This Year");
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
                            applyFilters();
                          }
                        }}
                        disabled={!dateRange.start || !dateRange.end}
                      >
                        Apply
                      </button>
                    </div>
                  </li>
                ) : (
                  <>
                    {getDynamicDateRangeOptions().map((option) => (
                      <li key={option.value}>
                        <button
                          className="dropdown-item rounded-1 d-flex justify-content-between align-items-center"
                          onClick={() => {
                            handleDateRangeSelect(option);
                            applyFilters();
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

            {/* Role Dropdown */}
            <div className="dropdown me-2" ref={roleDropdownRef}>
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              >
                {selectedRole}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  showRoleDropdown ? "show" : ""
                }`}
              >
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedRole("PGT Teacher");
                      setShowRoleDropdown(false);
                      applyFilters();
                    }}
                  >
                    PGT Teacher
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedRole("Administration Staff");
                      setShowRoleDropdown(false);
                      applyFilters();
                    }}
                  >
                    Administration Staff
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedRole("Role");
                      setShowRoleDropdown(false);
                      applyFilters();
                    }}
                  >
                    Clear Filter
                  </button>
                </li>
              </ul>
            </div>

            {/* Status Dropdown */}
            <div className="dropdown me-2" ref={statusDropdownRef}>
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              >
                {selectedStatus}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  showStatusDropdown ? "show" : ""
                }`}
              >
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedStatus("Active");
                      setShowStatusDropdown(false);
                      applyFilters();
                    }}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedStatus("Inactive");
                      setShowStatusDropdown(false);
                      applyFilters();
                    }}
                  >
                    Inactive
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSelectedStatus("Select Status");
                      setShowStatusDropdown(false);
                      applyFilters();
                    }}
                  >
                    Clear Filter
                  </button>
                </li>
              </ul>
            </div>

            {/* Sort By Dropdown */}
            <div className="dropdown me-2" ref={sortDropdownRef}>
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                Sort By: {sortBy}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  showSortDropdown ? "show" : ""
                }`}
              >
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSortBy("Recently Added");
                      setShowSortDropdown(false);
                      applyFilters();
                    }}
                  >
                    Recently Added
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSortBy("Ascending");
                      setShowSortDropdown(false);
                      applyFilters();
                    }}
                  >
                    Ascending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSortBy("Descending");
                      setShowSortDropdown(false);
                      applyFilters();
                    }}
                  >
                    Descending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSortBy("Last Month");
                      setShowSortDropdown(false);
                      applyFilters();
                    }}
                  >
                    Last Month
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      setSortBy("Last 7 Days");
                      setShowSortDropdown(false);
                      applyFilters();
                    }}
                  >
                    Last 7 Days
                  </button>
                </li>
              </ul>
            </div>

            {/* View Toggle */}
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <a
                href="jobs"
                className="btn btn-icon btn-sm active bg-primary text-white"
              >
                <i className="ti ti-list-tree"></i>
              </a>
              <a href="post-jobs" className="btn btn-icon btn-sm">
                <i className="ti ti-layout-grid"></i>
              </a>
            </div>

            {/* Export Dropdown */}
            <div className="dropdown me-2" ref={exportDropdownRef}>
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => setShowExportDropdown(!showExportDropdown)}
              >
                <i className="ti ti-file-export me-1"></i>
                Export
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  showExportDropdown ? "show" : ""
                }`}
              >
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      // exportToPDF();
                      setShowExportDropdown(false);
                    }}
                  >
                    <i className="ti ti-file-type-pdf me-1"></i>
                    Export as PDF
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => {
                      // exportToCSV();
                      setShowExportDropdown(false);
                    }}
                  >
                    <i className="ti ti-file-type-xls me-1"></i>
                    Export as Excel
                  </button>
                </li>
              </ul>
            </div>

            {/* Reset Filters Button */}
            <button
              className="btn btn-outline-secondary me-2"
              onClick={resetFilters}
            >
              Reset Filters
            </button>

            {/* Add Job Button */}
            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowAddJobModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>
              Post job
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row">
          {/* Total Candidates */}
          <div className="col-lg-6 col-md-6 d-flex">
            <div className="row flex-fill">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div>
                      <div className="mb-2">
                        <span className="fs-14 fw-bold text-primary mb-1">
                          Total Candidates
                        </span>
                        <h5>{candidateStats.total}</h5>
                      </div>
                      <div
                        className="progress"
                        style={{ width: "100%", height: "5px" }}
                      >
                        <div
                          className="progress-bar bg-pink"
                          style={{
                            width: `${
                              candidateStats.total > 0
                                ? (candidateStats.completed /
                                    candidateStats.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          {candidateStats.total > 0
                            ? `${Math.round(
                                (candidateStats.completed /
                                  candidateStats.total) *
                                  100
                              )}%`
                            : "0%"}
                        </span>
                        completion rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div>
                      <div className="mb-2">
                        <span className="fs-14 fw-bold text-primary mb-1">
                          Completed Candidates
                        </span>
                        <h5>{candidateStats.completed}</h5>
                      </div>
                      <div
                        className="progress"
                        style={{ width: "100%", height: "5px" }}
                      >
                        <div
                          className="progress-bar bg-success"
                          style={{
                            width: `${
                              candidateStats.total > 0
                                ? (candidateStats.completed /
                                    candidateStats.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          {candidateStats.total > 0
                            ? `${Math.round(
                                (candidateStats.completed /
                                  candidateStats.total) *
                                  100
                              )}%`
                            : "0%"}
                        </span>
                        of total candidates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div>
                      <div className="mb-2">
                        <span className="fs-14 fw-bold text-primary mb-1">
                          Pending Candidates
                        </span>
                        <h5>{candidateStats.pending}</h5>
                      </div>
                      <div
                        className="progress"
                        style={{ width: "100%", height: "5px" }}
                      >
                        <div
                          className="progress-bar bg-danger"
                          style={{
                            width: `${
                              candidateStats.total > 0
                                ? (candidateStats.pending /
                                    candidateStats.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-danger fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          {candidateStats.total > 0
                            ? `${Math.round(
                                (candidateStats.pending /
                                  candidateStats.total) *
                                  100
                              )}%`
                            : "0%"}
                        </span>
                        of total candidates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* New Candidates */}
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="card flex-fill">
                  <div className="card-body">
                    <div>
                      <div className="mb-2">
                        <span className="fs-14 fw-bold text-primary mb-1">
                          New Candidates
                        </span>
                        <h5>{candidateStats.new}</h5>
                      </div>
                      <div
                        className="progress"
                        style={{ width: "100%", height: "5px" }}
                      >
                        <div
                          className="progress-bar bg-purple"
                          style={{
                            width: `${
                              candidateStats.total > 0
                                ? (candidateStats.new / candidateStats.total) *
                                  100
                                : 0
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="d-flex mt-2">
                      <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                        <span className="text-success fs-12 d-flex align-items-center me-1">
                          <i className="ti ti-arrow-wave-right-up me-1"></i>
                          {candidateStats.total > 0
                            ? `${Math.round(
                                (candidateStats.new / candidateStats.total) *
                                  100
                              )}%`
                            : "0%"}
                        </span>
                        of total candidates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-header border-0">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="me-2">
                      <i className="ti ti-chart-pie text-danger"></i>
                    </span>
                    <h5>Candidates By Status</h5>
                  </div>
                  <div className="dropdown">
                    <button className="dropdown-toggle btn btn-sm fs-12 btn-light d-inline-flex align-items-center">
                      Choose State
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end p-2">
                      <li>
                        <button className="dropdown-item rounded-1">
                          Karnataka
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-1">
                          Tamilnadu
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item rounded-1">
                          Andhra Pradesh
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-body pt-0">
                <div className="row align-items-center">
                  <div className="col-md-6 d-flex justify-content-center">
                    <div
                      id="project-report"
                      style={{ width: "200px", height: "200px" }}
                    >
                      <Pie
                        data={{
                          labels: [
                            "Pending",
                            "On Hold",
                            "In Progress",
                            "Completed",
                          ],
                          datasets: [
                            {
                              data: [
                                statusDistribution.pending,
                                statusDistribution.onHold,
                                statusDistribution.inProgress,
                                statusDistribution.completed,
                              ],
                              backgroundColor: [
                                "#0dcaf0",
                                "#ab47bc",
                                "#ffc107",
                                "#03c95a",
                              ],
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row gy-4">
                      <div className="col-md-6">
                        <p className="fs-16 project-report-badge-blue fw-normal mb-0 text-gray-5">
                          Pending
                        </p>
                        <p className="fs-20 fw-bold text-dark">
                          {statusDistribution.pending}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="fs-16 project-report-badge-purple mb-0 fw-normal text-gray-5">
                          On Hold
                        </p>
                        <p className="fs-20 fw-bold text-dark">
                          {statusDistribution.onHold}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="fs-16 project-report-badge-warning mb-0 fw-normal text-gray-5">
                          Inprogress
                        </p>
                        <p className="fs-20 fw-bold text-dark">
                          {statusDistribution.inProgress}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p className="fs-16 project-report-badge-success mb-0 fw-normal text-gray-5">
                          Completed
                        </p>
                        <p className="fs-20 fw-bold text-dark">
                          {statusDistribution.completed}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
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
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>Job Title</th>
                    <th>Experience</th>
                    <th>Location</th>
                    <th>Salary Range</th>
                    <th>Posted Date</th>
                    <th>Add-Ons</th>
                    <th className="me-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan="8" className="text-center text-danger py-4">
                        {error}
                      </td>
                    </tr>
                  ) : filteredJobs.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-4">
                        No jobs found matching your criteria
                      </td>
                    </tr>
                  ) : (
                    filteredJobs.map((job) => (
                      <tr key={job.id}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedJobs.includes(job.id)}
                              onChange={() => handleJobSelect(job.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center file-name-icon">
                            <div className="ms-2">
                              <h6 className="fw-medium">
                                <Link to={`/job-preview/${job.id}`}>
                                  {job.title}
                                </Link>
                              </h6>
                              <span className="d-block mt-1">
                                {job.applications} Applications
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{job.experience}</td>
                        <td>{job.location}</td>
                        <td>{job.salary}</td>
                        <td>{job.postedDate}</td>
                        <td>{job.addOns}</td>
                        <td>
                          <div className="action-icon d-inline-flex">
                            <button
                              className="me-2 btn btn-icon"
                              onClick={() => handleEditClick(job)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={job.status === "Active"}
                                onChange={() =>
                                  toggleJobStatus(
                                    job.id,
                                    job.status === "Active"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Job Modal */}
        {showAddJobModal && (
          <AddJobModal
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onClose={() => setShowAddJobModal(false)}
            onSubmit={postJob}
          />
        )}

        {showEditModal && editingJob && (
          <EditJobModal
            jobId={editingJob}
            onClose={() => {
              setShowEditModal(false);
              setEditingJob(null);
            }}
            onJobUpdated={(updatedJob) => {
              setJobs(
                jobs.map((j) =>
                  j.id === updatedJob._id
                    ? {
                        ...j,
                        ...updatedJob,
                        postedDate: formatDate(
                          updatedJob.updatedAt || updatedJob.createdAt
                        ),
                      }
                    : j
                )
              );
            }}
          />
        )}
        {/* Success Modal */}
        {showSuccessModal && (
          <div
            className="modal fade show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-lg avatar-rounded bg-success mb-3">
                    <i className="ti ti-check fs-24"></i>
                  </span>
                  <h5 className="mb-2">Job Posted Successfully</h5>
                  <div>
                    <div className="row g-2">
                      <div className="col-12">
                        <button
                          className="btn btn-dark w-100"
                          onClick={() => setShowSuccessModal(false)}
                        >
                          Back to List
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <EmployerAdminFooter />
    </>
  );
};

const AddJobModal = ({ activeTab, onTabChange, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    category: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "month",
    locationTypes: [],
    skills: [],
    benefits: "",
    jobType: "Full Time",
    experienceLevel: "",
    educationLevel: "",
    deadline: "",
    openings: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    isRemote: false,
    companyUrl: "",
    applicationInstructions: "",
    priority: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLocationType, setNewLocationType] = useState("");

  useEffect(() => {
    const fetchAndPrefillData = async () => {
      try {
        const employerData = JSON.parse(
          localStorage.getItem("EmployerAdminData") || "{}"
        );

        // Prefill form with employer data
        const newFormData = {
          ...formData,
          companyName:
            employerData.schoolName || employerData.companyName || "",
          contactEmail: employerData.userEmail || "",
          contactPhone: employerData.userMobile || "",
          location: employerData.city || employerData.address || "",
          companyUrl: employerData.website || "",
        };

        setFormData(newFormData);
      } catch (error) {
        console.error("Error pre-filling form:", error);
      }
    };

    fetchAndPrefillData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddLocationType = (type) => {
    if (type && !formData.locationTypes.includes(type)) {
      setFormData((prev) => ({
        ...prev,
        locationTypes: [...prev.locationTypes, type],
      }));
      setNewLocationType("");
    }
  };

  const handleRemoveLocationType = (typeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      locationTypes: prev.locationTypes.filter((type) => type !== typeToRemove),
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Post Job</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
            >
              <X />
            </button>
          </div>

          <div className="modal-body pb-0">
            <div className="row">
              <div className="contact-grids-tab pt-0">
                <ul className="nav nav-underline" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "basic-info" ? "active" : ""
                      }`}
                      onClick={() => onTabChange("basic-info")}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "address" ? "active" : ""
                      }`}
                      onClick={() => onTabChange("address")}
                    >
                      Location
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content" id="myTabContent">
                {activeTab === "basic-info" && (
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Company Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Job Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Job Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            rows="4"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Category <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Job Type</label>
                          <select
                            className="form-select"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Temporary">Temporary</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Experience Level</label>
                          <select
                            className="form-select"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Experience Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="Executive">Executive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Education Level</label>
                          <select
                            className="form-select"
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Education Level</option>
                            <option value="High School">High School</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                            <option value="None">None</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Salary From <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="salaryFrom"
                            value={formData.salaryFrom}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Salary To <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="salaryTo"
                            value={formData.salaryTo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Salary Type</label>
                          <select
                            className="form-select"
                            name="salaryType"
                            value={formData.salaryType}
                            onChange={handleInputChange}
                          >
                            <option value="">Type</option>
                            <option value="Monthly">Per Monthly</option>
                            <option value="Yearly">LPA</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Number of Openings
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="openings"
                            value={formData.openings}
                            onChange={handleInputChange}
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Application Deadline
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Skills</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Add skill and press Enter"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddSkill(newSkill);
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleAddSkill(newSkill)}
                            >
                              Add
                            </button>
                          </div>
                          <div className="mt-2">
                            {formData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="badge bg-light me-1 mb-1"
                              >
                                {skill}
                                <button
                                  type="button"
                                  className="btn-close btn-close-white ms-1"
                                  onClick={() => handleRemoveSkill(skill)}
                                  style={{ fontSize: "0.5rem" }}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Contact Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Contact Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Company Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="companyUrl"
                            value={formData.companyUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Benefits</label>
                          <textarea
                            rows="3"
                            className="form-control"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleInputChange}
                            placeholder="Describe any benefits or perks"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Application Instructions
                          </label>
                          <textarea
                            rows="3"
                            className="form-control"
                            name="applicationInstructions"
                            value={formData.applicationInstructions}
                            onChange={handleInputChange}
                            placeholder="Special instructions for applicants"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "address" && (
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Location <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter job location (e.g., Bangalore, Karnataka)"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Location Types</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Add location type and press Enter"
                              value={newLocationType}
                              onChange={(e) =>
                                setNewLocationType(e.target.value)
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddLocationType(newLocationType);
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                handleAddLocationType(newLocationType)
                              }
                            >
                              Add
                            </button>
                          </div>
                          <div className="mt-2">
                            {formData.locationTypes.map((type, index) => (
                              <span
                                key={index}
                                className="badge bg-light me-1 mb-1"
                              >
                                {type}
                                <button
                                  type="button"
                                  className="btn-close btn-close-white ms-1"
                                  onClick={() => handleRemoveLocationType(type)}
                                  style={{ fontSize: "0.5rem" }}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remoteCheck"
                              name="isRemote"
                              checked={formData.isRemote || false}
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remoteCheck"
                            >
                              This is a Remote Job
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={
                activeTab === "basic-info"
                  ? () => onTabChange("address")
                  : handleSubmit
              }
            >
              {activeTab === "basic-info" ? "Save & Next" : "Post Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EditJobModal = ({ jobId, onClose, onJobUpdated }) => {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    category: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "month",
    jobType: "Full-time",
    experienceLevel: "",
    educationLevel: "",
    openings: "",
    locationTypes: [],
    location: "",
    isRemote: false,
    skills: [],
    benefits: "",
    contactEmail: "",
    contactPhone: "",
    companyUrl: "",
    applicationInstructions: "",
    deadline: "",
    priority: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newLocationType, setNewLocationType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job details when modal opens
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem("EmployerAdminToken");
        const response = await axios.get(
          `https://api.edprofio.com/employer/viewjobs/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobData = response.data;
        setFormData({
          companyName: jobData.companyName || "",
          jobTitle: jobData.jobTitle || "",
          description: jobData.description || "",
          category: jobData.category || "",
          salaryFrom: jobData.salaryFrom || "",
          salaryTo: jobData.salaryTo || "",
          salaryType: jobData.salaryType || "month",
          jobType: jobData.jobType || "Full-time",
          experienceLevel: jobData.experienceLevel || "",
          educationLevel: jobData.educationLevel || "",
          openings: jobData.openings || "",
          locationTypes: jobData.locationTypes || [],
          location: jobData.location || "",
          isRemote: jobData.isRemote || false,
          skills: jobData.skills || [],
          benefits: jobData.benefits || "",
          contactEmail: jobData.contactEmail || "",
          contactPhone: jobData.contactPhone || "",
          companyUrl: jobData.companyUrl || "",
          applicationInstructions: jobData.applicationInstructions || "",
          deadline: jobData.deadline ? jobData.deadline.split("T")[0] : "",
          priority: jobData.priority || "",
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        alert("Failed to load job details");
        onClose();
      }
    };

    fetchJobDetails();
  }, [jobId, onClose]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleAddLocationType = (type) => {
    if (type && !formData.locationTypes.includes(type)) {
      setFormData((prev) => ({
        ...prev,
        locationTypes: [...prev.locationTypes, type],
      }));
      setNewLocationType("");
    }
  };

  const handleRemoveLocationType = (typeToRemove) => {
    setFormData((prev) => ({
      ...prev,
      locationTypes: prev.locationTypes.filter((type) => type !== typeToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("EmployerAdminToken");

      const payload = {
        ...formData,
        deadline: formData.deadline
          ? new Date(formData.deadline).toISOString()
          : null,
      };

      const response = await axios.put(
        `https://api.edprofio.com/employer/editjob/${jobId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      onJobUpdated(response.data);
      toast.success("Job updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onClose();
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading job details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Edit Job</h4>
            <button
              type="button"
              className="btn-close custom-btn-close"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <X />
            </button>
          </div>

          <div className="modal-body pb-0">
            <div className="row">
              <div className="contact-grids-tab pt-0">
                <ul className="nav nav-underline" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "basic-info" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("basic-info")}
                    >
                      Basic Information
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${
                        activeTab === "address" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("address")}
                    >
                      Location
                    </button>
                  </li>
                </ul>
              </div>

              <div className="tab-content" id="myTabContent">
                {activeTab === "basic-info" && (
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Company Name <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Job Title <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Job Description{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <textarea
                            rows="4"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Category <span className="text-danger">*</span>
                          </label>
                          <select
                            className="form-select"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="">Select Category</option>
                            <option value="IT">IT</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                            <option value="Education">Education</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Job Type</label>
                          <select
                            className="form-select"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Job Type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                            <option value="Temporary">Temporary</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Experience Level</label>
                          <select
                            className="form-select"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Experience Level</option>
                            <option value="Entry Level">Entry Level</option>
                            <option value="Mid Level">Mid Level</option>
                            <option value="Senior Level">Senior Level</option>
                            <option value="Executive">Executive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Education Level</label>
                          <select
                            className="form-select"
                            name="educationLevel"
                            value={formData.educationLevel}
                            onChange={handleInputChange}
                          >
                            <option value="">Select Education Level</option>
                            <option value="High School">High School</option>
                            <option value="Diploma">Diploma</option>
                            <option value="Bachelor's">Bachelor's</option>
                            <option value="Master's">Master's</option>
                            <option value="PhD">PhD</option>
                            <option value="None">None</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Salary From <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="salaryFrom"
                            value={formData.salaryFrom}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">
                            Salary To <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="salaryTo"
                            value={formData.salaryTo}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label">Salary Type</label>
                          <select
                            className="form-select"
                            name="salaryType"
                            value={formData.salaryType}
                            onChange={handleInputChange}
                          >
                            <option value="">Type</option>
                            <option value="Monthly">Per Monthly</option>
                            <option value="Yearly">LPA</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Number of Openings
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            name="openings"
                            value={formData.openings}
                            onChange={handleInputChange}
                            min="1"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">
                            Application Deadline
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Skills</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Add skill and press Enter"
                              value={newSkill}
                              onChange={(e) => setNewSkill(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddSkill(newSkill);
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => handleAddSkill(newSkill)}
                            >
                              Add
                            </button>
                          </div>
                          <div className="mt-2">
                            {formData.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="badge bg-light me-1 mb-1"
                              >
                                {skill}
                                <button
                                  type="button"
                                  className="btn-close btn-close-white ms-1"
                                  onClick={() => handleRemoveSkill(skill)}
                                  style={{ fontSize: "0.5rem" }}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Contact Email</label>
                          <input
                            type="email"
                            className="form-control"
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Contact Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            name="contactPhone"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Company Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="companyUrl"
                            value={formData.companyUrl}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Benefits</label>
                          <textarea
                            rows="3"
                            className="form-control"
                            name="benefits"
                            value={formData.benefits}
                            onChange={handleInputChange}
                            placeholder="Describe any benefits or perks"
                          ></textarea>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Application Instructions
                          </label>
                          <textarea
                            rows="3"
                            className="form-control"
                            name="applicationInstructions"
                            value={formData.applicationInstructions}
                            onChange={handleInputChange}
                            placeholder="Special instructions for applicants"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "address" && (
                  <div className="tab-pane fade show active">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">
                            Location <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            placeholder="Enter job location (e.g., Bangalore, Karnataka)"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Location Types</label>
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              className="form-control me-2"
                              placeholder="Add location type and press Enter"
                              value={newLocationType}
                              onChange={(e) =>
                                setNewLocationType(e.target.value)
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleAddLocationType(newLocationType);
                                }
                              }}
                            />
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() =>
                                handleAddLocationType(newLocationType)
                              }
                            >
                              Add
                            </button>
                          </div>
                          <div className="mt-2">
                            {formData.locationTypes.map((type, index) => (
                              <span
                                key={index}
                                className="badge bg-light me-1 mb-1"
                              >
                                {type}
                                <button
                                  type="button"
                                  className="btn-close btn-close-white ms-1"
                                  onClick={() => handleRemoveLocationType(type)}
                                  style={{ fontSize: "0.5rem" }}
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="remoteCheck"
                              name="isRemote"
                              checked={formData.isRemote || false}
                              onChange={handleInputChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="remoteCheck"
                            >
                              This is a Remote Job
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light me-2"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={
                activeTab === "basic-info"
                  ? () => setActiveTab("address")
                  : handleSubmit
              }
              disabled={isSubmitting}
            >
              {activeTab === "basic-info"
                ? "Save & Next"
                : isSubmitting
                ? "Updating..."
                : "Update Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeerAdminJobList;
