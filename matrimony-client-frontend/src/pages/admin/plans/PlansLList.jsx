import React, { useState, useEffect } from "react";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

const PlansList = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [currentPlan, setCurrentPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    planType: "Free",
    price: 0,
    gstPercentage: 18,
    perDayLimit: 0,
    profileViews: 0,
    downloadResume: 0,
    verifiedCandidateAccess: false,
    jobPostingLimit: 0,
    candidatesLiveChat: false,
    hasAds: true,
    validityDays: 0,
    hasDRM: false,
    accessToWebinars: false,
    interviewType: "text",
    accessToRecruitmentFair: true,
    customerSupport: true,
    fastTrackSupport: false,
    isActive: true,
  });

  // Fetch plans data
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${VITE_BASE_URL}/admin/getallplans`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }

        const data = await response.json();
        setPlans(data.data || []);
        setFilteredPlans(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle number input changes
  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === "" ? "" : Number(value),
    });
  };

  // Handle form submission for adding a new plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/admin/createplan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create plan");
      }

      const data = await response.json();

      // Add the new plan to the list
      setPlans((prev) => [...prev, data.data]);
      setFilteredPlans((prev) => [...prev, data.data]);

      // Close modal and reset form
      setShowAddModal(false);
      setFormData({
        name: "",
        price: 0,
        gstPercentage: 18,
        perDayLimit: 0,
        profileViews: 0,
        downloadResume: 0,
        verifiedCandidateAccess: false,
        jobPostingLimit: 0,
        candidatesLiveChat: false,
        hasAds: true,
        validityDays: 0,
        hasDRM: false,
        accessToWebinars: false,
        interviewType: "text",
        accessToRecruitmentFair: true,
        customerSupport: true,
        fastTrackSupport: false,
        isActive: true,
      });
    } catch (error) {
      console.error("Error creating plan:", error);
      setError(error.message);
    }
  };

  // Apply filters
  const applyFilters = () => {
    let filtered = [...plans];

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((plan) => {
        if (!plan.createdAt) return false;
        const createdDate = new Date(plan.createdAt);
        return createdDate >= startDate && createdDate <= endDate;
      });
    }

    // Status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter((plan) =>
        selectedStatus === "active" ? plan.isActive : !plan.isActive
      );
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (plan) =>
          plan.name?.toLowerCase().includes(term) ||
          plan._id?.toLowerCase().includes(term)
      );
    }

    setFilteredPlans(filtered);
  };

  // Handle date range selection
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

  // Handle status filter
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle select all plans
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPlans(filteredPlans.map((plan) => plan._id));
    } else {
      setSelectedPlans([]);
    }
  };

  // Handle select single plan
  const handleSelectPlan = (planId) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans(selectedPlans.filter((id) => id !== planId));
    } else {
      setSelectedPlans([...selectedPlans, planId]);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Export functionality
  const handleExport = (type) => {
    const exportData = filteredPlans.map((plan) => ({
      "Plan ID": `PL-${plan._id.substring(plan._id.length - 4)}`,
      "Plan Name": plan.name || "N/A",
      Price: `₹${plan.price}`,
      GST: `${plan.gstPercentage}%`,
      "Total Price": `₹${plan.price + (plan.price * plan.gstPercentage) / 100}`,
      Validity: `${plan.validityDays} days`,
      Status: plan.isActive ? "Active" : "Inactive",
      "Created Date": formatDate(plan.createdAt),
    }));

    if (type === "pdf") {
      const printWindow = window.open("", "_blank");
      const htmlContent = `
        <html>
          <head>
            <title>Plans Export</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Subscription Plans List</h1>
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
      const headers = Object.keys(exportData[0]).join(",");
      const csvContent = [
        headers,
        ...exportData.map((row) => Object.values(row).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "plans_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle edit plan
  const handleEdit = (plan) => {
    setCurrentPlan(plan);
    setFormData({
      name: plan.name,
      planType: plan.planType || 'Free',
      price: plan.price,
      gstPercentage: plan.gstPercentage,
      perDayLimit: plan.perDayLimit,
      profileViews: plan.profileViews,
      downloadResume: plan.downloadResume,
      verifiedCandidateAccess: plan.verifiedCandidateAccess,
      jobPostingLimit: plan.jobPostingLimit,
      candidatesLiveChat: plan.candidatesLiveChat,
      hasAds: plan.hasAds,
      validityDays: plan.validityDays,
      hasDRM: plan.hasDRM,
      accessToWebinars: plan.accessToWebinars,
      interviewType: plan.interviewType,
      accessToRecruitmentFair: plan.accessToRecruitmentFair,
      customerSupport: plan.customerSupport,
      fastTrackSupport: plan.fastTrackSupport,
      isActive: plan.isActive,
    });
    setShowEditModal(true);
  };

  // Handle update plan
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/admin/updateplan${currentPlan._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update plan");
      }

      const data = await response.json();

      // Update the plan in the list
      setPlans(
        plans.map((plan) => (plan._id === currentPlan._id ? data.data : plan))
      );
      setFilteredPlans(
        filteredPlans.map((plan) =>
          plan._id === currentPlan._id ? data.data : plan
        )
      );

      // Close modal and reset
      setShowEditModal(false);
      setCurrentPlan(null);
    } catch (error) {
      console.error("Error updating plan:", error);
      setError(error.message);
    }
  };

  // Handle delete plan
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${VITE_BASE_URL}/admin/deleteplan${planToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete plan");
      }

      // Remove the deleted plan from the list
      setPlans(plans.filter((plan) => plan._id !== planToDelete._id));
      setFilteredPlans(
        filteredPlans.filter((plan) => plan._id !== planToDelete._id)
      );
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError(error.message);
    } finally {
      setShowDeleteModal(false);
      setPlanToDelete(null);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedStatus, searchTerm, dateRange, plans]);

  if (loading) {
    return <div className="text-center py-5">Loading plans...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <AdminHeader />
      <div className="content">
        {/* Breadcrumb Section */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>
              &nbsp; <i className="fa fa-credit-card text-primary"></i>{" "}
              Subscription Plans
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
                    onClick={() => handleStatusFilter("active")}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("inactive")}
                  >
                    Inactive
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
                placeholder="Search plans..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-icon btn-sm me-1">
                <i className="ti ti-search"></i>
              </button>
            </div>

            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <button className="btn btn-icon btn-sm active bg-primary text-white me-1">
                <i className="ti ti-list-tree"></i>
              </button>
              <button className="btn btn-icon btn-sm">
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
              onClick={() => setShowAddModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>Add Plan
            </button>
          </div>
        </div>
        <div className="row">
          {/* Total Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Total Plans
                    </p>
                    <h4>{plans.length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-primary flex-shrink-0">
                    <i className="ti ti-box fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Total Plans */}

          {/* Total Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Active Plans
                    </p>
                    <h4>{plans.filter((plan) => plan.isActive).length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-success flex-shrink-0">
                    <i className="ti ti-activity-heartbeat fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Total Plans */}

          {/* Inactive Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Inactive Plans
                    </p>
                    <h4>{plans.filter((plan) => !plan.isActive).length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-danger flex-shrink-0">
                    <i className="ti ti-player-pause fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Inactive Companies */}

          {/* No of Plans  */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      No of Plan Types
                    </p>
                    <h4>{new Set(plans.map((plan) => plan.name)).size}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                    <i className="ti ti-mask fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /No of Plans */}
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
                        />
                      </div>
                    </th>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>GST Percentage</th>
                    <th>Validity Days</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan._id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <h6 className="fw-medium">
                          <a href="#">{plan.name}</a>
                        </h6>
                      </td>
                      <td>₹{plan.price}</td>
                      <td>{plan.gstPercentage}%</td>
                      <td>{plan.validityDays}</td>
                      <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            plan.isActive ? "success" : "danger"
                          } d-inline-flex align-items-center badge-sm`}
                        >
                          <i className="ti ti-point-filled me-1"></i>
                          {plan.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <a
                            href="#"
                            className="me-2"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEdit(plan);
                            }}
                          >
                            <i className="ti ti-edit"></i>
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setPlanToDelete(plan);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="ti ti-trash text-danger"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add Plan Modal */}
        {showAddModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="add_plans"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add New Plan</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowAddModal(false)}
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body pb-0">
                    <PlanForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleNumberInputChange={handleNumberInputChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Modal */}
        {showEditModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="edit_plans"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Plan</h4>
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowEditModal(false)}
                  >
                    <i className="ti ti-x"></i>
                  </button>
                </div>
                <form onSubmit={handleUpdate}>
                  <div className="modal-body pb-0">
                    <PlanForm
                      formData={formData}
                      handleInputChange={handleInputChange}
                      handleNumberInputChange={handleNumberInputChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="delete_modal"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash text-danger-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    Are you sure you want to delete the plan "
                    {planToDelete?.name}"? This action cannot be undone.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light me-3"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

const PlanForm = ({ formData, handleInputChange, handleNumberInputChange }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">
            Plan Name<span className="text-danger"> *</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <label className="form-label mt-3">
            Plan Type<span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            name="planType"
            value={formData.planType || 'Free'}
            onChange={handleInputChange}
            required
          >
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Price (₹)<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleNumberInputChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            GST Percentage<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="gstPercentage"
            value={formData.gstPercentage}
            onChange={handleNumberInputChange}
            required
            min="0"
            max="100"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Per Day Limit<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="perDayLimit"
            value={formData.perDayLimit}
            onChange={handleNumberInputChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Profile Views Limit<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="profileViews"
            value={formData.profileViews}
            onChange={handleNumberInputChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Download Resume Limit<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="downloadResume"
            value={formData.downloadResume}
            onChange={handleNumberInputChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Job Posting Limit<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="jobPostingLimit"
            value={formData.jobPostingLimit}
            onChange={handleNumberInputChange}
            required
            min="0"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Validity Days<span className="text-danger"> *</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="validityDays"
            value={formData.validityDays}
            onChange={handleNumberInputChange}
            required
            min="1"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Interview Type<span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
            required
          >
            <option value="text">Text</option>
            <option value="video">Video</option>
            <option value="both">Both</option>
          </select>
        </div>
      </div>

      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">Features</label>
          <div className="row">
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="verifiedCandidateAccess"
                  checked={formData.verifiedCandidateAccess}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">
                  Verified Candidate Access
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="candidatesLiveChat"
                  checked={formData.candidatesLiveChat}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Candidates Live Chat</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasAds"
                  checked={formData.hasAds}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Show Ads</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="hasDRM"
                  checked={formData.hasDRM}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">
                  Download Resume Manager
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="accessToWebinars"
                  checked={formData.accessToWebinars}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Access to Webinars</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="accessToRecruitmentFair"
                  checked={formData.accessToRecruitmentFair}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">
                  Access to Recruitment Fair
                </label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="customerSupport"
                  checked={formData.customerSupport}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Customer Support</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="fastTrackSupport"
                  checked={formData.fastTrackSupport}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">Fast Track Support</label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">
            Status<span className="text-danger"> *</span>
          </label>
          <select
            className="form-select"
            name="isActive"
            value={formData.isActive}
            onChange={handleInputChange}
            required
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlansList;
