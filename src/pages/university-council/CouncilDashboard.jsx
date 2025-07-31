import React from "react";
import { Link } from "react-router-dom";
import "./CouncilDashboard.css";

const CouncilDashboard = () => {
  return (
    <div className="council-dashboard">
      <h2>University Council Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>HR Board Decisions</h3>
          <p>View and review all decisions forwarded by the HR Board.</p>
          <Link to="/university-council/hr-decisions">View Decisions</Link>
        </div>
        <div className="dashboard-card">
          <h3>Make Final Decisions</h3>
          <p>Approve, reject or request revisions on promotions.</p>
          <Link to="/university-council/decision-form">Make Decisions</Link>
        </div>
        <div className="dashboard-card">
          <h3>Final Approved List</h3>
          <p>View the list of staff whose promotions are fully approved.</p>
          <Link to="/university-council/final-approved">View List</Link>
        </div>
      </div>
    </div>
  );
};

export default CouncilDashboard;
