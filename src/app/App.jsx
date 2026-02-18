import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/style.css";

import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import NotFoundPage from "../pages/public/NotFoundPage";
import AdminLayout from "../components/admin/AdminLayout";

// Public routes
const HomePage = lazy(() => import("../pages/public/HomePage"));
const ServicePage = lazy(() => import("../pages/public/ServicePage"));

// Admin routes
const HomePageDetailsPage = lazy(() => import("../pages/admin/HomePageDetailsPage"));
const ServicesDetailsPage = lazy(() => import("../pages/admin/ServicesDetailsPage"));
const ServiceEditPage = lazy(() => import("../pages/admin/ServiceEditPage"));
const CreateServicePage = lazy(() => import("../pages/admin/CreateServicePage"));
const TeamMemberEditPage = lazy(() => import("../pages/admin/TeamMemberEditPage"));
const TeamDetailsPage = lazy(() => import("../pages/admin/TeamDetailsPage"));
const CreateTeamMemberPage = lazy(() => import("../pages/admin/CreateTeamMemberPage"));

const App = () => {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:id" element={<ServicePage />} />

          {/* Admin Group */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home-page-details" element={<HomePageDetailsPage />} />
            <Route path="services-details" element={<ServicesDetailsPage />} />
            <Route path="service-edit/:id" element={<ServiceEditPage />} />
            <Route path="service-add" element={<CreateServicePage />} />
            <Route path="team-details" element={<TeamDetailsPage />} />
            <Route path="team-member-edit/:id" element={<TeamMemberEditPage />} />
            <Route path="team-member-add" element={<CreateTeamMemberPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
