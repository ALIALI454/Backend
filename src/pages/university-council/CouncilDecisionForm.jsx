// src/pages/university-council/CouncilDecisionForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CouncilDecisionForm.css";

const CouncilDecisionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [finalDecision, setFinalDecision] = useState("");
  const [finalComment, setFinalComment] = useState("");

  useEffect(() => {
    const councilDecisions =
      JSON.parse(localStorage.getItem("councilDecisions")) || [];

    const found = councilDecisions.find(
      (app) => app.applicationId === Number(id)
    );

    setApplication(found || null);
  }, [id]);

  if (!application)
    return <p>Application not found or not sent to Council yet.</p>;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save final council decision to localStorage
    const finalDecisions =
      JSON.parse(localStorage.getItem("finalCouncilDecisions")) || [];

    const existingIndex = finalDecisions.findIndex(
      (d) => d.applicationId === application.applicationId
    );

    const newFinalDecision = {
      ...application,
      finalDecision,
      finalComment,
      decidedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      finalDecisions[existingIndex] = newFinalDecision;
    } else {
      finalDecisions.push(newFinalDecision);
    }

    localStorage.setItem(
      "finalCouncilDecisions",
      JSON.stringify(finalDecisions)
    );

    // Create applicant notification
    const notifications =
      JSON.parse(localStorage.getItem("applicantNotifications")) || [];

    // Decide message based on finalDecision
    let message = "";
    if (finalDecision === "Approved") {
      message = `Hongera! Taarifa ya kufanikisha mpango wako wa kupandishwa cheo kutoka ${application.promotionFrom} kwenda ${application.promotionTo} imethibitishwa na Baraza la Chuo Kikuu.`;
    } else if (finalDecision === "Rejected") {
      message = `Samahani, maombi yako ya kupandishwa cheo kutoka ${application.promotionFrom} kwenda ${application.promotionTo} hayakukubaliwa na Baraza la Chuo Kikuu.`;
    } else if (finalDecision === "Appeal") {
      message = `Maombi yako ya kupandishwa cheo yanahitaji rufaa na yamepelekwa kwenye hatua inayofuata. Tafadhali fuatilia maelezo zaidi.`;
    } else {
      message = `Maamuzi ya mwisho kuhusu maombi yako bado hayajafanywa.`;
    }

    notifications.push({
      id: Date.now(),
      title: "Maamuzi ya Mwisho ya Baraza la Chuo Kikuu",
      message,
      date: new Date().toLocaleString(),
      read: false,
    });

    localStorage.setItem("applicantNotifications", JSON.stringify(notifications));

    alert("Final Council Decision saved successfully and applicant notified!");
    navigate("/university-council/hr-decisions"); // redirect as you wish
  };

  return (
    <div className="council-decision-form">
      <h2>Make Final Council Decision for Application #{application.applicationId}</h2>

      <div className="application-details">
        <p><strong>Applicant:</strong> {application.applicantName}</p>
        <p><strong>Promotion From:</strong> {application.promotionFrom}</p>
        <p><strong>Promotion To:</strong> {application.promotionTo}</p>
        <p><strong>HR Decision:</strong> {application.hrDecision}</p>
        <p><strong>HR Comment:</strong> {application.hrComment || "No comment"}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Final Decision:
          <select
            required
            value={finalDecision}
            onChange={(e) => setFinalDecision(e.target.value)}
          >
            <option value="">-- Select Final Decision --</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
            <option value="Appeal">Appeal</option>
          </select>
        </label>

        <label>
          Final Comment:
          <textarea
            placeholder="Add comments if needed"
            value={finalComment}
            onChange={(e) => setFinalComment(e.target.value)}
          />
        </label>

        <button type="submit" className="submit-btn">
          Submit Final Decision
        </button>
      </form>
    </div>
  );
};

export default CouncilDecisionForm;
