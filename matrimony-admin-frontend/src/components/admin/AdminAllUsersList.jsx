import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { getAllUserData } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import { deleteUserById } from "../../api/service/adminServices";


const AdminAllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("userName");
  const [sortDirection, setSortDirection] = useState("asc");
  const [filterPlan, setFilterPlan] = useState("all");
  const [filterPayment, setFilterPayment] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
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
          const mappedUsers = response.data.data.map((user) => ({
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
      const matchesSearch =
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userMobile.includes(searchTerm);

      const matchesPlan = filterPlan === "all" || user.planType === filterPlan;
      const matchesPayment =
        filterPayment === "all" || user.payment === filterPayment;

      return matchesSearch && matchesPlan && matchesPayment;
    });

    // Sort
    filtered.sort((a, b) => {
      const aValue = a[sortField]?.toString().toLowerCase() || "";
      const bValue = b[sortField]?.toString().toLowerCase() || "";

      if (sortDirection === "asc") {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
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

  const getSortIcon = (field) => {
    if (sortField !== field) return <i className="fa fa-sort text-muted"></i>;
    return sortDirection === "asc" ? (
      <i className="fa fa-sort-up"></i>
    ) : (
      <i className="fa fa-sort-down"></i>
    );
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      const response = await deleteUserById(id);

      if (response.status === 200) {
        alert("User moved to Deleted Users");

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
      alert("Delete failed");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };


  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }


    return (
      <nav
        aria-label="Page navigation"
        className="d-flex justify-content-center mt-4"
      >
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className="page-link" onClick={() => setCurrentPage(1)}>
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li className="page-item">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
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
              <h3>Approved Users</h3>
              <p>All approved user profiles ({filteredUsers.length} users)</p>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="admin-add-new-user.html">
                      Add new user
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="admin-settings.html#new-user-request"
                    >
                      User setting
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="admin-settings.html#new-user-request"
                    >
                      Approval setting
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="admin-settings.html#plan"
                    >
                      User plan
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Search and Filter Controls */}
            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-2">
                {/* <select
                  className="form-control"
                  value={filterPlan}
                  onChange={(e) => setFilterPlan(e.target.value)}
                >
                  <option value="all">All Plans</option>
                  <option value="Premium">Premium</option>
                  <option value="Basic">Basic</option>
                </select> */}
              </div>
              <div className="col-md-2">
                {/* <select
                  className="form-control"
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                >
                  <option value="all">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </select> */}
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-secondary w-100"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterPlan("all");
                    setFilterPayment("all");
                  }}
                >
                  Clear
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
              <div
                className="table-responsive"
                style={{ height: "70vh", overflowY: "auto" }}
              >
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="text-center border-0">S.NO</th>
                      <th
                        className="cursor-pointer border-0"
                        onClick={() => handleSort("userName")}
                      >
                        PROFILE {getSortIcon("userName")}
                      </th>
                      <th
                        className="cursor-pointer d-none d-md-table-cell border-0"
                        onClick={() => handleSort("userMobile")}
                      >
                        PHONE {getSortIcon("userMobile")}
                      </th>
                      <th
                        className="cursor-pointer d-none d-lg-table-cell border-0"
                        onClick={() => handleSort("city")}
                      >
                        CITY {getSortIcon("city")}
                      </th>
                      {/* <th style={tableStyles.th}>Plan Start</th>
                      <th style={tableStyles.th}>Expiry Date</th>
                      <th
                        style={tableStyles.th}
                        onClick={() => handleSort("payment")}
                      >
                        Payment {getSortIcon("payment")}
                      </th>
                      <th
                        style={tableStyles.th}
                        onClick={() => handleSort("planType")}
                      >
                        Plan Type {getSortIcon("planType")}
                      </th> */}
                      <th className="text-center border-0">MORE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((user, index) => {
                        const serialNumber = indexOfFirstItem + index + 1;
                        return (
                          <tr key={user._id}>
                            <td className="text-center align-middle border-0">
                              {serialNumber}
                            </td>
                            <td className="align-middle border-0">
                              <div className="d-flex align-items-center">
                                {user.profileImage ? (
                                  <img
                                    src={user.profileImage}
                                    alt={user.userName}
                                    className="rounded-circle me-3"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                    }}
                                    onError={(e) => {
                                      e.target.style.display = "none";
                                      e.target.nextSibling.style.display =
                                        "flex";
                                    }}
                                  />
                                ) : <div
                                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    display: user.profileImage
                                      ? "none"
                                      : "flex",
                                  }}
                                >
                                  {getInitials(user.userName)}
                                </div>}

                                <div>
                                  <h6 className="mb-0 fw-bold">
                                    {user.userName}
                                  </h6>
                                  <small className="text-muted">
                                    {user.userEmail}
                                  </small>
                                  <div className="d-md-none">
                                    <small className="text-muted d-block">
                                      {user.userMobile}
                                    </small>
                                    <small className="text-muted d-lg-none">
                                      {user.city}
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle d-none d-md-table-cell border-0">
                              {user.userMobile}
                            </td>
                            <td className="align-middle d-none d-lg-table-cell border-0">
                              {user.city}
                            </td>
                            {/* <td style={tableStyles.td}>
                              {formatDate(user.planStart)}
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.badge,
                                  ...(user.expiryDate === "N/A"
                                    ? {
                                        color: "#6c757d",
                                        backgroundColor: "#f8f9fa",
                                      }
                                    : tableStyles.unpaidStatus),
                                }}
                              >
                                {formatDate(user.expiryDate)}
                              </span>
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.badge,
                                  ...(user.payment === "Paid"
                                    ? tableStyles.paidStatus
                                    : tableStyles.unpaidStatus),
                                }}
                              >
                                {user.payment}
                              </span>
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.badge,
                                  ...(user.planType === "Premium"
                                    ? tableStyles.premiumBadge
                                    : tableStyles.basicBadge),
                                }}
                              >
                                {user.planType}
                              </span>
                            </td> */}
                            <td className="align-middle text-center border-0">
                              <div className="dropdown position-relative">
                                <button
                                  type="button"
                                  className="btn btn-outline-secondary btn-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDropdown(
                                      openDropdown === user._id
                                        ? null
                                        : user._id
                                    );
                                  }}
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                {openDropdown === user._id && (
                                  <ul
                                    className="dropdown-menu show position-absolute"
                                    style={{
                                      display: "block",
                                      top: "100%",
                                      left: "auto",
                                      right: "0",
                                      zIndex: 1000,
                                      minWidth: "160px",
                                    }}
                                  >
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDropdown(null);
                                          handleEdit(user._id);
                                        }}
                                      >
                                        <i className="fa fa-edit me-2"></i>Edit
                                      </a>
                                    </li>


                                    <li>
                                      <a
                                        className="dropdown-item text-danger"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDropdown(null);
                                          handleDelete(user._id);
                                        }}
                                      >
                                        <i className="fa fa-trash me-2"></i>
                                        Delete
                                      </a>
                                    </li>

                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDropdown(null);
                                          navigate(`/admin/billing-info/${user._id}`);
                                        }}
                                      >
                                        <i className="fa fa-credit-card me-2"></i>
                                        Billing info
                                      </a>
                                    </li>
                                    {/* <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDropdown(null);
                                          navigate(`/admin/new-user/${user._id}`);
                                        }}
                                      >
                                        <i className="fa fa-info-circle me-2"></i>
                                        View details
                                      </a>
                                    </li> */}
                                    <li>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setOpenDropdown(null);
                                          navigate(`/admin/new-user/${user._id}`);
                                        }}
                                      >
                                        <i className="fa fa-user me-2"></i>View
                                        profile
                                      </a>
                                    </li>
                                  </ul>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5 border-0">
                          <div>
                            <i className="fa fa-search fa-3x text-muted mb-3"></i>
                            <h5 className="text-muted">No users found</h5>
                            <p className="text-muted">
                              Try adjusting your search or filter criteria
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && <Pagination />}
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

export default AdminAllUsersList;
