import { screen } from "@testing-library/react";
import HomePageDetailsPage from "../HomePageDetailsPage";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../test-utils/render";
import {
  useHomePageDetails,
  useUpdateHomePageDetails,
} from "../../../features/admin/homepage/hooks";
import useAdminForm from "../../../features/admin/hooks/useAdminForm";

jest.mock("../../../features/admin/homepage/hooks", () => ({
  useHomePageDetails: jest.fn(),
  useUpdateHomePageDetails: jest.fn(),
}));

jest.mock("../../../features/admin/hooks/useAdminForm");

jest.mock("../../../features/admin/components/AdminFormBuilder", () => () => (
  <div data-testid="form-builder" />
));


describe("HomePageDetailsPageExtended", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    useUpdateHomePageDetails.mockReturnValue({
      mutate: mockMutate,
    });

    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ _id: "1", headline: "Test headline" }],
    });

    useAdminForm.mockReturnValue({
      values: { headline: "Test headline" },
      validateBeforeSubmit: jest.fn(() => true),
      setValues: jest.fn(),
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      errors: {},
      touched: {},
    });
  });

  it("shows loading spinner", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: true,
    });

    renderWithProviders(<HomePageDetailsPage />);

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows error state", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      error: { message: "Failed to load" },
    });

    renderWithProviders(<HomePageDetailsPage />);

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to load");
  });

  it("renders form when data loads", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ _id: "1", headline: "Test Headline" }],
    });

    renderWithProviders(<HomePageDetailsPage />);

    expect(
      screen.getByText("Update Homepage Details")
    ).toBeInTheDocument();
  });

  it("submits form", async () => {
    // useHomePageDetails.mockReturnValue({
    //   isLoading: false,
    //   isError: false,
    //   data: [{ _id: "1", headline: "Test Headline" }],
    // });

    renderWithProviders(<HomePageDetailsPage />);

    const button = screen.getByRole("button", {
      name: /make changes/i,
    });

    await userEvent.click(button);

    expect(mockMutate).toHaveBeenCalled();
  });
});
