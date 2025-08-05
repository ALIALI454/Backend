// src/pages/SchoolTeamUsers.jsx
import React from "react";
import UsersTable from "../components/UsersTable";

const SchoolTeamUsers = () => (
  <>
    <h1>School Team Users</h1>
    <UsersTable apiEndpoint="http://localhost:8080/api/school-team/users" />
  </>
);
export default SchoolTeamUsers;
