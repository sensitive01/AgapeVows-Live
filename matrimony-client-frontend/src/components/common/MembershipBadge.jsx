import React from "react";

const MembershipBadge = ({ user, isMini = false, isMinimal = false }) => {
  if (!user || (!user.isAnySubscriptionTaken && !user.paymentDetails)) return null;

  // Find active plan name
  let planName = "";
  
  if (user.paymentDetails && user.paymentDetails.length > 0) {
    const activePlans = user.paymentDetails.filter(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );
    
    if (activePlans.length > 0) {
      // Sort by validFrom descending to get the latest active plan
      activePlans.sort((a, b) => new Date(b.subscriptionValidFrom) - new Date(a.subscriptionValidFrom));
      planName = activePlans[0].subscriptionType;
    }
  }

  if (!planName) {
      // Check for legacy or direct field
      planName = user.subscriptionType || user.planName || "";
  }

  if (!planName && !user.isAnySubscriptionTaken) return null;

  const normalizedPlan = planName?.toLowerCase() || "";

  let badgeClass = "badge-premium"; // default style
  let iconClass = "fa-star"; // default icon
  let label = planName || "Premium"; // use actual plan name!

  if (normalizedPlan.includes("gold") || normalizedPlan.includes("golden")) {
    badgeClass = "badge-gold";
    iconClass = "fa-crown";
    label = planName || "Golden";
  } else if (normalizedPlan.includes("platinum")) {
    badgeClass = "badge-platinum";
    iconClass = "fa-diamond";
    label = planName || "Platinum";
  } else if (normalizedPlan.includes("premium")) {
    badgeClass = "badge-premium";
    iconClass = "fa-star";
    label = planName || "Premium";
  } else if (normalizedPlan.includes("basic") || normalizedPlan.includes("free")) {
    badgeClass = "badge-premium";
    iconClass = "fa-user";
    label = planName || "Basic";
  } else if (!planName && !user.isAnySubscriptionTaken) {
    return null;
  }

  return (
    <div className={`membership-badge ${badgeClass} ${isMini ? "badge-mini" : ""} ${isMinimal ? "badge-minimal" : ""} shadow-sm`}>
      <i className={`fa ${iconClass} badge-icon`}></i>
      <span className="badge-text">{label}</span>
    </div>
  );
};

export default MembershipBadge;
