import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import PublicRoutes from "./public.routes";
import AdminRoutes from "./admin.routes";

import NotFoundPage from "../pages/public/NotFoundPage";
import LoadingSpinner from "../ui/feedback/LoadingSpinner";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {PublicRoutes}
        {AdminRoutes}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
