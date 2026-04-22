import React, { useState } from 'react';
import { FaUserPlus, FaUserCircle } from 'react-icons/fa';

const SignupPage = () => {
  const [selectedType, setSelectedType] = useState('employee');

  return (
    <>
      {/* Sub Visual of the page */}
      <div className="subvisual-block subvisual-theme-1 bg-light d-flex pt-60 pt-md-90 text-white"></div>
      
      {/* Main content */}
      <main className="jobplugin__main bg-light">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Decorative pattern" />
          </div>
          <br />
          
          <div className="jobplugin__container">
            {/* User Box */}
            <div className="jobplugin__userbox shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              
              <h1 className="text-secondary h3">Sign up for FREE</h1>
              
              <form action="#">
                <div className="jobplugin__userbox-condition">
                  {/* User Type Options */}
                  <div className="jobplugin__usertype">
                    <label className="jobplugin__usertype-radio">
                      <input 
                        type="radio" 
                        name="group" 
                        checked={selectedType === 'employee'}
                        onChange={() => setSelectedType('employee')}
                      />
                      <span className="jobplugin__usertype-radio__item">
                        <span className="jobplugin__usertype-radio__btn"></span>
                        For Employee
                      </span>
                    </label>
                    
                    <label className="jobplugin__usertype-radio">
                      <input 
                        type="radio" 
                        name="group" 
                        checked={selectedType === 'school'}
                        onChange={() => setSelectedType('school')}
                      />
                      <span className="jobplugin__usertype-radio__item">
                        <span className="jobplugin__usertype-radio__btn"></span>
                        For Employer
                      </span>
                    </label>
                  </div>
                  
                  {/* Single button with hover effects */}
                  <div className="jobplugin__userbox-button">
                    <a 
                      href={selectedType === 'employee' ? 'employee-registration' : 'school-registration'} 
                      className="jobplugin__button large jobplugin__bg-primary"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <FaUserPlus 
                        style={{
                          color: '#ffa500',
                          transition: 'all 0.3s ease'
                        }} 
                      /> 
                      {selectedType === 'employee' ? 'Join as an Employee' : 'Join as an Employer'}
                    </a>
                  </div>
                </div>
              </form>
              
              <br />
              
              <div className="jobplugin__userbox-seperator">
                <span>or</span>
              </div>
              
              <p className="jobplugin__userbox-textinfo">
                Already have an account?{' '}
                <a 
                  className="hover:jobplugin__text-primary" 
                  href="/login" 
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    transition: 'color 0.3s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <FaUserCircle style={{ color: 'black' }} /> 
                  <span style={{ 

                    textUnderlineOffset: '2px'
                  }}>
                    Log In
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Add custom hover styles */}
      <style jsx>{`
        .jobplugin__button.jobplugin__bg-primary:hover {
          background-color: #0b5c00 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .jobplugin__button.jobplugin__bg-primary:hover svg {
          transform: scale(1.1);
        }
        a.hover\\:jobplugin__text-primary:hover {
          color: #0b5c00 !important;
        }
        a.hover\\:jobplugin__text-primary:hover svg {
          color: #0b5c00 !important;
        }
      `}</style>
    </>
  );
};

export default SignupPage;