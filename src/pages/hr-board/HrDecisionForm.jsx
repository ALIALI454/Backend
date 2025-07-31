// src/pages/hr-board/HrDecisionForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./HrDecisionForm.css";

const HrDecisionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [decision, setDecision] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Simulate fetching application details (full details like in CommitteeDecisionsList)
    const data = [
      {
        applicationId: 1,
        applicantName: "Ali Omar",
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
        applicantName: "Fatma Salim",
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

    const found = data.find((app) => app.applicationId === Number(id));
    setApplication(found || null);
  }, [id]);

  if (!application) return <p>Application not found.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save HR decision to localStorage
    const hrDecisions = JSON.parse(localStorage.getItem("hrDecisions")) || [];
    const existingIndex = hrDecisions.findIndex(
      (d) => d.applicationId === application.applicationId
    );

    const newDecision = {
      applicationId: application.applicationId,
      applicantName: application.applicantName,
      promotionFrom: application.promotionFrom,
      promotionTo: application.promotionTo,
      committeeDecision: application.committeeDecision,
      committeeComment: application.committeeComment,
      hrDecision: decision,
      hrComment: comment,
      decidedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      hrDecisions[existingIndex] = newDecision;
    } else {
      hrDecisions.push(newDecision);
    }
    localStorage.setItem("hrDecisions", JSON.stringify(hrDecisions));

    // Push to council list
    const councilDecisions =
      JSON.parse(localStorage.getItem("councilDecisions")) || [];
    councilDecisions.push(newDecision);
    localStorage.setItem("councilDecisions", JSON.stringify(councilDecisions));

    // Add applicant notification
    const notifications =
      JSON.parse(localStorage.getItem("applicantNotifications")) || [];
    notifications.push({
      id: Date.now(),
      title: "Your Application Has Been Sent to Council",
      message: `Dear ${application.applicantName}, your application for promotion from ${application.promotionFrom} to ${application.promotionTo} has been forwarded to the University Council.`,
      date: new Date().toLocaleString(),
      read: false,
    });
    localStorage.setItem(
      "applicantNotifications",
      JSON.stringify(notifications)
    );

    alert("HR Decision sent to Council and applicant notified!");
    navigate("/hr-board/submit-council");
  };

  return (
    <div className="hr-decision-form">
      <h2>Make HR Decision for Application #{application.applicationId}</h2>

      <div className="application-details">
        <p><strong>Applicant:</strong> {application.applicantName}</p>
        <p><strong>Type(s) of Academic Materials:</strong> {application.academicMaterials.join(", ")}</p>
        <p><strong>Promotion From:</strong> {application.promotionFrom}</p>
        <p><strong>Promotion To:</strong> {application.promotionTo}</p>
        <p><strong>Quality Grade:</strong> {application.qualityGrade}</p>
        <p><strong>Strengths:</strong> {application.strengths}</p>
        <p><strong>Shortcomings:</strong> {application.shortcomings}</p>
        
        <h4>Reviewer Information</h4>
        <p><strong>Name:</strong> {application.reviewer.name}</p>
        <p><strong>Rank:</strong> {application.reviewer.rank}</p>
        <p><strong>Affiliation:</strong> {application.reviewer.affiliation}</p>
        <p><strong>Recommendation:</strong> {application.recommendation}</p>
        <p><strong>Recommendation Reason:</strong> {application.recommendationReason}</p>
        <p><strong>Attached Document(s):</strong> {application.attachedDocuments.join(", ")}</p>
        <p><strong>Committee Decision:</strong> {application.committeeDecision}</p>
        <p><strong>Committee Comment:</strong> {application.committeeComment || "No comment"}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          HR Decision:
          <select
            required
            value={decision}
            onChange={(e) => setDecision(e.target.value)}
          >
            <option value="">-- Select Decision --</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
            <option value="Revise">Request Revision</option>
          </select>
        </label>

        <label>
          HR Comment:
          <textarea
            placeholder="Add comments if needed"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>

        <button type="submit" className="submit-btn">
          Send to Council
        </button>
      </form>
    </div>
  );
};

export default HrDecisionForm;
