// // src/pages/school-team/FeedbackTable.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./FeedbackTable.css";

// const FeedbackTable = () => {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/applications") // Tuna-fetch applications zote
//       .then((res) => {
//         setFeedbackList(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching feedback:", err);
//         setError("Failed to load feedback data.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading feedback...</p>;
//   if (error) return <p className="error">{error}</p>;

//   return (
//     <div className="feedback-container">
//       <h2>Applications Feedback</h2>
//       <table className="feedback-table">
//         <thead>
//           <tr>
//             <th>Applicant Name</th>
//             <th>Position Applied</th>
//             <th>Department</th>
//             <th>Feedback</th>
//             <th>Performance Rating</th>
//             <th>Submission Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {feedbackList.length > 0 ? (
//             feedbackList.map((app) => (
//               <tr key={app.id}>
//                 <td>{app.fullName}</td>
//                 <td>{app.positionApplied}</td>
//                 <td>{app.department}</td>
//                 <td>{app.feedback ? app.feedback : "No feedback yet"}</td>
//                 <td>{app.performanceRating || "N/A"}</td>
//                 <td>{app.submissionDate || "N/A"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No feedback available.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FeedbackTable;


import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FeedbackTable.css";

const FeedbackTable = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [newFeedback, setNewFeedback] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/applications")
      .then((res) => {
        setFeedbackList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching feedback:", err);
        setError("Failed to load feedback data.");
        setLoading(false);
      });
  }, []);

  const handleSendFeedback = (id) => {
    setSelectedApp(id);
    const app = feedbackList.find((a) => a.id === id);
    setNewFeedback(app?.feedback || "");
  };

  const handleSubmitFeedback = () => {
    if (!newFeedback.trim()) {
      alert("Feedback cannot be empty");
      return;
    }
    axios
      .put(`http://localhost:8080/api/applications/${selectedApp}`, { feedback: newFeedback })
      .then(() => {
        setFeedbackList((prev) =>
          prev.map((app) =>
            app.id === selectedApp ? { ...app, feedback: newFeedback } : app
          )
        );
        setSelectedApp(null);
        alert("Feedback sent successfully!");
      })
      .catch((err) => {
        console.error("Error sending feedback:", err);
        alert("Failed to send feedback.");
      });
  };

  if (loading) return <p>Loading feedback...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="feedback-container">
      <h2>Applications Feedback</h2>
      <table className="feedback-table">
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Position Applied</th>
            <th>Department</th>
            <th>Feedback</th>
            <th>Performance Rating</th>
            <th>Submission Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbackList.length > 0 ? (
            feedbackList.map((app) => (
              <tr key={app.id}>
                <td>{app.fullName}</td>
                <td>{app.positionApplied}</td>
                <td>{app.department}</td>
                <td>{app.feedback || "No feedback yet"}</td>
                <td>{app.performanceRating || "N/A"}</td>
                <td>{app.submissionDate || "N/A"}</td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleSendFeedback(app.id)}
                  >
                    Send Feedback
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No feedback available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal ya kutuma feedback */}
      {selectedApp !== null && (
        <div className="modal">
          <div className="modal-content">
            <h3>Send Feedback</h3>
            <textarea
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Write feedback here..."
              rows={5}
            />
            <div className="modal-actions">
              <button className="btn-save" onClick={handleSubmitFeedback}>
                Submit
              </button>
              <button className="btn-cancel" onClick={() => setSelectedApp(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackTable;

