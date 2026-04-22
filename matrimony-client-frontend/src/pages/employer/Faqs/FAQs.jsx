import React, { useState } from 'react';
import EmployerHeader from '../EmployerHeader';
import EmployerFooter from '../EmployerFooter';

const FAQs = () => {
  const [activeAccordion, setActiveAccordion] = useState({
    primaryBorderOne: true,
    primaryBorderTwo: false,
    primaryBorderThree: false,
    primaryBorderFour: false,
    primaryBorderFive: false,
    primaryBorderSix: false,
    primaryBorderSeven: false,
    primaryBorderEight: false,
    primaryBorder1: true,
    primaryBorder2: false,
    primaryBorder3: false,
    primaryBorder4: false,
    primaryBorder5: false,
    primaryBorder6: false,
    primaryBorder7: false,
    primaryBorder8: false,
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
      <EmployerHeader />
      <div className="content">
        {/* Breadcrumb */}
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3 mt-4">
          <div className="my-auto">
            <h1 className="ms-3 text-secondary">
              <i className="ti ti-info-circle fs-18"></i> FAQs For Teachers / Job-seekers
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
                              <h5 className="text-primary">What is EdProfio?</h5>
                              <button
                                className="btn btn-sm btn-icon ms-auto"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button
                                className="d-flex align-items-center collapsed collapse-arrow"
                                style={{
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
                            EdProfio is a platform that connects educators (teachers, administrative staff, support staff) with schools — helping you find job opportunities, manage your profile, and showcase your experience to potential employers.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="accordion-header" id="headingTwo">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center flex-fill">
                              <h5 className="text-primary">How do I register on EdProfio?</h5>
                              <button
                                className="btn btn-sm btn-icon ms-auto"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button
                                className="d-flex align-items-center collapsed collapse-arrow"
                                style={{
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
                            You sign up, create a profile (with your qualifications, experience, subject specialisation, etc.), and submit it. Once approved, you become visible to schools looking for staff.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="accordion-header" id="headingThree">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">What information should my profile include?</h5>
                              <div className="d-flex">
                                <button
                                  className="btn btn-icon btn-sm"
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button
                                  className="d-flex align-items-center collapsed collapse-arrow"
                                  style={{
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
                            Your educational qualifications, teaching or non-teaching experience, areas of expertise, skills (e.g. subject knowledge, administrative ability), availability, contact details, and optionally a short summary or objective.
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
                                <h5 className="text-primary">Can I apply to multiple schools through EdProfio?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
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
                              Yes — once your profile is live, you can browse available jobs and apply to as many schools as you like, based on your eligibility and interest.
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
                                <h5 className="text-primary">Is there any fee for teachers to use EdProfio?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
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
                              No, registration and profile creation for teachers is free.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="headingSix">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">How do I know if a school contacted me?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorderSix')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderSix ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorderSix"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorderSix ? 'show' : ''} border-top`}
                            aria-labelledby="headingSix"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              EdProfio will notify you (via email / dashboard / contact info you provided) whenever a school views your profile and sends a job offer or interview request.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="headingSeven">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">What if I want to update or change my profile later?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorderSeven')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderSeven ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorderSeven"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorderSeven ? 'show' : ''} border-top`}
                            aria-labelledby="headingSeven"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              You can log into your account at any time and update your profile — credentials, experience, preferred job types, contact information, etc. This ensures schools always see the latest info.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="headingEight">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">Is EdProfio only for full-time jobs, or also part-time or substitute work?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorderEight')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorderEight ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorderEight"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorderEight ? 'show' : ''} border-top`}
                            aria-labelledby="headingEight"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              You should be able to specify in your profile whether you're looking for full-time, part-time, temporary or substitute positions — and apply accordingly.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h1 className="ms-3 text-secondary mt-4">
                    <i className="ti ti-info-circle fs-18"></i> FAQs For Schools / Employers
                  </h1>
                  <br />

                  <div className="row">
                    {/* Employer FAQs */}
                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="accordion-header" id="heading1">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center flex-fill">
                              <h5 className="text-primary">What is EdProfio for schools?</h5>
                              <button
                                className="btn btn-sm btn-icon ms-auto"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button
                                className="d-flex align-items-center collapsed collapse-arrow"
                                style={{
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
                            EdProfio helps schools and educational institutions find qualified teaching and non-teaching staff. Schools can browse educator profiles filtered by qualifications, experience, subject specialisation, etc., to shortlist and hire staff efficiently.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="accordion-header" id="heading2">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center flex-fill">
                              <h5 className="text-primary">How do we register as a school on EdProfio?</h5>
                              <button
                                className="btn btn-sm btn-icon ms-auto"
                                onClick={() => setShowModal(true)}
                              >
                                <i className="ti ti-edit"></i>
                              </button>
                              <button
                                className="d-flex align-items-center collapsed collapse-arrow"
                                style={{
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
                            Schools need to sign up, provide institution details (name, address, type — public/private, levels taught, contact info), and once approved, can access the pool of candidate profiles.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="accordion-header" id="heading3">
                          <div className="accordion-button">
                            <div className="d-flex align-items-center justify-content-between flex-fill">
                              <h5 className="text-primary">Can we filter candidates based on our requirements?</h5>
                              <div className="d-flex">
                                <button
                                  className="btn btn-icon btn-sm"
                                  onClick={() => setShowModal(true)}
                                >
                                  <i className="ti ti-edit"></i>
                                </button>
                                <button
                                  className="d-flex align-items-center collapsed collapse-arrow"
                                  style={{
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
                            Yes — you should be able to search and filter candidate profiles by subject expertise, years of experience, qualifications, availability, and other criteria to find the best match for your school's needs.
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
                                <h5 className="text-primary">How does communication with a candidate happen?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
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
                              Once you shortlist a candidate, the platform allows you to contact them through EdProfio (or via their provided contact details), request interview, or send a job offer.
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
                                <h5 className="text-primary">Is there a subscription or fee for schools to use EdProfio?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
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
                              Please contact our support team for details about registration fees, subscription plans, or pay-per-hire charges.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="heading6">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">Can we post multiple job openings and hire more than one staff member?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorder6')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder6 ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorder6"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorder6 ? 'show' : ''} border-top`}
                            aria-labelledby="heading6"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Yes — schools can post all open positions (teaching, non-teaching, temporary, full-time, part-time), and manage multiple recruitments simultaneously through the platform.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="heading7">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">How secure is candidate data — are profiles verified?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorder7')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder7 ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorder7"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorder7 ? 'show' : ''} border-top`}
                            aria-labelledby="heading7"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              EdProfio verifies credentials (qualifications, experience) before making candidate profiles live. Schools receive verified data, reducing risk of fraudulent applications.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="accordion-item">
                        <div className="row">
                          <div className="accordion-header" id="heading8">
                            <div className="accordion-button collapsed">
                              <div className="d-flex align-items-center justify-content-between flex-fill">
                                <h5 className="text-primary">Can we maintain a database of past applicants for future hiring?</h5>
                                <div className="d-flex">
                                  <button
                                    className="btn btn-icon btn-sm"
                                    onClick={() => setShowModal(true)}
                                  >
                                    <i className="ti ti-edit"></i>
                                  </button>
                                  <button
                                    className="d-flex align-items-center collapsed collapse-arrow"
                                    style={{
                                      backgroundColor: 'white',
                                      border: 'none',
                                      padding: 0
                                    }}
                                    onClick={() => toggleAccordion('primaryBorder8')}
                                  >
                                    <i className={`ti ti-chevron-down fs-18 ${activeAccordion.primaryBorder8 ? 'rotate-180' : ''}`}></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            id="primaryBorder8"
                            className={`accordion-collapse collapse ${activeAccordion.primaryBorder8 ? 'show' : ''} border-top`}
                            aria-labelledby="heading8"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              Yes — you can save candidate profiles you've reviewed or contacted, making it easy to revisit them when new openings arise.
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
      <EmployerFooter />
    </>
  );
};

export default FAQs;