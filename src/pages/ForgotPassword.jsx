import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your API endpoint to send the reset email here
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-wrapper">
      <div className="forgot-password-container">
        <div className="logo-section">
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="forgot-password-header">
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaEnvelope className="icon-mr" />
            Reset Password
          </h2>
        </div>

        {submitted ? (
          <div className="success-message show-message">
            If this email exists, reset instructions have been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope className="icon-mr" /> Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="forgot-password-input"
              />
            </div>

            <button type="submit" className="forgot-password-button">
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="forgot-password-footer">
          <Link to="/login" className="back-to-login-link">
            <FaArrowLeft className="icon-mr" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;