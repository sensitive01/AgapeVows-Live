import { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getVerifiedIdUsers, verifyIdProof } from "../../api/service/adminServices";
import { useNavigate, Link } from "react-router-dom";
import { confirmAction, showAlert } from "../../utils/alertService";

export default function AdminVerifiedIdUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [processingUsers, setProcessingUsers] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);

  const [sortOrder, setSortOrder] = useState("desc"); // "desc" or "asc"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getVerifiedIdUsers();
        if (response.data.success) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching verified users:", error);
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
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.agwid && user.agwid.toLowerCase().includes(searchTerm.toLowerCase())) ||
          user.userMobile.includes(searchTerm)
      );
    }
    
    // Sort by idVerifiedAt
    filtered.sort((a, b) => {
      const dateA = new Date(a.idVerifiedAt || a.updatedAt || 0);
      const dateB = new Date(b.idVerifiedAt || b.updatedAt || 0);
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users, sortOrder]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleUndoVerification = async (userId) => {
    const confirmed = await confirmAction({
      title: "Undo ID Verification?",
      text: "This will revert the user status back to Uploaded.",
      icon: "warning",
      confirmButtonText: "Yes, Undo",
    });
    if (!confirmed) return;
    
    setProcessingUsers((prev) => new Set(prev).add(userId));
    try {
      const response = await verifyIdProof(userId, "Uploaded");
      if (response.status === 200) {
        // Remove from verified list
        setFilteredUsers((prev) => prev.filter((u) => u._id !== userId));
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        showAlert({
          title: "Success!",
          text: `ID Verification undone successfully! User is now back to Uploaded status.`,
          icon: "success",
        });
      }
    } catch (error) {
      console.error(`Error undoing ID verification:`, error);
      showAlert({
        title: "Error",
        text: `Failed to undo ID verification.`,
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const handleViewProof = (docUrl) => {
    setSelectedProof(docUrl);
    setShowModal(true);
  };

  const Pagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    return (
      <nav className="d-flex justify-content-center mt-4">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          </li>
          {pageNumbers.map(n => (
            <li key={n} className={`page-item ${currentPage === n ? "active" : ""}`}>
              <button className="pagination-link" onClick={() => setCurrentPage(n)} style={{
                padding: "8px 15px",
                border: "1px solid #dee2e6",
                background: currentPage === n ? "#7c3aed" : "#fff",
                color: currentPage === n ? "#fff" : "#7c3aed",
                margin: "0 2px",
                borderRadius: "4px"
              }}>{n}</button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
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
              <h3>Verified Users</h3>
              <p>All users with verified identity ({filteredUsers.length} users)</p>
            </div>

            <div className="row mb-4 align-items-center">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, email or AV ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-7">
                <div className="d-flex align-items-center gap-3 justify-content-md-end">
                  <label className="text-nowrap mb-0 fw-bold">Sort By Date Approved:</label>
                  <select
                    className="form-select w-50 w-md-auto"
                    style={{ minWidth: "260px" }}
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="desc">Latest Approved First (Newest)</option>
                    <option value="asc">Oldest Approved First (Oldest)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="bg-light">
                    <tr>
                      <th>S.No</th>
                      <th>User Details</th>
                      <th>AV ID</th>
                      <th>ID Type</th>
                      <th>ID Number</th>
                      <th>Document</th>
                      <th>Approved Date & Time</th>
                      <th>Actions</th>
                      <th>Profile</th>
                    </tr>
                </thead>
                <tbody>
                  {currentUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{indexOfFirstItem + index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={user.profileImage || "/assets/images/user-placeholder.png"} 
                            alt="" 
                            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }} 
                            onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                          />
                          <div>
                            <div className="fw-bold">{user.userName}</div>
                            <small className="text-muted">{user.userEmail}</small>
                          </div>
                        </div>
                      </td>
                      <td>{user.agwid}</td>
                      {/* <td>
                        <span className={`badge ${
                          user.idVerificationStatus === 'Uploaded' ? 'bg-info' : 
                          user.idVerificationStatus === 'Rejected' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {user.idVerificationStatus || 'Pending'}
                        </span>
                      </td> */}
                      <td>{user.idProofType || "N/A"}</td>
                      <td>{user.idProofNumber || "N/A"}</td>
                      <td>
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
                      <td className="fw-semibold text-secondary">
                        <div>{formatDate(user.idVerifiedAt || user.updatedAt)}</div>
                        <div className="text-muted small fw-normal mt-1">{formatTime(user.idVerifiedAt || user.updatedAt)}</div>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-primary rounded-pill px-3 text-light"
                          disabled={processingUsers.has(user._id)}
                          onClick={() => handleUndoVerification(user._id)}
                        >
                          {processingUsers.has(user._id) ? "..." : "Undo"}
                        </button>
                      </td>
                      <td>
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
                  ))}
                  {currentUsers.length === 0 && (
                    <tr>
                      <td colSpan="10" className="text-center py-5 text-muted">No verified users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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
