import { Suspense } from "react";
import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/react-query";
// import AppRoutes from "./routes";
import AppRoutes from "../routes";
import ErrorBoundary from "../components/ErrorBoundary";

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </QueryClientProvider>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
