import React from "react";

const WhyChooseUs = () => {
  return (
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
                  <img src="images/icon/prize.png" alt="" loading="lazy" />
                  <h4>Genuine profiles</h4>
                  <p>Contact genuine profiles with 100% verified mobile</p>
                </div>
              </li>
              <li>
                <div
                  className="animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                  data-dely="0.3"
                >
                  <img src="images/icon/trust.png" alt="" loading="lazy" />
                  <h4>Most trusted</h4>
                  <p>The most trusted wedding matrimony brand lorem</p>
                </div>
              </li>
              <li>
                <div
                  className="animate animate__animated animate__slower"
                  data-ani="animate__flipInX"
                  data-dely="0.6"
                >
                  <img src="images/icon/rings.png" alt="" loading="lazy" />
                  <h4>2000+ weddings</h4>
                  <p>Lakhs of peoples have found their life partner</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
