// // src/components/UsersTable.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UsersTable = ({ role }) => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = `http://localhost:8080/api/users/role/${role.toUpperCase()}`;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get(apiUrl);
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [role]);

//   if (loading) return <p>Loading users...</p>;

//   return (
//     <div>
//       <h2>{role} Users</h2>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>User ID</th>
//             <th>Full Name</th>
//             <th>Email</th>
//             <th>Username</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>Position</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="7">No users found.</td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.user_id}>
//                 <td>{user.user_id}</td>
//                 <td>{user.full_name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.username}</td>
//                 <td>{user.phone_number}</td>
//                 <td>{user.gender}</td>
//                 <td>{user.position}</td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersTable;






// src/components/UsersTable.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersTable = ({ apiEndpoint }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(apiEndpoint)
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching users");
        setLoading(false);
      });
  }, [apiEndpoint]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead style={{ backgroundColor: "#ddd" }}>
        <tr>
          <th>User ID</th>
          <th>Full Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Position</th>
          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Academic Rank</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td colSpan="10" style={{textAlign:"center"}}>No users found.</td></tr>
        ) : (
          users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber || "-"}</td>
              <td>{user.position || "-"}</td>
              <td>{user.gender || "-"}</td>
              <td>{user.dateOfBirth || "-"}</td>
              <td>{user.academicRank || "-"}</td>
              <td>{user.role}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UsersTable;
