import React, { useEffect, useState } from "react";
import LayoutComponent from "../../components/layouts/LayoutComponent";
import Footer from "../../components/Footer";
import CopyRights from "../../components/CopyRights";
import {
  getAllPlanDetails,
  sendPaymentData,
} from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../utils/alertService";
import "../../index.css";
import planBg from "../../assets/images/Plan-bg.png";

const UserPlanSelection = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPlanDetails();
        if (response.status === 200) {
          setPlans(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      } finally {
        setLoading(false);
      }
    };

    // Check if user is logged in
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }

    fetchData();
  }, []);

  const formatNumber = (num) => {
    if (num === null || num === undefined || num === "") return "";
    if (num === "NaN" || Number.isNaN(num)) return "Unlimited";

    const number = parseInt(num);
    if (isNaN(number)) return num; // If it's already "unlimited" or similar string

    if (number >= 1000000000000 || number >= 1000000000) {
      return "Unlimited";
    } else if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    }
    return number.toString();
  };

  const formatPlanDuration = (duration, type) => {
    if (!type) return `${duration}mo`;
    const t = type.toLowerCase();
    if (t === "days" || t === "day") return `${duration} days`;
    if (t === "months" || t === "month") return `${duration}mo`;
    if (t === "years" || t === "year") return `${duration}yr`;
    return `${duration} ${type}`;
  };

  // Carousel controls - show 3 plans at a time
  const plansPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(plans.length / plansPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev < totalSlides - 1) {
        return prev + 1;
      }
      return prev; // stop at last
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev; // stop at first
    });
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Get plans for current slide
  const getCurrentPlans = () => {
    const start = currentSlide * plansPerSlide;
    const end = start + plansPerSlide;
    return plans.slice(start, end);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Function to send payment data to backend
  const sendPaymentDataToBackend = async (paymentData, userId) => {
    try {
      const response = await sendPaymentData(paymentData, userId);

      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error("Error sending payment data to backend:", error);
      throw error;
    }
  };

  const handlePayment = async (plan) => {
    if (!userId) {
      showAlert({ text: "Please login to purchase a plan", icon: "warning" });
      return;
    }

    if (plan.price === 0 || plan.price === "0") {
      const paymentData = {
        razorpayPaymentId: `free_${Date.now()}`,
        razorpayOrderId: `order_${Date.now()}`,
        razorpaySignature: "free_plan_no_signature",
        userId: userId,
        planId: plan._id,
        planName: plan.name,
        amount: 0,
        currency: "INR",
        paymentStatus: "success",
        paymentMethod: "free",
        timestamp: new Date().toISOString(),
        planDetails: {
          name: plan.name,
          price: 0,
          duration: plan.duration,
          durationType: plan.durationType,
          maxProfiles: plan.maxProfiles,
          profilesType: plan.profilesType,
          dailyLimit: plan.dailyLimit,
          canViewProfiles: plan.canViewProfiles,
          viewContactDetails: plan.viewContactDetails,
          sendInterestRequest: plan.sendInterestRequest,
          maxSendInterest: plan.maxSendInterest,
          dailyLimitSendInterest: plan.dailyLimitSendInterest,
          maxViewContact: plan.maxViewContact,
          dailyLimitViewContact: plan.dailyLimitViewContact,
        }
      };

      try {
        const backendResponse = await sendPaymentDataToBackend(paymentData, userId);
        if (backendResponse) {
          navigate("/user/user-dashboard-page", {
            state: {
              purchaseSuccess: true,
              planDetails: paymentData.planDetails
            }
          });
        }
      } catch (error) {
        console.error("Error activating free plan:", error);
        showAlert({ text: "There was an issue activating your free plan. Please contact support.", icon: "error" });
      }
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      showAlert({ text: "Razorpay SDK failed to load. Please try again.", icon: "error" });
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: plan.price * 100,
      currency: "INR",
      name: "AgapeVows",
      description: `${plan.name} Plan Subscription`,
      handler: async function (response) {
        try {
          const paymentData = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            userId: userId,
            planId: plan._id,
            planName: plan.name,
            amount: plan.price,
            currency: "INR",
            paymentStatus: "success",
            paymentMethod: "razorpay",
            timestamp: new Date().toISOString(),
            planDetails: {
              name: plan.name,
              price: plan.price,
              duration: plan.duration,
              durationType: plan.durationType,
              maxProfiles: plan.maxProfiles,
              profilesType: plan.profilesType,
              dailyLimit: plan.dailyLimit,
              canViewProfiles: plan.canViewProfiles,
              viewContactDetails: plan.viewContactDetails,
              sendInterestRequest: plan.sendInterestRequest,
              maxSendInterest: plan.maxSendInterest,
              dailyLimitSendInterest: plan.dailyLimitSendInterest,
              maxViewContact: plan.maxViewContact,
              dailyLimitViewContact: plan.dailyLimitViewContact,
            }

          };

          // Send data to backend
          const backendResponse = await sendPaymentDataToBackend(
            paymentData,
            userId
          );

          if (backendResponse) {
            navigate("/user/user-dashboard-page", {
              state: {
                purchaseSuccess: true,
                planDetails: paymentData.planDetails
              }
            });
          } else {
            showAlert({
              text: "Payment received but there was an issue activating your plan. Please contact support.",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          showAlert({
            text: "Payment was successful but there was an issue processing it. Please contact support with your payment ID: " + response.razorpay_payment_id,
            icon: "error"
          });
        }
      },
      modal: {
        ondismiss: function () {
        },
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#a020f0",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      showAlert({ text: `Payment failed: ${response.error.description}`, icon: "error" });
    });

    rzp.open();
  };

  const renderFeatureIcon = (hasFeature) => {
    // If it's explicitly "No", 0, false, or "NaN", show the X mark
    if (
      hasFeature === "No" ||
      hasFeature === "0" ||
      hasFeature === 0 ||
      hasFeature === false ||
      hasFeature === "NaN" ||
      !hasFeature
    ) {
      return <i className="fa fa-close close" aria-hidden="true" />;
    }
    // Otherwise show the check mark
    return <i className="fa fa-check" aria-hidden="true" />;
  };

  const getFeatureText = (plan, featureType) => {
    switch (featureType) {
      case "profiles":
        const formattedProfiles = formatNumber(plan.maxProfiles);
        return `${formattedProfiles} Premium Profiles view /${plan.profilesType === "Per month" ? "mo" : "total"
          }`;
      case "dailyLimit":
        const formattedDaily = formatNumber(plan.dailyLimit);
        return `Per day limit: ${formattedDaily}`;
      case "viewProfiles":
        return `${plan.canViewProfiles} user profile can view`;
      case "contactDetails":
        return "View contact details";
      case "sendInterest":
        return "Send interest";

      default:
        return "";
    }
  };

  if (loading) {
    return (
      <>
        <LayoutComponent />
        <section>
          <div className="w-full relative flex items-center justify-center overflow-hidden" style={{ minHeight: '45vh' }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${planBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 0,
              animation: 'bgZoomInOut 10s infinite alternate ease-in-out'
            }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
              <div className="row">
                <h1 className="text-white text-3xl font-bold text-center">Loading plans...</h1>
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <CopyRights />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-50">
        <LayoutComponent />
      </div>

      <div className="pt-[125px]"> 
        <div className="w-full relative flex items-center overflow-hidden" style={{
          minHeight: '45vh',
          padding: '40px 0'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${planBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
            animation: 'bgZoomInOut 10s infinite alternate ease-in-out'
          }}></div>
          <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
            <div className="row">
              <div className="col-md-8 col-lg-6" style={{ textAlign: "left", paddingLeft: "5%" }}>
                <span style={{
                  color: "#d4af37",
                  fontWeight: "600",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  fontSize: "13px",
                  display: "block",
                  marginBottom: "8px"
                }}>
                  MEMBERSHIP PLANS
                </span>

                {/* Heart with lines */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", marginBottom: "25px" }}>
                  <div style={{ height: "1px", background: "#d4af37", width: "30px", opacity: 0.5 }}></div>
                  <i className="fa fa-heart" style={{ color: "#d4af37", fontSize: "10px", margin: "0 8px" }}></i>
                  <div style={{ height: "1px", background: "#d4af37", width: "30px", opacity: 0.5 }}></div>
                </div>

                <h1 style={{
                  color: "#fff",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.2rem",
                  lineHeight: "1.2",
                  fontWeight: "500",
                  textTransform: "none",
                  margin: 0
                }}>
                  Choose the Plan<br />That's Right for You
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING PLANS WITH CAROUSEL */}
      <section>
        <div className="plans-main" style={{ marginTop: '-90px', position: 'relative', zIndex: 10 }}>
          <div className="container">
            <div className="row" style={{ position: "relative" }}>
              {!userId ? (
                <div style={{
                  textAlign: "center",
                  padding: "35px 30px",
                  background: "#fff",
                  borderRadius: "16px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  width: "100%",
                  maxWidth: "500px",
                  margin: "0 auto 40px auto",
                  position: "relative",
                  zIndex: 10
                }}>
                  {/* Top Circle Icon */}
                  <div style={{
                    width: "60px",
                    height: "60px",
                    background: "#fcf8ef",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 15px auto"
                  }}>
                    <i className="fa fa-users" style={{ color: "#d4af37", fontSize: "20px", position: "relative" }}>
                      <i className="fa fa-lock" style={{
                        position: "absolute",
                        bottom: "-4px",
                        right: "-4px",
                        fontSize: "12px",
                        background: "#fcf8ef",
                        borderRadius: "50%",
                        padding: "2px"
                      }}></i>
                    </i>
                  </div>

                  <h2 style={{
                    fontSize: "1.8rem",
                    color: "#4a2580",
                    marginBottom: "10px",
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: "500"
                  }}>
                    Login to View Membership Plans
                  </h2>

                  {/* Separator with Heart */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "15px 0" }}>
                    <div style={{ height: "1px", background: "#e5e7eb", width: "30px" }}></div>
                    <i className="fa fa-heart" style={{ color: "#d4af37", fontSize: "10px", margin: "0 8px" }}></i>
                    <div style={{ height: "1px", background: "#e5e7eb", width: "30px" }}></div>
                  </div>

                  <p style={{
                    fontSize: "0.95rem",
                    color: "#4b5563",
                    marginBottom: "25px",
                    maxWidth: "450px",
                    margin: "0 auto 25px auto",
                    lineHeight: "1.5"
                  }}>
                    Sign in to explore our membership plans and choose the option that best suits your needs.
                  </p>

                  <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                      onClick={() => navigate('/user/user-login')}
                      style={{
                        padding: "12px 40px",
                        fontSize: "1rem",
                        borderRadius: "50px",
                        border: "2px solid #4a2580",
                        background: "transparent",
                        color: "#4a2580",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#f9fafb"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    >
                      <i className="fa fa-lock"></i> LOGIN
                    </button>

                    <button
                      onClick={() => navigate('/user/user-sign-up')}
                      style={{
                        padding: "12px 40px",
                        fontSize: "1rem",
                        borderRadius: "50px",
                        background: "#4a2580",
                        color: "#fff",
                        border: "2px solid #4a2580",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#371b61"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#4a2580"; }}
                    >
                      <i className="fa fa-user-plus"></i> REGISTER FREE
                    </button>
                  </div>
                </div>
              ) : plans.length === 0 ? (
                <div style={{
                  background: "#fff",
                  borderRadius: "20px",
                  padding: "40px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  maxWidth: "600px",
                  margin: "0 auto",
                  position: "relative",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    background: "#f3f4f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px auto"
                  }}>
                    <i className="fa fa-folder-open" style={{ fontSize: "32px", color: "#9ca3af" }}></i>
                  </div>
                  <h2 style={{
                    fontSize: "1.5rem",
                    color: "#1f2937",
                    marginBottom: "10px",
                    fontWeight: "700"
                  }}>
                    No Plans Available
                  </h2>
                  <p style={{
                    fontSize: "0.95rem",
                    color: "#4b5563",
                    maxWidth: "450px",
                    margin: "0 auto",
                    lineHeight: "1.5"
                  }}>
                    There are currently no membership plans available. Please check back later.
                  </p>
                </div>
              ) : (
                <>
                  {/* Carousel Navigation */}
                  {(isMobile ? plans.length > 1 : plans.length > 3) && (
                    <>
                      {/* LEFT */}
                      <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        style={{
                          position: "absolute",
                          left: isMobile ? "-12px" : "-50px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: currentSlide === 0 ? "#ccc" : "#4a2580",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: isMobile ? "30px" : "45px",
                          height: isMobile ? "30px" : "45px",
                          fontSize: isMobile ? "12px" : "18px",
                          cursor: currentSlide === 0 ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className="fa fa-chevron-left"></i>
                      </button>

                      {/* RIGHT */}
                      <button
                        onClick={nextSlide}
                        disabled={currentSlide === totalSlides - 1}
                        style={{
                          position: "absolute",
                          right: isMobile ? "-12px" : "-50px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          zIndex: 10,
                          background: currentSlide === totalSlides - 1 ? "#ccc" : "#4a2580",
                          color: "white",
                          border: "none",
                          borderRadius: "50%",
                          width: isMobile ? "30px" : "45px",
                          height: isMobile ? "30px" : "45px",
                          fontSize: isMobile ? "12px" : "18px",
                          cursor: currentSlide === totalSlides - 1 ? "not-allowed" : "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                          transition: "all 0.3s ease"
                        }}
                      >
                        <i className="fa fa-chevron-right"></i>
                      </button>

                    </>
                  )}

                  {/* Plans Display */}
                  <ul className="flex justify-center items-stretch gap-6 flex-nowrap overflow-hidden">
                    {getCurrentPlans().map((plan, index) => {

                      // const isMobile = window.innerWidth < 768;
                      const isCenter = isMobile ? true : index === 1;

                      return (
                        <li
                          key={plan._id}
                          className="flex justify-center"
                          style={{ width: isMobile ? "100%" : "33.33%" }}
                        >
                          <div className="pri-box">

                            <h2>{plan.name}</h2>
                            <p>Printer took a type and scrambled</p>

                            <a
                              href="#"
                              className="cta"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePayment(plan);
                              }}
                            >
                              Get Started
                            </a>

                            <span className="pri-cou">
                              <b>₹{plan.price}</b>/
                              {formatPlanDuration(plan.duration, plan.durationType)}
                            </span>

                            <ol>
                              <li>
                                {renderFeatureIcon(
                                  plan.maxProfiles > 0 ||
                                    String(plan.maxProfiles).toLowerCase() === "unlimited" ||
                                    String(plan.maxProfiles) === "NaN"
                                    ? "Yes"
                                    : "No"
                                )}
                                {getFeatureText(plan, "profiles")}
                              </li>

                              {plan.dailyLimit && (
                                <li>
                                  {renderFeatureIcon(plan.dailyLimit)}
                                  {getFeatureText(plan, "dailyLimit")}
                                </li>
                              )}

                              <li>
                                {renderFeatureIcon(plan.canViewProfiles)}
                                {getFeatureText(plan, "viewProfiles")}
                              </li>

                              <li>
                                {renderFeatureIcon("Yes")}
                                Send interest: {plan.maxSendInterest === "Unlimited" || (typeof plan.maxSendInterest === 'string' && plan.maxSendInterest.toLowerCase() === 'unlimited') ? "Unlimited" : plan.maxSendInterest}
                              </li>
                              <li>
                                {renderFeatureIcon("Yes")}
                                Daily interest limit: {plan.dailyLimitSendInterest}
                              </li>
                              <li>
                                {renderFeatureIcon("Yes")}
                                View contact details: {plan.maxViewContact === "Unlimited" || (typeof plan.maxViewContact === 'string' && plan.maxViewContact.toLowerCase() === 'unlimited') ? "Unlimited" : plan.maxViewContact}
                              </li>
                              <li>
                                {renderFeatureIcon("Yes")}
                                Daily view contact limit: {plan.dailyLimitViewContact}
                              </li>
                            </ol>

                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Carousel Dots */}
                  {(isMobile ? plans.length > 1 : plans.length > 3) && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "30px",
                        gap: "10px",
                      }}
                    >
                      <div style={{ display: "flex", gap: "10px" }}>
                        {Array.from({ length: totalSlides }).map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              border: "none",
                              background: currentSlide === index ? "#4a2580" : "#ddd",
                              cursor: "pointer",
                              transition: "background 0.3s ease",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {/* <CopyRights /> */}
    </div>
  );
};

export default UserPlanSelection;
