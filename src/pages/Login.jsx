// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
// import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path ni sahihi
// import './Login.css';

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: '',
//     role: 'applicant',
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!credentials.email || !credentials.password) {
//     setError('Please fill in all fields.');
//     return;
//   }

//   try {
//     // Call backend login
//     const response = await fetch('http://localhost:8080/api/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         username: credentials.email, // login with username
//         password: credentials.password
//       }),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       setError(errorText || 'Invalid credentials');
//       return;
//     }

//     const data = await response.json();
//     // Save userId and schoolId in localStorage
//     localStorage.setItem('userId', data.userId);
//     localStorage.setItem('schoolId', data.schoolId || '');

//     // Decide redirect path based on role returned from backend
//     const redirectPaths = {
//       applicant: '/applicant/criteria',
//       'university-community': '/university-community/dashboard',
//       'school-team': '/school-team/category-criteria',
//       'university-committee': '/university-committee/applications',
//       reviewer: '/reviewer/applications',
//       'hr-board': '/hr-board/dashboard',
//       'university-council': '/university-council/dashboard',
//       admin: '/admin',
//     };

//     const redirectPath = redirectPaths[data.role.toLowerCase()] || '/unauthorized';

//     // optional: useAuth context to set user
//     login({ email: credentials.email, role: data.role });

//     navigate(redirectPath);
//   } catch (err) {
//     console.error(err);
//     setError('An error occurred. Please try again later.');
//   }
// };


//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         <div className="logo-section">
//           <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
//         </div>

//         <div className="login-header">
//           <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
//           <h2 className="page-title">
//             <FaSignInAlt className="icon-mr" />
//             Sign In to Your Account
//           </h2>
//         </div>

//         {error && <div className="error-message show-error">{error}</div>}

//         <form onSubmit={handleSubmit} className="login-form">

//           {/* Role */}
//           <div className="form-group">
//             <label htmlFor="role" className="form-label">
//               <FaUser className="icon-mr" />
//               Select Role
//             </label>
//             <select
//               id="role"
//               name="role"
//               value={credentials.role}
//               onChange={handleChange}
//               required
//               className="login-select"
//             >
//               <option value="applicant">Applicant</option>
//               <option value="school-team">School/Institution Promotion Team</option>
//               <option value="university-committee">University Committee</option>
//               <option value="reviewer">Reviewer</option>
//               <option value="hr-board">HR Board</option>
//               <option value="university-council">University Council</option>
//               <option value="university-community">University Community</option>
//               <option value="admin">Admin</option> {/* <-- ADDED Admin */}
//             </select>
//           </div>

//           {/* Email */}
//           <div className="form-group">
//             <label htmlFor="email" className="form-label">
//               <FaEnvelope className="icon-mr" />
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               required
//               className="login-input"
//               placeholder="Enter your email address"
//             />
//           </div>

//           {/* Password */}
//           <div className="form-group">
//             <label htmlFor="password" className="form-label">
//               <FaLock className="icon-mr" />
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               required
//               className="login-input"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button type="submit" className="login-button">
//             <FaSignInAlt className="icon-mr" />
//             Sign In
//           </button>
//         </form>

//         <div className="login-footer">
//           <p className="footer-text">
//             Don't have an account?{' '}
//             <Link to="/register" className="footer-link">Register</Link>
//           </p>
//           <p className="footer-text">
//             <Link to="/forgot-password" className="footer-link">Forgot Password?</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import suzaLogo from '../assets/suza-logo.jpeg'; // Hakikisha path ni sahihi
import './Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'applicant', // This role field is for UI only, backend determines role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.email || !credentials.password) {
      setError('Please fill in all fields.');
      return;
    }

    // Direct admin login (bypass backend)
    if (
      credentials.email === 'admin@gmail.com' &&
      credentials.password === 'admin123'
    ) {
      localStorage.setItem('role', 'admin');
      localStorage.setItem('userId', '0');
      login({ userId: 0, role: 'admin' });
      navigate('/admin');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Invalid credentials');
        return;
      }

      const data = await response.json();

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('schoolId', data.sId || '');
      localStorage.setItem('role', data.role);

      if (data.role === 'APPLICANT') {
        try {
          const appResponse = await fetch(
            `http://localhost:8080/api/applicants/by-user/${data.userId}`
          );
          if (appResponse.ok) {
            const applicant = await appResponse.json();
            if (applicant.app_Id) {
              localStorage.setItem('appId', applicant.app_Id);
            }
          }
        } catch (fetchErr) {
          console.error('Error fetching applicant ID:', fetchErr);
        }
      }

      const redirectPaths = {
        'applicant': '/applicant/criteria',
        'university-community': '/university-community/dashboard',
        'school-team': '/school-team/category-criteria',
        'university-committee': '/university-committee/applications',
        'reviewer': '/reviewer/applications',
        'hr-board': '/hr-board/dashboard',
        'university-council': '/university-council/dashboard',
        'admin': '/admin',
      };

      const redirectPath =
        redirectPaths[data.role.toLowerCase()] || '/unauthorized';

      login({ userId: data.userId, role: data.role });
      navigate(redirectPath);
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="logo-section">
          <img src={suzaLogo} alt="SUZA Logo" className="suza-logo" />
        </div>

        <div className="login-header">
          <h1 className="system-title">SUZA PROMOTION GUIDELINE SYSTEM</h1>
          <h2 className="page-title">
            <FaSignInAlt className="icon-mr" />
            Sign In to Your Account
          </h2>
        </div>

        {error && <div className="error-message show-error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {/* Role */}
          <div className="form-group">
            <label htmlFor="role" className="form-label">
              <FaUser className="icon-mr" />
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
              className="login-select"
            >
              <option value="applicant">Applicant</option>
              <option value="school-team">
                School/Institution Promotion Team
              </option>
              <option value="university-committee">University Committee</option>
              <option value="reviewer">Reviewer</option>
              <option value="hr-board">HR Board</option>
              <option value="university-council">University Council</option>
              <option value="university-community">
                University Community
              </option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="icon-mr" />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="icon-mr" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="login-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="login-button">
            <FaSignInAlt className="icon-mr" />
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="footer-link">
              Register
            </Link>
          </p>
          <p className="footer-text">
            <Link to="/forgot-password" className="footer-link">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
