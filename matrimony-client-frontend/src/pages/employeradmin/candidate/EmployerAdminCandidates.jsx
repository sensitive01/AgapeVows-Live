import React, { useState, useEffect } from "react";
import user13 from "../../../assets/employer-admin/assets/img/users/user-13.jpg";
// import AddNewCandidate from '../../../components/common/AddNewCAndidate';
import EmployerCandidatesDetails from "./EmployerCandidatesDetails";
import { FaArrowCircleUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeerChatSidebar from "./EmployeerChatSidebar";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import defaultEmployeeAvatar from "../../../assets/employer-admin/assets/img/profiles/avatar-12.jpg";

const EmployerAdminCandidates = () => {
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Role");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");
  const [selectedSort, setSelectedSort] = useState("Sort By: Last 7 Days");
  const [selectedExport, setSelectedExport] = useState("Export");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedCandidateForChat, setSelectedCandidateForChat] =
    useState(null);
  const navigate = useNavigate();

  // Extract roles dynamically from candidates data
  const getUniqueRoles = (candidates) => {
    const roles = new Set();
    candidates.forEach((candidate) => {
      if (candidate.jobrole) {
        roles.add(candidate.jobrole);
      }
    });
    return ["All", ...Array.from(roles)];
  };

  const statuses = [
    "All",
    "Pending",
    "Hold",
    "In Progress",
    "Interview Scheduled",
    "Hired",
    "Rejected",
  ];

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
        label: "Next Year",
        value: "nextyear",
        dateLabel: `01/01/${currentYear + 1} - 31/12/${currentYear + 1}`,
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
      setActiveDropdown("customRange"); // Keep dropdown open but switch to custom range view
      return;
    }

    setSelectedDateRange(option.dateLabel);
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
      case "nextyear":
        startDate = `${today.getFullYear() + 1}-01-01`;
        endDate = `${today.getFullYear() + 1}-12-31`;
        break;
      default:
        return;
    }

    setDateRange({ start: startDate, end: endDate });
    closeAllDropdowns();
  };

  const sortOptions = [
    "Recently Added",
    "Ascending",
    "Descending",
    "Last Month",
    "Last 7 Days",
  ];
  const exportToPDF = () => {
    const content = `
    <h1>Candidates List</h1>
    <table border="1" style="width:100%">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Job Role</th>
          <th>Status</th>
          <th>Applied Date</th>
        </tr>
      </thead>
      <tbody>
        ${filteredCandidates
          .map(
            (candidate) => `
          <tr>
            <td>${candidate.firstName} ${candidate.lastName || ""}</td>
            <td>${candidate.email || "N/A"}</td>
            <td>${candidate.phone || "N/A"}</td>
            <td>${candidate.jobrole || "N/A"}</td>
            <td>${candidate.employapplicantstatus || "N/A"}</td>
            <td>${
              new Date(candidate.appliedDate).toLocaleDateString("en-GB") ||
              "N/A"
            }</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
    <html>
      <head>
        <title>Candidates List</title>
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              window.close();
            }, 200);
          };
        </script>
      </body>
    </html>
  `);
    printWindow.document.close();
  };
  const exportToExcel = () => {
    // Create CSV content
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Job Role",
      "Status",
      "Applied Date",
    ];
    const rows = filteredCandidates.map((candidate) => [
      `"${candidate.firstName} ${candidate.lastName || ""}"`,
      `"${candidate.email || "N/A"}"`,
      `"${candidate.phone || "N/A"}"`,
      `"${candidate.jobrole || "N/A"}"`,
      `"${candidate.employapplicantstatus || "N/A"}"`,
      `"${
        new Date(candidate.appliedDate).toLocaleDateString("en-GB") || "N/A"
      }"`,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "candidates_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const exportOptions = [
    {
      label: "Export as PDF",
      icon: "ti ti-file-type-pdf",
      onClick: exportToPDF,
    },
    {
      label: "Export as Excel",
      icon: "ti ti-file-type-xls",
      onClick: exportToExcel,
    },
  ];

  const [openSections, setOpenSections] = useState({
    jobCategory: true,
    jobType: true,
    gender: true,
    salaryRange: true,
    location: true,
    qualification: true,
    experience: true,
  });

  const [filters, setFilters] = useState({
    jobCategories: [],
    jobTypes: [],
    gender: "",
    salaryFrom: "",
    salaryTo: "",
    location: "",
    qualification: "",
    experienceFrom: "",
    experienceTo: "",
    searchQuery: "",
    status: "",
  });

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

  useEffect(() => {
    filterCandidates();
  }, [filters, candidates, dateRange]);

  const toggleFavoriteStatus = async (applicationId, currentStatus) => {
    try {
      const token = localStorage.getItem("EmployerAdminToken");
      const employerAdminData = JSON.parse(
        localStorage.getItem("EmployerAdminData") || "{}"
      );

      if (!token || !employerAdminData._id) {
        navigate("/employer/login");
        return;
      }

      const response = await fetch(
        `https://api.edprofio.com/employer/updaee/${applicationId}/${employerAdminData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            favourite: !currentStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update favorite status");
      }

      // Update state only after successful API call
      setCandidates((prev) =>
        prev.map((candidate) => {
          if (candidate._id === applicationId) {
            return {
              ...candidate,
              favourite: !currentStatus,
            };
          }
          return candidate;
        })
      );

      setFilteredCandidates((prev) =>
        prev.map((candidate) => {
          if (candidate._id === applicationId) {
            return {
              ...candidate,
              favourite: !currentStatus,
            };
          }
          return candidate;
        })
      );
    } catch (error) {
      console.error("Error updating favorite status:", error);
      alert(`Error: ${error.message}`);
    }
  };
  const filterCandidates = () => {
    let result = [...candidates];

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      // Set time to beginning and end of day respectively
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      result = result.filter((candidate) => {
        if (!candidate.appliedDate) return false;

        const appliedDate = new Date(candidate.appliedDate);
        return appliedDate >= startDate && appliedDate <= endDate;
      });
    }

    // Search query filter
    if (filters.searchQuery.trim()) {
      const searchTerm = filters.searchQuery.toLowerCase().trim();
      result = result.filter((candidate) => {
        const searchFields = [
          candidate.firstName,
          candidate.lastName,
          candidate.email,
          candidate.phone,
          candidate.jobrole,
          candidate.currentcity,
          candidate.qualification,
          candidate.jobTitle,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchFields.includes(searchTerm);
      });
    }

    // Job role filter
    if (filters.jobCategories.length > 0) {
      result = result.filter((candidate) =>
        filters.jobCategories.includes(candidate.jobrole)
      );
    }

    // Location filter
    if (filters.location) {
      result = result.filter(
        (candidate) =>
          candidate.currentcity &&
          candidate.currentcity
            .toLowerCase()
            .includes(filters.location.toLowerCase())
      );
    }

    // Experience filter
    if (filters.experienceFrom || filters.experienceTo) {
      const from = parseInt(filters.experienceFrom) || 0;
      const to = parseInt(filters.experienceTo) || Infinity;

      result = result.filter((candidate) => {
        const exp = parseInt(candidate.experience) || 0;
        return exp >= from && exp <= to;
      });
    }

    // Gender filter
    if (filters.gender) {
      result = result.filter(
        (candidate) =>
          candidate.gender &&
          candidate.gender.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter(
        (candidate) =>
          candidate.employapplicantstatus &&
          candidate.employapplicantstatus.toLowerCase() ===
            filters.status.toLowerCase()
      );
    }

    // Sort candidates
    if (selectedSort.includes("Recently Added")) {
      result.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    } else if (selectedSort.includes("Ascending")) {
      result.sort((a, b) =>
        (a.firstName || "").localeCompare(b.firstName || "")
      );
    } else if (selectedSort.includes("Descending")) {
      result.sort((a, b) =>
        (b.firstName || "").localeCompare(a.firstName || "")
      );
    }

    setFilteredCandidates(result);
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const currentValues = [...prev[type]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }

      return {
        ...prev,
        [type]: currentValues,
      };
    });
  };

  const handleRadioChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      jobCategories: [],
      jobTypes: [],
      gender: "",
      salaryFrom: "",
      salaryTo: "",
      location: "",
      qualification: "",
      experienceFrom: "",
      experienceTo: "",
      searchQuery: "",
      status: "",
    });
    setDateRange({
      start: "",
      end: "",
    });
    setSelectedRole("Role");
    setSelectedStatus("Select Status");
    setSelectedSort("Sort By: Last 7 Days");
  };

  const handleSubmit = () => {
    filterCandidates();
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  const handleSubmitCandidate = (candidateData) => {
    console.log("Note Submitted", candidateData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search?.value || "";
    setFilters((prev) => ({
      ...prev,
      searchQuery,
    }));
  };

  const viewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowDetails(true);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "shortlisted":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      case "in progress":
        return "bg-info";
      case "pending":
        return "bg-warning";
      case "applied":
        return "bg-primary";
      default:
        return "bg-secondary";
    }
  };

  if (loading) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading candidates...</p>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="text-center py-5 text-danger">
            <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
            <h5>Error loading candidates</h5>
            <p>{error}</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  const roles = getUniqueRoles(candidates);

  return (
    <>
      <EmployerAdminHeader />

      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>
              &nbsp;<i className="fa fa-users text-primary"></i> Candidates
            </h2>
          </div>

          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* Date Range Picker */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown("dateRange")}
              >
                <i className="ti ti-calendar me-1"></i>
                {selectedDateRange}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  activeDropdown === "dateRange" ||
                  activeDropdown === "customRange"
                    ? "show"
                    : ""
                }`}
                style={{
                  display:
                    activeDropdown === "dateRange" ||
                    activeDropdown === "customRange"
                      ? "block"
                      : "none",
                  minWidth: "280px",
                }}
              >
                {activeDropdown === "customRange" ? (
                  // Custom Range Date Picker View
                  <li className="p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-0">Select Date Range</h6>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setActiveDropdown("dateRange")}
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
                          closeAllDropdowns();
                        }}
                      >
                        Clear
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
                          if (dateRange.start && dateRange.end) {
                            closeAllDropdowns();
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
                          onClick={() => handleDateRangeSelect(option)}
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
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown("role")}
              >
                {selectedRole}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  activeDropdown === "role" ? "show" : ""
                }`}
                style={{
                  display: activeDropdown === "role" ? "block" : "none",
                }}
              >
                {roles.map((role) => (
                  <li key={role}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedRole(role);
                        setFilters((prev) => ({
                          ...prev,
                          jobCategories: role === "All" ? [] : [role],
                        }));
                        closeAllDropdowns();
                      }}
                    >
                      {role}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Status Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown("status")}
              >
                {selectedStatus}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  activeDropdown === "status" ? "show" : ""
                }`}
                style={{
                  display: activeDropdown === "status" ? "block" : "none",
                }}
              >
                {statuses.map((status) => (
                  <li key={status}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedStatus(status);
                        setFilters((prev) => ({
                          ...prev,
                          status: status === "All" ? "" : status,
                        }));
                        closeAllDropdowns();
                      }}
                    >
                      {status}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sort Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown("sort")}
              >
                {selectedSort}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  activeDropdown === "sort" ? "show" : ""
                }`}
                style={{
                  display: activeDropdown === "sort" ? "block" : "none",
                }}
              >
                {sortOptions.map((option) => (
                  <li key={option}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        setSelectedSort(`Sort By: ${option}`);
                        closeAllDropdowns();
                        filterCandidates();
                      }}
                    >
                      {option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* View Toggle */}
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <button
                className="btn btn-icon btn-sm me-1"
                onClick={() => navigate("/employer-admin/candidate-list")}
              >
                <i className="ti ti-list-tree"></i>
              </button>
              <button
                className="btn btn-icon btn-sm active bg-secondary text-white"
                onClick={() => navigate("/employer-admin/new-candidate")}
              >
                <i className="ti ti-layout-grid"></i>
              </button>
            </div>

            {/* Export Dropdown */}
            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                onClick={() => toggleDropdown("export")}
              >
                <i className="ti ti-file-export me-1"></i>
                {selectedExport}
              </button>
              <ul
                className={`dropdown-menu dropdown-menu-end p-3 ${
                  activeDropdown === "export" ? "show" : ""
                }`}
                style={{
                  display: activeDropdown === "export" ? "block" : "none",
                  marginLeft: "-65px",
                }}
              >
                {exportOptions.map((option) => (
                  <li key={option.label}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => {
                        option.onClick();
                        closeAllDropdowns();
                      }}
                    >
                      <i className={`${option.icon} me-1`}></i>
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              {/* Filter Sidebar */}
              <div className="col-lg-3 col-md-6 card card-body">
                <div className="themesettings-inner offcanvas-body">
                  <div
                    className="accordion accordion-customicon1 accordions-items-seperate"
                    id="settingtheme"
                  >
                    <h3 className="mb-1 text-secondary">Filter Candidates</h3>
                    <p className="text-dark">Search & Filter</p>

                    {/* Job Category Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection("jobCategory")}
                        >
                          Select Job Category
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${
                                openSections.jobCategory ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openSections.jobCategory ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <div className="row gx-3">
                            <div className="form-group">
                              <div className="checkbox-limit">
                                <ul className="checkbox-list">
                                  {roles
                                    .filter((role) => role !== "All")
                                    .map((category) => (
                                      <li className="mb-2" key={category}>
                                        <label className="custom-checkbox">
                                          <input
                                            type="checkbox"
                                            checked={filters.jobCategories.includes(
                                              category
                                            )}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                "jobCategories",
                                                category
                                              )
                                            }
                                          />
                                          <span className="fake-checkbox"></span>
                                          <span className="label-text">
                                            {category}
                                          </span>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gender Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection("gender")}
                        >
                          Gender
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${
                                openSections.gender ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openSections.gender ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <div className="d-flex align-items-center">
                            <div className="theme-width m-0 me-2">
                              <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="male"
                                checked={filters.gender === "male"}
                                onChange={handleRadioChange}
                              />
                              <label
                                htmlFor="male"
                                className="d-block rounded fs-12"
                              >
                                Male
                              </label>
                            </div>
                            <div className="theme-width m-0">
                              <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="female"
                                checked={filters.gender === "female"}
                                onChange={handleRadioChange}
                              />
                              <label
                                htmlFor="female"
                                className="d-block rounded fs-12"
                              >
                                Female
                              </label>
                            </div>
                            <div className="theme-width m-1">
                              <input
                                type="radio"
                                id="any"
                                name="gender"
                                value=""
                                checked={!filters.gender}
                                onChange={handleRadioChange}
                              />
                              <label
                                htmlFor="any"
                                className="d-block rounded fs-12"
                              >
                                Any
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Location Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection("location")}
                        >
                          Location
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${
                                openSections.location ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openSections.location ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <div className="d-flex align-items-center">
                            <input
                              type="text"
                              id="location"
                              className="form-control"
                              placeholder="Choose Location"
                              value={filters.location}
                              onChange={(e) => handleInputChange(e)}
                              name="location"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Qualification Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection("qualification")}
                        >
                          Qualification
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${
                                openSections.qualification ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openSections.qualification ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body">
                          <div className="row gx-3">
                            <input
                              type="text"
                              id="qualification"
                              className="form-control"
                              placeholder="Qualification"
                              value={filters.qualification}
                              onChange={(e) => handleInputChange(e)}
                              name="qualification"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Experience Accordion */}
                    <div className="accordion-item">
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button text-dark fs-16 align-items-center justify-content-between"
                          type="button"
                          onClick={() => toggleSection("experience")}
                        >
                          Experience
                          <span>
                            <FaArrowCircleUp
                              className={`text-primary transition-all duration-300 ${
                                openSections.experience ? "rotate-180" : ""
                              }`}
                              size={20}
                            />
                          </span>
                        </button>
                      </h2>
                      <div
                        className={`accordion-collapse collapse ${
                          openSections.experience ? "show" : ""
                        }`}
                      >
                        <div className="accordion-body pb-0">
                          <div className="row gx-3">
                            <div className="price-inputs d-flex mb-3">
                              <input
                                type="text"
                                id="experience-from"
                                className="form-control me-3"
                                placeholder="From"
                                value={filters.experienceFrom}
                                onChange={(e) => handleInputChange(e)}
                                name="experienceFrom"
                              />
                              <input
                                type="text"
                                id="experience-to"
                                className="form-control"
                                placeholder="To"
                                value={filters.experienceTo}
                                onChange={(e) => handleInputChange(e)}
                                name="experienceTo"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-3 pt-5">
                  <div className="row gx-3">
                    <div className="col-6">
                      <button
                        id="resetbutton"
                        className="btn btn-light close-theme w-100"
                        onClick={handleReset}
                      >
                        <i className="ti ti-restore me-1"></i>Reset
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        className="btn btn-secondary w-100"
                        onClick={handleSubmit}
                      >
                        <i className="ti ti-circle-check me-1"></i>Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="col-lg-9 col-md-6">
                <div className="card">
                  <div className="card-body">
                    <form onSubmit={handleSearch}>
                      <div className="d-flex align-items-center">
                        <input
                          type="text"
                          name="search"
                          className="form-control flex-fill me-2"
                          placeholder="Search Candidates (name, email, skills, etc.)"
                          defaultValue={filters.searchQuery}
                        />
                        <button
                          type="submit"
                          className="btn btn-secondary"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* Candidates Count */}
                <div className="mb-3">
                  <span className="badge bg-warning">
                    {filteredCandidates.length}{" "}
                    {filteredCandidates.length === 1
                      ? "candidate"
                      : "candidates"}{" "}
                    found
                  </span>
                </div>

                {/* Candidates Grid */}
                <div className="row">
                  {filteredCandidates.length > 0 ? (
                    filteredCandidates.map((candidate) => (
                      <div
                        key={candidate._id}
                        className="col-xxl-12 col-xl-4 col-md-6"
                      >
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                              <div className="d-flex align-items-center">
                                <a
                                  href="javascript:void(0);"
                                  className="avatar flex-shrink-0"
                                >
                                  <img
                                    src={candidate.profileurl || user13}
                                    className="img-fluid h-auto w-auto"
                                    alt="img"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = user13;
                                    }}
                                  />
                                </a>
                                <div className="ms-2">
                                  <h6 className="fs-14 fw-medium text-truncate text-primary mb-1">
                                    <a
                                      className="text-secondary"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        viewCandidateDetails(candidate);
                                      }}
                                    >
                                      {candidate.firstName}{" "}
                                      {candidate.lastName || ""} &nbsp; | &nbsp;
                                      <span className="text-dark">
                                        <i className="ti ti-eye"></i> View
                                        Profile
                                      </span>
                                    </a>
                                  </h6>
                                  <p className="fs-13">
                                    <b>Applied On:</b>{" "}
                                    {new Date(
                                      candidate.appliedDate
                                    ).toLocaleDateString("en-GB")}{" "}
                                    &nbsp; | &nbsp;
                                    <span
                                      className={`badge ${getStatusBadgeClass(
                                        candidate.employapplicantstatus
                                      )}`}
                                    >
                                      {candidate.employapplicantstatus ||
                                        "Pending"}
                                    </span>{" "}
                                    &nbsp; | &nbsp;
                                    {candidate.resume?.url && (
                                      <a
                                        href={candidate.resume.url}
                                        className="fw-medium text-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <i className="ti ti-download"></i>{" "}
                                        Download Resume
                                      </a>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex align-items-center">
                                {candidate.phone && (
                                  <a
                                    href={`tel:${candidate.phone}`}
                                    className="btn btn-light text-success btn-icon btn-sm me-1"
                                  >
                                    <i className="ti ti-phone fs-16"></i>
                                  </a>
                                )}
                                {candidate.email && (
                                  <a
                                    href={`mailto:${candidate.email}`}
                                    className="btn btn-light btn-icon text-danger btn-sm me-1"
                                  >
                                    <i className="ti ti-mail-bolt fs-16"></i>
                                  </a>
                                )}

                                <a
                                  href="#"
                                  className="btn btn-light text-info btn-icon text-info btn-sm me-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setSelectedCandidateForChat(candidate);
                                    setIsChatOpen(true);
                                  }}
                                >
                                  <i className="ti ti-brand-hipchat fs-16"></i>
                                </a>

                                <a
                                  href="#"
                                  className={`btn btn-light ${
                                    candidate.favourite
                                      ? "text-danger"
                                      : "text-primary"
                                  } btn-icon btn-sm`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toggleFavoriteStatus(
                                      candidate._id,
                                      candidate.favourite
                                    );
                                  }}
                                  style={
                                    candidate.favourite
                                      ? {
                                          backgroundColor: "#ffd700",
                                          borderColor: "white",
                                        }
                                      : {}
                                  }
                                >
                                  <i
                                    className={`ti ti-bookmark fs-16 ${
                                      candidate.favourite ? "filled" : ""
                                    }`}
                                    style={
                                      candidate.favourite
                                        ? { color: "white" }
                                        : {}
                                    }
                                  ></i>
                                </a>
                              </div>
                            </div>
                            <div className="bg-light rounder p-2">
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span>
                                  <b>Experience</b> :{" "}
                                  {candidate.experience || "0"} Years
                                </span>
                                <span>
                                  <b>Job Role</b> :{" "}
                                  {candidate.jobrole || "Not specified"}
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span>
                                  <b>Gender</b> :{" "}
                                  {candidate.gender || "Not specified"}
                                </span>
                                <span>
                                  <b>Email</b> :{" "}
                                  {candidate.email || "Not specified"}
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between mb-2">
                                <span>
                                  <b>Phone</b> :{" "}
                                  {candidate.phone || "Not specified"}
                                </span>
                                <span>
                                  <b>Qualification</b> :{" "}
                                  {candidate.qualification || "Not specified"}
                                </span>
                              </div>
                              <div className="d-flex align-items-center justify-content-between">
                                <span>
                                  <b>Current Location</b> :{" "}
                                  {candidate.currentcity || "Not specified"}
                                </span>
                                <span>
                                  <button
                                    className="fs-10 fw-bold badge bg-warning"
                                    onClick={() =>
                                      viewCandidateDetails(candidate)
                                    }
                                  >
                                    <i className="ti ti-eye"></i> View Profile
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <img
                        src={defaultEmployeeAvatar}
                        alt="No candidates found"
                        width="150"
                        className="mb-3"
                      />
                      <h4>No candidates found</h4>
                      <p className="text-muted">
                        Try adjusting your search filters
                      </p>
                    </div>
                  )}

                  {filteredCandidates.length > 0 && (
                    <div className="col-md-12">
                      <div align="right" className="mb-4">
                        <a href="new-candidate" className="btn btn-secondary">
                          <i className="ti ti-loader-3 me-1"></i>Load More
                        </a>
                      </div>
                    </div>
                  )}
                </div>
                {/* /Candidates Grid */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Details Modal */}
      {selectedCandidate && (
        <EmployerCandidatesDetails
          show={showDetails}
          onClose={() => setShowDetails(false)}
          candidate={selectedCandidate}
        />
      )}
      {isChatOpen && (
        <EmployeerChatSidebar
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          candidate={selectedCandidateForChat}
        />
      )}
      <EmployerAdminFooter />
    </>
  );
};

export default EmployerAdminCandidates;
