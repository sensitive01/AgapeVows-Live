import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Link } from "react-router-dom";
import CustomTable from "./common/CustomTable";

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

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "600",
        fontSize: "13px",
        textTransform: "uppercase",
        color: "#495057",
        backgroundColor: "#e0e0e0",
        borderBottom: "2px solid #cfcfcf",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
      },
    },
  };

  const recentMembersColumns = [
    { name: "No", selector: (row, index) => index + 1, sortable: false, width: "60px" },
    {
      name: "Profile",
      selector: row => row.userName,
      sortable: true,
      minWidth: "320px",
      cell: row => (
        <div className="prof-table-thum d-flex align-items-center" style={{ minWidth: 0, width: "100%" }}>
          <div className="pro me-3">
            <img src={row.profileImage || profImages} alt="" className="rounded-circle" style={{width: "40px", height: "40px", objectFit: "cover"}} />
          </div>
          <div className="pro-info" style={{ minWidth: 0, overflow: 'hidden' }}>
            <h5 className="mb-0 fs-6 text-truncate" style={{ maxWidth: '250px' }}>{row.userName}</h5>
            <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '250px' }}>{row.userEmail}</p>
          </div>
        </div>
      )
    },
    { name: "Phone", selector: row => row.userMobile, sortable: true },
    {
      name: "Join date",
      selector: row => row.createdAt ? new Date(row.createdAt).getTime() : 0,
      sortable: true,
      format: row => new Date(row.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    {
      name: "Plan type",
      selector: row => row.isAnySubscriptionTaken,
      sortable: true,
      cell: row => {
        const activePlan = row.paymentDetails?.find(p => p.subscriptionStatus === "Active");
        const planFromList = plans.find(p => p.name === activePlan?.subscriptionType);
        return (
          <span className={row.isAnySubscriptionTaken ? "hig-grn text-success fw-bold" : "hig-red text-danger fw-bold"}>
            {planFromList ? planFromList.name : (row.isAnySubscriptionTaken ? "Premium" : "Free")}
          </span>
        );
      }
    }
  ];

  const renewalReminderColumns = [
    { name: "No", selector: (row, index) => index + 1, sortable: false, width: "60px" },
    {
      name: "Profile",
      selector: row => row.userName,
      sortable: true,
      minWidth: "320px",
      cell: row => (
        <div className="prof-table-thum d-flex align-items-center" style={{ minWidth: 0, width: "100%" }}>
          <div className="pro me-3">
            <img src={row.profileImage || profImages} alt="" className="rounded-circle" style={{width: "40px", height: "40px", objectFit: "cover"}} />
          </div>
          <div className="pro-info" style={{ minWidth: 0, overflow: 'hidden' }}>
            <h5 className="mb-0 fs-6 text-truncate" style={{ maxWidth: '250px' }}>{row.userName}</h5>
            <p className="mb-0 text-muted small text-truncate" style={{ maxWidth: '250px' }}>{row.userEmail}</p>
          </div>
        </div>
      )
    },
    { name: "Phone", selector: row => row.userMobile, sortable: true },
    {
      name: "Expiry date",
      selector: row => row.paymentDetails,
      sortable: false,
      cell: row => {
        const expiringPayment = row.paymentDetails?.find(payment => {
          const expiry = new Date(payment.subscriptionValidTo);
          const today = new Date();
          const diff = (expiry - today) / (1000 * 60 * 60 * 24);
          return diff <= 7 && diff >= 0;
        });
        return (
          <span className="hig-red text-danger fw-bold">
            {expiringPayment ? new Date(expiringPayment.subscriptionValidTo).toLocaleDateString('en-GB', {
              day: '2-digit', month: 'short', year: 'numeric'
            }) : "N/A"}
          </span>
        );
      }
    },
    {
      name: "Plan type",
      selector: row => row.paymentDetails,
      sortable: false,
      cell: row => {
        const expiringPayment = row.paymentDetails?.find(payment => {
          const expiry = new Date(payment.subscriptionValidTo);
          const today = new Date();
          const diff = (expiry - today) / (1000 * 60 * 60 * 24);
          return diff <= 7 && diff >= 0;
        });
        return (
          <span className="hig-grn text-success fw-bold">
            {expiringPayment?.subscriptionType || "Premium"}
          </span>
        );
      }
    }
  ];

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
              <div className="table-responsive">
                <CustomTable itemsPerPage={10}
                  columns={recentMembersColumns}
                  data={newRequestedUsers}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 20]}
                  highlightOnHover={false}
                  customStyles={customStyles}
                  noDataComponent={<div className="py-4 text-center text-muted">No recent members</div>}
                />
              </div>
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
              <div className="table-responsive">
                <CustomTable itemsPerPage={10}
                  columns={renewalReminderColumns}
                  data={renewalUsers}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 20]}
                  highlightOnHover={false}
                  customStyles={customStyles}
                  noDataComponent={<div className="py-4 text-center text-muted">No renewal reminders</div>}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </NewLayout>
  );
};

export default DashboardPage;