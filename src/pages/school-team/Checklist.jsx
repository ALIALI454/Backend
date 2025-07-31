// src/pages/school-team/Checklist.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Checklist.css';

const Checklist = () => {
  const navigate = useNavigate();
  const { applicationId } = useParams();
  const [items, setItems] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(`checklist_${applicationId}`));
    if (stored && stored.length > 0) {
      setItems(stored);
      setIsSaved(true);
    } else {
      // Default checklist
      setItems([
        { name: "Complete CV", checked: false },
        { name: "Certificates verified", checked: false },
        { name: "Publications meet criteria", checked: false },
        { name: "Teaching evaluations attached", checked: false },
        { name: "Community service documented", checked: false },
        { name: "Research statement included", checked: false }
      ]);
    }
  }, [applicationId]);

  const toggleCheck = (index) => {
    if (isSaved) return;
    const updated = [...items];
    updated[index].checked = !updated[index].checked;
    setItems(updated);
  };

  // Save to localStorage
  const handleSaveChecklist = () => {
    localStorage.setItem(`checklist_${applicationId}`, JSON.stringify(items));
    setIsSaved(true);
    alert("Checklist saved locally!");
  };

  const handleMarkAllComplete = () => {
    const updated = items.map(item => ({ ...item, checked: true }));
    setItems(updated);
    localStorage.setItem(`checklist_${applicationId}`, JSON.stringify(updated));
    navigate('/school-team/forward');
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="checklist-container">
      <h2 className="checklist-title">Promotion Application Checklist</h2>
      <p className="checklist-description">
        Verify all required components before forwarding the application
      </p>

      <div className="checklist-box">
        <div className="checklist-progress">
          <span className="progress-text">Progress: {completedCount}/{totalCount}</span>
          <span className={`progress-status ${completedCount === totalCount ? 'complete' : 'in-progress'}`}>
            {completedCount === totalCount ? 'Ready to submit!' : 'In progress'}
          </span>
        </div>

        {items.map((item, index) => (
          <div key={index} className={`checklist-item ${item.checked ? 'checked' : ''}`}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(index)}
              disabled={isSaved}
              className="checklist-checkbox"
            />
            <span className={`checklist-item-name ${item.checked ? 'line-through' : ''}`}>
              {item.name}
            </span>
            {item.checked && <span className="checklist-checkmark">✓</span>}
          </div>
        ))}
      </div>

      <div className="checklist-buttons">
        <button 
          onClick={handleSaveChecklist}
          disabled={isSaved}
          className={`btn-save ${isSaved ? 'disabled' : ''}`}
        >
          {isSaved ? '✓ Checklist Saved' : 'Save Checklist'}
        </button>

        <button 
          onClick={handleMarkAllComplete}
          className="btn-mark-complete"
        >
          Mark All Complete <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Checklist;
