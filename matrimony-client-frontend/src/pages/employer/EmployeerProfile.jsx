// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Button,
//   Badge,
//   Accordion,
//   Tab,
//   Nav,
//   ProgressBar,
//   Dropdown,
//   Form,
//   Modal,
//   ListGroup,
//   Table
// } from 'react-bootstrap';
// import {
//   ChevronDown,
//   Edit,
//   CirclePlus,
//   ChevronsUp,
//   Check,
//   X,
//   Star,
//   StarFill,
//   Phone,
//   Mail,
//   MapPin,
//   Calendar,
//   User,
//   Users,
//   UserCheck,
//   Bookmark,
//   FileInvoice,
//   FileText,
//   File,
//   Plus,
//   Trash,
//   Eye,
//   Download,
//   GridDots,
//   CheckCircle,
//   CircleDot,
//   CalendarCheck,
//   Photo,
//   Id,
//   PointFilled,
//   DiscCheck,
//   ArrowLeft,
//   MessageHeart,
//   Copy,
//   Fax,
//   PhoneCall,
//   SquareRoundedPlusFilled,
//   SquareRoundedCheckFilled,
//   CheckupList,
//   CircleDotFilled,
//   Maximize,
//   Link,
//   ArrowsLeftRight,
//   FileInvoice as FileInvoiceIcon,
//   BasketCode,
//   FileDescription,
//   FolderOpen,
//   UserShield,
//   UserStar,
//   CalendarCheck as CalendarCheckIcon,
//   SquareRoundedX
// } from 'react-bootstrap-icons';

// const SchoolDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [school, setSchool] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // Modal states
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [showFamilyModal, setShowFamilyModal] = useState(false);
//   const [showEducationModal, setShowEducationModal] = useState(false);
//   const [showExperienceModal, setShowExperienceModal] = useState(false);
//   const [showAssetModal, setShowAssetModal] = useState(false);
//   const [showIssueModal, setShowIssueModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Form states
//   const [formData, setFormData] = useState({
//     schoolName: '',
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: '',
//     pincode: '',
//     institutionName: '',
//     board: '',
//     institutionType: '',
//     website: '',
//     userEmail: '',
//     userMobile: '',
//     userProfilePic: ''
//   });

//   useEffect(() => {
//     const fetchSchoolDetails = async () => {
//       try {
//         const response = await axios.get(`/api/employer/fetchemployer/${id}`);
//         setSchool(response.data);
//         setFormData({
//           schoolName: response.data.schoolName || '',
//           firstName: response.data.firstName || '',
//           lastName: response.data.lastName || '',
//           address: response.data.address || '',
//           city: response.data.city || '',
//           state: response.data.state || '',
//           pincode: response.data.pincode || '',
//           institutionName: response.data.institutionName || '',
//           board: response.data.board || '',
//           institutionType: response.data.institutionType || '',
//           website: response.data.website || '',
//           userEmail: response.data.userEmail || '',
//           userMobile: response.data.userMobile || '',
//           userProfilePic: response.data.userProfilePic || ''
//         });
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch school details');
//         setLoading(false);
//       }
//     };

//     fetchSchoolDetails();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/api/employer/${id}`, formData);
//       setShowEditModal(false);
//       setShowSuccessModal(true);
//       // Refresh data
//       const response = await axios.get(`/api/employer/fetchemployer/${id}`);
//       setSchool(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to update school');
//     }
//   };

//   if (loading) return <div className="text-center py-5">Loading...</div>;
//   if (error) return <div className="text-center py-5 text-danger">{error}</div>;
//   if (!school) return <div className="text-center py-5">School not found</div>;

//   return (
//     <div className="page-wrapper">
//       <div className="content">
//         {/* Breadcrumb */}
//         <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
//           <div className="my-auto mb-2">
//             <h6 className="fw-medium d-inline-flex align-items-center mb-3">
//               <Button variant="link" onClick={() => navigate('/employees')} className="p-0">
//                 <ArrowLeft className="me-2" /> School Details
//               </Button>
//             </h6>
//           </div>
//           <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
//             <div className="mb-2">
//               <Button variant="primary" onClick={() => setShowEditModal(true)} className="me-2">
//                 <Edit className="me-1" /> Edit School
//               </Button>
//               <Button variant="secondary" onClick={() => setShowBankModal(true)}>
//                 <CirclePlus className="me-2" /> Bank & Statutory
//               </Button>
//             </div>
//             <div className="head-icons ms-2">
//               <Button variant="link" data-bs-toggle="tooltip" title="Collapse">
//                 <ChevronsUp />
//               </Button>
//             </div>
//           </div>
//         </div>
//         {/* /Breadcrumb */}

//         <Row>
//           <Col xl={4} className="theiaStickySidebar">
//             <Card className="card-bg-1">
//               <Card.Body className="p-0">
//                 <div className="text-center px-3 pb-3 border-bottom">
//                   <span className="avatar avatar-xl avatar-rounded border border-2 border-white m-auto d-flex mb-2">
//                     <img 
//                       src={school.userProfilePic || 'assets/img/users/user-13.jpg'} 
//                       className="w-auto h-auto" 
//                       alt="School" 
//                     />
//                   </span>
//                   <div className="mb-3">
//                     <h5 className="d-flex align-items-center justify-content-center mb-1">
//                       {school.schoolName}
//                       <DiscCheck className="text-success ms-1" />
//                     </h5>
//                     <Badge bg="soft-secondary" className="fw-medium me-2">
//                       <PointFilled className="me-1" /> {school.board || 'CBSE'}
//                     </Badge>
//                     <Badge bg="soft-secondary" className="fw-medium me-2">
//                       <PointFilled className="me-1" /> UPTO Grade 12
//                     </Badge>
//                     <Badge bg="soft-secondary" className="fw-medium">
//                       <PointFilled className="me-1" /> Since 2001
//                     </Badge>
//                   </div>
//                   <div>
//                     <div className="d-flex align-items-center justify-content-between mb-2">
//                       <span className="d-inline-flex align-items-center">
//                         <Id className="me-2" /> Client ID
//                       </span>
//                       <p className="text-dark">CLT-0024</p>
//                     </div>
//                     <div className="d-flex align-items-center justify-content-between mb-2">
//                       <span className="d-inline-flex align-items-center">
//                         <Star className="me-2" /> Team
//                       </span>
//                       <p className="text-dark">UI/UX Design</p>
//                     </div>
//                     <div className="d-flex align-items-center justify-content-between mb-2">
//                       <span className="d-inline-flex align-items-center">
//                         <CalendarCheckIcon className="me-2" /> EdProfioSubscription Date
//                       </span>
//                       <p className="text-dark">1st Jan 2023</p>
//                     </div>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span className="d-inline-flex align-items-center">
//                         <CalendarCheckIcon className="me-2" /> Admin User
//                       </span>
//                       <div className="d-flex align-items-center">
//                         <span className="avatar avatar-sm avatar-rounded me-2">
//                           <img src="assets/img/profiles/avatar-12.jpg" alt="Admin" />
//                         </span>
//                         <p className="text-gray-9 mb-0">Doglas Martini</p>
//                       </div>
//                     </div>
//                     <Row className="gx-2 mt-3">
//                       <Col xs={6}>
//                         <Button variant="dark" block onClick={() => setShowEditModal(true)}>
//                           <Edit className="me-1" /> Edit Info
//                         </Button>
//                       </Col>
//                       <Col xs={6}>
//                         <Button variant="primary" block href="/chat">
//                           <MessageHeart className="me-1" /> Message
//                         </Button>
//                       </Col>
//                     </Row>
//                   </div>
//                 </div>
//                 <div className="p-3 border-bottom">
//                   <div className="d-flex align-items-center justify-content-between mb-2">
//                     <h6>Basic information</h6>
//                     <Button variant="icon" size="sm" onClick={() => setShowEditModal(true)}>
//                       <Edit />
//                     </Button>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between mb-2">
//                     <span className="d-inline-flex align-items-center">
//                       <Phone className="me-2" /> Phone
//                     </span>
//                     <p className="text-dark">(163) 2459 315</p>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between mb-2">
//                     <span className="d-inline-flex align-items-center">
//                       <Mail className="me-2" /> Email
//                     </span>
//                     <a href={`mailto:${school.userEmail}`} className="text-info d-inline-flex align-items-center">
//                       {school.userEmail}
//                       <Copy className="text-dark ms-2" />
//                     </a>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between mb-2">
//                     <span className="d-inline-flex align-items-center">
//                       <PhoneCall className="me-2" /> Landline
//                     </span>
//                     <p className="text-dark text-end">(080)-12345678</p>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between mb-2">
//                     <span className="d-inline-flex align-items-center">
//                       <Fax className="me-2" /> Fax
//                     </span>
//                     <p className="text-dark text-end">(080)-12345678</p>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span className="d-inline-flex align-items-center">
//                       <MapPin className="me-2" /> Address
//                     </span>
//                     <p className="text-dark text-end">
//                       {school.address || '1861 Bayonne Ave'}, <br />
//                       {school.city || 'Manchester'}, {school.state || 'NJ'}, {school.pincode || '08759'}
//                     </p>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col xl={8}>
//             <div>
//               <Tab.Container defaultActiveKey="about">
//                 <div className="tab-content custom-accordion-items">
//                   <Tab.Content>
//                     <Tab.Pane eventKey="about">
//                       <Accordion defaultActiveKey="0" className="accordions-items-seperate">
//                         <Accordion.Item eventKey="0">
//                           <Accordion.Header>
//                             <div className="d-flex align-items-center flex-fill">
//                               <h5>About School</h5>
//                               <Button variant="icon" size="sm" className="ms-auto me-2" onClick={() => setShowEditModal(true)}>
//                                 <Edit />
//                               </Button>
//                             </div>
//                           </Accordion.Header>
//                           <Accordion.Body>
//                             <div className="mt-2">
//                               {school.about || 'As an award winning designer, I deliver exceptional quality work and bring value to your brand! With 10 years of experience and 350+ projects completed worldwide with satisfied customers, I developed the 360° brand approach, which helped me to create numerous brands that are relevant, meaningful and loved.'}
//                             </div>
//                           </Accordion.Body>
//                         </Accordion.Item>

//                         <Accordion.Item eventKey="1">
//                           <Accordion.Header>
//                             <div className="d-flex align-items-center flex-fill">
//                               <h5>Bank Information</h5>
//                               <Button variant="icon" size="sm" className="ms-auto me-2" onClick={() => setShowBankModal(true)}>
//                                 <Edit />
//                               </Button>
//                             </div>
//                           </Accordion.Header>
//                           <Accordion.Body>
//                             <Row>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Bank Name
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">Swiz Intenational Bank</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Bank account no
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">159843014641</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   IFSC Code
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">ICI24504</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Branch
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">Alabama USA</h6>
//                               </Col>
//                             </Row>
//                           </Accordion.Body>
//                         </Accordion.Item>

//                         <Accordion.Item eventKey="2">
//                           <Accordion.Header>
//                             <div className="d-flex align-items-center justify-content-between flex-fill">
//                               <h5>Family Information</h5>                          
//                               <div className="d-flex">
//                                 <Button variant="icon" size="sm" onClick={() => setShowFamilyModal(true)}>
//                                   <Edit />
//                                 </Button>
//                               </div>
//                             </div>
//                           </Accordion.Header>
//                           <Accordion.Body>
//                             <Row>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Name
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">Hendry Peralt</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Relationship
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">Brother</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Date of birth
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">25 May 2014</h6>
//                               </Col>
//                               <Col md={3}>
//                                 <span className="d-inline-flex align-items-center">
//                                   Phone
//                                 </span>
//                                 <h6 className="d-flex align-items-center fw-medium mt-1">+1 265 6956 961</h6>
//                               </Col>
//                             </Row>
//                           </Accordion.Body>
//                         </Accordion.Item>

//                         <Row>
//                           <Col md={6}>
//                             <Accordion.Item eventKey="3">
//                               <Accordion.Header>
//                                 <div className="d-flex align-items-center justify-content-between flex-fill">
//                                   <h5>Education Details</h5>                          
//                                   <div className="d-flex">
//                                     <Button variant="icon" size="sm" onClick={() => setShowEducationModal(true)}>
//                                       <Edit />
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </Accordion.Header>
//                               <Accordion.Body>
//                                 <div>
//                                   <div className="mb-3">
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <span className="d-inline-flex align-items-center fw-normal">
//                                           Oxford University
//                                         </span>
//                                         <h6 className="d-flex align-items-center mt-1">Computer Science</h6>
//                                       </div>
//                                       <p className="text-dark">2020 - 2022</p>
//                                     </div>
//                                   </div>
//                                   <div className="mb-3">
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <span className="d-inline-flex align-items-center fw-normal">
//                                           Cambridge University
//                                         </span>
//                                         <h6 className="d-flex align-items-center mt-1">Computer Network & Systems</h6>
//                                       </div>
//                                       <p className="text-dark">2016- 2019</p>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <span className="d-inline-flex align-items-center fw-normal">
//                                           Oxford School
//                                         </span>
//                                         <h6 className="d-flex align-items-center mt-1">Grade X</h6>
//                                       </div>
//                                       <p className="text-dark">2012 - 2016</p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </Accordion.Body>
//                             </Accordion.Item>
//                           </Col>
//                           <Col md={6}>
//                             <Accordion.Item eventKey="4">
//                               <Accordion.Header>
//                                 <div className="d-flex align-items-center justify-content-between flex-fill">
//                                   <h5>Experience</h5>                          
//                                   <div className="d-flex">
//                                     <Button variant="icon" size="sm" onClick={() => setShowExperienceModal(true)}>
//                                       <Edit />
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </Accordion.Header>
//                               <Accordion.Body>
//                                 <div>
//                                   <div className="mb-3">
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <h6 className="d-inline-flex align-items-center fw-medium">
//                                           Google
//                                         </h6>
//                                         <span className="d-flex align-items-center badge bg-secondary-transparent mt-1">
//                                           <PointFilled className="me-1" />UI/UX Developer
//                                         </span>
//                                       </div>
//                                       <p className="text-dark">Jan 2013 - Present</p>
//                                     </div>
//                                   </div>
//                                   <div className="mb-3">
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <h6 className="d-inline-flex align-items-center fw-medium">
//                                           Salesforce
//                                         </h6>
//                                         <span className="d-flex align-items-center badge bg-secondary-transparent mt-1">
//                                           <PointFilled className="me-1" />Web Developer
//                                         </span>
//                                       </div>
//                                       <p className="text-dark">Dec 2012- Jan 2015</p>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <div className="d-flex align-items-center justify-content-between">
//                                       <div>
//                                         <h6 className="d-inline-flex align-items-center fw-medium">
//                                           HubSpot
//                                         </h6>
//                                         <span className="d-flex align-items-center badge bg-secondary-transparent mt-1">
//                                           <PointFilled className="me-1" />Software Developer
//                                         </span>
//                                       </div>
//                                       <p className="text-dark">Dec 2011- Jan 2012</p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </Accordion.Body>
//                             </Accordion.Item>
//                           </Col>
//                         </Row>
//                       </Accordion>
//                     </Tab.Pane>
//                   </Tab.Content>
//                 </div>
//               </Tab.Container>
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col xxl={3} xl={4} className="theiaStickySidebar">
//             <Card>
//               <Card.Body>
//                 <h5 className="mb-3">School Details</h5>
//                 <ListGroup className="details-list-group mb-4">
//                   <ListGroup.Item>
//                     <span>Client</span>
//                     <p className="text-gray-9">EcoVision Enterprises</p>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>School Total Cost</span>
//                       <p className="text-gray-9">$1400</p>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Hours of Work</span>
//                       <p className="text-gray-9">150 hrs</p>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Created on</span>
//                       <p className="text-gray-9">14 Nov 2026</p>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Started on</span>
//                       <p className="text-gray-9">15 Jan 2026</p>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Due Date</span>
//                       <div className="d-flex align-items-center">
//                         <p className="text-gray-9 mb-0">15 Nov 2026</p>
//                         <Badge bg="danger" className="d-inline-flex align-items-center ms-2">
//                           <SquareRoundedX className="me-1" />1
//                         </Badge>
//                       </div>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Created by</span>
//                       <div className="d-flex align-items-center">
//                         <span className="avatar avatar-sm avatar-rounded me-2">
//                           <img src="assets/img/profiles/avatar-02.jpg" alt="Creator" />
//                         </span>
//                         <p className="text-gray-9 mb-0">Cameron</p>
//                       </div>
//                     </div>
//                   </ListGroup.Item>
//                   <ListGroup.Item>
//                     <div className="d-flex align-items-center justify-content-between">
//                       <span>Priority</span>
//                       <Dropdown>
//                         <Dropdown.Toggle variant="white" size="sm" className="d-inline-flex align-items-center">
//                           <span className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2">
//                             <PointFilled className="text-danger" />
//                           </span> High
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu className="dropdown-menu-end p-3">
//                           <Dropdown.Item className="rounded-1 d-flex justify-content-start align-items-center">
//                             <span className="rounded-circle bg-transparent-danger d-flex justify-content-center align-items-center me-2">
//                               <PointFilled className="text-danger" />
//                             </span>High
//                           </Dropdown.Item>
//                           <Dropdown.Item className="rounded-1 d-flex justify-content-start align-items-center">
//                             <span className="rounded-circle bg-transparent-warning d-flex justify-content-center align-items-center me-2">
//                               <PointFilled className="text-warning" />
//                             </span>Medium
//                           </Dropdown.Item>
//                           <Dropdown.Item className="rounded-1 d-flex justify-content-start align-items-center">
//                             <span className="rounded-circle bg-transparent-success d-flex justify-content-center align-items-center me-2">
//                               <PointFilled className="text-success" />
//                             </span>Low
//                           </Dropdown.Item>
//                         </Dropdown.Menu>
//                       </Dropdown>
//                     </div>
//                   </ListGroup.Item>
//                 </ListGroup>
//                 <h5 className="mb-3">Tasks Details</h5>
//                 <div className="bg-light p-2 rounded">
//                   <span className="d-block mb-1">Tasks Done</span>
//                   <h4 className="mb-2">0 / 0</h4>
//                   <ProgressBar now={0} className="mb-2" />
//                   <p>0% Completed</p>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
          
//           <Col xxl={9} xl={8}>
//             <Card>
//               <Card.Body>
//                 <div className="bg-light rounded p-3 mb-3">
//                   <div className="d-flex align-items-center">
//                     <a href="project-details.html" className="flex-shrink-0 me-2">
//                       <img src="assets/img/social/project-01.svg" alt="Project" />
//                     </a>
//                     <div>
//                       <h6 className="mb-1"><a href="project-details.html">Hospital Administration</a></h6>
//                       <p>School ID : <span className="text-primary"> PRO-0004</span></p>
//                     </div>
//                   </div>
//                 </div>
//                 <Row className="align-items-center">
//                   <Col sm={3}>
//                     <p className="d-flex align-items-center mb-3"><PointFilled className="me-2" />Status</p>
//                   </Col>
//                   <Col sm={9}>
//                     <Badge bg="soft-purple" className="d-inline-flex align-items-center mb-3">
//                       <PointFilled className="me-1" />InProgress
//                     </Badge>
//                   </Col>
//                   <Col sm={3}>
//                     <p className="d-flex align-items-center mb-3"><Users className="me-2" />Team</p>
//                   </Col>
//                   <Col sm={9}>
//                     <div className="d-flex align-items-center mb-3 flex-wrap">
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/profiles/avatar-12.jpg" alt="Team" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Lewis</a></h6>
//                       </div>
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-19.jpg" alt="Team" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Leona</a></h6>
//                       </div>
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-33.jpg" alt="Team" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Pineiro</a></h6>
//                       </div>
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-37.jpg" alt="Team" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Moseley</a></h6>
//                       </div>
//                       <div>
//                         <a href="#" className="d-flex align-items-center fs-12">
//                           <Plus className="me-1" />Add New
//                         </a>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col sm={3}>
//                     <p className="d-flex align-items-center mb-3"><UserShield className="me-2" />Team Lead</p>
//                   </Col>
//                   <Col sm={9}>
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-42.jpg" alt="Lead" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Ruth</a></h6>
//                       </div>
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-44.jpg" alt="Lead" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Meredith</a></h6>
//                       </div>
//                       <div>
//                         <a href="#" className="d-flex align-items-center fs-12">
//                           <Plus className="me-1" />Add New
//                         </a>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col sm={3}>
//                     <p className="d-flex align-items-center mb-3"><UserStar className="me-2" />School Manager</p>
//                   </Col>
//                   <Col sm={9}>
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="bg-gray-100 p-1 rounded d-flex align-items-center me-2">
//                         <a href="#" className="avatar avatar-sm avatar-rounded border border-white flex-shrink-0 me-2">
//                           <img src="assets/img/users/user-45.jpg" alt="Manager" />
//                         </a>
//                         <h6 className="fs-12"><a href="#">Dwight</a></h6>
//                       </div>
//                       <div>
//                         <a href="#" className="d-flex align-items-center fs-12">
//                           <Plus className="me-1" />Add New
//                         </a>
//                       </div>
//                     </div>
//                   </Col>
//                   <Col sm={3}>
//                     <p className="d-flex align-items-center mb-3"><Bookmark className="me-2" />Tags</p>
//                   </Col>
//                   <Col sm={9}>
//                     <div className="d-flex align-items-center mb-3">
//                       <a href="#" className="badge task-tag bg-pink rounded-pill me-2">Admin Panel</a>
//                       <a href="#" className="badge task-tag badge-info rounded-pill">High Tech</a>
//                     </div>
//                   </Col>
//                   <Col sm={12}>
//                     <div className="mb-3">
//                       <h6 className="mb-1">Description</h6>
//                       <p>The Enhanced Patient Management System (EPMS) project aims to modernize and streamline 
//                         the patient management processes within. By integrating advanced technologies and optimizing existing
//                         workflows, the project seeks to improve patient care, enhance operational 
//                         efficiency, and ensure compliance with regulatory standards.
//                       </p>
//                     </div>
//                   </Col>
//                   <Col md={12}>
//                     <div className="bg-soft-secondary p-3 rounded d-flex align-items-center justify-content-between">
//                       <p className="text-secondary mb-0">Time Spent on this project</p>
//                       <h3 className="text-secondary">65/120 <span className="fs-16">Hrs</span></h3>
//                     </div>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>
            
//             <div className="custom-accordion-items">
//               <Accordion defaultActiveKey="0" className="accordions-items-seperate">
//                 <Accordion.Item eventKey="0">
//                   <Accordion.Header>
//                     <h5>Tasks</h5>
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     <ListGroup className="list-group-flush">
//                       <ListGroup.Item className="border rounded mb-2 p-2">
//                         <Row className="align-items-center g-3">
//                           <Col md={7}>
//                             <div className="todo-inbox-check d-flex align-items-center flex-wrap">
//                               <span><GridDots className="me-2" /></span>
//                               <Form.Check type="checkbox" className="me-2" />
//                               <span className="me-2 d-flex align-items-center">
//                                 <StarFill className="filled" />
//                               </span>
//                               <div className="strike-info">
//                                 <h4 className="fs-14">Patient appointment booking</h4>
//                               </div>
//                             </div>
//                           </Col>
//                           <Col md={5}>
//                             <div className="d-flex align-items-center justify-content-md-end flex-wrap">
//                               <Badge bg="soft-pink" className="d-inline-flex align-items-center me-3">
//                                 <PointFilled className="me-1" />Onhold
//                               </Badge>
//                               <div className="d-flex align-items-center">
//                                 <div className="avatar-list-stacked avatar-group-sm">
//                                   <span className="avatar avatar-rounded">
//                                     <img className="border border-white" src="assets/img/profiles/avatar-13.jpg" alt="img" />
//                                   </span>
//                                   <span className="avatar avatar-rounded">
//                                     <img className="border border-white" src="assets/img/profiles/avatar-14.jpg" alt="img" />
//                                   </span>
//                                   <span className="avatar avatar-rounded">
//                                     <img className="border border-white" src="assets/img/profiles/avatar-15.jpg" alt="img" />
//                                   </span>
//                                 </div>
//                                 <Dropdown className="ms-2">
//                                   <Dropdown.Toggle variant="link" className="d-inline-flex align-items-center">
//                                     <GridDots />
//                                   </Dropdown.Toggle>
//                                   <Dropdown.Menu className="dropdown-menu-end p-3">
//                                     <Dropdown.Item onClick={() => setShowEditModal(true)}>
//                                       <Edit className="me-2" />Edit
//                                     </Dropdown.Item>
//                                     <Dropdown.Item onClick={() => setShowDeleteModal(true)}>
//                                       <Trash className="text-danger me-2" />Delete
//                                     </Dropdown.Item>
//                                     <Dropdown.Item onClick={() => {}}>
//                                       <Eye className="me-2" />View
//                                     </Dropdown.Item>
//                                   </Dropdown.Menu>
//                                 </Dropdown>
//                               </div>
//                             </div>
//                           </Col>
//                         </Row>
//                       </ListGroup.Item>
                      
//                       {/* More task items would go here */}
                      
//                       <Button 
//                         variant="outline-primary" 
//                         className="border-dashed w-100 text-start"
//                         onClick={() => {}}
//                       >
//                         <Plus className="me-2" />New task
//                       </Button>
//                     </ListGroup>
//                   </Accordion.Body>
//                 </Accordion.Item>
                
//                 <Accordion.Item eventKey="1">
//                   <Accordion.Header>
//                     <div className="d-flex align-items-center flex-fill">
//                       <h5>Images</h5>
//                       <div className="ms-auto d-flex align-items-center">
//                         <Button variant="primary" size="sm" className="d-inline-flex align-items-center me-3">
//                           <SquareRoundedPlusFilled className="me-1" />Add New
//                         </Button>
//                       </div>
//                     </div>
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     {/* Image carousel would go here */}
//                     <div className="media-images-slider">
//                       {/* Carousel items */}
//                     </div>
//                   </Accordion.Body>
//                 </Accordion.Item>
                
//                 <Accordion.Item eventKey="2">
//                   <Accordion.Header>
//                     <div className="d-flex align-items-center flex-fill">
//                       <h5>Files</h5>
//                       <div className="ms-auto d-flex align-items-center">
//                         <Button variant="primary" size="sm" className="d-inline-flex align-items-center me-3">
//                           <SquareRoundedPlusFilled className="me-1" />Add New
//                         </Button>
//                       </div>
//                     </div>
//                   </Accordion.Header>
//                   <Accordion.Body>
//                     {/* Files carousel would go here */}
//                     <div className="files-carousel">
//                       {/* File cards */}
//                     </div>
//                   </Accordion.Body>
//                 </Accordion.Item>
                
//                 <Row>
//                   <