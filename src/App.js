// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import ForgotPassword from './pages/ForgotPassword';

// Applicant Pages
import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
import ApplicationForm from './pages/applicant/ApplicationForm';
import UploadDocuments from './pages/applicant/UploadDocuments';
import StatusTracker from './pages/applicant/StatusTracker';
import Notifications from './pages/applicant/Notifications';
import Feedback from './pages/applicant/Feedback';
import CategoryCriteria from './pages/applicant/CategoryCriteria';

// School Team Pages
import SchoolTeamDashboard from './pages/school-team/SchoolTeamDashboard';
import CategoryCriteriaViewer from './pages/school-team/CategoryCriteriaViewer';
import ApplicationDetails from './pages/school-team/ApplicationDetails';
import SchoolTeamCategoryCriteria from './pages/school-team/CategoryCriteria';
import Checklist from './pages/school-team/Checklist';
import FeedbackForm from './pages/school-team/FeedbackForm';
import ForwardButton from './pages/school-team/ForwardButton';

// University Committee Pages
import UniversityCommitteeDashboard from './pages/university-committee/UniversityCommitteeDashboard';
import ApplicationsQueue from './pages/university-committee/ApplicationsQueue';
import CommitteeApplicationDetails from './pages/university-committee/ApplicationDetails';
import DecisionForm from './pages/university-committee/DecisionForm';
import CommitteeFeedback from './pages/university-committee/Feedback';
import SubmitDecision from './pages/university-committee/SubmitDecision';
import ReviewSummary from './pages/university-committee/ReviewSummary';

// Reviewer Pages
import ReviewerDashboard from './pages/reviewer/ReviewerDashboard';
import AssignedApplications from './pages/reviewer/AssignedApplications';
import DocumentViewer from './pages/reviewer/DocumentViewer';
import ReviewerFeedbackForm from './pages/reviewer/FeedbackForm';
import SubmitReview from './pages/reviewer/SubmitReview';

// HR Board Pages
import HrBoardDashboard from './pages/hr-board/HrBoardDashboard';
import ApprovalQueue from './pages/hr-board/ApprovalQueue';
import FinalizeAndNotify from './pages/hr-board/FinalizeAndNotify';
import ForwardToCouncil from './pages/hr-board/ForwardToCouncil';
import ReviewReport from './pages/hr-board/ReviewReport';

// University Council Pages
import UniversityCouncilDashboard from './pages/university-council/UniversityCouncilDashboard';
import CouncilApplicationsQueue from './pages/university-council/ApplicationsQueue';
import CouncilApplicationDetails from './pages/university-council/ApplicationDetails';
import CouncilDecisionForm from './pages/university-council/DecisionForm';
import CouncilFeedback from './pages/university-council/Feedback';
import CouncilReviewSummary from './pages/university-council/ReviewSummary';
import CouncilSubmitDecision from './pages/university-council/SubmitDecision';

// University Community Pages
import UniversityCommunityDashboard from './pages/university-community/UniversityCommunityDashboard';
import ApprovedPromotions from './pages/university-community/ApprovedPromotions';
import DownloadList from './pages/university-community/DownloadList';
import PromotionDetails from './pages/university-community/PromotionDetails';
import SearchFilter from './pages/university-community/SearchFilter';

// PrivateRoute Component
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

const App = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Applicant Routes */}
        <Route
          path="/applicant/*"
          element={
            <PrivateRoute allowedRoles={['applicant']}>
              <ApplicantDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<ApplicationForm />} />
          <Route path="application" element={<ApplicationForm />} />
          <Route path="upload" element={<UploadDocuments />} />
          <Route path="status" element={<StatusTracker />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="criteria" element={<CategoryCriteria />} />
          <Route path="dashboard" element={<ApplicantDashboard />} />
        </Route>

        {/* School Team Routes */}
        <Route
          path="/school-team/*"
          element={
            <PrivateRoute allowedRoles={['school-team']}>
              <SchoolTeamDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<ApplicationDetails />} />
          <Route path="applications" element={<ApplicationDetails />} />
          <Route path="criteria" element={<SchoolTeamCategoryCriteria />} />
          <Route path="checklist" element={<Checklist />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="forward" element={<ForwardButton />} />
          <Route path="category-criteria" element={<CategoryCriteriaViewer />} />
          <Route path="dashboard" element={<SchoolTeamDashboard />} />
        </Route>

        {/* University Committee Routes */}
        <Route
          path="/university-committee/*"
          element={
            <PrivateRoute allowedRoles={['university-committee']}>
              <UniversityCommitteeDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<ApplicationsQueue />} />
          <Route path="applications" element={<ApplicationsQueue />} />
          <Route path="application-details/:id" element={<CommitteeApplicationDetails />} />
          <Route path="decision-form/:id" element={<DecisionForm />} />
          <Route path="feedback/:id" element={<CommitteeFeedback />} />
          <Route path="review-summary" element={<ReviewSummary />} />
          <Route path="submit-decision" element={<SubmitDecision />} />
          <Route path="dashboard" element={<UniversityCommitteeDashboard />} />
        </Route>

        {/* Reviewer Routes */}
        <Route
          path="/reviewer/*"
          element={
            <PrivateRoute allowedRoles={['reviewer']}>
              <ReviewerDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<AssignedApplications />} />
          <Route path="applications" element={<AssignedApplications />} />
          <Route path="document-viewer" element={<DocumentViewer />} />
          <Route path="feedback" element={<ReviewerFeedbackForm />} />
          <Route path="review" element={<SubmitReview />} />
          <Route path="dashboard" element={<ReviewerDashboard />} />
        </Route>

        {/* HR Board Routes */}
        <Route
          path="/hr-board/*"
          element={
            <PrivateRoute allowedRoles={['hr-board']}>
              <HrBoardDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<ApprovalQueue />} />
          <Route path="queue" element={<ApprovalQueue />} />
          <Route path="finalize" element={<FinalizeAndNotify />} />
          <Route path="forward" element={<ForwardToCouncil />} />
          <Route path="review-report" element={<ReviewReport />} />
          <Route path="dashboard" element={<HrBoardDashboard />} />
        </Route>

        {/* University Council Routes */}
        <Route
          path="/university-council/*"
          element={
            <PrivateRoute allowedRoles={['university-council']}>
              <UniversityCouncilDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<CouncilApplicationsQueue />} />
          <Route path="applications" element={<CouncilApplicationsQueue />} />
          <Route path="application-details/:id" element={<CouncilApplicationDetails />} />
          <Route path="decision-form/:id" element={<CouncilDecisionForm />} />
          <Route path="feedback/:id" element={<CouncilFeedback />} />
          <Route path="review-summary" element={<CouncilReviewSummary />} />
          <Route path="submit" element={<CouncilSubmitDecision />} />
          <Route path="dashboard" element={<UniversityCouncilDashboard />} />
        </Route>

        {/* University Community Routes */}
        <Route
          path="/university-community/*"
          element={
            <PrivateRoute allowedRoles={['university-community']}>
              <UniversityCommunityDashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<ApprovedPromotions />} />
          <Route path="promotions" element={<ApprovedPromotions />} />
          <Route path="details/:id" element={<PromotionDetails />} />
          <Route path="list/:id" element={<DownloadList />} />
          <Route path="search" element={<SearchFilter />} />
          <Route path="dashboard" element={<UniversityCommunityDashboard />} />
        </Route>

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  </AuthProvider>
);

export default App;
