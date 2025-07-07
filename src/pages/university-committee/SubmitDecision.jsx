// src/pages/university-committee/SubmitDecision.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SubmitDecision.css'; // External CSS

const SubmitDecision = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { application, decision, comments } = state || {};

  const handleConfirm = () => {
    console.log('Final decision submitted:', { application, decision, comments });
    navigate('/university-committee/confirmation', {
      state: { message: "Decision submitted successfully!" }
    });
  };

  const getDecisionClass = () => {
    switch (decision) {
      case 'Approve':
        return 'decision-approve';
      case 'Reject':
        return 'decision-reject';
      case 'RequestChanges':
        return 'decision-request';
      default:
        return 'decision-default';
    }
  };

  return (
    <div className="submit-wrapper">
      <div className="submit-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ←
        </button>
        <h1>Confirm Decision</h1>
      </div>

      <div className="submit-box">
        <h2>Decision Summary</h2>
        <div className="submit-grid">
          <div className="info-block">
            <p className="label">Applicant</p>
            <p>{application?.name || 'N/A'}</p>
          </div>
          <div className="info-block">
            <p className="label">Current Position</p>
            <p>{application?.currentPosition || 'N/A'}</p>
          </div>
        </div>

        <div className="info-section">
          <p className="label">Decision</p>
          <div className={`decision-pill ${getDecisionClass()}`}>
            {decision || 'N/A'}
          </div>
        </div>

        <div className="info-section">
          <p className="label">Comments</p>
          <div className="comments-box">
            {comments || 'No additional comments provided'}
          </div>
        </div>
      </div>

      <div className="submit-footer">
        <button onClick={() => navigate(-1)} className="cancel-btn">Back</button>
        <button onClick={handleConfirm} className="confirm-btn">
          Confirm Submission →
        </button>
      </div>
    </div>
  );
};

export default SubmitDecision;
