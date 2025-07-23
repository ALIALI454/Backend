// src/pages/hr-board/SubmitToCouncil.jsx
import React, { useEffect, useState } from "react";
import "./SubmitToCouncil.css";

const SubmitToCouncil = () => {
  const [hrDecisions, setHrDecisions] = useState([]);

  useEffect(() => {
    const storedHrDecisions = JSON.parse(localStorage.getItem("hrBoardDecisions")) || [];
    setHrDecisions(storedHrDecisions);
  }, []);

  const handleSendToCouncil = () => {
    if (hrDecisions.length === 0) {
      alert("Hakuna maamuzi ya HR Board ya kutuma kwa Council.");
      return;
    }

    // Hapa tutaweka localStorage kwa maamuzi ya Council
    // Kama API, hii ni sehemu ya ku-call API kwa backend
    const existingCouncilDecisions = JSON.parse(localStorage.getItem("councilDecisions")) || [];

    // Tuma maamuzi yote ya HR Board kwa Council (merge)
    localStorage.setItem(
      "councilDecisions",
      JSON.stringify([...existingCouncilDecisions, ...hrDecisions])
    );

    // Ondoa maamuzi ya HR Board kutoka localStorage baada ya kutuma
    localStorage.removeItem("hrBoardDecisions");
    setHrDecisions([]);

    alert("Maamuzi ya HR Board yamepelekwa kwa University Council kwa uidhinishaji wa mwisho.");
  };

  return (
    <div className="submit-to-council-container">
      <h2>Send HR Board Decisions to University Council</h2>
      {hrDecisions.length === 0 ? (
        <p>Hakuna maamuzi ya HR Board yaliyopo kwa sasa.</p>
      ) : (
        <>
          <ul className="hr-decisions-list">
            {hrDecisions.map((decision, idx) => (
              <li key={idx}>
                <strong>Application ID:</strong> {decision.applicationId} |{" "}
                <strong>Decision:</strong> {decision.decision.toUpperCase()} |{" "}
                <em>{new Date(decision.decidedAt).toLocaleString()}</em>
              </li>
            ))}
          </ul>
          <button className="send-to-council-btn" onClick={handleSendToCouncil}>
            Send to University Council
          </button>
        </>
      )}
    </div>
  );
};

export default SubmitToCouncil;
