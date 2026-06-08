// import React, { useEffect, useState } from "react";
// import NewLayout from "./layout/NewLayout";
// import {
//   getAllIssues,
//   updateIssue,
// } from "../../api/service/adminServices";

// const AdminIssues = () => {
//   const [issues, setIssues] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedIssue, setSelectedIssue] = useState(null);
//   const [reply, setReply] = useState("");
//   const [status, setStatus] = useState("Pending");
//   const [success, setSuccess] = useState("");

//   // ================= FETCH =================
//   const fetchIssues = async () => {
//     try {
//       const res = await getAllIssues();

//       console.log("API Response:", res.data); // ✅ DEBUG

//       // ✅ FIX HERE
//       if (res?.data?.data) {
//         setIssues(res.data.data);
//       } else {
//         setIssues([]);
//       }
//     } catch (error) {
//       console.error("Error fetching issues:", error);
//       setIssues([]);
//     }
//   };

//   useEffect(() => {
//     fetchIssues();
//   }, []);

//   // ================= OPEN MODAL =================
//   const handleOpenModal = (issue) => {
//     setSelectedIssue(issue);
//     setReply(issue.adminReply || "");
//     setStatus(issue.status || "Pending");
//   };

//   // ================= UPDATE =================
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await updateIssue(selectedIssue._id, {
//         status,
//         adminReply: reply,
//       });

//       await fetchIssues();

//       setSuccess("Issue updated successfully!");
//       window.$("#issueModal").modal("hide");

//       setTimeout(() => setSuccess(""), 3000);
//     } catch (error) {
//       console.error("Update error:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <NewLayout>
//       <div
//         style={{
//           marginLeft: "260px",
//           padding: "40px",
//           minHeight: "100vh",
//           background: "#f4f6f9",
//         }}
//       >
//         {/* HEADER */}
//         <div className="mb-4">
//           <h2 className="fw-bold mb-1">Issue Management</h2>
//           <p className="text-muted mb-0">
//             Manage user reported issues here
//           </p>
//         </div>

//         {success && (
//           <div className="alert alert-success shadow-sm">{success}</div>
//         )}

//         {/* TABLE */}
//         <div className="card border-0 shadow-sm rounded-4">
//           <div className="card-body p-0">
//             <table className="table align-middle mb-0 text-center">
//               <thead>
//                 <tr>
//                   {[
//                     "S.No",
//                     "User",
//                     "Issue",
//                     "Attachment",
//                     "Status",
//                     "Admin Reply",
//                     "Created",
//                     "Actions",
//                   ].map((head, index) => (
//                     <th
//                       key={index}
//                       style={{
//                         backgroundColor: "#e0e0e0",
//                         borderBottom: "2px solid #cfcfcf",
//                       }}
//                     >
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {issues.length > 0 ? (
//                   issues.map((issue, index) => (
//                     <tr key={issue._id}>
//                       <td>{index + 1}</td>

//                       {/* ✅ FIXED */}
//                       <td>{issue.userName || "User"}</td>

//                       <td>{issue.details}</td>

//                       <td>
//                         {issue.attachment ? (
//                           <a
//                             href={`http://localhost:4000/${issue.attachment}`}
//                             target="_blank"
//                             rel="noreferrer"
//                           >
//                             View
//                           </a>
//                         ) : (
//                           "-"
//                         )}
//                       </td>

//                       <td>
//                         <span
//                           className={`badge px-3 py-2 ${
//                             issue.status === "Resolved"
//                               ? "bg-success"
//                               : issue.status === "In Progress"
//                               ? "bg-primary"
//                               : "bg-warning"
//                           }`}
//                         >
//                           {issue.status}
//                         </span>
//                       </td>

//                       <td>{issue.adminReply || "-"}</td>

//                       <td>
//                         {new Date(issue.createdAt).toLocaleDateString()}
//                       </td>

//                       <td>
//                         <div className="dropdown">
//                           <button
//                             className="btn btn-light rounded-circle"
//                             data-bs-toggle="dropdown"
//                           >
//                             &#8230;
//                           </button>

//                           <ul className="dropdown-menu dropdown-menu-end shadow-sm">
//                             <li>
//                               <button
//                                 className="dropdown-item"
//                                 data-bs-toggle="modal"
//                                 data-bs-target="#issueModal"
//                                 onClick={() =>
//                                   handleOpenModal(issue)
//                                 }
//                               >
//                                 ✏️ Update
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="py-4 text-muted">
//                       No issues found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* MODAL */}
//         <div className="modal fade" id="issueModal">
//           <div className="modal-dialog modal-lg modal-dialog-centered">
//             <div className="modal-content p-4 rounded-4">

//               <h4 className="fw-bold mb-3 text-primary">
//                 Update Issue
//               </h4>

//               <form onSubmit={handleUpdate}>
//                 <label className="fw-semibold">Status</label>
//                 <select
//                   className="form-control mb-3"
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 >
//                   <option>Pending</option>
//                   <option>In Progress</option>
//                   <option>Resolved</option>
//                 </select>

//                 <label className="fw-semibold">Admin Reply</label>
//                 <textarea
//                   rows="4"
//                   className="form-control mb-4"
//                   value={reply}
//                   onChange={(e) => setReply(e.target.value)}
//                 />

//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100 rounded-pill py-2"
//                   disabled={loading}
//                 >
//                   {loading ? "Updating..." : "Update Issue"}
//                 </button>
//               </form>

//             </div>
//           </div>
//         </div>
//       </div>
//     </NewLayout>
//   );
// };


// export default AdminIssues;



import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);

  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <nav
        aria-label="Page navigation"
        className="d-flex justify-content-center mt-4"
      >
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => setCurrentPage(1)}>
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
                style={
                  currentPage === number
                    ? {
                        backgroundColor: "#1a73e8",
                        borderColor: "#1a73e8",
                        color: "white",
                      }
                    : { color: "#1a73e8" }
                }
              >
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
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
            <div className="table-responsive" style={{ minHeight: "400px" }}>
              <table className="table align-middle mb-0 text-center" style={{ minWidth: "1000px" }}>
              <thead>
                <tr>
                  {[
                    "S.No",
                    "User",
                    "Contact Info",
                    "Issue",
                    "Attachment",
                    "Admin Reply",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((head, index) => (
                    <th
                      key={index}
                      className={["User", "Contact Info", "Admin Reply"].includes(head) ? "text-start" : ""}
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
                {currentIssues.length > 0 ? (
                  currentIssues.map((issue, index) => (
                    <tr key={issue._id}>
                      <td>{indexOfFirstItem + index + 1}</td>

                      <td>
                        <div className="text-start">
                          <div className="fw-bold">{issue.userName || "Unknown"}</div>
                          <div className="text-muted small">{issue.agwid || "N/A"}</div>
                        </div>
                      </td>

                      <td>
                        <div className="text-start">
                          <div className="small">{issue.userEmail || "N/A"}</div>
                          <div className="text-muted small">{issue.userMobile || "N/A"}</div>
                        </div>
                      </td>

                      <td>
                        <div className="text-truncate" style={{ maxWidth: "200px" }} title={issue.details}>
                          {issue.details}
                        </div>
                      </td>

                      {/* ✅ GREEN VIEW BUTTON */}
                      <td>
                        {issue.attachment ? (
                          <a
                            href={issue.attachment.startsWith('http') ? issue.attachment : `http://localhost:3001/${issue.attachment}`}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-success btn-sm"
                          >
                            View
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>

                      <td className="text-start">
                        <div className="small" style={{ maxWidth: "200px" }}>
                          {issue.adminReply || "-"}
                        </div>
                      </td>

                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            issue.status === "Resolved"
                              ? "bg-success"
                              : issue.status === "In Progress"
                              ? "bg-primary"
                              : "bg-warning"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>

                      <td>
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>

                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-light rounded-circle"
                            data-bs-toggle="dropdown"
                          >
                            &#8230;
                          </button>

                          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                            {/* VIEW PROFILE */}
                            {issue.userId && (
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => window.open(`/admin/new-user/${issue.userId}`, '_blank')}
                                >
                                  👤 View Profile
                                </button>
                              </li>
                            )}

                            {/* UPDATE */}
                            <li>
                              <button
                                className="dropdown-item"
                                data-bs-toggle="modal"
                                data-bs-target="#issueModal"
                                onClick={() => handleOpenModal(issue)}
                              >
                                ✏️ Update
                              </button>
                            </li>

                            {/* DELETE */}
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => handleDelete(issue._id)}
                              >
                                🗑️ Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="py-4 text-muted">
                      No issues found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && <Pagination />}

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
                    <div className="col-8">{selectedIssue.userEmail || "N/A"} <br/> {selectedIssue.userMobile || "N/A"}</div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4 fw-bold">Issue:</div>
                    <div className="col-8">{selectedIssue.details}</div>
                  </div>
                  {selectedIssue.attachment && (
                    <div className="row">
                      <div className="col-4 fw-bold">Attachment:</div>
                      <div className="col-8">
                        <a href={selectedIssue.attachment.startsWith('http') ? selectedIssue.attachment : `http://localhost:3001/${selectedIssue.attachment}`} target="_blank" rel="noreferrer" className="text-primary text-decoration-underline">
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
