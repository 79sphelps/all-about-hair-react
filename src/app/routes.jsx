import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import "./styles/navbar.css";
import "./styles/mission.css";
import "./styles/about.css";
import "./styles/gallery.css";
import "./styles/hero.css";
import "./styles/social-icons.css";
import "./styles/team.css";
import "./styles/page-not-found.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/newsletter.css";
import "./styles/footer.css";
import "./styles/contact.css";
import "./styles/services.css";

import PublicLayout from "../layouts/PublicLayout";
import AdminFormLayout from "../layouts/AdminFormLayout";
import RequireAuth from "../components/auth/RequireAuth";
import NotFoundPage from "../pages/public/NotFoundPage";
import ErrorBoundary from "./ErrorBoundary";

/* ---------- PUBLIC ---------- */
const HomePage = lazy(() => import("../pages/public/HomePage"));
const ServicePage = lazy(() => import("../pages/public/ServicePage"));

/* ---------- ADMIN ---------- */
const HomePageDetailsPage = lazy(() =>
  import("../pages/admin/HomePageDetailsPage")
);
const ServicesDetailsPage = lazy(() =>
  import("../pages/admin/ServicesDetailsPage")
);
const ServiceEditPage = lazy(() =>
  import("../pages/admin/ServiceEditPage")
);
const CreateServicePage = lazy(() =>
  import("../pages/admin/CreateServicePage")
);
const TeamMemberEditPage = lazy(() =>
  import("../pages/admin/TeamMemberEditPage")
);
const TeamDetailsPage = lazy(() =>
  import("../pages/admin/TeamDetailsPage")
);
const CreateTeamMemberPage = lazy(() =>
  import("../pages/admin/CreateTeamMemberPage")
);

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/services/:id", element: <ServicePage /> },
    ],
  },
  {
    element: (
      <RequireAuth>
        <AdminFormLayout />
      </RequireAuth>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/admin/home-page-details", element: <HomePageDetailsPage /> },
      { path: "/admin/services-details", element: <ServicesDetailsPage /> },
      { path: "/admin/service-edit/:id", element: <ServiceEditPage /> },
      { path: "/admin/service-add", element: <CreateServicePage /> },
      { path: "/admin/team-details", element: <TeamDetailsPage /> },
      { path: "/admin/team-member-edit/:id", element: <TeamMemberEditPage /> },
      { path: "/admin/team-member-add", element: <CreateTeamMemberPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
