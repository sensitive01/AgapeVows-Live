import React, { useEffect, useState } from "react";
import { getMyActivePlanData, getAllPlanDetails } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";

const ActivePlanCard = ({ externalPlanData }) => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(externalPlanData || null);
  const [plansList, setPlansList] = useState([]);
  const [loading, setLoading] = useState(!externalPlanData);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (externalPlanData) {
      setPlanData(externalPlanData);
      // We still might need plansList for base definitions if not in snapshot
      const fetchPlans = async () => {
        try {
          const plansListRes = await getAllPlanDetails();
          if (plansListRes.status === 200) {
            setPlansList(plansListRes?.data?.data || []);
          }
        } catch (error) {
          console.error("Error fetching plans list:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchPlans();
      return;
    }

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
        <h2 className="db-tit">Active plan benefits</h2>
        <div className="db-pro-stat">
          <div className="text-center p-4 d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '280px' }}>
            <h6 className="text-danger fw-bold mb-3">No Active Plan Found</h6>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/user/user-plan-selection")}
            >
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  const basePlan = plansList.find(p => p.name?.toLowerCase() === planData.subscriptionType?.toLowerCase()) || {};

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
  const rawMaxSendInterest = planData.maxSendInterest ?? basePlan.maxSendInterest ?? 0;
  const rawDailyLimitSendInterest = planData.dailyLimitSendInterest ?? basePlan.dailyLimitSendInterest ?? 0;
  const interestSentCount = planData.interestSentCount || 0;
  const dailyInterestSentCount = planData.dailyInterestSentCount || 0;
  const rawMaxViewContact = planData.maxViewContact ?? basePlan.maxViewContact ?? 0;
  const rawDailyLimitViewContact = planData.dailyLimitViewContact ?? basePlan.dailyLimitViewContact ?? 0;
  const contactViewCount = planData.contactViewCount || 0;
  const dailyContactViewCount = planData.dailyContactViewCount || 0;



  const planType = planData.subscriptionType?.toLowerCase() || "";
  const isUnlimitedProfiles =
    rawMaxProfiles === "Unlimited" ||
    rawMaxProfiles === "unlimited" ||
    parseInt(rawMaxProfiles) >= 999999;

  const isUnlimitedDaily =
    rawDailyLimit === "Unlimited" ||
    rawDailyLimit === "unlimited" ||
    parseInt(rawDailyLimit) >= 999999;

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

  // Interest Calculations
  const isUnlimitedInterest =
    rawMaxSendInterest === "Unlimited" ||
    rawMaxSendInterest === "unlimited" ||
    parseInt(rawMaxSendInterest) >= 999999;

  const isUnlimitedDailyInterest =
    rawDailyLimitSendInterest === "Unlimited" ||
    rawDailyLimitSendInterest === "unlimited" ||
    parseInt(rawDailyLimitSendInterest) >= 999999;

  const parsedMaxInterest = parseInt(rawMaxSendInterest) || 0;
  const parsedDailyInterest = parseInt(rawDailyLimitSendInterest) || 0;

  const interestUsagePercent = isUnlimitedInterest ? 0 : parsedMaxInterest > 0 ? Math.min((interestSentCount / parsedMaxInterest) * 100, 100) : 0;
  const interestDailyPercent = isUnlimitedDailyInterest ? 0 : parsedDailyInterest > 0 ? Math.min((dailyInterestSentCount / parsedDailyInterest) * 100, 100) : 0;

  const remainingInterest = isUnlimitedInterest ? "Unlimited" : parsedMaxInterest - interestSentCount;
  const remainingDailyInterest = isUnlimitedDailyInterest ? "Unlimited" : parsedDailyInterest - dailyInterestSentCount;

  // Contact Calculations
  const isUnlimitedContact =
    rawMaxViewContact === "Unlimited" ||
    rawMaxViewContact === "unlimited" ||
    parseInt(rawMaxViewContact) >= 999999;

  const isUnlimitedDailyContact =
    rawDailyLimitViewContact === "Unlimited" ||
    rawDailyLimitViewContact === "unlimited" ||
    parseInt(rawDailyLimitViewContact) >= 999999;

  const parsedMaxContact = parseInt(rawMaxViewContact) || 0;
  const parsedDailyContact = parseInt(rawDailyLimitViewContact) || 0;

  const contactUsagePercent = isUnlimitedContact ? 0 : parsedMaxContact > 0 ? Math.min((contactViewCount / parsedMaxContact) * 100, 100) : 0;
  const contactDailyPercent = isUnlimitedDailyContact ? 0 : parsedDailyContact > 0 ? Math.min((dailyContactViewCount / parsedDailyContact) * 100, 100) : 0;

  const remainingContact = isUnlimitedContact ? "Unlimited" : parsedMaxContact - contactViewCount;
  const remainingDailyContact = isUnlimitedDailyContact ? "Unlimited" : parsedDailyContact - dailyContactViewCount;

  return (
    <div className="col-md-12 col-lg-6 col-xl-4 db-sec-com h-100">
      <h2 className="db-tit">Active plan benefits</h2>
      <div className="db-pro-stat h-100" style={{ minHeight: "450px", display: "flex", flexDirection: "column" }}>
        {/* Dropdown options */}
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-bs-toggle="dropdown"
          >
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a
                className="dropdown-item"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/user-plan-page`);
                }}
              >
                Plan details
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/user/user-plan-selection`);
                }}
              >
                Upgrade Plan
              </a>
            </li>
          </ul>
        </div>

        <h6 className="tit-top-curv">
          Current plan benefits
        </h6>

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

        {/* Interest Usage */}
        <div className="mb-4">
          <strong>Interest Requests (Total)</strong>
          <div className="d-flex justify-content-between small text-muted">
            <span>{interestSentCount} used</span>
            <span>{isUnlimitedInterest ? "Unlimited" : parsedMaxInterest} total</span>
          </div>
          {!isUnlimitedInterest && (
            <div className="progress mt-2" style={{ height: "8px" }}>
              <div className="progress-bar bg-warning" style={{ width: `${interestUsagePercent}%` }}></div>
            </div>
          )}
          <small className="text-muted d-block mb-3">
            Remaining: {remainingInterest > 0 || isUnlimitedInterest ? remainingInterest : 0}
          </small>

          {(isUnlimitedDailyInterest || parsedDailyInterest > 0 || sendInterestRequest === "Yes") && (
            <>
              <strong>Interest Requests (Daily)</strong>
              <div className="d-flex justify-content-between small text-muted">
                <span>{dailyInterestSentCount} used</span>
                <span>{isUnlimitedDailyInterest ? "Unlimited" : parsedDailyInterest} total</span>
              </div>
              {!isUnlimitedDailyInterest && (
                <div className="progress mt-2" style={{ height: "8px" }}>
                  <div className="progress-bar bg-info" style={{ width: `${interestDailyPercent}%` }}></div>
                </div>
              )}
              <small className="text-muted d-block">
                Remaining Today: {remainingDailyInterest > 0 || isUnlimitedDailyInterest ? remainingDailyInterest : 0}
              </small>
            </>
          )}
        </div>

        {/* Contact View Usage */}
        <div className="mb-4">
          <strong>Contact Views (Total)</strong>
          <div className="d-flex justify-content-between small text-muted">
            <span>{contactViewCount} used</span>
            <span>{isUnlimitedContact ? "Unlimited" : parsedMaxContact} total</span>
          </div>
          {!isUnlimitedContact && (
            <div className="progress mt-2" style={{ height: "8px" }}>
              <div className="progress-bar bg-warning" style={{ width: `${contactUsagePercent}%` }}></div>
            </div>
          )}
          <small className="text-muted d-block mb-3">
            Remaining: {remainingContact > 0 || isUnlimitedContact ? remainingContact : 0}
          </small>

          {(isUnlimitedDailyContact || parsedDailyContact > 0 || viewContactDetails === "Yes") && (
            <>
              <strong>Contact Views (Daily)</strong>
              <div className="d-flex justify-content-between small text-muted">
                <span>{dailyContactViewCount} used</span>
                <span>{isUnlimitedDailyContact ? "Unlimited" : parsedDailyContact} total</span>
              </div>
              {!isUnlimitedDailyContact && (
                <div className="progress mt-2" style={{ height: "8px" }}>
                  <div className="progress-bar bg-info" style={{ width: `${contactDailyPercent}%` }}></div>
                </div>
              )}
              <small className="text-muted d-block">
                Remaining Today: {remainingDailyContact > 0 || isUnlimitedDailyContact ? remainingDailyContact : 0}
              </small>
            </>
          )}
        </div>

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

          {sendInterestRequest === "Yes" && (
            <>
              <li className="mb-2">
                ✔ Send interest (Total): {isUnlimitedInterest ? "Unlimited" : parsedMaxInterest}
              </li>
              <li className="mb-2">
                ✔ Send interest (Daily): {isUnlimitedDailyInterest ? "Unlimited" : parsedDailyInterest}
              </li>
            </>
          )}

          {viewContactDetails === "Yes" && (
            <>
              <li className="mb-2">
                ✔ Contact View (Total): {isUnlimitedContact ? "Unlimited" : parsedMaxContact}
              </li>
              <li className="mb-2">
                ✔ Contact View (Daily): {isUnlimitedDailyContact ? "Unlimited" : parsedDailyContact}
              </li>
            </>
          )}

        </ul>

        <div className="mt-4 pt-3 border-top small text-muted">
          Valid Till: <strong>{subscriptionValidTo}</strong>
        </div>

      </div>
    </div>
  );
};

export default ActivePlanCard;