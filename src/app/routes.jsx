import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/style.css";

import NotFoundPage from "../pages/public/NotFoundPage";

import PublicLayout from "../layouts/PublicLayout";
import AdminFormLayout from "../layouts/AdminFormLayout";

import RequireAuth from "../components/auth/RequireAuth";

/* ---------- PUBLIC ---------- */
const HomePage = lazy(() => import("../pages/public/HomePage"));
const ServicePage = lazy(() => import("../pages/public/ServicePage"));

/* ---------- ADMIN ---------- */
const HomePageDetailsPage = lazy(() => import("../pages/admin/HomePageDetailsPage"));
const ServicesDetailsPage = lazy(() => import("../pages/admin/ServicesDetailsPage"));
const ServiceEditPage = lazy(() => import("../pages/admin/ServiceEditPage"));
const CreateServicePage = lazy(() => import("../pages/admin/CreateServicePage"));
const TeamMemberEditPage = lazy(() => import("../pages/admin/TeamMemberEditPage"));
const TeamDetailsPage = lazy(() => import("../pages/admin/TeamDetailsPage"));
const CreateTeamMemberPage = lazy(() => import("../pages/admin/CreateTeamMemberPage"));

const AppRoutes = () => {
  return (
    <Routes>

      {/* ---------- PUBLIC ---------- */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:id" element={<ServicePage />} />
      </Route>

      {/* ---------- ADMIN (PROTECTED) ---------- */}
      <Route
        element={
          <RequireAuth>
            <AdminFormLayout />
          </RequireAuth>
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

      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
};

export default AppRoutes;
