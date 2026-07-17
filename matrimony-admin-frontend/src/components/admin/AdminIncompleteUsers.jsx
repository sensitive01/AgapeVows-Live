import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getAllUserData, deleteUserById, exportUsersData, deactivateUserById, getAdminProfile } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";
import { formatPhoneNumber } from '../../utils/formatters';



const AdminIncompleteUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [photoFilter, setPhotoFilter] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [adminRole, setAdminRole] = useState("superadmin");
  const [adminPermissions, setAdminPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      getAdminProfile(adminId)
        .then((res) => {
          if (res.data?.success) {
            setAdminRole(res.data.data.role || "superadmin");
            setAdminPermissions(res.data.data.permissions || []);
          }
        })
        .catch((err) => console.error("Error fetching admin profile:", err));
    }
  }, []);

  const hasPermission = (key) => {
    if (adminRole === "superadmin") return true;
    return adminPermissions.includes(key);
  };
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllUserData();
        if (response.status === 200) {
          const mappedUsers = response.data.data
            .filter(user => {
              // A profile is incomplete if the flag is false, or if key mandatory fields are missing
              return user.isProfileCompleted === false || !user.gender || !user.dateOfBirth || !user.maritalStatus || !user.motherTongue;
            })
            .map((user) => ({
              ...user,
              city: user.city || "N/A",
              planStart: user.planStart || "N/A",
              expiryDate: user.expiryDate || "N/A",
              payment: user.payment || "Pending",
              planType: user.planType || "Basic",
              profileImg: user.profileImage || "",
            }));
          setUsers(mappedUsers);
          setFilteredUsers(mappedUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search and filter effect
  useEffect(() => {
    let filtered = users.filter((user) => {
      const sTerm = searchTerm.toLowerCase();
      const matchesSearch =
        (user.userName || "").toLowerCase().includes(sTerm) ||
        (user.userEmail || "").toLowerCase().includes(sTerm) ||
        (user.userMobile || "").includes(searchTerm) || (user.agwid || "").toLowerCase().includes(sTerm);

      let matchesPhoto = true;
      if (photoFilter === "with_photo") {
        matchesPhoto = user.profileImage && user.profileImage !== "";
      } else if (photoFilter === "without_photo") {
        matchesPhoto = !user.profileImage || user.profileImage === "";
      }

      return matchesSearch && matchesPhoto;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, photoFilter]);


  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Format date
  const formatDate = (dateString) => {
    if (dateString === "N/A") return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (id) => {
    const confirmed = await confirmAction({
      title: "Delete User?",
      text: "Are you sure you want to delete this user? This will move them to Deleted Users.",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmed) return;

    try {
      const response = await deleteUserById(id);

      if (response.status === 200) {
        showAlert({
          title: "Deleted!",
          text: "User moved to Deleted Users successfully.",
          icon: "success",
        });

        // Remove from UI instantly
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );

        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error",
        text: "Delete failed. Please try again.",
        icon: "error",
      });
    }
  };

  const handleDeactivate = async (id) => {
    const confirmed = await confirmAction({
      title: "Deactivate User?",
      text: "Are you sure you want to deactivate this user?",
      confirmButtonText: "Yes, Deactivate",
    });

    if (!confirmed) return;

    try {
      const response = await deactivateUserById(id);

      if (response.status === 200) {
        showAlert({
          title: "Deactivated!",
          text: "User has been deactivated successfully.",
          icon: "success",
        });

        // Remove from UI instantly
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );

        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error",
        text: "Deactivation failed. Please try again.",
        icon: "error",
      });
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  const handleExport = () => {
    try {
      if (filteredUsers.length === 0) {
        alert("No users to export");
        return;
      }

      // Clean data for export - matching the re-import format as much as possible
      const exportData = filteredUsers.map(user => {
        // Flatten some fields if necessary or remove sensitive/internal ones
        const { _id, __v, userPassword, profileViews, paymentDetails, blockedUsers, ignoredUsers, isApproved, isDeleted, profileStatus, ...rest } = user;

        // Ensure hobbies is a string if it's an array
        if (Array.isArray(rest.hobbies)) {
          rest.hobbies = rest.hobbies.join(", ");
        }

        return rest;
      });

      const ws = XLSX.utils.json_to_sheet(exportData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Incomplete Users");
      XLSX.writeFile(wb, `AgapeVows_Incomplete_Users_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export user data. Please try again.");
    }
  };



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
              className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
              style={{ width: "40px", minWidth: "40px", height: "40px", fontSize: "14px", fontWeight: "bold" }}
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
    },
    {
      name: "PHONE", width: "140px",
      selector: row => formatPhoneNumber(row.userMobile),
      sortable: true,
      hide: "md",
    },
    {
      name: "CITY",
      selector: row => row.city,
      sortable: true,
      hide: "lg",
    },
    {
      name: "CREATED AT", width: "135px",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "VIEW PROFILE",
      cell: row => (
        <button
          className="btn btn-sm btn-outline-primary rounded-pill px-2 py-1"
          style={{ fontSize: "12px", whiteSpace: "nowrap" }}
          onClick={(e) => {
            e.preventDefault();
            window.open(`/admin/new-user/${row._id}`, '_blank');
          }}
        >
          View Profile
        </button>
      ),
      center: true,
      ignoreRowClick: true,
      button: true,
    },
    {
      name: "MORE",
      cell: (row, index) => (
        <div className={`dropdown ${index >= 2 ? "dropup" : ""}`}>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            data-bs-toggle="dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-sm">
            {hasPermission("users.all.edit") && (
              <li>
                <a
                  className="dropdown-item text-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(row._id);
                  }}
                >
                  <i className="fa fa-edit me-2"></i>Edit
                </a>
              </li>
            )}
            {hasPermission("users.all.delete") && (
              <li>
                <a
                  className="dropdown-item text-danger"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(row._id);
                  }}
                >
                  <i className="fa fa-trash me-2"></i>
                  Delete
                </a>
              </li>
            )}
            {hasPermission("users.all.deactivate") && (
              <li>
                <a
                  className="dropdown-item text-warning"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeactivate(row._id);
                  }}
                >
                  <i className="fa fa-ban me-2"></i>
                  Deactivate
                </a>
              </li>
            )}
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/billing-info/${row._id}`);
                }}
              >
                <i className="fa fa-credit-card me-2"></i>
                Billing info
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`/admin/new-user/${row._id}`, '_blank');
                }}
              >
                <i className="fa fa-user me-2"></i>View profile
              </a>
            </li>
          </ul>
        </div>
      ),
      center: true,
      ignoreRowClick: true,
      minWidth: "120px",
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
        overflow: "visible",
      },
    },
    tableWrapper: {
      style: {
        minHeight: "300px",
        overflow: "visible !important",
        position: "relative",
        zIndex: 10,
      }
    },
    table: {
      style: {
        overflow: "visible !important",
      }
    },
  };

  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit d-flex justify-content-between align-items-center">
              <div>
                <h3>Incomplete Profiles</h3>
                <p>Users who haven't completed their profiles ({filteredUsers.length} users)</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                  onClick={() => navigate("/admin/add-new-user")}
                >
                  <i className="fa fa-user-plus me-1"></i> Add / Import
                </button>
                <button
                  className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                  onClick={handleExport}
                >
                  <i className="fa fa-file-excel-o me-1"></i> Export Users
                </button>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="d-flex justify-content-between align-items-center mb-3 gap-3">
              <div className="form-group mb-0" style={{ flex: "0 1 350px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by AVID, name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="d-flex align-items-center mb-0">
                <span className="me-2 fw-bold text-muted" style={{ whiteSpace: "nowrap" }}>Filter:</span>
                <select
                  className="form-control"
                  value={photoFilter}
                  onChange={(e) => setPhotoFilter(e.target.value)}
                  style={{ minWidth: "160px" }}
                >
                  <option value="all">All Photos</option>
                  <option value="with_photo">With Photo</option>
                  <option value="without_photo">Without Photo</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                <CustomTable itemsPerPage={10}
                  columns={columns}
                  data={filteredUsers}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  paginationPerPage={5}
                  highlightOnHover
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="text-center py-5">
                      <i className="fa fa-search fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No users found</h5>
                      <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .cursor-pointer {
          cursor: pointer;
        }

        .table th {
          font-weight: 600;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #6c757d;
          background-color: #f8f9fa;
          padding: 15px;
        }

        .table td {
          font-size: 14px;
          vertical-align: middle;
          padding: 15px;
        }

        .table {
          border: none;
        }

        .dropdown-menu {
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 0.375rem;
        }

        .dropdown-item:hover {
          background-color: #f8f9fa;
        }

        .table-responsive::-webkit-scrollbar {
          width: 6px;
        }

        .table-responsive::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }

        .table-responsive::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 3px;
        }

        .table-responsive::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }

        .rdt_TableRow:focus-within {
          z-index: 11 !important;
          position: relative;
        }

        .badge {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 4px 8px;
        }

        @media (max-width: 768px) {
          .table th,
          .table td {
            padding: 8px;
            font-size: 12px;
          }

          .badge {
            font-size: 10px;
            padding: 2px 6px;
          }
        }
      `}</style>
    </NewLayout>
  );
};

export default AdminIncompleteUsers;
