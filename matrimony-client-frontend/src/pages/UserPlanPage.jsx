import React, { useState, useEffect } from "react";
import UserSideBar from "../components/UserSideBar";
import Footer from "../components/Footer";
import LayoutComponent from "../components/layouts/LayoutComponent";
import planIcon from "../assets/images/icon/plan.png";
import {
  cancelUserPlan,
  getMyActivePlanData,
  downloadInvoice
} from "../api/axiosService/userAuthService";
import { showAlert } from "../utils/alertService";

const UserPlanPage = () => {

  // =========================
  // ✅ STATES
  // =========================
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const [planData, setPlanData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [downloadingId, setDownloadingId] = useState(null); // ✅ NEW

  const userId = localStorage.getItem("userId");

  // =========================
  // ✅ FETCH PLAN
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMyActivePlanData(userId);
        if (response.status === 200) {
          setPlanData(response?.data?.activePlan);
        } else {
          setError("No active plan found");
        }
      } catch (err) {
        setError(err?.response?.data?.message);
        console.error("Error fetching plan data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);


  // =========================
  // ✅ DOWNLOAD INVOICE
  // =========================
  const handleDownload = async (userId, transactionId) => {
    try {
      if (!userId || !transactionId) {
        showAlert({
          title: "Error",
          text: "Missing data ❌",
          icon: "error",
        });
        return;
      }

      setDownloadingId(transactionId);

      // ✅ USE AXIOS FUNCTION
      const res = await downloadInvoice(userId, transactionId);

      const blob = new Blob([res.data], { type: "application/pdf;charset=utf-8" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${transactionId}-${planData?.subscriptionOrderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setDownloadingId(null);

    } catch (error) {
      console.error("Download error:", error);
      setDownloadingId(null);
    }
  };
  // =========================
  // ✅ CANCEL PLAN (UNCHANGED)
  // =========================
  const handleCancelSubmit = async (e) => {
    e.preventDefault();

    if (!reason || !message) {
      showAlert({
        title: "Validation Error",
        text: "Please fill all fields",
        icon: "warning",
      });
      return;
    }

    if (!userId) {
      showAlert({
        title: "Error",
        text: "User not found. Please login again.",
        icon: "error",
      });
      return;
    }

    try {
      const res = await cancelUserPlan(userId, {
        reason,
        message,
      });

      if (res?.data?.success) {
        showAlert({
          title: "Success",
          text: res?.data?.message || "Plan cancelled successfully!",
          icon: "success",
        });

        setReason("");
        setMessage("");

        const modal = document.getElementById("plancancel");
        if (modal) {
          const modalInstance =
            window.bootstrap?.Modal.getInstance(modal) ||
            new window.bootstrap.Modal(modal);
          modalInstance.hide();
        }

        window.location.reload();
      } else {
        showAlert({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }

    } catch (err) {
      console.error("Cancel error:", err);

      showAlert({
        title: "Error",
        text: err?.response?.data?.message || err?.message || "Cancel failed",
        icon: "error",
      });
    }
  };

  // =========================
  // ✅ HELPERS
  // =========================
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toDateString();
  };

  const parseCustomDate = (dateString) => {
  if (!dateString) return null;

  const [datePart] = dateString.split(",");
  const [day, month, year] = datePart.trim().split("/");

  return new Date(`${year}-${month}-${day}`);
};

const getRemainingDays = (validFrom, validTo) => {
  const startDate = parseCustomDate(validFrom);
  const endDate = parseCustomDate(validTo);

  if (!startDate || !endDate) return "-";

  const today = new Date();

  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Expired";

  return diffDays;
};

  // =========================
  // ✅ UI
  // =========================
  return (
    <div className="min-h-screen">

      {/* HEADER */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "100px", paddingBottom: "40px" }}>
        <div className="db">
          <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>

              {/* SIDEBAR */}
              <div className="col-md-3 col-lg-2" style={{ paddingLeft: 0 }}>
                <UserSideBar />
              </div>

              {/* MAIN */}
              <div className="col-md-9 col-lg-10" style={{ paddingLeft: "20px" }}>
                <div className="row">

                  {/* ================= PLAN DETAILS ================= */}
                  <div className="col-md-4 db-sec-com">
                    <h2 className="db-tit">Plan Details</h2>

                    <div className="db-pro-stat">
                      <h6 className="tit-top-curv">Current Plan</h6>

                      <div className="db-plan-card d-flex justify-content-center w-100">
                        <img src={planIcon} style={{ margin: "0 auto", display: "block" }} alt="AgapeVows Image" />
                      </div>

                      <div className="db-plan-detil">
                        {loading ? (
                          <p>Loading...</p>
                        ) : !planData ? (
                          <div>
                            <p style={{ color: "red" }}>❌ No Active Subscription</p>
                            <a href="/user/user-plan-selection" className="cta-3">
                              Subscribe Now
                            </a>
                          </div>
                        ) : (
                          <ul>
                            <li>
                              Plan Name: <strong>{planData.subscriptionType}</strong>
                            </li>
                            <li>
                              Valid From: <strong>{planData.subscriptionValidFrom}</strong>
                            </li>
                            <li>
                              Valid Till: <strong>{planData.subscriptionValidTo}</strong>
                            </li>
                            <li>
  Remaining Days:{" "}
  <strong>
    {getRemainingDays(
      planData.subscriptionValidFrom,
      planData.subscriptionValidTo
    )} days
  </strong>
</li>
                            <li>
                              Amount: <strong>₹{planData.subscriptionAmount}</strong>
                            </li>
                            <li>
                              <a href="/user/user-plan-selection" className="cta-3">
                                Upgrade Now
                              </a>
                            </li>
                          </ul>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* ================= INVOICE ================= */}
                  <div className="col-md-8 db-sec-com">
                    <h2 className="db-tit">All Invoice</h2>

                    <div
                      className="db-invoice"
                      style={{
                        width: "100%",
                        overflowX: "auto",   // ✅ enables horizontal scroll
                      }}
                    >
                      <table
                        className="table table-bordered"
                        style={{
                          minWidth: "600px", // ✅ prevents table from shrinking
                        }}
                      >
                        <thead>
                          <tr>
                            <th>Plan Type</th>
                            <th>Duration</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Invoice</th>
                          </tr>
                        </thead>

                        <tbody>
                          {planData ? (
                            [planData].map((item, index) => (
                              <tr key={index}>
                                <td>{item.subscriptionType}</td>
                                <td>
                                  {item.subscriptionValidFrom} - {item.subscriptionValidTo}
                                </td>
                                <td>₹{item.subscriptionAmount}</td>
                                <td style={{ color: "green", fontWeight: 600 }}>Active</td>
                                <td>
                                  <button
                                    className="cta-dark cta-sml"
                                    onClick={() => handleDownload(userId, item.subscriptionTransactionId)}
                                    disabled={downloadingId === item._id}
                                  >
                                    {downloadingId === item._id ? "Downloading..." : "Download"}
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="5" style={{ textAlign: "center" }}>
                                No Invoices Found
                              </td>
                            </tr>
                          )}
                        </tbody>


                      </table>
                    </div>
                  </div>

                  {/* ================= CANCEL ================= */}
                  {/* <div className="col-md-12 db-sec-com">
                    <div className="alert alert-warning db-plan-canc">
                      <p>
                        <strong>Plan cancellation:</strong>{" "}
                        <a href="#" data-bs-toggle="modal" data-bs-target="#plancancel">
                          Click here
                        </a>{" "}
                        to cancel the current plan.
                      </p>
                    </div>
                  </div> */}

                  <div className="col-md-12 db-sec-com">
                    <div className="alert alert-warning db-plan-canc db-plan-canc-app">
                      <p>
                        Your plan cancellation request has been successfully received by the admin.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <div className="modal fade plncanl-pop" id="plancancel">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-body">
              <form onSubmit={handleCancelSubmit}>

                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="form-control"
                >
                  <option value="">Select reason</option>
                  <option value="Joined partner">Joined partner</option>
                  <option value="Not satisfied">Not satisfied</option>
                  <option value="Other">Other</option>
                </select>

                <br />

                <textarea
                  className="form-control"
                  placeholder="Enter message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <br />

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default UserPlanPage;
