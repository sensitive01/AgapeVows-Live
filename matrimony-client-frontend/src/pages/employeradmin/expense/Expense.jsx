import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const Expenses = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Expense cards data
    const expenseCards = [
        {
            id: 1,
            title: "Total Expense",
            amount: "$45,221",
            icon: "ti ti-brand-shopee",
            bgClass: "bg-transparent-primary",
            borderClass: "border-primary",
            textClass: "text-primary",
            trendIcon: "ti ti-arrow-wave-right-up",
            trendText: "+20.01%",
            trendClass: "text-success",
            image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/reports-img/total-expense.svg"
        },
        {
            id: 2,
            title: "Approved Expense",
            amount: "$45,221",
            icon: "ti ti-brand-shopee",
            bgClass: "bg-transparent-success",
            borderClass: "border-success",
            textClass: "text-success",
            trendIcon: "ti ti-arrow-wave-right-up",
            trendText: "+17.01%",
            trendClass: "text-success",
            image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/reports-img/approved-expense.svg"
        },
        {
            id: 3,
            title: "Net Pay",
            amount: "$45,221,45",
            icon: "ti ti-brand-shopee",
            bgClass: "bg-transparent-skyblue",
            borderClass: "border-skyblue",
            textClass: "text-skyblue",
            trendIcon: "ti ti-arrow-wave-right-up",
            trendText: "+10.13%",
            trendClass: "text-success",
            image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/reports-img/pending-expense.svg"
        },
        {
            id: 4,
            title: "Allowances",
            amount: "$45,221,45",
            icon: "ti ti-brand-shopee",
            bgClass: "bg-transparent-danger",
            borderClass: "border-danger",
            textClass: "text-danger",
            trendIcon: "ti ti-arrow-wave-right-up",
            trendText: "-10.17%",
            trendClass: "text-danger",
            image: "https://smarthr.dreamstechnologies.com/html/template/assets/img/reports-img/reject-expense.svg"
        }
    ];

    // Consolidated expenses data
    const consolidatedExpenses = [
        { id: 1, name: "Online Course", date: "14 Jan 2024", method: "Cash", amount: "$3000" },
        { id: 2, name: "Travel", date: "20 Feb 2024", method: "Cheque", amount: "$2800" },
        { id: 3, name: "Office Supplies", date: "15 Mar 2024", method: "Cash", amount: "$3300" },
        { id: 4, name: "Welcome Kit", date: "12 Apr 2024", method: "Cheque", amount: "$3600" },
        { id: 5, name: "Equipment", date: "20 Apr 2024", method: "Cheque", amount: "$2000" },
        { id: 6, name: "Miscellaneous", date: "06 Jul 2024", method: "Cash", amount: "$3400" },
        { id: 7, name: "Payroll", date: "02 Sep 2024", method: "Cheque", amount: "$4000" },
        { id: 8, name: "Cafeteria", date: "15 Nov 2024", method: "Cash", amount: "$4500" },
        { id: 9, name: "Cleaning Supplies", date: "10 Dec 2024", method: "Cheque", amount: "$3800" }
    ];

    // Expenses list data
    const expensesList = [
        { id: 1, name: "Online Course", date: "14 Jan 2024", method: "Cash", amount: "$3000" },
        { id: 2, name: "Employee Benefits", date: "21 Jan 2024", method: "Cash", amount: "$2500" },
        { id: 3, name: "Travel", date: "20 Feb 2024", method: "Cheque", amount: "$2800" },
        { id: 4, name: "Office Supplies", date: "15 Mar 2024", method: "Cash", amount: "$3300" },
        { id: 5, name: "Welcome Kit", date: "12 Apr 2024", method: "Cheque", amount: "$3600" },
        { id: 6, name: "Equipment", date: "20 Apr 2024", method: "Cheque", amount: "$2000" },
        { id: 7, name: "Miscellaneous", date: "06 Jul 2024", method: "Cash", amount: "$3400" },
        { id: 8, name: "Payroll", date: "02 Sep 2024", method: "Cheque", amount: "$4000" },
        { id: 9, name: "Cafeteria", date: "15 Nov 2024", method: "Cash", amount: "$4500" },
        { id: 10, name: "Cleaning Supplies", date: "10 Dec 2024", method: "Cheque", amount: "$3800" }
    ];

    return (
        <>
            <EmployerAdminHeader />
            <div className="content">
                <div className="row">
                    {/* Total Expenses */}
                    <div className="col-xl-6 d-flex">
                        <div className="row flex-fill">
                            {expenseCards.map((card) => (
                                <div key={card.id} className="col-md-6 d-flex">
                                    <div className="card flex-fill position-relative">
                                        <span className="position-absolute start-0 bottom-0">
                                            <img src={card.image} alt="img" className="img-fluid" />
                                        </span>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center justify-content-between mb-2">
                                                <div>
                                                    <span className="fs-14 fw-normal text-truncate mb-1">{card.title}</span>
                                                    <h5>{card.amount}</h5>
                                                </div>
                                                <Link to="#" className={`avatar avatar-md avatar-rounded ${card.bgClass} ${card.borderClass}`}>
                                                    <span className={card.textClass}><i className={card.icon}></i></span>
                                                </Link>
                                            </div>
                                            <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                                                <span className={`${card.trendClass} fs-12 d-flex align-items-center me-1`}>
                                                    <i className={`${card.trendIcon} me-1`}></i>{card.trendText}
                                                </span> from last week
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* /Total Expenses */}

                    {/* Expense Chart */}
                    <div className="col-xl-6 d-flex">
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
                                <div id="expense-analysis"></div>
                            </div>
                        </div>
                    </div>
                    {/* /Expense Chart */}
                </div>

                {/* Consolidated Expenses */}
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h5>Consolidated Expenses</h5>
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
                                        <Link to="#" className="dropdown-item rounded-1">$3800</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">$4500</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">$3400</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="dropdown me-2">
                                <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                                    Payment Type
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end p-3">
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">Cash</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">Cheque</Link>
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
                                        <th>Expense Name</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consolidatedExpenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className="fs-14 fw-medium">{expense.name}</h6>
                                            </td>
                                            <td>{expense.date}</td>
                                            <td>{expense.method}</td>
                                            <td>{expense.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /Consolidated Expenses */}

                {/* Expenses List */}
                <div className="card">
                    <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                        <h5>Expenses List</h5>
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
                                        <Link to="#" className="dropdown-item rounded-1">$0.00 - $00</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">$3000</Link>
                                    </li>
                                    <li>
                                        <Link to="#" className="dropdown-item rounded-1">$2500</Link>
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
                            <div className="me-2">
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
                            <button onClick={() => setShowAddModal(true)} className="btn btn-primary d-flex align-items-center">
                                <i className="ti ti-circle-plus me-2"></i>Add New Expenses
                            </button>
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
                                        <th>Expense Name</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Amount</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expensesList.map((expense) => (
                                        <tr key={expense.id}>
                                            <td>
                                                <div className="form-check form-check-md">
                                                    <input className="form-check-input" type="checkbox" />
                                                </div>
                                            </td>
                                            <td>{expense.name}</td>
                                            <td>{expense.date}</td>
                                            <td>{expense.method}</td>
                                            <td>{expense.amount}</td>
                                            <td>
                                                <div className="action-icon d-inline-flex">
                                                    <Link to="#" className="me-2" onClick={() => setShowEditModal(true)}>
                                                        <i className="ti ti-edit"></i>
                                                    </Link>
                                                    <Link to="#" onClick={() => setShowDeleteModal(true)}>
                                                        <i className="ti ti-trash text-danger"></i>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* /Expenses List */}

                {/* Add Expenses Modal */}
                {showAddModal && (
                    <div className="modal fade show" style={{ display: 'block' }} id="add_expenses">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Add Expenses</h4>
                                    <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
                                        <i className="ti ti-x"></i>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Expenses</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Date</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Amount</label>
                                                    <input type="text" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Payment Method</label>
                                                    <select className="select">
                                                        <option>Select</option>
                                                        <option>Cash</option>
                                                        <option>Cheque</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-white border me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">Add Expenses</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/* /Add Expenses Modal */}

                {/* Edit Expenses Modal */}
                {showEditModal && (
                    <div className="modal fade show" style={{ display: 'block' }} id="edit_expenses">
                        <div className="modal-dialog modal-dialog-centered modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Edit Expenses</h4>
                                    <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
                                        <i className="ti ti-x"></i>
                                    </button>
                                </div>
                                <form>
                                    <div className="modal-body pb-0">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Expenses</label>
                                                    <input type="text" defaultValue="Online Course" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Date</label>
                                                    <div className="input-icon-end position-relative">
                                                        <input type="text" defaultValue="14 Apr 2024" className="form-control datetimepicker" placeholder="dd/mm/yyyy" />
                                                        <span className="input-icon-addon">
                                                            <i className="ti ti-calendar text-gray-7"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Amount</label>
                                                    <input type="text" defaultValue="$3000" className="form-control" />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Payment Method</label>
                                                    <select className="select">
                                                        <option>Cash</option>
                                                        <option>Cheque</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-white border me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
                                        <button type="submit" className="btn btn-primary">Save Changes</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
                {/* /Edit Expenses Modal */}

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="modal fade show" style={{ display: 'block' }} id="delete_modal">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body text-center">
                                    <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                                        <i className="ti ti-trash-x fs-36"></i>
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

export default Expenses;