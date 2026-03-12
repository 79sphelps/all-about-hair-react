import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import TeamDetailsPage from "../TeamDetailsPage";

import {
  useTeamMembers,
  useDeleteTeamMember,
} from "../../../features/admin/team/hooks";

jest.mock("../../../features/admin/team/hooks");

describe("TeamDetailsPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useTeamMembers.mockReturnValue({
      data: [
        {
          _id: "1",
          name: "Jane Doe",
          role: "Senior Stylist",
          bio: "Professional stylist with years of experience.",
          photo: "jane.jpg",
        },
      ],
      isLoading: false,
      error: null,
    });

    useDeleteTeamMember.mockReturnValue({
      mutate: mockMutate,
    });
  });

  it("renders team members", async () => {
    renderWithProviders(
      <MemoryRouter>
        <TeamDetailsPage />
      </MemoryRouter>
    );

    expect(await screen.findByText(/jane doe/i)).toBeInTheDocument();
  });

  it("deletes team member when confirmed", async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => true);

    renderWithProviders(
      <MemoryRouter>
        <TeamDetailsPage />
      </MemoryRouter>
    );

    await user.click(screen.getByText("Delete"));

    expect(mockMutate).toHaveBeenCalledWith("1");
  });
});