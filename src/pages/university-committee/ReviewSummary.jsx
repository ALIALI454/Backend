// src/pages/university-committee/ReviewSummary.jsx
import React, { useEffect, useState } from 'react';
import './ReviewSummary.css';

const ReviewSummary = () => {
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState({}); // store committee recommendations

  useEffect(() => {
    let storedReviews = JSON.parse(localStorage.getItem('submittedReviews')) || [];

    if (storedReviews.length === 0) {
      storedReviews = [
        {
          applicationId: 1,
          materialTypes: ["Journal Article", "Book"],
          fromRank: "Assistant Lecturer",
          toRank: "Lecturer",
          grade: "A",
          strengths: "High-quality research with strong publication record.",
          shortcomings: "Needs more collaborative works.",
          reviewerName: "Prof. John Mwangi",
          reviewerRank: "Professor",
          affiliation: "University of Nairobi",
          recommendation: "approve",
          recommendationReason: "Meets all criteria for promotion.",
          fileName: "ReviewReport1.pdf",
          submittedAt: new Date().toISOString(),
        },
        {
          applicationId: 2,
          materialTypes: ["Conference Paper"],
          fromRank: "Lecturer",
          toRank: "Senior Lecturer",
          grade: "B+",
          strengths: "Good research presentation, innovative ideas.",
          shortcomings: "Lacks strong journal publications.",
          reviewerName: "Dr. Fatma Said",
          reviewerRank: "Senior Lecturer",
          affiliation: "University of Dar es Salaam",
          recommendation: "revise",
          recommendationReason: "Needs improvement in publication quality.",
          fileName: "ReviewReport2.docx",
          submittedAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('submittedReviews', JSON.stringify(storedReviews));
    }

    setReviews(storedReviews);
  }, []);

  // Handle recommendation submit
  const handleRecommendationSubmit = (appId) => {
    if (!recommendations[appId]?.recommendation) {
      alert("Please select a recommendation before submitting.");
      return;
    }
    const existing = JSON.parse(localStorage.getItem('committeeRecommendations')) || [];
    const newRecommendation = {
      applicationId: appId,
      recommendation: recommendations[appId].recommendation,
      reason: recommendations[appId].reason || "",
      decidedAt: new Date().toISOString()
    };
    localStorage.setItem('committeeRecommendations', JSON.stringify([...existing, newRecommendation]));
    alert("Recommendation submitted to HR Board!");
  };

  // Handle input change
  const handleRecommendationChange = (appId, field, value) => {
    setRecommendations(prev => ({
      ...prev,
      [appId]: { ...prev[appId], [field]: value }
    }));
  };

  if (reviews.length === 0) {
    return (
      <div className="review-summary-container">
        <h2>Review Summary</h2>
        <p>No reviews submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="review-summary-container">
      <h2>Review Summary for Committee</h2>
      <div className="review-grid">
        {reviews.map((rev, idx) => (
          <div key={idx} className={`review-card ${rev.recommendation}`}>
            <h3>Application ID: {rev.applicationId}</h3>
            <p><strong>Type(s) of Academic Materials:</strong> {rev.materialTypes?.join(', ') || 'N/A'}</p>
            <p><strong>Promotion From:</strong> {rev.fromRank}</p>
            <p><strong>Promotion To:</strong> {rev.toRank}</p>
            <p><strong>Quality Grade:</strong> {rev.grade}</p>
            <p><strong>Strengths:</strong> {rev.strengths}</p>
            <p><strong>Shortcomings:</strong> {rev.shortcomings}</p>
            <p><strong>Reviewer Name:</strong> {rev.reviewerName}</p>
            <p><strong>Reviewer Rank:</strong> {rev.reviewerRank}</p>
            <p><strong>Affiliation:</strong> {rev.affiliation}</p>
            <p className={`recommendation-tag ${rev.recommendation}`}>
              <strong>Reviewer Recommendation:</strong> {rev.recommendation.toUpperCase()}
            </p>
            {rev.recommendationReason && (
              <p><strong>Recommendation Reason:</strong> {rev.recommendationReason}</p>
            )}
            {rev.fileName && <p><strong>Attached Document:</strong> {rev.fileName}</p>}
            <p className="submitted-at"><em>Submitted at: {new Date(rev.submittedAt).toLocaleString()}</em></p>

            {/* Committee Recommendation Section */}
            <div className="recommendation-section">
              <h4>Committee Recommendation:</h4>
              <select
                value={recommendations[rev.applicationId]?.recommendation || ""}
                onChange={(e) => handleRecommendationChange(rev.applicationId, "recommendation", e.target.value)}
              >
                <option value="">Select Recommendation</option>
                <option value="recommended">Recommended for Promotion</option>
                <option value="revisions">Minor Revisions</option>
                <option value="reject">Not Recommended for Promotion</option>
              </select>
              <textarea
                placeholder="Reason for recommendation (optional)"
                value={recommendations[rev.applicationId]?.reason || ""}
                onChange={(e) => handleRecommendationChange(rev.applicationId, "reason", e.target.value)}
              />
              <button onClick={() => handleRecommendationSubmit(rev.applicationId)} className="submit-decision-btn">
                Submit Recommendation
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
