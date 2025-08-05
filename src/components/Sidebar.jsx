// /* eslint-disable react/jsx-no-undef */
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   FaHome,
//   FaUsers,
//   FaKey,
//   FaCogs,
//   FaSchool,
//   FaUserCog,
//   FaLock,
//   FaUser,
//   FaClipboardList,
//   FaFileAlt,
//   FaUpload,
//   FaBell,
//   FaComments,
//   FaCheckSquare,
//   FaShareSquare,
//   FaTasks,
//   FaUserTie,
//   FaSearch,
//   FaGraduationCap,
//   FaDownload,
//   FaUserPlus // hakikisha umeongeza hii hapa
// } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const { user } = useAuth();
//   if (!user) return null;

//   const getMenuItems = () => {
//     switch (user.role) {
//       case "admin":
//         return [
//           { path: "/admin", name: "Dashboard", icon: <FaHome /> },
//           { path: "/admin/manage-criteria", name: "Manage Criteria", icon: <FaCogs /> },
//           { path: "/admin/roles-access", name: "Roles & Access", icon: <FaKey /> },
//           { path: "/admin/applications-list", name: "Applications list", icon: <FaKey /> },
//           { path: "/admin/create-user", name: "Create User", icon: <FaUserPlus /> },
//           { path: "/admin/user-management", name: "User Management", icon: <FaUsers /> },
//           { path: "/admin/account-control", name: "Account Control", icon: <FaUserCog /> },
//            { path: "/admin/add-school", name: "Add School", icon: <FaSchool /> },
//           { path: "/admin/school-list", name: "School List", icon: <FaSchool /> },
//           { path: "/admin/reset-password", name: "Reset Password", icon: <FaLock /> },
//         ];
//       case "applicant":
//         return [
//           { path: "/applicant/profile", name: "User Profile", icon: <FaUser /> },
//           { path: "/applicant/criteria", name: "Category Criteria", icon: <FaClipboardList /> },
//           { path: "/applicant/application", name: "Application Form", icon: <FaFileAlt /> },
//           { path: "/applicant/upload", name: "Upload Documents", icon: <FaUpload /> },
//           { path: "/applicant/status", name: "Status Tracker", icon: <FaSearch /> },
//           { path: "/applicant/notifications", name: "Notifications", icon: <FaBell /> },
//           { path: "/applicant/feedback", name: "Feedback", icon: <FaComments /> },
//         ];
//       case "school-team":
//         return [
//           { path: "/school-team/category-criteria", name: "View Criteria", icon: <FaClipboardList /> },
//           { path: "/school-team/applications", name: "Application Details", icon: <FaFileAlt /> },
//           { path: "/school-team/checklist", name: "Checklist", icon: <FaCheckSquare /> },
//           { path: "/school-team/forward", name: "Forward Application", icon: <FaShareSquare /> },
//           { path: "/school-team/feedback", name: "Feedback Form", icon: <FaComments /> },
//         ];
//       case "university-committee":
//         return [
//           { path: "/university-committee/applications", name: "Applications Queue", icon: <FaTasks /> },
//           { path: "/university-committee/application-details", name: "Application Details", icon: <FaFileAlt /> },
//           { path: "/university-committee/feedback", name: "Feedback", icon: <FaComments /> },
//           { path: "/university-committee/review-summary", name: "Review Summary", icon: <FaClipboardList /> },
//           { path: "/university-committee/assign", name: "Assign Reviewer", icon: <FaUserTie /> },
//         ];
//       case "reviewer":
//         return [
//           { path: "/reviewer/applications", name: "Assigned Applications", icon: <FaTasks /> },
//           { path: "/reviewer/document-viewer", name: "Document Viewer", icon: <FaFileAlt /> },
//           { path: "/reviewer/feedback", name: "Submit Feedback", icon: <FaComments /> },
//           { path: "/reviewer/review", name: "Submit Review", icon: <FaCheckSquare /> },
//         ];
//       case "hr-board":
//         return [
//           { path: "/hr-board/dashboard", name: "Dashboard", icon: <FaHome /> },
//           { path: "/hr-board/committee-decisions", name: "Committee Decisions", icon: <FaClipboardList /> },
//           { path: "/hr-board/make-decisions", name: "Make HR Decisions", icon: <FaCheckSquare /> },
//           { path: "/hr-board/council-decisions", name: "Council Decisions", icon: <FaTasks /> },
//         ];
//       case "university-council":
//         return [
//           { path: "/university-council/dashboard", name: "Dashboard", icon: <FaHome /> },
//           { path: "/university-council/hr-decisions", name: "HR Board Decisions", icon: <FaClipboardList /> },
//           { path: "/university-council/decision-form", name: "Make Final Decision", icon: <FaCheckSquare /> },
//           { path: "/university-council/final-approved", name: "Final Approved List", icon: <FaGraduationCap /> },
//         ];
//       case "university-community":
//         return [
//           { path: "/university-community/search", name: "Search & Filter", icon: <FaSearch /> },
//           { path: "/university-community/promotions", name: "Approved Promotions", icon: <FaGraduationCap /> },
//           { path: "/university-community/details", name: "Promotion Details", icon: <FaFileAlt /> },
//           { path: "/university-community/list", name: "Download List", icon: <FaDownload /> },
//         ];
//       default:
//         return [];
//     }
//   };

//   const menuItems = getMenuItems();

//   return (
//     <div className="sidebar-container">
//       <h3 className="sidebar-title">{user.role.toUpperCase()} MENU</h3>
//       <ul className="sidebar-links">
//         {menuItems.map((item, index) => (
//           <li key={index}>
//             <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
//               <span className="icon">{item.icon}</span> {item.name}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


// /* eslint-disable react/jsx-no-undef */
// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   FaHome,
//   FaUsers,
//   FaKey,
//   FaCogs,
//   FaSchool,
//   FaUserCog,
//   FaLock,
//   FaUser,
//   FaClipboardList,
//   FaFileAlt,
//   FaUpload,
//   FaBell,
//   FaComments,
//   FaCheckSquare,
//   FaShareSquare,
//   FaTasks,
//   FaUserTie,
//   FaSearch,
//   FaGraduationCap,
//   FaDownload,
//   FaUserPlus
// } from "react-icons/fa";
// import "./Sidebar.css";

// const Sidebar = () => {
//   const { user } = useAuth();
//   if (!user) return null;

//   const getMenuItems = () => {
//     switch (user.role?.toUpperCase()) {
//       case "ADMIN":
//         return [
//           { path: "/admin", name: "Dashboard", icon: <FaHome /> },
//           { path: "/admin/manage-criteria", name: "Manage Criteria", icon: <FaCogs /> },
//           { path: "/admin/roles-access", name: "Roles & Access", icon: <FaKey /> },
//           { path: "/admin/applications-list", name: "Applications List", icon: <FaClipboardList /> },
//           { path: "/admin/create-user", name: "Create User", icon: <FaUserPlus /> },
//           { path: "/admin/user-management", name: "User Management", icon: <FaUsers /> },
//           { path: "/admin/account-control", name: "Account Control", icon: <FaUserCog /> },
//           { path: "/admin/add-school", name: "Add School", icon: <FaSchool /> },
//           { path: "/admin/school-list", name: "School List", icon: <FaSchool /> },
//           { path: "/admin/reset-password", name: "Reset Password", icon: <FaLock /> },
//           { path: "/admin/schoolapplications", name: "School Applications", icon: <FaFileAlt /> },
//         ];

//       case "APPLICANT":
//         return [
//           { path: "/applicant", name: "Dashboard", icon: <FaHome /> },
//           { path: "/applicant/profile", name: "User Profile", icon: <FaUser /> },
//           { path: "/applicant/criteria", name: "Category Criteria", icon: <FaClipboardList /> },
//           { path: "/applicant/application", name: "Application Form", icon: <FaFileAlt /> },
//           { path: "/applicant/upload", name: "Upload Documents", icon: <FaUpload /> },
//           { path: "/applicant/status", name: "Status Tracker", icon: <FaSearch /> },
//           { path: "/applicant/notifications", name: "Notifications", icon: <FaBell /> },
//           { path: "/applicant/feedback", name: "Feedback", icon: <FaComments /> },
//         ];

//       case "SCHOOL_TEAM":
//         return [
//           { path: "/school-team", name: "Dashboard", icon: <FaHome /> },
//           { path: "/school-team/category-criteria", name: "View Criteria", icon: <FaClipboardList /> },
//           { path: "/school-team/applications", name: "Application Details", icon: <FaFileAlt /> },
//           { path: "/school-team/checklist", name: "Checklist", icon: <FaCheckSquare /> },
//           { path: "/school-team/forward", name: "Forward Application", icon: <FaShareSquare /> },
//           { path: "/school-team/feedback", name: "Feedback Form", icon: <FaComments /> },
//           { path: "/school-team/applications/update/1", name: "Update Application", icon: <FaUserCog /> }, 
//         ];

//       case "UNIVERSITY_COMMITTEE":
//         return [
//           { path: "/university-committee", name: "Dashboard", icon: <FaHome /> },
//           { path: "/university-committee/applications", name: "Applications Queue", icon: <FaTasks /> },
//           { path: "/university-committee/application-details", name: "Application Details", icon: <FaClipboardList /> },
//           { path: "/university-committee/review-summary", name: "Review Summary", icon: <FaClipboardList /> },
//           { path: "/university-committee/assign", name: "Assign Reviewer", icon: <FaUserTie /> },

          
//         ];

//       case "REVIEWER":
//         return [
//           { path: "/reviewer", name: "Dashboard", icon: <FaHome /> },
//           { path: "/reviewer/applications", name: "Assigned Applications", icon: <FaTasks /> },
//           { path: "/reviewer/document-viewer", name: "Document Viewer", icon: <FaFileAlt /> },
//           { path: "/reviewer/feedback", name: "Submit Feedback", icon: <FaComments /> },
//           { path: "/reviewer/review", name: "Submit Review", icon: <FaCheckSquare /> },
//         ];

//       case "HR_BOARD":
//         return [
//           { path: "/hr-board", name: "Dashboard", icon: <FaHome /> },
//           { path: "/hr-board/committee-decisions", name: "Committee Decisions", icon: <FaClipboardList /> },
//           { path: "/hr-board/make-decisions/:id", name: "Make HR Decisions", icon: <FaCheckSquare /> },
//           { path: "/hr-board/council-decisions", name: "Council Decisions", icon: <FaTasks /> },
//         ];

//       case "UNIVERSITY_COUNCIL":
//         return [
//           { path: "/university-council", name: "Dashboard", icon: <FaHome /> },
//           { path: "/university-council/hr-decisions", name: "HR Board Decisions", icon: <FaClipboardList /> },
//           { path: "/university-council/decision-form/:id", name: "Make Final Decision", icon: <FaCheckSquare /> },
//           { path: "/university-council/final-approved", name: "Final Approved List", icon: <FaGraduationCap /> },
//         ];

//       case "UNIVERSITY_COMMUNITY":
//         return [
//           { path: "/university-community/search", name: "Search & Filter", icon: <FaSearch /> },
//           { path: "/university-community/promotions", name: "Approved Promotions", icon: <FaGraduationCap /> },
//           { path: "/university-community/details/:id", name: "Promotion Details", icon: <FaFileAlt /> },
//           { path: "/university-community/list/:id", name: "Download List", icon: <FaDownload /> },
//         ];

//       default:
//         return [];
//     }
//   };

//   const menuItems = getMenuItems();

//   return (
//     <div className="sidebar-container">
//       <h3 className="sidebar-title">{user.role?.toUpperCase()} MENU</h3>
//       <ul className="sidebar-links">
//         {menuItems.map((item, index) => (
//           <li key={index}>
//             <NavLink
//               to={item.path}
//               className={({ isActive }) => (isActive ? "active" : "")}
//             >
//               <span className="icon">{item.icon}</span>
//               <span className="link-text">{item.name}</span>
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;


/* eslint-disable react/jsx-no-undef */
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaHome,
  FaUsers,
  FaKey,
  FaCogs,
  FaSchool,
  FaUserCog,
  FaLock,
  FaUser,
  FaClipboardList,
  FaFileAlt,
  FaUpload,
  FaBell,
  FaComments,
  FaCheckSquare,
  FaShareSquare,
  FaTasks,
  FaUserTie,
  FaSearch,
  FaGraduationCap,
  FaDownload,
  FaUserPlus
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role?.toUpperCase()) {
      case "ADMIN":
        return [
          { path: "/admin", name: "Dashboard", icon: <FaHome /> },
          { path: "/admin/manage-criteria", name: "Manage Criteria", icon: <FaCogs /> },
          { path: "/admin/roles-access", name: "Roles & Access", icon: <FaKey /> },
          { path: "/admin/applications-list", name: "Applications List", icon: <FaClipboardList /> },
          { path: "/admin/create-user", name: "Create User", icon: <FaUserPlus /> },
          { path: "/admin/user-management", name: "User Management", icon: <FaUsers /> },
          { path: "/admin/account-control", name: "Account Control", icon: <FaUserCog /> },
          { path: "/admin/add-school", name: "Add School", icon: <FaSchool /> },
          { path: "/admin/school-list", name: "School List", icon: <FaSchool /> },
          { path: "/admin/reset-password", name: "Reset Password", icon: <FaLock /> },
          { path: "/admin/schoolapplications", name: "School Applications", icon: <FaFileAlt /> },

          // NEW: View Users by Role
          { path: "/hr-board/users", name: "HR Board Users", icon: <FaUsers /> },
          { path: "/reviewer/users", name: "Reviewer Users", icon: <FaUsers /> },
          { path: "/committee/users", name: "Committee Users", icon: <FaUsers /> },
          { path: "/university-council/users", name: "Council Users", icon: <FaUsers /> },
          { path: "/school-team/users", name: "School Team Users", icon: <FaUsers /> },
        ];

      case "APPLICANT":
        return [
          { path: "/applicant", name: "Dashboard", icon: <FaHome /> },
          { path: "/applicant/profile", name: "User Profile", icon: <FaUser /> },
          { path: "/applicant/criteria", name: "Category Criteria", icon: <FaClipboardList /> },
          { path: "/applicant/application", name: "Application Form", icon: <FaFileAlt /> },
          { path: "/applicant/upload", name: "Upload Documents", icon: <FaUpload /> },
          { path: "/applicant/status", name: "Status Tracker", icon: <FaSearch /> },
          { path: "/applicant/notifications", name: "Notifications", icon: <FaBell /> },
          { path: "/applicant/feedback", name: "Feedback", icon: <FaComments /> },
        ];

      case "SCHOOL_TEAM":
        return [
          { path: "/school-team", name: "Dashboard", icon: <FaHome /> },
          { path: "/school-team/category-criteria", name: "View Criteria", icon: <FaClipboardList /> },
          { path: "/school-team/applications", name: "Application Details", icon: <FaFileAlt /> },
          { path: "/school-team/checklist", name: "Checklist", icon: <FaCheckSquare /> },
          { path: "/school-team/forward", name: "Forward Application", icon: <FaShareSquare /> },
          { path: "/school-team/feedback", name: "Feedback Form", icon: <FaComments /> },
          { path: "/school-team/applications/update/1", name: "Update Application", icon: <FaUserCog /> },

          // NEW: Users Table for School Team
          { path: "/school-team/users", name: "School Team Users", icon: <FaUsers /> },
        ];

      case "UNIVERSITY_COMMITTEE":
        return [
          { path: "/university-committee", name: "Dashboard", icon: <FaHome /> },
          { path: "/university-committee/applications", name: "Applications Queue", icon: <FaTasks /> },
          { path: "/university-committee/application-details", name: "Application Details", icon: <FaClipboardList /> },
          { path: "/university-committee/review-summary", name: "Review Summary", icon: <FaClipboardList /> },
          { path: "/university-committee/assign", name: "Assign Reviewer", icon: <FaUserTie /> },

          // NEW: Committee Users
          { path: "/committee/users", name: "Committee Users", icon: <FaUsers /> },
        ];

      case "REVIEWER":
        return [
          { path: "/reviewer", name: "Dashboard", icon: <FaHome /> },
          { path: "/reviewer/applications", name: "Assigned Applications", icon: <FaTasks /> },
          { path: "/reviewer/document-viewer", name: "Document Viewer", icon: <FaFileAlt /> },
          { path: "/reviewer/feedback", name: "Submit Feedback", icon: <FaComments /> },
          { path: "/reviewer/review", name: "Submit Review", icon: <FaCheckSquare /> },

          // NEW: Reviewer Users
          { path: "/reviewer/users", name: "Reviewer Users", icon: <FaUsers /> },
        ];

      case "HR_BOARD":
        return [
          { path: "/hr-board", name: "Dashboard", icon: <FaHome /> },
          { path: "/hr-board/committee-decisions", name: "Committee Decisions", icon: <FaClipboardList /> },
          { path: "/hr-board/make-decisions/:id", name: "Make HR Decisions", icon: <FaCheckSquare /> },
          { path: "/hr-board/council-decisions", name: "Council Decisions", icon: <FaTasks /> },

          // NEW: HR Board Users
          { path: "/hr-board/users", name: "HR Board Users", icon: <FaUsers /> },
        ];

      case "UNIVERSITY_COUNCIL":
        return [
          { path: "/university-council", name: "Dashboard", icon: <FaHome /> },
          { path: "/university-council/hr-decisions", name: "HR Board Decisions", icon: <FaClipboardList /> },
          { path: "/university-council/decision-form/:id", name: "Make Final Decision", icon: <FaCheckSquare /> },
          { path: "/university-council/final-approved", name: "Final Approved List", icon: <FaGraduationCap /> },

          // NEW: Council Users
          { path: "/university-council/users", name: "Council Users", icon: <FaUsers /> },
        ];

      case "UNIVERSITY_COMMUNITY":
        return [
          { path: "/university-community/search", name: "Search & Filter", icon: <FaSearch /> },
          { path: "/university-community/promotions", name: "Approved Promotions", icon: <FaGraduationCap /> },
          { path: "/university-community/details/:id", name: "Promotion Details", icon: <FaFileAlt /> },
          { path: "/university-community/list/:id", name: "Download List", icon: <FaDownload /> },
        ];

      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">{user.role?.toUpperCase()} MENU</h3>
      <ul className="sidebar-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="icon">{item.icon}</span>
              <span className="link-text">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
