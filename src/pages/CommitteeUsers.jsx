// src/pages/CommitteeUsers.jsx
import React from "react";
import UsersTable from "../components/UsersTable";

const CommitteeUsers = () => (
  <>
    <h1>Committee Users</h1>
    <UsersTable apiEndpoint="http://localhost:8080/api/committee/users" />
  </>
);
export default CommitteeUsers;
