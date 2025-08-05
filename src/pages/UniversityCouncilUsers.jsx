// src/pages/UniversityCouncilUsers.jsx
import React from "react";
import UsersTable from "../components/UsersTable";

const UniversityCouncilUsers = () => (
  <>
    <h1>University Council Users</h1>
    <UsersTable apiEndpoint="http://localhost:8080/api/university-councils/users" />
  </>
);
export default UniversityCouncilUsers;
