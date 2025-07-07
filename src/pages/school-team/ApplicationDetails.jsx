import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationDetails.css';

const evaluatePromotionCriteria = (app) => {
  const criteria = {
    documentsComplete: app.documents?.cv && app.documents?.certificates && app.documents?.evidence,
    experience: app.yearsOfExperience >= 3,
    performanceRating: app.performanceRating >= 4,
    hasRecommendation: app.hasRecommendation,
    meetsEducationRequirements: app.meetsEducationRequirements,
  };

  const metCriteria = Object.values(criteria).filter(Boolean).length;
  const totalCriteria = Object.keys(criteria).length;
  const percentageMet = Math.round((metCriteria / totalCriteria) * 100);

  return {
    criteria,
    percentageMet,
    isEligible: percentageMet >= 70,
    statusColor: percentageMet >= 70 ? 'bg-emerald-500' : percentageMet >= 50 ? 'bg-amber-500' : 'bg-rose-500'
  };
};

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const evaluation = evaluatePromotionCriteria(application);

  return (
    <div className="application-card">
      <div className={`status-header ${evaluation.statusColor}`}>
        <span>{application.status}</span>
        <span className="status-percentage">
          {evaluation.percentageMet}% Complete
        </span>
      </div>

      <div className="card-body">
        <div className="applicant-info">
          <div className="avatar">
            {application.applicantName.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="applicant-name">{application.applicantName}</h3>
            <p className="department-name">{application.department} Department</p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-box">
            <p className="label">Current Position</p>
            <p className="value">{application.currentPosition}</p>
          </div>
          <div className="detail-box">
            <p className="label">Applied For</p>
            <p className="value highlight">{application.positionApplied}</p>
          </div>
          <div className="detail-box">
            <p className="label">Experience</p>
            <p className="value">{application.yearsOfExperience} years</p>
          </div>
          <div className="detail-box">
            <p className="label">Submitted</p>
            <p className="value">{application.submissionDate}</p>
          </div>
        </div>

        <div className="documents-section">
          <h4 className="section-title">Documents Submitted</h4>
          <div className="documents-grid">
            <div className={`document-item ${application.documents?.cv ? 'valid' : 'invalid'}`}>CV</div>
            <div className={`document-item ${application.documents?.certificates ? 'valid' : 'invalid'}`}>Academic Certificates</div>
            <div className={`document-item ${application.documents?.evidence ? 'valid' : 'invalid'}`}>Evidence Documents</div>
          </div>
        </div>

        <div className="evaluation-section">
          <h4 className="section-title">Promotion Evaluation</h4>
          <div className="progress-bar">
            <div className="progress-labels">
              <span>Eligibility Score</span>
              <span className="percentage">{evaluation.percentageMet}%</span>
            </div>
            <div className="bar">
              <div className={`fill ${evaluation.statusColor}`} style={{ width: `${evaluation.percentageMet}%` }}></div>
            </div>
          </div>

          <div className="criteria-list">
            {Object.entries(evaluation.criteria).map(([key, met]) => (
              <div key={key} className={`criteria-item ${met ? 'met' : 'unmet'}`}>
                <span className="icon">{met ? '✓' : '✗'}</span>
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).replace('Documents Complete', 'All Documents')}</span>
              </div>
            ))}
          </div>

          {!evaluation.isEligible && (
            <div className="note">
              <p><strong>Note:</strong> Must meet at least 70% of the promotion criteria to qualify.</p>
            </div>
          )}
        </div>

        {evaluation.isEligible && (
          <div className="next-steps">
            <h4 className="section-title">Recommended Next Steps</h4>
            <ol>
              <li>Schedule interview with promotion committee</li>
              <li>Verify submitted documents with HR</li>
              <li>Prepare official promotion offer letter</li>
            </ol>
          </div>
        )}

        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="btn-secondary">Back</button>
          {evaluation.isEligible && (
            <button onClick={() => navigate('/school-team/checklist')} className="btn-primary">
              Confirm & Continue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ApplicationDetails = () => {
  const applications = [
    {
      applicantName: "Dr. Asha Mwinyi",
      department: "Computer Science",
      currentPosition: "Assistant Lecturer",
      positionApplied: "Lecturer",
      submissionDate: "May 1, 2025",
      yearsOfExperience: 4,
      performanceRating: 4.5,
      hasRecommendation: true,
      meetsEducationRequirements: true,
      documents: { cv: true, certificates: true, evidence: false },
      status: "Under Review"
    },
    {
      applicantName: "Mr. Salim Omar",
      department: "Library Sciences",
      currentPosition: "Assistant Librarian",
      positionApplied: "Librarian",
      submissionDate: "May 3, 2025",
      yearsOfExperience: 2,
      performanceRating: 3.8,
      hasRecommendation: false,
      meetsEducationRequirements: true,
      documents: { cv: true, certificates: true, evidence: true },
      status: "Pending"
    },
    {
      applicantName: "Prof. Fatuma Juma",
      department: "Research Center",
      currentPosition: "Research Fellow",
      positionApplied: "Senior Research Fellow",
      submissionDate: "April 28, 2025",
      yearsOfExperience: 6,
      performanceRating: 4.7,
      hasRecommendation: true,
      meetsEducationRequirements: true,
      documents: { cv: true, certificates: true, evidence: true },
      status: "Forwarded"
    }
  ];

  return (
    <div className="application-list-container">
      <div className="header">
        <h2 className="title">Promotion Applications</h2>
        <p className="subtitle">Review and evaluate faculty promotion applications</p>
      </div>
      <div className="application-list">
        {applications.map((app, index) => (
          <ApplicationCard key={index} application={app} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationDetails;
