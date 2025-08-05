// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import DashboardLayout from './layouts/DashboardLayout';

// // Public Pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Unauthorized from './pages/Unauthorized';
// import ForgotPassword from './pages/ForgotPassword';

// // Applicant Pages
// import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
// import ApplicationForm from './pages/applicant/ApplicationForm';
// import UploadDocuments from './pages/applicant/UploadDocuments';
// import Notifications from './pages/applicant/Notifications';
// import Feedback from './pages/applicant/Feedback';
// import CategoryCriteria from './pages/applicant/CategoryCriteria';
// import UserProfile from './pages/applicant/UserProfile';

// // School Team Pages
// import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
// import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
// import SchoolTeamApplicationDetails from './pages/school-team/ApplicationDetails';
// import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
// import FeedbackForm from './pages/school-team/FeedbackForm';
// import ForwardButton from './pages/school-team/ForwardButton';

// // University Committee Pages
// import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
// import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
// import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
// import CommitteeFeedback from './pages/university-committee/Feedback';
// import ReviewSummary from './pages/university-committee/ReviewSummary';
// import AssignReviewer from './pages/university-committee/AssignReviewer';

// // Reviewer Pages
// import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
// import AssignedApplications from './pages/reviewer/AssignedApplications';
// import DocumentViewer from './pages/reviewer/DocumentViewer';
// import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
// import SubmitReview from './pages/reviewer/SubmitReview';

// // HR Board Pages
// import HrDashboard from './pages/hr-board/HrDashboard';
// import CommitteeDecisionsList from './pages/hr-board/CommitteeDecisionsList';
// import HrDecisionForm from './pages/hr-board/HrDecisionForm';
// import CouncilDecisionsList from './pages/hr-board/CouncilDecisionsList';

// // University Council Pages
// import CouncilDashboard from './pages/university-council/CouncilDashboard';
// import HrDecisionsList from './pages/university-council/HrDecisionsList';
// import CouncilDecisionForm from './pages/university-council/CouncilDecisionForm';
// import FinalApprovedList from './pages/university-council/FinalApprovedList';

// // University Community Pages
// import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
// import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
// import DownloadList from './pages/university-community/DownloadList';
// import PromotionDetails from './pages/university-community/PromotionDetails';
// import SearchFilter from './pages/university-community/SearchFilter';

// // Admin Pages (NOTE: Uppercase "Admin")
// // Admin Pages (rekebisha path)
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import ManageCriteria from './pages/Admin/ManageCriteria';
// import RoleAccessControl from './pages/Admin/RoleAccessControl';
// import UserManagement from './pages/Admin/UserManagement';
// import AccountControl from './pages/Admin/AccountControl';
// import ResetPassword from './pages/Admin/ResetPassword';
// import AddSchoolForm from './pages/Admin/AddSchoolForm';
// import SchoolList from './pages/Admin/SchoolList';



// // PrivateRoute
// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<Login />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Applicant */}
//           <Route
//             path="/applicant/*"
//             element={
//               <PrivateRoute allowedRoles={['applicant']}>
//                 <ApplicantDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<ApplicationForm />} />
//             <Route path="application" element={<ApplicationForm />} />
//             <Route path="upload" element={<UploadDocuments />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="feedback" element={<Feedback />} />
//             <Route path="criteria" element={<CategoryCriteria />} />
//             <Route path="profile" element={<UserProfile />} />
//           </Route>

//           {/* School Team */}
//           <Route
//             path="/school-team/*"
//             element={
//               <PrivateRoute allowedRoles={['school-team']}>
//                 <SchoolTeamDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<SchoolTeamApplicationDetails />} />
//             <Route path="applications" element={<SchoolTeamApplicationDetails />} />
//             <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
//             <Route path="feedback" element={<FeedbackForm />} />
//             <Route path="forward" element={<ForwardButton />} />
//             <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
//           </Route>

//           {/* University Committee */}
//           <Route
//             path="/university-committee/*"
//             element={
//               <PrivateRoute allowedRoles={['university-committee']}>
//                 <UniversityCommitteeDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<ApplicationsQueue />} />
//             <Route path="applications" element={<ApplicationsQueue />} />
//             <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
//             <Route path="feedback/:id" element={<CommitteeFeedback />} />
//             <Route path="review-summary" element={<ReviewSummary />} />
//             <Route path="assign" element={<AssignReviewer />} />
//           </Route>

//           {/* Reviewer */}
//           <Route
//             path="/reviewer/*"
//             element={
//               <PrivateRoute allowedRoles={['reviewer']}>
//                 <ReviewerDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<AssignedApplications />} />
//             <Route path="applications" element={<AssignedApplications />} />
//             <Route path="document-viewer" element={<DocumentViewer />} />
//             <Route path="feedback" element={<ReviewerFeedbackForm />} />
//             <Route path="review" element={<SubmitReview />} />
//           </Route>

//           {/* HR Board */}
//           <Route
//             path="/hr-board/*"
//             element={
//               <PrivateRoute allowedRoles={['hr-board']}>
//                 <HrDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<CommitteeDecisionsList />} />
//             <Route path="committee-decisions" element={<CommitteeDecisionsList />} />
//             <Route path="make-decisions/:id" element={<HrDecisionForm />} />
//             <Route path="council-decisions" element={<CouncilDecisionsList />} />
//           </Route>

//           {/* University Council */}
//           <Route
//             path="/university-council/*"
//             element={
//               <PrivateRoute allowedRoles={['university-council']}>
//                 <CouncilDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<HrDecisionsList />} />
//             <Route path="hr-decisions" element={<HrDecisionsList />} />
//             <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
//             <Route path="final-approved" element={<FinalApprovedList />} />
//           </Route>

//           {/* University Community */}
//           <Route
//             path="/university-community/*"
//             element={
//               <PrivateRoute allowedRoles={['university-community']}>
//                 <UniversityCommunityDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<ApprovedPromotions />} />
//             <Route path="promotions" element={<ApprovedPromotions />} />
//             <Route path="details/:id" element={<PromotionDetails />} />
//             <Route path="list/:id" element={<DownloadList />} />
//             <Route path="search" element={<SearchFilter />} />
//           </Route>

//           {/* Admin Routes */}
//           <Route
//             path="/admin/*"
//             element={
//               <PrivateRoute allowedRoles={['admin']}>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           >
//             <Route index element={<AdminDashboard />} />
//             <Route path="manage-criteria" element={<ManageCriteria />} />
//             <Route path="school-list" element={<SchoolList/>} />
//             <Route path="roles-access" element={<RoleAccessControl />} />
//             <Route path="user-management" element={<UserManagement />} />
//             <Route path="account-control" element={<AccountControl />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="add-school" element={<AddSchoolForm />} />
//           </Route>

//           {/* Catch All */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';

// // Public Pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Unauthorized from './pages/Unauthorized';
// import ForgotPassword from './pages/ForgotPassword';

// // Applicant
// import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
// import ApplicationForm from './pages/applicant/ApplicationForm';
// import UploadDocuments from './pages/applicant/UploadDocuments';
// import Notifications from './pages/applicant/Notifications';
// import Feedback from './pages/applicant/Feedback';
// import CategoryCriteria from './pages/applicant/CategoryCriteria';
// import UserProfile from './pages/applicant/UserProfile';

// // School Team
// import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
// import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
// import SchoolTeamApplicationDetails from './pages/school-team/ApplicationDetails';
// import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
// import FeedbackForm from './pages/school-team/FeedbackForm';
// import ForwardButton from './pages/school-team/ForwardButton';

// // Committee
// import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
// import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
// import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
// import CommitteeFeedback from './pages/university-committee/Feedback';
// import ReviewSummary from './pages/university-committee/ReviewSummary';
// import AssignReviewer from './pages/university-committee/AssignReviewer';

// // Reviewer
// import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
// import AssignedApplications from './pages/reviewer/AssignedApplications';
// import DocumentViewer from './pages/reviewer/DocumentViewer';
// import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
// import SubmitReview from './pages/reviewer/SubmitReview';

// // HR Board
// import HrDashboard from './pages/hr-board/HrDashboard';
// import CommitteeDecisionsList from './pages/hr-board/CommitteeDecisionsList';
// import HrDecisionForm from './pages/hr-board/HrDecisionForm';
// import CouncilDecisionsList from './pages/hr-board/CouncilDecisionsList';

// // University Council
// import CouncilDashboard from './pages/university-council/CouncilDashboard';
// import HrDecisionsList from './pages/university-council/HrDecisionsList';
// import CouncilDecisionForm from './pages/university-council/CouncilDecisionForm';
// import FinalApprovedList from './pages/university-council/FinalApprovedList';

// // University Community
// import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
// import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
// import DownloadList from './pages/university-community/DownloadList';
// import PromotionDetails from './pages/university-community/PromotionDetails';
// import SearchFilter from './pages/university-community/SearchFilter';

// // Admin
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import ManageCriteria from './pages/Admin/ManageCriteria';
// import RoleAccessControl from './pages/Admin/RoleAccessControl';
// import UserManagement from './pages/Admin/UserManagement';
// import AccountControl from './pages/Admin/AccountControl';
// import ResetPassword from './pages/Admin/ResetPassword';
// import AddSchoolForm from './pages/Admin/AddSchoolForm';
// import SchoolList from './pages/Admin/SchoolList';
// import SchoolApplications from './pages/Admin/SchoolApplications ';
// import CreateAdminUserForm from './pages/Admin/CreateAdminUserForm';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Applicant */}
//           <Route
//             path="/applicant/*"
//             element={<PrivateRoute allowedRoles={['APPLICANT']}><ApplicantDashboard /></PrivateRoute>}
//           >
//             <Route index element={<ApplicationForm />} />
//             <Route path="application" element={<ApplicationForm />} />
//             <Route path="upload" element={<UploadDocuments />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="feedback" element={<Feedback />} />
//             <Route path="criteria" element={<CategoryCriteria />} />
//             <Route path="profile" element={<UserProfile />} />
//           </Route>

//           {/* School Team */}
//           <Route
//             path="/school-team/*"
//             element={<PrivateRoute allowedRoles={['SCHOOL_TEAM']}><SchoolTeamDashboard /></PrivateRoute>}
//           >
//             <Route index element={<SchoolTeamApplicationDetails />} />
//             <Route path="applications" element={<SchoolTeamApplicationDetails />} />
//             <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
//             <Route path="feedback" element={<FeedbackForm />} />
//             <Route path="forward" element={<ForwardButton />} />
//             <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
//           </Route>

//           {/* University Committee */}
//           <Route
//             path="/university-committee/*"
//             element={<PrivateRoute allowedRoles={['UNIVERSITY_COMMITTEE']}><UniversityCommitteeDashboard /></PrivateRoute>}
//           >
//             <Route index element={<ApplicationsQueue />} />
//             <Route path="applications" element={<ApplicationsQueue />} />
//             <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
//             <Route path="feedback/:id" element={<CommitteeFeedback />} />
//             <Route path="review-summary" element={<ReviewSummary />} />
//             <Route path="assign" element={<AssignReviewer />} />
//           </Route>

//           {/* Reviewer */}
//           <Route
//             path="/reviewer/*"
//             element={<PrivateRoute allowedRoles={['REVIEWER']}><ReviewerDashboard /></PrivateRoute>}
//           >
//             <Route index element={<AssignedApplications />} />
//             <Route path="applications" element={<AssignedApplications />} />
//             <Route path="document-viewer" element={<DocumentViewer />} />
//             <Route path="feedback" element={<ReviewerFeedbackForm />} />
//             <Route path="review" element={<SubmitReview />} />
//           </Route>

//           {/* HR Board */}
//           <Route
//             path="/hr-board/*"
//             element={<PrivateRoute allowedRoles={['HR_BOARD']}><HrDashboard /></PrivateRoute>}
//           >
//             <Route index element={<CommitteeDecisionsList />} />
//             <Route path="committee-decisions" element={<CommitteeDecisionsList />} />
//             <Route path="make-decisions/:id" element={<HrDecisionForm />} />
//             <Route path="council-decisions" element={<CouncilDecisionsList />} />
//           </Route>

//           {/* University Council */}
//           <Route
//             path="/university-council/*"
//             element={<PrivateRoute allowedRoles={['UNIVERSITY_COUNCIL']}><CouncilDashboard /></PrivateRoute>}
//           >
//             <Route index element={<HrDecisionsList />} />
//             <Route path="hr-decisions" element={<HrDecisionsList />} />
//             <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
//             <Route path="final-approved" element={<FinalApprovedList />} />
//           </Route>

//           {/* University Community */}
//           <Route
//             path="/university-community/*"
//             element={<PrivateRoute allowedRoles={['UNIVERSITY_COMMUNITY']}><UniversityCommunityDashboard /></PrivateRoute>}
//           >
//             <Route index element={<ApprovedPromotions />} />
//             <Route path="promotions" element={<ApprovedPromotions />} />
//             <Route path="details/:id" element={<PromotionDetails />} />
//             <Route path="list/:id" element={<DownloadList />} />
//             <Route path="search" element={<SearchFilter />} />
//           </Route>

//           {/* Admin */}
//           <Route
//             path="/admin/*"
//             element={<PrivateRoute allowedRoles={['ADMIN']}><AdminDashboard /></PrivateRoute>}>
//             <Route path="applications-list" element={<SchoolTeamApplicationDetails />} />
//             <Route index element={<AdminDashboard />} />
//             <Route path="manage-criteria" element={<ManageCriteria />} />
//             <Route path="school-list" element={<SchoolList />} />
//             <Route path="roles-access" element={<RoleAccessControl />} />
//             <Route path="user-management" element={<UserManagement />} />
//             <Route path="account-control" element={<AccountControl />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="add-school" element={<AddSchoolForm />} />
//             <Route path="schoolapplication" element={<SchoolApplications />} />
//             <Route path="create-user" element={<CreateAdminUserForm />} />
//           </Route>

//           {/* Catch All */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';

// // Public Pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Unauthorized from './pages/Unauthorized';
// import ForgotPassword from './pages/ForgotPassword';

// // Applicant
// import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
// import ApplicationForm from './pages/applicant/ApplicationForm';
// import UploadDocuments from './pages/applicant/UploadDocuments';
// import Notifications from './pages/applicant/Notifications';
// import Feedback from './pages/applicant/Feedback';
// import CategoryCriteria from './pages/applicant/CategoryCriteria';
// import UserProfile from './pages/applicant/UserProfile';

// // School Team
// import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
// import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
// import SchoolTeamApplicationDetails from './pages/school-team/ApplicationDetails';
// import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
// import FeedbackForm from './pages/school-team/FeedbackForm';
// import UpdateApplicationForm from './pages/school-team/UpdateApplicationForm';
// import ForwardButton from './pages/school-team/ForwardButton';



// // Committee
// import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
// import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
// import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
// import CommitteeFeedback from './pages/university-committee/Feedback';
// import ReviewSummary from './pages/university-committee/ReviewSummary';
// import AssignReviewer from './pages/university-committee/AssignReviewer';

// // Reviewer
// import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
// import AssignedApplications from './pages/reviewer/AssignedApplications';
// import DocumentViewer from './pages/reviewer/DocumentViewer';
// import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
// import SubmitReview from './pages/reviewer/SubmitReview';

// // HR Board
// import HrDashboard from './pages/hr-board/HrDashboard';
// import CommitteeDecisionsList from './pages/hr-board/CommitteeDecisionsList';
// import HrDecisionForm from './pages/hr-board/HrDecisionForm';
// import CouncilDecisionsList from './pages/hr-board/CouncilDecisionsList';

// // University Council
// import CouncilDashboard from './pages/university-council/CouncilDashboard';
// import HrDecisionsList from './pages/university-council/HrDecisionsList';
// import CouncilDecisionForm from './pages/university-council/CouncilDecisionForm';
// import FinalApprovedList from './pages/university-council/FinalApprovedList';

// // University Community
// import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
// import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
// import DownloadList from './pages/university-community/DownloadList';
// import PromotionDetails from './pages/university-community/PromotionDetails';
// import SearchFilter from './pages/university-community/SearchFilter';

// // Admin
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import ManageCriteria from './pages/Admin/ManageCriteria';
// import RoleAccessControl from './pages/Admin/RoleAccessControl';
// import UserManagement from './pages/Admin/UserManagement';
// import AccountControl from './pages/Admin/AccountControl';
// import ResetPassword from './pages/Admin/ResetPassword';
// import AddSchoolForm from './pages/Admin/AddSchoolForm';
// import SchoolList from './pages/Admin/SchoolList';
// import SchoolApplications from './pages/Admin/SchoolApplications';
// import CreateAdminUserForm from './pages/Admin/CreateAdminUserForm';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           <Route path="/applicant" element={<PrivateRoute allowedRoles={["APPLICANT"]} />}>
//             <Route index element={<ApplicantDashboard />} />
//             <Route path="application" element={<ApplicationForm />} />
//             <Route path="upload" element={<UploadDocuments />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="feedback" element={<Feedback />} />
//             <Route path="criteria" element={<CategoryCriteria />} />
//             <Route path="profile" element={<UserProfile />} />
//           </Route>

//             <Route path="/school-team" element={<PrivateRoute allowedRoles={["SCHOOL_TEAM"]} />}>
//               <Route index element={<SchoolTeamDashboard />} />
//               <Route path="applications" element={<SchoolTeamApplicationDetails />} />
//               <Route path="applications/update/:id" element={<UpdateApplicationForm />} />
//               <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
//               <Route path="feedback" element={<FeedbackForm />} />
//               <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
//               <Route path="forward/:id" element={<ForwardButton />} />
//             </Route>



//           <Route path="/university-committee" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMITTEE"]} />}>
//             <Route index element={<UniversityCommitteeDashboard />} />
//             <Route path="applications" element={<ApplicationsQueue />} />
//             <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
//             <Route path="feedback/:id" element={<CommitteeFeedback />} />
//             <Route path="review-summary" element={<ReviewSummary />} />
//             <Route path="assign" element={<AssignReviewer />} />
//           </Route>

//           <Route path="/reviewer" element={<PrivateRoute allowedRoles={["REVIEWER"]} />}>
//             <Route index element={<ReviewerDashboard />} />
//             <Route path="applications" element={<AssignedApplications />} />
//             <Route path="document-viewer" element={<DocumentViewer />} />
//             <Route path="feedback" element={<ReviewerFeedbackForm />} />
//             <Route path="review" element={<SubmitReview />} />
//           </Route>

//           <Route path="/hr-board" element={<PrivateRoute allowedRoles={["HR_BOARD"]} />}>
//             <Route index element={<HrDashboard />} />
//             <Route path="committee-decisions" element={<CommitteeDecisionsList />} />
//             <Route path="make-decisions/:id" element={<HrDecisionForm />} />
//             <Route path="council-decisions" element={<CouncilDecisionsList />} />
//           </Route>

//           <Route path="/university-council" element={<PrivateRoute allowedRoles={["UNIVERSITY_COUNCIL"]} />}>
//             <Route index element={<CouncilDashboard />} />
//             <Route path="hr-decisions" element={<HrDecisionsList />} />
//             <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
//             <Route path="final-approved" element={<FinalApprovedList />} />
//           </Route>

//           <Route path="/university-community" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMUNITY"]} />}>
//             <Route index element={<UniversityCommunityDashboard />} />
//             <Route path="promotions" element={<ApprovedPromotions />} />
//             <Route path="details/:id" element={<PromotionDetails />} />
//             <Route path="list/:id" element={<DownloadList />} />
//             <Route path="search" element={<SearchFilter />} />
//           </Route>

//           <Route path="/admin" element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="manage-criteria" element={<ManageCriteria />} />
//             <Route path="school-list" element={<SchoolList />} />
//             <Route path="roles-access" element={<RoleAccessControl />} />
//             <Route path="user-management" element={<UserManagement />} />
//             <Route path="account-control" element={<AccountControl />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="add-school" element={<AddSchoolForm />} />
//             <Route path="schoolapplications" element={<SchoolApplications />} />
//             <Route path="applications-list" element={<SchoolTeamApplicationDetails />} />
//             <Route path="create-user" element={<CreateAdminUserForm />} />
//           </Route>

//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './components/PrivateRoute';

// // Public Pages
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Unauthorized from './pages/Unauthorized';
// import ForgotPassword from './pages/ForgotPassword';

// // Applicant
// import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
// import ApplicationForm from './pages/applicant/ApplicationForm';
// import UploadDocuments from './pages/applicant/UploadDocuments';
// import Notifications from './pages/applicant/Notifications';
// import Feedback from './pages/applicant/Feedback';
// import CategoryCriteria from './pages/applicant/CategoryCriteria';
// import UserProfile from './pages/applicant/UserProfile';

// // School Team
// import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
// import SchoolTeamApplicationDetails from './pages/school-team/ApplicationDetails';
// import UpdateApplicationForm from './pages/school-team/UpdateApplicationForm';
// import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
// import FeedbackForm from './pages/school-team/FeedbackForm';
// import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
// import ForwardButton from './pages/school-team/ForwardButton';

// // Committee
// import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
// import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
// import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
// import CommitteeFeedback from './pages/university-committee/Feedback';
// import ReviewSummary from './pages/university-committee/ReviewSummary';
// import AssignReviewer from './pages/university-committee/AssignReviewer';

// // Reviewer
// import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
// import AssignedApplications from './pages/reviewer/AssignedApplications';
// import DocumentViewer from './pages/reviewer/DocumentViewer';
// import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
// import SubmitReview from './pages/reviewer/SubmitReview';

// // HR Board
// import HrDashboard from './pages/hr-board/HrDashboard';
// import CommitteeDecisionsList from './pages/hr-board/CommitteeDecisionsList';
// import HrDecisionForm from './pages/hr-board/HrDecisionForm';
// import CouncilDecisionsList from './pages/hr-board/CouncilDecisionsList';

// // University Council
// import CouncilDashboard from './pages/university-council/CouncilDashboard';
// import HrDecisionsList from './pages/university-council/HrDecisionsList';
// import CouncilDecisionForm from './pages/university-council/CouncilDecisionForm';
// import FinalApprovedList from './pages/university-council/FinalApprovedList';

// // University Community
// import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
// import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
// import DownloadList from './pages/university-community/DownloadList';
// import PromotionDetails from './pages/university-community/PromotionDetails';
// import SearchFilter from './pages/university-community/SearchFilter';

// // Admin
// import AdminDashboard from './pages/Admin/AdminDashboard';
// import ManageCriteria from './pages/Admin/ManageCriteria';
// import RoleAccessControl from './pages/Admin/RoleAccessControl';
// import UserManagement from './pages/Admin/UserManagement';
// import AccountControl from './pages/Admin/AccountControl';
// import ResetPassword from './pages/Admin/ResetPassword';
// import AddSchoolForm from './pages/Admin/AddSchoolForm';
// import SchoolList from './pages/Admin/SchoolList';
// import SchoolApplications from './pages/Admin/SchoolApplications';
// import CreateAdminUserForm from './pages/Admin/CreateAdminUserForm';

// // Role User View Tables (extra frontend routes)
// import HRBoardUsers from './pages//HRBoardUsers';
// import ReviewerUsers from './pages/ReviewerUsers';
// import CommitteeUsers from './pages/CommitteeUsers';
// import SchoolTeamUsers from './pages//SchoolTeamUsers';
// import UniversityCouncilUsers from './pages/UniversityCouncilUsers';

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<Navigate to="/login" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Applicant */}
//           <Route path="/applicant" element={<PrivateRoute allowedRoles={["APPLICANT"]} />}>
//             <Route index element={<ApplicantDashboard />} />
//             <Route path="application" element={<ApplicationForm />} />
//             <Route path="upload" element={<UploadDocuments />} />
//             <Route path="notifications" element={<Notifications />} />
//             <Route path="feedback" element={<Feedback />} />
//             <Route path="criteria" element={<CategoryCriteria />} />
//             <Route path="profile" element={<UserProfile />} />
//           </Route>

//           {/* School Team */}
//           <Route path="/school-team" element={<PrivateRoute allowedRoles={["SCHOOL_TEAM"]} />}>
//             <Route index element={<SchoolTeamDashboard />} />
//             <Route path="applications" element={<SchoolTeamApplicationDetails />} />
//             <Route path="applications/update/:id" element={<UpdateApplicationForm />} />
//             <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
//             <Route path="feedback" element={<FeedbackForm />} />
//             <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
//             <Route path="forward/:id" element={<ForwardButton />} />
//           </Route>

//           {/* University Committee */}
//           <Route path="/university-committee" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMITTEE"]} />}>
//             <Route index element={<UniversityCommitteeDashboard />} />
//             <Route path="applications" element={<ApplicationsQueue />} />
//             <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
//             <Route path="feedback/:id" element={<CommitteeFeedback />} />
//             <Route path="review-summary" element={<ReviewSummary />} />
//             <Route path="assign" element={<AssignReviewer />} />
//           </Route>

//           {/* Reviewer */}
//           <Route path="/reviewer" element={<PrivateRoute allowedRoles={["REVIEWER"]} />}>
//             <Route index element={<ReviewerDashboard />} />
//             <Route path="applications" element={<AssignedApplications />} />
//             <Route path="document-viewer" element={<DocumentViewer />} />
//             <Route path="feedback" element={<ReviewerFeedbackForm />} />
//             <Route path="review" element={<SubmitReview />} />
//           </Route>

//           {/* HR Board */}
//           <Route path="/hr-board" element={<PrivateRoute allowedRoles={["HR_BOARD"]} />}>
//             <Route index element={<HrDashboard />} />
//             <Route path="committee-decisions" element={<CommitteeDecisionsList />} />
//             <Route path="make-decisions/:id" element={<HrDecisionForm />} />
//             <Route path="council-decisions" element={<CouncilDecisionsList />} />
//           </Route>

//           {/* University Council */}
//           <Route path="/university-council" element={<PrivateRoute allowedRoles={["UNIVERSITY_COUNCIL"]} />}>
//             <Route index element={<CouncilDashboard />} />
//             <Route path="hr-decisions" element={<HrDecisionsList />} />
//             <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
//             <Route path="final-approved" element={<FinalApprovedList />} />
//           </Route>

//           {/* University Community */}
//           <Route path="/university-community" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMUNITY"]} />}>
//             <Route index element={<UniversityCommunityDashboard />} />
//             <Route path="promotions" element={<ApprovedPromotions />} />
//             <Route path="details/:id" element={<PromotionDetails />} />
//             <Route path="list/:id" element={<DownloadList />} />
//             <Route path="search" element={<SearchFilter />} />
//           </Route>

//           {/* Admin */}
//           <Route path="/admin" element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
//             <Route index element={<AdminDashboard />} />
//             <Route path="manage-criteria" element={<ManageCriteria />} />
//             <Route path="school-list" element={<SchoolList />} />
//             <Route path="roles-access" element={<RoleAccessControl />} />
//             <Route path="user-management" element={<UserManagement />} />
//             <Route path="account-control" element={<AccountControl />} />
//             <Route path="reset-password" element={<ResetPassword />} />
//             <Route path="add-school" element={<AddSchoolForm />} />
//             <Route path="schoolapplications" element={<SchoolApplications />} />
//             <Route path="applications-list" element={<SchoolTeamApplicationDetails />} />
//             <Route path="create-user" element={<CreateAdminUserForm />} />
//           </Route>

//           {/* 🔍 View Tables per Role (Extra Feature) */}
//           <Route path="/role-users/hr-board" element={<HRBoardUsers />} />
//           <Route path="/role-users/reviewers" element={<ReviewerUsers />} />
//           <Route path="/role-users/committee" element={<CommitteeUsers />} />
//           <Route path="/role-users/council" element={<UniversityCouncilUsers />} />
//           <Route path="/role-users/school-team" element={<SchoolTeamUsers />} />

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import ForgotPassword from './pages/ForgotPassword';

// Applicant
import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
import ApplicationForm from './pages/applicant/ApplicationForm';
import UploadDocuments from './pages/applicant/UploadDocuments';
import Notifications from './pages/applicant/Notifications';
import Feedback from './pages/applicant/Feedback';
import CategoryCriteria from './pages/applicant/CategoryCriteria';
import UserProfile from './pages/applicant/UserProfile';

// School Team
import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
import SchoolTeamApplicationDetails from './pages/school-team/ApplicationDetails';
import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
import FeedbackForm from './pages/school-team/FeedbackForm';
import UpdateApplicationForm from './pages/school-team/UpdateApplicationForm';
import ForwardButton from './pages/school-team/ForwardButton';
import SchoolTeamUsers from './pages/SchoolTeamUsers';

// Committee
import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
import CommitteeFeedback from './pages/university-committee/Feedback';
import ReviewSummary from './pages/university-committee/ReviewSummary';
import AssignReviewer from './pages/university-committee/AssignReviewer';
import CommitteeUsers from './pages/CommitteeUsers';

// Reviewer
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
import AssignedApplications from './pages/reviewer/AssignedApplications';
import DocumentViewer from './pages/reviewer/DocumentViewer';
import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
import SubmitReview from './pages/reviewer/SubmitReview';
import ReviewerUsers from './pages/ReviewerUsers';

// HR Board
import HrDashboard from './pages/hr-board/HrDashboard';
import CommitteeDecisionsList from './pages/hr-board/CommitteeDecisionsList';
import HrDecisionForm from './pages/hr-board/HrDecisionForm';
import CouncilDecisionsList from './pages/hr-board/CouncilDecisionsList';
import HRBoardUsers from './pages/HRBoardUsers';

// University Council
import CouncilDashboard from './pages/university-council/CouncilDashboard';
import HrDecisionsList from './pages/university-council/HrDecisionsList';
import CouncilDecisionForm from './pages/university-council/CouncilDecisionForm';
import FinalApprovedList from './pages/university-council/FinalApprovedList';
import UniversityCouncilUsers from './pages/UniversityCouncilUsers';

// University Community
import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
import DownloadList from './pages/university-community/DownloadList';
import PromotionDetails from './pages/university-community/PromotionDetails';
import SearchFilter from './pages/university-community/SearchFilter';

// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageCriteria from './pages/Admin/ManageCriteria';
import RoleAccessControl from './pages/Admin/RoleAccessControl';
import UserManagement from './pages/Admin/UserManagement';
import AccountControl from './pages/Admin/AccountControl';
import ResetPassword from './pages/Admin/ResetPassword';
import AddSchoolForm from './pages/Admin/AddSchoolForm';
import SchoolList from './pages/Admin/SchoolList';
import SchoolApplications from './pages/Admin/SchoolApplications';
import CreateAdminUserForm from './pages/Admin/CreateAdminUserForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/applicant" element={<PrivateRoute allowedRoles={["APPLICANT"]} />}>
            <Route index element={<ApplicantDashboard />} />
            <Route path="application" element={<ApplicationForm />} />
            <Route path="upload" element={<UploadDocuments />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="criteria" element={<CategoryCriteria />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>

          <Route path="/school-team" element={<PrivateRoute allowedRoles={["SCHOOL_TEAM"]} />}>
            <Route index element={<SchoolTeamDashboard />} />
            <Route path="applications" element={<SchoolTeamApplicationDetails />} />
            <Route path="applications/update/:id" element={<UpdateApplicationForm />} />
            <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
            <Route path="feedback" element={<FeedbackForm />} />
            <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
            <Route path="forward/:id" element={<ForwardButton />} />
            <Route path="users" element={<SchoolTeamUsers />} />
          </Route>

          <Route path="/university-committee" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMITTEE"]} />}>
            <Route index element={<UniversityCommitteeDashboard />} />
            <Route path="applications" element={<ApplicationsQueue />} />
            <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
            <Route path="feedback/:id" element={<CommitteeFeedback />} />
            <Route path="review-summary" element={<ReviewSummary />} />
            <Route path="assign" element={<AssignReviewer />} />
            <Route path="users" element={<CommitteeUsers />} />
          </Route>

          <Route path="/reviewer" element={<PrivateRoute allowedRoles={["REVIEWER"]} />}>
            <Route index element={<ReviewerDashboard />} />
            <Route path="applications" element={<AssignedApplications />} />
            <Route path="document-viewer" element={<DocumentViewer />} />
            <Route path="feedback" element={<ReviewerFeedbackForm />} />
            <Route path="review" element={<SubmitReview />} />
            <Route path="users" element={<ReviewerUsers />} />
          </Route>

          <Route path="/hr-board" element={<PrivateRoute allowedRoles={["HR_BOARD"]} />}>
            <Route index element={<HrDashboard />} />
            <Route path="committee-decisions" element={<CommitteeDecisionsList />} />
            <Route path="make-decisions/:id" element={<HrDecisionForm />} />
            <Route path="council-decisions" element={<CouncilDecisionsList />} />
            <Route path="users" element={<HRBoardUsers />} />
          </Route>

          <Route path="/university-council" element={<PrivateRoute allowedRoles={["UNIVERSITY_COUNCIL"]} />}>
            <Route index element={<CouncilDashboard />} />
            <Route path="hr-decisions" element={<HrDecisionsList />} />
            <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
            <Route path="final-approved" element={<FinalApprovedList />} />
            <Route path="users" element={<UniversityCouncilUsers />} />
          </Route>

          <Route path="/university-community" element={<PrivateRoute allowedRoles={["UNIVERSITY_COMMUNITY"]} />}>
            <Route index element={<UniversityCommunityDashboard />} />
            <Route path="promotions" element={<ApprovedPromotions />} />
            <Route path="details/:id" element={<PromotionDetails />} />
            <Route path="list/:id" element={<DownloadList />} />
            <Route path="search" element={<SearchFilter />} />
          </Route>

          <Route path="/admin" element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
            <Route index element={<AdminDashboard />} />
            <Route path="manage-criteria" element={<ManageCriteria />} />
            <Route path="school-list" element={<SchoolList />} />
            <Route path="roles-access" element={<RoleAccessControl />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="account-control" element={<AccountControl />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="add-school" element={<AddSchoolForm />} />
            <Route path="schoolapplications" element={<SchoolApplications />} />
            <Route path="applications-list" element={<SchoolTeamApplicationDetails />} />
            <Route path="create-user" element={<CreateAdminUserForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
