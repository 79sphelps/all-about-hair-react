import { render, screen, fireEvent } from "@testing-library/react";
import CreateServicePage from "../CreateServicePage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../features/admin/services/hooks/useCreateService", () => ({
  useCreateService: jest.fn(),
}));

jest.mock("../../features/admin/hooks/useAdminForm");

jest.mock("../../features/admin/components/AdminFormBuilder", () => () => (
  <div data-testid="form-builder" />
));

const { useNavigate } = require("react-router-dom");
const { useCreateService } = require("../../features/admin/services/hooks");
const useAdminForm = require("../../features/admin/hooks/useAdminForm");

describe("CreateServicePage", () => {
  const mockNavigate = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
    useCreateService.mockReturnValue({ mutate: mockMutate });

    useAdminForm.mockReturnValue({
      values: { pricing: [] },
      setValues: jest.fn(),
      resetForm: jest.fn(),
      validateBeforeSubmit: jest.fn(() => true),
    });
  });

  it("renders page header", () => {
    render(<CreateServicePage />);
    expect(screen.getByText("New Service Details")).toBeInTheDocument();
  });

  it("shows pricing form when clicking Add Pricing Detail", () => {
    render(<CreateServicePage />);
    fireEvent.click(screen.getByText("Add Pricing Detail"));

    expect(screen.getByText("Add Detail")).toBeInTheDocument();
  });

  it("calls mutate on valid submit", () => {
    render(<CreateServicePage />);

    fireEvent.click(screen.getByText("Create Service"));

    expect(mockMutate).toHaveBeenCalled();
  });

  it("navigates on cancel", () => {
    render(<CreateServicePage />);

    fireEvent.click(screen.getByText("Cancel"));

    expect(mockNavigate).toHaveBeenCalledWith("/admin/services-details");
  });

  it("shows success state after submission", () => {
    useCreateService.mockReturnValue({
      mutate: (_, { onSuccess }) => onSuccess(),
    });

    render(<CreateServicePage />);
    fireEvent.click(screen.getByText("Create Service"));

    expect(screen.getByText("Service Created")).toBeInTheDocument();
  });
});
