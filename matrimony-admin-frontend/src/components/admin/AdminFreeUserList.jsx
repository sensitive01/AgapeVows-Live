import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getPaidUserData, removeUserSubscription } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";

const AdminFreeUserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("userName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
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
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userMobile.includes(searchTerm);
      const matchesPlan = filterPlan === "all" || user.planType === filterPlan;
      const matchesPayment = filterPayment === "all" || user.payment === filterPayment;
      return matchesSearch && matchesPlan && matchesPayment;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [users, searchTerm, sortField, sortDirection, filterPlan, filterPayment]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase();
  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleRemove = async (userId) => {
    const confirmRemove = window.confirm("Are you sure you want to remove this user?");
    if (!confirmRemove) return;

    try {
      const response = await removeUserSubscription(userId);
      if (response.status === 200) {
        alert("User subscription removed successfully");
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error removing subscription:", error);
      alert("Failed to remove subscription");
    }
  };

  const Pagination = () => (
    <nav className="d-flex justify-content-center mt-5">
      <ul className="pagination pagination-sm shadow-sm rounded-pill overflow-hidden">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link px-3" onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        </li>
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
            <button className="page-link px-3" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link px-3" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );

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
                    <option value="Silver">Silver</option>
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
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-3 text-muted small fw-bold text-center" style={{width: "60px"}}>S.No</th>
                      <th className="py-3 text-muted small fw-bold cursor-pointer" onClick={() => handleSort("userName")}>MEMBER {sortField === "userName" && (sortDirection === "asc" ? "↑" : "↓")}</th>
                      <th className="py-3 text-muted small fw-bold d-none d-md-table-cell">CONTACT</th>
                      <th className="py-3 text-muted small fw-bold">PLAN DETAILS</th>
                      <th className="py-3 text-muted small fw-bold text-center">PAYMENT</th>
                      <th className="py-3 text-muted small fw-bold text-center">STATUS</th>
                      <th className="pe-4 py-3 text-muted small fw-bold text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((user, index) => (
                        <tr key={user._id} className="border-bottom">
                          <td className="ps-4 text-center text-muted small">{indexOfFirstItem + index + 1}</td>
                          <td className="py-3">
                            <div className="d-flex align-items-center">
                              <div className="position-relative me-3">
                                {user.profileImage ? (
                                  <img src={user.profileImage} alt="" className="rounded-circle shadow-sm" style={{ width: "45px", height: "45px", objectFit: "cover" }} />
                                ) : (
                                  <div className="rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center shadow-sm fw-bold" style={{ width: "45px", height: "45px", fontSize: "14px" }}>
                                    {getInitials(user.userName)}
                                  </div>
                                )}
                              </div>
                              <div>
                                <h6 className="mb-0 fw-bold text-dark" style={{fontSize: "14px"}}>{user.userName}</h6>
                                <p className="mb-0 text-muted small" style={{fontSize: "12px"}}>{user.userEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td className="d-none d-md-table-cell">
                             <div className="small text-dark fw-medium">{user.userMobile}</div>
                             <div className="small text-muted">{user.city}</div>
                          </td>
                          <td>
                             <div className="d-flex align-items-center gap-2 mb-1">
                                <span className={`badge rounded-pill px-2 py-1 ${user.planType === "Gold" ? "bg-warning-subtle text-warning border border-warning-subtle" : "bg-info-subtle text-info border border-info-subtle"}`} style={{fontSize: "10px"}}>
                                    {user.planType}
                                </span>
                             </div>
                             <div className="text-muted" style={{fontSize: "11px"}}>Exp: {formatDate(user.expiryDate)}</div>
                          </td>
                          <td className="text-center">
                              <span className={`badge ${user.payment === "Success" ? "bg-success" : "bg-warning"} px-3 py-1 rounded-pill`} style={{fontSize: "11px"}}>{user.payment}</span>
                          </td>
                          <td className="text-center">
                              <span className={`badge ${user.subscriptionStatus === "Active" ? "bg-success-subtle text-success" : "bg-danger-subtle text-danger"} border px-3 py-1 rounded-pill`} style={{fontSize: "11px"}}>{user.subscriptionStatus}</span>
                          </td>
                          <td className="text-center pe-4">
                            <div className="dropdown">
                              <button className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{width: "32px", height: "32px"}} onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === user._id ? null : user._id); }}>
                                <i className="fa fa-ellipsis-v text-muted" style={{fontSize: "14px"}}></i>
                              </button>
                              {openDropdown === user._id && (
                                <ul className="dropdown-menu show shadow-lg border-0 rounded-3 mt-1 py-2" style={{ right: 0, left: "auto", position: "absolute", zIndex: 1050, minWidth: "160px" }}>
                                  <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/edit-user/${user._id}`)}><i className="fa fa-edit me-2 text-primary"></i>Edit Profile</button></li>
                                  <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/billing-info/${user._id}`)}><i className="fa fa-credit-card me-2 text-info"></i>Billing Info</button></li>
                                  <li><button className="dropdown-item py-2" onClick={() => navigate(`/admin/new-user/${user._id}`)}><i className="fa fa-user me-2 text-success"></i>View Details</button></li>
                                  <li className="dropdown-divider"></li>
                                  <li><button className="dropdown-item py-2 text-danger" onClick={() => { setOpenDropdown(null); handleRemove(user._id); }}><i className="fa fa-trash me-2"></i>Remove</button></li>
                                </ul>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center py-5 border-0 bg-white">
                          <div className="py-5">
                            <i className="fa fa-users-slash fa-4x text-light mb-4"></i>
                            <h5 className="text-muted">No members found matching your criteria</h5>
                            <button className="btn btn-outline-primary btn-sm rounded-pill mt-3 px-4" onClick={() => { setSearchTerm(""); setFilterPlan("all"); setFilterPayment("all"); }}>Reset All Filters</button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        {!loading && totalPages > 1 && <Pagination />}
      </div>

      <style>{`
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
