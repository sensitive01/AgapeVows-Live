import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import { Link } from "react-router-dom";
import CustomTable from "./common/CustomTable";
import {
  getContactUpdateRequests,
  approveContactUpdate,
  rejectContactUpdate,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";
import { formatPhoneNumber } from '../../utils/formatters';

const AdminContactUpdateRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // ================= FETCH =================
  const fetchRequests = async () => {
    try {
      const res = await getContactUpdateRequests();

      if (res?.data?.data) {
        setRequests(res.data.data);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error("Error fetching contact update requests:", error);
      setRequests([]);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= APPROVE =================
  const handleApprove = async (userId) => {
    const confirmed = await confirmAction({
      title: "Approve Request?",
      text: "Are you sure you want to approve this contact update?",
      icon: "warning",
      confirmButtonText: "Yes, Approve",
    });

    if (!confirmed) return;

    try {
      await approveContactUpdate(userId);
      await fetchRequests();

      showAlert({
        title: "Approved",
        text: "Contact update approved successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Approve error:", error);
      showAlert({
        title: "Error",
        text: "Failed to approve contact update.",
        icon: "error",
      });
    }
  };

  // ================= REJECT =================
  const handleReject = async (userId) => {
    const confirmed = await confirmAction({
      title: "Reject Request?",
      text: "Are you sure you want to reject this contact update?",
      icon: "warning",
      confirmButtonText: "Yes, Reject",
      confirmButtonColor: "#d33",
    });

    if (!confirmed) return;

    try {
      await rejectContactUpdate(userId);
      await fetchRequests();

      showAlert({
        title: "Rejected",
        text: "Contact update rejected successfully!",
        icon: "success",
      });
    } catch (error) {
      console.error("Reject error:", error);
      showAlert({
        title: "Error",
        text: "Failed to reject contact update.",
        icon: "error",
      });
    }
  };

  const columns = [
    { name: "S.No", selector: (row, index) => index + 1, sortable: false, width: "70px", center: true },
    {
      name: "User Details",
      selector: row => row.userName,
      sortable: true,
      minWidth: "150px",
      cell: row => (
        <div className="d-flex align-items-center">
          <img
            src={row.profileImage || "/assets/images/user-placeholder.png"}
            alt="Profile"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "10px"
            }}
            onError={(e) => e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          />
          <div className="text-start" style={{ minWidth: 0 }}>
            <div className="fw-bold text-truncate" style={{ maxWidth: '250px' }}>{row.userName || "User"}</div>
            <small className="text-muted text-truncate d-block" style={{ maxWidth: '250px' }}>{row.agwid}</small>
          </div>
        </div>
      )
    },
    {
      name: "Current Contact",
      center: true, width:"280px",
      cell: row => (
        <div>
          {row.requestedMobile && <div><strong>Mobile:</strong> {formatPhoneNumber(row.userMobile)}</div>}
          {row.requestedEmail && <div><strong>Email:</strong> {row.userEmail}</div>}
        </div>
      )
    },
    {
      name: "Requested Update",width:"280px",
      center: true,
      cell: row => (
        <div className="text-primary fw-bold">
          {row.requestedMobile && <div>{row.requestedMobile}</div>}
          {row.requestedEmail && <div>{row.requestedEmail}</div>}
        </div>
      )
    },
    {
      name: "Created At",width:"150px",
      selector: row => row.createdAt,
      sortable: true,
      center: true,
      format: row => new Date(row.createdAt).toLocaleDateString()
    },
    {
      name: "Actions",
      center: true,
      minWidth: "180px",
      cell: row => (
        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-sm btn-success text-white"
            onClick={() => handleApprove(row._id)}
          >
            Approve
          </button>
          <button
            className="btn btn-sm btn-danger text-white"
            onClick={() => handleReject(row._id)}
          >
            Reject
          </button>
        </div>
      )
    },
    {
      name: "Profile",
      center: true,
      minWidth: "140px",
      cell: row => (
        <Link 
          to={`/admin/new-user/${row._id}`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-sm btn-outline-primary px-2 py-1"
          style={{ fontSize: "12px", whiteSpace: "nowrap" }}
        >
          <i className="fa fa-user me-1"></i> View Profile
        </Link>
      )
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
        verticalAlign: "middle",
        padding: "15px",
      },
    },
  };

  return (
    <NewLayout>
      <div className="row">
        <div className="col-md-12">
          <div className="box-com box-qui box-lig box-tab">
            <div className="tit">
              <h3>Contact Update Requests</h3>
              <p>Review and approve requests from users to update their mobile number or email.</p>
            </div>

            <div className="table-responsive">
              <CustomTable itemsPerPage={10}
                columns={columns}
                data={requests}
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20]}
                paginationPerPage={5}
                highlightOnHover={false}
                customStyles={customStyles}
                noDataComponent={<div className="py-4 text-muted text-center">No pending contact update requests.</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminContactUpdateRequests;
