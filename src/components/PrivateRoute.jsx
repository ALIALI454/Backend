// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import DashboardLayout from "../layouts/DashboardLayout";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   // If no user is logged in, redirect to login
//   if (!user) return <Navigate to="/login" replace />;

//   const userRole = user.role?.toLowerCase();

//   // If user role is not in allowedRoles, redirect to unauthorized
//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   // Render protected content inside dashboard layout
//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// export default PrivateRoute;


// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import DashboardLayout from "../layouts/DashboardLayout";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;

//   const userRole = user.role?.toUpperCase().trim(); // Uppercase ili ilingane na allowedRoles

//   if (allowedRoles && !allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <DashboardLayout>{children}</DashboardLayout>;
// };

// export default PrivateRoute;


// PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  const userRole = user.role?.toUpperCase().trim();

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

export default PrivateRoute;
