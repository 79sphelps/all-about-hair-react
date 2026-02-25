import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminLayout from "../AdminLayout";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("../../ui/feedback/LoadingSpinner", () => () => (
  <div>Loading...</div>
));

const { useAuth0 } = require("@auth0/auth0-react");

describe("AdminLayout", () => {
  it("shows loading spinner", () => {
    useAuth0.mockReturnValue({
      isLoading: true,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects if not authenticated", () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    // Navigate renders nothing visible, so layout content shouldn't exist
    expect(screen.queryByText("Homepage")).not.toBeInTheDocument();
  });

  it("renders admin layout if authenticated", () => {
    useAuth0.mockReturnValue({
      isLoading: false,
      isAuthenticated: true,
    });

    render(
      <MemoryRouter>
        <AdminLayout />
      </MemoryRouter>
    );

    expect(screen.getByText("Homepage")).toBeInTheDocument();
  });
});
