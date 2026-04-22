import React from "react";

const MembershipBadge = ({ user, isMini = false, isMinimal = false }) => {
  if (!user || (!user.isAnySubscriptionTaken && !user.paymentDetails)) return null;

  // Find active plan name
  let planName = "";
  
  if (user.paymentDetails && user.paymentDetails.length > 0) {
    const activePlan = user.paymentDetails.find(
      (p) =>
        p.subscriptionStatus === "Active" &&
        new Date(p.subscriptionValidTo) > new Date()
    );
    if (activePlan) {
      planName = activePlan.subscriptionType;
    }
  }

  // If no specific plan name found but isAnySubscriptionTaken is true, 
  // we might have to fallback or it might be a legacy field.
  // In some cases, subscriptionType might be directly on the user object (if the backend sends it)
  if (!planName) {
      // Check for legacy or direct field
      planName = user.subscriptionType || user.planName || "";
  }

  if (!planName && !user.isAnySubscriptionTaken) return null;

  const normalizedPlan = planName?.toLowerCase() || "";

  let badgeClass = "";
  let iconClass = "";
  let label = "";

  if (normalizedPlan.includes("gold") || normalizedPlan.includes("golden")) {
    badgeClass = "badge-gold";
    iconClass = "fa-crown"; // Using Crown for Golden
    label = "Golden";
  } else if (normalizedPlan.includes("platinum")) {
    badgeClass = "badge-platinum";
    iconClass = "fa-diamond"; // or fa-gem
    label = "Platinum";
  } else if (normalizedPlan.includes("premium")) {
    badgeClass = "badge-premium";
    iconClass = "fa-star";
    label = "Premium";
  } else if (user.isAnySubscriptionTaken) {
    // Default fallback for generic subscription
    badgeClass = "badge-premium";
    iconClass = "fa-star";
    label = "Premium";
  } else {
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
