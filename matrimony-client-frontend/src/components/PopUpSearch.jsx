import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PopUpSearch = ({ onSearch, onQuickSearch }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/user/show-all-profiles/${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleQuickSearch = (searchType) => {
    navigate(`/user/show-all-profiles/${searchType}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <>
      <div className="pop-search">
        <span className="ser-clo">+</span>
        <div className="inn">
          <form>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                style={{ paddingRight: "50px", flex: 1 }}
              />
              <button
                onClick={handleSearch}
                style={{
                  position: "absolute",
                  right: "8px",
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Search
              </button>
            </div>
          </form>
          <div className="rel-sear">
            <h4>Top searches:</h4>
            <a onClick={() => handleQuickSearch("all-profiles")}>Browse all profiles</a>
            <a onClick={() => handleQuickSearch("male-profiles")}>Mens profile</a>
            <a onClick={() => handleQuickSearch("female-profiles")}>Female profile</a>
            <a onClick={() => handleQuickSearch("new-profiles")}>New profiles</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpSearch;
