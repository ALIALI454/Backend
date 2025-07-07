import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    applicationId: '',
    comments: '',
    actionRequired: 'minor-revisions',
    deadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission logic
    alert(`✅ Feedback submitted for Application ID: ${feedback.applicationId}`);
    
    // Reset form
    setFeedback({
      applicationId: '',
      comments: '',
      actionRequired: 'minor-revisions',
      deadline: ''
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '20px', color: '#333', fontWeight: '600' }}>
        📝 Application Feedback Form
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Application ID */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Application ID</label>
          <input
            type="text"
            name="applicationId"
            value={feedback.applicationId}
            onChange={handleChange}
            required
            placeholder="Enter Application ID"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Feedback Comments */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Feedback Comments</label>
          <textarea
            name="comments"
            value={feedback.comments}
            onChange={handleChange}
            required
            placeholder="Write your feedback here..."
            style={{
              width: '100%',
              padding: '10px',
              minHeight: '120px',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Action Required */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Action Required</label>
          <select
            name="actionRequired"
            value={feedback.actionRequired}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          >
            <option value="minor-revisions">Minor Revisions</option>
            <option value="major-revisions">Major Revisions</option>
            <option value="resubmission">Resubmission Required</option>
            <option value="meeting">Schedule Meeting</option>
          </select>
        </div>

        {/* Deadline */}
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '6px' }}>Deadline for Response</label>
          <input
            type="date"
            name="deadline"
            value={feedback.deadline}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '6px'
            }}
          />
        </div>

        {/* Submit Button */}
        <div style={{ textAlign: 'right' }}>
          <button
            type="submit"
            style={{
              backgroundColor: '#3498db',
              color: '#fff',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '600',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
