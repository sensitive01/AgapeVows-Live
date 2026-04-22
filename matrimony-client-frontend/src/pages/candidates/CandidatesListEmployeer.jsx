import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CandidatesBreadcrumb from "./CandidatesBreadcrumb";
import defaultEmployeeAvatar from "../../assets/employer/assets/img/profiles/avatar-12.jpg";

const CandidatesListEmployeer = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    searchQuery: "",
    jobRole: "",
    location: "",
    experience: "",
  });

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) {
          navigate("/login");
          return;
        }

        // Construct query parameters - only include non-empty filters
        const queryParams = new URLSearchParams();
        if (filters.searchQuery.trim())
          queryParams.append("search", filters.searchQuery.trim());
        if (filters.jobRole && filters.jobRole !== "All Roles")
          queryParams.append("jobRole", filters.jobRole);
        if (filters.location && filters.location !== "All Locations")
          queryParams.append("location", filters.location);
        if (filters.experience && filters.experience !== "All Experiences")
          queryParams.append("experience", filters.experience);

        console.log("Fetching with filters:", queryParams.toString()); // Debug log

        const response = await fetch(
          `https://api.edprofio.com/employer/viewallappliedcandi/${
            userData._id
          }?${queryParams.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch candidates");
        }

        const data = await response.json();
        console.log("Received data:", data); // Debug log
        setCandidates(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err); // Debug log
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [navigate, filters]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading candidates...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        <i className="fas fa-exclamation-triangle fa-2x mb-3"></i>
        <h5>Error loading candidates</h5>
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
  const handleFilterChange = (newFilters) => {
    console.log("New filters:", newFilters); // Debug log
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };
  return (
    <>
      <CandidatesBreadcrumb onFilterChange={handleFilterChange} />

      {/* Main Content */}
      <main className="main">
        {/* Featured Jobs Section */}
        <section className="section section-categories section-theme-1 pt-35 pt-md-50 pt-lg-75 pt-xl-95 pb-35 pb-md-50 pb-xl-75">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Page subheader */}
                <header className="page-subheader mb-30 mb-md-40 d-xxl-flex align-items-center justify-content-between">
                  <h3 className="h6 mb-25 mb-xxl-0 text-secondary">
                    {candidates.length} candidates found
                  </h3>
                </header>

                <div className="row justify-content-center">
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <div
                        key={candidate._id}
                        className="col-md-6 col-lg-4 mb-4"
                      >
                        <CandidateCard candidate={candidate} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <img
                        src={defaultEmployeeAvatar}
                        alt="No candidates found"
                        width="150"
                        className="mb-3"
                      />
                      <h4>No candidates have applied yet</h4>
                      <p className="text-muted">
                        Check back later for applications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Candidate Card Component
const CandidateCard = ({ candidate }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body text-center">
        <img
          src={candidate.profileurl || "/images/default-profile.png"}
          alt={candidate.firstName}
          className="rounded-circle mb-3"
          width="100"
          height="100"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/images/default-profile.png";
          }}
        />
        <h5 className="card-title">{candidate.firstName}</h5>
        <p className="text-muted mb-1">{candidate.jobrole}</p>
        <p className="text-muted mb-1">
          {candidate.experience} years experience
        </p>
        <p className="text-muted">
          <i className="fas fa-map-marker-alt me-1"></i> {candidate.currentcity}
        </p>
        <div className="d-flex justify-content-center">
          <a
            href={candidate.resume?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-primary me-2"
          >
            View Resume
          </a>
          <button className="btn btn-sm btn-primary">Contact</button>
        </div>
      </div>
      <div className="card-footer bg-transparent">
        <small className="text-muted">
          Applied on: {new Date(candidate.appliedDate).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default CandidatesListEmployeer;
