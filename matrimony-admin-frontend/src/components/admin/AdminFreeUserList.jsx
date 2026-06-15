import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getPaidUserData, removeUserSubscription } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import { confirmAction, showAlert } from "../../utils/alertService";
import * as XLSX from "xlsx";
import CustomTable from "./common/CustomTable";

const AdminFreeUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("userName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPaidUserData();
        if (response.status === 200) {
          const mappedUsers = response.data.data.map((user) => {
            const latestPayment = user.paymentDetails?.length > 0
              ? user.paymentDetails[user.paymentDetails.length - 1]
              : null;

            return {
              ...user,
              city: user.city || "N/A",
              planStart: latestPayment?.subscriptionValidFrom || "N/A",
              expiryDate: latestPayment?.subscriptionValidTo || "N/A",
              payment: user.isAnySubscriptionTaken ? "Success" : "Pending",
              planType: latestPayment?.subscriptionType || "Basic",
              profileImg: user.profileImage || "",
              subscriptionStatus: latestPayment?.subscriptionStatus || "Inactive",
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

  useEffect(() => {
    const lowerSearch = searchTerm.toLowerCase();
    let filtered = users.filter((user) => {
      const matchesSearch =
        (user.userName || "").toLowerCase().includes(lowerSearch) ||
        (user.userEmail || "").toLowerCase().includes(lowerSearch) ||
        (user.userMobile || "").includes(searchTerm);
      const matchesPlan = filterPlan === "all" || user.planType === filterPlan;
      const matchesPayment = filterPayment === "all" || user.payment === filterPayment;
      return matchesSearch && matchesPlan && matchesPayment;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, filterPlan, filterPayment]);

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase();
  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleRemove = async (userId) => {
    const confirmed = await confirmAction({
      title: "Remove Subscription?",
      text: "Are you sure you want to remove this user's subscription?",
      icon: "warning",
      confirmButtonText: "Yes, Remove",
    });

    if (!confirmed) return;

    try {
      const response = await removeUserSubscription(userId);
      if (response.status === 200) {
        showAlert({
          title: "Removed",
          text: "User subscription removed successfully.",
          icon: "success",
        });
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error removing subscription:", error);
      showAlert({
        title: "Error",
        text: "Failed to remove subscription.",
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
    XLSX.utils.book_append_sheet(wb, ws, "Paid Users");
    XLSX.writeFile(wb, `Paid_Users_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: false,
      width: "70px",
      center: true,
    },
    {
      name: "MEMBER",
      selector: row => row.userName, width: "280px",
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center py-2">
          <div className="position-relative me-3">
            {row.profileImage ? (
              <img src={row.profileImage} alt="" className="rounded-circle shadow-sm" style={{ width: "45px", height: "45px", objectFit: "cover" }} />
            ) : (
              <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center shadow-sm fw-bold" style={{ width: "45px", height: "45px", fontSize: "14px" }}>
                {getInitials(row.userName)}
              </div>
            )}
          </div>
          <div>
            <h6 className="mb-0 fw-bold text-dark" style={{ fontSize: "14px" }}>{row.userName}</h6>
            <p className="mb-0 text-muted small" style={{ fontSize: "12px" }}>{row.userEmail}</p>
          </div>
        </div>
      ),
    },
    {
      name: "CONTACT",
      hide: "md",
      selector: row => row.userMobile,
      sortable: true,
      cell: row => (
        <div>
          <div className="small text-dark fw-medium">{row.userMobile}</div>
          <div className="small text-muted">{row.city}</div>
        </div>
      ),
    },
    {
      name: "PLAN DETAILS", width: "150px",
      selector: row => row.planType,
      sortable: true,
      cell: row => (
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <span className={`badge rounded-pill px-2 py-1 ${row.planType === "Gold" ? "bg-warning-subtle text-warning border border-warning-subtle" : "bg-info-subtle text-info border border-info-subtle"}`} style={{ fontSize: "10px" }}>
              {row.planType}
            </span>
          </div>
          <div className="text-muted" style={{ fontSize: "11px" }}>Exp: {formatDate(row.expiryDate)}</div>
        </div>
      ),
    },
    {
      name: "PAYMENT",
      selector: row => row.payment,
      sortable: true,
      center: true,
      cell: row => (
        <span className={`badge ${row.payment === "Success" ? "bg-success" : "bg-warning"} px-3 py-1 rounded-pill`} style={{ fontSize: "11px" }}>{row.payment}</span>
      ),
    },
    {
      name: "STATUS",
      selector: row => row.subscriptionStatus,
      sortable: true,
      center: true,
      cell: row => (
        <span className={`badge ${row.subscriptionStatus === "Active" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} border px-3 py-1 rounded-pill`} style={{ fontSize: "11px" }}>{row.subscriptionStatus}</span>
      ),
    },
    {
      name: "CREATED AT",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "N/A",
      center: true,
    },
    {
      name: "ACTIONS",
      center: true,
      cell: (row, index) => (
        <div className={`dropdown ${index >= 2 ? "dropup" : ""}`}>
          <button
            className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center mx-auto"
            style={{ width: "32px", height: "32px" }}
            data-bs-toggle="dropdown"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa fa-ellipsis-v text-muted" style={{ fontSize: "14px" }}></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-1 py-2" style={{ minWidth: "160px" }}>
            {/* <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/edit-user/${row._id}`)}><i className="fa fa-edit me-2 text-primary"></i>Edit Profile</button></li> */}
            <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/billing-info/${row._id}`)}><i className="fa fa-credit-card me-2 text-info"></i>Billing Info</button></li>
            <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/new-user/${row._id}`)}><i className="fa fa-user me-2 text-success"></i>View Details</button></li>
            <li className="dropdown-divider"></li>
            <li><button className="dropdown-item py-2 text-danger" onClick={() => handleRemove(row._id)}><i className="fa fa-trash me-2"></i>Remove</button></li>
          </ul>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
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
      <div className="container-fluid px-4 py-3">
        {/* Header Section */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
          <div className="card-body p-4 bg-white">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
              <div>
                <h3 className="fw-bold text-dark mb-1">Subscribed Members</h3>
                <p className="text-muted small mb-0">Managing <span className="text-primary fw-bold">{filteredUsers.length}</span> active premium profiles</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                  onClick={handleExport}
                >
                  <i className="fa fa-file-excel-o me-1"></i> Export List
                </button>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm btn-sm" onClick={() => navigate("/admin/add-new-user")}>
                  <i className="fa fa-plus me-2"></i>New Member
                </button>
              </div>
            </div>

            {/* Filters Row */}
            <div className="row g-3 mt-3 border-top pt-4">
              <div className="col-lg-5">
                <div className="input-group input-group-merge bg-light rounded-pill px-3 py-1 border">
                  <span className="input-group-text bg-transparent border-0 text-muted"><i className="fa fa-search"></i></span>
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 shadow-none ps-2"
                    placeholder="Search by name, email, or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-select rounded-pill border-light shadow-none bg-light ps-3" value={filterPlan} onChange={(e) => setFilterPlan(e.target.value)}>
                  <option value="all">Plan: All</option>
                  <option value="Gold">Gold</option>
                  <option value="Premium">Premium</option>
                  <option value="Platinum">Platinum</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-4">
                <select className="form-select rounded-pill border-light shadow-none bg-light ps-3" value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
                  <option value="all">Payment: All</option>
                  <option value="Success">Success</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="col-lg-3 col-md-4">
                <button className="btn btn-outline-secondary rounded-pill w-100 btn-sm h-100" onClick={() => { setSearchTerm(""); setFilterPlan("all"); setFilterPayment("all"); }}>
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
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
                    <div className="py-5">
                      <i className="fa fa-users-slash fa-4x text-light mb-4"></i>
                      <h5 className="text-muted">No members found matching your criteria</h5>
                      <button className="btn btn-outline-primary btn-sm rounded-pill mt-3 px-4" onClick={() => { setSearchTerm(""); setFilterPlan("all"); setFilterPayment("all"); }}>Reset All Filters</button>
                    </div>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .rdt_TableRow:focus-within { z-index: 11 !important; position: relative; }
        .table thead th { border: none; letter-spacing: 0.05em; }
        .table tbody tr:hover { background-color: #fbfcfe; transition: background 0.2s ease; }
        .cursor-pointer { cursor: pointer; }
        .cursor-pointer:hover { color: #0d6efd !important; }
        .btn-light:hover { background-color: #eef2f7; }
        .dropdown-item { font-size: 13px; font-weight: 500; }
        .dropdown-item:active { background-color: #0d6efd; }
        .pagination .page-link { border: none; color: #6c757d; font-weight: 500; margin: 0 2px; }
        .pagination .active .page-link { background-color: #0d6efd !important; color: white !important; border-radius: 8px !important; }
        .bg-primary-subtle { background-color: #e7f1ff; }
        .bg-success-subtle { background-color: #d1e7dd; }
        .bg-danger-subtle { background-color: #f8d7da; }
        .bg-warning-subtle { background-color: #fff3cd; }
        .bg-info-subtle { background-color: #cff4fc; }
        .input-group-merge { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .input-group-merge:focus-within { border-color: #0d6efd; box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.1); }
      `}</style>
    </NewLayout>
  );
};

export default AdminFreeUserList;
