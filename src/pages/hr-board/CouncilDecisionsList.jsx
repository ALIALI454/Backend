// src/pages/hr-board/CouncilDecisionsList.jsx
import React, { useEffect, useState } from "react";
import "./CouncilDecisionsList.css";

const CouncilDecisionsList = () => {
  const [councilDecisions, setCouncilDecisions] = useState([]);

  useEffect(() => {
    setCouncilDecisions(JSON.parse(localStorage.getItem("councilDecisions")) || []);
  }, []);

  return (
    <div className="council-decisions">
      <h2>Final Decisions from University Council</h2>
      {councilDecisions.length === 0 ? (
        <p>No Council decisions yet</p>
      ) : (
        councilDecisions.map((d, i) => (
          <div key={i} className="council-decision-card">
            <h3>Application ID: {d.applicationId}</h3>
            <p><strong>Decision:</strong> {d.decision}</p>
            <p><strong>Reason:</strong> {d.reason}</p>
            <p><em>Decided at: {new Date(d.decidedAt).toLocaleString()}</em></p>
          </div>
        ))
      )}
    </div>
  );
};

export default CouncilDecisionsList;
