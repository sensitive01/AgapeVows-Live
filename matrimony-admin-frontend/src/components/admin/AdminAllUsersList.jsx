import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getAllUserData, deleteUserById, exportUsersData, deactivateUserById, getAdminProfile } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";
import CustomTable from "./common/CustomTable";
import { formatPhoneNumber } from '../../utils/formatters';


const AdminAllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [photoFilter, setPhotoFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
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
          const mappedUsers = response.data.data.map((user) => {
            let planName = "No plan";
            if (user.paymentDetails && user.paymentDetails.length > 0) {
              const activePlans = user.paymentDetails.filter(p => new Date(p.subscriptionValidTo) > new Date() && p.subscriptionStatus === "Active");
              if (activePlans.length > 0) {
                activePlans.sort((a, b) => new Date(b.subscriptionValidFrom) - new Date(a.subscriptionValidFrom));
                planName = activePlans[0].subscriptionType || "Paid";
              }
            }
            return {
              ...user,
              city: user.city || "N/A",
              planStart: user.planStart || "N/A",
              expiryDate: user.expiryDate || "N/A",
              payment: user.payment || "Pending",
              planType: user.planType || "Basic",
              profileImg: user.profileImage || "",
              activePlanName: planName
            };
          });
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

      let matchesGender = true;
      if (genderFilter !== "all") {
        matchesGender = (user.gender || "").toLowerCase() === genderFilter;
      }

      let matchesVerified = true;
      if (verifiedFilter !== "all") {
        const isVerified = user.idVerificationStatus === "Verified";
        matchesVerified = verifiedFilter === "verified" ? isVerified : !isVerified;
      }

      let matchesPlan = true;
      if (planFilter !== "all") {
        const hasPlan = user.activePlanName && user.activePlanName !== "No plan";
        if (planFilter === "paid") {
          matchesPlan = hasPlan;
        } else if (planFilter === "free") {
          matchesPlan = !hasPlan;
        } else {
          matchesPlan = user.activePlanName?.toLowerCase() === planFilter.toLowerCase();
        }
      }

      return matchesSearch && matchesPhoto && matchesGender && matchesVerified && matchesPlan;
    });

    setFilteredUsers(filtered);
  }, [users, searchTerm, photoFilter, genderFilter, verifiedFilter, planFilter]);


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
      XLSX.utils.book_append_sheet(wb, ws, "All Users");
      XLSX.writeFile(wb, `AgapeVows_Users_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
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
      width: "45px",
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
            <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>{formatPhoneNumber(row.userMobile)}</small>
            <div className="d-md-none">
              <small className="text-muted d-lg-none text-truncate" style={{ maxWidth: '250px' }}>{row.city}</small>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: "AV ID",
      width: "100px",
      selector: row => row.agwid || "N/A", 
      sortable: true,
      cell: row => <span className="fw-bold text-primary">{row.agwid || "N/A"}</span>,
    },
    {
      name: "CITY",
      width: "140px",
      selector: row => row.city,
      sortable: true,
      hide: "lg",
      cell: row => (
        <div 
          title={row.city}
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}
        >
          {row.city}
        </div>
      )
    },
    {
      name: "CREATED AT", 
      width: "110px",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "PLAN",
      width: "140px",
      cell: row => {
        const planName = row.activePlanName || "No plan";
        return (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <span className={`badge ${planName === 'No plan' ? 'bg-secondary' : 'bg-success'} text-white`} style={{ fontSize: '12px', padding: '5px 10px', letterSpacing: '0.5px', borderRadius: '4px' }}>
              {planName}
            </span>
            <span 
              className={`mt-1 ${row.isRestricted ? 'text-danger fw-bold' : 'text-muted fw-semibold'}`} 
              style={{ fontSize: '11px', letterSpacing: '0.3px' }}
            >
              <i className={`fa ${row.isRestricted ? 'fa-lock' : 'fa-unlock'} me-1`}></i>
              {row.isRestricted ? 'Restricted' : 'Unrestricted'}
            </span>
          </div>
        );
      },
      center: true,
    },
    {
      name: "VERIFICATION",
      width: "130px",
      cell: row => {
        const isVerified = row.idVerificationStatus === "Verified";
        return (
          <span className={`badge ${isVerified ? 'bg-primary text-white' : 'bg-warning text-dark'}`} style={{ fontSize: '12px', padding: '5px 8px' }}>
            <i className={`fa ${isVerified ? 'fa-check-circle' : 'fa-exclamation-circle'} me-1`} style={{ color: 'inherit' }}></i>
            {isVerified ? 'Verified' : 'Unverified'}
          </span>
        );
      },
      center: true,
    },
    {
      name: "VIEW PROFILE",
      width: "130px",
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
      width: "80px",
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
                <h3>All Users</h3>
                <p>All user profiles ({filteredUsers.length} users)</p>
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
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-3">
              <div className="form-group mb-0" style={{ flex: "1 1 300px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by AVID, name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="d-flex flex-wrap align-items-center gap-2 mb-0">
                <span className="me-1 fw-bold text-muted" style={{ whiteSpace: "nowrap" }}>Filter:</span>
                <select
                  className="form-control form-control-sm"
                  value={photoFilter}
                  onChange={(e) => setPhotoFilter(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="all">All Photos</option>
                  <option value="with_photo">With Photo</option>
                  <option value="without_photo">Without Photo</option>
                </select>
                <select
                  className="form-control form-control-sm"
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <select
                  className="form-control form-control-sm"
                  value={verifiedFilter}
                  onChange={(e) => setVerifiedFilter(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="all">All Users</option>
                  <option value="verified">Verified</option>
                  <option value="unverified">Unverified</option>
                </select>
                <select
                  className="form-control form-control-sm"
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="all">All Plans</option>
                  <option value="No plan">No Plan</option>
                  <option value="Basic">Basic</option>
                  <option value="Premium">Premium</option>
                  <option value="Platinum">Platinum</option>
                  <option value="Golden membership">Golden membership</option>
                  <option value="Welcome plan">Welcome plan</option>
                </select>
                <button
                  className="btn btn-outline-secondary btn-sm ms-1"
                  onClick={() => {
                    setSearchTerm("");
                    setPhotoFilter("all");
                    setGenderFilter("all");
                    setVerifiedFilter("all");
                    setPlanFilter("all");
                  }}
                  title="Clear Filters"
                >
                  <i className="fa fa-refresh"></i>
                </button>
              </div>
            </div>

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
            )}
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminAllUsersList;
