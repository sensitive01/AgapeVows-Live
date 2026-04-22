import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";
import defaultImage from "../../../../public/images/people-img-01.jpg"

const EmployerList = () => {
  const navigate = useNavigate();
  const [employers, setEmployers] = useState([]);
  const [filteredEmployers, setFilteredEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [selectedEmployers, setSelectedEmployers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [showAddEmployerModal, setShowAddEmployerModal] = useState(false);
  const [showEditEmployerModal, setShowEditEmployerModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employerToDelete, setEmployerToDelete] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [editedEmployer, setEditedEmployer] = useState(null);

  const [newEmployer, setNewEmployer] = useState({
    employerType: "",
    schoolName: "",
    firstName: "",
    lastName: "",
    userEmail: "",
    userMobile: "",
    userPassword: "",
    referralCode: "",
  });

  // Dynamic filter states
  const [employerTypes, setEmployerTypes] = useState({});
  const [institutionTypes, setInstitutionTypes] = useState({});
  const [states, setStates] = useState({});
  const [subscriptionStatus, setSubscriptionStatus] = useState("All");
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

  const handleNewEmployerChange = (e) => {
    const { name, value } = e.target;
    setNewEmployer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Add Employer form submission
  const handleAddEmployer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Basic validation
      if (!newEmployer.userEmail && !newEmployer.userMobile) {
        throw new Error("Email or mobile is required");
      }

      if (!newEmployer.userPassword) {
        throw new Error("Password is required");
      }

      const response = await fetch("https://api.edprofio.com/employer/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployer),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add employer");
      }

      const data = await response.json();

      // Add the new employer to the list
      const addedEmployer = {
        ...data.data,
        _id: data.data.id,
        verificationstatus: data.data.verificationstatus || "pending",
        blockstatus: data.data.blockstatus || "unblock",
      };

      setEmployers((prev) => [...prev, addedEmployer]);
      setFilteredEmployers((prev) => [...prev, addedEmployer]);

      // Close modal and reset form
      setShowAddEmployerModal(false);
      setNewEmployer({
        employerType: "",
        schoolName: "",
        firstName: "",
        lastName: "",
        userEmail: "",
        userMobile: "",
        userPassword: "",
        referralCode: "",
      });
    } catch (err) {
      console.error("Add employer error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmployers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.edprofio.com/admin/getallemployers"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch employers");
        }

        const data = await response.json();
        setEmployers(data.data || []);
        setFilteredEmployers(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployers();
  }, []);

  // Extract filter options from employers
  useEffect(() => {
    if (employers.length > 0) {
      // Get unique employer types
      const types = [
        ...new Set(employers.map((e) => e.employerType).filter(Boolean)),
      ];
      const initialTypes = types.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      // Get unique institution types
      const instTypes = [
        ...new Set(employers.map((e) => e.institutionType).filter(Boolean)),
      ];
      const initialInstTypes = instTypes.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      // Get unique states
      const uniqueStates = [
        ...new Set(employers.map((e) => e.state).filter(Boolean)),
      ];
      const initialStates = uniqueStates.reduce((acc, state) => {
        acc[state] = false;
        return acc;
      }, {});

      setEmployerTypes(initialTypes);
      setInstitutionTypes(initialInstTypes);
      setStates(initialStates);
    }
  }, [employers]);

  // Replace the existing setShowEditEmployerModal calls with this:

  const fetchEmployerDetails = async (employerId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.edprofio.com/employer/fetchemployer/${employerId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employer details");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Fetch employer error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async (employer) => {
    setSelectedEmployer(employer);
    setLoading(true);

    try {
      const details = await fetchEmployerDetails(employer._id);
      if (details) {
        setEditedEmployer({
          firstName: details.firstName || "",
          lastName: details.lastName || "",
          userEmail: details.userEmail || "",
          userMobile: details.userMobile || "",
          address: details.address || "",
          state: details.state || "",
          pincode: details.pincode || "",
          city: details.city || "",
          schoolName: details.schoolName || "",
          website: details.website || "",
          board: details.board || "",
          institutionType: details.institutionType || "",
          employerType: details.employerType || "",
          organizationid: details.organizationid || "",
        });
        setShowEditEmployerModal(true);
      }
    } catch (err) {
      console.error("Error loading employer details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const handleUpdateEmployer = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.edprofio.com/employer/updateemployer/${selectedEmployer._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedEmployer),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employer");
      }

      const data = await response.json();

      // Update the local state
      setEmployers(
        employers.map((employer) =>
          employer._id === selectedEmployer._id
            ? { ...employer, ...editedEmployer }
            : employer
        )
      );

      setFilteredEmployers(
        filteredEmployers.map((employer) =>
          employer._id === selectedEmployer._id
            ? { ...employer, ...editedEmployer }
            : employer
        )
      );

      setShowEditEmployerModal(false);
    } catch (err) {
      console.error("Update error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...employers];

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      // Set time to beginning and end of day respectively
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((employer) => {
        if (!employer.createdAt) return false;
        const createdDate = new Date(employer.createdAt);
        return createdDate >= startDate && createdDate <= endDate;
      });
    }

    // Type filter
    if (selectedType !== "All") {
      filtered = filtered.filter(
        (employer) => employer.employerType === selectedType
      );
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (employer) => employer.verificationstatus === selectedStatus
      );
    }

    // Subscription status filter
    if (subscriptionStatus !== "All") {
      if (subscriptionStatus === "subscribed") {
        filtered = filtered.filter(
          (employer) => employer.subscription === "true"
        );
      } else if (subscriptionStatus === "trial") {
        filtered = filtered.filter((employer) => employer.trial === "true");
      } else {
        filtered = filtered.filter(
          (employer) =>
            employer.subscription === "false" && employer.trial === "false"
        );
      }
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (employer) =>
          employer.schoolName?.toLowerCase().includes(term) ||
          employer.userEmail?.toLowerCase().includes(term) ||
          `${employer.firstName || ""} ${employer.lastName || ""}`
            .toLowerCase()
            .includes(term) ||
          employer.userMobile?.includes(term)
      );
    }

    // Employer Type filter
    const selectedEmployerTypes = Object.keys(employerTypes).filter(
      (type) => employerTypes[type]
    );
    if (selectedEmployerTypes.length > 0) {
      filtered = filtered.filter((employer) =>
        selectedEmployerTypes.includes(employer.employerType)
      );
    }

    // Institution Type filter
    const selectedInstitutionTypes = Object.keys(institutionTypes).filter(
      (type) => institutionTypes[type]
    );
    if (selectedInstitutionTypes.length > 0) {
      filtered = filtered.filter(
        (employer) =>
          employer.institutionType &&
          selectedInstitutionTypes.includes(employer.institutionType)
      );
    }

    // State filter
    const selectedStates = Object.keys(states).filter((state) => states[state]);
    if (selectedStates.length > 0) {
      filtered = filtered.filter(
        (employer) => employer.state && selectedStates.includes(employer.state)
      );
    }

    setFilteredEmployers(filtered);
    setShowFilterSidebar(false);
  };

  // Reset all filters
  const resetFilters = () => {
    // Reset employer types
    const resetTypes = Object.keys(employerTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    // Reset institution types
    const resetInstTypes = Object.keys(institutionTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    // Reset states
    const resetStates = Object.keys(states).reduce((acc, state) => {
      acc[state] = false;
      return acc;
    }, {});

    setEmployerTypes(resetTypes);
    setInstitutionTypes(resetInstTypes);
    setStates(resetStates);
    setSelectedType("All");
    setSelectedStatus("All");
    setSubscriptionStatus("All");
    setDateRange({ start: "", end: "" });
    setSelectedDateRange("This Year");
    setFilteredEmployers(employers);
  };

  // Handle employer type checkbox change
  const handleEmployerTypeChange = (type) => {
    setEmployerTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle institution type checkbox change
  const handleInstitutionTypeChange = (type) => {
    setInstitutionTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Handle state checkbox change
  const handleStateChange = (state) => {
    setStates((prev) => ({
      ...prev,
      [state]: !prev[state],
    }));
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters();
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    applyFilters();
  };

  const handleSubscriptionFilter = (status) => {
    setSubscriptionStatus(status);
    applyFilters();
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployers(filteredEmployers.map((employer) => employer._id));
    } else {
      setSelectedEmployers([]);
    }
  };

  const handleSelectEmployer = (employerId) => {
    if (selectedEmployers.includes(employerId)) {
      setSelectedEmployers(selectedEmployers.filter((id) => id !== employerId));
    } else {
      setSelectedEmployers([...selectedEmployers, employerId]);
    }
  };

  const handleDeleteClick = (employer) => {
    setEmployerToDelete(employer);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (employerToDelete) {
        const response = await fetch(
          `https://api.edprofio.com/admin/deleteemployer/${employerToDelete._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete employer");
        }

        // Remove the deleted employer from state
        setEmployers(employers.filter((e) => e._id !== employerToDelete._id));
        setFilteredEmployers(
          filteredEmployers.filter((e) => e._id !== employerToDelete._id)
        );
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setEmployerToDelete(null);
    }
  };

  const handleBlockStatusToggle = async (employerId, currentStatus) => {
    try {
      const newStatus = currentStatus === "block" ? "unblock" : "block";

      const response = await fetch(
        `https://api.edprofio.com/admin/updateblockstatus/${employerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ blockstatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update block status");
      }

      // Update the local state
      setEmployers(
        employers.map((employer) =>
          employer._id === employerId
            ? { ...employer, blockstatus: newStatus }
            : employer
        )
      );

      setFilteredEmployers(
        filteredEmployers.map((employer) =>
          employer._id === employerId
            ? { ...employer, blockstatus: newStatus }
            : employer
        )
      );
    } catch (err) {
      console.error("Error updating block status:", err);
      setError(err.message);
    }
  };

  const handleVerificationStatusToggle = async (employerId, currentStatus) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";

      const response = await fetch(
        `https://api.edprofio.com/admin/approveemployer/${employerId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ verificationstatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update verification status");
      }

      // Update the local state
      setEmployers(
        employers.map((employer) =>
          employer._id === employerId
            ? { ...employer, verificationstatus: newStatus }
            : employer
        )
      );

      setFilteredEmployers(
        filteredEmployers.map((employer) =>
          employer._id === employerId
            ? { ...employer, verificationstatus: newStatus }
            : employer
        )
      );
    } catch (err) {
      console.error("Error updating verification status:", err);
      setError(err.message);
    }
  };

  const viewEmployerDetails = (employer) => {
    setSelectedEmployer(employer);
    setShowDetails(true);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "badge bg-success";
      case "pending":
        return "badge bg-warning";
      case "rejected":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const getSubscriptionBadge = (subscription, trial) => {
    if (trial === "true") {
      return "badge bg-info";
    } else if (subscription === "true") {
      return "badge bg-success";
    } else {
      return "badge bg-secondary";
    }
  };

  const getSubscriptionText = (subscription, trial) => {
    if (trial === "true") {
      return "Trial";
    } else if (subscription === "true") {
      return "Subscribed";
    } else {
      return "Not Subscribed";
    }
  };

  useEffect(() => {
    applyFilters();
  }, [
    selectedType,
    selectedStatus,
    subscriptionStatus,
    searchTerm,
    dateRange,
    employerTypes,
    institutionTypes,
    states,
  ]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleExport = (type) => {
    // Prepare data for export (simplify if needed)
    const exportData = filteredEmployers.map((employer) => ({
      ID: `Emp-${employer._id.substring(employer._id.length - 4)}`,
      Name:
        employer.schoolName ||
        `${employer.firstName || ""} ${employer.lastName || ""}`.trim(),
      Type: employer.employerType || "N/A",
      Email: employer.userEmail || "N/A",
      Phone: employer.userMobile || "N/A",
      Status: employer.verificationstatus || "pending",
      "Created Date": formatDate(employer.createdAt),
    }));

    if (type === "pdf") {
      // Simple PDF export using browser print
      const printWindow = window.open("", "_blank");
      const htmlContent = `
      <html>
        <head>
          <title>Employers Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Employers List</h1>
          <table>
            <thead>
              <tr>
                ${Object.keys(exportData[0])
                  .map((key) => `<th>${key}</th>`)
                  .join("")}
              </tr>
            </thead>
            <tbody>
              ${exportData
                .map(
                  (row) => `
                <tr>
                  ${Object.values(row)
                    .map((value) => `<td>${value}</td>`)
                    .join("")}
                </tr>
              `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.print();
    } else if (type === "excel") {
      // CSV export (works in Excel)
      const headers = Object.keys(exportData[0]).join(",");
      const csvContent = [
        headers,
        ...exportData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employers_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading employers...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <AdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>
              &nbsp; <i className="fa fa-building text-primary"></i> Employers
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
                {selectedType || "Type"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("All")}
                  >
                    All Types
                  </button>
                </li>
                {Array.from(
                  new Set(employers.map((e) => e.employerType).filter(Boolean))
                ).map((type) => (
                  <li key={type}>
                    <button
                      className="dropdown-item rounded-1"
                      onClick={() => handleTypeFilter(type)}
                    >
                      {type}
                    </button>
                  </li>
                ))}
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
                    onClick={() => handleStatusFilter("approved")}
                  >
                    Approved
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("pending")}
                  >
                    Pending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("rejected")}
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
                onClick={() => navigate("/employer-admin/employer-list")}
              >
                <i className="ti ti-list-tree"></i>
              </button>
              <button
                className="btn btn-icon btn-sm"
                onClick={() => navigate("/employer-admin/new-employer")}
              >
                <i className="ti ti-layout-grid"></i>
              </button>
            </div>

            <div className="dropdown me-2">
              <button
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i className="ti ti-file-export me-1"></i>Export
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleExport("pdf")}
                  >
                    <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleExport("excel")}
                  >
                    <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                  </button>
                </li>
              </ul>
            </div>

            <button
              className="btn btn-primary d-flex align-items-center"
              onClick={() => setShowAddEmployerModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>Add Employer
            </button>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card bg-primary text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">Total Employers</h6>
                    <h3 className="mb-0">{employers.length}</h3>
                  </div>
                  <i className="fas fa-users fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">Approved</h6>
                    <h3 className="mb-0">
                      {
                        employers.filter(
                          (e) => e.verificationstatus === "approved"
                        ).length
                      }
                    </h3>
                  </div>
                  <i className="fas fa-check-circle fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-info text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">New This Week</h6>
                    <h3 className="mb-0">
                      {
                        employers.filter((e) => {
                          const createdDate = new Date(e.createdAt);
                          const sevenDaysAgo = new Date();
                          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                          return createdDate > sevenDaysAgo;
                        }).length
                      }
                    </h3>
                  </div>
                  <i className="fas fa-plus-circle fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-danger text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">Rejected</h6>
                    <h3 className="mb-0">
                      {
                        employers.filter(
                          (e) => e.verificationstatus === "rejected"
                        ).length
                      }
                    </h3>
                  </div>
                  <i className="fas fa-times-circle fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
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
                            selectedEmployers.length ===
                              filteredEmployers.length &&
                            filteredEmployers.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>Emp ID</th>
                    <th>Employer</th>
                    <th>Type</th>
                    <th>Contact</th>
                    <th>Created Date</th>
                    <th>Subscription</th>
                    <th>Status</th>
                    <th>Block Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployers.length > 0 ? (
                    filteredEmployers.map((employer) => (
                      <tr key={employer._id}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedEmployers.includes(employer._id)}
                              onChange={() =>
                                handleSelectEmployer(employer._id)
                              }
                            />
                          </div>
                        </td>
                        <td>
                          Emp-{employer._id.substring(employer._id.length - 4)}
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="position-relative me-3">
                              {employer.userProfilePic ? (
                                <img
                                  src={employer.userProfilePic}
                                  className="rounded-circle"
                                  alt={employer.schoolName || `${employer.firstName} ${employer.lastName}`.trim()}
                                  style={{
                                    width: '45px',
                                    height: '45px',
                                    objectFit: 'cover',
                                    border: '2px solid #e9ecef'
                                  }}
                                />
                              ) : (
                                <div 
                                  className="d-flex align-items-center justify-content-center rounded-circle"
                                  style={{
                                    width: '45px',
                                    height: '45px',
                                    backgroundColor: '#4e73df',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: '18px',
                                    border: '2px solid #e9ecef'
                                  }}
                                >
                                  {(
                                    employer.schoolName ||
                                    employer.firstName ||
                                    "E"
                                  ).charAt(0).toUpperCase()}
                                </div>
                              )}
                              {employer.verificationstatus === 'verified' && (
                                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-2 border-white">
                                  <i className="ti ti-check text-white" style={{fontSize: '10px'}}></i>
                                </span>
                              )}
                            </div>
                            <div className="d-flex flex-column">
                              <h6 className="mb-1 fw-semibold">
                                <a 
                                  href="#" 
                                  className="text-dark"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    viewEmployerDetails(employer);
                                  }}
                                >
                                  {employer.schoolName ||
                                    `${employer.firstName || ""} ${
                                      employer.lastName || ""
                                    }`.trim()}
                                </a>
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <span className="text-muted small d-flex align-items-center me-2">
                                  <i className="ti ti-mail me-1"></i>
                                  {employer.userEmail || 'N/A'}
                                </span>
                                {employer.userMobile && (
                                  <span className="text-muted small d-flex align-items-center">
                                    <i className="ti ti-phone me-1"></i>
                                    {employer.userMobile}
                                  </span>
                                )}
                              </div>
                              {(employer.city || employer.state) && (
                                <div className="mt-1">
                                  <span className="badge bg-light text-dark border d-inline-flex align-items-center">
                                    <i className="ti ti-map-pin me-1"></i>
                                    {[employer.city, employer.state].filter(Boolean).join(', ')}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>{employer.employerType || "N/A"}</td>
                        <td>
                          <div className="action-icon d-inline-flex">
                            <a
                              href={`tel:${employer.userMobile}`}
                              className="me-2"
                            >
                              <i className="ti ti-phone text-success"></i>
                            </a>
                            <a
                              href={`mailto:${employer.userEmail}`}
                              className="me-2"
                            >
                              <i className="ti ti-mail text-danger"></i>
                            </a>
                          </div>
                        </td>
                        <td>{formatDate(employer.createdAt)}</td>
                        <td>
                          <span
                            className={`badge ${getSubscriptionBadge(
                              employer.subscription,
                              employer.trial
                            )}`}
                          >
                            {getSubscriptionText(
                              employer.subscription,
                              employer.trial
                            )}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadge(
                              employer.verificationstatus
                            )}`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleVerificationStatusToggle(
                                employer._id,
                                employer.verificationstatus
                              )
                            }
                          >
                            {employer.verificationstatus || "pending"}
                          </span>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={employer.blockstatus === "unblock"}
                              onChange={() =>
                                handleBlockStatusToggle(
                                  employer._id,
                                  employer.blockstatus
                                )
                              }
                            />
                            <label className="form-check-label">
                              {employer.blockstatus === "unblock"
                                ? "Unblock"
                                : "Blocked"}
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm btn-icon btn-primary-light me-2"
                              onClick={() => handleEditClick(employer)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-icon btn-danger-light"
                              onClick={() => handleDeleteClick(employer)}
                            >
                              <i className="ti ti-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="10" className="text-center py-4">
                        No employers found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination could go here */}

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
              <h3 className="mb-1 text-white">Filter Employers</h3>
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
              {/* Employer Types */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#employerTypes"
                    aria-expanded="true"
                  >
                    Employer Types
                  </button>
                </h2>
                <div
                  id="employerTypes"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="row gx-3">
                      <div className="form-group">
                        <div className="checkbox-limit">
                          <ul className="checkbox-list">
                            {Object.keys(employerTypes).map((type) => (
                              <React.Fragment key={type}>
                                <li>
                                  <label className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={employerTypes[type]}
                                      onChange={() =>
                                        handleEmployerTypeChange(type)
                                      }
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

              {/* Institution Types */}
              {Object.keys(institutionTypes).length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-dark fs-16"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#institutionTypes"
                      aria-expanded="true"
                    >
                      Institution Types
                    </button>
                  </h2>
                  <div
                    id="institutionTypes"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gx-3">
                        <div className="form-group">
                          <div className="checkbox-limit">
                            <ul className="checkbox-list">
                              {Object.keys(institutionTypes).map((type) => (
                                <React.Fragment key={type}>
                                  <li>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={institutionTypes[type]}
                                        onChange={() =>
                                          handleInstitutionTypeChange(type)
                                        }
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
              )}

              {/* States */}
              {Object.keys(states).length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-dark fs-16"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#states"
                      aria-expanded="true"
                    >
                      States
                    </button>
                  </h2>
                  <div id="states" className="accordion-collapse collapse show">
                    <div className="accordion-body">
                      <div className="row gx-3">
                        <div className="form-group">
                          <div
                            className="checkbox-limit"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                          >
                            <ul className="checkbox-list">
                              {Object.keys(states).map((state) => (
                                <React.Fragment key={state}>
                                  <li>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={states[state]}
                                        onChange={() =>
                                          handleStateChange(state)
                                        }
                                      />
                                      <span className="fake-checkbox"></span>
                                      <span className="label-text">
                                        {state}
                                      </span>
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
              )}

              {/* Verification Status */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#verificationStatus"
                    aria-expanded="true"
                  >
                    Verification Status
                  </button>
                </h2>
                <div
                  id="verificationStatus"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="d-flex align-items-center">
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="allStatus"
                          checked={selectedStatus === "All"}
                          onChange={() => setSelectedStatus("All")}
                        />
                        <label
                          htmlFor="allStatus"
                          className="d-block rounded fs-12"
                        >
                          All
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="approvedStatus"
                          checked={selectedStatus === "approved"}
                          onChange={() => setSelectedStatus("approved")}
                        />
                        <label
                          htmlFor="approvedStatus"
                          className="d-block rounded fs-12"
                        >
                          Approved
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="pendingStatus"
                          checked={selectedStatus === "pending"}
                          onChange={() => setSelectedStatus("pending")}
                        />
                        <label
                          htmlFor="pendingStatus"
                          className="d-block rounded fs-12"
                        >
                          Pending
                        </label>
                      </div>
                      <div className="theme-width m-1">
                        <input
                          type="radio"
                          name="verificationStatus"
                          id="rejectedStatus"
                          checked={selectedStatus === "rejected"}
                          onChange={() => setSelectedStatus("rejected")}
                        />
                        <label
                          htmlFor="rejectedStatus"
                          className="d-block rounded fs-12"
                        >
                          Rejected
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription Status */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#subscriptionStatus"
                    aria-expanded="true"
                  >
                    Subscription Status
                  </button>
                </h2>
                <div
                  id="subscriptionStatus"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="d-flex align-items-center">
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="subscriptionStatus"
                          id="allSubStatus"
                          checked={subscriptionStatus === "All"}
                          onChange={() => setSubscriptionStatus("All")}
                        />
                        <label
                          htmlFor="allSubStatus"
                          className="d-block rounded fs-12"
                        >
                          All
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="subscriptionStatus"
                          id="subscribedStatus"
                          checked={subscriptionStatus === "subscribed"}
                          onChange={() => setSubscriptionStatus("subscribed")}
                        />
                        <label
                          htmlFor="subscribedStatus"
                          className="d-block rounded fs-12"
                        >
                          Subscribed
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="subscriptionStatus"
                          id="trialStatus"
                          checked={subscriptionStatus === "trial"}
                          onChange={() => setSubscriptionStatus("trial")}
                        />
                        <label
                          htmlFor="trialStatus"
                          className="d-block rounded fs-12"
                        >
                          Trial
                        </label>
                      </div>
                      <div className="theme-width m-1">
                        <input
                          type="radio"
                          name="subscriptionStatus"
                          id="notSubscribedStatus"
                          checked={subscriptionStatus === "notSubscribed"}
                          onChange={() =>
                            setSubscriptionStatus("notSubscribed")
                          }
                        />
                        <label
                          htmlFor="notSubscribedStatus"
                          className="d-block rounded fs-12"
                        >
                          Not Subscribed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#dateRange"
                    aria-expanded="true"
                  >
                    Date Range
                  </button>
                </h2>
                <div
                  id="dateRange"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body pb-0">
                    <div className="row gx-3">
                      <div className="form-group">
                        <div className="price-inputs d-flex">
                          <input
                            type="date"
                            className="form-control"
                            placeholder="From"
                            value={dateRange.start}
                            onChange={(e) =>
                              setDateRange({
                                ...dateRange,
                                start: e.target.value,
                              })
                            }
                          />
                          <input
                            type="date"
                            className="form-control"
                            placeholder="To"
                            value={dateRange.end}
                            onChange={(e) =>
                              setDateRange({
                                ...dateRange,
                                end: e.target.value,
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
                <button
                  className="btn btn-primary w-100"
                  onClick={applyFilters}
                >
                  <i className="ti ti-circle-check me-1"></i>Apply
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeleteModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this employer?</p>
                  {employerToDelete && (
                    <div className="alert alert-warning">
                      <strong>Employer:</strong>{" "}
                      {employerToDelete.schoolName ||
                        `${employerToDelete.firstName || ""} ${
                          employerToDelete.lastName || ""
                        }`.trim()}
                      <br />
                      <strong>Email:</strong> {employerToDelete.userEmail}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Employer Details Modal */}
        {showDetails && selectedEmployer && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Employer Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDetails(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-4 text-center mb-4">
                      {selectedEmployer.userProfilePic ? (
                        <img
                          src={selectedEmployer.userProfilePic}
                          alt="Profile"
                          className="rounded-circle mb-3"
                          width="120"
                          height="120"
                        />
                      ) : (
                        <div
                          className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                          style={{
                            width: "120px",
                            height: "120px",
                            fontSize: "48px",
                          }}
                        >
                          {(
                            selectedEmployer.firstName ||
                            selectedEmployer.schoolName ||
                            "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                      <h5>
                        {selectedEmployer.schoolName ||
                          `${selectedEmployer.firstName || ""} ${
                            selectedEmployer.lastName || ""
                          }`.trim()}
                      </h5>
                      <p className="text-muted">{selectedEmployer.userEmail}</p>
                    </div>

                    <div className="col-md-8">
                      <div className="row">
                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Employer ID:
                          </label>
                          <p>
                            Emp-
                            {selectedEmployer._id.substring(
                              selectedEmployer._id.length - 4
                            )}
                          </p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Employer Type:
                          </label>
                          <p>{selectedEmployer.employerType || "N/A"}</p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Institution Type:
                          </label>
                          <p>{selectedEmployer.institutionType || "N/A"}</p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">Phone:</label>
                          <p>{selectedEmployer.userMobile || "N/A"}</p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">State:</label>
                          <p>{selectedEmployer.state || "N/A"}</p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">City:</label>
                          <p>{selectedEmployer.city || "N/A"}</p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Verification Status:
                          </label>
                          <p>
                            <span
                              className={getStatusBadge(
                                selectedEmployer.verificationstatus
                              )}
                            >
                              {selectedEmployer.verificationstatus || "pending"}
                            </span>
                          </p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Subscription:
                          </label>
                          <p>
                            <span
                              className={getSubscriptionBadge(
                                selectedEmployer.subscription,
                                selectedEmployer.trial
                              )}
                            >
                              {getSubscriptionText(
                                selectedEmployer.subscription,
                                selectedEmployer.trial
                              )}
                            </span>
                          </p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Block Status:
                          </label>
                          <p>
                            <span
                              className={`badge ${
                                selectedEmployer.blockstatus === "block"
                                  ? "bg-danger"
                                  : "bg-success"
                              }`}
                            >
                              {selectedEmployer.blockstatus === "block"
                                ? "Blocked"
                                : "Active"}
                            </span>
                          </p>
                        </div>

                        <div className="col-sm-6 mb-3">
                          <label className="form-label fw-bold">
                            Created Date:
                          </label>
                          <p>{formatDate(selectedEmployer.createdAt)}</p>
                        </div>

                        {selectedEmployer.address && (
                          <div className="col-12 mb-3">
                            <label className="form-label fw-bold">
                              Address:
                            </label>
                            <p>{selectedEmployer.address}</p>
                          </div>
                        )}

                        {selectedEmployer.description && (
                          <div className="col-12 mb-3">
                            <label className="form-label fw-bold">
                              Description:
                            </label>
                            <p>{selectedEmployer.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowDetails(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setShowDetails(false);
                      setShowEditEmployerModal(true);
                    }}
                  >
                    Edit Employer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Employer Modal */}
        {showAddEmployerModal && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Employer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddEmployerModal(false)}
                    disabled={loading}
                  ></button>
                </div>
                <div className="modal-body">
                  {error && (
                    <div className="alert alert-danger mb-3">
                      {error}
                      <button
                        type="button"
                        className="btn-close float-end"
                        onClick={() => setError(null)}
                      ></button>
                    </div>
                  )}

                  <form onSubmit={handleAddEmployer}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Employer Type*</label>
                        <select
                          name="employerType"
                          className="form-select"
                          value={newEmployer.employerType}
                          onChange={handleNewEmployerChange}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="School">School</option>
                          <option value="College">College</option>
                          <option value="University">University</option>
                          <option value="Company">Company</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">
                          School/Company Name
                        </label>
                        <input
                          type="text"
                          name="schoolName"
                          className="form-control"
                          value={newEmployer.schoolName}
                          onChange={handleNewEmployerChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          className="form-control"
                          value={newEmployer.firstName}
                          onChange={handleNewEmployerChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          className="form-control"
                          value={newEmployer.lastName}
                          onChange={handleNewEmployerChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          name="userEmail"
                          className="form-control"
                          value={newEmployer.userEmail}
                          onChange={handleNewEmployerChange}
                        />
                        <small className="text-muted">Email is required</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile</label>
                        <input
                          type="tel"
                          name="userMobile"
                          className="form-control"
                          value={newEmployer.userMobile}
                          onChange={handleNewEmployerChange}
                        />
                        <small className="text-muted">mobile is required</small>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password*</label>
                        <input
                          type="password"
                          name="userPassword"
                          className="form-control"
                          value={newEmployer.userPassword}
                          onChange={handleNewEmployerChange}
                          required
                        />
                      </div>

                      {/* <div className="col-md-6 mb-3">
                        <label className="form-label">Referral Code (Optional)</label>
                        <input
                          type="text"
                          name="referralCode"
                          className="form-control"
                          value={newEmployer.referralCode}
                          onChange={handleNewEmployerChange}
                        />
                      </div> */}
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddEmployerModal(false)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Adding...
                          </>
                        ) : (
                          "Add Employer"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employer Modal */}
        {showEditEmployerModal && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {loading ? "Loading Employer Details..." : "Edit Employer"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditEmployerModal(false)}
                    disabled={loading}
                  ></button>
                </div>

                {loading ? (
                  <div className="modal-body text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Fetching employer details...</p>
                  </div>
                ) : (
                  <>
                    {error && (
                      <div className="alert alert-danger mb-3 mx-3">
                        {error}
                        <button
                          type="button"
                          className="btn-close float-end"
                          onClick={() => setError(null)}
                        ></button>
                      </div>
                    )}

                    <div className="modal-body">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.firstName || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.lastName || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={editedEmployer?.userEmail || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                userEmail: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Phone</label>
                          <input
                            type="tel"
                            className="form-control"
                            value={editedEmployer?.userMobile || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                userMobile: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">
                            School/Company Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.schoolName || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                schoolName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Employer Type</label>
                          <select
                            className="form-select"
                            value={editedEmployer?.employerType || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                employerType: e.target.value,
                              })
                            }
                          >
                            <option value="">Select Type</option>
                            <option value="School">School</option>
                            <option value="College">College</option>
                            <option value="University">University</option>
                            <option value="Company">Company</option>
                          </select>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Institution Type</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.institutionType || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                institutionType: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Organization ID</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.organizationid || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                organizationid: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">State</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.state || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                state: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">City</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.city || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                city: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Pincode</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.pincode || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                pincode: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Board</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.board || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                board: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label">Website</label>
                          <input
                            type="text"
                            className="form-control"
                            value={editedEmployer?.website || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                website: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label">Address</label>
                          <textarea
                            className="form-control"
                            rows="3"
                            value={editedEmployer?.address || ""}
                            onChange={(e) =>
                              setEditedEmployer({
                                ...editedEmployer,
                                address: e.target.value,
                              })
                            }
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowEditEmployerModal(false)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateEmployer}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-1"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Updating...
                          </>
                        ) : (
                          "Update Employer"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <AdminFooter />
    </>
  );
};

export default EmployerList;
