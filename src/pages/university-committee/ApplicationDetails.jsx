import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ApplicationDetails.css'; // CSS ya kawaida iliyo nje

const ApplicationDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const app = state?.application;

  if (!app) {
    return (
      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Applications
        </button>
        <div className="card no-data">
          <p>No application data found.</p>
        </div>
      </div>
    );
  }

  const statusClass = {
    'Pending': 'status pending',
    'Under Review': 'status review',
    'Approved': 'status approved',
    'Rejected': 'status rejected'
  };

  const handleConfirm = () => {
    navigate('/university-committee/decision', { state: { application: app } });
  };

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Applications
      </button>

      <div className="card">
        <h2>Promotion Application</h2>
        <div className="row">
          <div className="col">
            <label>Name</label>
            <p>{app.name}</p>
            <label>Department</label>
            <p>{app.department}</p>
          </div>
          <div className="col">
            <label>Current Position</label>
            <p>{app.currentPosition}</p>
            <label>Applied For</label>
            <p>{app.appliedFor}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Application Status</h3>
        <div className="row">
          <div className="col">
            <label>Submission Date</label>
            <p>{app.submissionDate}</p>
          </div>
          <div className="col">
            <label>Status</label>
            <span className={statusClass[app.status]}>{app.status}</span>
          </div>
          <div className="col">
            <label>Experience</label>
            <p>{app.experience} years</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Documents</h3>
        <ul className="documents">
          {Object.entries(app.documents).map(([doc, submitted]) => (
            <li key={doc}>
              {submitted ? '✅' : '❌'} {doc.charAt(0).toUpperCase() + doc.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Evaluation</h3>
        <p className="eval-status">
          {app.eligibility.status} ({app.eligibility.percentage}% met)
        </p>
        <ul className="evaluation">
          {Object.entries(app.eligibility.criteria).map(([criteria, met]) => (
            <li key={criteria}>
              {met ? '✅' : '❌'} {criteria.split(/(?=[A-Z])/).join(' ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Next Steps</h3>
        <ul className="next-steps">
          <li>Schedule interview</li>
          <li>Verify documents</li>
          <li>Prepare offer letter</li>
        </ul>
      </div>

      <div className="card actions">
        <button onClick={handleConfirm} className="confirm-button">
          Confirm and Continue →
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;
