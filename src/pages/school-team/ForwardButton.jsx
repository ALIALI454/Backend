  // src/components/ForwardButton.jsx
  import React, { useState } from 'react';
  import './ForwardButton.css';

  const ForwardButton = () => {
    const [selectedApplications, setSelectedApplications] = useState([]);
    const [forwardTo, setForwardTo] = useState('university-committee');
    const [comments, setComments] = useState('');

    // Sample applications
    const applications = [
      { id: 1, name: 'Dr. Ali Omar', position: 'Senior Lecturer → Associate Prof' },
      { id: 2, name: 'Dr. Salama Issa', position: 'Lecturer → Senior Lecturer' },
      { id: 3, name: 'Dr. Omar Ali', position: 'Associate Prof → Professor' }
    ];

    const toggleApplication = (id) => {
      setSelectedApplications(prev =>
        prev.includes(id)
          ? prev.filter(appId => appId !== id)
          : [...prev, id]
      );
    };

    const handleForward = () => {
      if (selectedApplications.length === 0) {
        alert("Please select at least one application.");
        return;
      }

      // Save to localStorage (simulate forwarding)
      const forwardRecords = JSON.parse(localStorage.getItem('forwardedApplications')) || [];
      const newForward = selectedApplications.map(appId => ({
        applicationId: appId,
        forwardedTo: forwardTo,
        comments,
        forwardedAt: new Date().toISOString()
      }));
      localStorage.setItem('forwardedApplications', JSON.stringify([...forwardRecords, ...newForward]));

      // Add notifications for applicants
      const notifications = JSON.parse(localStorage.getItem('applicantNotifications')) || [];
      selectedApplications.forEach(appId => {
        notifications.push({
          applicationId: appId,
          message: `Your application has been forwarded to ${forwardTo.replace('-', ' ')}`,
          date: new Date().toISOString(),
          read: false
        });
      });
      localStorage.setItem('applicantNotifications', JSON.stringify(notifications));

      alert(`✅ Forwarded ${selectedApplications.length} applications to ${forwardTo.toUpperCase()}`);
      setSelectedApplications([]);
      setComments('');
    };

    return (
      <div className="forward-container">
        <h2 className="forward-title">Forward Applications</h2>

        <div className="forward-section">
          <h3 className="forward-subtitle">Select Applications to Forward</h3>
          <div className="applications-list">
            {applications.map(app => (
              <div
                key={app.id}
                className={`application-item ${selectedApplications.includes(app.id) ? 'selected' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={selectedApplications.includes(app.id)}
                  onChange={() => toggleApplication(app.id)}
                  className="application-checkbox"
                />
                <div className="application-info">
                  <div className="application-header">
                    <span className="application-id">{app.id}</span>
                    <span className="application-name">{app.name}</span>
                  </div>
                  <div className="application-position">{app.position}</div>
                </div>
                {selectedApplications.includes(app.id) && (
                  <span className="application-selected-label">Selected</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="forward-section">
          <div className="form-group">
            <label htmlFor="forwardTo" className="form-label">Forward To:</label>
            <select
              id="forwardTo"
              value={forwardTo}
              onChange={(e) => setForwardTo(e.target.value)}
              className="form-select"
            >
              <option value="university-committee">University Promotion Committee</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="comments" className="form-label">Comments:</label>
            <textarea
              id="comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add any additional comments..."
              className="form-textarea"
            />
          </div>
        </div>

        <button
          onClick={handleForward}
          disabled={selectedApplications.length === 0}
          className={`btn-forward ${selectedApplications.length === 0 ? 'disabled' : ''}`}
        >
          <span>Forward Selected Applications</span>
          <span className="btn-counter">{selectedApplications.length}</span>
        </button>
      </div>
    );
  };

  export default ForwardButton;
