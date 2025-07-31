// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <button onClick={() => navigate("/admin/manage-criteria")}>Manage Criteria & Categories</button>
        <button onClick={() => navigate("/admin/roles-access")}>Role & Access Control</button>
        <button onClick={() => navigate("/admin/user-management")}>User Management</button>
        <button onClick={() => navigate("/admin/account-control")}>Account Control</button>
        <button onClick={() => navigate("/admin/reset-password")}>Reset Password</button>
        <button onClick={() => navigate("/admin/add-school")}>Add School</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
