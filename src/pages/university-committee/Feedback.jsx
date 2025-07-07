import React from 'react';
import './Feedback.css'; // CSS ya kawaida

const Feedback = () => {
  const feedbackData = [
    {
      id: 1,
      reviewer: "Prof. Smith",
      application: "Dr. Asha Mwinyi",
      date: "2025-05-20",
      status: "Recommended",
      comments: "Strong research portfolio meets all requirements",
      position: "Senior Lecturer"
    },
    {
      id: 2,
      reviewer: "Dr. Johnson",
      application: "Dr. Asha Mwinyi",
      date: "2025-05-22",
      status: "Needs Improvement",
      comments: "Teaching evaluations could be stronger",
      position: "Senior Lecturer"
    },
    {
      id: 3,
      reviewer: "Prof. Anderson",
      application: "Dr. Milham Issa",
      date: "2025-05-18",
      status: "Highly Recommended",
      comments: "Exceptional publication record and teaching experience",
      position: "Professor"
    }
  ];

  const handleViewDetails = (id) => {
    alert(`Viewing details for feedback ID: ${id}`);
  };

  const handleBackToHome = () => {
    alert('Navigating back to Home');
  };

  return (
    <div className="feedback-container">
      <div className="feedback-header">
        <div>
          <h1 className="feedback-title">Reviewer Feedback</h1>
          <p className="feedback-subtitle">Committee evaluations for faculty applications</p>
        </div>
        <button onClick={handleBackToHome} className="back-button">← Back to Home</button>
      </div>

      <div className="feedback-table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Reviewer</th>
              <th>Applicant</th>
              <th>Position</th>
              <th>Review Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedbackData.map(item => (
              <tr key={item.id}>
                <td>{item.reviewer}</td>
                <td>{item.application}</td>
                <td>{item.position}</td>
                <td>{item.date}</td>
                <td className={`status ${item.status.replace(/\s+/g, '-').toLowerCase()}`}>{item.status}</td>
                <td>
                  <button className="view-button" onClick={() => handleViewDetails(item.id)}>
                    👁 View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>Showing 1 to {feedbackData.length} of {feedbackData.length} results</span>
        <div>
          <button className="page-btn">Previous</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
