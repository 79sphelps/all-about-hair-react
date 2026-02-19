import { lazy } from "react";
import { Route } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../app/styles/App.css";
import "../app/styles/style.css";

const HomePage = lazy(() => import("../pages/public/HomePage"));
const ServicePage = lazy(() => import("../pages/public/ServicePage"));

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<HomePage />} />
    <Route path="/services/:id" element={<ServicePage />} />
  </Route>
);

export default PublicRoutes;
