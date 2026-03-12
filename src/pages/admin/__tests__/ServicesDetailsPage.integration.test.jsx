import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import ServicesDetailsPage from "../ServicesDetailsPage";

import { useServices } from "../../../features/admin/services/hooks";
import { useDeleteService } from "../../../features/admin/services/hooks";

jest.mock("../../../features/admin/services/hooks");

describe("ServicesDetailsPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useServices.mockReturnValue({
      data: [
        {
          _id: "1",
          title: "Hair Styling",
          description: "Professional styling",
          image: "hair.jpg",
        },
      ],
      isLoading: false,
      error: null,
    });

    useDeleteService.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders services from query", async () => {
    renderWithProviders(
      <MemoryRouter>
        <ServicesDetailsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("Hair Styling")).toBeInTheDocument();
    expect(screen.getByText("Professional styling")).toBeInTheDocument();
  });

  it("calls delete mutation when confirmed", async () => {
    const user = userEvent.setup();

    window.confirm = jest.fn(() => true);

    renderWithProviders(
      <MemoryRouter>
        <ServicesDetailsPage />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Delete"));

    expect(mockMutate).toHaveBeenCalledWith("1");
  });

  it("does not delete if confirmation cancelled", async () => {
    const user = userEvent.setup();

    window.confirm = jest.fn(() => false);

    renderWithProviders(
      <MemoryRouter>
        <ServicesDetailsPage />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Delete"));

    expect(mockMutate).not.toHaveBeenCalled();
  });
});