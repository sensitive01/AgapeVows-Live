import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";

const Jobsbreadcrumb = ({ onFilterChange }) => {
  // Default locations array
  const defaultLocations = [
    "All Locations",
    "Bengaluru",
    "Kanakapura",
    "Mysuru",
    "Ramnagar",
    "Tumakuru",
    "Hassan",
    "Chikmagalur",
    "Mangalore",
    "Puttur",
    "Chennai",
    "Coimbatore",
    "India",
    "Remote",
  ];

  const [keyword, setKeyword] = useState("All Keywords");
  const [location, setLocation] = useState("All Locations");
  const [keywords, setKeywords] = useState([]);
  const [locations, setLocations] = useState(defaultLocations); // Initialize with default locations
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchjobs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch filter options");
        }
        const data = await response.json();

        // Get unique job keywords from titles and categories
        const jobKeywords = [
          ...new Set(data.flatMap((job) => [job.jobTitle, job.category])),
        ].filter(Boolean);

        // Set keywords (from API data)
        setKeywords(["All Keywords", ...jobKeywords]);

        // Keep using default locations (don't override with API data)
        setLocations(defaultLocations);

        setError(null);
      } catch (err) {
        setError(err.message);
        setKeywords(["All Keywords"]);
        setLocations(defaultLocations); // Fallback to default locations on error
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
        keyword: keyword === "All Keywords" ? "" : keyword,
        location: location === "All Locations" ? "" : location,
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
              <h1 className="text-white mb-0">Jobs</h1>
              <p className="text-primary">
                job duties, job responsibilities, and skills required
              </p>
            </div>
            <form className="form-search form-inline" onSubmit={handleSubmit}>
              <div className="fields-holder bg-white text-black d-flex flex-wrap flex-md-nowrap">
                <div className="form-group" style={{ borderRight: "none" }}>
                  <label htmlFor="keyword" className="text-secondary">
                    Keyword
                  </label>
                  <div className="form-input">
                    {loading ? (
                      <select className="select2" disabled>
                        <option>Loading...</option>
                      </select>
                    ) : (
                      <select
                        id="keyword"
                        className="select2"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        style={{
                          border: "none",
                          outline: "none",
                          boxShadow: "none",
                        }}
                      >
                        {keywords.map((kw, index) => (
                          <option key={`kw-${index}`} value={kw}>
                            {kw}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="location" className="text-secondary">
                    Location
                  </label>
                  <div className="form-input">
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
                      disabled={loading}
                    >
                      {locations.map((loc, index) => (
                        <option key={`loc-${index}`} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <button
                className="btn btn-light-sky btn-sm"
                type="submit"
                disabled={loading}
              >
                <span className="btn-text">
                  <Search className="me-1" size={16} />
                  {loading ? "Loading..." : "Find Job"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style jsx>{`
        .fields-holder {
          border-radius: 4px;
        }
        .form-group {
          padding: 10px;
          flex: 1;
        }
        .select2 {
          width: 100%;
          background: transparent;
        }
        select {
          background: transparent;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .form-group:first-child {
          border-right: 1px solid #eee !important;
        }
      `}</style>
    </div>
  );
};

export default Jobsbreadcrumb;
