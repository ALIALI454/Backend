import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          // Ondoa user kutoka context/token
    navigate('/login'); // Redirect to login page
  };

  const navItems = [
    { path: '/applicant/dashboard', roles: ['applicant']},
    { path: '/school-team/dashboard', roles: ['school-team'] },
    { path: '/university-committee/dashboard', roles: ['university-committee'] },
    { path: '/reviewer/dashboard', roles: ['reviewer']},
    { path: '/hr-board/dashboard', roles: ['hr-board'], },
    { path: '/university-council/dashboard', roles: ['university-council']},
    { path: '/university-community/dashboard', roles: ['university-community']},
  ];

  return (
    <nav style={{
      backgroundColor: '#34495e',
      padding: '10px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          {navItems.map(item => (
            (!item.roles || !user || item.roles.includes(user.role)) && (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: location.pathname === item.path ? '#3498db' : 'white',
                  textDecoration: 'none',
                  padding: '5px 10px',
                  borderRadius: '3px',
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal'
                }}
              >
                {item.name}
              </Link>
            )
          ))}
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            style={{
              padding: '5px 10px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link
              to="/login"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '3px'
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: 'white',
                textDecoration: 'none',
                padding: '5px 10px',
                borderRadius: '3px',
                backgroundColor: '#3498db'
              }}
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
