import React, { useState } from 'react';
import company01 from '../../../assets/employer-admin/assets/img/company/company-01.svg';
import company02 from '../../../assets/employer-admin/assets/img/company/company-02.svg';
import company03 from '../../../assets/employer-admin/assets/img/company/company-03.svg';
import company04 from '../../../assets/employer-admin/assets/img/company/company-04.svg';
import company05 from '../../../assets/employer-admin/assets/img/company/company-05.svg';
import company06 from '../../../assets/employer-admin/assets/img/company/company-06.svg';
import company07 from '../../../assets/employer-admin/assets/img/company/company-07.svg';
import company08 from '../../../assets/employer-admin/assets/img/company/company-08.svg';
import company09 from '../../../assets/employer-admin/assets/img/company/company-09.svg';
import company10 from '../../../assets/employer-admin/assets/img/company/company-10.svg';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import InvoiceModal from './InvoiceModal';
import DeleteModal from './DeleteModal';

const PlanSubscription = () => {
   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [showDeleteUnitModal, setShowDeleteUnitModal] = useState(false);
  const subscriptionData = [
    {
      id: 1,
      company: "BrightWave Innovations",
      logo: company01,
      plan: "Advanced (Monthly)<br>30 Days",
      payment: "Credit Card<br>$200",
      created: "12 Sep 2024",
      expires: "11 Oct 2024",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 2,
      company: "Stellar Dynamics",
      logo: company02,
      plan: "Basic (Yearly)<br>365 Days",
      payment: "Paypal<br>$600",
      created: "24 Oct 2024",
      expires: "23 Oct 2025",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 3,
      company: "Quantum Nexus",
      logo: company03,
      plan: "Advanced (Monthly)<br>30 Days",
      payment: "Debit Card<br>$200",
      created: "18 Feb 2024",
      expires: "17 Mar 2024",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 4,
      company: "EcoVision Enterprises",
      logo: company04,
      plan: "Advanced (Monthly)<br>30 Days",
      payment: "Paypal<br>$200",
      created: "17 Oct 2024",
      expires: "16 Nov 2024",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 5,
      company: "Aurora Technologies",
      logo: company05,
      plan: "Enterprise (Monthly)<br>30 Days",
      payment: "Credit Card<br>$400",
      created: "20 Jul 2024",
      expires: "19 Aug 2024",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 6,
      company: "BlueSky Ventures",
      logo: company06,
      plan: "Advanced (Monthly)<br>30 Days",
      payment: "Paypal<br>$200",
      created: "10 Apr 2024",
      expires: "19 Aug 2024",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 7,
      company: "TerraFusion Energy",
      logo: company07,
      plan: "Enterprise (Yearly)<br>365 Days",
      payment: "Credit Card<br>$4800",
      created: "29 Aug 2024",
      expires: "28 Aug 2025",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 8,
      company: "UrbanPulse Design",
      logo: company08,
      plan: "Basic (Monthly)<br>30 Days",
      payment: "Credit Card<br>$50",
      created: "22 Feb 2024",
      expires: "21 Mar 2024",
      status: "Unpaid",
      statusClass: "danger"
    },
    {
      id: 9,
      company: "Nimbus Networks",
      logo: company09,
      plan: "Basic (Yearly)<br>365 Days",
      payment: "Paypal<br>$600",
      created: "03 Nov 2024",
      expires: "02 Nov 2025",
      status: "Paid",
      statusClass: "success"
    },
    {
      id: 10,
      company: "Epicurean Delights",
      logo: company10,
      plan: "Advanced (Monthly)<br>30 Days",
      payment: "Credit Card<br>$200",
      created: "17 Dec 2024",
      expires: "16 Jan 2024",
      status: "Paid",
      statusClass: "success"
    }
  ];

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Settings</h2>
          </div>
        </div>
        {/* /Breadcrumb */}

        <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/school-profile"><i className="ti ti-settings me-2"></i>Profile Details</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/employer-admin/school-details"><i className="ti ti-world-cog me-2"></i>School Information</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="/employer-admin/plan-and-subscription"><i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan & Subscription</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="hired-candidates"><i className="ti ti-server-cog me-2"></i>Hired Candidates</a>
          </li>
        </ul>

        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12d-flex mt-3">
            <div className="card flex-fill">
              <div className="card-body bg-light shadow">
                <div className="card shadow">
                  <div className="card-body">
                    <h4>1. Basic</h4>
                    <h1 className="text-primary">$50<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
                  </div>
                </div>
                <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
                  <div className="price-hdr">
                    <h6 className="fs-14 fw-medium text-primary w-100">Features Includes</h6>
                  </div>
                  <div>
                    <span className="text-dark d-flex align-items-center mb-3"><i className="ti ti-discount-check-filled text-success me-2"></i>10 Employees</span>
                    <span className="text-dark d-flex align-items-center mb-3"><i className="ti ti-discount-check-filled text-success me-2"></i>50 Projects</span>
                    <span className="text-dark d-flex align-items-center mb-3"><i className="ti ti-discount-check-filled text-success me-2"></i>50 Clients</span>
                    <span className="text-dark d-flex align-items-center mb-3"><i className="ti ti-discount-check-filled text-success me-2"></i>50 GB Storage</span>
                    <span className="text-dark d-flex align-items-center mb-3"><i className="ti ti-circle-x-filled text-danger me-2"></i>Voice & Video Chat</span>
                    <span className="text-dark d-flex align-items-center"><i className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
                  </div>
                </div>
                <a href="#" className="btn btn-primary w-100">Change Plan</a>
              </div>
            </div>
          </div>

          <div className="col-xl-9 mt-3">
            <div className="card p-2">
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
                        <th>Subscriber</th>
                        <th>Plan</th>
                        <th>Amount</th>
                        <th>Created Date</th>
                        <th>Expiring On</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscriptionData.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="form-check form-check-md">
                              <input className="form-check-input" type="checkbox" />
                            </div>
                          </td>
                          <td>
                            <div className="d-flex align-items-center file-name-icon">
                              <a href="#" className="avatar avatar-md border rounded-circle">
                                <img src={item.logo} className="img-fluid" alt="img" />
                              </a>
                              <div className="ms-2">
                                <h6 className="fw-medium"><a href="#">{item.company}</a></h6>
                              </div>
                            </div>
                          </td>
                          <td dangerouslySetInnerHTML={{ __html: item.plan }}></td>
                          <td dangerouslySetInnerHTML={{ __html: item.payment }}></td>
                          <td>{item.created}</td>
                          <td>{item.expires}</td>
                          <td>
                            <span className={`badge badge-${item.statusClass} d-flex align-items-center badge-xs`}>
                              <i className="ti ti-point-filled me-1"></i>{item.status}
                            </span>
                          </td>
                          <td>
                            <div className="action-icon d-inline-flex">
                              <a onClick={() => setShowInvoiceModal(true)}><i className="ti ti-file-invoice"></i></a>
                              <a href="#" className="me-2"><i className="ti ti-download"></i></a>
                              <a onClick={() => setShowDeleteUnitModal(true)} href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i className="ti ti-trash text-danger"></i></a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <InvoiceModal
          show={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
        />
        <DeleteModal
          show={showDeleteUnitModal}
          onClose={() => setShowDeleteUnitModal(false)}
        />
      <EmployerAdminFooter />
    </>
  );
};

export default PlanSubscription;