import React from "react";

// ✅ Importing image assets
import logoImg from "../../../assets/images/logo-b.png";
import profImg1 from "../../../assets/images/profiles/1.jpg";
import searchImg from "../../../assets/images/icon/search.svg";
import userImg from "../../../assets/images/icon/users.svg";
import menuImg from "../../../assets/images/icon/menu.svg";


const MainMenuBar = () => {
  return (
    <div className="hom-top">
      <div className="container">
        <div className="row">
          <div className="hom-nav">
            {/* LOGO */}
            <div className="logo">
              <span className="menu desk-menu">
                <i />
                <i />
                <i />
              </span>
              <a href="index.html" className="logo-brand">
                <img
                  src={logoImg}
                  alt="Logo"
                  loading="lazy"
                  className="ic-logo"
                />
              </a>
            </div>

            {/* MENU START */}
            <div className="bl">
              <ul>
                <li className="smenu-pare">
                  <span className="smenu">Explore</span>
                  <div className="smenu-open smenu-box">
                    <div className="container">
                      <div className="row">
                        <h4 className="tit">Explore category</h4>
                        <ul>
                          <li>
                            <div className="menu-box menu-box-2">
                              <h5>
                                Browse profiles{" "}
                                <span>1200+ Verified profiles</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a
                                href="all-profiles.html"
                                className="fclick"
                              ></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-1">
                              <h5>
                                Wedding page <span>Make reservation</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a href="wedding.html" className="fclick"></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-3">
                              <h5>
                                All Services <span>Lorem ipsum dummy</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a href="services.html" className="fclick"></a>
                            </div>
                          </li>
                          <li>
                            <div className="menu-box menu-box-4">
                              <h5>
                                Join Now <span>Lorem ipsum dummy</span>
                              </h5>
                              <span className="explor-cta">More details</span>
                              <a href="plans.html" className="fclick"></a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">All pages</span>
                  <div className="smenu-open smenu-multi">
                    <div className="container">
                      <div className="row">
                        {[1, 2, 3, 4].map((set, index) => (
                          <div className="multi-col" key={index}>
                            <div className="inn">
                              <h4>{`Page sets ${set}`}</h4>
                              <ul>
                                {set === 1 &&
                                  [
                                    "all-profiles.html",
                                    "profile-details.html",
                                    "wedding.html",
                                    "wedding-video.html",
                                    "services.html",
                                  ].map((href, i) => (
                                    <li key={i}>
                                      <a href={href}>
                                        {href
                                          .replace(".html", "")
                                          .replace(/-/g, " ")}
                                      </a>
                                    </li>
                                  ))}
                                {set === 2 &&
                                  [
                                    "plans.html",
                                    "login.html",
                                    "sign-up.html",
                                    "photo-gallery.html",
                                    "photo-gallery-1.html",
                                  ].map((href, i) => (
                                    <li key={i}>
                                      <a href={href}>
                                        {href
                                          .replace(".html", "")
                                          .replace(/-/g, " ")}
                                      </a>
                                    </li>
                                  ))}
                                {set === 3 &&
                                  [
                                    "contact.html",
                                    "about.html",
                                    "blog.html",
                                    "blog-detail.html",
                                  ].map((href, i) => (
                                    <li key={i}>
                                      <a href={href}>
                                        {href
                                          .replace(".html", "")
                                          .replace(/-/g, " ")}
                                      </a>
                                    </li>
                                  ))}
                                {set === 4 &&
                                  [
                                    "enquiry.html",
                                    "make-reservation.html",
                                    "faq.html",
                                    "coming-soon.html",
                                    "404.html",
                                  ].map((href, i) => (
                                    <li key={i}>
                                      <a href={href}>
                                        {href
                                          .replace(".html", "")
                                          .replace(/-/g, " ")}
                                      </a>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        ))}

                        <div className="multi-col full">
                          <div className="inn">
                            <h4>User dashboard pages</h4>
                            <ul>
                              {[
                                "user-dashboard.html",
                                "user-profile.html",
                                "user-interests.html",
                                "user-chat.html",
                                "user-plan.html",
                                "user-setting.html",
                                "user-profile-edit.html",
                                "login.html",
                              ].map((href, i) => (
                                <li key={i}>
                                  <a href={href}>
                                    {href
                                      .replace(".html", "")
                                      .replace(/-/g, " ")}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Top pages</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      {[
                        "all-profiles.html",
                        "profile-details.html",
                        "wedding.html",
                        "blog.html",
                        "blog-detail.html",
                        "about.html",
                        "contact.html",
                        "photo-gallery.html",
                        "photo-gallery-1.html",
                        "login.html",
                        "sign-up.html",
                        "plans.html",
                      ].map((href, i) => (
                        <li key={i}>
                          <a href={href}>
                            {href.replace(".html", "").replace(/-/g, " ")}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

                <li>
                  <a href="plans.html">Plans</a>
                </li>
                <li>
                  <a href="/user/user-sign-up">Register</a>
                </li>

                <li className="smenu-pare">
                  <span className="smenu">Dashboard</span>
                  <div className="smenu-open smenu-single">
                    <ul>
                      {[
                        "user-dashboard.html",
                        "user-profile.html",
                        "user-interests.html",
                        "user-chat.html",
                        "user-plan.html",
                        "user-setting.html",
                        "user-profile-edit.html",
                        "login.html",
                      ].map((href, i) => (
                        <li key={i}>
                          <a href={href}>
                            {href.replace(".html", "").replace(/-/g, " ")}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>

            {/* USER PROFILE */}
            <div className="al">
              <div className="head-pro">
                <img src={profImg1} alt="Profile" loading="lazy" />
                <b>Advisor</b>
                <br />
                <h4>Ashley emyy</h4>
                <span className="fclick"></span>
              </div>
            </div>

            {/* MOBILE MENU */}
            <div className="mob-menu">
              <div className="mob-me-ic">
                <span className="ser-open mobile-ser">
                  <img src={searchImg} alt="Search" />
                </span>
                <span className="mobile-exprt" data-mob="dashbord">
                  <img src={userImg} alt="User" />
                </span>
                <span className="mobile-menu" data-mob="mobile">
                  <img src={menuImg} alt="Menu" />
                </span>
              </div>
            </div>
            {/* END MOBILE MENU */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenuBar;
