// import React, { useState } from 'react';
// import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
// import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

// const EmployeerAdminPlans = () => {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const plans = [
//     { id: 1, name: 'Basic', type: 'Monthly', subscribers: 56, price: '$50', created: '14 Jan 2024', status: 'Active' },
//     { id: 2, name: 'Advanced', type: 'Monthly', subscribers: 99, price: '$200', created: '21 Jan 2024', status: 'Active' },
//     { id: 3, name: 'Premium', type: 'Monthly', subscribers: 58, price: '$300', created: '10 Feb 2024', status: 'Active' },
//     { id: 4, name: 'Enterprise', type: 'Monthly', subscribers: 67, price: '$400', created: '18 Feb 2024', status: 'Active' },
//     { id: 5, name: 'Basic', type: 'Yearly', subscribers: 78, price: '$600', created: '15 Mar 2024', status: 'Active' },
//     { id: 6, name: 'Advanced', type: 'Yearly', subscribers: 99, price: '$2400', created: '26 Mar 2024', status: 'Active' },
//     { id: 7, name: 'Premium', type: 'Yearly', subscribers: 48, price: '$3600', created: '05 Apr 2024', status: 'Active' },
//     { id: 8, name: 'Enterprise', type: 'Yearly', subscribers: 17, price: '$4800', created: '16 Apr 2024', status: 'Active' },
//   ];

//   return (
//     <>
//     <EmployerAdminHeader/>
//     <div className="content">
//       {/* Breadcrumb */}
//       <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
//         <div className="my-auto">
//           <h2>Subscription Plans</h2>
//         </div>
//         <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
//           <div className="me-2">
//             <div className="input-icon-end position-relative">
//               <input type="text" className="form-control date-range bookingrange" placeholder="dd/mm/yyyy - dd/mm/yyyy" />
//               <span className="input-icon-addon">
//                 <i className="ti ti-chevron-down"></i>
//               </span>
//             </div>
//           </div>
//           <div className="dropdown me-2">
//             <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
//               Select Plan
//             </a>
//             <ul className="dropdown-menu dropdown-menu-end p-3">
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Monthly</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Yearly</a>
//               </li>
//             </ul>
//           </div>
//           <div className="dropdown me-2">
//             <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
//               Select Status
//             </a>
//             <ul className="dropdown-menu dropdown-menu-end p-3">
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Active</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Inactive</a>
//               </li>
//             </ul>
//           </div>
//           <div className="dropdown me-2">
//             <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
//               Sort By : Last 7 Days
//             </a>
//             <ul className="dropdown-menu dropdown-menu-end p-3">
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Recently Added</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Ascending</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Desending</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Last Month</a>
//               </li>
//               <li>
//                 <a href="javascript:void(0);" className="dropdown-item rounded-1">Last 7 Days</a>
//               </li>
//             </ul>
//           </div>
//           <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
//             <a href="plans.php" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i className="ti ti-list-tree"></i></a>
//             <a href="plans-grid.php" className="btn btn-icon btn-sm"><i className="ti ti-layout-grid"></i></a>
//           </div>
//           <div className="me-2">
//             <div className="dropdown">
//               <a href="javascript:void(0);" className="dropdown-toggle btn btn-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
//                 <i className="ti ti-file-export me-1"></i>Export
//               </a>
//               <ul className="dropdown-menu dropdown-menu-end p-3">
//                 <li>
//                   <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
//                 </li>
//                 <li>
//                   <a href="javascript:void(0);" className="dropdown-item rounded-1"><i className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <button onClick={() => setShowAddModal(true)} className="btn btn-primary d-flex align-items-center"><i className="ti ti-circle-plus me-2"></i>Add New Plan</button>
//           <div className="ms-2 head-icons">
//             <a href="javascript:void(0);" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
//               <i className="ti ti-chevrons-up"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//       {/* /Breadcrumb */}

//       <div className="row">
//         {/* Total Plans */}
//         <div className="col-lg-3 col-md-6 d-flex">
//           <div className="card flex-fill">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center overflow-hidden">
//                 <div>
//                   <p className="fs-12 fw-medium mb-1 text-truncate">Total Plans</p>
//                   <h4>08</h4>
//                 </div>
//               </div>
//               <div>
//                 <span className="avatar avatar-lg bg-primary flex-shrink-0">
//                   <i className="ti ti-box fs-16"></i>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Total Plans */}

//         {/* Total Plans */}
//         <div className="col-lg-3 col-md-6 d-flex">
//           <div className="card flex-fill">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center overflow-hidden">
//                 <div>
//                   <p className="fs-12 fw-medium mb-1 text-truncate">Active Plans</p>
//                   <h4>08</h4>
//                 </div>
//               </div>
//               <div>
//                 <span className="avatar avatar-lg bg-success flex-shrink-0">
//                   <i className="ti ti-activity-heartbeat fs-16"></i>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Total Plans */}

//         {/* Inactive Plans */}
//         <div className="col-lg-3 col-md-6 d-flex">
//           <div className="card flex-fill">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center overflow-hidden">
//                 <div>
//                   <p className="fs-12 fw-medium mb-1 text-truncate">Inactive Plans</p>
//                   <h4>0</h4>
//                 </div>
//               </div>
//               <div>
//                 <span className="avatar avatar-lg bg-danger flex-shrink-0">
//                   <i className="ti ti-player-pause fs-16"></i>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /Inactive Companies */}

//         {/* No of Plans  */}
//         <div className="col-lg-3 col-md-6 d-flex">
//           <div className="card flex-fill">
//             <div className="card-body d-flex align-items-center justify-content-between">
//               <div className="d-flex align-items-center overflow-hidden">
//                 <div>
//                   <p className="fs-12 fw-medium mb-1 text-truncate">No of Plan Types</p>
//                   <h4>02</h4>
//                 </div>
//               </div>
//               <div>
//                 <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
//                   <i className="ti ti-mask fs-16"></i>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* /No of Plans */}
//       </div>

//       <div className="card">
//         <div className="card-body p-0">
//           <div className="custom-datatable-filter table-responsive">
//             <table className="table datatable">
//               <thead className="thead-light">
//                 <tr>
//                   <th className="no-sort">
//                     <div className="form-check form-check-md">
//                       <input className="form-check-input" type="checkbox" id="select-all" />
//                     </div>
//                   </th>
//                   <th>Plan Name</th>
//                   <th>Plan Type</th>
//                   <th>Total Subscribers</th>
//                   <th>Price</th>
//                   <th>Created Date</th>
//                   <th>Status</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {plans.map(plan => (
//                   <tr key={plan.id}>
//                     <td>
//                       <div className="form-check form-check-md">
//                         <input className="form-check-input" type="checkbox" />
//                       </div>
//                     </td>
//                     <td>
//                       <h6 className="fw-medium"><a href="#">{plan.name}</a></h6>
//                     </td>
//                     <td>{plan.type}</td>
//                     <td>{plan.subscribers}</td>
//                     <td>{plan.price}</td>
//                     <td>{plan.created}</td>
//                     <td>
//                       <span className={`badge badge-${plan.status === 'Active' ? 'success' : 'danger'} d-inline-flex align-items-center badge-sm`}>
//                         <i className="ti ti-point-filled me-1"></i>{plan.status}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="action-icon d-inline-flex">
//                         <a href="#" className="me-2" onClick={(e) => { e.preventDefault(); setShowEditModal(true); }}><i className="ti ti-edit"></i></a>
//                         <a href="#" onClick={(e) => { e.preventDefault(); setShowDeleteModal(true); }}><i className="ti ti-trash text-danger"></i></a>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Add Plan Modal */}
//       {showAddModal && (
//         <div className="modal fade show" style={{ display: 'block' }} id="add_plans">
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Add New Plan</h4>
//                 <button type="button" className="btn-close custom-btn-close" onClick={() => setShowAddModal(false)}>
//                   <i className="ti ti-x"></i>
//                 </button>
//               </div>
//               <form>
//                 <div className="modal-body pb-0">
//                   <PlanForm />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-light me-2" onClick={() => setShowAddModal(false)}>Cancel</button>
//                   <button type="submit" className="btn btn-primary">Add Plan</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Plan Modal */}
//       {showEditModal && (
//         <div className="modal fade show" style={{ display: 'block' }} id="edit_plans">
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h4 className="modal-title">Edit Plan</h4>
//                 <button type="button" className="btn-close custom-btn-close" onClick={() => setShowEditModal(false)}>
//                   <i className="ti ti-x"></i>
//                 </button>
//               </div>
//               <form>
//                 <div className="modal-body pb-0">
//                   <PlanForm />
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-light me-2" onClick={() => setShowEditModal(false)}>Cancel</button>
//                   <button type="submit" className="btn btn-primary">Save Changes</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Modal */}
//       {showDeleteModal && (
//         <div className="modal fade show" style={{ display: 'block' }} id="delete_modal">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-body text-center">
//                 <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
//                   <i className="ti ti-trash text-danger-x fs-36"></i>
//                 </span>
//                 <h4 className="mb-1">Confirm Delete</h4>
//                 <p className="mb-3">You want to delete all the marked items, this cant be undone once you delete.</p>
//                 <div className="d-flex justify-content-center">
//                   <button className="btn btn-light me-3" onClick={() => setShowDeleteModal(false)}>Cancel</button>
//                   <button className="btn btn-danger">Yes, Delete</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//       <EmployerAdminFooter/>
//     </>
//   );
// };

// const PlanForm = () => {
//   return (
//     <div className="row">
//       <div className="col-md-12">
//         <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
//           <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
//             <img src="assets/img/profiles/avatar-30.jpg" alt="img" className="rounded-circle" />
//           </div>
//           <div className="profile-upload">
//             <div className="mb-2">
//               <h6 className="mb-1">Upload Profile Image</h6>
//               <p className="fs-12">Image should be below 4 mb</p>
//             </div>
//             <div className="profile-uploader d-flex align-items-center">
//               <div className="drag-upload-btn btn btn-sm btn-primary me-2">
//                 Upload
//                 <input type="file" className="form-control image-sign" multiple="" />
//               </div>
//               <a href="javascript:void(0);" className="btn btn-light btn-sm">Cancel</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-6">
//         <div className="mb-3">
//           <label className="form-label">Plan Name<span className="text-danger"> *</span></label>
//           <select className="select">
//             <option>Select</option>
//             <option>Advanced</option>
//             <option>Basic</option>
//             <option>Enterprise</option>
//           </select>
//         </div>
//       </div>
//       <div className="col-md-6">
//         <div className="mb-3">
//           <label className="form-label">Plan Type<span className="text-danger"> *</span></label>
//           <select className="select">
//             <option>Select</option>
//             <option>Monthly</option>
//             <option>Yearly</option>
//           </select>
//         </div>
//       </div>
//       <div className="col-md-6">
//         <div className="mb-3">
//           <label className="form-label">Plan Position<span className="text-danger"> *</span></label>
//           <select className="select">
//             <option>Select</option>
//             <option>1</option>
//             <option>2</option>
//             <option>3</option>
//           </select>
//         </div>
//       </div>
//       <div className="col-md-6">
//         <div className="mb-3">
//           <label className="form-label">Plan Currency<span className="text-danger"> *</span></label>
//           <select className="select">
//             <option>Select</option>
//             <option>USD</option>
//             <option>EURO</option>
//           </select>
//         </div>
//       </div>
//       <div className="col-md-6">
//         <div className="mb-3">
//           <div className="d-flex justify-content-between">
//             <label className="form-label">Plan Currency<span className="text-danger"> *</span></label>
//             <span className="text-primary"><i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for free</span>
//           </div>
//           <select className="select">
//             <option>Select</option>
//             <option>Fixed</option>
//             <option>Percentage</option>
//           </select>
//         </div>
//       </div>
//       <div className="col-md-3">
//         <div className="mb-3">
//           <label className="form-label">Discount Type<span className="text-danger"> *</span></label>
//           <div className="pass-group">
//             <select className="select">
//               <option>Select</option>
//               <option>Fixed</option>
//               <option>Percentage</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-3">
//         <div className="mb-3">
//           <label className="form-label">Discount<span className="text-danger"> *</span></label>
//           <div className="pass-group">
//             <input type="text" className="form-control" />
//           </div>
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="mb-3">
//           <label className="form-label">Limitations Invoices</label>
//           <input type="text" className="form-control" />
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="mb-3">
//           <label className="form-label">Max Customers</label>
//           <input type="text" className="form-control" />
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="mb-3">
//           <label className="form-label">Product</label>
//           <input type="text" className="form-control" />
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <div className="mb-3">
//           <label className="form-label">Supplier</label>
//           <input type="text" className="form-control" />
//         </div>
//       </div>
//       <div className="col-lg-12">
//         <div className="d-flex align-items-center justify-content-between mb-3">
//           <h6>Plan Modules</h6>
//           <div className="form-check d-flex align-items-center">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Select All
//             </label>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Employees
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Invoices
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Reports
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Contacts
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Clients
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Estimates
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Goals
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Deals
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Projects
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Payments
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Assets
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Leads
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Tickets
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Taxes
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Activities
//             </label>
//           </div>
//         </div>
//         <div className="col-lg-3 col-sm-6">
//           <div className="form-check d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 text-dark fw-medium">
//               <input className="form-check-input" type="checkbox" />
//               Pipelines
//             </label>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="d-flex align-items-center mb-3">
//             <label className="form-check-label mt-0 me-2 text-dark fw-medium">
//               Access Trial
//             </label>
//             <div className="form-check form-switch me-2">
//               <input className="form-check-input me-2" type="checkbox" role="switch" />
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row align-items-center gx-3">
//         <div className="col-md-4">
//           <div className="d-flex align-items-center mb-3">
//             <div className="flex-fill">
//               <label className="form-label">Trial Days</label>
//               <input type="text" className="form-control" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-3">
//           <div className="d-block align-items-center ms-3">
//             <label className="form-check-label mt-0 me-2 text-dark">
//               Is Recommended
//             </label>
//             <div className="form-check form-switch me-2">
//               <input className="form-check-input me-2" type="checkbox" role="switch" />
//             </div>
//           </div>
//         </div>
//         <div className="col-md-5">
//           <div className="mb-3">
//             <label className="form-label">Status<span className="text-danger"> *</span></label>
//             <select className="select">
//               <option>Select</option>
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-12">
//         <div className="mb-3">
//           <label className="form-label">Description</label>
//           <textarea className="form-control"></textarea>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeerAdminPlans;

import React, { useState, useEffect } from "react";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";

const EmployeerAdminPlans = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/admin/getallplans"
        );
        const data = await response.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Subscription Plans</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            <div className="me-2">
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
            <div className="dropdown me-2">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Select Plan
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Monthly
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Yearly
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Select Status
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Inactive
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown me-2">
              <a
                href="javascript:void(0);"
                className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                Sort By : Last 7 Days
              </a>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Recently Added
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Ascending
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Desending
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Last Month
                  </a>
                </li>
                <li>
                  <a
                    href="javascript:void(0);"
                    className="dropdown-item rounded-1"
                  >
                    Last 7 Days
                  </a>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
              <a
                href="plans"
                className="btn btn-icon btn-sm active bg-primary text-white me-1"
              >
                <i className="ti ti-list-tree"></i>
              </a>
              <a href="plans-grid" className="btn btn-icon btn-sm">
                <i className="ti ti-layout-grid"></i>
              </a>
            </div>
            <div className="me-2">
              <div className="dropdown">
                <a
                  href="javascript:void(0);"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <i className="ti ti-file-export me-1"></i>Export
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      <i className="ti ti-file-type-pdf me-1"></i>Export as PDF
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="dropdown-item rounded-1"
                    >
                      <i className="ti ti-file-type-xls me-1"></i>Export as
                      Excel{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary d-flex align-items-center"
            >
              <i className="ti ti-circle-plus me-2"></i>Add New Plan
            </button>
            <div className="ms-2 head-icons">
              <a
                href="javascript:void(0);"
                className=""
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-original-title="Collapse"
                id="collapse-header"
              >
                <i className="ti ti-chevrons-up"></i>
              </a>
            </div>
          </div>
        </div>
        {/* /Breadcrumb */}

        <div className="row">
          {/* Total Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Total Plans
                    </p>
                    <h4>{plans.length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-primary flex-shrink-0">
                    <i className="ti ti-box fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Total Plans */}

          {/* Total Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Active Plans
                    </p>
                    <h4>{plans.filter((plan) => plan.isActive).length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-success flex-shrink-0">
                    <i className="ti ti-activity-heartbeat fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Total Plans */}

          {/* Inactive Plans */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      Inactive Plans
                    </p>
                    <h4>{plans.filter((plan) => !plan.isActive).length}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-danger flex-shrink-0">
                    <i className="ti ti-player-pause fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /Inactive Companies */}

          {/* No of Plans  */}
          <div className="col-lg-3 col-md-6 d-flex">
            <div className="card flex-fill">
              <div className="card-body d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center overflow-hidden">
                  <div>
                    <p className="fs-12 fw-medium mb-1 text-truncate">
                      No of Plan Types
                    </p>
                    <h4>{new Set(plans.map((plan) => plan.name)).size}</h4>
                  </div>
                </div>
                <div>
                  <span className="avatar avatar-lg bg-skyblue flex-shrink-0">
                    <i className="ti ti-mask fs-16"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* /No of Plans */}
        </div>

        <div className="card">
          <div className="card-body p-0">
            <div className="custom-datatable-filter table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                        />
                      </div>
                    </th>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>GST Percentage</th>
                    <th>Validity Days</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan._id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input className="form-check-input" type="checkbox" />
                        </div>
                      </td>
                      <td>
                        <h6 className="fw-medium">
                          <a href="#">{plan.name}</a>
                        </h6>
                      </td>
                      <td>₹{plan.price}</td>
                      <td>{plan.gstPercentage}%</td>
                      <td>{plan.validityDays}</td>
                      <td>{new Date(plan.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            plan.isActive ? "success" : "danger"
                          } d-inline-flex align-items-center badge-sm`}
                        >
                          <i className="ti ti-point-filled me-1"></i>
                          {plan.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <a
                            href="#"
                            className="me-2"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowEditModal(true);
                            }}
                          >
                            <i className="ti ti-edit"></i>
                          </a>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowDeleteModal(true);
                            }}
                          >
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

        {/* Add Plan Modal */}
        {showAddModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="add_plans"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Add New Plan</h4>
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
                    <PlanForm />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Plan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Modal */}
        {showEditModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="edit_plans"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Plan</h4>
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
                    <PlanForm />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-light me-2"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && (
          <div
            className="modal fade show"
            style={{ display: "block" }}
            id="delete_modal"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <i className="ti ti-trash text-danger-x fs-36"></i>
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    You want to delete all the marked items, this cant be undone
                    once you delete.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light me-3"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button className="btn btn-danger">Yes, Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <EmployerAdminFooter />
    </>
  );
};

const PlanForm = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
          <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
            <img
              src="assets/img/profiles/avatar-30.jpg"
              alt="img"
              className="rounded-circle"
            />
          </div>
          <div className="profile-upload">
            <div className="mb-2">
              <h6 className="mb-1">Upload Profile Image</h6>
              <p className="fs-12">Image should be below 4 mb</p>
            </div>
            <div className="profile-uploader d-flex align-items-center">
              <div className="drag-upload-btn btn btn-sm btn-primary me-2">
                Upload
                <input
                  type="file"
                  className="form-control image-sign"
                  multiple=""
                />
              </div>
              <a href="javascript:void(0);" className="btn btn-light btn-sm">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Plan Name<span className="text-danger"> *</span>
          </label>
          <select className="select">
            <option>Select</option>
            <option>Advanced</option>
            <option>Basic</option>
            <option>Enterprise</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Plan Type<span className="text-danger"> *</span>
          </label>
          <select className="select">
            <option>Select</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Plan Position<span className="text-danger"> *</span>
          </label>
          <select className="select">
            <option>Select</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <label className="form-label">
            Plan Currency<span className="text-danger"> *</span>
          </label>
          <select className="select">
            <option>Select</option>
            <option>USD</option>
            <option>EURO</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="mb-3">
          <div className="d-flex justify-content-between">
            <label className="form-label">
              Plan Currency<span className="text-danger"> *</span>
            </label>
            <span className="text-primary">
              <i className="fa-solid fa-circle-exclamation me-2"></i>Set 0 for
              free
            </span>
          </div>
          <select className="select">
            <option>Select</option>
            <option>Fixed</option>
            <option>Percentage</option>
          </select>
        </div>
      </div>
      <div className="col-md-3">
        <div className="mb-3">
          <label className="form-label">
            Discount Type<span className="text-danger"> *</span>
          </label>
          <div className="pass-group">
            <select className="select">
              <option>Select</option>
              <option>Fixed</option>
              <option>Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="mb-3">
          <label className="form-label">
            Discount<span className="text-danger"> *</span>
          </label>
          <div className="pass-group">
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label">Limitations Invoices</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label">Max Customers</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label">Product</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="col-lg-3">
        <div className="mb-3">
          <label className="form-label">Supplier</label>
          <input type="text" className="form-control" />
        </div>
      </div>
      <div className="col-lg-12">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h6>Plan Modules</h6>
          <div className="form-check d-flex align-items-center">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Select All
            </label>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Employees
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Invoices
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Reports
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Contacts
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Clients
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Estimates
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Goals
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Deals
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Projects
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Payments
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Assets
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Leads
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Tickets
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Taxes
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Activities
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-sm-6">
          <div className="form-check d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 text-dark fw-medium">
              <input className="form-check-input" type="checkbox" />
              Pipelines
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex align-items-center mb-3">
            <label className="form-check-label mt-0 me-2 text-dark fw-medium">
              Access Trial
            </label>
            <div className="form-check form-switch me-2">
              <input
                className="form-check-input me-2"
                type="checkbox"
                role="switch"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row align-items-center gx-3">
        <div className="col-md-4">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-fill">
              <label className="form-label">Trial Days</label>
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-block align-items-center ms-3">
            <label className="form-check-label mt-0 me-2 text-dark">
              Is Recommended
            </label>
            <div className="form-check form-switch me-2">
              <input
                className="form-check-input me-2"
                type="checkbox"
                role="switch"
              />
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="mb-3">
            <label className="form-label">
              Status<span className="text-danger"> *</span>
            </label>
            <select className="select">
              <option>Select</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control"></textarea>
        </div>
      </div>
    </div>
  );
};

export default EmployeerAdminPlans;
