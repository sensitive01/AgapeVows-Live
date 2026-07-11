import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfileViewLimit } from '../api/axiosService/userAuthService';
import UpgradePopup from '../components/common/UpgradePopup';
import { toast } from 'react-toastify';

export const useProfileNavigation = () => {
    const navigate = useNavigate();
    const [showUpgradePopup, setShowUpgradePopup] = useState(false);
    const [upgradePopupType, setUpgradePopupType] = useState('limit');
    const [isChecking, setIsChecking] = useState(false);

    const navigateToProfile = async (profileId, viewerId, e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (isChecking) return; // Prevent double clicks
        
        try {
            setIsChecking(true);
            await checkProfileViewLimit(profileId, viewerId);
            
            // Limit check passed, we can navigate
            if (e && (e.ctrlKey || e.metaKey)) {
                const newTab = window.open(`/profile-more-details/${profileId}`, '_blank');
                if (newTab) newTab.focus();
            } else {
                navigate(`/profile-more-details/${profileId}`);
            }
        } catch (err) {
            if (err.response?.status === 403) {
                // If the error message mentions Platinum/Gold, we can adjust type if needed, 
                // but default limit popup shows upgrade message.
                // You can add logic here if you want 'premium' vs 'limit' distinction.
                // Currently, `checkProfileViewLimit` returns specific messages, but let's stick to standard limit popup.
                setUpgradePopupType('limit');
                setShowUpgradePopup(true);
            } else {
                // Fallback: If network error or other, just navigate and let the MoreDetails page handle it
                console.error("Error checking limit", err);
                navigate(`/profile-more-details/${profileId}`);
            }
        } finally {
            setIsChecking(false);
        }
    };

    const renderLimitPopup = () => {
        if (!showUpgradePopup) return null;
        return (
            <UpgradePopup 
                onClose={() => setShowUpgradePopup(false)} 
                type={upgradePopupType}
            />
        );
    };

    return { navigateToProfile, renderLimitPopup };
};
