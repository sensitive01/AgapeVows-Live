import { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  getUnverifiedIdUsers,
  verifyIdProof,
  deleteUserById,
} from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";

export default function AdminUnverifiedIdUsers() {
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
    let filtered = users;
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userMobile.includes(searchTerm)
      );
    }
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchTerm, users]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleVerifyId = async (userId, status) => {
    if (status === "Rejected" && !window.confirm("Are you sure you want to reject this ID proof?")) {
      return;
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
        alert(`ID Proof ${status} successfully!`);
      }
    } catch (error) {
      console.error(`Error ${status} ID:`, error);
      alert(`Failed to ${status} ID proof.`);
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
                      <th>S.No</th>
                      <th>User Details</th>
                      <th>Status</th>
                      <th>ID Type</th>
                      <th>ID Number</th>
                      <th>Document</th>
                      <th>Actions</th>
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
                      <td>
                        <span className={`badge ${
                          user.idVerificationStatus === 'Uploaded' ? 'bg-info' : 
                          user.idVerificationStatus === 'Rejected' ? 'bg-danger' : 'bg-warning'
                        }`}>
                          {user.idVerificationStatus || 'Pending'}
                        </span>
                      </td>
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
                      <td>
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-success"
                            disabled={processingUsers.has(user._id)}
                            onClick={() => handleVerifyId(user._id, "Verified")}
                          >
                            {processingUsers.has(user._id) ? "..." : "Verify"}
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            disabled={processingUsers.has(user._id)}
                            onClick={() => handleVerifyId(user._id, "Rejected")}
                          >
                            {processingUsers.has(user._id) ? "..." : "Reject"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {currentUsers.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-5 text-muted">No pending verification requests found.</td>
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
