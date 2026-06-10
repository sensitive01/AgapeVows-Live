import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getDeletedUsers, restoreUserById, permanentDeleteUserById } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";
import DataTable from "react-data-table-component";

const AdminDeletedUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDeletedUsers();
        if (response.status === 200) {
          setUsers(response.data.data);
          setFilteredUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching deleted users:", error);
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
      user.userMobile?.includes(searchTerm)
    );

    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleRestore = async (id) => {
    const confirmed = await confirmAction({
      title: "Restore User?",
      text: "Are you sure you want to restore this user?",
      icon: "question",
      confirmButtonText: "Yes, Restore",
    });

    if (!confirmed) return;

    try {
      const response = await restoreUserById(id);
      if (response.status === 200) {
        showAlert({
          title: "Restored!",
          text: "User restored successfully.",
          icon: "success",
        });

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      showAlert({
        title: "Error",
        text: "Restore failed.",
        icon: "error",
      });
    }
  };

  const handlePermanentDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Permanent Delete?",
      text: "Are you sure you want to PERMANENTLY delete this user? This action cannot be undone and all user data will be removed from the database.",
      icon: "warning",
      confirmButtonText: "Yes, Delete Permanently",
    });

    if (!confirmed) return;

    try {
      const response = await permanentDeleteUserById(id);
      if (response.status === 200) {
        showAlert({
          title: "Deleted!",
          text: "User permanently deleted from the system.",
          icon: "success",
        });

        setUsers((prev) => prev.filter((u) => u._id !== id));
        setFilteredUsers((prev) => prev.filter((u) => u._id !== id));
      }
    } catch (error) {
      console.error("Permanent delete failed:", error);
      showAlert({
        title: "Error",
        text: "Permanent delete failed.",
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

    const exportData = filteredUsers.map((user) => {
      const {
        _id,
        __v,
        userPassword,
        profileViews,
        paymentDetails,
        blockedUsers,
        ignoredUsers,
        ...rest
      } = user;
      return rest;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Deleted Users");
    XLSX.writeFile(wb, `Deleted_Users_${new Date().toISOString().split('T')[0]}.xlsx`);
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
              className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", height: "40px", fontSize: "14px", fontWeight: "bold" }}
            >
              {getInitials(row.userName)}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <h6 className="mb-0 fw-bold text-truncate" style={{ maxWidth: '250px' }}>{row.userName}</h6>
            <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>{row.userEmail}</small>
            <div className="d-md-none">
              <small className="text-muted d-block text-truncate" style={{ maxWidth: '250px' }}>{row.userMobile}</small>
              <small className="text-muted d-lg-none text-truncate" style={{ maxWidth: '250px' }}>{row.city}</small>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "AV ID",width:"120px",
      selector: row => row.agwid || "N/A",
      sortable: true,
      cell: row => <span className="fw-bold text-primary">{row.agwid || "N/A"}</span>,
      center: true,
    },
    {
      name: "PHONE",width:"140px",
      selector: row => row.userMobile,
      sortable: true,
      hide: "md",
      center: true,
    },
    {
      name: "CITY",
      selector: row => row.city || "N/A",
      sortable: true,
      hide: "lg",
      center: true,
    },
    {
      name: "CREATED AT",width:"135px",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "DELETED AT",width:"135px",
      selector: row => row.deletedAt ? new Date(row.deletedAt).getTime() : 0,
      sortable: true,
      format: row => row.deletedAt ? new Date(row.deletedAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "MORE",
      cell: row => (
        <div className="d-flex gap-2 justify-content-center">
          <button
            className="btn btn-success btn-sm text-white"
            onClick={() => handleRestore(row._id)}
          >
            <i className="fa fa-undo me-1 text-white"></i>
            Restore
          </button>
          <button
            className="btn btn-danger btn-sm text-white"
            onClick={() => handlePermanentDelete(row._id)}
          >
            <i className="fa fa-trash me-1 text-white"></i>
            Delete
          </button>
        </div>
      ),
      center: true,
      ignoreRowClick: true,
      minWidth: "200px",
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
                <h3>Deleted Users</h3>
                <p>Total deleted profiles ({filteredUsers.length} users)</p>
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
                  placeholder="Search deleted users..."
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
                <DataTable
                  columns={columns}
                  data={filteredUsers}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  paginationPerPage={5}
                  highlightOnHover
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="text-center py-5">
                      <h5 className="text-muted">No deleted users found</h5>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminDeletedUsers;
