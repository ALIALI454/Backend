import React, { useEffect, useState } from "react";
import "./SubmitDecision.css";

const SubmitDecision = () => {
  const [reviews, setReviews] = useState([]);
  const [decision, setDecision] = useState("");
  const [committeeComments, setCommitteeComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("submittedReviews")) || [];
    setReviews(storedReviews);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!decision) {
      alert("Please select a decision before submitting.");
      return;
    }

    const decisionData = {
      reviews,
      finalDecision: decision,
      committeeComments,
      decidedAt: new Date().toISOString(),
    };

    // Save decision to localStorage (simulate backend)
    localStorage.setItem("committeeDecisions", JSON.stringify(decisionData));

    alert("Decision submitted successfully to HR Board!");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="decision-container">
        <h2>Decision Submitted</h2>
        <p>Your decision has been forwarded to the HR Board.</p>
      </div>
    );
  }

  return (
    <div className="decision-container">
      <h2>Committee Final Decision</h2>
      <p>Please review the collected reviews and provide the committee’s final decision.</p>

      <div className="review-summary-preview">
        <h3>Collected Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          <ul>
            {reviews.map((rev, idx) => (
              <li key={idx}>
                <strong>Application {rev.applicationId}</strong> - Recommendation:{" "}
                <span className={`tag ${rev.recommendation}`}>
                  {rev.recommendation.toUpperCase()}
                </span>{" "}
                (By {rev.reviewerName})
              </li>
            ))}
          </ul>
        )}
      </div>

      <form onSubmit={handleSubmit} className="decision-form">
        <label>Final Decision:</label>
        <select value={decision} onChange={(e) => setDecision(e.target.value)} required>
          <option value="">-- Select Decision --</option>
          <option value="approve">✅ Approve for Promotion</option>
          <option value="revise">📝 Request Revisions</option>
          <option value="reject">❌ Reject Application</option>
        </select>

        <label>Committee Comments (Optional):</label>
        <textarea
          value={committeeComments}
          onChange={(e) => setCommitteeComments(e.target.value)}
          placeholder="Add any additional comments..."
          rows={5}
        />

        <button type="submit" className="submit-btn">Submit Decision</button>
      </form>
    </div>
  );
};

export default SubmitDecision;
