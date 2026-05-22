import { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getUnverifiedIdUsers, verifyIdProof, deleteUserById } from "../../api/service/adminServices";
import { useNavigate, Link } from "react-router-dom";
import { confirmAction, showAlert } from "../../utils/alertService";

export default function AdminUnverifiedIdUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [processingUsers, setProcessingUsers] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);

  const [sortField, setSortField] = useState("userName");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUnverifiedIdUsers();
        if (response.data.success) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching unverified users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...users];
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userMobile?.includes(searchTerm)
      );
    }
    
    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <i className="fa fa-sort text-muted ms-1"></i>;
    return sortDirection === "asc" ? (
      <i className="fa fa-sort-up ms-1"></i>
    ) : (
      <i className="fa fa-sort-down ms-1"></i>
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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


  const handleVerifyId = async (userId, status) => {
    if (status === "Rejected") {
      const confirmed = await confirmAction({
        title: "Reject ID Proof?",
        text: "Are you sure you want to reject this ID proof?",
        icon: "warning",
        confirmButtonText: "Yes, Reject",
      });
      if (!confirmed) return;
    }
    
    setProcessingUsers((prev) => new Set(prev).add(userId));
    try {
      const response = await verifyIdProof(userId, status);
      if (response.status === 200) {
        if (status === "Verified") {
          // Remove from list if verified
          setFilteredUsers((prev) => prev.filter((u) => u._id !== userId));
          setUsers((prev) => prev.filter((u) => u._id !== userId));
        } else {
          // Just update status if rejected
          setUsers((prev) => prev.map(u => u._id === userId ? { ...u, idVerificationStatus: status } : u));
          setFilteredUsers((prev) => prev.map(u => u._id === userId ? { ...u, idVerificationStatus: status } : u));
        }
        showAlert({
          title: "Success!",
          text: `ID Proof ${status} successfully!`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error(`Error ${status} ID:`, error);
      showAlert({
        title: "Error",
        text: `Failed to ${status} ID proof.`,
        icon: "error",
      });
    } finally {
      setProcessingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };

  const handleViewProof = (docUrl) => {
    setSelectedProof(docUrl);
    setShowModal(true);
  };


  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit">
              <h3>ID Verification Requests</h3>
              <p>All users pending identity verification ({filteredUsers.length} users)</p>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light">
                    <tr>
                      <th className="text-center">S.No</th>
                      <th 
                        className="cursor-pointer"
                        onClick={() => handleSort("userName")}
                      >
                        User Details {getSortIcon("userName")}
                      </th>
                      <th 
                        className="text-center cursor-pointer"
                        onClick={() => handleSort("agwid")}
                      >
                        AV ID {getSortIcon("agwid")}
                      </th>
                      <th 
                        className="text-center cursor-pointer"
                        onClick={() => handleSort("idVerificationStatus")}
                      >
                        Status {getSortIcon("idVerificationStatus")}
                      </th>
                      <th 
                        className="text-center cursor-pointer"
                        onClick={() => handleSort("idProofType")}
                      >
                        ID Type {getSortIcon("idProofType")}
                      </th>
                      <th className="text-center">ID Number</th>
                      <th className="text-center">Document</th>
                      <th className="text-center">Actions</th>
                      <th className="text-center">Profile</th>
                    </tr>
                </thead>
                <tbody>
                  {currentUsers.length > 0 ? (
                    currentUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td className="text-center">{indexOfFirstItem + index + 1}</td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <img 
                            src={user.profileImage || "/assets/images/user-placeholder.png"} 
                            alt="" 
                            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }} 
                            onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          />
                          <div className="text-start">
                            <div className="fw-bold">{user.userName}</div>
                            <small className="text-muted">{user.userEmail}</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">{user.agwid}</td>
                      <td className="text-center">
                        <span className={`badge text-white ${ 
                          user.idVerificationStatus === 'Uploaded' ? 'bg-info' : 
                          user.idVerificationStatus === 'Rejected' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {user.idVerificationStatus || 'Pending'}
                        </span>
                      </td>
                      <td className="text-center">{user.idProofType || "N/A"}</td>
                      <td className="text-center">{user.idProofNumber || "N/A"}</td>
                      <td className="text-center">
                        {user.idProofDocument ? (
                          <button 
                            className="btn btn-sm btn-outline-info"
                            onClick={() => handleViewProof(user.idProofDocument)}
                          >
                            <i className="fa fa-eye me-1"></i> View ID
                          </button>
                        ) : (
                          <span className="text-muted small italic">Not Uploaded</span>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button 
                            className="btn btn-sm btn-success text-white"
                            disabled={processingUsers.has(user._id)}
                            onClick={() => handleVerifyId(user._id, "Verified")}
                          >
                            {processingUsers.has(user._id) ? "..." : "Verify"}
                          </button>
                          <button 
                            className="btn btn-sm btn-danger text-white"
                            disabled={processingUsers.has(user._id)}
                            onClick={() => handleVerifyId(user._id, "Rejected")}
                          >
                            {processingUsers.has(user._id) ? "..." : "Reject"}
                          </button>
                        </div>
                      </td>
                      <td className="text-center">
                        <Link 
                          to={`/admin/new-user/${user._id}`} 
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
                      <td colSpan="9" className="text-center py-5 text-muted">No pending verification requests found.</td>
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

      {/* Modal for viewing ID */}
      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">ID Proof Document</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                {selectedProof?.endsWith(".pdf") ? (
                   <iframe src={selectedProof} width="100%" height="500px" title="PDF ID"></iframe>
                ) : (
                  <img src={selectedProof} alt="ID Proof" className="img-fluid" />
                )}
              </div>
              <div className="modal-footer">
                <a href={selectedProof} download className="btn btn-primary" target="_blank" rel="noreferrer">Download</a>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </NewLayout>
  );
}
