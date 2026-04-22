import logoBImg from '../../assets/new-template/images/logo-b.png';
import profile1 from '../../assets/new-template/images/profiles/1.jpg';
import iconSearch from '../../assets/new-template/images/icon/search.svg';
import iconUsers from '../../assets/new-template/images/icon/users.svg';
import iconMenu from '../../assets/new-template/images/icon/menu.svg';
import iconClose from '../../assets/new-template/images/icon/close.svg';
import couple1 from '../../assets/new-template/images/couples/1.jpg';
import couple3 from '../../assets/new-template/images/couples/3.jpg';
import couple4 from '../../assets/new-template/images/couples/4.jpg';
import SidebarLoginComponent from './SidebarLoginComponent';

export default function MainMenu() {
  const openLoginPopup = (e) => {
    e.preventDefault();
    const menuPop = document.querySelector('.menu-pop1');
    const popBg = document.querySelector('.pop-bg');
    if (menuPop) menuPop.classList.add('act');
    if (popBg) popBg.classList.add('act');
    document.querySelectorAll('.mob-me-all').forEach((el) => el.classList.remove('act'));
    document.body.style.overflow = 'hidden';
  };

  const closePopup = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    document.querySelectorAll('.menu-pop, .pop-bg, .mob-me-all').forEach((el) => el.classList.remove('act'));
    document.body.style.overflow = 'visible';
  };

  return (
    <>
      {/* MENU POPUP */}
      <SidebarLoginComponent closePopup={closePopup} />
      {/* END */}
      {/* CONTACT EXPERT */}
      <div className="menu-pop menu-pop2">
        <span className="menu-pop-clo" onClick={closePopup} style={{ cursor: 'pointer' }}>
          <i className="fa fa-times" aria-hidden="true" />
        </span>
        <div className="inn">
          <div className="menu-pop-help">
            <h4>Support Team</h4>
            <div className="user-pro">
              <img src={profile1} alt="" loading="lazy" />
            </div>
            <div className="user-bio">
              <h5>Ashley emyy</h5>
              <span>Senior personal advisor</span>
              <a href="enquiry.html" className="btn btn-primary btn-sm">
                Ask your doubts
              </a>
            </div>
          </div>
          <div className="menu-pop-soci">
            <ul>
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
                  <i className="fa fa-youtube-play" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <div className="late-news">
            <h4>Latest news</h4>
            <ul>
              <li>
                <div className="rel-pro-img">
                  <img src={couple1} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
              <li>
                <div className="rel-pro-img">
                  <img src={couple3} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
              <li>
                <div className="rel-pro-img">
                  <img src={couple4} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
            </ul>
          </div>
          <div className="prof-rhs-help">
            <div className="inn">
              <h3>Tell us your Needs</h3>
              <p>Tell us what kind of service you are looking for.</p>
              <a href="enquiry.html">Register for free</a>
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      {/* MAIN MENU */}
      <div className="hom-top">
        <div className="container">
          <div className="row">
            <div className="hom-nav">
              {/* LOGO */}
              <div className="logo">
                {/* <span className="menu desk-menu">
                  <i />
                  <i />
                  <i />
                </span> */}
                <a href="/" className="logo-brand">
                  <img src={logoBImg} alt="" loading="lazy" className="ic-logo" />
                </a>
              </div>
              {/* EXPLORE MENU */}
              <div className="bl">
                <ul>
                  <li className="smenu-pare">
                    <span className="smenu">Explore</span>
                    <div className="smenu-open smenu-box">
                      <div className="container">
                        <div className="row">
                          <h4 className="tit">Explore category</h4>
                          <ul>
                            <li>
                              <div className="menu-box menu-box-2">
                                <h5>
                                  Browse profiles{" "}
                                  <span>1200+ Verified profiles</span>
                                </h5>
                                <span className="explor-cta">More details</span>
                                <a href="all-profiles.html" className="fclick" />
                              </div>
                            </li>
                            <li>
                              <div className="menu-box menu-box-1">
                                <h5>
                                  Wedding page <span>Make reservation</span>
                                </h5>
                                <span className="explor-cta">More details</span>
                                <a href="wedding.html" className="fclick" />
                              </div>
                            </li>
                            <li>
                              <div className="menu-box menu-box-3">
                                <h5>
                                  All Services<span>Lorem ipsum dummy</span>
                                </h5>
                                <span className="explor-cta">More details</span>
                                <a href="services.html" className="fclick" />
                              </div>
                            </li>
                            <li>
                              <div className="menu-box menu-box-4">
                                <h5>
                                  Join Now <span>Lorem ipsum dummy</span>
                                </h5>
                                <span className="explor-cta">More details</span>
                                <a href="plans.html" className="fclick" />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="smenu-pare">
                    <span className="smenu">All pages</span>
                    <div className="smenu-open smenu-multi">
                      <div className="container">
                        <div className="row">
                          <div className="multi-col">
                            <div className="inn">
                              <h4>Page sets 1</h4>
                              <ul>
                                <li>
                                  <a href="all-profiles.html">All profiles</a>
                                </li>
                                <li>
                                  <a href="profile-details.html">Profile details</a>
                                </li>
                                <li>
                                  <a href="wedding.html">Wedding</a>
                                </li>
                                <li>
                                  <a href="wedding-video.html">Wedding video</a>
                                </li>
                                <li>
                                  <a href="services.html">Our Services</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="multi-col">
                            <div className="inn">
                              <h4>Page sets 2</h4>
                              <ul>
                                <li>
                                  <a href="plans.html">Pricing plans</a>
                                </li>
                                <li>
                                  <a href="#!" onClick={openLoginPopup}>Login</a>
                                </li>
                                <li>
                                  <a href="/user/user-sign-up">Sign-up</a>
                                </li>
                                <li>
                                  <a href="photo-gallery.html">Photo gallery</a>
                                </li>
                                <li>
                                  <a href="photo-gallery-1.html">Photo gallery 1</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="multi-col">
                            <div className="inn">
                              <h4>Page sets 3</h4>
                              <ul>
                                <li>
                                  <a href="contact.html">Contact</a>
                                </li>
                                <li>
                                  <a href="about.html">About</a>
                                </li>
                                <li>
                                  <a href="blog.html">Blog</a>
                                </li>
                                <li>
                                  <a href="blog-detail.html">Blog detail</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="multi-col">
                            <div className="inn">
                              <h4>Page sets 4</h4>
                              <ul>
                                <li>
                                  <a href="enquiry.html">Ask your doubts</a>
                                </li>
                                <li>
                                  <a href="make-reservation.html">
                                    Make Reservation
                                  </a>
                                </li>
                                <li>
                                  <a href="faq.html">FAQ</a>
                                </li>
                                <li>
                                  <a href="coming-soon.html" target="_blank">
                                    Coming soon
                                  </a>
                                </li>
                                <li>
                                  <a href="404.html">404</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="multi-col full">
                            <div className="inn">
                              <h4>User dashboard pages</h4>
                              <ul>
                                <li>
                                  <a href="user-dashboard.html">Dashboard</a>
                                </li>
                                <li>
                                  <a href="user-profile.html">My profile</a>
                                </li>
                                <li>
                                  <a href="user-interests.html">Interests</a>
                                </li>
                                <li>
                                  <a href="user-chat.html">Chat lists</a>
                                </li>
                                <li>
                                  <a href="user-plan.html">My plan details</a>
                                </li>
                                <li>
                                  <a href="user-setting.html">Profile settings</a>
                                </li>
                                <li>
                                  <a href="user-profile-edit.html">
                                    Edit full profile
                                  </a>
                                </li>
                                <li>
                                  <a href="#!" onClick={openLoginPopup}>Sign in</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="smenu-pare">
                    <span className="smenu">Top pages</span>
                    <div className="smenu-open smenu-single">
                      <ul>
                        <li>
                          <a href="all-profiles.html">All profiles</a>
                        </li>
                        <li>
                          <a href="profile-details.html">Profile details</a>
                        </li>
                        <li>
                          <a href="wedding.html">Wedding</a>
                        </li>
                        <li>
                          <a href="blog.html">Blog</a>
                        </li>
                        <li>
                          <a href="blog-detail.html">Blog detail</a>
                        </li>
                        <li>
                          <a href="about.html">About</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact</a>
                        </li>
                        <li>
                          <a href="photo-gallery.html">Photo gallery</a>
                        </li>
                        <li>
                          <a href="photo-gallery-1.html">Photo gallery 1</a>
                        </li>
                        <li>
                          <a href="#!" onClick={openLoginPopup}>Login</a>
                        </li>
                        <li>
                          <a href="/user/user-sign-up">Sign-up</a>
                        </li>
                        <li>
                          <a href="plans.html">Pricing plans</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a href="plans.html">Plans</a>
                  </li>
                  <li>
                    <a href="#!" className="desk-menu" onClick={openLoginPopup}>Login</a>
                  </li>
                  <li>
                    <a href="/user/user-sign-up">Register</a>
                  </li>
                  <li className="smenu-pare">
                    <span className="smenu">Dashboard</span>
                    <div className="smenu-open smenu-single">
                      <ul>
                        <li>
                          <a href="user-dashboard.html">Dashboard</a>
                        </li>
                        <li>
                          <a href="user-profile.html">My profile</a>
                        </li>
                        <li>
                          <a href="user-interests.html">Interests</a>
                        </li>
                        <li>
                          <a href="user-chat.html">Chat lists</a>
                        </li>
                        <li>
                          <a href="user-plan.html">My plan details</a>
                        </li>
                        <li>
                          <a href="user-setting.html">Profile settings</a>
                        </li>
                        <li>
                          <a href="user-profile-edit.html">Edit full profile</a>
                        </li>
                        <li>
                          <a href="#!" onClick={openLoginPopup}>Sign in</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              {/* USER PROFILE */}
              <div className="al">
                <div className="head-pro">
                  <img src={profile1} alt="" loading="lazy" />
                  <b>Advisor</b>
                  <br />
                  <h4>Ashley emyy</h4>
                  <span className="fclick" />
                </div>
              </div>
              {/*MOBILE MENU*/}
              <div className="mob-menu">
                <div className="mob-me-ic">
                  <span className="ser-open mobile-ser">
                    <img src={iconSearch} alt="" />
                  </span>
                  <span className="mobile-exprt" data-mob="dashbord">
                    <img src={iconUsers} alt="" />
                  </span>
                  <span className="mobile-menu" data-mob="mobile">
                    <img src={iconMenu} alt="" />
                  </span>
                </div>
              </div>
              {/*END MOBILE MENU*/}
            </div>
          </div>
        </div>
      </div>
      {/* END */}
      {/* EXPLORE MENU POPUP */}
      <div className="mob-me-all mobile_menu">
        <div className="mob-me-clo" onClick={closePopup} style={{ cursor: 'pointer' }}>
          <img src={iconClose} alt="" />
        </div>
        <div className="mv-bus">
          <h4>
            <i className="fa fa-globe" aria-hidden="true" /> EXPLORE CATEGORY
          </h4>
          <ul>
            <li>
              <a href="all-profiles.html">Browse profiles</a>
            </li>
            <li>
              <a href="wedding.html">Wedding page</a>
            </li>
            <li>
              <a href="services.html">All Services</a>
            </li>
            <li>
              <a href="plans.html">Join Now</a>
            </li>
          </ul>
          <h4>
            <i className="fa fa-align-center" aria-hidden="true" /> All Pages
          </h4>
          <ul>
            <li>
              <a href="all-profiles.html">All profiles</a>
            </li>
            <li>
              <a href="profile-details.html">Profile details</a>
            </li>
            <li>
              <a href="wedding.html">Wedding</a>
            </li>
            <li>
              <a href="wedding-video.html">Wedding video</a>
            </li>
            <li>
              <a href="services.html">Our Services</a>
            </li>
            <li>
              <a href="plans.html">Pricing plans</a>
            </li>
            <li>
              <a href="#!" onClick={openLoginPopup}>Login</a>
            </li>
            <li>
              <a href="/user/user-sign-up">Sign-up</a>
            </li>
            <li>
              <a href="photo-gallery.html">Photo gallery</a>
            </li>
            <li>
              <a href="photo-gallery-1.html">Photo gallery 1</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="blog.html">Blog</a>
            </li>
            <li>
              <a href="blog-detail.html">Blog detail</a>
            </li>
            <li>
              <a href="enquiry.html">Ask your doubts</a>
            </li>
            <li>
              <a href="make-reservation.html">Make Reservation</a>
            </li>
            <li>
              <a href="faq.html">FAQ</a>
            </li>
            <li>
              <a href="coming-soon.html" target="_blank">
                Coming soon
              </a>
            </li>
            <li>
              <a href="404.html">404</a>
            </li>
          </ul>
          <div className="menu-pop-help">
            <h4>Support Team</h4>
            <div className="user-pro">
              <img src={profile1} alt="" loading="lazy" />
            </div>
            <div className="user-bio">
              <h5>Ashley emyy</h5>
              <span>Senior personal advisor</span>
              <a href="enquiry.html" className="btn btn-primary btn-sm">
                Ask your doubts
              </a>
            </div>
          </div>
          <div className="menu-pop-soci">
            <ul>
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
                  <i className="fa fa-youtube-play" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#!">
                  <i className="fa fa-instagram" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
          <div className="late-news">
            <h4>Latest news</h4>
            <ul>
              <li>
                <div className="rel-pro-img">
                  <img src={couple1} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
              <li>
                <div className="rel-pro-img">
                  <img src={couple3} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
              <li>
                <div className="rel-pro-img">
                  <img src={couple4} alt="" loading="lazy" />
                </div>
                <div className="rel-pro-con">
                  <h5>Long established fact that a reader distracted</h5>
                  <span className="ic-date">12 Dec 2023</span>
                </div>
                <a href="blog-detail.html" className="fclick" />
              </li>
            </ul>
          </div>
          <div className="prof-rhs-help">
            <div className="inn">
              <h3>Tell us your Needs</h3>
              <p>Tell us what kind of service you are looking for.</p>
              <a href="enquiry.html">Register for free</a>
            </div>
          </div>
        </div>
      </div>
      {/* END MOBILE MENU POPUP */}
      {/* MOBILE USER PROFILE MENU POPUP */}
      <div className="mob-me-all dashbord_menu">
        <div className="mob-me-clo" onClick={closePopup} style={{ cursor: 'pointer' }}>
          <img src={iconClose} alt="" />
        </div>
        <div className="mv-bus">
          <div className="head-pro">
            <img src={profile1} alt="" loading="lazy" />
            <b>user profile</b>
            <br />
            <h4>Ashley emyy</h4>
          </div>
          <ul>
            <li>
              <a href="#!" onClick={openLoginPopup}>Login</a>
            </li>
            <li>
              <a href="/user/user-sign-up">Sign-up</a>
            </li>
            <li>
              <a href="plans.html">Pricing plans</a>
            </li>
            <li>
              <a href="all-profiles.html">Browse profiles</a>
            </li>
          </ul>
        </div>
      </div>
      {/* END USER PROFILE MENU POPUP */}
      <style>{`
  /* ALL MENU TEXT → BLACK */
  .hom-nav ul li a,
  .smenu,
  .menu-box h5,
  .menu-box span,
  .multi-col h4,
  .multi-col ul li a,
  .smenu-single ul li a,
  .menu-pop-info li a,
  .menu-pop-help h4,
  .menu-pop-help h5,
  .menu-pop-help span,
  .late-news h4,
  .late-news h5,
  .late-news span,
  .mv-bus h4,
  .mv-bus ul li a,
  .prof-rhs-help h3,
  .prof-rhs-help p,
  .prof-rhs-help a {
    color: #000000 !important;
  }

  /* MENU LABELS (Explore, All pages...) */
  .smenu {
    color: #000000 !important;
  }

  /* BUTTON LINKS (optional keep black text) */
  .btn,
  .cta-3,
  .cta-4 {
    color: #000000 !important;
  }
  /* LOGIN POPUP CUSTOM STYLES */
  .login-pop-header h3 { font-size: 26px; font-weight: 700; margin-bottom: 10px; }
  .login-pop-header h3 span { color: #7c3aed; }
  .login-pop-header p { color: #666; font-size: 14px; margin-bottom: 30px; }
  .login-btn-sidebar { background: #7c3aed; color: #fff; border: none; padding: 12px; border-radius: 8px; font-weight: 700; font-size: 16px; transition: 0.3s; }
  .login-btn-sidebar:hover { background: #6d28d9; transform: translateY(-2px); }
  .form-control { border-radius: 8px; border: 1px solid #ddd; padding: 12px; }
  .form-control:focus { box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.2); border-color: #7c3aed; }
  .login-pop-footer p { margin-bottom: 10px; font-weight: 600; }
`}</style>
    </>
  );
}
