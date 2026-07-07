import React, { useEffect, useState } from "react";
import { getMyActivePlanData, getAllPlanDetails } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";
import { FiEye, FiHeart, FiPhone } from "react-icons/fi";
import { FaEllipsisH, FaCheck, FaGem, FaCalendarAlt } from "react-icons/fa";

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
    <div className="col-lg-6 col-md-12 mb-4 d-flex">
      <div className="active-plan-card d-flex flex-column w-100">
        <div className="active-plan-header d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            <div style={{ width: '24px', height: '24px', backgroundColor: '#f3e8ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              <FaGem style={{ color: '#8b5cf6', fontSize: '12px' }} />
            </div>
            <h3 className="active-plan-title m-0 fw-bold text-dark" style={{ fontSize: '14px' }}>Active Plan Benefits</h3>
          </div>
          <span className="dash-badge-active" style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '4px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 'bold' }}>Active</span>
        </div>
        
        <div className="active-plan-benefits-grid mt-2 flex-grow-1">
          <div className="row g-3">
            {/* Total Profile Views */}
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FiEye size={16} color="#3b82f6" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Profile Views</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{profilesViewedCount}</span>
                    {isUnlimitedProfiles ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedMax}</span>
                    )}
                  </div>
                  {!isUnlimitedProfiles ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${usagePercent}%`, backgroundColor: '#3b82f6', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Daily Profile View Limit */}
            {(isUnlimitedDaily || parsedDaily > 0) && (
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FiEye size={16} color="#22c55e" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Profile Views</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{dailyViewedCount}</span>
                    {isUnlimitedDaily ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedDaily}</span>
                    )}
                  </div>
                  {!isUnlimitedDaily ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${dailyPercent}%`, backgroundColor: '#22c55e', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {/* Interest Requests Total */}
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FiHeart size={16} color="#ef4444" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Interests</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{interestSentCount}</span>
                    {isUnlimitedInterest ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedMaxInterest}</span>
                    )}
                  </div>
                  {!isUnlimitedInterest ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${interestUsagePercent}%`, backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Interest Requests Daily */}
            {(isUnlimitedDailyInterest || parsedDailyInterest > 0 || sendInterestRequest === "Yes") && (
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FaCalendarAlt size={16} color="#ef4444" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Interests</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{dailyInterestSentCount}</span>
                    {isUnlimitedDailyInterest ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedDailyInterest}</span>
                    )}
                  </div>
                  {!isUnlimitedDailyInterest ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${interestDailyPercent}%`, backgroundColor: '#ef4444', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}

            {/* Contact Details Total */}
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FiPhone size={16} color="#8b5cf6" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Total Contacts</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{contactViewCount}</span>
                    {isUnlimitedContact ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedMaxContact}</span>
                    )}
                  </div>
                  {!isUnlimitedContact ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${contactUsagePercent}%`, backgroundColor: '#8b5cf6', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Details Daily */}
            {(isUnlimitedDailyContact || parsedDailyContact > 0 || viewContactDetails === "Yes") && (
            <div className="col-xl-4 col-6">
              <div className="usage-stat-card p-3 rounded h-100 d-flex flex-column" style={{ border: '1px solid #f3f4f6', backgroundColor: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div className="d-flex align-items-center mb-3">
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                    <FaCalendarAlt size={16} color="#8b5cf6" />
                  </div>
                  <span className="fw-bold" style={{ fontSize: '13px', color: '#374151' }}>Daily Contacts</span>
                </div>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827', lineHeight: '1' }}>{dailyContactViewCount}</span>
                    {isUnlimitedDailyContact ? (
                       <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 'bold' }}>Unlimited</span>
                    ) : (
                       <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>of {parsedDailyContact}</span>
                    )}
                  </div>
                  {!isUnlimitedDailyContact ? (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#e5e7eb' }}>
                      <div className="progress-bar" style={{ width: `${contactDailyPercent}%`, backgroundColor: '#8b5cf6', borderRadius: '2px' }}></div>
                    </div>
                  ) : (
                    <div className="progress" style={{ height: '4px', borderRadius: '2px', backgroundColor: '#d1fae5' }}>
                      <div className="progress-bar" style={{ width: '100%', backgroundColor: '#10b981', borderRadius: '2px' }}></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            )}
          </div>
        </div>
        
        <div className="active-plan-bottom mt-4">
          <div className="p-3" style={{ backgroundColor: '#faf5ff', borderRadius: '8px', border: '1px solid #f3e8ff' }}>
            <div className="row g-2" style={{ fontSize: '13px', fontWeight: '500', color: '#4b5563' }}>
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>{canViewProfiles === "All Profiles" ? "Can view all profiles" : "Only premium profiles visible"}</span></div>
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Send interest (Total): <strong className="text-dark">{isUnlimitedInterest ? "Unlimited" : parsedMaxInterest}</strong></span></div>
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Contact View (Total): <strong className="text-dark">{isUnlimitedContact ? "Unlimited" : parsedMaxContact}</strong></span></div>
              
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Contact details access</span></div>
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Send interest (Daily): <strong className="text-dark">{isUnlimitedDailyInterest ? "Unlimited" : parsedDailyInterest}</strong></span></div>
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>Contact View (Daily): <strong className="text-dark">{isUnlimitedDailyContact ? "Unlimited" : parsedDailyContact}</strong></span></div>
              
              <div className="col-12 col-md-4 d-flex align-items-center mb-1"><FaCheck style={{ color: '#8b5cf6', marginRight: '8px' }} /> <span>{sendInterestRequest === "Yes" ? "Can send interest request" : "Cannot send interest request"}</span></div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center text-muted small mt-3" style={{ fontSize: '12px' }}>
          <div className="d-flex align-items-center">
            <FaCalendarAlt size={13} style={{ color: '#9ca3af', marginRight: '6px', marginBottom: '2px' }} /> 
            <span>Valid till: <strong className="text-dark">{subscriptionValidTo}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePlanCard;
