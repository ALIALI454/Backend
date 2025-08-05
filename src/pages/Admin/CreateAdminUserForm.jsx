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


// import React, { useState } from "react";
// import axios from "axios";

// const CreateAdminUserForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     phoneNumber: "",
//     position: "",
//     gender: "",
//     role: "REVIEWER", // default
//   });

//  const roles = [
//   "ADMIN",
//   "APPLICANT",
//   "SCHOOL_TEAM",
//   "UNIVERSITY_COMMITTEE",
//   "REVIEWER",
//   "HR_BOARD",
//   "UNIVERSITY_COUNCIL",
//   "COMMITTEE",
//   "CHAIR_PERSON"
// ];

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8080/api/users/admin-create", formData);
//       alert("User created successfully!");
//     } catch (err) {
//       alert("Failed to create user!");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Create User (Admin)</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} />
//         <input type="text" name="username" placeholder="Username" onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" onChange={handleChange} />
//         <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} />
//         <input type="text" name="position" placeholder="Position" onChange={handleChange} />
//         <select name="gender" onChange={handleChange}>
//           <option value="">Select Gender</option>
//           <option value="MALE">Male</option>
//           <option value="FEMALE">Female</option>
//         </select>
//         <select name="role" onChange={handleChange}>
//           {roles.map((r) => (
//             <option key={r} value={r}>{r}</option>
//           ))}
//         </select>
//         <button type="submit">Create User</button>
//       </form>
//     </div>
//   );
// };

// export default CreateAdminUserForm;



// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./CreateAdminUserForm.css";

// const ROLES = [
//   'REVIEWER',
//   'HR_BOARD',
//   'UNIVERSITY_COMMITTEE',
//   'SCHOOL_TEAM',
//   'UNIVERSITY_COUNCIL',
//   // add more roles as needed
// ];

// const CreateAdminUserForm = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     username: '',
//     password: '',
//     gender: '',
//     phoneNumber: '',
//     role: ROLES[0],
//   });

//   const [error, setError] = useState('');
//   const [successMsg, setSuccessMsg] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccessMsg('');

//     // Basic validation
//     if (
//       !formData.fullName ||
//       !formData.email ||
//       !formData.username ||
//       !formData.password ||
//       !formData.gender ||
//       !formData.phoneNumber
//     ) {
//       setError('Please fill in all required fields.');
//       return;
//     }

//     try {
//       // API call to create user with role and user details
//       const response = await fetch('http://localhost:8080/api/users', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           fullName: formData.fullName,
//           email: formData.email,
//           username: formData.username,
//           password: formData.password,
//           gender: formData.gender,
//           phoneNumber: formData.phoneNumber,
//           role: formData.role.toUpperCase(),
//         }),
//       });

//       if (!response.ok) {
//         const errText = await response.text();
//         setError(errText || 'Failed to create user');
//         return;
//       }

//       setSuccessMsg('User created successfully! Redirecting to login...');
      
//       // After short delay, redirect to login page
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);

//     } catch (err) {
//       console.error('Error creating user:', err);
//       setError('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <div className="create-user-form-wrapper">
//       <h2>Create New User</h2>

//       {error && <div style={{ color: 'red', marginBottom: '1em' }}>{error}</div>}
//       {successMsg && <div style={{ color: 'green', marginBottom: '1em' }}>{successMsg}</div>}

//       <form onSubmit={handleSubmit}>

//         <label>
//           Full Name:
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Username:
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Password:
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Gender:
//           <select name="gender" value={formData.gender} onChange={handleChange} required>
//             <option value="">Select gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//         </label>

//         <label>
//           Phone Number:
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         <label>
//           Role:
//           <select name="role" value={formData.role} onChange={handleChange} required>
//             {ROLES.map((role) => (
//               <option key={role} value={role}>
//                 {role.replace('_', ' ')}
//               </option>
//             ))}
//           </select>
//         </label>

//         <button type="submit" style={{ marginTop: '1em' }}>
//           Create User
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateAdminUserForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateAdminUserForm.css";

const CreateAdminUserForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    position: "",
    gender: "",
    dateOfBirth: "",
    academicRank: "",
    role: "",
    schoolId: "",
  });

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch school list
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/schools")
      .then((res) => setSchools(res.data))
      .catch((err) => console.error("Error fetching schools:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const payload = {
        user: {
          fullName: formData.fullName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          position: formData.position,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          academicRank: formData.academicRank,
          role: formData.role.toUpperCase(),
        },
        school: { sId: parseInt(formData.schoolId) },
      };

      await axios.post("http://localhost:8080/api/users/register", payload);

      setMessage("User created successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      let errorMsg = "Failed to create user.";
      if (error.response) {
        if (typeof error.response.data === "string") {
          errorMsg = error.response.data;
        } else if (error.response.data.message) {
          errorMsg = error.response.data.message;
        }
      }
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Create New System User</h2>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
        <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} />
        <input type="text" name="academicRank" placeholder="Academic Rank" value={formData.academicRank} onChange={handleChange} />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="SCHOOL_TEAM">School Team</option>
          <option value="UNIVERSITY_COMMITTEE">University Committee</option>
          <option value="REVIEWER">Reviewer</option>
          <option value="HR_BOARD">HR Board</option>
          <option value="UNIVERSITY_COUNCIL">University Council</option>
          <option value="UNIVERSITY_COMMUNITY">University Community</option>
        </select>

        <select name="schoolId" value={formData.schoolId} onChange={handleChange} required>
          <option value="">Select School</option>
          {schools.map((school) => (
            <option key={school.sId} value={school.sId}>
              {school.name}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default CreateAdminUserForm;
