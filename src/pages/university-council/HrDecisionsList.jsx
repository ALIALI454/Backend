// src/pages/hr-board/HrDecisionsList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HrDecisionsList.css";

const HrDecisionsList = () => {
  const [decisions, setDecisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedDecisions = JSON.parse(localStorage.getItem("hrDecisions")) || [];
    setDecisions(storedDecisions);
  }, []);

  const handleGoToCouncilDecision = (applicationId) => {
    navigate(`/university-council/decision-form/${applicationId}`);
  };

  return (
    <div className="hr-decisions-list">
      <h2>HR Decisions Submitted to Council</h2>

      {decisions.length === 0 ? (
        <p>No HR decisions have been submitted yet.</p>
      ) : (
        decisions.map((item) => (
          <div key={item.applicationId} className="decision-card">
            <h3>Application ID: {item.applicationId}</h3>
            <p><strong>Applicant:</strong> {item.applicantName}</p>
            <p><strong>Promotion From:</strong> {item.promotionFrom}</p>
            <p><strong>Promotion To:</strong> {item.promotionTo}</p>
            <p><strong>Committee Decision:</strong> {item.committeeDecision}</p>
            <p><strong>Committee Comment:</strong> {item.committeeComment || "No comment"}</p>

            <hr />

            <p><strong>HR Decision:</strong> {item.hrDecision}</p>
            <p><strong>HR Comment:</strong> {item.hrComment || "No comment"}</p>
            <p><strong>Decided At:</strong> {new Date(item.decidedAt).toLocaleString()}</p>

            <button 
              className="go-to-council-btn" 
              onClick={() => handleGoToCouncilDecision(item.applicationId)}
            >
              Make Final Council Decision
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default HrDecisionsList;
