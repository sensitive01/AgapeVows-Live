import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  getAllReports,
  updateReportStatus,
} from "../../api/service/adminServices";

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [success, setSuccess] = useState("");

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
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateReportStatus(selectedReport._id, {
        status,
      });

      await fetchReports();

      setSuccess("Report updated successfully!");
      window.$("#reportModal").modal("hide");

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
    }

    setLoading(false);
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

        {/* TABLE */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            <table className="table align-middle mb-0 text-center">
              <thead>
                <tr>
                  {[
                    "S.No",
                    "Reporter",
                    "Reported User",
                    "Reason",
                    "Comments",
                    "Status",
                    "Date",
                    "Actions",
                  ].map((head, index) => (
                    <th
                      key={index}
                      style={{
                        backgroundColor: "#e0e0e0",
                        borderBottom: "2px solid #cfcfcf",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {reports.length > 0 ? (
                  reports.map((report, index) => (
                    <tr key={report._id}>
                      <td>{index + 1}</td>

                      <td>
                        <div className="text-start">
                          <div className="fw-bold">{report.reporterId?.userName || "Unknown"}</div>
                          <div className="text-muted small">{report.reporterId?.agwid || "N/A"}</div>
                        </div>
                      </td>

                      <td>
                        <div className="text-start">
                          <div className="fw-bold text-danger">{report.reportedUserId?.userName || "Unknown"}</div>
                          <div className="text-muted small">{report.reportedUserId?.agwid || "N/A"}</div>
                        </div>
                      </td>

                      <td>{report.reason}</td>
                      <td style={{ maxWidth: "200px" }}>
                        <div className="text-truncate" title={report.comments}>
                          {report.comments || "-"}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            report.status === "Resolved"
                              ? "bg-success"
                              : report.status === "Ignored"
                              ? "bg-secondary"
                              : "bg-warning"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>

                      <td>
                        {new Date(report.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          data-bs-toggle="modal"
                          data-bs-target="#reportModal"
                          onClick={() => handleOpenModal(report)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-4 text-muted">
                      No reports found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Ignored">Ignored</option>
                  </select>
                </div>

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
