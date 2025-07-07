import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplicationForm.css'; // Hii ni muhimu sana kwa CSS mpya!

const positionCategories = [
  {
    title: "Academic Staff",
    positions: [
      "Professors Emeritus",
      "Professors",
      "Associate Professors",
      "Senior Lecturers",
      "Lecturers",
      "Assistant Lecturers",
      "Tutorial Assistants"
    ]
  },
  {
    title: "Library Staff",
    positions: [
      "Library Professors",
      "Associate Library Professors",
      "Senior Librarians",
      "Assistant Librarians"
    ]
  },
  {
    title: "Research Staff",
    positions: [
      "Research Professors",
      "Associate Research Professors",
      "Senior Research Fellows",
      "Research Fellows",
      "Assistant Research Fellows"
    ]
  }
];

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    nationality: '',
    appointmentDate: '',
    firstPosition: '',
    currentPosition: '',
    positionApplied: '',
    appliedBefore: false,
    previousApplicationDate: '',
    newPublications: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/applicant/upload');
  };

  return (
    <div className="form-container-wrapper"> {/* Kifunga kikuu cha ukurasa mzima */}
      <div className="application-form-container"> {/* Container kuu ya fomu */}
        <h2 className="form-main-title">
         Academic Staff Promotion Guideline Application Form
        </h2>
        <form onSubmit={handleSubmit} className="application-form">
          <h3 className="form-section-title">PART 1: PERSONAL PARTICULARS</h3>

          <div className="form-group">
            <label htmlFor="fullName">a) Full Name:</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">b) Date of Birth:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">c) Nationality:</label>
            <input
              type="text"
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
            />
          </div>

          <h3 className="form-section-title">PART 2: EMPLOYMENT DETAILS</h3>

          <div className="form-group">
            <label htmlFor="appointmentDate">a) Date of First Appointment:</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="firstPosition">b) First Position at SUZA:</label>
            <select
              id="firstPosition"
              name="firstPosition"
              value={formData.firstPosition}
              onChange={handleChange}
              required
            >
              <option value=""> Select First Position </option>
              {positionCategories.map((category) => (
                <optgroup key={category.title} label={category.title}>
                  {category.positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="currentPosition">c) Current Position at SUZA:</label>
            <select
              id="currentPosition"
              name="currentPosition"
              value={formData.currentPosition}
              onChange={handleChange}
              required
            >
              <option value=""> Select Current Position </option>
              {positionCategories.map((category) => (
                <optgroup key={category.title} label={category.title}>
                  {category.positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <h3 className="form-section-title">PART 3: PROMOTION INFORMATION</h3>

          <div className="form-group">
            <label htmlFor="positionApplied">a) Position Applied For:</label>
            <select
              id="positionApplied"
              name="positionApplied"
              value={formData.positionApplied}
              onChange={handleChange}
              required
            >
              <option value=""> Select Position Applied For </option>
              {positionCategories.map((category) => (
                <optgroup key={category.title} label={category.title}>
                  {category.positions.map((pos) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="form-group form-group-checkbox">
            <label htmlFor="appliedBefore">
              b) Have you applied before?
              <input
                type="checkbox"
                id="appliedBefore"
                name="appliedBefore"
                checked={formData.appliedBefore}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span> {/* Custom checkbox visual */}
            </label>
          </div>

          {formData.appliedBefore && (
            <div className="form-group">
              <label htmlFor="previousApplicationDate">If yes, when?</label>
              <input
                type="date"
                id="previousApplicationDate"
                name="previousApplicationDate"
                value={formData.previousApplicationDate}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="form-group form-group-checkbox">
            <label htmlFor="newPublications">
              c) Do you have new publications?
              <input
                type="checkbox"
                id="newPublications"
                name="newPublications"
                checked={formData.newPublications}
                onChange={handleChange}
              />
              <span className="checkbox-custom"></span> {/* Custom checkbox visual */}
            </label>
          </div>

          <div className="form-submit-container">
            <button type="submit" className="submit-button">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;