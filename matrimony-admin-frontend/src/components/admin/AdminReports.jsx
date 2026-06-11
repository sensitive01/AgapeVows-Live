import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  getAllReports,
  updateReportStatus,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [success, setSuccess] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const [activeTab, setActiveTab] = useState("Pending");
  const [searchQuery, setSearchQuery] = useState("");

  // ================= FETCH =================
  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      if (res?.data?.data) {
        setReports(res.data.data);
      } else {
        setReports([]);
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ================= OPEN MODAL =================
  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setStatus(report.status || "Pending");
    setReplyMessage(report.adminReply || "");
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (status !== "Pending" && !replyMessage.trim()) {
      showAlert({
        title: "Error",
        text: "Admin reply is mandatory for In Progress or Resolved status.",
        icon: "error",
      });
      return;
    }

    setLoading(true);

    try {
      await updateReportStatus(selectedReport._id, {
        status,
        adminReply: replyMessage,
      });

      await fetchReports();

      showAlert({
        title: "Updated",
        text: "Report updated successfully!",
        icon: "success",
      });
      window.$("#reportModal").modal("hide");
    } catch (error) {
      console.error("Update error:", error);
      showAlert({
        title: "Error",
        text: "Failed to update report",
        icon: "error",
      });
    }

    setLoading(false);
  };

  const filteredReports = reports.filter((report) => {
    const isResolvedTab = activeTab === "Resolved";
    const matchesTab = isResolvedTab 
      ? report.status === "Resolved" 
      : report.status !== "Resolved";
    
    const searchLower = searchQuery.toLowerCase();
    const reporterName = report.reporterId?.userName?.toLowerCase() || "";
    const reporterAgwid = report.reporterId?.agwid?.toLowerCase() || "";
    const reportedName = report.reportedUserId?.userName?.toLowerCase() || "";
    const reportedAgwid = report.reportedUserId?.agwid?.toLowerCase() || "";
    const reason = report.reason?.toLowerCase() || "";

    const matchesSearch = 
      reporterName.includes(searchLower) ||
      reporterAgwid.includes(searchLower) ||
      reportedName.includes(searchLower) ||
      reportedAgwid.includes(searchLower) ||
      reason.includes(searchLower);

    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
    },
    {
      name: "Reporter",width:"150px",
      selector: row => row.reporterId?.userName || "Unknown",
      sortable: true,
      cell: row => (
        row.reporterId?._id ? (
          <a
            href={`/admin/new-user/${row.reporterId._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <div className="fw-bold text-primary">{row.reporterId.userName || "Unknown"}</div>
            <div className="text-muted small">{row.reporterId.agwid || "N/A"}</div>
          </a>
        ) : (
          <>
            <div className="fw-bold">Unknown</div>
            <div className="text-muted small">N/A</div>
          </>
        )
      ),
    },
    {
      name: "Reported User", width:"160px",
      selector: row => row.reportedUserId?.userName || "Unknown",
      sortable: true,
      cell: row => (
        row.reportedUserId?._id ? (
          <a
            href={`/admin/new-user/${row.reportedUserId._id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
          >
            <div className="fw-bold text-danger">{row.reportedUserId.userName || "Unknown"}</div>
            <div className="text-muted small">{row.reportedUserId.agwid || "N/A"}</div>
          </a>
        ) : (
          <>
            <div className="fw-bold text-danger">Unknown</div>
            <div className="text-muted small">N/A</div>
          </>
        )
      ),
    },
    {
      name: "Reason",width:"200px",
      selector: row => row.reason,
      sortable: true,
      cell: row => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word", margin: "10px 0" }}>
          {row.reason}
        </div>
      ),
    },
    {
      name: "Comments",
      selector: row => row.comments || "-",
      sortable: true,
      minWidth: "200px",
      cell: row => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word", margin: "10px 0" }}>
          {row.comments || "-"}
        </div>
      ),
    },
    {
      name: "Admin Reply",
      selector: row => row.adminReply || "-",
      sortable: true,
      minWidth: "200px",
      cell: row => (
        <div 
          className="small text-muted" 
          style={{ 
            whiteSpace: "normal", 
            wordBreak: "break-word", 
            margin: "10px 0",
            width: "100%",
            textAlign: row.adminReply ? "left" : "center"
          }}
        >
          {row.adminReply || "-"}
        </div>
      ),
    },
    {
      name: "Status",
      selector: row => row.status,
      sortable: true,
      cell: row => (
        <span
          className={`badge px-3 py-2 ${
            row.status === "Resolved"
              ? "bg-success"
              : row.status === "In Progress"
              ? "bg-primary"
              : "bg-warning text-dark"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Date",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => new Date(row.createdAt).toLocaleDateString(),
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
            {row.reporterId?._id && (
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => window.open(`/admin/new-user/${row.reporterId._id}`, '_blank')}
                >
                  👤 View Reporter
                </button>
              </li>
            )}
            {row.reportedUserId?._id && (
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => window.open(`/admin/new-user/${row.reportedUserId._id}`, '_blank')}
                >
                  🚨 View Reported User
                </button>
              </li>
            )}
            <li>
              <button
                className="dropdown-item"
                data-bs-toggle="modal"
                data-bs-target="#reportModal"
                onClick={() => handleOpenModal(row)}
              >
                ✏️ Update
              </button>
            </li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
        color: "#495057",
        backgroundColor: "#e0e0e0",
        borderBottom: "2px solid #cfcfcf",
      },
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
          <h2 className="fw-bold mb-1">User Report Management</h2>
          <p className="text-muted mb-0">
            View and manage reports submitted by users against other profiles
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
                    placeholder="🔍 Search user, agwid or reason..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      onClick={() => setActiveTab(stat)}
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
            <div className="table-responsive" style={{ minHeight: "400px" }}>
              <CustomTable itemsPerPage={10}
                columns={columns}
                data={filteredReports}
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationPerPage={5}
                highlightOnHover
                customStyles={customStyles}
                noDataComponent={
                  <div className="py-4 text-muted">
                    No reports found.
                  </div>
                }
              />
            </div>
          </div>
        </div>

        {/* MODAL */}
        <div className="modal fade" id="reportModal">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content p-4 rounded-4 shadow-lg border-0">
              <div className="modal-header border-0 p-0 mb-3">
                <h4 className="fw-bold text-primary mb-0">Update Report Status</h4>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>

              {selectedReport && (
                <div className="mb-4 p-3 bg-light rounded-3 small">
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Reporter:</div>
                    <div className="col-8">{selectedReport.reporterId?.userName} ({selectedReport.reporterId?.agwid})</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Reported:</div>
                    <div className="col-8 text-danger">{selectedReport.reportedUserId?.userName} ({selectedReport.reportedUserId?.agwid})</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Reason:</div>
                    <div className="col-8">{selectedReport.reason}</div>
                  </div>
                  <div className="row">
                    <div className="col-4 fw-bold">Comments:</div>
                    <div className="col-8">{selectedReport.comments || "No comments"}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleUpdate}>
                <div className="mb-4">
                  <label className="fw-semibold mb-2">Status</label>
                  <select
                    className="form-select mb-3"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {selectedReport?.status === "Pending" && <option>Pending</option>}
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
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
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
                    {loading ? "Updating..." : "Update Status"}
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

export default AdminReports;
