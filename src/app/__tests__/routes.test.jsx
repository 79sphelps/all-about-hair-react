import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import router from "../routes";

// Mock auth wrapper to avoid real auth complexity
jest.mock("../../components/auth/RequireAuth", () => {
  return ({ children }) => <>{children}</>;
});

// Mock layouts so we only test route tree behavior
// jest.mock("../../layouts/PublicLayout", () => {
//   return ({ children }) => <div data-testid="public-layout">{children}</div>;
// });
jest.mock("../../layouts/PublicLayout", () => {
  const { Outlet } = require("react-router-dom");

  return function MockPublicLayout() {
    return (
      <div data-testid="public-layout">
        <Outlet />
      </div>
    );
  };
});

jest.mock("../../layouts/AdminFormLayout", () => {
  return ({ children }) => <div data-testid="admin-layout">{children}</div>;
});
// jest.mock("../../layouts/AdminFormLayout", () => {
//   const { Outlet } = require("react-router-dom");

//   return function MockAdminLayout() {
//     return (
//       <div data-testid="admin-layout">
//         <Outlet />
//       </div>
//     );
//   };
// });

// Mock pages
jest.mock("../../pages/public/HomePage", () => () => <div>Home</div>);
jest.mock("../../pages/public/ServicePage", () => () => <div>Service</div>);
jest.mock("../../pages/public/NotFoundPage", () => () => <div>NotFound</div>);

describe("App Routes", () => {
  const renderWithRoute = (initialEntry) => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: [initialEntry],
    });

    render(<RouterProvider router={testRouter} />);
  };

  it("renders public home route", async () => {
    renderWithRoute("/");
    expect(await screen.findByText("Home")).toBeInTheDocument();
  });

  it("renders service route", async () => {
    renderWithRoute("/services/123");
      expect(await screen.findByText("Service")).toBeInTheDocument();
  });

  it("renders admin route inside admin layout", async () => {
    renderWithRoute("/admin/home-page-details");
    expect(await screen.findByTestId("admin-layout")).toBeInTheDocument();
  });

  it("renders not found route", async () => {
    renderWithRoute("/unknown-route");
    expect(await screen.findByText("NotFound")).toBeInTheDocument();
  });
});
