import { render, screen, act } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import router from "../routes";

// Mock auth wrapper to avoid real auth complexity
jest.mock("../../components/auth/RequireAuth", () => {
  return ({ children }) => <>{children}</>;
});

// Mock layouts so we only test route tree behavior
jest.mock("../../layouts/PublicLayout", () => {
  return ({ children }) => <div data-testid="public-layout">{children}</div>;
});

jest.mock("../../layouts/AdminFormLayout", () => {
  return ({ children }) => <div data-testid="admin-layout">{children}</div>;
});

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
    await act(async () => {
      expect(await screen.findByText("/All About Hair/")).toBeInTheDocument();
    })
  });

  it("renders service route", async () => {
    renderWithRoute("/services/123");
    await act(async () => {
      expect(await screen.findByText("/Back to Home/")).toBeInTheDocument();
    })
  });

  it("renders admin route inside admin layout", async () => {
    renderWithRoute("/admin/home-page-details");
    await act(async () => {
      expect(await screen.findByTestId("admin-layout")).toBeInTheDocument();
    })
  });

  it("renders not found route", async () => {
    renderWithRoute("/unknown-route");
    await act(async () => {
      expect(await screen.findByText("NotFound")).toBeInTheDocument();
    })
  });
});
