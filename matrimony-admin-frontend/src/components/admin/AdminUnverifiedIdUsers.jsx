import { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getUnverifiedIdUsers, verifyIdProof, deleteUserById } from "../../api/service/adminServices";
import { useNavigate, Link } from "react-router-dom";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";

export default function AdminUnverifiedIdUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    let filtered = [...users];
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userMobile?.includes(searchTerm) || (user.agwid || "").toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
      center: true,
      width: "60px",
    },
    {
      name: "User Details",
      selector: row => row.userName,
      sortable: true,
      width: "320px",
      minWidth: "280px",
      wrap: true,
      cell: row => (
        <div className="d-flex align-items-center py-2" style={{ wordBreak: "break-word", minWidth: "250px" }}>
          <img 
            src={row.profileImage || "/assets/images/user-placeholder.png"} 
            alt="" 
            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", marginRight: "10px" }} 
            onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          />
          <div className="text-start" style={{ minWidth: 0 }}>
            <div className="fw-bold">{row.userName}</div>
            <small className="text-muted d-block">{row.userEmail}</small>
            <small className="text-info fw-bold d-block">{row.agwid || "N/A"}</small>
          </div>
        </div>
      )
    },
    {
      name: "Status",
      selector: row => row.idVerificationStatus || 'Pending',
      sortable: true,
      width: "90px",
      cell: row => (
        <span className={`badge text-white ${ 
          row.idVerificationStatus === 'Uploaded' ? 'bg-info' : 
          row.idVerificationStatus === 'Rejected' ? 'bg-danger' : 'bg-warning'
        }`}>
          {row.idVerificationStatus || 'Pending'}
        </span>
      ),
      center: true,
    },
    {
      name: "ID Type",
      selector: row => row.idProofType || "N/A",
      sortable: true,
      center: true,
      width: "100px",
      wrap: true,
      cell: row => (
        <div style={{ wordBreak: "break-word" }}>
          {row.idProofType || "N/A"}
        </div>
      )
    },
    {
      name: "ID Number", 
      selector: row => row.idProofNumber || "N/A",
      sortable: true,
      center: true,
      width: "110px",
      wrap: true,
      cell: row => (
        <div style={{ wordBreak: "break-word" }}>
          {row.idProofNumber || "N/A"}
        </div>
      )
    },
    {
      name: "Document",
      width: "90px",
      cell: row => row.idProofDocument ? (
        <button 
          className="btn btn-sm btn-outline-info"
          onClick={() => handleViewProof(row.idProofDocument)}
        >
          <i className="fa fa-eye me-1"></i> View ID
        </button>
      ) : (
        <span className="text-muted small fst-italic">Not Uploaded</span>
      ),
      center: true,
    },
    {
      name: "Created At",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      width: "90px",
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "Actions",
      width: "140px",
      cell: row => (
        <div className="d-flex flex-column gap-2 align-items-center">
          <div className="d-flex justify-content-center gap-2 w-100">
            <button 
              className="btn btn-sm btn-success text-white w-50"
              disabled={processingUsers.has(row._id)}
              onClick={() => handleVerifyId(row._id, "Verified")}
            >
              {processingUsers.has(row._id) ? "..." : "Verify"}
            </button>
            <button 
              className="btn btn-sm btn-danger text-white w-50"
              disabled={processingUsers.has(row._id)}
              onClick={() => handleVerifyId(row._id, "Rejected")}
            >
              {processingUsers.has(row._id) ? "..." : "Reject"}
            </button>
          </div>
          <Link 
            to={`/admin/new-user/${row._id}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-sm btn-outline-primary px-2 py-1 w-100"
            style={{ fontSize: "12px" }}
          >
            <i className="fa fa-user me-1"></i> Profile
          </Link>
        </div>
      ),
      center: true,
      ignoreRowClick: true,
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
        backgroundColor: "#f8f9fa",
        padding: "15px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "15px",
      },
    },
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
                  placeholder="Search by AVID, name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              {loading ? (
                <div className="text-center p-4">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <CustomTable itemsPerPage={10}
                  columns={columns}
                  data={filteredUsers}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  paginationPerPage={5}
                  highlightOnHover={false}
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="text-center py-5">
                      <i className="fa fa-search fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No pending verification requests found.</h5>
                      <p className="text-muted">Try adjusting your search criteria</p>
                    </div>
                  }
                />
              )}
            </div>
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
