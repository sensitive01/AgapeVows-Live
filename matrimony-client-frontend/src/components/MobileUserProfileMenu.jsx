import React from "react";

const MobileUserProfileMenu = () => {
  return (
    <div className="mob-me-all dashbord_menu">
      <div className="mob-me-clo">
        <img src="../../../assets/images/icon/close.svg" alt="" />
      </div>
      <div className="mv-bus">
        <div className="head-pro">
          <img
            src="../../../assets/images/profiles/1.jpg"
            alt=""
            loading="lazy"
          />
          <b>user profile</b>
          <br />
          <h4>Ashley emyy</h4>
        </div>
        <ul>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Sign-up</a>
          </li>
          <li>
            <a href="#">Pricing plans</a>
          </li>
          <li>
            <a href="/user/show-all-profiles">Browse profiles</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileUserProfileMenu;
