import React, { useState, useEffect } from "react";
import logo from "../../../assets/employer-admin/assets/img/logo - dark.png";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

// Function to get initials from name
const getInitials = (name) => {
  if (!name) return 'U';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

// Function to generate a color based on the name for consistent avatar colors
const stringToColor = (string) => {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const AdminSubscribers = () => {
  const [imageLoaded, setImageLoaded] = useState({});
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSubscriptionsModal, setShowSubscriptionsModal] = useState(false);
  const [subscribersData, setSubscribersData] = useState([]);
  const [subscriptionsData, setSubscriptionsData] = useState([]);
  const [currentEmployerId, setCurrentEmployerId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalTransaction: 0,
    totalSubscribers: 0,
    activeSubscribers: 0,
    expiredSubscribers: 0,
  });

  const toggleInvoiceModal = () => setShowInvoiceModal(!showInvoiceModal);
  const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);
  const toggleSubscriptionsModal = () =>
    setShowSubscriptionsModal(!showSubscriptionsModal);

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

  // Filter by plan type
  const handleTypeFilter = (type) => {
    setSelectedType(type);
    applyFilters();
  };

  // Filter by status
  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    applyFilters();
  };

  // Search handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    applyFilters();
  };

  // Export functionality
  const handleExport = (type) => {
    // Prepare data for export
    const exportData = filteredEmployers.map((subscriber) => ({
      ID: `Sub-${subscriber.id.substring(subscriber.id.length - 4)}`,
      Company: subscriber.company,
      Plan: subscriber.plan,
      "Billing Cycle": subscriber.billingCycle,
      Amount: subscriber.amount,
      "Created Date": subscriber.createdDate,
      "Expiring On": subscriber.expiringOn,
      Status: subscriber.status,
    }));

    if (type === "pdf") {
      // Simple PDF export using browser print
      const printWindow = window.open("", "_blank");
      const htmlContent = `
      <html>
        <head>
          <title>Subscribers Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Subscribers List</h1>
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
      link.setAttribute("download", "subscribers_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Main filter application function
  const applyFilters = () => {
    let filtered = [...subscribersData];

    // Apply date filter if dates are selected
    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((subscriber) => {
        if (!subscriber.createdDate) return false;
        const createdDate = new Date(subscriber.createdDate);
        return createdDate >= startDate && createdDate <= endDate;
      });
    }

    // Apply plan type filter
    if (selectedType !== "All") {
      filtered = filtered.filter(
        (subscriber) => subscriber.plan === selectedType
      );
    }

    // Apply status filter
    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (subscriber) => subscriber.status === selectedStatus
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (subscriber) =>
          subscriber.company.toLowerCase().includes(term) ||
          subscriber.plan.toLowerCase().includes(term) ||
          subscriber.amount.toLowerCase().includes(term)
      );
    }

    setFilteredEmployers(filtered);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedType("All");
    setSelectedStatus("All");
    setSearchTerm("");
    setDateRange({ start: "", end: "" });
    setSelectedDateRange("This Year");
    setFilteredEmployers(subscribersData);
  };

  const fetchSubscriptions = async (employerId) => {
    setSubscriptionsLoading(true);
    try {
      const response = await fetch(
        `https://api.edprofio.com/admin/fetchplanbyemp/${employerId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions");
      }
      const data = await response.json();
      if (data.success && data.data) {
        setSubscriptionsData(data.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubscriptionsLoading(false);
    }
  };

  const handleViewSubscriptions = (employerId) => {
    setCurrentEmployerId(employerId);
    fetchSubscriptions(employerId);
    toggleSubscriptionsModal();
  };

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/admin/getsubscribedemployers"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch subscribers");
        }
        const data = await response.json();

        if (data.success && data.data) {
          // Transform API data to match our component structure
          const transformedData = data.data.map((subscriber) => ({
            id: subscriber._id,
            company: subscriber.schoolName || "No Name Provided",
            logo: subscriber.userProfilePic || "https://via.placeholder.com/50",
            plan: subscriber.currentSubscription?.planDetails?.name || "Free",
            billingCycle: subscriber.currentSubscription?.planDetails
              ?.validityDays
              ? `${subscriber.currentSubscription.planDetails.validityDays} Days`
              : "N/A",
            paymentMethod: "Credit Card", // Not provided in API, using placeholder
            amount: subscriber.currentSubscription?.planDetails?.price
              ? `$${subscriber.currentSubscription.planDetails.price}`
              : "$0",
            createdDate: new Date(subscriber.createdAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
            expiringOn: subscriber.subscriptionenddate
              ? new Date(subscriber.subscriptionenddate).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
              : "N/A",
            status: subscriber.blockstatus === "unblock" ? "Active" : "Blocked",
            statusClass:
              subscriber.blockstatus === "unblock" ? "success" : "danger",
            subscriptionData: subscriber, // Store the original data for reference
          }));

          setSubscribersData(transformedData);

          // Calculate stats
          const totalSubscribers = data.count || 0;
          const activeSubscribers = transformedData.filter(
            (s) => s.status === "Active"
          ).length;
          const expiredSubscribers = transformedData.filter((s) => {
            if (s.subscriptionData.subscriptionenddate) {
              return (
                new Date(s.subscriptionData.subscriptionenddate) < new Date()
              );
            }
            return false;
          }).length;

          const totalTransaction = transformedData.reduce((sum, sub) => {
            return (
              sum +
              (sub.subscriptionData.currentSubscription?.planDetails?.price ||
                0)
            );
          }, 0);

          setStats({
            totalTransaction,
            totalSubscribers,
            activeSubscribers,
            expiredSubscribers,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  if (loading) {
    return (
      <>
        <AdminHeader />
        <div className="content">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <AdminFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminHeader />
        <div className="content">
          <div className="alert alert-danger">{error}</div>
        </div>
        <AdminFooter />
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        {/* <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Subscribers</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Plan
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Advanced (Monthly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Basic (Yearly)</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Enterprise (Monthly)</a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Status
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Blocked</a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                </li>
                <li>
                  <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                </li>
              </ul>
            </div>
            <div className="head-icons">
              <a href="javascript:void(0);" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
                <i className="ti ti-chevrons-up"></i>
              </a>
            </div>
          </div>
        </div> */}

        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>
              &nbsp; <i className="fa fa-users text-primary"></i> Subscribers
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
                className={`dropdown-menu dropdown-menu-end p-3 ${showDateDropdown ? "show" : ""
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
                {selectedType || "Select Plan"}
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("All")}
                  >
                    All Plans
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("Free")}
                  >
                    Free
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("Basic")}
                  >
                    Basic
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("Standard")}
                  >
                    Standard
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleTypeFilter("Premium")}
                  >
                    Premium
                  </button>
                </li>
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
                    onClick={() => handleStatusFilter("Active")}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Blocked")}
                  >
                    Blocked
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
          </div>
        </div>
        {/* /Breadcrumb */}

        {/* Stats Cards */}
        <div className="row">
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">
                          Total Transaction
                        </span>
                        <h5>${stats.totalTransaction}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-1" data-width="100%">
                          6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%
                    </span>
                    from last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">
                          Total Subscribers
                        </span>
                        <h5>{stats.totalSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-2" data-width="100%">
                          6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%
                    </span>
                    from last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">
                          Active Subscribers
                        </span>
                        <h5>{stats.activeSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-3" data-width="100%">
                          6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%
                    </span>
                    from last week
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="border-bottom pb-3 mb-3">
                  <div className="row align-items-center">
                    <div className="col-7">
                      <div>
                        <span className="fs-14 fw-normal text-truncate mb-1">
                          Expired Subscribers
                        </span>
                        <h5>{stats.expiredSubscribers}</h5>
                      </div>
                    </div>
                    <div className="col-5">
                      <div>
                        <span className="subscription-line-4" data-width="100%">
                          6,2,8,4,3,8,1,3,6,5,9,2,8,1,4,8,9,8,2,1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-primary fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+19.01%
                    </span>
                    from last week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
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
                    <th>Subscriber</th>
                    <th>Plan</th>
                    <th>Billing Cycle</th>
                    <th>Payment Method</th>
                    <th>Amount</th>
                    <th>Created Date</th>
                    <th>Expiring On</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {subscribersData.map((subscriber) => (
                    <tr key={subscriber.id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <div className="position-relative">
                            <div 
                              className="rounded-circle d-flex align-items-center justify-content-center me-3" 
                              style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: stringToColor(subscriber.company || 'User'),
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                display: subscriber.logo && imageLoaded[subscriber.id] ? 'none' : 'flex'
                              }}
                            >
                              {getInitials(subscriber.company || 'User')}
                            </div>
                            {subscriber.logo && (
                              <img
                                src={subscriber.logo}
                                className="rounded-circle"
                                alt={subscriber.company}
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  objectFit: 'cover',
                                  display: imageLoaded[subscriber.id] ? 'block' : 'none'
                                }}
                                onLoad={() => setImageLoaded(prev => ({...prev, [subscriber.id]: true}))}
                                onError={() => setImageLoaded(prev => ({...prev, [subscriber.id]: false}))}
                              />
                            )}
                          </div>
                          <div className="ms-2">
                            <h6 className="fw-medium">
                              <a href="#" className="text-dark">{subscriber.company}</a>
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td>{subscriber.plan}</td>
                      <td>{subscriber.billingCycle}</td>
                      <td>{subscriber.paymentMethod}</td>
                      <td>{subscriber.amount}</td>
                      <td>{subscriber.createdDate}</td>
                      <td>{subscriber.expiringOn}</td>
                      <td>
                        <span
                          className={`badge badge-${subscriber.statusClass} d-flex align-items-center badge-xs`}
                        >
                          <i className="ti ti-point-filled me-1"></i>
                          {subscriber.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          {/* <a href="#" className="me-2" onClick={toggleInvoiceModal}><i className="ti ti-file-invoice"></i></a>
                          <a href="#" className="me-2"><i className="ti ti-download"></i></a> */}
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() =>
                              handleViewSubscriptions(subscriber.id)
                            }
                          >
                            View Subscriptions
                          </button>
                          <a href="#" onClick={toggleDeleteModal}>
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

        {/* View Invoice Modal */}
        {showInvoiceModal && (
          <div
            className="modal fade show"
            id="view_invoice"
            style={{ display: "block", paddingRight: "17px" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-body p-5">
                  <div className="row justify-content-between align-items-center mb-3">
                    <div className="col-md-6">
                      <div className="mb-4">
                        <img src={logo} className="img-fluid" alt="logo" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-end mb-3">
                        <h5 className="text-dark mb-1">Invoice</h5>
                        <p className="mb-1 fw-normal">
                          <i className="ti ti-file-invoice me-1"></i>INV0287
                        </p>
                        <p className="mb-1 fw-normal">
                          <i className="ti ti-calendar me-1"></i>Issue date : 12
                          Sep 2024
                        </p>
                        <p className="fw-normal">
                          <i className="ti ti-calendar me-1"></i>Due date : 12
                          Oct 2024
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-between">
                    <div className="col-md-7">
                      <p className="text-dark mb-2 fw-medium fs-16">
                        Invoice From :
                      </p>
                      <div>
                        <p className="mb-1">SmartHR</p>
                        <p className="mb-1">
                          367 Hillcrest Lane, Irvine, California, United States
                        </p>
                        <p className="mb-1">
                          <a
                            href="mailto:info@example.com"
                            className="__cf_email__"
                          >
                            [email&#160;protected]
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <p className="text-dark mb-2 fw-medium fs-16">
                        Invoice To :
                      </p>
                      <div>
                        <p className="mb-1">BrightWave Innovations</p>
                        <p className="mb-1">
                          367 Hillcrest Lane, Irvine, California, United States
                        </p>
                        <p className="mb-1">
                          <a
                            href="mailto:info@example.com"
                            className="__cf_email__"
                          >
                            [email&#160;protected]
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="table-responsive mb-3">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th>Plan</th>
                            <th>Billing Cycle</th>
                            <th>Created Date</th>
                            <th>Expiring On</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Advanced (Monthly)</td>
                            <td>30 Days</td>
                            <td>12 Sep 2024</td>
                            <td>12 Oct 2024</td>
                            <td>$200</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-between">
                    <div className="col-md-4">
                      <div>
                        <h6 className="mb-4">Payment info:</h6>
                        <p className="mb-0">Credit Card - 123***********789</p>
                        <div className="d-flex justify-content-between align-items-center mb-2 pe-3">
                          <p className="mb-0">Amount</p>
                          <p className="text-dark fw-medium mb-2">$200.00</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Sub Total</p>
                        <p className="mb-2">$200.00</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Tax</p>
                        <p className="mb-2">$0.00</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center pe-3">
                        <p className="text-dark fw-medium mb-0">Total</p>
                        <p className="text-dark fw-medium mb-2">$200.00</p>
                      </div>
                    </div>
                  </div>
                  <div className="card border mb-0">
                    <div className="card-body">
                      <p className="text-dark fw-medium mb-2">
                        Terms & Conditions:
                      </p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline mb-2">
                        <i className="ti ti-point-filled text-primary me-1"></i>
                        All payments must be made according to the agreed
                        schedule. Late payments may incur additional fees.
                      </p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline">
                        <i className="ti ti-point-filled text-primary me-1"></i>
                        We are not liable for any indirect, incidental, or
                        consequential damages, including loss of profits,
                        revenue, or data.
                      </p>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={toggleInvoiceModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="modal fade show"
            id="delete_modal"
            style={{ display: "block", paddingRight: "17px" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash text-danger-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    You want to delete all the marked items, this cant be undone
                    once you delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-light me-3"
                      onClick={toggleDeleteModal}
                    >
                      Cancel
                    </button>
                    <button type="button" className="btn btn-danger">
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* View Subscriptions Modal */}
        {showSubscriptionsModal && (
          <div
            className="modal fade show"
            id="view_subscriptions"
            style={{ display: "block", paddingRight: "17px" }}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">All Subscriptions</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={toggleSubscriptionsModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {subscriptionsLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "100px" }}
                    >
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Plan Name</th>
                            <th>Price</th>
                            <th>Validity (Days)</th>
                            <th>Job Posting Limit</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subscriptionsData.map((subscription, index) => (
                            <tr key={index}>
                              <td>{subscription.name}</td>
                              <td>${subscription.price}</td>
                              <td>{subscription.validityDays}</td>
                              <td>{subscription.jobPostingLimit}</td>
                              <td>
                                <span
                                  className={`badge badge-${subscription.isActive ? "success" : "danger"
                                    }`}
                                >
                                  {subscription.isActive
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleSubscriptionsModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Backdrop for modals */}
        {(showInvoiceModal || showDeleteModal || showSubscriptionsModal) && (
          <div className="modal-backdrop fade show"></div>
        )}
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminSubscribers;
