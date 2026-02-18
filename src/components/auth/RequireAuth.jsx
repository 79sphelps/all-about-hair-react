import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
