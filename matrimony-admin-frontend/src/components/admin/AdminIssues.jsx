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
    if (!reply.trim()) {
      showAlert({
        title: "Error",
        text: "Admin reply is mandatory.",
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = issues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(issues.length / itemsPerPage);

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

        {/* TABLE */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            <table className="table align-middle mb-0 text-center">
              <thead>
                <tr>
                  {[
                    "S.No",
                    "User",
                    "Issue",
                    "Attachment",
                    "Status",
                    "Admin Reply",
                    "Created",
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
                {currentIssues.length > 0 ? (
                  currentIssues.map((issue, index) => (
                    <tr key={issue._id}>
                      <td>{indexOfFirstItem + index + 1}</td>

                      <td>{issue.userName || "User"}</td>

                      <td>{issue.details}</td>

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

                      <td>{issue.adminReply || "-"}</td>

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
                    <td colSpan="8" className="py-4 text-muted">
                      No issues found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && <Pagination />}

        {/* MODAL */}
        <div className="modal fade" id="issueModal">
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4 rounded-4">
              <h4 className="fw-bold mb-3 text-primary">
                Update Issue
              </h4>

              <form onSubmit={handleUpdate}>
                <label className="fw-semibold">Status</label>
                <select
                  className="form-control mb-3"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

                <label className="fw-semibold">Admin Reply <span className="text-danger">*</span></label>
                <textarea
                  rows="4"
                  className="form-control mb-4"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  required
                />

                <div className="d-flex gap-2 mt-2">
                  <button
                    type="button"
                    className="btn btn-light w-50 rounded-pill py-2 border"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-50 rounded-pill py-2"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Update Issue"}
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
