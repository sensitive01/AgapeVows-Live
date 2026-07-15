import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getDeactivatedUsers, restoreUserById } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";
import { formatPhoneNumber } from '../../utils/formatters';

const AdminDeactivatedUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeactivatedUsers();
        if (response.status === 200) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching deactivated users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userMobile?.includes(searchTerm) || (user.agwid || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRestore = async (id) => {
    const confirmed = await confirmAction({
      title: "Reactivate User?",
      text: "Are you sure you want to reactivate this profile?",
      icon: "question",
      confirmButtonText: "Yes, Reactivate",
    });

    if (!confirmed) return;

    try {
      const response = await restoreUserById(id);
      if (response.status === 200) {
        showAlert({
          title: "Reactivated!",
          text: "User profile reactivated successfully.",
          icon: "success",
        });

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Reactivation failed.",
        icon: "error",
      });
    }
  };

  const handleExport = () => {
    if (!filteredUsers || filteredUsers.length === 0) {
      showAlert({
        title: "No Data",
        text: "No data available to export.",
        icon: "info",
      });
      return;
    }

    const exportData = filteredUsers.map((user) => ({
      Name: user.userName,
      Email: user.userEmail,
      Mobile: user.userMobile,
      City: user.city,
      DeactivatedAt: user.deactivatedAt ? new Date(user.deactivatedAt).toLocaleDateString() : "N/A",
      Reason: user.deactivationReason || "N/A",
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Deactivated Users");
    XLSX.writeFile(wb, `Deactivated_Users_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const getInitials = (name) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase();

  const columns = [
    {
      name: "S.NO",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "80px",
      center: true,
    },
    {
      name: "PROFILE",
      selector: row => row.userName,
      sortable: true,
      minWidth: "280px",
      cell: row => (
        <div className="d-flex align-items-center py-2">
          {row.profileImage ? (
            <img
              src={row.profileImage}
              alt={row.userName}
              className="rounded-circle me-3"
              style={{ width: "40px", height: "40px", objectFit: "cover" }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : (
            <div
              className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", height: "40px", fontSize: "14px", fontWeight: "bold" }}
            >
              {getInitials(row.userName)}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <h6 className="mb-0 fw-bold text-truncate" style={{ maxWidth: '250px' }}>{row.userName}</h6>
            <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>{row.userEmail}</small>
            <div className="d-md-none">
              <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>{formatPhoneNumber(row.userMobile)}</small>
              <small className="text-muted d-lg-none text-truncate" style={{ maxWidth: '250px' }}>{row.city}</small>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "AV ID",
      selector: row => row.agwid || "N/A",
      sortable: true,
      cell: row => <span className="fw-bold text-primary">{row.agwid || "N/A"}</span>,
      center: true,
    },
    {
      name: "CREATED AT",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "REASON",
      selector: row => row.deactivationReason || "No reason provided",
      sortable: true,
      cell: row => (
        <div style={{ whiteSpace: "normal", wordBreak: "break-word", margin: "10px 0" }}>
          {row.deactivationReason || "No reason provided"}
        </div>
      )
    },
    {
      name: "DEACTIVATED ON",
      selector: row => row.deactivatedAt ? new Date(row.deactivatedAt).getTime() : 0,
      sortable: true,
      format: row => row.deactivatedAt ? new Date(row.deactivatedAt).toLocaleDateString() : "N/A",
    },
    {
      name: "ACTION",
      cell: row => (
        <div className="d-flex gap-2">
          <button
            className="btn btn-info btn-sm shadow-sm text-white fw-semibold"
            style={{ borderRadius: "20px" }}
            onClick={() => {
              setSelectedUser(row);
              setShowModal(true);
            }}
          >
            <i className="fa fa-eye me-1 text-white"></i>
            View
          </button>
          <button
            className="btn btn-success btn-sm shadow-sm text-white fw-semibold"
            style={{ borderRadius: "20px" }}
            onClick={() => handleRestore(row._id)}
          >
            <i className="fa fa-undo me-1 text-white"></i>
            Reactivate
          </button>
        </div>
      ),
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

  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit d-flex justify-content-between align-items-center">
              <div>
                <h3>Deactivated Users</h3>
                <p>Profiles deactivated by users ({filteredUsers.length} users)</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                  onClick={handleExport}
                >
                  <i className="fa fa-file-excel-o me-1"></i> Export List
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="row mb-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search deactivated users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              <div className="table-responsive">
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
                      <h5 className="text-muted">No deactivated users found</h5>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedUser && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="fa fa-user-circle me-2"></i>
                  Deactivation Details
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center mb-4">
                  {selectedUser.profileImage ? (
                    <img
                      src={selectedUser.profileImage}
                      alt={selectedUser.userName}
                      className="rounded-circle shadow-sm"
                      style={{ width: 80, height: 80, objectFit: "cover", border: "3px solid #eee" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center mx-auto shadow-sm"
                      style={{ width: 80, height: 80, fontSize: "2rem" }}
                    >
                      {getInitials(selectedUser.userName)}
                    </div>
                  )}
                  <h4 className="mt-2 mb-0">{selectedUser.userName}</h4>
                  <p className="text-muted">{selectedUser.userEmail}</p>
                </div>

                <div className="detail-list">
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="fw-bold text-muted small text-uppercase">Email Address</label>
                      <div className="p-2 bg-light rounded text-truncate">
                        <i className="fa fa-envelope me-2 text-info"></i>
                        {selectedUser.userEmail || "N/A"}
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="fw-bold text-muted small text-uppercase">Mobile Number</label>
                      <div className="p-2 bg-light rounded">
                        <i className="fa fa-phone me-2 text-info"></i>
                        {selectedUser.userMobile || "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="fw-bold text-muted small text-uppercase">Deactivated On</label>
                      <div className="p-2 bg-light rounded">
                        <i className="fa fa-calendar me-2 text-info"></i>
                        {selectedUser.deactivatedAt ? new Date(selectedUser.deactivatedAt).toLocaleDateString() : "N/A"}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <label className="fw-bold text-muted small text-uppercase">Reason for Deactivation</label>
                    <div className="p-2 bg-light rounded border-start border-3 border-danger">
                      <i className="fa fa-question-circle me-2 text-danger"></i>
                      {selectedUser.deactivationReason || "No reason provided"}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="fw-bold text-muted small text-uppercase">Detailed Description</label>
                    <div className="p-3 bg-light rounded border-start border-4 border-info" style={{ minHeight: "80px", whiteSpace: "pre-wrap" }}>
                      {selectedUser.deactivationDescription || "No additional description provided."}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary px-4" onClick={() => setShowModal(false)}>Close</button>
                <button 
                  className="btn btn-primary px-4"
                  onClick={() => {
                    setShowModal(false);
                    handleRestore(selectedUser._id);
                  }}
                >
                  Reactivate Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </NewLayout>
  );
};

export default AdminDeactivatedUsers;
