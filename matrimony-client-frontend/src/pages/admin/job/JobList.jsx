import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../layout/AdminHeader";
import AdminFooter from "../layout/AdminFooter";

const JobsList = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [sortBy, setSortBy] = useState("Last 7 Days");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showFilterSidebar, setShowFilterSidebar] = useState(false);

  // Dynamic filter states
  const [jobTypes, setJobTypes] = useState({});
  const [categories, setCategories] = useState({});
  const [experienceLevels, setExperienceLevels] = useState({});
  const [salaryRanges, setSalaryRanges] = useState({});
  const [dateRange, setDateRange] = useState({
    start: "",
    end: "",
  });
  const [selectedDateRange, setSelectedDateRange] = useState("This Year");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showAddJobModal, setShowAddJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    companyName: "",
    jobType: "",
    category: "",
    location: "",
    isRemote: false,
    salaryFrom: "",
    salaryTo: "",
    salaryType: "",
    experienceLevel: "",
    educationLevel: "",
    openings: "",
    description: "",
    skills: [],
    benefits: "",
    applicationInstructions: "",
    contactEmail: "",
    contactPhone: "",
    deadline: "",
  });

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

  const handleNewJobChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewJob((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare the job data according to your schema
      const jobData = {
        companyName: newJob.companyName,
        jobTitle: newJob.jobTitle,
        description: newJob.description,
        category: newJob.category,
        salaryFrom: newJob.salaryFrom,
        salaryTo: newJob.salaryTo,
        salaryType: newJob.salaryType,
        jobType: newJob.jobType,
        experienceLevel: newJob.experienceLevel,
        educationLevel: newJob.educationLevel,
        openings: newJob.openings,
        location: newJob.location,
        isRemote: newJob.isRemote,
        skills: newJob.skills.split(",").map((skill) => skill.trim()), // Convert comma-separated string to array
        benefits: newJob.benefits,
        contactEmail: newJob.contactEmail,
        contactPhone: newJob.contactPhone,
        applicationInstructions: newJob.applicationInstructions,
        deadline: newJob.deadline,
        postingstatus: "pending", // Default status
        isActive: true, // Default active status
      };

      const response = await fetch(
        "https://api.edprofio.com/employer/postjob",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add job");
      }

      const data = await response.json();

      // Update local state with the new job
      setJobs([...jobs, data]);
      setFilteredJobs([...filteredJobs, data]);

      // Reset form and close modal
      setNewJob({
        jobTitle: "",
        companyName: "",
        jobType: "",
        category: "",
        location: "",
        isRemote: false,
        salaryFrom: "",
        salaryTo: "",
        salaryType: "",
        experienceLevel: "",
        educationLevel: "",
        openings: "",
        description: "",
        skills: [],
        benefits: "",
        applicationInstructions: "",
        contactEmail: "",
        contactPhone: "",
        deadline: "",
      });

      setShowAddJobModal(false);
      setError(null);
    } catch (err) {
      console.error("Add job error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditJob = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Format applydatetime back to "dd/mm/yyyy hh:mm AM/PM" format
      let formattedApplyDateTime = "";
      if (editingJob.applydatetime) {
        try {
          const date = new Date(editingJob.applydatetime);
          if (!isNaN(date.getTime())) {
            let hours = date.getHours();
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12; // Convert 0 to 12

            formattedApplyDateTime =
              `${date.getDate().toString().padStart(2, "0")}/` +
              `${(date.getMonth() + 1).toString().padStart(2, "0")}/` +
              `${date.getFullYear()} ` +
              `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`;
          }
        } catch (err) {
          console.error("Error formatting applydatetime:", err);
          throw new Error("Invalid apply date/time format");
        }
      }

      // Format deadline as ISO string
      let formattedDeadline = "";
      if (editingJob.deadline) {
        try {
          const deadlineDate = new Date(editingJob.deadline);
          if (!isNaN(deadlineDate.getTime())) {
            formattedDeadline = deadlineDate.toISOString();
          }
        } catch (err) {
          console.error("Error formatting deadline:", err);
          throw new Error("Invalid deadline format");
        }
      }

      // Prepare the updated job data
      const updatedData = {
        companyName: editingJob.companyName || "",
        jobTitle: editingJob.jobTitle || "",
        description: editingJob.description || "",
        category: editingJob.category || "",
        applydatetime: formattedApplyDateTime,
        salaryFrom: editingJob.salaryFrom || "",
        salaryTo: editingJob.salaryTo || "",
        salaryType: editingJob.salaryType || "",
        jobType: editingJob.jobType || "",
        experienceLevel: editingJob.experienceLevel || "",
        educationLevel: editingJob.educationLevel || "",
        openings: editingJob.openings || "",
        priority: editingJob.priority || "",
        location: editingJob.location || "",
        isRemote: Boolean(editingJob.isRemote),
        skills: Array.isArray(editingJob.skills)
          ? editingJob.skills
          : (editingJob.skills || "")
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill),
        benefits: editingJob.benefits || "",
        contactEmail: editingJob.contactEmail || "",
        contactPhone: editingJob.contactPhone || "",
        companyUrl: editingJob.companyUrl || "",
        applicationInstructions: editingJob.applicationInstructions || "",
        deadline: formattedDeadline,
        postingstatus: editingJob.postingstatus || "pending",
        isActive: Boolean(editingJob.isActive),
      };

      // Validate required fields
      if (
        !updatedData.jobTitle ||
        !updatedData.companyName ||
        !updatedData.description ||
        !updatedData.location
      ) {
        throw new Error("Please fill all required fields");
      }

      // Validate email format
      if (
        updatedData.contactEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.contactEmail)
      ) {
        throw new Error("Please enter a valid email address");
      }

      const response = await fetch(
        `https://api.edprofio.com/employer/editjob/${editingJob._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update job");
      }

      const data = await response.json();

      // Update local state with the updated job
      setJobs(jobs.map((job) => (job._id === data._id ? data : job)));
      setFilteredJobs(
        filteredJobs.map((job) => (job._id === data._id ? data : job))
      );

      // Close modal and reset
      setShowEditJobModal(false);
      setEditingJob(null);
    } catch (err) {
      console.error("Edit job error:", err);
      setError(err.message || "Failed to update job. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const openEditModal = (job) => {
    // Format deadline from ISO to datetime-local format
    const formattedDeadline = job.deadline
      ? new Date(job.deadline).toISOString().slice(0, 16)
      : "";

    // Format applydatetime if needed (assuming it's in "dd/mm/yyyy hh:mm AM/PM" format)
    let formattedApplyDateTime = "";
    if (job.applydatetime) {
      const [datePart, timePart] = job.applydatetime.split(" ");
      const [day, month, year] = datePart.split("/");
      const [time, period] = timePart.split(" ");
      let [hours, minutes] = time.split(":");

      if (period === "PM" && hours !== "12") {
        hours = parseInt(hours, 10) + 12;
      }
      if (period === "AM" && hours === "12") {
        hours = "00";
      }

      formattedApplyDateTime = `${year}-${month.padStart(
        2,
        "0"
      )}-${day.padStart(2, "0")}T${hours.padStart(2, "0")}:${minutes.padStart(
        2,
        "0"
      )}`;
    }

    setEditingJob({
      ...job,
      skills: Array.isArray(job.skills) ? job.skills.join(", ") : job.skills,
      deadline: formattedDeadline,
      applydatetime: formattedApplyDateTime,
      companyUrl: job.companyUrl || "",
    });
    setShowEditJobModal(true);
  };
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
        setJobs(data || []);
        setFilteredJobs(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Extract filter options from jobs
  useEffect(() => {
    if (jobs.length > 0) {
      // Get unique job types
      const types = [...new Set(jobs.map((j) => j.jobType).filter(Boolean))];
      const initialTypes = types.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      // Get unique categories
      const cats = [...new Set(jobs.map((j) => j.category).filter(Boolean))];
      const initialCategories = cats.reduce((acc, category) => {
        acc[category] = false;
        return acc;
      }, {});

      // Get unique experience levels
      const expLevels = [
        ...new Set(jobs.map((j) => j.experienceLevel).filter(Boolean)),
      ];
      const initialExpLevels = expLevels.reduce((acc, level) => {
        acc[level] = false;
        return acc;
      }, {});

      // Get salary ranges
      const salaryTypes = [
        ...new Set(jobs.map((j) => j.salaryType).filter(Boolean)),
      ];
      const initialSalaryRanges = salaryTypes.reduce((acc, type) => {
        acc[type] = false;
        return acc;
      }, {});

      setJobTypes(initialTypes);
      setCategories(initialCategories);
      setExperienceLevels(initialExpLevels);
      setSalaryRanges(initialSalaryRanges);
    }
  }, [jobs]);

  // Apply all filters
  const applyFilters = () => {
    let filtered = [...jobs];

    if (dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      filtered = filtered.filter((job) => {
        if (!job.createdAt) return false;
        const createdDate = new Date(job.createdAt);
        return createdDate >= startDate && createdDate <= endDate;
      });
    }

    // Type filter
    if (selectedType !== "All") {
      filtered = filtered.filter((job) => job.jobType === selectedType);
    }

    // Status filter
    if (selectedStatus !== "All") {
      if (selectedStatus === "Active") {
        filtered = filtered.filter((job) => job.isActive === true);
      } else if (selectedStatus === "Inactive") {
        filtered = filtered.filter((job) => job.isActive === false);
      } else {
        filtered = filtered.filter(
          (job) => job.postingstatus === selectedStatus
        );
      }
    }

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(term) ||
          job.companyName?.toLowerCase().includes(term) ||
          job.category?.toLowerCase().includes(term) ||
          job.location?.toLowerCase().includes(term)
      );
    }

    // Job Type filter
    const selectedJobTypes = Object.keys(jobTypes).filter(
      (type) => jobTypes[type]
    );
    if (selectedJobTypes.length > 0) {
      filtered = filtered.filter((job) =>
        selectedJobTypes.includes(job.jobType)
      );
    }

    // Category filter
    const selectedCategories = Object.keys(categories).filter(
      (cat) => categories[cat]
    );
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(
        (job) => job.category && selectedCategories.includes(job.category)
      );
    }

    // Experience Level filter
    const selectedExpLevels = Object.keys(experienceLevels).filter(
      (level) => experienceLevels[level]
    );
    if (selectedExpLevels.length > 0) {
      filtered = filtered.filter(
        (job) =>
          job.experienceLevel && selectedExpLevels.includes(job.experienceLevel)
      );
    }

    // Salary Type filter
    const selectedSalaryRanges = Object.keys(salaryRanges).filter(
      (range) => salaryRanges[range]
    );
    if (selectedSalaryRanges.length > 0) {
      filtered = filtered.filter(
        (job) => job.salaryType && selectedSalaryRanges.includes(job.salaryType)
      );
    }

    setFilteredJobs(filtered);
    setShowFilterSidebar(false);
  };

  // Reset all filters
  const resetFilters = () => {
    const resetTypes = Object.keys(jobTypes).reduce((acc, type) => {
      acc[type] = false;
      return acc;
    }, {});

    const resetCategories = Object.keys(categories).reduce((acc, cat) => {
      acc[cat] = false;
      return acc;
    }, {});

    const resetExpLevels = Object.keys(experienceLevels).reduce(
      (acc, level) => {
        acc[level] = false;
        return acc;
      },
      {}
    );

    const resetSalaryRanges = Object.keys(salaryRanges).reduce((acc, range) => {
      acc[range] = false;
      return acc;
    }, {});

    setJobTypes(resetTypes);
    setCategories(resetCategories);
    setExperienceLevels(resetExpLevels);
    setSalaryRanges(resetSalaryRanges);
    setSelectedType("All");
    setSelectedStatus("All");
    setDateRange({ start: "", end: "" });
    setSelectedDateRange("This Year");
    setFilteredJobs(jobs);
  };

  const handleJobTypeChange = (type) => {
    setJobTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleCategoryChange = (category) => {
    setCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleExperienceLevelChange = (level) => {
    setExperienceLevels((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };

  const handleSalaryRangeChange = (range) => {
    setSalaryRanges((prev) => ({
      ...prev,
      [range]: !prev[range],
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

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    applyFilters();
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedJobs(filteredJobs.map((job) => job._id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
    }
  };

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (jobToDelete) {
        // Note: You'll need to implement the delete job API endpoint
        const response = await fetch(
          `https://api.edprofio.com/admin/deletejob/${jobToDelete._id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete job");
        }

        setJobs(jobs.filter((j) => j._id !== jobToDelete._id));
        setFilteredJobs(filteredJobs.filter((j) => j._id !== jobToDelete._id));
      }
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const handleActiveStatusToggle = async (jobId, currentStatus) => {
    try {
      const newStatus = !currentStatus;

      // Note: You'll need to implement the update job status API endpoint
      const response = await fetch(
        `https://api.edprofio.com/employer/updatejobstatus/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isActive: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, isActive: newStatus } : job
        )
      );

      setFilteredJobs(
        filteredJobs.map((job) =>
          job._id === jobId ? { ...job, isActive: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Error updating job status:", err);
      setError(err.message);
    }
  };
  const handleStatusToggle = async (jobId, currentStatus) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";

      const response = await fetch(
        `https://api.edprofio.com/admin/updateapprovejobs/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postingstatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      const data = await response.json();

      // Update local state with the new status
      setJobs(
        jobs.map((job) =>
          job._id === jobId ? { ...job, postingstatus: newStatus } : job
        )
      );

      setFilteredJobs(
        filteredJobs.map((job) =>
          job._id === jobId ? { ...job, postingstatus: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Error updating job status:", err);
      setError(err.message);
    }
  };
  const viewJobDetails = (job) => {
    setSelectedJob(job);
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

  const getJobTypeBadge = (jobType) => {
    switch (jobType) {
      case "Full-time":
        return "badge bg-primary";
      case "Part-time":
        return "badge bg-info";
      case "Contract":
        return "badge bg-warning";
      case "Internship":
        return "badge bg-success";
      default:
        return "badge bg-secondary";
    }
  };

  const getSalaryDisplay = (job) => {
    if (job.salaryFrom && job.salaryTo) {
      return `₹${parseInt(job.salaryFrom).toLocaleString()} - ₹${parseInt(
        job.salaryTo
      ).toLocaleString()} ${job.salaryType || ""}`;
    }
    return "Not specified";
  };

  useEffect(() => {
    applyFilters();
  }, [
    selectedType,
    selectedStatus,
    searchTerm,
    dateRange,
    jobTypes,
    categories,
    experienceLevels,
    salaryRanges,
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
    const exportData = filteredJobs.map((job) => ({
      ID: `Job-${job._id.substring(job._id.length - 4)}`,
      Title: job.jobTitle || "N/A",
      Company: job.companyName || "N/A",
      Category: job.category || "N/A",
      Type: job.jobType || "N/A",
      Location: job.location || "N/A",
      Salary: getSalaryDisplay(job),
      Status: job.postingstatus || "pending",
      Active: job.isActive ? "Yes" : "No",
      Applications: job.applications?.length || 0,
      "Created Date": formatDate(job.createdAt),
    }));

    if (type === "pdf") {
      const printWindow = window.open("", "_blank");
      const htmlContent = `
      <html>
        <head>
          <title>Jobs Export</title>
          <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Jobs List</h1>
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
      link.setAttribute("download", "jobs_export.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading jobs...</div>;
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
              &nbsp; <i className="fa fa-briefcase text-primary"></i> Jobs
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
                {selectedType || "Job Type"}
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
                  new Set(jobs.map((j) => j.jobType).filter(Boolean))
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
                    onClick={() => handleStatusFilter("Active")}
                  >
                    Active
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => handleStatusFilter("Inactive")}
                  >
                    Inactive
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
                placeholder="Search jobs..."
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
              onClick={() => setShowAddJobModal(true)}
            >
              <i className="ti ti-circle-plus me-2"></i>Add Job
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
                    <h6 className="card-title mb-0">Total Jobs</h6>
                    <h3 className="mb-0">{jobs.length}</h3>
                  </div>
                  <i className="fas fa-briefcase fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">Active Jobs</h6>
                    <h3 className="mb-0">
                      {jobs.filter((j) => j.isActive === true).length}
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
                    <h6 className="card-title mb-0">Total Applications</h6>
                    <h3 className="mb-0">
                      {jobs.reduce(
                        (total, job) => total + (job.applications?.length || 0),
                        0
                      )}
                    </h3>
                  </div>
                  <i className="fas fa-users fa-2x opacity-50"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning text-white">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="card-title mb-0">Pending Approval</h6>
                    <h3 className="mb-0">
                      {jobs.filter((j) => j.postingstatus === "pending").length}
                    </h3>
                  </div>
                  <i className="fas fa-clock fa-2x opacity-50"></i>
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
                            selectedJobs.length === filteredJobs.length &&
                            filteredJobs.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>Job ID</th>
                    <th>Job Details</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Applications</th>
                    <th>Status</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                      <tr key={job._id}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={selectedJobs.includes(job._id)}
                              onChange={() => handleSelectJob(job._id)}
                            />
                          </div>
                        </td>
                        <td>Job-{job._id.substring(job._id.length - 4)}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar avatar-md me-3">
                              <div 
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                  width: '40px',
                                  height: '40px',
                                  backgroundColor: '#4e73df',
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '16px'
                                }}
                              >
                                {(job.jobTitle || "J").charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="d-flex flex-column">
                              <h6 className="fw-semibold mb-1">
                                <a 
                                  href="#" 
                                  className="text-dark"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    viewJobDetails(job);
                                  }}
                                >
                                  {job.jobTitle || "N/A"}
                                </a>
                              </h6>
                              <div className="d-flex align-items-center flex-wrap">
                                <span className={`badge ${getJobTypeBadge(job.jobType)} me-2 mb-1`}>
                                  <i className="ti ti-briefcase me-1"></i>
                                  {job.jobType || "N/A"}
                                </span>
                                {job.category && (
                                  <span className="badge bg-light text-dark border me-2 mb-1">
                                    <i className="ti ti-category-2 me-1"></i>
                                    {job.category}
                                  </span>
                                )}
                                {job.location && (
                                  <span className="text-muted small d-flex align-items-center me-2 mb-1">
                                    <i className="ti ti-map-pin me-1"></i>
                                    {job.location}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <h6 className="fw-medium mb-1">
                              {job.companyName || "N/A"}
                            </h6>
                            <small className="text-muted">
                              {job.employerName || "N/A"}
                            </small>
                          </div>
                        </td>
                        <td>
                          <div>
                            <span className="d-block">
                              {job.location || "N/A"}
                            </span>
                            {job.isRemote && (
                              <small className="text-success">
                                <i className="ti ti-world me-1"></i>Remote
                              </small>
                            )}
                          </div>
                        </td>
                        <td>
                          <small>{getSalaryDisplay(job)}</small>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <span className="badge bg-light text-dark me-1">
                              {job.applications?.length || 0}
                            </span>
                            <small className="text-muted">applicants</small>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge ${getStatusBadge(
                              job.postingstatus
                            )}`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleStatusToggle(job._id, job.postingstatus)
                            }
                          >
                            {job.postingstatus || "pending"}
                          </span>
                        </td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={job.isActive === true}
                              onChange={() =>
                                handleActiveStatusToggle(job._id, job.isActive)
                              }
                            />
                            <label className="form-check-label">
                              {job.isActive ? "Active" : "Inactive"}
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm btn-icon btn-primary-light me-2"
                              onClick={() => openEditModal(job)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-icon btn-danger-light"
                              onClick={() => handleDeleteClick(job)}
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
                        No jobs found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
              {/* Job Types */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#jobTypes"
                    aria-expanded="true"
                  >
                    Job Types
                  </button>
                </h2>
                <div id="jobTypes" className="accordion-collapse collapse show">
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

              {/* Categories */}
              {Object.keys(categories).length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-dark fs-16"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#categories"
                      aria-expanded="true"
                    >
                      Categories
                    </button>
                  </h2>
                  <div
                    id="categories"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gx-3">
                        <div className="form-group">
                          <div className="checkbox-limit">
                            <ul className="checkbox-list">
                              {Object.keys(categories).map((category) => (
                                <React.Fragment key={category}>
                                  <li>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={categories[category]}
                                        onChange={() =>
                                          handleCategoryChange(category)
                                        }
                                      />
                                      <span className="fake-checkbox"></span>
                                      <span className="label-text">
                                        {category}
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

              {/* Experience Levels */}
              {Object.keys(experienceLevels).length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-dark fs-16"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#experienceLevels"
                      aria-expanded="true"
                    >
                      Experience Levels
                    </button>
                  </h2>
                  <div
                    id="experienceLevels"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gx-3">
                        <div className="form-group">
                          <div className="checkbox-limit">
                            <ul className="checkbox-list">
                              {Object.keys(experienceLevels).map((level) => (
                                <React.Fragment key={level}>
                                  <li>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={experienceLevels[level]}
                                        onChange={() =>
                                          handleExperienceLevelChange(level)
                                        }
                                      />
                                      <span className="fake-checkbox"></span>
                                      <span className="label-text">
                                        {level}
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

              {/* Salary Types */}
              {Object.keys(salaryRanges).length > 0 && (
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button text-dark fs-16"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#salaryRanges"
                      aria-expanded="true"
                    >
                      Salary Types
                    </button>
                  </h2>
                  <div
                    id="salaryRanges"
                    className="accordion-collapse collapse show"
                  >
                    <div className="accordion-body">
                      <div className="row gx-3">
                        <div className="form-group">
                          <div className="checkbox-limit">
                            <ul className="checkbox-list">
                              {Object.keys(salaryRanges).map((range) => (
                                <React.Fragment key={range}>
                                  <li>
                                    <label className="custom-checkbox">
                                      <input
                                        type="checkbox"
                                        checked={salaryRanges[range]}
                                        onChange={() =>
                                          handleSalaryRangeChange(range)
                                        }
                                      />
                                      <span className="fake-checkbox"></span>
                                      <span className="label-text">
                                        {range}
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

              {/* Job Status */}
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button text-dark fs-16"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#jobStatus"
                    aria-expanded="true"
                  >
                    Job Status
                  </button>
                </h2>
                <div
                  id="jobStatus"
                  className="accordion-collapse collapse show"
                >
                  <div className="accordion-body">
                    <div className="d-flex align-items-center flex-wrap">
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="jobStatus"
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
                          name="jobStatus"
                          id="activeStatus"
                          checked={selectedStatus === "Active"}
                          onChange={() => setSelectedStatus("Active")}
                        />
                        <label
                          htmlFor="activeStatus"
                          className="d-block rounded fs-12"
                        >
                          Active
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="jobStatus"
                          id="inactiveStatus"
                          checked={selectedStatus === "Inactive"}
                          onChange={() => setSelectedStatus("Inactive")}
                        />
                        <label
                          htmlFor="inactiveStatus"
                          className="d-block rounded fs-12"
                        >
                          Inactive
                        </label>
                      </div>
                      <div className="theme-width m-1 me-2">
                        <input
                          type="radio"
                          name="jobStatus"
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
                          name="jobStatus"
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
                  <p>Are you sure you want to delete this job?</p>
                  {jobToDelete && (
                    <div className="alert alert-warning">
                      <strong>Job:</strong> {jobToDelete.jobTitle}
                      <br />
                      <strong>Company:</strong> {jobToDelete.companyName}
                      <br />
                      <strong>Applications:</strong>{" "}
                      {jobToDelete.applications?.length || 0}
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

        {/* Edit Job Modal */}
        {showEditJobModal && editingJob && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Edit Job</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowEditJobModal(false)}
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

                  <form onSubmit={handleEditJob}>
                    <div className="row">
                      {/* Basic Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Job Title*</label>
                        <input
                          type="text"
                          name="jobTitle"
                          className="form-control"
                          value={editingJob.jobTitle || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              jobTitle: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name*</label>
                        <input
                          type="text"
                          name="companyName"
                          className="form-control"
                          value={editingJob.companyName || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              companyName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Description*</label>
                        <textarea
                          name="description"
                          className="form-control"
                          rows="4"
                          value={editingJob.description || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              description: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Category</label>
                        <input
                          type="text"
                          name="category"
                          className="form-control"
                          value={editingJob.category || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              category: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Apply Date/Time</label>
                        <input
                          type="datetime-local"
                          name="applydatetime"
                          className="form-control"
                          value={editingJob.applydatetime || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              applydatetime: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Salary Information */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary From</label>
                        <input
                          type="number"
                          name="salaryFrom"
                          className="form-control"
                          value={editingJob.salaryFrom || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              salaryFrom: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary To</label>
                        <input
                          type="number"
                          name="salaryTo"
                          className="form-control"
                          value={editingJob.salaryTo || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              salaryTo: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary Type</label>
                        <select
                          name="salaryType"
                          className="form-select"
                          value={editingJob.salaryType || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              salaryType: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Type</option>
                          <option value="per hour">per hour</option>
                          <option value="per month">per month</option>
                          <option value="per year">per year</option>
                        </select>
                      </div>

                      {/* Job Details */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Job Type*</label>
                        <select
                          name="jobType"
                          className="form-select"
                          value={editingJob.jobType || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              jobType: e.target.value,
                            })
                          }
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Experience Level</label>
                        <select
                          name="experienceLevel"
                          className="form-select"
                          value={editingJob.experienceLevel || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              experienceLevel: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Level</option>
                          <option value="Entry Level">Entry Level</option>
                          <option value="Mid Level">Mid Level</option>
                          <option value="Senior Level">Senior Level</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Education Level</label>
                        <select
                          name="educationLevel"
                          className="form-select"
                          value={editingJob.educationLevel || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              educationLevel: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Level</option>
                          <option value="High School">High School</option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Number of Openings</label>
                        <input
                          type="number"
                          name="openings"
                          className="form-control"
                          value={editingJob.openings || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              openings: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Priority</label>
                        <select
                          name="priority"
                          className="form-select"
                          value={editingJob.priority || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              priority: e.target.value,
                            })
                          }
                        >
                          <option value="">Select Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      {/* Location Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Location*</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={editingJob.location || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              location: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Remote Job</label>
                        <div className="form-check form-switch mt-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isRemote"
                            checked={editingJob.isRemote || false}
                            onChange={(e) =>
                              setEditingJob({
                                ...editingJob,
                                isRemote: e.target.checked,
                              })
                            }
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                      </div>

                      {/* Skills and Benefits */}
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          name="skills"
                          className="form-control"
                          value={
                            Array.isArray(editingJob.skills)
                              ? editingJob.skills.join(", ")
                              : editingJob.skills || ""
                          }
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              skills: e.target.value,
                            })
                          }
                          placeholder="e.g., JavaScript, React, Node.js"
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Benefits</label>
                        <textarea
                          name="benefits"
                          className="form-control"
                          rows="3"
                          value={editingJob.benefits || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              benefits: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Contact Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Contact Email*</label>
                        <input
                          type="email"
                          name="contactEmail"
                          className="form-control"
                          value={editingJob.contactEmail || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              contactEmail: e.target.value,
                            })
                          }
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Contact Phone</label>
                        <input
                          type="tel"
                          name="contactPhone"
                          className="form-control"
                          value={editingJob.contactPhone || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              contactPhone: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company Website</label>
                        <input
                          type="url"
                          name="companyUrl"
                          className="form-control"
                          value={editingJob.companyUrl || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              companyUrl: e.target.value,
                            })
                          }
                          placeholder="https://example.com"
                        />
                      </div>

                      {/* Application Details */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Deadline</label>
                        <input
                          type="datetime-local"
                          name="deadline"
                          className="form-control"
                          value={editingJob.deadline || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              deadline: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Application Instructions
                        </label>
                        <textarea
                          name="applicationInstructions"
                          className="form-control"
                          rows="3"
                          value={editingJob.applicationInstructions || ""}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              applicationInstructions: e.target.value,
                            })
                          }
                        />
                      </div>

                      {/* Status Fields */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Posting Status</label>
                        <select
                          name="postingstatus"
                          className="form-select"
                          value={editingJob.postingstatus || "pending"}
                          onChange={(e) =>
                            setEditingJob({
                              ...editingJob,
                              postingstatus: e.target.value,
                            })
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Active Status</label>
                        <div className="form-check form-switch mt-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isActive"
                            checked={editingJob.isActive || false}
                            onChange={(e) =>
                              setEditingJob({
                                ...editingJob,
                                isActive: e.target.checked,
                              })
                            }
                          />
                          <label className="form-check-label">
                            {editingJob.isActive ? "Active" : "Inactive"}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowEditJobModal(false)}
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
                            Updating...
                          </>
                        ) : (
                          "Update Job"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Job Modal */}
        {showAddJobModal && (
          <div
            className="modal show"
            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Job</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddJobModal(false)}
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

                  <form onSubmit={handleAddJob}>
                    <div className="row">
                      {/* Basic Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Job Title*</label>
                        <input
                          type="text"
                          name="jobTitle"
                          className="form-control"
                          value={newJob.jobTitle}
                          onChange={handleNewJobChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company Name*</label>
                        <input
                          type="text"
                          name="companyName"
                          className="form-control"
                          value={newJob.companyName}
                          onChange={handleNewJobChange}
                          required
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Description*</label>
                        <textarea
                          name="description"
                          className="form-control"
                          rows="4"
                          value={newJob.description}
                          onChange={handleNewJobChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Category</label>
                        <input
                          type="text"
                          name="category"
                          className="form-control"
                          value={newJob.category}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Apply Date/Time</label>
                        <input
                          type="datetime-local"
                          name="applydatetime"
                          className="form-control"
                          value={newJob.applydatetime}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      {/* Salary Information */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary From</label>
                        <input
                          type="number"
                          name="salaryFrom"
                          className="form-control"
                          value={newJob.salaryFrom}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary To</label>
                        <input
                          type="number"
                          name="salaryTo"
                          className="form-control"
                          value={newJob.salaryTo}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Salary Type</label>
                        <select
                          name="salaryType"
                          className="form-select"
                          value={newJob.salaryType}
                          onChange={handleNewJobChange}
                        >
                          <option value="">Select Type</option>
                          <option value="per hour">per hour</option>
                          <option value="per month">per month</option>
                          <option value="per year">per year</option>
                        </select>
                      </div>

                      {/* Job Details */}
                      <div className="col-md-4 mb-3">
                        <label className="form-label">Job Type*</label>
                        <select
                          name="jobType"
                          className="form-select"
                          value={newJob.jobType}
                          onChange={handleNewJobChange}
                          required
                        >
                          <option value="">Select Type</option>
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Experience Level</label>
                        <select
                          name="experienceLevel"
                          className="form-select"
                          value={newJob.experienceLevel}
                          onChange={handleNewJobChange}
                        >
                          <option value="">Select Level</option>
                          <option value="Entry Level">Entry Level</option>
                          <option value="Mid Level">Mid Level</option>
                          <option value="Senior Level">Senior Level</option>
                        </select>
                      </div>

                      <div className="col-md-4 mb-3">
                        <label className="form-label">Education Level</label>
                        <select
                          name="educationLevel"
                          className="form-select"
                          value={newJob.educationLevel}
                          onChange={handleNewJobChange}
                        >
                          <option value="">Select Level</option>
                          <option value="High School">High School</option>
                          <option value="Bachelor's Degree">
                            Bachelor's Degree
                          </option>
                          <option value="Master's Degree">
                            Master's Degree
                          </option>
                          <option value="PhD">PhD</option>
                        </select>
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Number of Openings</label>
                        <input
                          type="number"
                          name="openings"
                          className="form-control"
                          value={newJob.openings}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Priority</label>
                        <select
                          name="priority"
                          className="form-select"
                          value={newJob.priority}
                          onChange={handleNewJobChange}
                        >
                          <option value="">Select Priority</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>

                      {/* Location Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Location*</label>
                        <input
                          type="text"
                          name="location"
                          className="form-control"
                          value={newJob.location}
                          onChange={handleNewJobChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Remote Job</label>
                        <div className="form-check form-switch mt-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="isRemote"
                            checked={newJob.isRemote}
                            onChange={handleNewJobChange}
                          />
                          <label className="form-check-label">Yes</label>
                        </div>
                      </div>

                      {/* Skills and Benefits */}
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Skills (comma separated)
                        </label>
                        <input
                          type="text"
                          name="skills"
                          className="form-control"
                          value={newJob.skills}
                          onChange={handleNewJobChange}
                          placeholder="e.g., JavaScript, React, Node.js"
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">Benefits</label>
                        <textarea
                          name="benefits"
                          className="form-control"
                          rows="3"
                          value={newJob.benefits}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      {/* Contact Information */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Contact Email*</label>
                        <input
                          type="email"
                          name="contactEmail"
                          className="form-control"
                          value={newJob.contactEmail}
                          onChange={handleNewJobChange}
                          required
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Contact Phone</label>
                        <input
                          type="tel"
                          name="contactPhone"
                          className="form-control"
                          value={newJob.contactPhone}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company Website</label>
                        <input
                          type="url"
                          name="companyUrl"
                          className="form-control"
                          value={newJob.companyUrl}
                          onChange={handleNewJobChange}
                          placeholder="https://example.com"
                        />
                      </div>

                      {/* Application Details */}
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Deadline</label>
                        <input
                          type="datetime-local"
                          name="deadline"
                          className="form-control"
                          value={newJob.deadline}
                          onChange={handleNewJobChange}
                        />
                      </div>

                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Application Instructions
                        </label>
                        <textarea
                          name="applicationInstructions"
                          className="form-control"
                          rows="3"
                          value={newJob.applicationInstructions}
                          onChange={handleNewJobChange}
                        />
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setShowAddJobModal(false)}
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
                          "Add Job"
                        )}
                      </button>
                    </div>
                  </form>
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

export default JobsList;
