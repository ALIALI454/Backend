
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css'; // CSS ya form

const ApplicationForm = () => {
  const appId = localStorage.getItem("appId");

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    nationality: "",
    appointmentDate: "",
    firstPosition: "",
    currentPosition: "",
    positionApplied: "",
    appliedBefore: false,
    previousApplicationDate: "",
    newPublications: false,
    feedback: 'null',
  });

   const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      applicantId: parseInt(appId, 10),
      ...formData,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/applications", payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Application submitted successfully!");
        navigate('/applicant/upload');
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application.");
     
   
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Create Application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>

        <div>
          <label>Date of Birth:</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </div>

        <div>
          <label>Nationality:</label>
          <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} required />
        </div>

        <div>
          <label>Appointment Date:</label>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required />
        </div>

        <div>
          <label>First Position:</label>
          <input type="text" name="firstPosition" value={formData.firstPosition} onChange={handleChange} required />
        </div>

        <div>
          <label>Current Position:</label>
          <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} required />
        </div>

        <div>
          <label>Position Applied:</label>
          <input type="text" name="positionApplied" value={formData.positionApplied} onChange={handleChange} required />
        </div>

        <div>
          <label>
            <input type="checkbox" name="appliedBefore" checked={formData.appliedBefore} onChange={handleChange} />
            Applied Before
          </label>
        </div>

        {formData.appliedBefore && (
          <div>
            <label>Previous Application Date:</label>
            <input
              type="date"
              name="previousApplicationDate"
              value={formData.previousApplicationDate}
              onChange={handleChange}
            />
          </div>
        )}

        <div>
          <label>
            <input type="checkbox" name="newPublications" checked={formData.newPublications} onChange={handleChange} />
            New Publications
          </label>
        </div>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
