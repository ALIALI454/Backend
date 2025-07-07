import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewSummary.css'; // CSS ya nje

const ReviewSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application || {};

  const reviewers = [
    { name: "Prof. Smith", recommendation: "Approve", comments: "Excellent qualifications and research output" },
    { name: "Dr. Johnson", recommendation: "Approve with conditions", comments: "Needs more teaching experience in graduate courses" },
    { name: "Dr. Williams", recommendation: "Approve", comments: "Strong publication record and departmental contributions" }
  ];

  const getRecommendationClass = (recommendation) => {
    if (recommendation.includes('Approve with')) return 'recommend-amber';
    if (recommendation === 'Approve') return 'recommend-green';
    return 'recommend-gray';
  };

  return (
    <div className="review-summary-container">
      <div className="back-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ←
        </button>
        <h1 className="page-title">Review Summary</h1>
      </div>

      <div className="card-section">
        <h2 className="section-title">Application Overview</h2>
        <div className="info-grid">
          <div className="info-box">
            <p className="info-label">Applicant</p>
            <p className="info-value">{application.name || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Department</p>
            <p className="info-value">{application.department || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Current Position</p>
            <p className="info-value">{application.currentPosition || 'N/A'}</p>
          </div>
          <div className="info-box">
            <p className="info-label">Applied For</p>
            <p className="info-value">{application.appliedFor || 'N/A'}</p>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="review-header">
          <h2 className="section-title">Reviewer Recommendations</h2>
          <span className="review-count">{reviewers.length} reviews</span>
        </div>

        <div className="review-list">
          {reviewers.map((reviewer, index) => (
            <div key={index} className="review-card">
              <div className="review-top">
                <div className="review-avatar">
                  {reviewer.name.split(' ')[0][0]}{reviewer.name.split(' ')[1][0]}
                </div>
                <h3 className="reviewer-name">{reviewer.name}</h3>
                <span className={`recommendation ${getRecommendationClass(reviewer.recommendation)}`}>
                  {reviewer.recommendation}
                </span>
              </div>
              <div className="review-comment">
                {reviewer.comments}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate(-1)} className="btn-secondary">Back</button>
        <button
          onClick={() => navigate('/university-committee/decision', { state: { application } })}
          className="btn-primary"
        >
          Proceed to Decision →
        </button>
      </div>
    </div>
  );
};

export default ReviewSummary;
