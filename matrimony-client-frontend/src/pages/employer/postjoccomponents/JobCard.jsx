import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import {
  MapPin,
  IndianRupee,
  Calendar,
  Briefcase,
  Bus,
  Settings,
  Users,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../../../public/images/jobImage.jpg";

// Component to safely render HTML content
const RichTextDisplay = ({ content, className = '' }) => {
  // Sanitize HTML to prevent XSS attacks
  const sanitizedContent = DOMPurify.sanitize(content || '', {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'ol', 'ul', 'li', 'a', 'h1', 'h2', 'h3'],
    ALLOWED_ATTR: ['href', 'target', 'rel']
  });

  return (
    <div 
      className={`rich-text-display ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      style={{
        lineHeight: '1.6',
        fontSize: '14px'
      }}
    />
  );
};

// Helper function to check if content is HTML
const isHTML = (str) => {
  if (!str) return false;
  return /<[a-z][\s\S]*>/i.test(str);
};

const JobCard = ({ job, onStatusChange }) => {
  const [isActive, setIsActive] = useState(job.status === "Active");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async () => {
    try {
      setIsUpdating(true);
      const newStatus = !isActive;

      const token = localStorage.getItem("employerToken");
      if (!token) {
        throw new Error("Authentication required");
      }

      if (!job.id) {
        throw new Error("Job ID is missing");
      }

      const response = await axios.put(
        `https://api.edprofio.com/employer/updatejobstatus/${job.id}`,
        { isActive: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.message) {
        setIsActive(newStatus);
        onStatusChange(job.id, newStatus ? "Active" : "Inactive");
        console.log(response.data.message);
      } else {
        throw new Error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      setIsActive(!isActive);
      alert(`Error: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="col-xl-6 col-lg-6 col-md-6">
      <div
        className="card job"
        style={{
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.border = "2px solid #000";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "";
          e.currentTarget.style.border = "";
          e.currentTarget.style.transform = "";
        }}
      >
        <div className="card-body mb-1 pb-1">
          {/* Status toggle */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="badge bg-light text-dark">
              Status: {isActive ? "Active" : "Inactive"}
            </span>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id={`status-toggle-${job.id}`}
                checked={isActive}
                onChange={handleStatusChange}
                disabled={isUpdating}
              />
              <label
                className="form-check-label"
                htmlFor={`status-toggle-${job.id}`}
              >
                {isUpdating ? "Updating..." : isActive ? "Active" : "Inactive"}
              </label>
            </div>
          </div>

          <div className="card bg-light mb-3">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <a href="#" className="me-2">
                  <span className="avatar avatar-lg bg-gray">
                    <img
                      src={job.employerProfilePic || defaultImage}
                      style={{
                        width: "48px",
                        height: "48px",
                        objectFit: "cover",
                        borderRadius: "4px",
                      }}
                      alt="employer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                    />
                  </span>
                </a>
                <div>
                  <h6 className="fs-17 fw-medium mb-0 text-truncate">
                    <a href="view-job">{job.title}</a>
                  </h6>
                  <p className="fs-13 text-primary fw-normal">
                    {job.applicants} Applications
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="fs-16 d-flex flex-column mb-3">
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <MapPin
                className="text-primary me-2"
                style={{ width: "14px", height: "14px" }}
              />
              {job.location}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <IndianRupee
                className="text-primary me-2"
                style={{ width: "14px", height: "14px" }}
              />
              {job.salary}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <Calendar
                className="text-primary me-2"
                style={{ width: "14px", height: "14px" }}
              />
              {job.experience}
            </p>
            <p className="text-dark d-inline-flex align-items-center mb-1">
              <Briefcase
                className="text-primary me-2"
                style={{ width: "14px", height: "14px" }}
              />
              {job.type}
            </p>
            
            {/* Benefits/Accommodation - Updated to handle HTML */}
            {job.accommodation && (
              <div className="text-dark d-flex align-items-start mb-1">
                <Bus
                  className="text-primary me-2 mt-1"
                  style={{ width: "14px", height: "14px", flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  {isHTML(job.accommodation) ? (
                    <RichTextDisplay content={job.accommodation} />
                  ) : (
                    <span>{job.accommodation}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {job.skills && job.skills.length > 0 && (
            <div className="mb-3">
              <Settings
                className="text-primary me-2"
                style={{ width: "14px", height: "14px" }}
              />
              Skillset:
              {job.skills.map((skill, index) => (
                <span key={index} className="badge bg-light text-dark ms-1">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="progress progress-xs mb-1">
            <div
              className="progress-bar bg-secondary"
              role="progressbar"
              style={{
                width: `${
                  (job.shortlisted / Math.max(job.applicants, 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <p className="fs-12 mb-0 text-gray fw-normal">
            {job.shortlisted} Shortlisted of {job.applicants} Applications
          </p>
        </div>

        {/* Combined row for Date Posted and both buttons */}
        <div className="d-flex justify-content-between align-items-center mb-2 mx-2">
          <span className="text-dark fs-13 ms-4 me-3">
            <b className="text-secondary">Date Posted:</b> {job.postedDate}
          </span>
          <div className="d-flex">
            <Link
              to={`/employer/applied-candidates/${job.id}`}
              className="badge bg-warning fs-12 fw-medium me-2"
            >
              <Users
                className="me-1"
                style={{ width: "12px", height: "12px" }}
              />{" "}
              Applied Candidates
            </Link>
            <Link
              to={`/employer/view-job/${job.id}`}
              className="badge bg-secondary fs-12 fw-medium"
            >
              <Eye className="me-1" style={{ width: "12px", height: "12px" }} />{" "}
              View Job Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;