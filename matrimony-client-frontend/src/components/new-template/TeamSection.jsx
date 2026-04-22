import profile6 from '../../assets/new-template/images/profiles/6.jpg';
import profile7 from '../../assets/new-template/images/profiles/7.jpg';
import profile8 from '../../assets/new-template/images/profiles/8.jpg';
import profile9 from '../../assets/new-template/images/profiles/9.jpg';

export default function TeamSection() {
  return (
    <section>
      <div
        className="ab-team"
        style={{
          paddingTop: '20px',   // reduce top space
          marginTop: '-50px'    // remove extra gap
        }}
      >
       <div className="container" style={{ maxWidth: '1350px', width: '100%' }}>
          <div className="row">
            <div className="home-tit">

              {/* 🔥 OUR PROFESSIONALS → BLACK */}
              <p style={{ color: '#000000' }}>
                OUR PROFESSIONALS
              </p>

              {/* 🔥 Meet Our Team → VIOLET */}
              <h2>
                <span style={{ color: '#7c3aed' }}>
                  Meet Our Team
                </span>
              </h2>

              <span className="leaf1" />
            </div>
            <ul>
              <li>
                <div>
                  <img src={profile6} alt="" loading="lazy" />
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
                  <img src={profile7} alt="" loading="lazy" />
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
                  <img src={profile8} alt="" loading="lazy" />
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
                  <img src={profile9} alt="" loading="lazy" />
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
  );
}
