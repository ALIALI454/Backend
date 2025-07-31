// src/pages/admin/ManageCriteria.jsx
import React, { useState } from "react";
import "./ManageCriteria.css";

const ManageCriteria = () => {
  const [criteria, setCriteria] = useState([]);
  const [newCriteria, setNewCriteria] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setNewCriteria({ ...newCriteria, [e.target.name]: e.target.value });
  };

  const addCriteria = () => {
    if (!newCriteria.title.trim() || !newCriteria.description.trim()) return;
    setCriteria([...criteria, newCriteria]);
    setNewCriteria({ title: "", description: "" });
  };

  return (
    <div className="manage-criteria-container">
      <h2>Manage Promotion Criteria</h2>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Criteria Title"
          value={newCriteria.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Criteria Description"
          value={newCriteria.description}
          onChange={handleChange}
        />
        <button onClick={addCriteria}>Add Criteria</button>
      </div>
      <ul>
        {criteria.map((c, index) => (
          <li key={index}>
            <strong>{c.title}</strong>: {c.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageCriteria;
