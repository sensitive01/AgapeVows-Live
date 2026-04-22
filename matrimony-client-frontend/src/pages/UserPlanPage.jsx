// import React from "react";

// import UserSideBar from "../components/UserSideBar";
// import LayoutComponent from "../components/layouts/LayoutComponent";
// import planIcon from "../assets/images/icon/plan.png";

// const UserPlanPage = () => {
//   return (
//     <div className="min-h-screen">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <LayoutComponent />
//       </div>

//       <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
//         <div className="db">
//           <div
//             className="container-fluid"
//             style={{ paddingLeft: 0, paddingRight: 0 }}
//           >
//             <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
//               <div
//                 className="col-md-3 col-lg-2"
//                 style={{ paddingLeft: 0, marginLeft: "0px" }}
//               >
//                 <UserSideBar />
//               </div>

//               <div
//                 className="col-md-9 col-lg-10"
//                 style={{ paddingLeft: "20px", paddingRight: "15px" }}
//               >
//                 <div className="row">
//                   <div className="col-md-4 db-sec-com">
//                     <h2 className="db-tit">Plan details</h2>
//                     <div className="db-pro-stat">
//                       <h6 className="tit-top-curv">Current plan</h6>
//                       <div className="db-plan-card">
//                         <img src={planIcon} alt="" />
//                       </div>
//                       <div className="db-plan-detil">
//                         <ul>
//                           <li>
//                             Plan name: <strong>Standard</strong>
//                           </li>
//                           <li>
//                             Validity: <strong>6 Months</strong>
//                           </li>
//                           <li>
//                             Valid till <strong>24 June 2024</strong>
//                           </li>
//                           <li>
//                             <a
//                               href="/user/user-plan-selection"
//                               className="cta-3"
//                             >
//                               Upgrade now
//                             </a>
//                           </li>
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-md-8 db-sec-com">
//                     <h2 className="db-tit">All invoice</h2>
//                     <div className="db-invoice">
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             <th>Plan type</th>
//                             <th>Duration</th>
//                             <th>Cost</th>
//                             <th>Invoice</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           <tr>
//                             <td>Platinum</td>
//                             <td>12 Months(May 2023 - June 2024)</td>
//                             <td>$500</td>
//                             <td>
//                               <a href="#" className="cta-dark cta-sml" download>
//                                 <span>Download</span>
//                               </a>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Standard</td>
//                             <td>6 Months(Aug 2021 - Jan 2022)</td>
//                             <td>$250</td>
//                             <td>
//                               <a href="#" className="cta-dark cta-sml" download>
//                                 <span>Download</span>
//                               </a>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td>Standard</td>
//                             <td>6 Months(Jan 2021 - July 2021)</td>
//                             <td>$250</td>
//                             <td>
//                               <a href="#" className="cta-dark cta-sml" download>
//                                 <span>Download</span>
//                               </a>
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                   <div className="col-md-12 db-sec-com">
//                     <div className="alert alert-warning db-plan-canc">
//                       <p>
//                         <strong>Plan cancellation:</strong>{" "}
//                         <a
//                           href="#"
//                           data-bs-toggle="modal"
//                           data-bs-target="#plancancel"
//                         >
//                           Click here
//                         </a>{" "}
//                         to cancel the current plan.
//                       </p>
//                     </div>
//                   </div>
//                   <div className="col-md-12 db-sec-com">
//                     <div className="alert alert-warning db-plan-canc db-plan-canc-app">
//                       <p>
//                         Your plan cancellation request has been successfully
//                         received by the admin. Once the admin approves your
//                         cancellation, the cost will be sent to you.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <section className="wed-hom-footer">
//         <div className="container">
//           <div className="row foot-supp">
//             <h2>
//               <span>Free support:</span> +92 (8800) 68 - 8960
//               &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
//               info@example.com
//             </h2>
//           </div>
//           <div className="row wed-foot-link wed-foot-link-1">
//             <div className="col-md-4">
//               <h4>Get In Touch</h4>
//               <p>Address: 3812 Lena Lane City Jackson Mississippi</p>
//               <p>
//                 Phone: <a href="tel:+917904462944">+92 (8800) 68 - 8960</a>
//               </p>
//               <p>
//                 Email: <a href="mailto:info@example.com">info@example.com</a>
//               </p>
//             </div>
//             <div className="col-md-4">
//               <h4>HELP &amp; SUPPORT</h4>
//               <ul>
//                 <li>
//                   <a href="#">About company</a>
//                 </li>
//                 <li>
//                   <a href="#">Contact us</a>
//                 </li>
//                 <li>
//                   <a href="#">Feedback</a>
//                 </li>
//                 <li>
//                   <a href="#">FAQs</a>
//                 </li>
//                 <li>
//                   <a href="#">Testimonials</a>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-md-4 fot-soc">
//               <h4>SOCIAL MEDIA</h4>
//               <ul>
//                 <li>
//                   <a href="#!">
//                     <img src="images/social/1.png" alt="" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!">
//                     <img src="images/social/2.png" alt="" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!">
//                     <img src="images/social/3.png" alt="" />
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#!">
//                     <img src="images/social/5.png" alt="" />
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="row foot-count">
//             <p>
//               Company name Site - Trusted by over thousands of Boys & Girls for
//               successful marriage.{" "}
//               <a href="#" className="btn btn-primary btn-sm">
//                 Join us today !
//               </a>
//             </p>
//           </div>
//         </div>
//       </section>

//       <section>
//         <div className="cr">
//           <div className="container">
//             <div className="row">
//               <p>
//                 Copyright © <span id="cry">2017-2020</span>{" "}
//                 <a href="#!" target="_blank">
//                   Company.com
//                 </a>{" "}
//                 All rights reserved.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="modal fade plncanl-pop" id="plancancel">
//         <div className="modal-dialog modal-lg">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h4 className="modal-title seninter-tit">Plan cancellation</h4>
//               <button type="button" className="close" data-bs-dismiss="modal">
//                 &times;
//               </button>
//             </div>

//             <div className="modal-body seninter chosenini">
//               <div className="row">
//                 <div className="col-md-6 lhs-poli">
//                   <h5>Cancellation policy</h5>
//                   <ul>
//                     <li>Your refund amount calculated day basis</li>
//                     <li>As per your plan, your per day cost: $10</li>
//                     <li>After 3 months only you can be able to join</li>
//                     <li>Fair ipsum dummy content ipsum genuine ai</li>
//                     <li>Rair ipsum dummy content ipsum genuine ai</li>
//                   </ul>
//                 </div>
//                 <div className="col-md-6 rhs-form">
//                   <div className="form-login">
//                     <form>
//                       <div className="form-group">
//                         <label className="lb">
//                           Reason for the cancellation: *
//                         </label>
//                         <select className="chosen-select">
//                           <option value="">I joined my pair</option>
//                           <option value="">Profile match not good</option>
//                           <option value="">Support not good</option>
//                           <option value="">My reason not in the list</option>
//                         </select>
//                       </div>
//                       <div className="form-group">
//                         <label className="lb">Message: *</label>
//                         <textarea
//                           placeholder="Enter your message"
//                           className="form-control"
//                           id=""
//                           cols="20"
//                           rows="5"
//                         ></textarea>
//                       </div>
//                       <button type="submit" className="btn btn-primary">
//                         Submit
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-md-12">
//                   <table className="table table-bordered table-responsive">
//                     <thead>
//                       <tr>
//                         <th>Plan type</th>
//                         <th>Duration</th>
//                         <th>Cost paid</th>
//                         <th>Per day cost</th>
//                         <th>Plan active days</th>
//                         <th>Remaining days</th>
//                         <th>Cancellation charges</th>
//                         <th>Cost saved</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       <tr>
//                         <td>Platinum</td>
//                         <td>365 days(12 months)</td>
//                         <td>$1000</td>
//                         <td>$2.73</td>
//                         <td>190 days</td>
//                         <td>175 days</td>
//                         <td>$100</td>
//                         <td>$377.75</td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserPlanPage;

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
        console.log(response.data.activePlan);
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
        console.log("Missing values:", userId, transactionId);
        alert("Missing data ❌");
        return;
      }

      console.log("Downloading:", userId, transactionId);

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
      alert("Please fill all fields");
      return;
    }

    if (!userId) {
      alert("User not found. Please login again.");
      return;
    }

    try {
      const res = await cancelUserPlan(userId, {
        reason,
        message,
      });

      if (res?.data?.success) {
        alert(res?.data?.message || "Plan cancelled successfully!");

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
        alert("Something went wrong");
      }

    } catch (err) {
      console.error("Cancel error:", err);

      alert(
        err?.response?.data?.message ||
        err?.message ||
        "Cancel failed"
      );
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

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
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

                      <div className="db-plan-card">
                        <img src={planIcon} alt="" />
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
