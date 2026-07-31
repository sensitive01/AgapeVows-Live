import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestrictionPopup = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div 
            className="modal show d-block" 
            tabIndex="-1" 
            style={{ 
                backgroundColor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(3px)'
            }}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '600px' }}>
                <div className="modal-content shadow-lg" style={{ borderRadius: '16px', padding: '40px 30px', border: 'none', position: 'relative' }}>
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        style={{ 
                            position: 'absolute', 
                            top: '12px', 
                            right: '15px', 
                            background: 'transparent',
                            border: '1.5px solid #582b8a',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#582b8a',
                            fontSize: '16px',
                            cursor: 'pointer',
                            zIndex: 10,
                            padding: 0
                        }}
                        onMouseEnter={(e) => { e.target.style.backgroundColor = '#582b8a'; e.target.style.color = 'white'; }}
                        onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#582b8a'; }}
                    >
                        <i className="fa fa-times" style={{ pointerEvents: 'none', fontWeight: '100' }}></i>
                    </button>

                    <div className="d-flex flex-column flex-md-row align-items-center mt-3 pt-2">
                        
                        {/* Left Side Icon Area */}
                        <div 
                            className="pe-md-4 me-md-4 mb-4 mb-md-0 d-flex justify-content-center align-items-center" 
                            style={{ 
                                borderRight: '2px solid #f0f0f0', 
                                minWidth: '180px' 
                            }}
                        >
                            <div 
                                style={{ 
                                    width: '140px', 
                                    height: '140px', 
                                    backgroundColor: '#f6f0fa', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    position: 'relative' 
                                }}
                            >
                                <i className="fa fa-id-card-o" style={{ fontSize: '4.5rem', color: '#582b8a' }}></i>
                                
                                {/* Overlay Shield */}
                                <div 
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: '15px', 
                                        right: '10px', 
                                        backgroundColor: 'white', 
                                        borderRadius: '50%', 
                                        width: '45px',
                                        height: '45px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '4px'
                                    }}
                                >
                                    <i className="fa fa-shield" style={{ fontSize: '2.5rem', color: '#582b8a' }}></i>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Content Area */}
                        <div className="text-center text-md-center px-2" style={{ flex: 1 }}>
                            <p style={{ 
                                fontSize: '17px', 
                                color: '#4a4a4a', 
                                lineHeight: '1.6', 
                                marginBottom: '25px',
                                fontWeight: '500'
                            }}>
                                Please complete your profile verification to activate your <strong style={{ color: '#582b8a', fontWeight: '800' }}>FREE</strong> Welcome Plan, view member profiles, send interests, view contact numbers, access premium features, and receive the <strong style={{ color: '#582b8a', fontWeight: '800' }}>'Verified'</strong> badge.
                            </p>
                            
                            <button
                                className="btn shadow-sm"
                                style={{ 
                                    backgroundColor: '#582b8a', 
                                    color: 'white', 
                                    borderRadius: '8px', 
                                    padding: '12px 35px', 
                                    fontWeight: '600',
                                    fontSize: '16px',
                                    transition: 'all 0.3s'
                                }}
                                onClick={() => {
                                    onClose();
                                    navigate('/user/user-profile-page#id-proof-upload');
                                }}
                                onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 6px 15px rgba(88, 43, 138, 0.4)'; }}
                                onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; }}
                            >
                                Verify My Profile
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>
            
            <style>
                {`
                @media (max-width: 768px) {
                    .d-flex.flex-column.flex-md-row > div:first-child {
                        border-right: none !important;
                        border-bottom: 2px solid #f0f0f0;
                        padding-bottom: 20px;
                        padding-right: 0 !important;
                        margin-right: 0 !important;
                        margin-bottom: 20px !important;
                        width: 100%;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default RestrictionPopup;
