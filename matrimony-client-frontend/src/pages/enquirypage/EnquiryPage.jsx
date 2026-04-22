import React from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";

const EnquiryPage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="inn">
                <div className="lhs">
                  <div className="tit">
                    <h2>
                      Now{" "}
                      <b>
                        Find <br /> your life partner
                      </b>{" "}
                      Easy and fast.
                    </h2>
                  </div>
                  <div className="im">
                    <img src="images/login-couple.png" alt="" />
                  </div>
                  <div className="log-bg">&nbsp;</div>
                </div>
                <div className="rhs">
                  <div>
                    <div className="form-tit">
                      <h4>Send and enquiry</h4>
                      <h1>Ask your doubts</h1>
                      <p>
                        Already a member? <a href="login.html">Login</a>
                      </p>
                    </div>
                    <div className="form-login">
                      <form
                        className="cform fvali"
                        method="post"
                        action="https://rn53themes.net/themes/matrimo/mail/mail-contact.php"
                      >
                        <div
                          className="alert alert-success cmessage"
                          style={{ display: "none" }}
                          role="alert"
                        >
                          Your message was sent successfully.
                        </div>
                        <div className="form-group">
                          <label className="lb">Name:</label>
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your full name"
                            name="name"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Email:</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Phone:</label>
                          <input
                            type="number"
                            className="form-control"
                            id="phone"
                            placeholder="Enter phone number"
                            name="phone"
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <label className="lb">Message:</label>
                          <textarea
                            name="message"
                            className="form-control"
                            id="message"
                            placeholder="Enter message"
                            required=""
                            defaultValue={""}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Send Enquiry
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      {/* FOOTER */}
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
                  <a href="about-us.html">About company</a>
                </li>
                <li>
                  <a href="#!">Contact us</a>
                </li>
                <li>
                  <a href="#!">Feedback</a>
                </li>
                <li>
                  <a href="about-us.html#faq">FAQs</a>
                </li>
                <li>
                  <a href="about-us.html#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 fot-soc">
              <h4>SOCIAL MEDIA</h4>
              <ul>
                <li>
                  <a href="#!">
                    <img src="images/social/1.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/2.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/3.png" alt="" />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img src="images/social/5.png" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row foot-count">
            <p>
              Company name Site - Trusted by over thousands of Boys &amp; Girls
              for successfull marriage.{" "}
              <a href="sign-up.html" className="btn btn-primary btn-sm">
                Join us today !
              </a>
            </p>
          </div>
        </div>
      </section>
      {/* END */}
      {/* COPYRIGHTS */}
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

export default EnquiryPage;
