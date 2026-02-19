import { lazy } from "react";
import { Route } from "react-router-dom";
import AdminFormLayout from "../layouts/AdminFormLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/styles/App.css";
import "../app/styles/style.css";

const HomePageDetailsPage = lazy(() => import("../pages/admin/HomePageDetailsPage"));
const ServicesDetailsPage = lazy(() => import("../pages/admin/ServicesDetailsPage"));
const ServiceEditPage = lazy(() => import("../pages/admin/ServiceEditPage"));
const CreateServicePage = lazy(() => import("../pages/admin/CreateServicePage"));
const TeamMemberEditPage = lazy(() => import("../pages/admin/TeamMemberEditPage"));
const TeamDetailsPage = lazy(() => import("../pages/admin/TeamDetailsPage"));
const CreateTeamMemberPage = lazy(() => import("../pages/admin/CreateTeamMemberPage"));

const AdminRoutes = (
  <Route
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminFormLayout />
      </ProtectedRoute>
    }
  >
    <Route path="/admin/home-page-details" element={<HomePageDetailsPage />} />
    <Route path="/admin/services-details" element={<ServicesDetailsPage />} />
    <Route path="/admin/service-edit/:id" element={<ServiceEditPage />} />
    <Route path="/admin/team-details" element={<TeamDetailsPage />} />
    <Route path="/admin/team-member-edit/:id" element={<TeamMemberEditPage />} />
    <Route path="/admin/service-add" element={<CreateServicePage />} />
    <Route path="/admin/team-member-add" element={<CreateTeamMemberPage />} />
  </Route>
);

export default AdminRoutes;
