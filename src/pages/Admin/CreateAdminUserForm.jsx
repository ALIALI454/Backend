// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./CreateAdminUserForm.css";

// const CreateAdminUserForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     position: "",
//     gender: "",
//     dateOfBirth: "",
//     academicRank: "",
//     role: "",
//     schoolId: "",
//   });

//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   // Load schools from backend on mount
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/schools")
//       .then((res) => setSchools(res.data))
//       .catch((err) => console.error("Error loading schools:", err));
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const payload = {
//         user: {
//           fullName: formData.fullName,
//           username: formData.username,
//           email: formData.email,
//           password: formData.password,
//           phoneNumber: formData.phoneNumber,
//           position: formData.position,
//           gender: formData.gender,
//           dateOfBirth: formData.dateOfBirth,
//           academicRank: formData.academicRank,
//           role: formData.role,
//         },
//         school: { sId: parseInt(formData.schoolId) },
//       };

//       const response = await axios.post(
//         "http://localhost:8080/api/users/register",
//         payload
//       );

//       const { userId, role } = response.data;

//       // Save user info consistently in localStorage with role lowercase
//       localStorage.setItem(
//         "user",
//         JSON.stringify({ userId, role: role.toLowerCase() })
//       );

//       // Redirect by role (lowercase)
//       const redirectPaths = {
//         applicant: "/applicant/criteria",
//         university_community: "/university-community/dashboard",
//         school_team: "/school-team/category-criteria",
//         university_committee: "/university-committee/applications",
//         reviewer: "/reviewer/applications",
//         hr_board: "/hr-board/dashboard",
//         university_council: "/university-council/dashboard",
//       };

//       navigate(redirectPaths[role.toLowerCase()] || "/unauthorized");
//     } catch (error) {
//       let errMsg = "Error creating user.";
//       if (error.response) {
//         if (typeof error.response.data === "string") {
//           errMsg = error.response.data;
//         } else if (error.response.data.message) {
//           errMsg = error.response.data.message;
//         } else {
//           errMsg = JSON.stringify(error.response.data);
//         }
//       }
//       setMessage(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create User Account</h2>
//       {message && <p style={{ color: "red" }}>{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="phoneNumber"
//           placeholder="Phone Number"
//           value={formData.phoneNumber}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="position"
//           placeholder="Position"
//           value={formData.position}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="academicRank"
//           placeholder="Academic Rank"
//           value={formData.academicRank}
//           onChange={handleChange}
//         />
//         <input
//           type="date"
//           name="dateOfBirth"
//           value={formData.dateOfBirth}
//           onChange={handleChange}
//         />
//         <select
//           name="gender"
//           value={formData.gender}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Gender</option>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//         </select>
//         <select
//           name="role"
//           value={formData.role}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Role</option>
//           <option value="UNIVERSITY_COMMITTEE">University Committee</option>
//           <option value="REVIEWER">Reviewer</option>
//           <option value="HR_BOARD">HR Board</option>
//           <option value="SCHOOL_TEAM">School Team</option>
//           <option value="UNIVERSITY_COUNCIL">University Council</option>
//           <option value="UNIVERSITY_COMMUNITY">University Community</option>
//         </select>
//         <select
//           name="schoolId"
//           value={formData.schoolId}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select School</option>
//           {schools.map((school) => (
//             <option key={school.sId} value={school.sId}>
//               {school.name}
//             </option>
//           ))}
//         </select>
//         <button type="submit" disabled={loading}>
//           {loading ? "Creating..." : "Create Account"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateAdminUserForm;


import React, { useState } from "react";
import axios from "axios";

const CreateAdminUserForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    position: "",
    gender: "",
    role: "REVIEWER", // default
  });

  const roles = [
    "REVIEWER",
    "HR_BOARD",
    "UNIVERSITY_COUNCIL",
    "UNIVERSITY_COMMITTEE"
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/users/admin-create", formData);
      alert("User created successfully!");
    } catch (err) {
      alert("Failed to create user!");
    }
  };

  return (
    <div className="container">
      <h2>Create User (Admin)</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
        <input type="text" name="position" placeholder="Position" onChange={handleChange} />
        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
        <select name="role" onChange={handleChange}>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateAdminUserForm;
