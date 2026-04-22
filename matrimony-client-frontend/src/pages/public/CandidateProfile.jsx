import React from 'react';
import { FaArrowLeft, FaPowerOff, FaShare, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';

const CandidateProfile = () => {
  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-light d-flex pt-60 pt-md-90 text-white"></div>
      
      {/* Contain Main informative part of the Site */}
      <main className="jobplugin__main bg-light">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            {/* Profile Block */}
            <div className="jobplugin__profile">
              {/* Profile Intro */}
              <div className="jobplugin__profile-intro border border-dark shadow">
                <div className="jobplugin__profile-intro__left">
                  <div className="jobplugin__profile-intro__image border-primary">
                    {/* Profile Intro Avatar */}
                    <div className="jobplugin__profile-intro__avatar">
                      <img src="images/img-profile.jpg" alt="Thomas Walkar" />
                    </div>
                    <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                      <span className="rj-icon rj-edit-text"></span>
                    </a>
                  </div>
                  {/* Profile Intro Textbox */}
                  <div className="jobplugin__profile-intro__Textbox">
                    <div className="jobplugin__profile-intro__info mb-0">
                      <h1 className="h5">Jennie Thomas</h1>
                      <span className="jobplugin__article-toprated">Top Rated</span>
                    </div>
                    <address className="jobplugin__profile-intro__address">Bengaluru, Karnataka</address>
                    {/* Profile Intro Success */}
                    <div className="jobplugin__profile-intro__success">
                      <div className="jobplugin__profile-intro__success-icon">
                        <span className="rj-icon rj-crown"></span>												
                      </div>
                      <strong className="jobplugin__profile-intro__success-text">90% Job Success</strong>
                    </div>
                  </div>
                </div>
                {/* Profile Intro Buttons */}
                <div className="jobplugin__profile-intro__right">
                  <a href="dashboard" className="jobplugin__button jobplugin__bg-white jobplugin__border-primary hover:jobplugin__bg-white small">
                    <FaArrowLeft /> &nbsp; Back to Dashboard
                  </a>
                  <a href="/" className="jobplugin__button border-dark shadow bg-primary hover:jobplugin__bg-secondary small">
                    <FaPowerOff /> &nbsp; Logout
                  </a>
                </div>
              </div>
              
              <div className="jobplugin__profile-container">
                {/* Profile Aside */}
                <aside className="jobplugin__profile-aside">
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Contact Info</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button*/}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-edit-text"></span>
                        </a>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box Links */}
                      <ul className="jobplugin__profile-box__links">
                        <li>
                          <a className="hover:jobplugin__bg-primary hover:jobplugin__text-white" href="#">
                            <span className="jobplugin__profile-box__links-text">Call / WhatsApp: (+91)-1234567890</span>
                            <span className="jobplugin__profile-box__links-icon rj-icon rj-link-arrow"></span>
                          </a>
                        </li>
                        <li>
                          <a className="hover:jobplugin__bg-primary hover:jobplugin__text-white" href="#">
                            <span className="jobplugin__profile-box__links-text">Email to : name@email.com</span>
                            <span className="jobplugin__profile-box__links-icon rj-icon rj-link-arrow"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box Stats */}
                  <div className="jobplugin__profile-box profile--stats jobplugin__bg-dark">
                    <ul>
                      <li>
                        <strong className="profile--stats__numbers">₹25L</strong>
                        <span className="profile--stats__subtitle">Annual Salary</span>
                      </li>
                      <li>
                        <strong className="profile--stats__numbers">16 Years</strong>
                        <span className="profile--stats__subtitle">Experience</span>
                      </li>
                      <li>
                        <strong className="profile--stats__numbers">36</strong>
                        <span className="profile--stats__subtitle">Age</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Skillset</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box List */}
                      <ul className="jobplugin__profile-box__list">
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">Communication Skills</span>
                            <span className="jobplugin__profile-box__list-status">Excellent</span>
                          </div>
                          <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                            <span className="rj-icon rj-edit-text"></span>
                          </a>
                        </li>
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">Computer Knowledge</span>
                            <span className="jobplugin__profile-box__list-status">Moderate</span>
                          </div>
                          <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                            <span className="rj-icon rj-edit-text"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Video Introduction</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button */}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-plus"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Hours per week</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button */}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-edit-text"></span>
                        </a>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box list */}
                      <ul className="jobplugin__profile-box__list no-bg">
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">As Needed - Open to Offers</span>
                            <p>Open to contract to hire</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Language Profeciency</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button */}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-plus"></span>
                        </a>
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-edit-text"></span>
                        </a>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box List */}
                      <ul className="jobplugin__profile-box__list">
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">English: <span className="subtext">Native or Bilingual</span></span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Verifications</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button */}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-plus"></span>
                        </a>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box List */}
                      <ul className="jobplugin__profile-box__list">
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">ID: <span className="subtext">Verified</span> <img src="images/verified-icon.svg" alt="Verified" /></span>
                            <p>Aadhar Card</p>
                          </div>
                        </li>
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">ID: <span className="subtext">Verified</span> <img src="images/verified-icon.svg" alt="Verified" /></span>
                            <p>Passport</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Education</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                      {/* Profile Box Button */}
                      <div className="jobplugin__profile-box__buttons">
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-plus"></span>
                        </a>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box List */}
                      <ul className="jobplugin__profile-box__list">
                        <li>
                          <div className="jobplugin__profile-box__list-textbox">
                            <span className="jobplugin__profile-box__list-text">Government College</span>
                            <p>Mangalore University</p>
                            <p className="text-year">2010-2014</p>
                          </div>
                          <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                            <span className="rj-icon rj-edit-text"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Social Media Profiles</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box Linked Accounts */}
                      <ul className="jobplugin__settings-card__linked-accounts">
                        <li>
                          <a className="jobplugin__border-primary jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">
                            <span className="jobplugin__settings-card__linked-accounts__name">LinkedIn</span>
                          </a>
                        </li>
                        <li>
                          <a className="jobplugin__border-primary jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">
                            <span className="jobplugin__settings-card__linked-accounts__icon rj-icon rj-facebook"></span>
                            <span className="jobplugin__settings-card__linked-accounts__name">facebook</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Profile Box */}
                  <div className="jobplugin__profile-box border border-dark shadow">
                    {/* Profile Box Head */}
                    <div className="jobplugin__profile-box__head">
                      <div className="jobplugin__profile-box__heading">
                        <h2 className="h5">Certificates</h2>
                        <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                      </div>
                    </div>
                    {/* Profile Box Body */}
                    <div className="jobplugin__profile-box__body">
                      {/* Profile Box Associated */}
                      <div className="jobplugin__profile-box__associated">
                        <div className="jobplugin__profile-box__associated-image">
                          <img src="images/img01.jpg" alt="Miraclesoftsolutions" />
                        </div>
                        <div className="jobplugin__profile-box__associated-textbox">
                          <strong className="jobplugin__profile-box__associated-text">Expert Excel</strong>
                          <span className="jobplugin__profile-box__associated-time">Miracle soft solutions</span>
                          <div className="jobplugin__profile-intro__success">
                            <div className="jobplugin__profile-intro__success-icon">
                              <span className="rj-icon rj-crown"></span>											
                            </div>
                            <strong className="jobplugin__profile-intro__success-text">90% Job Success</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>
                
                {/* Profile Content */}
                <div className="jobplugin__profile-content border border-dark shadow">
                  {/* Profile Block */}
                  <div className="jobplugin__profile-block">
                    {/* Profile Block Head */}
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Mathematics Teacher</h2>
                      <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                        <span className="rj-icon rj-edit-text"></span>
                      </a>
                    </div>
                    {/* Profile Block Body */}
                    <div className="jobplugin__profile-block__body">
                      {/* Profile Block Price */}
                      <div className="jobplugin__profile-block__price">
                        <strong className="jobplugin__profile-block__price-text">Expectations: ₹ 35L annum</strong>
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-edit-text"></span>
                        </a>
                      </div>
                      <div className="jobplugin__profile-block__textarea">
                        <div className="jobplugin__profile-block__textbox">
                          <p>If you purchase the Advanced package, then you will get free Stationery which includes a Business card, Letterhead, and envelope designs. And free Social Media Assets, FB, and youtube cover designs with logos in DP sizes.</p>
                        </div>
                        <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                          <span className="rj-icon rj-edit-text"></span>
                        </a>
                      </div>
                      {/* Profile Block Skills */}
                      <div className="jobplugin__profile-block__skills">
                        <h3 className="h5 jobplugin__text-primary">My Skills:</h3>
                        <ul>
                          <li>
                            <span className="jobplugin__profile-block__skills-icon jobplugin__text-primary rj-icon rj-check"></span>
                            <span className="jobplugin__profile-block__skills-text">Top Rated Mathematics Teacher</span>
                          </li>
                          <li>
                            <span className="jobplugin__profile-block__skills-icon jobplugin__text-primary rj-icon rj-check"></span>
                            <span className="jobplugin__profile-block__skills-text">Completed 2000+ Online / School classes •</span>
                          </li>
                          <li>
                            <span className="jobplugin__profile-block__skills-icon jobplugin__text-primary rj-icon rj-check"></span>
                            <span className="jobplugin__profile-block__skills-text">Expert in Excel</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Block */}
                  <div className="jobplugin__profile-block">
                    {/* Profile Block Head */}
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Work History</h2>
                    </div>
                    {/* Profile Block Body */}
                    <div className="jobplugin__profile-block__body">
                      {/* Profile Block Tabset */}
                      <div className="jobplugin__tabset-normal">
                        <ul data-tabset="tabset">
                          <li className="active"><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="completed-jobs.html">Fulltime jobs (4)</a></li>
                          <li><a className="hover:jobplugin__text-primary hover:jobplugin__border-primary" data-tabset="tabset-link" href="in-progress-jobs.html">Part time / Trainings (12)</a></li>
                        </ul>
                      </div>
                      <div className="jobplugin__tabsholder">
                        <div id="tab-completed-jobs" className="jobplugin__tabscontent active">
                          <div className="jobplugin__profile-history">
                            {/* Profile Block Reviews */}
                            <article className="jobplugin__profile-review">
                              <h3 className="h5">Mathematics Teacher</h3>
                              <div className="jobplugin__profile-review__info">
                                <div className="jobplugin__profile-ratings">
                                  <ul>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <li key={star} className="active">
                                        <span className="rj-icon rj-star"></span>
                                      </li>
                                    ))}
                                  </ul>
                                  <strong className="jobplugin__profile-ratings__points jobplugin__text-primary">5.0</strong>
                                </div>
                                <div className="jobplugin__profile-review__date">
                                  Dec 23, 2024 - Jan 04, 2025
                                </div>
                                <a href="#" className="jobplugin__settings-card__edit button-share jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                                  <FaShare />
                                </a>
                              </div>
                              <div className="jobplugin__profile-review__comment">
                                <p>I was more than satisfied from start to finish. As for the possible modifications, he is also very attentive, I really appreciated it. The hardest part was to choose between the different proposals because they were all really good <span className="jobplugin__profile-review__comment-full"> But, overall, it was a great experience. </span> <a className="jobplugin__profile-review__comment-more jobplugin__text-primary" href="#">.... more</a></p>
                              </div>
                              <ul className="jobplugin__profile-review__list">
                                <li>
                                  <span className="jobplugin__profile-review__list-item">₹5L / Annum</span>
                                </li>
                                <li>
                                  <span className="jobplugin__profile-review__list-item">4 Years of Experience</span>
                                </li>
                                <li>
                                  <span className="jobplugin__profile-review__list-item">Fulltime</span>
                                </li>
                              </ul>
                            </article>
                            
                            {/* Additional review articles would go here */}
                            {/* They follow the same pattern as the first one */}
                            
                          </div>
                          {/* Profile Pagination */}
                          <ul className="jobplugin__pagination">
                            <li className="disabled">
                              <a href="#">
                                <span className="rj-icon rj-arrow-right"></span>
                              </a>
                            </li>
                            <li className="active"><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li>
                              <a href="#">
                                <span className="rj-icon rj-arrow-right"></span>
                              </a>
                            </li>
                          </ul>
                        </div>
                        
                        <div id="tab-in-progress-jobs" className="jobplugin__tabscontent">
                          {/* Similar content structure for the second tab */}
                          {/* Would contain similar review articles but for part-time jobs */}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Block */}
                  <div className="jobplugin__profile-block">
                    {/* Profile Block Head */}
                    <div className="jobplugin__profile-block__header">
                      <h2 className="h4">Skills</h2>
                      <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                        <span className="rj-icon rj-edit-text"></span>
                      </a>
                    </div>
                    {/* Profile Block Body */}
                    <div className="jobplugin__profile-block__body">
                      {/* Profile Tags */}
                      <ul className="jobplugin__settings-card__tags">
                        <li><a className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">Aptitude training</a></li>
                        <li><a className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">Computer Knowledge</a></li>
                        <li><a className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">Excel</a></li>
                        <li><a className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">Admission Management</a></li>
                        <li><a className="hover:jobplugin__bg-primary hover:jobplugin__text-white hover:jobplugin__border-primary" href="#">Anchoring</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="jobplugin__profile-widgetholder">
                {/* Profile Widget */}
                <div className="jobplugin__profile-widget border border-dark">
                  {/* Profile Widget Head */}
                  <div className="jobplugin__profile-widget__head shadow">
                    <div className="jobplugin__profile-widget__head-left">
                      <h4 className="text-secondary">Testimonials</h4>
                      <p>Endorsements from past clients</p>
                    </div>
                    <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                      <FaPlus />
                    </a>
                  </div>
                  {/* Profile Widget Body */}
                  <div className="jobplugin__profile-widget__body">
                    <div className="jobplugin__profile-widget__placeholder">
                      <div className="jobplugin__profile-widget__placeholder-icon">
                        <img src="images/testimonial-icon.png" alt="Image Description" />
                      </div>
                      <p>Showcase your skills with client testimonials</p>
                      <div className="jobplugin__profile-widget__placeholder-links">
                        <a className="jobplugin__text-primary hover:jobplugin__text-secondary" href="#">Request a testimonial</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Profile Widget */}
                <div className="jobplugin__profile-widget border border-dark">
                  {/* Profile Widget Head */}
                  <div className="jobplugin__profile-widget__head shadow">
                    <div className="jobplugin__profile-widget__head-left">
                      <h4 className="text-secondary">Certifications</h4>
                    </div>
                    <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                      <FaPlus />
                    </a>
                  </div>
                  {/* Profile Widget Body */}
                  <div className="jobplugin__profile-widget__body">
                    <div className="jobplugin__profile-widget__placeholder">
                      <div className="jobplugin__profile-widget__placeholder-icon">
                        <img src="images/trophy-icon.png" alt="Image Description" />
                      </div>
                      <p>Listing your certifications can help prove your specific knowledge or abilities.</p>
                      <div className="jobplugin__profile-widget__placeholder-links">
                        <a className="jobplugin__text-primary hover:jobplugin__text-secondary" href="#">Add manually</a>
                        <a className="jobplugin__text-primary hover:jobplugin__text-secondary" href="#">Import from credly</a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Profile Widget */}
                <div className="jobplugin__profile-widget border border-dark">
                  {/* Profile Widget Head */}
                  <div className="jobplugin__profile-widget__head shadow">
                    <div className="jobplugin__profile-widget__head-left">
                      <h4 className="text-secondary">Other Experiences</h4>
                    </div>
                    <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                      <FaPlus />
                    </a>
                  </div>
                  {/* Profile Widget Body */}
                  <div className="jobplugin__profile-widget__body">
                    {/* Profile Widget Box */}
                    <div className="jobplugin__profile-widget__box bg-white border border-dark shadow">
                      {/* Profile Widget Box Head */}
                      <div className="jobplugin__profile-widget__box-head">
                        <h5 className="jobplugin__text-primary">Aptitude Trainer | Punjab Group of Colleges</h5>
                        <div className="jobplugin__profile-widget__box-buttons">
                          <a href="#" className="jobplugin__settings-card__edit jobplugin__text-primary jobplugin__border-primary hover:jobplugin__bg-primary hover:jobplugin__text-white">
                            <FaEdit />
                          </a>
                          <a href="#" className="jobplugin__settings-card__edit button-delete">
                            <FaTrash />
                          </a>
                        </div>
                      </div>
                      {/* Profile Widget Box Body */}
                      <div className="jobplugin__profile-widget__box-body">
                        <p>I was more than satisfied from start to finish. As for the possible modifications, he is also very attentive, I really appreciated it. The hardest part was to choose between the different proposals because they were all really good <span className="jobplugin__profile-review__comment-full"> But, overall, it was a great experience. </span> <a className="jobplugin__profile-review__comment-more jobplugin__text-primary" href="#">.... more</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CandidateProfile;