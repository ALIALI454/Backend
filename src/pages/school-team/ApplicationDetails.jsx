// src/pages/school-team/ApplicationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationDetails.css';

const ApplicationCard = ({ application }) => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [docsLoading, setDocsLoading] = useState(true);
  const [docsError, setDocsError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/documents/${application.id}/documents`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch documents');
        return res.json();
      })
      .then(data => {
        setDocuments(data);
        setDocsLoading(false);
      })
      .catch(err => {
        setDocsError(err.message);
        setDocsLoading(false);
      });
  }, [application.id]);

  const getDocumentUrl = (docId) => `http://localhost:8080/api/documents/file/${docId}`;

  const handleConfirm = () => {
    // Navigate to checklist with applicationId
    navigate(`/school-team/checklist/${application.id}`);
  };

  return (
    <div className="application-card">
      <div className="status-header">
        <span>{application.status || "Pending"}</span>
      </div>

      <div className="card-body">
        {/* Applicant Info */}
        <div className="applicant-info">
          <div className="avatar">
            {application.fullName ? application.fullName.split(' ').map(n => n[0]).join('') : "NA"}
          </div>
          <div>
            <h3 className="applicant-name">{application.fullName}</h3>
            <p className="department-name">{application.department} Department</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="details-grid">
          <div className="detail-box"><p className="label">Nationality</p><p className="value">{application.nationality}</p></div>
          <div className="detail-box"><p className="label">Date of Birth</p><p className="value">{application.dateOfBirth}</p></div>
          <div className="detail-box"><p className="label">Appointment Date</p><p className="value">{application.appointmentDate}</p></div>
          <div className="detail-box"><p className="label">First Position</p><p className="value">{application.firstPosition}</p></div>
          <div className="detail-box"><p className="label">Current Position</p><p className="value">{application.currentPosition}</p></div>
          <div className="detail-box"><p className="label">Applied For</p><p className="value highlight">{application.positionApplied}</p></div>
          <div className="detail-box"><p className="label">Experience</p><p className="value">{application.yearsOfExperience} years</p></div>
          <div className="detail-box"><p className="label">Performance Rating</p><p className="value">{application.performanceRating}/5</p></div>
          <div className="detail-box"><p className="label">Submitted On</p><p className="value">{application.submissionDate}</p></div>
        </div>

        {/* Documents Section */}
        <div className="documents-section">
          <h4 className="section-title">Documents Submitted</h4>
          {docsLoading && <p>Loading documents...</p>}
          {docsError && <p className="error-message">Error loading documents: {docsError}</p>}
          {!docsLoading && !docsError && (
            documents.length === 0 ? (
              <p>No documents uploaded.</p>
            ) : (
              <ul className="documents-list">
                {documents.map(doc => (
                  <li key={doc.id} className="document-item">
                    <span className="document-icon">📄</span>
                    <strong>{doc.documentType}:</strong>
                    <a href={getDocumentUrl(doc.id)} target="_blank" rel="noopener noreferrer">
                      {doc.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            )
          )}
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate(-1)} className="btn-secondary">Back</button>
          <button onClick={handleConfirm} className="btn-primary">
            Confirm & Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

const ApplicationDetails = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/applications')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch applications');
        return res.json();
      })
      .then(data => {
        setApplications(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="application-list-container">
      <div className="header">
        <h2 className="title">Promotion Applications</h2>
        <p className="subtitle">Review and evaluate faculty promotion applications</p>
      </div>
      <div className="application-list">
        {applications.length === 0 ? (
          <p>No applications found.</p>
        ) : (
          applications.map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
