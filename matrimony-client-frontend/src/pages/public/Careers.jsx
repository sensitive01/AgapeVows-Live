import React from 'react';

const CareersPage = () => {
  return (
    <>
      {/* Sub Visual Block */}
      <div className="subvisual-block subvisual-theme-1 bg-dark-blue d-flex pt-60 pt-md-90 pt-lg-150 pb-30 text-white">
        <div className="pattern-image">
          <img src="/images/bg-pattern-overlay.jpg" width="1920" height="570" alt="Pattern" />
        </div>
        <div className="container position-relative text-center">
          <div className="row">
            <div className="col-12">
              <div className="subvisual-textbox">
                <h1 className="text-primary mb-0">Careers @ EdProfio</h1>
                <p>job duties, job responsibilities, and skills required</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="jobplugin__main bg-light" style={{ padding: "0px 100px" }}>
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="/images/visual-pattern.png" alt="Pattern Decoration" />
          </div>
          
          <div className="jobplugin__container">
            {/* Create Project Block */}
            <div className="jobplugin__create-project bg-white">
              {/* Steps Bar */}
              <div className="jobplugin__steps-bar bg-primary">
                <div className="jobplugin__steps-bar_holder">
                  {/* Steps Nav */}
                  <ul className="jobplugin__steps-nav">
                    {steps.map((step, index) => (
                      <li key={index} className={index === 0 ? "visited current" : ""}>
                        <a href="#">{step}</a>
                        <div className="edit">
                          <span className="rj-icon rj-edit-text"></span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Steps Content */}
              <div className="jobplugin__steps-content">
                <div className="jobplugin__step-block">
                  {/* Title Form Block */}
                  <div className="jobplugin__form-block bg-light">
                    <strong className="jobplugin__form-block__title">Title</strong>
                    <p>Tell the client what you will deliver and how it benefits them.</p>
                    <div className="jobplugin__form-block__field bg-white">
                      <strong className="field-txt jobplugin__text-primary">You will</strong>
                      <input type="text" placeholder="Type your title...." />
                    </div>
                    <p className="txt">0/90 characters (min. 7 words.)</p>
                  </div>
                  
                  {/* Teams Form Block */}
                  <div className="jobplugin__form-block bg-light">
                    <strong className="jobplugin__form-block__title">Teams</strong>
                    <p>Do you want to create the project as a freelancer or as an agency member?</p>
                    <select className="select2">
                      <option value="As a Freelancer">As a Freelancer</option>
                    </select>
                  </div>
                  
                  {/* Category Form Block */}
                  <div className="jobplugin__form-block bg-light">
                    <div className="txt-bar">
                      <strong className="jobplugin__form-block__title">Category</strong>
                      <p>Select a category so it's easy for clients to find your project.</p>
                      <a href="#" className="jobplugin__text-primary hover:jobplugin__text-secondary">
                        Browse all categories
                      </a>
                    </div>
                    <strong className="jobplugin__form-block__title">Project Attributes</strong>
                    <p>Select a category above to view options.</p>
                  </div>
                  
                  {/* Tags Form Block */}
                  <div className="jobplugin__form-block bg-light">
                    <strong className="jobplugin__form-block__title">Teams</strong>
                    <p>Search Tags (optional)</p>
                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Start typing to view & select options. If entering your own tags. press Enter to save." 
                      />
                    </div>
                    <p className="txt">(max. 5 tags)</p>
                  </div>
                  
                  {/* Form Navigation Buttons */}
                  <div className="jobplugin__flex-bar jobplugin__flex-end">
                    <div className="jobplugin__step-block_btns">
                      <a href="#" className="jobplugin__button bg-secondary jobplugin__bg-white small hover:jobplugin__bg-white">
                        <span className="rj-icon rj-preview"></span>
                        Preview
                      </a>
                      <a href="create-project-step2.html" className="jobplugin__button jobplugin__bg-primary small hover:jobplugin__bg-secondary">
                        Next &nbsp; <span className="rj-icon rj-arrow-right"></span>
                      </a>
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

// Steps data
const steps = [
  "Overview",
  "Pricing",
  "Gallery",
  "Process",
  "Description",
  "Review"
];

export default CareersPage;