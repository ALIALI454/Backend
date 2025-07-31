import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaUser, FaEnvelope, FaLock, FaBriefcase, FaBuilding, 
  FaTransgender, FaPhone, FaCalendar, FaGraduationCap, FaSignInAlt 
} from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    role:'APPLICANT',
    position: '',
    gender: '',
    academicRank: '',
    dateOfBirth: '',
    sId: '',  // school id as string, will parse before submit
  });

  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch schools on component mount
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/schools');
        if (!res.ok) throw new Error('Failed to load schools');
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error('Error fetching schools:', err);
        setError('Failed to load schools. Please try again later.');
      }
    };
    fetchSchools();
  }, []);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!formData.sId) {
    setError('Please select a school.');
    return;
  }

  const sIdInt = parseInt(formData.sId, 10);
  if (isNaN(sIdInt)) {
    setError('Invalid school selected.');
    return;
  }

  // Construct nested payload as backend expects
 const payload = {
  school: { sId: sIdInt },
  user: {
    fullName: formData.fullName,
    username: formData.username || formData.email.split('@')[0],
    email: formData.email,
    password: formData.password,
    phoneNumber: formData.phoneNumber,
    position: formData.position,
    gender: formData.gender,
    dateOfBirth: formData.dateOfBirth,
    academicRank: formData.academicRank,
    role: "APPLICANT" // <-- use the value directly
  }
};


  console.log('Payload before sending:', payload);

  try {
    const res = await fetch('http://localhost:8080/api/applicants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Failed to register');
    }

    navigate('/login');
  } catch (err) {
    setError(err.message);
  }
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
            Applicant Registration
          </h2>
        </div>

        {error && <div className="error-message show-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">
              <FaUser className="icon-mr" /> Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="register-input"
            />
          </div>

          {/* Username */}
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              <FaUser className="icon-mr" /> Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username (optional)"
              className="register-input"
            />
          </div>

          {/* Position */}
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
              required
              placeholder="Enter your current position"
              className="register-input"
            />
          </div>

          {/* School Dropdown */}
          <div className="form-group">
            <label htmlFor="sId" className="form-label">
              <FaBuilding className="icon-mr" /> Select School
            </label>
         <select
  id="sId"
  name="sId"
  value={formData.sId}
  onChange={handleChange}
  required
  className="register-select"
>
  <option value="">-- Select School --</option>
  
    {schools.map((school) => (
  <option key={school.sId} value={school.sId}>
    {school.sName}
  </option>
))}

 
</select>

          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="icon-mr" /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
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
              placeholder="Enter password (min 6 characters)"
              className="register-input"
            />
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              <FaPhone className="icon-mr" /> Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="register-input"
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="gender" className="form-label">
              <FaTransgender className="icon-mr" /> Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="register-select"
            >
              <option value="">-- Select Gender --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {/* Academic Rank */}
          <div className="form-group">
            <label htmlFor="academicRank" className="form-label">
              <FaGraduationCap className="icon-mr" /> Academic Rank
            </label>
            <input
              type="text"
              id="academicRank"
              name="academicRank"
              value={formData.academicRank}
              onChange={handleChange}
              placeholder="Enter academic rank"
              className="register-input"
            />
          </div>

          {/* Date of Birth */}
          <div className="form-group">
            <label htmlFor="dateOfBirth" className="form-label">
              <FaCalendar className="icon-mr" /> Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="register-input"
            />
          </div>

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <div className="register-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
