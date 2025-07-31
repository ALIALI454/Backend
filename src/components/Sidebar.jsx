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
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const getMenuItems = () => {
    switch (user.role) {
      case "admin":
        return [
          { path: "/admin", name: "Dashboard", icon: <FaHome /> },
          { path: "/admin/manage-criteria", name: "Manage Criteria", icon: <FaCogs /> },
          { path: "/admin/roles-access", name: "Roles & Access", icon: <FaKey /> },
          { path: "/admin/user-management", name: "User Management", icon: <FaUsers /> },
          { path: "/admin/account-control", name: "Account Control", icon: <FaUserCog /> },
           { path: "/admin/add-school", name: "Add School", icon: <FaSchool /> },
          { path: "/admin/school-list", name: "School List", icon: <FaSchool /> },
          { path: "/admin/reset-password", name: "Reset Password", icon: <FaLock /> },
        ];
      case "applicant":
        return [
          { path: "/applicant/profile", name: "User Profile", icon: <FaUser /> },
          { path: "/applicant/criteria", name: "Category Criteria", icon: <FaClipboardList /> },
          { path: "/applicant/application", name: "Application Form", icon: <FaFileAlt /> },
          { path: "/applicant/upload", name: "Upload Documents", icon: <FaUpload /> },
          { path: "/applicant/status", name: "Status Tracker", icon: <FaSearch /> },
          { path: "/applicant/notifications", name: "Notifications", icon: <FaBell /> },
          { path: "/applicant/feedback", name: "Feedback", icon: <FaComments /> },
        ];
      case "school-team":
        return [
          { path: "/school-team/category-criteria", name: "View Criteria", icon: <FaClipboardList /> },
          { path: "/school-team/applications", name: "Application Details", icon: <FaFileAlt /> },
          { path: "/school-team/checklist", name: "Checklist", icon: <FaCheckSquare /> },
          { path: "/school-team/forward", name: "Forward Application", icon: <FaShareSquare /> },
          { path: "/school-team/feedback", name: "Feedback Form", icon: <FaComments /> },
        ];
      case "university-committee":
        return [
          { path: "/university-committee/applications", name: "Applications Queue", icon: <FaTasks /> },
          { path: "/university-committee/application-details", name: "Application Details", icon: <FaFileAlt /> },
          { path: "/university-committee/feedback", name: "Feedback", icon: <FaComments /> },
          { path: "/university-committee/review-summary", name: "Review Summary", icon: <FaClipboardList /> },
          { path: "/university-committee/assign", name: "Assign Reviewer", icon: <FaUserTie /> },
        ];
      case "reviewer":
        return [
          { path: "/reviewer/applications", name: "Assigned Applications", icon: <FaTasks /> },
          { path: "/reviewer/document-viewer", name: "Document Viewer", icon: <FaFileAlt /> },
          { path: "/reviewer/feedback", name: "Submit Feedback", icon: <FaComments /> },
          { path: "/reviewer/review", name: "Submit Review", icon: <FaCheckSquare /> },
        ];
      case "hr-board":
        return [
          { path: "/hr-board/dashboard", name: "Dashboard", icon: <FaHome /> },
          { path: "/hr-board/committee-decisions", name: "Committee Decisions", icon: <FaClipboardList /> },
          { path: "/hr-board/make-decisions", name: "Make HR Decisions", icon: <FaCheckSquare /> },
          { path: "/hr-board/council-decisions", name: "Council Decisions", icon: <FaTasks /> },
        ];
      case "university-council":
        return [
          { path: "/university-council/dashboard", name: "Dashboard", icon: <FaHome /> },
          { path: "/university-council/hr-decisions", name: "HR Board Decisions", icon: <FaClipboardList /> },
          { path: "/university-council/decision-form", name: "Make Final Decision", icon: <FaCheckSquare /> },
          { path: "/university-council/final-approved", name: "Final Approved List", icon: <FaGraduationCap /> },
        ];
      case "university-community":
        return [
          { path: "/university-community/search", name: "Search & Filter", icon: <FaSearch /> },
          { path: "/university-community/promotions", name: "Approved Promotions", icon: <FaGraduationCap /> },
          { path: "/university-community/details", name: "Promotion Details", icon: <FaFileAlt /> },
          { path: "/university-community/list", name: "Download List", icon: <FaDownload /> },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">{user.role.toUpperCase()} MENU</h3>
      <ul className="sidebar-links">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? "active" : "")}>
              <span className="icon">{item.icon}</span> {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
