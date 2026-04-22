import React, { useState } from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
import AddNotificationModal from './Modal/AddNotificationsModal';
import EditNotificationModal from './Modal/EditNotificationsModal';

const Notification = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

    const notificationsData = [
        {
            id: 1,
            title: "We scheduled a meeting for next week",
            type: "Meeting",
            typeClass: "badge-pink-transparent",
            typeIcon: "ti ti-device-computer-camera",
            dueDate: "16 Jan 2024",
            owner: "Hendry Milner",
            createdDate: "14 Jan 2024"
        },
        {
            id: 2,
            title: "Had conversation with Fred regarding task",
            type: "Calls",
            typeClass: "badge-purple-transparent",
            typeIcon: "ti ti-phone",
            dueDate: "24 Jan 2024",
            owner: "Guilory Berggren",
            createdDate: "21 Jan 2024"
        },
        {
            id: 3,
            title: "Analysing latest time estimation for new project",
            type: "Tasks",
            typeClass: "badge-info-transparent",
            typeIcon: "ti ti-subtask",
            dueDate: "23 Feb 2024",
            owner: "Jami Carlile",
            createdDate: "20 Feb 2024"
        },
        {
            id: 4,
            title: "Store and manage contact data",
            type: "Email",
            typeClass: "badge-warning-transparent",
            typeIcon: "ti ti-mail",
            dueDate: "18 Mar 2024",
            owner: "Theresa Nelson",
            createdDate: "15 Mar 2024"
        },
        {
            id: 5,
            title: "Call John and discuss about project",
            type: "Calls",
            typeClass: "badge-purple-transparent",
            typeIcon: "ti ti-phone",
            dueDate: "14 Apr 2024",
            owner: "Smith Cooper",
            createdDate: "12 Apr 2024"
        },
        {
            id: 6,
            title: "Will have a meeting before project start",
            type: "Meeting",
            typeClass: "badge-pink-transparent",
            typeIcon: "ti ti-device-computer-camera",
            dueDate: "22 Apr 2024",
            owner: "Martin Lewis",
            createdDate: "20 Apr 2024"
        },
        {
            id: 7,
            title: "Built landing pages",
            type: "Email",
            typeClass: "badge-warning-transparent",
            typeIcon: "ti ti-device-computer-camera",
            dueDate: "08 Jul 2024",
            owner: "Newell Egan",
            createdDate: "06 Jul 2024"
        },
        {
            id: 8,
            title: "Discussed budget proposal with Edwin",
            type: "Calls",
            typeClass: "badge-purple-transparent",
            typeIcon: "ti ti-phone",
            dueDate: "05 Sep 2024",
            owner: "Janet Carlson",
            createdDate: "02 Sep 2024"
        },
        {
            id: 9,
            title: "Attach final proposal for upcoming project",
            type: "Tasks",
            typeClass: "badge-info-transparent",
            typeIcon: "ti ti-subtask",
            dueDate: "18 Nov 2024",
            owner: "Craig Byrne",
            createdDate: "15 Nov 2024"
        },
        {
            id: 10,
            title: "Regarding latest updates in project",
            type: "Meeting",
            typeClass: "badge-pink-transparent",
            typeIcon: "ti ti-device-computer-camera",
            dueDate: "12 Dec 2024",
            owner: "Daniel Brown",
            createdDate: "10 Dec 2024"
        }
    ];

    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                {/* Notifications Header */}
                <div className="card border border-dark shadow">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h5><i className="ti ti-info-circle text-primary"></i> Notifications</h5>
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
                                <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                    Notifications Type
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Meeting</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Calls</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Tasks</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Email</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown me-2">
                                <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                    Sort By : Last 7 Days
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="me-2">
                                <div className="dropdown">
                                    <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                        <i className="ti ti-file-export me-1"></i>Export
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end p-3">
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <button onClick={() => setShowAddModal(true)} className="btn btn-primary d-flex align-items-center">
                                <i className="ti ti-circle-plus me-2"></i>Add Notification
                            </button>
                        </div>
                    </div>
                </div>

                {/* Notifications Table */}
                <div className="card border border-dark shadow">
                    <div className="card-body">
                        <div className="custom-datatable-filter table-responsive">
                            <table className="table datatable">
                                <thead className="thead-light">
                                    <tr>
                                        <th className="no-sort">
                                            <div className="form-check form-check-md">
                                                <input className="form-check-input" type="checkbox" id="select-all" />
                                            </div>
                                        </th>
                                        <th>Title</th>
                                        <th>Notifications Type</th>
                                        <th>Due Date</th>
                                        <th>Owner</th>
                                        <th>Created Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notificationsData.map((notification) => (
                                        <tr key={notification.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td>
                                            <td><p className="fs-14 text-dark fw-medium">{notification.title}</p></td>
                                            <td>
                                                <span className={`badge ${notification.typeClass}`}>
                                                    <i className={`${notification.typeIcon} me-1`}></i>{notification.type}
                                                </span>
                                            </td>
                                            <td>{notification.dueDate}</td>
                                            <td>{notification.owner}</td>
                                            <td>{notification.createdDate}</td>
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <a href="#" className="me-2"  onClick={() => setShowEditModal(true)} >
                                                        <i className="ti ti-edit"></i>
                                                    </a>
                                                    <a href="#" onClick={toggleDeleteModal}>
                                                        <i className="ti ti-trash text-danger"></i>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="modal fade show" id="delete_modal" style={{ display: 'block', paddingRight: '17px' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                                        <i className="ti ti-trash text-danger-x fs-36"></i>
                                    </span>
                                    <h4 className="mb-1">Confirm Delete</h4>
                                    <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
                                    <div className="d-flex justify-content-center">
                                        <button type="button" className="btn btn-light me-3" onClick={toggleDeleteModal}>Cancel</button>
                                        <button type="button" className="btn btn-danger">Yes, Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showDeleteModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
                <AddNotificationModal
                    show={showAddModal}
                    onClose={() => setShowAddModal(false)}
                />
                  <EditNotificationModal
                    show={showEditModal}
                    onClose={() => setShowEditModal(false)}
                />
            </div>
            <EmployerAdminFooter />
        </>
    );
};

export default Notification;