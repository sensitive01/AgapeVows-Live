import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkProfileViewLimit, getUserProfile } from '../api/axiosService/userAuthService';
import UpgradePopup from '../components/common/UpgradePopup';
import RestrictionPopup from '../components/common/RestrictionPopup';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const useProfileNavigation = () => {
    const navigate = useNavigate();
    const [showUpgradePopup, setShowUpgradePopup] = useState(false);
    const [upgradePopupType, setUpgradePopupType] = useState('limit');
    const [showRestrictionPopup, setShowRestrictionPopup] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    const executeIfUnrestricted = async (action) => {
        if (isChecking) return;
        setIsChecking(true);
        try {
            const viewerId = localStorage.getItem("userId");
            if (viewerId) {
                const userRes = await getUserProfile(viewerId);
                const userData = userRes?.data?.data || userRes?.data;
                if (userData?.isRestricted) {
                    setShowRestrictionPopup(true);
                    return;
                }
            }
            action();
        } catch (err) {
            console.error("Error checking restriction status:", err);
            action(); // Fallback to allow action on error
        } finally {
            setIsChecking(false);
        }
    };

    const navigateToProfile = async (profileId, viewerId, e) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }

        if (isChecking) return; // Prevent double clicks

        try {
            setIsChecking(true);

            // 1. Check if the user's own profile is hidden
            if (viewerId) {
                try {
                    const userRes = await getUserProfile(viewerId);
                    const userData = userRes?.data?.data || userRes?.data;
                    
                    if (userData?.isRestricted) {
                        setShowRestrictionPopup(true);
                        setIsChecking(false);
                        return;
                    }

                    if (userData?.profileVisibility === 'Hidden') {
                        Swal.fire({
                            title: "Profile Hidden",
                            text: "Your profile is hidden. Unhide your profile to view other member profiles.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Unhide Now",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {
                                navigate("/user/user-settings-page");
                            }
                        });
                        setIsChecking(false);
                        return;
                    }
                } catch (userErr) {
                    console.error("Error checking user visibility", userErr);
                }
            }

            // 2. Check view limit
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
        if (showRestrictionPopup) {
            return <RestrictionPopup onClose={() => setShowRestrictionPopup(false)} />;
        }
        if (!showUpgradePopup) return null;
        return (
            <UpgradePopup
                onClose={() => setShowUpgradePopup(false)}
                type={upgradePopupType}
            />
        );
    };

    return { navigateToProfile, renderLimitPopup, executeIfUnrestricted };
};
