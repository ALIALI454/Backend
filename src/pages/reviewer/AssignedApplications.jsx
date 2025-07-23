import React from "react";
import { useNavigate } from "react-router-dom";
import "./AssignedApplications.css";

const AssignedApplications = () => {
  const navigate = useNavigate();

  const applications = [
    {
      id: 1,
      name: "Dr. Asha Mwinyi",
      department: "Computer Science",
      deadline: "2025-07-30",
      status: "Pending Review",
      currentPosition: "Senior Lecturer",
      documents: {
        cv: true,
        certificates: true,
        publications: true,
        teaching_portfolio: false, // Missing
      },
    },
    {
      id: 2,
      name: "Dr. John Kimambo",
      department: "Medicine",
      deadline: "2025-08-05",
      status: "In Progress",
      currentPosition: "Associate Professor",
      documents: {
        cv: true,
        certificates: true,
        publications: true,
        teaching_portfolio: true,
      },
    },
    {
      id: 3,
      name: "Prof. Jane Doe",
      department: "Physics",
      deadline: "2025-07-25",
      status: "Pending Review",
      currentPosition: "Professor",
      documents: {
        cv: true,
        certificates: false, // Missing
        publications: true,
        teaching_portfolio: true,
      },
    },
    {
      id: 4,
      name: "Dr. Salma Juma",
      department: "Education",
      deadline: "2025-08-10",
      status: "Pending Review",
      currentPosition: "Lecturer",
      documents: {
        cv: true,
        certificates: true,
        publications: false, // Missing
        teaching_portfolio: true,
      },
    },
    {
      id: 5,
      name: "Prof. Michael Onyango",
      department: "Business Administration",
      deadline: "2025-08-15",
      status: "In Progress",
      currentPosition: "Associate Professor",
      documents: {
        cv: true,
        certificates: true,
        publications: true,
        teaching_portfolio: true,
      },
    },
  ];

  const handleReview = (appId) => {
    const application = applications.find((app) => app.id === appId);
    navigate("/reviewer/document-viewer", { state: { application } });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending Review":
        return "status-pending";
      case "In Progress":
        return "status-progress";
      case "Completed":
        return "status-completed"; // Optional
      default:
        return "status-default";
    }
  };

  return (
    <div className="assigned-container">
      <div className="assigned-header">
        <h1>Your Assigned Applications</h1>
        <div className="current-date">
          <span>
            📅 Current Date:{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {applications.length > 0 ? (
        <div className="applications-list">
          {applications.map((app) => (
            <div key={app.id} className="application-card">
              <div className="card-header">
                <h2 className="applicant-name">{app.name}</h2>
                <div className="status-tags">
                  <span className="tag department">{app.department}</span>
                  <span className={`tag status ${getStatusClass(app.status)}`}>
                    {app.status}
                  </span>
                  <span className="tag deadline">Deadline: {app.deadline}</span>
                </div>
              </div>

              <div className="card-body">
                <p className="current-position">
                  Current Position: {app.currentPosition}
                </p>
                <h3>Submitted Documents</h3>
                <div className="documents-list">
                  {Object.entries(app.documents).map(([doc, submitted]) => (
                    <span
                      key={doc}
                      className={`document-tag ${
                        submitted ? "doc-submitted" : "doc-missing"
                      }`}
                    >
                      {submitted ? "✅" : "❌"}{" "}
                      {doc
                        .split("_")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </span>
                  ))}
                </div>
                <button
                  className="review-button"
                  onClick={() => handleReview(app.id)}
                >
                  Review Application ➡️
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-applications">
          <div className="icon-container">📄</div>
          <h3>No Applications Assigned</h3>
          <p>You currently don't have any applications to review.</p>
        </div>
      )}
    </div>
  );
};

export default AssignedApplications;
