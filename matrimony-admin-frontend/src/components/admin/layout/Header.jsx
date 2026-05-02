import React from "react";
import { useNavigate } from "react-router-dom";
import headerLogo from "../../../../public/assets/images/agapevows - logo.webp";


const Header = () => {
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("adminId");
  navigate("/", { replace: true });
};
  return (
    <section className="head">
      <div className="container">
        <div className="row header">
          <div className="col-md-3">
            <div className="logo">
              <img src={headerLogo} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="top-sarch">
              <input type="text" placeholder="Search here" />
            </div>
          </div>
          <div className="col-md-3">
            <div className="top-set">
              <ul>
                <li>
                  <div className="sett-out smenu-pare">
                    <span className="smenu">
                      <i className="fa fa-bell-o" aria-hidden="true"></i>
                    </span>
                    <div className="smenu-open top-noti">
                      <ul>
                        <li>
                          <div>
                            <p>
                              <strong>4</strong> New users joined today
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <strong>6</strong> New users waiting for the Admin
                              approve
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <strong>200</strong> Users visiting our website in
                              last day
                            </p>
                          </div>
                        </li>
                        <li>
                          <div>
                            <p>
                              <strong>20</strong> Users send{" "}
                              <strong>Interest request</strong> in last day
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="sett-out smenu-pare">
                    <span className="smenu">
                      <i className="fa fa-bars" aria-hidden="true"></i>
                    </span>
                    <div className="smenu-open">
                      <ul>
                        <li>
                          <a
                            href="/admin/all-user-list"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/all-user-list");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/all-user-list", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i className="fa fa-male" aria-hidden="true"></i>{" "}
                            All Profiles{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/pricing-plans-list"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/pricing-plans-list");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/pricing-plans-list", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i className="fa fa-usd" aria-hidden="true"></i>{" "}
                            Pricing details{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/all-payments-list"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/all-payments-list");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/all-payments-list", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i className="fa fa-money" aria-hidden="true"></i>{" "}
                            Payments{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/enquiries"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/enquiries");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/enquiries", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i
                              className="fa fa-envelope-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Enquiries{" "}
                          </a>
                        </li>
                        <li>
                          <a href="/admin/feedbacks" className="waves-effect">
                            <i
                              className="fa fa-comments-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Feedbacks{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="sett-out smenu-pare">
                    <span className="smenu">
                      <i className="fa fa-cog" aria-hidden="true"></i>
                    </span>
                    <div className="smenu-open">
                      <ul>
                        <li>
                          <a
                            href="/admin/settings-page"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/settings-page");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/settings-page", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i className="fa fa-cogs" aria-hidden="true"></i>
                            Site Setting{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="/admin/seo-google-analystics-code"
                            onClick={(e) => {
                              if (!e.ctrlKey) {
                                e.preventDefault();
                                navigate("/admin/seo-google-analystics-code");
                              } else {
                                e.preventDefault();
                                const newTab = window.open("/admin/seo-google-analystics-code", "_blank");
                                if (newTab) newTab.focus();
                              }
                            }}
                            className="waves-effect"
                          >
                            <i className="fa fa-list-ul" aria-hidden="true"></i>{" "}
                            SEO Settings{" "}
                          </a>
                        </li>
                        <li>
                          <a
                            href="admin-profile-filters.html"
                            className="waves-effect"
                          >
                            <i
                              className="fa fa-building-o"
                              aria-hidden="true"
                            ></i>{" "}
                            All profile filters{" "}
                          </a>
                        </li>
                        <li>
                          <a href="admin-export.html" className="waves-effect">
                            <i className="fa fa-undo" aria-hidden="true"></i>{" "}
                            Backup Data{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="sett-out smenu-pare">
                    <span className="smenu">
                      <i className="fa fa-user-o" aria-hidden="true"></i>
                    </span>
                    <div className="smenu-open">
                      <ul>
                        <li>
                         <a
  href="#"
  className="waves-effect"
  onClick={(e) => {
    e.preventDefault();
    handleLogout();
  }}
>
  <i className="fa fa-sign-out" aria-hidden="true"></i>{" "}
  Log out{" "}
</a>

                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;

