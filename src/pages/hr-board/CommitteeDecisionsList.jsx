// src/pages/hr-board/CommitteeDecisionsList.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CommitteeDecisionsList.css";

const sampleData = [
  {
    applicationId: 1,
    academicMaterials: ["Journal Article", "Book"],
    promotionFrom: "Assistant Lecturer",
    promotionTo: "Lecturer",
    qualityGrade: "A",
    strengths: "High-quality research with strong publication record.",
    shortcomings: "Needs more collaborative works.",
    reviewer: {
      name: "Prof. John Mwangi",
      rank: "Professor",
      affiliation: "University of Nairobi",
    },
    recommendation: "APPROVE",
    recommendationReason: "Meets all criteria for promotion.",
    attachedDocuments: ["ReviewReport1.pdf"],
    committeeDecision: "Approved",
    committeeComment: "Strong research",
  },
  {
    applicationId: 2,
    academicMaterials: ["Conference Paper"],
    promotionFrom: "Lecturer",
    promotionTo: "Senior Lecturer",
    qualityGrade: "B+",
    strengths: "Good research presentation, innovative ideas.",
    shortcomings: "Lacks strong journal publications.",
    reviewer: {
      name: "Dr. Fatma Said",
      rank: "Senior Lecturer",
      affiliation: "University of Dar es Salaam",
    },
    recommendation: "REVISE",
    recommendationReason: "Needs improvement in publication quality.",
    attachedDocuments: ["ReviewReport2.docx"],
    committeeDecision: "Pending",
    committeeComment: "",
  },
];

const CommitteeDecisionsList = () => {
  const [decisions, setDecisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDecisions(sampleData);
  }, []);

  const handleMakeDecision = (id) => {
    navigate(`/hr-board/make-decisions/${id}`); // **Path imebadilishwa**
  };

  return (
    <div className="committee-decisions-list">
      <h2>University Committee Decisions</h2>
      {decisions.length === 0 ? (
        <p>No committee decisions found.</p>
      ) : (
        decisions.map((item) => (
          <div key={item.applicationId} className="decision-card">
            <h3>Application ID: {item.applicationId}</h3>
            <p><strong>Type(s) of Academic Materials:</strong> {item.academicMaterials.join(", ")}</p>
            <p><strong>Promotion From:</strong> {item.promotionFrom}</p>
            <p><strong>Promotion To:</strong> {item.promotionTo}</p>
            <p><strong>Quality Grade:</strong> {item.qualityGrade}</p>
            <p><strong>Strengths:</strong> {item.strengths}</p>
            <p><strong>Shortcomings:</strong> {item.shortcomings}</p>

            <h4>Reviewer Information</h4>
            <p><strong>Name:</strong> {item.reviewer.name}</p>
            <p><strong>Rank:</strong> {item.reviewer.rank}</p>
            <p><strong>Affiliation:</strong> {item.reviewer.affiliation}</p>

            <p><strong>Recommendation:</strong> {item.recommendation}</p>
            <p><strong>Recommendation Reason:</strong> {item.recommendationReason}</p>
            <p><strong>Attached Document(s):</strong> {item.attachedDocuments.join(", ")}</p>

            <hr />
            <p>
              <strong>Committee Decision:</strong>{" "}
              <span className={`committee-decision ${
                item.committeeDecision.toLowerCase() === "approved"
                  ? "approved"
                  : item.committeeDecision.toLowerCase() === "rejected"
                  ? "rejected"
                  : "pending"
              }`}>
                {item.committeeDecision}
              </span>
            </p>

            {item.committeeComment && (
              <p><strong>Committee Comment:</strong> {item.committeeComment}</p>
            )}

            {/* Button ya HR Decision */}
            <button
              className="make-decision-btn"
              onClick={() => handleMakeDecision(item.applicationId)}
            >
              Make HR Decision
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default CommitteeDecisionsList;
