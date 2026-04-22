import React from "react";

import LayoutComponent from "../components/layouts/LayoutComponent";
import BannerAndSearch from "../components/BannerAndSearch";
import BannerSlider from "../components/BannerSlider";
import QuickAccess from "../components/QuickAccess";

const UserHomePage = () => {
  return (
    <>
      <LayoutComponent />
      <BannerAndSearch />
      <BannerSlider />
      <QuickAccess />

      <section>
        <div className="hom-cus-revi">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{color:"black"}} >trusted brand</p>
                <h2>
                  <span>
                    Trust by <b className="num">1500</b>+ Couples
                  </span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <div className="slid-inn cus-revi">
                <ul className="slider3">
                  <li>
                    <div className="cus-revi-box">
                      <div className="revi-im">
                        <img
                          src="../../../assets/images/user/1.jpg"
                          alt=""
                          loading="lazy"
                        />
                        <i className="cir-com cir-1" />
                        <i className="cir-com cir-2" />
                        <i className="cir-com cir-3" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5 style={{ color: "#a020f0" }}>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </li>
                  <li>
                    <div className="cus-revi-box">
                      <div className="revi-im">
                        <img
                          src="../../../assets/images/user/1.jpg"
                          alt=""
                          loading="lazy"
                        />
                        <i className="cir-com cir-1" />
                        <i className="cir-com cir-2" />
                        <i className="cir-com cir-3" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5 style={{ color: "#a020f0" }}>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </li>
                  <li>
                    <div className="cus-revi-box">
                      <div className="revi-im">
                        <img
                          src="../../../assets/images/user/1.jpg"
                          alt=""
                          loading="lazy"
                        />
                        <i className="cir-com cir-1" />
                        <i className="cir-com cir-2" />
                        <i className="cir-com cir-3" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5 style={{ color: "#a020f0" }}>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </li>
                  <li>
                    <div className="cus-revi-box">
                      <div className="revi-im">
                        <img
                          src="../../../assets/images/user/1.jpg"
                          alt=""
                          loading="lazy"
                        />
                        <i className="cir-com cir-1" />
                        <i className="cir-com cir-2" />
                        <i className="cir-com cir-3" />
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                      </p>
                      <h5 style={{ color: "#a020f0" }}>Jack danial</h5>
                      <span>New york</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="cta-full-wid">
                <a
                  href="#!"
                  className="cta-dark"
                  style={{ background: "#a020f0" }}
                >
                  More customer reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* BANNER */}
      <section>
        <div className="str">
          <div className="ban-inn ban-home">
            <div className="container">
              <div className="row">
                <div className="hom-ban">
                  <div className="ban-tit">
                    <span>
                      <i className="no1">#1</i> Wedding Website
                    </span>
                    <h2 style={{ color: "white" }}>Why choose us</h2>
                    <p>
                      Most Trusted and premium Matrimony Service in the World.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* START */}
      <section>
        <div className="ab-sec2">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div
                    className="animate animate__animated animate__slower"
                    data-ani="animate__flipInX"
                    data-dely="0.1"
                  >
                    <img
                      src="../../../assets/images/icon/prize.png"
                      alt=""
                      loading="lazy"
                    />
                    <h4 style={{ color: "#A020F0" }}>Genuine profiles</h4>
                    <p>Contact genuine profiles with 100% verified mobile</p>
                  </div>
                </li>
                <li>
                  <div
                    className="animate animate__animated animate__slower"
                    data-ani="animate__flipInX"
                    data-dely="0.3"
                  >
                    <img
                      src="../../../assets/images/icon/trust.png"
                      alt=""
                      loading="lazy"
                    />
                    <h4 style={{ color: "#A020F0" }}>Most trusted</h4>
                    <p>The most trusted wedding matrimony brand lorem</p>
                  </div>
                </li>
                <li>
                  <div
                    className="animate animate__animated animate__slower"
                    data-ani="animate__flipInX"
                    data-dely="0.6"
                  >
                    <img
                      src="../../../assets/images/icon/rings.png"
                      alt=""
                      loading="lazy"
                    />
                    <h4 style={{ color: "#A020F0" }}>2000+ weddings</h4>
                    <p>Lakhs of peoples have found their life partner</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* ABOUT START */}
      <section>
        <div className="ab-wel">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="ab-wel-lhs">
                  <span className="ab-wel-3" />
                  <img
                    src="../../../assets/images/about/1.jpg"
                    alt=""
                    loading="lazy"
                    className="ab-wel-1"
                  />
                  <img
                    src="../../../assets/images/couples/20.jpg"
                    alt=""
                    loading="lazy"
                    className="ab-wel-2"
                  />
                  <span className="ab-wel-4" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="ab-wel-rhs">
                  <div className="ab-wel-tit">
                    <h2>
                      Welcome to <em>Wedding matrimony</em>
                    </h2>
                    <p>
                      Best wedding matrimony It is a long established fact that
                      a reader will be distracted by the readable content of a
                      page when looking at its layout.
                    </p>
                    <p>
                      <a href="#" style={{ color: "#A020F0" }}>
                        Click here to
                      </a>{" "}
                      Start you matrimony service now.
                    </p>
                  </div>
                  <div className="ab-wel-tit-1">
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in
                      some form, by injected humour, or randomised words which
                      don't look even slightly believable.
                    </p>
                  </div>
                  <div className="ab-wel-tit-2">
                    <ul>
                      <li>
                        <div>
                          <i className="fa fa-phone" aria-hidden="true" />
                          <h4>
                            Enquiry{" "}
                            <em style={{ color: "#A020F0" }}>+01 2242 3366</em>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div>
                          <i className="fa fa-envelope-o" aria-hidden="true" />
                          <h4>
                            Get Support{" "}
                            <em style={{ color: "#A020F0" }}>
                              info@example.com
                            </em>
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
      </section>
      {/* END */}
      {/* COUNTS START */}
      <section>
        <div className="ab-cont">
          <div className="container">
            <div className="row">
              <ul>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-heart-o" aria-hidden="true" />
                    <div>
                      <h4>2K</h4>
                      <span>Couples pared</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-users" aria-hidden="true" />
                    <div>
                      <h4>4000+</h4>
                      <span>Registerents</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-male" aria-hidden="true" />
                    <div>
                      <h4>1600+</h4>
                      <span>Mens</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="ab-cont-po">
                    <i className="fa fa-female" aria-hidden="true" />
                    <div>
                      <h4>2000+</h4>
                      <span>Womens</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* MOMENTS START */}
      <section>
        <div className="wedd-tline">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{color:"black"}}>Moments</p>
                <h2>
                  <span>How it works</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <div className="inn">
                <ul>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img
                          src="../../../assets/images/icon/rings.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Register</h5>
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
                        <h5 >Find your Match</h5>
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
                        <img
                          src="../../../assets/images/icon/wedding-1.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img
                          src="../../../assets/images/icon/love-birds.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Send Interest</h5>
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
                        <h5>Get Profile Information</h5>
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
                        <img
                          src="../../../assets/images/icon/network.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="tline-inn">
                      <div
                        className="tline-im animate animate__animated animate__slower"
                        data-ani="animate__fadeInUp"
                      >
                        <img
                          src="../../../assets/images/icon/chat.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5>Start Meetups</h5>
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
                        <h5>Getting Marriage</h5>
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
                        <img
                          src="../../../assets/images/icon/wedding-couple.png"
                          alt=""
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* RECENT COUPLES */}
      <section>
        <div className="hom-couples-all">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{color:"black"}}>trusted brand</p>
                <h2>
                  <span>Recent Couples</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
            </div>
          </div>
          <div className="hom-coup-test">
            <ul className="couple-sli">
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/6.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/7.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/8.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/9.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/10.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/3.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/4.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="hom-coup-box">
                  <span className="leaf" />
                  <img
                    src="../../../assets/images/couples/5.jpg"
                    alt=""
                    loading="lazy"
                  />
                  <div className="bx">
                    <h4>
                      Dany &amp; July <span>New York</span>
                    </h4>
                    <a href="#" className="sml-cta cta-dark">
                      View more
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* END */}
      {/* TEAM START */}
      <section>
        <div className="ab-team">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{color:"black"}}>OUR PROFESSIONALS</p>
                <h2>
                  <span>Meet Our Team</span>
                </h2>
                <span className="leaf1" />
              </div>
              <ul>
                <li>
                  <div>
                    <img
                      src="../../../assets/images/profiles/6.jpg"
                      alt=""
                      loading="lazy"
                    />
                    <h4>Ashley Jen</h4>
                    <p>Marketing Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src="../../../assets/images/profiles/7.jpg"
                      alt=""
                      loading="lazy"
                    />
                    <h4>Ashley Jen</h4>
                    <p>Marketing Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src="../../../assets/images/profiles/8.jpg"
                      alt=""
                      loading="lazy"
                    />
                    <h4>Emily Arrov</h4>
                    <p>Creative Manager</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <div>
                    <img
                      src="../../../assets/images/profiles/9.jpg"
                      alt=""
                      loading="lazy"
                    />
                    <h4>Julia sear</h4>
                    <p>Client Coordinator</p>
                    <ul className="social-light">
                      <li>
                        <a href="#!">
                          <i className="fa fa-facebook" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-twitter" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-whatsapp" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-linkedin" aria-hidden="true" />
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fa fa-instagram" aria-hidden="true" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* GALLERY START */}
      <section>
        <div className="wedd-gall home-wedd-gall">
          <div className="">
            <div className="gall-inn">
              <div className="home-tit">
                <p style={{color:"black"}}>collections</p>
                <h2>
                  <span>Photo gallery</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <div className="col-sm-6 col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slow"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/1.jpg"
                    className="gal-siz-1"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/9.jpg"
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/3.jpg"
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/4.jpg"
                    className="gal-siz-1"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/5.jpg"
                    className="gal-siz-1"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/6.jpg"
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-3">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/7.jpg"
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/gallery/8.jpg"
                    className="gal-siz-1"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
              </div>
              <div className="col-md-2">
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/couples/9.jpg"
                    className="gal-siz-2"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
                <div
                  className="gal-im animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                >
                  <img
                    src="../../../assets/images/couples/11.jpg"
                    className="gal-siz-1"
                    alt=""
                    loading="lazy"
                  />
                  <div className="txt">
                    <span>Wedding</span>
                    <h4>Bride &amp; Groom</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* BLOG POSTS START */}
      <section>
        <div className="hom-blog">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{color:"black"}}>Blog posts</p>
                <h2>
                  <span>Blog &amp; Articles</span>
                </h2>
                <span className="leaf1" />
                <span className="tit-ani-" />
              </div>
              <div className="blog">
                <ul>
                  <li>
                    <div className="blog-box">
                      <img
                        src="../../../assets/images/blog/1.jpg"
                        alt=""
                        loading="lazy"
                      />
                      <span>Wedding - Johnny</span>
                      <h2>Wedding arrangements</h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <a href="#" className="cta-dark" style={{background:"#A020F0"}}>
                        <span>Read more</span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="blog-box">
                      <img
                        src="../../../assets/images/blog/2.jpg"
                        alt=""
                        loading="lazy"
                      />
                      <span>Wedding - Johnny</span>
                      <h2>Wedding arrangements</h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <a href="#" className="cta-dark" style={{background:"#A020F0"}} >
                        <span>Read more</span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="blog-box">
                      <img
                        src="../../../assets/images/blog/3.jpg"
                        alt=""
                        loading="lazy"
                      />
                      <span>Wedding - Johnny</span>
                      <h2>Invitation cards</h2>
                      <p>
                        It is a long established fact that a reader will be
                        distracted by the readable content.
                      </p>
                      <a href="#" className="cta-dark" style={{background:"#A020F0"}}>
                        <span>Read more</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* FIND YOUR MATCH BANNER */}
      <section>
        <div className="str count">
          <div className="container">
            <div className="row">
              <div className="fot-ban-inn">
                <div className="lhs">
                  <h2 style={{color:"#A020F0"}}>Find your perfect Match now</h2>
                  <p>
                    lacinia viverra lectus. Fusce imperdiet ullamcorper metus eu
                    fringilla.Lorem Ipsum is simply dummy text of the printing
                    and typesetting industry.
                  </p>
                  <a href="/user/user-sign-up" className="cta-3" style={{background:"#A020F0"}}>
                    Register Now
                  </a>
                  <a href="/contact-page" className="cta-4">
                    Help &amp; Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* END */}
      {/* FOOTER */}
      <section className="wed-hom-footer" style={{ background: "#A020F0" }}>
        <div className="container" >
          <div className="row foot-supp" style={{ background: "black" }}>
            <h2 >
              <span>Free support:</span> +92 (8800) 68 - 8960
              &nbsp;&nbsp;|&nbsp;&nbsp; <span>Email:</span> info@example.com
            </h2>
          </div>
          <div className="row wed-foot-link wed-foot-link-1" >
            <div className="col-md-4">
              <h4 style={{color:"white"}}>Get In Touch</h4>
              <p style={{color:"white"}}>Address: 3812 Lena Lane City Jackson Mississippi</p>
              <p style={{color:"white"}}>
                Phone: <a href="tel:+917904462944" style={{color:"white"}}>+92 (8800) 68 - 8960</a>
              </p>
              <p style={{color:"white"}}>
                Email: <a href="mailto:info@example.com" style={{color:"white"}}>info@example.com</a>
              </p>
            </div>
            <div className="col-md-4" style={{color:"white"}}>
              <h4 style={{color:"white"}}>HELP &amp; SUPPORT</h4>
              <ul>
                <li>
                  <a href="#" style={{color:"white"}}>About company</a>
                </li>
                <li>
                  <a href="#!" style={{color:"white"}}>Contact us</a>
                </li>
                <li>
                  <a href="#!" style={{color:"white"}}>Feedback</a>
                </li>
                <li>
                  <a href="#" style={{color:"white"}}>FAQs</a>
                </li>
                <li>
                  <a href="#" style={{color:"white"}}>Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="col-md-4 fot-soc">
              <h4 style={{color:"white"}}>SOCIAL MEDIA</h4>
              <ul>
                <li>
                  <a href="#!">
                    <img
                      src="../../../assets/images/social/1.png"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img
                      src="../../../assets/images/social/2.png"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img
                      src="../../../assets/images/social/3.png"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </li>
                <li>
                  <a href="#!">
                    <img
                      src="../../../assets/images/social/5.png"
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="row foot-count">
            <p style={{color:"white"}}>
              Company name Site - Trusted by over thousands of Boys &amp; Girls
              for successfull marriage.
              <a href="#" className="btn btn-primary btn-sm">
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
                Copyright © <span id="cry">2023</span>
                <a href="#!" target="_blank">
                  Company.com
                </a>{" "}
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHomePage;
