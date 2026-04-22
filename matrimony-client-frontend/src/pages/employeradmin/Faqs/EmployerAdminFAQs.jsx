import React, { useState } from 'react';
import EmployerAdminHeader from '../Layout/EmployerAdminHeader';
import EmployerAdminFooter from '../Layout/EmployerAdminFooter';

const EmployerAdminFAQs = () => {
  const [activeAccordion, setActiveAccordion] = useState({
    primaryBorderOne: true,
    primaryBorderTwo: false,
    primaryBorderThree: false,
    primaryBorderFour: false,
    primaryBorderFive: false,
    primaryBorder1: true,
    primaryBorder2: false,
    primaryBorder3: false,
    primaryBorder4: false,
    primaryBorder5: false,
  });

  const [showModal, setShowModal] = useState(false);
  const [faqData, setFaqData] = useState({
    question: '',
    answer: ''
  });

  const toggleAccordion = (id) => {
    setActiveAccordion(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFaqData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission (API call, etc.)
    console.log('FAQ submitted:', faqData);
    setShowModal(false);
    setFaqData({ question: '', answer: '' });
  };

  return (
    <>
    <EmployerAdminHeader/>
    <div className="content">
      {/* Breadcrumb */}
      <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 mt-4">
        <div className="my-auto">
          <h1 className="ms-3 text-secondary">
            <i className="ti ti-info-circle fs-18"></i> FAQs For Teachers
          </h1>
        </div>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
          <div className="me-2">
            <button 
              className="btn btn-secondary" 
              onClick={() => setShowModal(true)}
            >
              <i className="ti ti-edit me-1"></i>Add FAQ
            </button>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      
      <div className="row">
        <div className="col-xl-12">
          <div className="tab-content custom-accordion-items">
            <div className="tab-pane active show" id="bottom-justified-tab1" role="tabpanel">
              <div className="accordion accordions-items-seperate" id="accordionExample">
                <div className="row">
                  {/* Teacher FAQs */}
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="headingOne">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center flex-fill">
                            <h5 className="text-primary">How do I register on the portal?</h5>
                            <button 
                              className="btn btn-sm btn-icon ms-auto" 
                              onClick={() => setShowModal(true)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button 
                              className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                              onClick={() => toggleAccordion('primaryBorderOne')}
                            >
                              <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderOne ? 'rotate-180' : ''}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div 
                        id="primaryBorderOne" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorderOne ? 'show' : ''} border-top`} 
                        aria-labelledby="headingOne" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Click on "Register" and fill out the registration form with your details.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="headingTwo">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center flex-fill">
                            <h5 className="text-primary">What kind of jobs can I find on the portal?</h5>
                            <button 
                              className="btn btn-sm btn-icon ms-auto" 
                              onClick={() => setShowModal(true)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button 
                              className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                              onClick={() => toggleAccordion('primaryBorderTwo')}
                            >
                              <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderTwo ? 'rotate-180' : ''}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div 
                        id="primaryBorderTwo" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorderTwo ? 'show' : ''} border-top`} 
                        aria-labelledby="headingTwo" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          You can find teaching jobs in various schools, including government, private, and international schools.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="headingThree">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center justify-content-between flex-fill">
                            <h5 className="text-primary">How do I apply for a job?</h5>														
                            <div className="d-flex">
                              <button 
                                className="btn btn-icon btn-sm" 
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button 
                                className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                onClick={() => toggleAccordion('primaryBorderThree')}
                              >
                                <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderThree ? 'rotate-180' : ''}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>                                       
                      </div>
                      <div 
                        id="primaryBorderThree" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorderThree ? 'show' : ''} border-top`} 
                        aria-labelledby="headingThree" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Search for jobs, click on the job you're interested in, and click "Apply Now" to submit your application.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="row">												
                        <div className="accordion-header" id="headingFour">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">Can I upload my resume and other documents?</h5>														
                              <div className="d-flex">
                                <button 
                                  className="btn btn-icon btn-sm" 
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button 
                                  className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                  onClick={() => toggleAccordion('primaryBorderFour')}
                                >
                                  <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderFour ? 'rotate-180' : ''}`}></i>
                                </button>
                              </div>
                            </div>
                          </div>                                       
                        </div>
                        <div 
                          id="primaryBorderFour" 
                          className={`accordion-collapse collapse ${activeAccordion.primaryBorderFour ? 'show' : ''} border-top`} 
                          aria-labelledby="headingFour" 
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Yes, you can upload your resume, certificates, and other relevant documents.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="row">												
                        <div className="accordion-header" id="headingFive">
                          <div className="accordion-button collapsed">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">Will my personal details be shared with employers?</h5>														
                              <div className="d-flex">
                                <button 
                                  className="btn btn-icon btn-sm" 
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button 
                                  className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                  onClick={() => toggleAccordion('primaryBorderFive')}
                                >
                                  <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderFive ? 'rotate-180' : ''}`}></i>
                                </button>
                              </div>
                            </div>
                          </div>                                       
                        </div>
                        <div 
                          id="primaryBorderFive" 
                          className={`accordion-collapse collapse ${activeAccordion.primaryBorderFive ? 'show' : ''} border-top`} 
                          aria-labelledby="headingFive" 
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            No, your personal details will be kept confidential and only shared with employers you've applied to.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h1 className="ms-3 text-secondary">
                  <i className="ti ti-info-circle fs-18"></i> FAQs For Employers (Schools)
                </h1>
                <br />
                
                <div className="row">
                  {/* Employer FAQs */}
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading1">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center flex-fill">
                            <h5 className="text-primary">How do I post a job on the portal?</h5>
                            <button 
                              className="btn btn-sm btn-icon ms-auto" 
                              onClick={() => setShowModal(true)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button 
                              className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                              onClick={() => toggleAccordion('primaryBorder1')}
                            >
                              <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder1 ? 'rotate-180' : ''}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div 
                        id="primaryBorder1" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorder1 ? 'show' : ''} border-top`} 
                        aria-labelledby="heading1" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          Register as an employer, click on "Post a Job," and fill out the job description form.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading2">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center flex-fill">
                            <h5 className="text-primary">What kind of teachers can I find on the portal?</h5>
                            <button 
                              className="btn btn-sm btn-icon ms-auto" 
                              onClick={() => setShowModal(true)}
                            >
                              <i className="ti ti-edit"></i>
                            </button>
                            <button 
                              className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                              onClick={() => toggleAccordion('primaryBorder2')}
                            >
                              <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder2 ? 'rotate-180' : ''}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div 
                        id="primaryBorder2" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorder2 ? 'show' : ''} border-top`} 
                        aria-labelledby="heading2" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          You can find qualified teachers in various subjects and levels (primary, secondary, etc.).
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="accordion-header" id="heading3">
                        <div className="accordion-button">
                          <div className="d-flex align-items-center justify-content-between flex-fill">
                            <h5 className="text-primary">How do I contact applicants?</h5>														
                            <div className="d-flex">
                              <button 
                                className="btn btn-icon btn-sm" 
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button 
                                className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                onClick={() => toggleAccordion('primaryBorder3')}
                              >
                                <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder3 ? 'rotate-180' : ''}`}></i>
                              </button>
                            </div>
                          </div>
                        </div>                                       
                      </div>
                      <div 
                        id="primaryBorder3" 
                        className={`accordion-collapse collapse ${activeAccordion.primaryBorder3 ? 'show' : ''} border-top`} 
                        aria-labelledby="heading3" 
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          You can view applicant profiles, resumes, and cover letters, and contact them directly through the portal.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="row">												
                        <div className="accordion-header" id="heading4">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">Can I manage my job postings and applicants?</h5>														
                              <div className="d-flex">
                                <button 
                                  className="btn btn-icon btn-sm" 
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button 
                                  className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                  onClick={() => toggleAccordion('primaryBorder4')}
                                >
                                  <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder4 ? 'rotate-180' : ''}`}></i>
                                </button>
                              </div>
                            </div>
                          </div>                                       
                        </div>
                        <div 
                          id="primaryBorder4" 
                          className={`accordion-collapse collapse ${activeAccordion.primaryBorder4 ? 'show' : ''} border-top`} 
                          aria-labelledby="heading4" 
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            Yes, you can manage your job postings, view applicants, and mark candidates as "shortlisted" or "rejected."
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="accordion-item">
                      <div className="row">												
                        <div className="accordion-header" id="heading5">
                          <div className="accordion-button collapsed">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">Is there a fee for posting jobs?</h5>														
                              <div className="d-flex">
                                <button 
                                  className="btn btn-icon btn-sm" 
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button 
                                  className="d-flex align-items-center collapsed collapse-arrow"   style={{
          backgroundColor: 'white',
          border: 'none',
          padding: 0
        }}
                                  onClick={() => toggleAccordion('primaryBorder5')}
                                >
                                  <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder5 ? 'rotate-180' : ''}`}></i>
                                </button>
                              </div>
                            </div>
                          </div>                                       
                        </div>
                        <div 
                          id="primaryBorder5" 
                          className={`accordion-collapse collapse ${activeAccordion.primaryBorder5 ? 'show' : ''} border-top`} 
                          aria-labelledby="heading5" 
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            N / A
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Edit FAQ Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} id="edit_FAQs">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Frequently Asked Questions</h4>
                <button 
                  type="button" 
                  className="btn-close custom-btn-close" 
                  onClick={() => setShowModal(false)}
                >
                  <i className="ti ti-x"></i>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body pb-0">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Question <span className="text-danger"> *</span></label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="question"
                          value={faqData.question}
                          onChange={handleInputChange}
                          required
                        />
                      </div>									
                    </div>
                    <div className="col-md-12">
                      <div className="mb-3">
                        <label className="form-label">Answer <span className="text-danger"> *</span></label>
                        <textarea 
                          className="form-control" 
                          rows="3"
                          name="answer"
                          value={faqData.answer}
                          onChange={handleInputChange}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-white border me-2" 
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
    <EmployerAdminFooter/>
    </>
  );
};

export default EmployerAdminFAQs;