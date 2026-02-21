import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import { queryClient } from "../lib/react-query";
import router from "./routes";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </QueryClientProvider>
    </Suspense>
  );
};

export default App;