// src/pages/admin/AccountControl.jsx
import React, { useState } from "react";
import './AccountControl.css'; 

const AccountControl = () => {
  const [accountEmail, setAccountEmail] = useState("");

  const handleBlock = () => {
    alert(`Account for ${accountEmail} has been blocked.`);
    setAccountEmail("");
  };

  return (
    <div className="account-control-container">
      <h2>Block Account</h2>
      <input
        type="email"
        placeholder="Enter user email"
        value={accountEmail}
        onChange={(e) => setAccountEmail(e.target.value)}
      />
      <button onClick={handleBlock}>Block Account</button>
    </div>
  );
};

export default AccountControl;
