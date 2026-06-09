import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import CopyRights from "../components/CopyRights";
import UserSideBar from "../components/UserSideBar";
import LayoutComponent from "../components/layouts/LayoutComponent";
import {
  newProfileMatch,
  getUserProfile,
  getMyActivePlanData,
} from "../api/axiosService/userAuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlanDetails from "./userdashboard/PlanDetails";
import ProfileCompletion from "./userdashboard/ProfileCompletion";

import DashboardSearchComponent from "./userdashboard/DashboardSearchComponent";
import ActivePlanCard from "./userdashboard/ActivePlanCard";
import MembershipBadge from "../components/common/MembershipBadge";

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [profileMatches, setProfileMatches] = useState([]);
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const chartRef = useRef(null);
  const hasInitialized = useRef(false);
  const [userInfo, setUserInfo] = useState(null);
  const [activePlan, setActivePlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.purchaseSuccess && location.state?.planDetails) {
      const plan = location.state.planDetails;

      const formatNum = (val) => {
        if (val === "NaN" || Number.isNaN(val) || String(val).toLowerCase() === "unlimited" || val === 0) return "Unlimited";
        return val;
      };

      Swal.fire({
        title: '🎉 Congratulations!',
        html: `
          <div style="text-align: left; background: #f8f9fa; padding: 15px; border-radius: 8px; font-size: 14px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
              <div><strong>Plan:</strong> <span style="color: #4a2580; font-weight: 600;">${plan.name}</span></div>
              <div><strong>Price:</strong> ₹${plan.price}</div>
              <div><strong>Duration:</strong> ${plan.duration} ${plan.durationType}</div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
              
              <div>
                <h6 style="color: #4a2580; font-weight: bold; margin-bottom: 5px; font-size: 14px;">Profile Views</h6>
                <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 13px; line-height: 1.6;">
                  <li>✔ Total Limit: <strong>${formatNum(plan.maxProfiles)}</strong></li>
                  <li>✔ Daily Limit: <strong>${formatNum(plan.dailyLimit)}</strong></li>
                  <li>✔ Can View: <strong>${plan.canViewProfiles}</strong></li>
                </ul>
              </div>

              <div>
                <h6 style="color: #4a2580; font-weight: bold; margin-bottom: 5px; font-size: 14px;">Contact & Interests</h6>
                <ul style="list-style-type: none; padding: 0; margin: 0; font-size: 13px; line-height: 1.6;">
                  <li>✔ View Contacts: <strong>${plan.viewContactDetails}</strong></li>
                  ${plan.viewContactDetails !== 'No' && plan.viewContactDetails !== '0' && plan.viewContactDetails !== false ? `
                    <li style="color: #555; padding-left: 15px;">Total: ${formatNum(plan.maxViewContact)} | Daily: ${formatNum(plan.dailyLimitViewContact)}</li>
                  ` : ''}
                  <li style="margin-top: 4px;">✔ Send Interests: <strong>${plan.sendInterestRequest}</strong></li>
                  ${plan.sendInterestRequest !== 'No' && plan.sendInterestRequest !== '0' && plan.sendInterestRequest !== false ? `
                    <li style="color: #555; padding-left: 15px;">Total: ${formatNum(plan.maxSendInterest)} | Daily: ${formatNum(plan.dailyLimitSendInterest)}</li>
                  ` : ''}
                </ul>
              </div>

            </div>
          </div>
        `,
        icon: 'success',
        confirmButtonColor: '#4a2580',
        confirmButtonText: 'Start Exploring',
        width: '550px'
      });

      // Clear the state so it doesn't pop up again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        try {
          setLoading(true);
          setPlanLoading(true);

          const [userRes, planRes] = await Promise.all([
            getUserProfile(userId),
            getMyActivePlanData(userId)
          ]);

          if (userRes.data && userRes.data.data) {
            setUserInfo(userRes.data.data);
          } else if (userRes.data) {
            setUserInfo(userRes.data);
          }

          if (planRes.status === 200 && planRes.data?.activePlan) {
            setActivePlan(planRes.data.activePlan);
          } else {
            setActivePlan(null);
          }
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setError("Failed to load dashboard information");
        } finally {
          setLoading(false);
          setPlanLoading(false);
        }
      }
    };
    fetchData();
  }, [userId]);

  const destroySlider = () => {
    if (
      sliderRef.current &&
      typeof window.$ !== "undefined" &&
      window.$(sliderRef.current).hasClass("slick-initialized")
    ) {
      try {
        window.$(sliderRef.current).slick("unslick");
      } catch (error) {
        console.warn("Error destroying slider:", error);
      }
    }
  };

  const initializeSlider = () => {
    if (
      profileMatches.length > 0 &&
      sliderRef.current &&
      typeof window.$ !== "undefined" &&
      window.$.fn.slick
    ) {
      try {
        destroySlider();

        setTimeout(() => {
          if (sliderRef.current) {
            // Determine how many slides we have in the DOM. 
            // We'll duplicate the array in the render function to ensure there are always > 5 items if we have at least 1 match.
            window.$(sliderRef.current).slick({
              infinite: true,
              slidesToShow: 5,
              arrows: true,
              prevArrow: '<button type="button" class="slick-prev" style="position: absolute; top: 50%; left: -50px; transform: translateY(-50%); z-index: 10; background: transparent; color: #2d3748; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;"><i class="fa fa-angle-left" style="font-size: 32px;"></i></button>',
              nextArrow: '<button type="button" class="slick-next" style="position: absolute; top: 50%; right: -20px; transform: translateY(-50%); z-index: 10; background: transparent; color: #2d3748; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;"><i class="fa fa-angle-right" style="font-size: 32px;"></i></button>',
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 4000,
              dots: false,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: Math.min(2, profileMatches.length),
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                  },
                },
              ],
            });
          }
        }, 100);
      } catch (error) {
        console.error("Error initializing slider:", error);
      }
    }
  };

  const fetchProfileMatches = async () => {
    try {
      setLoading(true);
      const response = await newProfileMatch(userId);

      if (response.status === 200) {
        setProfileMatches(response.data.matches);
        setAllProfiles(response.data.matches);
      } else if (Array.isArray(response)) {
        setProfileMatches(response);
        setAllProfiles(response);
      } else {
        setProfileMatches([]);
        setAllProfiles([]);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching profile matches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchData) => {
    try {
      setSearchLoading(true);
      console.log("Searching with data:", searchData);

      let filteredProfiles = [...allProfiles];

      if (searchData.lookingFor) {
        filteredProfiles = filteredProfiles.filter((profile) => {
          if (searchData.lookingFor === "Groom") {
            return profile.gender === "Male" || profile.gender === "male";
          } else {
            return profile.gender === "Female" || profile.gender === "female";
          }
        });
      }

      if (searchData.ageFrom && searchData.ageTo) {
        filteredProfiles = filteredProfiles.filter((profile) => {
          const age = parseInt(profile.age);
          return age >= searchData.ageFrom && age <= searchData.ageTo;
        });
      }

      if (searchData.community) {
        filteredProfiles = filteredProfiles.filter(
          (profile) =>
            profile.community &&
            profile.community
              .toLowerCase()
              .includes(searchData.community.toLowerCase()),
        );
      }

      if (searchData.location) {
        filteredProfiles = filteredProfiles.filter(
          (profile) =>
            profile.city &&
            profile.city
              .toLowerCase()
              .includes(searchData.location.toLowerCase()),
        );
      }

      setProfileMatches(filteredProfiles);
      setError(null);
    } catch (err) {
      console.error("Error searching profiles:", err);
      setError("Failed to search profiles. Please try again.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProfileClick = (targetUser, e) => {
    if (!userId) {
      navigate("/user/user-login");
      return;
    }

    const myActivePlan = userInfo?.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const myCanViewRaw = myActivePlan?.canViewProfiles || "All Profiles";
    const myCanView = myCanViewRaw.toString().trim().toLowerCase();

    const targetActivePlan = targetUser?.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const targetPlanName = targetActivePlan?.subscriptionType?.toLowerCase() || "";

    console.log("My Dashboard Plan:", myCanView);
    console.log("Target Dashboard Plan:", targetPlanName);

    const isTargetPlatinumOrGold =
      targetPlanName.includes("platinum") ||
      targetPlanName.includes("gold") ||
      targetPlanName.includes("golden");

    if (!myCanView.includes("all")) {
      if (myCanView === "only basic" && targetPlanName && !targetPlanName.includes("basic")) {
        console.log("🚫 Restricted: Basic user clicking non-Basic profile");
        toast.error("Your plan only allows viewing Basic profiles. Please upgrade to access other profiles.", {
          position: "top-center",
          autoClose: 30000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      if (myCanView === "only premium" && isTargetPlatinumOrGold) {
        console.log("🚫 Restricted: Premium user clicking Golden/Platinum profile");
        toast.error("Upgrade your plan to view Platinum and Golden Membership profiles.", {
          position: "top-center",
          autoClose: 30000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }
    }

    console.log("✅ Navigating to profile detail");
    if (e && (e.ctrlKey || e.metaKey)) {
      const newTab = window.open(`/profile-more-details/${targetUser._id}`, '_blank');
      if (newTab) newTab.focus();
    } else {
      navigate(`/profile-more-details/${targetUser._id}`);
    }
  };

  // Initialize components on first load
  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("userDashboardReloaded");
    if (!hasReloaded) {
      sessionStorage.setItem("userDashboardReloaded", "true");
      window.location.reload();
      return;
    }

    const initializeComponents = () => {
      if (typeof window.$ !== "undefined") {
        window.$(".count").each(function () {
          window
            .$(this)
            .prop("Counter", 0)
            .animate(
              {
                Counter: window.$(this).text(),
              },
              {
                duration: 4000,
                easing: "swing",
                step: function (now) {
                  window.$(this).text(Math.ceil(now));
                },
              },
            );
        });

        if (window.$.fn.tooltip) {
          window.$('[data-bs-toggle="tooltip"]').tooltip();
        }
      }

      if (typeof window.Chart !== "undefined" && !chartRef.current) {
        const chartElement = document.getElementById("Chart_leads");
        if (chartElement) {
          const xValues = ["0"];
          const yValues = [50];

          chartRef.current = new window.Chart(chartElement, {
            type: "line",
            data: {
              labels: xValues,
              datasets: [
                {
                  fill: false,
                  lineTension: 0,
                  backgroundColor: "#f1bb51",
                  borderColor: "#fae9c8",
                  data: yValues,
                },
              ],
            },
            options: {
              responsive: true,
              legend: { display: false },
              scales: {
                yAxes: [{ ticks: { min: 0, max: 100 } }],
              },
            },
          });
        }
      }

      hasInitialized.current = true;
    };

    if (!hasInitialized.current) {
      const timer = setTimeout(initializeComponents, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    fetchProfileMatches();
  }, [userId]);

  // Re-initialize slider when profile matches change
  useEffect(() => {
    if (profileMatches.length > 0 && hasInitialized.current) {
      initializeSlider();
    }
  }, [profileMatches]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      destroySlider();
      if (chartRef.current) {
        try {
          chartRef.current.destroy();
        } catch (error) {
          console.warn("Error destroying chart:", error);
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div className="db">
          <div
            className="container-fluid"
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
              {/* Sidebar - Left Column */}
              <div
                className="col-md-3 col-lg-2"
                style={{ paddingLeft: 0, marginLeft: "0px" }}
              >
                <UserSideBar />
              </div>

              {/* Dashboard Content - Right Column */}
              <div
                className="col-md-9 col-lg-10"
                style={{ paddingLeft: "20px", paddingRight: "15px" }}
              >
                {/* Search Component */}
                {/* Search Component Removed as per request (replaced by Global Search in Header) */}
                {/* <div className="row">
                  <div className="col-md-12">
                     <DashboardSearchComponent
                      onSearch={handleSearch}
                      loading={searchLoading}
                    /> 
                  </div>
                </div> */}

                {/* Profile Matches Section */}
                <div className="row">
                  <div className="col-md-12 db-sec-com db-new-pro-main">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h2 className="db-tit mb-0 d-flex align-items-center">
                        Profile Matches
                        {profileMatches.length > 0 && (
                          <span className="badge bg-primary ms-2 me-3">
                            {profileMatches.length}
                          </span>
                        )}
                        {profileMatches.length === 0 && <span className="me-3"></span>}
                        <span
                          style={{ fontSize: '14px', color: '#00bcd5', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}
                          onClick={() => navigate('/show-searched-result', { state: { isMatchSearch: true } })}
                        >
                          View All
                        </span>
                      </h2>
                      <div className="d-flex align-items-center">
                        {loading && (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {profileMatches.length > 0 ? (
                      (() => {
                        // If we have 5 or fewer profiles, duplicate them so infinite scroll works properly
                        const displayProfiles = profileMatches.length <= 5
                          ? [...profileMatches, ...profileMatches, ...profileMatches]
                          : profileMatches;

                        return (
                          <div style={{ position: "relative", padding: "0 20px" }}>
                            <style>
                              {`
                                .slider .slick-list {
                                  overflow: hidden !important;
                                  margin: 0 !important;
                                  padding: 0 !important;
                                }
                                .slider .slick-prev, .slider .slick-next {
                                  z-index: 10 !important;
                                }
                              `}
                            </style>
                            <ul className="slider" ref={sliderRef} key={profileMatches.map((p, i) => p._id || i).join('-')} style={{ margin: 0, padding: 0 }}>
                              {displayProfiles.map((profile, index) => (
                                <li key={(profile._id || 'match') + "-" + index}>
                                  <div
                                    className="db-new-pro"
                                    style={{ position: "relative", paddingTop: "10px", cursor: "pointer" }}
                                    onClick={(e) => handleProfileClick(profile, e)}
                                  >
                                    {/* ✅ Badges - TOP LEFT */}
                                    <style>
                                      {`
                                  .db-new-pro .top-left-badges div {
                                    position: relative !important;
                                    bottom: auto !important;
                                    left: auto !important;
                                    right: auto !important;
                                  }
                                  .badge-card-wrapper {
                                    background: rgba(255, 255, 255, 0.9);
                                    padding: 3px;
                                    border-radius: 6px;
                                    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                                    display: inline-flex;
                                  }
                                  .badge-card-wrapper:empty {
                                    display: none !important;
                                    padding: 0;
                                  }
                                `}
                                    </style>
                                    <span className="top-left-badges" style={{
                                      position: 'absolute',
                                      top: '8px',
                                      left: '8px',
                                      zIndex: 10,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      gap: '6px',
                                      alignItems: 'flex-start',
                                    }}>
                                      <span className="badge-card-wrapper">
                                        <MembershipBadge user={profile} isMini={true} isMinimal={true} />
                                      </span>
                                      {profile.idVerificationStatus === 'Verified' && (
                                        <span className="badge bg-success shadow-sm" style={{ fontSize: "11px", display: "flex", alignItems: "center", gap: "4px", padding: "4px 8px", margin: 0 }}>
                                          <i className="fa fa-check-circle"></i> Verified
                                        </span>
                                      )}
                                    </span>

                                    <img
                                      src={
                                        profile.profileImage ||
                                        "images/profiles/default.jpg"
                                      }
                                      alt={`${profile.userName}'s Profile`}
                                      className="profile"
                                      onError={(e) => {
                                        e.target.src = "images/profiles/default.jpg";
                                      }}
                                    />

                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "5px",
                                        top: "35%",
                                        color: "rgba(255, 255, 255, 0.45)",
                                        fontFamily: "'Outfit', 'Inter', sans-serif",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        letterSpacing: "2px",
                                        whiteSpace: "nowrap",
                                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.6)",
                                        writingMode: "vertical-rl",
                                        transform: "rotate(180deg)",
                                        pointerEvents: "none",
                                        userSelect: "none",
                                        zIndex: 5,
                                      }}
                                    >
                                      AgapeVows.com
                                    </span>

                                    <div style={{ padding: '0px 10px 10px' }}>
                                      <h5 style={{ margin: '5px 0', fontSize: '15px', fontWeight: 'bold' }}>
                                        {profile.agwid || profile.userName}
                                      </h5>
                                      
                                      <div style={{ fontSize: '13px', color: '#555', marginBottom: '3px' }}>
                                        {[
                                          profile.motherTongue,
                                          profile.age && `${profile.age} Yrs`,
                                          profile.height
                                        ].filter(Boolean).join(", ")}
                                      </div>

                                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {[profile.religion, profile.caste].filter(Boolean).join(", ")}
                                      </div>

                                      <div style={{ fontSize: '12px', color: '#666', marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {[profile.education || profile.degree, profile.occupation || profile.jobType].filter(Boolean).join(", ")}
                                      </div>

                                      <div style={{ fontSize: '12px', color: '#666' }}>
                                        {[profile.city, profile.state].filter(Boolean).join(", ")}
                                      </div>
                                    </div>
                                    <div
                                      className="fclick"
                                    >
                                      &nbsp;
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })()
                    ) : (
                      !loading && (
                        <div className="alert alert-info" role="alert">
                          No profile matches found for your search criteria.
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="row g-4" style={{ marginTop: "0px" }}>
                  <ProfileCompletion userData={userInfo} />

                  {!planLoading && (
                    <>
                      <PlanDetails externalPlanData={activePlan} />
                      {activePlan && <ActivePlanCard externalPlanData={activePlan} />}
                    </>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
