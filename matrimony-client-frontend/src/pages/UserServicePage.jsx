import React from "react";
import Image1 from "../assets/images/couples/19.jpg";
import Image2 from "../assets/images/couples/11.jpg";
import Image3 from "../assets/images/couples/14.jpg";
import Image4 from "../assets/images/couples/15.jpg";
import Image5 from "../assets/images/couples/16.jpg";
import Image6 from "../assets/images/couples/17.jpg";
import Image7 from "../assets/images/couples/18.jpg";
import Image8 from "../assets/images/couples/10.jpg";

import LayoutComponent from "../components/layouts/LayoutComponent";

const UserServicePage = () => {
  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div style={{ paddingTop: "115px", paddingBottom: "40px" }}>
        <div className="pg-ser">
          <div className="inn">
            <ul>
              <li>
                <div className="gal-im">
                  <img
                    src={Image1}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Matrimony Wedding Services</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image2}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>The Ceremony</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image3}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Photography & Video</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image4}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Food Catering</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image5}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Decorations</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image6}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Wedding Halls</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image7}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>Wedding Registry</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <div className="gal-im">
                  <img
                    src={Image8}
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding Matrimony</span>
                    <h4>The Perfect Cake</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      Aenean commodo ligula.
                    </p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="wed-hom-footer wed-hom-footer-top0">
        <div className="container">
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

export default UserServicePage;
