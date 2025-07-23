// src/pages/university-committee/ApplicationDetails.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AssignReviewer from './AssignReviewer';
import './ApplicationDetails.css';

const ALL_APPLICATIONS_DATA = [
  { id: 1, name: "Dr. Asha Mwinyi", department: "Computer Science", currentPosition: "Assistant Lecturer", status: "Under Review", appliedFor: "Lecturer", submissionDate: "2025-05-01", experience: 4, documents: { cv: true, certificates: true, evidence: false }, eligibility: { status: "ELIGIBLE", percentage: 80, criteria: { documentsComplete: false, minExperience: true, performanceRating: true, recommendationLetter: true, educationRequirements: true } } },
  { id: 2, name: "Milham Issa", department: "Law", currentPosition: "Assistant Lecturer", status: "Pending", appliedFor: "Senior Lecturer", submissionDate: "2025-05-10", experience: 5, documents: { cv: true, certificates: true, evidence: true }, eligibility: { status: "ELIGIBLE", percentage: 90, criteria: { documentsComplete: true, minExperience: true, performanceRating: true, recommendationLetter: true, educationRequirements: true } } },
  { id: 3, name: "Salama Issa", department: "Medicine", currentPosition: "Lecturer", status: "Approved", appliedFor: "Senior Lecturer", submissionDate: "2025-05-15", experience: 6, documents: { cv: true, certificates: true, evidence: true }, eligibility: { status: "ELIGIBLE", percentage: 95, criteria: { documentsComplete: true, minExperience: true, performanceRating: true, recommendationLetter: true, educationRequirements: true } } },
  { id: 4, name: "Ali Omar", department: "Business Administration", currentPosition: "Assistant Lecturer", status: "Rejected", appliedFor: "Lecturer", submissionDate: "2025-05-18", experience: 3, documents: { cv: true, certificates: false, evidence: false }, eligibility: { status: "NOT ELIGIBLE", percentage: 50, criteria: { documentsComplete: false, minExperience: true, performanceRating: false, recommendationLetter: false, educationRequirements: true } } },
  { id: 5, name: "Zuberi Kombo", department: "Education", currentPosition: "Lecturer", status: "Approved", appliedFor: "Senior Lecturer", submissionDate: "2025-05-20", experience: 7, documents: { cv: true, certificates: true, evidence: true }, eligibility: { status: "ELIGIBLE", percentage: 98, criteria: { documentsComplete: true, minExperience: true, performanceRating: true, recommendationLetter: true, educationRequirements: true } } }
];

const CommitteeApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [assignedReviewers, setAssignedReviewers] = useState([]);

  useEffect(() => {
    const applicationId = parseInt(id);
    const foundApp = ALL_APPLICATIONS_DATA.find(a => a.id === applicationId);
    setApp(foundApp);
  }, [id]);

  if (!app) {
    return (
      <div className="details-container">
        <button onClick={() => navigate(-1)} className="back-button">
          ← Back to Applications
        </button>
        <div className="card no-data">
          <p>No application data found for ID: {id}.</p>
        </div>
      </div>
    );
  }

  const statusClass = {
    'Pending': 'status pending',
    'Under Review': 'status review',
    'Approved': 'status approved',
    'Rejected': 'status rejected'
  };

  const handleConfirm = () => {
    if (assignedReviewers.length === 0) {
      alert("Please assign at least one reviewer before continuing.");
      return;
    }

    // 1. Save application to reviewers' assigned applications
    const assignedApps = JSON.parse(localStorage.getItem('assignedApplications')) || [];
    const updatedAssignedApps = [...assignedApps, { ...app, reviewers: assignedReviewers }];
    localStorage.setItem('assignedApplications', JSON.stringify(updatedAssignedApps));

    // 2. Notify applicant
    const applicantNotifications = JSON.parse(localStorage.getItem('applicantNotifications')) || [];
    const newNotification = {
      id: Date.now(),
      title: "Application Sent for Review",
      message: `Your promotion application for ${app.appliedFor} has been sent to reviewers.`,
      date: new Date().toLocaleDateString(),
      read: false
    };
    applicantNotifications.push(newNotification);
    localStorage.setItem('applicantNotifications', JSON.stringify(applicantNotifications));

    // 3. Navigate to ReviewSummary
    navigate('/university-committee/review-summary/' + app.id);
  };

  return (
    <div className="details-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Applications
      </button>

      <div className="card">
        <h2>Promotion Application</h2>
        <div className="row">
          <div className="col">
            <label>Name</label>
            <p>{app.name}</p>
            <label>Department</label>
            <p>{app.department}</p>
          </div>
          <div className="col">
            <label>Current Position</label>
            <p>{app.currentPosition}</p>
            <label>Applied For</label>
            <p>{app.appliedFor}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Application Status</h3>
        <div className="row">
          <div className="col">
            <label>Submission Date</label>
            <p>{app.submissionDate}</p>
          </div>
          <div className="col">
            <label>Status</label>
            <span className={statusClass[app.status]}>{app.status}</span>
          </div>
          <div className="col">
            <label>Experience</label>
            <p>{app.experience} years</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Documents</h3>
        <ul className="documents">
          {Object.entries(app.documents).map(([doc, submitted]) => (
            <li key={doc}>
              {submitted ? '✅' : '❌'} {doc.charAt(0).toUpperCase() + doc.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Evaluation</h3>
        <p className="eval-status">
          {app.eligibility.status} ({app.eligibility.percentage}% met)
        </p>
        <ul className="evaluation">
          {Object.entries(app.eligibility.criteria).map(([criteria, met]) => (
            <li key={criteria}>
              {met ? '✅' : '❌'} {criteria.split(/(?=[A-Z])/).join(' ')}
            </li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>Reviewer Assignment</h3>
        {assignedReviewers.length > 0 ? (
          <p>✅ Assigned to {assignedReviewers.map(r => r.name).join(", ")}</p>
        ) : (
          <AssignReviewer onAssign={setAssignedReviewers} />
        )}
      </div>

      <div className="card actions">
        <button onClick={handleConfirm} className="confirm-button">
          Confirm and Continue →
        </button>
      </div>
    </div>
  );
};

export default CommitteeApplicationDetails;
