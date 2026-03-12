import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import ServiceEditPage from "../ServiceEditPage";

import {
  useService,
  useUpdateService,
} from "../../../features/admin/services/hooks";

jest.mock("../../../features/admin/services/hooks");

describe("ServiceEditPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useService.mockReturnValue({
      data: {
        _id: "1",
        title: "Hair Styling",
        description: "Professional styling service",
        image: "hair.jpg",
        pricing: [],
      },
      isLoading: false,
      error: null,
    });

    useUpdateService.mockReturnValue({
      mutate: mockMutate,
    });
  });

  const renderPage = () =>
    renderWithProviders(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/admin/service-edit/1",
            state: { id: "1" },
          },
        ]}
      >
        <ServiceEditPage />
      </MemoryRouter>
    );

  it("loads service data into the form", async () => {
    renderPage();

    expect(await screen.findByDisplayValue("Hair Styling")).toBeInTheDocument();
  });

  it("submits updated service", async () => {
    const user = userEvent.setup();

    renderPage();

    const titleInput = await screen.findByDisplayValue("Hair Styling");

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Service");

    await user.click(
      screen.getByRole("button", { name: /update service details/i })
    );

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

//   it("navigates back on cancel", async () => {
//     const user = userEvent.setup();

//     renderPage();

//     await user.click(screen.getByText("Cancel"));

//     // Router location change verified via history
//     await waitFor(() => {
//         expect(window.location.pathname).toBe("/admin/services-details");
//     });
//     });
    it("navigates back on cancel", async () => {
        renderWithProviders(
            <MemoryRouter
            initialEntries={[{ pathname: "/admin/service-edit/1", state: { id: "1" } }]}
            >
            <Routes>
                <Route path="/admin/service-edit/:id" element={<ServiceEditPage />} />
                <Route path="/admin/services-details" element={<div>Services Page</div>} />
            </Routes>
            </MemoryRouter>
        );

        const cancelButton = await screen.findByRole("button", { name: /cancel/i });

        await userEvent.click(cancelButton);

        expect(await screen.findByText("Services Page")).toBeInTheDocument();
    });

});