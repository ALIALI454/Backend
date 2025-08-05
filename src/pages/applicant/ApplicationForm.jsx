// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './ApplicationForm.css'; // CSS ya form

// const positionCategories = [
//   {
//     title: "Academic Staff",
//     positions: [
//       "Professors Emeritus",
//       "Professors",
//       "Associate Professors",
//       "Senior Lecturers",
//       "Lecturers",
//       "Assistant Lecturers",
//       "Tutorial Assistants"
//     ]
//   },
// ];

// const ApplicationForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     dateOfBirth: '',
//     nationality: '',
//     appointmentDate: '',
//     firstPosition: '',
//     currentPosition: '',
//     positionApplied: '',
//     appliedBefore: false,
//     previousApplicationDate: '',
//     newPublications: false,
   
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError('');

//   try {
//     // Get app_Id from localStorage
//     const appId = localStorage.getItem('appId');

//     // Construct payload matching backend expectation
//     const payload = {
//       ...formData,
//       applicant: {  appId: 3 }
//     };

//     const response = await fetch('http://localhost:8080/api/applications/post', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     });

//     if (response.ok) {
//       const savedData = await response.json();
//       console.log("Form saved:", savedData);

//       // Save applicationId locally
//       localStorage.setItem('applicationId', savedData.id);

//       alert("Application submitted successfully!");
//       navigate('/applicant/upload');
//     } else {
//       const errorText = await response.text();
//       console.error("Error:", errorText);
//       setError("Failed to submit application: " + errorText);
//     }
//   } catch (err) {
//     console.error("Error submitting application:", err);
//     setError("Something went wrong. Try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="form-container-wrapper">
//       <div className="application-form-container">
//         <h2 className="form-main-title">
//           Academic Staff Promotion Guideline Application Form
//         </h2>
//         {error && <p className="error-message">{error}</p>}
//         <form onSubmit={handleSubmit} className="application-form">
//           <h3 className="form-section-title">PART 1: PERSONAL PARTICULARS</h3>

//           <div className="form-group">
//             <label htmlFor="fullName">a) Full Name:</label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="dateOfBirth">b) Date of Birth:</label>
//             <input
//               type="date"
//               id="dateOfBirth"
//               name="dateOfBirth"
//               value={formData.dateOfBirth}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="nationality">c) Nationality:</label>
//             <input
//               type="text"
//               id="nationality"
//               name="nationality"
//               value={formData.nationality}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <h3 className="form-section-title">PART 2: EMPLOYMENT DETAILS</h3>

//           <div className="form-group">
//             <label htmlFor="appointmentDate">a) Date of First Appointment:</label>
//             <input
//               type="date"
//               id="appointmentDate"
//               name="appointmentDate"
//               value={formData.appointmentDate}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="firstPosition">b) First Position at SUZA:</label>
//             <select
//               id="firstPosition"
//               name="firstPosition"
//               value={formData.firstPosition}
//               onChange={handleChange}
//               required
//             >
//               <option value=""> Select First Position </option>
//               {positionCategories.map((category) => (
//                 <optgroup key={category.title} label={category.title}>
//                   {category.positions.map((pos) => (
//                     <option key={pos} value={pos}>{pos}</option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="currentPosition">c) Current Position at SUZA:</label>
//             <select
//               id="currentPosition"
//               name="currentPosition"
//               value={formData.currentPosition}
//               onChange={handleChange}
//               required
//             >
//               <option value=""> Select Current Position </option>
//               {positionCategories.map((category) => (
//                 <optgroup key={category.title} label={category.title}>
//                   {category.positions.map((pos) => (
//                     <option key={pos} value={pos}>{pos}</option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           <h3 className="form-section-title">PART 3: PROMOTION INFORMATION</h3>

//           <div className="form-group">
//             <label htmlFor="positionApplied">a) Position Applied For:</label>
//             <select
//               id="positionApplied"
//               name="positionApplied"
//               value={formData.positionApplied}
//               onChange={handleChange}
//               required
//             >
//               <option value=""> Select Position Applied For </option>
//               {positionCategories.map((category) => (
//                 <optgroup key={category.title} label={category.title}>
//                   {category.positions.map((pos) => (
//                     <option key={pos} value={pos}>{pos}</option>
//                   ))}
//                 </optgroup>
//               ))}
//             </select>
//           </div>

//           <div className="form-group form-group-checkbox">
//             <label htmlFor="appliedBefore">
//               b) Have you applied before?
//               <input
//                 type="checkbox"
//                 id="appliedBefore"
//                 name="appliedBefore"
//                 checked={formData.appliedBefore}
//                 onChange={handleChange}
//               />
//             </label>
//           </div>

//           {formData.appliedBefore && (
//             <div className="form-group">
//               <label htmlFor="previousApplicationDate">If yes, when?</label>
//               <input
//                 type="date"
//                 id="previousApplicationDate"
//                 name="previousApplicationDate"
//                 value={formData.previousApplicationDate}
//                 onChange={handleChange}
//               />
//             </div>
//           )}

//           <div className="form-group form-group-checkbox">
//             <label htmlFor="newPublications">
//               c) Do you have new publications?
//               <input
//                 type="checkbox"
//                 id="newPublications"
//                 name="newPublications"
//                 checked={formData.newPublications}
//                 onChange={handleChange}
//               />
//             </label>
//           </div>

//           <div className="form-submit-container">
//             <button type="submit" className="submit-button" disabled={loading}>
//               {loading ? "Submitting..." : "Submit Application"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ApplicationForm;

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
