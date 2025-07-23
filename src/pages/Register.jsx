import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaBriefcase, FaBuilding, FaSignInAlt } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg'; // Make sure the path is correct
import './Register.css';

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
  const { register } = useAuth();

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
      setError('Please enter both email and password.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.role === 'applicant' && (!formData.position || !formData.department)) {
      setError('Please enter your current position and department.');
      return;
    }

    // Simulate registration (connect to real backend in production)
    register(formData);
    navigate('/login');
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div className="logo-section">
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="register-header">
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaSignInAlt className="icon-mr" />
            Create Your Account
          </h2>
        </div>

        {error && (
          <div className="error-message show-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Role */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <FaUser className="icon-mr" /> Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="register-select"
            >
              <option value="applicant">Applicant</option>
              <option value="university-community">University Community</option>
            </select>
          </div>

          {/* Applicant-specific fields */}
          {formData.role === 'applicant' && (
            <>
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  <FaBriefcase className="icon-mr" /> Current Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="Enter your current position"
                  required
                  className="register-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  <FaBuilding className="icon-mr" /> Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="register-select"
                >
                  <option value="">Select Department</option>
                  <option value="science">Science</option>
                  <option value="computing">Information Technology</option>
                  <option value="engineering">Engineering</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                </select>
              </div>
            </>
          )}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="icon-mr" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
              className="register-input"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="icon-mr" /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter a password (min 6 characters)"
              className="register-input"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="register-footer">
          <p className="footer-text">
            Already have an account?{' '}
            <Link to="/login" className="footer-link">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Register.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     role: 'applicant',
//     position: '',
//     department: '',
//     email: '',
//     password: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate(); // ✅ Add this

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateEmail = (email) => {
//     const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return pattern.test(email);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     if (!validateEmail(formData.email)) {
//       setError('Barua pepe si sahihi. Tafadhali hakiki.');
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError('Nenosiri linapaswa kuwa na herufi 6 au zaidi.');
//       return;
//     }

//     if (formData.role === 'applicant' && (!formData.position || !formData.department)) {
//       setError('Wajibu kujaza "position" na "department" kwa waombaji.');
//       return;
//     }

//     setLoading(true);

//     const url = formData.role === 'applicant'
//       ? 'http://localhost:8080/api/applicants'
//       : 'http://localhost:8080/api/community';

//     const payload = formData.role === 'applicant'
//       ? formData
//       : { email: formData.email, password: formData.password };

//     try {
//       await axios.post(url, payload);
//       setMessage('✅ Usajili umefanikiwa!');

//       // Clear form
//       setFormData({
//         role: 'applicant',
//         position: '',
//         department: '',
//         email: '',
//         password: ''
//       });

//       // 🔁 Peleka kwenye login baada ya sekunde chache
//       setTimeout(() => {
//         navigate('/login'); // ✅ Navigate to login page
//       }, 1000);

//     } catch (err) {
//       console.error('Registration Error:', err);
//       setError('❌ Usajili umeshindikana. Tafadhali hakiki taarifa zako au barua pepe inatumika tayari.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Fomu ya Usajili</h2>

//       {message && <p className="success">{message}</p>}
//       {error && <p className="error">{error}</p>}

//       <form onSubmit={handleSubmit} className="register-form">
//         <label>Chagua Jukumu (Role):</label>
//         <select name="role" value={formData.role} onChange={handleChange} required>
//           <option value="applicant">Applicant</option>
//           <option value="community">Community</option>
//         </select>

//         {formData.role === 'applicant' && (
//           <>
//             <label>Position:</label>
//             <input
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               required
//             />

//             <label>Department:</label>
//             <input
//               type="text"
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               required
//             />
//           </>
//         )}

//         <label>Email:</label>
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />

//         <label>Password:</label>
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           minLength={6}
//         />

//         <button type="submit" disabled={loading}>
//           {loading ? 'Inasajili...' : 'Jisajili'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Register;