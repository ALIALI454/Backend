// src/pages/HRBoardUsers.jsx
import React from "react";
import UsersTable from "../components/UsersTable";

const HRBoardUsers = () => (
  <>
    <h1>HR Board Users</h1>
    <UsersTable apiEndpoint="http://localhost:8080/api/hrboard/users" />
  </>
);
export default HRBoardUsers;
