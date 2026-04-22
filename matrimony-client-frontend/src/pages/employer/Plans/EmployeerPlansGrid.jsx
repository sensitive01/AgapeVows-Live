import React, { useState, useEffect } from "react";
import EmployerHeader from "../EmployerHeader";
import EmployerFooter from "../EmployerFooter";
import axios from "axios";

const EmployeerPlansGrid = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");

  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingPlan, setProcessingPlan] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employerData = localStorage.getItem("employerData");
        if (!employerData) {
          throw new Error("Employer data not found in local storage");
        }
        const employer = JSON.parse(employerData);
        const employid = employer._id;
        if (!employid) {
          throw new Error("Employer ID missing in local storage data");
        }

        // Fetch plans
        const plansResponse = await fetch(
          `https://api.edprofio.com/admin/fetchplanbyemp/${employid}`
        );
        if (!plansResponse.ok) throw new Error("Failed to fetch plans");
        const plansData = await plansResponse.json();
        if (!plansData.success) throw new Error("Failed to load plans from server");
        setPlans(plansData.data);

        // Fetch employer subscription status
        const employerResponse = await axios.get(
          `https://api.edprofio.com/employer/fetchemployer/${employid}`
        );

        if (employerResponse.status === 200 && employerResponse.data) {
          const empData = employerResponse.data;
          const hasActiveSubscription = empData.subscription === "true" && empData.currentSubscription;
          const isFreePlan = empData.currentSubscription?.planDetails?.price === 0;
          const isTrial = empData.trial === "true";

          setSubscriptionStatus({
            hasActiveSubscription,
            isFreePlan,
            isTrial,
            currentPlan: empData.currentSubscription?.planDetails,
            subscriptionLeft: empData.subscriptionleft,
            endDate: empData.subscriptionenddate
          });
        } else {
          throw new Error("Failed to load subscription status from server");
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const togglePlanType = () => {
    setIsPremium(!isPremium);
  };

  // Filter plans based on plan type
  const filteredPlans = plans.filter(plan => 
    isPremium 
      ? plan.planType === 'Premium' 
      : plan.planType === 'Standard' || plan.planType === 'Basic' || plan.planType === 'Free'
  );

  const getFeatureList = (plan) => {
    return [
      { text: `${plan.jobPostingLimit || 0} Job Posts`, included: plan.jobPostingLimit > 0 },
      { text: `${plan.profileViews || 0} Profile Views`, included: plan.profileViews > 0 },
      { text: `${plan.downloadResume || 0} Resume Downloads`, included: plan.downloadResume > 0 },
      { text: `${plan.perDayLimit || 0} Per Day Limit`, included: plan.perDayLimit > 0 },
      { text: 'Verified Candidate Access', included: plan.verifiedCandidateAccess },
      { text: 'Candidates Live Chat', included: plan.candidatesLiveChat },
      { text: 'No Ads', included: !plan.hasAds },
      { text: 'DRM Access', included: plan.hasDRM },
      { text: 'Access to Webinars', included: plan.accessToWebinars },
      { text: `${plan.interviewType}`, included: true },
      { text: 'Fast Track Support', included: plan.fastTrackSupport },
      { text: `Valid for ${plan.validityDays} days`, included: true },
    ];
  };

  const calculateTotalPrice = (price, gstPercentage) => {
    if (price === 0) return "Free Forever";
    const gstAmount = (price * gstPercentage) / 100;
    const totalPrice = price + gstAmount;
    return `Total: ₹${totalPrice.toFixed(2)} (incl. GST)`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handler that triggers confirmation modal
  const handleChoosePlan = (planId) => {
    const plan = plans.find(p => p._id === planId);
    setSelectedPlan(plan);
    setShowConfirmModal(true);
    setSuccessMsg("");
    setError(null);
  };

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        console.log("Razorpay script already loaded");
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      
      script.onload = () => {
        console.log("Razorpay script loaded successfully");
        resolve(true);
      };
      
      script.onerror = () => {
        console.error("Failed to load Razorpay script");
        resolve(false);
      };
      
      document.body.appendChild(script);
    });
  };

  // Activate plan after successful payment
  const activatePlanAfterPayment = async (paymentDetails) => {
    try {
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      const employerId = employerData._id;

      console.log("Activating plan with payment details:", paymentDetails);

      // Call your existing activateplans endpoint
      const response = await axios.post(
        "https://api.edprofio.com/admin/activateplans",
        {
          employerId: employerId,
          planId: selectedPlan._id,
          paymentDetails: paymentDetails
        }
      );

      console.log("Plan activation response:", response.data);

      if (response.status === 200) {
        setShowConfirmModal(false);
        setSuccessMsg("Payment successful! Your plan has been activated.");
        setShowSuccessModal(true);

        // Refresh page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to activate plan");
      }
    } catch (err) {
      console.error("Plan activation error:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Payment successful but plan activation failed. Please contact support."
      );
      setShowConfirmModal(true);
    } finally {
      setProcessingPlan(false);
    }
  };

  // Handle payment for paid plans
  const handlePayment = async () => {
    setProcessingPlan(true);
    setError(null);

    try {
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      const employerId = employerData._id;

      // Calculate total amount in paise (Razorpay uses paise)
      const totalAmount = selectedPlan.price + (selectedPlan.price * selectedPlan.gstPercentage) / 100;
      const amountInPaise = Math.round(totalAmount * 100);

      console.log("Payment Details:", {
        planName: selectedPlan.name,
        basePrice: selectedPlan.price,
        gst: selectedPlan.gstPercentage,
        totalAmount: totalAmount,
        amountInPaise: amountInPaise
      });

      // Load Razorpay script
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        setError("Failed to load payment gateway. Please refresh the page and try again.");
        setProcessingPlan(false);
        return;
      }

      // Verify Razorpay is available
      if (!window.Razorpay) {
        setError("Payment gateway not initialized. Please refresh the page.");
        setProcessingPlan(false);
        return;
      }

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay Key ID from environment variable
        amount: amountInPaise, // Amount in paise
        currency: "INR",
        name: "EdProfio",
        description: `${selectedPlan.name} Plan Subscription`,
        image: "https://edprofio.com/logo.png", // Optional: Your logo URL
        handler: async function (response) {
          console.log("=== Payment Success Response ===");
          console.log("Razorpay Payment ID:", response.razorpay_payment_id);
          console.log("Full Response:", response);

          // Payment details returned by Razorpay
          const paymentDetails = {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id || null,
            razorpay_signature: response.razorpay_signature || null,
            amount: amountInPaise,
            currency: "INR",
            planId: selectedPlan._id,
            planName: selectedPlan.name,
            paymentStatus: "success",
            timestamp: new Date().toISOString()
          };

          console.log("Processed Payment Details:", paymentDetails);

          // Activate plan after successful payment
          await activatePlanAfterPayment(paymentDetails);
        },
        prefill: {
          name: employerData.name || "",
          email: employerData.email || "",
          contact: employerData.phone || employerData.mobile || ""
        },
        notes: {
          employer_id: employerId,
          plan_id: selectedPlan._id,
          plan_name: selectedPlan.name
        },
        theme: {
          color: "#3399cc"
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal dismissed by user");
            setProcessingPlan(false);
            setError("Payment cancelled. Please try again when ready.");
          },
          // Escape key handling
          escape: true,
          // Backdrop click handling
          backdropclose: false
        }
      };

      console.log("Opening Razorpay with options:", options);

      // Create Razorpay instance
      const razorpay = new window.Razorpay(options);

      // Handle payment failure
      razorpay.on('payment.failed', function (response) {
        console.error("=== Payment Failed ===");
        console.error("Error Code:", response.error.code);
        console.error("Error Description:", response.error.description);
        console.error("Error Source:", response.error.source);
        console.error("Error Step:", response.error.step);
        console.error("Error Reason:", response.error.reason);
        console.error("Full Error Response:", response.error);

        setError(
          `Payment failed: ${response.error.description || response.error.reason || "Please try again"}`
        );
        setProcessingPlan(false);
      });

      // Open Razorpay checkout
      razorpay.open();
      console.log("Razorpay checkout opened");

    } catch (err) {
      console.error("Payment initialization error:", err);
      setError(err.message || "Failed to initialize payment. Please try again.");
      setProcessingPlan(false);
    }
  };

  // Confirm selection - either activate free plan or initiate payment
  const handleConfirmChoosePlan = async () => {
    console.log("Plan confirmation initiated for:", selectedPlan.name);
    console.log("Plan price:", selectedPlan.price);

    // If it's a paid plan, handle payment
    if (selectedPlan.price > 0) {
      console.log("Initiating payment for paid plan");
      await handlePayment();
      return;
    }

    // For free plans, activate directly
    console.log("Activating free plan directly");
    setProcessingPlan(true);
    setError(null);
    setShowConfirmModal(false);

    try {
      const employerData = JSON.parse(localStorage.getItem("employerData"));
      const employerId = employerData._id;

      // POST request to backend to activate free plan
      const response = await axios.post(
        "https://api.edprofio.com/admin/activateplans",
        {
          employerId: employerId,
          planId: selectedPlan._id
        }
      );

      console.log("Free plan activation response:", response.data);

      if (response.status === 200) {
        setSuccessMsg("Your free plan has been activated successfully!");
        setShowSuccessModal(true);

        // Refresh page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setError(response.data.message || "Failed to activate plan");
      }
    } catch (err) {
      console.error("Free plan activation error:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to activate plan"
      );
      setShowConfirmModal(true);
    } finally {
      setProcessingPlan(false);
    }
  };

  // Modal close handlers
  const handleCloseConfirmModal = () => {
    if (!processingPlan) {
      setShowConfirmModal(false);
      setSelectedPlan(null);
      setError(null);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  // --- UI ---
  if (loading) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading plans...</p>
            </div>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  if (error && !showConfirmModal) {
    return (
      <>
        <EmployerHeader />
        <div className="content">
          <div className="card">
            <div className="card-body text-center py-5 text-danger">
              <i className="ti ti-alert-circle fs-1"></i>
              <p className="mt-2">Error: {error}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Retry
              </button>
            </div>
          </div>
        </div>
        <EmployerFooter />
      </>
    );
  }

  return (
    <>
      <EmployerHeader />
      <div className="content">
        <div className="card">
          <div className="card-body">

            {/* Current subscription status */}
            {subscriptionStatus?.hasActiveSubscription && (
              <div className={`alert ${subscriptionStatus.isFreePlan ? 'alert-info' : 'alert-success'} mb-4`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">
                      <i className="ti ti-circle-check me-2"></i>
                      {subscriptionStatus.isTrial ? 'Trial Plan Active' : 'Current Active Plan'}
                    </h5>
                    <p className="mb-0">
                      <strong>{subscriptionStatus.currentPlan?.name}</strong>
                      {subscriptionStatus.isFreePlan && <span className="badge bg-success ms-2">Free</span>}
                    </p>
                    <small className="text-muted">
                      {subscriptionStatus.subscriptionLeft} days remaining
                      {subscriptionStatus.endDate && ` (Valid until ${formatDate(subscriptionStatus.endDate)})`}
                    </small>
                  </div>
                  <div className="text-end">
                    <h4 className="mb-0 text-primary">
                      ₹{subscriptionStatus.currentPlan?.price || 0}
                    </h4>
                    <small className="text-muted">{subscriptionStatus.currentPlan?.validityDays} days plan</small>
                  </div>
                </div>
              </div>
            )}

            {!subscriptionStatus?.hasActiveSubscription && (
              <div className="alert alert-warning text-center mb-4">
                <i className="ti ti-alert-triangle me-2"></i>
                You don't have any active subscription. Choose a plan to get started!
              </div>
            )}

            <div className="d-flex justify-content-center align-items-center mb-4">
              <p className="mb-0 me-2">Standard Plans</p>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                  checked={isPremium}
                  onChange={togglePlanType}
                />
              </div>
              <p className="mb-0">Premium Plans</p>
            </div>

            <div className="row justify-content-center">
              {filteredPlans
                .map((plan, index) => {
                const isCurrentPlan = subscriptionStatus?.currentPlan?._id === plan._id;

                return (
                  <div className="col-lg-3 col-md-6 col-sm-12 d-flex mb-4" key={plan._id}>
                    <div className={`card flex-fill ${isCurrentPlan ? 'border border-success border-2' :
                        isPremium && plan.price >= 6999 ? "border border-primary" : ""
                      }`}>
                      <div className="card-body bg-light shadow">
                        {isCurrentPlan && (
                          <div className="badge bg-success mb-2 w-100">Current Plan</div>
                        )}
                        <div className="card shadow">
                          <div className="card-body">
                            <h4>
                              {index + 1}. {plan.name}
                              {plan.price === 0 && (
                                <span className="badge bg-success ms-2">Free</span>
                              )}
                            </h4>
                            <h1 className="text-primary">
                              {plan.price === 0 ? "₹0" : `₹${plan.price}`}
                              <span className="fs-14 fw-normal text-gray">/{plan.validityDays} days</span>
                            </h1>
                            {plan.price > 0 && (
                              <p className="text-muted small mb-0">GST: {plan.gstPercentage}%</p>
                            )}
                            <p className="text-muted small">
                              {calculateTotalPrice(plan.price, plan.gstPercentage)}
                            </p>
                          </div>
                        </div>
                        <div className="pricing-content rounded bg-white border border-grey shadow mb-3">
                          <div className="price-hdr">
                            <h6 className="fs-14 fw-medium text-primary w-100">
                              Features Includes
                            </h6>
                          </div>
                          <div
                            className="features-list"
                            style={{ maxHeight: "300px", overflowY: "auto" }}
                          >
                            {getFeatureList(plan).map((feature, idx) => (
                              <div className="text-dark d-flex align-items-center mb-2" key={idx}>
                                <i
                                  className={`ti ${feature.included
                                      ? "ti-discount-check-filled text-success"
                                      : "ti-circle-x-filled text-danger"
                                    } me-2`}
                                ></i>
                                <span className="small">{feature.text}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button
                          className={`btn ${isCurrentPlan ? 'btn-success' : 'btn-secondary'} w-100`}
                          onClick={() => handleChoosePlan(plan._id)}
                          disabled={processingPlan || isCurrentPlan}
                        >
                          {isCurrentPlan ? "Current Plan" :
                            plan.price === 0 ? "Get Started for Free" : "Choose Plan"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <EmployerFooter />

      {/* Confirmation Modal */}
      {showConfirmModal && selectedPlan && (
        <>
          <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="ti ti-alert-circle me-2"></i>
                    Confirm Plan Selection
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={handleCloseConfirmModal}
                    disabled={processingPlan}
                  ></button>
                </div>
                <div className="modal-body">
                  {error && (
                    <div className="alert alert-danger mb-3">
                      <i className="ti ti-alert-circle me-2"></i>
                      {error}
                    </div>
                  )}

                  <div className="text-center mb-3">
                    <i className="ti ti-file-check text-primary" style={{ fontSize: "3rem" }}></i>
                  </div>
                  <h6 className="text-center mb-3">Are you sure you want to activate this plan?</h6>

                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title text-primary">{selectedPlan.name}</h5>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-muted">Price:</span>
                        <span className="fw-bold">
                          {selectedPlan.price === 0 ? "Free" : `₹${selectedPlan.price}`}
                        </span>
                      </div>
                      {selectedPlan.price > 0 && (
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="text-muted">GST ({selectedPlan.gstPercentage}%):</span>
                          <span className="fw-bold">
                            ₹{((selectedPlan.price * selectedPlan.gstPercentage) / 100).toFixed(2)}
                          </span>
                        </div>
                      )}
                      <hr />
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Total Amount:</span>
                        <span className="fw-bold text-success h5 mb-0">
                          {selectedPlan.price === 0
                            ? "₹0"
                            : `₹${(selectedPlan.price + (selectedPlan.price * selectedPlan.gstPercentage) / 100).toFixed(2)}`
                          }
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="text-muted">Validity:</span>
                        <span className="badge bg-info">{selectedPlan.validityDays} days</span>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mt-3 mb-0">
                    <small>
                      <i className="ti ti-info-circle me-1"></i>
                      {selectedPlan.price > 0
                        ? "You will be redirected to secure payment gateway to complete the transaction."
                        : "This plan will be activated immediately and replace your current subscription if any."
                      }
                    </small>
                  </div>

                  {selectedPlan.price > 0 && (
                    <div className="alert alert-warning mt-2 mb-0">
                      <small>
                        <i className="ti ti-shield-check me-1"></i>
                        Secure payment powered by Razorpay. We accept UPI, Cards, Net Banking & Wallets.
                      </small>
                    </div>
                  )}
                </div>
                <div className="modal-footer" style={{ gap: "10px" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCloseConfirmModal}
                    disabled={processingPlan}
                  >
                    <i className="ti ti-x me-1"></i>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmChoosePlan}
                    disabled={processingPlan}
                  >
                    {processingPlan ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : selectedPlan.price > 0 ? (
                      <>
                        <i className="ti ti-credit-card me-1"></i>
                        Proceed to Payment
                      </>
                    ) : (
                      <>
                        <i className="ti ti-check me-1"></i>
                        Yes, Activate Plan
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div
            className="modal-backdrop fade show"
            onClick={!processingPlan ? handleCloseConfirmModal : undefined}
            style={{ cursor: !processingPlan ? 'pointer' : 'not-allowed' }}
          ></div>
        </>
      )}

      {/* Success Modal */}
      {showSuccessModal && selectedPlan && (
        <>
          <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">
                    <i className="ti ti-circle-check me-2"></i>
                    Plan Activated Successfully!
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Close"
                    onClick={handleCloseSuccessModal}
                  ></button>
                </div>
                <div className="modal-body text-center">
                  <div className="mb-4">
                    <i className="ti ti-circle-check text-success" style={{ fontSize: "5rem" }}></i>
                  </div>

                  <h4 className="text-success mb-3">Congratulations!</h4>
                  <p className="lead mb-4">{successMsg}</p>

                  <div className="card bg-light">
                    <div className="card-body">
                      <h5 className="card-title text-primary mb-3">
                        <i className="ti ti-package me-2"></i>
                        {selectedPlan.name}
                      </h5>

                      <div className="row text-start">
                        <div className="col-6 mb-2">
                          <small className="text-muted d-block">Plan Duration</small>
                          <strong>{selectedPlan.validityDays} days</strong>
                        </div>
                        <div className="col-6 mb-2">
                          <small className="text-muted d-block">Job Posts</small>
                          <strong>{selectedPlan.jobPostingLimit}</strong>
                        </div>
                        <div className="col-6 mb-2">
                          <small className="text-muted d-block">Profile Views</small>
                          <strong>{selectedPlan.profileViews}</strong>
                        </div>
                        <div className="col-6 mb-2">
                          <small className="text-muted d-block">Resume Downloads</small>
                          <strong>{selectedPlan.downloadResume}</strong>
                        </div>
                      </div>

                      <hr />

                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Total Paid:</span>
                        <span className="fw-bold text-success h5 mb-0">
                          {selectedPlan.price === 0
                            ? "Free"
                            : `₹${(selectedPlan.price + (selectedPlan.price * selectedPlan.gstPercentage) / 100).toFixed(2)}`
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info mt-4 mb-0">
                    <i className="ti ti-refresh me-2"></i>
                    <small>Page will refresh automatically in a few seconds...</small>
                  </div>
                </div>
                <div className="modal-footer justify-content-center">
                  <button
                    type="button"
                    className="btn btn-success px-4"
                    onClick={handleCloseSuccessModal}
                  >
                    <i className="ti ti-check me-2"></i>
                    Got it!
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal-backdrop fade show"
            onClick={handleCloseSuccessModal}
            style={{ cursor: 'pointer' }}
          ></div>
        </>
      )}
    </>
  );
};

export default EmployeerPlansGrid;