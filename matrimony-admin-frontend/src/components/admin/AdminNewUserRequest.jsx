import { useEffect, useState } from "react";
//import img1 from "/assets/images/profiles/1.jpg";
import NewLayout from "./layout/NewLayout";
import { approveNewUser, getNewRequestedUsers, deleteUserById } from "../../api/service/adminServices";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { confirmAction, showAlert } from "../../utils/alertService";
import DataTable from "react-data-table-component";

export default function AdminNewUserRequest() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [searchTerm, genderFilter, paymentFilter, users]);

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
        showAlert({
          title: "Approved!",
          text: response.data.message,
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error approving user:", error);
      showAlert({
        title: "Error",
        text: "Failed to approve user. Please try again.",
        icon: "error",
      });
    } finally {
      setApprovingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userId);
        return newSet;
      });
    }
  };
  const handleDeleteUser = async (userId) => {
    const confirmed = await confirmAction({
      title: "Delete User?",
      text: "Are you sure you want to delete this user? This action cannot be undone.",
      icon: "warning",
      confirmButtonText: "Yes, Delete",
    });

    if (!confirmed) return;

    try {
      // Call your API to delete the user
      const response = await deleteUserById(userId); // <-- you need to create this API in adminServices

      if (response.status === 200) {
        // Remove the user from the state to update the table
        setFilteredUsers((prev) => prev.filter((user) => user._id !== userId));
        setUsers((prev) => prev.filter((user) => user._id !== userId));
        showAlert({
          title: "Deleted!",
          text: response.data.message || "User deleted successfully!",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      showAlert({
        title: "Error",
        text: "Delete failed.",
        icon: "error",
      });
    }
  };

  const handleExport = () => {
    if (!filteredUsers || filteredUsers.length === 0) {
      alert("No data to export");
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
    XLSX.utils.book_append_sheet(wb, ws, "New Join Requests");
    XLSX.writeFile(wb, `New_Join_Requests_${new Date().toISOString().split('T')[0]}.xlsx`);
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
      name: "PROFILE DETAILS",
      selector: row => row.userName,
      sortable: true,
      cell: row => (
        <div style={{ display: "flex", alignItems: "center", gap: "15px", textAlign: "left", padding: "10px 0" }}>
          {row.profileImage ? (
            <img
              src={row.profileImage}
              alt={row.userName}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #e9ecef",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            />
          ) : (
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #e9ecef",
              }}
            >
              <i className="fa fa-user" style={{ color: "#bbb", fontSize: "16px" }}></i>
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px" }}>
            <h5 style={{ fontWeight: "600", color: "#212529", fontSize: "15px", margin: "0" }}>
              {row.userName}
            </h5>
            <p style={{ color: "#6c757d", fontSize: "13px", margin: "0" }}>
              {row.userEmail}
            </p>
            <p style={{ color: "#495057", fontSize: "13px", margin: "0", fontWeight: "500" }}>
              {row.userMobile ? `+91-${row.userMobile.replace(/^91/, "")}` : ""}
            </p>
          </div>
        </div>
      ),
    },
    {
      name: "GENDER",
      selector: row => row.gender,
      sortable: true,
      cell: row => (
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "12px",
            fontSize: "11px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            ...(row.gender === "Male"
              ? { backgroundColor: "#e3f2fd", color: "#1976d2" }
              : { backgroundColor: "#fce4ec", color: "#c2185b" }),
          }}
        >
          {row.gender || "N/A"}
        </span>
      ),
      center: true,
    },
    {
      name: "CREATED AT",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      cell: row => (
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <p style={{ fontSize: "13px", fontWeight: "600", color: "#212529", margin: "0", lineHeight: "1.2" }}>
            {formatDate(row.createdAt)}
          </p>
          <p style={{ fontSize: "11px", color: "#6c757d", margin: "0", lineHeight: "1.2" }}>
            {formatTime(row.createdAt)}
          </p>
        </div>
      ),
      center: true,
    },
    {
      name: "PAYMENT",
      selector: row => getPaymentInfo(row.paymentDetails).status,
      sortable: true,
      cell: row => {
        const paymentInfo = getPaymentInfo(row.paymentDetails);
        return (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              ...(paymentInfo.status === "Paid"
                ? { backgroundColor: "#e8f5e8", color: "#2e7d32" }
                : paymentInfo.status === "Pending"
                  ? { backgroundColor: "#fff3e0", color: "#f57c00" }
                  : { backgroundColor: "#ffebee", color: "#d32f2f" }),
            }}
          >
            {paymentInfo.status}
          </span>
        );
      },
      center: true,
    },
    {
      name: "PLAN TYPE",
      selector: row => getPaymentInfo(row.paymentDetails).type,
      sortable: true,
      cell: row => {
        const paymentInfo = getPaymentInfo(row.paymentDetails);
        return (
          <span
            style={{
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: "600",
              textTransform: "uppercase",
              backgroundColor: paymentInfo.type === "Premium" ? "#e8f5e8" : "#e3f2fd",
              color: paymentInfo.type === "Premium" ? "#2e7d32" : "#1976d2",
            }}
          >
            {paymentInfo.type}
          </span>
        );
      },
      center: true,
    },
    {
      name: "AMOUNT",
      selector: row => getPaymentInfo(row.paymentDetails).amount,
      sortable: true,
      cell: row => {
        const paymentInfo = getPaymentInfo(row.paymentDetails);
        return (
          <strong>
            {paymentInfo.amount > 0 ? `₹${paymentInfo.amount}` : "Free"}
          </strong>
        );
      },
      center: true,
    },
    {
      name: "ACTION",
      cell: row => {
        const isApproving = approvingUsers.has(row._id);
        return (
          <button
            style={{
              padding: "6px 16px",
              backgroundColor: isApproving ? "#6c757d" : "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: isApproving ? "not-allowed" : "pointer",
              transition: "all 0.2s ease-in-out",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
            onClick={() => handleApproveUser(row._id)}
            disabled={isApproving}
          >
            {isApproving ? "Approving..." : "Approve"}
          </button>
        );
      },
      center: true,
      ignoreRowClick: true,
      button: true,
    },
    {
      name: "MORE",
      cell: (row, index) => (
        <div className={`dropdown ${index >= 5 ? "dropup" : ""}`}>
          <button
            type="button"
            style={{
              padding: "6px 10px",
              backgroundColor: "transparent",
              border: "1px solid #dee2e6",
              borderRadius: "4px",
              color: "#495057",
              cursor: "pointer",
              fontSize: "12px",
            }}
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                style={{cursor: "pointer"}}
                onClick={() => handleDeleteUser(row._id)}
              >
                Delete
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                style={{cursor: "pointer"}}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/admin/billing-info/${row._id}`);
                }}
              >
                Billing info
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                style={{cursor: "pointer"}}
                onClick={() => navigate(`/admin/new-user/${row._id}`)}
              >
                View more details
              </a>
            </li>
          </ul>
        </div>
      ),
      center: true,
      ignoreRowClick: true,
      button: true,
    }
  ];

  const customStyles = {
    table: {
      style: {
        backgroundColor: "#fff",
        borderRadius: "8px",
      },
    },
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        color: "#495057",
        backgroundColor: "#f8f9fa",
        padding: "12px 15px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        padding: "12px 15px",
        color: "#212529",
      },
    },
  };
  
  const tableStyles = {
    tableContainer: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflow: "hidden",
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
              <div className="tit d-flex justify-content-between align-items-center">
                <div>
                  <h3>New join requests</h3>
                  <p>
                    New request profiles, waiting for admin approvals (
                    {filteredUsers.length} users)
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-success btn-sm rounded-pill px-3 shadow-sm"
                    onClick={handleExport}
                  >
                    <i className="fa fa-file-excel-o me-1"></i> Export List
                  </button>
                </div>
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

              {/* Data Table */}
              <div style={tableStyles.tableContainer}>
                <DataTable
                  columns={columns}
                  data={filteredUsers}
                  pagination
                  paginationRowsPerPageOptions={[5, 10, 15, 20]}
                  paginationPerPage={5}
                  highlightOnHover
                  customStyles={customStyles}
                  noDataComponent={
                    <div className="p-4 text-center">
                      <i className="fa fa-search fa-2x text-muted mb-3"></i>
                      <h5>No users found</h5>
                      <p className="text-muted">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </NewLayout>
    </>
  );
}
