import { render, screen, fireEvent } from "@testing-library/react";
import ServicesDetailsPage from "../ServicesDetailsPage";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../features/admin/services/hooks", () => ({
  useServices: jest.fn(),
  useDeleteService: jest.fn(),
}));

const { useNavigate } = require("react-router-dom");
const {
  useServices,
  useDeleteService,
} = require("../../../features/admin/services/hooks");

describe("ServicesDetailsPage", () => {
  const mockNavigate = jest.fn();
  const mockMutate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);

    useServices.mockReturnValue({
      isLoading: false,
      data: [{ _id: "1", title: "Hair", description: "Test" }],
    });

    useDeleteService.mockReturnValue({
      mutate: mockMutate,
    });

    window.confirm = jest.fn(() => true);
  });

  it("renders services", () => {
    render(<ServicesDetailsPage />);
    expect(screen.getByText("Hair")).toBeInTheDocument();
  });

  it("navigates on edit", () => {
    render(<ServicesDetailsPage />);
    fireEvent.click(screen.getByText("Edit"));

    expect(mockNavigate).toHaveBeenCalled();
  });

  it("calls delete on confirm", () => {
    render(<ServicesDetailsPage />);
    fireEvent.click(screen.getByText("Delete"));

    expect(mockMutate).toHaveBeenCalledWith("1");
  });
});
