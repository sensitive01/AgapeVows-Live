import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewLayout from "./layout/NewLayout";
import { getAllPlanData, upgradeUserPlan, getUserById } from "../../api/service/adminServices";

const AdminUserPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const plansPerView = 3;
  const maxSlide = Math.max(0, plans.length - plansPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const getCurrentPlans = () => {
    const start = currentSlide;
    const end = start + plansPerView;
    return plans.slice(start, end);
  };

  const formatNumber = (num) => {
    if (!num && num !== 0) return "";
    const number = parseInt(num);
    if (isNaN(number)) return num; // If it's already "Unlimited" string
    if (number >= 100000000) return "Unlimited";
    return number.toString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plansRes, userRes] = await Promise.all([
          getAllPlanData(),
          getUserById(id)
        ]);
        if (plansRes.status === 200) {
          setPlans(plansRes.data.data.filter(p => p.status === "Active"));
        }
        if (userRes.status === 200) {
          setUser(userRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentAndUpgrade = async (plan) => {
    if (!window.confirm(`Are you sure you want to upgrade ${user?.userName} to ${plan.name} plan?`)) {
      return;
    }

    setUpgrading(true);
    const scriptLoaded = await loadRazorpayScript();
    
    if (!scriptLoaded) {
      alert("Razorpay SDK failed to load. Please try again.");
      setUpgrading(false);
      return;
    }

    // Using the workspace test key or fallback to a string
    const fallbackTestKey = 'rzp_test_43B9POe4e23YRY'; 
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || fallbackTestKey;

    const options = {
      key: razorpayKey,
      amount: plan.price * 100, // Amount is in currency subunits. Default currency is INR.
      currency: "INR",
      name: "AgapeVows Admin",
      description: `Manual Admin Upgrade to ${plan.name}`,
      handler: async function (response) {
        try {
          // Trigger the existing backend method we wrote to push the manual plan upgrade
          const planDataWithPayment = { ...plan, paymentId: response.razorpay_payment_id };
          const backendResponse = await upgradeUserPlan(id, planDataWithPayment);
          
          if (backendResponse.status === 200) {
            alert(`Dummy Payment Successful! Upgrade completed for ${user.userName}. Payment ID: ${response.razorpay_payment_id}`);
            navigate(`/admin/billing-info/${id}`);
          } else {
            alert("Payment recorded, but failed to complete manual upgrade. Please inform developer.");
          }
        } catch (error) {
           console.error("Error setting user plan data after payment:", error);
           alert("Payment was successful but there was an issue processing it internally.");
        } finally {
           setUpgrading(false);
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Payment dummy modal closed");
          setUpgrading(false);
        },
      },
      prefill: {
        name: user?.userName || "Admin Action",
        email: user?.userEmail || "admin@example.com",
        contact: user?.userMobile || "9999999999",
      },
      theme: {
        color: "#a020f0", // Using AgapeVows brand color
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment dummy failed:", response.error);
      alert(`Payment failed: ${response.error.description}`);
      setUpgrading(false);
    });

    rzp.open();
  };

  if (loading) {
    return (
      <NewLayout>
        <div className="text-center p-5">
           <div className="spinner-border text-primary" role="status">
             <span className="visually-hidden">Loading...</span>
           </div>
        </div>
      </NewLayout>
    );
  }

  return (
    <NewLayout>
      <div className="container-fluid p-4 mb-4" style={{ backgroundColor: "#f4f7f6", minHeight: "100vh" }}>
      <div className="rounded-4 py-5 px-3">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Select a Plan for {user?.userName}</h2>
          <p className="text-muted">Manually upgrade the user's subscription</p>
          <button className="btn btn-outline-secondary btn-sm px-3" onClick={() => navigate(-1)}>
            <i className="fa fa-arrow-left me-2"></i>Back to Billing
          </button>
        </div>

        <div className="row g-4 justify-content-center position-relative">
          {plans.length > 3 && currentSlide > 0 && (
            <>
              {/* LEFT ARROW */}
              <button
                onClick={prevSlide}
                style={{
                  position: "absolute",
                  left: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#d3405c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
            </>
          )}

          {plans.length > 3 && currentSlide < maxSlide && (
            <>
              {/* RIGHT ARROW */}
              <button
                onClick={nextSlide}
                style={{
                  position: "absolute",
                  right: "-20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 10,
                  background: "#d3405c",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  fontSize: "20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </>
          )}

          {getCurrentPlans().map((plan, index) => {
            const isCenter = index === 1;
            return (
              <div className="col-lg-4 col-md-6" key={plan._id}>
                <div className={`card h-100 border-0 shadow rounded-4 position-relative bg-white`} style={{ overflow: "hidden", marginTop: isCenter ? '-20px' : '0' }}>
                  {isCenter && (
                    <div className="position-absolute w-100 text-center" style={{ top: "15px" }}>
                      {/* <span className="badge text-dark rounded-pill px-3 py-2 shadow-sm" style={{ backgroundColor: "#ffc107" }}>
                        Most popular plan
                      </span> */}
                    </div>
                  )}
                  <div className={`card-body p-4 p-md-5 ${isCenter ? 'pt-5' : ''}`}>
                    <div className="text-center mb-4 mt-3">
                      <h3 className="fw-bold mb-2">{plan.name}</h3>
                      <p className="text-muted small">Printer took a type and scrambled</p>
                    </div>
                    
                      <button 
                      className="btn w-100 mb-4 rounded-pill fw-bold py-2" 
                      style={{ backgroundColor: isCenter ? '#d3405c' : '#fce9ec', color: isCenter ? '#fff' : '#000', border: 'none' }}
                      onClick={() => handlePaymentAndUpgrade(plan)}
                      disabled={upgrading}
                    >
                      {upgrading ? "Processing..." : "Get Started"}
                    </button>

                    <div className="text-center mb-4">
                      <h2 className="fw-bold mb-0 fs-1">
                        {plan.priceType || '₹'}{plan.price}
                        <span className="fs-5 text-muted fw-normal">/{plan.duration}{plan.durationType?.substring(0, 2)}</span>
                      </h2>
                    </div>

                    <ul className="list-unstyled mb-0 ms-2">
                       <li className="mb-3 d-flex align-items-center">
                        <i className={`fa ${plan.maxProfiles > 0 || plan.maxProfiles === 'unlimited' ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-3 fs-5`}></i>
                        <span className="small">{formatNumber(plan.maxProfiles)} {plan.profilesType || 'Total'} Profiles view /total</span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className={`fa ${plan.dailyLimit && plan.dailyLimit !== 'Unlimited' && plan.dailyLimit !== 'unlimited' && plan.dailyLimit < 1000000 ? 'fa-times-circle text-danger' : 'fa-check-circle text-success'} me-3 fs-5`}></i>
                        <span className="small">{formatNumber(plan.dailyLimit)} per day limit</span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className="fa fa-check-circle text-success me-3 fs-5"></i>
                        <span className="small">{plan.canViewProfiles || 'Only Premium'} user profile can view</span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className={`fa ${plan.viewContactDetails === 'Yes' ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-3 fs-5`}></i>
                        <span className="small">View contact details</span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className={`fa ${plan.sendInterestRequest === 'Yes' ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-3 fs-5`}></i>
                        <span className="small">Send interest</span>
                      </li>
                      <li className="mb-3 d-flex align-items-center">
                        <i className={`fa ${plan.startChat === 'Yes' ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-3 fs-5`}></i>
                        <span className="small">Start Chat</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Dots */}
        {plans.length > 3 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "40px",
              gap: "10px",
            }}
          >
            {Array.from({ length: maxSlide + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  border: "none",
                  background: currentSlide === index ? "#d3405c" : "#ddd",
                  cursor: "pointer",
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
       </div>
      </div>
    </NewLayout>
  );
};

export default AdminUserPlan;
