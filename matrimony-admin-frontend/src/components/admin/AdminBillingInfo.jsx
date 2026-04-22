import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { getUserById, emailUserInvoice } from "../../api/service/adminServices";
import profImages from "/assets/images/profiles/1.jpg";

const AdminBillingInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailing, setEmailing] = useState(false);

  const handleEmailInvoice = async () => {
    if (!user || !user.isAnySubscriptionTaken) {
      alert("No active subscription found to email.");
      return;
    }
    setEmailing(true);
    try {
      const response = await emailUserInvoice(id);
      if (response.status === 200) {
        alert("Invoice emailed successfully!");
      } else {
        alert("Failed to email invoice.");
      }
    } catch (error) {
      console.error("Error emailing invoice:", error);
      alert("An error occurred while emailing the invoice.");
    } finally {
      setEmailing(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserById(id);
        if (response.status === 200) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user billing info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <NewLayout>
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </NewLayout>
    );
  }

  if (!user) {
    return (
      <NewLayout>
        <div className="text-center p-5">
          <h3>User not found</h3>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </NewLayout>
    );
  }

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-success";
      case "expired":
        return "bg-danger";
      case "pending":
          return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  return (
    <NewLayout>
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card border-0 shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
              <div>
                <h3 className="fw-bold mb-0 text-primary">Billing & Subscription Details</h3>
                <p className="text-muted small mb-0">Manage and view user payment history and active plans.</p>
              </div>
              <button className="btn btn-outline-secondary btn-sm rounded-pill px-3" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left me-2"></i>Back
              </button>
            </div>

            <div className="row g-4">
              {/* User Profile Summary */}
              <div className="col-md-4">
                <div className="p-4 bg-light rounded-4 h-100 text-center shadow-sm border border-white">
                  <div className="position-relative d-inline-block mb-3">
                    <img
                      src={user.profileImage || profImages}
                      alt={user.userName}
                      className="rounded-circle border border-4 border-white shadow-sm"
                      style={{ width: "130px", height: "130px", objectFit: "cover" }}
                    />
                    {user.isAnySubscriptionTaken && (
                      <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle p-2 shadow-sm" title="Active Plan"></span>
                    )}
                  </div>
                  <h4 className="fw-bold mb-1">{user.userName}</h4>
                  <p className="text-muted small mb-3">{user.userEmail}</p>
                  
                  <div className="d-grid gap-2 mb-3 text-start mx-auto" style={{maxWidth: "250px"}}>
                    <div className="p-2 bg-white rounded-3 shadow-sm d-flex align-items-center mb-2">
                        <i className="fa fa-phone text-primary me-3 ms-2"></i>
                        <div>
                            <small className="text-muted d-block">Phone</small>
                            <span className="fw-semibold small">{user.userMobile}</span>
                        </div>
                    </div>
                    <div className="p-2 bg-white rounded-3 shadow-sm d-flex align-items-center mb-2">
                        <i className="fa fa-map-marker text-danger me-3 ms-2"></i>
                        <div>
                            <small className="text-muted d-block">City</small>
                            <span className="fw-semibold small">{user.city || "Not Specified"}</span>
                        </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-4 ${user.isAnySubscriptionTaken ? 'bg-success bg-opacity-10 border border-success border-opacity-25' : 'bg-light border'}`}>
                    <small className="text-muted d-block mb-1">Current Membership</small>
                    <span className={`badge ${user.isAnySubscriptionTaken ? 'bg-success' : 'bg-secondary'} rounded-pill px-3`}>
                      {user.isAnySubscriptionTaken ? (user.paymentDetails?.[user.paymentDetails.length - 1]?.subscriptionType || 'Premium Member') : 'Free Member'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="col-md-8">
                <div className="card border-0 bg-white h-100 p-0 m-0">
                  <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center px-0 mb-3">
  <h5 className="fw-bold mb-0">
    {user.isAnySubscriptionTaken
      ? "Subscription History"
      : "No Subscription Found"}
  </h5>

  <button
    className="btn btn-sm btn-primary rounded-pill px-4"
    onClick={() => navigate(`/admin/user-plan/${user._id}`)}
  >
    {user.isAnySubscriptionTaken
      ? "Upgrade This Plan Manually"
      : "Add Plan Manually"}
  </button>
</div>
                  
                  {user.paymentDetails && user.paymentDetails.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table border align-middle shadow-sm">
                        <thead className="bg-light">
                          <tr>
                            <th className="border-0 small text-uppercase fw-bold text-muted py-3 px-3">Plan Type</th>
                            <th className="border-0 small text-uppercase fw-bold text-muted py-3 px-3">Amount</th>
                            <th className="border-0 small text-uppercase fw-bold text-muted py-3 px-3">Status</th>
                            <th className="border-0 small text-uppercase fw-bold text-muted py-3 px-3">Duration</th>
                            <th className="border-0 small text-uppercase fw-bold text-muted py-3 px-3">Txn Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {user.paymentDetails.map((payment, index) => (
                            <tr key={index}>
                              <td className="py-3 px-3">
                                <span className="fw-bold text-dark">{payment.subscriptionType}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span className="fw-bold">₹{payment.subscriptionAmount}</span>
                              </td>
                              <td className="py-3 px-3">
                                <span className={`badge ${getStatusBadgeClass(payment.subscriptionStatus)} rounded-pill`}>
                                  {payment.subscriptionStatus}
                                </span>
                              </td>
                              <td className="py-3 px-3">
                                <small className="d-block text-success fw-semibold">
                                  {new Date(payment.subscriptionValidFrom).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})}
                                </small>
                                <small className="text-muted">to</small>
                                <small className="d-block text-danger fw-semibold">
                                  {new Date(payment.subscriptionValidTo).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'})}
                                </small>
                              </td>
                              <td className="py-3 px-3">
                                <div className="small text-muted mb-0" style={{maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}} title={payment.subscriptionTransactionId}>
                                  ID: {payment.subscriptionTransactionId || 'N/A'}
                                </div>
                                <small className="text-muted d-block">Method: {payment.paymentType || 'Online'}</small>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5 border rounded-4 bg-light bg-opacity-50">
                      <div className="mb-3">
                        <i className="fa fa-receipt fa-3x text-muted opacity-25"></i>
                      </div>
                      <h5 className="text-muted fw-bold">No Records Found</h5>
                      <p className="text-muted small">Subscription and payment details will appear here once the user makes a purchase.</p>
                      <button className="btn btn-sm btn-primary rounded-pill px-4 mt-2" onClick={() => navigate(`/admin/user-plan/${user._id}`)}>
                        Add Plan Manually
                      </button>
                    </div>
                  )}

                  {/* Additional Actions */}
                  <div className="mt-auto pt-4 d-flex gap-2">
                    <button className="btn btn-light rounded-pill btn-sm flex-fill shadow-sm" onClick={() => window.print()}>
                      <i className="fa fa-print me-2"></i>Print Statement
                    </button>
                    <button 
                      className="btn btn-light rounded-pill btn-sm flex-fill shadow-sm"
                      onClick={handleEmailInvoice}
                      disabled={emailing || !user.isAnySubscriptionTaken}
                    >
                      {emailing ? (
                        <><i className="fa fa-spinner fa-spin me-2"></i>Sending...</>
                      ) : (
                        <><i className="fa fa-envelope me-2"></i>Email Invoice</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default AdminBillingInfo;
