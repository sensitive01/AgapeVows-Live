import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import edProfiologo from "../../../public/images/logo2.png"



const AboutPage = () => {
  return (
    <div className="main-wrapper">
      
      {/* Sub Visual Block */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox pb-0">
                <h1 className="text-primary mb-0">About EdProfio</h1>
                <p>Connect educators with teaching opportunities across various institutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* About Section */}
        <section className="section section-about section-theme-1 pt-35 pt-md-50 pt-lg-70 pt-xl-100 pt-xxl-120 pb-35 pb-md-50 pb-lg-70 pb-xl-100 pb-xxl-120">
          <div className="container">
            <div className="row" style={{padding: "0px 100px"}}>
              <div className="col-12 col-lg-7 mb-35 mb-lg-0">
                <div className="textbox">
                  <img src={edProfiologo} width="30%" alt="EdProfio Logo" />
                  <h2 className="text-secondary mb-0">Welcome to EdProfio</h2>
                  <p className="fw-bold text-dark">A Platform for Educators at Every Level</p>
                  <hr className="mb-20" />
                  <p style={{textAlign: "justify"}}>
                    Welcome to EdProfio, a dedicated recruitment platform built exclusively for the education industry. 
                    We empower schools, colleges, universities, and EdTech organizations with seamless hiring solutions designed for growth. 
                    Whether you are an institution seeking qualified professionals or an educator pursuing the right career opportunity, 
                    EdProfio ensures a smooth, transparent, and efficient process from start to finish.
                  </p>
                  <p style={{textAlign: "justify"}}>
                    We focus on creating meaningful connections — linking opportunity with expertise — so that the right people find the right environment to inspire, innovate, and succeed.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-5">
                <div className="about-image shadow border border-dark">
                  <img src="/images/img-about-01.jpg" width="560" height="570" alt="Intro" />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-12 col-lg-12 mt-60">
                <Tabs defaultActiveKey="why-choose" id="about-tabs" className="nav-tabs-line">
                  <Tab eventKey="why-choose" title="Why Choose EdProfio?" className="border border-dark shadow p-20" style={{borderRadius: "10px"}}>
                    <p style={{textAlign: "justify"}}>
                      Educational hiring requires skill, understanding, and precision — and that's exactly what we excel at. Our platform provides:
                    </p>
                    <ul style={{listStyleType: "none", paddingLeft: "0"}}>
                      <li style={{marginBottom: "10px"}}>
                        <span style={{color: "#28a745", fontSize: "18px", marginRight: "10px"}}>✔</span>
                        <strong>Smart talent discovery</strong> through verified profiles
                      </li>
                      <li style={{marginBottom: "10px"}}>
                        <span style={{color: "#28a745", fontSize: "18px", marginRight: "10px"}}>✔</span>
                        <strong>Streamlined hiring workflows</strong> tailored for educators
                      </li>
                      <li style={{marginBottom: "10px"}}>
                        <span style={{color: "#28a745", fontSize: "18px", marginRight: "10px"}}>✔</span>
                        <strong>Accurate candidate-institution fit</strong> based on competencies & goals
                      </li>
                    </ul>
                    <p style={{textAlign: "justify", marginTop: "15px"}}>
                      For professionals, EdProfio opens access to opportunities across teaching, administration, leadership, research, and EdTech — supporting long-term career growth and development.
                    </p>
                    <p style={{textAlign: "justify", fontWeight: "600", marginTop: "15px"}}>
                      We don't just fill positions. <br/>
                      We build stronger, future-ready institutions.
                    </p>
                  </Tab>
                  <Tab eventKey="benefit" title="Who Can Benefit from EdProfio?" className="border border-dark shadow p-20" style={{borderRadius: "10px"}}>
                    <p style={{textAlign: "justify"}}>
                      EdProfio is built for the entire education ecosystem, including:
                    </p>
                    <ul style={{marginTop: "15px", lineHeight: "1.8"}}>
                      <li><strong>Teachers</strong> | Administrative Staff | Academic Leaders</li>
                      <li><strong>Counselors</strong> | Coordinators | Librarians</li>
                      <li><strong>Researchers</strong> & Academic Support Roles</li>
                      <li><strong>EdTech</strong> & Training Professionals</li>
                      <li><strong>Schools, Universities, Coaching Centres</strong> & EdTech Firms</li>
                    </ul>
                    <p style={{textAlign: "justify", marginTop: "15px"}}>
                      We connect the right talent to the right opportunities — driving success for individuals and institutions alike.
                    </p>
                  </Tab>
                  <Tab eventKey="mission" title="Our Mission" className="border border-dark shadow p-20" style={{borderRadius: "10px"}}>
                    <p style={{textAlign: "justify"}}>
                      To advance the education sector by transforming the way talent is discovered, assessed, and hired. 
                      Through intelligent tools, reliable processes, and people-first solutions, EdProfio strives to make recruitment simpler, faster, and more impactful for everyone involved.
                    </p>
                    <p style={{textAlign: "justify", fontWeight: "600", marginTop: "20px"}}>
                      Together, we shape careers. <br/>
                      Together, we strengthen education.
                    </p>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="section section-theme-1 section-leadership bg-light-sky pt-45 pt-md-50 pt-lg-65 pt-xl-85 pt-xxl-110 pb-30 pb-md-50 pb-xl-60" style={{backgroundImage: "url('/images/bg-leaders.jpg')"}}>
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-45 mb-xl-60">
              <h2 className="text-secondary mb-0">Our Team</h2>
              <p>The Strong Team Members behind every milestones</p>
              <hr />
            </header>
            
            <div className="row">
              {teamMembers.map((member, index) => (
                <div key={index} className="col-12 col-md-4 mb-15 mb-md-30 mb-xl-80">
                  <div className="leadership-box shadow border border-dark">
                    <div className="image-holder shadow border border-dark">
                      <img src={`/images/${member.image}`} width="260" height="260" alt={member.name} />
                    </div>
                    <div className="textbox">
                      <h3 className="h4 mt-0 mb-0 text-secondary">{member.name}</h3>
                      <span className="subtitle">{member.position}</span>
                      <hr />
                      <span className="number mb-10">
                        <i className="icon-phone"></i> <a href={`tel:${member.phone}`}>{member.phone}</a>
                      </span>
                      <ul className="social-networks d-flex flex-wrap">
                        {member.social.map((social, i) => (
                          <li key={i}><a href="#"><i className={`icon-${social}`}></i></a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section section-theme-6 learning-block bg-light-sky pt-30 pt-md-50 pt-lg-75 pt-xxl-120 pb-10 pb-md-50 pb-lg-40 pb-xxl-60 bg-white">
          <div className="container" style={{padding: "0px 100px"}}>
            <div className="row mb-10 mb-lg-60">
              <div className="col-12 col-md-8">
                <h2 className="text-secondary mb-0">People Love To Share Feedback</h2>
                <p>The most comprehensive search engine for jobs.</p>
              </div>
              <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-start">
                <a href="#" className="reviews-link">
                  <div className="ratings-info bg-primary text-white">
                    <i className="icon-star"></i>
                    <span>4.9</span>
                  </div>
                  <span className="txt">494 Reviews</span>
                </a>
              </div>
              <hr />
            </div>
            
            <div className="row mb-30 mb-md-50 mb-lg-80">
              <div className="col-12 learning-sliders">
                <div className="thumbs-list">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="thumbnail">
                      <img src={`/images/${testimonial.image}`} alt={testimonial.name} />
                    </div>
                  ))}
                </div>
                
                <div className="text-info-slider">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="slick-box">
                      <blockquote className="text-info-frm">
                        <h3 className="text-secondary">{testimonial.title}</h3>
                        <p style={{textAlign: "justify"}}>{testimonial.quote}</p>
                        <cite className="d-flex align-items-center">
                          <strong className="title">{testimonial.name}</strong>
                          <span className="designation">- {testimonial.position}</span>
                        </cite>
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <hr />
            
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <ul className="list-inline logos-list">
                  {logos.map((logo, index) => (
                    <li key={index} className="list-inline-item">
                      <img src={`/images/${logo}`} alt="partner logo" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="section section-theme-1 bg-light section-downloads pt-20 pt-md-35 pt-lg-50 pb-50 pb-md-75 pb-lg-75 pb-xl-110 pb-xxl-140">
          <br /><br />
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-40 mb-lg-50">
              <h2 className="text-secondary">Download our mobile app</h2>
              <br /><hr /><br />
              <p>Search through millions of jobs and find the right fit.<br /> Simply swipe right to apply.</p>
            </header>
            
            <div className="app-buttons">
              <a className="btn-app btn-play-store" href="#">
                <div className="store-icon">
                  <img src="/images/icon-play-store.png" width="28" height="30" alt="Google Play" />
                </div>
                <div className="btn-text">
                  Download From <span>Google Play</span>
                </div>
              </a>
              <a className="btn-app btn-app-store" href="#">
                <div className="store-icon">
                  <img src="/images/icon-app-store.png" width="32" height="38" alt="App Store" />
                </div>
                <div className="btn-text">
                  Download From <span>App Store</span>
                </div>
              </a>
            </div>
            
            <div className="icon ico01"><img src="/images/ico-app01.png" alt="Decoration" /></div>
            <div className="icon ico02"><img src="/images/ico-app02.png" alt="Decoration" /></div>
            <div className="icon ico03"><img src="/images/ico-app03.png" alt="Decoration" /></div>
            <div className="icon ico04"><img src="/images/ico-app04.png" alt="Decoration" /></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section section-about section-theme-1 pb-35 pb-md-50 pb-lg-70 pb-xl-100 pb-xxl-120" style={{borderBottom: "1px solid #fff"}}>
          <div className="container">
            <div className="row">
              <div className="counters-block d-flex flex-wrap justify-content-between mt-md-25 mt-xl-50 pt-35 pt-md-50 pt-lg-60 mb-0 pb-0">
                {stats.map((stat, index) => (
                  <div key={index} className="counter-box bg-light-sky border border-dark shadow">
                    <div className="counter-stats">
                      <strong className="numbers h2">
                        <span className="purecounter">{stat.value}</span>
                        {stat.unit}
                      </strong>
                      <span className="subtext">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

// Data for dynamic content
const teamMembers = [
  {
    name: "Julian Wan",
    position: "Head of Marketing",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader01.jpg",
    social: ["facebook", "linkedin", "twitter"]
  },
  {
    name: "Thomas",
    position: "UX / UI Designer",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader02.jpg",
    social: ["facebook", "linkedin", "twitter"]
  },
  {
    name: "Goli Povali",
    position: "Co-Founder",
    phone: "+44 (0)20 7942 2000",
    image: "img-leader03.jpg",
    social: ["facebook", "linkedin", "twitter"]
  }
];

const testimonials = [
  {
    title: "Great Quality!",
    quote: "Vestibulum orci felis, ullamcorper non conu m non, ultrices ac nunc. Mauris non ligscipit, vulpu tate mi accumsan, dapibus fe lam sed sapien duiem non porta.",
    name: "Courtney Henry",
    position: "Web Designer",
    image: "people-img-01.jpg"
  },
  // Add other testimonials here...
];

const logos = [
  "com-logo01.png",
  "com-logo02.png",
  "com-logo03.png",
  "com-logo04.png",
  "com-logo05.png"
];

const stats = [
  { value: "100", unit: "%", label: "Success Rate" },
  { value: "5", unit: ".0", label: "Average rating" },
  { value: "44", unit: "K", label: "Total Candidates" },
  { value: "12", unit: "+", label: "Award in School Recruitment Category" }
];

export default AboutPage;