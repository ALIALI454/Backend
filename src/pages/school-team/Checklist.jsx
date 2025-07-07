// src/components/Checklist.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checklist.css';  // Import CSS ya nje

const Checklist = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, name: "Complete CV", checked: false },
    { id: 2, name: "Certificates verified", checked: false },
    { id: 3, name: "Publications meet criteria", checked: false },
    { id: 4, name: "Teaching evaluations attached", checked: false },
    { id: 5, name: "Community service documented", checked: false },
    { id: 6, name: "Research statement included", checked: false }
  ]);

  const [isSaved, setIsSaved] = useState(false);

  const toggleCheck = (id) => {
    if (isSaved) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSaveChecklist = () => {
    setIsSaved(true);
    alert("Checklist saved successfully!");
  };

  const handleMarkAllComplete = () => {
    const updated = items.map(item => ({ ...item, checked: true }));
    setItems(updated);
    navigate('/school-team/forward');
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="checklist-container">
      <h2 className="checklist-title">
        Promotion Application Checklist
      </h2>
      
      <p className="checklist-description">
        Verify all required components before forwarding the application
      </p>

      <div className="checklist-box">
        <div className="checklist-progress">
          <span className="progress-text">
            Progress: {completedCount}/{totalCount}
          </span>
          <span className={`progress-status ${completedCount === totalCount ? 'complete' : 'in-progress'}`}>
            {completedCount === totalCount ? 'Ready to submit!' : 'In progress'}
          </span>
        </div>

        {items.map(item => (
          <div 
            key={item.id} 
            className={`checklist-item ${item.checked ? 'checked' : ''}`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggleCheck(item.id)}
              disabled={isSaved}
              className="checklist-checkbox"
            />
            <span className={`checklist-item-name ${item.checked ? 'line-through' : ''}`}>
              {item.name}
            </span>
            {item.checked && (
              <span className="checklist-checkmark">✓</span>
            )}
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
          Mark All Complete 
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Checklist;
