import { useEffect, useState } from "react";
//import img1 from "/assets/images/profiles/1.jpg";
import NewLayout from "./layout/NewLayout";
import {
  approveNewUser,
  getNewRequestedUsers,
  deleteUserById,
} from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
export default function AdminNewUserRequest() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [genderFilter, setGenderFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [approvingUsers, setApprovingUsers] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getNewRequestedUsers();
        console.log(response.data);
        setUsers(response.data.data);
        setFilteredUsers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Search and filter functionality
  useEffect(() => {
    let filtered = users;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.userMobile.includes(searchTerm)
      );
    }

    // Apply gender filter
    if (genderFilter !== "All") {
      filtered = filtered.filter((user) => user.gender === genderFilter);
    }

    // Apply payment filter
    if (paymentFilter !== "All") {
      if (paymentFilter === "Paid") {
        filtered = filtered.filter((user) => user.paymentDetails.length > 0);
      } else if (paymentFilter === "Unpaid") {
        filtered = filtered.filter((user) => user.paymentDetails.length === 0);
      }
    }

    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, genderFilter, paymentFilter, users]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper function to format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper function to get payment info
  const getPaymentInfo = (paymentDetails) => {
    if (!paymentDetails || paymentDetails.length === 0) {
      return {
        status: "Unpaid",
        type: "Free",
        amount: 0,
      };
    }

    const latestPayment = paymentDetails[paymentDetails.length - 1];
    return {
      status: latestPayment.subscriptionStatus || "Pending",
      type: latestPayment.subscriptionType || "Basic",
      amount: latestPayment.subscriptionAmount || 0,
    };
  };

  // Approve user function
  const handleApproveUser = async (userId) => {
    setApprovingUsers((prev) => new Set(prev).add(userId));

    try {
      const response = await approveNewUser(userId);
      if (response.status === 200) {
        setFilteredUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error approving user:", error);
      alert("Failed to approve user. Please try again.");
    } finally {
      setApprovingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      // Call your API to delete the user
      const response = await deleteUserById(userId); // <-- you need to create this API in adminServices

      if (response.status === 200) {
        // Remove the user from the state to update the table
        setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        alert(response.data.message || "User deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
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

    const paginationStyles = {
      pagination: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        listStyle: "none",
        padding: "0",
        margin: "20px 0",
        gap: "5px",
      },
      pageItem: {
        display: "inline-block",
      },
      pageLink: {
        display: "block",
        padding: "8px 12px",
        textDecoration: "none",
        color: "#007bff",
        backgroundColor: "#fff",
        border: "1px solid #dee2e6",
        borderRadius: "4px",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
      },
      activePage: {
        backgroundColor: "#007bff",
        color: "#fff",
        borderColor: "#007bff",
      },
      disabledPage: {
        color: "#6c757d",
        backgroundColor: "#f8f9fa",
        borderColor: "#dee2e6",
        cursor: "not-allowed",
      },
    };

    return (
      <nav aria-label="Page navigation">
        <ul style={paginationStyles.pagination}>
          <li style={paginationStyles.pageItem}>
            <button
              style={{
                ...paginationStyles.pageLink,
                ...(currentPage === 1 ? paginationStyles.disabledPage : {}),
              }}
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li style={paginationStyles.pageItem}>
                <button
                  style={paginationStyles.pageLink}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
              </li>
              {startPage > 2 && (
                <li style={paginationStyles.pageItem}>
                  <span
                    style={{ ...paginationStyles.pageLink, cursor: "default" }}
                  >
                    ...
                  </span>
                </li>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <li key={number} style={paginationStyles.pageItem}>
              <button
                style={{
                  ...paginationStyles.pageLink,
                  ...(currentPage === number
                    ? paginationStyles.activePage
                    : {}),
                }}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li style={paginationStyles.pageItem}>
                  <span
                    style={{ ...paginationStyles.pageLink, cursor: "default" }}
                  >
                    ...
                  </span>
                </li>
              )}
              <li style={paginationStyles.pageItem}>
                <button
                  style={paginationStyles.pageLink}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </button>
              </li>
            </>
          )}

          <li style={paginationStyles.pageItem}>
            <button
              style={{
                ...paginationStyles.pageLink,
                ...(currentPage === totalPages
                  ? paginationStyles.disabledPage
                  : {}),
              }}
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

  // Table styles
  const tableStyles = {
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    tableHeader: {
      backgroundColor: "#f8f9fa",
      borderBottom: "2px solid #e9ecef",
    },
    th: {
      padding: "12px 15px",
      textAlign: "center",
      fontWeight: "600",
      color: "#495057",
      fontSize: "13px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #e9ecef",
      color: "#212529",
      fontSize: "14px",
      fontWeight: "400",
      textAlign: "center",
    },
    profileCell: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      textAlign: "left",
    },

    profileImage: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #e9ecef",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    },

    profileInfo: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "4px",
    },

    profileName: {
      fontWeight: "600",
      color: "#212529",
      fontSize: "15px",
      margin: "0",
    },

    profileEmail: {
      color: "#6c757d",
      fontSize: "13px",
      margin: "0",
    },

    profileMobile: {
      color: "#495057",
      fontSize: "13px",
      margin: "0",
      fontWeight: "500",
    },

    dateTimeContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "2px",
    },
    dateText: {
      fontSize: "13px",
      fontWeight: "600",
      color: "#212529",
      margin: "0",
      lineHeight: "1.2",
    },
    timeText: {
      fontSize: "11px",
      color: "#6c757d",
      margin: "0",
      lineHeight: "1.2",
    },
    badge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    maleBadge: {
      backgroundColor: "#e3f2fd",
      color: "#1976d2",
    },
    femaleBadge: {
      backgroundColor: "#fce4ec",
      color: "#c2185b",
    },
    statusBadge: {
      padding: "4px 8px",
      borderRadius: "12px",
      fontSize: "11px",
      fontWeight: "600",
      textTransform: "uppercase",
    },
    paidStatus: {
      backgroundColor: "#e8f5e8",
      color: "#2e7d32",
    },
    unpaidStatus: {
      backgroundColor: "#ffebee",
      color: "#d32f2f",
    },
    pendingStatus: {
      backgroundColor: "#fff3e0",
      color: "#f57c00",
    },
    approveButton: {
      padding: "6px 16px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease-in-out",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    approveButtonHover: {
      backgroundColor: "#218838",
      transform: "translateY(-1px)",
    },
    approveButtonDisabled: {
      backgroundColor: "#6c757d",
      cursor: "not-allowed",
      transform: "none",
    },
    dropdownButton: {
      padding: "6px 10px",
      backgroundColor: "transparent",
      border: "1px solid #dee2e6",
      borderRadius: "4px",
      color: "#495057",
      cursor: "pointer",
      fontSize: "12px",
    },
  };

  if (loading) {
    return (
      <NewLayout>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-tab">
              <div className="text-center p-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </NewLayout>
    );
  }

  return (
    <>
      <NewLayout>
        <div className="row">
          <div className="col-md-12">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>New join requests</h3>
                <p>
                  New request profiles, waiting for admin approvals (
                  {filteredUsers.length} users)
                </p>
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
                      <a
                        className="dropdown-item"
                        href="admin-settings.html#new-user-request"
                      >
                        New user request setting
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
                  </ul>
                </div>
              </div>

              {/* Search and Filter Controls */}
              <div className="row mb-3">
                <div className="col-md-4">
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
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                  >
                    <option value="All">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <select
                    className="form-control"
                    value={paymentFilter}
                    onChange={(e) => setPaymentFilter(e.target.value)}
                  >
                    <option value="All">All Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setSearchTerm("");
                      setGenderFilter("All");
                      setPaymentFilter("All");
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Results info */}
              <div className="mb-3">
                <small className="text-muted">
                  Showing {indexOfFirstItem + 1} to{" "}
                  {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
                  {filteredUsers.length} entries
                </small>
              </div>

              {/* Data Table */}
              <div style={tableStyles.tableContainer}>
                <table style={tableStyles.table}>
                  <thead style={tableStyles.tableHeader}>
                    <tr>
                      <th style={tableStyles.th}>S.No</th>
                      <th style={tableStyles.th}>Profile Details</th>
                      <th style={tableStyles.th}>Gender</th>
                      <th style={tableStyles.th}>Request Date & Time</th>
                      <th style={tableStyles.th}>Payment</th>
                      <th style={tableStyles.th}>Plan Type</th>
                      <th style={tableStyles.th}>Amount</th>
                      <th style={tableStyles.th}>Action</th>
                      <th style={tableStyles.th}>More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user, index) => {
                        const paymentInfo = getPaymentInfo(user.paymentDetails);
                        const serialNumber = indexOfFirstItem + index + 1;
                        const isApproving = approvingUsers.has(user._id);

                        return (
                          <tr key={user._id}>
                            <td style={tableStyles.td}>{serialNumber}</td>
                            <td style={tableStyles.td}>
                              <div style={tableStyles.profileCell}>
                                {/* <img
                                  src={user.profileImage || img1}
                                  alt={user.userName}
                                  style={tableStyles.profileImage}
                                  onError={(e) => {
                                    e.target.src = img1;
                                  }}
                                /> */}

                                {user.profileImage ? (
                                  <img
                                    src={user.profileImage}
                                    alt={user.userName}
                                    style={tableStyles.profileImage}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      ...tableStyles.profileImage,
                                      backgroundColor: "#f0f0f0",
                                      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <i
                                      className="fa fa-user"
                                      style={{ color: "#bbb", fontSize: "16px" }}
                                    ></i>
                                  </div>

                                )}

                                <div style={tableStyles.profileInfo}>
                                  <h5 style={tableStyles.profileName}>
                                    {user.userName}
                                  </h5>
                                  <p style={tableStyles.profileEmail}>
                                    {user.userEmail}
                                  </p>
                                  <p style={tableStyles.profileMobile}>
                                    {user.userMobile
                                      ? `+91-${user.userMobile.replace(/^91/, "")}`
                                      : ""}
                                  </p>

                                </div>
                              </div>
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.badge,
                                  ...(user.gender === "Male"
                                    ? tableStyles.maleBadge
                                    : tableStyles.femaleBadge),
                                }}
                              >
                                {user.gender}
                              </span>
                            </td>
                            <td style={tableStyles.td}>
                              <div style={tableStyles.dateTimeContainer}>
                                <p style={tableStyles.dateText}>
                                  {formatDate(user.createdAt)}
                                </p>
                                <p style={tableStyles.timeText}>
                                  {formatTime(user.createdAt)}
                                </p>
                              </div>
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.statusBadge,
                                  ...(paymentInfo.status === "Paid"
                                    ? tableStyles.paidStatus
                                    : paymentInfo.status === "Pending"
                                      ? tableStyles.pendingStatus
                                      : tableStyles.unpaidStatus),
                                }}
                              >
                                {paymentInfo.status}
                              </span>
                            </td>
                            <td style={tableStyles.td}>
                              <span
                                style={{
                                  ...tableStyles.statusBadge,
                                  backgroundColor:
                                    paymentInfo.type === "Premium"
                                      ? "#e8f5e8"
                                      : "#e3f2fd",
                                  color:
                                    paymentInfo.type === "Premium"
                                      ? "#2e7d32"
                                      : "#1976d2",
                                }}
                              >
                                {paymentInfo.type}
                              </span>
                            </td>
                            <td style={tableStyles.td}>
                              <strong>
                                {paymentInfo.amount > 0
                                  ? `₹${paymentInfo.amount}`
                                  : "Free"}
                              </strong>
                            </td>
                            <td style={tableStyles.td}>
                              <button
                                style={{
                                  ...tableStyles.approveButton,
                                  ...(isApproving
                                    ? tableStyles.approveButtonDisabled
                                    : {}),
                                }}
                                onClick={() => handleApproveUser(user._id)}
                                disabled={isApproving}
                                onMouseOver={(e) =>
                                  !isApproving &&
                                  Object.assign(
                                    e.target.style,
                                    tableStyles.approveButtonHover
                                  )
                                }
                                onMouseOut={(e) =>
                                  !isApproving &&
                                  Object.assign(
                                    e.target.style,
                                    tableStyles.approveButton
                                  )
                                }
                              >
                                {isApproving ? "Approving..." : "Approve"}
                              </button>
                            </td>
                            <td style={tableStyles.td}>
                              <div className="dropdown">
                                <button
                                  type="button"
                                  style={tableStyles.dropdownButton}
                                  data-bs-toggle="dropdown"
                                >
                                  <i
                                    className="fa fa-ellipsis-h"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                                <ul className="dropdown-menu">
                                 {/* <li>
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
                                    </li> */}

                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleDeleteUser(user._id)}
                                    >
                                      Delete
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/admin/billing-info/${user._id}`);
                                      }}
                                    >
                                      Billing info
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/admin/new-user/${user._id}`);
                                      }}
                                    >
                                      View more details
                                    </a>
                                  </li>
                                  {/* <a
                                    className="dropdown-item"
                                    onClick={() => navigate(`/admin/new-user/${user._id}`)}
                                  >
                                    View profile
                                  </a> */}
                                </ul>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan="9"
                          style={{ ...tableStyles.td, textAlign: "center" }}
                        >
                          <div className="p-4">
                            <i className="fa fa-search fa-2x text-muted mb-3"></i>
                            <h5>No users found</h5>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination />
                </div>
              )}
            </div>
          </div>
        </div>
      </NewLayout>
    </>
  );
}
