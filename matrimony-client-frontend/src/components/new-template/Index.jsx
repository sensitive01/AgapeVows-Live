// Import CSS files
import '../../assets/new-template/css/animate.min.css';
import '../../assets/new-template/css/bootstrap.css';
import '../../assets/new-template/css/font-awesome.min.css';
import '../../assets/new-template/css/jquery-ui.css';
import '../../assets/new-template/css/style.css';

// Import image files
import heroImage from '../../assets/new-template/hero.png';
import reactLogo from '../../assets/new-template/react.svg';
import viteLogo from '../../assets/new-template/vite.svg';

// Import loader images
import loader1 from '../../assets/new-template/images/loder/1.png';
import loader2 from '../../assets/new-template/images/loder/2.png';
import loader3 from '../../assets/new-template/images/loder/3.png';

// Import logo
import logoBImg from '../../assets/new-template/images/logo-b.png';

// Import profile images
import profile1 from '../../assets/new-template/images/profiles/1.jpg';

// Import couple images
import couple1 from '../../assets/new-template/images/couples/1.jpg';
import couple3 from '../../assets/new-template/images/couples/3.jpg';
import couple4 from '../../assets/new-template/images/couples/4.jpg';

// Import icon images
import iconSearch from '../../assets/new-template/images/icon/search.svg';
import iconUsers from '../../assets/new-template/images/icon/users.svg';
import iconMenu from '../../assets/new-template/images/icon/menu.svg';
import iconClose from '../../assets/new-template/images/icon/close.svg';
import iconUser from '../../assets/new-template/images/icon/user.png';

// Import banner images
import bannerBg from '../../assets/new-template/images/ban-bg.jpg';
import bannerImg from '../../assets/new-template/images/banner.jpg';

// Import additional icon images
import iconGate from '../../assets/new-template/images/icon/gate.png';
import iconCouple from '../../assets/new-template/images/icon/couple.png';
import iconHall from '../../assets/new-template/images/icon/hall.png';
import iconPhotoCamera from '../../assets/new-template/images/icon/photo-camera.png';
import iconCake from '../../assets/new-template/images/icon/cake.png';
import iconPrize from '../../assets/new-template/images/icon/prize.png';
import iconTrust from '../../assets/new-template/images/icon/trust.png';
import iconRings from '../../assets/new-template/images/icon/rings.png';
import iconWedding2 from '../../assets/new-template/images/icon/wedding-2.png';
import iconLoveBirds from '../../assets/new-template/images/icon/love-birds.png';
import iconNetwork from '../../assets/new-template/images/icon/network.png';
import iconChat from '../../assets/new-template/images/icon/chat.png';
import iconWeddingCouple from '../../assets/new-template/images/icon/wedding-couple.png';

// Import user images
import user1 from '../../assets/new-template/images/user/1.jpg';
import user2 from '../../assets/new-template/images/user/2.jpg';
import user3 from '../../assets/new-template/images/user/3.jpg';
import user5 from '../../assets/new-template/images/user/5.jpg';

// Import additional couple images
import couple5 from '../../assets/new-template/images/couples/5.jpg';
import couple6 from '../../assets/new-template/images/couples/6.jpg';
import couple7 from '../../assets/new-template/images/couples/7.jpg';
import couple8 from '../../assets/new-template/images/couples/8.jpg';
import couple9 from '../../assets/new-template/images/couples/9.jpg';
import couple10 from '../../assets/new-template/images/couples/10.jpg';
import couple11 from '../../assets/new-template/images/couples/11.jpg';
import couple20 from '../../assets/new-template/images/couples/20.jpg';

// Import additional profile images
import profile6 from '../../assets/new-template/images/profiles/6.jpg';
import profile7 from '../../assets/new-template/images/profiles/7.jpg';
import profile8 from '../../assets/new-template/images/profiles/8.jpg';
import profile9 from '../../assets/new-template/images/profiles/9.jpg';

// Import gallery images
import gallery1 from '../../assets/new-template/images/gallery/1.jpg';
import gallery3 from '../../assets/new-template/images/gallery/3.jpg';
import gallery4 from '../../assets/new-template/images/gallery/4.jpg';
import gallery5 from '../../assets/new-template/images/gallery/5.jpg';
import gallery6 from '../../assets/new-template/images/gallery/6.jpg';
import gallery7 from '../../assets/new-template/images/gallery/7.jpg';
import gallery8 from '../../assets/new-template/images/gallery/8.jpg';
import gallery9 from '../../assets/new-template/images/gallery/9.jpg';

// Import blog images
import blog1 from '../../assets/new-template/images/blog/1.jpg';
import blog2 from '../../assets/new-template/images/blog/2.jpg';
import blog3 from '../../assets/new-template/images/blog/3.jpg';

// Import social images
import social1 from '../../assets/new-template/images/social/1.png';
import social2 from '../../assets/new-template/images/social/2.png';
import social3 from '../../assets/new-template/images/social/3.png';
import social5 from '../../assets/new-template/images/social/5.png';

// Import about images
import about1 from '../../assets/new-template/images/about/1.jpg';
import SidebarLoginComponent from './SidebarLoginComponent';

export default function Index() {
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
      {/* PRELOADER */}
      <div id="preloader">
        <div className="plod">
          <span className="lod1">
            <img src={loader1} alt="" loading="lazy" />
          </span>
          <span className="lod2">
            <img src={loader2} alt="" loading="lazy" />
          </span>
          <span className="lod3">
            <img src={loader3} alt="" loading="lazy" />
          </span>
        </div>
      </div>
      <div className="pop-bg" />
      {/* END PRELOADER */}
  {/* POPUP SEARCH */}
  <div className="pop-search">
    <span className="ser-clo">+</span>
    <div className="inn">
      <form>
        <input type="text" placeholder="Search here..." />
      </form>
      <div className="rel-sear">
        <h4>Top searches:</h4>
        <a href="all-profiles.html">Browse all profiles</a>
        <a href="all-profiles.html">Mens profile</a>
        <a href="all-profiles.html">Female profile</a>
        <a href="all-profiles.html">New profiles</a>
      </div>
    </div>
  </div>
  {/* END */}
  {/* TOP MENU */}
  <div className="head-top">
    <div className="container">
      <div className="row">
        <div className="lhs">
          <ul>
            <li>
              <a href="#!" className="ser-open">
                <i className="fa fa-search" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="about.html">About</a>
            </li>
            <li>
              <a href="faq.html">FAQ</a>
            </li>
            <li>
              <a href="contact.html">Contact</a>
            </li>
          </ul>
        </div>
        <div className="rhs">
          <ul>
            <li>
              <a href="tel:+9704462944">
                <i className="fa fa-phone" aria-hidden="true" />
                &nbsp;+01 5312 5312
              </a>
            </li>
            <li>
              <a href="mailto:info@example.com">
                <i className="fa fa-envelope-o" aria-hidden="true" />
                &nbsp; help@company.com
              </a>
            </li>
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
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* END */}
  {/* MENU POPUP */}
  <SidebarLoginComponent closePopup={closePopup} />
  {/* END */}
  {/* CONTACT EXPERT */}
  <div className="menu-pop menu-pop2">
    <span className="menu-pop-clo">
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
      {/* HELP BOX */}
      <div className="prof-rhs-help">
        <div className="inn">
          <h3>Tell us your Needs</h3>
          <p>Tell us what kind of service you are looking for.</p>
          <a href="enquiry.html">Register for free</a>
        </div>
      </div>
      {/* END HELP BOX */}
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
            <span className="menu desk-menu">
              <i />
              <i />
              <i />
            </span>
            <a href="/" className="logo-brand">
              <img
                src={logoBImg}
                alt=""
                loading="lazy"
                className="ic-logo"
              />
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
    <div className="mob-me-clo">
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
    <div className="mob-me-clo">
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
  {/* BANNER & SEARCH */}
  <section>
    <div className="str">
      <div className="hom-head">
        <div className="container">
          <div className="row">
            <div className="hom-ban">
              <div className="ban-tit">
                <span>
                  <i className="no1">#1</i> Matrimony
                </span>
                <h1>
                  Find your
                  <br />
                  <b>Right Match</b> here
                </h1>
                <p>Most trusted Matrimony Brand in the World.</p>
              </div>
              <div className="ban-search chosenini">
                <form>
                  <ul>
                    <li className="sr-look">
                      <div className="form-group">
                        <label>I'm looking for</label>
                        <select className="chosen-select">
                          <option value="">I'm looking for</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-age">
                      <div className="form-group">
                        <label>Age</label>
                        <select className="chosen-select">
                          <option value="">Age</option>
                          <option value="">18 to 30</option>
                          <option value="">31 to 40</option>
                          <option value="">41 to 50</option>
                          <option value="">51 to 60</option>
                          <option value="">61 to 70</option>
                          <option value="">71 to 80</option>
                          <option value="">81 to 90</option>
                          <option value="">91 to 100</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-reli">
                      <div className="form-group">
                        <label>Religion</label>
                        <select className="chosen-select">
                          <option>Religion</option>
                          <option>Any</option>
                          <option>Hindu</option>
                          <option>Muslim</option>
                          <option>Jain</option>
                          <option>Christian</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-cit">
                      <div className="form-group">
                        <label>City</label>
                        <select className="chosen-select">
                          <option>Location</option>
                          <option>Any location</option>
                          <option>Chennai</option>
                          <option>New york</option>
                          <option>Perth</option>
                          <option>London</option>
                        </select>
                      </div>
                    </li>
                    <li className="sr-btn">
                      <input type="submit" defaultValue="Search" />
                    </li>
                  </ul>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* BANNER SLIDER */}
  <section>
    <div className="hom-ban-sli">
      <div>
        <ul className="ban-sli">
          <li>
            <div className="image">
              <img src={bannerBg} alt="" loading="lazy" />
            </div>
          </li>
          <li>
            <div className="image">
              <img src={bannerImg} alt="" loading="lazy" />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
  {/* END */}
  {/* QUICK ACCESS */}
  <section>
    <div className="str home-acces-main">
      <div className="container">
        <div className="row">
          {/* BACKGROUND SHAPE */}
          <div className="wedd-shap">
            <span className="abo-shap-1" />
            <span className="abo-shap-4" />
          </div>
          {/* END BACKGROUND SHAPE */}
          <div className="home-tit">
            <p>Quick Access</p>
            <h2>
              <span>Our Services</span>
            </h2>
            <span className="leaf1" />
            <span className="tit-ani-" />
          </div>
          <div className="home-acces">
            <ul className="hom-qui-acc-sli">
              <li>
                <div className="wow fadeInUp hacc hacc1" data-wow-delay="0.1s">
                  <div className="con">
                    <img src={iconUser} alt="" loading="lazy" />
                    <h4>Browse Profiles</h4>
                    <p>1200+ Profiles</p>
                    <a href="all-profiles.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc2" data-wow-delay="0.2s">
                  <div className="con">
                    <img src={iconGate} alt="" loading="lazy" />
                    <h4>Wedding</h4>
                    <p>1200+ Profiles</p>
                    <a href="wedding-video.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc3" data-wow-delay="0.3s">
                  <div className="con">
                    <img src={iconCouple} alt="" loading="lazy" />
                    <h4>All Services</h4>
                    <p>1200+ Profiles</p>
                    <a href="services.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc4" data-wow-delay="0.4s">
                  <div className="con">
                    <img src={iconHall} alt="" loading="lazy" />
                    <h4>Join Now</h4>
                    <p>Start for free</p>
                    <a href="plans.html">Get started</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc3" data-wow-delay="0.3s">
                  <div className="con">
                    <img
                      src={iconPhotoCamera}
                      alt=""
                      loading="lazy"
                    />
                    <h4>Photo gallery</h4>
                    <p>1200+ Profiles</p>
                    <a href="photo-gallery.html">View more</a>
                  </div>
                </div>
              </li>
              <li>
                <div className="wow fadeInUp hacc hacc4" data-wow-delay="0.4s">
                  <div className="con">
                    <img src={iconCake} alt="" loading="lazy" />
                    <h4>Blog &amp; Articles</h4>
                    <p>Start for free</p>
                    <a href="blog.html">Get started</a>
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
  {/* TRUST BRANDS */}
  <section>
    <div className="hom-cus-revi">
      <div className="container">
        <div className="row">
          <div className="home-tit">
            <p>trusted brand</p>
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
                    <img src={user1} alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </p>
                  <h5>Jack danial</h5>
                  <span>New york</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src={user2} alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </p>
                  <h5>Jack danial</h5>
                  <span>New york</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src={user3} alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </p>
                  <h5>Jack danial</h5>
                  <span>New york</span>
                </div>
              </li>
              <li>
                <div className="cus-revi-box">
                  <div className="revi-im">
                    <img src={user5} alt="" loading="lazy" />
                    <i className="cir-com cir-1" />
                    <i className="cir-com cir-2" />
                    <i className="cir-com cir-3" />
                  </div>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s,{" "}
                  </p>
                  <h5>Jack danial</h5>
                  <span>New york</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="cta-full-wid">
            <a href="#!" className="cta-dark">
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
                <h2>Why choose us</h2>
                <p>Most Trusted and premium Matrimony Service in the World.</p>
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
                <img src={iconPrize} alt="" loading="lazy" />
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
                <img src={iconTrust} alt="" loading="lazy" />
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
                <img src={iconRings} alt="" loading="lazy" />
                <h4>2000+ weddings</h4>
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
                src={about1}
                alt=""
                loading="lazy"
                className="ab-wel-1"
              />
              <img
                src={couple20}
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
                  Best wedding matrimony It is a long established fact that a
                  reader will be distracted by the readable content of a page
                  when looking at its layout.{" "}
                </p>
                <p>
                  {" "}
                  <a href="plans.html">Click here to</a> Start you matrimony
                  service now.
                </p>
              </div>
              <div className="ab-wel-tit-1">
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which don't look
                  even slightly believable.
                </p>
              </div>
              <div className="ab-wel-tit-2">
                <ul>
                  <li>
                    <div>
                      <i className="fa fa-phone" aria-hidden="true" />
                      <h4>
                        Enquiry <em>+01 2242 3366</em>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div>
                      <i className="fa fa-envelope-o" aria-hidden="true" />
                      <h4>
                        Get Support <em>info@example.com</em>
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
            <p>Moments</p>
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
                    <img src={iconRings} alt="" loading="lazy" />
                  </div>
                  <div
                    className="tline-con animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>Register</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
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
                    <h5>Find your Match</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img
                      src={iconWedding2}
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
                      src={iconLoveBirds}
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
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
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
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img src={iconNetwork} alt="" loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <div className="tline-inn">
                  <div
                    className="tline-im animate animate__animated animate__slower"
                    data-ani="animate__fadeInUp"
                  >
                    <img src={iconChat} alt="" loading="lazy" />
                  </div>
                  <div
                    className="tline-con animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <h5>Start Meetups</h5>
                    <span>Timing: 7:00 PM</span>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
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
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever.
                    </p>
                  </div>
                  <div
                    className="tline-im animate animate__animated animate__slow"
                    data-ani="animate__fadeInUp"
                  >
                    <img
                      src={iconWeddingCouple}
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
            <p>trusted brand</p>
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
              <img src={couple6} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple7} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple8} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple9} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple10} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple3} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple4} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding-video.html" className="sml-cta cta-dark">
                  View more
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="hom-coup-box">
              <span className="leaf" />
              <img src={couple5} alt="" loading="lazy" />
              <div className="bx">
                <h4>
                  Dany &amp; July <span>New York</span>
                </h4>
                <a href="wedding.html" className="sml-cta cta-dark">
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
            <p>OUR PROFESSIONALS</p>
            <h2>
              <span>Meet Our Team</span>
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
  {/* END */}
  {/* GALLERY START */}
  <section>
    <div className="wedd-gall home-wedd-gall">
      <div className="">
        <div className="gall-inn">
          <div className="home-tit">
            <p>collections</p>
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
                src={gallery1}
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
                src={gallery9}
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
                src={gallery3}
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
                src={gallery4}
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
                src={gallery5}
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
                src={gallery6}
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
                src={gallery7}
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
                src={gallery8}
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
                src={couple9}
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
                src={couple11}
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
            <p>Blog posts</p>
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
                  <img src={blog1} alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Wedding arrangements</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
                    <span>Read more</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="blog-box">
                  <img src={blog2} alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Wedding arrangements</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
                    <span>Read more</span>
                  </a>
                </div>
              </li>
              <li>
                <div className="blog-box">
                  <img src={blog3} alt="" loading="lazy" />
                  <span>Wedding - Johnny</span>
                  <h2>Invitation cards</h2>
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content.
                  </p>
                  <a href="blog-details.html" className="cta-dark">
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
              <h2>Find your perfect Match now</h2>
              <p>
                lacinia viverra lectus. Fusce imperdiet ullamcorper metus eu
                fringilla.Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.
              </p>
              <a href="/user/user-sign-up" className="cta-3">
                Register Now
              </a>
              <a href="/user/user-sign-up" className="cta-4">
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
              <a href="about-us.html">About company</a>
            </li>
            <li>
              <a href="#!">Contact us</a>
            </li>
            <li>
              <a href="#!">Feedback</a>
            </li>
            <li>
              <a href="about-us.html#faq">FAQs</a>
            </li>
            <li>
              <a href="about-us.html#testimonials">Testimonials</a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 fot-soc">
          <h4>SOCIAL MEDIA</h4>
          <ul>
            <li>
              <a href="#!">
                <img src={social1} alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="#!">
                <img src={social2} alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="#!">
                <img src={social3} alt="" loading="lazy" />
              </a>
            </li>
            <li>
              <a href="#!">
                <img src={social5} alt="" loading="lazy" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row foot-count">
        <p>
          Company name Site - Trusted by over thousands of Boys &amp; Girls for
          successfull marriage.{" "}
          <a href="/user/user-sign-up" className="btn btn-primary btn-sm">
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
            Copyright ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© <span id="cry">2023</span>{" "}
            <a href="#!" target="_blank">
              Company.com
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </section>
  {/* END */}
  {/* Optional JavaScript */}
  {/* jQuery first, then Popper.js, then Bootstrap JS */}
    </>
  );
}
