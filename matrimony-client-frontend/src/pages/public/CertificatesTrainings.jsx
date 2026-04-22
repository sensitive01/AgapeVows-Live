import React, { useState, useRef, useEffect } from "react";
import {
  FaCog,
  FaCheckCircle,
  FaChevronRight,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaPhone,
  FaHome,
  FaBriefcase,
  FaUsers,
  FaEnvelope,
  FaSignOutAlt,
  FaBars,
  FaGraduationCap,
  FaCertificate,
  FaBook,
  FaPlay,
  FaStar,
  FaHeart,
  FaShare,
  FaDownload,
} from "react-icons/fa";
import Sidebar from "../../components/layout/Sidebar";

import event1 from "../../../public/images/event1.jpg";
import roboImage from "../../../public/images/robo.avif";
import edujobzImage from "../../../public/images/edujobz.avif";
import certificateImage from "../../../public/images/certificate.avif";
import errorImage from "../../../public/images/404.avif";
import avatar1 from "../../../public/images/img-avatar-01.png";
import avatar2 from "../../../public/images/img-avatar-02.png";
import avatar3 from "../../../public/images/img-avatar-03.png";
import userImage from "../../../public/images/img-user01.png";
import { FaMessage } from "react-icons/fa6";

const CertificatesTrainings = () => {
  const userDataString =
    typeof window !== "undefined" ? localStorage.getItem("userData") : null;
  const userData = userDataString
    ? JSON.parse(userDataString)
    : { _id: "guest", name: "Guest User" };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const sliderRef = useRef(null);
  const [currentGallerySlide, setCurrentGallerySlide] = useState(0);
  const galleryImages = [event1, event1, event1, event1];
  const [activeTier, setActiveTier] = useState(null);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchtraining"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch trainings");
        }
        const data = await response.json();
        setTrainings(data);
        setFilteredTrainings(data);

        const categories = [
          ...new Set(data.map((training) => training.category).filter(Boolean)),
        ];
        setAvailableCategories(categories);

        if (data.length > 0) {
          setSelectedTraining(data[0]);
          setActiveTier(
            data[0].paymentStatus === "paid"
              ? `Premium - $${data[0].paidAmount}`
              : "Free Tier"
          );
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredTrainings(trainings);
    } else {
      const filtered = trainings.filter(
        (training) => training.category === activeTab
      );
      setFilteredTrainings(filtered);
    }
  }, [trainings, activeTab]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const sliderItems = trainings.map((training, index) => ({
    id: training._id,
    image: [roboImage, edujobzImage, certificateImage, errorImage][index % 4],
    title: training.title,
    description: training.description,
    duration: `${training.subCategories?.length || 0} Modules`,
    price:
      training.paymentStatus === "paid" ? `$${training.paidAmount}` : "Free",
    avatar: [avatar1, avatar2, avatar3][index % 3],
    name: "EdProfio Instructor",
    rating: `4.${(index % 5) + 1} (${training.enrollerList?.length || 0})`,
    trainingData: training,
  }));

  const itemsPerSlide = 4;
  const totalSlides = Math.max(
    5,
    Math.ceil(sliderItems.length / itemsPerSlide)
  );
  const totalItems = sliderItems.length;

  useEffect(() => {
    if (!autoPlay || totalItems === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [autoPlay, totalSlides, totalItems]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const getCurrentSlideItems = () => {
    if (totalItems === 0) return [];

    let items = [];
    for (let i = 0; i < itemsPerSlide; i++) {
      const itemIndex = (currentSlide * itemsPerSlide + i) % totalItems;
      items.push(sliderItems[itemIndex]);
    }
    return items;
  };

  const selectTraining = (training) => {
    if (!training?.trainingData) return;

    setSelectedTraining(training.trainingData);
    setActiveTier(
      training.trainingData.paymentStatus === "paid"
        ? `Premium - $${training.trainingData.paidAmount}`
        : "Free Tier"
    );
    setCurrentGallerySlide(0);
  };

  const goToGallerySlide = (index) => {
    setCurrentGallerySlide(index);
  };

  const toggleTier = (tier) => {
    setActiveTier(activeTier === tier ? null : tier);
  };

  const generatePricingTiers = (training) => {
    if (!training) return [];

    if (training.paymentStatus === "Free") {
      return [
        {
          name: "Free Tier",
          price: "Free",
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
            "Basic certificate",
          ],
        },
      ];
    } else {
      return [
        {
          name: "Basic",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 0.5)}`,
          duration: "3 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Community support",
            "Email assistance",
          ],
        },
        {
          name: "Standard",
          price: `$${training.paidAmount || 0}`,
          duration: "6 months access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Basic certificate",
          ],
        },
        {
          name: "Premium",
          price: `$${Math.floor(parseInt(training.paidAmount || 0) * 1.5)}`,
          duration: "Lifetime access",
          features: [
            "Full course access",
            `${training.subCategories?.length || 0} modules`,
            "Priority support",
            "Practice exercises",
            "Premium certificate",
            "1-on-1 mentoring session",
            "Course materials download",
          ],
        },
      ];
    }
  };

  const tabs = [
    { id: "all", label: "All Trainings", count: trainings.length },
    ...availableCategories.map((category) => ({
      id: category,
      label: category,
      count: trainings.filter((training) => training.category === category)
        .length,
    })),
  ];

  if (loading) {
    return (
      <div
        className="certificates-trainings-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#666" }}>
            Loading trainings...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="certificates-trainings-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ textAlign: "center", color: "#e74c3c" }}>
          <div style={{ fontSize: "18px" }}>Error: {error}</div>
        </div>
      </div>
    );
  }

  if (trainings.length === 0 || !selectedTraining) {
    return (
      <>
        <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>
        
        <main
          className="jobplugin__main"
          style={{
            paddingLeft: isSidebarOpen ? "300px" : "0",
            transition: "padding-left 0.3s ease",
            minHeight: "100vh",
          }}
        >
          <div
            className="jobplugin__main-holder"
            style={{ padding: "20px", paddingTop: "60px" }}
          >
            <div
              className="jobplugin__container"
              style={{ maxWidth: "1400px", margin: "0 auto" }}
            >
              <div className="jobplugin__settings">
                <a
                  href="#"
                  className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSidebar();
                  }}
                  style={{
                    position: "fixed",
                    top: "20px",
                    left: "20px",
                    zIndex: 1001,
                    padding: "12px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    backgroundColor: "white",
                    border: "1px solid #e0e0e0",
                  }}
                >
                  <FaCog className="rj-icon rj-settings" />
                </a>

                {isSidebarOpen && (
                  <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    style={{
                      position: "fixed",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      zIndex: 999,
                    }}
                  />
                )}

                <div
                  style={{
                    position: "relative",
                    zIndex: 1002,
                    marginRight: "28px",
                  }}
                >
                  <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
                </div>

                <div className="jobplugin__settings-content" style={{ padding: "0px" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "12px",
                      border: "1px solid #e8e8e8",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      padding: "60px 40px",
                      textAlign: "center",
                      margin: "20px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "48px",
                        color: "#ddd",
                        marginBottom: "20px",
                      }}
                    >
                      <FaGraduationCap />
                    </div>
                    <h3
                      style={{
                        fontSize: "20px",
                        color: "#666",
                        marginBottom: "10px",
                      }}
                    >
                      No Trainings Found
                    </h3>
                    <p style={{ fontSize: "16px", color: "#999", margin: "0" }}>
                      No training courses are currently available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const pricingTiers = generatePricingTiers(selectedTraining);
  const enrollmentCount = selectedTraining.enrollerList?.length || 0;
  const lastUpdated = new Date(selectedTraining.updatedAt).toLocaleDateString();

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-secondary d-flex pt-60 pt-md-90 text-white"></div>

      <main
        className="jobplugin__main"
        style={{
          paddingLeft: isSidebarOpen ? "300px" : "0",
          transition: "padding-left 0.3s ease",
          minHeight: "100vh",
        }}
      >
        <div
          className="jobplugin__main-holder"
          style={{ padding: "20px", paddingTop: "60px" }}
        >
          <div
            className="jobplugin__container"
            style={{ maxWidth: "1400px", margin: "0 auto" }}
          >
            <div className="jobplugin__settings">
              <a
                href="#"
                className="jobplugin__settings-opener jobplugin__text-primary hover:jobplugin__bg-primary hover:jobplugin__text-white"
                onClick={(e) => {
                  e.preventDefault();
                  toggleSidebar();
                }}
                style={{
                  position: "fixed",
                  top: "20px",
                  left: "20px",
                  zIndex: 1001,
                  padding: "12px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                }}
              >
                <FaCog className="rj-icon rj-settings" />
              </a>

              {isSidebarOpen && (
                <div
                  className="sidebar-overlay"
                  onClick={closeSidebar}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 999,
                  }}
                />
              )}

              <div
                style={{
                  position: "relative",
                  zIndex: 1002,
                  marginRight: "28px",
                }}
              >
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
              </div>

              <div
                className="jobplugin__settings-content"
                style={{ padding: "0px" }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
                    marginBottom: "15px",
                  }}
                >
                  <div className="jobplugin__tabset-normal">
                    <ul
                      data-tabset="tabset"
                      style={{
                        display: "flex",
                        gap: "30px",
                        margin: "0",
                        padding: "20px 20px 0 20px",
                        listStyle: "none",
                        borderBottom: "2px solid #f5f5f5",
                        paddingBottom: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {tabs.map((tab) => (
                        <li
                          key={tab.id}
                          className={activeTab === tab.id ? "active" : ""}
                        >
                          <a
                            className="hover:jobplugin__text-primary hover:jobplugin__border-primary"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleTabClick(tab.id);
                            }}
                            style={{
                              padding: "8px 0",
                              textDecoration: "none",
                              fontWeight: activeTab === tab.id ? "600" : "500",
                              fontSize: "16px",
                              color: activeTab === tab.id ? "#2c5aa0" : "#666",
                              borderBottom:
                                activeTab === tab.id
                                  ? "2px solid #2c5aa0"
                                  : "2px solid transparent",
                              transition: "all 0.3s ease",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            {tab.label}
                            <span
                              style={{
                                backgroundColor:
                                  activeTab === tab.id ? "#2c5aa0" : "#e0e0e0",
                                color: activeTab === tab.id ? "white" : "#666",
                                borderRadius: "12px",
                                padding: "2px 8px",
                                fontSize: "12px",
                                fontWeight: "600",
                                minWidth: "20px",
                                textAlign: "center",
                              }}
                            >
                              {tab.count}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <section
                  className="jobplugin_section jobpluginsection-white jobplugin_section-trending"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                    border: "1px solid #f0f0f0",
                    marginBottom: "20px",
                    padding: "20px",
                  }}
                >
                  <div className="jobplugin__container">
                    <div
                      className="jobplugin__slider-container"
                      style={{ overflow: "hidden", position: "relative" }}
                    >
                      {filteredTrainings.length > 0 ? (
                        <>
                          <div
                            className="jobplugin__slider-grid"
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(280px, 1fr))",
                              gap: "20px",
                              padding: "20px 0",
                              transition: "transform 0.5s ease",
                            }}
                            ref={sliderRef}
                          >
                            {getCurrentSlideItems().map((item, index) => (
                              <div
                                key={`${item.id}-${currentSlide}-${index}`}
                                className="jobplugin__slider-slide"
                                onClick={() => selectTraining(item)}
                                style={{
                                  cursor: "pointer",
                                  transition: "transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    "translateY(0)";
                                }}
                              >
                                <article className="jobplugin__article-box bg-light">
                                  <div className="jobplugin__article-image border-dark shadow">
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                      style={{
                                        width: "100%",
                                        height: "200px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="jobplugin__article-textbox"
                                    style={{ padding: "15px" }}
                                  >
                                    <strong className="jobplugin_article-title hover:jobplugin_text-primary">
                                      {item.title}
                                    </strong>
                                    <div
                                      className="jobplugin__article-duration"
                                      style={{ margin: "8px 0" }}
                                    >
                                      <span className="jobplugin_article-durationicon jobplugin_text-primary rj-icon rj-clock"></span>
                                      <span className="jobplugin_article-duration_text">
                                        {item.duration}
                                      </span>
                                    </div>
                                    <strong className="jobplugin__article-pricing">
                                      From{" "}
                                      <span className="jobplugin_article-pricing_text">
                                        {item.price}
                                      </span>
                                    </strong>
                                  </div>
                                  <div
                                    className="jobplugin__article-foot bg-white"
                                    style={{
                                      padding: "15px",
                                      borderTop: "1px solid #f0f0f0",
                                    }}
                                  >
                                    <div className="jobplugin_article-userinfo hover:jobplugin_text-primary">
                                      <div className="jobplugin__article-useravatar">
                                        <img
                                          src={item.avatar}
                                          alt={item.name}
                                          style={{
                                            width: "32px",
                                            height: "32px",
                                            borderRadius: "50%",
                                          }}
                                        />
                                      </div>
                                      <div className="jobplugin__article-subtext">
                                        <strong className="jobplugin__article-username">
                                          {item.name}
                                        </strong>
                                      </div>
                                    </div>
                                    <span
                                      className="jobplugin_section-boxratings jobplugin_bg-primary"
                                      style={{
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        color: "white",
                                        fontSize: "12px",
                                      }}
                                    >
                                      <FaStar style={{ marginRight: "4px" }} />
                                      <span className="jobplugin_section-box_ratings-points">
                                        {item.rating}
                                      </span>
                                    </span>
                                  </div>
                                </article>
                              </div>
                            ))}
                          </div>

                          <div
                            style={{
                              textAlign: "center",
                              marginTop: "20px",
                              display: "flex",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            {Array.from({ length: totalSlides }, (_, index) => (
                              <div
                                key={index}
                                onClick={() => goToSlide(index)}
                                style={{
                                  width: "40px",
                                  height: "4px",
                                  backgroundColor:
                                    currentSlide === index ? "#007bff" : "#ccc",
                                  cursor: "pointer",
                                  transition: "background-color 0.3s ease",
                                }}
                              ></div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            textAlign: "center",
                            padding: "40px",
                            color: "#666",
                          }}
                        >
                          <FaGraduationCap
                            style={{
                              fontSize: "48px",
                              marginBottom: "16px",
                              color: "#ddd",
                            }}
                          />
                          <h3>No Training Courses Found</h3>
                          <p>
                            {activeTab === "all"
                              ? "No training courses are currently available."
                              : `No courses found in "${activeTab}" category.`}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @media (max-width: 768px) {
          .jobplugin__main {
            padding-left: 0 !important;
          }

          .jobplugin__tabset-normal ul {
            flex-wrap: wrap !important;
            gap: 15px !important;
            padding: 15px 15px 0 15px !important;
          }

          .jobplugin__slider-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .jobplugin__main-holder {
            padding: 10px !important;
          }
        }

        .jobplugin__slider-slide:hover {
          transform: translateY(-4px);
        }

        .jobplugin__article-box {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .jobplugin__article-box:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default CertificatesTrainings;