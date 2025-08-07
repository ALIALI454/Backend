// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./UpdateApplicationForm.css";

// // const UpdateApplicationForm = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();

// //   // Debug id to confirm it's defined
// //   console.log("Update form, application id:", id);

// //   const [formData, setFormData] = useState({
// //     fullName: "",
// //     dateOfBirth: "",
// //     nationality: "",
// //     appointmentDate: "",
// //     firstPosition: "",
// //     currentPosition: "",
// //     positionApplied: "",
// //     appliedBefore: false,
// //     previousApplicationDate: "",
// //     newPublications: false,
// //     feedback: ""
// //   });

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [successMsg, setSuccessMsg] = useState("");

// //   useEffect(() => {
// //     if (!id) {
// //       setError("No application id provided in URL.");
// //       setLoading(false);
// //       return;
// //     }

// //     axios
// //       .get(`http://localhost:8080/api/applications/${id}`)
// //       .then((res) => {
// //         const app = res.data;
// //         setFormData({
// //           fullName: app.fullName || "",
// //           dateOfBirth: app.dateOfBirth || "",
// //           nationality: app.nationality || "",
// //           appointmentDate: app.appointmentDate || "",
// //           firstPosition: app.firstPosition || "",
// //           currentPosition: app.currentPosition || "",
// //           positionApplied: app.positionApplied || "",
// //           appliedBefore: app.appliedBefore || false,
// //           previousApplicationDate: app.previousApplicationDate || "",
// //           newPublications: app.newPublications || false,
// //           feedback: app.feedback || ""
// //         });
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching application:", err);
// //         setError("Failed to load application data.");
// //         setLoading(false);
// //       });
// //   }, [id]);

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData((prev) => ({
// //       ...prev,
// //       [name]: type === "checkbox" ? checked : value
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     axios
// //       .put(`http://localhost:8080/api/applications/${id}`, formData)
// //       .then(() => {
// //         setSuccessMsg("Application updated successfully!");
// //         setTimeout(() => navigate("/school-team/applications"), 1500);
// //       })
// //       .catch((err) => {
// //         console.error("Update failed:", err);
// //         setError("Failed to update application.");
// //       });
// //   };

// //   if (loading) return <p>Loading form...</p>;
// //   if (error) return <p className="error">{error}</p>;

// //   return (
// //     <div className="update-form-container">
// //       <h2>Edit Application</h2>
// //       {successMsg && <p className="success">{successMsg}</p>}
// //       <form onSubmit={handleSubmit} className="update-form">
// //         <label>
// //           Full Name:
// //           <input
// //             type="text"
// //             name="fullName"
// //             value={formData.fullName}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Date of Birth:
// //           <input
// //             type="date"
// //             name="dateOfBirth"
// //             value={formData.dateOfBirth}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Nationality:
// //           <input
// //             type="text"
// //             name="nationality"
// //             value={formData.nationality}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Appointment Date:
// //           <input
// //             type="date"
// //             name="appointmentDate"
// //             value={formData.appointmentDate}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           First Position:
// //           <input
// //             type="text"
// //             name="firstPosition"
// //             value={formData.firstPosition}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Current Position:
// //           <input
// //             type="text"
// //             name="currentPosition"
// //             value={formData.currentPosition}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Position Applied:
// //           <input
// //             type="text"
// //             name="positionApplied"
// //             value={formData.positionApplied}
// //             onChange={handleChange}
// //             required
// //           />
// //         </label>

// //         <label>
// //           Applied Before?
// //           <input
// //             type="checkbox"
// //             name="appliedBefore"
// //             checked={formData.appliedBefore}
// //             onChange={handleChange}
// //           />
// //         </label>

// //         <label>
// //           Previous Application Date:
// //           <input
// //             type="date"
// //             name="previousApplicationDate"
// //             value={formData.previousApplicationDate}
// //             onChange={handleChange}
// //           />
// //         </label>

// //         <label>
// //           New Publications?
// //           <input
// //             type="checkbox"
// //             name="newPublications"
// //             checked={formData.newPublications}
// //             onChange={handleChange}
// //           />
// //         </label>

// //         <label>
// //           Feedback:
// //           <textarea
// //             name="feedback"
// //             value={formData.feedback}
// //             onChange={handleChange}
// //           />
// //         </label>

// //         <button type="submit" className="btn-submit">
// //           Update Application
// //         </button>
// //         <button
// //           type="button"
// //           className="btn-cancel"
// //           onClick={() => navigate(-1)}
// //         >
// //           Cancel
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default UpdateApplicationForm;



// // src/pages/school-team/UpdateApplicationForm.jsx
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./UpdateApplicationForm.css";

// const UpdateApplicationForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // Debug id to confirm it's defined
//   console.log("Update form, application id:", id);

//   const [formData, setFormData] = useState({
//     fullName: "",
//     dateOfBirth: "",
//     nationality: "",
//     appointmentDate: "",
//     firstPosition: "",
//     currentPosition: "",
//     positionApplied: "",
//     appliedBefore: false,
//     previousApplicationDate: "",
//     newPublications: false,
//     feedback: "",
//     yearsOfExperience: 0,
//     performanceRating: 0,
//     department: "",
//     submissionDate: ""
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   useEffect(() => {
//     if (!id) {
//       setError("No application id provided in URL.");
//       setLoading(false);
//       return;
//     }

//     axios
//       .get(`http://localhost:8080/api/applications/${id}`)
//       .then((res) => {
//         const app = res.data;
//         setFormData({
//           fullName: app.fullName || "",
//           dateOfBirth: app.dateOfBirth || "",
//           nationality: app.nationality || "",
//           appointmentDate: app.appointmentDate || "",
//           firstPosition: app.firstPosition || "",
//           currentPosition: app.currentPosition || "",
//           positionApplied: app.positionApplied || "",
//           appliedBefore: app.appliedBefore || false,
//           previousApplicationDate: app.previousApplicationDate || "",
//           newPublications: app.newPublications || false,
//           feedback: app.feedback || "",
//           yearsOfExperience: app.yearsOfExperience || 0,
//           performanceRating: app.performanceRating || 0,
//           department: app.department || "",
//           submissionDate: app.submissionDate || ""
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching application:", err);
//         setError("Failed to load application data.");
//         setLoading(false);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .put(`http://localhost:8080/api/applications/${id}`, formData)
//       .then(() => {
//         setSuccessMsg("Application updated successfully!");
//         setTimeout(() => navigate("/school-team/applications"), 1500);
//       })
//       .catch((err) => {
//         console.error("Update failed:", err);
//         setError("Failed to update application.");
//       });
//   };

//   if (loading) return <p>Loading form...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="update-form-container">
//       <h2>Edit Application</h2>
//       {successMsg && <p className="success">{successMsg}</p>}
//       <form onSubmit={handleSubmit} className="update-form">
//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Date of Birth:
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Nationality:
//           <input
//             type="text"
//             name="nationality"
//             value={formData.nationality}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Appointment Date:
//           <input
//             type="date"
//             name="appointmentDate"
//             value={formData.appointmentDate}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           First Position:
//           <input
//             type="text"
//             name="firstPosition"
//             value={formData.firstPosition}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Current Position:
//           <input
//             type="text"
//             name="currentPosition"
//             value={formData.currentPosition}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Position Applied:
//           <input
//             type="text"
//             name="positionApplied"
//             value={formData.positionApplied}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Department:
//           <input
//             type="text"
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Years of Experience:
//           <input
//             type="number"
//             name="yearsOfExperience"
//             value={formData.yearsOfExperience}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Performance Rating:
//           <input
//             type="number"
//             name="performanceRating"
//             value={formData.performanceRating}
//             onChange={handleChange}
//             min="0"
//             max="5"
//             step="0.1"
//             required
//           />
//         </label>

//         <label>
//           Applied Before?
//           <input
//             type="checkbox"
//             name="appliedBefore"
//             checked={formData.appliedBefore}
//             onChange={handleChange}
//           />
//         </label>

//         {formData.appliedBefore && (
//           <label>
//             Previous Application Date:
//             <input
//               type="date"
//               name="previousApplicationDate"
//               value={formData.previousApplicationDate}
//               onChange={handleChange}
//             />
//           </label>
//         )}

//         <label>
//           New Publications?
//           <input
//             type="checkbox"
//             name="newPublications"
//             checked={formData.newPublications}
//             onChange={handleChange}
//           />
//         </label>

//         <label>
//           Feedback:
//           <textarea
//             name="feedback"
//             value={formData.feedback}
//             onChange={handleChange}
//           />
//         </label>

//         <div className="form-actions">
//           <button type="submit" className="btn-submit">
//             Update Application
//           </button>
//           <button
//             type="button"
//             className="btn-cancel"
//             onClick={() => navigate(-1)}
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateApplicationForm;