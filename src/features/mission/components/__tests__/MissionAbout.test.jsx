import { render, screen } from "@testing-library/react";
import MissionAbout from "../MissionAbout";
import { useHomePageDetails } from "../../../admin/homepage/useHomePageDetails";

jest.mock("../../../admin/homepage/useHomePageDetails");

describe("MissionAbout", () => {
  it("renders loading", async () => {
    useHomePageDetails.mockReturnValue({ isLoading: true });

    render(<MissionAbout />);
    // expect(await screen.getByRole("status")).toBeInTheDocument();
    expect(await screen.findByText("Loading…")).toBeInTheDocument();
  });

  it("renders error", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: true,
      data: "...",
      error: { message: "Oops" },
    });

    render(<MissionAbout />);
    expect(screen.getByRole("alert")).toHaveTextContent("Oops");
  });

  it("renders about content", () => {
    useHomePageDetails.mockReturnValue({
      isLoading: false,
      isError: false,
      data: [{ aboutSubMsg: "About us content" }],
    });

    render(<MissionAbout />);

    expect(screen.getByText("About us content")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});