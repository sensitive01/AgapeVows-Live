import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  getAllEnquiries,
  deleteEnquiry,
  updateEnquiry,
} from "../../api/service/adminServices";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [filteredEnquiries, setFilteredEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [viewEnquiry, setViewEnquiry] = useState(null);
  const [status, setStatus] = useState("New");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [showFullMessage, setShowFullMessage] = useState(false);

  // ================= FETCH =================
  const fetchEnquiries = async () => {
    try {
      const res = await getAllEnquiries();

      if (res?.data?.data) {
        setEnquiries(res.data.data);
        filterEnquiries(res.data.data, filterStatus, searchTerm);
      } else {
        setEnquiries([]);
        setFilteredEnquiries([]);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
      setEnquiries([]);
      setFilteredEnquiries([]);
    }
  };

  // ================= FILTER & SEARCH =================
  const filterEnquiries = (data, statusFilter, search) => {
    let filtered = data;

    if (statusFilter !== "All") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (search) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.phone.includes(search)
      );
    }

    setFilteredEnquiries(filtered);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterEnquiries(enquiries, filterStatus, term);
  };

  const handleStatusFilter = (newStatus) => {
    setFilterStatus(newStatus);
    filterEnquiries(enquiries, newStatus, searchTerm);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // ================= STATS =================
  const getStats = () => {
    return {
      total: enquiries.length,
      new: enquiries.filter(e => e.status === "New").length,
      contacted: enquiries.filter(e => e.status === "Contacted").length,
      closed: enquiries.filter(e => e.status === "Closed").length,
    };
  };

  // ================= OPEN MODAL =================
  const handleOpenModal = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setStatus(enquiry.status || "New");
  };

  // ================= VIEW MESSAGE =================
  const handleViewMessage = (enquiry) => {
    setViewEnquiry(enquiry);
    setShowFullMessage(true);
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await updateEnquiry(selectedEnquiry._id, { status });

      await fetchEnquiries();

      setSuccess("Enquiry updated successfully!");
      window.$("#enquiryModal").modal("hide");

      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Update error:", error);
      setError("Failed to update enquiry");
    }

    setLoading(false);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this enquiry?"
    );
    if (!confirmDelete) return;

    try {
      await deleteEnquiry(id);
      await fetchEnquiries();

      setSuccess("Enquiry deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete enquiry");
    }
  };

  const stats = getStats();

  return (
    <NewLayout>
      <div
        style={{
          marginLeft: "260px",
          padding: "30px 40px",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        {/* ========== HEADER ========== */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold mb-1" style={{ color: "#2c3e50", fontSize: "28px" }}>
                📧 Enquiry Management
              </h1>
              <p className="text-muted mb-0">
                Track and manage all customer enquiries efficiently
              </p>
            </div>
          </div>

          {/* ========== STATS CARDS ========== */}
          <div className="row g-3 mb-4">
            <div className="col-lg-3 col-md-6">
              <div
                className="card border-0 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 opacity-75">Total Enquiries</p>
                      <h3 className="fw-bold mb-0">{stats.total}</h3>
                    </div>
                    <div style={{ fontSize: "40px" }}>📝</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div
                className="card border-0 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 opacity-75">New</p>
                      <h3 className="fw-bold mb-0">{stats.new}</h3>
                    </div>
                    <div style={{ fontSize: "40px" }}>🆕</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div
                className="card border-0 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 opacity-75">Contacted</p>
                      <h3 className="fw-bold mb-0">{stats.contacted}</h3>
                    </div>
                    <div style={{ fontSize: "40px" }}>📞</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div
                className="card border-0 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                  borderRadius: "12px",
                  color: "white",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="mb-1 opacity-75">Closed</p>
                      <h3 className="fw-bold mb-0">{stats.closed}</h3>
                    </div>
                    <div style={{ fontSize: "40px" }}>✅</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== ALERTS ========== */}
        {success && (
          <div
            className="alert alert-success shadow-sm border-0"
            style={{ borderRadius: "12px", marginBottom: "20px" }}
            role="alert"
          >
            <div className="d-flex align-items-center">
              <span style={{ fontSize: "20px", marginRight: "10px" }}>✅</span>
              <strong>{success}</strong>
            </div>
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger shadow-sm border-0"
            style={{ borderRadius: "12px", marginBottom: "20px" }}
            role="alert"
          >
            <div className="d-flex align-items-center">
              <span style={{ fontSize: "20px", marginRight: "10px" }}>❌</span>
              <strong>{error}</strong>
            </div>
          </div>
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
                    placeholder="🔍 Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={handleSearch}
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
                <div className="d-flex gap-2 flex-wrap">
                  {["All", "New", "Contacted", "Closed"].map((stat) => (
                    <button
                      key={stat}
                      onClick={() => handleStatusFilter(stat)}
                      className={`btn btn-sm rounded-pill fw-500`}
                      style={{
                        backgroundColor:
                          filterStatus === stat
                            ? stat === "All"
                              ? "#667eea"
                              : stat === "New"
                              ? "#f5576c"
                              : stat === "Contacted"
                              ? "#00f2fe"
                              : "#43e97b"
                            : "#f0f0f0",
                        color: filterStatus === stat ? "white" : "#666",
                        border: "none",
                        padding: "8px 16px",
                        fontSize: "13px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {stat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========== TABLE ========== */}
        <div className="card border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "visible" }}>
          <div className="card-body p-0">
            {filteredEnquiries.length > 0 ? (
              <div style={{ width: "100%", overflow: "visible" }}>
                <table className="table mb-0">
                  <thead>
                    <tr style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #e0e0e0" }}>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>S.No</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Name</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Contact</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Email</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Message</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Status</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Date</th>
                      <th style={{ padding: "15px", fontWeight: "600", color: "#2c3e50", textAlign: "center" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEnquiries.map((item, index) => (
                      <tr
                        key={item._id}
                        style={{
                          borderBottom: "1px solid #e8e8e8",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f5f7fa")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        <td style={{ padding: "15px", fontSize: "14px", textAlign: "center" }}>
                          <span style={{ backgroundColor: "#f0f0f0", padding: "4px 8px", borderRadius: "4px" }}>
                            {index + 1}
                          </span>
                        </td>

                        <td style={{ padding: "15px", fontSize: "14px", fontWeight: "500", textAlign: "center" }}>
                          {item.name}
                        </td>

                        <td style={{ padding: "15px", fontSize: "14px", textAlign: "center" }}>
                          <a href={`tel:${item.phone}`} style={{ color: "#667eea", textDecoration: "none" }}>
                            {item.phone}
                          </a>
                        </td>

                        <td style={{ padding: "15px", fontSize: "14px", textAlign: "center" }}>
                          <a href={`mailto:${item.email}`} style={{ color: "#667eea", textDecoration: "none" }}>
                            {item.email || "-"}
                          </a>
                        </td>

                        <td style={{ padding: "15px", fontSize: "14px", textAlign: "center" }}>
                          <div style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "0 auto" }}>
                            {item.message}
                          </div>
                        </td>

                        <td style={{ padding: "15px", textAlign: "center" }}>
                          <span
                            style={{
                              backgroundColor:
                                item.status === "Closed"
                                  ? "#d4edda"
                                  : item.status === "Contacted"
                                  ? "#cfe2ff"
                                  : "#fff3cd",
                              color:
                                item.status === "Closed"
                                  ? "#155724"
                                  : item.status === "Contacted"
                                  ? "#084298"
                                  : "#856404",
                              padding: "6px 12px",
                              borderRadius: "20px",
                              fontSize: "12px",
                              fontWeight: "600",
                              display: "inline-block",
                            }}
                          >
                            {item.status === "Closed"
                              ? "✅ Closed"
                              : item.status === "Contacted"
                              ? "📞 Contacted"
                              : "🆕 New"}
                          </span>
                        </td>

                        <td style={{ padding: "15px", fontSize: "13px", color: "#666", textAlign: "center" }}>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td style={{ padding: "15px", textAlign: "center", position: "relative" }}>
                          <div className="dropdown" style={{ display: "inline-block" }}>
                            <button
                              className="btn btn-light btn-sm rounded-circle"
                              data-bs-toggle="dropdown"
                              style={{
                                width: "40px",
                                height: "40px",
                                padding: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                border: "1px solid #e0e0e0",
                                backgroundColor: "#f5f5f5",
                                cursor: "pointer",
                              }}
                              title="More actions"
                            >
                              ⋯
                            </button>

                          <ul 
  className="dropdown-menu dropdown-menu-end"
  style={{ 
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    minWidth: "160px",
    padding: "6px 0",
    backgroundColor: "#fff",
    zIndex: 9999,   // 🔥 IMPORTANT
  }}
>
                              {/* VIEW MESSAGE */}
                              <li>
                                <button
                                  onClick={() => handleViewMessage(item)}
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    width: "100%",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#333",
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#f5f8ff";
                                    e.currentTarget.style.color = "#4facfe";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#333";
                                  }}
                                >
                                  <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>👁️</span>
                                  <span>View Message</span>
                                </button>
                              </li>

                              {/* UPDATE STATUS */}
                              <li>
                                <button
                                  data-bs-toggle="modal"
                                  data-bs-target="#enquiryModal"
                                  onClick={() => handleOpenModal(item)}
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    width: "100%",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#333",
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#fff5f0";
                                    e.currentTarget.style.color = "#f5576c";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#333";
                                  }}
                                >
                                  <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>✏️</span>
                                  <span>Edit Status</span>
                                </button>
                              </li>

                              {/* DIVIDER */}
                              <li style={{ margin: "8px 0", borderTop: "1px solid #f0f0f0" }}></li>

                              {/* DELETE */}
                              <li>
                                <button
                                  onClick={() => handleDelete(item._id)}
                                  style={{
                                    padding: "8px 12px",
                                    fontSize: "14px",
                                    fontWeight: "500",
                                    cursor: "pointer",
                                    border: "none",
                                    background: "transparent",
                                    width: "100%",
                                    textAlign: "left",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#ff6b6b",
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#ffe5e5";
                                    e.currentTarget.style.color = "#ff4757";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "#ff6b6b";
                                  }}
                                >
                                  <span style={{ fontSize: "16px", width: "20px", textAlign: "center" }}>🗑️</span>
                                  <span>Delete</span>
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: "#999",
                }}
              >
                <div style={{ fontSize: "50px", marginBottom: "15px" }}>📭</div>
                <h5 className="fw-bold mb-2">No Enquiries Found</h5>
                <p>
                  {searchTerm || filterStatus !== "All"
                    ? "Try adjusting your search or filter criteria"
                    : "No enquiries at this moment"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========== MODAL ========== */}
        <div className="modal fade" id="enquiryModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0"
              style={{ borderRadius: "12px", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
            >
              <div
                className="modal-header border-0"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  borderRadius: "12px 12px 0 0",
                  padding: "20px",
                }}
              >
                <h5 className="modal-title fw-bold">✏️ Update Enquiry Status</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body p-4">
                {selectedEnquiry && (
                  <div className="mb-4">
                    <div className="mb-3 pb-3 border-bottom">
                      <label className="text-muted small">Name</label>
                      <p className="fw-500 mb-0">{selectedEnquiry.name}</p>
                    </div>
                    <div className="mb-3 pb-3 border-bottom">
                      <label className="text-muted small">Email</label>
                      <p className="fw-500 mb-0">{selectedEnquiry.email}</p>
                    </div>
                    <div className="mb-3 pb-3">
                      <label className="text-muted small">Message</label>
                      <p className="fw-500 mb-0 text-muted">{selectedEnquiry.message}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleUpdate}>
                  <label className="fw-bold mb-2 d-block">Change Status</label>
                  <select
                    className="form-select mb-4"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      border: "1.5px solid #e0e0e0",
                      padding: "10px 12px",
                    }}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Closed</option>
                  </select>

                  <button
                    type="submit"
                    className="btn w-100 rounded-pill fw-bold"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      padding: "12px",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {loading ? "🔄 Updating..." : "✅ Update Status"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ========== FULL MESSAGE VIEW ========== */}
        {showFullMessage && viewEnquiry && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "20px",
            }}
            onClick={() => setShowFullMessage(false)}
          >
            <div
              className="card border-0"
              style={{
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                maxWidth: "900px",
                width: "100%",
                maxHeight: "90vh",
                overflow: "auto",
                backgroundColor: "white",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div
                style={{
                  background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  color: "white",
                  padding: "25px",
                  borderRadius: "12px 12px 0 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "sticky",
                  top: 0,
                  zIndex: 1001,
                }}
              >
                <h4 className="fw-bold mb-0">👁️ Enquiry Details</h4>
                <button
                  onClick={() => setShowFullMessage(false)}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    border: "none",
                    color: "white",
                    fontSize: "24px",
                    cursor: "pointer",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div style={{ padding: "30px" }}>
                {/* DETAILS SECTION */}
                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label className="text-muted small fw-bold d-block mb-2">📝 Name</label>
                    <p className="fw-500" style={{ fontSize: "16px" }}>{viewEnquiry.name}</p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="text-muted small fw-bold d-block mb-2">📞 Phone</label>
                    <p className="fw-500" style={{ fontSize: "16px" }}>
                      <a href={`tel:${viewEnquiry.phone}`} style={{ color: "#667eea", textDecoration: "none" }}>
                        {viewEnquiry.phone}
                      </a>
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="text-muted small fw-bold d-block mb-2">📧 Email</label>
                    <p className="fw-500" style={{ fontSize: "16px" }}>
                      <a href={`mailto:${viewEnquiry.email}`} style={{ color: "#667eea", textDecoration: "none" }}>
                        {viewEnquiry.email}
                      </a>
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="text-muted small fw-bold d-block mb-2">📅 Created Date</label>
                    <p className="fw-500" style={{ fontSize: "16px" }}>
                      {new Date(viewEnquiry.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="text-muted small fw-bold d-block mb-2">Status</label>
                    <span
                      style={{
                        backgroundColor:
                          viewEnquiry.status === "Closed"
                            ? "#d4edda"
                            : viewEnquiry.status === "Contacted"
                            ? "#cfe2ff"
                            : "#fff3cd",
                        color:
                          viewEnquiry.status === "Closed"
                            ? "#155724"
                            : viewEnquiry.status === "Contacted"
                            ? "#084298"
                            : "#856404",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "600",
                        display: "inline-block",
                      }}
                    >
                      {viewEnquiry.status === "Closed"
                        ? "✅ Closed"
                        : viewEnquiry.status === "Contacted"
                        ? "📞 Contacted"
                        : "🆕 New"}
                    </span>
                  </div>
                </div>

                <hr style={{ margin: "30px 0" }} />

                {/* FULL MESSAGE */}
                <div className="mb-4">
                  <label className="text-muted small fw-bold d-block mb-3">💬 Full Message</label>
                  <div
                    style={{
                      backgroundColor: "#f8f9fa",
                      padding: "20px",
                      borderRadius: "8px",
                      border: "1px solid #e0e0e0",
                      fontSize: "15px",
                      lineHeight: "1.8",
                      color: "#333",
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      minHeight: "150px",
                    }}
                  >
                    {viewEnquiry.message}
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                <div className="mt-4">
                  <button
                    onClick={() => setShowFullMessage(false)}
                    className="btn w-100 rounded-pill fw-bold"
                    style={{
                      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                      color: "white",
                      padding: "12px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    ✅ Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </NewLayout>
  );
};

export default AdminEnquiries;