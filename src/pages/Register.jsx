import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Hakikisha path ni sahihi
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaBuilding, FaSignInAlt } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path ni sahihi
import './Register.css'; // Hii ni muhimu sana kwa CSS mpya!

const Register = () => {
  const [formData, setFormData] = useState({
    role: 'applicant',
    position: '',
    department: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth(); // Hakikisha useAuth context inafanya kazi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Tafadhali jaza barua pepe na neno la siri.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Neno la siri lazima liwe angalau herufi 6.');
      return;
    }

    if (formData.role === 'applicant' && (!formData.position || !formData.department)) {
      setError('Tafadhali jaza nafasi yako ya sasa na idara.');
      return;
    }

    // Simulate registration
    register(formData); // Hii inapaswa kuunganishwa na backend halisi
    navigate('/login'); // Redirect to login after successful registration
  };

  return (
    <div className="register-wrapper"> {/* Kifunga kikuu cha ukurasa mzima */}
      <div className="register-container"> {/* Container kuu ya fomu */}
        <div className="logo-section"> {/* Sehemu ya logo */}
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="register-header"> {/* Sehemu ya vichwa vya habari */}
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaSignInAlt className="icon-mr" />
            Jisajili Akaunti Yako
          </h2>
        </div>

        {error && (
          <div className="error-message show-error"> {/* Ujumbe wa makosa */}
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Role */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <FaUser className="icon-mr" /> Nafasi
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="register-select"
            >
              <option value="applicant">Mwombaji</option>
              <option value="university-community">Jumuiya ya Chuo Kikuu</option>
            </select>
          </div>

          {/* Conditional fields for applicant */}
          {formData.role === 'applicant' && (
            <>
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  <FaBriefcase className="icon-mr" /> Nafasi ya Sasa
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Ingiza nafasi yako ya sasa"
                  required
                  className="register-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  <FaBuilding className="icon-mr" /> Idara
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="register-select"
                >
                  <option value="">Chagua Idara</option>
                  <option value="science">Sayansi</option>
                  <option value="computing">Teknolojia ya Habari</option>
                  <option value="engineering">Uhandisi</option>
                  <option value="business">Biashara</option>
                  <option value="education">Elimu</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="icon-mr" /> Barua pepe
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Ingiza barua pepe yako"
              className="register-input"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="icon-mr" /> Neno la siri
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Ingiza neno la siri (angalau herufi 6)"
              className="register-input"
            />
          </div>

          <button
            type="submit"
            className="register-button"
          >
            Jisajili
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            Tayari una akaunti?{' '}
            <Link to="/login" className="footer-link">Ingia</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;