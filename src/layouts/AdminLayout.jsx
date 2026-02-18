/*
Notes:
- Auth logic lives once
- Every admin route is automatically protected
- Layout changes affect all admin pages

Architecture:
- One auth gate
- One admin shell
- Clean route tree
- Scales effortlessly
- React Router v6/v7 compliant
*/
import { Outlet, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import { NavLink } from "react-router-dom";

const AdminNav = () => (
  <nav className="admin-nav">
    <NavLink to="/admin/home-page-details">Homepage</NavLink>
    <NavLink to="/admin/services-details">Services</NavLink>
    <NavLink to="/admin/team-details">Team</NavLink>
  </nav>
);

const AdminLayout = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="admin-layout">
      <AdminNav />

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
