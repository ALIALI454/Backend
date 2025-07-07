// src/pages/school-team/SchoolTeamDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">School Team Dashboard</h1>
      <ul className="space-y-2">
        <li><Link to="/schoolteam/application-details" className="text-blue-600">View Application Details</Link></li>
        <li><Link to="/schoolteam/checklist" className="text-blue-600">Checklist</Link></li>
        <li><Link to="/schoolteam/feedback-form" className="text-blue-600">Feedback Form</Link></li>
        <li><Link to="/schoolteam/category-criteria" className="text-blue-600">Promotion Criteria</Link></li>
        <li><Link to="/schoolteam/forward-button" className="text-blue-600">Forward Application</Link></li>
      </ul>
    </div>
  );
};

export default Dashboard;