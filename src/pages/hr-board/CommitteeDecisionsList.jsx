// src/pages/hr-board/CommitteeDecisionsList.jsx
import React, { useEffect, useState } from "react";
import "./CommitteeDecisionsList.css";

const CommitteeDecisionsList = () => {
  const [committeeDecisions, setCommitteeDecisions] = useState([]);
  const [hrDecisions, setHrDecisions] = useState({}); // decisions by HR on each application

  useEffect(() => {
    const storedCommitteeDecisions = JSON.parse(localStorage.getItem("committeeDecisions")) || [];
    setCommitteeDecisions(storedCommitteeDecisions);
  }, []);

  // Handle HR decision input changes
  const handleHrDecisionChange = (appId, field, value) => {
    setHrDecisions((prev) => ({
      ...prev,
      [appId]: { ...prev[appId], [field]: value },
    }));
  };

  // Submit HR decision for a particular application
  const handleSubmitHrDecision = (appId) => {
    if (!hrDecisions[appId]?.decision) {
      alert("Tafadhali chagua uamuzi kabla ya kutuma.");
      return;
    }

    const existingHrDecisions = JSON.parse(localStorage.getItem("hrBoardDecisions")) || [];

    // Avoid duplicate decision for same application - update if exists
    const filtered = existingHrDecisions.filter((d) => d.applicationId !== appId);

    const newHrDecision = {
      applicationId: appId,
      decision: hrDecisions[appId].decision,
      reason: hrDecisions[appId].reason || "",
      decidedAt: new Date().toISOString(),
    };

    localStorage.setItem("hrBoardDecisions", JSON.stringify([...filtered, newHrDecision]));
    alert("Uamuzi wa HR Board umetumwa kwa University Council!");

    // Optionally clear the input after submit
    setHrDecisions((prev) => {
      const copy = { ...prev };
      delete copy[appId];
      return copy;
    });
  };

  if (committeeDecisions.length === 0) {
    return (
      <div className="committee-decisions-container">
        <h2>Maamuzi ya University Committee kwa HR Board</h2>
        <p>Hakuna maamuzi ya Committee yaliyopokelewa bado.</p>
      </div>
    );
  }

  return (
    <div className="committee-decisions-container">
      <h2>Maamuzi ya University Committee kwa HR Board</h2>
      <div className="decision-list">
        {committeeDecisions.map((decision, idx) => (
          <div key={idx} className="decision-card">
            <h3>Application ID: {decision.applicationId}</h3>
            <p><strong>Committee Decision:</strong> {decision.decision.toUpperCase()}</p>
            {decision.reason && <p><strong>Sababu:</strong> {decision.reason}</p>}
            <p><em>Ilitolewa: {new Date(decision.decidedAt).toLocaleString()}</em></p>

            <div className="hr-decision-section">
              <h4>Uamuzi wa HR Board:</h4>
              <select
                value={hrDecisions[decision.applicationId]?.decision || ""}
                onChange={(e) =>
                  handleHrDecisionChange(decision.applicationId, "decision", e.target.value)
                }
              >
                <option value="">--Chagua Uamuzi--</option>
                <option value="approve">Kubali Maombi</option>
                <option value="reject">Kataa Maombi</option>
                <option value="revise">Rudisha Marekebisho</option>
              </select>
              <textarea
                placeholder="Sababu za uamuzi (hiari)"
                value={hrDecisions[decision.applicationId]?.reason || ""}
                onChange={(e) =>
                  handleHrDecisionChange(decision.applicationId, "reason", e.target.value)
                }
              />
              <button onClick={() => handleSubmitHrDecision(decision.applicationId)} className="submit-hr-decision-btn">
                Tuma Uamuzi kwa Council
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommitteeDecisionsList;
