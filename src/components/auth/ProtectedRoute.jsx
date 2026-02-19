import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const location = useLocation();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Optional role guarding
//   if (requiredRole) {
//     const roles = user?.["https://your-app/roles"] || [];

//     if (!roles.includes(requiredRole)) {
//       return <Navigate to="/" replace />;
//     }
//   }

  return children;
};

export default ProtectedRoute;
