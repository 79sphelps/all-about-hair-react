import { render, screen, act } from "@testing-library/react";
import HomePage from "../HomePage";
import { Suspense } from "react";
import LoadingSpinner from "../../../ui/feedback/LoadingSpinner";

jest.mock("@auth0/auth0-react", () => ({
  useAuth0: jest.fn(),
}));

jest.mock("../../../hooks/useHomePageBootstrap", () => ({
  useHomePageBootstrap: jest.fn(),
}));

jest.mock("../../../ui/feedback/FullPageLoader", () => (props) => (
  <div>{props.title}</div>
));

jest.mock("../../../ui/feedback/ErrorState", () => () => (
  <div>ErrorState</div>
));

jest.mock("../../admin/HomePageDetailsPage", () => () => (
  <div>AdminHomePage</div>
));

jest.mock("../../../features/hero/components/Hero", () => () => (
  <div>Hero</div>
));

const { useAuth0 } = require("@auth0/auth0-react");
const { useHomePageBootstrap } = require("../../../hooks/useHomePageBootstrap");

describe("HomePage", () => {

  it("shows loader while loading", async () => {
    useAuth0.mockReturnValue({ isAuthenticated: false });
    useHomePageBootstrap.mockReturnValue({
      isLoading: true,
      isError: false,
    });
    
    render(
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    );

    expect(await screen.findByText(/Waking up the server/)).toBeInTheDocument();
  });

  it("shows error state", async () => {
    useAuth0.mockReturnValue({ isAuthenticated: false });
    useHomePageBootstrap.mockReturnValue({
      isLoading: false,
      isError: true,
      errors: [],
    });

    render(
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    );

    expect(await screen.findByText("ErrorState")).toBeInTheDocument();
  });

  it("renders public homepage when not authenticated", async () => {
    useAuth0.mockReturnValue({ isAuthenticated: false });
    useHomePageBootstrap.mockReturnValue({
      isLoading: false,
      isError: false,
    });

    render(
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    );

    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders admin page when authenticated", async () => {
    useAuth0.mockReturnValue({ isAuthenticated: true });
    useHomePageBootstrap.mockReturnValue({
      isLoading: false,
      isError: false,
    });

    render(
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    );
    
    expect(await screen.findByText("AdminHomePage")).toBeInTheDocument();
  });
});
