// src/pages/university-council/FinalApprovedList.jsx
import React, { useEffect, useState } from "react";
import "./FinalApprovedList.css";

const FinalApprovedList = () => {
  const [approvedList, setApprovedList] = useState([]);

  useEffect(() => {
    const allFinalDecisions =
      JSON.parse(localStorage.getItem("finalCouncilDecisions")) || [];

    // Chuja tu maombi yaliyopitishwa rasmi (finalDecision === 'Approved')
    const approved = allFinalDecisions.filter(
      (item) => item.finalDecision === "Approved"
    );

    setApprovedList(approved);
  }, []);

  return (
    <div className="final-approved-list">
      <h2>Final Approved Promotions by University Council</h2>

      {approvedList.length === 0 ? (
        <p>No final approved promotions found.</p>
      ) : (
        approvedList.map((item) => (
          <div key={item.applicationId} className="approved-card">
            <h3>Application ID: {item.applicationId}</h3>
            <p><strong>Applicant:</strong> {item.applicantName}</p>
            <p><strong>Promotion From:</strong> {item.promotionFrom}</p>
            <p><strong>Promotion To:</strong> {item.promotionTo}</p>
            <p><strong>Final Decision Date:</strong>{" "}
              {item.decidedAt ? new Date(item.decidedAt).toLocaleDateString() : "N/A"}
            </p>
            <p><strong>Final Comment:</strong> {item.finalComment || "No comment"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FinalApprovedList;
