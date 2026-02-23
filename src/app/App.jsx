import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import router from "./routes";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
