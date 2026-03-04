import { render, screen, fireEvent } from "@testing-library/react";
import HomePageDetailsPage from "../HomePageDetailsPage";
import useAdminForm from "../../../features/admin/hooks/useAdminForm";

jest.mock("../../../features/admin/homepage/hooks", () => ({
  useHomePageDetails: jest.fn(),
  useUpdateHomePageDetails: jest.fn(),
}));

jest.mock("../../../features/admin/hooks/useAdminForm");

jest.mock("../../../features/admin/components/AdminFormBuilder", () => () => (
  <div data-testid="form-builder" />
));

const {
  useHomePageDetails,
  useUpdateHomePageDetails,
} = require("../../../features/admin/homepage/hooks");

// const useAdminForm = require("../../../features/admin/hooks/useAdminForm");

describe("HomePageDetailsPage", () => {
  beforeEach(() => {
    useAdminForm.mockReturnValue({
      values: {},
      setValues: jest.fn(),
      validateBeforeSubmit: jest.fn(() => true),
    });
  });

  it("shows loading", () => {
    useHomePageDetails.mockReturnValue({ isLoading: true });

    render(<HomePageDetailsPage />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  it("shows error", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Boom" },
    });

    render(<HomePageDetailsPage />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("shows success message after update", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      data: [{ _id: "1" }],
    });

    useUpdateHomePageDetails.mockReturnValue({
      mutate: (_, { onSuccess }) => onSuccess(),
    });

    render(<HomePageDetailsPage />);
    fireEvent.click(screen.getByText("Make Changes"));

    expect(
      screen.getByText("Homepage details successfully updated.")
    ).toBeInTheDocument();
  });
});
