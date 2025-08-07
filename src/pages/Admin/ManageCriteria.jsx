import React, { useEffect, useState } from "react";

const API_BASE = "http://localhost:8080/api/admin/categories";

const ManageCriteria = () => {
  const [criteriaList, setCriteriaList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [form, setForm] = useState({
    id: null,
    categoryTitle: "",
    positions: "",
    position: "",
    qualifications: "",
    points: "",
  });

  // Fetch all criteria from backend
  const fetchCriteria = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setCriteriaList(data);
      setError(null);
    } catch (e) {
      setError("Failed to fetch criteria");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCriteria();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to create or update criteria
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate simple fields
    if (
      !form.categoryTitle ||
      !form.positions ||
      !form.position ||
      !form.qualifications ||
      !form.points
    ) {
      alert("Please fill all fields");
      return;
    }

    const body = {
      categoryTitle: form.categoryTitle,
      positions: form.positions.split(",").map((p) => p.trim()),
      position: form.position,
      qualifications: form.qualifications,
      points: parseInt(form.points, 10),
    };

    try {
      let res;
      if (form.id) {
        // Update existing
        res = await fetch(`${API_BASE}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        // Create new
        res = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      if (!res.ok) throw new Error("Failed to save");

      alert("Saved successfully");
      setForm({
        id: null,
        categoryTitle: "",
        positions: "",
        position: "",
        qualifications: "",
        points: "",
      });
      fetchCriteria();
    } catch (e) {
      alert(e.message);
    }
  };

  // Edit existing criteria: populate form
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      categoryTitle: item.categoryTitle,
      positions: item.positions.join(", "),
      position: item.position,
      qualifications: item.qualifications,
      points: item.points.toString(),
    });
  };

  // Delete criteria
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      alert("Deleted successfully");
      fetchCriteria();
    } catch (e) {
      alert(e.message);
    }
  };

  // Publish criteria
  const handlePublish = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}/publish`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to publish");
      alert("Published successfully");
      fetchCriteria();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
      <h2>Manage Category Criteria</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div>
          <label>
            Category Title: <br />
            <input
              type="text"
              name="categoryTitle"
              value={form.categoryTitle}
              onChange={handleChange}
              placeholder="E.g. Academic Staff"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>

        <div>
          <label>
            Positions (comma separated): <br />
            <input
              type="text"
              name="positions"
              value={form.positions}
              onChange={handleChange}
              placeholder="E.g. Professors, Lecturers"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>

        <div>
          <label>
            Position (single): <br />
            <input
              type="text"
              name="position"
              value={form.position}
              onChange={handleChange}
              placeholder="E.g. Lecturer"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>

        <div>
          <label>
            Qualifications: <br />
            <textarea
              name="qualifications"
              value={form.qualifications}
              onChange={handleChange}
              placeholder="Qualifications details"
              rows={3}
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
          </label>
        </div>

        <div>
          <label>
            Points: <br />
            <input
              type="number"
              name="points"
              value={form.points}
              onChange={handleChange}
              placeholder="E.g. 6"
              style={{ width: "100%", padding: 8, marginBottom: 10 }}
              min={0}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          {form.id ? "Update" : "Add"} Criteria
        </button>
        {form.id && (
          <button
            type="button"
            onClick={() =>
              setForm({
                id: null,
                categoryTitle: "",
                positions: "",
                position: "",
                qualifications: "",
                points: "",
              })
            }
            style={{ marginLeft: 10, padding: "10px 20px" }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Title</th>
            <th>Positions</th>
            <th>Position</th>
            <th>Qualifications</th>
            <th>Points</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {criteriaList.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>
                No criteria found.
              </td>
            </tr>
          )}

          {criteriaList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.categoryTitle}</td>
              <td>{item.positions.join(", ")}</td>
              <td>{item.position}</td>
              <td>{item.qualifications}</td>
              <td>{item.points}</td>
              <td>{item.published ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Edit</button>{" "}
                <button onClick={() => handleDelete(item.id)}>Delete</button>{" "}
                {!item.published && (
                  <button onClick={() => handlePublish(item.id)}>Publish</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCriteria;
