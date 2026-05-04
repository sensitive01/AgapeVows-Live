import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import { deactivateProfile } from "../api/axiosService/userAuthService";

const UserSettingsPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Found my partner in AgapeVows",
    "Found my partner elsewhere",
    "Not interested",
    "Need short break but will come back",
    "Going to pursue higher studies"
  ];

  const handleDeactivate = async () => {
    if (!deactivationReason) {
      alert("Please select a reason for deactivation");
      return;
    }

    if (!window.confirm("Are you sure you want to deactivate your profile? You will be logged out.")) {
      return;
    }

    setLoading(true);
    try {
      const response = await deactivateProfile(userId, deactivationReason);
      if (response.status === 200) {
        alert("Your profile has been deactivated successfully.");
        // Logout user
        localStorage.clear();
        navigate("/user/user-login");
      }
    } catch (error) {
      console.error("Error deactivating profile:", error);
      alert("Failed to deactivate profile. Please try again.");
    } finally {
      setLoading(false);
      setShowDeactivateModal(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                <div className="row">
                  <div className="col-md-12 db-sec-com">
                    <h2 className="db-tit">Profile settings</h2>
                    <div className="col7 fol-set-rhs">
                      <div className="ms-write-post fol-sett-sec sett-rhs-pro">
                        {/* <div className="foll-set-tit fol-pro-abo-ico">
                          <h4>Profile</h4>
                        </div> */}
                        <div className="fol-sett-box">
                          <ul>
                            {/* <li>
                              <div className="sett-lef">
                                <div className="auth-pro-sm sett-pro-wid">
                                  <div className="auth-pro-sm-img">
                                    <img src="images/profiles/15.jpg" alt="" />
                                  </div>
                                  <div className="auth-pro-sm-desc">
                                    <h5>Anna Jaslin</h5>
                                    <p>Premium user | Illunois</p>
                                  </div>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <a href="#" className="set-sig-out">
                                  Sign Out
                                </a>
                              </div>
                            </li> */}
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Profile visible</h5>
                                  <p>
                                    You can set-up who can able to view your
                                    profile.
                                  </p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="sett-select-drop">
                                  <select>
                                    <option value="All users">All users</option>
                                    <option value="Premium">Premium Users Only</option>
                                    {/* <option value="Free">Free</option> */}
                                    <option value="Free"> 
                                      Hide from Everyone (No one can view your profile)
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Who can send you Interest requests?</h5>
                                  <p>
                                    You can set-up who can able to make Interest
                                    request here.
                                  </p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="sett-select-drop">
                                  <select>
                                    <option value="All users">All users</option>
                                    <option value="Premium">Premium Users Only</option>
                                    {/* <option value="Free">Free</option> */}
                                  </select>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="ms-write-post fol-sett-sec sett-rhs-not">
                        <div className="foll-set-tit fol-pro-abo-ico">
                          <h4>Notifications</h4>
                        </div>
                        <div className="fol-sett-box">
                          <ul>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Interest request</h5>
                                  <p>Interest request email notificatios</p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="checkboxes-and-radios">
                                  <input
                                    type="checkbox"
                                    name="checkbox-cats"
                                    id="sett-not-mail"
                                    value="1"
                                    defaultChecked
                                  />
                                  <label htmlFor="sett-not-mail"></label>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Chat</h5>
                                  <p>New chat notificatios</p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="checkboxes-and-radios">
                                  <input
                                    type="checkbox"
                                    name="checkbox-cats"
                                    id="sett-not-fri"
                                    value="1"
                                    defaultChecked
                                  />
                                  <label htmlFor="sett-not-fri"></label>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Profile views</h5>
                                  <p>
                                    If any one view your profile means you get
                                    the notifications at end of the day
                                  </p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="checkboxes-and-radios">
                                  <input
                                    type="checkbox"
                                    name="checkbox-cats"
                                    id="sett-not-fol"
                                    value="1"
                                    defaultChecked
                                  />
                                  <label htmlFor="sett-not-fol"></label>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>New profile match</h5>
                                  <p>You get the profile match emails</p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <div className="checkboxes-and-radios">
                                  <input
                                    type="checkbox"
                                    name="checkbox-cats"
                                    id="sett-not-mes"
                                    value="1"
                                    defaultChecked
                                  />
                                  <label htmlFor="sett-not-mes"></label>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="ms-write-post fol-sett-sec sett-rhs-deact">
                        <div className="foll-set-tit fol-pro-abo-ico">
                          <h4>Account Settings</h4>
                        </div>
                        <div className="fol-sett-box">
                          <ul>
                            <li>
                              <div className="sett-lef">
                                <div className="sett-rad-left">
                                  <h5>Deactivate Profile</h5>
                                  <p>Temporarily hide your profile from the platform. You can reactivate it later by contacting support.</p>
                                </div>
                              </div>
                              <div className="sett-rig">
                                <button 
                                  className="btn btn-danger btn-sm"
                                  onClick={() => setShowDeactivateModal(true)}
                                >
                                  Deactivate Account
                                </button>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deactivate Modal */}
      {showDeactivateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Deactivate Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeactivateModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>We are sorry to see you go. Please tell us why you want to deactivate your profile:</p>
                <div className="form-group mt-3">
                  <select 
                    className="form-control" 
                    value={deactivationReason}
                    onChange={(e) => setDeactivationReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    {reasons.map((reason, index) => (
                      <option key={index} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>
                <div className="alert alert-warning mt-4 small">
                  <i className="fa fa-info-circle me-2"></i>
                  Note: Deactivating your profile will hide it from all other users. Your data will be preserved, but you won't be visible in searches or lists.
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeactivateModal(false)}>Cancel</button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDeactivate}
                  disabled={loading || !deactivationReason}
                >
                  {loading ? "Deactivating..." : "Confirm Deactivation"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <section className="wed-hom-footer">
        <div className="container">
          <div className="row foot-supp">
            <h2>
              <span>Free support:</span> +92 (8800) 68 - 8960
              &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span>
              info@example.com
            </h2>
          </div>
          <div className="row wed-foot-link wed-foot-link-1">
            <div className="col-md-4">
              <h4>Get In Touch</h4>
              <p>Address: 3812 Lena Lane City Jackson Mississippi</p>
              <p>
                Phone: <a href="tel:+917904462944">+92 (8800) 68 - 8960</a>
              </p>
              <p>
                Email: <a href="mailto:info@example.com">info@example.com</a>
              </p>
            </div>
            <div className="col-md-4">
              <h4>HELP &amp; SUPPORT</h4>
              <ul>
                <li>
                  <a href="#">About company</a>
                </li>
                <li>
                  <a href="#!">Contact us</a>
                </li>
                <li>
                  <a href="#!">Feedback</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 fot-soc">
              <h4>SOCIAL MEDIA</h4>
              <ul>
                <li>
                  <a href="#!">
                    <img src="/images/social/1.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="/images/social/2.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="/images/social/3.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="/images/social/5.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row foot-count">
            <p>
              Company name Site - Trusted by over thousands of Boys & Girls for
              successfull marriage.{" "}
              <a href="#" className="btn btn-primary btn-sm">
                Join us today !
              </a>
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="cr">
          <div className="container">
            <div className="row">
              <p>
                Copyright © <span id="cry">2017-2020</span>{" "}
                <a href="#!" target="_blank">
                  Company.com
                </a>{" "}
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserSettingsPage;
