import React, { useState } from "react";
import { FaCog, FaFileAlt, FaEdit, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

const ResumeBuilder = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      {/* Main content with grid layout */}
      <main className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <div className="jobplugin__container">
            <div
              className="jobplugin__settings"
              style={{
                display: "flex",
                position: "relative",
                minHeight: "100vh",
              }}
            >
              {/* Settings Nav Opener */}
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>

              <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

              {/* Settings Content */}
              <div
                className="jobplugin__settings-content"
                style={{
                  flex: 1,
                  marginLeft: isSidebarOpen ? "280px" : "0px", // Adjust based on your sidebar width
                  transition: "margin-left 0.3s ease",
                  padding: "20px",
                  width: "calc(100% - 280px)", // Subtract sidebar width
                }}
              >
                <div className="jobplugin__settings-head">
                  <h2 className="h5 text-secondary">AI Resume Builder</h2>
                  <span className="jobplugin__settings-head__bar jobplugin__bg-primary"></span>
                </div>

                <div className="jobplugin__settings-card box-organization">
                  <div className="jobplugin__settings-card__body">
                    <div className="jobplugin__settings-organization">
                      <div className="jobplugin__settings-organization__image">
                        <img
                          src="images/icon-organization.png"
                          alt="AI Resume Builder"
                        />
                      </div>

                      <h3 className="h5">
                        Generate better visible AI generated Resume for the
                        competitive world
                      </h3>

                      <ul>
                        <li>
                          <div className="jobplugin__settings-organization__box shadow">
                            <div className="jobplugin__settings-organization__checkicon">
                              <img src="images/check-icon.svg" alt="Check" />
                            </div>
                            <p>
                              AI-powered content suggestions based on your
                              profile and industry standards
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className="jobplugin__settings-organization__box shadow">
                            <div className="jobplugin__settings-organization__checkicon">
                              <img src="images/check-icon.svg" alt="Check" />
                            </div>
                            <p>
                              Professional formatting with multiple template
                              options to choose from
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className="jobplugin__settings-organization__box shadow">
                            <div className="jobplugin__settings-organization__checkicon">
                              <img src="images/check-icon.svg" alt="Check" />
                            </div>
                            <p>
                              ATS-friendly design ensures your resume passes
                              automated screening systems
                            </p>
                          </div>
                        </li>

                        <li>
                          <div className="jobplugin__settings-organization__box shadow">
                            <div className="jobplugin__settings-organization__checkicon">
                              <img src="images/check-icon.svg" alt="Check" />
                            </div>
                            <p>
                              Real-time optimization suggestions to improve your
                              resume's effectiveness
                            </p>
                          </div>
                        </li>
                      </ul>

                      <div className="jobplugin__section-buttons">
                        <button
                          className="jobplugin__button jobplugin__bg-primary hover:jobplugin__bg-secondary small shadow"
                          onClick={() => {
                            // Add your resume generation logic here
                            console.log("Generate Resume clicked");
                          }}
                        >
                          <FaFileAlt className="me-2" />
                          Generate Resume
                        </button>
                        <Link
                          to="/employee-profile"
                          className="jobplugin__button button-white button-link hover:jobplugin__bg-primary hover:jobplugin__text-white small"
                        >
                          <FaEdit className="me-2" />
                          Complete Profile First
                        </Link>
                      </div>

                      {/* Additional Resume Builder Features */}
                      <div className="mt-4 pt-4 border-top">
                        <h4 className="h6 mb-3">Resume Builder Features</h4>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="d-flex align-items-center mb-2">
                              <FaDownload className="text-primary me-2" />
                              <small>Download in PDF & Word formats</small>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <FaEdit className="text-primary me-2" />
                              <small>Easy drag-and-drop editor</small>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="d-flex align-items-center mb-2">
                              <FaFileAlt className="text-primary me-2" />
                              <small>Multiple professional templates</small>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <FaCog className="text-primary me-2" />
                              <small>AI-powered content optimization</small>
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
      </main>
    </>
  );
};

export default ResumeBuilder;
