import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Email address is required');
      return;
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setIsLoading(true);
      // Mock API call - replace with your actual endpoint
      const response = await axios.post('https://example.com/api/send-email-otp', {
        userEmail: email
      });

      // Mock response handling - adjust based on your API
      if (response.data.success) {
        navigate('/verify-otp', { state: { email } });
      } else {
        setError(response.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      // Mock error handling
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
      console.error('Forgot password error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="subvisual-block subvisual-theme-1 bg-white d-flex pt-60 text-white"></div>
      <div className="jobplugin__main">
        <div className="jobplugin__main-holder">
          <span className="jobplugin__pattern default-right"></span>
          <span className="jobplugin__pattern default-left"></span>
          <div className="jobplugin__visual-pattern">
            <img src="images/visual-pattern.png" alt="Decorative pattern" />
          </div>
          <br />
          <div className="jobplugin__container">
            <div className="jobplugin__userbox bg-light shadow">
              <span className="jobplugin__userbox-bar jobplugin__bg-primary"></span>
              <span className="jobplugin__userbox-bar"></span>
              
              <h1 className="text-secondary h3 mb-4">Forgot Password</h1>
              <p className="mb-4">Enter your registered email address to receive OTP</p>

              {error && (
                <div className="alert alert-danger mb-4">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="jobplugin__form-row mb-4">
                  <div className="jobplugin__form-field">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Enter Email Address"
                      style={{ padding: "10px 15px" }}
                    />
                  </div>
                </div>

                <div className="jobplugin__userbox-button">
                  <button
                    type="submit"
                    className="jobplugin__button large jobplugin__bg-primary hover:jobplugin__bg-secondary"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <p>
                  Remember your password?{' '}
                  <a href="/login" className="text-primary hover:underline">
                    Login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;