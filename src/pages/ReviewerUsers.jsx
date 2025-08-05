// src/pages/ReviewerUsers.jsx
import React from "react";
import UsersTable from "../components/UsersTable";

const ReviewerUsers = () => (
  <>
    <h1>Reviewer Users</h1>
    <UsersTable apiEndpoint="http://localhost:8080/api/reviewers/users" />
  </>
);
export default ReviewerUsers;
