import React, { useState } from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const LeavesManagement = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    // Sample data for leaves
    const leaves = [
        {
            id: 1,
            employee: {
                name: 'Anthony Lewis',
                avatar: 'https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-32.jpg',
                department: 'Finance'
            },
            leaveType: 'Medical Leave',
            from: '14 Jan 2024',
            to: '15 Jan 2024',
            days: '2 Days',
            reason: 'I am currently experiencing a fever and need medical attention'
        },
        {
            id: 2,
            employee: {
                name: 'Brian Villalobos',
                avatar: 'https://smarthr.dreamstechnologies.com/html/template/assets/img/users/user-09.jpg',
                department: 'Developer'
            },
            leaveType: 'Casual Leave',
            from: '21 Jan 2024',
            to: '25 Jan 2024',
            days: '5 Days',
            reason: 'Personal work needs to be completed'
        },
        // Add more leave entries as needed
    ];


    // Leave types for dropdown
    const leaveTypes = ['Medical Leave', 'Casual Leave', 'Annual Leave'];
    const sortOptions = ['Recently Added', 'Ascending', 'Descending', 'Last Month', 'Last 7 Days'];

    const handleEditLeave = (leave) => {
        setSelectedLeave(leave);
        setShowEditModal(true);
    };

    const handleDeleteLeave = (leave) => {
        setSelectedLeave(leave);
        setShowDeleteModal(true);
    };

    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                {/* Breadcrumb */}
                <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
                    <div className="my-auto mb-2">
                        <h2 className="mb-1">Leaves</h2>
                    </div>
                    <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
                        <div className="me-2 mb-2">
                            <div className="input-icon-end position-relative">
                                <input
                                    type="text"
                                    className="form-control date-range bookingrange"
                                    placeholder="dd/mm/yyyy - dd/mm/yyyy"
                                />
                                <span className="input-icon-addon">
                                    <i className="ti ti-chevron-down"></i>
                                </span>
                            </div>
                        </div>

                        <div className="dropdown me-2 mb-2">
                            <button
                                className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                                type="button"
                                id="leaveTypeDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Leave Type
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                {leaveTypes.map((type, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item rounded-1" href="#!">{type}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="dropdown me-2 mb-2">
                            <button
                                className="dropdown-toggle btn btn-sm btn-white d-inline-flex align-items-center"
                                type="button"
                                id="sortDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Sort By: Last 7 Days
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end p-3">
                                {sortOptions.map((option, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item rounded-1" href="#!">{option}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="me-2 mb-2">
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                                    type="button"
                                    id="exportDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <i className="ti ti-file-export me-1"></i> Export
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                        <a className="dropdown-item rounded-1" href="#!">
                                            <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item rounded-1" href="#!">
                                            <i className="ti ti-file-type-xls me-1"></i>Export as Excel
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mb-2">
                            <button
                                className="btn btn-primary d-flex align-items-center"
                                onClick={() => setShowAddModal(true)}
                            >
                                <i className="ti ti-circle-plus me-2"></i> Add Leave
                            </button>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-green-img">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2">
                                            <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                                                <i className="ti ti-user-check text-success fs-18"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-1">Total Present</p>
                                        <h4>180/200</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-pink-img">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2">
                                            <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                                                <i className="ti ti-user-edit text-pink fs-18"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-1">Planned Leaves</p>
                                        <h4>10</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-yellow-img">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2">
                                            <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                                                <i className="ti ti-user-exclamation text-warning fs-18"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-1">Unplanned Leaves</p>
                                        <h4>10</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-blue-img">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-2">
                                            <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                                                <i className="ti ti-user-question text-info fs-18"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <p className="mb-1">Pending Requests</p>
                                        <h4>15</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Leaves List Table */}
                <div className="card">
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
                                        <th>Employee</th>
                                        <th>Leave Type</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>No of Days</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaves.map((leave) => (
                                        <tr key={leave.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <a href="#!" className="avatar avatar-md border avatar-rounded">
                                                        <img src={leave.employee.avatar} className="img-fluid" alt="img" />
                                                    </a>
                                                    <div className="ms-2">
                                                        <h6 className="fw-medium"><a href="#!">{leave.employee.name}</a></h6>
                                                        <span className="fs-12 fw-normal">{leave.employee.department}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p className="fs-14 fw-medium d-flex align-items-center mb-0">{leave.leaveType}</p>
                                                    <a
                                                        href="#!"
                                                        className="ms-2"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="right"
                                                        title={leave.reason}
                                                    >
                                                        <i className="ti ti-info-circle text-info"></i>
                                                    </a>
                                                </div>
                                            </td>
                                            <td>{leave.from}</td>
                                            <td>{leave.to}</td>
                                            <td>{leave.days}</td>
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <button
                                                        className="btn btn-link me-2"
                                                        onClick={() => handleEditLeave(leave)}
                                                    >
                                                        <i className="ti ti-edit"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-link text-danger"
                                                        onClick={() => handleDeleteLeave(leave)}
                                                    >
                                                        <i className="ti ti-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Add Leave Modal */}
                {showAddModal && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Leave</h4>
                                    <button
                                        type="button"
                                        className="btn-close custom-btn-close"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        <i className="ti ti-x"></i>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Employee Name</label>
                                                    <select className="form-select">
                                                        <option>Select</option>
                                                        <option>Anthony Lewis</option>
                                                        <option>Brian Villalobos</option>
                                                        <option>Harvey Smith</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Leave Type</label>
                                                    <select className="form-select">
                                                        <option>Select</option>
                                                        {leaveTypes.map((type, index) => (
                                                            <option key={index}>{type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">From</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control" placeholder="dd/mm/yyyy" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">To</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control" placeholder="dd/mm/yyyy" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control" placeholder="dd/mm/yyyy" disabled />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <select className="form-select">
                                                        <option>Select</option>
                                                        <option>Full Day</option>
                                                        <option>First Half</option>
                                                        <option>Second Half</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">No of Days</label>
                                                    <input type="text" className="form-control" disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Remaining Days</label>
                                                    <input type="text" className="form-control" value="8" disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Reason</label>
                                                    <textarea className="form-control" rows="3"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-light me-2"
                                            onClick={() => setShowAddModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">Add Leave</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Leave Modal */}
                {showEditModal && selectedLeave && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Leave</h4>
                                    <button
                                        type="button"
                                        className="btn-close custom-btn-close"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        <i className="ti ti-x"></i>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Employee Name</label>
                                                    <select className="form-select">
                                                        <option>{selectedLeave.employee.name}</option>
                                                        <option>Brian Villalobos</option>
                                                        <option>Harvey Smith</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Leave Type</label>
                                                    <select className="form-select">
                                                        <option>{selectedLeave.leaveType}</option>
                                                        {leaveTypes.filter(t => t !== selectedLeave.leaveType).map((type, index) => (
                                                            <option key={index}>{type}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">From</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={selectedLeave.from}
                                                            placeholder="dd/mm/yyyy"
                                                        />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">To</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={selectedLeave.to}
                                                            placeholder="dd/mm/yyyy"
                                                        />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <div className="input-icon-end position-relative">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={selectedLeave.to}
                                                            disabled
                                                        />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <select className="form-select">
                                                        <option>Select</option>
                                                        <option>Full Day</option>
                                                        <option>First Half</option>
                                                        <option>Second Half</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">No of Days</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={selectedLeave.days.split(' ')[0]}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label className="form-label">Remaining Days</label>
                                                    <input type="text" className="form-control" value="7" disabled />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <div className="form-check me-2">
                                                        <input className="form-check-input" type="radio" name="leave1" id="leave6" />
                                                        <label className="form-check-label" htmlFor="leave6">
                                                            Full Day
                                                        </label>
                                                    </div>
                                                    <div className="form-check me-2">
                                                        <input className="form-check-input" type="radio" name="leave1" id="leave5" />
                                                        <label className="form-check-label" htmlFor="leave5">
                                                            First Half
                                                        </label>
                                                    </div>
                                                    <div className="form-check me-2">
                                                        <input className="form-check-input" type="radio" name="leave1" id="leave4" />
                                                        <label className="form-check-label" htmlFor="leave4">
                                                            Second Half
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Reason</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows="3"
                                                        defaultValue={selectedLeave.reason}
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-light me-2"
                                            onClick={() => setShowEditModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                                        <i className="ti ti-trash text-danger-x fs-36"></i>
                                    </span>
                                    <h4 className="mb-1">Confirm Delete</h4>
                                    <p className="mb-3">You want to delete this leave entry. This can't be undone once you delete.</p>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-light me-3"
                                            onClick={() => setShowDeleteModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                // Handle delete logic here
                                                setShowDeleteModal(false);
                                            }}
                                        >
                                            Yes, Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Backdrop */}
                {(showAddModal || showEditModal || showDeleteModal) && (
                    <div
                        className="modal-backdrop fade show"
                        onClick={() => {
                            setShowAddModal(false);
                            setShowEditModal(false);
                            setShowDeleteModal(false);
                        }}
                    ></div>
                )}
            </div>
            <EmployerAdminFooter />
        </>
    );
};

export default LeavesManagement;