import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '50px auto',
      padding: '30px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ color: '#e74c3c' }}>403 - Unauthorized Access</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
        You don't have permission to access this page with your current role.
      </p>
      
      <Link 
        to="/" 
        style={{
          padding: '12px 25px',
          backgroundColor: '#3498db',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold',
          display: 'inline-block'
        }}
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;