// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//   const { user } = useAuth();
//   const location = useLocation();

//   const getMenuItems = () => {
//     if (!user) return [];

//     const commonItems = [
//       // { path: '/dashboard', name: 'Dashboard', icon: '🏠' }
//     ];

//     switch (user.role) {
//       case 'applicant':
//         return [
//           ...commonItems,
//           { path: '/applicant/criteria', name: 'Category Criteria', icon: '📋' },
//           { path: '/applicant/application', name: 'Application Form', icon: '📝' },
//           { path: '/applicant/upload', name: 'Upload Documents', icon: '📤' },
//           { path: '/applicant/status', name: 'Status Tracker', icon: '🔍' },
//           { path: '/applicant/notifications', name: 'Notifications', icon: '🔔' },
//           { path: '/applicant/feedback', name: 'Feedback', icon: '✏️' }
//         ]; 
//       case 'school-team':
//         return [
//           ...commonItems,
//           { path: '/school-team/category-criteria', name: 'View Criteria', icon: '📋' },
//           { path: '/school-team/applications', name: 'ApplicationDetails ', icon: '📑' },
//           { path: '/school-team/checklist', name: 'Checklist', icon: '✅' },
//           { path: '/school-team/forward', name: 'Forward Button', icon: '📤' },
//           { path: '/school-team/feedback', name: 'Feedback Form', icon: '🗨️' },
//           { path: '/school-team/criteria', name: 'Category Criteria', icon: '📋' }
//         ];
//       case 'university-committee':
//         return [
//           ...commonItems,
//           { path: '/university-committee/applications', name: 'Applications Queue', icon: '📑' },
//           { path: '/university-committee/application-details', name: 'Application Details', icon: '📄' },
//           { path: '/university-committee/feedback', name: 'Feedback', icon: '✏️' },
//           { path: '/university-committee/decision', name: 'Decision Form', icon: '✅' },
//           { path: '/university-committee/submit-decision', name: 'Submit Decision', icon: '📤' },
//           { path: '/university-committee/review-summary', name: 'Review Summary', icon: '📝' },
        
//         ];
//       case 'reviewer':
//         return [
//           ...commonItems,
//           { path: '/reviewer/applications', name: 'Assigned Applications', icon: '📑' },
//           { path: '/reviewer/document-viewer', name: 'Document Viewer', icon: '📄' },
//           { path: '/reviewer/feedback', name: 'Submit Feedback', icon: '✏️' },
//           { path: '/reviewer/review', name: 'Submit Review', icon: '✅' }
//         ];
//       case 'hr-board':
//         return [
//           ...commonItems,
//           { path: '/hr-board/queue', name: 'Approval Queue', icon: '🕓' },
//           { path: '/hr-board/forward', name: 'Forward to Council', icon: '➡️' },
//           { path: '/hr-board/finalize', name: 'Finalize and Notify', icon: '📣' },
//           { path: '/hr-board/review-report', name: 'Review Report', icon: '📋' }
//         ];
//       case 'university-council':
//         return [
//           ...commonItems,
//           { path: '/university-council/applications', name: 'Applications Queue', icon: '📑' },
//            { path: '/university-council/application', name: 'Application Details', icon: '📑' },
//           { path: '/university-council/decision', name: 'Final Decision', icon: '✅' },
//           { path: '/university-council/feedback', name: 'Feedback', icon: '✏️' },
//           { path: '/university-council/review', name: 'Review Summary', icon: '📄' },
//           { path: '/university-council/submit', name: 'Submit Decision', icon: '📤' }
//         ];
//       case 'university-community':
//         return [
//           ...commonItems,
//           { path: '/university-community/search', name: 'Search & Filter', icon: '🔍' },
//           { path: '/university-community/promotions', name: 'Approved Promotions', icon: '🎓' },
//           { path: '/university-community/details', name: 'Promotion Details', icon: '📄' },
//           { path: '/university-community/list', name: 'Download List', icon: '⬇️' }
          
//         ];
//       default:
//         return commonItems;
//     }
//   };

//   return (
//     <div style={{
//       width: '250px',
//       backgroundColor: '#2c3e50',
//       color: 'white',
//       height: 'calc(100vh - 120px)',
//       position: 'fixed',
//       padding: '20px 0',
//       overflowY: 'auto'
//     }}>
//       <h3 style={{
//         padding: '0 20px 15px',
//         borderBottom: '1px solid #3d5166',
//         margin: '0 0 15px'
//       }}>
//         {user ? `${user.role.toUpperCase()} MENU` : 'MENU'}
//       </h3>

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {getMenuItems().map((item, index) => (
//           <li key={index}>
//             <Link
//               to={item.path}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '12px 20px',
//                 color: location.pathname.includes(item.path) ? '#3498db' : 'white',
//                 textDecoration: 'none',
//                 backgroundColor: location.pathname.includes(item.path) ? '#34495e' : 'transparent',
//                 transition: 'all 0.3s'
//               }}
//             >
//               <span style={{ marginRight: '10px' }}>{item.icon}</span>
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css'; // Hakikisha hii ipo hapa!

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Function to get menu items based on user role
  const getMenuItems = () => {
    if (!user) return [];

    // Note: You can replace these emoji icons with actual icon library components
    // like <FaHome /> from React Icons (Font Awesome, Material Icons etc.)
    switch (user.role) {
      case 'applicant':
        return [
          {path: '/applicant/profile', name: 'User Profile', icon:'👤'},
          { path: '/applicant/criteria', name: 'Category Criteria', icon: '📋' },
          { path: '/applicant/application', name: 'Application Form', icon: '📝' },
          { path: '/applicant/upload', name: 'Upload Documents', icon: '📤' },
          { path: '/applicant/status', name: 'Status Tracker', icon: '🔍' },
          { path: '/applicant/notifications', name: 'Notifications', icon: '🔔' },
          { path: '/applicant/feedback', name: 'Feedback', icon: '✏️' }
        ];
      case 'school-team':
        return [
          { path: '/school-team/category-criteria', name: 'View Criteria', icon: '📋' },
          { path: '/school-team/applications', name: 'Application Details', icon: '📑' },
          { path: '/school-team/checklist', name: 'Checklist', icon: '✅' },
          { path: '/school-team/forward', name: 'Forward Application', icon: '📤' },
          { path: '/school-team/feedback', name: 'Feedback Form', icon: '🗨️' },
          { path: '/school-team/manage-criteria', name: 'Manage Criteria', icon: '⚙️' }
        ];
      case 'university-committee':
        return [
          { path: '/university-committee/applications', name: 'Applications Queue', icon: '📑' },
          { path: '/university-committee/application-details', name: 'Application Details', icon: '📄' },
          { path: '/university-committee/feedback', name: 'Feedback', icon: '✏️' },
          // { path: '/university-committee/decision', name: 'Decision Form', icon: '✅' },
          // { path: '/university-committee/submit-decision', name: 'Submit Decision', icon: '📤' },
          { path: '/university-committee/review-summary', name: 'Review Summary', icon: '📝' },
        ];
      case 'reviewer':
        return [
          { path: '/reviewer/applications', name: 'Assigned Applications', icon: '📑' },
          { path: '/reviewer/document-viewer', name: 'Document Viewer', icon: '📄' },
          { path: '/reviewer/feedback', name: 'Submit Feedback', icon: '✏️' },
          { path: '/reviewer/review', name: 'Submit Review', icon: '✅' }
        ];
      case 'hr-board':
        return [
          { path: '/hr-board/queue', name: 'Approval Queue', icon: '🕓' },
          { path: '/hr-board/forward', name: 'Forward to Council', icon: '➡️' },
          { path: '/hr-board/finalize', name: 'Finalize and Notify', icon: '📣' },
          { path: '/hr-board/review-report', name: 'Review Report', icon: '📋' }
        ];
      case 'university-council':
        return [
          { path: '/university-council/applications', name: 'Applications Queue', icon: '📑' },
          { path: '/university-council/application-details', name: 'Application Details', icon: '📄' },
          { path: '/university-council/decision', name: 'Decision Form', icon: '✅' },
          { path: '/university-council/feedback', name: 'Feedback', icon: '✏️' },
          { path: '/university-council/review-summary', name: 'Review Summary', icon: '📝' },
          { path: '/university-council/submit', name: 'Submit Decision', icon: '📤' }
        ];
      case 'university-community':
        return [
          { path: '/university-community/search', name: 'Search & Filter', icon: '🔍' },
          { path: '/university-community/promotions', name: 'Approved Promotions', icon: '🎓' },
          { path: '/university-community/details', name: 'Promotion Details', icon: '📄' },
          { path: '/university-community/list', name: 'Download List', icon: '⬇️' }
        ];
      default:
        return []; // Return empty array if no role or role not matched
    }
  };

  const menuItems = getMenuItems(); // Get menu items once

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">
        {user ? `${user.role.toUpperCase()} MENU` : 'MENU'}
      </h3>

      <ul className="sidebar-menu-list">
        {menuItems.map((item, index) => (
          <li key={index} className="sidebar-menu-item">
            <Link
              to={item.path}
              className={`sidebar-menu-link ${
                location.pathname.includes(item.path) ? 'active' : ''
              }`}
            >
              <span className="sidebar-menu-icon">{item.icon}</span>
              <span className="sidebar-menu-name">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;