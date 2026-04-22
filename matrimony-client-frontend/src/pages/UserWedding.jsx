import React from "react";

import LayoutComponent from "../components/layouts/LayoutComponent";

const UserWedding = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-16">
        <div className="wedd m-tp">
          <div className="container">
            <div className="row">
              <div className="ban-wedd">
                <h2>
                  Michael <span>& Jessica</span>
                </h2>
                <p>
                  Lakhs of peoples have found their life partner at Wedding
                  Matrimony!
                </p>
                <a href="#" className="cta-dark">
                  Make reservation
                </a>
                <div className="wedd-info">
                  <ul>
                    <li>
                      <i className="fa fa-calendar-o" aria-hidden="true"></i>
                      <span>12 June | 9:00 AM</span>
                    </li>
                    <li>
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <a href="#!">Direction</a>
                    </li>
                  </ul>
                </div>
                <div className="wedd-deco">
                  <div className="pho-frame pho-frame2">
                    <img src="images/couples/1.jpg" alt="" />
                    <span>Michael Jessica</span>
                  </div>
                  <div className="pho-frame pho-frame1">
                    <img src="images/couples/5.jpg" alt="" />
                  </div>
                </div>
                <div className="wedd-frame">
                  <img src="images/couples/9.jpg" alt="" />
                </div>
                <div className="wedd-ban-leaf">
                  <span className="wedd-leaf-1"></span>
                  <span className="wedd-leaf-2"></span>
                  <span className="wedd-leaf-3"></span>
                  <span className="wedd-leaf-4"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="foot-box">
          <div className="container">
            <div className="row">
              <div className="inn">
                <ul>
                  <li>
                    <div className="foot-inn">
                      <i className="fa fa-mobile" aria-hidden="true"></i>
                      <div>
                        <span>Phone</span>
                        <h5>+01 2312 2143</h5>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="foot-inn">
                      <i className="fa fa-users" aria-hidden="true"></i>
                      <div>
                        <span>Reservation</span>
                        <h5>Count: 1,000+</h5>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="foot-inn">
                      <i className="fa fa-map-marker" aria-hidden="true"></i>
                      <div>
                        <span>City</span>
                        <h5>NewYork</h5>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wedd-dat">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="save-txt">
                  <h4>Our story</h4>
                  <h2>Save the date</h2>
                </div>
              </div>
              <div className="col-md-9">
                <div className="save-im">
                  <div className="inn">
                    <img src="images/couples/9.jpg" alt="" />
                    <div className="desc">
                      <span>24, June 2023</span>
                      <h4>The day we meet</h4>
                    </div>
                  </div>
                  <div className="inn">
                    <img src="images/couples/7.jpg" alt="" />
                    <div className="desc">
                      <span>24, June 2023</span>
                      <h4>The day we meet</h4>
                    </div>
                  </div>
                  <div className="inn">
                    <img src="images/couples/6.jpg" alt="" />
                    <div className="desc">
                      <span>24, June 2023</span>
                      <h4>The day we meet</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wedd-tline">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p>Moments</p>
                <h2>
                  <span>Wedding Timeline</span>
                </h2>
                <span className="leaf1"></span>
                <span className="tit-ani-"></span>
              </div>
              <div className="inn">
                <ul>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-1.png" alt="" />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Welcome Wedding</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn tline-inn-reve">
                      <div
                        className="tline-con animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>CEREMONY</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                      <div
                        className="tline-im animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-2.png" alt="" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-4.png" alt="" />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Dining</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn tline-inn-reve">
                      <div
                        className="tline-con animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Photoshoot</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                      <div
                        className="tline-im animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-5.png" alt="" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-6.png" alt="" />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Music & Party event</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn tline-inn-reve">
                      <div
                        className="tline-con animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Party</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                      <div
                        className="tline-im animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-7.png" alt="" />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img src="images/icon/wedding-8.png" alt="" />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Send off</h5>
                        <span>Timing: 7:00 PM</span>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wedd-gall">
          <div className="">
            <div className="gall-inn">
              <div className="home-tit">
                <p>collections</p>
                <h2>
                  <span>Photo gallery</span>
                </h2>
                <span className="leaf1"></span>
                <span className="tit-ani-"></span>
              </div>
              <div className="col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slow"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/1.jpg"
                    className="gal-siz-1"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/9.jpg"
                    className="gal-siz-2"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/3.jpg"
                    className="gal-siz-2"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/4.jpg"
                    className="gal-siz-1"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/5.jpg"
                    className="gal-siz-1"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/6.jpg"
                    className="gal-siz-2"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/7.jpg"
                    className="gal-siz-2"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/gallery/8.jpg"
                    className="gal-siz-1"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/couples/9.jpg"
                    className="gal-siz-2"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="images/couples/11.jpg"
                    className="gal-siz-1"
                    alt=""
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride & Groom</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default UserWedding;
