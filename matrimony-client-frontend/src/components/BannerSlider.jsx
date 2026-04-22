import React from 'react';

import bannerSlider1 from "../assets/images/ban-bg.jpg";
import bannerSlider2 from "../assets/images/banner.jpg";

const BannerSlider = () => {
  return (
    <section>
      <div className="hom-ban-sli">
        <div>
          <ul className="ban-sli">
            <li>
              <div className="image">
                <img src={bannerSlider1} alt="" loading="lazy" />
              </div>
            </li>
            <li>
              <div className="image">
                <img src={bannerSlider2} alt="" loading="lazy" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BannerSlider;
