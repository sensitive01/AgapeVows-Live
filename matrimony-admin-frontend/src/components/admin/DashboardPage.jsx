import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

import profImages from "/assets/images/profiles/1.jpg";
import NewLayout from "./layout/NewLayout";
import {
  getNewRequestedUsers, getAllUserData,
  getPaidUserData,
  getAllPlanData
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
  const [yearlyEarningsUSD, setYearlyEarningsUSD] = useState(0);

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



  //   useEffect(() => {
  //     Chart.defaults.font.size = 14;
  //     Chart.defaults.color = "#666";

  //     const initCharts = () => {
  //       if (chartsRef.current.earningChart) {
  //         chartsRef.current.earningChart.destroy();
  //       }
  //       if (chartsRef.current.usersChart) {
  //         chartsRef.current.usersChart.destroy();
  //       }
  //       if (chartsRef.current.monthlyEarningsChart) {
  //         chartsRef.current.monthlyEarningsChart.destroy();
  //       }

  //       // Earnings Pie Chart
  //     const earningCanvas = document.getElementById("Chart_earni");

  // if (earningCanvas && paidUsers.length > 0) {

  //   if (chartsRef.current.earningChart) {
  //     chartsRef.current.earningChart.destroy();
  //   }

  //   const earningsByPlan = {};

  //   paidUsers.forEach(user => {
  //     user.paymentDetails?.forEach(payment => {
  //       if (payment.subscriptionStatus === "Active") {
  //         const type = payment.subscriptionType;
  //         const amount = Number(payment.subscriptionAmount || 0);
  //         earningsByPlan[type] = (earningsByPlan[type] || 0) + amount;
  //       }
  //     });
  //   });

  //   const labels = Object.keys(earningsByPlan);
  //   const data = Object.values(earningsByPlan);

  //   chartsRef.current.earningChart = new Chart(earningCanvas, {
  //     type: "pie",
  //     data: {
  //       labels,
  //       datasets: [{
  //         data,
  //         backgroundColor: [
  //           "#8463FF",
  //           "#6384FF",
  //           "#198754",
  //           "#ff07a8",
  //           "#dcbd35"
  //         ].slice(0, labels.length),
  //       }],
  //     },
  //   });
  // }




  //       // Monthly Earnings Bar Chart
  //       const earningsReceiptCanvas = document.getElementById("Chart_earni_rece");
  //       if (earningsReceiptCanvas) {
  //         chartsRef.current.monthlyEarningsChart = new Chart(
  //           earningsReceiptCanvas,
  //           {
  //             type: "bar",
  //             data: {
  //               labels: [
  //                 "Jan",
  //                 "Feb",
  //                 "Mar",
  //                 "Apr",
  //                 "May",
  //                 "Jun",
  //                 "Jul",
  //                 "Aug",
  //                 "Sep",
  //                 "Oct",
  //                 "Nov",
  //                 "Dec",
  //               ],
  //               datasets: [
  //                 {
  //                   label: "Monthly Earnings",
  //                   data: [
  //                     4000, 5000, 4550, 6005, 8550, 9008, 3220, 4880, 6550, 2500,
  //                     4000, 5000,
  //                   ],
  //                   backgroundColor: "rgba(255,99,132,0.2)",
  //                   borderColor: "rgba(255,99,132,1)",
  //                   borderWidth: 2,
  //                   hoverBackgroundColor: "rgba(255,99,132,0.4)",
  //                   hoverBorderColor: "rgba(255,99,132,1)",
  //                 },
  //               ],
  //             },
  //             options: {
  //               scales: {
  //                 y: {
  //                   beginAtZero: true,
  //                 },
  //               },
  //             },
  //           }
  //         );
  //       }
  //     };

  //     initCharts();


  //     // Update copyright year
  //     const copyrightYear = document.getElementById("cry");
  //     if (copyrightYear) {
  //       copyrightYear.textContent = new Date().getFullYear();
  //     }

  //     // Initialize menu script if available
  //     if (window.reinitializeMenu) {
  //       window.reinitializeMenu();
  //     }

  //     // Initialize Bootstrap tooltips if available
  //     if (typeof bootstrap !== "undefined") {
  //       const tooltipTriggerList = [].slice.call(
  //         document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //       );
  //       tooltipTriggerList.map(function (tooltipTriggerEl) {
  //         return new bootstrap.Tooltip(tooltipTriggerEl);
  //       });
  //     }

  //     // Cleanup function
  //     return () => {
  //       // Destroy all charts when component unmounts
  //       if (chartsRef.current.earningChart) {
  //         chartsRef.current.earningChart.destroy();
  //       }
  //       if (chartsRef.current.usersChart) {
  //         chartsRef.current.usersChart.destroy();
  //       }
  //       if (chartsRef.current.monthlyEarningsChart) {
  //         chartsRef.current.monthlyEarningsChart.destroy();
  //       }
  //     };
  //   }, []);


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

      // ✅ Convert INR → USD
      const USD_RATE = 83; // INR → USD
      const monthlyTotalsUSD = monthlyTotalsINR.map(amount => amount / USD_RATE);

      // ✅ Calculate total current year INR
      const totalYearINR = monthlyTotalsINR.reduce((sum, amount) => sum + amount, 0);

      // ✅ Store in state
      setYearlyEarningsUSD(totalYearINR / USD_RATE);

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
              data: monthlyTotalsUSD,
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
                max: 10000,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return "$" + context.raw.toFixed(2);
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

  useEffect(() => {
    if (plans.length === 0 || paidUsers.length === 0) return;

    const usersCanvas = document.getElementById("Chart_users");
    if (!usersCanvas) return;

    if (chartsRef.current.usersChart) {
      chartsRef.current.usersChart.destroy();
    }

    const labels = plans.map(plan => plan.name);

    const dataCounts = plans.map(plan =>
      paidUsers.filter(user =>
        user.paymentDetails?.some(
          payment =>
            payment.subscriptionType === plan.name &&
            payment.subscriptionStatus === "Active"
        )
      ).length
    );

    chartsRef.current.usersChart = new Chart(usersCanvas, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data: dataCounts,
            backgroundColor: [
              "#198754",
              "#ff07a8",
              "#0d6efd",
              "#dcbd35",
              "#20c997",
              "#6610f2"
            ].slice(0, plans.length),
          },
        ],
      },
    });

    return () => {
      if (chartsRef.current.usersChart) {
        chartsRef.current.usersChart.destroy();
      }
    };
  }, [plans, paidUsers]);




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
          <div className="col-md-3">
            <div className="box-com box-qui box-drk grn-box">
              <h4>New Users</h4>
              <h2>User requests</h2>
              <span className="bnum">{newUserCount}</span>
              <p>This count for today how many users can register.</p>
              <a href="admin-new-user-requests.html" className="fclick"></a>
            </div>
            <div className="box-com box-qui box-lig ali-cen">
              <h3>
                <span>All</span> Members
              </h3>
              <span className="bnum">{allUsers.length}</span>
              <canvas id="Chart_users"></canvas>
              <a href="admin-new-user-requests.php" className="fclick"></a>
            </div>
            <div className="box-com box-qui live-box">
              <h4>Live visitos</h4>
              <h2>Currently Active Users</h2>
              <span className="bnum">3600</span>
              <p>
                Currently <span>3600</span> visitos survey in your website{" "}
              </p>
              <div className="live">
                <span className="move"></span>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="box-com box-qui box-lig box-new-user">
              <h2>Subscribed Users</h2>
              <span className="bnum">{activeSubscribedUsers.length}</span>
              <div className="users-cir-thum-hori">
                {activeSubscribedUsers.slice(0, 8).map((user, index) => (
                  <span key={index}>
                    <img
                      src={user.profileImage || profImages}
                      data-bs-toggle="tooltip"
                      title={user.userName}
                      alt={user.userName}
                    />
                  </span>
                ))}
              </div>
            </div>
            <div className="box-com box-qui box-lig ali-cen">
              <h3>
                <span>Total</span> Earnings
              </h3>
              <span className="bnum">
                <sub>₹</sub>{totalEarnings.toLocaleString()}
              </span>
              <canvas id="Chart_earni"></canvas>
            </div>
            <div className="box-com box-qui box-drk box-lead-thum">
              <h2>Leads & Enquiry</h2>
              <span className="bnum">28</span>
              <div className="lead-cir-thum-hori">
                <span data-bs-toggle="tooltip" title="Anna">
                  A
                </span>
                <span data-bs-toggle="tooltip" title="John">
                  j
                </span>
                <span data-bs-toggle="tooltip" title="Bailey">
                  b
                </span>
                <span data-bs-toggle="tooltip" title="Erick">
                  e
                </span>
                <span data-bs-toggle="tooltip" title="Boby">
                  b
                </span>
                <span data-bs-toggle="tooltip" title="Uma">
                  u
                </span>
                <span data-bs-toggle="tooltip" title="Maria">
                  m
                </span>
              </div>
              <a href="admin-enquiry.html" className="fclick"></a>
            </div>
          </div>
          <div className="col-md-6">
            <div className="box-com box-qui box-lig ali-cen">
              <h3>
                <span>Yearly</span> Earnings
              </h3>
              <span className="bnum">
                <sub>$</sub>{yearlyEarningsUSD.toFixed(2)}
              </span>
              <canvas id="Chart_earni_rece"></canvas>
            </div>
            <div className="box-com box-qui box-drk box-them-info">
              <h4>Template update status</h4>
              <ul>
                <li>
                  Current version you installed: <strong>3.6</strong>
                </li>
                <li>
                  Latest version: <strong>4.2</strong>
                </li>
                <li>
                  Template Activation: <strong>Yes</strong>
                </li>
              </ul>
              <a href="#" className="btn-com btn-red">
                Update
              </a>
              <a href="#" className="btn-com btn-gre">
                Licance key
              </a>
              <a href="#" className="btn-com btn-line btn-whi">
                More details
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
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
                  {newRequestedUsers.slice(0, 6).map((user, index) => {
                    const activePlan = user.paymentDetails?.find(p => p.subscriptionStatus === "Active");
                    const planFromList = plans.find(p => p.name === activePlan?.subscriptionType);
                    
                    return (
                      <tr key={user._id}>
                        <td>{index + 1}</td>

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
                  })}
                </tbody>


              </table>
            </div>
          </div>
          <div className="col-md-6">
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
                  {renewalUsers.length > 0 ? (
                    renewalUsers.slice(0, 6).map((user, index) => {
                      const expiringPayment = user.paymentDetails?.find(payment => {
                        const expiry = new Date(payment.subscriptionValidTo);
                        const today = new Date();
                        const diff = (expiry - today) / (1000 * 60 * 60 * 24);
                        return diff <= 7 && diff >= 0;
                      });

                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
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
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">No renewal reminders</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default DashboardPage;
