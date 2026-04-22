import React from "react";

const PopUpSearch = () => {
  return (
    <>
      <div className="pop-search">
        <span className="ser-clo">+</span>
        <div className="inn">
          <form>
            <input type="text" placeholder="Search here..." />
          </form>
          <div className="rel-sear">
            <h4>Top searches:</h4>
            <a href="all-profiles.html">Browse all profiles</a>
            <a href="all-profiles.html">Mens profile</a>
            <a href="all-profiles.html">Female profile</a>
            <a href="all-profiles.html">New profiles</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpSearch;
