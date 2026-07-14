import React, { useEffect, useState } from "react";
import planIcon from "../../assets/images/icon/plan.png";
import { getMyActivePlanData } from "../../api/axiosService/userAuthService";
import { useNavigate } from "react-router-dom";
import { FaCrown, FaEllipsisH } from "react-icons/fa";
import { FiCreditCard, FiClock, FiCalendar } from "react-icons/fi";

const PlanDetails = ({ externalPlanData, noWrapper = false }) => {
  const navigate = useNavigate();
  const [planData, setPlanData] = useState(externalPlanData || null);
  const [loading, setLoading] = useState(!externalPlanData);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (externalPlanData) {
      setPlanData(externalPlanData);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMyActivePlanData(userId);

        if (response.status === 200) {
          setPlanData(response?.data?.activePlan);
        } else {
          setError("No active plan found");
        }
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch plan data");
        console.error("Error fetching plan data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Parse date from DD/MM/YYYY, hh:mm:ss format
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [datePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  // Calculate validity
  const getValidityPeriod = (validFrom, validTo) => {
    const fromDate = parseDate(validFrom);
    const toDate = parseDate(validTo);
    if (!fromDate || !toDate) return "N/A";

    const diffTime = Math.abs(toDate - fromDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 365) {
      const years = Math.floor(diffDays / 365);
      return `${years} Year${years > 1 ? "s" : ""}`;
    } else if (diffDays >= 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} Month${months > 1 ? "s" : ""}`;
    } else {
      return `${diffDays} Day${diffDays > 1 ? "s" : ""}`;
    }
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = parseDate(dateStr);
    if (!date) return "N/A";
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getRemainingDays = (validFrom, validTo) => {
    const startDate = parseDate(validFrom);
    const endDate = parseDate(validTo);

    if (!startDate || !endDate) return "N/A";

    const today = new Date();

    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Expired";

    return diffDays;
  };

  if (loading) {
    const Content = (
        <div className="plan-details-card d-flex flex-column w-100 justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="spinner-border" role="status" style={{ color: '#6d28d9' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fw-bold">Loading plan details...</p>
        </div>
    );
    return noWrapper ? Content : <div className="col-lg-3 col-md-6 mb-4 d-flex">{Content}</div>;
  }

  if (error || !planData) {
    const Content = (
        <div className="plan-details-card d-flex flex-column w-100">
          <div className="plan-details-header d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <FaCrown style={{ color: '#9ca3af', fontSize: '18px', marginRight: '8px' }} />
              <h3 className="plan-details-title m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>Your Plan</h3>
            </div>
            <FaEllipsisH style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate(`/user/user-plan-page`)} />
          </div>
          
          <div className="d-flex flex-column align-items-center justify-content-center mb-4 w-100 flex-grow-1">
            <div style={{
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              backgroundColor: '#f3f4f6', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <FiCreditCard size={32} style={{ color: '#9ca3af' }} />
            </div>
            <h5 className="fw-bold text-dark mb-2" style={{ fontSize: '16px' }}>Free Member</h5>
            <p className="text-muted text-center" style={{ fontSize: '13px', padding: '0 10px', margin: '0' }}>
              Upgrade to a premium plan to unlock contact details and send unlimited interests.
            </p>
          </div>
          
          <div className="mt-auto w-100">
            <button onClick={() => navigate("/user/user-plan-selection")} className="dash-btn-primary w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#6d28d9', border: 'none', borderRadius: '8px', padding: '12px 0', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
              <FaCrown style={{ marginRight: '8px' }} /> Upgrade Now
            </button>
          </div>
        </div>
    );
    return noWrapper ? Content : <div className="col-lg-3 col-md-6 mb-4 d-flex">{Content}</div>;
  }

  const Content = (
      <div className="plan-details-card d-flex flex-column w-100">
        <div className="plan-details-header d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <FaCrown style={{ color: '#f59e0b', fontSize: '18px', marginRight: '8px' }} />
            <h3 className="plan-details-title m-0 fw-bold text-dark" style={{ fontSize: '15px' }}>Your Plan</h3>
          </div>
          <FaEllipsisH style={{ color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }} onClick={() => navigate(`/user/user-plan-page`)} />
        </div>
        
        <div className="d-flex flex-column align-items-center justify-content-center mb-4 w-100">
          <img src={planIcon} alt="Plan Icon" className="img-fluid mb-2" style={{ height: '90px' }} />
          <span className="dash-badge dash-badge-premium d-inline-flex align-items-center justify-content-center px-3 py-1 fw-bold mt-2" style={{ backgroundColor: '#fef3c7', color: '#b45309', borderRadius: '4px', fontSize: '11px' }}>
            {planData.subscriptionType ? planData.subscriptionType.toUpperCase() : "PREMIUM PLAN"}
          </span>
        </div>
        <div className="d-flex justify-content-center w-100 mb-3">
          <ul className="plan-details-list list-unstyled" style={{ fontSize: '13px', margin: '0' }}>
            <li className="d-flex align-items-center mb-2"><FiCreditCard size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Amount:</span> <strong className="text-dark">₹{planData.subscriptionAmount || "0"}</strong></li>
            <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Validity:</span> <strong className="text-dark">{getValidityPeriod(planData.subscriptionValidFrom, planData.subscriptionValidTo)}</strong></li>
            <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Valid from:</span> <strong className="text-dark">{formatDate(planData.subscriptionValidFrom)}</strong></li>
            <li className="d-flex align-items-center mb-2"><FiClock size={15} style={{ color: '#9ca3af', marginRight: '10px' }} /> <span className="text-muted" style={{ display: 'inline-block', width: '75px' }}>Valid till:</span> <strong className="text-dark">{formatDate(planData.subscriptionValidTo)}</strong></li>
          </ul>
        </div>
        <div className="remaining-days-box d-flex align-items-center justify-content-center p-2 mb-3" style={{ backgroundColor: '#fffbeb', borderRadius: '6px', color: '#b45309', fontSize: '12px', fontWeight: 'bold' }}>
          <FiCalendar style={{ marginRight: '6px' }} /> Remaining Days: {getRemainingDays(planData.subscriptionValidFrom, planData.subscriptionValidTo)} days
        </div>
        <div className="mt-auto w-100 mb-5">
          <button onClick={() => navigate("/user/user-plan-selection")} className="dash-btn-primary w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#6d28d9', border: 'none', borderRadius: '8px', padding: '12px 0', color: 'white', fontWeight: 'bold', fontSize: '14px' }}>
            <FaCrown style={{ marginRight: '8px' }} /> Upgrade Now
          </button>
        </div>
      </div>
  );

  return noWrapper ? Content : <div className="col-lg-3 col-md-6 mb-4 d-flex">{Content}</div>;
};

export default PlanDetails;
