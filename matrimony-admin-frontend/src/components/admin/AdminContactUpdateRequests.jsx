import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { Link } from "react-router-dom";
import {
  getContactUpdateRequests,
  approveContactUpdate,
  rejectContactUpdate,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";

const AdminContactUpdateRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // ================= FETCH =================
  const fetchRequests = async () => {
    try {
      const res = await getContactUpdateRequests();

      if (res?.data?.data) {
        setRequests(res.data.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching contact update requests:", error);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= APPROVE =================
  const handleApprove = async (userId) => {
    const confirmed = await confirmAction({
      title: "Approve Request?",
      text: "Are you sure you want to approve this contact update?",
      icon: "warning",
      confirmButtonText: "Yes, Approve",
    });

    if (!confirmed) return;

    try {
      await approveContactUpdate(userId);
      await fetchRequests();

      showAlert({
        title: "Approved",
        text: "Contact update approved successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Approve error:", error);
      showAlert({
        title: "Error",
        text: "Failed to approve contact update.",
        icon: "error",
      });
    }
  };

  // ================= REJECT =================
  const handleReject = async (userId) => {
    const confirmed = await confirmAction({
      title: "Reject Request?",
      text: "Are you sure you want to reject this contact update?",
      icon: "warning",
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#d33",
    });

    if (!confirmed) return;

    try {
      await rejectContactUpdate(userId);
      await fetchRequests();

      showAlert({
        title: "Rejected",
        text: "Contact update rejected successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Reject error:", error);
      showAlert({
        title: "Error",
        text: "Failed to reject contact update.",
        icon: "error",
      });
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(requests.length / itemsPerPage);

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
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit">
              <h3>Contact Update Requests</h3>
              <p>Review and approve requests from users to update their mobile number or email.</p>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead className="bg-light">
                  <tr>
                    <th className="text-center">S.No</th>
                    <th>User Details</th>
                    <th className="text-center">Current Contact</th>
                    <th className="text-center">Requested Update</th>
                    <th className="text-center">Created At</th>
                    <th className="text-center">Actions</th>
                    <th className="text-center">Profile</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((req, index) => (
                      <tr key={req._id}>
                        <td className="text-center">{indexOfFirstItem + index + 1}</td>

                        <td className="align-middle">
                          <div className="d-flex align-items-center">
                            <img
                              src={req.profileImage || "/assets/images/user-placeholder.png"}
                              alt="Profile"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                                marginRight: "10px"
                              }}
                              onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                            />
                            <div className="text-start">
                              <div className="fw-bold">{req.userName || "User"}</div>
                              <small className="text-muted">{req.agwid}</small>
                            </div>
                          </div>
                        </td>

                        <td className="text-center">
                          {req.requestedMobile && <div><strong>Mobile:</strong> {req.userMobile}</div>}
                          {req.requestedEmail && <div><strong>Email:</strong> {req.userEmail}</div>}
                        </td>
   
                        <td className="text-center text-primary fw-bold">
                          {req.requestedMobile && <div>{req.requestedMobile} </div>}
                          {req.requestedEmail && <div>{req.requestedEmail} </div>}
                        </td>

                        <td className="text-center">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </td>

                        <td className="text-center">
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-success text-white"
                              onClick={() => handleApprove(req._id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-sm btn-danger text-white"
                              onClick={() => handleReject(req._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                        <td className="text-center">
                          <Link 
                            to={`/admin/new-user/${req._id}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="fa fa-user me-1"></i> View Profile
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-4 text-muted text-center">
                        No pending contact update requests.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && <Pagination />}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminContactUpdateRequests;
