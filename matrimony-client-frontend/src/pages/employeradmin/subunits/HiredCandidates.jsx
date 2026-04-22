import React, { useState } from 'react';
import EmployerCandidatesDetails from '../candidate/EmployerCandidatesDetails';
import company01 from '../../../assets/employer-admin/assets/img/company/company-01.svg';
import user13 from '../../../assets/employer-admin/assets/img/users/user-13.jpg';
import user19 from '../../../assets/employer-admin/assets/img/users/user-19.jpg';
import HiredCandidatesDetails from './HiredCandidatesDetails';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const HiredCandidates = () => {
  const [candidateDetails, setCandidateDetails] = useState(false);
  const candidates = [
    {
      id: 1,
      name: "Sandra Ornellas",
      image: user13,
      appliedDate: "02 Feb, 2025",
      lastActive: "3 days ago",
      experience: "5 Years",
      expectedSalary: "12,00,000 Per Annum",
      gender: "Male",
      designation: "Department Head",
      dob: "19 Feb 1990",
      age: "35",
      qualification: "MCA, M Phil, Ph.D",
      location: "Bengaluru, Karnataka - 560078"
    },
    {
      id: 2,
      name: "John Harris",
      image: user19,
      appliedDate: "02 Feb, 2025",
      lastActive: "3 days ago",
      experience: "15 Years",
      expectedSalary: "12,00,000 Per Annum",
      gender: "Female",
      designation: "Department Head",
      dob: "19 Feb 1990",
      age: "35",
      qualification: "MCA, M Phil, Ph.D",
      location: "Bengaluru, Karnataka - 560078"
    },
    {
      id: 3,
      name: "PGT Teacher",
      image: user13,
      appliedDate: "02 Feb, 2025",
      lastActive: "3 days ago",
      experience: "5 Years",
      expectedSalary: "12,00,000 Per Annum",
      gender: "Male",
      designation: "Department Head",
      dob: "19 Feb 1990",
      age: "35",
      qualification: "MCA, M Phil, Ph.D",
      location: "Bengaluru, Karnataka - 560078"
    },
    {
      id: 4,
      name: "PGT Teacher",
      image: user19,
      appliedDate: "02 Feb, 2025",
      lastActive: "3 days ago",
      experience: "15 Years",
      expectedSalary: "12,00,000 Per Annum",
      gender: "Female",
      designation: "Department Head",
      dob: "19 Feb 1990",
      age: "35",
      qualification: "MCA, M Phil, Ph.D",
      location: "Bengaluru, Karnataka - 560078"
    }
  ];

  return (
    <>
        <EmployerAdminHeader />
    <div className="content">
      {/* Breadcrumb */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
        <div className="my-auto mb-2">
          <h2 className="mb-1"> &nbsp; <i className="fa fa-user-circle text-primary"></i> Hired Candidates</h2>
        </div>
        <div className="head-icons ms-2">
          <a href="javascript:void(0);" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
            <i className="ti ti-chevrons-up"></i>
          </a>
        </div>
      </div>
      {/* /Breadcrumb */}

      <ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/school-profile"><i className="ti ti-settings me-2"></i>Profile Details</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/school-details"><i className="ti ti-world-cog me-2"></i>School Information</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/employer-admin/plan-and-subscription"><i className="ti ti-device-ipad-horizontal-cog me-2"></i>Plan & Subscription</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/employer-admin/hired-candidates"><i className="ti ti-server-cog me-2"></i>Hired Candidates</a>
        </li>
      </ul>

      {/* Candidates Grid */}
      <div className="row">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="col-xxl-6 col-xl-4 col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <div className="d-flex align-items-center">
                    <a href="javascript:void(0);" className="avatar flex-shrink-0">
                      <img src={candidate.image} className="img-fluid h-auto w-auto" alt="img" />
                    </a>
                    <div className="ms-2">
                      <h6 className="fs-14 fw-medium text-truncate text-primary mb-1">
                        <a className="text-primary" onClick={() => setCandidateDetails(true)} href="#">
                          {candidate.name} &nbsp; | &nbsp; <span className="text-dark"><i className="ti ti-eye"></i> View Profile</span>
                        </a>
                      </h6>
                      <p className="fs-13">
                        <b>Applied On:</b> : {candidate.appliedDate} &nbsp; | &nbsp; 
                        Last Active : {candidate.lastActive} &nbsp; | &nbsp; 
                        <a href="" className="fw-medium text-primary"><i className="ti ti-download"></i> Download Resume</a>
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <a href="#" className="btn btn-light text-success btn-icon btn-sm me-1"><i className="ti ti-phone fs-16"></i></a>
                    <a href="#" className="btn btn-light btn-icon text-danger btn-sm me-1"><i className="ti ti-mail-bolt fs-16"></i></a>
                    <a href="#" className="btn btn-light text-primary btn-icon btn-sm"><i className="ti ti-bookmark fs-16"></i></a>
                  </div>
                </div>
                <div className="bg-light rounder p-2">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span><b>Experience</b> : {candidate.experience}</span>
                    <span><b>Minimum Expected Salary</b> : {candidate.expectedSalary}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span><b>Gender</b> : {candidate.gender}</span>
                    <span><b>Current / Previous Designation</b> : {candidate.designation}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span><b>Date-of-Birth / Age</b> : {candidate.dob} / {candidate.age}</span>
                    <span><b>Qualification</b> : {candidate.qualification}</span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <span><b>Current Location</b> : {candidate.location}</span>
                    <a  onClick={() => setCandidateDetails(true)} className="fs-10 fw-medium badge bg-secondary">
                      <i className="ti ti-eye"></i> View Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="col-md-12">
          <div className="text-center mb-4">
            <a href="#" className="btn btn-primary"><i className="ti ti-loader-3 me-1"></i>Load More</a>
          </div>
        </div>
      </div>
      <HiredCandidatesDetails
        show={candidateDetails}
        onClose={() => setCandidateDetails(false)}
      />
    </div>
      <EmployerAdminFooter />
      </>
  );
};

export default HiredCandidates;