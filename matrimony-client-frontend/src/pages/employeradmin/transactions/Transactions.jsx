import React from 'react';
import { Link } from 'react-router-dom';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const Transactions = () => {
  // Invoice report cards data
  const invoiceReports = [
    {
      id: 1,
      title: "Total Invoice",
      value: "600",
      badgeClass: "",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    },
    {
      id: 2,
      title: "Partially Paid",
      value: "80",
      badgeClass: "invoice-report-badge-warning",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    },
    {
      id: 3,
      title: "Paid Invoices",
      value: "450",
      badgeClass: "invoice-report-badge-success",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    },
    {
      id: 4,
      title: "Overdue Invoices",
      value: "40",
      badgeClass: "invoice-report-badge-purple",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    },
    {
      id: 5,
      title: "Unpaid Invoices",
      value: "150",
      badgeClass: "invoice-report-badge-danger",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    },
    {
      id: 6,
      title: "Revenue",
      value: "$25,340",
      badgeClass: "invoice-report-badge-skyblue",
      badgeText: "+19.01%",
      icon: "ti ti-file-invoice"
    }
  ];

  // Payment transactions data
  const paymentTransactions = [
    {
      id: 1,
      invoiceId: "Inv-001",
      clientName: "Michael Walker",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-39.jpg",
      position: "CEO",
      companyName: "BrightWave Innovations",
      createdDate: "14 Jan 2024",
      dueDate: "15 Jan 2024",
      amount: "$3000",
      status: "Paid",
      statusClass: "badge-success-transparent"
    },
    {
      id: 2,
      invoiceId: "Inv-002",
      clientName: "Sophie Headrick",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-40.jpg",
      position: "Manager",
      companyName: "Stellar Dynamics",
      createdDate: "21 Jan 2024",
      dueDate: "25 Jan 2024",
      amount: "$2500",
      status: "Sent",
      statusClass: "badge-purple-transparent"
    },
    {
      id: 3,
      invoiceId: "Inv-003",
      clientName: "Cameron Drake",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-41.jpg",
      position: "Director",
      companyName: "Quantum Nexus",
      createdDate: "20 Feb 2024",
      dueDate: "22 Feb 2024",
      amount: "$2800",
      status: "Partially Paid",
      statusClass: "badge-warning-transparent"
    },
    {
      id: 4,
      invoiceId: "Inv-004",
      clientName: "Doris Crowley",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-42.jpg",
      position: "Consultant",
      companyName: "EcoVision Enterprises",
      createdDate: "15 Mar 2024",
      dueDate: "17 Mar 2024",
      amount: "$3300",
      status: "Sent",
      statusClass: "badge-purple-transparent"
    },
    {
      id: 5,
      invoiceId: "Inv-005",
      clientName: "Thomas Bordelon",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-43.jpg",
      position: "Manager",
      companyName: "Aurora Technologies",
      createdDate: "12 Apr 2024",
      dueDate: "16 Apr 2024",
      amount: "$3600",
      status: "Paid",
      statusClass: "badge-success-transparent"
    },
    {
      id: 6,
      invoiceId: "Inv-006",
      clientName: "Kathleen Gutierrez",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-44.jpg",
      position: "Director",
      companyName: "BlueSky Ventures",
      createdDate: "20 Apr 2024",
      dueDate: "21 Apr 2024",
      amount: "$2000",
      status: "Partially Paid",
      statusClass: "badge-warning-transparent"
    },
    {
      id: 7,
      invoiceId: "Inv-007",
      clientName: "Bruce Wright",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-45.jpg",
      position: "CEO",
      companyName: "TerraFusion Energy",
      createdDate: "06 Jul 2024",
      dueDate: "06 Jul 2024",
      amount: "$3400",
      status: "Sent",
      statusClass: "badge-purple-transparent"
    },
    {
      id: 8,
      invoiceId: "Inv-008",
      clientName: "Estelle Morgan",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-46.jpg",
      position: "Manager",
      companyName: "UrbanPulse Design",
      createdDate: "02 Sep 2024",
      dueDate: "04 Sep 2024",
      amount: "$4000",
      status: "Paid",
      statusClass: "badge-success-transparent"
    },
    {
      id: 9,
      invoiceId: "Inv-009",
      clientName: "Stephen Dias",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-47.jpg",
      position: "CEO",
      companyName: "Nimbus Networks",
      createdDate: "15 Nov 2024",
      dueDate: "15 Nov 2024",
      amount: "$4500",
      status: "Partially Paid",
      statusClass: "badge-warning-transparent"
    },
    {
      id: 10,
      invoiceId: "Inv-010",
      clientName: "Angela Thomas",
      clientImage: "https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-48.jpg",
      position: "Consultant",
      companyName: "Epicurean Delights",
      createdDate: "10 Dec 2024",
      dueDate: "11 Dec 2024",
      amount: "$3800",
      status: "Paid",
      statusClass: "badge-success-transparent"
    }
  ];

  return (
       <>
      <EmployerAdminHeader />
    <div className="content">
      <div className="row">
        {/* Total Expenses */}
        <div className="col-xl-7 d-flex">
          <div className="row flex-fill">
            {invoiceReports.map((report) => (
              <div key={report.id} className="col-lg-6 col-md-6 d-flex">
                <div className={`card invoice-report flex-fill ${report.badgeClass}`}>
                  <span className="invoice-report-badge"></span>
                  <div className="card-body d-flex flex-wrap align-items-center justify-content-between">
                    <div className="d-flex align-items-center flex-column overflow-hidden">
                      <div>
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">{report.title}</span>
                          <h5>{report.value}</h5>
                        </div>        
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <span className="badge badge-sm badge-success me-3">{report.badgeText}</span>
                      <Link to="#" className="avatar avatar-md br-10 bg-transparent-primary border border-primary">
                        <span className="text-primary"><i className={report.icon}></i></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* /Total Expenses */}

        {/* Total Expenses Chart */}
        <div className="col-xl-5 d-flex">
          <div className="card flex-fill">
            <div className="card-header border-0 pb-0">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="me-2"><i className="ti ti-chart-area-line text-danger"></i></span>
                  <h5>Expense</h5>
                </div>
                <div className="dropdown">
                  <button className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                    This Year
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end p-2">
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">2024</Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">2023</Link>
                    </li>
                    <li>
                      <Link to="#" className="dropdown-item rounded-1">2022</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body py-0">
              <div id="invoice-report"></div>
            </div>
          </div>
        </div>
        {/* /Total Expenses Chart */}
      </div>

      {/* Payment Transaction List */}
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Payment Transaction List</h5>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div className="dropdown me-2">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                $0.00 - $00
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">$10 - $20</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">$20 - $30</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">$30 - $40</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Select Status
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Paid</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Sent</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Partially Paid</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Sort By : Last 7 Days
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Ascending</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Desending</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Last Month</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                <i className="ti ti-file-export me-1"></i>Export
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="custom-datatable-filter table-responsive">
            <table className="table datatable">
              <thead className="thead-light">
                <tr>
                  <th className="no-sort">
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" id="select-all" />
                    </div>
                  </th>
                  <th>Invoice ID</th>
                  <th>Client Name</th>
                  <th>Company Name</th>
                  <th>Created Date</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>{transaction.invoiceId}</td>
                    <td>
                      <div className="d-flex align-items-center file-name-icon">
                        <Link to="#" className="avatar avatar-md border avatar-rounded">
                          <img src={transaction.clientImage} className="img-fluid" alt="img" />
                        </Link>
                        <div className="ms-2">
                          <h6 className="fw-medium"><Link to="#">{transaction.clientName}</Link></h6>
                          <span className="fs-12 fw-normal">{transaction.position}</span>
                        </div>
                      </div>
                    </td>
                    <td>{transaction.companyName}</td>
                    <td>{transaction.createdDate}</td>
                    <td>{transaction.dueDate}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <span className={`badge ${transaction.statusClass}`}>{transaction.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* /Payment Transaction List */}
    </div>
     <EmployerAdminFooter />
    </>
  );
};

export default Transactions;