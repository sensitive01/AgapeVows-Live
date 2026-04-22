import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const CandidatesBreadcrumb = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobRole, setJobRole] = useState("All Roles");
  const [location, setLocation] = useState("All Locations");
  const [experience, setExperience] = useState("All Experiences");
  const [jobRoles, setJobRoles] = useState([]);
  const [locations, setLocations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const userData = JSON.parse(localStorage.getItem("userData"));

        if (!token || !userData) return;

        const response = await fetch(
          `https://api.edprofio.com/employer/viewallappliedcandi/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch candidate applications");
        }

        const data = await response.json();

        // Extract unique job roles from candidates
        const uniqueJobRoles = [
          ...new Set(data.data.map((candidate) => candidate.jobrole)),
        ].filter(Boolean);
        setJobRoles(["All Roles", ...uniqueJobRoles]);

        // Extract unique locations from candidates
        const uniqueLocations = [
          ...new Set(data.data.map((candidate) => candidate.currentcity)),
        ].filter(Boolean);
        setLocations(["All Locations", ...uniqueLocations]);

        // Extract unique experience levels
        const uniqueExperiences = [
          ...new Set(data.data.map((candidate) => candidate.experience)),
        ].filter(Boolean);
        setExperiences(["All Experiences", ...uniqueExperiences]);

        setError(null);
      } catch (err) {
        setError(err.message);
        setJobRoles(["All Roles"]);
        setLocations(["All Locations"]);
        setExperiences(["All Experiences"]);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({
        searchQuery,
        jobRole: jobRole === "All Roles" ? "" : jobRole,
        location: location === "All Locations" ? "" : location,
        experience: experience === "All Experiences" ? "" : experience,
      });
    }
  };

  if (error) {
    return (
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="alert alert-danger">
            Error loading filter options: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
      <div className="container position-relative text-center">
        <div className="row">
          <div className="col-12">
            <div className="subvisual-textbox pb-0">
              <h1 className="text-white mb-0">Candidate Applications</h1>
              <p className="text-primary">
                Find candidates who applied for your jobs
              </p>
            </div>
            <form className="form-search form-inline" onSubmit={handleSubmit}>
              <div className="fields-holder bg-white text-black d-flex flex-wrap flex-md-nowrap">
                {/* Search Query Field */}
                <div className="form-group" style={{ borderRight: "none" }}>
                  <label htmlFor="search" className="text-secondary">
                    Search
                  </label>
                  <div className="form-input">
                    <input
                      type="text"
                      id="search"
                      placeholder="Search by name or email..."
                      className="form-control"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Job Role Filter */}
                <div className="form-group">
                  <label htmlFor="jobRole" className="text-secondary">
                    Job Role
                  </label>
                  <div className="form-input">
                    {loading ? (
                      <select className="select2" disabled>
                        <option>Loading...</option>
                      </select>
                    ) : (
                      <select
                        id="jobRole"
                        className="select2"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {jobRoles.map((role, index) => (
                          <option key={`role-${index}`} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="form-group">
                  <label htmlFor="location" className="text-secondary">
                    Location
                  </label>
                  <div className="form-input">
                    {loading ? (
                      <select className="select2" disabled>
                        <option>Loading...</option>
                      </select>
                    ) : (
                      <select
                        id="location"
                        className="select2"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {locations.map((loc, index) => (
                          <option key={`loc-${index}`} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="form-group">
                  <label htmlFor="experience" className="text-secondary">
                    Experience
                  </label>
                  <div className="form-input">
                    {loading ? (
                      <select className="select2" disabled>
                        <option>Loading...</option>
                      </select>
                    ) : (
                      <select
                        id="experience"
                        className="select2"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {experiences.map((exp, index) => (
                          <option key={`exp-${index}`} value={exp}>
                            {exp} {exp === "1" ? "year" : "years"}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light-sky btn-sm mt-3"
                type="submit"
                disabled={loading}
              >
                <span className="btn-text">
                  <Search className="me-1" size={16} />
                  {loading ? "Loading..." : "Search Candidates"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fields-holder {
          border-radius: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          padding: 10px;
          flex: 1;
          min-width: 200px;
        }
        .select2,
        .form-control {
          width: 100%;
          background: transparent;
        }
        select,
        input {
          background: transparent;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-group:not(:last-child) {
          border-right: 1px solid #eee !important;
        }
        @media (max-width: 768px) {
          .fields-holder {
            flex-direction: column;
          }
          .form-group {
            border-right: none !important;
            border-bottom: 1px solid #eee;
          }
        }
      `}</style>
    </div>
  );
};

export default CandidatesBreadcrumb;
