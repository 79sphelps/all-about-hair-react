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
const HomePageDetailsEdit2 = lazy(() => import("./components/admin/HomePageDetailsEdit2"));
const ServicesDetails = lazy(() => import("./components/admin/ServicesDetails"));
const ServiceOfferingEdit2 = lazy(() => import("./components/admin/ServiceOfferingEdit2"));
const CreateServiceOffering2 = lazy(() => import("./components/admin/CreateServiceOffering2"));
const TeamMemberEdit2 = lazy(() => import("./components/admin/TeamMemberEdit2"));
const TeamDetails = lazy(() => import("./components/admin/TeamDetails"));
const CreateTeamMember2 = lazy(() => import("./components/admin/CreateTeamMember2"));

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
            <Route path="home-page-details" element={<HomePageDetailsEdit2 />} />
            <Route path="services-details" element={<ServicesDetails />} />
            <Route path="service-edit/:id" element={<ServiceOfferingEdit2 />} />
            <Route path="service-add" element={<CreateServiceOffering2 />} />
            <Route path="team-details" element={<TeamDetails />} />
            <Route path="team-member-edit/:id" element={<TeamMemberEdit2 />} />
            <Route path="team-member-add" element={<CreateTeamMember2 />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
