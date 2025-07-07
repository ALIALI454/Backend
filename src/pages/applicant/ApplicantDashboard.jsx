// src/pages/applicant/ApplicantDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ApplicationForm from './ApplicationForm';
import Feedback from './Feedback';
import Notifications from './Notifications';
import StatusTracker from './StatusTracker';
import CategoryCriteria from './CategoryCriteria';

const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('status');

  const handleLogout = () => {
    localStorage.removeItem('suza_promotion_user');
    navigate('/');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Applicant Dashboard</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setActiveTab('status')} style={{ backgroundColor: activeTab === 'status' ? '#3498db' : '#ecf0f1' }}>Application Status</button>
        <button onClick={() => setActiveTab('apply')} style={{ backgroundColor: activeTab === 'apply' ? '#3498db' : '#ecf0f1' }}>New Application</button>
        <button onClick={() => setActiveTab('criteria')} style={{ backgroundColor: activeTab === 'criteria' ? '#3498db' : '#ecf0f1' }}>Category Criteria</button>
        <button onClick={() => setActiveTab('feedback')} style={{ backgroundColor: activeTab === 'feedback' ? '#3498db' : '#ecf0f1' }}>Feedback</button>
        <button onClick={() => setActiveTab('notifications')} style={{ backgroundColor: activeTab === 'notifications' ? '#3498db' : '#ecf0f1' }}>Notifications</button>
      </div>

      <div style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '20px', minHeight: '300px' }}>
        {activeTab === 'status' && <StatusTracker />}
        {activeTab === 'apply' && <ApplicationForm />}
        {activeTab === 'criteria' && <CategoryCriteria />}
        {activeTab === 'feedback' && <Feedback />}
        {activeTab === 'notifications' && <Notifications />}
      </div>

      <button
        onClick={handleLogout}
        style={{ marginTop: '20px', backgroundColor: '#e74c3c', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Logout
      </button>
    </div>
  );
};

export default ApplicantDashboard;
