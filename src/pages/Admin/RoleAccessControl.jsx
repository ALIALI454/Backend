// src/pages/admin/RoleAccessControl.jsx
import React, { useState } from "react";
import "./RoleAccessControl.css";

const RoleAccessControl = () => {
  const [roles, setRoles] = useState([
    { name: "Applicant", permissions: ["Submit Application"] },
    { name: "Committee", permissions: ["Review Applications"] },
  ]);

  const [newRole, setNewRole] = useState("");

  const addRole = () => {
    if (newRole.trim() !== "") {
      setRoles([...roles, { name: newRole, permissions: [] }]);
      setNewRole("");
    }
  };

  return (
    <div className="role-access-container">
      <h2>Role & Access Control</h2>
      <input
        type="text"
        placeholder="New Role"
        value={newRole}
        onChange={(e) => setNewRole(e.target.value)}
      />
      <button onClick={addRole}>Add Role</button>
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            <strong>{role.name}</strong> - Permissions:{" "}
            {role.permissions.length > 0
              ? role.permissions.join(", ")
              : "No permissions assigned"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoleAccessControl;
