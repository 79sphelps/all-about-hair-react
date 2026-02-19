import { Suspense } from "react";
import LoadingSpinner from "../ui/feedback/LoadingSpinner";
import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes";
import AppRoutes from "../routes";

const App = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
