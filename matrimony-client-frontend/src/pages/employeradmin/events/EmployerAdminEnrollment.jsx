// import React, { useState, useEffect } from 'react';
// import {
//     ChevronDown,
//     ChevronsUp,
//     FileText,
//     Download,
//     Trash2,
//     TrendingUp,
//     Circle,
//     FileType2,
//     FileSpreadsheet,
//     Calendar,
//     FileOutput,
//     CreditCard,
//     Search,
//     CheckCircle,
//     AlertCircle,
//     ArrowLeft,
//     MapPin,
//     MessageCircleCode,
//     Edit,
//     User,
//     X,
//     Clock,
//     Users
// } from 'lucide-react';
// import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
// import EmployerAdminFooter from '../Layout/EmployerAdminFooter';
// import { getAllEvents, getEventDetails } from '../../../api/services/projectServices';
// import { useNavigate, useParams } from 'react-router-dom';

// const EmployerAdminEnrollment = () => {
//     const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectAll, setSelectAll] = useState(false);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [toast, setToast] = useState({ show: false, message: '', type: '' });
//     const [organizerFilter, setOrganizerFilter] = useState('All');
//     const [statusFilter, setStatusFilter] = useState('All');
//     const [fromDate, setFromDate] = useState('');
//     const [toDate, setToDate] = useState('');
//     const [selectedEvent, setSelectedEvent] = useState(null);
//     const { eventId } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchEvents = async () => {
//             try {
//                 const response = await getAllEvents();
//                 const processedEvents = response.map(event => {
//                     const eventDate = new Date(event.eventDate);
//                     const today = new Date();
//                     let status = 'Upcoming';

//                     if (eventDate < today) {
//                         status = 'Completed';
//                     } else if (eventDate.toDateString() === today.toDateString()) {
//                         status = 'Current';
//                     }

//                     if (event._id === "68564338f6e1e50b7331fa57") {
//                         status = 'On-hold';
//                     } else if (event._id === "6856433af6e1e50b7331fa59") {
//                         status = 'Cancelled';
//                     }

//                     return {
//                         ...event,
//                         status,
//                         type: event.category || 'Workshop'
//                     };
//                 });
//                 setEvents(processedEvents);
//                 setLoading(false);
//             } catch (err) {
//                 setError(err.message);
//                 setLoading(false);
//             }
//         };

//         fetchEvents();
//     }, []);

//     useEffect(() => {
//         if (toast.show) {
//             const timer = setTimeout(() => {
//                 setToast({ show: false, message: '', type: '' });
//             }, 3000);

//             return () => clearTimeout(timer);
//         }
//     }, [toast.show]);

//     const filteredData = events.filter(event => {
//         const matchesSearch =
//             (event.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//             (event.venue?.toLowerCase() || '').includes(searchTerm.toLowerCase());

//         const matchesOrganizer = organizerFilter === 'All' ||
//             (event.organizerId === "665fd983d7e1f2a70b89e5e7" ? 'Edujobz' : 'Other') === organizerFilter;

//         const matchesStatus = statusFilter === 'All' || event.status === statusFilter;

//         const eventDate = new Date(event.eventDate);
//         const matchesDate = (!fromDate || eventDate >= new Date(fromDate)) &&
//             (!toDate || eventDate <= new Date(toDate));

//         return matchesSearch && matchesOrganizer && matchesStatus && matchesDate;
//     });

//     const handleSelectAll = (e) => {
//         setSelectAll(e.target.checked);
//     };

//     const handleDeleteClick = (eventId) => {
//         setSelectedEvent(events.find(event => event._id === eventId));
//         setShowDeleteModal(true);
//     };

//     const handleConfirmDelete = async () => {
//         if (!selectedEvent) return;

//         try {
//             const response = await fetch(`https://api.edprofio.com/employer/removeevents/${selectedEvent._id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete event');
//             }

//             setEvents(events.filter(event => event._id !== selectedEvent._id));
//             setShowDeleteModal(false);
//             setSelectedEvent(null);
//             setToast({ show: true, message: 'Event deleted successfully', type: 'success' });
//         } catch (err) {
//             setToast({ show: true, message: err.message, type: 'error' });
//             setError(err.message);
//         }
//     };

//     const exportToExcel = () => {
//         const headers = ['Title', 'Type', 'Date', 'Venue', 'Status', 'Registrations'];
//         const data = filteredData.map(event => [
//             event.title,
//             event.type,
//             new Date(event.eventDate).toLocaleDateString(),
//             event.venue,
//             event.status,
//             event.registrations?.length || 0
//         ]);

//         let csvContent = "data:text/csv;charset=utf-8," +
//             headers.join(",") + "\n" +
//             data.map(row => row.join(",")).join("\n");

//         const encodedUri = encodeURI(csvContent);
//         const link = document.createElement("a");
//         link.setAttribute("href", encodedUri);
//         link.setAttribute("download", "events.csv");
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//     };

//     const exportToPDF = () => {
//         const printContent = `
//             <h2>Events Report</h2>
//             <table border="1" style="width:100%;border-collapse:collapse;">
//                 <thead>
//                     <tr>
//                         <th>Title</th>
//                         <th>Type</th>
//                         <th>Date</th>
//                         <th>Venue</th>
//                         <th>Status</th>
//                         <th>Registrations</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${filteredData.map(event => `
//                         <tr>
//                             <td>${event.title}</td>
//                             <td>${event.type}</td>
//                             <td>${new Date(event.eventDate).toLocaleDateString()}</td>
//                             <td>${event.venue}</td>
//                             <td>${event.status}</td>
//                             <td>${event.registrations?.length || 0}</td>
//                         </tr>
//                     `).join('')}
//                 </tbody>
//             </table>
//         `;

//         const printWindow = window.open('', '_blank');
//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <title>Events Report</title>
//                     <style>
//                         table { width: 100%; border-collapse: collapse; }
//                         th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//                         @media print {
//                             @page { size: landscape; }
//                         }
//                     </style>
//                 </head>
//                 <body>
//                     ${printContent}
//                     <script>
//                         window.onload = function() {
//                             setTimeout(function() {
//                                 window.print();
//                                 window.close();
//                             }, 100);
//                         }
//                     </script>
//                 </body>
//             </html>
//         `);
//         printWindow.document.close();
//     };

//     const formatDate = (date) => {
//         if (!date) return '';
//         const d = new Date(date);
//         const day = d.getDate().toString().padStart(2, '0');
//         const month = (d.getMonth() + 1).toString().padStart(2, '0');
//         const year = d.getFullYear();
//         return `${day}/${month}/${year}`;
//     };

//     const handleViewEvent = async (eventId) => {
//         try {
//             const eventData = await getEventDetails(eventId);
//             setSelectedEvent(eventData);
//             setShowInvoiceModal(true);
//         } catch (err) {
//             setToast({ show: true, message: err.message, type: 'error' });
//         }
//     };

//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const startEntry = (currentPage - 1) * rowsPerPage + 1;
//     const endEntry = Math.min(currentPage * rowsPerPage, filteredData.length);
//     const currentData = filteredData.slice(startEntry - 1, endEntry);

//     // Stats data based on events
//     const statsData = [
//         {
//             title: "Total Events",
//             value: events.length,
//             lineClass: "subscription-line-1",
//             trend: "+19.01%"
//         },
//         {
//             title: "Current Events",
//             value: events.filter(e => e.status === 'Current').length,
//             lineClass: "subscription-line-2",
//             trend: "+19.01%"
//         },
//         {
//             title: "Upcoming Events",
//             value: events.filter(e => e.status === 'Upcoming').length,
//             lineClass: "subscription-line-3",
//             trend: "+19.01%"
//         },
//         {
//             title: "Completed Events",
//             value: events.filter(e => e.status === 'Completed').length,
//             lineClass: "subscription-line-4",
//             trend: "+19.01%"
//         }
//     ];

//     if (loading) return <div>Loading events...</div>;
//     if (error) return <div>Error: {error}</div>;

//     return (
//         <>
//             <EmployerAdminHeader />
//             <div className="content">
//                 {/* Breadcrumb Section */}
//                 <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
//                     <div className="my-auto">
//                         <h2>Events Management</h2>
//                     </div>
//                     <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
//                         {/* Date Range Picker */}
//                         <div className="me-2">
//                             <div className="input-icon-end position-relative">
//                                 <input
//                                     type="date"
//                                     className="form-control"
//                                     placeholder="From Date"
//                                     value={fromDate}
//                                     onChange={(e) => setFromDate(e.target.value)}
//                                 />
//                                 <span className="input-icon-addon">
//                                     <Calendar size={16} />
//                                 </span>
//                             </div>
//                         </div>
//                         <div className="me-2">
//                             <div className="input-icon-end position-relative">
//                                 <input
//                                     type="date"
//                                     className="form-control"
//                                     placeholder="To Date"
//                                     value={toDate}
//                                     onChange={(e) => setToDate(e.target.value)}
//                                 />
//                                 <span className="input-icon-addon">
//                                     <Calendar size={16} />
//                                 </span>
//                             </div>
//                         </div>

//                         {/* Organizer Filter Dropdown */}
//                         <div className="dropdown me-2">
//                             <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
//                                 {organizerFilter === 'All' ? 'Organizer' : organizerFilter} <ChevronDown size={16} className="ms-1" />
//                             </button>
//                             <ul className="dropdown-menu dropdown-menu-end p-3">
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('All')}>All</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('Edujobz')}>EdProfio</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setOrganizerFilter('Other')}>Other</button></li>
//                             </ul>
//                         </div>

//                         {/* Status Filter Dropdown */}
//                         <div className="dropdown me-2">
//                             <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
//                                 {statusFilter === 'All' ? 'Status' : statusFilter} <ChevronDown size={16} className="ms-1" />
//                             </button>
//                             <ul className="dropdown-menu dropdown-menu-end p-3">
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('All')}>All</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Current')}>Current</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Upcoming')}>Upcoming</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Completed')}>Completed</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('On-hold')}>On-hold</button></li>
//                                 <li><button className="dropdown-item rounded-1" onClick={() => setStatusFilter('Cancelled')}>Cancelled</button></li>
//                             </ul>
//                         </div>

//                         {/* Export Dropdown */}
//                         <div className="dropdown">
//                             <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
//                                 <FileOutput size={16} className="me-1" /> Export <ChevronDown size={16} className="ms-1" />
//                             </button>
//                             <ul className="dropdown-menu dropdown-menu-end p-3">
//                                 <li>
//                                     <button className="dropdown-item rounded-1" onClick={exportToPDF}>
//                                         <FileType2 size={16} className="me-1" /> Export as PDF
//                                     </button>
//                                 </li>
//                                 <li>
//                                     <button className="dropdown-item rounded-1" onClick={exportToExcel}>
//                                         <FileSpreadsheet size={16} className="me-1" /> Export as Excel
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>

//                         {/* Collapse Button */}
//                         <div className="head-icons">
//                             <button data-bs-toggle="tooltip" data-bs-placement="top" title="Collapse">
//                                 <ChevronsUp size={16} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Stats Cards Section */}
//                 <div className="row">
//                     {statsData.map((stat, index) => (
//                         <div className="col-xl-3 col-md-6 d-flex" key={index}>
//                             <div className="card flex-fill">
//                                 <div className="card-body">
//                                     <div className="border-bottom pb-3 mb-3">
//                                         <div className="row align-items-center">
//                                             <div className="col-7">
//                                                 <div>
//                                                     <span className="fs-14 fw-normal text-truncate mb-1">{stat.title}</span>
//                                                     <h5>{stat.value}</h5>
//                                                 </div>
//                                             </div>
//                                             <div className="col-5">
//                                                 <div>
//                                                     <span className={stat.lineClass} data-width="100%"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="d-flex">
//                                         <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
//                                             <span className="text-primary fs-12 d-flex align-items-center me-1">
//                                                 <TrendingUp size={14} className="me-1" />
//                                                 {stat.trend}
//                                             </span>
//                                             from last week
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Search and Pagination Controls */}
//                 <div className="row mb-3">
//                     <div className="col-sm-12 col-md-6">
//                         <div className="dataTables_length d-flex align-items-center">
//                             <label className="me-2 mb-0">Show</label>
//                             <select
//                                 className="form-select form-select-sm w-auto"
//                                 value={rowsPerPage}
//                                 onChange={(e) => {
//                                     setRowsPerPage(Number(e.target.value));
//                                     setCurrentPage(1);
//                                 }}
//                                 style={{ padding: '0.25rem 1.5rem 0.25rem 0.5rem' }}
//                             >
//                                 <option value={10}>10</option>
//                                 <option value={25}>25</option>
//                                 <option value={50}>50</option>
//                                 <option value={100}>100</option>
//                             </select>
//                             <label className="ms-2 mb-0">entries</label>
//                         </div>
//                     </div>
//                     <div className="col-sm-12 col-md-6">
//                         <div className="dataTables_filter d-flex justify-content-end">
//                             <div className="input-group input-group-sm" style={{ width: '250px' }}>
//                                 <input
//                                     type="search"
//                                     className="form-control form-control-sm"
//                                     placeholder="Search..."
//                                     value={searchTerm}
//                                     onChange={(e) => {
//                                         setSearchTerm(e.target.value);
//                                         setCurrentPage(1);
//                                     }}
//                                     style={{ padding: '0.375rem 0.75rem' }}
//                                 />
//                                 <span className="input-group-text bg-white">
//                                     <Search size={16} className="text-muted" />
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Events Table Section */}
//                 <div className="card">
//                     <div className="card-body p-0">
//                         <div className="custom-datatable-filter table-responsive">
//                             <table className="table datatable">
//                                 <thead className="thead-light">
//                                     <tr>
//                                         <th className="no-sort">
//                                             <div className="form-check form-check-md">
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     id="select-all"
//                                                     checked={selectAll}
//                                                     onChange={handleSelectAll}
//                                                 />
//                                             </div>
//                                         </th>
//                                         <th>Event Title</th>
//                                         <th>Type</th>
//                                         <th>Date</th>
//                                         <th>Venue</th>
//                                         <th>Organizer</th>
//                                         <th>Registrations</th>
//                                         <th>Status</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentData.map((event) => (
//                                         <tr key={event._id}>
//                                             <td>
//                                                 <div className="form-check form-check-md">
//                                                     <input
//                                                         className="form-check-input"
//                                                         type="checkbox"
//                                                         checked={selectAll}
//                                                         onChange={() => { }}
//                                                     />
//                                                 </div>
//                                             </td>
//                                             <td>
//                                                 <div className="d-flex align-items-center file-name-icon">
//                                                     <div className="avatar avatar-md border rounded-circle">
//                                                         <img
//                                                             src={event.bannerImage || 'assets/img/default-event.png'}
//                                                             className="img-fluid"
//                                                             alt={event.title}
//                                                         />
//                                                     </div>
//                                                     <div className="ms-2">
//                                                         <h6 className="fw-medium">{event.title}</h6>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td>{event.type}</td>
//                                             <td>{new Date(event.eventDate).toLocaleDateString()}</td>
//                                             <td>{event.venue}</td>
//                                             <td>{event.organizerId === "665fd983d7e1f2a70b89e5e7" ? 'Edujobz' : 'Other'}</td>
//                                             <td>{event.registrations?.length || 0}</td>
//                                             <td>
//                                                 <span className={`badge badge-${event.status === 'Current' ? 'warning' :
//                                                     event.status === 'Upcoming' ? 'info' :
//                                                         event.status === 'Completed' ? 'success' :
//                                                             event.status === 'On-hold' ? 'secondary' : 'danger'}
//                                                     d-flex align-items-center badge-xs`}>
//                                                     <Circle size={10} className="me-1" fill="currentColor" />
//                                                     {event.status}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <div className="action-icon d-inline-flex">
//                                                     <button
//                                                         className="me-2 btn btn-sm btn-icon"
//                                                         onClick={() => handleViewEvent(event._id)}
//                                                         aria-label="View details"
//                                                     >
//                                                         <FileText size={16} />
//                                                     </button>
//                                                     <button
//                                                         className="me-2 btn btn-sm btn-icon"
//                                                         aria-label="Download"
//                                                     >
//                                                         <Download size={16} />
//                                                     </button>
//                                                     <button
//                                                         className="btn btn-sm btn-icon text-danger"
//                                                         onClick={() => handleDeleteClick(event._id)}
//                                                         aria-label="Delete"
//                                                     >
//                                                         <Trash2 size={16} />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Pagination Section */}
//                 <div className="row mt-3">
//                     <div className="col-sm-12 col-md-6">
//                         <div className="dataTables_info">
//                             Showing {startEntry} to {endEntry} of {filteredData.length} entries
//                             {searchTerm && filteredData.length !== events.length && (
//                                 <span className="text-muted"> (filtered from {events.length} total entries)</span>
//                             )}
//                         </div>
//                     </div>
//                     <div className="col-sm-12 col-md-6">
//                         <div className="dataTables_paginate paging_simple_numbers d-flex justify-content-end">
//                             <ul className="pagination mb-0">
//                                 <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//                                     <button
//                                         className="page-link"
//                                         onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                                         disabled={currentPage === 1}
//                                     >
//                                         &lt;
//                                     </button>
//                                 </li>

//                                 {/* Always show first page */}
//                                 <li className={`page-item ${currentPage === 1 ? 'active' : ''}`}>
//                                     <button
//                                         className="page-link"
//                                         onClick={() => setCurrentPage(1)}
//                                     >
//                                         1
//                                     </button>
//                                 </li>

//                                 {/* Show ellipsis if needed */}
//                                 {currentPage > 3 && (
//                                     <li className="page-item disabled">
//                                         <span className="page-link">...</span>
//                                     </li>
//                                 )}

//                                 {/* Show current page and adjacent pages */}
//                                 {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
//                                     const page = Math.max(2, Math.min(currentPage - 1, totalPages - 3)) + i;
//                                     if (page > 1 && page < totalPages) {
//                                         return (
//                                             <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
//                                                 <button
//                                                     className="page-link"
//                                                     onClick={() => setCurrentPage(page)}
//                                                 >
//                                                     {page}
//                                                 </button>
//                                             </li>
//                                         );
//                                     }
//                                     return null;
//                                 })}

//                                 {/* Show ellipsis if needed */}
//                                 {currentPage < totalPages - 2 && totalPages > 4 && (
//                                     <li className="page-item disabled">
//                                         <span className="page-link">...</span>
//                                     </li>
//                                 )}

//                                 {/* Always show last page if there is more than one page */}
//                                 {totalPages > 1 && (
//                                     <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
//                                         <button
//                                             className="page-link"
//                                             onClick={() => setCurrentPage(totalPages)}
//                                         >
//                                             {totalPages}
//                                         </button>
//                                     </li>
//                                 )}

//                                 <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//                                     <button
//                                         className="page-link"
//                                         onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                                         disabled={currentPage === totalPages}
//                                     >
//                                         &gt;
//                                     </button>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>

//                 {/* View Event Details Modal */}
//                 {showInvoiceModal && selectedEvent && (
//                     <div className="modal fade show d-block" id="view_invoice">
//                         <div className="modal-dialog modal-dialog-centered modal-lg">
//                             <div className="modal-content">
//                                 <div className="modal-header">
//                                     <button
//                                         type="button"
//                                         className="btn-close custom-btn-close"
//                                         onClick={() => setShowInvoiceModal(false)}
//                                     >
//                                         <X size={20} />
//                                     </button>
//                                 </div>
//                                 <div className="modal-body p-5">
//                                     <div className="row justify-content-between align-items-center mb-3">
//                                         <div className="col-md-6">
//                                             <div className="mb-4">
//                                                 {selectedEvent.bannerImage ? (
//                                                     <img
//                                                         src={selectedEvent.bannerImage}
//                                                         className="img-fluid rounded"
//                                                         alt="Event banner"
//                                                         style={{ maxHeight: '120px' }}
//                                                     />
//                                                 ) : (
//                                                     <img
//                                                         src="assets/img/default-event.png"
//                                                         className="img-fluid rounded"
//                                                         alt="Default event"
//                                                         style={{ maxHeight: '120px' }}
//                                                     />
//                                                 )}
//                                             </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                             <div className="text-end mb-3">
//                                                 <h5 className="text-dark mb-1">Event Details</h5>
//                                                 <p className="mb-1 fw-normal">
//                                                     <FileText size={14} className="me-1" />EVENT-{selectedEvent._id.substring(0, 8).toUpperCase()}
//                                                 </p>
//                                                 <p className="mb-1 fw-normal">
//                                                     <Calendar size={14} className="me-1" />Created: {new Date(selectedEvent.createdAt).toLocaleDateString()}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="row mb-3 d-flex justify-content-between">
//                                         <div className="col-md-7">
//                                             <p className="text-dark mb-2 fw-medium fs-16">Organizer :</p>
//                                             <div>
//                                                 <p className="mb-1">{selectedEvent.organizerId === "665fd983d7e1f2a70b89e5e7" ? 'Edujobz' : 'Other'}</p>
//                                                 <p className="mb-1">{selectedEvent.venue}</p>
//                                                 <p className="mb-1">contact@edujobz.com</p>
//                                             </div>
//                                         </div>
//                                         <div className="col-md-5">
//                                             <p className="text-dark mb-2 fw-medium fs-16">Event Details :</p>
//                                             <div>
//                                                 <p className="mb-1">Type: {selectedEvent.type}</p>
//                                                 <p className="mb-1">Venue: {selectedEvent.venue}</p>
//                                                 <p className="mb-1">Entry: Free</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="mb-4">
//                                         <div className="table-responsive mb-3">
//                                             <table className="table">
//                                                 <thead className="thead-light">
//                                                     <tr>
//                                                         <th>Title</th>
//                                                         <th>Description</th>
//                                                         <th>Date</th>
//                                                         <th>Time</th>
//                                                         <th>Status</th>
//                                                         <th>Registrations</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     <tr>
//                                                         <td>{selectedEvent.title}</td>
//                                                         <td>{selectedEvent.description}</td>
//                                                         <td>{formatDate(new Date(selectedEvent.eventDate))}</td>
//                                                         <td>{selectedEvent.startTime} - {selectedEvent.endTime}</td>
//                                                         <td>
//                                                             <span className={`badge badge-${selectedEvent.status === 'Current' ? 'warning' :
//                                                                 selectedEvent.status === 'Upcoming' ? 'info' :
//                                                                     selectedEvent.status === 'Completed' ? 'success' :
//                                                                         selectedEvent.status === 'On-hold' ? 'secondary' : 'danger'}`}>
//                                                                 {selectedEvent.status}
//                                                             </span>
//                                                         </td>
//                                                         <td>{selectedEvent.registrations?.length || 0}</td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>

//                                     <div className="card border mb-0">
//                                         <div className="card-body">
//                                             <p className="text-dark fw-medium mb-2">Event Description:</p>
//                                             <p className="fs-12 fw-normal d-flex align-items-baseline mb-2">
//                                                 <Circle size={8} className="text-primary me-2" fill="currentColor" />
//                                                 {selectedEvent.description}
//                                             </p>
//                                             <p className="fs-12 fw-normal d-flex align-items-baseline">
//                                                 <Circle size={8} className="text-primary me-2" fill="currentColor" />
//                                                 Event Coordinator: {selectedEvent.coordinator || 'Not specified'}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     <div className="mt-4 text-end">
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => setShowInvoiceModal(false)}
//                                         >
//                                             Close
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Delete Confirmation Modal */}
//                 {showDeleteModal && selectedEvent && (
//                     <div className="modal fade show d-block" id="delete_modal">
//                         <div className="modal-dialog modal-dialog-centered">
//                             <div className="modal-content">
//                                 <div className="modal-body text-center">
//                                     <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
//                                         <Trash2 size={36} className="text-danger" />
//                                     </span>
//                                     <h4 className="mb-1">Confirm Delete</h4>
//                                     <p className="mb-3">
//                                         Are you sure you want to delete the event "{selectedEvent.title}"? This action cannot be undone.
//                                     </p>
//                                     <div className="d-flex justify-content-center">
//                                         <button
//                                             className="btn btn-light me-3"
//                                             onClick={() => setShowDeleteModal(false)}
//                                         >
//                                             Cancel
//                                         </button>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={handleConfirmDelete}
//                                         >
//                                             Yes, Delete
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Toast Notification */}
//                 {toast.show && (
//                     <div
//                         className={`toast show position-fixed top-0 end-0 m-3 ${toast.type === 'success' ? 'bg-success' : 'bg-danger'}`}
//                         style={{
//                             zIndex: 9999,
//                             transition: 'opacity 0.5s ease-out',
//                             opacity: toast.show ? 1 : 0
//                         }}
//                     >
//                         <div className="toast-body text-white d-flex align-items-center">
//                             {toast.type === 'success' ? (
//                                 <CheckCircle className="me-2" />
//                             ) : (
//                                 <AlertCircle className="me-2" />
//                             )}
//                             {toast.message}
//                         </div>
//                     </div>
//                 )}

//                 {/* Modal Backdrop */}
//                 {(showInvoiceModal || showDeleteModal) && (
//                     <div
//                         className="modal-backdrop fade show"
//                         onClick={() => {
//                             setShowInvoiceModal(false);
//                             setShowDeleteModal(false);
//                         }}
//                     ></div>
//                 )}
//             </div>
//             <EmployerAdminFooter />
//         </>
//     );
// };

// export default EmployerAdminEnrollment;

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronsUp,
  FileText,
  Download,
  Trash2,
  TrendingUp,
  Circle,
  FileType2,
  FileSpreadsheet,
  Calendar,
  FileOutput,
  CreditCard,
  Search,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  MapPin,
  MessageCircleCode,
  Edit,
  User,
  X,
  Clock,
  Users,
} from "lucide-react";
import EmployerAdminHeader from "../Layout/EmployerAdminHeader";
import EmployerAdminFooter from "../Layout/EmployerAdminFooter";
import {
  getAllEvents,
  getEventDetails,
} from "../../../api/services/projectServices";
import { useNavigate, useParams } from "react-router-dom";

const EmployerAdminEnrollment = () => {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [organizerFilter, setOrganizerFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { eventId } = useParams();
  const navigate = useNavigate();

  // Helper function to format date as dd/mm/yyyy
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, "0");
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        const processedEvents = response.map((event) => {
          const eventDate = new Date(event.eventDate);
          const today = new Date();
          let status = "Upcoming";

          if (eventDate < today) {
            status = "Completed";
          } else if (eventDate.toDateString() === today.toDateString()) {
            status = "Current";
          }

          if (event._id === "68564338f6e1e50b7331fa57") {
            status = "On-hold";
          } else if (event._id === "6856433af6e1e50b7331fa59") {
            status = "Cancelled";
          }

          return {
            ...event,
            status,
            type: event.category || "Workshop",
            formattedDate: formatDate(event.eventDate),
          };
        });
        setEvents(processedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const filteredData = events.filter((event) => {
    const matchesSearch =
      (event.title?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (event.venue?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesOrganizer =
      organizerFilter === "All" ||
      (event.organizerId === "665fd983d7e1f2a70b89e5e7"
        ? "Edujobz"
        : "Other") === organizerFilter;

    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;

    const eventDate = new Date(event.eventDate);
    const matchesDate =
      (!fromDate || eventDate >= new Date(fromDate)) &&
      (!toDate || eventDate <= new Date(toDate));

    return matchesSearch && matchesOrganizer && matchesStatus && matchesDate;
  });

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
  };

  const handleDeleteClick = (eventId) => {
    setSelectedEvent(events.find((event) => event._id === eventId));
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;

    try {
      const response = await fetch(
        `https://api.edprofio.com/employer/removeevents/${selectedEvent._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      setEvents(events.filter((event) => event._id !== selectedEvent._id));
      setShowDeleteModal(false);
      setSelectedEvent(null);
      setToast({
        show: true,
        message: "Event deleted successfully",
        type: "success",
      });
    } catch (err) {
      setToast({ show: true, message: err.message, type: "error" });
      setError(err.message);
    }
  };

  const exportToExcel = () => {
    const headers = [
      "Title",
      "Type",
      "Date",
      "Venue",
      "Status",
      "Registrations",
    ];
    const data = filteredData.map((event) => [
      event.title,
      event.type,
      event.formattedDate,
      event.venue,
      event.status,
      event.registrations?.length || 0,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      data.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "events.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    const printContent = `
            <h2>Events Report</h2>
            <table border="1" style="width:100%;border-collapse:collapse;">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Venue</th>
                        <th>Status</th>
                        <th>Registrations</th>
                    </tr>
                </thead>
                <tbody>
                    ${filteredData
                      .map(
                        (event) => `
                        <tr>
                            <td>${event.title}</td>
                            <td>${event.type}</td>
                            <td>${event.formattedDate}</td>
                            <td>${event.venue}</td>
                            <td>${event.status}</td>
                            <td>${event.registrations?.length || 0}</td>
                        </tr>
                    `
                      )
                      .join("")}
                </tbody>
            </table>
        `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <html>
                <head>
                    <title>Events Report</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                        @media print {
                            @page { size: landscape; }
                        }
                    </style>
                </head>
                <body>
                    ${printContent}
                    <script>
                        window.onload = function() {
                            setTimeout(function() {
                                window.print();
                                window.close();
                            }, 100);
                        }
                    </script>
                </body>
            </html>
        `);
    printWindow.document.close();
  };

  const handleViewEvent = async (eventId) => {
    try {
      const eventData = await getEventDetails(eventId);
      setSelectedEvent({
        ...eventData,
        formattedDate: formatDate(eventData.eventDate),
        formattedCreatedAt: formatDate(eventData.createdAt),
      });
      setShowInvoiceModal(true);
    } catch (err) {
      setToast({ show: true, message: err.message, type: "error" });
    }
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startEntry = (currentPage - 1) * rowsPerPage + 1;
  const endEntry = Math.min(currentPage * rowsPerPage, filteredData.length);
  const currentData = filteredData.slice(startEntry - 1, endEntry);

  // Stats data based on events
  const statsData = [
    {
      title: "Total Events",
      value: events.length,
      lineClass: "subscription-line-1",
      trend: "+19.01%",
    },
    {
      title: "Current Events",
      value: events.filter((e) => e.status === "Current").length,
      lineClass: "subscription-line-2",
      trend: "+19.01%",
    },
    {
      title: "Upcoming Events",
      value: events.filter((e) => e.status === "Upcoming").length,
      lineClass: "subscription-line-3",
      trend: "+19.01%",
    },
    {
      title: "Completed Events",
      value: events.filter((e) => e.status === "Completed").length,
      lineClass: "subscription-line-4",
      trend: "+19.01%",
    },
  ];

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <EmployerAdminHeader />
      <div className="content">
        {/* Breadcrumb Section */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto">
            <h2>Events Management</h2>
          </div>
          <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
            {/* Date Range Picker */}
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input
                  type="date"
                  className="form-control"
                  placeholder="From Date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
                <span className="input-icon-addon">
                  <Calendar size={16} />
                </span>
              </div>
            </div>
            <div className="me-2">
              <div className="input-icon-end position-relative">
                <input
                  type="date"
                  className="form-control"
                  placeholder="To Date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
                <span className="input-icon-addon">
                  <Calendar size={16} />
                </span>
              </div>
            </div>

            {/* Organizer Filter Dropdown */}
            <div className="dropdown me-2">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                {organizerFilter === "All" ? "Organizer" : organizerFilter}{" "}
                <ChevronDown size={16} className="ms-1" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setOrganizerFilter("All")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setOrganizerFilter("Edujobz")}
                  >
                    EdProfio
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setOrganizerFilter("Other")}
                  >
                    Other
                  </button>
                </li>
              </ul>
            </div>

            {/* Status Filter Dropdown */}
            <div className="dropdown me-2">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                {statusFilter === "All" ? "Status" : statusFilter}{" "}
                <ChevronDown size={16} className="ms-1" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("All")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("Current")}
                  >
                    Current
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("Upcoming")}
                  >
                    Upcoming
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("Completed")}
                  >
                    Completed
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("On-hold")}
                  >
                    On-hold
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={() => setStatusFilter("Cancelled")}
                  >
                    Cancelled
                  </button>
                </li>
              </ul>
            </div>

            {/* Export Dropdown */}
            <div className="dropdown">
              <button className="dropdown-toggle btn btn-white d-inline-flex align-items-center">
                <FileOutput size={16} className="me-1" /> Export{" "}
                <ChevronDown size={16} className="ms-1" />
              </button>
              <ul className="dropdown-menu dropdown-menu-end p-3">
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={exportToPDF}
                  >
                    <FileType2 size={16} className="me-1" /> Export as PDF
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item rounded-1"
                    onClick={exportToExcel}
                  >
                    <FileSpreadsheet size={16} className="me-1" /> Export as
                    Excel
                  </button>
                </li>
              </ul>
            </div>

            {/* Collapse Button */}
            <div className="head-icons">
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Collapse"
              >
                <ChevronsUp size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="row">
          {statsData.map((stat, index) => (
            <div className="col-xl-3 col-md-6 d-flex" key={index}>
              <div className="card flex-fill">
                <div className="card-body">
                  <div className="border-bottom pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-7">
                        <div>
                          <span className="fs-14 fw-normal text-truncate mb-1">
                            {stat.title}
                          </span>
                          <h5>{stat.value}</h5>
                        </div>
                      </div>
                      <div className="col-5">
                        <div>
                          <span
                            className={stat.lineClass}
                            data-width="100%"
                          ></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <p className="fs-12 fw-normal d-flex align-items-center text-truncate">
                      <span className="text-primary fs-12 d-flex align-items-center me-1">
                        <TrendingUp size={14} className="me-1" />
                        {stat.trend}
                      </span>
                      from last week
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Pagination Controls */}
        <div className="row mb-3">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_length d-flex align-items-center">
              <label className="me-2 mb-0">Show</label>
              <select
                className="form-select form-select-sm w-auto"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{ padding: "0.25rem 1.5rem 0.25rem 0.5rem" }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <label className="ms-2 mb-0">entries</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_filter d-flex justify-content-end">
              <div
                className="input-group input-group-sm"
                style={{ width: "250px" }}
              >
                <input
                  type="search"
                  className="form-control form-control-sm"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{ padding: "0.375rem 0.75rem" }}
                />
                <span className="input-group-text bg-white">
                  <Search size={16} className="text-muted" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Events Table Section */}
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
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>Event Title</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Venue</th>
                    <th>Organizer</th>
                    <th>Registrations</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((event) => (
                    <tr key={event._id}>
                      <td>
                        <div className="form-check form-check-md">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectAll}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center file-name-icon">
                          <div className="avatar avatar-md border rounded-circle">
                            <img
                              src={
                                event.bannerImage ||
                                "assets/img/default-event.png"
                              }
                              className="img-fluid"
                              alt={event.title}
                            />
                          </div>
                          <div className="ms-2">
                            <h6 className="fw-medium">{event.title}</h6>
                          </div>
                        </div>
                      </td>
                      <td>{event.type}</td>
                      <td>{event.formattedDate}</td>
                      <td>{event.venue}</td>
                      <td>
                        {event.organizerId === "665fd983d7e1f2a70b89e5e7"
                          ? "Edujobz"
                          : "Other"}
                      </td>
                      <td>{event.registrations?.length || 0}</td>
                      <td>
                        <span
                          className={`badge badge-${
                            event.status === "Current"
                              ? "warning"
                              : event.status === "Upcoming"
                              ? "info"
                              : event.status === "Completed"
                              ? "success"
                              : event.status === "On-hold"
                              ? "secondary"
                              : "danger"
                          } 
                                                    d-flex align-items-center badge-xs`}
                        >
                          <Circle
                            size={10}
                            className="me-1"
                            fill="currentColor"
                          />
                          {event.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-icon d-inline-flex">
                          <button
                            className="me-2 btn btn-sm btn-icon"
                            onClick={() => handleViewEvent(event._id)}
                            aria-label="View details"
                          >
                            <FileText size={16} />
                          </button>
                          <button
                            className="me-2 btn btn-sm btn-icon"
                            aria-label="Download"
                          >
                            <Download size={16} />
                          </button>
                          <button
                            className="btn btn-sm btn-icon text-danger"
                            onClick={() => handleDeleteClick(event._id)}
                            aria-label="Delete"
                          >
                            <Trash2 size={16} />
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

        {/* Pagination Section */}
        <div className="row mt-3">
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_info">
              Showing {startEntry} to {endEntry} of {filteredData.length}{" "}
              entries
              {searchTerm && filteredData.length !== events.length && (
                <span className="text-muted">
                  {" "}
                  (filtered from {events.length} total entries)
                </span>
              )}
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="dataTables_paginate paging_simple_numbers d-flex justify-content-end">
              <ul className="pagination mb-0">
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    &lt;
                  </button>
                </li>

                {/* Always show first page */}
                <li
                  className={`page-item ${currentPage === 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </button>
                </li>

                {/* Show ellipsis if needed */}
                {currentPage > 3 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}

                {/* Show current page and adjacent pages */}
                {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                  const page =
                    Math.max(2, Math.min(currentPage - 1, totalPages - 3)) + i;
                  if (page > 1 && page < totalPages) {
                    return (
                      <li
                        key={page}
                        className={`page-item ${
                          currentPage === page ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    );
                  }
                  return null;
                })}

                {/* Show ellipsis if needed */}
                {currentPage < totalPages - 2 && totalPages > 4 && (
                  <li className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                )}

                {/* Always show last page if there is more than one page */}
                {totalPages > 1 && (
                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </li>
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* View Event Details Modal */}
        {showInvoiceModal && selectedEvent && (
          <div className="modal fade show d-block" id="view_invoice">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close custom-btn-close"
                    onClick={() => setShowInvoiceModal(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="modal-body p-5">
                  <div className="row justify-content-between align-items-center mb-3">
                    <div className="col-md-6">
                      <div className="mb-4">
                        {selectedEvent.bannerImage ? (
                          <img
                            src={selectedEvent.bannerImage}
                            className="img-fluid rounded"
                            alt="Event banner"
                            style={{ maxHeight: "120px" }}
                          />
                        ) : (
                          <img
                            src="assets/img/default-event.png"
                            className="img-fluid rounded"
                            alt="Default event"
                            style={{ maxHeight: "120px" }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="text-end mb-3">
                        <h5 className="text-dark mb-1">Event Details</h5>
                        <p className="mb-1 fw-normal">
                          <FileText size={14} className="me-1" />
                          EVENT-
                          {selectedEvent._id.substring(0, 8).toUpperCase()}
                        </p>
                        <p className="mb-1 fw-normal">
                          <Calendar size={14} className="me-1" />
                          Created: {selectedEvent.formattedCreatedAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3 d-flex justify-content-between">
                    <div className="col-md-7">
                      <p className="text-dark mb-2 fw-medium fs-16">
                        Organizer :
                      </p>
                      <div>
                        <p className="mb-1">
                          {selectedEvent.organizerId ===
                          "665fd983d7e1f2a70b89e5e7"
                            ? "Edujobz"
                            : "Other"}
                        </p>
                        <p className="mb-1">{selectedEvent.venue}</p>
                        <p className="mb-1">contact@edprofio.com</p>
                      </div>
                    </div>
                    <div className="col-md-5">
                      <p className="text-dark mb-2 fw-medium fs-16">
                        Event Details :
                      </p>
                      <div>
                        <p className="mb-1">Type: {selectedEvent.type}</p>
                        <p className="mb-1">Venue: {selectedEvent.venue}</p>
                        <p className="mb-1">Entry: Free</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="table-responsive mb-3">
                      <table className="table">
                        <thead className="thead-light">
                          <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Registrations</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{selectedEvent.title}</td>
                            <td>{selectedEvent.description}</td>
                            <td>{selectedEvent.formattedDate}</td>
                            <td>
                              {selectedEvent.startTime} -{" "}
                              {selectedEvent.endTime}
                            </td>
                            <td>
                              <span
                                className={`badge badge-${
                                  selectedEvent.status === "Current"
                                    ? "warning"
                                    : selectedEvent.status === "Upcoming"
                                    ? "info"
                                    : selectedEvent.status === "Completed"
                                    ? "success"
                                    : selectedEvent.status === "On-hold"
                                    ? "secondary"
                                    : "danger"
                                }`}
                              >
                                {selectedEvent.status}
                              </span>
                            </td>
                            <td>{selectedEvent.registrations?.length || 0}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="card border mb-0">
                    <div className="card-body">
                      <p className="text-dark fw-medium mb-2">
                        Event Description:
                      </p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline mb-2">
                        <Circle
                          size={8}
                          className="text-primary me-2"
                          fill="currentColor"
                        />
                        {selectedEvent.description}
                      </p>
                      <p className="fs-12 fw-normal d-flex align-items-baseline">
                        <Circle
                          size={8}
                          className="text-primary me-2"
                          fill="currentColor"
                        />
                        Event Coordinator:{" "}
                        {selectedEvent.coordinator || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowInvoiceModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedEvent && (
          <div className="modal fade show d-block" id="delete_modal">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body text-center">
                  <span className="avatar avatar-xl bg-transparent-danger text-danger mb-3">
                    <Trash2 size={36} className="text-danger" />
                  </span>
                  <h4 className="mb-1">Confirm Delete</h4>
                  <p className="mb-3">
                    Are you sure you want to delete the event "
                    {selectedEvent.title}"? This action cannot be undone.
                  </p>
                  <div className="d-flex justify-content-center">
                    <button
                      className="btn btn-light me-3"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={handleConfirmDelete}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div
            className={`toast show position-fixed top-0 end-0 m-3 ${
              toast.type === "success" ? "bg-success" : "bg-danger"
            }`}
            style={{
              zIndex: 9999,
              transition: "opacity 0.5s ease-out",
              opacity: toast.show ? 1 : 0,
            }}
          >
            <div className="toast-body text-white d-flex align-items-center">
              {toast.type === "success" ? (
                <CheckCircle className="me-2" />
              ) : (
                <AlertCircle className="me-2" />
              )}
              {toast.message}
            </div>
          </div>
        )}

        {/* Modal Backdrop */}
        {(showInvoiceModal || showDeleteModal) && (
          <div
            className="modal-backdrop fade show"
            onClick={() => {
              setShowInvoiceModal(false);
              setShowDeleteModal(false);
            }}
          ></div>
        )}
      </div>
      <EmployerAdminFooter />
    </>
  );
};

export default EmployerAdminEnrollment;
