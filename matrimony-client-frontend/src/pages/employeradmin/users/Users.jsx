import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import images (adjust paths as needed)
import user32 from '../../../assets/employer-admin/assets/img/users/user-32.jpg';
import user09 from '../../../assets/employer-admin/assets/img/users/user-09.jpg';
import user19 from '../../../assets/employer-admin/assets/img/users/user-19.jpg';
import user33 from '../../../assets/employer-admin/assets/img/users/user-38.jpg';
import user08 from '../../../assets/employer-admin/assets/img/users/user-08.jpg';
import user34 from '../../../assets/employer-admin/assets/img/users/user-34.jpg';
import user03 from '../../../assets/employer-admin/assets/img/users/user-08.jpg';
import user16 from '../../../assets/employer-admin/assets/img/users/user-13.jpg';
import user35 from '../../../assets/employer-admin/assets/img/users/user-37.jpg';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
const Users = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const users = [
    {
      id: 1,
      name: "Anthony Lewis",
      image: user32,
      email: "anthony@example.com",
      createdDate: "12 Sep 2024",
      role: "Employee",
      status: "Active"
    },
    {
      id: 2,
      name: "Brian Villalobos",
      image: user09,
      email: "brian@example.com",
      createdDate: "24 Oct 2024",
      role: "Employee",
      status: "Active"
    },
    {
      id: 3,
      name: "Sophie Headrick",
      image: user19,
      email: "sophie@example.com",
      createdDate: "18 Feb 2024",
      role: "Client",
      status: "Active"
    },
    {
      id: 4,
      name: "Stephan Peralt",
      image: user33,
      email: "stephan@example.com",
      createdDate: "17 Oct 2024",
      role: "Employee",
      status: "Active"
    },
    {
      id: 5,
      name: "Thomas Bordelon",
      image: user08,
      email: "thomas@example.com",
      createdDate: "20 Jul 2024",
      role: "Client",
      status: "Active"
    },
    {
      id: 6,
      name: "Doglas Martini",
      image: user34,
      email: "doglas@example.com",
      createdDate: "10 Apr 2024",
      role: "Employee",
      status: "Active"
    },
    {
      id: 7,
      name: "Cameron Drake",
      image: user03,
      email: "cameron@example.com",
      createdDate: "29 Aug 2024",
      role: "Client",
      status: "Active"
    },
    {
      id: 8,
      name: "Harvey Smith",
      image: user09,
      email: "harvey@example.com",
      createdDate: "22 Feb 2024",
      role: "Employee",
      status: "Inactive"
    },
    {
      id: 9,
      name: "Michael Walker",
      image: user16,
      email: "michael@example.com",
      createdDate: "03 Nov 2024",
      role: "Client",
      status: "Active"
    },
    {
      id: 10,
      name: "Doris Crowley",
      image: user35,
      email: "doris@example.com",
      createdDate: "17 Dec 2024",
      role: "Client",
      status: "Active"
    }
  ];

  return (
     <>
      <EmployerAdminHeader />
    <div className="content">
      {/* Breadcrumb */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1">Users</h2>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2 mb-2">
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
          <div className="mb-2">
            <button onClick={() => setShowAddModal(true)} className="btn btn-primary d-flex align-items-center">
              <i className="ti ti-circle-plus me-2"></i>Add User
            </button>
          </div>
          <div className="head-icons ms-2">
            <Link to="#" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
              <i className="ti ti-chevrons-up"></i>
            </Link>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      
      <div className="row">
        <div className="col-xl-6 d-flex">
          <div className="row flex-fill">
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">Total Users</p>
                        <h4>800</h4>
                      </div>
                    </div>
                    <div className="leave-report-icon">
                      <Link to="#">
                        <span className="p-2 border border-primary bg-transparent-primary rounded-3 d-flex align-items-center justify-content-center">
                          <i className="ti ti-user text-primary"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-success fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+20.01% 
                    </span> from last week
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">Active Users</p>
                        <h4>750</h4>
                      </div>
                    </div>
                    <div className="leave-report-icon">
                      <Link to="#">
                        <span className="p-2 border border-success bg-transparent-success rounded-3 d-flex align-items-center justify-content-center">
                          <i className="ti ti-user-check text-success"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-success fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+17.02% 
                    </span> from last week
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">New Users</p>
                        <h4>100</h4>
                      </div>
                    </div>
                    <div className="leave-report-icon">
                      <Link to="#">
                        <span className="p-2 border border-skyblue bg-transparent-skyblue rounded-3 d-flex align-items-center justify-content-center">
                          <i className="ti ti-user-up text-skyblue"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-success fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>+10.01% 
                    </span> from last week
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <div>
                        <p className="fs-12 fw-medium mb-1 text-truncate">Inactive Users</p>
                        <h4>50</h4>
                      </div>
                    </div>
                    <div className="leave-report-icon">
                      <Link to="#">
                        <span className="p-2 border border-danger bg-transparent-danger rounded-3 d-flex align-items-center justify-content-center">
                          <i className="ti ti-user-pause text-danger"></i>
                        </span>
                      </Link>
                    </div>
                  </div>
                  <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                    <span className="text-danger fs-12 d-flex align-items-center me-1">
                      <i className="ti ti-arrow-wave-right-up me-1"></i>-10.01% 
                    </span> from last week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 d-flex">
          <div className="card flex-fill">
            <div className="card-header border-0 pb-0">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <span className="me-2"><i className="ti ti-chart-bar text-danger"></i></span>
                  <h5>Users</h5>
                </div>
                <div className="d-flex align-items-center">
                  <p className="d-inline-flex align-items-center me-2 mb-0">
                    <i className="ti ti-square-filled fs-12 text-success me-2"></i>
                    Active Users
                  </p>
                  <p className="d-inline-flex align-items-center mb-0 me-2">
                    <i className="ti ti-square-filled fs-12 text-light me-2"></i>
                    Inactive Users
                  </p>
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
              <div id="user-chart"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Users List */}
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <h5>Users List</h5>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
            <div className="me-3">
              <div className="input-icon-end position-relative">
                <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
                <span className="input-icon-addon">
                  <i className="ti ti-chevron-down"></i>
                </span>
              </div>
            </div>
            <div className="dropdown me-3">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Role
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Employee</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Client</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown me-3">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                Status
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Active</Link>
                </li>
                <li>
                  <Link to="#" className="dropdown-item rounded-1">Inactive</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown">
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
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="form-check form-check-md">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center file-name-icon">
                        <Link to="#" className="avatar avatar-md avatar-rounded">
                          <img src={user.image} className="img-fluid" alt="img" />
                        </Link>
                        <div className="ms-2">
                          <h6 className="fw-medium"><Link to="#">{user.name}</Link></h6>
                        </div>
                      </div>
                    </td>
                    <td><Link to="" className="__cf_email__" data-cfemail={user.email.replace('@', '&#160;@')}>{user.email}</Link></td>
                    <td>{user.createdDate}</td>
                    <td>
                      <span className={`badge badge-md p-2 fs-10 ${user.role === "Employee" ? "badge-pink-transparent" : "badge-soft-purple"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${user.status === "Active" ? "badge-success" : "badge-danger"} d-inline-flex align-items-center badge-xs`}>
                        <i className="ti ti-point-filled me-1"></i>{user.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-icon d-inline-flex">
                        <Link to="#" className="me-2"><i className="ti ti-shield"></i></Link>
                        <Link to="#" className="me-2" onClick={() => setShowEditModal(true)}><i className="ti ti-edit"></i></Link>
                        <Link to="#" onClick={() => setShowDeleteModal(true)}><i className="ti ti-trash text-danger"></i></Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* /Users List */}

      {/* Add Users Modal */}
      {showAddModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="add_users">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add User</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group">
                          <input type="password" className="pass-input form-control" />
                          <span className="ti toggle-password ti-eye-off"></span>
                        </div>
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="pass-group">
                          <input type="password" className="pass-inputs form-control" />
                          <span className="ti toggle-passwords ti-eye-off"></span>
                        </div>
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="select">
                          <option>Select</option>
                          <option>Employee</option>
                          <option>Client</option>
                        </select>
                      </div>	
                    </div>
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th>Module Permissions</th>
                                  <th>Read</th>
                                  <th>Write</th>
                                  <th>Create</th>
                                  <th>Delete</th>
                                  <th>Import</th>
                                  <th>Export</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Employee</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Holidays</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Leaves</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Events</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>								
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-white border me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Add User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* /Add Users Modal */}

      {/* Edit Users Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="edit_user">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit User</h4>
                <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input type="text" className="form-control" value="Anthony" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input type="text" className="form-control" value="Lewis" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" className="form-control" value="anthony" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="text" className="form-control" value="anthony@example.com" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="pass-group">
                          <input type="password" className="pass-input form-control" />
                          <span className="ti toggle-password ti-eye-off"></span>
                        </div>
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="pass-group">
                          <input type="password" className="pass-inputs form-control" />
                          <span className="ti toggle-passwords ti-eye-off"></span>
                        </div>
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Phone</label>
                        <input type="text" className="form-control" value="988765544" />
                      </div>	
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Role</label>
                        <select className="select">
                          <option>Select</option>
                          <option selected>Employee</option>
                          <option>Client</option>
                        </select>
                      </div>	
                    </div>
                    <div className="col-md-12">
                      <div className="card">
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table">
                              <thead className="thead-light">
                                <tr>
                                  <th>Module Permissions</th>
                                  <th>Read</th>
                                  <th>Write</th>
                                  <th>Create</th>
                                  <th>Delete</th>
                                  <th>Import</th>
                                  <th>Export</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Employee</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Holidays</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Leaves</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <h6 className="fs-14 fw-normal text-gray-9">Events</h6>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="form-check form-check-md">
                                      <input className="form-check-input" type="checkbox" checked />
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>								
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-white border me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Update User</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* /Edit Users Modal */}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="delete_modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                  <i className="ti ti-trash text-danger-x fs-36"></i>
                </span>
                <h4 className="mb-1">Confirm Delete</h4>
                <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
                <div className="d-flex justify-content-center">
                  <button onClick={() => setShowDeleteModal(false)} className="btn btn-light me-3">Cancel</button>
                  <button className="btn btn-danger">Yes, Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* /Delete Modal */}
    </div>
     <EmployerAdminFooter />
    </>
  );
};

export default Users;