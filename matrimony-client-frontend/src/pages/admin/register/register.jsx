import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

// Import images
import logo from '../../../assets/admin/assets/img/logo - dark.png';
import bg1 from '../../../assets/admin/assets/img/bg/bg-01.webp';
import bg2 from '../../../assets/admin/assets/img/bg/bg-02.png';
import bg3 from '../../../assets/admin/assets/img/bg/bg-03.webp';
import authBg from '../../../assets/admin/assets/img/bg/authentication-bg-01.webp';
import facebookLogo from '../../../assets/admin/assets/img/icons/facebook-logo.svg';
import googleLogo from '../../../assets/admin/assets/img/icons/google-logo.svg';
import appleLogo from '../../../assets/admin/assets/img/icons/apple-logo.svg';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
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
                  <div className="col-lg-10 mx-auto vh-100">
                    <form onSubmit={handleSubmit} className="vh-100">
                      <div className="vh-100 d-flex flex-column justify-content-between p-4 pb-0">
                        <div className="mx-auto mb-4 text-center">
                          <img src={logo} width="240px" className="img-fluid" alt="Logo" />
                        </div>
                        <div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Sign Up</h2>
                            <p className="mb-0">Please enter your details to sign up</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="form-control border-end-0"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-user"></i>
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control border-end-0"
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail"></i>
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="pass-group" style={{ position: 'relative' }}>
                              <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-control"
                                style={{ paddingRight: '40px' }}
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                  position: 'absolute',
                                  right: '10px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#6c757d',
                                  padding: '5px'
                                }}
                              >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <div className="pass-group" style={{ position: 'relative' }}>
                              <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-control"
                                style={{ paddingRight: '40px' }}
                              />
                              <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                style={{
                                  position: 'absolute',
                                  right: '10px',
                                  top: '50%',
                                  transform: 'translateY(-50%)',
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#6c757d',
                                  padding: '5px'
                                }}
                              >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <input
                                  className="form-check-input"
                                  id="agreeTerms"
                                  type="checkbox"
                                  name="agreeTerms"
                                  checked={formData.agreeTerms}
                                  onChange={handleChange}
                                />
                                <label htmlFor="agreeTerms" className="form-check-label text-dark mt-0">
                                  Agree to <span className="text-primary">Terms & Privacy</span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button 
                              type="submit" 
                              className="btn btn-primary w-100"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">
                              Already have an account?
                              <Link to="/employer/login" className="hover-a">Sign In</Link>
                            </h6>
                          </div>
                          <div className="login-or">
                            <span className="span-or">Or</span>
                          </div>
                          <div className="mt-2">
                            <div className="d-flex align-items-center justify-content-center flex-wrap">
                              <div className="text-center me-2 flex-fill">
                                <button
                                  type="button"
                                  className="br-10 p-2 btn btn-info d-flex align-items-center justify-content-center"
                                >
                                  <img
                                    className="img-fluid m-1"
                                    src={facebookLogo}
                                    alt="Facebook"
                                  />
                                </button>
                              </div>
                              <div className="text-center me-2 flex-fill">
                                <button
                                  type="button"
                                  className="br-10 p-2 btn btn-outline-light border d-flex align-items-center justify-content-center"
                                >
                                  <img
                                    className="img-fluid m-1"
                                    src={googleLogo}
                                    alt="Google"
                                  />
                                </button>
                              </div>
                              <div className="text-center flex-fill">
                                <button
                                  type="button"
                                  className="bg-dark br-10 p-2 btn btn-dark d-flex align-items-center justify-content-center"
                                >
                                  <img
                                    className="img-fluid m-1"
                                    src={appleLogo}
                                    alt="Apple"
                                  />
                                </button>
                              </div>
                            </div>
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

export default AdminRegister;