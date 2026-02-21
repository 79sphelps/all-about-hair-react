import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/style.css";

import PublicLayout from "../layouts/PublicLayout";
import AdminFormLayout from "../layouts/AdminFormLayout";
import RequireAuth from "../components/auth/RequireAuth";
import NotFoundPage from "../pages/public/NotFoundPage";

/* ---------- PUBLIC ---------- */
const HomePage = lazy(() => import("../pages/public/HomePage"));
const ServicePage = lazy(() => import("../pages/public/ServicePage"));

/* ---------- ADMIN ---------- */
const HomePageDetailsPage = lazy(() =>
  import("../pages/admin/HomePageDetailsPage"),
);
const ServicesDetailsPage = lazy(() =>
  import("../pages/admin/ServicesDetailsPage"),
);
const ServiceEditPage = lazy(() =>
  import("../pages/admin/ServiceEditPage"),
);
const CreateServicePage = lazy(() =>
  import("../pages/admin/CreateServicePage"),
);
const TeamMemberEditPage = lazy(() =>
  import("../pages/admin/TeamMemberEditPage"),
);
const TeamDetailsPage = lazy(() =>
  import("../pages/admin/TeamDetailsPage"),
);
const CreateTeamMemberPage = lazy(() =>
  import("../pages/admin/CreateTeamMemberPage"),
);

const router = createBrowserRouter([
  /* ---------- PUBLIC ---------- */
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/services/:id",
        element: <ServicePage />,
      },
    ],
  },

  /* ---------- ADMIN (PROTECTED) ---------- */
  {
    element: (
      <RequireAuth>
        <AdminFormLayout />
      </RequireAuth>
    ),
    children: [
      {
        path: "/admin/home-page-details",
        element: <HomePageDetailsPage />,
      },
      {
        path: "/admin/services-details",
        element: <ServicesDetailsPage />,
      },
      {
        path: "/admin/service-edit/:id",
        element: <ServiceEditPage />,
      },
      {
        path: "/admin/service-add",
        element: <CreateServicePage />,
      },
      {
        path: "/admin/team-details",
        element: <TeamDetailsPage />,
      },
      {
        path: "/admin/team-member-edit/:id",
        element: <TeamMemberEditPage />,
      },
      {
        path: "/admin/team-member-add",
        element: <CreateTeamMemberPage />,
      },
    ],
  },

  /* ---------- FALLBACK ---------- */
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;