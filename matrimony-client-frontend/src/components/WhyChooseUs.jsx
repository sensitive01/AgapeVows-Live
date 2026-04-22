import React from "react";
import prizeIcon from "../assets/images/icon/prize.png";
import trustIcon from "../assets/images/icon/trust.png";
import ringsIcon from "../assets/images/icon/rings.png"


const WhyChooseUs = () => {
  return (
    <>
      <section className="py-2">
        <div className="px-4 lg:px-12">
          <div className="str rounded-2xl overflow-visible">
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
        </div>
      </section>
      <section className="py-2">
        <div className="px-4 lg:px-12">
          <div className="ab-sec2 rounded-2xl overflow-visible">
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
                        src={prizeIcon}
                        alt=""
                        loading="lazy"
                      />
                      <h4 style={{ color: "#af1684" }}>Genuine profiles</h4>
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
                        src={trustIcon}
                        alt=""
                        loading="lazy"
                      />
                      <h4 style={{ color: "#af1684" }}>Most trusted</h4>
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
                        src={ringsIcon}
                        alt=""
                        loading="lazy"
                      />
                      <h4 style={{ color: "#af1684" }}>2000+ weddings</h4>
                      <p>Lakhs of peoples have found their life partner</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
