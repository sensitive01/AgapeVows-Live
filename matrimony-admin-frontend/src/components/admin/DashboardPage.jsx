import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Link } from "react-router-dom";

import profImages from "/assets/images/profiles/1.jpg";
import NewLayout from "./layout/NewLayout";
import {
  getNewRequestedUsers, getAllUserData,
  getPaidUserData,
  getAllPlanData,
  getAllEnquiries,
  getAdminProfile
} from "../../api/service/adminServices";

Chart.register(...registerables);

const DashboardPage = () => {
  const chartsRef = useRef({
    earningChart: null,
    usersChart: null,
    monthlyEarningsChart: null,
  });


  const [newUserCount, setNewUserCount] = useState(0);
  const [newRequestedUsers, setNewRequestedUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [paidUsers, setPaidUsers] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [yearlyEarningsINR, setYearlyEarningsINR] = useState(0);
  const [enquiries, setEnquiries] = useState([]);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(0);
  const [adminRole, setAdminRole] = useState("superadmin");

  const [recentMembersPage, setRecentMembersPage] = useState(1);
  const [renewalReminderPage, setRenewalReminderPage] = useState(1);
  const dashboardTableRecordsPerPage = 5;

  const handleRecentMembersNextPage = () => setRecentMembersPage(p => p + 1);
  const handleRecentMembersPrevPage = () => setRecentMembersPage(p => Math.max(1, p - 1));

  const handleRenewalReminderNextPage = () => setRenewalReminderPage(p => p + 1);
  const handleRenewalReminderPrevPage = () => setRenewalReminderPage(p => Math.max(1, p - 1));

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      getAdminProfile(adminId).then(res => {
        if (res.data?.success) {
          setAdminRole(res.data.data.role || "superadmin");
        }
      }).catch(err => console.error("Error fetching admin profile:", err));
    }
  }, []);

  const renewalUsers = paidUsers.filter(user =>
    user.paymentDetails?.some(payment => {

      const expiry = new Date(payment.subscriptionValidTo);
      const today = new Date();

      const diff =
        (expiry - today) / (1000 * 60 * 60 * 24);

      return diff <= 7 && diff >= 0;
    })
  );


  const activeSubscribedUsers = paidUsers.filter(user =>
    user.paymentDetails?.some(
      payment => payment.subscriptionStatus === "Active"
    )
  );

  useEffect(() => {
    if (paidUsers.length === 0) return;

    const total = paidUsers.reduce((sum, user) => {
      if (!user.paymentDetails) return sum;

      const userTotal = user.paymentDetails
        .filter(payment => payment.subscriptionStatus === "Active")
        .reduce((subSum, payment) =>
          subSum + Number(payment.subscriptionAmount || 0),
          0);

      return sum + userTotal;
    }, 0);

    setTotalEarnings(total);

  }, [paidUsers]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allRes = await getAllUserData();
      if (allRes?.data?.success) {
        const sortedUsers = allRes.data.data.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setAllUsers(sortedUsers);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const thisMonthUsers = sortedUsers.filter(user => {
          const userDate = new Date(user.createdAt);
          return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
        });
        setNewUsersThisMonth(thisMonthUsers.length);
      }

      const paidRes = await getPaidUserData();
      if (paidRes?.data?.success) {
        setPaidUsers(paidRes.data.data);
      }

      const planRes = await getAllPlanData();
      if (planRes?.data?.success) {
        setPlans(planRes.data.data);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await getAllEnquiries();
        if (response?.data?.success) {
          setEnquiries(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };
    fetchEnquiries();
  }, []);


  useEffect(() => {
    const fetchPlans = async () => {
      const res = await getAllPlanData();
      if (res.status === 200) {
        const activePlans = res.data.data.filter(
          (plan) => plan.status === "Active"
        );
        setPlans(activePlans);
      }
    };

    fetchPlans();
  }, []);

  useEffect(() => {
    const fetchNewUserCount = async () => {
      try {
        const response = await getNewRequestedUsers();

        if (response?.data?.success) {
          const users = response.data.data;
          
          const sortedUsers = users.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setNewRequestedUsers(sortedUsers);

          const today = new Date().toISOString().split("T")[0];

          const todayUsers = users.filter((user) =>
            user.createdAt.startsWith(today)
          );

          setNewUserCount(todayUsers.length);
        }
      } catch (error) {
        console.error("Error fetching new users count:", error);
      }
    };

    fetchNewUserCount();
  }, []);

  useEffect(() => {
    if (!paidUsers.length) return;

    Chart.defaults.font.size = 14;
    Chart.defaults.color = "#666";

    const earningCanvas = document.getElementById("Chart_earni");
    if (!earningCanvas) return;

    if (chartsRef.current.earningChart) {
      chartsRef.current.earningChart.destroy();
    }

    const earningsByPlan = {};

    paidUsers.forEach(user => {
      user.paymentDetails?.forEach(payment => {
        if (payment.subscriptionStatus === "Active") {
          const type = payment.subscriptionType;
          const amount = Number(payment.subscriptionAmount || 0);
          earningsByPlan[type] =
            (earningsByPlan[type] || 0) + amount;
        }
      });
    });

    const labels = Object.keys(earningsByPlan);
    const data = Object.values(earningsByPlan);

    chartsRef.current.earningChart = new Chart(earningCanvas, {
      type: "pie",
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: [
            "#8463FF",
            "#6384FF",
            "#198754",
            "#ff07a8",
            "#dcbd35"
          ].slice(0, labels.length),
        }],
      },
    });

    return () => {
      if (chartsRef.current.earningChart) {
        chartsRef.current.earningChart.destroy();
      }
    };

  }, [paidUsers]);

  useEffect(() => {

    if (!paidUsers.length) return;

    Chart.defaults.font.size = 14;
    Chart.defaults.color = "#666";

    if (chartsRef.current.monthlyEarningsChart) {
      chartsRef.current.monthlyEarningsChart.destroy();
    }

    const earningsReceiptCanvas =
      document.getElementById("Chart_earni_rece");

    if (earningsReceiptCanvas) {

      const currentYear = new Date().getFullYear();
      const monthlyTotalsINR = new Array(12).fill(0);

      paidUsers.forEach(user => {
        user.paymentDetails?.forEach(payment => {
          if (
            payment.subscriptionStatus === "Active" &&
            payment.subscriptionTransactionDate
          ) {
            const paymentDate = new Date(payment.subscriptionTransactionDate);
            if (isNaN(paymentDate)) return;

            const paymentYear = paymentDate.getFullYear();
            const paymentMonth = paymentDate.getMonth();

            if (paymentYear === currentYear) {
              monthlyTotalsINR[paymentMonth] += Number(payment.subscriptionAmount || 0);
            }
          }
        });
      });

      // ✅ Calculate total current year INR
      const totalYearINR = monthlyTotalsINR.reduce((sum, amount) => sum + amount, 0);

      // ✅ Store in state
      setYearlyEarningsINR(totalYearINR);

      chartsRef.current.monthlyEarningsChart =
        new Chart(earningsReceiptCanvas, {
          type: "bar",
          data: {
            labels: [
              "Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ],
            datasets: [{
              label: `Yearly Earnings (${currentYear})`,
              data: monthlyTotalsINR,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 2,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return "₹" + context.raw.toLocaleString();
                  }
                }
              }
            }
          },
        });
    }

    // Update copyright year
    const copyrightYear =
      document.getElementById("cry");
    if (copyrightYear) {
      copyrightYear.textContent =
        new Date().getFullYear();
    }

    // Reinitialize menu
    if (window.reinitializeMenu) {
      window.reinitializeMenu();
    }

    // Bootstrap tooltips
    if (typeof bootstrap !== "undefined") {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    }

    return () => {
      if (chartsRef.current.monthlyEarningsChart) {
        chartsRef.current.monthlyEarningsChart.destroy();
      }
    };

  }, [paidUsers]);

  // Users Pie Chart






  return (
    <NewLayout>
      <div className="pan-rhs">
        <div className="row main-head">
          <div className="col-md-4">
            <div className="tit">
              <h1>Admin Dashboard</h1>
            </div>
          </div>
          <div className="col-md-8">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Library</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Data
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className={adminRole === "superadmin" ? "col-md-3" : "col-md-6"}>
            <div className="box-com box-qui box-drk grn-box">
              <h4>New Users</h4>
              <h2>User requests</h2>
              <span className="bnum">{newUserCount}</span>
              <p>This count for today how many users can register.</p>
              <Link to="/admin/new-user-requests" className="fclick"></Link>
            </div>
            <div className="box-com box-qui box-lig ali-cen">
              <h3>
                <span>All</span> Members
              </h3>
              <span className="bnum">{allUsers.length}</span>
              {allUsers.length > 0 && (
                <div className="users-cir-thum-hori" style={{ marginTop: "15px", justifyContent: "center" }}>
                  {allUsers.filter(user => user.profileImage).slice(0, 8).map((user, index) => (
                    <span key={index}>
                      <img
                        src={user.profileImage}
                        data-bs-toggle="tooltip"
                        title={user.userName || "User"}
                        alt=""
                        style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", margin: "0 -5px", border: "2px solid #fff", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
                      />
                    </span>
                  ))}
                </div>
              )}
              <Link to="/admin/all-user-list" className="fclick"></Link>
            </div>
            <div className="box-com box-qui live-box">
              <h4>New Users This Month</h4>
              <h2>Recent Registrations</h2>
              <span className="bnum">{newUsersThisMonth}</span>
              <p>
                Currently <span>{newUsersThisMonth}</span> users registered this month.
              </p>
              <div className="live">
                <span className="move"></span>
              </div>
            </div>
          </div>
          <div className={adminRole === "superadmin" ? "col-md-3" : "col-md-6"}>
            <div className="box-com box-qui box-lig box-new-user">
              <h2>Subscribed Users</h2>
              <span className="bnum">{activeSubscribedUsers.length}</span>
              <div className="users-cir-thum-hori">
                {activeSubscribedUsers.filter(user => user.profileImage).slice(0, 8).map((user, index) => (
                  <span key={index}>
                    <img
                      src={user.profileImage}
                      data-bs-toggle="tooltip"
                      title={user.userName}
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>
            {adminRole === "superadmin" && (
              <div className="box-com box-qui box-lig ali-cen">
                <h3>
                  <span>Total</span> Earnings
                </h3>
                <span className="bnum">
                  <sub>₹</sub>{totalEarnings.toLocaleString()}
                </span>
                <canvas id="Chart_earni"></canvas>
              </div>
            )}
            <div className="box-com box-qui box-drk box-lead-thum">
              <h2>Leads & Enquiry</h2>
              <span className="bnum">{enquiries.length}</span>
              <div className="lead-cir-thum-hori">
                {enquiries.slice(0, 8).map((enq, idx) => (
                  <span key={idx} data-bs-toggle="tooltip" title={enq.name}>
                    {enq.name ? enq.name.charAt(0).toUpperCase() : "U"}
                  </span>
                ))}
              </div>
              <Link to="/admin/enquiries" className="fclick"></Link>
            </div>
          </div>
          {adminRole === "superadmin" && (
            <div className="col-md-6">
              <div className="box-com box-qui box-lig ali-cen">
                <h3>
                  <span>Yearly</span> Earnings
                </h3>
                <span className="bnum">
                  <sub>₹</sub>{yearlyEarningsINR.toLocaleString()}
                </span>
                <canvas id="Chart_earni_rece"></canvas>
              </div>
            </div>
          )}
        </div>
        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>Recent members</h3>
                <p>Recently joined members</p>
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
                      <a className="dropdown-item" href="#">
                        View all profile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Profile</th>
                    <th>Phone</th>
                    <th>Join date</th>
                    <th>Plan type</th>
                  </tr>
                </thead>
                {/* <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Ashley emyy</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Elizabeth Taylor</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Angelina Jolie</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Olivia mia</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Jennifer</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>
                      <div className="prof-table-thum">
                        <div className="pro">
                          <img src={profImages} alt="" />
                        </div>
                        <div className="pro-info">
                          <h5>Emmy jack</h5>
                          <p>ashleyipsum@gmail.com</p>
                        </div>
                      </div>
                    </td>
                    <td>01 321-998-91</td>
                    <td>22, Feb 2024</td>
                    <td>
                      <span className="hig-grn">Premium</span>
                    </td>
                    <td>
                      <div className="dropdown">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          data-bs-toggle="dropdown"
                        >
                          <i
                            className="fa fa-ellipsis-h"
                            aria-hidden="true"
                          ></i>
                        </button>
                        <ul className="dropdown-menu">
                          <li>
                            <a className="dropdown-item" href="#">
                              More details
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="#">
                              View profile
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody> */}

                <tbody>
                  {(() => {
                    const rmLastIndex = recentMembersPage * dashboardTableRecordsPerPage;
                    const rmFirstIndex = rmLastIndex - dashboardTableRecordsPerPage;
                    const currentRecentMembers = newRequestedUsers.slice(rmFirstIndex, rmLastIndex);
                    
                    if (currentRecentMembers.length === 0) {
                      return (
                        <tr>
                          <td colSpan="5" className="text-center">No recent members</td>
                        </tr>
                      );
                    }

                    return currentRecentMembers.map((user, index) => {
                      const activePlan = user.paymentDetails?.find(p => p.subscriptionStatus === "Active");
                      const planFromList = plans.find(p => p.name === activePlan?.subscriptionType);
                      
                      return (
                        <tr key={user._id}>
                          <td>{rmFirstIndex + index + 1}</td>

                        <td>
                          <div className="prof-table-thum">
                            <div className="pro">
                              <img src={user.profileImage || profImages} alt="" />
                            </div>

                            <div className="pro-info">
                              <h5>{user.userName}</h5>
                              <p>{user.userEmail}</p>
                            </div>
                          </div>
                        </td>

                        <td>{user.userMobile}</td>

                        <td>
                          {new Date(user.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>

                        <td>
                          <span className={user.isAnySubscriptionTaken ? "hig-grn" : "hig-red"}>
                            {planFromList ? planFromList.name : (user.isAnySubscriptionTaken ? "Premium" : "Free")}
                          </span>
                        </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
              {newRequestedUsers.length > dashboardTableRecordsPerPage && (
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="text-muted small">
                    Showing {(recentMembersPage - 1) * dashboardTableRecordsPerPage + 1} to {Math.min(recentMembersPage * dashboardTableRecordsPerPage, newRequestedUsers.length)} of {newRequestedUsers.length} entries
                  </span>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleRecentMembersPrevPage} disabled={recentMembersPage === 1}>Previous</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={handleRecentMembersNextPage} disabled={recentMembersPage === Math.ceil(newRequestedUsers.length / dashboardTableRecordsPerPage)}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div className="box-com box-qui box-lig box-tab">
              <div className="tit">
                <h3>Renewal Reminder</h3>
                <p>Below listed profils going to expairy soon.</p>
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
                      <a className="dropdown-item" href="#">
                        View all profile
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Profile</th>
                    <th>Phone</th>
                    <th>Expairy date</th>
                    <th>Plan type</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const rrLastIndex = renewalReminderPage * dashboardTableRecordsPerPage;
                    const rrFirstIndex = rrLastIndex - dashboardTableRecordsPerPage;
                    const currentRenewalUsers = renewalUsers.slice(rrFirstIndex, rrLastIndex);

                    if (currentRenewalUsers.length === 0) {
                      return (
                        <tr>
                          <td colSpan="5" className="text-center">No renewal reminders</td>
                        </tr>
                      );
                    }

                    return currentRenewalUsers.map((user, index) => {
                      const expiringPayment = user.paymentDetails?.find(payment => {
                        const expiry = new Date(payment.subscriptionValidTo);
                        const today = new Date();
                        const diff = (expiry - today) / (1000 * 60 * 60 * 24);
                        return diff <= 7 && diff >= 0;
                      });

                      return (
                        <tr key={user._id}>
                          <td>{rrFirstIndex + index + 1}</td>
                          <td>
                            <div className="prof-table-thum">
                              <div className="pro">
                                <img src={user.profileImage || profImages} alt="" />
                              </div>
                              <div className="pro-info">
                                <h5>{user.userName}</h5>
                                <p>{user.userEmail}</p>
                              </div>
                            </div>
                          </td>
                          <td>{user.userMobile}</td>
                          <td>
                            <span className="hig-red">
                              {expiringPayment ? new Date(expiringPayment.subscriptionValidTo).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              }) : "N/A"}
                            </span>
                          </td>
                          <td>
                            <span className="hig-grn">
                              {expiringPayment?.subscriptionType || "Premium"}
                            </span>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
              {renewalUsers.length > dashboardTableRecordsPerPage && (
                <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <span className="text-muted small">
                    Showing {(renewalReminderPage - 1) * dashboardTableRecordsPerPage + 1} to {Math.min(renewalReminderPage * dashboardTableRecordsPerPage, renewalUsers.length)} of {renewalUsers.length} entries
                  </span>
                  <div>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={handleRenewalReminderPrevPage} disabled={renewalReminderPage === 1}>Previous</button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={handleRenewalReminderNextPage} disabled={renewalReminderPage === Math.ceil(renewalUsers.length / dashboardTableRecordsPerPage)}>Next</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default DashboardPage;
