import React from "react";

const NewProfileMatches = () => {
  return (
    <div className="col-md-12 db-sec-com db-new-pro-main">
      <h2 className="db-tit">New Profiles Matches</h2>
      <ul className="slider">
        {[16, 2, 3, 4, 5, 6, 14].map((profileNum, index) => (
          <li key={index}>
            <div className="db-new-pro">
              <img
                src={`images/profiles/${profileNum}.jpg`}
                alt="Profile"
                className="profile"
              />
              <div>
                <h5>Julia ann</h5>
                <span className="city">New york</span>
                <span className="age">22 Years old</span>
              </div>
              {(profileNum === 16 || profileNum === 6 || profileNum === 14) && (
                <div className="pro-ave" title="User currently available">
                  <span className="pro-ave-yes"></span>
                </div>
              )}
              <a
                href="#"
                className="fclick"
                target="_blank"
                rel="noopener noreferrer"
              >
                &nbsp;
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewProfileMatches;
