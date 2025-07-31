import React, { useState } from "react";

const AddSchoolForm = () => {
  const [formData, setFormData] = useState({
    sName: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.sName.trim()) {
      setMessage("School name is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("School added successfully!");
        setFormData({ sName: "" });
      } else {
        setMessage("Failed to add school.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while adding school.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto" }}>
      <h2>Add New School</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label htmlFor="sName">School Name:</label>
          <input
            type="text"
            id="sName"
            name="sName"
            value={formData.sName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, marginTop: 4 }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>
          Add School
        </button>
      </form>
    </div>
  );
};

export default AddSchoolForm;
