import React, { useState } from "react";
import "./FeedbackForm.css";

const FeedbackForm = ({ recipient = "Committee" }) => {
  // recipient can be "Committee" or "Applicant" or any string passed as prop
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") {
      setError("Feedback cannot be empty.");
      setSuccessMessage("");
      return;
    }

    // Here you can send feedback to backend via API call, e.g., fetch or axios
    // For now, we simulate success:
    console.log(`Feedback sent to ${recipient}:`, feedback);
    setSuccessMessage("Feedback submitted successfully.");
    setError("");
    setFeedback("");
  };

  return (
    <div className="feedback-form-container">
      <h2>Send Feedback to {recipient}</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <label htmlFor="feedback-textarea">Feedback:</label>
        <textarea
          id="feedback-textarea"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={`Write your feedback to the ${recipient.toLowerCase()} here...`}
          rows={6}
          required
        />

        {error && <p className="error-msg">{error}</p>}
        {successMessage && <p className="success-msg">{successMessage}</p>}

        <button type="submit" className="submit-btn">
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
