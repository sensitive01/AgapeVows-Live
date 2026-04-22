import React, { useState } from 'react';

// Import all images
import user32 from '../../../assets/employer-admin/assets/img/users/user-32.jpg';
import user09 from '../../../assets/employer-admin/assets/img/users/user-09.jpg';
import user01 from '../../../assets/employer-admin/assets/img/users/user-01.jpg';
import user33 from '../../../assets/employer-admin/assets/img/users/user-34.jpg';
import user56 from '../../../assets/employer-admin/assets/img/users/user-42.jpg';
import user34 from '../../../assets/employer-admin/assets/img/users/user-34.jpg';
import user42 from '../../../assets/employer-admin/assets/img/users/user-42.jpg';
import user38 from '../../../assets/employer-admin/assets/img/users/user-38.jpg';
import user52 from '../../../assets/employer-admin/assets/img/users/user-11.jpg';
import user06 from '../../../assets/employer-admin/assets/img/users/user-09.jpg';
import user11 from '../../../assets/employer-admin/assets/img/users/user-11.jpg';
import user29 from '../../../assets/employer-admin/assets/img/users/user-11.jpg';
import user16 from '../../../assets/employer-admin/assets/img/users/user-44.jpg';
import user57 from '../../../assets/employer-admin/assets/img/users/user-55.jpg';
import user55 from '../../../assets/employer-admin/assets/img/users/user-55.jpg';
import user45 from '../../../assets/employer-admin/assets/img/users/user-44.jpg';
import user30 from '../../../assets/employer-admin/assets/img/users/user-38.jpg';
import user26 from '../../../assets/employer-admin/assets/img/users/user-20.jpg';
import user44 from '../../../assets/employer-admin/assets/img/users/user-44.jpg';
import user10 from '../../../assets/employer-admin/assets/img/users/user-10.jpg';
import apple from '../../../assets/employer-admin/assets/img/icons/apple.svg';
import php from '../../../assets/employer-admin/assets/img/icons/php.svg';
import black from '../../../assets/employer-admin/assets/img/icons/react.svg';
import react from '../../../assets/employer-admin/assets/img/icons/react.svg';
import laravel from '../../../assets/employer-admin/assets/img/icons/php.svg';
import devops from '../../../assets/employer-admin/assets/img/icons/laravel-icon.svg';
import android from '../../../assets/employer-admin/assets/img/icons/apple-logo.svg';
import html from '../../../assets/employer-admin/assets/img/icons/linkedin.svg';
import ui from '../../../assets/employer-admin/assets/img/icons/kanban-arrow.svg';
import grafic from '../../../assets/employer-admin/assets/img/icons/file-04.svg';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const Referrals = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleDeleteModal = () => setShowDeleteModal(!showDeleteModal);

    const referralsData = [
        {
            id: 1,
            referralId: "Reff-001",
            referrer: {
                name: "Anthony Lewis",
                avatar: user32,
                department: "Finance"
            },
            job: {
                title: "Senior IOS Developer",
                icon: apple
            },
            referee: {
                name: "Harold Gaynor",
                avatar: user11,
                email: "harold@example.com"
            },
            bonus: "$200"
        },
        {
            id: 2,
            referralId: "Reff-002",
            referrer: {
                name: "Brian Villalobos",
                avatar: user09,
                department: "Developer"
            },
            job: {
                title: "Junior PHP Developer",
                icon: php
            },
            referee: {
                name: "Sandra Ornellas",
                avatar: user29,
                email: "sandra@example.com"
            },
            bonus: "$100"
        },
        {
            id: 3,
            referralId: "Reff-003",
            referrer: {
                name: "Harvey Smith",
                avatar: user01,
                department: "Developer"
            },
            job: {
                title: "Network Engineer",
                icon: black
            },
            referee: {
                name: "John Harris",
                avatar: user16,
                email: "john@example.com"
            },
            bonus: "$300"
        },
        {
            id: 4,
            referralId: "Reff-004",
            referrer: {
                name: "Stephan Peralt",
                avatar: user33,
                department: "Executive Officer"
            },
            job: {
                title: "Junior React Developer",
                icon: react
            },
            referee: {
                name: "Whitney Barnette",
                avatar: user57,
                email: "whitney@example.com"
            },
            bonus: "$150"
        },
        {
            id: 5,
            referralId: "Reff-005",
            referrer: {
                name: "Doglas Martini",
                avatar: user56,
                department: "Manager"
            },
            job: {
                title: "Senior Laravel Developer",
                icon: laravel
            },
            referee: {
                name: "Richard Thompson",
                avatar: user55,
                email: "richard@example.com"
            },
            bonus: "$250"
        },
        {
            id: 6,
            referralId: "Reff-006",
            referrer: {
                name: "Linda Ray",
                avatar: user34,
                department: "Finance"
            },
            job: {
                title: "DevOps Engineer",
                icon: devops
            },
            referee: {
                name: "Kerry Drake",
                avatar: user45,
                email: "kerry@example.com"
            },
            bonus: "$400"
        },
        {
            id: 7,
            referralId: "Reff-007",
            referrer: {
                name: "Elliot Murray",
                avatar: user42,
                department: "Developer"
            },
            job: {
                title: "Junior Android Developer",
                icon: android
            },
            referee: {
                name: "David Carmona",
                avatar: user30,
                email: "david@example.com"
            },
            bonus: "$450"
        },
        {
            id: 8,
            referralId: "Reff-008",
            referrer: {
                name: "Rebecca Smtih",
                avatar: user38,
                department: "Executive"
            },
            job: {
                title: "Senior HTML Developer",
                icon: html
            },
            referee: {
                name: "Margaret Soto",
                avatar: user26,
                email: "margaret@example.com"
            },
            bonus: "$220"
        },
        {
            id: 9,
            referralId: "Reff-009",
            referrer: {
                name: "Connie Waters",
                avatar: user52,
                department: "Developer"
            },
            job: {
                title: "Junior UI/UX Designer",
                icon: ui
            },
            referee: {
                name: "Jeffrey Thaler",
                avatar: user44,
                email: "jeffrey@example.com"
            },
            bonus: "$180"
        },
        {
            id: 10,
            referralId: "Reff-010",
            referrer: {
                name: "Lori Broaddus",
                avatar: user06,
                department: "Finance"
            },
            job: {
                title: "Senior Graphic Designer",
                icon: grafic
            },
            referee: {
                name: "Joyce Golston",
                avatar: user10,
                email: "joyce@example.com"
            },
            bonus: "$250"
        }
    ];

    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h5>Job Referral List</h5>
                        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                            <div className="dropdown me-3">
                                <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                    Role
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Senior IOS Developer</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Junior PHP Developer</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" className="dropdown-item rounded-1">Network Engineer</a>
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
                                        <th>Referrals ID</th>
                                        <th>Referrer Name</th>
                                        <th>Job Referred</th>
                                        <th>Referee Name</th>
                                        <th>Referrals Bonus</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {referralsData.map((referral) => (
                                        <tr key={referral.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td>
                                            <td>{referral.referralId}</td>
                                            <td>
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <a href="#" className="avatar avatar-md">
                                                        <img src={referral.referrer.avatar} className="img-fluid rounded-circle" alt="img" />
                                                    </a>
                                                    <div className="ms-2">
                                                        <h6 className="fw-medium"><a href="#">{referral.referrer.name}</a></h6>
                                                        <span className="d-block mt-1">{referral.referrer.department}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <a href="#" className="avatar avatar-md bg-light rounded">
                                                        <img src={referral.job.icon} className="img-fluid rounded-circle" alt="img" />
                                                    </a>
                                                    <div className="ms-2">
                                                        <h6 className="fw-medium"><a href="#">{referral.job.title}</a></h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center file-name-icon">
                                                    <a href="#" className="avatar avatar-md">
                                                        <img src={referral.referee.avatar} className="img-fluid rounded-circle" alt="img" />
                                                    </a>
                                                    <div className="ms-2">
                                                        <h6 className="fw-medium"><a href="#">{referral.referee.name}</a></h6>
                                                        <span className="d-block mt-1">
                                                            <a href={`mailto:${referral.referee.email}`} className="__cf_email__">
                                                                {referral.referee.email}
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{referral.bonus}</td>
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <a href="#" className="me-2"><i className="ti ti-edit"></i></a>
                                                    <a href="#" onClick={toggleDeleteModal}><i className="ti ti-trash text-danger"></i></a>
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

                {/* Backdrop for modal */}
                {showDeleteModal && (
                    <div className="modal-backdrop fade show"></div>
                )}
            </div>
            <EmployerAdminFooter />
        </>
    );
};

export default Referrals;