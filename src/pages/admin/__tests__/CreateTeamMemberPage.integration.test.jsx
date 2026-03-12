import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import CreateTeamMemberPage from "../CreateTeamMemberPage";

import { useCreateTeamMember } from "../../../features/admin/team/hooks";

jest.mock("../../../features/admin/team/hooks");

describe("CreateTeamMemberPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useCreateTeamMember.mockReturnValue({
      mutate: mockMutate,
    });
  });

  const renderPage = () =>
    renderWithProviders(
      <MemoryRouter>
        <CreateTeamMemberPage />
      </MemoryRouter>
    );

  it("renders team member form", () => {
    renderPage();

    expect(
      screen.getByRole("heading", { name: /new team member details/i })
    ).toBeInTheDocument();
  });

  it("submits new team member", async () => {
    const user = userEvent.setup();

    renderPage();

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/role/i), "Senior Stylist");
    await user.type(screen.getByLabelText(/image path/i), "jane.jpg");
    await user.type(
      screen.getByLabelText(/bio/i),
      "Jane is a professional stylist with over ten years of experience."
    );

    await user.click(
      screen.getByRole("button", { name: /create team member/i })
    );

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

//   it("shows success message after creation", async () => {
//     const user = userEvent.setup();

//     useCreateTeamMember.mockReturnValue({
//       mutate: (_, { onSuccess }) => onSuccess(),
//     });

//     renderPage();

//     await user.click(
//       screen.getByRole("button", { name: /create team member/i })
//     );

//     expect(
//       await screen.findByRole("heading", { name: /team member created/i })
//     ).toBeInTheDocument();
//   });

    it("shows success message after creation", async () => {
    const user = userEvent.setup();

    useCreateTeamMember.mockReturnValue({
        mutate: (_, { onSuccess }) => onSuccess(),
    });

    renderPage();

    await user.type(screen.getByLabelText(/name/i), "Jane Doe");
    await user.type(screen.getByLabelText(/role/i), "Senior Stylist");
    await user.type(screen.getByLabelText(/image path/i), "jane.jpg");
    await user.type(
        screen.getByLabelText(/bio/i),
        "Jane is a professional stylist with over ten years experience."
    );

    await user.click(
        screen.getByRole("button", { name: /create team member/i })
    );

    expect(
        await screen.findByRole("heading", { name: /team member created/i })
    ).toBeInTheDocument();
    });
});