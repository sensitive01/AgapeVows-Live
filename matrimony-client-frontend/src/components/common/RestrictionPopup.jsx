import React from 'react';
import { useNavigate } from 'react-router-dom';

const RestrictionPopup = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}
        >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '750px', width: '90%' }}>
                <div className="modal-content shadow-lg" style={{ 
                    borderRadius: '8px', 
                    padding: '40px 30px', 
                    border: '4px solid #3c3c43', 
                    position: 'relative',
                    backgroundColor: 'white'
                }}>
                    
                    {/* Close Button */}
                    <button 
                        onClick={onClose}
                        style={{ 
                            position: 'absolute', 
                            top: '15px', 
                            right: '15px', 
                            background: 'transparent',
                            border: '1.5px solid #582b8a',
                            borderRadius: '50%',
                            width: '30px',
                            height: '30px',
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

                    <div className="d-flex flex-column flex-md-row align-items-center justify-content-center" style={{ width: '100%' }}>
                        
                        {/* Left Side Icon Area */}
                        <div 
                            className="d-flex justify-content-center align-items-center mb-4 mb-md-0" 
                            style={{ 
                                flex: '0 0 auto',
                                paddingRight: '40px',
                                borderRight: '1px solid #e0e0e0',
                            }}
                        >
                            <div 
                                style={{ 
                                    width: '130px', 
                                    height: '130px', 
                                    backgroundColor: '#f2ebf7', 
                                    borderRadius: '50%', 
                                    display: 'flex', 
                                    justifyContent: 'center', 
                                    alignItems: 'center', 
                                    position: 'relative' 
                                }}
                            >
                                <i className="fa fa-address-card" style={{ fontSize: '5rem', color: '#582b8a' }}></i>
                                
                                {/* Overlay Shield */}
                                <div 
                                    style={{ 
                                        position: 'absolute', 
                                        bottom: '8px', 
                                        right: '-4px', 
                                        backgroundColor: 'white', 
                                        borderRadius: '50%', 
                                        width: '46px',
                                        height: '46px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '2px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 1 }}>
                                        <i className="fa fa-shield" style={{ fontSize: '2.5rem', color: '#582b8a' }}></i>
                                        <i className="fa fa-check" style={{ fontSize: '1.1rem', color: 'white', position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%, -50%)' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Content Area */}
                        <div className="text-center d-flex flex-column justify-content-center align-items-center" style={{ flex: 1, paddingLeft: '40px' }}>
                            <p style={{ 
                                fontSize: '16px', 
                                color: '#4a4a4a', 
                                lineHeight: '1.8', 
                                marginBottom: '25px',
                                fontWeight: '400',
                                textAlign: 'center',
                                margin: '0 0 25px 0'
                            }}>
                                <strong style={{ color: '#582b8a', fontWeight: 'bold' }}>Complete your profile verification</strong> to activate your <strong style={{ color: '#582b8a', fontWeight: 'bold' }}>FREE Premium Welcome Plan</strong>, view member profiles, send interests, view contact numbers, access premium features, and to receive the <strong style={{ color: '#582b8a', fontWeight: 'bold' }}>'Verified'</strong> badge.
                            </p>
                            
                            <button
                                className="btn"
                                style={{ 
                                    backgroundColor: '#582b8a', 
                                    color: 'white', 
                                    borderRadius: '6px', 
                                    padding: '12px 30px', 
                                    fontWeight: '500',
                                    fontSize: '15px',
                                    transition: 'all 0.3s',
                                    border: 'none',
                                    minWidth: '220px'
                                }}
                                onClick={() => {
                                    onClose();
                                    navigate('/user/user-profile-page#id-proof-upload');
                                }}
                                onMouseEnter={(e) => { e.target.style.backgroundColor = '#4a2574'; }}
                                onMouseLeave={(e) => { e.target.style.backgroundColor = '#582b8a'; }}
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
                        border-bottom: 1px solid #e0e0e0;
                        padding-bottom: 30px;
                        padding-right: 0 !important;
                        margin-bottom: 30px !important;
                        width: 100%;
                    }
                    .d-flex.flex-column.flex-md-row > div:last-child {
                        padding-left: 0 !important;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default RestrictionPopup;
