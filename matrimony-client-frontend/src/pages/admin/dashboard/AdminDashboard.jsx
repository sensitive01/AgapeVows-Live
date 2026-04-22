
import React, { useState } from 'react';
import AddTodoModal from './modal/AddTodoModal';
import AddTeacherModal from './modal/AddTeacherModal';
import AddLeavesModal from './modal/AddLeavesModal';
import AddUserModal from './modal/AddUserModal';
import user19 from '../../../assets/employer-admin/assets/img/profiles/avatar-31.jpg';
// Add these imports at the top of your file with the other imports
import user01 from '../../../assets/employer-admin/assets/img/profiles/avatar-01.jpg';
import user02 from '../../../assets/employer-admin/assets/img/profiles/avatar-02.jpg';
import user03 from '../../../assets/employer-admin/assets/img/profiles/avatar-03.jpg';
import user05 from '../../../assets/employer-admin/assets/img/profiles/avatar-05.jpg';
import user06 from '../../../assets/employer-admin/assets/img/profiles/avatar-06.jpg';
import user07 from '../../../assets/employer-admin/assets/img/profiles/avatar-07.jpg';
import user08 from '../../../assets/employer-admin/assets/img/profiles/avatar-08.jpg';
import user09 from '../../../assets/employer-admin/assets/img/profiles/avatar-09.jpg';
import user11 from '../../../assets/employer-admin/assets/img/profiles/avatar-11.jpg';
import user12 from '../../../assets/employer-admin/assets/img/profiles/avatar-12.jpg';
import user13 from '../../../assets/employer-admin/assets/img/profiles/avatar-13.jpg';
import user14 from '../../../assets/employer-admin/assets/img/profiles/avatar-14.jpg';
import user15 from '../../../assets/employer-admin/assets/img/profiles/avatar-15.jpg';
import user16 from '../../../assets/employer-admin/assets/img/profiles/avatar-16.jpg';
import user17 from '../../../assets/employer-admin/assets/img/profiles/avatar-17.jpg';
import user18 from '../../../assets/employer-admin/assets/img/profiles/avatar-18.jpg';
// import user19 from '../../../assets/employer-admin/assets/img/profiles/avatar-19.jpg';
// import user20 from '../../../assets/employer-admin/assets/img/profiles/avatar-20.jpg';
// import user22 from '../../../assets/employer-admin/assets/img/profiles/avatar-22.jpg';
import user23 from '../../../assets/employer-admin/assets/img/profiles/avatar-23.jpg';
import user24 from '../../../assets/employer-admin/assets/img/profiles/avatar-24.jpg';
import user27 from '../../../assets/employer-admin/assets/img/profiles/avatar-27.jpg';
import user29 from '../../../assets/employer-admin/assets/img/profiles/avatar-29.jpg';
import user30 from '../../../assets/employer-admin/assets/img/profiles/avatar-30.jpg';
import user31 from '../../../assets/employer-admin/assets/img/profiles/avatar-31.jpg';
// import {user11} from '../../../assets/employer-admin/assets/img/profiles/avatar-32.jpg';
// import {user11} from '../../../assets/employer-admin/assets/img/profiles/avatar-34.jpg';
// import {user11} from '../../../assets/employer-admin/assets/img/profiles/avatar-37.jpg';
// import user38 from '../../../assets/employer-admin/assets/img/profiles/avatar-38.jpg';
// import user39 from '../../../assets/employer-admin/assets/img/profiles/avatar-39.jpg';
// import user40 from '../../../assets/employer-admin/assets/img/profiles/avatar-40.jpg';
// import user42 from '../../../assets/employer-admin/assets/img/profiles/avatar-42.jpg';
// import user44 from '../../../assets/employer-admin/assets/img/profiles/avatar-44.jpg';
// import user49 from '../../../assets/employer-admin/assets/img/profiles/avatar-49.jpg';
// import user55 from '../../../assets/employer-admin/assets/img/profiles/avatar-55.jpg';
// import user58 from '../../../assets/employer-admin/assets/img/profiles/avatar-58.jpg';

// For the icon/images (if needed)
import appleIcon from '../../../assets/employer-admin/assets/img/icons/apple.svg';
import phpIcon from '../../../assets/employer-admin/assets/img/icons/php.svg';
import reactIcon from '../../../assets/employer-admin/assets/img/icons/react.svg';
import laravelIcon from '../../../assets/employer-admin/assets/img/icons/laravel-icon.svg';
import AdminHeader from '../layout/AdminHeader';
import AdminFooter from '../layout/AdminFooter';

const AdminDashboard = () => {
    const [showTodotModal, setShowTodoModal] = useState(false);
    const [showTeacherModal, setShowTeacherModal] = useState(false);
    const [showLeaveModal, setShowLeaveModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    return (
        <>
            <AdminHeader />
            <div className="content">
                {/* Welcome Wrap */}
                <div className="card">
                    <div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
                        <div className="d-flex align-items-center mb-3">
                            <span className="avatar avatar-xl flex-shrink-0">
                                <img src={user09} className="rounded-circle" alt="img" />
                            </span>
                            <div className="ms-3">
                                <h3 className="mb-2">Welcome Back, School <a href="/employer-admin/school-profile" className="edit-icon"><i className="ti ti-edit fs-14"></i></a></h3>
                                <p>You have <span className="text-primary text-decoration-underline">21</span> Pending Approvals & <span className="text-primary text-decoration-underline">14</span> Leave Requests</p>
                            </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap mb-1">
                            <a className="btn btn-primary btn-md me-2 mb-2" onClick={() => setShowUserModal(true)}><i className="ti ti-user-check me-1"></i>Add User</a>
                            <a className="btn btn-secondary btn-md me-2 mb-2" onClick={() => setShowTeacherModal(true)}><i className="ti ti-square-rounded-plus me-1"></i>Add Teacher</a>
                            <a className="btn btn-default border border-dark btn-md mb-2" onClick={() => setShowLeaveModal(true)}><i className="ti ti-user-plus me-1"></i>Add Leave Requests</a>
                        </div>
                    </div>
                </div>
                {/* /Welcome Wrap */}

                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-center mb-4">
                            <div className="col-md-5">
                                <div className="mb-3 mb-md-0">
                                    <h4 className="mb-1">Attendance Details Today</h4>
                                    <p>Data from the 800+ total no of employees</p>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <div className="d-flex align-items-center justify-content-md-end">
                                    <h6>Total Absenties today</h6>
                                    <div className="avatar-list-stacked avatar-group-sm ms-4">
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src={user02} alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src={user03} alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src={user05} alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src={user06} alt="img" />
                                        </span>
                                        <span className="avatar avatar-rounded">
                                            <img className="border border-white" src={user07} alt="img" />
                                        </span>
                                        <a className="avatar bg-primary avatar-rounded text-fixed-white fs-12" href="javascript:void(0);">
                                            +1
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded">
                            <div className="row gx-0">
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Present</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>250</h5>
                                            <span className="badge badge-success d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                +1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Late Login</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>45</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Uninformed</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>15</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -12%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 border-end bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Permisson</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>03</h5>
                                            <span className="badge badge-success d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                +1%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md col-sm-4 bg-light">
                                    <div className="p-3">
                                        <span className="fw-medium mb-1 d-block">Absent</span>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <h5>12</h5>
                                            <span className="badge badge-danger d-inline-flex align-items-center">
                                                <i className="ti ti-arrow-wave-right-down me-1"></i>
                                                -19%
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Widget Info */}
                    <div className="col-xxl-8 d-flex">
                        <div className="row flex-fill">
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-primary mb-2">
                                            <i className="ti ti-calendar-share fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
                                        <h3 className="mb-3">120/154 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
                                        <a href="/employer-admin/dashboard" className="link-default">View Details</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-secondary mb-2">
                                            <i className="ti ti-browser fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Total No of Candidates</h6>
                                        <h3 className="mb-3">90/125 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-2.1%</span></h3>
                                        <a href="/employer-admin/Candidates" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-info mb-2">
                                            <i className="ti ti-users-group fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Total No of Jobs</h6>
                                        <h3 className="mb-3">69/86 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-11.2%</span></h3>
                                        <a href="jobs" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-pink mb-2">
                                            <i className="ti ti-checklist fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Total No of Tasks</h6>
                                        <h3 className="mb-3">225/28 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-down me-1"></i>+11.2%</span></h3>
                                        <a href="tasks" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-purple mb-2">
                                            <i className="ti ti-moneybag fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Overall Spent</h6>
                                        <h3 className="mb-3">$21445 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+10.2%</span></h3>
                                        <a href="expenses" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-danger mb-2">
                                            <i className="ti ti-browser fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Spent This Week</h6>
                                        <h3 className="mb-3">$5,544 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
                                        <a href="transactions" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-success mb-2">
                                            <i className="ti ti-users-group fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">Job Applicants</h6>
                                        <h3 className="mb-3">98 <span className="fs-12 fw-medium text-success"><i className="fa-solid fa-caret-up me-1"></i>+2.1%</span></h3>
                                        <a href="jobs" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 d-flex">
                                <div className="card flex-fill">
                                    <div className="card-body">
                                        <span className="avatar rounded-circle bg-dark mb-2">
                                            <i className="ti ti-user-star fs-16"></i>
                                        </span>
                                        <h6 className="fs-13 fw-medium text-default mb-1">New Hire</h6>
                                        <h3 className="mb-3">45/48 <span className="fs-12 fw-medium text-danger"><i className="fa-solid fa-caret-down me-1"></i>-11.2%</span></h3>
                                        <a href="candidates" className="link-default">View All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Widget Info */}

                    {/* Todo */}
                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Todo</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2 me-2">
                                        <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-calendar me-1"></i>Today
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a className="btn btn-primary btn-icon btn-xs rounded-circle d-flex align-items-center justify-content-center p-0 mb-2" onClick={() => setShowTodoModal(true)}><i className="ti ti-plus fs-16"></i></a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo1" />
                                        <label className="form-check-label fw-medium" htmlFor="todo1">Add Holidays</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo2" />
                                        <label className="form-check-label fw-medium" htmlFor="todo2">Add Meeting  to Candidates</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo3" />
                                        <label className="form-check-label fw-medium" htmlFor="todo3">Admission Report</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo4" />
                                        <label className="form-check-label fw-medium" htmlFor="todo4">Management Meeting</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-2 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo5" />
                                        <label className="form-check-label fw-medium" htmlFor="todo5">Add Payroll</label>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center todo-item border p-2 br-5 mb-0 bg-light">
                                    <i className="ti ti-grid-dots me-2"></i>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="todo6" />
                                        <label className="form-check-label fw-medium" htmlFor="todo6">Add Policy for Increment </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Todo */}
                </div>

                <div className="row">
                    {/* Total Employee */}
                    <div className="col-xxl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Employee Status</h5>
                                <div className="dropdown mb-2">
                                    <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="ti ti-calendar me-1"></i>This Week
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-1">
                                    <p className="fs-13 mb-3">Total Employee</p>
                                    <h3 className="mb-3">154</h3>
                                </div>
                                <div className="progress-stacked emp-stack mb-3">
                                    <div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}>
                                        <div className="progress-bar bg-warning"></div>
                                    </div>
                                    <div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" style={{ width: '20%' }}>
                                        <div className="progress-bar bg-secondary"></div>
                                    </div>
                                    <div className="progress" role="progressbar" aria-label="Segment three" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}>
                                        <div className="progress-bar bg-danger"></div>
                                    </div>
                                    <div className="progress" role="progressbar" aria-label="Segment four" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: '30%' }}>
                                        <div className="progress-bar bg-pink"></div>
                                    </div>
                                </div>
                                <div className="border mb-3">
                                    <div className="row gx-0">
                                        <div className="col-6">
                                            <div className="p-2 flex-fill border-end border-bottom bg-light">
                                                <p className="fs-13 mb-2"><i className="ti ti-square-filled text-primary fs-12 me-2"></i>Fulltime <span className="text-gray-9">(48%)</span></p>
                                                <h2 className="display-1">112</h2>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-2 flex-fill border-bottom text-end bg-light">
                                                <p className="fs-13 mb-2"><i className="ti ti-square-filled me-2 text-secondary fs-12"></i>Contract <span className="text-gray-9">(20%)</span></p>
                                                <h2 className="display-1">112</h2>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-2 flex-fill border-end bg-light">
                                                <p className="fs-13 mb-2"><i className="ti ti-square-filled me-2 text-danger fs-12"></i>Probation <span className="text-gray-9">(22%)</span></p>
                                                <h2 className="display-1">12</h2>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="p-2 flex-fill text-end bg-light">
                                                <p className="fs-13 mb-2"><i className="ti ti-square-filled text-pink me-2 fs-12"></i>WFH <span className="text-gray-9">(20%)</span></p>
                                                <h2 className="display-1">04</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mb-2">Top Performer</h6>
                                <div className="p-2 d-flex align-items-center justify-content-between border border-primary bg-primary-100 br-5 mb-4">
                                    <div className="d-flex align-items-center overflow-hidden">
                                        <span className="me-2">
                                            <i className="ti ti-award-filled text-primary fs-24"></i>
                                        </span>
                                        <a href="employee-details" className="avatar avatar-md me-2">
                                            <img src={user24} className="rounded-circle border border-white" alt="img" />
                                        </a>
                                        <div>
                                            <h6 className="text-truncate mb-1 fs-14 fw-medium"><a href="employee-details">Daniel Esbella</a></h6>
                                            <p className="fs-13">PGT Mathematics Teacher</p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="fs-13 mb-1">Performance</p>
                                        <h5 className="text-primary">99%</h5>
                                    </div>
                                </div>
                                <a href="employees" className="btn btn-light btn-md w-100">View All Employees</a>
                            </div>
                        </div>
                    </div>
                    {/* /Total Employee */}

                    {/* Attendance Overview */}
                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Attendance Overview</h5>
                                <div className="dropdown mb-2">
                                    <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="ti ti-calendar me-1"></i>Today
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="chartjs-wrapper-demo position-relative mb-4">
                                    <canvas id="attendance" height="200"></canvas>
                                    <div className="position-absolute text-center attendance-canvas">
                                        <p className="fs-13 mb-1">Total Attendance</p>
                                        <h3>120</h3>
                                    </div>
                                </div>
                                <h6 className="mb-3">Status</h6>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="f-13 mb-2"><i className="ti ti-circle-filled text-success me-1"></i>Present</p>
                                    <p className="f-13 fw-medium text-gray-9 mb-2">59%</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="f-13 mb-2"><i className="ti ti-circle-filled text-secondary me-1"></i>Late</p>
                                    <p className="f-13 fw-medium text-gray-9 mb-2">21%</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="f-13 mb-2"><i className="ti ti-circle-filled text-warning me-1"></i>Permission</p>
                                    <p className="f-13 fw-medium text-gray-9 mb-2">2%</p>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <p className="f-13 mb-2"><i className="ti ti-circle-filled text-danger me-1"></i>Absent</p>
                                    <p className="f-13 fw-medium text-gray-9 mb-2">15%</p>
                                </div>
                                <div className="bg-light br-5 box-shadow-xs p-2 pb-0 d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="d-flex align-items-center">
                                        <p className="mb-2 me-2">Total Absenties</p>
                                        <div className="avatar-list-stacked avatar-group-sm mb-2">
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user27} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user30} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img src={user14} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img src={user29} alt="img" />
                                            </span>
                                            <a className="avatar bg-primary avatar-rounded text-fixed-white fs-10" href="javascript:void(0);">
                                                +1
                                            </a>
                                        </div>
                                    </div>
                                    <a href="leaves" className="fs-13 link-primary text-decoration-underline mb-2">View Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Attendance Overview */}

                    {/* Clock-In/Out */}
                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Clock-In/Out</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-sm d-inline-flex align-items-center border-0 fs-13 me-2" data-bs-toggle="dropdown">
                                            All Departments
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Finance</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Development</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Marketing</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-calendar me-1"></i>Today
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div>
                                    <div className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5 bg-light">
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar flex-shrink-0">
                                                <img src={user24} className="rounded-circle border border-2" alt="img" />
                                            </a>
                                            <div className="ms-2">
                                                <h6 className="fs-14 fw-medium text-truncate">Daniel Esbella</h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
                                            <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between mb-3 p-2 border br-5 bg-light">
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar flex-shrink-0">
                                                <img src={user23} className="rounded-circle border border-2" alt="img" />
                                            </a>
                                            <div className="ms-2">
                                                <h6 className="fs-14 fw-medium">Doglas Martini</h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
                                            <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:36</span>
                                        </div>
                                    </div>
                                    <div className="mb-3 p-2 border br-5 bg-light">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <a href="javascript:void(0);" className="avatar flex-shrink-0">
                                                    <img src={user27} className="rounded-circle border border-2" alt="img" />
                                                </a>
                                                <div className="ms-2">
                                                    <h6 className="fs-14 fw-medium text-truncate">Brian Villalobos</h6>
                                                    <p className="fs-13">PGT Teacher</p>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <a href="javascript:void(0);" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
                                                <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between flex-wrap mt-2 border br-5 p-2 pb-0 bg-white">
                                            <div>
                                                <p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-success fs-5 me-1"></i>Clock In</p>
                                                <h6 className="fs-13 fw-normal mb-2">10:30 AM</h6>
                                            </div>
                                            <div>
                                                <p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-danger fs-5 me-1"></i>Clock Out</p>
                                                <h6 className="fs-13 fw-normal mb-2">09:45 AM</h6>
                                            </div>
                                            <div>
                                                <p className="mb-1 d-inline-flex align-items-center"><i className="ti ti-circle-filled text-warning fs-5 me-1"></i>Production</p>
                                                <h6 className="fs-13 fw-normal mb-2">09:21 Hrs</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="mb-2">Late</h6>
                                <div className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5 bg-light">
                                    <div className="d-flex align-items-center">
                                        <span className="avatar flex-shrink-0">
                                            <img src={user29} className="rounded-circle border border-2" alt="img" />
                                        </span>
                                        <div className="ms-2">
                                            <h6 className="fs-14 fw-medium text-truncate">Anthony Lewis <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i className="ti ti-clock-hour-11 me-1"></i>30 Min</span></h6>
                                            <p className="fs-13">PGT Teacher</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <a href="javascript:void(0);" className="link-default me-2"><i className="ti ti-clock-share"></i></a>
                                        <span className="fs-10 fw-medium d-inline-flex align-items-center badge badge-danger"><i className="ti ti-circle-filled fs-5 me-1"></i>08:35</span>
                                    </div>
                                </div>
                                <a href="attendance-report" className="btn btn-light btn-md w-100">View All Attendance</a>
                            </div>
                        </div>
                    </div>
                    {/* /Clock-In/Out */}
                </div>

                <div className="row">
                    <div className="col-xxl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Jobs Applicants</h5>
                                <a href="job-list" className="btn btn-light btn-md mb-2">View All</a>
                            </div>
                            <div className="card-body">
                                <ul className="nav nav-tabs tab-style-1 nav-justified d-sm-flex d-block p-0 mb-4" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link fw-medium" data-bs-toggle="tab" data-bs-target="#openings" aria-current="page" href="#openings" aria-selected="true" role="tab">Openings</a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link fw-medium active" data-bs-toggle="tab" data-bs-target="#applicants" href="#applicants" aria-selected="false" tabIndex="-1" role="tab">Applicants</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div className="tab-pane fade" id="openings">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <img src={appleIcon} className="img-fluid rounded-circle w-auto h-auto" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="javascript:void(0);">PGT Teacher</a></p>
                                                    <span className="fs-12">No of Openings : 25 </span>
                                                </div>
                                            </div>
                                            <a href="javascript:void(0);" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <img src={phpIcon} className="img-fluid w-auto h-auto" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="javascript:void(0);">PGT Teacher</a></p>
                                                    <span className="fs-12">No of Openings : 20 </span>
                                                </div>
                                            </div>
                                            <a href="javascript:void(0);" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <img src={reactIcon} className="img-fluid w-auto h-auto" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="javascript:void(0);">PGT Teacher</a></p>
                                                    <span className="fs-12">No of Openings : 30 </span>
                                                </div>
                                            </div>
                                            <a href="javascript:void(0);" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-0">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <img src={reactIcon} className="img-fluid w-auto h-auto" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="javascript:void(0);">PGT Teacher</a></p>
                                                    <span className="fs-12">No of Openings : 40 </span>
                                                </div>
                                            </div>
                                            <a href="javascript:void(0);" className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i className="ti ti-edit"></i></a>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade show active" id="applicants">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0">
                                                    <img src={user09} className="img-fluid rounded-circle" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="#">Brian Villalobos</a></p>
                                                    <span className="fs-13 d-inline-flex align-items-center">Exp : 5+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>Bengaluru</span>
                                                </div>
                                            </div>
                                            <span className="badge badge-secondary badge-xs">PGT Teacher</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0">
                                                    <img src={user03} className="img-fluid rounded-circle" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="#">Anthony Lewis</a></p>
                                                    <span className="fs-13 d-inline-flex align-items-center">Exp : 4+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
                                                </div>
                                            </div>
                                            <span className="badge badge-info badge-xs">PGT Teacher</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="d-flex align-items-center">
                                                <a href="#" className="avatar overflow-hidden flex-shrink-0">
                                                    <img src={user03} className="img-fluid rounded-circle" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="#">Stephan Peralt</a></p>
                                                    <span className="fs-13 d-inline-flex align-items-center">Exp : 6+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
                                                </div>
                                            </div>
                                            <span className="badge badge-pink badge-xs">PGT Teacher</span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mb-0">
                                            <div className="d-flex align-items-center">
                                                <a href="javascript:void(0);" className="avatar overflow-hidden flex-shrink-0">
                                                    <img src={{user11}} className="img-fluid rounded-circle" alt="img" />
                                                </a>
                                                <div className="ms-2 overflow-hidden">
                                                    <p className="text-dark fw-medium text-truncate mb-0"><a href="javascript:void(0);">Doglas Martini</a></p>
                                                    <span className="fs-13 d-inline-flex align-items-center">Exp : 2+ Years<i className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
                                                </div>
                                            </div>
                                            <span className="badge badge-purple badge-xs">PGT Teacher</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Employees</h5>
                                <a href="employees" className="btn btn-light btn-md mb-2">View All</a>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-nowrap mb-0">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Department</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="javascript:void(0);" className="avatar">
                                                            <img src={user03} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">Anthony Lewis</a></h6>
                                                            <span className="fs-12">PGT Teacher</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-secondary-transparent badge-xs">
                                                        PGT Teacher
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="#" className="avatar">
                                                            <img src={user09} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
                                                            <span className="fs-12">PGT Teacher</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-danger-transparent badge-xs">PGT Teacher</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="#" className="avatar">
                                                            <img src={user01} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
                                                            <span className="fs-12">Executive</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-info-transparent badge-xs">Marketing</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <a href="javascript:void(0);" className="avatar">
                                                            <img src={{user11}} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">Doglas Martini</a></h6>
                                                            <span className="fs-12">PGT Teacher</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className="badge badge-purple-transparent badge-xs">PGT Teacher</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="javascript:void(0);" className="avatar">
                                                            <img src={{user11}} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="javascript:void(0);">Anthony Lewis</a></h6>
                                                            <span className="fs-12">PGT Teacher</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="border-0">
                                                    <span className="badge badge-pink-transparent badge-xs">PGT Teacher</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Employees By Department</h5>
                                <div className="dropdown mb-2">
                                    <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="ti ti-calendar me-1"></i>This Week
                                    </a>
                                    <ul className="dropdown-menu  dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Week</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="card-body">
                                <div id="emp-department"></div>
                                <p className="fs-13"><i className="ti ti-circle-filled me-2 fs-8 text-primary"></i>No of
                                    Employees increased by <span className="text-success fw-bold">+20%</span> from last Week
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-7 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Funds Overview</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="dropdown-toggle btn btn-white border-0 btn-sm d-inline-flex align-items-center fs-13 me-2" data-bs-toggle="dropdown">
                                            All Departments
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Teacher</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Administration Staffs</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Trainers</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pb-0">
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="d-flex align-items-center mb-1">
                                        <p className="fs-13 text-gray-9 me-3 mb-0"><i className="ti ti-square-filled me-2 text-primary"></i>Income</p>
                                        <p className="fs-13 text-gray-9 mb-0"><i className="ti ti-square-filled me-2 text-gray-2"></i>Expenses</p>
                                    </div>
                                    <p className="fs-13 mb-1">Last Updated at 11:30PM</p>
                                </div>
                                <div id="sales-income"></div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-5 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Invoices</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="dropdown-toggle btn btn-white btn-sm d-inline-flex align-items-center fs-13 me-2 border-0" data-bs-toggle="dropdown">
                                            Invoices
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Invoices</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Paid</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Unpaid</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-calendar me-1"></i>This Week
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body pt-2">
                                <div className="table-responsive pt-1">
                                    <table className="table table-nowrap table-borderless mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="invoice-details" className="avatar">
                                                            <img src={user11}className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="invoice-details">Redesign Website</a></h6>
                                                            <span className="fs-13 d-inline-flex align-items-center">#INVOO2<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Logistics</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-13 mb-1">Payment</p>
                                                    <h6 className="fw-medium">$3560</h6>
                                                </td>
                                                <td className="px-0 text-end">
                                                    <span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="invoice-details" className="avatar">
                                                            <img src={user11} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="invoice-details">Module Completion</a></h6>
                                                            <span className="fs-13 d-inline-flex align-items-center">#INVOO5<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Yip Corp</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-13 mb-1">Payment</p>
                                                    <h6 className="fw-medium">$4175</h6>
                                                </td>
                                                <td className="px-0 text-end">
                                                    <span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="invoice-details" className="avatar">
                                                            <img src={user11} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="invoice-details">Change on Emp Module</a></h6>
                                                            <span className="fs-13 d-inline-flex align-items-center">#INVOO3<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis LLP</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-13 mb-1">Payment</p>
                                                    <h6 className="fw-medium">$6985</h6>
                                                </td>
                                                <td className="px-0 text-end">
                                                    <span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="invoice-details" className="avatar">
                                                            <img src={user11} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="invoice-details">Changes on the Board</a></h6>
                                                            <span className="fs-13 d-inline-flex align-items-center">#INVOO2<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis LLP</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-13 mb-1">Payment</p>
                                                    <h6 className="fw-medium">$1457</h6>
                                                </td>
                                                <td className="px-0 text-end">
                                                    <span className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-0">
                                                    <div className="d-flex align-items-center">
                                                        <a href="invoice-details" className="avatar">
                                                            <img src={user11} className="img-fluid rounded-circle" alt="img" />
                                                        </a>
                                                        <div className="ms-2">
                                                            <h6 className="fw-medium"><a href="invoice-details">Assets Management</a></h6>
                                                            <span className="fs-13 d-inline-flex align-items-center">#INVOO6<i className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>HCL Corp</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="fs-13 mb-1">Payment</p>
                                                    <h6 className="fw-medium">$6458</h6>
                                                </td>
                                                <td className="px-0 text-end">
                                                    <span className="badge badge-success-transparent badge-xs d-inline-flex align-items-center"><i className="ti ti-circle-filled fs-5 me-1"></i>Paid</span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <a href="invoice" className="btn btn-light btn-md w-100 mt-2">View All</a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">

                    <div className="col-xxl-8 col-xl-7 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Candidates Monthly Working Hours</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-calendar me-1"></i>This Month
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive">
                                    <table className="table table-nowrap mb-0">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Team</th>
                                                <th>Hours</th>
                                                <th>Deadline</th>
                                                <th>Priority</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-001</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user02} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user03} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user05} alt="img" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">15/255 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: '40%' }}></div>
                                                    </div>
                                                </td>
                                                <td>12 Sep 2024</td>
                                                <td>
                                                    <span className="badge badge-danger d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>High
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-002</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher </a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user06} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user07} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user08} alt="img" />
                                                        </span>
                                                        <a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">
                                                            +1
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">15/255 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "40%" }}></div>
                                                    </div>
                                                </td>
                                                <td>24 Oct 2024</td>
                                                <td>
                                                    <span className="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>Low
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-003</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user06} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user08} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user09} alt="img" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">40/255 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "50%" }}></div>
                                                    </div>
                                                </td>
                                                <td>18 Feb 2024</td>
                                                <td>
                                                    <span className="badge badge-pink d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>Medium
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-004</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user11} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user12} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user13} alt="img" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">35/155 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "50%" }}></div>
                                                    </div>
                                                </td>
                                                <td>19 Feb 2024</td>
                                                <td>
                                                    <span className="badge badge-danger d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>High
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-005</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user17} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user18} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user09} alt="img" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">50/235 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "50%" }}></div>
                                                    </div>
                                                </td>
                                                <td>18 Feb 2024</td>
                                                <td>
                                                    <span className="badge badge-pink d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>Medium
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td><a href="project-details" className="link-default">CAN-006</a></td>
                                                <td><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td>
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user06} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user08} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user09} alt="img" />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-1">40/255 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "50%" }}></div>
                                                    </div>
                                                </td>
                                                <td>20 Feb 2024</td>
                                                <td>
                                                    <span className="badge badge-success d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>Low
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-0"><a href="project-details" className="link-default">CAN-008</a></td>
                                                <td className="border-0"><h6 className="fw-medium"><a href="project-details">PGT Teacher</a></h6></td>
                                                <td className="border-0">
                                                    <div className="avatar-list-stacked avatar-group-sm">
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user15} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user15} alt="img" />
                                                        </span>
                                                        <span className="avatar avatar-rounded">
                                                            <img className="border border-white" src={user09} alt="img" />
                                                        </span>
                                                        <a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">
                                                            +2
                                                        </a>
                                                    </div>
                                                </td>
                                                <td className="border-0">
                                                    <p className="mb-1">15/255 Hrs</p>
                                                    <div className="progress progress-xs w-100" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                                                        <div className="progress-bar bg-primary" style={{ width: "45%" }}></div>
                                                    </div>
                                                </td>
                                                <td className="border-0">17 Oct 2024</td>
                                                <td className="border-0">
                                                    <span className="badge badge-pink d-inline-flex align-items-center badge-xs">
                                                        <i className="ti ti-point-filled me-1"></i>Medium
                                                    </span>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-5 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Tasks Statistics</h5>
                                <div className="d-flex align-items-center">
                                    <div className="dropdown mb-2">
                                        <a href="javascript:void(0);" className="btn btn-white border btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                            <i className="ti ti-calendar me-1"></i>This Week
                                        </a>
                                        <ul className="dropdown-menu  dropdown-menu-end p-3">
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Month</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">This Week</a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);" className="dropdown-item rounded-1">Today</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="chartjs-wrapper-demo position-relative mb-4">
                                    <canvas id="mySemiDonutChart" height="190"></canvas>
                                    <div className="position-absolute text-center attendance-canvas">
                                        <p className="fs-13 mb-1">Total Tasks</p>
                                        <h3>124/165</h3>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center flex-wrap">
                                    <div className="border-end text-center me-2 pe-2 mb-3">
                                        <p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-warning"></i>Ongoing</p>
                                        <h5>24%</h5>
                                    </div>
                                    <div className="border-end text-center me-2 pe-2 mb-3">
                                        <p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-info"></i>On Hold </p>
                                        <h5>10%</h5>
                                    </div>
                                    <div className="border-end text-center me-2 pe-2 mb-3">
                                        <p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-danger"></i>Overdue</p>
                                        <h5>16%</h5>
                                    </div>
                                    <div className="text-center me-2 pe-2 mb-3">
                                        <p className="fs-13 d-inline-flex align-items-center mb-1"><i className="ti ti-circle-filled fs-10 me-1 text-success"></i>Ongoing</p>
                                        <h5>40%</h5>
                                    </div>
                                </div>
                                <div className="bg-dark br-5 p-3 pb-0 d-flex align-items-center justify-content-between">
                                    <div className="mb-2">
                                        <h4 className="text-success">389/689 hrs</h4>
                                        <p className="fs-13 mb-0">Spent on Overall Tasks This Week</p>
                                    </div>
                                    <a href="tasks" className="btn btn-sm btn-light mb-2 text-nowrap">View All</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">


                    <div className="col-xxl-4 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Schedules</h5>
                                <a href="candidates" className="btn btn-light btn-md mb-2">View All</a>
                            </div>
                            <div className="card-body">
                                <div className="bg-light p-3 br-5 mb-4">
                                    <span className="badge badge-secondary badge-xs mb-1">PGT Teacher</span>
                                    <h6 className="mb-2 text-truncate">Interview Candidates - PGT Teacher</h6>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb 2025</p>
                                        <p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>01:00 PM - 02:20 PM</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
                                        <div className="avatar-list-stacked avatar-group-sm">
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user11} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user13} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user11} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user03} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user11} alt="img" />
                                            </span>
                                            <a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">
                                                +3
                                            </a>
                                        </div>
                                        <a href="#" className="btn btn-primary btn-xs">Join Meeting</a>
                                    </div>
                                </div>
                                <div className="bg-light p-3 br-5 mb-0">
                                    <span className="badge badge-dark badge-xs mb-1">PGT Teacher</span>
                                    <h6 className="mb-2 text-truncate">Interview Candidates - PGT Teacher</h6>
                                    <div className="d-flex align-items-center flex-wrap">
                                        <p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb 2025</p>
                                        <p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>02:00 PM - 04:20 PM</p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
                                        <div className="avatar-list-stacked avatar-group-sm">
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user09} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user09} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user09} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user09} alt="img" />
                                            </span>
                                            <span className="avatar avatar-rounded">
                                                <img className="border border-white" src={user09} alt="img" />
                                            </span>
                                            <a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium" href="javascript:void(0);">
                                                +3
                                            </a>
                                        </div>
                                        <a href="#" className="btn btn-primary btn-xs">Join Meeting</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Recent Activities</h5>
                                <a href="activity" className="btn btn-light btn-md mb-2">View All</a>
                            </div>
                            <div className="card-body">
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user11} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Matt Morgan</a></h6>
                                                    <p className="fs-13">05:30 PM</p>
                                                </div>
                                                <p className="fs-13">Added New Project <span className="text-primary">HRMS Dashboard</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user01} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Jay Ze</a></h6>
                                                    <p className="fs-13">05:00 PM</p>
                                                </div>
                                                <p className="fs-13">Commented on Uploaded Document</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user09} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Mary Donald</a></h6>
                                                    <p className="fs-13">05:30 PM</p>
                                                </div>
                                                <p className="fs-13">Approved Task Candidates</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user09} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">George David</a></h6>
                                                    <p className="fs-13">06:00 PM</p>
                                                </div>
                                                <p className="fs-13">Requesting Access to Module Tickets</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user02} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Aaron Zeen</a></h6>
                                                    <p className="fs-13">06:30 PM</p>
                                                </div>
                                                <p className="fs-13">Downloaded App Reportss</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="recent-item">
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex align-items-center w-100">
                                            <a href="javscript:void(0);" className="avatar  flex-shrink-0">
                                                <img src={user08} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 flex-fill">
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <h6 className="fs-medium text-truncate"><a href="javscript:void(0);">Hendry Daniel</a></h6>
                                                    <p className="fs-13">05:30 PM</p>
                                                </div>
                                                <p className="fs-13">Completed New Project <span>HMS</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-6 d-flex">
                        <div className="card flex-fill">
                            <div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
                                <h5 className="mb-2">Birthdays</h5>
                                <a href="javascript:void(0);" className="btn btn-light btn-md mb-2">View All</a>
                            </div>
                            <div className="card-body pb-1">
                                <h6 className="mb-2">Today</h6>
                                <div className="bg-light p-2 border border-dashed rounded-top mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar">
                                                <img src={user09} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 overflow-hidden">
                                                <h6 className="fs-medium ">Andrew Jermia</h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
                                    </div>
                                </div>
                                <h6 className="mb-2">Tomorow</h6>
                                <div className="bg-light p-2 border border-dashed rounded-top mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar">
                                                <img src={{user11}} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 overflow-hidden">
                                                <h6 className="fs-medium"><a href="javascript:void(0);">Mary Zeen</a></h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
                                    </div>
                                </div>
                                <div className="bg-light p-2 border border-dashed rounded-top mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <a href="javascript:void(0);" className="avatar">
                                                <img src={user09} className="rounded-circle" alt="img" />
                                            </a>
                                            <div className="ms-2 overflow-hidden">
                                                <h6 className="fs-medium "><a href="javascript:void(0);">Antony Lewis</a></h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
                                    </div>
                                </div>
                                <h6 className="mb-2">25 Jan 2025</h6>
                                <div className="bg-light p-2 border border-dashed rounded-top mb-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <span className="avatar">
                                                <img src={user12} className="rounded-circle" alt="img" />
                                            </span>
                                            <div className="ms-2 overflow-hidden">
                                                <h6 className="fs-medium ">Doglas Martini</h6>
                                                <p className="fs-13">PGT Teacher</p>
                                            </div>
                                        </div>
                                        <a href="javascript:void(0);" className="btn btn-secondary btn-xs"><i className="ti ti-cake me-1"></i>Send</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <AddTodoModal
                show={showTodotModal}
                onClose={() => setShowTodoModal(false)}

            />
            <AddTeacherModal
                show={showTeacherModal}
                onClose={() => setShowTeacherModal(false)}

            />
            <AddLeavesModal
                show={showLeaveModal}
                onClose={() => setShowLeaveModal(false)}

            />
            <AddUserModal
                show={showUserModal}
                onClose={() => setShowUserModal(false)}

            />

            <AdminFooter />
        </>
    );
};
export default AdminDashboard;
