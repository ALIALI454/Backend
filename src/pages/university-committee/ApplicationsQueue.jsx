// src/pages/university-committee/ApplicationsQueue.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationsQueue.css';

const ApplicationsQueue = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Dr. Asha Mwinyi",
      department: "Computer Science",
      currentPosition: "Assistant Lecturer",
      status: "Under Review",
      appliedFor: "Lecturer",
      submissionDate: "2025-05-01",
      experience: 4,
      documents: { cv: true, certificates: true, evidence: false },
      eligibility: {
        status: "ELIGIBLE",
        percentage: 80,
        criteria: {
          documentsComplete: false,
          minExperience: true,
          performanceRating: true,
          recommendationLetter: true,
          educationRequirements: true
        }
      }
    },
    {
      id: 2,
      name: "Milham Issa",
      department: "Law",
      currentPosition: "Assistant Lecturer",
      status: "Pending",
      appliedFor: "Senior Lecturer",
      submissionDate: "2025-05-10",
      experience: 5,
      documents: { cv: true, certificates: true, evidence: true },
      eligibility: {
        status: "ELIGIBLE",
        percentage: 90,
        criteria: {
          documentsComplete: true,
          minExperience: true,
          performanceRating: true,
          recommendationLetter: true,
          educationRequirements: true
        }
      }
    },
    {
      id: 3,
      name: "Salama Issa",
      department: "Medicine",
      currentPosition: "Lecturer",
      status: "Approved",
      appliedFor: "Senior Lecturer",
      submissionDate: "2025-05-15",
      experience: 6,
      documents: { cv: true, certificates: true, evidence: true },
      eligibility: {
        status: "ELIGIBLE",
        percentage: 95,
        criteria: {
          documentsComplete: true,
          minExperience: true,
          performanceRating: true,
          recommendationLetter: true,
          educationRequirements: true
        }
      }
    },
    {
      id: 4,
      name: "Ali Omar",
      department: "Business Administration",
      currentPosition: "Assistant Lecturer",
      status: "Rejected",
      appliedFor: "Lecturer",
      submissionDate: "2025-05-18",
      experience: 3,
      documents: { cv: true, certificates: false, evidence: false },
      eligibility: {
        status: "NOT ELIGIBLE",
        percentage: 50,
        criteria: {
          documentsComplete: false,
          minExperience: true,
          performanceRating: false,
          recommendationLetter: false,
          educationRequirements: true
        }
      }
    },
    {
      id: 5,
      name: "Zuberi Kombo",
      department: "Education",
      currentPosition: "Lecturer",
      status: "Approved",
      appliedFor: "Senior Lecturer",
      submissionDate: "2025-05-20",
      experience: 7,
      documents: { cv: true, certificates: true, evidence: true },
      eligibility: {
        status: "ELIGIBLE",
        percentage: 98,
        criteria: {
          documentsComplete: true,
          minExperience: true,
          performanceRating: true,
          recommendationLetter: true,
          educationRequirements: true
        }
      }
    }
  ]);

  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => setEditingId(id);

  const handleSave = (id) => {
    setEditingId(null);
    console.log("Saved:", applications.find(app => app.id === id));
  };

  const handleChange = (id, field, value) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, [field]: value } : app
    ));
  };

  const handleView = (applicationId) => {
    navigate(`/university-committee/application-details/${applicationId}`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved': return 'status approved';
      case 'Pending': return 'status pending';
      case 'Under Review': return 'status review';
      case 'Rejected': return 'status rejected';
      default: return 'status';
    }
  };

  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Current Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>
                {editingId === app.id ? (
                  <input
                    value={app.name}
                    onChange={(e) => handleChange(app.id, 'name', e.target.value)}
                  />
                ) : app.name}
              </td>
              <td>
                {editingId === app.id ? (
                  <input
                    value={app.department}
                    onChange={(e) => handleChange(app.id, 'department', e.target.value)}
                  />
                ) : app.department}
              </td>
              <td>
                {editingId === app.id ? (
                  <input
                    value={app.currentPosition}
                    onChange={(e) => handleChange(app.id, 'currentPosition', e.target.value)}
                  />
                ) : app.currentPosition}
              </td>
              <td>
                {editingId === app.id ? (
                  <select
                    value={app.status}
                    onChange={(e) => handleChange(app.id, 'status', e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                ) : (
                  <span className={getStatusClass(app.status)}>{app.status}</span>
                )}
              </td>
              <td>
                {editingId === app.id ? (
                  <button className="btn save" onClick={() => handleSave(app.id)}>Save</button>
                ) : (
                  <>
                    <button className="btn view" onClick={() => handleView(app.id)}>View</button>
                    <button className="btn edit" onClick={() => handleEdit(app.id)}>Edit</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationsQueue;