// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { getEmployeeDetails } from '../../../api/services/projectServices';

// const ApplyJob = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [employeeData, setEmployeeData] = useState(null);
//   const [formData, setFormData] = useState({
//     firstName: '',
//     email: '',
//     phone: '',
//     experience: '',
//     jobrole: '',
//     currentcity: '',
//     resume: null,
//     profileurl: '',
//     resumeUrl: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitError, setSubmitError] = useState(null);
//   const [formErrors, setFormErrors] = useState({});
//   const [activeStep, setActiveStep] = useState(1);

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('authToken');
//       const userData = JSON.parse(localStorage.getItem('userData'));

//       if (!token || !userData) {
//         // Redirect to login immediately if not authenticated
//         navigate('/login', { state: { from: `/apply-job/${id}` } });
//         return null;
//       }
//       return userData._id; // Return the user ID if authenticated
//     };

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Check authentication first - will redirect if not authenticated
//         const userId = checkAuth();
//         if (!userId) return; // Redirect already happened

//         // Fetch job details
//         const jobResponse = await axios.get(`https://api.edprofio.com/employer/viewjobs/${id}`);
//         if (!jobResponse.data) {
//           throw new Error('Failed to fetch job details');
//         }
//         setJob(jobResponse.data);

//         // Fetch employee details
//         const token = localStorage.getItem('authToken');
//         console.log('Fetching employee details for userId:', userId);
//         const employeeResponse = await getEmployeeDetails(userId, token);
//         console.log('Employee data received:', employeeResponse);

//         if (!employeeResponse) {
//           console.warn('No employee data received');
//           return;
//         }

//         setEmployeeData(employeeResponse);

//         // Prefill form with employee data
//         const newFormData = {
//           firstName: employeeResponse.userName || employeeResponse.name || '',
//           email: employeeResponse.userEmail || employeeResponse.email || '',
//           phone: employeeResponse.userMobile || employeeResponse.mobile || employeeResponse.phone || '',
//           experience: employeeResponse.experience || '',
//           jobrole: employeeResponse.currentJobRole || employeeResponse.jobRole || '',
//           currentcity: employeeResponse.currentCity || employeeResponse.city || '',
//           profileurl: employeeResponse.profileUrl || employeeResponse.linkedIn || '',
//           resume: employeeResponse.resume ? {
//             name: employeeResponse.resume.name || 'resume.pdf',
//             url: employeeResponse.resume.url || ''
//           } : null
//         };

//         console.log('Prefilling form with:', newFormData);
//         setFormData(newFormData);

//       } catch (err) {
//         console.error('Error in fetchData:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to load data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [id, navigate]);

//   const validateStep = (step) => {
//     const errors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^[0-9]{10,15}$/;

//     if (step === 1) {
//       if (!formData.firstName.trim()) errors.firstName = 'Full name is required';
//       if (!formData.email) {
//         errors.email = 'Email is required';
//       } else if (!emailRegex.test(formData.email)) {
//         errors.email = 'Please enter a valid email';
//       }
//       if (!formData.phone) {
//         errors.phone = 'Phone number is required';
//       } else if (!phoneRegex.test(formData.phone)) {
//         errors.phone = 'Please enter a valid phone number (10-15 digits)';
//       }
//     }

//     if (step === 2) {
//       if (!formData.experience) errors.experience = 'Experience is required';
//       if (!formData.jobrole) errors.jobrole = 'Current job role is required';
//       if (!formData.currentcity) errors.currentcity = 'Current city is required';
//     }

//     if (step === 3) {
//       if (!formData.resume && !employeeData?.resume) errors.resume = 'Resume is required';
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   const handleNext = () => {
//     if (validateStep(activeStep)) {
//       setActiveStep(prev => prev + 1);
//     }
//   };

//   const handleBack = () => {
//     setActiveStep(prev => prev - 1);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       resume: e.target.files[0]
//     }));
//   };

//   const uploadResume = async (file) => {
//     const formData = new FormData();
//     formData.append('resume', file);

//     try {
//       const response = await axios.post(
//         'https://api.edprofio.com/upload/resume',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//           }
//         }
//       );
//       return response.data;
//     } catch (err) {
//       console.error('Error uploading resume:', err);
//       throw err;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateStep(3)) return;

//     setIsSubmitting(true);
//     setSubmitError(null);

//     try {
//       const token = localStorage.getItem('authToken');
//       const userData = JSON.parse(localStorage.getItem('userData'));

//       if (!token || !userData) {
//         navigate('/login', { state: { from: `/apply-job/${id}` } });
//         return;
//       }

//       let resumeData = formData.resume;

//       // If a new file was uploaded, process it
//       if (formData.resume && formData.resume instanceof File) {
//         resumeData = await uploadResume(formData.resume);
//       } else if (employeeData?.resume) {
//         // Use existing resume from profile if available
//         resumeData = employeeData.resume;
//       }

//       const payload = {
//         firstName: formData.firstName,
//         email: formData.email,
//         phone: formData.phone,
//         experience: formData.experience,
//         jobrole: formData.jobrole,
//         currentcity: formData.currentcity,
//         profileurl: formData.profileurl,
//         resume: resumeData,
//         applicantId: userData._id
//       };

//       const response = await axios.post(
//         `https://api.edprofio.com/${id}/apply`,
//         payload,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       if (response.data.success) {
//         navigate('/job-vacancies', {
//           state: {
//             applicationSuccess: true,
//             jobTitle: job.jobTitle,
//             companyName: job.companyName
//           }
//         });
//       } else {
//         throw new Error(response.data.message || 'Application failed');
//       }
//     } catch (err) {
//       setSubmitError(err.response?.data?.message || err.message || 'Failed to submit application');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//         <p className="mt-2">Loading job details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-5 text-danger">
//         <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
//         <h5>Error loading job details</h5>
//         <p>{error}</p>
//         <button
//           className="btn btn-primary mt-3"
//           onClick={() => window.location.reload()}
//         >
//           Try Again
//         </button>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="text-center py-5">
//         <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
//         <h4>Job not found</h4>
//         <p className="text-muted">The job you're looking for doesn't exist or may have been removed</p>
//       </div>
//     );
//   }

//   return (
//     <div className="section section-theme-1 pt-60 pt-md-90 pb-60 pb-md-90">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-lg-10 col-xl-8">
//             <div className="section-header text-center mb-45">
//               <h2 className="text-secondary mb-20">Apply for {job.jobTitle}</h2>
//               <p className="mb-0">{job.companyName} • {job.location}</p>
//             </div>

//             <div className="application-stepper mb-45">
//               <div className={`stepper-step ${activeStep >= 1 ? 'active' : ''}`}>
//                 <div className="step-number">1</div>
//                 <div className="step-label">Personal Information</div>
//               </div>
//               <div className="stepper-connector"></div>
//               <div className={`stepper-step ${activeStep >= 2 ? 'active' : ''}`}>
//                 <div className="step-number">2</div>
//                 <div className="step-label">Professional Details</div>
//               </div>
//               <div className="stepper-connector"></div>
//               <div className={`stepper-step ${activeStep >= 3 ? 'active' : ''}`}>
//                 <div className="step-number">3</div>
//                 <div className="step-label">Review & Submit</div>
//               </div>
//             </div>

//             <div className="card shadow-sm border-0">
//               <div className="card-body p-40 p-md-60">
//                 {submitError && (
//                   <div className="alert alert-danger" role="alert">
//                     {submitError}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit} noValidate>
//                   {/* Step 1: Personal Information */}
//                   {activeStep === 1 && (
//                     <div className="step-content">
//                       <h4 className="text-secondary mb-30">Personal Information</h4>
//                       <div className="row">
//                         <div className="col-md-12 mb-20">
//                           <label htmlFor="firstName" className="form-label">Full Name *</label>
//                           <input
//                             type="text"
//                             className={`form-control ${formErrors.firstName ? 'is-invalid' : ''}`}
//                             id="firstName"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             required
//                             disabled={!!employeeData?.userName}
//                           />
//                           {formErrors.firstName && (
//                             <div className="invalid-feedback">{formErrors.firstName}</div>
//                           )}
//                         </div>

//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="email" className="form-label">Email *</label>
//                           <input
//                             type="email"
//                             className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
//                             id="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             disabled={!!employeeData?.userEmail}
//                           />
//                           {formErrors.email && (
//                             <div className="invalid-feedback">{formErrors.email}</div>
//                           )}
//                         </div>

//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="phone" className="form-label">Phone Number *</label>
//                           <input
//                             type="tel"
//                             className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
//                             id="phone"
//                             name="phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                             disabled={!!employeeData?.userMobile}
//                           />
//                           {formErrors.phone && (
//                             <div className="invalid-feedback">{formErrors.phone}</div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-end mt-30">
//                         <button
//                           type="button"
//                           className="btn btn-primary"
//                           onClick={handleNext}
//                         >
//                           Next: Professional Details
//                           <i className="fas fa-arrow-right ms-2"></i>
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Step 2: Professional Details */}
//                   {activeStep === 2 && (
//                     <div className="step-content">
//                       <h4 className="text-secondary mb-30">Professional Details</h4>
//                       <div className="row">
//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="experience" className="form-label">Years of Experience *</label>
//                           <input
//                             type="text"
//                             className={`form-control ${formErrors.experience ? 'is-invalid' : ''}`}
//                             id="experience"
//                             name="experience"
//                             value={formData.experience}
//                             onChange={handleChange}
//                             required
//                           />
//                           {formErrors.experience && (
//                             <div className="invalid-feedback">{formErrors.experience}</div>
//                           )}
//                         </div>

//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="jobrole" className="form-label">Current Job Role *</label>
//                           <input
//                             type="text"
//                             className={`form-control ${formErrors.jobrole ? 'is-invalid' : ''}`}
//                             id="jobrole"
//                             name="jobrole"
//                             value={formData.jobrole}
//                             onChange={handleChange}
//                             required
//                           />
//                           {formErrors.jobrole && (
//                             <div className="invalid-feedback">{formErrors.jobrole}</div>
//                           )}
//                         </div>

//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="currentcity" className="form-label">Current City *</label>
//                           <input
//                             type="text"
//                             className={`form-control ${formErrors.currentcity ? 'is-invalid' : ''}`}
//                             id="currentcity"
//                             name="currentcity"
//                             value={formData.currentcity}
//                             onChange={handleChange}
//                             required
//                           />
//                           {formErrors.currentcity && (
//                             <div className="invalid-feedback">{formErrors.currentcity}</div>
//                           )}
//                         </div>

//                         <div className="col-md-6 mb-20">
//                           <label htmlFor="profileurl" className="form-label">Profile URL (LinkedIn/Portfolio)</label>
//                           <input
//                             type="url"
//                             className="form-control"
//                             id="profileurl"
//                             name="profileurl"
//                             value={formData.profileurl}
//                             onChange={handleChange}
//                             placeholder="https://linkedin.com/in/yourprofile"
//                           />
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-between mt-30">
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary"
//                           onClick={handleBack}
//                         >
//                           <i className="fas fa-arrow-left me-2"></i>
//                           Back
//                         </button>
//                         <button
//                           type="button"
//                           className="btn btn-primary"
//                           onClick={handleNext}
//                         >
//                           Next: Upload Resume
//                           <i className="fas fa-arrow-right ms-2"></i>
//                         </button>
//                       </div>
//                     </div>
//                   )}

//                   {/* Step 3: Upload Resume */}
//                   {activeStep === 3 && (
//                     <div className="step-content">
//                       <h4 className="text-secondary mb-30">Upload Resume</h4>
//                       {employeeData?.resume?.url && (
//                         <div className="alert alert-info mb-4">
//                           <i className="fas fa-info-circle me-2"></i>
//                           You already have a resume uploaded in your profile.
//                           {formData.resume instanceof File ? (
//                             <span> A new resume has been selected and will replace your current one.</span>
//                           ) : (
//                             <span> We'll use this resume for your application.</span>
//                           )}
//                         </div>
//                       )}

//                       <div className="mb-30">
//                         <label htmlFor="resume" className="form-label">Resume *</label>
//                         <div className="file-upload-wrapper">
//                           <input
//                             type="file"
//                             className={`form-control ${formErrors.resume ? 'is-invalid' : ''}`}
//                             id="resume"
//                             name="resume"
//                             onChange={handleFileChange}
//                             accept=".pdf,.doc,.docx"
//                             required={!employeeData?.resume?.url}
//                           />
//                           <div className="file-upload-label">
//                             <i className="fas fa-cloud-upload-alt me-2"></i>
//                             {formData.resume ?
//                               (formData.resume instanceof File ? formData.resume.name : formData.resume.name)
//                               : 'Choose file or drag here'}
//                           </div>
//                           {formErrors.resume && (
//                             <div className="invalid-feedback d-block">{formErrors.resume}</div>
//                           )}
//                           <div className="form-text">Accepted formats: PDF, DOC, DOCX (Max 5MB)</div>
//                         </div>
//                       </div>

//                       <div className="review-section bg-light-sky p-30 rounded mb-30">
//                         <h5 className="text-secondary mb-20">Application Review</h5>
//                         <div className="row">
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Full Name:</strong></p>
//                             <p>{formData.firstName || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Email:</strong></p>
//                             <p>{formData.email || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Phone:</strong></p>
//                             <p>{formData.phone || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Experience:</strong></p>
//                             <p>{formData.experience || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Current Role:</strong></p>
//                             <p>{formData.jobrole || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Location:</strong></p>
//                             <p>{formData.currentcity || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Profile URL:</strong></p>
//                             <p>{formData.profileurl || '-'}</p>
//                           </div>
//                           <div className="col-md-6 mb-15">
//                             <p className="mb-1"><strong>Resume:</strong></p>
//                             <p>
//                               {formData.resume ?
//                                 (formData.resume instanceof File ? formData.resume.name : formData.resume.name)
//                                 : (employeeData?.resume?.name || 'Not uploaded')}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-between mt-30">
//                         <button
//                           type="button"
//                           className="btn btn-outline-secondary"
//                           onClick={handleBack}
//                         >
//                           <i className="fas fa-arrow-left me-2"></i>
//                           Back
//                         </button>
//                         <button
//                           type="submit"
//                           className="btn btn-primary"
//                           disabled={isSubmitting}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                               Submitting...
//                             </>
//                           ) : (
//                             <>
//                               Submit Application
//                               <i className="fas fa-paper-plane ms-2"></i>
//                             </>
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyJob;

// wthout resume router

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getEmployeeDetails } from "../../../api/services/projectServices";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    experience: "",
    jobrole: "",
    currentcity: "",
    resume: null,
    profileurl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!token || !userData) {
        navigate("/login", { state: { from: `/apply-job/${id}` } });
        return null;
      }
      return userData._id;
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = checkAuth();
        if (!userId) return;

        const jobResponse = await axios.get(
          `https://api.edprofio.com/employer/viewjobs/${id}`
        );
        if (!jobResponse.data) {
          throw new Error("Failed to fetch job details");
        }
        setJob(jobResponse.data);

        const token = localStorage.getItem("authToken");
        const employeeResponse = await getEmployeeDetails(userId, token);

        if (!employeeResponse) {
          console.warn("No employee data received");
          return;
        }

        setEmployeeData(employeeResponse);

        const newFormData = {
          firstName: employeeResponse.userName || employeeResponse.name || "",
          email: employeeResponse.userEmail || employeeResponse.email || "",
          phone:
            employeeResponse.userMobile ||
            employeeResponse.mobile ||
            employeeResponse.phone ||
            "",
          experience: employeeResponse.experience || "",
          jobrole:
            employeeResponse.currentJobRole || employeeResponse.jobRole || "",
          currentcity:
            employeeResponse.currentCity || employeeResponse.city || "",
          profileurl:
            employeeResponse.profileUrl || employeeResponse.linkedIn || "",
          resume: employeeResponse.resume || null,
        };

        setFormData(newFormData);
      } catch (err) {
        console.error("Error in fetchData:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const validateStep = (step) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (step === 1) {
      if (!formData.firstName.trim())
        errors.firstName = "Full name is required";
      if (!formData.email) {
        errors.email = "Email is required";
      } else if (!emailRegex.test(formData.email)) {
        errors.email = "Please enter a valid email";
      }
      if (!formData.phone) {
        errors.phone = "Phone number is required";
      } else if (!phoneRegex.test(formData.phone)) {
        errors.phone = "Please enter a valid phone number (10-15 digits)";
      }
    }

    if (step === 2) {
      if (!formData.experience) errors.experience = "Experience is required";
      if (!formData.jobrole) errors.jobrole = "Current job role is required";
      if (!formData.currentcity)
        errors.currentcity = "Current city is required";
    }

    if (step === 3) {
      if (!formData.resume && !employeeData?.resume)
        errors.resume = "Resume is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: {
          name: file.name,
          url: URL.createObjectURL(file),
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(3)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const token = localStorage.getItem("authToken");
      const userData = JSON.parse(localStorage.getItem("userData"));

      if (!token || !userData) {
        navigate("/login", { state: { from: `/apply-job/${id}` } });
        return;
      }

      const resumeToSubmit = formData.resume || employeeData?.resume;

      const payload = {
        firstName: formData.firstName,
        email: formData.email,
        phone: formData.phone,
        experience: formData.experience,
        jobrole: formData.jobrole,
        currentcity: formData.currentcity,
        profileurl: formData.profileurl,
        resume: resumeToSubmit,
        applicantId: userData._id,
      };

      const response = await axios.post(
        `https://api.edprofio.com/${id}/apply`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        window.alert("Application submitted successfully!");
        navigate("/applied-jobs", {
          state: {
            applicationSuccess: true,
            jobTitle: job.jobTitle,
            companyName: job.companyName,
          },
        });
      } else {
        throw new Error(response.data.message || "Application failed");
      }
    } catch (err) {
      window.alert(
        "Failed to submit application: " +
          (err.response?.data?.message || err.message)
      );
      setSubmitError(
        err.response?.data?.message ||
          err.message ||
          "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading job details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading job details</h5>
        <p>{error}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
        <h4>Job not found</h4>
        <p className="text-muted">
          The job you're looking for doesn't exist or may have been removed
        </p>
      </div>
    );
  }

  return (
    <div className="section section-theme-1 pt-60 pt-md-90 pb-60 pb-md-90">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <div className="section-header text-center mb-45">
              <h2 className="text-secondary mb-20">Apply for {job.jobTitle}</h2>
              <p className="mb-0">
                {job.companyName} • {job.location}
              </p>
            </div>

            {/* Pipeline Stepper */}
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="fw-medium mb-3">Application Progress</h5>
                <div className="pipeline-stepper">
                  <div
                    className={`pipeline-step ${
                      activeStep >= 1 ? "active" : ""
                    }`}
                  >
                    <span className="step-label">Personal Information</span>
                  </div>
                  <div
                    className={`pipeline-step ${
                      activeStep >= 2 ? "active" : ""
                    }`}
                  >
                    <span className="step-label">Professional Details</span>
                  </div>
                  <div
                    className={`pipeline-step ${
                      activeStep >= 3 ? "active" : ""
                    }`}
                  >
                    <span className="step-label">Review & Submit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm border-0">
              <div className="card-body p-40 p-md-60">
                {submitError && (
                  <div className="alert alert-danger" role="alert">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  {/* Step 1: Personal Information */}
                  {activeStep === 1 && (
                    <div className="step-content">
                      <h4 className="text-secondary mb-30">
                        Personal Information
                      </h4>
                      <div className="row">
                        <div className="col-md-12 mb-20">
                          <label htmlFor="firstName" className="form-label">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.firstName ? "is-invalid" : ""
                            }`}
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            disabled={!!employeeData?.userName}
                          />
                          {formErrors.firstName && (
                            <div className="invalid-feedback">
                              {formErrors.firstName}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-20">
                          <label htmlFor="email" className="form-label">
                            Email *
                          </label>
                          <input
                            type="email"
                            className={`form-control ${
                              formErrors.email ? "is-invalid" : ""
                            }`}
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={!!employeeData?.userEmail}
                          />
                          {formErrors.email && (
                            <div className="invalid-feedback">
                              {formErrors.email}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-20">
                          <label htmlFor="phone" className="form-label">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            className={`form-control ${
                              formErrors.phone ? "is-invalid" : ""
                            }`}
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            disabled={!!employeeData?.userMobile}
                          />
                          {formErrors.phone && (
                            <div className="invalid-feedback">
                              {formErrors.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-30">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNext}
                        >
                          Next: Professional Details
                          <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Professional Details */}
                  {activeStep === 2 && (
                    <div className="step-content">
                      <h4 className="text-secondary mb-30">
                        Professional Details
                      </h4>
                      <div className="row">
                        <div className="col-md-6 mb-20">
                          <label htmlFor="experience" className="form-label">
                            Years of Experience *
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.experience ? "is-invalid" : ""
                            }`}
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                          />
                          {formErrors.experience && (
                            <div className="invalid-feedback">
                              {formErrors.experience}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-20">
                          <label htmlFor="jobrole" className="form-label">
                            Current Job Role *
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.jobrole ? "is-invalid" : ""
                            }`}
                            id="jobrole"
                            name="jobrole"
                            value={formData.jobrole}
                            onChange={handleChange}
                            required
                          />
                          {formErrors.jobrole && (
                            <div className="invalid-feedback">
                              {formErrors.jobrole}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-20">
                          <label htmlFor="currentcity" className="form-label">
                            Current City *
                          </label>
                          <input
                            type="text"
                            className={`form-control ${
                              formErrors.currentcity ? "is-invalid" : ""
                            }`}
                            id="currentcity"
                            name="currentcity"
                            value={formData.currentcity}
                            onChange={handleChange}
                            required
                          />
                          {formErrors.currentcity && (
                            <div className="invalid-feedback">
                              {formErrors.currentcity}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-20">
                          <label htmlFor="profileurl" className="form-label">
                            Profile URL (LinkedIn/Portfolio)
                          </label>
                          <input
                            type="url"
                            className="form-control"
                            id="profileurl"
                            name="profileurl"
                            value={formData.profileurl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mt-30">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleBack}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleNext}
                        >
                          Next: Review & Submit
                          <i className="fas fa-arrow-right ms-2"></i>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Submit */}
                  {activeStep === 3 && (
                    <div className="step-content">
                      <h4 className="text-secondary mb-30">Review & Submit</h4>

                      {employeeData?.resume?.url && (
                        <div className="alert alert-info mb-4">
                          <i className="fas fa-info-circle me-2"></i>
                          {formData.resume
                            ? "A new resume has been selected and will be used for this application."
                            : "We'll use your existing resume for this application."}
                        </div>
                      )}

                      <div className="mb-30">
                        <label htmlFor="resume" className="form-label">
                          {employeeData?.resume?.url
                            ? "Change Resume"
                            : "Upload Resume *"}
                        </label>
                        <input
                          type="file"
                          className={`form-control ${
                            formErrors.resume ? "is-invalid" : ""
                          }`}
                          id="resume"
                          name="resume"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          required={!employeeData?.resume?.url}
                        />
                        {formErrors.resume && (
                          <div className="invalid-feedback d-block">
                            {formErrors.resume}
                          </div>
                        )}
                        <div className="form-text">
                          Accepted formats: PDF, DOC, DOCX (Max 5MB)
                        </div>
                      </div>

                      <div className="review-section bg-light-sky p-30 rounded mb-30">
                        <h5 className="text-secondary mb-20">
                          Application Review
                        </h5>
                        <div className="row">
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Full Name:</strong>
                            </p>
                            <p>{formData.firstName || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Email:</strong>
                            </p>
                            <p>{formData.email || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Phone:</strong>
                            </p>
                            <p>{formData.phone || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Experience:</strong>
                            </p>
                            <p>{formData.experience || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Current Role:</strong>
                            </p>
                            <p>{formData.jobrole || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Location:</strong>
                            </p>
                            <p>{formData.currentcity || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Profile URL:</strong>
                            </p>
                            <p>{formData.profileurl || "-"}</p>
                          </div>
                          <div className="col-md-6 mb-15">
                            <p className="mb-1">
                              <strong>Resume:</strong>
                            </p>
                            <p>
                              {formData.resume?.name ||
                                employeeData?.resume?.name ||
                                "No resume uploaded"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mt-30">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleBack}
                        >
                          <i className="fas fa-arrow-left me-2"></i>
                          Back
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application
                              <i className="fas fa-paper-plane ms-2"></i>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pipeline-stepper {
          display: flex;
          align-items: center;
          width: 100%;
          position: relative;
        }

        .pipeline-step {
          flex: 1;
          height: 50px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
          color: #6c757d;
          font-weight: 500;
          font-size: 14px;
          text-align: center;
          margin-right: 2px;
          transition: all 0.3s ease;
          clip-path: polygon(
            0% 0%,
            calc(100% - 15px) 0%,
            100% 50%,
            calc(100% - 15px) 100%,
            0% 100%,
            15px 50%
          );
        }

        .pipeline-step:first-child {
          clip-path: polygon(
            0% 0%,
            calc(100% - 15px) 0%,
            100% 50%,
            calc(100% - 15px) 100%,
            0% 100%
          );
          padding-left: 15px;
        }

        .pipeline-step:last-child {
          clip-path: polygon(2px 0%, 123% 0%, 100% 100%, 0px 100%, 5% 53%);
          padding-right: 15px;
          margin-right: 0;
        }

        .pipeline-step.active {
          background: linear-gradient(
            135deg,
            #ab47bc 0%,
            #ab47bc 50%,
            #ab47bc 100%
          );
          color: white;
          font-weight: 600;
          box-shadow: 0 2px 8px rgb(171, 71, 188);
        }

        .pipeline-step .step-label {
          white-space: nowrap;
          padding: 0 10px;
          position: relative;
          z-index: 1;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .pipeline-step {
            font-size: 12px;
            height: 45px;
          }

          .pipeline-step .step-label {
            padding: 0 8px;
          }
        }

        @media (max-width: 576px) {
          .pipeline-step {
            font-size: 11px;
            height: 40px;
          }

          .pipeline-step .step-label {
            padding: 0 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplyJob;
