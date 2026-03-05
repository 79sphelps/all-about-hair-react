import { render, screen } from "@testing-library/react";
import Team from "../Team";
import { useHomePageDetails } from "../../../admin/homepage/useHomePageDetails";
import { useTeamMembers } from "../../../admin/team/useTeamMember";

jest.mock("../../../admin/homepage/useHomePageDetails");
jest.mock("../../../admin/team/useTeamMember");

describe("Team", () => {
  it("renders loading state", async () => {
    useHomePageDetails.mockReturnValue({ isLoading: true });
    useTeamMembers.mockReturnValue({ isLoading: true });

    render(<Team />);
    // expect(screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders team members", async () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      data: [{ stylistsHeadline: "Our Stylists", stylistsSubMsg: "Meet team" }],
    });

    useTeamMembers.mockReturnValue({
      isLoading: false,
      data: [
        {},
        {
          _id: "1",
          name: "Jane",
          role: "Hair Stylist",
          bio: "Bio text",
          photo: "assets/img/header-img-min.png",
        },
      ],
    });

    render(<Team />);

    expect(await screen.findByText("Our Stylists")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });
});