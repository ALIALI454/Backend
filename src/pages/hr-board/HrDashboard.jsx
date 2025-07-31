// src/pages/hr-board/HrDashboard.jsx
import React, { useEffect, useState } from "react";
import "./HrDashboard.css";

const HrDashboard = () => {
  const [committeeDecisions, setCommitteeDecisions] = useState([]);
  const [councilDecisions, setCouncilDecisions] = useState([]);

  useEffect(() => {
    setCommitteeDecisions(JSON.parse(localStorage.getItem("committeeDecisions")) || []);
    setCouncilDecisions(JSON.parse(localStorage.getItem("councilDecisions")) || []);
  }, []);

  return (
    <div className="hr-dashboard">
      <h2>HR Board Dashboard</h2>
      <div className="stats">
        <div className="card">
          <h3>Received from Committee</h3>
          <p>{committeeDecisions.length}</p>
        </div>
        <div className="card">
          <h3>Final Council Decisions</h3>
          <p>{councilDecisions.length}</p>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
