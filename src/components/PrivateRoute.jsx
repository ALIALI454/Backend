import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  const userRole = user.role?.toLowerCase();

  // If user role is not in allowedRoles, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render protected content inside dashboard layout
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default PrivateRoute;
