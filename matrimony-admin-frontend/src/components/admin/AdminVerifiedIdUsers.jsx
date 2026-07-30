import { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getVerifiedIdUsers, verifyIdProof } from "../../api/service/adminServices";
import { useNavigate, Link } from "react-router-dom";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";

export default function AdminVerifiedIdUsers() {
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
          user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (user.agwid && user.agwid.toLowerCase().includes(searchTerm.toLowerCase())) ||
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
      name: "ID Type",
      selector: row => row.idProofType || "N/A",
      sortable: true,
      center: true,
      width: "110px",
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
      width: "120px",
      wrap: true,
      cell: row => (
        <div style={{ wordBreak: "break-word" }}>
          {row.idProofNumber || "N/A"}
        </div>
      )
    },
    {
      name: "Document",
      width: "100px",
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
      name: "Approved Date",
      selector: row => new Date(row.idVerifiedAt || row.updatedAt || 0).getTime(),
      sortable: true,
      width: "110px",
      cell: row => (
        <div className="fw-semibold text-secondary text-center">
          <div>{formatDate(row.idVerifiedAt || row.updatedAt)}</div>
          <div className="text-muted small fw-normal mt-1">{formatTime(row.idVerifiedAt || row.updatedAt)}</div>
        </div>
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
      width: "120px",
      cell: row => (
        <div className="d-flex flex-column gap-2 align-items-center">
          <button
            className="btn btn-sm btn-primary rounded-pill px-3 w-100 text-light"
            disabled={processingUsers.has(row._id)}
            onClick={() => handleUndoVerification(row._id)}
          >
            {processingUsers.has(row._id) ? "..." : "Undo"}
          </button>
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
                  placeholder="Search by AVID, name, email or AV ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="col-md-7">
                {/* Custom sort logic removed since DataTable handles sorting per column */}
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
                  defaultSortFieldId={7}
                  defaultSortAsc={false}
                  noDataComponent={
                    <div className="text-center py-5">
                      <i className="fa fa-search fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No verified users found</h5>
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
