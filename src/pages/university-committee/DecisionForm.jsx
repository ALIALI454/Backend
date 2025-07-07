import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DecisionForm.css';

const DecisionForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application || {};

  const [decision, setDecision] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Decision submitted:', { decision, comments });
    navigate('/university-committee/submit-decision', {
      state: { application, decision, comments }
    });
  };

  return (
    <div className="decision-container">
      <div className="back-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="heading-title">Promotion Decision</h1>
      </div>

      <div className="card">
        <h2 className="card-title">Application Summary</h2>
        <div className="info-grid">
          <div className="info-box">
            <p className="info-label">Applicant</p>
            <p className="info-value">{application.name || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Current Position</p>
            <p className="info-value">{application.currentPosition || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Department</p>
            <p className="info-value">{application.department || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Applied For</p>
            <p className="info-value">{application.appliedFor || 'N/A'}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="radio-group">
          <label className={`radio-option ${decision === 'Approve' ? 'approve' : ''}`}>
            <input
              type="radio"
              name="decision"
              value="Approve"
              checked={decision === 'Approve'}
              onChange={() => setDecision('Approve')}
              className="radio-input"
            />
            <div>
              <span className="radio-text">Approve</span>
              <span className="radio-desc">Recommend for promotion</span>
            </div>
          </label>

          <label className={`radio-option ${decision === 'Reject' ? 'reject' : ''}`}>
            <input
              type="radio"
              name="decision"
              value="Reject"
              checked={decision === 'Reject'}
              onChange={() => setDecision('Reject')}
              className="radio-input"
            />
            <div>
              <span className="radio-text">Reject</span>
              <span className="radio-desc">Does not meet requirements</span>
            </div>
          </label>

          <label className={`radio-option ${decision === 'RequestChanges' ? 'request' : ''}`}>
            <input
              type="radio"
              name="decision"
              value="RequestChanges"
              checked={decision === 'RequestChanges'}
              onChange={() => setDecision('RequestChanges')}
              className="radio-input"
            />
            <div>
              <span className="radio-text">Request Changes</span>
              <span className="radio-desc">Needs additional information</span>
            </div>
          </label>
        </div>

        <div className="mb-8">
          <label className="info-label">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="textarea"
            placeholder="Provide detailed comments for your decision..."
          />
          <p className="comment-hint">Please provide constructive feedback</p>
        </div>

        <div className="form-footer">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!decision}
            className={`submit-btn ${decision ? 'active' : 'disabled'}`}
          >
            Submit Decision
          </button>
        </div>
      </form>
    </div>
  );
};

export default DecisionForm;
