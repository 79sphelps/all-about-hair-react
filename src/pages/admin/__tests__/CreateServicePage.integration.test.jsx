import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import CreateServicePage from "../CreateServicePage";

import { useCreateService } from "../../../features/admin/services/hooks";

jest.mock("../../../features/admin/services/hooks");

describe("CreateServicePage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useCreateService.mockReturnValue({
      mutate: mockMutate,
    });
  });

  const renderPage = () =>
    renderWithProviders(
      <MemoryRouter>
        <CreateServicePage />
      </MemoryRouter>
    );

  it("renders service creation form", async () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /new service details/i })
    ).toBeInTheDocument();
  });

  it("submits service creation", async () => {
    const user = userEvent.setup();

    renderPage();

    const titleInput = screen.getByLabelText(/title/i);
    const imageInput = screen.getByLabelText(/image/i);
    const descriptionInput = screen.getByLabelText(/description/i);

    await user.type(titleInput, "Hair Styling");
    await user.type(imageInput, "hair.jpg");
    await user.type(descriptionInput, "Professional styling service description.");

    await user.click(
      screen.getByRole("button", { name: /create service/i })
    );

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

//   it("shows success state after creation", async () => {
//     const user = userEvent.setup();

//     useCreateService.mockReturnValue({
//       mutate: (_, { onSuccess }) => onSuccess(),
//     });

//     renderPage();

//     await user.click(
//       screen.getByRole("button", { name: /create service/i })
//     );

//     expect(
//       await screen.findByRole("heading", { name: /service created/i })
//     ).toBeInTheDocument();
//   });

    it("redirects after service creation", async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/admin/create-service"]}>
            <Routes>
                <Route path="/admin/create-service" element={<CreateServicePage />} />
                <Route path="/admin/services-details" element={<div>Services Page</div>} />
            </Routes>
            </MemoryRouter>
        );

        await userEvent.type(screen.getByLabelText(/title/i), "Hair Styling");
        await userEvent.type(screen.getByLabelText(/image/i), "hair.jpg");
        await userEvent.type(screen.getByLabelText(/description/i), "Professional styling");

        await userEvent.click(screen.getByRole("button", { name: /create service/i }));

        expect(await screen.findByText("Services Page")).toBeInTheDocument();
    });
});