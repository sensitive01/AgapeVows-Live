
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Import images
import logo from '../../../../public/images/logo2.png';
import bg1 from '../../../assets/employer-admin/assets/img/bg/bg-01.webp';
import bg2 from '../../../assets/employer-admin/assets/img/bg/bg-02.png';
import bg3 from '../../../assets/employer-admin/assets/img/bg/bg-03.webp';
import authBg from '../../../assets/employer-admin/assets/img/bg/authentication-bg-04.svg';
import { ForgotPasswordEmployerAdmin } from '../../../api/services/projectServices';

const EmployerAdminForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    employeradminEmail: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.employeradminEmail) {
      newErrors.employeradminEmail = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.employeradminEmail)) {
      newErrors.employeradminEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const response = await ForgotPasswordEmployerAdmin(formData.employeradminEmail);
      
      if (response.message === "OTP sent successfully") {
        setSuccess('OTP has been sent to your email address');
        // Navigate to OTP verification page with the email
        navigate('/employer-admin/verify-otp', { 
          state: { 
            email: formData.employeradminEmail,
            otp: response.otp // Only for development, remove in production
          } 
        });
      } else {
        setError(response.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      if (err.message.includes("not found")) {
        setError('Admin not found with the provided email');
      } else {
        setError(err.message || 'Failed to send OTP. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Main Wrapper */}
      <div className="main-wrapper">
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              <div className="col-lg-8">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src={bg1} className="bg-1" alt="Background 1" />
                    <img src={bg2} className="bg-2" alt="Background 2" />
                    <img src={bg3} className="bg-3" alt="Background 3" />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      <h1 className="text-white display-1" style={{ textAlign: 'center' }}>
                       Empowering Schools with seamless and intelligent staff management solutions.
                      </h1>
                      <div className="my-4 mx-auto authen-overlay-img">
                        <img src={authBg} alt="Authentication Background" />
                      </div>
                      <div>
                         <p className="text-white fs-20 fw-semibold text-center">
                          Empower your teams operations effortlessly.
                          <br />
                          Elevate your entire institution.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                  <div className="col-md-10 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4">
                        <div className="mx-auto mb-4 text-center">
                          <img src={logo} width="240px" className="img-fluid" alt="Logo" />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Forgot Password?</h2>
                            <p className="mb-0">Enter your email address to receive a password reset OTP</p>
                          </div>

                          {error && (
                            <div className="alert alert-danger mb-3">
                              {error}
                            </div>
                          )}

                          {success && (
                            <div className="alert alert-success mb-3">
                              {success}
                            </div>
                          )}

                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="email"
                                name="employeradminEmail"
                                value={formData.employeradminEmail}
                                onChange={handleChange}
                                className={`form-control border-end-0 ${errors.employeradminEmail ? 'is-invalid' : ''}`}
                                placeholder="Enter your registered email"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail"></i>
                              </span>
                              {errors.employeradminEmail && <div className="invalid-feedback">{errors.employeradminEmail}</div>}
                            </div>
                          </div>
                          <div className="mb-3">
                            <button
                              type="submit"
                              className="btn btn-primary w-100"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                  Sending OTP...
                                </>
                              ) : 'Send OTP'}
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">Return to
                              <Link to="/employer-admin/login" className="hover-a"> Sign In</Link>
                            </h6>
                          </div>
                        </div>
                        <div className="mt-5 pb-4 text-center">
                          <p className="mb-0 text-gray-9">Copyright &copy; 2025 - EdProfio</p>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerAdminForgotPassword;