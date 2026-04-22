import React from "react";
import about1 from "../assets/images/about/1.jpg";
import couple1 from "../assets/images/couples/20.jpg";

const WelcomeTo = () => {
  return (
    <section className="py-8">
      <div className="px-4 lg:px-12">
        <div className="ab-wel rounded-3xl overflow-visible shadow-sm border border-gray-50">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3" />
                  <img src={about1} alt="" loading="lazy" className="ab-wel-1" />
                  <span className="ab-wel-4" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Agapevows matrimony</em>
                    </h2>
                    <p>
                      Best wedding matrimony It is a long established fact that a
                      reader will be distracted by the readable content of a page
                      when looking at its layout.
                    </p>
                    <p>
                      <a href="#" style={{ color: "#af1684" }}>
                        Click here 
                      </a>{" "}
                     to Start your matrimony service now.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                    </p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true" />
                          <h4>
                            Enquiry{" "}
                            <em style={{ color: "#af1684" }}>+01 2242 3366</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <h4>
                            Get Support{" "}
                            <em style={{ color: "#af1684" }}>info@example.com</em>
                          </h4>
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
    </section>
  );
};

export default WelcomeTo;
