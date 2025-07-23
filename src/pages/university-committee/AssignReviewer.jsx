// src/pages/university-committee/AssignReviewer.jsx
import React, { useState } from 'react';
import './AssignReviewer.css';

const REVIEWERS = [
  { id: 1, name: "Prof. John Mwangi", department: "Computer Science", expertise: "AI, Data Science" },
  { id: 2, name: "Dr. Fatma Said", department: "Law", expertise: "Constitutional Law" },
  { id: 3, name: "Prof. James Mwambene", department: "Medicine", expertise: "Neurology" },
  { id: 4, name: "Dr. Sarah Johnson", department: "Business Administration", expertise: "Finance" },
  { id: 5, name: "Prof. Amina Kombo", department: "Education", expertise: "Curriculum Development" }
];

const AssignReviewer = ({ onAssign }) => {
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviewers = REVIEWERS.filter(reviewer =>
    reviewer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reviewer.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleReviewer = (reviewer) => {
    if (selectedReviewers.find(r => r.id === reviewer.id)) {
      setSelectedReviewers(selectedReviewers.filter(r => r.id !== reviewer.id));
    } else {
      setSelectedReviewers([...selectedReviewers, reviewer]);
    }
  };

  const handleAssign = () => {
    if (selectedReviewers.length > 0) {
      onAssign(selectedReviewers);
    }
  };

  return (
    <div className="assign-reviewer-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search reviewers by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="reviewers-list">
        {filteredReviewers.map(reviewer => (
          <div
            key={reviewer.id}
            className={`reviewer-card ${selectedReviewers.find(r => r.id === reviewer.id) ? 'selected' : ''}`}
            onClick={() => toggleReviewer(reviewer)}
          >
            <h4>{reviewer.name}</h4>
            <p><strong>Department:</strong> {reviewer.department}</p>
            <p><strong>Expertise:</strong> {reviewer.expertise}</p>
          </div>
        ))}
      </div>

      <button
        className="assign-button"
        onClick={handleAssign}
        disabled={selectedReviewers.length === 0}
      >
        Assign Selected Reviewers
      </button>
    </div>
  );
};

export default AssignReviewer;
