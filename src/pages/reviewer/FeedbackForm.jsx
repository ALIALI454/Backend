import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './FeedbackForm.css'; // Hakikisha unatumia CSS mpya

const FeedbackForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const application = state?.application || {};

  const [feedback, setFeedback] = useState('');
  const [recommendation, setRecommendation] = useState('approve');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hapa unaweza kuhamisha feedback kwenda server au context
    console.log('Feedback Submitted:', {
      applicant: application.name,
      feedback: feedback,
      recommendation: recommendation
    });
    // Baada ya kutuma, unaweza kurejea ukurasa wa nyuma au kwenda ukurasa wa uthibitisho
    navigate('/reviewer/review', {
      state: { application, feedback, recommendation, submitted: true }
    });
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <h1>Provide Feedback</h1>
        <p className="subtitle">For Application: <span className="applicant-name">{application.name || 'N/A'}</span></p>
      </div>

      <form onSubmit={handleSubmit} className="feedback-form-content">
        <div className="form-group">
          <label htmlFor="feedback-text">
            Your Feedback:
          </label>
          <textarea
            id="feedback-text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Write your detailed comments and observations here..."
            rows="8" // Ongeza urefu wa textarea
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="recommendation-select">
            Recommendation:
          </label>
          <select
            id="recommendation-select"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
          >
            <option value="approve">✅ Approve Application</option>
            <option value="revise">📝 Request Revision</option>
            <option value="reject">❌ Reject Application</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" className="back-button" onClick={() => navigate(-1)}>
            ⬅️ Back
          </button>
          <button type="submit" className="submit-button">
            Submit Feedback ➡️
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;