import React, { useState } from "react";
import "./SubmitReview.css";

const SubmitReview = () => {
  const [materialTypes, setMaterialTypes] = useState([]);
  const [fromRank, setFromRank] = useState("");
  const [toRank, setToRank] = useState("");
  const [grade, setGrade] = useState("");
  const [strengths, setStrengths] = useState("");
  const [shortcomings, setShortcomings] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRank, setReviewerRank] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [recommendationReason, setRecommendationReason] = useState("");
  const [file, setFile] = useState(null);

  const academicMaterialsOptions = [
    "Journal Article",
    "Book",
    "Book Chapter",
    "Conference Paper",
    "Monograph",
    "Patent",
    "Creative Work",
    "Research Report",
    "Other"
  ];

  const ranksOptions = [
    "Assistant Lecturer",
    "Lecturer",
    "Senior Lecturer",
    "Associate Professor",
    "Professor"
  ];

  const handleMaterialTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setMaterialTypes(prev => [...prev, value]);
    } else {
      setMaterialTypes(prev => prev.filter(item => item !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      materialTypes,
      fromRank,
      toRank,
      grade,
      strengths,
      shortcomings,
      reviewerName,
      reviewerRank,
      affiliation,
      recommendation,
      recommendationReason,
      file,
    };
    console.log("Review Submitted:", reviewData);
    alert("Review submitted successfully!");
    // TODO: API call to save reviewData
  };

  return (
    <div className="review-form">
      <h2>FORM C: External Reviewing Application Form</h2>
      <p>
        Dear Reviewer, kindly review the academic materials submitted for
        promotion. Please fill this form based on the evaluation criteria.
      </p>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Type of Academic Material(s): (Choose one or more)</legend>
          <div className="checkbox-group">
            {academicMaterialsOptions.map((mat) => (
              <label key={mat} className="checkbox-label">
                <input
                  type="checkbox"
                  value={mat}
                  checked={materialTypes.includes(mat)}
                  onChange={handleMaterialTypeChange}
                />
                {mat}
              </label>
            ))}
          </div>
        </fieldset>

        <label htmlFor="from-rank-select">Applying for Promotion (From):</label>
        <select
          id="from-rank-select"
          value={fromRank}
          onChange={(e) => setFromRank(e.target.value)}
          required
        >
          <option value="">--Select Current Rank--</option>
          {ranksOptions.map(rank => (
            <option key={rank} value={rank}>{rank}</option>
          ))}
        </select>

        <label htmlFor="to-rank-select">To (New Rank):</label>
        <select
          id="to-rank-select"
          value={toRank}
          onChange={(e) => setToRank(e.target.value)}
          required
        >
          <option value="">--Select New Rank--</option>
          {ranksOptions.map(rank => (
            <option key={rank} value={rank}>{rank}</option>
          ))}
        </select>

        <label htmlFor="grade-select">Quality Grade:</label>
        <select
          id="grade-select"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          required
        >
          <option value="">--Select Grade--</option>
          <option value="A">Excellent (A) - 1.00</option>
          <option value="B+">Very Good (B+) - 0.75</option>
          <option value="B">Good (B) - 0.50</option>
          <option value="C">Satisfactory (C) - 0.20</option>
        </select>

        <label>Strengths of the Materials:</label>
        <textarea
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
          required
        />

        <label>Shortcomings of the Materials:</label>
        <textarea
          value={shortcomings}
          onChange={(e) => setShortcomings(e.target.value)}
          required
        />

        <label>Reviewer’s Name:</label>
        <input
          type="text"
          value={reviewerName}
          onChange={(e) => setReviewerName(e.target.value)}
          required
        />

        <label>Reviewer’s Academic Rank:</label>
        <input
          type="text"
          value={reviewerRank}
          onChange={(e) => setReviewerRank(e.target.value)}
          required
        />

        <label>Affiliation:</label>
        <input
          type="text"
          value={affiliation}
          onChange={(e) => setAffiliation(e.target.value)}
          required
        />

        <div className="form-group">
          <label htmlFor="recommendation-select">Recommendation:</label>
          <select
            id="recommendation-select"
            value={recommendation}
            onChange={(e) => setRecommendation(e.target.value)}
            required
          >
            <option value="">--Select Recommendation--</option>
            <option value="approve">✅ Approve Application</option>
            <option value="revise">📝 Request Revision</option>
            <option value="reject">❌ Reject Application</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="recommendation-reason">
            Reason for Recommendation (Optional):
          </label>
          <textarea
            id="recommendation-reason"
            value={recommendationReason}
            onChange={(e) => setRecommendationReason(e.target.value)}
            placeholder="Provide reasons if necessary..."
            rows={4}
          />
        </div>

        <label>Upload Additional Document (Optional):</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf,.doc,.docx"
        />

        <button type="submit" className="submit-btn-green">Submit Review</button>
      </form>
    </div>
  );
};

export default SubmitReview;
