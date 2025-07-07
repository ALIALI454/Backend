import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path ni sahihi
import './ForgotPassword.css'; // Hii ni muhimu sana kwa CSS mpya!

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hapa unaweza kuita API endpoint yako kutuma barua pepe ya kuweka upya neno la siri
    setSubmitted(true);
  };

  return (
    <div className="forgot-password-wrapper"> {/* Kifunga kikuu cha ukurasa mzima */}
      <div className="forgot-password-container"> {/* Container kuu ya fomu */}
        <div className="logo-section"> {/* Sehemu ya logo */}
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="forgot-password-header"> {/* Sehemu ya vichwa vya habari */}
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaEnvelope className="icon-mr" />
            Weka Upya Neno la Siri
          </h2>
        </div>

        {submitted ? (
          <div className="success-message show-message"> {/* Ujumbe wa mafanikio */}
            Ikiwa barua pepe hii ipo, maelekezo ya kuweka upya yametumwa.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FaEnvelope className="icon-mr" /> Anwani ya Barua pepe
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Ingiza barua pepe yako"
                className="forgot-password-input"
              />
            </div>

            <button type="submit" className="forgot-password-button">
              Tuma Maelekezo ya Kuweka Upya
            </button>
          </form>
        )}

        <div className="forgot-password-footer">
          <Link to="/login" className="back-to-login-link">
            <FaArrowLeft className="icon-mr" />
            Rudi Kwenye Kuingia
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;