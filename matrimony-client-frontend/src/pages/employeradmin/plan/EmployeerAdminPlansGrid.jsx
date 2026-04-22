// import React, { useState, useEffect } from 'react';
// import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
// import EmployerAdminHeader from '../Layout/EmployerAdminHeader';

// const EmployeerAdminPlansGrid = () => {
//   const [isPremium, setIsPremium] = useState(false);
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentPlan, setCurrentPlan] = useState(null);

//   // Form state for add/edit
//   const [formData, setFormData] = useState({
//     name: '',
//     price: 0,
//     gstPercentage: 18,
//     perDayLimit: 0,
//     profileViews: 0,
//     downloadResume: 0,
//     verifiedCandidateAccess: false,
//     jobPostingLimit: 0,
//     candidatesLiveChat: false,
//     hasAds: true,
//     validityDays: 0,
//     hasDRM: false,
//     accessToWebinars: false,
//     interviewType: 'Online',
//     accessToRecruitmentFair: false,
//     customerSupport: false,
//     fastTrackSupport: false,
//     isActive: true
//   });

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       const response = await fetch('https://api.edprofio.com/admin/getallplans');
//       if (!response.ok) {
//         throw new Error('Failed to fetch plans');
//       }
//       const data = await response.json();
//       if (data.success) {
//         setPlans(data.data);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePlanType = () => {
//     setIsPremium(!isPremium);
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = currentPlan
//         ? `https://api.edprofio.com/admin/updateplan/${currentPlan._id}`
//         : 'https://api.edprofio.com/admin/addplan';

//       const method = currentPlan ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save plan');
//       }

//       const result = await response.json();
//       if (result.success) {
//         fetchPlans(); // Refresh the plans list
//         currentPlan ? setShowEditModal(false) : setShowAddModal(false);
//         setFormData({
//           name: '',
//           price: 0,
//           gstPercentage: 18,
//           perDayLimit: 0,
//           profileViews: 0,
//           downloadResume: 0,
//           verifiedCandidateAccess: false,
//           jobPostingLimit: 0,
//           candidatesLiveChat: false,
//           hasAds: true,
//           validityDays: 0,
//           hasDRM: false,
//           accessToWebinars: false,
//           interviewType: 'Online',
//           accessToRecruitmentFair: false,
//           customerSupport: false,
//           fastTrackSupport: false,
//           isActive: true
//         });
//       }
//     } catch (err) {
//       console.error('Error saving plan:', err);
//     }
//   };

//   const openEditModal = (plan) => {
//     setCurrentPlan(plan);
//     setFormData({
//       name: plan.name,
//       price: plan.price,
//       gstPercentage: plan.gstPercentage,
//       perDayLimit: plan.perDayLimit,
//       profileViews: plan.profileViews,
//       downloadResume: plan.downloadResume,
//       verifiedCandidateAccess: plan.verifiedCandidateAccess,
//       jobPostingLimit: plan.jobPostingLimit,
//       candidatesLiveChat: plan.candidatesLiveChat,
//       hasAds: plan.hasAds,
//       validityDays: plan.validityDays,
//       hasDRM: plan.hasDRM,
//       accessToWebinars: plan.accessToWebinars,
//       interviewType: plan.interviewType,
//       accessToRecruitmentFair: plan.accessToRecruitmentFair,
//       customerSupport: plan.customerSupport,
//       fastTrackSupport: plan.fastTrackSupport,
//       isActive: plan.isActive
//     });
//     setShowEditModal(true);
//   };

//   const getFeatureList = (plan) => {
//     return [
//       { text: `${plan.perDayLimit} actions per day`, included: true },
//       { text: `${plan.profileViews} Profile Views`, included: true },
//       { text: `${plan.downloadResume} Resume Downloads`, included: true },
//       { text: "Verified Candidate Access", included: plan.verifiedCandidateAccess },
//       { text: `${plan.jobPostingLimit} Job Postings`, included: true },
//       { text: `${plan.validityDays} Days Validity`, included: true },
//       { text: "DRM (Dedicated Resource Manager)", included: plan.hasDRM },
//       { text: `${plan.interviewType} Interview`, included: true },
//       { text: "Customer Support", included: plan.customerSupport },
//       { text: "Fast Track Support", included: plan.fastTrackSupport },
//       { text: "Live Chat with Candidates", included: plan.candidatesLiveChat },
//       { text: "Access to Webinars", included: plan.accessToWebinars },
//       { text: "Recruitment Fair Access", included: plan.accessToRecruitmentFair },
//       { text: "Ad-free Experience", included: !plan.hasAds }
//     ];
//   };

//   const calculateTotalPrice = (price, gstPercentage) => {
//     if (price === 0) return '₹0';
//     const gstAmount = (price * gstPercentage) / 100;
//     const total = price + gstAmount;
//     return `₹${total.toFixed(2)} (incl. GST)`;
//   };

//   if (loading) {
//     return (
//       <>
//         <EmployerAdminHeader/>
//         <div className="content">
//           <div className="card">
//             <div className="card-body text-center py-5">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading plans...</p>
//             </div>
//           </div>
//         </div>
//         <EmployerAdminFooter/>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <EmployerAdminHeader/>
//         <div className="content">
//           <div className="card">
//             <div className="card-body text-center py-5 text-danger">
//               <i className="ti ti-alert-circle fs-1"></i>
//               <p className="mt-2">Error: {error}</p>
//               <button className="btn btn-primary" onClick={fetchPlans}>
//                 Retry
//               </button>
//             </div>
//           </div>
//         </div>
//         <EmployerAdminFooter/>
//       </>
//     );
//   }

//   return (
//     <>
//       <EmployerAdminHeader/>
//       <div className="content">
//         <div className="card">
//           <div className="card-body">
//             <div className="d-flex justify-content-between align-items-center mb-4">
//               <div className="d-flex align-items-center">
//                 <p className="mb-0 me-2">Standard Plans</p>
//                 <div className="form-check form-switch">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     id="flexSwitchCheckDefault"
//                     checked={isPremium}
//                     onChange={togglePlanType}
//                   />
//                 </div>
//                 <p className="mb-0">Premium Plans</p>
//               </div>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => {
//                   setCurrentPlan(null);
//                   setShowAddModal(true);
//                 }}
//               >
//                 <i className="ti ti-plus me-1"></i> Add New Plan
//               </button>
//             </div>

//             <div className="row justify-content-center">
//               {plans.map((plan, index) => (
//                 <div className="col-lg-3 col-md-6 col-sm-12 d-flex mb-4" key={plan._id}>
//                   <div className={`card flex-fill ${isPremium && plan.price >= 6999 ? 'border border-primary' : ''}`}>
//                     <div className="card-body bg-light shadow">
//                       <div className="card shadow">
//                         <div className="card-body">
//                           <div className="d-flex justify-content-between align-items-start">
//                             <div>
//                               <h4>{index + 1}. {plan.name}</h4>
//                               <h1 className="text-primary">
//                                 {plan.price === 0 ? '₹0' : `₹${plan.price}`}
//                                 <span className="fs-14 fw-normal text-gray">/{plan.validityDays} days</span>
//                               </h1>
//                               {plan.price > 0 && (
//                                 <p className="text-muted small mb-0">GST: {plan.gstPercentage}%</p>
//                               )}
//                               <p className="text-muted small">{calculateTotalPrice(plan.price, plan.gstPercentage)}</p>
//                             </div>
//                             <button
//                               className="btn btn-sm btn-outline-primary"
//                               onClick={() => openEditModal(plan)}
//                             >
//                               <i className="ti ti-edit"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
//                         <div className="price-hdr">
//                           <h6 className="fs-14 fw-medium text-primary w-100">Features Includes</h6>
//                         </div>
//                         <div className="features-list" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//                           {getFeatureList(plan).map((feature, idx) => (
//                             <div className="text-dark d-flex align-items-center mb-2" key={idx}>
//                               <i className={`ti ${feature.included ? 'ti-discount-check-filled text-success' : 'ti-circle-x-filled text-danger'} me-2`}></i>
//                               <span>{feature.text}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                       <a href="#" className="btn btn-secondary w-100">Choose Plan</a>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Add Plan Modal */}
//         {showAddModal && (
//           <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h4 className="modal-title">Add New Plan</h4>
//                   <button
//                     type="button"
//                     className="btn-close custom-btn-close"
//                     onClick={() => setShowAddModal(false)}
//                   >
//                     <i className="ti ti-x"></i>
//                   </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="modal-body pb-0">
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Plan Name<span className="text-danger"> *</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Price (₹)<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">GST Percentage<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="gstPercentage"
//                             value={formData.gstPercentage}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Validity (Days)<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="validityDays"
//                             value={formData.validityDays}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Daily Action Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="perDayLimit"
//                             value={formData.perDayLimit}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Profile Views Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="profileViews"
//                             value={formData.profileViews}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Resume Downloads<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="downloadResume"
//                             value={formData.downloadResume}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Job Posting Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="jobPostingLimit"
//                             value={formData.jobPostingLimit}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Interview Type<span className="text-danger"> *</span></label>
//                           <select
//                             className="form-select"
//                             name="interviewType"
//                             value={formData.interviewType}
//                             onChange={handleInputChange}
//                             required
//                           >
//                             <option value="Online">Online</option>
//                             <option value="Online/Campus">Online/Campus</option>
//                             <option value="Campus">Campus</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Status<span className="text-danger"> *</span></label>
//                           <select
//                             className="form-select"
//                             name="isActive"
//                             value={formData.isActive}
//                             onChange={handleInputChange}
//                             required
//                           >
//                             <option value={true}>Active</option>
//                             <option value={false}>Inactive</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Toggle Features */}
//                       <div className="col-md-12 mt-3">
//                         <h6>Plan Features</h6>
//                         <div className="row">
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="verifiedCandidateAccess"
//                                 checked={formData.verifiedCandidateAccess}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Verified Candidate Access</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="candidatesLiveChat"
//                                 checked={formData.candidatesLiveChat}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Live Chat</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="hasAds"
//                                 checked={formData.hasAds}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Show Ads</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="hasDRM"
//                                 checked={formData.hasDRM}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Dedicated Resource Manager</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="accessToWebinars"
//                                 checked={formData.accessToWebinars}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Access to Webinars</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="accessToRecruitmentFair"
//                                 checked={formData.accessToRecruitmentFair}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Recruitment Fair Access</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="customerSupport"
//                                 checked={formData.customerSupport}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Customer Support</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="fastTrackSupport"
//                                 checked={formData.fastTrackSupport}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Fast Track Support</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-light me-2"
//                       onClick={() => setShowAddModal(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">Add Plan</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Plan Modal */}
//         {showEditModal && currentPlan && (
//           <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h4 className="modal-title">Edit Plan</h4>
//                   <button
//                     type="button"
//                     className="btn-close custom-btn-close"
//                     onClick={() => setShowEditModal(false)}
//                   >
//                     <i className="ti ti-x"></i>
//                   </button>
//                 </div>
//                 <form onSubmit={handleSubmit}>
//                   <div className="modal-body pb-0">
//                     <div className="row">
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Plan Name<span className="text-danger"> *</span></label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Price (₹)<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">GST Percentage<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="gstPercentage"
//                             value={formData.gstPercentage}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Validity (Days)<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="validityDays"
//                             value={formData.validityDays}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Daily Action Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="perDayLimit"
//                             value={formData.perDayLimit}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Profile Views Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="profileViews"
//                             value={formData.profileViews}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Resume Downloads<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="downloadResume"
//                             value={formData.downloadResume}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Job Posting Limit<span className="text-danger"> *</span></label>
//                           <input
//                             type="number"
//                             className="form-control"
//                             name="jobPostingLimit"
//                             value={formData.jobPostingLimit}
//                             onChange={handleInputChange}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Interview Type<span className="text-danger"> *</span></label>
//                           <select
//                             className="form-select"
//                             name="interviewType"
//                             value={formData.interviewType}
//                             onChange={handleInputChange}
//                             required
//                           >
//                             <option value="Online">Online</option>
//                             <option value="Online/Campus">Online/Campus</option>
//                             <option value="Campus">Campus</option>
//                           </select>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="mb-3">
//                           <label className="form-label">Status<span className="text-danger"> *</span></label>
//                           <select
//                             className="form-select"
//                             name="isActive"
//                             value={formData.isActive}
//                             onChange={handleInputChange}
//                             required
//                           >
//                             <option value={true}>Active</option>
//                             <option value={false}>Inactive</option>
//                           </select>
//                         </div>
//                       </div>

//                       {/* Toggle Features */}
//                       <div className="col-md-12 mt-3">
//                         <h6>Plan Features</h6>
//                         <div className="row">
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="verifiedCandidateAccess"
//                                 checked={formData.verifiedCandidateAccess}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Verified Candidate Access</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="candidatesLiveChat"
//                                 checked={formData.candidatesLiveChat}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Live Chat</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="hasAds"
//                                 checked={formData.hasAds}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Show Ads</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="hasDRM"
//                                 checked={formData.hasDRM}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Dedicated Resource Manager</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="accessToWebinars"
//                                 checked={formData.accessToWebinars}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Access to Webinars</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="accessToRecruitmentFair"
//                                 checked={formData.accessToRecruitmentFair}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Recruitment Fair Access</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="customerSupport"
//                                 checked={formData.customerSupport}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Customer Support</label>
//                             </div>
//                           </div>
//                           <div className="col-md-4">
//                             <div className="form-check form-switch mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="fastTrackSupport"
//                                 checked={formData.fastTrackSupport}
//                                 onChange={handleInputChange}
//                               />
//                               <label className="form-check-label">Fast Track Support</label>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-light me-2"
//                       onClick={() => setShowEditModal(false)}
//                     >
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn btn-primary">Save Changes</button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <EmployerAdminFooter/>
//     </>
//   );
// };

// export default EmployeerAdminPlansGrid;

import React, { useState, useEffect } from "react";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";

const EmployeerAdminPlansGrid = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/admin/getallplans"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch plans");
        }
        const data = await response.json();
        if (data.success) {
          setPlans(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const togglePlanType = () => {
    setIsPremium(!isPremium);
  };

  const getFeatureList = (plan) => {
    return [
      { text: `Daily Limit: ${plan.perDayLimit} actions`, included: true },
      { text: `Profile Views: ${plan.profileViews}`, included: true },
      { text: `Resume Downloads: ${plan.downloadResume}`, included: true },
      { text: "Verified Candidates", included: plan.verifiedCandidateAccess },
      { text: `Job Postings: ${plan.jobPostingLimit}`, included: true },
      { text: `Validity: ${plan.validityDays} days`, included: true },
      { text: "Dedicated Manager", included: plan.hasDRM },
      { text: `Interview Type: ${plan.interviewType}`, included: true },
      { text: "Customer Support", included: plan.customerSupport },
      { text: "Priority Support", included: plan.fastTrackSupport },
      { text: "Live Chat", included: plan.candidatesLiveChat },
      { text: "Webinar Access", included: plan.accessToWebinars },
      { text: "Recruitment Fair", included: plan.accessToRecruitmentFair },
      { text: "Ad-Free Experience", included: !plan.hasAds }, // Inverted for hasAds
    ];
  };

  const calculateTotalPrice = (price, gstPercentage) => {
    if (price === 0) return "₹0";
    const gstAmount = (price * gstPercentage) / 100;
    const total = price + gstAmount;
    return `₹${total.toFixed(2)} (incl. GST)`;
  };

  if (loading) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading plans...</p>
            </div>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <EmployerAdminHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5 text-danger">
              <i className="ti ti-alert-circle fs-1"></i>
              <p className="mt-2">Error: {error}</p>
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          </div>
        </div>
        <EmployerAdminFooter />
      </>
    );
  }

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center align-items-center mb-4">
              <p className="mb-0 me-2">Standard Plans</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={isPremium}
                  onChange={togglePlanType}
                />
              </div>
              <p className="mb-0">Premium Plans</p>
            </div>

            <div className="row justify-content-center">
              {plans.map((plan, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-12 d-flex mb-4"
                  key={plan._id}
                >
                  <div
                    className={`card flex-fill ${
                      isPremium && plan.price >= 6999
                        ? "border border-primary"
                        : ""
                    }`}
                  >
                    <div className="card-body bg-light shadow">
                      <div className="card shadow">
                        <div className="card-body">
                          <h4>
                            {index + 1}. {plan.name}
                          </h4>
                          <h1 className="text-primary">
                            {plan.price === 0 ? "₹0" : `₹${plan.price}`}
                            <span className="fs-14 fw-normal text-gray">
                              /{plan.validityDays} days
                            </span>
                          </h1>
                          {plan.price > 0 && (
                            <p className="text-muted small mb-0">
                              GST: {plan.gstPercentage}%
                            </p>
                          )}
                          <p className="text-muted small">
                            {calculateTotalPrice(
                              plan.price,
                              plan.gstPercentage
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
                        <div className="price-hdr">
                          <h6 className="fs-14 fw-medium text-primary w-100">
                            Features Includes
                          </h6>
                        </div>
                        <div
                          className="features-list"
                          style={{ maxHeight: "300px", overflowY: "auto" }}
                        >
                          {getFeatureList(plan).map((feature, idx) => (
                            <div
                              className="text-dark d-flex align-items-center mb-2"
                              key={idx}
                            >
                              <i
                                className={`ti ${
                                  feature.included
                                    ? "ti-discount-check-filled text-success"
                                    : "ti-circle-x-filled text-danger"
                                } me-2`}
                              ></i>
                              <span>{feature.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <a href="#" className="btn btn-secondary w-100">
                        Choose Plan
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default EmployeerAdminPlansGrid;
