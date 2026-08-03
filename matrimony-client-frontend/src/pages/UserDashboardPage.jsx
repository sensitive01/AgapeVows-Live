import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
import "./public/dashboard.css";
import PlanDetails from "./userdashboard/PlanDetails";
import ProfileCompletion from "./userdashboard/ProfileCompletion";

import DashboardSearchComponent from "./userdashboard/DashboardSearchComponent";
import ActivePlanCard from "./userdashboard/ActivePlanCard";
import MembershipBadge from "../components/common/MembershipBadge";
import defaultProfileImg from "../assets/images/blue-circle-with-white-user_78370-4707.avif";
import { useProfileNavigation } from "../hooks/useProfileNavigation";

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { navigateToProfile, renderLimitPopup, executeIfUnrestricted } = useProfileNavigation();
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
            <p style="text-align: center; color: #333; margin-top: 0; margin-bottom: 15px; font-size: 15px;">
              You've made a fantastic choice! The <strong>${plan.name}</strong> plan unlocks great features to help you find your perfect match.
            </p>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 15px;">
              <div><strong>Plan:</strong> <span style="color: #4a2580; font-weight: 600;">${plan.name}</span></div>
              <div><strong>Price:</strong> ₹${plan.price}</div>
              <div><strong>Duration:</strong> ${plan.duration} ${plan.durationType}</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; background: #fff; padding: 15px 10px; border-radius: 8px; border: 1px solid #eee;">
              
              <div>
                <h6 style="color: #4a2580; font-weight: bold; margin-bottom: 8px; font-size: 13px;">Profile Views</h6>
                <div style="font-size: 13px; color: #333;">
                  <div style="margin-bottom: 4px;">Total: <strong>${formatNum(plan.maxProfiles)}</strong></div>
                  <div>Daily: <strong>${formatNum(plan.dailyLimit)}</strong></div>
                </div>
              </div>

              <div style="border-left: 1px solid #eee; border-right: 1px solid #eee; padding: 0 5px;">
                <h6 style="color: #4a2580; font-weight: bold; margin-bottom: 8px; font-size: 13px;">Send Interests</h6>
                <div style="font-size: 13px; color: #333;">
                  ${plan.sendInterestRequest !== 'No' && plan.sendInterestRequest !== '0' && plan.sendInterestRequest !== false ? `
                    <div style="margin-bottom: 4px;">Total: <strong>${formatNum(plan.maxSendInterest)}</strong></div>
                    <div>Daily: <strong>${formatNum(plan.dailyLimitSendInterest)}</strong></div>
                  ` : `<div style="color: #d9534f; font-weight: 500; margin-top: 10px;">No Access</div>`}
                </div>
              </div>

              <div>
                <h6 style="color: #4a2580; font-weight: bold; margin-bottom: 8px; font-size: 13px;">Contact Info</h6>
                <div style="font-size: 13px; color: #333;">
                  ${plan.viewContactDetails !== 'No' && plan.viewContactDetails !== '0' && plan.viewContactDetails !== false ? `
                    <div style="margin-bottom: 4px;">Total: <strong>${formatNum(plan.maxViewContact)}</strong></div>
                    <div>Daily: <strong>${formatNum(plan.dailyLimitViewContact)}</strong></div>
                  ` : `<div style="color: #d9534f; font-weight: 500; margin-top: 10px;">No Access</div>`}
                </div>
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

          try {
            const userRes = await getUserProfile(userId);
            if (userRes.data && userRes.data.data) {
              setUserInfo(userRes.data.data);
            } else if (userRes.data) {
              setUserInfo(userRes.data);
            }
          } catch (err) {
            console.error("Error fetching user profile:", err);
            // We can still continue if the profile fails, or handle it specifically
          }

          try {
            const planRes = await getMyActivePlanData(userId);
            if (planRes.status === 200 && planRes.data?.activePlan) {
              setActivePlan(planRes.data.activePlan);
            } else {
              setActivePlan(null);
            }
          } catch (planErr) {
            setActivePlan(null);
          }
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
              accessibility: false,
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

  const handleSendInterest = async (agwid) => {
    executeIfUnrestricted(async () => {
      try {
        const response = await userSendInterestRequest(userId, agwid);
        
        if (response.status === 200) {
          toast.success(response.data.message || "Interest request sent successfully", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send interest request", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    });
  };

  const fetchProfileMatches = async () => {
    if (!userId) return;
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

      if (searchData.community && searchData.community !== "Any") {
        filteredProfiles = filteredProfiles.filter(
          (profile) =>
            profile.denomination &&
            profile.denomination
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
    executeIfUnrestricted(() => {
      if (!userId) {
        navigate("/sign-in");
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

    const isTargetPlatinumOrGold =
      targetPlanName.includes("platinum") ||
      targetPlanName.includes("gold") ||
      targetPlanName.includes("golden");

    if (!myCanView.includes("all")) {
      if (myCanView === "only basic" && targetPlanName && !targetPlanName.includes("basic")) {
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

      navigateToProfile(targetUser._id, userId, e);
    });
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
      {renderLimitPopup()}
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      {/* Main Content Area */}
      <div style={{ paddingTop: "100px", paddingBottom: "40px" }}>
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

                {userInfo && userInfo.idVerificationStatus !== 'Verified' && (
                  <div className="alert alert-warning d-flex align-items-start mb-4" role="alert" style={{ backgroundColor: '#fff3cd', color: '#664d03', border: '1px solid #ffeeba', borderRadius: '8px', padding: '15px' }}>
                    <i className="fa fa-exclamation-triangle" style={{ fontSize: '24px', marginRight: '15px', marginTop: '6px' }}></i>
                    <div style={{ fontSize: '15px' }}>
                      <p className="mb-2">
                        <strong>Action Required:</strong> Complete your profile verification and receive the <b>'Verified'</b> badge today! Please submit your Government-issued masked ID to verify your profile immediately. Accounts that remain unverified after the grace period may be suspended without prior notice. Please <Link to="/user/user-profile-page#id-proof-upload" style={{ color: '#0056b3', textDecoration: 'underline', fontWeight: 'bold' }}>click here</Link> to upload your ID proof.
                      </p>
                      <p className="mb-0">
                        Thank you for helping us keep AgapeVows safe and trusted for everyone. Your Government-issued ID will be stored securely, used only for verification purposes, and will never be shared with anyone.
                      </p>
                    </div>
                  </div>
                )}

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
                        const displayProfiles = profileMatches;

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
                                .slider:not(.slick-initialized) {
                                  display: flex;
                                  overflow: hidden;
                                }
                                .slider:not(.slick-initialized) li {
                                  flex: 0 0 20%;
                                  max-width: 20%;
                                  padding: 0 5px;
                                  list-style: none;
                                }
                                @media (max-width: 992px) { .slider:not(.slick-initialized) li { flex: 0 0 33.33%; max-width: 33.33%; } }
                                @media (max-width: 768px) { .slider:not(.slick-initialized) li { flex: 0 0 50%; max-width: 50%; } }
                                @media (max-width: 576px) { .slider:not(.slick-initialized) li { flex: 0 0 100%; max-width: 100%; } }
                              `}
                            </style>
                            <ul className="slider" ref={sliderRef} key={profileMatches.map((p, i) => p._id || i).join('-')} style={{ margin: 0, padding: 0 }}>
                              {displayProfiles.map((profile, index) => (
                                <li key={(profile._id || 'match') + "-" + index}>
                                  <div
                                    className="db-new-pro"
                                    style={{ position: "relative", paddingTop: "10px", cursor: "pointer" }}
                                    onClick={(e) => executeIfUnrestricted(() => handleProfileClick(profile, e))}
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
                                        profile.profileImage || defaultProfileImg
                                      }
                                      alt={`${profile.userName}'s Profile`}
                                      className="profile"
                                      onError={(e) => {
                                        e.target.src = defaultProfileImg;
                                      }}
                                    />

                                    <span
                                      style={{
                                        position: "absolute",
                                        right: "5px",
                                        top: "5%",
                                        color: "rgba(255, 255, 255, 0.45)",
                                        fontFamily: "'Outfit', 'Inter', sans-serif",
                                        fontSize: "20px",
                                        fontWeight: "900",
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

                                    <div
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'flex-end',
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        boxSizing: 'border-box',
                                        background: 'transparent',
                                        padding: '20px 25px 15px',
                                        color: '#fff',
                                        borderBottomLeftRadius: '10px',
                                        borderBottomRightRadius: '10px',
                                        zIndex: 10,
                                      }}
                                    >
                                      <div style={{ margin: '0 15px', width: 'calc(100% - 30px)', boxSizing: 'border-box' }}>
                                        <h5 style={{ position: 'static', display: 'block', width: '100%', margin: '0 0 8px', fontSize: '16px', fontWeight: 'bold', textAlign: 'center', color: '#fff', float: 'none', clear: 'both' }}>
                                          {profile.agwid}
                                        </h5>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#eee' }}>
                                          {/* Left Side (City, State, Denomination) */}
                                          <div style={{ display: 'flex', flexDirection: 'column', width: 'calc(100% - 70px)', lineHeight: '1.3' }}>
                                            {profile.denomination && (
                                              <span style={{ display: 'block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#00bcd5', marginBottom: '2px' }}>
                                                {profile.denomination}
                                              </span>
                                            )}
                                            <span style={{ display: 'block', width: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
                                              {(() => {
                                                const addressParts = profile.currentAddress ? profile.currentAddress.split('|||') : [];
                                                return addressParts[4]?.trim() || profile.city || "";
                                              })()}
                                            </span>
                                            <span style={{ display: 'block', width: '100%', fontSize: '11px', opacity: 0.85, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'left' }}>
                                              {(() => {
                                                const addressParts = profile.currentAddress ? profile.currentAddress.split('|||') : [];
                                                return addressParts[3]?.trim() || profile.state || "";
                                              })()}
                                            </span>
                                          </div>

                                          {/* Right Side (Age) */}
                                          <div style={{ flexShrink: 0, textAlign: 'right' }}>
                                            <span style={{ display: 'block', whiteSpace: 'nowrap', fontWeight: '500' }}>
                                              {profile.age && `${profile.age} Yrs old`}
                                            </span>
                                          </div>
                                        </div>
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

                <div className="row">
                  <div className="col-md-12">
                    {userInfo && userInfo.profileVisibility === 'Hidden' && (
                      <div className="alert alert-danger d-flex align-items-start mb-4 shadow-sm" role="alert" style={{ backgroundColor: '#fff5f5', color: '#c53030', border: '1px solid #feb2b2', borderRadius: '8px', padding: '15px' }}>
                        <i className="fa fa-eye-slash" style={{ fontSize: '24px', marginRight: '15px', marginTop: '3px' }}></i>
                        <div style={{ fontSize: '15px' }}>
                          <p className="mb-1">
                            <strong>Your profile is currently hidden.</strong>
                          </p>
                          <p className="mb-0">
                            Other members cannot see your profile, and you will not be able to view other member profiles until you unhide it. <Link to="/user/user-settings-page" style={{ color: '#c53030', textDecoration: 'underline', fontWeight: 'bold' }}>Unhide Profile</Link>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row g-4" style={{ marginTop: "0px" }}>
                  <ProfileCompletion userData={userInfo} />

                  {!planLoading && (
                    <>
                      <PlanDetails externalPlanData={activePlan} />
                      <ActivePlanCard externalPlanData={activePlan} />
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
