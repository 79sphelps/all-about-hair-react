import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundary";

const ThrowError = () => {
  throw new Error("Boom");
};

describe("ErrorBoundary", () => {
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

  afterAll(() => {
    consoleError.mockRestore();
  });

  it("renders fallback UI when child throws", () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("allows reset", () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText("Try Again"));

    consoleSpy.mockRestore();
  });
});
