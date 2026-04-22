import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import RecentChats from "./userdashboard/RecentChats";
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

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        try {
          console.log("UserDashboard: Fetching user info for userId:", userId);
          // Add cache-busting parameter to force fresh API call
          const response = await getUserProfile(userId);
          console.log("UserDashboard: Response received:", {
            status: response.status,
            success: response.data?.success,
            hasData: !!response.data?.data,
            dataKeys: response.data?.data ? Object.keys(response.data.data).length : 0,
          });

          // Check if response has data
          if (response.data && response.data.data) {
            console.log("UserDashboard: Setting userInfo with data");
            setUserInfo(response.data.data);
          } else if (response.data) {
            console.log("UserDashboard: Setting userInfo with response.data");
            setUserInfo(response.data);
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
          setError("Failed to load user information");
        }
      }
    };
    fetchUserInfo();
  }, [userId]);

  // Function to safely destroy slider
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

  // Function to initialize slider
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
            window.$(sliderRef.current).slick({
              infinite: false,
              slidesToShow: Math.min(5, profileMatches.length),
              arrows: false,
              slidesToScroll: 1,
              autoplay: true,
              autoplaySpeed: 3000,
              dots: false,
              responsive: [
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: Math.min(3, profileMatches.length),
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

  // Function to fetch profile matches
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
      // setError("Failed to load profile matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
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

  // Handle profile click navigation
  const handleProfileClick = (targetUser) => {
    if (!userId) {
      navigate("/user/user-login");
      return;
    }

    // ✅ CURRENT USER PLAN (from userInfo / paymentDetails)
    const myActivePlan = userInfo?.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const myPlanName = myActivePlan?.subscriptionType?.toLowerCase() || "";

    // ✅ TARGET USER PLAN
    const targetActivePlan = targetUser?.paymentDetails?.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );

    const targetPlanName = targetActivePlan?.subscriptionType?.toLowerCase() || "";

    console.log("My Dashboard Plan:", myPlanName);
    console.log("Target Dashboard Plan:", targetPlanName);

    const isTargetRestricted =
      targetPlanName.includes("platinum") ||
      targetPlanName.includes("gold") ||
      targetPlanName.includes("golden");

    if (myPlanName.includes("premium")) {
      if (isTargetRestricted) {
        console.log("🚫 Restricted: Premium user clicking Golden/Platinum profile");
        toast.error("Upgrade your plan to view Platinum and Golden Membership profiles.", {
          position: "top-center",
          autoClose: 30000, // 30 seconds
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
    navigate(`/profile-more-details/${targetUser._id}`);
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

  // Initial fetch and set up interval for periodic updates
  useEffect(() => {
    fetchProfileMatches();

    const interval = setInterval(() => {
      fetchProfileMatches();
    }, 30000);

    return () => clearInterval(interval);
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
                      <h2 className="db-tit">
                        Profile Matches
                        {profileMatches.length > 0 && (
                          <span className="badge bg-primary ms-2">
                            {profileMatches.length}
                          </span>
                        )}
                      </h2>
                      {loading && (
                        <div
                          className="spinner-border spinner-border-sm"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {profileMatches.length > 0 ? (
                      <ul className="slider" ref={sliderRef}>
                        {profileMatches.map((profile, index) => (
                          <li key={profile._id || index}>
                            <div className="db-new-pro" style={{ position: "relative", paddingTop: "10px" }}>
                              {/* ✅ Badge - TOP LEFT */}
                              <div style={{
                                position: 'absolute',
                                top: '-1100px',
                                left: '10px',
                                zIndex: 10,
                                transform: "scale(0.9)",
                                transformOrigin: "top left"
                              }}>
                                <MembershipBadge user={profile} isMini={true} isMinimal={true} />
                              </div>

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

                              <div>
                                <h5>{profile.agwid || profile.userName}</h5>
                                <span className="city mr-5">
                                  {profile.city}
                                </span>
                                <span className="age ml-5">
                                  {profile.age} Years old
                                </span>
                              </div>
                              {index % 3 === 0 && (
                                <div
                                  className="pro-ave"
                                  title="User currently available"
                                >
                                  <span className="pro-ave-yes"></span>
                                </div>
                              )}
                              <div
                                className="fclick"
                                onClick={() => handleProfileClick(profile)}
                                style={{ cursor: "pointer" }}
                              >
                                &nbsp;
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      !loading && (
                        <div className="alert alert-info" role="alert">
                          No profile matches found for your search criteria.
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Additional Dashboard Components */}
                <div className="row">
                  <ProfileCompletion userData={userInfo} />
                  <PlanDetails />
                  <ActivePlanCard />
                  <RecentChats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <ToastContainer />
      <Footer />
      {/*<CopyRights />*/}
    </div>
  );
};

export default UserDashboardPage;
