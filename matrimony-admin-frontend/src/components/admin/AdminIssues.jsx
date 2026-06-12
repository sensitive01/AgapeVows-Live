import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import CustomTable from "./common/CustomTable";
import {
  getAllIssues,
  updateIssue,
  deleteIssue,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";

const AdminIssues = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [reply, setReply] = useState("");
  const [status, setStatus] = useState("Pending");
  const [success, setSuccess] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  // ================= FETCH =================
  const fetchIssues = async () => {
    try {
      const res = await getAllIssues();

      if (res?.data?.data) {
        setIssues(res.data.data);
      } else {
        setIssues([]);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
      setIssues([]);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  // ================= OPEN MODAL =================
  const handleOpenModal = (issue) => {
    setSelectedIssue(issue);
    setReply(issue.adminReply || "");
    setStatus(issue.status || "Pending");
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (status !== "Pending" && !reply.trim()) {
      showAlert({
        title: "Error",
        text: "Admin reply is mandatory for In Progress or Resolved status.",
        icon: "error",
      });
      return;
    }
    setLoading(true);

    try {
      await updateIssue(selectedIssue._id, {
        status,
        adminReply: reply,
      });

      await fetchIssues();

      showAlert({
        title: "Success",
        text: "Issue updated successfully!",
        icon: "success",
      });
      window.$("#issueModal").modal("hide");

    } catch (error) {
      console.error("Update error:", error);
      showAlert({
        title: "Error",
        text: "Failed to update issue.",
        icon: "error",
      });
    }

    setLoading(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete Issue?",
      text: "Are you sure you want to delete this issue?",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmed) return;

    try {
      await deleteIssue(id);
      await fetchIssues();

      showAlert({
        title: "Deleted",
        text: "Issue deleted successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Delete error:", error);
      showAlert({
        title: "Error",
        text: "Failed to delete issue.",
        icon: "error",
      });
    }
  };

  const filteredIssues = issues.filter((issue) => {
    const isResolvedTab = activeTab === "Resolved";
    const matchesTab = isResolvedTab
      ? issue.status === "Resolved"
      : (issue.status === "Pending" || issue.status === "In Progress");

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      (issue.userName && issue.userName.toLowerCase().includes(searchLower)) ||
      (issue.details && issue.details.toLowerCase().includes(searchLower));

    return matchesTab && matchesSearch;
  });

  const columns = [
    { name: "S.No", selector: (row, index) => index + 1, sortable: false, width: "70px" },
    {
      name: "User", width: "120px",
      selector: row => row.userName,
      sortable: true,
      cell: row => (
        <div className="text-start">
          <div className="fw-bold">{row.userName || "Unknown"}</div>
          <div className="text-muted small">{row.agwid || "N/A"}</div>
        </div>
      )
    },
    {
      name: "Contact Info", width: "240px",
      selector: row => row.userEmail,
      sortable: true,
      cell: row => (
        <div className="text-start">
          <div className="small">{row.userEmail || "N/A"}</div>
          <div className="text-muted small">{row.userMobile || "N/A"}</div>
        </div>
      )
    },
    {
      name: "Issue",
      selector: row => row.details,
      sortable: true,
      width: "200px",
      wrap: true,
      cell: row => (
        <div className="small" style={{ wordBreak: "break-word" }}>
          {row.details}
        </div>
      )
    },
    {
      name: "Attachment",
      cell: row => row.attachment ? (
        <a
          href={row.attachment.startsWith('http') ? row.attachment : `http://localhost:4000/${row.attachment}`}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success btn-sm"
        >
          View
        </a>
      ) : "-"
    },
    {
      name: "Admin Reply", width: "250px",
      selector: row => row.adminReply,
      sortable: true,
      wrap: true,
      cell: row => (
        <div className="small" style={{ wordBreak: "break-word" }}>
          {row.adminReply || "-"}
        </div>
      )
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`badge px-3 py-2 ${row.status === "Resolved"
            ? "bg-success"
            : row.status === "In Progress"
              ? "bg-primary"
              : "bg-warning"
            }`}
        >
          {row.status}
        </span>
      )
    },
    {
      name: "Created",
      selector: row => row.createdAt,
      sortable: true,
      format: row => new Date(row.createdAt).toLocaleDateString()
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className={`dropdown ${index >= 5 ? "dropup" : ""}`}>
          <button
            className="btn btn-light rounded-circle"
            data-bs-toggle="dropdown"
          >
            &#8230;
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            {row.userId && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => window.open(`/admin/new-user/${row.userId}`, '_blank')}
                >
                  👤 View Profile
                </button>
              </li>
            )}
            <li>
              <button
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#issueModal"
                onClick={() => handleOpenModal(row)}
              >
                ✏️ Update
              </button>
            </li>
            <li>
              <button
                className="dropdown-item text-danger"
                onClick={() => handleDelete(row._id)}
              >
                🗑️ Delete
              </button>
            </li>
          </ul>
        </div>
      )
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "#6c757d",
        backgroundColor: "#e0e0e0",
        borderBottom: "2px solid #cfcfcf",
        padding: "15px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "15px",
      },
    },
    tableWrapper: {
      style: {
        minHeight: "300px",
        overflow: "visible !important",
      }
    },
    table: {
      style: {
        overflow: "visible !important",
      }
    },
  };

  return (
    <NewLayout>
      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
          minHeight: "100vh",
          background: "#f4f6f9",
        }}
      >
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Issue Management</h2>
          <p className="text-muted mb-0">
            Manage user reported issues here
          </p>
        </div>

        {success && (
          <div className="alert alert-success shadow-sm">{success}</div>
        )}

        {/* ========== SEARCH & FILTER ========== */}
        <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "12px" }}>
          <div className="card-body p-4">
            <div className="row g-3">
              {/* Search */}
              <div className="col-lg-6">
                <div style={{ position: "relative" }}>
                  <input
                    type="text"
                    className="form-control ps-4"
                    placeholder="🔍 Search user or issue details..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    style={{
                      borderRadius: "10px",
                      border: "1.5px solid #e0e0e0",
                      padding: "10px 15px",
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>

              {/* Filter */}
              <div className="col-lg-6">
                <div className="d-flex gap-2 flex-wrap justify-content-lg-end">
                  {["Pending", "Resolved"].map((stat) => (
                    <button
                      key={stat}
                      onClick={() => { setActiveTab(stat); setCurrentPage(1); }}
                      className={`btn btn-sm rounded-pill fw-bold`}
                      style={{
                        backgroundColor:
                          activeTab === stat
                            ? stat === "Pending"
                              ? "#f5576c"
                              : "#43e97b"
                            : "#f0f0f0",
                        color: activeTab === stat ? "white" : "#666",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {stat === "Pending" ? "Pending & In Progress" : "Resolved"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            <div className="table-responsive">
              <CustomTable itemsPerPage={10}
                columns={columns}
                data={filteredIssues}
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationPerPage={5}
                highlightOnHover
                customStyles={customStyles}
                noDataComponent={<div className="py-4 text-muted">No issues found.</div>}
              />
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="issueModal">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content p-4 rounded-4 shadow-lg border-0">
              <div className="modal-header border-0 p-0 mb-3">
                <h4 className="fw-bold text-primary mb-0">Update Issue Status</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              {selectedIssue && (
                <div className="mb-4 p-3 bg-light rounded-3 small">
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">User:</div>
                    <div className="col-8">{selectedIssue.userName || "Unknown"} ({selectedIssue.agwid || "N/A"})</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Contact:</div>
                    <div className="col-8">{selectedIssue.userEmail || "N/A"} <br /> {selectedIssue.userMobile || "N/A"}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Issue:</div>
                    <div className="col-8">{selectedIssue.details}</div>
                  </div>
                  {selectedIssue.attachment && (
                    <div className="row">
                      <div className="col-4 fw-bold">Attachment:</div>
                      <div className="col-8">
                        <a href={selectedIssue.attachment.startsWith('http') ? selectedIssue.attachment : `http://localhost:4000/${selectedIssue.attachment}`} target="_blank" rel="noreferrer" className="text-primary text-decoration-underline">
                          View Uploaded File
                        </a> 
                      </div>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleUpdate} className="text-start">
                <div className="mb-4">
                  <label className="fw-semibold mb-2">Status</label>
                  <select
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {selectedIssue?.status === "Pending" && <option>Pending</option>}
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                </div>

                {status !== "Pending" && (
                  <div className="mb-4">
                    <label className="fw-semibold mb-2">Admin Reply <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter reply..."
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                      required
                    ></textarea>
                  </div>
                )}

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-light flex-grow-1 rounded-pill"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1 rounded-pill"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminIssues;
