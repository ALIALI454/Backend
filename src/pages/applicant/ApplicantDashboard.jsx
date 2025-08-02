import React from 'react';
import { Outlet } from 'react-router-dom';

const ApplicantDashboard = () => {
  return (
    <div>
      <h2>Applicant Dashboard</h2>
      <Outlet />  {/* Hapa ndo subpages (application, feedback, notifications) zitarender */}
    </div>
  );
};

export default ApplicantDashboard;
