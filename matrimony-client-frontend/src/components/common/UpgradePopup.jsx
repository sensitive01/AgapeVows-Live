import React from "react";
import { useNavigate } from "react-router-dom";

const UpgradePopup = ({ onClose, type = "limit" }) => {
  const navigate = useNavigate();

  return (
    <div className="upgrade-popup">
      <div className="upgrade-content">
        <div className="upgrade-icon">{type === 'limit' ? '⚠️' : '🔒'}</div>
        <h3>{type === 'limit' ? 'Limit Reached' : 'Premium Feature'}</h3>
        <p>
          {type === 'limit'
            ? 'You have reached your limit. Please upgrade your plan to continue.'
            : 'Upgrade your plan to unlock premium features and connect directly with your matches.'}
        </p>
        <div className="upgrade-buttons">
          <button onClick={() => navigate("/user/user-plan-selection")} className="upgrade-btn">
            Upgrade Now
          </button>
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpgradePopup;
