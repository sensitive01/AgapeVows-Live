import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  GraduationCap,
  FileSearch,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Search,
  Check,
} from "lucide-react";
import { FaSquarePen, FaSuitcase, FaUsers } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { getJobAndEmployerCount } from "../../api/services/projectServices";
import defaultAvatar from "../../../public/images/avatar-04.jpg"

const HomePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [locations, setLocations] = useState([
    "All Locations",
    "Bengaluru",
    "Kanakapura",
    "Mysuru",
    "Ramnagar",
    "Tumakuru",
    "Hassan",
    "Chikmagalur",
    "Mangalore",
    "Puttur",
    "Chennai",
    "Coimbatore",
    "India",
    "Remote",
  ]);
  const [jobTitles, setJobTitles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [employerCount, setEmployerCount] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      name: "Linda Svennsky",
      role: "Great quality i am 100% Satisfied",
      img: "/images/img_33.jpg",
      quote:
        "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta.",
    },
    {
      name: "Roman Lorance",
      role: "Great quality i am 100% Satisfied",
      img: "/images/img_34.jpg",
      quote:
        "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta.",
    },
    {
      name: "Petar Walim",
      role: "Great quality i am 100% Satisfied",
      img: "/images/img_35.png",
      quote:
        "Vestibulum orci felis, ullamcorper non conum non, ultrices ac nunc. Mauris non ligscipit, vulputate mi accumsan, dapi bus fe lam sed sapien dc nunc non,uiem non porta.",
    },
    {
      name: "Sarah Johnson",
      role: "Excellent platform for educators",
      img: "/images/img_36.jpg",
      quote:
        "I found my dream teaching job through EdProfio. The platform made it so easy to connect with schools that matched my qualifications.",
    },
    {
      name: "Michael Chen",
      role: "Highly recommended",
      img: defaultAvatar,
      quote:
        "As a school administrator, I've hired several qualified candidates through this platform. It saves us so much time in the recruitment process.",
    },
    {
      name: "Priya Patel",
      role: "Life-changing opportunity",
      img: defaultAvatar,
      quote:
        "Moving to a new country was stressful, but EdProfio helped me find a teaching position quickly. The support was exceptional.",
    },
  ];

  // Calculate how many slides we need based on testimonials length
  const totalSlides = Math.ceil(testimonials.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Function to get testimonials for current slide (3 per slide)
  const getCurrentTestimonials = () => {
    const startIndex = currentSlide * 3;
    const endIndex = startIndex + 3;
    return testimonials.slice(startIndex, endIndex);
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://api.edprofio.com/employer/fetchjobs"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();

        console.log("locations", data);

        // Default locations array
        const defaultLocations = [
          "All Locations",
          "Bengaluru",
          "Kanakapura",
          "Mysuru",
          "Ramnagar",
          "Tumakuru",
          "Hassan",
          "Chikmagalur",
          "Mangalore",
          "Puttur",
          "Chennai",
          "Coimbatore",
          "India",
          "Remote",
        ];

        // Extract unique locations from API data
        const apiLocations = [
          ...new Set(
            data.flatMap((job) =>
              job.isRemote ? ["Remote"] : [job.location || "India"]
            )
          ),
        ].filter(Boolean);

        // Combine default locations with API locations, removing duplicates
        const allLocations = [
          ...defaultLocations,
          ...apiLocations.filter((loc) => !defaultLocations.includes(loc)),
        ];

        // Extract unique job titles and categories
        const titles = [...new Set(data.map((job) => job.jobTitle))].filter(
          Boolean
        );
        const cats = [...new Set(data.map((job) => job.category))].filter(
          Boolean
        );

        // Calculate job counts per category
        const counts = {};
        data.forEach((job) => {
          if (job.category) {
            counts[job.category] = (counts[job.category] || 0) + 1;
          }
        });

        // setLocations(allLocations);
        setJobTitles(titles);
        setCategories(cats);
        setCategoryCounts(counts);
        setError(null);
      } catch (err) {
        setError(err.message);
        // Fallback to default locations if API fails
        setLocations([
          "All Locations",
          "Bengaluru",
          "Kanakapura",
          "Mysuru",
          "Ramnagar",
          "Tumakuru",
          "Hassan",
          "Chikmagalur",
          "Mangalore",
          "Puttur",
          "Chennai",
          "Coimbatore",
          "India",
          "Remote",
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getJobAndEmployerCount();
      if (response.status === 200) {
        setEmployerCount(response.data.employerCount);
        setJobCount(response.data.jobCount);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    // Prepare search parameters
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.append("keyword", searchTerm.trim());
    }

    if (location && location !== "All Locations") {
      params.append("location", location);
    }

    // Navigate to job vacancies with search parameters
    navigate(`/job-vacancies?${params.toString()}`);
  };

  const handleCategoryClick = (category) => {
    // Navigate to job vacancies with category filter
    navigate(`/job-vacancies?category=${encodeURIComponent(category)}`);
  };

  // Default categories with icons
  const defaultCategories = [
    {
      title: "Teaching Jobs",
      iconBlue: "/images/img_20.png",
      iconWhite: "/images/img_20_white.png",
      lucideIcon: null,
      apiCategoryMatch: "Education",
    },
    {
      title: "Leadership and Administration",
      iconBlue: "/images/leadership.png",
      iconWhite: "/images/leadership1.png",
      lucideIcon: null,
      apiCategoryMatch: "Leadership",
    },
    {
      title: "Support and Student Welfare",
      iconBlue: "/images/img_25.png",
      iconWhite: "/images/img_25_white.png",
      lucideIcon: null,
      apiCategoryMatch: "Support",
    },
    {
      title: "Extracurricular Activities",
      iconBlue: "/images/img_22.png",
      iconWhite: "/images/img_22_white.png",
      lucideIcon: null,
      apiCategoryMatch: "Extracurricular",
    },
    {
      title: "Curriculum and Content Development",
      iconBlue: "/images/img_23.png",
      iconWhite: "/images/img_23_white.png",
      lucideIcon: null,
      apiCategoryMatch: "Curriculum",
    },
    {
      title: "EdTech and Digital Learning",
      iconBlue: "/images/img_24.png",
      iconWhite: "/images/img_24_white.png",
      lucideIcon: null,
      apiCategoryMatch: "IT",
    },
    {
      title: "Special Education and Inclusive Learning",
      iconBlue: "/images/special.png",
      iconWhite: "/images/special1.png",
      lucideIcon: null,
      apiCategoryMatch: "Special Education",
    },
    {
      title: "Non-Teaching Staffs",
      iconBlue: null,
      iconWhite: null,
      lucideIcon: FaUsers,
      apiCategoryMatch: "Non-Teaching",
    },
    {
      title: "Training and Development",
      iconBlue: null,
      iconWhite: null,
      lucideIcon: FaSquarePen,
      apiCategoryMatch: "Training",
    },
    {
      title: "Research and Policy Development",
      iconBlue: null,
      iconWhite: null,
      lucideIcon: IoDocumentText,
      apiCategoryMatch: "Research",
    },
    {
      title: "Other Specialized Roles",
      iconBlue: null,
      iconWhite: null,
      lucideIcon: FaSuitcase,
      apiCategoryMatch: "Marketing",
    },
  ];

  // Merge default categories with actual categories from API
  const allCategories = defaultCategories.map((cat) => {
    // Find matching category from API data
    const apiCategory = Object.keys(categoryCounts).find(
      (c) =>
        c.toLowerCase() === (cat.apiCategoryMatch || cat.title).toLowerCase()
    );

    const count = apiCategory ? categoryCounts[apiCategory] : 0;

    return {
      ...cat,
      jobs: count > 0 ? count.toString() : "0",
      apiCategory: apiCategory || cat.title,
    };
  });

  return (
    <div>
      {/* Hero Section */}
      <div
        className="visual-block visual-theme-9 bg-white pt-100 pb-30 pb-md-80 pb-lg-140 text-white"
        style={{ backgroundImage: "none" }}
      >
        <div className="container position-relative">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-12 col-xl-12 position-relative">
              <div className="visual-textbox">
                <h2 align="center" className="text-secondary mb-0">
                  EdProfio: A Growing Platform For Today's Educators
                </h2>
                <p align="center" className="text-dark">
                  Join a community connected to 26 educational partners and explore 12+ career opportunities tailored to diverse skill sets.
                </p>

                {/* Search Form */}
                <form
                  className="form-search bg-light-sky"
                  onSubmit={handleSearch}
                  style={{ margin: "0px auto", borderRadius: "35px" }}
                >
                  <div className="fields-holder bg-white text-black d-flex flex-wrap flex-md-nowrap">
                    <div className="form-group">
                      <i className="icon icon-briefcase3 text-secondary"></i>
                      <input
                        className="form-control bg-white"
                        type="search"
                        placeholder="Job title, Keyword..."
                        style={{
                          width: "300px",
                          outline: "none",
                          boxShadow: "none",
                          color: "#333",
                        }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        disabled={loading}
                        list="jobTitles"
                      />
                      <datalist id="jobTitles">
                        {jobTitles.map((title, index) => (
                          <option key={`title-${index}`} value={title} />
                        ))}
                        {categories.map((category, index) => (
                          <option key={`cat-${index}`} value={category} />
                        ))}
                      </datalist>
                    </div>
                    <div className="form-group">
                      <i className="icon icon-map-pin text-secondary"></i>
                      <select
                        className="select2 bg-white"
                        name="state"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        style={{
                          border: "none",
                          boxShadow: "none",
                          outline: "none",
                        }}
                        disabled={loading}
                      >
                        {locations.map((loc, index) => (
                          <option key={`loc-${index}`} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    style={{ minWidth: "165px" }}
                    className="btn btn-blue btn-sm"
                    type="submit"
                    disabled={loading}
                  >
                    <span className="btn-text">
                      {loading ? (
                        "Loading..."
                      ) : (
                        <>
                          <FaSearch className="mr-1" /> &nbsp; Search Job
                        </>
                      )}
                    </span>
                  </button>
                  {error && (
                    <div className="text-danger small mt-2">
                      Couldn't load all locations: {error}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main">
        {/* Browse Categories Section */}
        <section
          className="section section-theme-9 browse_categories"
          style={{ backgroundImage: "url(/images/bg_img04.jpg)" }}
        >
          <div className="container">
            <div
              className="section-header text-center mb-40 mb-md-45"
              style={{ maxWidth: "800px" }}
            >
              <p>
                Advance Your Career with Leading Educational Institutions
              </p>
              <h2>
                <span className="text-outlined text-secondary">
                  Browse by Jobs Category
                </span>
              </h2>
              <b>
                Browse by category and explore roles that match your skills and ambitions.
              </b>
            </div>

            <div className="row">
              {/* Category Items */}
              {allCategories.map((category, index) => (
                <div
                  key={index}
                  className={`col-6 col-lg-4 col-xl-3 ${
                    index % 2 === 0 ? "pe-5" : "ps-5"
                  } mb-30 mb-md-50`}
                  align="center"
                  onClick={() => handleCategoryClick(category.apiCategory)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="info_box">
                    <div className="wrap_info">
                      <div className="icon_wrap">
                        {category.lucideIcon ? (
                          <>
                            <category.lucideIcon
                              className="blueImg"
                              size={32}
                              color="#3f71ef"
                            />
                            <category.lucideIcon
                              className="whiteImg"
                              size={32}
                              color="#ffffff"
                            />
                          </>
                        ) : category.iconBlue ? (
                          <>
                            <img
                              className="blueImg"
                              src={category.iconBlue}
                              alt="img"
                              width={
                                category.title ===
                                "Leadership and Administration"
                                  ? "70%"
                                  : ""
                              }
                            />
                            <img
                              className="whiteImg"
                              src={category.iconWhite}
                              alt="img"
                              width={
                                category.title ===
                                "Leadership and Administration"
                                  ? "70%"
                                  : ""
                              }
                            />
                          </>
                        ) : null}
                      </div>
                      <div className="text_wrap">
                        <strong className="title">{category.title}</strong>
                        <hr />
                        <p>{category.jobs} Jobs available</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Images between categories */}
              <div className="col-12 col-xl-3 mb-15 browse_categories_image">
                <img
                  src="/images/image.jpg"
                  width="100%"
                  style={{ borderRadius: "20px" }}
                  alt="Education"
                />
              </div>
              <div className="col-12 col-xl-3 mb-15 browse_categories_image1">
                <img
                  src="/images/image.jpg"
                  width="100%"
                  style={{ borderRadius: "20px" }}
                  alt="Education"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Jobs Waiting Section */}
        <section className="section section-theme-9 jobs_waiting bg-light-sky">
          <div className="container">
            <div className="holder">
              <div className="left_align">
                <div className="icon-hold">
                  <img src="/images/img_39.svg" alt="Jobs" />
                </div>
                <div className="text-white">
                  <h2 className="text-secondary">Your Ideal Jobs Awaits.</h2>
                  <p className="text-dark fw-bold">
                    Discover over 1 Million job opportunities, find the one that's meant for you.
                  </p>
                </div>
              </div>
              <div className="right_align">
                <Link to="/job-vacancies" className="btn btn-white btn-sm">
                  <i className="icon icon-search"></i> &nbsp; Search Job
                </Link>
                {/* <Link to="/job-vacancies" className="btn btn-secondary btn-sm">
                  <span className="btn-text">
                    <i
                      className="icon icon-users text-primary"
                      style={{ fontSize: "13px" }}
                    ></i>{" "}
                    &nbsp; Apply Job
                  </span>
                </Link> */}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="section section-theme-9 works_area">
          <div className="container">
            <div className="section-header text-center">
              <h2>
                <span className="text-outlined text-secondary">
                  How It Works?
                </span>
              </h2>
              <p>
                <b>for Job Seekers</b>
              </p>
            </div>
            <div className="row">
              {[
                {
                  step: "01",
                  title: "Sign Up/Register",
                  description:
                    "Begin by creating a profile on our website. This step allows you to highlight your qualifications, experience, and skills to attract potential employers.",
                  icon: "/images/img_14.svg",
                },
                {
                  step: "02",
                  title: "Career Search",
                  description:
                    "After setting up your profile, you can easily browse for job opportunities. Use filters like location, job title, or specific keywords to find the right match.",
                  icon: "/images/img_15.svg",
                },
                {
                  step: "03",
                  title: "Apply Now",
                  description:
                    "Once you find a job that interests you, simply apply directly through our platform, streamlining the process and saving you valuable time.",
                  icon: "/images/img_16.svg",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="col-12 mb-30 mb-lg-0 col-lg-4 d-flex"
                >
                  <div
                    className="works_info_column"
                    style={{
                      border: "1px solid #063970",
                      borderRadius: "5px",
                      backgroundImage: "url(/images/bg-visual-15.jpg)",
                    }}
                  >
                    <div className="wrap">
                      <strong className="title">
                        {step.step}. {step.title}
                      </strong>
                      <div className="img_holder shadow">
                        <img src={step.icon} alt="step" />
                      </div>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get Hired Section */}
        <section className="section section-theme-1 section-how-works pt-45 pt-md-50 pt-lg-65 pt-xl-85 pt-xxl-110 pb-60 pb-md-80 pb-xl-85 pb-xxl-110 pb-xxxl-150 bg-light">
          <div className="container">
            <header className="section-header text-center mb-30 mb-md-45 mb-xl-60">
              <h3 className="text-dark mb-0">
                <b>04. Get Hired</b>
              </h3>
            </header>
            <div className="row mb-lg-60 mb-xl-90">
              {[
                {
                  step: "4.1",
                  title: "Interview Scheduling",
                  description:
                    "Employers can schedule interviews with selected candidates through the platform.",
                  icon: "/images/line-icon06.png",
                },
                {
                  step: "4.2",
                  title: "Online Interviews",
                  description:
                    "Conduct interviews seamlessly with video integrated conferencing tools.",
                  icon: "/images/line-icon07.png",
                },
                {
                  step: "4.3",
                  title: "Offer Letter",
                  description:
                    "Employer can send job offers directly to candidates via the platform, simplifying the hiring process.",
                  icon: "/images/line-icon08.png",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="col-4 col-md-4 text-center mb-30 mb-md-0"
                >
                  <div className="how-work-box">
                    <div className="icon bg-primary">
                      <img src={step.icon} alt="Step" />
                    </div>
                    <strong className="num">{step.step}</strong>
                    <strong className="h5 text-secondary">{step.title}</strong>
                    <p align="center" style={{ fontSize: "14px" }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              <div className="col-12">
                <div
                  className="matched-jobs-block shadow border border-dark"
                  style={{ backgroundImage: "url(/images/bg-visual-15.jpg)" }}
                >
                  <div className="bg-pattern">
                    <img
                      src="/images/bg-pattern-overlay1.jpg"
                      alt="bg Pattern"
                    />
                  </div>
                  <div className="section-header">
                    <h2 className="text-secondary">
                      Find your Perfect Candidates in a few{" "}
                      <span className="text-outlined">minutes</span>.
                    </h2>
                    <p className="text-dark">
                      Discover talented professionals & hire from the leading
                      talent pool.{" "}
                    </p>
                    <Link
                      to="/post-job"
                      className="btn btn-blue fw-bold border border-dark shadow"
                    >
                      <span className="btn-text">
                        <i className="icon-briefcase"></i>&nbsp;Post a Job
                      </span>
                    </Link>
                  </div>
                  <div className="image-holder">
                    <img
                      src="/images/image-circle.png"
                      width="462"
                      height="436"
                      alt="Perfect Candidates"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    
        {/* Testimonials Section with Manual Slider */}
        <section
          className="section section-theme-9 featured_Jobs_Block"
          style={{ padding: "80px 0px" }}
        >
          <div className="container">
            <div className="client_testimonials">
              <header className="section-header">
                <h2 className="text-secondary">Client's Testimonials</h2>
                <p>
                  1,00,000+ satisfied Employer and candidates. What they said.
                </p>
              </header>

              {testimonials.length <= 3 ? (
                // If 3 or fewer testimonials, show them all without slider
                <div className="row">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="col-md-4 mb-4">
                      <div
                        className="client_review border border-dark"
                        style={{ height: "100%" }}
                      >
                        <div className="heading_bar">
                          <div className="text_wrap">
                            <strong className="h5">{testimonial.name}</strong>
                            <span className="text">{testimonial.role}</span>
                          </div>
                          <div className="img_wrap">
                            <img src={testimonial.img} alt="Client" />
                          </div>
                        </div>
                        <div className="stars_bar">
                          <div className="stars_wrap">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="icon icon-star"></i>
                            ))}
                          </div>
                        </div>
                        <p>"{testimonial.quote}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // If more than 3 testimonials, show manual slider
                <div
                  className="testimonials-slider-container"
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "400px",
                  }}
                >
                  {/* Navigation Buttons */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      prevSlide();
                    }}
                    className="slider-nav prev-btn"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "-5px",
                      transform: "translateY(-50%)",
                      zIndex: 1000,
                      background: "rgba(63, 113, 239, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(63, 113, 239, 0.4)",
                      pointerEvents: "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(63, 113, 239, 1)";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(63, 113, 239, 0.9)";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1)";
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextSlide();
                    }}
                    className="slider-nav next-btn"
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "-5px",
                      transform: "translateY(-50%)",
                      zIndex: 1000,
                      background: "rgba(63, 113, 239, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "50px",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: "white",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(63, 113, 239, 0.4)",
                      pointerEvents: "auto",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(63, 113, 239, 1)";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(63, 113, 239, 0.9)";
                      e.currentTarget.style.transform =
                        "translateY(-50%) scale(1)";
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>

                  {/* Slides Container */}
                  <div className="row">
                    {getCurrentTestimonials().map((testimonial, index) => (
                      <div
                        key={`current-${currentSlide}-${index}`}
                        className="col-md-4 mb-4"
                      >
                        <div
                          className="client_review border border-dark"
                          style={{ height: "100%" }}
                        >
                          <div className="heading_bar">
                            <div className="text_wrap">
                              <strong className="h5">{testimonial.name}</strong>
                              <span className="text">{testimonial.role}</span>
                            </div>
                            <div className="img_wrap">
                              <img src={testimonial.img} alt="Client" />
                            </div>
                          </div>
                          <div className="stars_bar">
                            <div className="stars_wrap">
                              {[...Array(5)].map((_, i) => (
                                <i key={i} className="icon icon-star"></i>
                              ))}
                            </div>
                          </div>
                          <p>"{testimonial.quote}"</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dots Navigation */}
                  <div
                    className="slider-dots"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "30px",
                      gap: "10px",
                    }}
                  >
                    {Array(totalSlides)
                      .fill()
                      .map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToSlide(index)}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: "none",
                            background:
                              currentSlide === index ? "#3f71ef" : "#ccc",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                          }}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* App Download Section */}
        <section className="apps-block section-theme-9 bg-light-sky">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-lg-5">
                <div className="text">
                  <h2 className="text-secondary" style={{ lineHeight: "48px" }}>
                    App Available Now – Finds Them For You Right Job.
                  </h2>
                  <hr />
                  <p style={{ marginBottom: "20px" }}>
                    <strong>Your Future – Just a Tap Away</strong>
                  </p>
                  <div style={{ marginBottom: "20px" }}>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <Check size={20} color="#3f71ef" style={{ marginRight: "10px" }} />
                      <span><strong>Smart Job Matching</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <Check size={20} color="#3f71ef" style={{ marginRight: "10px" }} />
                      <span><strong>Instant Notifications</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <Check size={20} color="#3f71ef" style={{ marginRight: "10px" }} />
                      <span><strong>Easy Apply</strong></span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                      <Check size={20} color="#3f71ef" style={{ marginRight: "10px" }} />
                      <span><strong>Verified Employers & Candidates</strong></span>
                    </div>
                  </div>
                  <div className="download-btns">
                    <Link className="btn-app btn-play-store blue-btn" to="#">
                      <div className="store-icon">
                        <img
                          src="/images/icon-play-store.png"
                          width="28"
                          height="30"
                          alt="Google Play"
                        />
                      </div>
                      <div className="btn-text">
                        Download From <span>Google Play</span>
                      </div>
                    </Link>
                    <Link className="btn-app btn-app-store" to="#">
                      <div className="store-icon">
                        <img
                          src="/images/icon-app-store.png"
                          width="32"
                          height="38"
                          alt="App Store"
                        />
                      </div>
                      <div className="btn-text">
                        Download From <span>App Store</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-7">
                <div className="image-holder d-flex justify-content-center">
                  <img src="/images/image.png" alt="App Preview" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Let Employers Find You Section */}
        <section className="section section-theme-9 bg-white" style={{ padding: "60px 0px" }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6">
                <div className="text-content">
                  <h2 className="text-secondary mb-4">
                    <strong>Let Employers Find You</strong>
                  </h2>
                  <p className="text-dark mb-4">
                    Tap into the best employers zone designed to simplify hiring and speed up your on boarding.
                  </p>
                  <Link to="/register" className="btn btn-blue btn-lg">
                    <i className="icon icon-user-plus"></i> Upload Profile
                  </Link>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="image-holder text-center">
                  <img 
                    src="/images/employers-find-you.png" 
                    alt="Let Employers Find You" 
                    style={{ maxWidth: "100%", height: "auto" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;