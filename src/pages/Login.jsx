import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path ni sahihi kabisa
import './Login.css'; // Hakikisha hii ipo hapa!

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'applicant',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Hakikisha useAuth context inafanya kazi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setError('Tafadhali jaza sehemu zote.');
      return;
    }

    if (credentials.password.length < 6) {
      setError('Neno la siri lazima liwe angalau herufi 6.');
      return;
    }

    // Simulate login function from context (hii ni simulation tu)
    login({ email: credentials.email, role: credentials.role });

    const redirectPaths = {
      applicant: '/applicant/criteria',
      'university-community': '/university-community/dashboard',
      'school-team': '/school-team/category-criteria',
      'university-committee': '/university-committee/applications',
      reviewer: '/reviewer/applications',
      'hr-board': '/hr-board/dashboard',
      'university-council': '/university-council/dashboard',
    };

    const redirectPath = redirectPaths[credentials.role] || '/unauthorized';
    navigate(redirectPath);
  };

  return (
    <div className="login-wrapper"> {/* Kifunga kikuu cha ukurasa mzima */}
      <div className="login-container"> {/* Container kuu ya fomu */}
        <div className="logo-section"> {/* Sehemu ya logo */}
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="login-header"> {/* Sehemu ya vichwa vya habari */}
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaSignInAlt className="icon-mr" />
            Ingia kwenye Akaunti Yako
          </h2>
        </div>

        {error && <div className="error-message show-error">{error}</div>} {/* Ujumbe wa makosa */}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="icon-mr" />
              Barua pepe
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Ingiza barua pepe yako"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="icon-mr" />
              Neno la siri
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Ingiza neno lako la siri"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <FaUser className="icon-mr" />
              Nafasi
            </label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
              className="login-select"
            >
              <option value="applicant">Mwombaji</option>
              <option value="school-team">Timu ya Ukuzaji ya Shule/Taasisi</option>
              <option value="university-committee">Kamati ya Chuo Kikuu</option>
              <option value="reviewer">Mhakiki</option>
              <option value="hr-board">Bodi ya Utumishi</option>
              <option value="university-council">Baraza la Chuo Kikuu</option>
              <option value="university-community">Jumuiya ya Chuo Kikuu</option>
            </select>
          </div>

          <button type="submit" className="login-button">
            <FaSignInAlt className="icon-mr" />
            Ingia
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Huna akaunti?{' '}
            <Link to="/register" className="footer-link">Jisajili</Link>
          </p>
          <p className="footer-text">
            <Link to="/forgot-password" className="footer-link">Umesahau neno la siri?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;