import React, { useEffect, useState } from "react";
import { getMyActivePlanData, getAllPlanDetails } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";

const ActivePlanCard = () => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(null);
  const [plansList, setPlansList] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [planRes, plansListRes] = await Promise.all([
          getMyActivePlanData(userId),
          getAllPlanDetails()
        ]);
        
        if (planRes.status === 200) {
          setPlanData(planRes?.data?.activePlan);
        }
        if (plansListRes.status === 200) {
          setPlansList(plansListRes?.data?.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchData();

    window.addEventListener("planUpdated", fetchData);
    return () => window.removeEventListener("planUpdated", fetchData);
  }, [userId]);

  if (loading) {
    return (
      <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
        <div className="card p-4 text-center shadow-sm">
          <p>Loading Active Plan...</p>
        </div>
      </div>
    );
  }

  if (!planData) {
    return (
      <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
        <div className="card p-4 text-center shadow-sm">
          <h6>No Active Plan</h6>
          <button
            className="btn btn-dark btn-sm mt-2"
            onClick={() => navigate("/user/user-plan-selection")}
          >
            Upgrade Plan
          </button>
        </div>
      </div>
    );
  }

  // Find the base plan definition from the plan list to fallback on missing benefits
  const basePlan = plansList.find(p => p.name === planData.subscriptionType) || {};

  const subscriptionType = planData.subscriptionType;
  const subscriptionValidTo = planData.subscriptionValidTo;

  // Use the plan snapshot if available, otherwise fallback to base plan definition
  const rawMaxProfiles = planData.maxProfiles ? planData.maxProfiles : basePlan.maxProfiles;
  const rawDailyLimit = planData.dailyLimit ? planData.dailyLimit : basePlan.dailyLimit;
  
  const profilesViewedCount = planData.profilesViewedCount || 0;
  const dailyViewedCount = planData.dailyViewedCount || 0;

  const canViewProfiles = planData.canViewProfiles || basePlan.canViewProfiles;
  const viewContactDetails = planData.viewContactDetails || basePlan.viewContactDetails;
  const sendInterestRequest = planData.sendInterestRequest || basePlan.sendInterestRequest;
  const startChat = planData.startChat || basePlan.startChat;


  const planType = planData.subscriptionType?.toLowerCase() || "";
  const isUnlimitedProfiles = 
    rawMaxProfiles === "Unlimited" || 
    rawMaxProfiles === "unlimited" || 
    parseInt(rawMaxProfiles) >= 999999 ||
    planType === "platinum" ||
    planType === "gold" ||
    planType === "golden";

  const isUnlimitedDaily = 
    rawDailyLimit === "Unlimited" || 
    rawDailyLimit === "unlimited" || 
    parseInt(rawDailyLimit) >= 999999 ||
    planType === "platinum" ||
    planType === "gold" ||
    planType === "golden";

  const parsedMax = parseInt(rawMaxProfiles) || 0;
  const parsedDaily = parseInt(rawDailyLimit) || 0;

  const usagePercent = isUnlimitedProfiles
    ? 0
    : parsedMax > 0
    ? Math.min((profilesViewedCount / parsedMax) * 100, 100)
    : 0;

  const dailyPercent = isUnlimitedDaily
    ? 0
    : parsedDaily > 0
    ? Math.min((dailyViewedCount / parsedDaily) * 100, 100)
    : 0;

  const remainingProfiles = isUnlimitedProfiles ? "Unlimited" : parsedMax - profilesViewedCount;
  const remainingDaily = isUnlimitedDaily ? "Unlimited" : parsedDaily - dailyViewedCount;

  return (
    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com">
      <h2 className="db-tit mb-3">Active Plan Benefits</h2>

      <div className="card shadow-lg border-0 p-4 rounded-4">

        {/* Plan Title */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">
            {subscriptionType} Membership
          </h5>
          <span className="badge bg-success">Active</span>
        </div>

        {/* Total Profile Usage */}
        <div className="mb-4">
          <strong>Total Profile Views</strong>
          <div className="d-flex justify-content-between small text-muted">
            <span>{profilesViewedCount} used</span>
            <span>{isUnlimitedProfiles ? "Unlimited" : parsedMax} total</span>
          </div>

          {!isUnlimitedProfiles && (
            <div className="progress mt-2" style={{ height: "8px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: `${usagePercent}%` }}
              ></div>
            </div>
          )}

          <small className="text-muted">
            Remaining: {remainingProfiles > 0 || isUnlimitedProfiles ? remainingProfiles : 0}
          </small>
        </div>

        {/* Daily Usage */}
        {(isUnlimitedDaily || parsedDaily > 0) && (
          <div className="mb-4">
            <strong>Daily Limit</strong>
            <div className="d-flex justify-content-between small text-muted">
              <span>{dailyViewedCount} used</span>
              <span>{isUnlimitedDaily ? "Unlimited" : parsedDaily} total</span>
            </div>

            {!isUnlimitedDaily && (
              <div className="progress mt-2" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-primary"
                  style={{ width: `${dailyPercent}%` }}
                ></div>
              </div>
            )}

            <small className="text-muted">
              Remaining Today: {remainingDaily > 0 || isUnlimitedDaily ? remainingDaily : 0}
            </small>
          </div>
        )}

        {/* Benefits List */}
        <ul className="list-unstyled mt-3 mb-0">

          <li className="mb-2">
            {canViewProfiles === "All Profiles"
              ? "✔ Can view all profiles"
              : "✔ Only premium profiles visible"}
          </li>

          <li className="mb-2">
            {viewContactDetails === "Yes"
              ? "✔ Contact details access"
              : "✖ No contact details access"}
          </li>

          <li className="mb-2">
            {sendInterestRequest === "Yes"
              ? "✔ Can send interest request"
              : "✖ Cannot send interest"}
          </li>

          <li className="mb-2">
            {startChat === "Yes"
              ? "✔ Chat enabled"
              : "✖ Chat not available"}
          </li>
        </ul>

        {/* Expiry */}
        <div className="mt-4 pt-3 border-top small text-muted">
          Valid Till: <strong>{subscriptionValidTo}</strong>
        </div>

      </div>
    </div>
  );
};

export default ActivePlanCard;