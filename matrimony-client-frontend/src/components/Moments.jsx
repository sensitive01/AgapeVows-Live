import React from "react";
import ringIcon from "/images/icon/rings.png";
import wedding1 from "../assets/images/icon/wedding-2.png";
import birdsIcon from "../assets/images/icon/love-birds.png";
import networkIcon from "../assets/images/icon/network.png";
import chatIcon from "../assets/images/icon/chat.png";
import weddingCoupleIcon from "../assets/images/icon/wedding-couple.png";

const Moments = () => {
  return (
    <section className="py-8">
      <div className="px-4 lg:px-12">
        <div className="wedd-tline rounded-3xl overflow-visible shadow-sm border border-gray-50 pb-10">
          <div className="container">
            <div className="row">
              <div className="home-tit">
                <p style={{ color: "black" }}>Momentzs</p>
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
                          src={ringIcon}
                          alt="ring_icon"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5 style={{ color: "#af1684" }}>Register</h5>
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
                        <h5 style={{ color: "#af1684" }}>Find your Match</h5>
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
                          src={wedding1}
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
                          src={birdsIcon}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5 style={{ color: "#af1684" }}>Send Interest</h5>
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
                        <h5 style={{ color: "#af1684" }}>
                          Get Profile Information
                        </h5>
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
                          src={networkIcon}
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
                          src={chatIcon}
                          alt=""
                          loading="lazy"
                        />
                      </div>
                      <div
                        className="tline-con animate animate__animated animate__slow"
                        data-ani="animate__fadeInUp"
                      >
                        <h5 style={{ color: "#af1684" }}>Start Meetups</h5>
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
                        <h5 style={{ color: "#af1684" }}>Getting Marriage</h5>
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
                          src={weddingCoupleIcon}
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
      </div>
    </section>
  );
};

export default Moments;
