import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./style.css";

import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminLayout from "./components/admin/AdminLayout";

// Public routes
const Home = lazy(() => import("./components/Home"));
const Service = lazy(() => import("./components/services/Service"));

// Admin routes
const HomePageDetailsEdit = lazy(() => import("./components/admin/HomePageDetailsEdit"));
const ServicesDetails = lazy(() => import("./components/admin/ServicesDetails"));
const ServiceOfferingEdit = lazy(() => import("./components/admin/ServiceOfferingEdit"));
const CreateServiceOffering = lazy(() => import("./components/admin/CreateServiceOffering"));
const TeamMemberEdit = lazy(() => import("./components/admin/TeamMemberEdit"));
const TeamDetails = lazy(() => import("./components/admin/TeamDetails"));
const CreateTeamMember = lazy(() => import("./components/admin/CreateTeamMember"));

const App = () => {
  return (
    <Router future={{ v7_startTransition: true }}>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/services/:id" element={<Service />} />

          {/* Admin Group */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="home-page-details" element={<HomePageDetailsEdit />} />
            <Route path="services-details" element={<ServicesDetails />} />
            <Route path="service-edit/:id" element={<ServiceOfferingEdit />} />
            <Route path="service-add" element={<CreateServiceOffering />} />
            <Route path="team-details" element={<TeamDetails />} />
            <Route path="team-member-edit/:id" element={<TeamMemberEdit />} />
            <Route path="team-member-add" element={<CreateTeamMember />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
