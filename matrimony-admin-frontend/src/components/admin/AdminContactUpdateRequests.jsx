import React, { useEffect, useState } from "react";
import NewLayout from "./layout/NewLayout";
import {
  getContactUpdateRequests,
  approveContactUpdate,
  rejectContactUpdate,
} from "../../api/service/adminServices";
import { confirmAction, showAlert } from "../../utils/alertService";

const AdminContactUpdateRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <NewLayout>
      <div
        style={{
          marginLeft: "260px",
          padding: "40px",
          minHeight: "100vh",
          background: "#f4f6f9",
        }}
      >
        {/* HEADER */}
        <div className="mb-4">
          <h2 className="fw-bold mb-1">Contact Update Requests</h2>
          <p className="text-muted mb-0">
            Review and approve requests from users to update their mobile number or email.
          </p>
        </div>

        {/* TABLE */}
        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-0">
            <table className="table align-middle mb-0 text-center">
              <thead>
                <tr>
                  {[
                    "S.No",
                    "User",
                    "Current Contact",
                    "Requested Update",
                    "Created At",
                    "Actions",
                  ].map((head, index) => (
                    <th
                      key={index}
                      style={{
                        backgroundColor: "#e0e0e0",
                        borderBottom: "2px solid #cfcfcf",
                      }}
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {requests.length > 0 ? (
                  requests.map((req, index) => (
                    <tr key={req._id}>
                      <td className="align-middle text-center">{index + 1}</td>

                      <td className="align-middle">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          {req.profileImage ? (
                            <img
                              src={req.profileImage}
                              alt="Profile"
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "#ccc",
                              }}
                            ></div>
                          )}
                          <div className="text-start">
                            <h6 className="mb-0">{req.userName || "User"}</h6>
                            <small className="text-muted">{req.agwid}</small>
                          </div>
                        </div>
                      </td>

                      <td className="align-middle text-center">
                        {req.requestedMobile && <div><strong>Mobile:</strong> {req.userMobile}</div>}
                        {req.requestedEmail && <div><strong>Email:</strong> {req.userEmail}</div>}
                      </td>

                      <td className="align-middle text-center text-primary fw-bold">
                        {req.requestedMobile && <div>{req.requestedMobile} (New Mobile)</div>}
                        {req.requestedEmail && <div>{req.requestedEmail} (New Email)</div>}
                      </td>

                      <td className="align-middle text-center">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </td>

                      <td className="align-middle text-center">
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleApprove(req._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleReject(req._id)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-muted">
                      No pending contact update requests.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </NewLayout>
  );
};

export default AdminContactUpdateRequests;
