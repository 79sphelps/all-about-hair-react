import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "../../../test-utils/render";

import TeamMemberEditPage from "../TeamMemberEditPage";

import {
  useTeamMember,
  useUpdateTeamMember,
} from "../../../features/admin/team/hooks";

jest.mock("../../../features/admin/team/hooks");

describe("TeamMemberEditPage integration", () => {
  const mockMutate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    useTeamMember.mockReturnValue({
      data: {
        name: "Jane Doe",
        role: "Senior Stylist",
        photo: "jane.jpg",
        bio: "Experienced stylist.",
      },
      isLoading: false,
      isError: false,
    });

    useUpdateTeamMember.mockReturnValue({
      mutate: mockMutate,
    });
  });

  const renderPage = () =>
    renderWithProviders(
      <MemoryRouter
        initialEntries={[
          {
            pathname: "/admin/team-member-edit/1",
            state: { id: "1" },
          },
        ]}
      >
        <TeamMemberEditPage />
      </MemoryRouter>
    );

  it("loads team member data into form", async () => {
    renderPage();

    expect(await screen.findByDisplayValue("Jane Doe")).toBeInTheDocument();
  });

//   it("submits update", async () => {
//     const user = userEvent.setup();

//     renderPage();

//     const nameInput = await screen.findByDisplayValue("Jane Doe");

//     await user.clear(nameInput);
//     await user.type(nameInput, "Jane Updated");

//     await user.click(screen.getByRole("button", { name: /update/i }));

//     await waitFor(() => {
//       expect(mockMutate).toHaveBeenCalled();
//     });
//   });


    // it("submits update", async () => {
    //     const user = userEvent.setup();

    //     renderPage();

    //     const nameInput = await screen.findByDisplayValue("Jane Doe");

    //     await user.clear(nameInput);
    //     await user.type(nameInput, "Jane Updated Name");

    //     await user.click(
    //         screen.getByRole("button", { name: /^update$/i })
    //     );

    //     await waitFor(() => {
    //         expect(mockMutate).toHaveBeenCalled();
    //     });
    // });

    it("submits update", async () => {
        // renderWithProviders(<TeamMemberEditPage />);
        renderPage();

        const nameInput = await screen.findByLabelText(/name/i);

        await userEvent.clear(nameInput);
        await userEvent.type(nameInput, "Jane Updated Name");

        const submitButton = screen.getByRole("button", { name: /update/i });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(mockMutate).toHaveBeenCalled();
        });
    });
});